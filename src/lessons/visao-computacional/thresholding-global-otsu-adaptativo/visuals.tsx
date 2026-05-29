import type { LessonModule } from "../../../types/content";

export const visuals = {
  "thresholding-hero": ThresholdingHeroVisual,
  "motivacao-tres-tecnicas": MotivacaoTresTecnicasVisual,
  "thresholding-global": ThresholdingGlobalVisual,
  "metodo-otsu": MetodoOtsuVisual,
  "thresholding-adaptativo": ThresholdingAdaptativoVisual,
  "comparacao-tecnicas": ComparacaoTecnicasVisual,
  "parametros-adaptativo": ParametrosAdaptativoVisual,
  "combinando-tecnicas": CombinandoTecnicasVisual,
} satisfies LessonModule["visuals"];

function ThresholdingHeroVisual() {
  return (
    <figure className="overflow-hidden rounded-[2rem] border border-indigo-200 bg-white p-4 shadow-xl shadow-indigo-900/10">
      <svg className="w-full" viewBox="0 0 760 430" role="img" aria-label="Três técnicas de thresholding">
        <defs>
          <linearGradient id="threshHeroBg" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#eef2ff" />
            <stop offset="55%" stopColor="#f0fdfa" />
            <stop offset="100%" stopColor="#faf5ff" />
          </linearGradient>
        </defs>
        <rect width="760" height="430" rx="30" fill="url(#threshHeroBg)" />
        <text x="380" y="52" textAnchor="middle" fill="#0f172a" fontSize="26" fontWeight="900">Três Técnicas de Thresholding</text>
        <rect x="60" y="90" width="200" height="240" rx="20" fill="#dbeafe" stroke="#3b82f6" strokeWidth="3" />
        <text x="160" y="130" textAnchor="middle" fill="#1e40af" fontSize="18" fontWeight="900">Global</text>
        <text x="160" y="160" textAnchor="middle" fill="#2563eb" fontSize="14" fontWeight="700">Valor fixo</text>
        <text x="160" y="200" textAnchor="middle" fill="#2563eb" fontSize="13" fontWeight="700">Iluminação uniforme</text>
        <text x="160" y="225" textAnchor="middle" fill="#2563eb" fontSize="13" fontWeight="700">Rápido e simples</text>
        <rect x="280" y="90" width="200" height="240" rx="20" fill="#fef3c7" stroke="#f59e0b" strokeWidth="3" />
        <text x="380" y="130" textAnchor="middle" fill="#92400e" fontSize="18" fontWeight="900">Otsu</text>
        <text x="380" y="160" textAnchor="middle" fill="#b45309" fontSize="14" fontWeight="700">Automático</text>
        <text x="380" y="200" textAnchor="middle" fill="#b45309" fontSize="13" fontWeight="700">Histograma bimodal</text>
        <text x="380" y="225" textAnchor="middle" fill="#b45309" fontSize="13" fontWeight="700">Minimiza variância</text>
        <rect x="500" y="90" width="200" height="240" rx="20" fill="#fae8ff" stroke="#a855f7" strokeWidth="3" />
        <text x="600" y="130" textAnchor="middle" fill="#6b21a8" fontSize="18" fontWeight="900">Adaptativo</text>
        <text x="600" y="160" textAnchor="middle" fill="#7c3aed" fontSize="14" fontWeight="700">Local</text>
        <text x="600" y="200" textAnchor="middle" fill="#7c3aed" fontSize="13" fontWeight="700">Iluminação desigual</text>
        <text x="600" y="225" textAnchor="middle" fill="#7c3aed" fontSize="13" fontWeight="700">Threshold por região</text>
        <rect x="100" y="360" width="560" height="50" rx="16" fill="#ffffff" stroke="#0f766e" strokeWidth="2" />
        <text x="380" y="390" textAnchor="middle" fill="#0f766e" fontSize="16" fontWeight="900">
          Escolha a técnica certa para cada tipo de cena
        </text>
      </svg>
    </figure>
  );
}

