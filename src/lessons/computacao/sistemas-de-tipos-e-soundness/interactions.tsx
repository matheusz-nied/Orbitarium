import { useMemo, useState } from "react";
import { Compass, Route, Scale } from "lucide-react";
import type { LessonModule } from "../../../types/content";
import { InteractiveShell } from "../../../components/lesson/InteractionPrimitives";
import {
  CalloutCard,
  MetricGrid,
  RangeField,
  TogglePills,
} from "../sharedPrimitives";

export const interactions = {
  "guarantee-checker": GuaranteeCheckerInteraction,
  "escape-hatch-lab": EscapeHatchLabInteraction,
  "rust-vs-go-lens": RustVsGoLensInteraction,
} satisfies LessonModule["interactions"];

const guarantees = [
  {
    id: "formas-e-operacoes",
    label: "Forma e operação compatíveis",
    claim: "Se um valor tem este tipo, ele não será usado como se fosse de outro formato incompatível.",
    verdict: "Garante bem",
    tone: "emerald" as const,
    typeKnows: "formas, operações e contratos básicos de interface",
    typeMisses: "se o comportamento de negócio faz sentido",
    why: "Esse é o trabalho central de qualquer sistema de tipos estático minimamente útil.",
  },
  {
    id: "dangling-safe-rust",
    label: "Referência dangling em Safe Rust",
    claim: "Nenhuma referência segura continuará válida depois que o dado original deixar de existir.",
    verdict: "Garante se a linguagem modela validade",
    tone: "indigo" as const,
    typeKnows: "lifetime, ownership e regras de borrowing",
    typeMisses: "o que acontece fora da fronteira safe ou em outra linguagem",
    why: "Essa garantia depende de um sistema como o de Rust, que tipa validade e acesso a recursos.",
  },
  {
    id: "bounds",
    label: "Índice sempre em bounds",
    claim: "Todo acesso a vetor ou slice estará dentro dos limites apenas porque o código compila.",
    verdict: "Normalmente não garante",
    tone: "rose" as const,
    typeKnows: "tipo do índice e do contêiner",
    typeMisses: "valor concreto do índice em tempo de execução",
    why: "Sem tipos dependentes ou modelagem extra, bounds costuma continuar como problema de runtime ou de prova local.",
  },
  {
    id: "regra-negocio",
    label: "Regra de negócio correta",
    claim: "Um pedido, pagamento ou protocolo de domínio seguirá a regra certa só porque a API tipou as entradas.",
    verdict: "Não garante",
    tone: "rose" as const,
    typeKnows: "estruturas e estados que você de fato modelou",
    typeMisses: "intenção de negócio não expressa nos tipos",
    why: "Se o domínio não foi modelado de forma rica, o checker não adivinha política operacional ou regra comercial.",
  },
  {
    id: "ffi-contract",
    label: "FFI respeita contrato sozinha",
    claim: "Dados vindos por FFI sempre obedecerão layout, ownership e calling convention corretos apenas pelo type checker local.",
    verdict: "Não garante",
    tone: "rose" as const,
    typeKnows: "o lado local da assinatura que a linguagem consegue enxergar",
    typeMisses: "ABI, layout real, lifetime e contratos do outro runtime",
    why: "A prova fica distribuída entre documentos, wrappers, testes e revisão da fronteira.",
  },
  {
    id: "capacidade-interface",
    label: "Capacidade prometida por interface",
    claim: "Quem recebe uma interface pode contar ao menos com os métodos e capacidades declarados naquela abstração.",
    verdict: "Garante bem",
    tone: "emerald" as const,
    typeKnows: "a superfície mínima prometida pela interface",
    typeMisses: "se a implementação concreta honra expectativas semânticas além da assinatura",
    why: "Interfaces e traits são ótimos para garantir forma de interação, mas não a honestidade total do comportamento.",
  },
];

