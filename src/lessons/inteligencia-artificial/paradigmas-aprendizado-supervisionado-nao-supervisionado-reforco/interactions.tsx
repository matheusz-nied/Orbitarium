import { useState } from "react";
import { GitBranch, Layers3, Tags, Trophy } from "lucide-react";
import type { LessonModule } from "../../../types/content";
import {
  InteractiveShell,
  MetricCard,
} from "../../../components/lesson/InteractionPrimitives";

export const interactions = {
  "paradigm-selector": ParadigmSelectorInteraction,
  "signal-setup-comparator": SignalSetupComparatorInteraction,
  "same-problem-three-views": SameProblemThreeViewsInteraction,
} satisfies LessonModule["interactions"];

const problems = [
  {
    id: "spam",
    title: "Filtrar spam em e-mails",
    cue: "Há exemplos antigos marcados como spam ou não spam.",
    paradigm: "Supervisionado",
    why: "Existe um rótulo claro para cada mensagem. O modelo aprende a mapear features para a resposta correta.",
  },
  {
    id: "clientes",
    title: "Segmentar clientes por comportamento",
    cue: "Há histórico de navegação e compras, mas sem grupos definidos de antemão.",
    paradigm: "Não supervisionado",
    why: "Queremos descobrir estrutura latente, como segmentos ou grupos parecidos, sem rótulo correto fornecido.",
  },
  {
    id: "robo",
    title: "Treinar um robô para atravessar um labirinto",
    cue: "A cada ação, o robô recebe progresso, punição ou recompensa ao longo do caminho.",
    paradigm: "Reforço",
    why: "A aprendizagem acontece por tentativa, erro e retorno acumulado, não por resposta pronta para cada passo.",
  },
  {
    id: "precos",
    title: "Prever preço de aluguel",
    cue: "Cada imóvel histórico vem com características e preço final negociado.",
    paradigm: "Supervisionado",
    why: "O alvo é um valor conhecido. O modelo aprende uma função que aproxima features e preço.",
  },
  {
    id: "anomalias",
    title: "Encontrar padrões estranhos em transações",
    cue: "Há muitos dados, mas poucos casos confiáveis rotulados de fraude.",
    paradigm: "Não supervisionado",
    why: "Sem rótulos suficientes, faz sentido buscar pontos incomuns, grupos raros ou estrutura fora do padrão.",
  },
] as const;

type Problem = (typeof problems)[number];
type ProblemId = Problem["id"];

function ParadigmSelectorInteraction() {
  const [selectedId, setSelectedId] = useState<ProblemId>(problems[0].id);
  const selected: Problem =
    problems.find((item) => item.id === selectedId) ?? problems[0];

  return (
    <InteractiveShell
      eyebrow="Escolha"
      title="Que paradigma combina com este problema?"
      tone="indigo"
      icon={<GitBranch size={18} aria-hidden="true" />}
      description="Escolha um cenário. A pergunta central é sempre: qual tipo de feedback ou estrutura está disponível para aprender?"
    >
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-2">
          {problems.map((problem) => (
            <button
              className={`rounded-2xl px-4 py-3 text-left transition ${
                selected.id === problem.id
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-slate-700 hover:bg-indigo-50"
              }`}
              key={problem.id}
              type="button"
              onClick={() => setSelectedId(problem.id)}
            >
              <span className="block text-sm font-black">{problem.title}</span>
              <span className={`mt-1 block text-xs ${selected.id === problem.id ? "text-indigo-100" : "text-slate-500"}`}>
                {problem.cue}
              </span>
            </button>
          ))}
        </div>

        <div className="grid gap-4">
          <div className="rounded-3xl bg-white p-5">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-indigo-700">
              Paradigma recomendado
            </p>
            <h4 className="mt-2 font-display text-3xl font-semibold tracking-tight text-slate-950">
              {selected.paradigm}
            </h4>
            <p className="mt-4 text-sm leading-6 text-slate-700">{selected.why}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <MetricCard
              label="Há rótulo?"
              value={selected.paradigm === "Supervisionado" ? "Sim" : "Não / incompleto"}
            />
            <MetricCard
              label="Objetivo"
              value={
                selected.paradigm === "Supervisionado"
                  ? "Prever"
                  : selected.paradigm === "Não supervisionado"
                    ? "Descobrir estrutura"
                    : "Agir"
              }
            />
            <MetricCard
              label="Feedback"
              value={
                selected.paradigm === "Reforço"
                  ? "Recompensa"
                  : selected.paradigm === "Supervisionado"
                    ? "Resposta correta"
                    : "Sem resposta pronta"
              }
            />
          </div>
          <div className="rounded-3xl border border-indigo-200 bg-indigo-50 p-4">
            <p className="text-sm leading-6 text-slate-700">
              Dica prática: o algoritmo vem depois. Primeiro descubra se você tem exemplos com resposta, se quer descobrir grupos sem resposta, ou se o sistema aprende agindo ao longo do tempo.
            </p>
          </div>
        </div>
      </div>
    </InteractiveShell>
  );
}

