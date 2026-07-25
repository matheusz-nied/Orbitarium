import { useMemo, useState } from "react";
import { BarChart3, Coins, Scale } from "lucide-react";
import type { LessonModule } from "../../../types/content";
import {
  InteractiveShell,
  MetricCard,
} from "../../../components/lesson/InteractionPrimitives";

export const interactions = {
  "coin-data-simulator": CoinDataSimulatorInteraction,
  "distribution-histogram-lab": DistributionHistogramLabInteraction,
  "expected-value-lab": ExpectedValueLabInteraction,
} satisfies LessonModule["interactions"];

const pseudoRandom = [
  0.12, 0.71, 0.43, 0.88, 0.26, 0.53, 0.19, 0.95, 0.34, 0.61,
  0.48, 0.77, 0.03, 0.57, 0.68, 0.21, 0.84, 0.39, 0.66, 0.08,
  0.91, 0.14, 0.58, 0.32, 0.73, 0.25, 0.46, 0.87, 0.17, 0.64,
  0.51, 0.29, 0.98, 0.41, 0.55, 0.11, 0.82, 0.36, 0.69, 0.23,
  0.75, 0.05, 0.62, 0.27, 0.93, 0.44, 0.59, 0.16, 0.79, 0.31,
  0.67, 0.09, 0.85, 0.49, 0.22, 0.74, 0.38, 0.97, 0.52, 0.15,
];

function CoinDataSimulatorInteraction() {
  const [bias, setBias] = useState(50);
  const [tosses, setTosses] = useState(24);

  const probability = bias / 100;
  const outcomes = useMemo(
    () => pseudoRandom.slice(0, tosses).map((value) => value < probability),
    [probability, tosses],
  );

  const heads = outcomes.filter(Boolean).length;
  const tails = tosses - heads;
  const observedFrequency = tosses === 0 ? 0 : heads / tosses;
  const gap = observedFrequency - probability;

  return (
    <InteractiveShell
      eyebrow="Frequência vs probabilidade"
      title="Simule lançamentos e compare mecanismo com amostra"
      tone="indigo"
      icon={<Coins size={18} aria-hidden="true" />}
      description="Ajuste a chance real de cara e o tamanho da amostra. Veja como a frequência observada oscila, mas tende a se aproximar da probabilidade quando repetimos mais vezes."
    >
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-4">
          <RangeField
            label="Probabilidade real de cara"
            value={bias}
            min={10}
            max={90}
            suffix="%"
            onChange={setBias}
          />
          <RangeField
            label="Número de lançamentos"
            value={tosses}
            min={8}
            max={60}
            step={4}
            onChange={setTosses}
          />
          <div className="grid gap-3 sm:grid-cols-2">
            <MetricCard label="P(cara)" value={`${(probability * 100).toFixed(0)}%`} />
            <MetricCard label="Freq. observada" value={`${(observedFrequency * 100).toFixed(1)}%`} />
            <MetricCard label="Caras" value={heads.toString()} />
            <MetricCard label="Diferença" value={`${gap >= 0 ? "+" : ""}${(gap * 100).toFixed(1)} p.p.`} />
          </div>
          <div className={`rounded-3xl border p-4 ${Math.abs(gap) < 0.08 ? "border-emerald-200 bg-emerald-50" : "border-amber-200 bg-amber-50"}`}>
            <p className="text-sm font-black uppercase tracking-[0.16em] text-slate-800">Leitura</p>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              {Math.abs(gap) < 0.08
                ? "A amostra está relativamente próxima do mecanismo escolhido. Isso ilustra a ideia de estabilização com repetições suficientes."
                : "A frequência observada ainda está oscilando de forma visível. Isso é normal em amostras finitas e mostra por que frequência e probabilidade não são sinônimos perfeitos."}
            </p>
          </div>
        </div>
        <div className="rounded-3xl bg-white p-5">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-indigo-700">Sequência gerada</p>
          <div className="mt-3 grid grid-cols-6 gap-2 sm:grid-cols-8 lg:grid-cols-10">
            {outcomes.map((isHead, index) => (
              <div
                key={index}
                className={`grid aspect-square place-items-center rounded-2xl text-sm font-black ${isHead ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-600"}`}
              >
                {isHead ? "C" : "K"}
              </div>
            ))}
          </div>
          <div className="mt-5 grid gap-3">
            <BarRow label="Cara" value={heads} max={tosses} tone="bg-indigo-600" textTone="text-indigo-700" />
            <BarRow label="Coroa" value={tails} max={tosses} tone="bg-slate-400" textTone="text-slate-600" />
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            Cada célula representa um lançamento. Mudar a probabilidade altera o <strong>processo gerador</strong>; mudar a quantidade altera apenas o quanto a amostra consegue refletir esse processo.
          </p>
        </div>
      </div>
    </InteractiveShell>
  );
}

