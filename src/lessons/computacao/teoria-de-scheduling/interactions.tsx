import { useMemo, useState } from "react";
import { ArrowRightLeft, Gauge, Siren, TimerReset } from "lucide-react";
import type { LessonModule } from "../../../types/content";
import { InteractiveShell } from "../../../components/lesson/InteractionPrimitives";
import {
  CalloutCard,
  MetricGrid,
  RangeField,
  TogglePills,
} from "../sharedPrimitives";

type WorkloadId = "mixed" | "uniform" | "interactive";
type PolicyId = "fifo" | "sjf" | "rr";
type GoalId = "interactive" | "batch" | "fairness" | "locality";

const workloadProfiles: Record<
  WorkloadId,
  {
    label: string;
    summary: string;
    jobs: string[];
    policies: Record<
      PolicyId,
      {
        firstResponse: string;
        turnaround: string;
        fairness: string;
        contextSwitches: string;
        headline: string;
        takeaway: string;
      }
    >;
  }
> = {
  mixed: {
    label: "Dois curtos e um longo",
    summary:
      "Cenario classico do OSTEP: um job longo cedo na fila pode piorar bastante a vida dos jobs curtos.",
    jobs: ["Longo", "Curto A", "Curto B"],
    policies: {
      fifo: {
        firstResponse: "Ruim para os curtos",
        turnaround: "Fraco na media",
        fairness: "Baixa sob assimetria",
        contextSwitches: "Baixos",
        headline: "O job longo na frente vira um muro para o resto da fila.",
        takeaway:
          "FIFO simplifica a ordem, mas deixa jobs curtos pagando por quem chegou antes.",
      },
      sjf: {
        firstResponse: "Melhor para curtos",
        turnaround: "Muito bom na media",
        fairness: "Questionavel para longos",
        contextSwitches: "Baixos",
        headline: "SJF favorece jobs curtos e melhora a media agregada rapidamente.",
        takeaway:
          "Quando o sistema conhece duracoes, SJF tende a reduzir turnaround medio, mas pode castigar jobs longos.",
      },
      rr: {
        firstResponse: "Bom",
        turnaround: "Intermediario",
        fairness: "Boa",
        contextSwitches: "Medios",
        headline: "Round Robin devolve visibilidade cedo para todos, inclusive os curtos.",
        takeaway:
          "A politica troca alguma eficiencia de media por uma distribuicao mais responsiva do tempo.",
      },
    },
  },
  uniform: {
    label: "Todos parecidos",
    summary:
      "Quando os jobs tem tamanhos proximos, a vantagem estrutural de SJF diminui e a diferenca entre politicas muda de foco.",
    jobs: ["Job A", "Job B", "Job C"],
    policies: {
      fifo: {
        firstResponse: "Previsivel",
        turnaround: "Razoavel",
        fairness: "Razoavel",
        contextSwitches: "Baixos",
        headline: "Como os tamanhos sao proximos, FIFO parece menos injusto do que no cenario misto.",
        takeaway:
          "A dor de FIFO cresce quando existe grande assimetria entre quem entra na fila.",
      },
      sjf: {
        firstResponse: "Parecido com FIFO",
        turnaround: "Levemente melhor",
        fairness: "Parecida",
        contextSwitches: "Baixos",
        headline: "Sem grande diferenca de tamanho, SJF perde parte do seu brilho.",
        takeaway:
          "A politica ainda funciona, mas seu ganho principal depende de assimetria relevante entre jobs.",
      },
      rr: {
        firstResponse: "Bom",
        turnaround: "Razoavel",
        fairness: "Boa",
        contextSwitches: "Medios",
        headline: "Round Robin continua protegendo visibilidade sem enfrentar um job claramente dominante.",
        takeaway:
          "Aqui a principal troca e custo de preempcao versus sensacao de justica temporal.",
      },
    },
  },
  interactive: {
    label: "Bursts interativos",
    summary:
      "Varios jobs pequenos querem voltar ao usuario cedo, mesmo que nenhum deles seja enorme no total.",
    jobs: ["UI", "API", "Batch"],
    policies: {
      fifo: {
        firstResponse: "Fragil",
        turnaround: "Aceitavel",
        fairness: "Baixa para quem chegou depois",
        contextSwitches: "Baixos",
        headline: "Uma tarefa pouco cooperativa consegue empurrar respostas curtas para tras.",
        takeaway:
          "O problema central aqui nao e so terminar; e nao deixar a interface parecer congelada.",
      },
      sjf: {
        firstResponse: "Bom se o sistema adivinhar bem",
        turnaround: "Bom",
        fairness: "Dependente da estimativa",
        contextSwitches: "Baixos",
        headline: "Se os bursts curtos forem reconhecidos, a experiencia melhora bastante.",
        takeaway:
          "Na pratica, o desafio e que o scheduler raramente conhece perfeitamente o tamanho futuro do trabalho.",
      },
      rr: {
        firstResponse: "Muito bom",
        turnaround: "Bom o suficiente",
        fairness: "Alta",
        contextSwitches: "Mais altos",
        headline: "Round Robin foi feito para este tipo de pressao por responsividade.",
        takeaway:
          "A politica protege interatividade ao aceitar mais trocas de contexto e menos monopolio.",
      },
    },
  },
};

