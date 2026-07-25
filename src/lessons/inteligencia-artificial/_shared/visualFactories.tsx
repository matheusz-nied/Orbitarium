import type { LessonModule } from "../../../types/content";

type VisualTone = "indigo" | "violet" | "teal" | "amber" | "rose" | "emerald";

type Theme = {
  figure: string;
  border: string;
  shadow: string;
  svgBg: string;
  accent: string;
  accentSoft: string;
  accentAlt: string;
  text: string;
  muted: string;
};

type VisualCard = {
  title: string;
  body: string;
};

type TradeoffPoint = {
  label: string;
  x: number;
  y: number;
};

export type StandardLessonVisualConfig = {
  tone: VisualTone;
  heroTitle: string;
  heroSubtitle: string;
  heroSteps: [string, string, string];
  heroFooter: string;
  conceptTitle: string;
  conceptLeft: VisualCard;
  conceptRight: VisualCard;
  conceptFooter: string;
  pipelineTitle: string;
  pipelineSteps: string[];
  comparisonTitle: string;
  comparisonLeft: VisualCard;
  comparisonRight: VisualCard;
  tradeoffTitle: string;
  tradeoffXAxis: string;
  tradeoffYAxis: string;
  tradeoffPoints: TradeoffPoint[];
  checklistTitle: string;
  checklistItems: string[];
};

const themes: Record<VisualTone, Theme> = {
  indigo: {
    figure: "bg-indigo-50",
    border: "border-indigo-200",
    shadow: "shadow-indigo-900/5",
    svgBg: "#eef2ff",
    accent: "#4f46e5",
    accentSoft: "#c7d2fe",
    accentAlt: "#818cf8",
    text: "#312e81",
    muted: "#475569",
  },
  violet: {
    figure: "bg-violet-50",
    border: "border-violet-200",
    shadow: "shadow-violet-900/5",
    svgBg: "#faf5ff",
    accent: "#7c3aed",
    accentSoft: "#ddd6fe",
    accentAlt: "#a78bfa",
    text: "#5b21b6",
    muted: "#475569",
  },
  teal: {
    figure: "bg-teal-50",
    border: "border-teal-200",
    shadow: "shadow-teal-900/5",
    svgBg: "#f0fdfa",
    accent: "#0f766e",
    accentSoft: "#99f6e4",
    accentAlt: "#14b8a6",
    text: "#115e59",
    muted: "#475569",
  },
  amber: {
    figure: "bg-amber-50",
    border: "border-amber-200",
    shadow: "shadow-amber-900/5",
    svgBg: "#fffbeb",
    accent: "#d97706",
    accentSoft: "#fde68a",
    accentAlt: "#f59e0b",
    text: "#92400e",
    muted: "#475569",
  },
  rose: {
    figure: "bg-rose-50",
    border: "border-rose-200",
    shadow: "shadow-rose-900/5",
    svgBg: "#fff1f2",
    accent: "#e11d48",
    accentSoft: "#fecdd3",
    accentAlt: "#fb7185",
    text: "#9f1239",
    muted: "#475569",
  },
  emerald: {
    figure: "bg-emerald-50",
    border: "border-emerald-200",
    shadow: "shadow-emerald-900/5",
    svgBg: "#ecfdf5",
    accent: "#059669",
    accentSoft: "#a7f3d0",
    accentAlt: "#34d399",
    text: "#065f46",
    muted: "#475569",
  },
};

