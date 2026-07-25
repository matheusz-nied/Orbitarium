import { useMemo, useState } from "react";
import { Bug, Shield, Shuffle } from "lucide-react";
import type { LessonModule } from "../../../types/content";
import {
  InteractiveShell,
  MetricCard,
} from "../../../components/lesson/InteractionPrimitives";

type SimulatorModeId = string;

interface SimulatorMode {
  id: SimulatorModeId;
  label: string;
  status: string;
  takeaway: string;
  observations: string[];
}

interface SimulatorScenario {
  id: string;
  name: string;
  setup: string;
  question: string;
  modes: SimulatorMode[];
}

interface ChoiceScenario {
  name: string;
  situation: string;
  options: Array<"relaxed" | "acqrel" | "seqcst" | "mutex">;
  recommended: "relaxed" | "acqrel" | "seqcst" | "mutex";
  why: string;
  caution: string;
}

interface BugCase {
  name: string;
  symptom: string;
  details: string;
  likelyCause: "publicacao" | "estado-composto" | "nao-ordering";
  explanation: string;
}

const simulatorScenarios: SimulatorScenario[] = [
  {
    id: "publish-flag",
    name: "Payload + ready flag",
    setup:
      "Uma thread prepara um payload em memoria comum e depois sinaliza 'pronto'. Outra le a flag e, em seguida, usa o payload.",
    question: "Que observacoes o consumidor ainda pode ter em cada modo?",
    modes: [
      {
        id: "unsync",
        label: "Sem sincronizacao valida",
        status: "stale read permitido",
        takeaway:
          "Nada obriga a flag a carregar junto todos os efeitos do payload. O consumidor pode ver o sinal sem ter direito a ver o estado completo.",
        observations: [
          "flag=true e payload ainda velho pode ser observavel",
          "testes locais podem passar mesmo com contrato quebrado",
          "o bug costuma aparecer como leitura rara e dificil de reproduzir",
        ],
      },
      {
        id: "acqrel",
        label: "Release no produtor + Acquire no consumidor",
        status: "publicacao-consumo coerente",
        takeaway:
          "Quando o consumidor observa o valor publicado, ele passa a ter o direito de ver os efeitos anteriores do produtor ligados a essa publicacao.",
        observations: [
          "observar a flag publicada passa a carregar o payload correspondente",
          "a borda de happens-before fica explicita",
          "o modelo continua conceitual: ainda depende de parear a variavel certa",
        ],
      },
      {
        id: "mutex",
        label: "Mutex / canal / sincronizacao de mais alto nivel",
        status: "contrato mais amplo",
        takeaway:
          "Quando o estado tem mais de um campo ou invariantes mais ricos, subir de abstracao costuma simplificar a prova e a revisao.",
        observations: [
          "payload e sinal passam a viajar dentro de um contrato mais estruturado",
          "o custo cognitivo cai para quem revisa o codigo",
          "e a opcao madura quando a historia ja nao cabe em uma flag simples",
        ],
      },
    ],
  },
  {
    id: "store-buffering",
    name: "Store buffering conceitual",
    setup:
      "Thread A escreve em x e depois le y. Thread B escreve em y e depois le x. O interesse e saber que pares de leituras ainda podem aparecer.",
    question: "O resultado 'ambos leram 0' ainda cabe no modelo?",
    modes: [
      {
        id: "loose",
        label: "Sem sincronizacao efetiva",
        status: "0/0 ainda e plausivel",
        takeaway:
          "Sem uma ordem global suficientemente forte ou outra borda de sincronizacao, resultados surpreendentes continuam no conjunto de execucoes permitidas.",
        observations: [
          "ambos podem nao ver a escrita do outro na hora da leitura",
          "o problema nao e 'CPU maluca', e sim ausencia de contrato que imponha observacao compatível",
          "fortalecer intuicao sem provar a borda nao resolve o bug",
        ],
      },
      {
        id: "seqcst",
        label: "Operacoes SeqCst relevantes",
        status: "ordem global mais forte",
        takeaway:
          "SeqCst fornece a narrativa mais intuitiva quando voce realmente precisa desse tipo de ordem observada por todos.",
        observations: [
          "o espaco de resultados permitidos fica menor",
          "a leitura passa a ser mais alinhada com a intuicao de uma linha do tempo global",
          "ainda nao substitui desenho correto de protocolo",
        ],
      },
      {
        id: "redesign",
        label: "Redesenhar o protocolo",
        status: "melhor que discutir mil detalhes isolados",
        takeaway:
          "Muitas vezes a melhor resposta nao e escolher um ordering mais forte, e sim reestruturar a sincronizacao para expressar intencao com mais clareza.",
        observations: [
          "introduzir um handshake ou primitivo mais alto reduz ambiguidade",
          "ajuda revisao e portabilidade",
          "evita transformar litmus test em API de producao sem necessidade",
        ],
      },
    ],
  },
];

