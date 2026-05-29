import type { LessonModule } from "../../../types/content";

export const visuals = {
  "binarias-hero": BinariasHeroVisual,
  "motivacao-binaria": MotivacaoBinariaVisual,
  "binaria-definicao": BinariaDefinicaoVisual,
  "threshold-conceito": ThresholdConceitoVisual,
  "histograma-conceito": HistogramaConceitoVisual,
  "separacao-objeto-fundo": SeparacaoObjetoFundoVisual,
  "falso-positivo-negativo": FalsoPositivoNegativoVisual,
  "impacto-iluminacao": ImpactoIluminacaoVisual,
  "ruido-binarizacao": RuidoBinarizacaoVisual,
  "escolha-threshold": EscolhaThresholdVisual,
} satisfies LessonModule["visuals"];

function BinariasHeroVisual() {
  return (
    <figure className="overflow-hidden rounded-[2rem] border border-indigo-200 bg-white p-4 shadow-xl shadow-indigo-900/10">
      <svg className="w-full" viewBox="0 0 760 430" role="img" aria-label="Fluxo de binarização com histograma">
        <defs>
          <linearGradient id="binHeroBg" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#eef2ff" />
            <stop offset="55%" stopColor="#f0fdfa" />
            <stop offset="100%" stopColor="#faf5ff" />
          </linearGradient>
        </defs>
        <rect width="760" height="430" rx="30" fill="url(#binHeroBg)" />
        <text x="380" y="52" textAnchor="middle" fill="#0f172a" fontSize="26" fontWeight="900">De 256 tons para 2 valores</text>
        <rect x="60" y="90" width="160" height="160" rx="20" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="3" />
        <text x="140" y="170" textAnchor="middle" fill="#3730a3" fontSize="16" fontWeight="900">Escala de Cinza</text>
        <text x="140" y="195" textAnchor="middle" fill="#4f46e5" fontSize="13" fontWeight="700">0-255</text>
        <path d="M250 170h40" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
        <path d="M280 160l10 10l-10 10" fill="#475569" />
        <rect x="320" y="90" width="160" height="160" rx="20" fill="#fef3c7" stroke="#f59e0b" strokeWidth="3" />
        <text x="400" y="155" textAnchor="middle" fill="#92400e" fontSize="16" fontWeight="900">Histograma</text>
        <text x="400" y="180" textAnchor="middle" fill="#b45309" fontSize="13" fontWeight="700">2 picos</text>
        <path d="M340 200 Q370 140 400 200 Q430 140 460 200" fill="none" stroke="#f59e0b" strokeWidth="4" />
        <path d="M510 170h40" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
        <path d="M540 160l10 10l-10 10" fill="#475569" />
        <rect x="580" y="90" width="120" height="160" rx="20" fill="#ffffff" stroke="#0f766e" strokeWidth="3" />
        <text x="640" y="170" textAnchor="middle" fill="#0f766e" fontSize="16" fontWeight="900">Binária</text>
        <text x="640" y="195" textAnchor="middle" fill="#0f766e" fontSize="13" fontWeight="700">0 ou 255</text>
        <rect x="100" y="290" width="560" height="100" rx="20" fill="#ffffff" stroke="#0f766e" strokeWidth="2" />
        <text x="380" y="330" textAnchor="middle" fill="#0f766e" fontSize="18" fontWeight="900">Threshold = valor de corte</text>
        <text x="380" y="360" textAnchor="middle" fill="#475569" fontSize="14" fontWeight="700">Pixels acima → 255 (objeto) • Pixels abaixo → 0 (fundo)</text>
      </svg>
    </figure>
  );
}

