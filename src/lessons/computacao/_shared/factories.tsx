import { useMemo, useState } from "react";
import { Compass, Gauge, Route, Scale, Waypoints } from "lucide-react";
import type { LessonModule } from "../../../types/content";
import {
  InteractiveShell,
  MetricCard,
  type InteractionTone,
} from "../../../components/lesson/InteractionPrimitives";

export interface PipelineStep {
  name: string;
  summary: string;
  signal: string;
  risk: string;
  takeaway: string;
}

export interface ScenarioCard {
  name: string;
  situation: string;
  choice: string;
  why: string;
  caution: string;
}

export interface VisualFactoryConfig {
  title: string;
  subtitle: string;
  level: string;
  tags: string[];
  conceptNodes: string[];
  pipelineSteps: string[];
  leftLabel: string;
  rightLabel: string;
  impactRows: Array<{ label: string; value: string }>;
}

export interface InteractionFactoryConfig {
  title: string;
  pipelineSteps: PipelineStep[];
  leftLabel: string;
  rightLabel: string;
  tradeoffSummary: string;
  tradeoffRisks: string[];
  practiceRule: string;
  scenarios: ScenarioCard[];
  tone?: InteractionTone;
}

const VISUAL_IDS = {
  hero: "lesson-hero",
  concept: "concept-grid",
  pipeline: "pipeline-diagram",
  tradeoff: "tradeoff-spectrum",
  impact: "impact-board",
} as const;

const INTERACTION_IDS = {
  pipeline: "pipeline-lab",
  tradeoff: "tradeoff-lab",
  scenario: "scenario-lab",
} as const;

export function createComputacaoVisuals(
  config: VisualFactoryConfig,
): LessonModule["visuals"] {
  return {
    [VISUAL_IDS.hero]: () => <HeroVisual config={config} />,
    [VISUAL_IDS.concept]: () => <ConceptGridVisual config={config} />,
    [VISUAL_IDS.pipeline]: () => <PipelineVisual config={config} />,
    [VISUAL_IDS.tradeoff]: () => <TradeoffVisual config={config} />,
    [VISUAL_IDS.impact]: () => <ImpactBoardVisual config={config} />,
  };
}

export function createComputacaoInteractions(
  config: InteractionFactoryConfig,
): LessonModule["interactions"] {
  return {
    [INTERACTION_IDS.pipeline]: () => <PipelineLab config={config} />,
    [INTERACTION_IDS.tradeoff]: () => <TradeoffLab config={config} />,
    [INTERACTION_IDS.scenario]: () => <ScenarioLab config={config} />,
  };
}