const chooserScenarios: ChoiceScenario[] = [
  {
    name: "Contador estatistico",
    situation:
      "Varias threads incrementam um contador usado apenas para metrica agregada. Esse contador nao publica nem valida outro estado.",
    options: ["relaxed", "acqrel", "seqcst", "mutex"],
    recommended: "relaxed",
    why:
      "Se o contador nao sincroniza outro dado, voce so precisa de atomicidade da atualizacao. Essa e a zona classica em que Relaxed faz sentido.",
    caution:
      "O contador deixa de ser candidato a Relaxed se voce passar a usá-lo como sinal para consumo de outros dados.",
  },
  {
    name: "Ready flag simples",
    situation:
      "Uma thread termina um buffer imutavel e depois publica que ele pode ser consumido por outra thread.",
    options: ["relaxed", "acqrel", "seqcst", "mutex"],
    recommended: "acqrel",
    why:
      "Ha uma historia clara de publicacao e consumo. Release no produtor e Acquire no consumidor expressam esse contrato sem exigir ordem global mais forte do que o problema pede.",
    caution:
      "A ligacao precisa estar na variavel certa e o estado publicado precisa estar pronto antes do Release.",
  },
  {
    name: "Estado composto",
    situation:
      "Varios campos de uma estrutura precisam permanecer coerentes juntos, e leitores usam combinacoes desses campos para tomar decisoes.",
    options: ["relaxed", "acqrel", "seqcst", "mutex"],
    recommended: "mutex",
    why:
      "A questao principal e proteger invariantes compostas e simplificar revisao. Um mutex, canal ou primitivo equivalente comunica melhor a intencao do que atomics dispersos.",
    caution:
      "Atomics soltos podem deixar uma parte do estado 'certa' e outra sem contrato algum.",
  },
  {
    name: "Ordem global simples de explicar",
    situation:
      "Voce precisa que certas operacoes sejam vistas por todas as threads numa ordem unica e quer a narrativa mais conservadora para esse ponto do codigo.",
    options: ["relaxed", "acqrel", "seqcst", "mutex"],
    recommended: "seqcst",
    why:
      "SeqCst existe exatamente para cenarios em que a intuicao de ordem global facilita a corretude mais do que atrapalha o custo.",
    caution:
      "SeqCst forte sem desenho de protocolo continua sendo remendo, nao arquitetura.",
  },
];

const bugCases: BugCase[] = [
  {
    name: "Flag chega antes do significado",
    symptom:
      "Leitor observa ready=true e, muito raramente, ainda enxerga campos antigos do payload associado.",
    details:
      "As escritas do payload e a flag existem, mas a equipe nao consegue apontar uma borda clara de happens-before que conecte produtor e consumidor.",
    likelyCause: "publicacao",
    explanation:
      "O sintoma aponta para publicacao incompleta: a flag mudou, mas o contrato que deveria tornar o restante do estado visivel nao ficou bem formado.",
  },
  {
    name: "Contador certo, estado errado",
    symptom:
      "Um contador atomico reflete a quantidade de itens, mas a estrutura mutavel associada aparece inconsistene ou parcialmente atualizada em leitores concorrentes.",
    details:
      "A equipe focou no objeto atomico e perdeu de vista os outros campos que tambem precisavam viajar juntos.",
    likelyCause: "estado-composto",
    explanation:
      "Aqui o problema nao e o contador em si; e usar um atomic correto como se ele resolvesse invariantes compostas de um estado maior.",
  },
  {
    name: "Crash apos publicacao",
    symptom:
      "O consumidor recebe o sinal esperado, mas as vezes acessa memoria invalida ou estado que ja nao pertence mais ao produtor.",
    details:
      "A borda de ordering ate pode estar correta, mas a vida util do objeto e ownership continuam mal definidos.",
    likelyCause: "nao-ordering",
    explanation:
      "Nem todo bug raro em multicore e ordering. Este cheiro e muito mais de ownership, vida util, aliasing ou protocolo de recurso do que de visibilidade.",
  },
];

function labelForChoice(choice: ChoiceScenario["recommended"]) {
  switch (choice) {
    case "relaxed":
      return "Relaxed";
    case "acqrel":
      return "Acquire / Release";
    case "seqcst":
      return "SeqCst";
    case "mutex":
      return "Mutex / canal / lock";
  }
}