const hatchProfiles = [
  {
    id: "unsafe-rust",
    label: "unsafe Rust",
    proofMovesTo: "invariantes e precondições documentadas",
    baselineRisk: "UB se a API segura permitir acionar um estado inválido",
    healthyBoundary: "blocos pequenos, módulo privado e contrato `# Safety` explícito",
    why: "O compilador deixa de provar uma operação específica; a abstração ao redor precisa reconstruir a segurança.",
  },
  {
    id: "ffi",
    label: "FFI",
    proofMovesTo: "ABI, layout, ownership e lifetime entre dois mundos",
    baselineRisk: "double free, ponteiros inválidos ou chamada binária incompatível",
    healthyBoundary: "wrapper fino, conversões explícitas e ownership muito bem definido",
    why: "Nenhuma linguagem consegue provar sozinha o que acontece do outro lado da fronteira.",
  },
  {
    id: "reflection",
    label: "reflection / type assertion",
    proofMovesTo: "checagens em runtime e tratamento claro de falha",
    baselineRisk: "panic, caminho dinâmico frágil e perda de legibilidade",
    healthyBoundary: "uso localizado e preferência por contratos estáticos quando possível",
    why: "Quando o tipo concreto só aparece em runtime, parte da garantia estática vira obrigação dinâmica.",
  },
  {
    id: "raw-memory",
    label: "raw pointers / memória crua",
    proofMovesTo: "alinhamento, bounds, inicialização e aliasing corretos",
    baselineRisk: "corrupção de memória e estados impossíveis para o restante do sistema",
    healthyBoundary: "encapsular em abstrações que devolvam uma superfície segura",
    why: "A liberdade de manipular bytes e endereços sem a camada segura cobra provas manuais muito mais duras.",
  },
];

const bugCases = [
  {
    id: "aliasing-mutavel",
    label: "Aliasing mutável incompatível",
    scenario:
      "Uma API tenta manter leituras compartilhadas e escrita exclusiva sobre o mesmo buffer na mesma região lógica do código.",
    rustVerdict: "Frequentemente barrado em compile-time no código safe.",
    rustWhy:
      "Ownership e borrowing modelam exclusividade de mutação e validade de referências como parte do contrato estático.",
    goVerdict: "Não é barrado pelo type system no mesmo nível.",
    goWhy:
      "Go tipa a superfície da API, mas não codifica essa política de aliasing e mutabilidade com a mesma força; desenho, sincronização e testes seguem decisivos.",
    takeaway: "Aqui Rust empurra mais raciocínio para compile-time do que Go.",
  },
  {
    id: "bounds",
    label: "Índice fora do slice",
    scenario:
      "Um índice vem de dado externo e pode ultrapassar o tamanho de um slice ou vetor.",
    rustVerdict: "Normalmente continua sendo problema de runtime ou prova local.",
    rustWhy:
      "O tipo comum do índice não carrega o limite do contêiner por padrão, embora checks seguros façam parte da linguagem.",
    goVerdict: "Também continua sendo problema de runtime.",
    goWhy:
      "A tipagem não prova bounds por padrão; acessos inválidos dependem de checagem em execução.",
    takeaway: "Nem tudo que importa para segurança ou corretude cabe naturalmente no type system básico.",
  },
  {
    id: "type-assertion",
    label: "Abrir uma abstração para descobrir o tipo concreto",
    scenario:
      "O código precisa tratar de forma diferente o valor concreto que está por trás de uma interface ou abstração genérica.",
    rustVerdict: "Muitas APIs preferem enums, match e retornos explícitos; quando há downcast, a falha tende a aparecer de forma tipada.",
    rustWhy:
      "O ecossistema empurra bastante a enumeração explícita de possibilidades, o que reduz a dependência de assertiva dinâmica crua.",
    goVerdict: "Type assertion é idiomática e a forma simples pode panicar em runtime.",
    goWhy:
      "Interfaces carregam tipo dinâmico em runtime; abrir esse valor concreto frequentemente depende de checagem dinâmica.",
    takeaway: "Go aceita mais trabalho dinâmico aqui; Rust costuma preferir codificar alternativas na própria forma do tipo.",
  },
  {
    id: "regra-negocio",
    label: "Regra de negócio ou protocolo de domínio",
    scenario:
      "Um pedido já pago entra novamente na etapa de cobrança ou um protocolo segue uma transição inválida de estado.",
    rustVerdict: "Não é garantido por padrão.",
    rustWhy:
      "Só vira garantia estática se a equipe modelar estados e transições no tipo de forma deliberada.",
    goVerdict: "Também não é garantido por padrão.",
    goWhy:
      "A linguagem oferece structs e interfaces, mas a regra de domínio continua dependendo da modelagem escolhida.",
    takeaway: "Aqui o vencedor não é a linguagem, e sim a qualidade do modelo de domínio que você constrói.",
  },
];