function HeroVisual({ config }: { config: VisualFactoryConfig }) {
  return (
    <figure className="overflow-hidden rounded-[2rem] border border-violet-200 bg-white p-4 shadow-xl shadow-violet-900/5">
      <svg
        className="w-full"
        viewBox="0 0 760 360"
        role="img"
        aria-label={`Visual introdutório da aula ${config.title}`}
      >
        <defs>
          <linearGradient id="computacaoHeroBg" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#f5f3ff" />
            <stop offset="52%" stopColor="#eef2ff" />
            <stop offset="100%" stopColor="#f0fdfa" />
          </linearGradient>
        </defs>
        <rect width="760" height="360" rx="28" fill="url(#computacaoHeroBg)" />
        <text
          x="380"
          y="48"
          textAnchor="middle"
          fill="#4c1d95"
          fontSize="24"
          fontWeight="900"
        >
          {config.title}
        </text>
        <text
          x="380"
          y="76"
          textAnchor="middle"
          fill="#6d28d9"
          fontSize="13"
          fontWeight="700"
        >
          {config.subtitle}
        </text>
        <rect
          x="56"
          y="108"
          width="190"
          height="154"
          rx="20"
          fill="#ffffff"
          stroke="#c4b5fd"
          strokeWidth="3"
        />
        <text
          x="151"
          y="138"
          textAnchor="middle"
          fill="#5b21b6"
          fontSize="15"
          fontWeight="900"
        >
          Nível
        </text>
        <text
          x="151"
          y="175"
          textAnchor="middle"
          fill="#0f172a"
          fontSize="24"
          fontWeight="900"
        >
          {config.level}
        </text>
        <text
          x="151"
          y="205"
          textAnchor="middle"
          fill="#64748b"
          fontSize="12"
          fontWeight="700"
        >
          foco em modelo mental + projeto
        </text>
        <path
          d="M270 185h70"
          stroke="#7c3aed"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path d="M330 175l12 10l-12 10" fill="#7c3aed" />
        <rect
          x="370"
          y="108"
          width="334"
          height="154"
          rx="22"
          fill="#ffffff"
          stroke="#a78bfa"
          strokeWidth="3"
        />
        <text
          x="537"
          y="138"
          textAnchor="middle"
          fill="#5b21b6"
          fontSize="15"
          fontWeight="900"
        >
          Tags da aula
        </text>
        {config.tags.slice(0, 6).map((tag, index) => {
          const col = index % 2;
          const row = Math.floor(index / 2);
          return (
            <g key={tag}>
              <rect
                x={395 + col * 155}
                y={156 + row * 32}
                width="132"
                height="22"
                rx="11"
                fill="#ede9fe"
              />
              <text
                x={461 + col * 155}
                y={171 + row * 32}
                textAnchor="middle"
                fill="#6d28d9"
                fontSize="11"
                fontWeight="800"
              >
                {tag}
              </text>
            </g>
          );
        })}
        <rect
          x="108"
          y="288"
          width="544"
          height="46"
          rx="18"
          fill="#ffffff"
          stroke="#c4b5fd"
          strokeWidth="2.5"
        />
        <text
          x="380"
          y="317"
          textAnchor="middle"
          fill="#5b21b6"
          fontSize="15"
          fontWeight="900"
        >
          Fundamento de computação aplicado a arquitetura, operação e análise
        </text>
      </svg>
    </figure>
  );
}

function ConceptGridVisual({ config }: { config: VisualFactoryConfig }) {
  const nodes = config.conceptNodes.slice(0, 4);

  return (
    <figure className="rounded-[2rem] border border-indigo-200 bg-indigo-50 p-4 shadow-xl shadow-indigo-900/5">
      <svg
        className="w-full"
        viewBox="0 0 760 360"
        role="img"
        aria-label={`Mapa conceitual da aula ${config.title}`}
      >
        <rect width="760" height="360" rx="28" fill="#eef2ff" />
        <text
          x="380"
          y="46"
          textAnchor="middle"
          fill="#3730a3"
          fontSize="22"
          fontWeight="900"
        >
          Modelo mental em quatro âncoras
        </text>
        <rect
          x="265"
          y="132"
          width="230"
          height="94"
          rx="20"
          fill="#ffffff"
          stroke="#6366f1"
          strokeWidth="3"
        />
        <text
          x="380"
          y="165"
          textAnchor="middle"
          fill="#312e81"
          fontSize="18"
          fontWeight="900"
        >
          {config.title}
        </text>
        <text
          x="380"
          y="192"
          textAnchor="middle"
          fill="#64748b"
          fontSize="12"
          fontWeight="700"
        >
          enxergue unidades, fluxo e custo
        </text>
        {[
          { x: 78, y: 110 },
          { x: 552, y: 110 },
          { x: 78, y: 236 },
          { x: 552, y: 236 },
        ].map((position, index) => (
          <g key={nodes[index] ?? index}>
            <rect
              x={position.x}
              y={position.y}
              width="130"
              height="50"
              rx="16"
              fill="#ffffff"
              stroke="#818cf8"
              strokeWidth="2.5"
            />
            <text
              x={position.x + 65}
              y={position.y + 30}
              textAnchor="middle"
              fill="#4338ca"
              fontSize="12"
              fontWeight="900"
            >
              {nodes[index] ?? "conceito"}
            </text>
          </g>
        ))}
        <path
          d="M208 135l57 24"
          stroke="#818cf8"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M495 159l57-24"
          stroke="#818cf8"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M208 261l57-24"
          stroke="#818cf8"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M495 237l57 24"
          stroke="#818cf8"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </figure>
  );
}

