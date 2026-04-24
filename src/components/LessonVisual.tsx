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

  if (visual === "secant-tangent") {
    return <SecantTangentVisual />;
  }

  if (visual === "area-under-curve") {
    return <AreaUnderCurveVisual />;
  }

  if (visual === "derivative-integral-flow") {
    return <DerivativeIntegralFlowVisual />;
  }

  if (visual === "fluxions-flow") {
    return <FluxionsFlowVisual />;
  }

  if (visual === "falling-orbit") {
    return <FallingOrbitVisual />;
  }

  if (visual === "newton-leibniz") {
    return <NewtonLeibnizVisual />;
  }

  if (visual === "timeline") {
    return <TimelineVisual />;
  }

  return <SummaryVisual />;
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

function AreaUnderCurveVisual() {
  return (
    <figure className="rounded-[2rem] border border-emerald-200 bg-emerald-50 p-4 shadow-xl shadow-emerald-900/5">
      <svg viewBox="0 0 760 400" role="img" aria-label="Diagrama de área sob uma curva" className="w-full">
        <rect width="760" height="400" rx="28" fill="#ecfdf5" />
        <path d="M84 326h600" stroke="#94a3b8" strokeLinecap="round" strokeWidth="3" />
        <path d="M112 338V66" stroke="#94a3b8" strokeLinecap="round" strokeWidth="3" />
        <path
          d="M118 312C192 142 280 302 366 176c78-114 169-104 274 49v87H118Z"
          fill="#a7f3d0"
          opacity="0.78"
        />
        <path
          d="M118 312C192 142 280 302 366 176c78-114 169-104 274 49"
          fill="none"
          stroke="#047857"
          strokeLinecap="round"
          strokeWidth="8"
        />
        {Array.from({ length: 9 }, (_, index) => (
          <rect
            key={index}
            x={138 + index * 52}
            y={220 - Math.sin(index * 0.8) * 45}
            width="42"
            height={312 - (220 - Math.sin(index * 0.8) * 45)}
            fill="#d1fae5"
            stroke="#059669"
            strokeWidth="2"
          />
        ))}
        <text x="180" y="72" fill="#047857" fontSize="25" fontWeight="800">
          somar pequenas partes
        </text>
      </svg>
    </figure>
  );
}

function DerivativeIntegralFlowVisual() {
  const boxes = [
    { label: "posição", x: 70, y: 90, fill: "#dbeafe" },
    { label: "velocidade", x: 290, y: 90, fill: "#ffedd5" },
    { label: "aceleração", x: 510, y: 90, fill: "#fef3c7" },
    { label: "aceleração", x: 70, y: 245, fill: "#fef3c7" },
    { label: "velocidade", x: 290, y: 245, fill: "#dcfce7" },
    { label: "posição", x: 510, y: 245, fill: "#ede9fe" },
  ];

  return (
    <figure className="rounded-[2rem] border border-violet-200 bg-violet-50 p-4 shadow-xl shadow-violet-900/5">
      <svg viewBox="0 0 760 400" role="img" aria-label="Fluxo entre posição, velocidade e aceleração" className="w-full">
        <rect width="760" height="400" rx="28" fill="#f5f3ff" />
        {boxes.map((box) => (
          <g key={`${box.label}-${box.x}`}>
            <rect x={box.x} y={box.y} width="160" height="74" rx="22" fill={box.fill} stroke="#c4b5fd" strokeWidth="2" />
            <text x={box.x + 80} y={box.y + 45} textAnchor="middle" fill="#111827" fontSize="20" fontWeight="800">
              {box.label}
            </text>
          </g>
        ))}
        <path d="M234 126h48" stroke="#ea580c" strokeWidth="5" strokeLinecap="round" />
        <path d="M454 126h48" stroke="#ea580c" strokeWidth="5" strokeLinecap="round" />
        <path d="M282 126l-16-10v20l16-10Z" fill="#ea580c" />
        <path d="M502 126l-16-10v20l16-10Z" fill="#ea580c" />
        <text x="373" y="64" textAnchor="middle" fill="#ea580c" fontSize="19" fontWeight="800">
          derivar revela mudança
        </text>
        <path d="M234 282h48" stroke="#059669" strokeWidth="5" strokeLinecap="round" />
        <path d="M454 282h48" stroke="#059669" strokeWidth="5" strokeLinecap="round" />
        <path d="M282 282l-16-10v20l16-10Z" fill="#059669" />
        <path d="M502 282l-16-10v20l16-10Z" fill="#059669" />
        <text x="373" y="366" textAnchor="middle" fill="#059669" fontSize="19" fontWeight="800">
          integrar reconstrói acumulação
        </text>
      </svg>
    </figure>
  );
}

