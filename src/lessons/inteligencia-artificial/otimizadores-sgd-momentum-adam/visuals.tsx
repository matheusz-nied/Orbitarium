import type { LessonModule } from "../../../types/content";

export const visuals = {
  "otimizadores-hero": OtimizadoresHeroVisual,
  "por-que-otimizadores-visual": PorQueOtimizadoresVisual,
  "sgd-ruido-visual": SgdRuidoVisual,
  "momentum-velocidade-visual": MomentumVelocidadeVisual,
  "adam-momentos-visual": AdamMomentosVisual,
  "trajetorias-visual": TrajetoriasVisual,
  "schedules-visual": SchedulesVisual,
} satisfies LessonModule["visuals"];

function OtimizadoresHeroVisual() {
  return (
    <figure className="overflow-hidden rounded-[2rem] border border-teal-200 bg-white p-4 shadow-xl shadow-teal-900/10">
      <svg className="w-full" viewBox="0 0 760 390" role="img" aria-label="Diferentes trajetórias de otimização em uma superfície de perda">
        <defs>
          <linearGradient id="optHeroBg" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#f0fdfa" />
            <stop offset="55%" stopColor="#eef2ff" />
            <stop offset="100%" stopColor="#fff7ed" />
          </linearGradient>
        </defs>
        <rect width="760" height="390" rx="30" fill="url(#optHeroBg)" />
        <text x="380" y="52" textAnchor="middle" fill="#0f766e" fontSize="26" fontWeight="900">
          Mesmo gradiente, estilos diferentes de navegação
        </text>
        <ellipse cx="380" cy="220" rx="240" ry="100" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
        <ellipse cx="380" cy="220" rx="170" ry="68" fill="none" stroke="#cbd5e1" strokeWidth="2" />
        <ellipse cx="380" cy="220" rx="90" ry="35" fill="none" stroke="#cbd5e1" strokeWidth="2" />
        <path d="M160 105 C 210 140, 250 145, 280 182 S 330 250, 380 220" stroke="#0284c7" strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M150 135 C 200 185, 250 190, 320 220 S 360 235, 380 220" stroke="#f59e0b" strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M175 155 C 235 190, 300 205, 355 215 S 375 220, 380 220" stroke="#10b981" strokeWidth="5" fill="none" strokeLinecap="round" />
        <text x="200" y="100" fill="#0284c7" fontSize="13" fontWeight="900">SGD</text>
        <text x="155" y="128" fill="#f59e0b" fontSize="13" fontWeight="900">Momentum</text>
        <text x="180" y="155" fill="#10b981" fontSize="13" fontWeight="900">Adam</text>
      </svg>
    </figure>
  );
}

function PorQueOtimizadoresVisual() {
  return (
    <figure className="rounded-[2rem] border border-sky-200 bg-sky-50 p-4 shadow-xl shadow-sky-900/5">
      <svg className="w-full" viewBox="0 0 760 330" role="img" aria-label="Gradiente como seta local e otimizador como regra de movimento">
        <rect width="760" height="330" rx="28" fill="#f0f9ff" />
        <text x="380" y="48" textAnchor="middle" fill="#0c4a6e" fontSize="22" fontWeight="900">O gradiente aponta; o otimizador interpreta</text>
        <path d="M120 240 C 220 80, 330 80, 450 210 S 620 290, 660 120" stroke="#38bdf8" strokeWidth="6" fill="none" strokeLinecap="round" />
        <circle cx="500" cy="220" r="10" fill="#be123c" />
        <path d="M500 220l-70 -20" stroke="#be123c" strokeWidth="5" strokeLinecap="round" />
        <path d="M435 190l10 0l-5 10" fill="#be123c" />
        <text x="540" y="240" fill="#0c4a6e" fontSize="14" fontWeight="900">gradiente local</text>
      </svg>
    </figure>
  );
}

function SgdRuidoVisual() {
  return (
    <figure className="rounded-[2rem] border border-indigo-200 bg-indigo-50 p-4 shadow-xl shadow-indigo-900/5">
      <svg className="w-full" viewBox="0 0 760 330" role="img" aria-label="Trajetória ziguezagueante do SGD">
        <rect width="760" height="330" rx="28" fill="#eef2ff" />
        <text x="380" y="48" textAnchor="middle" fill="#3730a3" fontSize="22" fontWeight="900">Mini-batches empurram o caminho para lados levemente diferentes</text>
        <ellipse cx="400" cy="200" rx="210" ry="82" fill="#ffffff" stroke="#c7d2fe" strokeWidth="2" />
        <path d="M180 120 C 220 145, 245 150, 275 180 S 330 170, 360 210 S 420 180, 450 220 S 520 205, 560 200" stroke="#4f46e5" strokeWidth="5" fill="none" strokeLinecap="round" />
      </svg>
    </figure>
  );
}

