import type { LessonModule } from "../../../types/content";

export const visuals = {
  "gradientes-hero": GradientesHeroVisual,
  "loss-landscape": LossLandscapeVisual,
  "derivada-inclinacao": DerivadaInclinacaoVisual,
  "gradiente-vetor": GradienteVetorVisual,
  "learning-rate-tradeoff": LearningRateTradeoffVisual,
  "superficie-de-perda": SuperficieDePerdaVisual,
  "locais-vs-globais": LocaisVsGlobaisVisual,
  "otimizacao-no-ml": OtimizacaoNoMlVisual,
} satisfies LessonModule["visuals"];

function GradientesHeroVisual() {
  return (
    <figure className="overflow-hidden rounded-[2rem] border border-emerald-200 bg-white p-4 shadow-xl shadow-emerald-900/10">
      <svg className="w-full" viewBox="0 0 760 420" role="img" aria-label="Gradientes como guia de treinamento em machine learning">
        <defs>
          <linearGradient id="gradHeroBg" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#ecfdf5" />
            <stop offset="55%" stopColor="#eef2ff" />
            <stop offset="100%" stopColor="#fffbeb" />
          </linearGradient>
        </defs>
        <rect width="760" height="420" rx="30" fill="url(#gradHeroBg)" />
        <text x="380" y="52" textAnchor="middle" fill="#0f172a" fontSize="28" fontWeight="900">
          Treinar = descer uma paisagem de erro usando inclinações locais
        </text>
        <path d="M70 285C150 170 230 145 305 215C380 285 470 295 545 210C620 125 670 165 710 245" fill="none" stroke="#16a34a" strokeWidth="8" strokeLinecap="round" />
        {[[120, 240], [220, 180], [315, 220], [420, 270], [575, 185]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="9" fill="#10b981" />
        ))}
        <path d="M135 225l18 -12" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" />
        <path d="M300 235l18 10" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" />
        <path d="M565 200l20 -14" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" />
        <text x="380" y="360" textAnchor="middle" fill="#166534" fontSize="16" fontWeight="800">
          O gradiente informa a subida local; o treinamento anda na direção oposta
        </text>
      </svg>
    </figure>
  );
}

function LossLandscapeVisual() {
  return (
    <figure className="rounded-[2rem] border border-indigo-200 bg-indigo-50 p-4 shadow-xl shadow-indigo-900/5">
      <svg className="w-full" viewBox="0 0 760 360" role="img" aria-label="Paisagem de perda como vale a ser minimizado">
        <rect width="760" height="360" rx="28" fill="#eef2ff" />
        <text x="380" y="48" textAnchor="middle" fill="#3730a3" fontSize="22" fontWeight="900">
          Cada ponto de parâmetros tem uma altura de erro
        </text>
        <path d="M80 260C150 150 250 130 340 235C430 340 560 290 680 150" fill="none" stroke="#6366f1" strokeWidth="8" strokeLinecap="round" />
        <text x="115" y="125" fill="#4338ca" fontSize="14" fontWeight="900">loss alta</text>
        <text x="363" y="300" fill="#4338ca" fontSize="14" fontWeight="900">vale</text>
      </svg>
    </figure>
  );
}

function DerivadaInclinacaoVisual() {
  return (
    <figure className="rounded-[2rem] border border-sky-200 bg-sky-50 p-4 shadow-xl shadow-sky-900/5">
      <svg className="w-full" viewBox="0 0 760 360" role="img" aria-label="Derivada como inclinação da tangente">
        <rect width="760" height="360" rx="28" fill="#f0f9ff" />
        <text x="380" y="48" textAnchor="middle" fill="#0369a1" fontSize="22" fontWeight="900">
          Derivada = inclinação local da curva
        </text>
        <path d="M90 265C200 265 240 120 360 180C460 230 560 290 670 120" fill="none" stroke="#0ea5e9" strokeWidth="8" strokeLinecap="round" />
        <circle cx="360" cy="180" r="9" fill="#0284c7" />
        <line x1="270" y1="130" x2="450" y2="230" stroke="#0f172a" strokeWidth="4" strokeDasharray="8 8" />
      </svg>
    </figure>
  );
}

function GradienteVetorVisual() {
  return (
    <figure className="rounded-[2rem] border border-violet-200 bg-violet-50 p-4 shadow-xl shadow-violet-900/5">
      <svg className="w-full" viewBox="0 0 760 360" role="img" aria-label="Gradiente como vetor em superfície de nível">
        <rect width="760" height="360" rx="28" fill="#faf5ff" />
        <text x="380" y="48" textAnchor="middle" fill="#6d28d9" fontSize="22" fontWeight="900">
          O gradiente é perpendicular às curvas de nível e aponta subida
        </text>
        <ellipse cx="380" cy="200" rx="210" ry="90" fill="none" stroke="#c4b5fd" strokeWidth="4" />
        <ellipse cx="380" cy="200" rx="140" ry="58" fill="none" stroke="#a78bfa" strokeWidth="4" />
        <ellipse cx="380" cy="200" rx="70" ry="28" fill="none" stroke="#8b5cf6" strokeWidth="4" />
        <path d="M380 200L510 120" stroke="#7c3aed" strokeWidth="7" strokeLinecap="round" />
        <path d="M510 120l-20 4l7 18" fill="#7c3aed" />
      </svg>
    </figure>
  );
}

