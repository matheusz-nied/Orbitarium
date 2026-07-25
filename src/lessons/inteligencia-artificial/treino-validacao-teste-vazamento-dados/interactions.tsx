import { useMemo, useState } from "react";
import { BarChart3, FlaskConical, ShieldAlert, SplitSquareVertical } from "lucide-react";
import type { LessonModule } from "../../../types/content";
import {
  InteractiveShell,
  MetricCard,
} from "../../../components/lesson/InteractionPrimitives";

export const interactions = {
  "interactive-split-lab": InteractiveSplitLab,
  "leakage-detective": LeakageDetectiveInteraction,
  "train-vs-test-chart": TrainVsTestChartInteraction,
} satisfies LessonModule["interactions"];

function InteractiveSplitLab() {
  const [totalSamples, setTotalSamples] = useState(1200);
  const [trainPct, setTrainPct] = useState(70);
  const [validationPct, setValidationPct] = useState(15);
  const [timeOrdered, setTimeOrdered] = useState(false);

  const testPct = Math.max(0, 100 - trainPct - validationPct);
  const trainCount = Math.round((trainPct / 100) * totalSamples);
  const validationCount = Math.round((validationPct / 100) * totalSamples);
  const testCount = Math.max(0, totalSamples - trainCount - validationCount);

  const warning =
    testPct < 10
      ? "Seu conjunto de teste ficou pequeno demais para uma leitura confiável do resultado final."
      : validationPct < 10
        ? "Com pouca validação, escolher hiperparâmetros fica instável."
        : trainPct < 55
          ? "Treino pequeno demais pode limitar a capacidade do modelo de aprender padrões robustos."
          : undefined;

  return (
    <InteractiveShell
      eyebrow="Splits"
      title="Monte um conjunto de treino, validação e teste"
      tone="indigo"
      icon={<SplitSquareVertical size={18} aria-hidden="true" />}
      description="Ajuste as proporções e observe como cada pedaço cumpre um papel diferente no ciclo de avaliação."
    >
      <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="grid gap-4">
          <RangeField
            label="Total de exemplos"
            value={totalSamples}
            min={300}
            max={3000}
            step={100}
            onChange={setTotalSamples}
          />
          <RangeField
            label="Treino (%)"
            value={trainPct}
            min={50}
            max={80}
            step={1}
            onChange={(next) => {
              setTrainPct(next);
              if (next + validationPct > 90) {
                setValidationPct(90 - next);
              }
            }}
          />
          <RangeField
            label="Validação (%)"
            value={validationPct}
            min={10}
            max={Math.max(10, 90 - trainPct)}
            step={1}
            onChange={(next) => setValidationPct(Math.min(next, 90 - trainPct))}
          />
          <button
            className={`rounded-3xl border px-4 py-4 text-left transition ${
              timeOrdered
                ? "border-indigo-300 bg-white shadow-lg shadow-indigo-900/5"
                : "border-slate-200 bg-slate-50 hover:border-indigo-200"
            }`}
            type="button"
            onClick={() => setTimeOrdered((value) => !value)}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h4 className="font-display text-xl font-semibold tracking-tight text-slate-950">
                  Dados temporais em ordem cronológica
                </h4>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Ative quando o tempo importa. Em séries temporais, embaralhar pode fazer o futuro vazar para o passado.
                </p>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-black uppercase ${timeOrdered ? "bg-indigo-600 text-white" : "bg-slate-200 text-slate-600"}`}>
                {timeOrdered ? "ligado" : "desligado"}
              </span>
            </div>
          </button>
        </div>

        <div className="grid gap-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <MetricCard label="Treino" value={`${trainCount} exemplos`} />
            <MetricCard label="Validação" value={`${validationCount} exemplos`} />
            <MetricCard label="Teste" value={`${testCount} exemplos`} />
            <MetricCard label="Teste (%)" value={`${testPct}%`} />
          </div>

          <div className="rounded-3xl bg-white p-5">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-indigo-700">
              Visão do split
            </p>
            <div className="mt-4 overflow-hidden rounded-full bg-slate-100">
              <div className="flex h-8 w-full">
                <div className="grid place-items-center bg-indigo-600 text-xs font-black text-white" style={{ width: `${trainPct}%` }}>
                  treino
                </div>
                <div className="grid place-items-center bg-amber-500 text-xs font-black text-white" style={{ width: `${validationPct}%` }}>
                  validação
                </div>
                <div className="grid place-items-center bg-emerald-500 text-xs font-black text-white" style={{ width: `${testPct}%` }}>
                  teste
                </div>
              </div>
            </div>
            <div className="mt-4 grid gap-2 text-sm leading-6 text-slate-700">
              <p><strong>Treino:</strong> ajusta os parâmetros do modelo.</p>
              <p><strong>Validação:</strong> ajuda a escolher configurações sem tocar no teste.</p>
              <p><strong>Teste:</strong> é a auditoria final, usada quando o desenho já está decidido.</p>
            </div>
          </div>

          <div className={`rounded-3xl border p-4 ${warning ? "border-amber-200 bg-amber-50" : "border-emerald-200 bg-emerald-50"}`}>
            <p className="text-sm leading-6 text-slate-700">
              {warning ??
                (timeOrdered
                  ? "Bom alerta: com dados temporais, o split cronológico ajuda a simular o uso real do modelo no futuro."
                  : "Configuração razoável para um primeiro experimento: há massa suficiente para aprender, calibrar e auditar." )}
            </p>
          </div>
        </div>
      </div>
    </InteractiveShell>
  );
}

const leakageScenarios = [
  {
    id: "scaler",
    title: "Padronizar tudo antes de separar",
    description: "Você calcula média e desvio usando o dataset inteiro e só depois faz train/test split.",
    isLeak: true,
    explanation:
      "O transformador viu estatísticas do teste. Mesmo sem rótulo explícito, isso contamina a avaliação porque o treino usou informação que não teria em produção.",
  },
  {
    id: "pipeline",
    title: "Pipeline ajustado só no treino",
    description: "Você separa os dados primeiro, ajusta o scaler no treino e usa apenas transform no teste.",
    isLeak: false,
    explanation:
      "Esse é o procedimento correto. O teste é tratado como dado novo e não participa do fit de nenhum passo da cadeia.",
  },
  {
    id: "future",
    title: "Usar dados do mês seguinte para prever o mês atual",
    description: "No histórico temporal, uma feature contém informação gerada depois da decisão que você quer prever.",
    isLeak: true,
    explanation:
      "É vazamento temporal. O modelo aprende sinais do futuro que não estariam disponíveis no momento real da previsão.",
  },
  {
    id: "duplicates",
    title: "A mesma pessoa aparece quase idêntica em treino e teste",
    description: "Você duplicou registros ou dividiu sessões de um mesmo usuário sem agrupar.",
    isLeak: true,
    explanation:
      "Mesmo sem copiar o rótulo explicitamente, o teste deixa de ser realmente novo. O modelo encontra quase o mesmo exemplo dos dois lados.",
  },
  {
    id: "holdout",
    title: "Guardar o teste até o final",
    description: "Você usa treino e validação para iterar e só olha o teste quando encerra as escolhas.",
    isLeak: false,
    explanation:
      "Esse é o papel correto do teste: medir a generalização do pipeline já escolhido, sem influenciar as decisões do desenvolvimento.",
  },
] as const;

function LeakageDetectiveInteraction() {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [guess, setGuess] = useState<"leak" | "safe" | null>(null);
  const scenario = leakageScenarios[scenarioIndex];

  const isCorrect =
    guess === null ? null : (guess === "leak" && scenario.isLeak) || (guess === "safe" && !scenario.isLeak);

  return (
    <InteractiveShell
      eyebrow="Diagnóstico"
      title="Detetive de vazamento de dados"
      tone="rose"
      icon={<ShieldAlert size={18} aria-hidden="true" />}
      description="Leia o cenário, dê seu veredito e veja se o pipeline está limpo ou se algum atalho deixou o modelo espiar informação indevida."
    >
      <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="grid gap-3">
          {leakageScenarios.map((item, index) => (
            <button
              className={`rounded-2xl px-4 py-3 text-left transition ${
                scenario.id === item.id
                  ? "bg-rose-600 text-white"
                  : "bg-white text-slate-700 hover:bg-rose-50"
              }`}
              key={item.id}
              type="button"
              onClick={() => {
                setScenarioIndex(index);
                setGuess(null);
              }}
            >
              <span className="block text-sm font-black">{item.title}</span>
              <span className={`mt-1 block text-xs ${scenario.id === item.id ? "text-rose-100" : "text-slate-500"}`}>
                {item.description}
              </span>
            </button>
          ))}
        </div>

        <div className="grid gap-4">
          <div className="rounded-3xl bg-white p-5">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-rose-700">
              Cenário atual
            </p>
            <h4 className="mt-2 font-display text-3xl font-semibold tracking-tight text-slate-950">
              {scenario.title}
            </h4>
            <p className="mt-3 text-sm leading-6 text-slate-700">{scenario.description}</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <button
              className={`rounded-3xl border px-4 py-4 text-sm font-black transition ${
                guess === "leak" ? "border-rose-600 bg-rose-600 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-rose-300"
              }`}
              type="button"
              onClick={() => setGuess("leak")}
            >
              Tem vazamento
            </button>
            <button
              className={`rounded-3xl border px-4 py-4 text-sm font-black transition ${
                guess === "safe" ? "border-emerald-600 bg-emerald-600 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-emerald-300"
              }`}
              type="button"
              onClick={() => setGuess("safe")}
            >
              Pipeline seguro
            </button>
          </div>

          <div
            className={`rounded-3xl border p-5 ${
              guess === null
                ? "border-slate-200 bg-slate-50"
                : isCorrect
                  ? "border-emerald-200 bg-emerald-50"
                  : "border-rose-200 bg-rose-50"
            }`}
          >
            <p className="text-sm font-black uppercase tracking-[0.16em]">
              {guess === null ? "Seu diagnóstico" : isCorrect ? "Acertou" : "Reveja o raciocínio"}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              {guess === null
                ? "Escolha um veredito. A regra de ouro é: nada que aprende estatística, estrutura ou seleção pode usar o teste antes da avaliação final."
                : scenario.explanation}
            </p>
          </div>
        </div>
      </div>
    </InteractiveShell>
  );
}

const situations = {
  subajuste: {
    train: 0.68,
    validation: 0.66,
    test: 0.65,
    message:
      "Treino e validação estão igualmente baixos. O modelo ainda não capturou o padrão principal do problema.",
  },
  saudavel: {
    train: 0.88,
    validation: 0.85,
    test: 0.84,
    message:
      "As três métricas ficam próximas. Há perda normal do treino para dados novos, mas o comportamento é consistente.",
  },
  overfit: {
    train: 0.98,
    validation: 0.79,
    test: 0.77,
    message:
      "O treino parece brilhante, mas a queda fora dele revela que o modelo aprendeu detalhes demais da base vista.",
  },
  vazando: {
    train: 0.97,
    validation: 0.95,
    test: 0.71,
    message:
      "Treino e validação parecem ótimos, mas o teste desaba. Isso costuma indicar pipeline contaminado ou validação otimista demais.",
  },
} as const;

type SituationKey = keyof typeof situations;

function TrainVsTestChartInteraction() {
  const [situationKey, setSituationKey] = useState<SituationKey>("saudavel");
  const [revealTest, setRevealTest] = useState(false);
  const situation = situations[situationKey];

  const bars = useMemo(
    () => [
      { label: "Treino", value: situation.train, color: "bg-indigo-600" },
      { label: "Validação", value: situation.validation, color: "bg-amber-500" },
      { label: "Teste", value: situation.test, color: "bg-emerald-500" },
    ],
    [situation],
  );

  return (
    <InteractiveShell
      eyebrow="Leitura de métricas"
      title="Treino alto não encerra a história"
      tone="emerald"
      icon={<BarChart3 size={18} aria-hidden="true" />}
      description="Escolha um cenário de avaliação e revele o teste só no final para observar o papel de cada conjunto."
    >
      <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="grid gap-3">
          {(Object.keys(situations) as SituationKey[]).map((key) => (
            <button
              className={`rounded-2xl px-4 py-3 text-left transition ${
                key === situationKey
                  ? "bg-emerald-600 text-white"
                  : "bg-white text-slate-700 hover:bg-emerald-50"
              }`}
              key={key}
              type="button"
              onClick={() => {
                setSituationKey(key);
                setRevealTest(false);
              }}
            >
              <span className="block text-sm font-black">
                {key === "subajuste"
                  ? "Subajuste"
                  : key === "saudavel"
                    ? "Equilíbrio saudável"
                    : key === "overfit"
                      ? "Sobreajuste"
                      : "Validação contaminada"}
              </span>
            </button>
          ))}
          <button
            className={`rounded-3xl border px-4 py-4 text-sm font-black transition ${
              revealTest
                ? "border-emerald-600 bg-emerald-600 text-white"
                : "border-slate-200 bg-white text-slate-700 hover:border-emerald-300"
            }`}
            type="button"
            onClick={() => setRevealTest(true)}
          >
            Revelar teste final
          </button>
        </div>

        <div className="grid gap-4">
          <div className="rounded-3xl bg-white p-5">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">
              Comparação de desempenho
            </p>
            <div className="mt-4 grid gap-4">
              {bars.map((bar) => {
                const hidden = bar.label === "Teste" && !revealTest;
                return (
                  <div key={bar.label}>
                    <div className="flex items-center justify-between text-sm font-black text-slate-700">
                      <span>{bar.label}</span>
                      <span>{hidden ? "oculto" : `${(bar.value * 100).toFixed(0)}%`}</span>
                    </div>
                    <div className="mt-1 h-4 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className={`h-full rounded-full ${hidden ? "bg-slate-300" : bar.color}`}
                        style={{ width: `${(hidden ? 0.72 : bar.value) * 100}%`, opacity: hidden ? 0.35 : 1 }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <MetricCard label="Treino" value={`${(situation.train * 100).toFixed(0)}%`} />
            <MetricCard label="Validação" value={`${(situation.validation * 100).toFixed(0)}%`} />
            <MetricCard label="Teste" value={revealTest ? `${(situation.test * 100).toFixed(0)}%` : "cego"} />
          </div>

          <div className={`rounded-3xl border p-5 ${revealTest ? "border-emerald-200 bg-emerald-50" : "border-slate-200 bg-slate-50"}`}>
            <p className="text-sm leading-6 text-slate-700">
              {revealTest
                ? situation.message
                : "Enquanto você ainda está escolhendo modelo e hiperparâmetros, o teste deve continuar fora de vista. Ele é uma auditoria, não uma ferramenta de ajuste."}
            </p>
          </div>
        </div>
      </div>
    </InteractiveShell>
  );
}

function RangeField({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="grid gap-2 text-sm font-black text-slate-700">
      <span className="flex items-center justify-between gap-3">
        {label}
        <span className="font-mono text-slate-950">{value}</span>
      </span>
      <input
        className="w-full accent-slate-950"
        max={max}
        min={min}
        step={step}
        type="range"
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}