const setups = {
  spam: {
    title: "Filtro de spam",
    variants: {
      supervisionado: {
        input: "mensagem + remetente + links + palavras",
        signal: "rótulo: spam ou legítima",
        output: "prever a classe da próxima mensagem",
      },
      naoSupervisionado: {
        input: "mensagem + remetente + links + palavras",
        signal: "nenhum rótulo confiável",
        output: "agrupar mensagens parecidas ou destacar outliers",
      },
      reforco: {
        input: "estado atual da caixa de entrada",
        signal: "recompensa se o usuário não corrigir a ação depois",
        output: "escolher ação com melhor efeito acumulado",
      },
    },
  },
  musica: {
    title: "Aplicativo de música",
    variants: {
      supervisionado: {
        input: "perfil do usuário + faixa atual + contexto",
        signal: "rótulo: pulou ou ouviu até o fim",
        output: "prever se a próxima faixa agradará",
      },
      naoSupervisionado: {
        input: "características das faixas e sessões",
        signal: "nenhum rótulo de gosto explícito",
        output: "descobrir grupos de músicas e perfis de uso",
      },
      reforco: {
        input: "estado da sessão de escuta",
        signal: "recompensa baseada em retenção e satisfação ao longo da sessão",
        output: "escolher a faixa que maximiza valor futuro",
      },
    },
  },
  robo: {
    title: "Robô aspirador",
    variants: {
      supervisionado: {
        input: "mapa + sensores + posição",
        signal: "trajetórias corretas anotadas por especialistas",
        output: "imitar a ação sugerida em cada situação",
      },
      naoSupervisionado: {
        input: "leituras de sensores e mapas",
        signal: "sem resposta correta passo a passo",
        output: "descobrir regiões ou estados recorrentes do ambiente",
      },
      reforco: {
        input: "estado do ambiente e bateria",
        signal: "recompensa por limpar mais gastando menos tempo e energia",
        output: "aprender política de navegação",
      },
    },
  },
} as const;

type SetupKey = keyof typeof setups;