function GuaranteeCheckerInteraction() {
  const [selectedId, setSelectedId] = useState(guarantees[0].id);
  const current = guarantees.find((item) => item.id === selectedId) ?? guarantees[0];

  const verdictStyle = useMemo(() => {
    if (current.tone === "emerald") {
      return "border-emerald-200 bg-emerald-50 text-emerald-700";
    }
    if (current.tone === "indigo") {
      return "border-indigo-200 bg-indigo-50 text-indigo-700";
    }
    return "border-rose-200 bg-rose-50 text-rose-700";
  }, [current.tone]);

  return (
    <InteractiveShell
      eyebrow="Garantias"
      title="Cheque o que o tipo realmente sabe"
      tone="emerald"
      icon={<Scale size={18} aria-hidden="true" />}
      description="Escolha uma afirmação e veja se ela está no alcance natural do sistema de tipos, se depende de modelagem mais rica ou se já caiu fora da prova estática."
    >
      <div className="grid gap-5 lg:grid-cols-[0.86fr_1.14fr]">
        <div className="grid gap-3">
          {guarantees.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedId(item.id)}
              className={`rounded-2xl border px-4 py-3 text-left transition ${
                item.id === current.id
                  ? "border-emerald-600 bg-emerald-600 text-white"
                  : "border-white/70 bg-white text-slate-700 hover:border-emerald-300"
              }`}
            >
              <span className="block text-sm font-black">{item.label}</span>
            </button>
          ))}
        </div>
        <div className="grid gap-4 rounded-3xl bg-white p-5">
          <div className={`rounded-3xl border p-4 ${verdictStyle}`}>
            <p className="text-xs font-black uppercase tracking-[0.16em]">Veredito</p>
            <p className="mt-2 font-display text-2xl font-semibold tracking-tight">
              {current.verdict}
            </p>
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700">
              Afirmação
            </p>
            <p className="mt-2 leading-7 text-slate-700">{current.claim}</p>
          </div>
          <MetricGrid
            metrics={[
              { label: "O tipo enxerga", value: current.typeKnows },
              { label: "O tipo não enxerga", value: current.typeMisses },
            ]}
          />
          <CalloutCard title="Leitura" body={current.why} tone={current.tone} />
        </div>
      </div>
    </InteractiveShell>
  );
}