const goalProfiles: Record<
  GoalId,
  {
    label: string;
    recommendation: string;
    protect: string;
    caution: string;
    metrics: Array<{ label: string; value: string }>;
  }
> = {
  interactive: {
    label: "Latencia interativa",
    recommendation: "Preferir politicas preemptivas com boa resposta inicial",
    protect: "O usuario percebe atraso cedo, entao response time e cauda pesam muito.",
    caution: "Aceite algum overhead extra; insistir em media perfeita pode piorar sensacao de travamento.",
    metrics: [
      { label: "Foco", value: "Response time" },
      { label: "Politica-alvo", value: "RR / MLFQ" },
      { label: "Risco", value: "Overhead" },
      { label: "Pergunta-chave", value: "Quem fica invisivel?" },
    ],
  },
  batch: {
    label: "Lote batch",
    recommendation: "Priorizar bom turnaround agregado e uso consistente de CPU",
    protect: "O conjunto dos jobs importa mais do que a primeira resposta de cada um.",
    caution: "Melhor media nao significa politica universal; jobs longos podem sofrer se a regra favorecer demais os curtos.",
    metrics: [
      { label: "Foco", value: "Turnaround" },
      { label: "Politica-alvo", value: "SJF / batch-friendly" },
      { label: "Risco", value: "Injustica localizada" },
      { label: "Pergunta-chave", value: "Qual e o custo medio?" },
    ],
  },
  fairness: {
    label: "Compartilhamento justo",
    recommendation: "Escolher politicas que evitem fome e acompanhem quanto cada um recebeu",
    protect: "Ambientes compartilhados sofrem quando uma fila vira hierarquia invisivel de privilegiados.",
    caution: "Fairness pura pode reduzir localidade ou throughput maximo em certos cenarios.",
    metrics: [
      { label: "Foco", value: "Fairness" },
      { label: "Politica-alvo", value: "CFS/EEVDF / aging" },
      { label: "Risco", value: "Perder locality" },
      { label: "Pergunta-chave", value: "Quem esperou demais?" },
    ],
  },
  locality: {
    label: "Afinidade e cache",
    recommendation: "Evitar migracao inutil e deixar trabalhos quentes reaproveitarem estado local",
    protect: "Em multicore, mover menos pode valer mais do que equilibrar demais no papel.",
    caution: "Afinidade absoluta pode deixar filas desbalanceadas e desperdiçar CPU global.",
    metrics: [
      { label: "Foco", value: "Cache affinity" },
      { label: "Politica-alvo", value: "Filas por CPU" },
      { label: "Risco", value: "Desequilibrio" },
      { label: "Pergunta-chave", value: "Vale migrar?" },
    ],
  },
};

export const interactions = {
  "scheduling-policy-lab": SchedulingPolicyLabInteraction,
  "scheduling-starvation-demo": SchedulingStarvationDemoInteraction,
  "scheduling-goal-selector": SchedulingGoalSelectorInteraction,
} satisfies LessonModule["interactions"];