function SignalSetupComparatorInteraction() {
  const [setupKey, setSetupKey] = useState<SetupKey>("spam");
  const setup = setups[setupKey];

  return (
    <InteractiveShell
      eyebrow="Comparação"
      title="O mesmo domínio pode gerar sinais bem diferentes"
      tone="teal"
      icon={<Tags size={18} aria-hidden="true" />}
      description="Troque o domínio e compare como o problema muda quando você tem rótulos, só estrutura nos dados ou recompensa ao longo do tempo."
    >
      <div className="grid gap-5">
        <div className="flex flex-wrap gap-2">
          {(Object.keys(setups) as SetupKey[]).map((key) => (
            <button
              className={`rounded-full px-4 py-2 text-sm font-black transition ${
                key === setupKey
                  ? "bg-teal-600 text-white"
                  : "bg-white text-slate-700 hover:bg-teal-50"
              }`}
              key={key}
              type="button"
              onClick={() => setSetupKey(key)}
            >
              {setups[key].title}
            </button>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <SignalCard
            tone="indigo"
            title="Supervisionado"
            signalType="resposta correta"
            {...setup.variants.supervisionado}
          />
          <SignalCard
            tone="amber"
            title="Não supervisionado"
            signalType="estrutura sem rótulos"
            {...setup.variants.naoSupervisionado}
          />
          <SignalCard
            tone="emerald"
            title="Reforço"
            signalType="recompensa ao longo do tempo"
            {...setup.variants.reforco}
          />
        </div>
      </div>
    </InteractiveShell>
  );
}

const domainViews = [
  {
    id: "ecommerce",
    title: "E-commerce",
    supervised: "Prever se o cliente vai recomprar nos próximos dias.",
    unsupervised: "Descobrir segmentos de clientes por comportamento de navegação e compra.",
    reinforcement: "Escolher qual oferta mostrar agora pensando no valor de vida do cliente, não só no clique imediato.",
  },
  {
    id: "hospital",
    title: "Hospital",
    supervised: "Estimar risco de readmissão usando histórico clínico.",
    unsupervised: "Agrupar perfis de pacientes para investigar subtipos ou fluxos de atendimento.",
    reinforcement: "Ajustar política de agendamento ou alocação em um processo sequencial com múltiplas decisões.",
  },
  {
    id: "transito",
    title: "Trânsito urbano",
    supervised: "Prever congestionamento a partir de dados históricos e sensores.",
    unsupervised: "Descobrir padrões recorrentes de fluxo em bairros e horários.",
    reinforcement: "Controlar semáforos para otimizar tempo médio de deslocamento ao longo do dia.",
  },
] as const;

type DomainView = (typeof domainViews)[number];
type DomainViewId = DomainView["id"];

function SameProblemThreeViewsInteraction() {
  const [domainId, setDomainId] = useState<DomainViewId>(domainViews[0].id);
  const domain: DomainView =
    domainViews.find((item) => item.id === domainId) ?? domainViews[0];

  return (
    <InteractiveShell
      eyebrow="Reenquadramento"
      title="O paradigma muda a pergunta, não só o algoritmo"
      tone="amber"
      icon={<Trophy size={18} aria-hidden="true" />}
      description="Escolha um domínio e veja como a mesma realidade pode ser transformada em três tarefas bem diferentes."
    >
      <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="grid gap-2">
          {domainViews.map((item) => (
            <button
              className={`rounded-2xl px-4 py-3 text-left text-sm font-black transition ${
                item.id === domain.id
                  ? "bg-amber-500 text-white"
                  : "bg-white text-slate-700 hover:bg-amber-50"
              }`}
              key={item.id}
              type="button"
              onClick={() => setDomainId(item.id)}
            >
              {item.title}
            </button>
          ))}
        </div>

        <div className="grid gap-4">
          <ParadigmViewCard
            color="indigo"
            title="Pergunta supervisionada"
            body={domain.supervised}
          />
          <ParadigmViewCard
            color="violet"
            title="Pergunta não supervisionada"
            body={domain.unsupervised}
          />
          <ParadigmViewCard
            color="emerald"
            title="Pergunta por reforço"
            body={domain.reinforcement}
          />
        </div>
      </div>
    </InteractiveShell>
  );
}

function SignalCard({
  title,
  signalType,
  input,
  signal,
  output,
  tone,
}: {
  title: string;
  signalType: string;
  input: string;
  signal: string;
  output: string;
  tone: "indigo" | "amber" | "emerald";
}) {
  const styles = {
    indigo: "border-indigo-200 bg-indigo-50 text-indigo-700",
    amber: "border-amber-200 bg-amber-50 text-amber-700",
    emerald: "border-emerald-200 bg-emerald-50 text-emerald-700",
  } as const;

  return (
    <article className={`rounded-3xl border p-4 ${styles[tone]}`}>
      <p className="text-xs font-black uppercase tracking-[0.18em]">{title}</p>
      <p className="mt-2 text-xs font-black uppercase tracking-[0.14em] opacity-75">
        Sinal: {signalType}
      </p>
      <div className="mt-4 grid gap-3 text-sm leading-6 text-slate-700">
        <p><strong>Entrada:</strong> {input}</p>
        <p><strong>Aprende com:</strong> {signal}</p>
        <p><strong>Saída esperada:</strong> {output}</p>
      </div>
    </article>
  );
}

function ParadigmViewCard({
  color,
  title,
  body,
}: {
  color: "indigo" | "violet" | "emerald";
  title: string;
  body: string;
}) {
  const styles = {
    indigo: "border-indigo-200 bg-indigo-50 text-indigo-700",
    violet: "border-violet-200 bg-violet-50 text-violet-700",
    emerald: "border-emerald-200 bg-emerald-50 text-emerald-700",
  } as const;

  return (
    <article className={`rounded-3xl border p-5 ${styles[color]}`}>
      <div className="flex items-start gap-3">
        <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-white">
          <Layers3 size={18} aria-hidden="true" />
        </span>
        <div>
          <h4 className="font-display text-2xl font-semibold tracking-tight text-slate-950">
            {title}
          </h4>
          <p className="mt-2 text-sm leading-6 text-slate-700">{body}</p>
        </div>
      </div>
    </article>
  );
}
