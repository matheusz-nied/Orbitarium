import type { LessonModule } from "../../../types/content";

export const visuals = {
  "backprop-hero": BackpropHeroVisual,
  "por-que-backprop-visual": PorQueBackpropVisual,
  "grafo-computacional-visual": GrafoComputacionalVisual,
  "regra-da-cadeia-visual": RegraDaCadeiaVisual,
  "erro-fluindo-visual": ErroFluindoVisual,
  "magnitudes-gradiente-visual": MagnitudesGradienteVisual,
  "learning-rate-visual": LearningRateVisual,
} satisfies LessonModule["visuals"];

function BackpropHeroVisual() {
  return (
    <figure className="overflow-hidden rounded-[2rem] border border-amber-200 bg-white p-4 shadow-xl shadow-amber-900/10">
      <svg className="w-full" viewBox="0 0 760 390" role="img" aria-label="Forward e backward em uma rede pequena">
        <defs>
          <linearGradient id="bpHeroBg" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#fffbeb" />
            <stop offset="55%" stopColor="#eef2ff" />
            <stop offset="100%" stopColor="#ecfeff" />
          </linearGradient>
        </defs>
        <rect width="760" height="390" rx="30" fill="url(#bpHeroBg)" />
        <text x="380" y="52" textAnchor="middle" fill="#92400e" fontSize="26" fontWeight="900">
          Sinais vão para frente, gradientes voltam para trás
        </text>
        {[110, 190, 270].map((y, i) => <circle key={y} cx="120" cy={y} r="22" fill="#ffffff" stroke="#f59e0b" strokeWidth="3" />)}
        {[140, 250].map((y, i) => <circle key={y} cx="330" cy={y} r="28" fill="#ffffff" stroke="#7c3aed" strokeWidth="3" />)}
        <circle cx="560" cy="195" r="32" fill="#ffffff" stroke="#0f766e" strokeWidth="3" />
        {[[142,110,302,140],[142,110,302,250],[142,190,302,140],[142,190,302,250],[142,270,302,140],[142,270,302,250],[358,140,528,195],[358,250,528,195]].map(([x1,y1,x2,y2], idx) => (
          <path key={`f-${idx}`} d={`M ${x1} ${y1} C ${x1 + 60} ${y1}, ${x2 - 60} ${y2}, ${x2} ${y2}`} stroke="#14b8a6" strokeWidth="4" fill="none" strokeLinecap="round" />
        ))}
        {[[528,210,358,260],[528,180,358,150],[302,150,142,120],[302,260,142,280]].map(([x1,y1,x2,y2], idx) => (
          <path key={`b-${idx}`} d={`M ${x1} ${y1} C ${(x1 + x2) / 2} ${y1}, ${(x1 + x2) / 2} ${y2}, ${x2} ${y2}`} stroke="#dc2626" strokeWidth="4" fill="none" strokeDasharray="8 8" strokeLinecap="round" />
        ))}
        <text x="230" y="330" textAnchor="middle" fill="#0f766e" fontSize="14" fontWeight="900">forward pass</text>
        <text x="500" y="330" textAnchor="middle" fill="#dc2626" fontSize="14" fontWeight="900">backward pass</text>
      </svg>
    </figure>
  );
}

function PorQueBackpropVisual() {
  return (
    <figure className="rounded-[2rem] border border-sky-200 bg-sky-50 p-4 shadow-xl shadow-sky-900/5">
      <svg className="w-full" viewBox="0 0 760 340" role="img" aria-label="Comparação entre gradiente numérico ingênuo e backpropagation">
        <rect width="760" height="340" rx="28" fill="#f0f9ff" />
        <text x="380" y="48" textAnchor="middle" fill="#0c4a6e" fontSize="22" fontWeight="900">Não dá para perturbar um por um em escala grande</text>
        <rect x="90" y="95" width="240" height="170" rx="18" fill="#ffffff" stroke="#38bdf8" strokeWidth="3" />
        <text x="210" y="128" textAnchor="middle" fill="#0369a1" fontSize="16" fontWeight="900">aproximação ingênua</text>
        <text x="210" y="165" textAnchor="middle" fill="#475569" fontSize="13" fontWeight="700">perturbar cada peso</text>
        <text x="210" y="190" textAnchor="middle" fill="#475569" fontSize="13" fontWeight="700">reavaliar a rede várias vezes</text>
        <text x="210" y="215" textAnchor="middle" fill="#be123c" fontSize="13" fontWeight="900">custo explode</text>
        <rect x="430" y="95" width="240" height="170" rx="18" fill="#ffffff" stroke="#10b981" strokeWidth="3" />
        <text x="550" y="128" textAnchor="middle" fill="#166534" fontSize="16" fontWeight="900">backpropagation</text>
        <text x="550" y="165" textAnchor="middle" fill="#475569" fontSize="13" fontWeight="700">reutilizar cálculo</text>
        <text x="550" y="190" textAnchor="middle" fill="#475569" fontSize="13" fontWeight="700">propagar sensibilidades locais</text>
        <text x="550" y="215" textAnchor="middle" fill="#166534" fontSize="13" fontWeight="900">escala viável</text>
      </svg>
    </figure>
  );
}