function MotivacaoBinariaVisual() {
  return (
    <figure className="rounded-[2rem] border border-blue-200 bg-blue-50 p-4 shadow-xl shadow-blue-900/5">
      <svg className="w-full" viewBox="0 0 760 350" role="img" aria-label="Motivação para binarização">
        <rect width="760" height="350" rx="28" fill="#eff6ff" />
        <text x="380" y="48" textAnchor="middle" fill="#1e3a8a" fontSize="22" fontWeight="900">Por que binarizar?</text>
        <rect x="60" y="90" width="280" height="200" rx="20" fill="#dbeafe" stroke="#3b82f6" strokeWidth="3" />
        <text x="200" y="140" textAnchor="middle" fill="#1e40af" fontSize="16" fontWeight="900">Pergunta do computador:</text>
        <text x="200" y="180" textAnchor="middle" fill="#2563eb" fontSize="18" fontWeight="900">Este pixel é objeto</text>
        <text x="200" y="210" textAnchor="middle" fill="#2563eb" fontSize="18" fontWeight="900">ou é fundo?</text>
        <rect x="420" y="90" width="280" height="200" rx="20" fill="#ffffff" stroke="#0f766e" strokeWidth="3" />
        <text x="560" y="140" textAnchor="middle" fill="#0f766e" fontSize="16" fontWeight="900">Resposta binária:</text>
        <text x="560" y="180" textAnchor="middle" fill="#0f766e" fontSize="24" fontWeight="900">0 ou 255</text>
        <text x="560" y="220" textAnchor="middle" fill="#0f766e" fontSize="14" fontWeight="700">fundo ou objeto</text>
        <text x="380" y="330" textAnchor="middle" fill="#1e3a8a" fontSize="16" fontWeight="800">
          Binarização é o portal entre "ver" e "analisar"
        </text>
      </svg>
    </figure>
  );
}

function BinariaDefinicaoVisual() {
  return (
    <figure className="rounded-[2rem] border border-teal-200 bg-teal-50 p-4 shadow-xl shadow-teal-900/5">
      <svg className="w-full" viewBox="0 0 760 380" role="img" aria-label="Definição de imagem binária">
        <rect width="760" height="380" rx="28" fill="#f0fdfa" />
        <text x="380" y="48" textAnchor="middle" fill="#0f766e" fontSize="22" fontWeight="900">Imagem Binária: Apenas 2 Valores</text>
        <text x="190" y="90" textAnchor="middle" fill="#0f766e" fontSize="16" fontWeight="800">Escala de Cinza (256 valores)</text>
        {Array.from({ length: 6 }).map((_, row) => (
          <g key={row}>
            {Array.from({ length: 8 }).map((_, col) => {
              const value = Math.floor(Math.random() * 256);
              const gray = Math.floor(value * 0.6 + 50);
              return (
                <rect
                  key={col}
                  x={60 + col * 32}
                  y={110 + row * 32}
                  width="30"
                  height="30"
                  rx="4"
                  fill={`rgb(${gray},${gray},${gray})`}
                  stroke="#0f766e"
                  strokeWidth="1"
                />
              );
            })}
          </g>
        ))}
        <text x="570" y="90" textAnchor="middle" fill="#0f766e" fontSize="16" fontWeight="800">Binária (2 valores)</text>
        {Array.from({ length: 6 }).map((_, row) => (
          <g key={row}>
            {Array.from({ length: 8 }).map((_, col) => {
              const isObject = (row + col) % 3 === 0;
              return (
                <rect
                  key={col}
                  x={440 + col * 32}
                  y={110 + row * 32}
                  width="30"
                  height="30"
                  rx="4"
                  fill={isObject ? "#ffffff" : "#000000"}
                  stroke="#0f766e"
                  strokeWidth="2"
                />
              );
            })}
          </g>
        ))}
        <text x="380" y="360" textAnchor="middle" fill="#0f766e" fontSize="16" fontWeight="800">
          0 = fundo (preto) • 255 = objeto (branco)
        </text>
      </svg>
    </figure>
  );
}

function ThresholdConceitoVisual() {
  return (
    <figure className="rounded-[2rem] border border-amber-200 bg-amber-50 p-4 shadow-xl shadow-amber-900/5">
      <svg className="w-full" viewBox="0 0 760 360" role="img" aria-label="Conceito de threshold">
        <rect width="760" height="360" rx="28" fill="#fffbeb" />
        <text x="380" y="48" textAnchor="middle" fill="#92400e" fontSize="22" fontWeight="900">Threshold: Valor de Corte</text>
        <defs>
          <linearGradient id="threshGrad" x1="0" x2="1">
            <stop offset="0%" stopColor="#000000" />
            <stop offset="50%" stopColor="#808080" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>
        </defs>
        <rect x="100" y="90" width="560" height="60" rx="12" fill="url(#threshGrad)" stroke="#475569" strokeWidth="2" />
        <line x1="380" y1="80" x2="380" y2="160" stroke="#ef4444" strokeWidth="4" strokeDasharray="6 4" />
        <text x="380" y="180" textAnchor="middle" fill="#ef4444" fontSize="16" fontWeight="900">Threshold = 128</text>
        <rect x="100" y="210" width="260" height="100" rx="16" fill="#000000" stroke="#475569" strokeWidth="2" />
        <text x="230" y="265" textAnchor="middle" fill="#ffffff" fontSize="18" fontWeight="900">Pixels &lt; 128</text>
        <text x="230" y="290" textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="700">Viram 0 (fundo)</text>
        <rect x="400" y="210" width="260" height="100" rx="16" fill="#ffffff" stroke="#475569" strokeWidth="2" />
        <text x="530" y="265" textAnchor="middle" fill="#000000" fontSize="18" fontWeight="900">Pixels ≥ 128</text>
        <text x="530" y="290" textAnchor="middle" fill="#000000" fontSize="14" fontWeight="700">Viram 255 (objeto)</text>
        <text x="380" y="350" textAnchor="middle" fill="#92400e" fontSize="15" fontWeight="800">
          Escolher bem o threshold = segmentação de qualidade
        </text>
      </svg>
    </figure>
  );
}