export function createStandardLessonVisuals(
  config: StandardLessonVisualConfig,
): LessonModule["visuals"] {
  const theme = themes[config.tone];

  function HeroVisual() {
    return (
      <figure
        className={`overflow-hidden rounded-[2rem] border ${theme.border} ${theme.figure} p-4 shadow-xl ${theme.shadow}`}
      >
        <svg
          className="w-full"
          viewBox="0 0 760 380"
          role="img"
          aria-label={config.heroTitle}
        >
          <rect width="760" height="380" rx="30" fill={theme.svgBg} />
          <text
            x="380"
            y="48"
            textAnchor="middle"
            fill={theme.text}
            fontSize="24"
            fontWeight="900"
          >
            {config.heroTitle}
          </text>
          <text
            x="380"
            y="76"
            textAnchor="middle"
            fill={theme.muted}
            fontSize="14"
            fontWeight="700"
          >
            {config.heroSubtitle}
          </text>
          {config.heroSteps.map((step, index) => {
            const x = 70 + index * 230;
            return (
              <g key={step}>
                <rect
                  x={x}
                  y="120"
                  width="170"
                  height="120"
                  rx="18"
                  fill="#ffffff"
                  stroke={theme.accent}
                  strokeWidth="3"
                />
                <circle
                  cx={x + 30}
                  cy="150"
                  r="14"
                  fill={theme.accentSoft}
                  stroke={theme.accent}
                  strokeWidth="2"
                />
                <text
                  x={x + 30}
                  y="155"
                  textAnchor="middle"
                  fill={theme.text}
                  fontSize="12"
                  fontWeight="900"
                >
                  {index + 1}
                </text>
                <text
                  x={x + 85}
                  y="190"
                  textAnchor="middle"
                  fill={theme.text}
                  fontSize="17"
                  fontWeight="900"
                >
                  {step}
                </text>
              </g>
            );
          })}
          <path d="M250 180h40" stroke={theme.accentAlt} strokeWidth="6" strokeLinecap="round" />
          <path d="M280 170l10 10l-10 10" fill={theme.accentAlt} />
          <path d="M480 180h40" stroke={theme.accentAlt} strokeWidth="6" strokeLinecap="round" />
          <path d="M510 170l10 10l-10 10" fill={theme.accentAlt} />
          <rect
            x="90"
            y="285"
            width="580"
            height="58"
            rx="18"
            fill="#ffffff"
            stroke={theme.accent}
            strokeWidth="2"
          />
          <text
            x="380"
            y="320"
            textAnchor="middle"
            fill={theme.text}
            fontSize="16"
            fontWeight="800"
          >
            {config.heroFooter}
          </text>
        </svg>
      </figure>
    );
  }

  function ConceptVisual() {
    return (
      <figure
        className={`rounded-[2rem] border ${theme.border} ${theme.figure} p-4 shadow-xl ${theme.shadow}`}
      >
        <svg
          className="w-full"
          viewBox="0 0 760 360"
          role="img"
          aria-label={config.conceptTitle}
        >
          <rect width="760" height="360" rx="28" fill={theme.svgBg} />
          <text
            x="380"
            y="48"
            textAnchor="middle"
            fill={theme.text}
            fontSize="22"
            fontWeight="900"
          >
            {config.conceptTitle}
          </text>
          <rect
            x="70"
            y="95"
            width="250"
            height="170"
            rx="18"
            fill="#ffffff"
            stroke={theme.accent}
            strokeWidth="3"
          />
          <rect
            x="440"
            y="95"
            width="250"
            height="170"
            rx="18"
            fill="#ffffff"
            stroke={theme.accent}
            strokeWidth="3"
          />
          <text x="195" y="135" textAnchor="middle" fill={theme.text} fontSize="17" fontWeight="900">
            {config.conceptLeft.title}
          </text>
          <text
            x="195"
            y="170"
            textAnchor="middle"
            fill={theme.muted}
            fontSize="13"
            fontWeight="700"
          >
            {config.conceptLeft.body}
          </text>
          <text x="565" y="135" textAnchor="middle" fill={theme.text} fontSize="17" fontWeight="900">
            {config.conceptRight.title}
          </text>
          <text
            x="565"
            y="170"
            textAnchor="middle"
            fill={theme.muted}
            fontSize="13"
            fontWeight="700"
          >
            {config.conceptRight.body}
          </text>
          <path d="M330 180h100" stroke={theme.accentAlt} strokeWidth="6" strokeLinecap="round" />
          <path d="M410 170l10 10l-10 10" fill={theme.accentAlt} />
          <rect
            x="120"
            y="292"
            width="520"
            height="42"
            rx="14"
            fill={theme.accentSoft}
          />
          <text
            x="380"
            y="318"
            textAnchor="middle"
            fill={theme.text}
            fontSize="15"
            fontWeight="800"
          >
            {config.conceptFooter}
          </text>
        </svg>
      </figure>
    );
  }

  function PipelineVisual() {
    const steps = config.pipelineSteps.slice(0, 5);
    return (
      <figure
        className={`rounded-[2rem] border ${theme.border} ${theme.figure} p-4 shadow-xl ${theme.shadow}`}
      >
        <svg
          className="w-full"
          viewBox="0 0 760 360"
          role="img"
          aria-label={config.pipelineTitle}
        >
          <rect width="760" height="360" rx="28" fill={theme.svgBg} />
          <text
            x="380"
            y="48"
            textAnchor="middle"
            fill={theme.text}
            fontSize="22"
            fontWeight="900"
          >
            {config.pipelineTitle}
          </text>
          {steps.map((step, index) => {
            const x = 50 + index * 142;
            return (
              <g key={step}>
                <rect
                  x={x}
                  y="130"
                  width="110"
                  height="90"
                  rx="16"
                  fill="#ffffff"
                  stroke={theme.accent}
                  strokeWidth="2.5"
                />
                <circle
                  cx={x + 55}
                  cy="120"
                  r="18"
                  fill={theme.accent}
                  opacity="0.18"
                />
                <text
                  x={x + 55}
                  y="126"
                  textAnchor="middle"
                  fill={theme.text}
                  fontSize="13"
                  fontWeight="900"
                >
                  {index + 1}
                </text>
                <text
                  x={x + 55}
                  y="176"
                  textAnchor="middle"
                  fill={theme.text}
                  fontSize="13"
                  fontWeight="800"
                >
                  {step}
                </text>
              </g>
            );
          })}
          {steps.slice(0, -1).map((step, index) => (
            <g key={`${step}-arrow`}>
              <path
                d={`M${160 + index * 142} 175h28`}
                stroke={theme.accentAlt}
                strokeWidth="5"
                strokeLinecap="round"
              />
              <path
                d={`M${180 + index * 142} 167l10 8l-10 8`}
                fill={theme.accentAlt}
              />
            </g>
          ))}
        </svg>
      </figure>
    );
  }

  function ComparisonVisual() {
    const leftLines = wrapLines(config.comparisonLeft.body, 24);
    const rightLines = wrapLines(config.comparisonRight.body, 24);

    return (
      <figure
        className={`rounded-[2rem] border ${theme.border} ${theme.figure} p-4 shadow-xl ${theme.shadow}`}
      >
        <svg
          className="w-full"
          viewBox="0 0 760 370"
          role="img"
          aria-label={config.comparisonTitle}
        >
          <rect width="760" height="370" rx="28" fill={theme.svgBg} />
          <text
            x="380"
            y="48"
            textAnchor="middle"
            fill={theme.text}
            fontSize="22"
            fontWeight="900"
          >
            {config.comparisonTitle}
          </text>
          <rect
            x="60"
            y="90"
            width="280"
            height="220"
            rx="18"
            fill="#ffffff"
            stroke={theme.accent}
            strokeWidth="3"
          />
          <rect
            x="420"
            y="90"
            width="280"
            height="220"
            rx="18"
            fill="#ffffff"
            stroke={theme.accent}
            strokeWidth="3"
          />
          <text x="200" y="130" textAnchor="middle" fill={theme.text} fontSize="18" fontWeight="900">
            {config.comparisonLeft.title}
          </text>
          {leftLines.map((line, index) => (
            <text
              key={`left-${index}`}
              x="200"
              y={170 + index * 20}
              textAnchor="middle"
              fill={theme.muted}
              fontSize="13"
              fontWeight="700"
            >
              {line}
            </text>
          ))}
          <text x="560" y="130" textAnchor="middle" fill={theme.text} fontSize="18" fontWeight="900">
            {config.comparisonRight.title}
          </text>
          {rightLines.map((line, index) => (
            <text
              key={`right-${index}`}
              x="560"
              y={170 + index * 20}
              textAnchor="middle"
              fill={theme.muted}
              fontSize="13"
              fontWeight="700"
            >
              {line}
            </text>
          ))}
        </svg>
      </figure>
    );
  }

  function TradeoffVisual() {
    return (
      <figure
        className={`rounded-[2rem] border ${theme.border} ${theme.figure} p-4 shadow-xl ${theme.shadow}`}
      >
        <svg
          className="w-full"
          viewBox="0 0 760 360"
          role="img"
          aria-label={config.tradeoffTitle}
        >
          <rect width="760" height="360" rx="28" fill={theme.svgBg} />
          <text
            x="380"
            y="48"
            textAnchor="middle"
            fill={theme.text}
            fontSize="22"
            fontWeight="900"
          >
            {config.tradeoffTitle}
          </text>
          <line x1="100" y1="290" x2="660" y2="290" stroke={theme.muted} strokeWidth="3" />
          <line x1="100" y1="290" x2="100" y2="90" stroke={theme.muted} strokeWidth="3" />
          <text x="380" y="330" textAnchor="middle" fill={theme.text} fontSize="14" fontWeight="800">
            {config.tradeoffXAxis}
          </text>
          <text
            x="40"
            y="190"
            textAnchor="middle"
            fill={theme.text}
            fontSize="14"
            fontWeight="800"
            transform="rotate(-90 40 190)"
          >
            {config.tradeoffYAxis}
          </text>
          {config.tradeoffPoints.map((point) => {
            const cx = 100 + point.x * 560;
            const cy = 290 - point.y * 180;
            return (
              <g key={point.label}>
                <circle cx={cx} cy={cy} r="10" fill={theme.accent} />
                <text x={cx} y={cy - 16} textAnchor="middle" fill={theme.text} fontSize="12" fontWeight="900">
                  {point.label}
                </text>
              </g>
            );
          })}
        </svg>
      </figure>
    );
  }

  function ChecklistVisual() {
    return (
      <figure
        className={`rounded-[2rem] border ${theme.border} ${theme.figure} p-4 shadow-xl ${theme.shadow}`}
      >
        <svg
          className="w-full"
          viewBox="0 0 760 360"
          role="img"
          aria-label={config.checklistTitle}
        >
          <rect width="760" height="360" rx="28" fill={theme.svgBg} />
          <text
            x="380"
            y="48"
            textAnchor="middle"
            fill={theme.text}
            fontSize="22"
            fontWeight="900"
          >
            {config.checklistTitle}
          </text>
          {config.checklistItems.slice(0, 6).map((item, index) => {
            const y = 95 + index * 40;
            return (
              <g key={item}>
                <circle cx="110" cy={y} r="12" fill={theme.accentSoft} stroke={theme.accent} strokeWidth="2" />
                <path
                  d={`M104 ${y}l4 4l8-10`}
                  fill="none"
                  stroke={theme.accent}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <text x="140" y={y + 5} fill={theme.muted} fontSize="14" fontWeight="700">
                  {item}
                </text>
              </g>
            );
          })}
        </svg>
      </figure>
    );
  }

  return {
    hero: HeroVisual,
    concept: ConceptVisual,
    pipeline: PipelineVisual,
    comparison: ComparisonVisual,
    tradeoff: TradeoffVisual,
    checklist: ChecklistVisual,
  } satisfies LessonModule["visuals"];
}

function wrapLines(text: string, maxLength: number) {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxLength) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }

  if (current) {
    lines.push(current);
  }

  return lines.slice(0, 4);
}