function DistributionHistogramLabInteraction() {
  const [successProbability, setSuccessProbability] = useState(50);
  const [sampleSize, setSampleSize] = useState(120);
  const trials = 6;
  const p = successProbability / 100;

  const bins = useMemo(() => {
    return Array.from({ length: trials + 1 }, (_, k) => {
      const probability = combination(trials, k) * Math.pow(p, k) * Math.pow(1 - p, trials - k);
      return {
        label: String(k),
        probability,
        expectedCount: probability * sampleSize,
      };
    });
  }, [p, sampleSize]);

  const peak = bins.reduce((best, current) => (current.expectedCount > best.expectedCount ? current : best), bins[0]);

  return (
    <InteractiveShell
      eyebrow="Histograma interativo"
      title="Veja a forma de uma distribuição mudar ao vivo"
      tone="teal"
      icon={<BarChart3 size={18} aria-hidden="true" />}
      description="Aqui o histograma mostra quantos experimentos tenderiam a gerar 0, 1, 2... sucessos em 6 tentativas. Ajuste p para ver a distribuição se deslocar e se deformar."
    >
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-4">
          <RangeField
            label="Probabilidade de sucesso em cada tentativa"
            value={successProbability}
            min={5}
            max={95}
            suffix="%"
            onChange={setSuccessProbability}
          />
          <RangeField
            label="Número de experimentos resumidos no histograma"
            value={sampleSize}
            min={40}
            max={240}
            step={10}
            onChange={setSampleSize}
          />
          <div className="grid gap-3 sm:grid-cols-2">
            <MetricCard label="Tentativas por experimento" value={String(trials)} />
            <MetricCard label="P(sucesso)" value={`${successProbability}%`} />
            <MetricCard label="Pico do histograma" value={`${peak.label} sucessos`} />
            <MetricCard label="Contagem esperada no pico" value={peak.expectedCount.toFixed(1)} />
          </div>
          <div className="rounded-3xl border border-teal-200 bg-teal-50 p-4">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-teal-800">O que observar</p>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              Quando p se aproxima de 0,5, a distribuição tende a ficar mais centrada. Quando p cai muito ou sobe muito, a massa se concentra nas bordas. O histograma deixa visível a forma da incerteza.
            </p>
          </div>
        </div>
        <div className="rounded-3xl bg-white p-5">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-teal-700">Histograma esperado</p>
          <div className="mt-5 flex h-64 items-end gap-3">
            {bins.map((bin) => {
              const height = (bin.expectedCount / peak.expectedCount) * 100;
              const isPeak = bin.label === peak.label;
              return (
                <div key={bin.label} className="flex flex-1 flex-col items-center gap-2">
                  <span className={`text-xs font-mono font-black ${isPeak ? "text-teal-700" : "text-slate-500"}`}>
                    {bin.expectedCount.toFixed(0)}
                  </span>
                  <div className="flex h-48 w-full items-end rounded-2xl bg-slate-50 px-1 pb-1">
                    <div
                      className={`w-full rounded-xl transition-[height] ${isPeak ? "bg-teal-600" : "bg-teal-300"}`}
                      style={{ height: `${height}%` }}
                    />
                  </div>
                  <span className="text-xs font-black text-slate-600">{bin.label}</span>
                </div>
              );
            })}
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            Eixo horizontal: quantidade de sucessos em 6 tentativas. Eixo vertical: quantos experimentos, em média, cairiam em cada faixa.
          </p>
        </div>
      </div>
    </InteractiveShell>
  );
}

