import type { LessonModule } from "../../../types/content";

export const visuals = {
  "paradigms-hero": ParadigmsHeroVisual,
  "three-signals-map": ThreeSignalsMapVisual,
  "supervised-flow": SupervisedFlowVisual,
  "unsupervised-clusters": UnsupervisedClustersVisual,
  "reinforcement-loop": ReinforcementLoopVisual,
  "paradigm-choice-map": ParadigmChoiceMapVisual,
} satisfies LessonModule["visuals"];

function ParadigmsHeroVisual() {
  return (
    <figure className="overflow-hidden rounded-[2rem] border border-indigo-200 bg-white p-4 shadow-xl shadow-indigo-900/10">
      <svg className="w-full" viewBox="0 0 760 420" role="img" aria-label="Três paradigmas de aprendizado de máquina">
        <defs>
          <linearGradient id="paradigmHeroBg" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#eef2ff" />
            <stop offset="50%" stopColor="#fff7ed" />
            <stop offset="100%" stopColor="#ecfdf5" />
          </linearGradient>
        </defs>
        <rect width="760" height="420" rx="30" fill="url(#paradigmHeroBg)" />
        <text x="380" y="52" textAnchor="middle" fill="#0f172a" fontSize="26" fontWeight="900">
          Três formas de aprender
        </text>
        {[
          { x: 70, title: "Supervisionado", subtitle: "exemplo + resposta", color: "#4f46e5", bg: "#eef2ff" },
          { x: 285, title: "Não supervisionado", subtitle: "exemplo sem resposta", color: "#f97316", bg: "#fff7ed" },
          { x: 500, title: "Reforço", subtitle: "estado + recompensa", color: "#0f766e", bg: "#ecfdf5" },
        ].map((card) => (
          <g key={card.title}>
            <rect x={card.x} y="105" width="190" height="185" rx="24" fill={card.bg} stroke={card.color} strokeWidth="3" />
            <text x={card.x + 95} y="145" textAnchor="middle" fill={card.color} fontSize="18" fontWeight="900">
              {card.title}
            </text>
            <text x={card.x + 95} y="190" textAnchor="middle" fill={card.color} fontSize="14" fontWeight="700">
              {card.subtitle}
            </text>
          </g>
        ))}
        <text x="380" y="350" textAnchor="middle" fill="#0f172a" fontSize="16" fontWeight="800">
          O paradigma depende do tipo de feedback disponível para aprender
        </text>
      </svg>
    </figure>
  );
}

function ThreeSignalsMapVisual() {
  return (
    <figure className="rounded-[2rem] border border-amber-200 bg-amber-50 p-4 shadow-xl shadow-amber-900/5">
      <svg className="w-full" viewBox="0 0 760 360" role="img" aria-label="Mapa dos sinais de aprendizado">
        <rect width="760" height="360" rx="28" fill="#fffbeb" />
        <text x="380" y="46" textAnchor="middle" fill="#92400e" fontSize="22" fontWeight="900">
          O que o sistema recebe durante o aprendizado?
        </text>
        <circle cx="170" cy="185" r="82" fill="#eef2ff" stroke="#4f46e5" strokeWidth="3" />
        <text x="170" y="177" textAnchor="middle" fill="#4338ca" fontSize="18" fontWeight="900">
          rótulos
        </text>
        <text x="170" y="205" textAnchor="middle" fill="#4338ca" fontSize="14" fontWeight="700">
          resposta correta
        </text>
        <circle cx="380" cy="185" r="82" fill="#fff7ed" stroke="#f97316" strokeWidth="3" />
        <text x="380" y="177" textAnchor="middle" fill="#c2410c" fontSize="18" fontWeight="900">
          estrutura
        </text>
        <text x="380" y="205" textAnchor="middle" fill="#c2410c" fontSize="14" fontWeight="700">
          sem resposta pronta
        </text>
        <circle cx="590" cy="185" r="82" fill="#ecfdf5" stroke="#0f766e" strokeWidth="3" />
        <text x="590" y="177" textAnchor="middle" fill="#0f766e" fontSize="18" fontWeight="900">
          recompensa
        </text>
        <text x="590" y="205" textAnchor="middle" fill="#0f766e" fontSize="14" fontWeight="700">
          efeito no tempo
        </text>
      </svg>
    </figure>
  );
}

function SupervisedFlowVisual() {
  return (
    <figure className="rounded-[2rem] border border-indigo-200 bg-indigo-50 p-4 shadow-xl shadow-indigo-900/5">
      <svg className="w-full" viewBox="0 0 760 340" role="img" aria-label="Fluxo supervisionado">
        <rect width="760" height="340" rx="28" fill="#eef2ff" />
        <text x="380" y="48" textAnchor="middle" fill="#4338ca" fontSize="22" fontWeight="900">
          Supervisionado: aprender com resposta conhecida
        </text>
        <rect x="70" y="100" width="180" height="130" rx="20" fill="#ffffff" stroke="#4f46e5" strokeWidth="3" />
        <text x="160" y="150" textAnchor="middle" fill="#4338ca" fontSize="17" fontWeight="900">Features</text>
        <text x="160" y="178" textAnchor="middle" fill="#6366f1" fontSize="14" fontWeight="700">entrada x</text>
        <path d="M280 165h70" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
        <path d="M340 155l10 10l-10 10" fill="#475569" />
        <rect x="380" y="85" width="140" height="160" rx="20" fill="#ffffff" stroke="#0f172a" strokeWidth="3" />
        <text x="450" y="165" textAnchor="middle" fill="#0f172a" fontSize="17" fontWeight="900">Modelo</text>
        <path d="M550 165h70" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
        <path d="M610 155l10 10l-10 10" fill="#475569" />
        <rect x="620" y="100" width="90" height="130" rx="20" fill="#ffffff" stroke="#f97316" strokeWidth="3" />
        <text x="665" y="150" textAnchor="middle" fill="#c2410c" fontSize="17" fontWeight="900">Rótulo</text>
        <text x="665" y="178" textAnchor="middle" fill="#f97316" fontSize="14" fontWeight="700">y</text>
      </svg>
    </figure>
  );
}