function HistogramaConceitoVisual() {
  return (
    <figure className="rounded-[2rem] border border-violet-200 bg-violet-50 p-4 shadow-xl shadow-violet-900/5">
      <svg className="w-full" viewBox="0 0 760 380" role="img" aria-label="Histograma de intensidades bimodal">
        <rect width="760" height="380" rx="28" fill="#faf5ff" />
        <text x="380" y="48" textAnchor="middle" fill="#5b21b6" fontSize="22" fontWeight="900">Histograma de Intensidades</text>
        <line x1="100" y1="280" x2="660" y2="280" stroke="#475569" strokeWidth="2" />
        <line x1="100" y1="80" x2="100" y2="280" stroke="#475569" strokeWidth="2" />
        <text x="380" y="320" textAnchor="middle" fill="#475569" fontSize="14" fontWeight="700">Intensidade (0-255)</text>
        <text x="60" y="180" textAnchor="middle" fill="#475569" fontSize="14" fontWeight="700" transform="rotate(-90 60 180)">
          Quantidade de pixels
        </text>
        <path
          d="M120 280 Q150 280 180 240 Q210 180 240 140 Q270 100 300 120 Q330 160 360 200 Q390 240 420 260 Q450 240 480 200 Q510 140 540 120 Q570 160 600 220 Q630 260 660 280"
          fill="none"
          stroke="#8b5cf6"
          strokeWidth="4"
        />
        <circle cx="240" cy="140" r="8" fill="#8b5cf6" />
        <text x="240" y="120" textAnchor="middle" fill="#5b21b6" fontSize="14" fontWeight="900">Pico 1</text>
        <text x="240" y="100" textAnchor="middle" fill="#7c3aed" fontSize="12" fontWeight="700">(objeto)</text>
        <circle cx="540" cy="120" r="8" fill="#8b5cf6" />
        <text x="540" y="100" textAnchor="middle" fill="#5b21b6" fontSize="14" fontWeight="900">Pico 2</text>
        <text x="540" y="80" textAnchor="middle" fill="#7c3aed" fontSize="12" fontWeight="700">(fundo)</text>
        <circle cx="390" cy="240" r="8" fill="#ef4444" />
        <text x="390" y="220" textAnchor="middle" fill="#dc2626" fontSize="14" fontWeight="900">Vale</text>
        <text x="390" y="260" textAnchor="middle" fill="#dc2626" fontSize="12" fontWeight="700">(threshold ideal)</text>
        <text x="380" y="360" textAnchor="middle" fill="#5b21b6" fontSize="15" fontWeight="800">
          Histograma bimodal = separação fácil entre objeto e fundo
        </text>
      </svg>
    </figure>
  );
}

function SeparacaoObjetoFundoVisual() {
  return (
    <figure className="rounded-[2rem] border border-emerald-200 bg-emerald-50 p-4 shadow-xl shadow-emerald-900/5">
      <svg className="w-full" viewBox="0 0 760 360" role="img" aria-label="Separação objeto e fundo">
        <rect width="760" height="360" rx="28" fill="#ecfdf5" />
        <text x="380" y="48" textAnchor="middle" fill="#065f46" fontSize="22" fontWeight="900">Separação Objeto/Fundo</text>
        <rect x="60" y="90" width="280" height="200" rx="20" fill="#ffffff" stroke="#10b981" strokeWidth="3" />
        <circle cx="200" cy="190" r="70" fill="#1e293b" />
        <text x="200" y="320" textAnchor="middle" fill="#065f46" fontSize="14" fontWeight="700">Objeto escuro, fundo claro</text>
        <rect x="420" y="90" width="280" height="200" rx="20" fill="#ffffff" stroke="#10b981" strokeWidth="3" />
        <circle cx="560" cy="190" r="70" fill="#ffffff" stroke="#1e293b" strokeWidth="3" />
        <text x="560" y="320" textAnchor="middle" fill="#065f46" fontSize="14" fontWeight="700">Objeto claro, fundo escuro</text>
        <text x="380" y="350" textAnchor="middle" fill="#065f46" fontSize="15" fontWeight="800">
          O threshold separa os dois grupos de pixels
        </text>
      </svg>
    </figure>
  );
}

