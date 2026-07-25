import { useMemo, useState } from "react";
import { BarChart3, Sliders, Timer } from "lucide-react";
import type { LessonModule } from "../../../types/content";
import {
  InteractiveShell,
  MetricCard,
} from "../../../components/lesson/InteractionPrimitives";

export const interactions = {
  "complexity-vs-error": ComplexityVsErrorInteraction,
  "regularization-strength-demo": RegularizationStrengthDemoInteraction,
  "early-stopping-lab": EarlyStoppingLabInteraction,
} satisfies LessonModule["interactions"];

function ComplexityVsErrorInteraction() {
  const [complexity, setComplexity] = useState(4);

  const points = useMemo(
    () =>
      Array.from({ length: 10 }, (_, index) => {
        const x = index + 1;
        const train = Math.max(0.05, 0.56 - x * 0.048);
        const test = 0.22 + ((x - 4.5) ** 2) * 0.012;
        return {
          x,
          train,
          test: Math.min(0.62, test),
        };
      }),
    [],
  );

  const current = points[complexity - 1];

  return (
    <InteractiveShell
      eyebrow="Capacidade"
      title="Deslize a complexidade e observe o erro"
      tone="indigo"
      icon={<BarChart3 size={18} aria-hidden="true" />}
      description="Modelos simples demais não capturam o padrão; modelos complexos demais começam a ajustar ruído. O melhor ponto fica no meio."
    >
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-4">
          <RangeField
            label="Complexidade do modelo"
            value={complexity}
            min={1}
            max={10}
            step={1}
            onChange={setComplexity}
          />
          <div className="grid gap-3 sm:grid-cols-2">
            <MetricCard label="Erro de treino" value={`${(current.train * 100).toFixed(0)}%`} />
            <MetricCard label="Erro de teste" value={`${(current.test * 100).toFixed(0)}%`} />
            <MetricCard
              label="Diagnóstico"
              value={complexity <= 2 ? "Underfit" : complexity <= 6 ? "Faixa boa" : "Overfit"}
            />
            <MetricCard label="Complexidade" value={`${complexity}/10`} />
          </div>
          <div className={`rounded-3xl border p-4 ${
            complexity <= 2
              ? "border-amber-200 bg-amber-50"
              : complexity <= 6
                ? "border-emerald-200 bg-emerald-50"
                : "border-rose-200 bg-rose-50"
          }`}>
            <p className="text-sm leading-6 text-slate-700">
              {complexity <= 2 &&
                "O modelo ainda é rígido demais. Ele erra até no treino porque não consegue representar a forma do padrão."}
              {complexity > 2 && complexity <= 6 &&
                "Aqui a capacidade é suficiente para capturar o padrão principal sem memorizar tanto ruído. O erro fora do treino fica mais baixo."}
              {complexity > 6 &&
                "A complexidade continua reduzindo o erro de treino, mas começa a piorar o erro de teste. O modelo está se ajustando demais aos detalhes do conjunto visto."}
            </p>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-5">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-indigo-700">
            Curvas conceituais
          </p>
          <svg className="mt-4 w-full" viewBox="0 0 460 280" role="img" aria-label="Curvas de erro de treino e teste">
            <rect width="460" height="280" rx="20" fill="#eef2ff" />
            <line x1="50" y1="235" x2="420" y2="235" stroke="#475569" strokeWidth="3" />
            <line x1="50" y1="235" x2="50" y2="40" stroke="#475569" strokeWidth="3" />
            <path
              d={points.map((point, index) => `${index === 0 ? "M" : "L"} ${55 + point.x * 34} ${235 - point.train * 220}`).join(" ")}
              fill="none"
              stroke="#4f46e5"
              strokeWidth="5"
            />
            <path
              d={points.map((point, index) => `${index === 0 ? "M" : "L"} ${55 + point.x * 34} ${235 - point.test * 220}`).join(" ")}
              fill="none"
              stroke="#f97316"
              strokeWidth="5"
            />
            {points.map((point) => (
              <g key={point.x}>
                <circle cx={55 + point.x * 34} cy={235 - point.train * 220} r={point.x === complexity ? 7 : 4} fill="#4f46e5" />
                <circle cx={55 + point.x * 34} cy={235 - point.test * 220} r={point.x === complexity ? 7 : 4} fill="#f97316" />
              </g>
            ))}
            <text x="340" y="78" fill="#4f46e5" fontSize="13" fontWeight="800">erro de treino</text>
            <text x="320" y="128" fill="#c2410c" fontSize="13" fontWeight="800">erro de teste</text>
          </svg>
        </div>
      </div>
    </InteractiveShell>
  );
}

