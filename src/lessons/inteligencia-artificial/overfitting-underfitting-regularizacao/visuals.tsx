import type { LessonModule } from "../../../types/content";

export const visuals = {
  "fit-hero": FitHeroVisual,
  "bias-variance-targets": BiasVarianceTargetsVisual,
  "capacity-curves": CapacityCurvesVisual,
  "weight-shrinkage": WeightShrinkageVisual,
  "early-stopping-roadmap": EarlyStoppingRoadmapVisual,
  "regularization-toolbox": RegularizationToolboxVisual,
} satisfies LessonModule["visuals"];

function FitHeroVisual() {
  return (
    <figure className="overflow-hidden rounded-[2rem] border border-indigo-200 bg-white p-4 shadow-xl shadow-indigo-900/10">
      <svg className="w-full" viewBox="0 0 760 420" role="img" aria-label="Equilíbrio entre underfitting e overfitting">
        <defs>
          <linearGradient id="fitHeroBg" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#eef2ff" />
            <stop offset="50%" stopColor="#fff7ed" />
            <stop offset="100%" stopColor="#ecfdf5" />
          </linearGradient>
        </defs>
        <rect width="760" height="420" rx="30" fill="url(#fitHeroBg)" />
        <text x="380" y="56" textAnchor="middle" fill="#0f172a" fontSize="26" fontWeight="900">
          Ajustar demais e ajustar de menos são erros diferentes
        </text>
        <rect x="80" y="120" width="170" height="160" rx="24" fill="#ffffff" stroke="#f59e0b" strokeWidth="3" />
        <text x="165" y="155" textAnchor="middle" fill="#b45309" fontSize="18" fontWeight="900">Underfitting</text>
        <path d="M105 240 C 140 150, 190 150, 225 240" fill="none" stroke="#f59e0b" strokeWidth="5" />
        <rect x="295" y="105" width="170" height="190" rx="24" fill="#ffffff" stroke="#0f766e" strokeWidth="3" />
        <text x="380" y="145" textAnchor="middle" fill="#0f766e" fontSize="18" fontWeight="900">Boa capacidade</text>
        <path d="M320 245 C 345 190, 380 165, 440 120" fill="none" stroke="#0f766e" strokeWidth="5" />
        <rect x="510" y="120" width="170" height="160" rx="24" fill="#ffffff" stroke="#e11d48" strokeWidth="3" />
        <text x="595" y="155" textAnchor="middle" fill="#be123c" fontSize="18" fontWeight="900">Overfitting</text>
        <path d="M530 240 C 550 120, 565 260, 585 150 S 630 270, 660 130" fill="none" stroke="#e11d48" strokeWidth="5" />
      </svg>
    </figure>
  );
}

function BiasVarianceTargetsVisual() {
  return (
    <figure className="rounded-[2rem] border border-amber-200 bg-amber-50 p-4 shadow-xl shadow-amber-900/5">
      <svg className="w-full" viewBox="0 0 760 340" role="img" aria-label="Alvos mostrando viés e variância">
        <rect width="760" height="340" rx="28" fill="#fffbeb" />
        <text x="380" y="48" textAnchor="middle" fill="#92400e" fontSize="22" fontWeight="900">
          Viés e variância em linguagem visual
        </text>
        {[
          { x: 150, title: "alto viés", dots: [[150, 170], [135, 185], [165, 185], [150, 200]] },
          { x: 380, title: "equilíbrio", dots: [[380, 170], [392, 182], [365, 185], [377, 198]] },
          { x: 610, title: "alta variância", dots: [[585, 150], [640, 175], [590, 215], [625, 225]] },
        ].map((target) => (
          <g key={target.title}>
            <circle cx={target.x} cy="185" r="72" fill="#ffffff" stroke="#92400e" strokeWidth="3" />
            <circle cx={target.x} cy="185" r="18" fill="#fbbf24" opacity="0.45" />
            {target.dots.map(([x, y], index) => (
              <circle key={index} cx={x} cy={y} r="6" fill="#0f172a" />
            ))}
            <text x={target.x} y="285" textAnchor="middle" fill="#92400e" fontSize="15" fontWeight="900">
              {target.title}
            </text>
          </g>
        ))}
      </svg>
    </figure>
  );
}