function SchedulingPolicyLabInteraction() {
  const [workload, setWorkload] = useState<WorkloadId>("mixed");
  const [policy, setPolicy] = useState<PolicyId>("rr");

  const profile = useMemo(() => workloadProfiles[workload], [workload]);
  const result = profile.policies[policy];

  return (
    <InteractiveShell
      eyebrow="Policy lab"
      title="Aplique politicas diferentes sobre a mesma carga"
      tone="indigo"
      icon={<ArrowRightLeft size={18} aria-hidden="true" />}
      description="Troque o perfil de workload e compare como FIFO, SJF e Round Robin protegem metricas diferentes."
    >
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-4">
          <div className="rounded-3xl border border-indigo-100 bg-white p-4">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-indigo-700">
              Workload
            </p>
            <div className="mt-3">
              <TogglePills
                value={workload}
                onChange={(value) => setWorkload(value as WorkloadId)}
                options={[
                  { value: "mixed", label: "Curtos + longo" },
                  { value: "uniform", label: "Todos parecidos" },
                  { value: "interactive", label: "Interativo" },
                ]}
              />
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-600">{profile.summary}</p>
          </div>
          <div className="rounded-3xl border border-indigo-100 bg-white p-4">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-indigo-700">
              Politica
            </p>
            <div className="mt-3">
              <TogglePills
                value={policy}
                onChange={(value) => setPolicy(value as PolicyId)}
                options={[
                  { value: "fifo", label: "FIFO" },
                  { value: "sjf", label: "SJF" },
                  { value: "rr", label: "Round Robin" },
                ]}
              />
            </div>
          </div>
          <MetricGrid
            metrics={[
              { label: "Primeira resposta", value: result.firstResponse },
              { label: "Turnaround", value: result.turnaround },
              { label: "Fairness", value: result.fairness },
              { label: "Trocas de contexto", value: result.contextSwitches },
            ]}
          />
        </div>
        <div className="grid gap-4">
          <div className="rounded-3xl border border-indigo-100 bg-white p-5">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-indigo-700">
              Fila observada
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {profile.jobs.map((job, index) => (
                <div
                  key={job}
                  className={`rounded-2xl px-4 py-3 text-sm font-black ${
                    index === 0 && policy === "fifo"
                      ? "bg-slate-950 text-white"
                      : index !== 0 && policy === "sjf" && workload !== "uniform"
                        ? "bg-emerald-100 text-emerald-800"
                        : policy === "rr"
                          ? "bg-violet-100 text-violet-800"
                          : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {job}
                </div>
              ))}
            </div>
            <h4 className="mt-5 font-display text-2xl font-semibold tracking-tight text-slate-950">
              {result.headline}
            </h4>
            <p className="mt-3 text-sm leading-6 text-slate-600">{result.takeaway}</p>
          </div>
          <CalloutCard
            title="Leitura"
            body={
              policy === "sjf"
                ? "SJF brilha quando jobs curtos podem ser distinguidos. Sem boa estimativa, a elegancia teorica fica menos acionavel."
                : policy === "fifo"
                  ? "FIFO e simples de explicar e implementar, mas o primeiro da fila define o destino dos demais."
                  : "Round Robin introduz preempcao para devolver visibilidade temporal a toda a fila."
            }
            tone={policy === "rr" ? "violet" : policy === "sjf" ? "emerald" : "indigo"}
          />
        </div>
      </div>
    </InteractiveShell>
  );
}

function SchedulingStarvationDemoInteraction() {
  const [urgentArrivals, setUrgentArrivals] = useState(3);
  const [aging, setAging] = useState("off");

  const starves = aging === "off" && urgentArrivals >= 3;
  const lowPriorityChance =
    aging === "on" ? "Cresce com o tempo" : urgentArrivals >= 4 ? "Quase nula" : "Baixa";

  return (
    <InteractiveShell
      eyebrow="Starvation demo"
      title="Veja quando prioridade vira fome"
      tone="rose"
      icon={<Siren size={18} aria-hidden="true" />}
      description="Aumente a chegada de tarefas urgentes e ative aging para observar quando um job menos prioritario deixa de ser invisivel."
    >
      <div className="grid gap-5 lg:grid-cols-[0.88fr_1.12fr]">
        <div className="grid gap-4">
          <RangeField
            label="Novas chegadas de alta prioridade"
            value={urgentArrivals}
            min={0}
            max={5}
            step={1}
            onChange={setUrgentArrivals}
            hint="Cada nova chegada urgente entra na frente do job que ja esperava."
          />
          <div className="rounded-3xl border border-rose-100 bg-white p-4">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-rose-700">
              Correcao de fairness
            </p>
            <div className="mt-3">
              <TogglePills
                value={aging}
                onChange={setAging}
                options={[
                  { value: "off", label: "Sem aging" },
                  { value: "on", label: "Com aging" },
                ]}
              />
            </div>
          </div>
          <MetricGrid
            metrics={[
              { label: "Urgentes na frente", value: `${urgentArrivals}` },
              { label: "Chance do job humilde", value: lowPriorityChance },
              { label: "Risco de starvation", value: starves ? "Alto" : "Controlado" },
              { label: "Politica", value: aging === "on" ? "Prioridade + aging" : "Prioridade pura" },
            ]}
          />
        </div>
        <div className="grid gap-4">
          <div className="rounded-3xl border border-rose-100 bg-white p-5">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-rose-700">
              Fila simplificada
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {Array.from({ length: urgentArrivals }).map((_, index) => (
                <span
                  key={index}
                  className="rounded-full bg-rose-100 px-3 py-2 text-xs font-black text-rose-700"
                >
                  Urgente {index + 1}
                </span>
              ))}
              <span
                className={`rounded-full px-3 py-2 text-xs font-black ${
                  starves ? "bg-slate-200 text-slate-500" : "bg-emerald-100 text-emerald-800"
                }`}
              >
                Job antigo
              </span>
            </div>
            <h4 className="mt-5 font-display text-2xl font-semibold tracking-tight text-slate-950">
              {starves
                ? "A fila continua achando um motivo para adiar o mesmo job."
                : "A politica abre uma janela para quem ja esperou bastante."}
            </h4>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              {aging === "on"
                ? "Com aging, o tempo de espera passa a contar como argumento de prioridade. O objetivo nao e abolir urgencia, e impedir fome indefinida."
                : "Sem aging, prioridade fixa resolve urgencia local, mas nao tem memoria moral do sofrimento acumulado na fila."}
            </p>
          </div>
          <CalloutCard
            title={starves ? "Starvation detectado" : "Starvation mitigado"}
            body={
              starves
                ? "O job de baixa prioridade continua pronto, mas a regra sempre encontra alguem mais importante para rodar antes."
                : "A politica ainda reconhece urgencia, porem admite que espera longa tambem merece virar sinal relevante."
            }
            tone={starves ? "rose" : "emerald"}
          />
        </div>
      </div>
    </InteractiveShell>
  );
}

function SchedulingGoalSelectorInteraction() {
  const [goal, setGoal] = useState<GoalId>("interactive");
  const profile = goalProfiles[goal];

  return (
    <InteractiveShell
      eyebrow="Goal selector"
      title="Escolha o objetivo antes de escolher a politica"
      tone="emerald"
      icon={<Gauge size={18} aria-hidden="true" />}
      description="Selecione o sofrimento que voce quer evitar e veja qual familia de scheduler ganha relevancia."
    >
      <div className="grid gap-5 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="grid gap-4">
          <TogglePills
            value={goal}
            onChange={(value) => setGoal(value as GoalId)}
            options={[
              { value: "interactive", label: "Interativo" },
              { value: "batch", label: "Batch" },
              { value: "fairness", label: "Fairness" },
              { value: "locality", label: "Afinidade" },
            ]}
          />
          <MetricGrid metrics={profile.metrics} />
        </div>
        <div className="grid gap-4">
          <div className="rounded-3xl border border-emerald-100 bg-white p-5">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700">
              Objetivo selecionado
            </p>
            <h4 className="mt-3 font-display text-3xl font-semibold tracking-tight text-slate-950">
              {profile.label}
            </h4>
            <p className="mt-3 text-sm leading-6 text-slate-600">{profile.protect}</p>
            <div className="mt-5 rounded-3xl bg-emerald-50 p-4">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700">
                Recomendacao conceitual
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-700">{profile.recommendation}</p>
            </div>
          </div>
          <CalloutCard title="Cuidado" body={profile.caution} tone="amber" />
          <CalloutCard
            title="Resumo operacional"
            body="Pergunte primeiro qual metrica precisa ser protegida. A politica certa quase sempre cai dessa resposta, e nao de uma preferencia estetica por uma sigla."
            tone="emerald"
          />
        </div>
      </div>
    </InteractiveShell>
  );
}