function MotivacaoTresTecnicasVisual() {
  return (
    <figure className="rounded-[2rem] border border-blue-200 bg-blue-50 p-4 shadow-xl shadow-blue-900/5">
      <svg className="w-full" viewBox="0 0 760 350" role="img" aria-label="Por que três técnicas">
        <rect width="760" height="350" rx="28" fill="#eff6ff" />
        <text x="380" y="48" textAnchor="middle" fill="#1e3a8a" fontSize="22" fontWeight="900">Cenas Diferentes, Técnicas Diferentes</text>
        <rect x="60" y="90" width="280" height="200" rx="20" fill="#ffffff" stroke="#3b82f6" strokeWidth="3" />
        <text x="200" y="130" textAnchor="middle" fill="#1e40af" fontSize="16" fontWeight="900">Iluminação Uniforme</text>
        <circle cx="200" cy="190" r="60" fill="#1e293b" />
        <text x="200" y="320" textAnchor="middle" fill="#1e40af" fontSize="14" fontWeight="700">Global ou Otsu</text>
        <rect x="420" y="90" width="280" height="200" rx="20" fill="#ffffff" stroke="#a855f7" strokeWidth="3" />
        <defs>
          <linearGradient id="shadowGrad2" x1="0" x2="1">
            <stop offset="0%" stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>
        </defs>
        <rect x="420" y="90" width="280" height="200" rx="20" fill="url(#shadowGrad2)" />
        <circle cx="560" cy="190" r="60" fill="#1e293b" />
        <text x="560" y="320" textAnchor="middle" fill="#6b21a8" fontSize="14" fontWeight="700">Adaptativo</text>
        <text x="380" y="340" textAnchor="middle" fill="#1e3a8a" fontSize="15" fontWeight="800">
          A escolha depende da iluminação da cena
        </text>
      </svg>
    </figure>
  );
}

function ThresholdingGlobalVisual() {
  return (
    <figure className="rounded-[2rem] border border-amber-200 bg-amber-50 p-4 shadow-xl shadow-amber-900/5">
      <svg className="w-full" viewBox="0 0 760 360" role="img" aria-label="Thresholding global">
        <rect width="760" height="360" rx="28" fill="#fffbeb" />
        <text x="380" y="48" textAnchor="middle" fill="#92400e" fontSize="22" fontWeight="900">Thresholding Global: Valor Fixo</text>
        <defs>
          <linearGradient id="globalGrad" x1="0" x2="1">
            <stop offset="0%" stopColor="#000000" />
            <stop offset="50%" stopColor="#808080" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>
        </defs>
        <rect x="100" y="90" width="560" height="60" rx="12" fill="url(#globalGrad)" stroke="#475569" strokeWidth="2" />
        <line x1="380" y1="80" x2="380" y2="160" stroke="#ef4444" strokeWidth="4" strokeDasharray="6 4" />
        <text x="380" y="180" textAnchor="middle" fill="#ef4444" fontSize="16" fontWeight="900">Threshold = 127 (fixo)</text>
        <rect x="100" y="210" width="260" height="100" rx="16" fill="#000000" stroke="#475569" strokeWidth="2" />
        <text x="230" y="265" textAnchor="middle" fill="#ffffff" fontSize="18" fontWeight="900">Pixels &lt; 127</text>
        <text x="230" y="290" textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="700">Viram 0 (fundo)</text>
        <rect x="400" y="210" width="260" height="100" rx="16" fill="#ffffff" stroke="#475569" strokeWidth="2" />
        <text x="530" y="265" textAnchor="middle" fill="#000000" fontSize="18" fontWeight="900">Pixels ≥ 127</text>
        <text x="530" y="290" textAnchor="middle" fill="#000000" fontSize="14" fontWeight="700">Viram 255 (objeto)</text>
        <text x="380" y="350" textAnchor="middle" fill="#92400e" fontSize="15" fontWeight="800">
          Mesmo threshold aplicado a toda a imagem
        </text>
      </svg>
    </figure>
  );
}

