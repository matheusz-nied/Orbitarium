import { useMemo, useState } from "react";
import { Activity, Gauge, Route } from "lucide-react";
import type { LessonModule } from "../../../types/content";
import { InteractiveShell, MetricCard } from "../../../components/lesson/InteractionPrimitives";

export const interactions = {
  "corrida-otimizadores": CorridaOtimizadoresInteraction,
  "momentos-do-adam": MomentosDoAdamInteraction,
  "schedules-conceituais": SchedulesConceituaisInteraction,
} satisfies LessonModule["interactions"];

function CorridaOtimizadoresInteraction() {
  const [steps, setSteps] = useState(8);
  const [learningRate, setLearningRate] = useState(0.08);

  const trajectories = useMemo(() => {
    const run = (mode: "sgd" | "momentum" | "adam") => {
      let x = 2.6;
      let y = 2.0;
      let vx = 0;
      let vy = 0;
      let mx = 0;
      let my = 0;
      let sx = 0;
      let sy = 0;
      const beta1 = 0.9;
      const beta2 = 0.999;
      const eps = 1e-8;
      const points = [{ x, y }];
      for (let t = 1; t <= steps; t++) {
        const gx = 6 * x;
        const gy = 1.5 * y;
        if (mode === "sgd") {
          x -= learningRate * gx;
          y -= learningRate * gy;
        } else if (mode === "momentum") {
          vx = 0.85 * vx - learningRate * gx;
          vy = 0.85 * vy - learningRate * gy;
          x += vx;
          y += vy;
        } else {
          mx = beta1 * mx + (1 - beta1) * gx;
          my = beta1 * my + (1 - beta1) * gy;
          sx = beta2 * sx + (1 - beta2) * gx * gx;
          sy = beta2 * sy + (1 - beta2) * gy * gy;
          const mxHat = mx / (1 - Math.pow(beta1, t));
          const myHat = my / (1 - Math.pow(beta1, t));
          const sxHat = sx / (1 - Math.pow(beta2, t));
          const syHat = sy / (1 - Math.pow(beta2, t));
          x -= learningRate * mxHat / (Math.sqrt(sxHat) + eps);
          y -= learningRate * myHat / (Math.sqrt(syHat) + eps);
        }
        points.push({ x, y });
      }
      return points;
    };
    return {
      sgd: run("sgd"),
      momentum: run("momentum"),
      adam: run("adam"),
    };
  }, [steps, learningRate]);

  const toPath = (points: Array<{ x: number; y: number }>) =>
    points.map((point, index) => `${index === 0 ? "M" : "L"} ${380 + point.x * 70} ${220 + point.y * 28}`).join(" ");

  return (
    <InteractiveShell
      eyebrow="Corrida"
      title="Compare trajetórias em uma superfície 2D"
      tone="indigo"
      icon={<Route size={18} aria-hidden="true" />}
      description="Use uma bacia elíptica simples para observar como SGD, momentum e Adam se deslocam quando recebem gradientes do mesmo relevo."
    >
      <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="grid gap-4">
          <RangeControl label="número de passos" value={steps} min={1} max={15} step={1} onChange={setSteps} format={(value) => value.toFixed(0)} />
          <RangeControl label="learning rate base" value={learningRate} min={0.02} max={0.16} step={0.01} onChange={setLearningRate} />
          <div className="grid gap-3 sm:grid-cols-2">
            <MetricCard label="passos" value={steps.toFixed(0)} />
            <MetricCard label="η" value={learningRate.toFixed(2)} />
            <MetricCard label="ótimo x" value="0" />
            <MetricCard label="ótimo y" value="0" />
          </div>
        </div>
        <div className="rounded-3xl bg-white p-5">
          <svg className="w-full" viewBox="0 0 620 360" role="img" aria-label="Trajetórias de otimizadores em superfície elíptica">
            <rect width="620" height="360" rx="24" fill="#eef2ff" />
            <ellipse cx="380" cy="220" rx="200" ry="80" fill="#ffffff" stroke="#c7d2fe" strokeWidth="2" />
            <ellipse cx="380" cy="220" rx="140" ry="56" fill="none" stroke="#c7d2fe" strokeWidth="2" />
            <ellipse cx="380" cy="220" rx="70" ry="28" fill="none" stroke="#c7d2fe" strokeWidth="2" />
            <path d={toPath(trajectories.sgd)} stroke="#0284c7" strokeWidth="4" fill="none" />
            <path d={toPath(trajectories.momentum)} stroke="#f59e0b" strokeWidth="4" fill="none" />
            <path d={toPath(trajectories.adam)} stroke="#10b981" strokeWidth="4" fill="none" />
            <circle cx="380" cy="220" r="7" fill="#0f172a" />
          </svg>
          <div className="mt-4 grid gap-2 text-sm font-black">
            <span className="text-sky-700">SGD: responde diretamente ao relevo local e tende a oscilar mais.</span>
            <span className="text-amber-700">Momentum: acumula velocidade e suaviza parte do zigue-zague.</span>
            <span className="text-emerald-700">Adam: além de suavizar, adapta a escala por coordenada.</span>
          </div>
        </div>
      </div>
    </InteractiveShell>
  );
}