function PipelineVisual({ config }: { config: VisualFactoryConfig }) {
  const steps = config.pipelineSteps.slice(0, 4);

  return (
    <figure className="rounded-[2rem] border border-teal-200 bg-teal-50 p-4 shadow-xl shadow-teal-900/5">
      <svg
        className="w-full"
        viewBox="0 0 760 330"
        role="img"
        aria-label={`Pipeline conceitual da aula ${config.title}`}
      >
        <rect width="760" height="330" rx="28" fill="#f0fdfa" />
        <text
          x="380"
          y="46"
          textAnchor="middle"
          fill="#0f766e"
          fontSize="22"
          fontWeight="900"
        >
          Fluxo essencial
        </text>
        {steps.map((step, index) => {
          const x = 36 + index * 182;
          const isLast = index === steps.length - 1;
          return (
            <g key={step}>
              <rect
                x={x}
                y="102"
                width="150"
                height="120"
                rx="20"
                fill="#ffffff"
                stroke="#14b8a6"
                strokeWidth="3"
              />
              <text
                x={x + 75}
                y="136"
                textAnchor="middle"
                fill="#0f766e"
                fontSize="12"
                fontWeight="900"
              >
                ETAPA {index + 1}
              </text>
              <text
                x={x + 75}
                y="166"
                textAnchor="middle"
                fill="#0f172a"
                fontSize="13"
                fontWeight="900"
              >
                {step}
              </text>
              {!isLast ? (
                <>
                  <path
                    d={`M${x + 150} 162h25`}
                    stroke="#14b8a6"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                  <path
                    d={`M${x + 168} 152l10 10l-10 10`}
                    fill="#14b8a6"
                  />
                </>
              ) : null}
            </g>
          );
        })}
        <text
          x="380"
          y="286"
          textAnchor="middle"
          fill="#0f766e"
          fontSize="15"
          fontWeight="900"
        >
          Cada etapa adiciona política, contexto ou custo
        </text>
      </svg>
    </figure>
  );
}

function TradeoffVisual({ config }: { config: VisualFactoryConfig }) {
  return (
    <figure className="rounded-[2rem] border border-amber-200 bg-amber-50 p-4 shadow-xl shadow-amber-900/5">
      <svg
        className="w-full"
        viewBox="0 0 760 320"
        role="img"
        aria-label={`Espectro de trade-offs da aula ${config.title}`}
      >
        <rect width="760" height="320" rx="28" fill="#fffbeb" />
        <text
          x="380"
          y="48"
          textAnchor="middle"
          fill="#92400e"
          fontSize="22"
          fontWeight="900"
        >
          Eixo de projeto
        </text>
        <rect
          x="96"
          y="136"
          width="568"
          height="34"
          rx="17"
          fill="#fde68a"
        />
        <rect
          x="96"
          y="136"
          width="188"
          height="34"
          rx="17"
          fill="#fdba74"
        />
        <rect
          x="476"
          y="136"
          width="188"
          height="34"
          rx="17"
          fill="#f59e0b"
        />
        <circle cx="380" cy="153" r="18" fill="#ffffff" stroke="#92400e" strokeWidth="3" />
        <text
          x="140"
          y="120"
          textAnchor="middle"
          fill="#b45309"
          fontSize="13"
          fontWeight="900"
        >
          {config.leftLabel}
        </text>
        <text
          x="620"
          y="120"
          textAnchor="middle"
          fill="#b45309"
          fontSize="13"
          fontWeight="900"
        >
          {config.rightLabel}
        </text>
        <text
          x="380"
          y="206"
          textAnchor="middle"
          fill="#92400e"
          fontSize="16"
          fontWeight="900"
        >
          ponto de projeto
        </text>
        <text
          x="380"
          y="236"
          textAnchor="middle"
          fill="#64748b"
          fontSize="12"
          fontWeight="700"
        >
          Extremizar um lado costuma simplificar uma dor e ampliar outra
        </text>
      </svg>
    </figure>
  );
}