function CapacityCurvesVisual() {
  return (
    <figure className="rounded-[2rem] border border-indigo-200 bg-indigo-50 p-4 shadow-xl shadow-indigo-900/5">
      <svg className="w-full" viewBox="0 0 760 340" role="img" aria-label="Curvas de capacidade e erro">
        <rect width="760" height="340" rx="28" fill="#eef2ff" />
        <text x="380" y="48" textAnchor="middle" fill="#4338ca" fontSize="22" fontWeight="900">
          Mais capacidade não significa melhor generalização
        </text>
        <line x1="110" y1="265" x2="650" y2="265" stroke="#475569" strokeWidth="3" />
        <line x1="110" y1="265" x2="110" y2="75" stroke="#475569" strokeWidth="3" />
        <path d="M110 225 C 220 190, 320 145, 650 90" fill="none" stroke="#4f46e5" strokeWidth="5" />
        <path d="M110 205 C 230 135, 350 120, 455 155 S 580 210, 650 235" fill="none" stroke="#f97316" strokeWidth="5" />
        <text x="570" y="103" fill="#4f46e5" fontSize="14" fontWeight="800">erro de treino</text>
        <text x="560" y="227" fill="#c2410c" fontSize="14" fontWeight="800">erro fora do treino</text>
      </svg>
    </figure>
  );
}

function WeightShrinkageVisual() {
  return (
    <figure className="rounded-[2rem] border border-teal-200 bg-teal-50 p-4 shadow-xl shadow-teal-900/5">
      <svg className="w-full" viewBox="0 0 760 340" role="img" aria-label="Encolhimento de pesos pela regularização">
        <rect width="760" height="340" rx="28" fill="#f0fdfa" />
        <text x="380" y="48" textAnchor="middle" fill="#0f766e" fontSize="22" fontWeight="900">
          Regularizar é restringir a liberdade excessiva
        </text>
        {[
          { x: 170, height: 120, color: "#0f766e" },
          { x: 260, height: 95, color: "#0f766e" },
          { x: 350, height: 75, color: "#0f766e" },
          { x: 440, height: 55, color: "#0f766e" },
          { x: 530, height: 40, color: "#0f766e" },
        ].map((bar, index) => (
          <rect
            key={index}
            x={bar.x}
            y={240 - bar.height}
            width="38"
            height={bar.height}
            rx="10"
            fill={bar.color}
            opacity={0.55 + index * 0.08}
          />
        ))}
        <text x="380" y="300" textAnchor="middle" fill="#0f766e" fontSize="15" fontWeight="900">
          Pesos menores tendem a produzir soluções mais suaves e menos frágeis
        </text>
      </svg>
    </figure>
  );
}

function EarlyStoppingRoadmapVisual() {
  return (
    <figure className="rounded-[2rem] border border-rose-200 bg-rose-50 p-4 shadow-xl shadow-rose-900/5">
      <svg className="w-full" viewBox="0 0 760 340" role="img" aria-label="Early stopping acompanhando validação">
        <rect width="760" height="340" rx="28" fill="#fff1f2" />
        <text x="380" y="48" textAnchor="middle" fill="#be123c" fontSize="22" fontWeight="900">
          Early stopping usa a validação como freio
        </text>
        <line x1="110" y1="265" x2="650" y2="265" stroke="#475569" strokeWidth="3" />
        <line x1="110" y1="265" x2="110" y2="75" stroke="#475569" strokeWidth="3" />
        <path d="M110 220 C 200 170, 300 120, 650 90" fill="none" stroke="#4f46e5" strokeWidth="5" />
        <path d="M110 225 C 220 180, 320 130, 420 120 S 560 150, 650 225" fill="none" stroke="#f59e0b" strokeWidth="5" />
        <line x1="430" y1="90" x2="430" y2="265" stroke="#0f172a" strokeDasharray="7 6" strokeWidth="3" />
        <text x="438" y="88" fill="#0f172a" fontSize="13" fontWeight="800">parar aqui</text>
      </svg>
    </figure>
  );
}

function RegularizationToolboxVisual() {
  return (
    <figure className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-xl shadow-slate-900/5">
      <svg className="w-full" viewBox="0 0 760 340" role="img" aria-label="Ferramentas de regularização">
        <rect width="760" height="340" rx="28" fill="#f8fafc" />
        <text x="380" y="48" textAnchor="middle" fill="#0f172a" fontSize="22" fontWeight="900">
          Regularização é uma família de controles, não uma única técnica
        </text>
        {[
          { x: 80, title: "L2", subtitle: "penaliza pesos grandes", color: "#0f766e", bg: "#ecfdf5" },
          { x: 290, title: "early stopping", subtitle: "para antes do excesso", color: "#f59e0b", bg: "#fffbeb" },
          { x: 500, title: "mais dados", subtitle: "reduz variância", color: "#4f46e5", bg: "#eef2ff" },
        ].map((card) => (
          <g key={card.title}>
            <rect x={card.x} y="110" width="180" height="150" rx="22" fill={card.bg} stroke={card.color} strokeWidth="3" />
            <text x={card.x + 90} y="160" textAnchor="middle" fill={card.color} fontSize="18" fontWeight="900">{card.title}</text>
            <text x={card.x + 90} y="195" textAnchor="middle" fill={card.color} fontSize="14" fontWeight="700">{card.subtitle}</text>
          </g>
        ))}
      </svg>
    </figure>
  );
}