function MomentosDoAdamInteraction() {
  const [gradient, setGradient] = useState(1.8);
  const [prevM, setPrevM] = useState(0.6);
  const [prevV, setPrevV] = useState(0.9);
  const [beta1, setBeta1] = useState(0.9);
  const [beta2, setBeta2] = useState(0.99);
  const [step, setStep] = useState(3);

  const m = beta1 * prevM + (1 - beta1) * gradient;
  const v = beta2 * prevV + (1 - beta2) * gradient * gradient;
  const mHat = m / (1 - Math.pow(beta1, step));
  const vHat = v / (1 - Math.pow(beta2, step));
  const adaptedRaw = m / (Math.sqrt(v) + 1e-8);
  const adaptedCorrected = mHat / (Math.sqrt(vHat) + 1e-8);

  return (
    <InteractiveShell
      eyebrow="Adam"
      title="Veja os momentos de primeira e segunda ordem"
      tone="emerald"
      icon={<Activity size={18} aria-hidden="true" />}
      description="Ajuste gradiente, estados anteriores e passo temporal para entender como Adam suaviza direção, adapta escala e aplica correção de viés no início do treino."
    >
      <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="grid gap-4">
          <RangeControl label="gradiente atual" value={gradient} min={-3} max={3} step={0.1} onChange={setGradient} />
          <RangeControl label="m anterior" value={prevM} min={-3} max={3} step={0.1} onChange={setPrevM} />
          <RangeControl label="v anterior" value={prevV} min={0} max={6} step={0.1} onChange={setPrevV} />
          <RangeControl label="beta1" value={beta1} min={0.5} max={0.99} step={0.01} onChange={setBeta1} />
          <RangeControl label="beta2" value={beta2} min={0.8} max={0.999} step={0.001} onChange={setBeta2} />
          <RangeControl label="passo t" value={step} min={1} max={20} step={1} onChange={setStep} format={(value) => value.toFixed(0)} />
        </div>
        <div className="grid gap-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <MetricCard label="m novo" value={m.toFixed(3)} />
            <MetricCard label="v novo" value={v.toFixed(3)} />
            <MetricCard label="m̂ corrigido" value={mHat.toFixed(3)} />
            <MetricCard label="v̂ corrigido" value={vHat.toFixed(3)} />
            <MetricCard label="m / √v" value={adaptedRaw.toFixed(3)} />
            <MetricCard label="m̂ / √v̂" value={adaptedCorrected.toFixed(3)} />
          </div>
          <div className="rounded-3xl border border-emerald-200 bg-white p-5 text-sm leading-6 text-slate-600">
            Se <strong>v</strong> cresce, a escala do update encolhe naquela coordenada. No Adam completo, <strong>m̂</strong> e <strong>v̂</strong> corrigem o viés introduzido pelo início em zero, o que importa principalmente nos primeiros passos do treino.
          </div>
        </div>
      </div>
    </InteractiveShell>
  );
}