function EscapeHatchLabInteraction() {
  const [selectedId, setSelectedId] = useState(hatchProfiles[0].id);
  const [surface, setSurface] = useState(2);
  const current = hatchProfiles.find((item) => item.id === selectedId) ?? hatchProfiles[0];

  const surfaceLabel =
    surface === 1
      ? "isolar"
      : surface === 2
        ? "pequena"
        : surface === 3
          ? "média"
          : "espalhada";

  const riskLevel =
    surface === 1
      ? "Auditável"
      : surface === 2
        ? "Controlável"
        : surface === 3
          ? "Sensível"
          : "Perigosa";

  const recommendation =
    surface <= 2
      ? "Boa direção: a área que exige prova manual continua pequena o bastante para revisão séria."
      : "Alerta: quando a fronteira cresce demais, o restante do código perde a capacidade de assumir contratos simples e confiáveis.";

  return (
    <InteractiveShell
      eyebrow="Escape hatch"
      title="Veja para onde a prova se move"
      tone="amber"
      icon={<Compass size={18} aria-hidden="true" />}
      description="Escolha a fronteira e ajuste o tamanho da superfície. O objetivo não é proibir escapes, e sim visualizar como eles deslocam a obrigação de prova."
    >
      <div className="grid gap-5 lg:grid-cols-[0.84fr_1.16fr]">
        <div className="grid gap-4">
          <div className="rounded-3xl border border-amber-100 bg-white p-4">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-amber-700">
              Fronteira
            </p>
            <div className="mt-3">
              <TogglePills
                value={selectedId}
                onChange={setSelectedId}
                options={hatchProfiles.map((item) => ({
                  value: item.id,
                  label: item.label,
                }))}
              />
            </div>
          </div>
          <RangeField
            label="Tamanho da superfície manual"
            value={surface}
            min={1}
            max={4}
            step={1}
            onChange={setSurface}
            hint="1 = bem isolada; 4 = espalhada pela base. Quanto maior a superfície, mais lugares precisam raciocinar manualmente sobre o contrato."
          />
          <MetricGrid
            metrics={[
              { label: "Superfície", value: surfaceLabel },
              { label: "Risco global", value: riskLevel },
              { label: "Prova vai para", value: current.proofMovesTo },
              { label: "Risco base", value: current.baselineRisk },
            ]}
          />
        </div>
        <div className="grid gap-4 rounded-3xl bg-white p-5">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-amber-700">
              Por que esta fronteira existe
            </p>
            <p className="mt-2 leading-7 text-slate-700">{current.why}</p>
          </div>
          <div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-4">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700">
              Fronteira saudável
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              {current.healthyBoundary}
            </p>
          </div>
          <CalloutCard
            title="Leitura operacional"
            body={recommendation}
            tone={surface <= 2 ? "emerald" : "rose"}
          />
        </div>
      </div>
    </InteractiveShell>
  );
}

function RustVsGoLensInteraction() {
  const [selectedId, setSelectedId] = useState(bugCases[0].id);
  const current = bugCases.find((item) => item.id === selectedId) ?? bugCases[0];

  return (
    <InteractiveShell
      eyebrow="Comparação"
      title="Troque a lente entre Rust e Go"
      tone="indigo"
      icon={<Route size={18} aria-hidden="true" />}
      description="Escolha uma classe de bug ou de contrato. Compare quem captura mais cedo, quem depende de runtime e onde nenhuma das duas linguagens resolve tudo sozinha."
    >
      <div className="grid gap-5 lg:grid-cols-[0.84fr_1.16fr]">
        <div className="grid gap-3">
          {bugCases.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedId(item.id)}
              className={`rounded-2xl border px-4 py-3 text-left transition ${
                item.id === current.id
                  ? "border-indigo-600 bg-indigo-600 text-white"
                  : "border-white/70 bg-white text-slate-700 hover:border-indigo-300"
              }`}
            >
              <span className="block text-sm font-black">{item.label}</span>
            </button>
          ))}
        </div>
        <div className="grid gap-4 rounded-3xl bg-white p-5">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-indigo-700">
              Cenário
            </p>
            <p className="mt-2 leading-7 text-slate-700">{current.scenario}</p>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-3xl border border-violet-100 bg-violet-50 p-4">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-violet-700">
                Rust
              </p>
              <p className="mt-2 font-display text-xl font-semibold tracking-tight text-slate-950">
                {current.rustVerdict}
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-700">{current.rustWhy}</p>
            </div>
            <div className="rounded-3xl border border-sky-100 bg-sky-50 p-4">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-sky-700">
                Go
              </p>
              <p className="mt-2 font-display text-xl font-semibold tracking-tight text-slate-950">
                {current.goVerdict}
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-700">{current.goWhy}</p>
            </div>
          </div>
          <CalloutCard title="Síntese" body={current.takeaway} tone="indigo" />
        </div>
      </div>
    </InteractiveShell>
  );
}