function GrafoComputacionalVisual() {
  return (
    <figure className="rounded-[2rem] border border-violet-200 bg-violet-50 p-4 shadow-xl shadow-violet-900/5">
      <svg className="w-full" viewBox="0 0 760 340" role="img" aria-label="Grafo computacional simples com operações encadeadas">
        <rect width="760" height="340" rx="28" fill="#faf5ff" />
        <text x="380" y="48" textAnchor="middle" fill="#6d28d9" fontSize="22" fontWeight="900">Quebre a rede em operações pequenas</text>
        <circle cx="120" cy="170" r="24" fill="#ffffff" stroke="#8b5cf6" strokeWidth="3" />
        <text x="120" y="176" textAnchor="middle" fill="#7c3aed" fontSize="14" fontWeight="900">x</text>
        <rect x="220" y="135" width="90" height="70" rx="16" fill="#ffffff" stroke="#8b5cf6" strokeWidth="3" />
        <text x="265" y="176" textAnchor="middle" fill="#7c3aed" fontSize="15" fontWeight="900">× w</text>
        <rect x="360" y="135" width="90" height="70" rx="16" fill="#ffffff" stroke="#8b5cf6" strokeWidth="3" />
        <text x="405" y="176" textAnchor="middle" fill="#7c3aed" fontSize="15" fontWeight="900">+ b</text>
        <rect x="500" y="135" width="90" height="70" rx="16" fill="#ffffff" stroke="#0f766e" strokeWidth="3" />
        <text x="545" y="176" textAnchor="middle" fill="#0f766e" fontSize="15" fontWeight="900">ReLU</text>
        <circle cx="670" cy="170" r="24" fill="#ffffff" stroke="#0f766e" strokeWidth="3" />
        <text x="670" y="176" textAnchor="middle" fill="#0f766e" fontSize="14" fontWeight="900">L</text>
        {[144,310,450,590].map((x) => <path key={x} d={`M ${x} 170 H ${x + 60}`} stroke="#7c3aed" strokeWidth="4" strokeLinecap="round" />)}
      </svg>
    </figure>
  );
}

function RegraDaCadeiaVisual() {
  return (
    <figure className="rounded-[2rem] border border-indigo-200 bg-indigo-50 p-4 shadow-xl shadow-indigo-900/5">
      <svg className="w-full" viewBox="0 0 760 330" role="img" aria-label="Regra da cadeia como produto de sensibilidades locais">
        <rect width="760" height="330" rx="28" fill="#eef2ff" />
        <text x="380" y="48" textAnchor="middle" fill="#3730a3" fontSize="22" fontWeight="900">Sensibilidades locais viram efeito global</text>
        <rect x="110" y="120" width="120" height="90" rx="18" fill="#ffffff" stroke="#6366f1" strokeWidth="3" />
        <text x="170" y="170" textAnchor="middle" fill="#3730a3" fontSize="16" fontWeight="900">w → z</text>
        <rect x="320" y="120" width="120" height="90" rx="18" fill="#ffffff" stroke="#6366f1" strokeWidth="3" />
        <text x="380" y="170" textAnchor="middle" fill="#3730a3" fontSize="16" fontWeight="900">z → a</text>
        <rect x="530" y="120" width="120" height="90" rx="18" fill="#ffffff" stroke="#6366f1" strokeWidth="3" />
        <text x="590" y="170" textAnchor="middle" fill="#3730a3" fontSize="16" fontWeight="900">a → L</text>
        <path d="M230 165h70" stroke="#4f46e5" strokeWidth="5" strokeLinecap="round" />
        <path d="M440 165h70" stroke="#4f46e5" strokeWidth="5" strokeLinecap="round" />
        <text x="380" y="285" textAnchor="middle" fill="#3730a3" fontSize="15" fontWeight="800">dL/dw = (dL/da) · (da/dz) · (dz/dw)</text>
      </svg>
    </figure>
  );
}