function FalsoPositivoNegativoVisual() {
  return (
    <figure className="rounded-[2rem] border border-rose-200 bg-rose-50 p-4 shadow-xl shadow-rose-900/5">
      <svg className="w-full" viewBox="0 0 760 360" role="img" aria-label="Falso positivo e falso negativo">
        <rect width="760" height="360" rx="28" fill="#fff1f2" />
        <text x="380" y="48" textAnchor="middle" fill="#9f1239" fontSize="22" fontWeight="900">Falso Positivo vs Falso Negativo</text>
        <rect x="60" y="90" width="280" height="200" rx="20" fill="#ffffff" stroke="#f43f5e" strokeWidth="3" />
        <text x="200" y="130" textAnchor="middle" fill="#9f1239" fontSize="16" fontWeight="900">Falso Positivo</text>
        <circle cx="200" cy="190" r="50" fill="#1e293b" />
        <circle cx="140" cy="150" r="8" fill="#1e293b" />
        <circle cx="260" cy="230" r="8" fill="#1e293b" />
        <text x="200" y="320" textAnchor="middle" fill="#9f1239" fontSize="13" fontWeight="700">Threshold muito baixo</text>
        <text x="200" y="340" textAnchor="middle" fill="#9f1239" fontSize="12" fontWeight="700">Fundo vira objeto</text>
        <rect x="420" y="90" width="280" height="200" rx="20" fill="#ffffff" stroke="#f43f5e" strokeWidth="3" />
        <text x="560" y="130" textAnchor="middle" fill="#9f1239" fontSize="16" fontWeight="900">Falso Negativo</text>
        <circle cx="560" cy="190" r="50" fill="#1e293b" />
        <circle cx="540" cy="170" r="12" fill="#ffffff" />
        <circle cx="580" cy="210" r="12" fill="#ffffff" />
        <text x="560" y="320" textAnchor="middle" fill="#9f1239" fontSize="13" fontWeight="700">Threshold muito alto</text>
        <text x="560" y="340" textAnchor="middle" fill="#9f1239" fontSize="12" fontWeight="700">Objeto vira fundo</text>
      </svg>
    </figure>
  );
}

function ImpactoIluminacaoVisual() {
  return (
    <figure className="rounded-[2rem] border border-amber-200 bg-amber-50 p-4 shadow-xl shadow-amber-900/5">
      <svg className="w-full" viewBox="0 0 760 360" role="img" aria-label="Impacto da iluminação na binarização">
        <rect width="760" height="360" rx="28" fill="#fffbeb" />
        <text x="380" y="48" textAnchor="middle" fill="#92400e" fontSize="22" fontWeight="900">Iluminação Desigual</text>
        <text x="190" y="90" textAnchor="middle" fill="#92400e" fontSize="16" fontWeight="800">Iluminação Uniforme</text>
        <rect x="60" y="110" width="260" height="180" rx="16" fill="#ffffff" stroke="#f59e0b" strokeWidth="3" />
        <circle cx="190" cy="200" r="60" fill="#1e293b" />
        <text x="190" y="320" textAnchor="middle" fill="#92400e" fontSize="14" fontWeight="700">Histograma bimodal</text>
        <text x="190" y="340" textAnchor="middle" fill="#92400e" fontSize="13" fontWeight="700">Threshold global funciona</text>
        <text x="570" y="90" textAnchor="middle" fill="#92400e" fontSize="16" fontWeight="800">Iluminação Desigual</text>
        <defs>
          <linearGradient id="shadowGrad" x1="0" x2="1">
            <stop offset="0%" stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>
        </defs>
        <rect x="440" y="110" width="260" height="180" rx="16" fill="url(#shadowGrad)" stroke="#f59e0b" strokeWidth="3" />
        <circle cx="570" cy="200" r="60" fill="#1e293b" />
        <text x="570" y="320" textAnchor="middle" fill="#92400e" fontSize="14" fontWeight="700">Histograma espalhado</text>
        <text x="570" y="340" textAnchor="middle" fill="#92400e" fontSize="13" fontWeight="700">Threshold global falha</text>
      </svg>
    </figure>
  );
}