function LearningRateTradeoffVisual() {
  return (
    <figure className="rounded-[2rem] border border-amber-200 bg-amber-50 p-4 shadow-xl shadow-amber-900/5">
      <svg className="w-full" viewBox="0 0 760 360" role="img" aria-label="Comparação de learning rates">
        <rect width="760" height="360" rx="28" fill="#fffbeb" />
        <text x="380" y="48" textAnchor="middle" fill="#92400e" fontSize="22" fontWeight="900">
          O mesmo gradiente pode gerar trajetórias muito diferentes
        </text>
        <path d="M80 240C180 140 300 145 380 245C460 345 560 285 680 130" fill="none" stroke="#d97706" strokeWidth="7" strokeLinecap="round" />
        <path d="M110 215L160 190L205 180L245 178" fill="none" stroke="#16a34a" strokeWidth="5" strokeDasharray="6 6" />
        <path d="M110 215L260 170L420 280L600 120" fill="none" stroke="#dc2626" strokeWidth="5" strokeDasharray="10 8" />
        <text x="220" y="155" fill="#166534" fontSize="14" fontWeight="900">passos pequenos</text>
        <text x="520" y="305" fill="#b91c1c" fontSize="14" fontWeight="900">passos grandes demais</text>
      </svg>
    </figure>
  );
}

function SuperficieDePerdaVisual() {
  return (
    <figure className="rounded-[2rem] border border-teal-200 bg-teal-50 p-4 shadow-xl shadow-teal-900/5">
      <svg className="w-full" viewBox="0 0 760 360" role="img" aria-label="Superfície de perda com trajetória de descida">
        <rect width="760" height="360" rx="28" fill="#f0fdfa" />
        <text x="380" y="48" textAnchor="middle" fill="#0f766e" fontSize="22" fontWeight="900">
          A trajetória do otimizador revela a forma da superfície
        </text>
        <ellipse cx="380" cy="205" rx="220" ry="95" fill="none" stroke="#99f6e4" strokeWidth="4" />
        <ellipse cx="380" cy="205" rx="155" ry="68" fill="none" stroke="#5eead4" strokeWidth="4" />
        <ellipse cx="380" cy="205" rx="85" ry="38" fill="none" stroke="#14b8a6" strokeWidth="4" />
        <path d="M550 130L500 165L445 188L410 198L390 203" fill="none" stroke="#0f766e" strokeWidth="7" strokeLinecap="round" />
      </svg>
    </figure>
  );
}

function LocaisVsGlobaisVisual() {
  return (
    <figure className="rounded-[2rem] border border-rose-200 bg-rose-50 p-4 shadow-xl shadow-rose-900/5">
      <svg className="w-full" viewBox="0 0 760 360" role="img" aria-label="Mínimos locais e globais em uma curva">
        <rect width="760" height="360" rx="28" fill="#fff1f2" />
        <text x="380" y="48" textAnchor="middle" fill="#be123c" fontSize="22" fontWeight="900">
          Nem todo vale é o vale mais profundo
        </text>
        <path d="M80 200C150 80 220 300 300 230C360 175 420 300 500 245C570 195 625 120 690 165" fill="none" stroke="#f43f5e" strokeWidth="8" strokeLinecap="round" />
        <circle cx="215" cy="247" r="8" fill="#e11d48" />
        <circle cx="430" cy="272" r="8" fill="#991b1b" />
        <text x="175" y="285" fill="#be123c" fontSize="14" fontWeight="900">mínimo local</text>
        <text x="400" y="315" fill="#991b1b" fontSize="14" fontWeight="900">mínimo mais profundo</text>
      </svg>
    </figure>
  );
}

function OtimizacaoNoMlVisual() {
  return (
    <figure className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-xl shadow-slate-900/5">
      <svg className="w-full" viewBox="0 0 760 360" role="img" aria-label="Otimização com batches em machine learning">
        <rect width="760" height="360" rx="28" fill="#f8fafc" />
        <text x="380" y="48" textAnchor="middle" fill="#0f172a" fontSize="22" fontWeight="900">
          No treino real, o caminho recebe gradientes ruidosos de mini-batches
        </text>
        <rect x="90" y="120" width="140" height="120" rx="18" fill="#ffffff" stroke="#94a3b8" strokeWidth="3" />
        <text x="160" y="155" textAnchor="middle" fill="#334155" fontSize="16" fontWeight="900">batch 1</text>
        <rect x="310" y="120" width="140" height="120" rx="18" fill="#ffffff" stroke="#94a3b8" strokeWidth="3" />
        <text x="380" y="155" textAnchor="middle" fill="#334155" fontSize="16" fontWeight="900">batch 2</text>
        <rect x="530" y="120" width="140" height="120" rx="18" fill="#ffffff" stroke="#94a3b8" strokeWidth="3" />
        <text x="600" y="155" textAnchor="middle" fill="#334155" fontSize="16" fontWeight="900">batch 3</text>
        <path d="M160 260h440" stroke="#475569" strokeWidth="6" strokeLinecap="round" strokeDasharray="8 8" />
      </svg>
    </figure>
  );
}