function FluxionsFlowVisual() {
  return (
    <figure className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-xl shadow-slate-900/5">
      <svg viewBox="0 0 760 320" role="img" aria-label="Fluxo de fluentes e fluxões" className="w-full">
        <rect width="760" height="320" rx="28" fill="#f8fafc" />
        {[
          ["posição", "fluente", 80, "#dbeafe"],
          ["velocidade", "fluxão da posição", 300, "#ffedd5"],
          ["aceleração", "fluxão da velocidade", 520, "#fee2e2"],
        ].map(([title, subtitle, x, fill]) => (
          <g key={title}>
            <rect x={Number(x)} y="92" width="160" height="120" rx="26" fill={String(fill)} stroke="#cbd5e1" strokeWidth="2" />
            <text x={Number(x) + 80} y="143" textAnchor="middle" fill="#111827" fontSize="22" fontWeight="800">
              {title}
            </text>
            <text x={Number(x) + 80} y="174" textAnchor="middle" fill="#475569" fontSize="14" fontWeight="700">
              {subtitle}
            </text>
          </g>
        ))}
        <path d="M248 152h42M468 152h42" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" />
        <path d="M290 152l-14-9v18l14-9ZM510 152l-14-9v18l14-9Z" fill="#0f172a" />
        <text x="380" y="54" textAnchor="middle" fill="#334155" fontSize="22" fontWeight="800">
          quantidades que fluem e suas taxas de fluxo
        </text>
      </svg>
    </figure>
  );
}

function FallingOrbitVisual() {
  return (
    <figure className="overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-950 p-4 text-white shadow-2xl shadow-slate-900/15">
      <svg viewBox="0 0 760 420" role="img" aria-label="Objeto caindo e planeta orbitando" className="w-full">
        <rect width="760" height="420" rx="28" fill="#0f172a" />
        <path d="M470 112c60-70 162-46 177 39 12 71-55 132-130 101-79-32-90-91-47-140Z" fill="none" stroke="#93c5fd" strokeDasharray="10 12" strokeWidth="3" />
        <circle cx="570" cy="178" r="44" fill="#60a5fa" opacity="0.9" />
        <circle cx="657" cy="142" r="12" fill="#fbbf24" />
        <path d="M156 70v260" stroke="#64748b" strokeWidth="4" strokeLinecap="round" strokeDasharray="8 12" />
        <circle cx="156" cy="105" r="18" fill="#f97316" />
        <circle cx="156" cy="180" r="18" fill="#fb923c" opacity="0.75" />
        <circle cx="156" cy="270" r="18" fill="#fed7aa" opacity="0.65" />
        <path d="M122 302h100" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" />
        <text x="86" y="374" fill="#e2e8f0" fontSize="22" fontWeight="800">
          queda: aceleração muda velocidade
        </text>
        <text x="442" y="350" fill="#e2e8f0" fontSize="22" fontWeight="800">
          órbita: direção muda continuamente
        </text>
      </svg>
    </figure>
  );
}

