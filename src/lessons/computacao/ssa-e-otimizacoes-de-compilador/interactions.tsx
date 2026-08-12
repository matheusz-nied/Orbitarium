import { useState } from "react";
import { Code2, GitBranch, ShieldCheck } from "lucide-react";
import type { LessonModule } from "../../../types/content";
import { InteractiveShell } from "../../../components/lesson/InteractionPrimitives";
import {
  CalloutCard,
  MetricGrid,
  StepDots,
  TogglePills,
} from "../sharedPrimitives";

const toSsaStages = [
  {
    label: "Fonte",
    code: [
      "x = input()",
      "if cond:",
      "  x = 1",
      "else:",
      "  x = 2",
      "y = x + 4",
    ],
    insight:
      "O texto-fonte reusa o nome `x`, mas ainda nao deixa explicita qual atribuicao alimenta `y` em cada caminho.",
  },
  {
    label: "Versoes",
    code: [
      "x0 = input()",
      "if cond:",
      "  x1 = 1",
      "else:",
      "  x2 = 2",
      "y = ? + 4",
    ],
    insight:
      "A renomeacao separa as definicoes, mas o bloco de juncao ainda precisa dizer qual versao vale depois do branch.",
  },
  {
    label: "CFG",
    code: [
      "entry -> then : x1 = 1",
      "entry -> else : x2 = 2",
      "then  -> join",
      "else  -> join",
      "join  -> y = ? + 4",
    ],
    insight:
      "Quando enxergamos predecessores explicitamente, fica claro que a ambiguidade nasce na juncao dos caminhos, nao na instrucao de soma em si.",
  },
  {
    label: "SSA final",
    code: [
      "x0 = input()",
      "then: x1 = 1",
      "else: x2 = 2",
      "join: x3 = phi [x1, then], [x2, else]",
      "y0 = x3 + 4",
    ],
    insight:
      "O phi nao inventa um valor. Ele registra que, ao entrar no bloco `join`, a versao valida depende do predecessor tomado.",
  },
] as const;

const optSteps = [
  {
    label: "Original",
    before: [
      "%a0 = 4",
      "%b0 = add %a0, 2",
      "%c0 = mul %b0, 1",
      "%d0 = add %c0, 0",
      "ret %d0",
    ],
    after: [
      "%a0 = 4",
      "%b0 = add %a0, 2",
      "%c0 = mul %b0, 1",
      "%d0 = add %c0, 0",
      "ret %d0",
    ],
    effect: "Nada foi simplificado ainda; o IR so esta claramente nomeado.",
    metrics: [
      { label: "Constantes expostas", value: "Baixas" },
      { label: "Codigo morto", value: "Nao analisado" },
      { label: "Complexidade local", value: "Maior" },
      { label: "Passo", value: "Base" },
    ],
  },
  {
    label: "Const prop",
    before: [
      "%a0 = 4",
      "%b0 = add %a0, 2",
      "%c0 = mul %b0, 1",
      "%d0 = add %c0, 0",
      "ret %d0",
    ],
    after: [
      "%a0 = 4",
      "%b0 = 6",
      "%c0 = mul 6, 1",
      "%d0 = add %c0, 0",
      "ret %d0",
    ],
    effect: "A constante em `%a0` se propaga e torna o valor de `%b0` imediatamente conhecido.",
    metrics: [
      { label: "Constantes expostas", value: "Medias" },
      { label: "Codigo morto", value: "Aparecendo" },
      { label: "Complexidade local", value: "Menor" },
      { label: "Passo", value: "Propagacao" },
    ],
  },
  {
    label: "Simplificacao",
    before: [
      "%a0 = 4",
      "%b0 = 6",
      "%c0 = mul 6, 1",
      "%d0 = add %c0, 0",
      "ret %d0",
    ],
    after: ["%a0 = 4", "%b0 = 6", "%c0 = 6", "%d0 = 6", "ret 6"],
    effect:
      "Operacoes neutras como multiplicar por 1 e somar 0 deixam de carregar informacao nova.",
    metrics: [
      { label: "Constantes expostas", value: "Altas" },
      { label: "Codigo morto", value: "Muito provavel" },
      { label: "Complexidade local", value: "Baixa" },
      { label: "Passo", value: "Folding" },
    ],
  },
  {
    label: "DCE",
    before: ["%a0 = 4", "%b0 = 6", "%c0 = 6", "%d0 = 6", "ret 6"],
    after: ["ret 6"],
    effect:
      "Se nenhum nome intermediario tem uso observavel restante, a cadeia inteira some e sobra so o retorno relevante.",
    metrics: [
      { label: "Constantes expostas", value: "Maximas" },
      { label: "Codigo morto", value: "Removido" },
      { label: "Complexidade local", value: "Minima" },
      { label: "Passo", value: "Eliminacao" },
    ],
  },
] as const;