function ReorderSimulator() {
  const [scenarioId, setScenarioId] = useState(simulatorScenarios[0].id);
  const [modeId, setModeId] = useState(simulatorScenarios[0].modes[0]?.id ?? "");

  const scenario = useMemo(
    () => simulatorScenarios.find((item) => item.id === scenarioId) ?? simulatorScenarios[0],
    [scenarioId],
  );

  const activeMode = useMemo(
    () => scenario.modes.find((item) => item.id === modeId) ?? scenario.modes[0],
    [modeId, scenario.modes],
  );

  return (
    <InteractiveShell
      eyebrow="Simulador"
      title="Que observacoes este modelo ainda permite?"
      tone="violet"
      icon={<Shuffle size={18} aria-hidden="true" />}
      description="Troque o cenario e o tipo de contrato para enxergar como o conjunto de resultados permitidos muda."
    >
      <div className="grid gap-5 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="grid gap-3">
          {simulatorScenarios.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setScenarioId(item.id);
                setModeId(item.modes[0]?.id ?? "");
              }}
              className={`rounded-2xl border px-4 py-3 text-left transition ${
                scenarioId === item.id
                  ? "border-violet-600 bg-violet-600 text-white"
                  : "border-white/70 bg-white text-slate-700 hover:border-violet-300"
              }`}
            >
              <span className="block text-sm font-black">{item.name}</span>
              <span className="mt-1 block text-xs opacity-80">{item.setup}</span>
            </button>
          ))}
        </div>
        <div className="rounded-3xl bg-white p-5">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-700">Cenario</p>
          <h4 className="mt-2 font-display text-3xl font-semibold tracking-tight text-slate-950">
            {scenario.name}
          </h4>
          <p className="mt-3 leading-7 text-slate-600">{scenario.setup}</p>
          <div className="mt-4 rounded-2xl border border-violet-100 bg-violet-50 p-4">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-violet-700">Pergunta</p>
            <p className="mt-2 text-sm leading-6 text-slate-700">{scenario.question}</p>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {scenario.modes.map((mode) => (
              <button
                key={mode.id}
                type="button"
                onClick={() => setModeId(mode.id)}
                className={`rounded-2xl border px-3 py-3 text-sm font-black transition ${
                  activeMode.id === mode.id
                    ? "border-slate-950 bg-slate-950 text-white"
                    : "border-slate-200 bg-slate-50 text-slate-700 hover:border-violet-400"
                }`}
              >
                {mode.label}
              </button>
            ))}
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <MetricCard label="Status" value={activeMode.status} />
            <MetricCard label="Foco" value={activeMode.label} />
          </div>
          <div className="mt-4 rounded-2xl border border-violet-100 bg-slate-50 p-4">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-slate-700">
              Observacoes plausiveis
            </p>
            <ul className="mt-3 grid gap-2 text-sm leading-6 text-slate-700">
              {activeMode.observations.map((observation) => (
                <li key={observation} className="rounded-2xl bg-white px-3 py-2">
                  {observation}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm leading-6 text-slate-700">{activeMode.takeaway}</p>
          </div>
        </div>
      </div>
    </InteractiveShell>
  );
}

function FenceChooser() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, ChoiceScenario["recommended"]>>({});
  const scenario = chooserScenarios[selectedIndex];
  const answer = answers[selectedIndex];

  return (
    <InteractiveShell
      eyebrow="Escolhas"
      title="Que contrato este cenario pede?"
      tone="teal"
      icon={<Shield size={18} aria-hidden="true" />}
      description="Escolha o mecanismo mais coerente com a semantica do problema, nao o mais heroico."
    >
      <div className="grid gap-5 lg:grid-cols-[0.86fr_1.14fr]">
        <div className="grid gap-3">
          {chooserScenarios.map((item, index) => (
            <button
              key={item.name}
              type="button"
              onClick={() => setSelectedIndex(index)}
              className={`rounded-2xl border px-4 py-3 text-left transition ${
                selectedIndex === index
                  ? "border-teal-600 bg-teal-600 text-white"
                  : "border-white/70 bg-white text-slate-700 hover:border-teal-300"
              }`}
            >
              <span className="block text-sm font-black">{item.name}</span>
            </button>
          ))}
        </div>
        <div className="rounded-3xl bg-white p-5">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-teal-700">Situacao</p>
          <h4 className="mt-2 font-display text-3xl font-semibold tracking-tight text-slate-950">
            {scenario.name}
          </h4>
          <p className="mt-3 leading-7 text-slate-600">{scenario.situation}</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {scenario.options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setAnswers((previous) => ({ ...previous, [selectedIndex]: option }))}
                className={`rounded-2xl border px-4 py-3 text-left transition ${
                  answer === option
                    ? "border-slate-950 bg-slate-950 text-white"
                    : "border-slate-200 bg-slate-50 text-slate-700 hover:border-teal-400"
                }`}
              >
                <span className="block text-sm font-black">{labelForChoice(option)}</span>
              </button>
            ))}
          </div>
          {answer ? (
            <div className="mt-5 grid gap-3">
              <div
                className={`rounded-2xl border p-4 ${
                  answer === scenario.recommended
                    ? "border-emerald-200 bg-emerald-50"
                    : "border-amber-200 bg-amber-50"
                }`}
              >
                <p
                  className={`text-sm font-black uppercase tracking-[0.16em] ${
                    answer === scenario.recommended ? "text-emerald-700" : "text-amber-700"
                  }`}
                >
                  Recomendacao: {labelForChoice(scenario.recommended)}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-700">{scenario.why}</p>
              </div>
              <div className="rounded-2xl border border-rose-100 bg-rose-50 p-4">
                <p className="text-sm font-black uppercase tracking-[0.16em] text-rose-700">
                  Cuidado
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-700">{scenario.caution}</p>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </InteractiveShell>
  );
}