function ErroFluindoVisual() {
  return (
    <figure className="rounded-[2rem] border border-rose-200 bg-rose-50 p-4 shadow-xl shadow-rose-900/5">
      <svg className="w-full" viewBox="0 0 760 330" role="img" aria-label="Gradiente da perda voltando por camadas">
        <rect width="760" height="330" rx="28" fill="#fff1f2" />
        <text x="380" y="48" textAnchor="middle" fill="#9f1239" fontSize="22" fontWeight="900">O backward redistribui sensibilidade</text>
        {[150, 330, 510].map((x, index) => (
          <circle key={x} cx={x} cy="170" r="34" fill="#ffffff" stroke="#fb7185" strokeWidth="3" />
        ))}
        <text x="150" y="176" textAnchor="middle" fill="#9f1239" fontSize="16" fontWeight="900">camada 1</text>
        <text x="330" y="176" textAnchor="middle" fill="#9f1239" fontSize="16" fontWeight="900">camada 2</text>
        <text x="510" y="176" textAnchor="middle" fill="#9f1239" fontSize="16" fontWeight="900">saída</text>
        <path d="M476 120 C 430 95, 380 95, 364 140" stroke="#dc2626" strokeWidth="4" fill="none" strokeDasharray="8 8" />
        <path d="M296 120 C 250 95, 200 95, 184 140" stroke="#dc2626" strokeWidth="4" fill="none" strokeDasharray="8 8" />
      </svg>
    </figure>
  );
}

function MagnitudesGradienteVisual() {
  return (
    <figure className="rounded-[2rem] border border-teal-200 bg-teal-50 p-4 shadow-xl shadow-teal-900/5">
      <svg className="w-full" viewBox="0 0 760 330" role="img" aria-label="Barras de magnitude do gradiente diminuindo ou aumentando">
        <rect width="760" height="330" rx="28" fill="#f0fdfa" />
        <text x="380" y="48" textAnchor="middle" fill="#0f766e" fontSize="22" fontWeight="900">Uma cadeia longa multiplica magnitudes</text>
        {[120, 220, 320, 420, 520, 620].map((x, index) => (
          <rect key={x} x={x} y={230 - index * 18} width="48" height={60 + index * 18} rx="10" fill="#14b8a6" opacity={1 - index * 0.1} />
        ))}
      </svg>
    </figure>
  );
}

function LearningRateVisual() {
  return (
    <figure className="rounded-[2rem] border border-emerald-200 bg-emerald-50 p-4 shadow-xl shadow-emerald-900/5">
      <svg className="w-full" viewBox="0 0 760 340" role="img" aria-label="Passos pequenos e grandes em uma bacia de perda">
        <rect width="760" height="340" rx="28" fill="#ecfdf5" />
        <text x="380" y="48" textAnchor="middle" fill="#065f46" fontSize="22" fontWeight="900">Passo útil não é passo máximo</text>
        <path d="M110 130 C 220 290, 300 280, 380 170 S 550 70, 650 185" stroke="#10b981" strokeWidth="6" fill="none" strokeLinecap="round" />
        <circle cx="170" cy="205" r="9" fill="#f59e0b" />
        <circle cx="330" cy="205" r="9" fill="#f59e0b" />
        <circle cx="470" cy="130" r="9" fill="#be123c" />
        <text x="250" y="305" textAnchor="middle" fill="#065f46" fontSize="14" fontWeight="900">passos moderados descem</text>
        <text x="530" y="305" textAnchor="middle" fill="#be123c" fontSize="14" fontWeight="900">passo grande pode saltar demais</text>
      </svg>
    </figure>
  );
}
