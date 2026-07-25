import { useState } from "react";
import {
  Activity,
  ArrowRightLeft,
  BarChart3,
  Binary,
  Boxes,
  Code2,
  Cpu,
  GitBranch,
  KeyRound,
  Layers,
  Lock,
  Network,
  Search,
  Server,
  ShieldCheck,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import type { LessonModule } from "../../../types/content";
import {
  InteractiveShell,
  MetricCard,
} from "../../../components/lesson/InteractionPrimitives";

type Tone = "indigo" | "violet" | "teal" | "amber" | "rose" | "emerald";

type IconName =
  | "Activity"
  | "ArrowRightLeft"
  | "BarChart3"
  | "Binary"
  | "Boxes"
  | "Code2"
  | "Cpu"
  | "GitBranch"
  | "KeyRound"
  | "Layers"
  | "Lock"
  | "Network"
  | "Search"
  | "Server"
  | "ShieldCheck"
  | "Workflow";

const iconMap: Record<IconName, LucideIcon> = {
  Activity,
  ArrowRightLeft,
  BarChart3,
  Binary,
  Boxes,
  Code2,
  Cpu,
  GitBranch,
  KeyRound,
  Layers,
  Lock,
  Network,
  Search,
  Server,
  ShieldCheck,
  Workflow,
};

interface FlowStage {
  label: string;
  detail: string;
  cue: string;
}

interface FlowConfig {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  tone: Tone;
  icon: IconName;
  stages: FlowStage[];
}

interface CompareOption {
  label: string;
  headline: string;
  bullets: string[];
}

interface CompareConfig {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  tone: Tone;
  icon: IconName;
  options: CompareOption[];
}

interface SliderMetric {
  label: string;
  value: string;
}

interface SliderState {
  label: string;
  summary: string;
  leftLabel: string;
  leftValue: number;
  rightLabel: string;
  rightValue: number;
  takeaway: string;
  metrics: SliderMetric[];
}

interface SliderConfig {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  tone: Tone;
  icon: IconName;
  axisLabel: string;
  states: SliderState[];
}

interface HeroConfig {
  id: string;
  title: string;
  subtitle: string;
  chips: string[];
}

interface MapItem {
  label: string;
  detail: string;
}

interface MapConfig {
  id: string;
  title: string;
  items: MapItem[];
  caption: string;
}

interface SummaryPanel {
  label: string;
  body: string;
}

interface SummaryVisualConfig {
  id: string;
  title: string;
  panels: SummaryPanel[];
  footer: string;
}

export function buildComputacaoInteractions(config: {
  flow: FlowConfig;
  compare: CompareConfig;
  slider: SliderConfig;
}): LessonModule["interactions"] {
  const FlowIcon = iconMap[config.flow.icon];
  const CompareIcon = iconMap[config.compare.icon];
  const SliderIcon = iconMap[config.slider.icon];

  function FlowInteraction() {
    const [activeIndex, setActiveIndex] = useState(0);
    const activeStage = config.flow.stages[activeIndex];

    return (
      <InteractiveShell
        eyebrow={config.flow.eyebrow}
        title={config.flow.title}
        description={config.flow.description}
        tone={config.flow.tone}
        icon={<FlowIcon size={18} aria-hidden="true" />}
      >
        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="grid gap-3">
            {config.flow.stages.map((stage, index) => (
              <button
                className={`rounded-2xl border px-4 py-3 text-left transition ${
                  activeIndex === index
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-white/70 bg-white text-slate-700 hover:border-slate-300"
                }`}
                key={stage.label}
                type="button"
                onClick={() => setActiveIndex(index)}
              >
                <p className="text-xs font-black uppercase tracking-[0.16em] opacity-70">
                  Etapa {index + 1}
                </p>
                <p className="mt-1 text-sm font-black">{stage.label}</p>
                <p className="mt-2 text-sm leading-6 opacity-80">{stage.cue}</p>
              </button>
            ))}
          </div>
          <div className="rounded-3xl bg-white p-5">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">
              Trilha do momento
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {config.flow.stages.map((stage, index) => (
                <div className="flex items-center gap-2" key={stage.label}>
                  <span
                    className={`rounded-full px-3 py-2 text-xs font-black ${
                      activeIndex === index
                        ? "bg-slate-900 text-white"
                        : index < activeIndex
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {stage.label}
                  </span>
                  {index < config.flow.stages.length - 1 ? (
                    <span className="text-slate-300">→</span>
                  ) : null}
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-3xl border border-slate-100 bg-slate-50 p-5">
              <h4 className="font-display text-2xl font-semibold tracking-tight text-slate-950">
                {activeStage.label}
              </h4>
              <p className="mt-3 text-base leading-7 text-slate-600">
                {activeStage.detail}
              </p>
            </div>
          </div>
        </div>
      </InteractiveShell>
    );
  }

  function CompareInteraction() {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const selected = config.compare.options[selectedIndex];

    return (
      <InteractiveShell
        eyebrow={config.compare.eyebrow}
        title={config.compare.title}
        description={config.compare.description}
        tone={config.compare.tone}
        icon={<CompareIcon size={18} aria-hidden="true" />}
      >
        <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="grid gap-3">
            {config.compare.options.map((option, index) => (
              <button
                className={`rounded-2xl px-4 py-3 text-left text-sm font-black transition ${
                  selectedIndex === index
                    ? "bg-slate-950 text-white"
                    : "bg-white text-slate-700 hover:bg-slate-50"
                }`}
                key={option.label}
                type="button"
                onClick={() => setSelectedIndex(index)}
              >
                {option.label}
              </button>
            ))}
          </div>
          <div className="rounded-3xl bg-white p-5">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">
              Leitura comparativa
            </p>
            <h4 className="mt-3 font-display text-3xl font-semibold tracking-tight text-slate-950">
              {selected.headline}
            </h4>
            <div className="mt-5 grid gap-3">
              {selected.bullets.map((bullet) => (
                <div
                  className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3"
                  key={bullet}
                >
                  <p className="text-sm leading-6 text-slate-700">{bullet}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </InteractiveShell>
    );
  }

  function SliderInteraction() {
    const [index, setIndex] = useState(Math.min(1, config.slider.states.length - 1));
    const state = config.slider.states[index];

    return (
      <InteractiveShell
        eyebrow={config.slider.eyebrow}
        title={config.slider.title}
        description={config.slider.description}
        tone={config.slider.tone}
        icon={<SliderIcon size={18} aria-hidden="true" />}
      >
        <div className="grid gap-5 lg:grid-cols-[0.88fr_1.12fr]">
          <div className="grid gap-4">
            <label className="grid gap-2 text-sm font-black text-slate-700">
              <span className="flex items-center justify-between gap-3">
                {config.slider.axisLabel}
                <span className="font-mono text-slate-950">{state.label}</span>
              </span>
              <input
                className="w-full accent-slate-950"
                max={config.slider.states.length - 1}
                min={0}
                step={1}
                type="range"
                value={index}
                onChange={(event) => setIndex(Number(event.target.value))}
              />
            </label>
            <div className="rounded-3xl bg-white p-5">
              <h4 className="font-display text-2xl font-semibold tracking-tight text-slate-950">
                {state.label}
              </h4>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {state.summary}
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {state.metrics.map((metric) => (
                <MetricCard
                  key={metric.label}
                  label={metric.label}
                  value={metric.value}
                />
              ))}
            </div>
          </div>
          <div className="rounded-3xl bg-white p-5">
            <div>
              <div className="flex items-center justify-between text-sm font-black text-slate-700">
                <span>{state.leftLabel}</span>
                <span>{state.leftValue}%</span>
              </div>
              <div className="mt-2 h-4 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-indigo-600 transition-[width]"
                  style={{ width: `${state.leftValue}%` }}
                />
              </div>
            </div>
            <div className="mt-5">
              <div className="flex items-center justify-between text-sm font-black text-slate-700">
                <span>{state.rightLabel}</span>
                <span>{state.rightValue}%</span>
              </div>
              <div className="mt-2 h-4 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-emerald-600 transition-[width]"
                  style={{ width: `${state.rightValue}%` }}
                />
              </div>
            </div>
            <div className="mt-6 rounded-3xl border border-slate-100 bg-slate-50 p-5">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">
                Leitura operacional
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-700">
                {state.takeaway}
              </p>
            </div>
          </div>
        </div>
      </InteractiveShell>
    );
  }

  return {
    [config.flow.id]: FlowInteraction,
    [config.compare.id]: CompareInteraction,
    [config.slider.id]: SliderInteraction,
  };
}

export function buildComputacaoVisuals(config: {
  hero: HeroConfig;
  map: MapConfig;
  summary: SummaryVisualConfig;
}): LessonModule["visuals"] {
  function HeroVisual() {
    return (
      <figure className="overflow-hidden rounded-[2rem] border border-violet-200 bg-white p-4 shadow-xl shadow-violet-900/10">
        <svg
          className="w-full"
          viewBox="0 0 760 360"
          role="img"
          aria-label={config.hero.title}
        >
          <defs>
            <linearGradient id="computacaoHeroBg" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#eef2ff" />
              <stop offset="50%" stopColor="#faf5ff" />
              <stop offset="100%" stopColor="#ecfeff" />
            </linearGradient>
          </defs>
          <rect width="760" height="360" rx="28" fill="url(#computacaoHeroBg)" />
          <text x="56" y="78" fill="#312e81" fontSize="14" fontWeight="900">
            Orbitarium · Computação
          </text>
          <text x="56" y="130" fill="#0f172a" fontSize="30" fontWeight="900">
            {config.hero.title}
          </text>
          <text x="56" y="172" fill="#475569" fontSize="17" fontWeight="600">
            {config.hero.subtitle}
          </text>
          {config.hero.chips.map((chip, index) => {
            const x = 56 + (index % 3) * 188;
            const y = 220 + Math.floor(index / 3) * 48;
            return (
              <g key={chip}>
                <rect
                  x={x}
                  y={y}
                  width="168"
                  height="34"
                  rx="14"
                  fill="#ffffff"
                  stroke="#c4b5fd"
                  strokeWidth="2"
                />
                <text
                  x={x + 84}
                  y={y + 22}
                  textAnchor="middle"
                  fill="#6d28d9"
                  fontSize="13"
                  fontWeight="800"
                >
                  {chip}
                </text>
              </g>
            );
          })}
          <rect x="520" y="78" width="180" height="180" rx="30" fill="#0f172a" opacity="0.88" />
          <text x="610" y="120" textAnchor="middle" fill="#f8fafc" fontSize="14" fontWeight="800">
            problema central
          </text>
          <text x="610" y="158" textAnchor="middle" fill="#c4b5fd" fontSize="26" fontWeight="900">
            contrato
          </text>
          <text x="610" y="188" textAnchor="middle" fill="#f8fafc" fontSize="22" fontWeight="900">
            fluxo
          </text>
          <text x="610" y="218" textAnchor="middle" fill="#a5f3fc" fontSize="22" fontWeight="900">
            trade-offs
          </text>
          <text x="610" y="248" textAnchor="middle" fill="#cbd5e1" fontSize="12" fontWeight="700">
            conceito → mecanismo → operação
          </text>
        </svg>
      </figure>
    );
  }

  function MapVisual() {
    return (
      <figure className="rounded-[2rem] border border-indigo-200 bg-indigo-50 p-4 shadow-xl shadow-indigo-900/5">
        <svg
          className="w-full"
          viewBox="0 0 760 340"
          role="img"
          aria-label={config.map.title}
        >
          <rect width="760" height="340" rx="28" fill="#eef2ff" />
          <text x="380" y="42" textAnchor="middle" fill="#312e81" fontSize="20" fontWeight="900">
            {config.map.title}
          </text>
          {config.map.items.map((item, index) => {
            const x = 80 + index * 136;
            const y = 92 + (index % 2) * 88;
            return (
              <g key={item.label}>
                <rect
                  x={x}
                  y={y}
                  width="120"
                  height="74"
                  rx="20"
                  fill="#ffffff"
                  stroke="#6366f1"
                  strokeWidth="2"
                />
                <text
                  x={x + 60}
                  y={y + 25}
                  textAnchor="middle"
                  fill="#312e81"
                  fontSize="13"
                  fontWeight="900"
                >
                  {item.label}
                </text>
                <text
                  x={x + 60}
                  y={y + 46}
                  textAnchor="middle"
                  fill="#475569"
                  fontSize="10"
                  fontWeight="700"
                >
                  {item.detail}
                </text>
                {index < config.map.items.length - 1 ? (
                  <path d={`M${x + 120} ${y + 37} h20 l10 0`} stroke="#6366f1" strokeWidth="3" />
                ) : null}
              </g>
            );
          })}
          <rect x="70" y="280" width="620" height="36" rx="14" fill="#ffffff" stroke="#6366f1" strokeWidth="2" />
          <text x="380" y="303" textAnchor="middle" fill="#4338ca" fontSize="13" fontWeight="800">
            {config.map.caption}
          </text>
        </svg>
      </figure>
    );
  }

  function SummaryVisual() {
    return (
      <figure className="rounded-[2rem] border border-emerald-200 bg-emerald-50 p-4 shadow-xl shadow-emerald-900/5">
        <svg
          className="w-full"
          viewBox="0 0 760 320"
          role="img"
          aria-label={config.summary.title}
        >
          <rect width="760" height="320" rx="28" fill="#ecfdf5" />
          <text x="380" y="42" textAnchor="middle" fill="#065f46" fontSize="20" fontWeight="900">
            {config.summary.title}
          </text>
          {config.summary.panels.map((panel, index) => {
            const x = 60 + index * 230;
            return (
              <g key={panel.label}>
                <rect
                  x={x}
                  y="78"
                  width="190"
                  height="160"
                  rx="22"
                  fill="#ffffff"
                  stroke="#10b981"
                  strokeWidth="2"
                />
                <text
                  x={x + 95}
                  y="110"
                  textAnchor="middle"
                  fill="#047857"
                  fontSize="13"
                  fontWeight="900"
                >
                  {panel.label}
                </text>
                <foreignObject x={x + 16} y="126" width="158" height="94">
                  <div
                    style={{
                      fontSize: "13px",
                      lineHeight: "1.5",
                      color: "#475569",
                      textAlign: "center",
                      fontWeight: 600,
                    }}
                  >
                    {panel.body}
                  </div>
                </foreignObject>
              </g>
            );
          })}
          <rect x="90" y="262" width="580" height="34" rx="14" fill="#065f46" />
          <text x="380" y="284" textAnchor="middle" fill="#f0fdf4" fontSize="13" fontWeight="800">
            {config.summary.footer}
          </text>
        </svg>
      </figure>
    );
  }

  return {
    [config.hero.id]: HeroVisual,
    [config.map.id]: MapVisual,
    [config.summary.id]: SummaryVisual,
  };
}