function MetodoOtsuVisual() {
  return (
    <figure className="rounded-[2rem] border border-violet-200 bg-violet-50 p-4 shadow-xl shadow-violet-900/5">
      <svg className="w-full" viewBox="0 0 760 380" role="img" aria-label="Método de Otsu">
        <rect width="760" height="380" rx="28" fill="#faf5ff" />
        <text x="380" y="48" textAnchor="middle" fill="#5b21b6" fontSize="22" fontWeight="900">Método de Otsu: Threshold Automático</text>
        <line x1="100" y1="280" x2="660" y2="280" stroke="#475569" strokeWidth="2" />
        <line x1="100" y1="80" x2="100" y2="280" stroke="#475569" strokeWidth="2" />
        <path
          d="M120 280 Q150 280 180 240 Q210 180 240 140 Q270 100 300 120 Q330 160 360 200 Q390 240 420 260 Q450 240 480 200 Q510 140 540 120 Q570 160 600 220 Q630 260 660 280"
          fill="none"
          stroke="#8b5cf6"
          strokeWidth="4"
        />
        <circle cx="240" cy="140" r="8" fill="#8b5cf6" />
        <text x="240" y="120" textAnchor="middle" fill="#5b21b6" fontSize="14" fontWeight="900">Objeto</text>
        <circle cx="540" cy="120" r="8" fill="#8b5cf6" />
        <text x="540" y="100" textAnchor="middle" fill="#5b21b6" fontSize="14" fontWeight="900">Fundo</text>
        <circle cx="390" cy="240" r="10" fill="#ef4444" />
        <line x1="390" y1="80" x2="390" y2="280" stroke="#ef4444" strokeWidth="3" strokeDasharray="6 4" />
        <text x="390" y="310" textAnchor="middle" fill="#dc2626" fontSize="16" fontWeight="900">Otsu encontra o vale</text>
        <text x="380" y="360" textAnchor="middle" fill="#5b21b6" fontSize="15" fontWeight="800">
          Minimiza variância intra-classe automaticamente
        </text>
      </svg>
    </figure>
  );
}

function ThresholdingAdaptativoVisual() {
  return (
    <figure className="rounded-[2rem] border border-emerald-200 bg-emerald-50 p-4 shadow-xl shadow-emerald-900/5">
      <svg className="w-full" viewBox="0 0 760 380" role="img" aria-label="Thresholding adaptativo">
        <rect width="760" height="380" rx="28" fill="#ecfdf5" />
        <text x="380" y="48" textAnchor="middle" fill="#065f46" fontSize="22" fontWeight="900">Thresholding Adaptativo: Threshold Local</text>
        <rect x="60" y="90" width="640" height="200" rx="16" fill="#ffffff" stroke="#10b981" strokeWidth="3" />
        {[0, 1, 2, 3].map((row) =>
          [0, 1, 2, 3].map((col) => {
            const threshold = 100 + (row * 4 + col) * 5;
            return (
              <g key={`${row}-${col}`}>
                <rect
                  x={80 + col * 155}
                  y={110 + row * 45}
                  width="145"
                  height="35"
                  rx="8"
                  fill="#ecfdf5"
                  stroke="#10b981"
                  strokeWidth="2"
                />
                <text
                  x={152 + col * 155}
                  y={132 + row * 45}
                  textAnchor="middle"
                  fill="#065f46"
                  fontSize="13"
                  fontWeight="800"
                >
                  T={threshold}
                </text>
              </g>
            );
          })
        )}
        <text x="380" y="320" textAnchor="middle" fill="#065f46" fontSize="16" fontWeight="900">
          Cada região tem seu próprio threshold
        </text>
        <text x="380" y="350" textAnchor="middle" fill="#065f46" fontSize="14" fontWeight="700">
          blockSize define o tamanho da janela vizinha
        </text>
      </svg>
    </figure>
  );
}