function ImpactBoardVisual({ config }: { config: VisualFactoryConfig }) {
  return (
    <figure className="rounded-[2rem] border border-emerald-200 bg-emerald-50 p-4 shadow-xl shadow-emerald-900/5">
      <svg
        className="w-full"
        viewBox="0 0 760 350"
        role="img"
        aria-label={`Painel de impactos da aula ${config.title}`}
      >
        <rect width="760" height="350" rx="28" fill="#ecfdf5" />
        <text
          x="380"
          y="46"
          textAnchor="middle"
          fill="#047857"
          fontSize="22"
          fontWeight="900"
        >
          O que observar em sistemas reais
        </text>
        {config.impactRows.slice(0, 4).map((row, index) => {
          const col = index % 2;
          const gridRow = Math.floor(index / 2);
          const x = 56 + col * 332;
          const y = 94 + gridRow * 104;
          return (
            <g key={row.label}>
              <rect
                x={x}
                y={y}
                width="276"
                height="78"
                rx="18"
                fill="#ffffff"
                stroke="#34d399"
                strokeWidth="3"
              />
              <text
                x={x + 20}
                y={y + 26}
                fill="#047857"
                fontSize="11"
                fontWeight="900"
              >
                {row.label.toUpperCase()}
              </text>
              <text
                x={x + 20}
                y={y + 54}
                fill="#0f172a"
                fontSize="13"
                fontWeight="800"
              >
                {row.value}
              </text>
            </g>
          );
        })}
      </svg>
    </figure>
  );
}

function PipelineLab({ config }: { config: InteractionFactoryConfig }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const step = config.pipelineSteps[selectedIndex];

  return (
    <InteractiveShell
      eyebrow="Pipeline"
      title="Percorra a sequência de decisões"
      tone={config.tone ?? "teal"}
      icon={<Waypoints size={18} aria-hidden="true" />}
      description="Clique nas etapas para enxergar onde o sistema classifica, encaminha, sincroniza, persiste ou reaproveita estado."
    >
      <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="grid gap-3">
          {config.pipelineSteps.map((item, index) => (
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
              <span className="block text-xs font-black uppercase tracking-[0.18em] opacity-80">
                Etapa {index + 1}
              </span>
              <span className="mt-1 block text-sm font-black">{item.name}</span>
            </button>
          ))}
        </div>
        <div className="rounded-3xl bg-white p-5">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-teal-700">
            Etapa selecionada
          </p>
          <h4 className="mt-2 font-display text-3xl font-semibold tracking-tight text-slate-950">
            {step.name}
          </h4>
          <p className="mt-3 leading-7 text-slate-600">{step.summary}</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <MetricCard label="Sinal para observar" value={step.signal} />
            <MetricCard label="Risco dominante" value={step.risk} />
          </div>
          <div className="mt-4 rounded-2xl border border-teal-100 bg-teal-50 p-4">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-teal-700">
              Takeaway
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              {step.takeaway}
            </p>
          </div>
        </div>
      </div>
    </InteractiveShell>
  );
}