function ExpectedValueLabInteraction() {
  const [winProbability, setWinProbability] = useState(35);
  const [reward, setReward] = useState(12);
  const [cost, setCost] = useState(4);

  const p = winProbability / 100;
  const expectedValue = p * reward - cost;
  const breakEven = reward === 0 ? 0 : (cost / reward) * 100;

  return (
    <InteractiveShell
      eyebrow="Valor esperado"
      title="Combine chance e consequência para avaliar uma ação"
      tone="rose"
      icon={<Scale size={18} aria-hidden="true" />}
      description="Ajuste a probabilidade de sucesso, o prêmio e o custo da tentativa. A métrica importante não é só 'ganhar ou perder', mas o saldo médio de longo prazo."
    >
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-4">
          <RangeField label="Probabilidade de sucesso" value={winProbability} min={5} max={95} suffix="%" onChange={setWinProbability} />
          <RangeField label="Recompensa quando dá certo" value={reward} min={2} max={20} prefix="R$ " onChange={setReward} />
          <RangeField label="Custo por tentativa" value={cost} min={1} max={12} prefix="R$ " onChange={setCost} />
          <div className="grid gap-3 sm:grid-cols-2">
            <MetricCard label="Ganho esperado" value={`R$ ${expectedValue.toFixed(2)}`} />
            <MetricCard label="Prob. de empate" value={`${breakEven.toFixed(1)}%`} />
            <MetricCard label="Cenário bom" value={`+R$ ${reward}`} />
            <MetricCard label="Cenário ruim" value={`-R$ ${cost}`} />
          </div>
          <div className={`rounded-3xl border p-4 ${expectedValue >= 0 ? "border-emerald-200 bg-emerald-50" : "border-rose-200 bg-rose-50"}`}>
            <p className="text-sm font-black uppercase tracking-[0.16em]">Diagnóstico</p>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              {expectedValue >= 0
                ? "Nesse ajuste, a ação é favorável em média no longo prazo. Isso não impede perdas pontuais; apenas indica saldo médio positivo ao repetir o processo muitas vezes."
                : "Nesse ajuste, a ação é desfavorável em média. Mesmo com algumas vitórias, o custo recorrente consome o resultado no longo prazo."}
            </p>
          </div>
        </div>
        <div className="rounded-3xl bg-white p-5">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-rose-700">Balanço dos cenários</p>
          <div className="mt-5 grid gap-4">
            <ScenarioCard
              title="Se der certo"
              probability={p}
              result={`+R$ ${(reward - cost).toFixed(2)}`}
              tone="rose"
            />
            <ScenarioCard
              title="Se der errado"
              probability={1 - p}
              result={`-R$ ${cost.toFixed(2)}`}
              tone="slate"
            />
          </div>
          <div className="mt-5 rounded-3xl border border-slate-100 bg-slate-50 p-4">
            <p className="text-sm leading-6 text-slate-700">
              A conta é simples, mas a ideia é profunda: uma alternativa menos provável pode ser melhor se a recompensa for muito maior, e uma alternativa muito provável pode ser ruim se o custo das falhas for pesado demais.
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
  step = 1,
  prefix = "",
  suffix = "",
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  prefix?: string;
  suffix?: string;
  onChange: (value: number) => void;
}) {
  return (
    <label className="grid gap-2 text-sm font-black text-slate-700">
      <span className="flex items-center justify-between gap-4">
        {label}
        <span className="font-mono text-slate-950">
          {prefix}{value}{suffix}
        </span>
      </span>
      <input
        className="w-full accent-slate-950"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}

function BarRow({
  label,
  value,
  max,
  tone,
  textTone,
}: {
  label: string;
  value: number;
  max: number;
  tone: string;
  textTone: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className={`w-16 text-sm font-black ${textTone}`}>{label}</span>
      <div className="h-4 flex-1 overflow-hidden rounded-full bg-slate-100">
        <div className={`h-full rounded-full ${tone}`} style={{ width: `${(value / max) * 100}%` }} />
      </div>
      <span className="w-12 text-right font-mono text-sm font-black text-slate-600">{value}</span>
    </div>
  );
}

function ScenarioCard({
  title,
  probability,
  result,
  tone,
}: {
  title: string;
  probability: number;
  result: string;
  tone: "rose" | "slate";
}) {
  const styles = tone === "rose"
    ? "border-rose-200 bg-rose-50 text-rose-800"
    : "border-slate-200 bg-slate-50 text-slate-700";

  return (
    <div className={`rounded-3xl border p-4 ${styles}`}>
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.16em]">{title}</p>
          <p className="mt-1 text-sm font-bold">probabilidade {(probability * 100).toFixed(1)}%</p>
        </div>
        <p className="font-display text-2xl font-semibold tracking-tight">{result}</p>
      </div>
    </div>
  );
}

function combination(n: number, k: number) {
  let numerator = 1;
  let denominator = 1;
  for (let i = 1; i <= k; i += 1) {
    numerator *= n - (k - i);
    denominator *= i;
  }
  return numerator / denominator;
}