function ComparacaoTecnicasVisual() {
  return (
    <figure className="rounded-[2rem] border border-indigo-200 bg-indigo-50 p-4 shadow-xl shadow-indigo-900/5">
      <svg className="w-full" viewBox="0 0 760 400" role="img" aria-label="Comparação das três técnicas">
        <rect width="760" height="400" rx="28" fill="#eef2ff" />
        <text x="380" y="48" textAnchor="middle" fill="#3730a3" fontSize="22" fontWeight="900">Quando Usar Cada Técnica</text>
        <rect x="60" y="90" width="200" height="240" rx="16" fill="#ffffff" stroke="#3b82f6" strokeWidth="3" />
        <text x="160" y="125" textAnchor="middle" fill="#1e40af" fontSize="16" fontWeight="900">Global</text>
        <text x="160" y="155" textAnchor="middle" fill="#2563eb" fontSize="13" fontWeight="700">✓ Iluminação uniforme</text>
        <text x="160" y="180" textAnchor="middle" fill="#2563eb" fontSize="13" fontWeight="700">✓ Histograma bimodal</text>
        <text x="160" y="205" textAnchor="middle" fill="#2563eb" fontSize="13" fontWeight="700">✓ Rápido e simples</text>
        <text x="160" y="230" textAnchor="middle" fill="#dc2626" fontSize="13" fontWeight="700">✗ Falha com sombras</text>
        <rect x="280" y="90" width="200" height="240" rx="16" fill="#ffffff" stroke="#f59e0b" strokeWidth="3" />
        <text x="380" y="125" textAnchor="middle" fill="#92400e" fontSize="16" fontWeight="900">Otsu</text>
        <text x="380" y="155" textAnchor="middle" fill="#b45309" fontSize="13" fontWeight="700">✓ Automático</text>
        <text x="380" y="180" textAnchor="middle" fill="#b45309" fontSize="13" fontWeight="700">✓ Histograma bimodal</text>
        <text x="380" y="205" textAnchor="middle" fill="#b45309" fontSize="13" fontWeight="700">✓ Sem análise manual</text>
        <text x="380" y="230" textAnchor="middle" fill="#dc2626" fontSize="13" fontWeight="700">✗ Falha se unimodal</text>
        <rect x="500" y="90" width="200" height="240" rx="16" fill="#ffffff" stroke="#a855f7" strokeWidth="3" />
        <text x="600" y="125" textAnchor="middle" fill="#6b21a8" fontSize="16" fontWeight="900">Adaptativo</text>
        <text x="600" y="155" textAnchor="middle" fill="#7c3aed" fontSize="13" fontWeight="700">✓ Iluminação desigual</text>
        <text x="600" y="180" textAnchor="middle" fill="#7c3aed" fontSize="13" fontWeight="700">✓ Sombras e gradientes</text>
        <text x="600" y="205" textAnchor="middle" fill="#7c3aed" fontSize="13" fontWeight="700">✓ Threshold local</text>
        <text x="600" y="230" textAnchor="middle" fill="#dc2626" fontSize="13" fontWeight="700">✗ Mais lento</text>
        <text x="380" y="370" textAnchor="middle" fill="#3730a3" fontSize="15" fontWeight="800">
          Comece pelo mais simples, evolua se necessário
        </text>
      </svg>
    </figure>
  );
}

function ParametrosAdaptativoVisual() {
  return (
    <figure className="rounded-[2rem] border border-teal-200 bg-teal-50 p-4 shadow-xl shadow-teal-900/5">
      <svg className="w-full" viewBox="0 0 760 360" role="img" aria-label="Parâmetros do adaptativo">
        <rect width="760" height="360" rx="28" fill="#f0fdfa" />
        <text x="380" y="48" textAnchor="middle" fill="#0f766e" fontSize="22" fontWeight="900">Parâmetros do Thresholding Adaptativo</text>
        <rect x="60" y="90" width="300" height="200" rx="16" fill="#ffffff" stroke="#0f766e" strokeWidth="3" />
        <text x="210" y="125" textAnchor="middle" fill="#0f766e" fontSize="16" fontWeight="900">blockSize</text>
        <text x="210" y="155" textAnchor="middle" fill="#0f766e" fontSize="14" fontWeight="700">Tamanho da janela vizinha</text>
        <text x="210" y="185" textAnchor="middle" fill="#0f766e" fontSize="13" fontWeight="700">Deve ser ímpar (11, 15, 21...)</text>
        <text x="210" y="215" textAnchor="middle" fill="#0f766e" fontSize="13" fontWeight="700">Pequeno = detalhe</text>
        <text x="210" y="240" textAnchor="middle" fill="#0f766e" fontSize="13" fontWeight="700">Grande = suave</text>
        <rect x="400" y="90" width="300" height="200" rx="16" fill="#ffffff" stroke="#0f766e" strokeWidth="3" />
        <text x="550" y="125" textAnchor="middle" fill="#0f766e" fontSize="16" fontWeight="900">C (constante)</text>
        <text x="550" y="155" textAnchor="middle" fill="#0f766e" fontSize="14" fontWeight="700">Subtraída da média</text>
        <text x="550" y="185" textAnchor="middle" fill="#0f766e" fontSize="13" fontWeight="700">Positivo = mais rigoroso</text>
        <text x="550" y="215" textAnchor="middle" fill="#0f766e" fontSize="13" fontWeight="700">Negativo = mais permissivo</text>
        <text x="550" y="240" textAnchor="middle" fill="#0f766e" fontSize="13" fontWeight="700">Padrão: C=2</text>
        <text x="380" y="330" textAnchor="middle" fill="#0f766e" fontSize="15" fontWeight="800">
          Ajuste blockSize e C para cada tipo de cena
        </text>
      </svg>
    </figure>
  );
}