type BlockReasonId = "alias" | "call" | "memory" | "loop";

const whyBlockedProfiles: Record<
  BlockReasonId,
  {
    label: string;
    candidate: string;
    blockedBy: string;
    missingProof: string;
    safeCase: string;
  }
> = {
  alias: {
    label: "Aliasing",
    candidate: "Remover um segundo load do mesmo endereco",
    blockedBy:
      "Duas referencias podem apontar para a mesma memoria, entao um store aparentemente distante pode ter mudado o valor lido.",
    missingProof: "Falta provar que os ponteiros nao se sobrepoem ou que ninguem escreveu naquela regiao.",
    safeCase:
      "Com boa alias analysis, o compilador pode cachear o valor em registrador e evitar releitura desnecessaria.",
  },
  call: {
    label: "Chamada desconhecida",
    candidate: "Mover uma leitura para antes de uma call",
    blockedBy:
      "A chamada pode escrever em memoria, observar ordem, lancar excecao ou produzir efeitos que tornam a reordenacao errada.",
    missingProof:
      "Falta conhecer melhor os efeitos da call, por exemplo atributos de pureza, readonly ou noalias.",
    safeCase:
      "Quando a chamada e provadamente sem efeitos relevantes para aquele valor, a movimentacao pode voltar a ser candidata.",
  },
  memory: {
    label: "Memoria observavel",
    candidate: "Eliminar um store que parece redundante",
    blockedBy:
      "Escritas em memoria podem ser observadas por outras partes do programa ou ter significado semantico proprio.",
    missingProof:
      "Falta demonstrar que a escrita nunca sera lida, observada por FFI, atomics ou mecanismos equivalentes.",
    safeCase:
      "Se a memoria e local, nao escapa e nao ha observadores, o store pode se tornar morto.",
  },
  loop: {
    label: "Dependencia de loop",
    candidate: "Vectorizar ou mover calculo para fora do loop",
    blockedBy:
      "Uma iteracao pode depender de resultados produzidos pela anterior, o que impede independencia total.",
    missingProof:
      "Falta garantir ausencia de dependencia carregada pelo loop ou provar associatividade/seguranca extra.",
    safeCase:
      "Sem dependencia entre iteracoes, o compilador ganha espaco para unroll, vectorizacao ou hoisting.",
  },
};

export const interactions = {
  "ssa-to-ssa-lab": SsaToSsaLabInteraction,
  "ssa-opt-steps-lab": SsaOptStepsLabInteraction,
  "ssa-why-blocked-lab": SsaWhyBlockedLabInteraction,
} satisfies LessonModule["interactions"];

function SsaToSsaLabInteraction() {
  const [activeIndex, setActiveIndex] = useState(0);
  const stage = toSsaStages[activeIndex];

  return (
    <InteractiveShell
      eyebrow="To-SSA"
      title="Siga um pequeno trecho ate a forma SSA"
      tone="indigo"
      icon={<Code2 size={18} aria-hidden="true" />}
      description="Avance da superficie do fonte para a IR em SSA e veja por que o phi aparece exatamente no ponto de juncao."
    >
      <div className="grid gap-5 lg:grid-cols-[0.84fr_1.16fr]">
        <div className="grid gap-4">
          <div className="grid gap-3">
            {toSsaStages.map((item, index) => (
              <button
                key={item.label}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`rounded-2xl border px-4 py-3 text-left transition ${
                  activeIndex === index
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-white/70 bg-white text-slate-700 hover:border-slate-300"
                }`}
              >
                <p className="text-xs font-black uppercase tracking-[0.16em] opacity-70">
                  Etapa {index + 1}
                </p>
                <p className="mt-1 text-sm font-black">{item.label}</p>
              </button>
            ))}
          </div>
          <StepDots activeIndex={activeIndex} total={toSsaStages.length} />
        </div>
        <div className="grid gap-4">
          <div className="rounded-3xl border border-indigo-100 bg-white p-5">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-indigo-700">
              Leitura atual
            </p>
            <h4 className="mt-3 font-display text-2xl font-semibold tracking-tight text-slate-950">
              {stage.label}
            </h4>
            <div className="mt-4 rounded-3xl bg-slate-950 p-4">
              <pre className="overflow-x-auto text-sm leading-6 text-slate-100">
                <code>{stage.code.join("\n")}</code>
              </pre>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-600">{stage.insight}</p>
          </div>
          <CalloutCard
            title="Intuicao de phi"
            body="Phi entra no bloco de juncao para nomear o valor que sobrevive dali em diante. Ele nao executa ambos os ramos; ele seleciona a definicao coerente com o predecessor real."
            tone="indigo"
          />
        </div>
      </div>
    </InteractiveShell>
  );
}