function NewtonLeibnizVisual() {
  return (
    <figure className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-xl shadow-slate-900/5">
      <svg viewBox="0 0 760 360" role="img" aria-label="Comparação visual entre Newton e Leibniz" className="w-full">
        <rect width="760" height="360" rx="28" fill="#fafaf9" />
        <rect x="74" y="70" width="270" height="210" rx="32" fill="#dbeafe" stroke="#2563eb" strokeWidth="3" />
        <rect x="416" y="70" width="270" height="210" rx="32" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="3" />
        <circle cx="150" cy="138" r="38" fill="#f8fafc" stroke="#2563eb" strokeWidth="3" />
        <path d="M116 204c8-39 24-57 55-57s48 18 57 57" fill="#bfdbfe" />
        <text x="212" y="132" fill="#1e3a8a" fontSize="27" fontWeight="900">Newton</text>
        <text x="212" y="166" fill="#1e40af" fontSize="16" fontWeight="800">movimento, fluxões</text>
        <circle cx="492" cy="138" r="38" fill="#f8fafc" stroke="#7c3aed" strokeWidth="3" />
        <path d="M458 204c8-39 24-57 55-57s48 18 57 57" fill="#ddd6fe" />
        <text x="554" y="132" fill="#4c1d95" fontSize="27" fontWeight="900">Leibniz</text>
        <text x="554" y="166" fill="#6d28d9" fontSize="16" fontWeight="800">símbolos, dx, ∫</text>
        <path d="M356 176h48" stroke="#0f172a" strokeWidth="5" strokeLinecap="round" />
        <path d="M404 176l-16-10v20l16-10Z" fill="#0f172a" />
        <text x="380" y="232" textAnchor="middle" fill="#334155" fontSize="17" fontWeight="800">duas rotas para a mesma revolução</text>
      </svg>
    </figure>
  );
}

function TimelineVisual() {
  return (
    <figure className="rounded-[2rem] border border-blue-200 bg-blue-50 p-4 shadow-xl shadow-blue-900/5">
      <svg viewBox="0 0 760 260" role="img" aria-label="Linha do tempo visual do nascimento do cálculo" className="w-full">
        <rect width="760" height="260" rx="28" fill="#eff6ff" />
        <path d="M86 132h590" stroke="#2563eb" strokeWidth="5" strokeLinecap="round" />
        {["Geometria", "Galileu", "Kepler", "Newton", "Principia", "Leibniz"].map((label, index) => {
          const x = 92 + index * 116;
          return (
            <g key={label}>
              <circle cx={x} cy="132" r="17" fill="#2563eb" stroke="#fff" strokeWidth="6" />
              <text x={x} y={index % 2 === 0 ? 88 : 188} textAnchor="middle" fill="#1e3a8a" fontSize="17" fontWeight="900">
                {label}
              </text>
            </g>
          );
        })}
      </svg>
    </figure>
  );
}

function SummaryVisual() {
  return (
    <figure className="rounded-[2rem] border border-violet-200 bg-violet-50 p-4 shadow-xl shadow-violet-900/5">
      <svg viewBox="0 0 760 320" role="img" aria-label="Resumo visual de derivada, integral e cálculo" className="w-full">
        <rect width="760" height="320" rx="28" fill="#f5f3ff" />
        {[
          ["Derivada", "mudança", 86, "#ffedd5", "#ea580c"],
          ["Integral", "acumulação", 300, "#dcfce7", "#059669"],
          ["Teorema", "conexão", 514, "#ede9fe", "#7c3aed"],
        ].map(([title, subtitle, x, fill, stroke]) => (
          <g key={title}>
            <rect x={Number(x)} y="90" width="160" height="130" rx="28" fill={String(fill)} stroke={String(stroke)} strokeWidth="4" />
            <text x={Number(x) + 80} y="146" textAnchor="middle" fill="#111827" fontSize="24" fontWeight="900">{title}</text>
            <text x={Number(x) + 80} y="180" textAnchor="middle" fill="#475569" fontSize="16" fontWeight="800">{subtitle}</text>
          </g>
        ))}
        <text x="380" y="270" textAnchor="middle" fill="#334155" fontSize="20" fontWeight="900">
          cálculo = matemática da variação
        </text>
      </svg>
    </figure>
  );
}