function BugAutopsy() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, BugCase["likelyCause"]>>({});
  const bugCase = bugCases[selectedIndex];
  const answer = answers[selectedIndex];

  const options: Array<{ id: BugCase["likelyCause"]; label: string }> = [
    { id: "publicacao", label: "faltou publicacao / sincronizacao correta" },
    { id: "estado-composto", label: "atomic correto, mas estado composto sem contrato" },
    { id: "nao-ordering", label: "o problema principal nao e ordering" },
  ];

  return (
    <InteractiveShell
      eyebrow="Autopsia"
      title="Sintoma raro, causa provavel"
      tone="amber"
      icon={<Bug size={18} aria-hidden="true" />}
      description="Escolha o caso e tente diferenciar bug de publicacao, bug de estado composto e bug que nem e ordering."
    >
      <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="grid gap-3">
          {bugCases.map((item, index) => (
            <button
              key={item.name}
              type="button"
              onClick={() => setSelectedIndex(index)}
              className={`rounded-2xl border px-4 py-3 text-left transition ${
                selectedIndex === index
                  ? "border-amber-600 bg-amber-600 text-white"
                  : "border-white/70 bg-white text-slate-700 hover:border-amber-300"
              }`}
            >
              <span className="block text-sm font-black">{item.name}</span>
            </button>
          ))}
        </div>
        <div className="rounded-3xl bg-white p-5">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-700">Sintoma</p>
          <h4 className="mt-2 font-display text-3xl font-semibold tracking-tight text-slate-950">
            {bugCase.name}
          </h4>
          <p className="mt-3 leading-7 text-slate-600">{bugCase.symptom}</p>
          <div className="mt-4 rounded-2xl border border-amber-100 bg-amber-50 p-4">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-amber-700">Detalhe importante</p>
            <p className="mt-2 text-sm leading-6 text-slate-700">{bugCase.details}</p>
          </div>
          <div className="mt-5 grid gap-3">
            {options.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setAnswers((previous) => ({ ...previous, [selectedIndex]: option.id }))}
                className={`rounded-2xl border px-4 py-3 text-left transition ${
                  answer === option.id
                    ? "border-slate-950 bg-slate-950 text-white"
                    : "border-slate-200 bg-slate-50 text-slate-700 hover:border-amber-400"
                }`}
              >
                <span className="block text-sm font-black">{option.label}</span>
              </button>
            ))}
          </div>
          {answer ? (
            <div
              className={`mt-5 rounded-2xl border p-4 ${
                answer === bugCase.likelyCause
                  ? "border-emerald-200 bg-emerald-50"
                  : "border-amber-200 bg-amber-50"
              }`}
            >
              <p
                className={`text-sm font-black uppercase tracking-[0.16em] ${
                  answer === bugCase.likelyCause ? "text-emerald-700" : "text-amber-700"
                }`}
              >
                Leitura mais provavel
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-700">{bugCase.explanation}</p>
            </div>
          ) : null}
        </div>
      </div>
    </InteractiveShell>
  );
}

export const interactions = {
  "reorder-simulator": ReorderSimulator,
  "fence-chooser": FenceChooser,
  "bug-autopsy": BugAutopsy,
} satisfies LessonModule["interactions"];