function SsaOptStepsLabInteraction() {
  const [activeIndex, setActiveIndex] = useState(0);
  const step = optSteps[activeIndex];

  return (
    <InteractiveShell
      eyebrow="Opt steps"
      title="Acompanhe uma cadeia curta de simplificacoes"
      tone="violet"
      icon={<GitBranch size={18} aria-hidden="true" />}
      description="Veja como uma IR em SSA ajuda um passe a abrir caminho para o proximo, ate sobrar apenas o efeito observavel relevante."
    >
      <div className="grid gap-5 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="grid gap-4">
          <TogglePills
            value={`${activeIndex}`}
            onChange={(value) => setActiveIndex(Number(value))}
            options={optSteps.map((item, index) => ({
              value: `${index}`,
              label: item.label,
            }))}
          />
          <MetricGrid metrics={[...step.metrics]} />
          <CalloutCard
            title="Leitura"
            body={step.effect}
            tone={activeIndex === optSteps.length - 1 ? "emerald" : "violet"}
          />
        </div>
        <div className="grid gap-4">
          <div className="rounded-3xl border border-violet-100 bg-white p-5">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-violet-700">
              Antes
            </p>
            <div className="mt-3 rounded-3xl bg-slate-950 p-4">
              <pre className="overflow-x-auto text-sm leading-6 text-slate-100">
                <code>{step.before.join("\n")}</code>
              </pre>
            </div>
          </div>
          <div className="rounded-3xl border border-violet-100 bg-white p-5">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-violet-700">
              Depois
            </p>
            <div className="mt-3 rounded-3xl bg-slate-950 p-4">
              <pre className="overflow-x-auto text-sm leading-6 text-slate-100">
                <code>{step.after.join("\n")}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </InteractiveShell>
  );
}

function SsaWhyBlockedLabInteraction() {
  const [mode, setMode] = useState<BlockReasonId>("alias");
  const profile = whyBlockedProfiles[mode];

  return (
    <InteractiveShell
      eyebrow="Why blocked?"
      title="Descubra por que o compilador recusa a transformacao"
      tone="emerald"
      icon={<ShieldCheck size={18} aria-hidden="true" />}
      description="Troque o tipo de bloqueio e veja qual prova falta para que uma otimizacao volte a ser segura."
    >
      <div className="grid gap-5 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="grid gap-4">
          <TogglePills
            value={mode}
            onChange={(value) => setMode(value as BlockReasonId)}
            options={[
              { value: "alias", label: "Alias" },
              { value: "call", label: "Call" },
              { value: "memory", label: "Store" },
              { value: "loop", label: "Loop" },
            ]}
          />
          <MetricGrid
            metrics={[
              { label: "Candidato", value: profile.candidate },
              { label: "Bloqueio", value: profile.label },
              { label: "Status", value: "Nao provado" },
              { label: "Pergunta", value: "O que falta provar?" },
            ]}
          />
        </div>
        <div className="grid gap-4">
          <div className="rounded-3xl border border-emerald-100 bg-white p-5">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700">
              Motivo do bloqueio
            </p>
            <h4 className="mt-3 font-display text-2xl font-semibold tracking-tight text-slate-950">
              {profile.candidate}
            </h4>
            <p className="mt-4 text-sm leading-6 text-slate-600">{profile.blockedBy}</p>
          </div>
          <CalloutCard title="Prova ausente" body={profile.missingProof} tone="amber" />
          <CalloutCard
            title="Quando destrava"
            body={profile.safeCase}
            tone="emerald"
          />
        </div>
      </div>
    </InteractiveShell>
  );
}