function MomentumVelocidadeVisual() {
  return (
    <figure className="rounded-[2rem] border border-amber-200 bg-amber-50 p-4 shadow-xl shadow-amber-900/5">
      <svg className="w-full" viewBox="0 0 760 330" role="img" aria-label="Momentum como inércia em um vale alongado">
        <rect width="760" height="330" rx="28" fill="#fffbeb" />
        <text x="380" y="48" textAnchor="middle" fill="#92400e" fontSize="22" fontWeight="900">Memória reduz zigue-zague transversal</text>
        <ellipse cx="400" cy="200" rx="240" ry="82" fill="#ffffff" stroke="#fde68a" strokeWidth="2" />
        <path d="M170 155 C 250 205, 295 210, 360 205 S 455 195, 570 195" stroke="#f59e0b" strokeWidth="5" fill="none" strokeLinecap="round" />
      </svg>
    </figure>
  );
}

function AdamMomentosVisual() {
  return (
    <figure className="rounded-[2rem] border border-emerald-200 bg-emerald-50 p-4 shadow-xl shadow-emerald-900/5">
      <svg className="w-full" viewBox="0 0 760 330" role="img" aria-label="Adam combinando primeiro e segundo momentos">
        <rect width="760" height="330" rx="28" fill="#ecfdf5" />
        <text x="380" y="48" textAnchor="middle" fill="#065f46" fontSize="22" fontWeight="900">Adam mistura direção média e escala histórica</text>
        <rect x="110" y="105" width="180" height="150" rx="18" fill="#ffffff" stroke="#10b981" strokeWidth="3" />
        <text x="200" y="138" textAnchor="middle" fill="#065f46" fontSize="16" fontWeight="900">m_t</text>
        <text x="200" y="170" textAnchor="middle" fill="#047857" fontSize="13" fontWeight="700">média móvel do gradiente</text>
        <rect x="470" y="105" width="180" height="150" rx="18" fill="#ffffff" stroke="#10b981" strokeWidth="3" />
        <text x="560" y="138" textAnchor="middle" fill="#065f46" fontSize="16" fontWeight="900">v_t</text>
        <text x="560" y="170" textAnchor="middle" fill="#047857" fontSize="13" fontWeight="700">média móvel do gradiente²</text>
        <path d="M290 180h150" stroke="#10b981" strokeWidth="5" strokeLinecap="round" />
      </svg>
    </figure>
  );
}

function TrajetoriasVisual() {
  return (
    <figure className="rounded-[2rem] border border-rose-200 bg-rose-50 p-4 shadow-xl shadow-rose-900/5">
      <svg className="w-full" viewBox="0 0 760 340" role="img" aria-label="Comparação de trajetórias em superfície elíptica">
        <rect width="760" height="340" rx="28" fill="#fff1f2" />
        <text x="380" y="48" textAnchor="middle" fill="#9f1239" fontSize="22" fontWeight="900">Trajetória também é comportamento do modelo</text>
        <ellipse cx="380" cy="205" rx="240" ry="88" fill="#ffffff" stroke="#fecdd3" strokeWidth="2" />
        <ellipse cx="380" cy="205" rx="160" ry="56" fill="none" stroke="#fecdd3" strokeWidth="2" />
        <ellipse cx="380" cy="205" rx="90" ry="30" fill="none" stroke="#fecdd3" strokeWidth="2" />
      </svg>
    </figure>
  );
}

function SchedulesVisual() {
  return (
    <figure className="rounded-[2rem] border border-fuchsia-200 bg-fuchsia-50 p-4 shadow-xl shadow-fuchsia-900/5">
      <svg className="w-full" viewBox="0 0 760 330" role="img" aria-label="Curvas conceituais de learning rate schedule">
        <rect width="760" height="330" rx="28" fill="#fdf4ff" />
        <text x="380" y="48" textAnchor="middle" fill="#86198f" fontSize="22" fontWeight="900">A taxa pode mudar ao longo do tempo</text>
        <line x1="100" y1="250" x2="650" y2="250" stroke="#cbd5e1" strokeWidth="2" />
        <line x1="100" y1="80" x2="100" y2="270" stroke="#cbd5e1" strokeWidth="2" />
        <path d="M120 120 H 620" stroke="#d946ef" strokeWidth="5" fill="none" />
        <path d="M120 150 H 260 V 190 H 430 V 225 H 620" stroke="#4f46e5" strokeWidth="5" fill="none" />
        <path d="M120 110 C 220 118, 320 145, 420 195 S 560 250, 620 250" stroke="#0f766e" strokeWidth="5" fill="none" />
      </svg>
    </figure>
  );
}