function SchedulesConceituaisInteraction() {
  const [epoch, setEpoch] = useState(35);
  const [base, setBase] = useState(0.1);
  const totalEpochs = 100;
  const constant = base;
  const stepDecay = epoch < 30 ? base : epoch < 60 ? base * 0.4 : base * 0.16;
  const cosine = base * 0.5 * (1 + Math.cos((Math.PI * epoch) / totalEpochs));

  return (
    <InteractiveShell
      eyebrow="Schedules"
      title="Compare regimes temporais de learning rate"
      tone="violet"
      icon={<Gauge size={18} aria-hidden="true" />}
      description="Escolha um epoch e compare uma taxa constante, uma queda em degraus e um decaimento suave tipo cosine annealing."
    >
      <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="grid gap-4">
          <RangeControl label="epoch" value={epoch} min={0} max={100} step={1} onChange={setEpoch} format={(value) => value.toFixed(0)} />
          <RangeControl label="taxa base" value={base} min={0.02} max={0.2} step={0.01} onChange={setBase} />
          <div className="grid gap-3 sm:grid-cols-2">
            <MetricCard label="constante" value={constant.toFixed(3)} />
            <MetricCard label="step decay" value={stepDecay.toFixed(3)} />
            <MetricCard label="cosine" value={cosine.toFixed(3)} />
            <MetricCard label="epoch atual" value={epoch.toFixed(0)} />
          </div>
        </div>
        <div className="rounded-3xl bg-white p-5">
          <svg className="w-full" viewBox="0 0 620 280" role="img" aria-label="Curvas de learning rate schedule">
            <rect width="620" height="280" rx="24" fill="#faf5ff" />
            <line x1="70" y1="220" x2="560" y2="220" stroke="#cbd5e1" strokeWidth="2" />
            <line x1="70" y1="50" x2="70" y2="220" stroke="#cbd5e1" strokeWidth="2" />
            <path d={`M 90 ${220 - constant * 800} H 540`} stroke="#d946ef" strokeWidth="4" fill="none" />
            <path d={`M 90 ${220 - base * 800} H 240 V ${220 - base * 0.4 * 800} H 390 V ${220 - base * 0.16 * 800} H 540`} stroke="#4f46e5" strokeWidth="4" fill="none" />
            <path d={Array.from({ length: 101 }, (_, i) => {
              const y = 220 - base * 0.5 * (1 + Math.cos((Math.PI * i) / totalEpochs)) * 800;
              const x = 90 + i * 4.5;
              return `${i === 0 ? "M" : "L"} ${x} ${y}`;
            }).join(" ")} stroke="#0f766e" strokeWidth="4" fill="none" />
            <line x1={90 + epoch * 4.5} y1="40" x2={90 + epoch * 4.5} y2="220" stroke="#0f172a" strokeDasharray="6 6" />
          </svg>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            Schedules diferentes contam histórias diferentes sobre o treino: constância, quedas bruscas de regime ou refinamento suave ao longo do tempo.
          </p>
        </div>
      </div>
    </InteractiveShell>
  );
}

function RangeControl({
  label,
  value,
  min,
  max,
  step,
  onChange,
  format,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  format?: (value: number) => string;
}) {
  return (
    <label className="grid gap-2 text-sm font-black text-slate-700">
      <span className="flex items-center justify-between gap-3">
        {label}
        <span className="font-mono text-slate-950">{format ? format(value) : value.toFixed(3).replace(/\.000$/, "")}</span>
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