function UnsupervisedClustersVisual() {
  return (
    <figure className="rounded-[2rem] border border-violet-200 bg-violet-50 p-4 shadow-xl shadow-violet-900/5">
      <svg className="w-full" viewBox="0 0 760 340" role="img" aria-label="Clusters no aprendizado não supervisionado">
        <rect width="760" height="340" rx="28" fill="#faf5ff" />
        <text x="380" y="48" textAnchor="middle" fill="#6d28d9" fontSize="22" fontWeight="900">
          Não supervisionado: procurar estrutura escondida
        </text>
        {[
          [210, 160, "#4f46e5"],
          [245, 135, "#4f46e5"],
          [250, 190, "#4f46e5"],
          [400, 205, "#f97316"],
          [430, 170, "#f97316"],
          [460, 225, "#f97316"],
          [590, 130, "#0f766e"],
          [620, 175, "#0f766e"],
          [555, 175, "#0f766e"],
        ].map(([x, y, color], index) => (
          <circle key={index} cx={Number(x)} cy={Number(y)} r="14" fill={String(color)} opacity="0.9" />
        ))}
        <ellipse cx="228" cy="160" rx="70" ry="55" fill="none" stroke="#4f46e5" strokeWidth="3" strokeDasharray="6 6" />
        <ellipse cx="430" cy="198" rx="80" ry="60" fill="none" stroke="#f97316" strokeWidth="3" strokeDasharray="6 6" />
        <ellipse cx="590" cy="155" rx="72" ry="58" fill="none" stroke="#0f766e" strokeWidth="3" strokeDasharray="6 6" />
      </svg>
    </figure>
  );
}

function ReinforcementLoopVisual() {
  return (
    <figure className="rounded-[2rem] border border-emerald-200 bg-emerald-50 p-4 shadow-xl shadow-emerald-900/5">
      <svg className="w-full" viewBox="0 0 760 340" role="img" aria-label="Laço agente ambiente em reforço">
        <rect width="760" height="340" rx="28" fill="#ecfdf5" />
        <text x="380" y="48" textAnchor="middle" fill="#0f766e" fontSize="22" fontWeight="900">
          Reforço: agir, observar, receber retorno
        </text>
        <rect x="120" y="110" width="190" height="120" rx="22" fill="#ffffff" stroke="#0f766e" strokeWidth="3" />
        <text x="215" y="175" textAnchor="middle" fill="#0f766e" fontSize="18" fontWeight="900">Agente</text>
        <rect x="450" y="110" width="190" height="120" rx="22" fill="#ffffff" stroke="#f97316" strokeWidth="3" />
        <text x="545" y="175" textAnchor="middle" fill="#c2410c" fontSize="18" fontWeight="900">Ambiente</text>
        <path d="M310 145h120" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" />
        <path d="M420 136l12 9l-12 9" fill="#0f172a" />
        <text x="370" y="130" textAnchor="middle" fill="#0f172a" fontSize="13" fontWeight="800">ação</text>
        <path d="M450 205H330" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" />
        <path d="M340 196l-12 9l12 9" fill="#0f172a" />
        <text x="390" y="230" textAnchor="middle" fill="#0f172a" fontSize="13" fontWeight="800">estado + recompensa</text>
      </svg>
    </figure>
  );
}

function ParadigmChoiceMapVisual() {
  return (
    <figure className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-xl shadow-slate-900/5">
      <svg className="w-full" viewBox="0 0 760 340" role="img" aria-label="Mapa para escolha de paradigma">
        <rect width="760" height="340" rx="28" fill="#f8fafc" />
        <text x="380" y="48" textAnchor="middle" fill="#0f172a" fontSize="22" fontWeight="900">
          Escolha o paradigma pela pergunta e pelo sinal
        </text>
        <rect x="90" y="110" width="180" height="150" rx="22" fill="#eef2ff" stroke="#4f46e5" strokeWidth="3" />
        <text x="180" y="150" textAnchor="middle" fill="#4338ca" fontSize="16" fontWeight="900">Tenho resposta correta?</text>
        <text x="180" y="195" textAnchor="middle" fill="#4338ca" fontSize="14" fontWeight="700">sim → supervisionado</text>
        <rect x="290" y="110" width="180" height="150" rx="22" fill="#fff7ed" stroke="#f97316" strokeWidth="3" />
        <text x="380" y="150" textAnchor="middle" fill="#c2410c" fontSize="16" fontWeight="900">Quero descobrir grupos?</text>
        <text x="380" y="195" textAnchor="middle" fill="#c2410c" fontSize="14" fontWeight="700">sim → não supervisionado</text>
        <rect x="490" y="110" width="180" height="150" rx="22" fill="#ecfdf5" stroke="#0f766e" strokeWidth="3" />
        <text x="580" y="150" textAnchor="middle" fill="#0f766e" fontSize="16" fontWeight="900">Aprendo com recompensa?</text>
        <text x="580" y="195" textAnchor="middle" fill="#0f766e" fontSize="14" fontWeight="700">sim → reforço</text>
      </svg>
    </figure>
  );
}