function TradeoffLab({ config }: { config: InteractionFactoryConfig }) {
  const [position, setPosition] = useState(50);

  const frame = useMemo(() => {
    if (position <= 25) {
      return {
        emphasis: `Viés para ${config.leftLabel.toLowerCase()}`,
        risk: config.tradeoffRisks[0] ?? config.tradeoffRisks[config.tradeoffRisks.length - 1],
      };
    }
    if (position <= 50) {
      return {
        emphasis: "Equilíbrio conservador",
        risk: config.tradeoffRisks[1] ?? config.tradeoffRisks[0],
      };
    }
    if (position <= 75) {
      return {
        emphasis: `Viés para ${config.rightLabel.toLowerCase()}`,
        risk: config.tradeoffRisks[2] ?? config.tradeoffRisks[config.tradeoffRisks.length - 1],
      };
    }
    return {
      emphasis: "Otimização agressiva",
      risk: config.tradeoffRisks[3] ?? config.tradeoffRisks[config.tradeoffRisks.length - 1],
    };
  }, [config.leftLabel, config.rightLabel, config.tradeoffRisks, position]);

  return (
    <InteractiveShell
      eyebrow="Trade-off"
      title="Ajuste o ponto de projeto"
      tone={config.tone ?? "amber"}
      icon={<Scale size={18} aria-hidden="true" />}
      description="Deslize o eixo para sentir como uma decisão resolve uma dor e traz outra para o primeiro plano."
    >
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-4">
          <label className="grid gap-2 text-sm font-black text-slate-700">
            <span className="flex items-center justify-between gap-4">
              Posição no eixo
              <span className="font-mono text-amber-700">{position}</span>
            </span>
            <input
              className="w-full accent-slate-950"
              type="range"
              min={0}
              max={100}
              step={1}
              value={position}
              onChange={(event) => setPosition(Number(event.target.value))}
            />
          </label>
          <div className="grid gap-3 sm:grid-cols-2">
            <MetricCard label="Ênfase atual" value={frame.emphasis} />
            <MetricCard label="Risco dominante" value={frame.risk} />
          </div>
          <div className="rounded-3xl border border-amber-200 bg-amber-50 p-4">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-amber-700">
              Regra de bolso
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              {config.practiceRule}
            </p>
          </div>
        </div>
        <div className="rounded-3xl bg-white p-5">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-700">
            Eixo observado
          </p>
          <div className="mt-4 rounded-3xl border border-amber-100 bg-amber-50 p-4">
            <div className="flex items-center justify-between gap-4 text-xs font-black uppercase tracking-[0.16em] text-amber-800">
              <span>{config.leftLabel}</span>
              <span>{config.rightLabel}</span>
            </div>
            <div className="relative mt-4 h-5 rounded-full bg-amber-200">
              <div
                className="absolute top-1/2 h-8 w-8 -translate-y-1/2 rounded-full border-4 border-amber-600 bg-white shadow-lg"
                style={{ left: `calc(${position}% - 16px)` }}
              />
            </div>
          </div>
          <p className="mt-4 leading-7 text-slate-600">{config.tradeoffSummary}</p>
          <div className="mt-4 rounded-2xl border border-amber-100 bg-slate-50 p-4">
            <div className="flex items-center gap-3">
              <Gauge className="text-amber-700" size={18} aria-hidden="true" />
              <p className="text-sm font-black uppercase tracking-[0.16em] text-slate-700">
                Leitura do estado
              </p>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              {frame.emphasis}. {frame.risk}
            </p>
          </div>
        </div>
      </div>
    </InteractiveShell>
  );
}

function ScenarioLab({ config }: { config: InteractionFactoryConfig }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const scenario = config.scenarios[selectedIndex];

  return (
    <InteractiveShell
      eyebrow="Cenários"
      title="Escolha o caso e veja a decisão"
      tone={config.tone ?? "indigo"}
      icon={<Route size={18} aria-hidden="true" />}
      description="Toda técnica parece ótima até você colocá-la dentro de um contexto real. Compare cenários e observe como a recomendação muda."
    >
      <div className="grid gap-5 lg:grid-cols-[0.86fr_1.14fr]">
        <div className="grid gap-3">
          {config.scenarios.map((item, index) => (
            <button
              key={item.name}
              type="button"
              onClick={() => setSelectedIndex(index)}
              className={`rounded-2xl border px-4 py-3 text-left transition ${
                selectedIndex === index
                  ? "border-indigo-600 bg-indigo-600 text-white"
                  : "border-white/70 bg-white text-slate-700 hover:border-indigo-300"
              }`}
            >
              <span className="block text-sm font-black">{item.name}</span>
            </button>
          ))}
        </div>
        <div className="rounded-3xl bg-white p-5">
          <div className="flex items-center gap-3">
            <Compass className="text-indigo-700" size={18} aria-hidden="true" />
            <p className="text-xs font-black uppercase tracking-[0.18em] text-indigo-700">
              Situação
            </p>
          </div>
          <p className="mt-3 leading-7 text-slate-600">{scenario.situation}</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-4">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-indigo-700">
                Primeira decisão
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                {scenario.choice}
              </p>
            </div>
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700">
                Por que
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                {scenario.why}
              </p>
            </div>
          </div>
          <div className="mt-4 rounded-2xl border border-rose-100 bg-rose-50 p-4">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-rose-700">
              Cuidado
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              {scenario.caution}
            </p>
          </div>
        </div>
      </div>
    </InteractiveShell>
  );
}