function RuidoBinarizacaoVisual() {
  return (
    <figure className="rounded-[2rem] border border-rose-200 bg-rose-50 p-4 shadow-xl shadow-rose-900/5">
      <svg className="w-full" viewBox="0 0 760 360" role="img" aria-label="Ruído na binarização">
        <rect width="760" height="360" rx="28" fill="#fff1f2" />
        <text x="380" y="48" textAnchor="middle" fill="#9f1239" fontSize="22" fontWeight="900">Ruído Cria Artefatos</text>
        <text x="190" y="90" textAnchor="middle" fill="#9f1239" fontSize="16" fontWeight="800">Sem Ruído</text>
        <rect x="60" y="110" width="260" height="180" rx="16" fill="#ffffff" stroke="#f43f5e" strokeWidth="3" />
        <circle cx="190" cy="200" r="60" fill="#1e293b" />
        <text x="190" y="320" textAnchor="middle" fill="#9f1239" fontSize="14" fontWeight="700">Binarização limpa</text>
        <text x="570" y="90" textAnchor="middle" fill="#9f1239" fontSize="16" fontWeight="800">Com Ruído</text>
        <rect x="440" y="110" width="260" height="180" rx="16" fill="#ffffff" stroke="#f43f5e" strokeWidth="3" />
        <circle cx="570" cy="200" r="60" fill="#1e293b" />
        <circle cx="550" cy="180" r="8" fill="#ffffff" />
        <circle cx="590" cy="220" r="8" fill="#ffffff" />
        <circle cx="500" cy="150" r="6" fill="#1e293b" />
        <circle cx="640" cy="250" r="6" fill="#1e293b" />
        <text x="570" y="320" textAnchor="middle" fill="#9f1239" fontSize="14" fontWeight="700">Buracos e ilhas</text>
        <text x="570" y="340" textAnchor="middle" fill="#9f1239" fontSize="13" fontWeight="700">Filtre antes de binarizar</text>
      </svg>
    </figure>
  );
}

function EscolhaThresholdVisual() {
  return (
    <figure className="rounded-[2rem] border border-teal-200 bg-teal-50 p-4 shadow-xl shadow-teal-900/5">
      <svg className="w-full" viewBox="0 0 760 340" role="img" aria-label="Escolha do threshold ideal">
        <rect width="760" height="340" rx="28" fill="#f0fdfa" />
        <text x="380" y="48" textAnchor="middle" fill="#0f766e" fontSize="22" fontWeight="900">Como Escolher o Threshold</text>
        <rect x="60" y="90" width="200" height="180" rx="16" fill="#ffffff" stroke="#0f766e" strokeWidth="3" />
        <text x="160" y="130" textAnchor="middle" fill="#0f766e" fontSize="16" fontWeight="900">1. Visualizar</text>
        <text x="160" y="160" textAnchor="middle" fill="#0f766e" fontSize="14" fontWeight="700">Histograma</text>
        <path d="M100 200 Q130 160 160 200 Q190 160 220 200" fill="none" stroke="#0f766e" strokeWidth="3" />
        <rect x="280" y="90" width="200" height="180" rx="16" fill="#ffffff" stroke="#0f766e" strokeWidth="3" />
        <text x="380" y="130" textAnchor="middle" fill="#0f766e" fontSize="16" fontWeight="900">2. Identificar</text>
        <text x="380" y="160" textAnchor="middle" fill="#0f766e" fontSize="14" fontWeight="700">Bimodal?</text>
        <text x="380" y="200" textAnchor="middle" fill="#0f766e" fontSize="24" fontWeight="900">Sim → Vale</text>
        <text x="380" y="230" textAnchor="middle" fill="#0f766e" fontSize="14" fontWeight="700">Não → Adaptativo</text>
        <rect x="500" y="90" width="200" height="180" rx="16" fill="#ffffff" stroke="#0f766e" strokeWidth="3" />
        <text x="600" y="130" textAnchor="middle" fill="#0f766e" fontSize="16" fontWeight="900">3. Aplicar</text>
        <text x="600" y="160" textAnchor="middle" fill="#0f766e" fontSize="14" fontWeight="700">Threshold</text>
        <text x="600" y="200" textAnchor="middle" fill="#0f766e" fontSize="14" fontWeight="700">Manual ou Otsu</text>
        <text x="380" y="320" textAnchor="middle" fill="#0f766e" fontSize="15" fontWeight="800">
          Sempre valide visualmente o resultado
        </text>
      </svg>
    </figure>
  );
}