function CombinandoTecnicasVisual() {
  return (
    <figure className="rounded-[2rem] border border-emerald-200 bg-emerald-50 p-4 shadow-xl shadow-emerald-900/5">
      <svg className="w-full" viewBox="0 0 760 340" role="img" aria-label="Pipeline completo">
        <rect width="760" height="340" rx="28" fill="#ecfdf5" />
        <text x="380" y="48" textAnchor="middle" fill="#065f46" fontSize="22" fontWeight="900">Pipeline Completo de Segmentação</text>
        <rect x="60" y="90" width="180" height="180" rx="16" fill="#dbeafe" stroke="#3b82f6" strokeWidth="3" />
        <text x="150" y="130" textAnchor="middle" fill="#1e40af" fontSize="16" fontWeight="900">1. Filtro</text>
        <text x="150" y="160" textAnchor="middle" fill="#2563eb" fontSize="13" fontWeight="700">GaussianBlur</text>
        <text x="150" y="185" textAnchor="middle" fill="#2563eb" fontSize="13" fontWeight="700">ou MedianBlur</text>
        <text x="150" y="215" textAnchor="middle" fill="#2563eb" fontSize="12" fontWeight="700">Reduz ruído</text>
        <path d="M270 180h30" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
        <path d="M290 170l10 10l-10 10" fill="#475569" />
        <rect x="330" y="90" width="180" height="180" rx="16" fill="#fef3c7" stroke="#f59e0b" strokeWidth="3" />
        <text x="420" y="130" textAnchor="middle" fill="#92400e" fontSize="16" fontWeight="900">2. Threshold</text>
        <text x="420" y="160" textAnchor="middle" fill="#b45309" fontSize="13" fontWeight="700">Global, Otsu</text>
        <text x="420" y="185" textAnchor="middle" fill="#b45309" fontSize="13" fontWeight="700">ou Adaptativo</text>
        <text x="420" y="215" textAnchor="middle" fill="#b45309" fontSize="12" fontWeight="700">Binariza</text>
        <path d="M540 180h30" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
        <path d="M560 170l10 10l-10 10" fill="#475569" />
        <rect x="600" y="90" width="100" height="180" rx="16" fill="#fae8ff" stroke="#a855f7" strokeWidth="3" />
        <text x="650" y="130" textAnchor="middle" fill="#6b21a8" fontSize="16" fontWeight="900">3. Morfo</text>
        <text x="650" y="160" textAnchor="middle" fill="#7c3aed" fontSize="13" fontWeight="700">Open</text>
        <text x="650" y="185" textAnchor="middle" fill="#7c3aed" fontSize="13" fontWeight="700">Close</text>
        <text x="650" y="215" textAnchor="middle" fill="#7c3aed" fontSize="12" fontWeight="700">Limpa</text>
        <text x="380" y="310" textAnchor="middle" fill="#065f46" fontSize="15" fontWeight="800">
          A ordem é crítica: filtro → threshold → morfologia
        </text>
      </svg>
    </figure>
  );
}