function RegularizationStrengthDemoInteraction() {
  const [alpha, setAlpha] = useState(3);
  const baseWeights = [2.8, -2.1, 1.6, 1.1, -0.7, 0.4];

  const shrunkWeights = useMemo(
    () => baseWeights.map((weight, index) => weight / (1 + alpha * (0.22 + index * 0.03))),
    [alpha],
  );

  const trainError = Math.min(0.5, 0.13 + alpha * 0.02);
  const validationError = Math.min(0.55, 0.18 + ((alpha - 3.5) ** 2) * 0.012);

  return (
    <InteractiveShell
      eyebrow="Regularização"
      title="Ajuste a força de regularização"
      tone="teal"
      icon={<Sliders size={18} aria-hidden="true" />}
      description="Regularizar significa restringir o quanto o modelo pode crescer em complexidade efetiva. L2 faz isso penalizando pesos grandes."
    >
      <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="grid gap-4">
          <RangeField
            label="Força da regularização (alpha)"
            value={alpha}
            min={0}
            max={10}
            step={1}
            onChange={setAlpha}
          />
          <div className="grid gap-3 sm:grid-cols-2">
            <MetricCard label="Erro de treino" value={`${(trainError * 100).toFixed(0)}%`} />
            <MetricCard label="Erro de validação" value={`${(validationError * 100).toFixed(0)}%`} />
            <MetricCard label="Alpha" value={String(alpha)} />
            <MetricCard
              label="Leitura"
              value={alpha <= 1 ? "Quase livre" : alpha <= 5 ? "Equilibrado" : "Restritivo"}
            />
          </div>
          <div className={`rounded-3xl border p-4 ${
            alpha <= 1
              ? "border-rose-200 bg-rose-50"
              : alpha <= 5
                ? "border-emerald-200 bg-emerald-50"
                : "border-amber-200 bg-amber-50"
          }`}>
            <p className="text-sm leading-6 text-slate-700">
              {alpha <= 1 &&
                "Com regularização fraca, o modelo fica livre para usar pesos grandes e pode começar a perseguir ruído."}
              {alpha > 1 && alpha <= 5 &&
                "A penalidade está reduzindo a variância sem sufocar demais a capacidade do modelo. É a região em que o viés e a variância costumam se equilibrar melhor."}
              {alpha > 5 &&
                "A restrição está forte demais. Os pesos encolhem bastante e o modelo pode ficar simples demais, voltando a underfit."}
            </p>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-3xl bg-white p-5">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-teal-700">
              Efeito sobre os pesos
            </p>
            <div className="mt-4 grid gap-3">
              {shrunkWeights.map((weight, index) => (
                <div className="flex items-center gap-3" key={index}>
                  <span className="w-20 shrink-0 text-sm font-black text-slate-700">w{index + 1}</span>
                  <div className="flex-1">
                    <div className="h-4 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className={`h-full rounded-full ${weight >= 0 ? "bg-teal-500" : "bg-rose-500"}`}
                        style={{ width: `${Math.abs(weight) / 3 * 100}%` }}
                      />
                    </div>
                  </div>
                  <span className="w-16 text-right font-mono text-sm font-black text-slate-600">
                    {weight >= 0 ? "+" : ""}{weight.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl bg-white p-5">
            <p className="text-sm leading-6 text-slate-700">
              Intuição de L2: pesos muito grandes costumam sinalizar um modelo sensível demais a pequenas flutuações do treino. Ao penalizar magnitudes altas, a regularização favorece soluções mais suaves e menos frágeis.
            </p>
          </div>
        </div>
      </div>
    </InteractiveShell>
  );
}

function EarlyStoppingLabInteraction() {
  const [epoch, setEpoch] = useState(12);

  const points = useMemo(
    () =>
      Array.from({ length: 30 }, (_, index) => {
        const x = index + 1;
        const train = 1.22 * Math.exp(-x / 10) + 0.08;
        const validation = 1.05 * Math.exp(-x / 8) + 0.18 + 0.0033 * Math.max(0, x - 14) ** 2;
        return { x, train, validation };
      }),
    [],
  );

  const current = points[epoch - 1];
  const bestPoint = points.reduce((best, point) =>
    point.validation < best.validation ? point : best,
  );

  return (
    <InteractiveShell
      eyebrow="Treinamento"
      title="Early stopping: pare antes de ajustar ruído demais"
      tone="amber"
      icon={<Timer size={18} aria-hidden="true" />}
      description="Observe como a perda de treino continua caindo enquanto a validação melhora só até certo ponto. Parar cedo pode ser uma forma de regularização."
    >
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-4">
          <RangeField
            label="Época observada"
            value={epoch}
            min={1}
            max={30}
            step={1}
            onChange={setEpoch}
          />
          <div className="grid gap-3 sm:grid-cols-2">
            <MetricCard label="Loss de treino" value={current.train.toFixed(3)} />
            <MetricCard label="Loss de validação" value={current.validation.toFixed(3)} />
            <MetricCard label="Melhor época" value={String(bestPoint.x)} />
            <MetricCard
              label="Leitura"
              value={epoch <= bestPoint.x ? "Ainda melhorando" : "Já passou do ponto"}
            />
          </div>
          <div className={`rounded-3xl border p-4 ${
            epoch <= bestPoint.x ? "border-emerald-200 bg-emerald-50" : "border-rose-200 bg-rose-50"
          }`}>
            <p className="text-sm leading-6 text-slate-700">
              {epoch <= bestPoint.x
                ? "Até aqui, reduzir a loss de treino ainda ajuda também a validação. O modelo continua aprendendo sinal útil."
                : "Depois do melhor ponto, o treino segue melhorando sozinho enquanto a validação piora. Esse excesso sugere ajuste de ruído e perda de generalização."}
            </p>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-5">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-700">
            Curvas ao longo das épocas
          </p>
          <svg className="mt-4 w-full" viewBox="0 0 460 280" role="img" aria-label="Curvas de treino e validação por época">
            <rect width="460" height="280" rx="20" fill="#fffbeb" />
            <line x1="50" y1="235" x2="420" y2="235" stroke="#475569" strokeWidth="3" />
            <line x1="50" y1="235" x2="50" y2="40" stroke="#475569" strokeWidth="3" />
            <path
              d={points.map((point, index) => `${index === 0 ? "M" : "L"} ${52 + point.x * 12} ${235 - point.train * 120}`).join(" ")}
              fill="none"
              stroke="#4f46e5"
              strokeWidth="5"
            />
            <path
              d={points.map((point, index) => `${index === 0 ? "M" : "L"} ${52 + point.x * 12} ${235 - point.validation * 120}`).join(" ")}
              fill="none"
              stroke="#f59e0b"
              strokeWidth="5"
            />
            <line
              x1={52 + bestPoint.x * 12}
              x2={52 + bestPoint.x * 12}
              y1="50"
              y2="235"
              stroke="#0f172a"
              strokeDasharray="6 6"
              strokeWidth="3"
            />
            <circle cx={52 + epoch * 12} cy={235 - current.train * 120} r="6" fill="#4f46e5" />
            <circle cx={52 + epoch * 12} cy={235 - current.validation * 120} r="6" fill="#f59e0b" />
            <text x="322" y="80" fill="#4f46e5" fontSize="13" fontWeight="800">treino</text>
            <text x="300" y="118" fill="#b45309" fontSize="13" fontWeight="800">validação</text>
          </svg>
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
