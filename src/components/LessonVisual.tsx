import type { VisualId } from "../types/content";

interface LessonVisualProps {
  visual: VisualId;
}

export function LessonVisual({ visual }: LessonVisualProps) {
  if (visual === "newton-motion") {
    return <NewtonMotionVisual />;
  }

  if (visual === "static-dynamic") {
    return <StaticDynamicVisual />;
  }

  return <SecantTangentVisual />;
}

function NewtonMotionVisual() {
  return (
    <figure className="overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-950 p-4 text-white shadow-2xl shadow-slate-900/15">
      <svg viewBox="0 0 760 420" role="img" aria-labelledby="newton-title" className="w-full">
        <title id="newton-title">Ilustração de Newton conectando movimento, órbita e curva</title>
        <defs>
          <radialGradient id="starGlow" cx="50%" cy="45%" r="70%">
            <stop offset="0%" stopColor="#fef3c7" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="curveGradient" x1="0" x2="1">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="50%" stopColor="#fb923c" />
            <stop offset="100%" stopColor="#34d399" />
          </linearGradient>
        </defs>
        <rect width="760" height="420" rx="32" fill="#0f172a" />
        <circle cx="610" cy="105" r="110" fill="url(#starGlow)" />
        <path
          d="M506 132c53-72 146-75 181-16 34 57-9 133-85 139-84 7-142-70-94-123Z"
          fill="none"
          stroke="#93c5fd"
          strokeDasharray="9 13"
          strokeWidth="3"
        />
        <circle cx="620" cy="115" r="19" fill="#fde68a" />
        <circle cx="700" cy="191" r="8" fill="#38bdf8" />
        <path
          d="M66 321C163 151 256 359 351 199c75-126 153-97 214 35 26 56 58 86 108 59"
          fill="none"
          stroke="url(#curveGradient)"
          strokeLinecap="round"
          strokeWidth="8"
        />
        <path d="M92 327h591" stroke="#475569" strokeLinecap="round" strokeWidth="2" />
        <path d="M108 345V106" stroke="#475569" strokeLinecap="round" strokeWidth="2" />
        <g transform="translate(130 80)">
          <circle cx="78" cy="72" r="34" fill="#f8fafc" />
          <path d="M35 178c8-51 23-76 55-76s47 25 55 76" fill="#cbd5e1" />
          <path
            d="M43 56c18-42 67-45 91-2-16-13-32-16-49-6-14 8-29 9-42 8Z"
            fill="#e2e8f0"
          />
          <path d="M62 75c13 12 28 12 42 0" stroke="#475569" strokeLinecap="round" strokeWidth="3" />
        </g>
        <g className="orbit-pulse">
          <path d="M453 194l65-45" stroke="#f97316" strokeLinecap="round" strokeWidth="4" />
          <path d="M518 149l-31 1 17 26" fill="none" stroke="#f97316" strokeLinecap="round" strokeWidth="4" />
        </g>
      </svg>
    </figure>
  );
}

function StaticDynamicVisual() {
  return (
    <figure className="grid gap-4 rounded-[2rem] border border-slate-200 bg-white p-4 shadow-xl shadow-slate-900/5 sm:grid-cols-2">
      <div className="rounded-[1.5rem] bg-blue-50 p-5">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-700">Formas estáticas</p>
        <svg viewBox="0 0 320 220" role="img" aria-label="Triângulo, círculo e retângulo" className="mt-5 w-full">
          <rect x="25" y="106" width="90" height="72" rx="12" fill="#bfdbfe" stroke="#2563eb" strokeWidth="4" />
          <circle cx="206" cy="70" r="43" fill="#dbeafe" stroke="#2563eb" strokeWidth="4" />
          <path d="M187 181l54-90 55 90H187Z" fill="#eff6ff" stroke="#2563eb" strokeWidth="4" />
        </svg>
        <p className="text-sm leading-6 text-slate-600">A figura está pronta. A pergunta é medir sua forma.</p>
      </div>
      <div className="rounded-[1.5rem] bg-orange-50 p-5">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-orange-700">
          Processos dinâmicos
        </p>
        <svg viewBox="0 0 320 220" role="img" aria-label="Movimento em curva ao longo do tempo" className="mt-5 w-full">
          <path d="M32 168C95 48 152 181 218 82c31-47 58-48 77-13" fill="none" stroke="#f97316" strokeLinecap="round" strokeWidth="7" />
          <circle cx="58" cy="129" r="9" fill="#0f172a" />
          <circle cx="139" cy="135" r="9" fill="#0f172a" />
          <circle cx="231" cy="72" r="9" fill="#0f172a" />
          <path d="M55 191h215" stroke="#94a3b8" strokeLinecap="round" strokeWidth="2" />
          <path d="M58 197v-12M139 197v-12M231 197v-12" stroke="#94a3b8" strokeLinecap="round" strokeWidth="2" />
          <text x="50" y="214" fill="#64748b" fontSize="15">t1</text>
          <text x="131" y="214" fill="#64748b" fontSize="15">t2</text>
          <text x="223" y="214" fill="#64748b" fontSize="15">t3</text>
        </svg>
        <p className="text-sm leading-6 text-slate-600">A figura muda. A pergunta é entender a transformação.</p>
      </div>
    </figure>
  );
}

function SecantTangentVisual() {
  return (
    <figure className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-xl shadow-slate-900/5">
      <svg viewBox="0 0 760 400" role="img" aria-labelledby="secant-title" className="w-full">
        <title id="secant-title">Diagrama de uma reta secante se aproximando de uma tangente</title>
        <rect width="760" height="400" rx="28" fill="#fff7ed" />
        <path d="M82 322h606" stroke="#cbd5e1" strokeLinecap="round" strokeWidth="3" />
        <path d="M115 334V62" stroke="#cbd5e1" strokeLinecap="round" strokeWidth="3" />
        <path
          d="M95 291C188 126 276 332 373 185c91-138 182-105 279 60"
          fill="none"
          stroke="#ea580c"
          strokeLinecap="round"
          strokeWidth="8"
        />
        <path
          d="M183 254L523 121"
          stroke="#2563eb"
          strokeDasharray="12 12"
          strokeLinecap="round"
          strokeWidth="5"
        />
        <path d="M286 200L511 206" stroke="#0f172a" strokeLinecap="round" strokeWidth="5" />
        <circle cx="246" cy="211" r="12" fill="#2563eb" stroke="#fff" strokeWidth="5" />
        <circle cx="474" cy="140" r="12" fill="#2563eb" stroke="#fff" strokeWidth="5" />
        <circle cx="396" cy="203" r="13" fill="#0f172a" stroke="#fff" strokeWidth="5" />
        <text x="177" y="86" fill="#2563eb" fontSize="24" fontWeight="800">
          secante = variação média
        </text>
        <text x="418" y="255" fill="#0f172a" fontSize="24" fontWeight="800">
          tangente = direção local
        </text>
        <text x="150" y="357" fill="#64748b" fontSize="18">
          Quando o intervalo tende a zero, a taxa média se aproxima da taxa instantânea.
        </text>
      </svg>
    </figure>
  );
}
