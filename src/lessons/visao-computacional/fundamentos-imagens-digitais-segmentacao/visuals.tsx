import type { LessonModule } from "../../../types/content";

export const visuals = {
  "fundamentos-hero": FundamentosHeroVisual,
  "motivacao-hero": MotivacaoHeroVisual,
  "imagem-matriz": ImagemMatrizVisual,
  "pixel-grid": PixelGridVisual,
  "coordenadas-mapa": CoordenadasMapaVisual,
  "canais-rgb": CanaisRgbVisual,
  "escala-cinza-formula": EscalaCinzaFormulaVisual,
  "intensidade-escala": IntensidadeEscalaVisual,
  "contraste-impacto": ContrasteImpactoVisual,
  "ruido-resolucao": RuidoResolucaoVisual,
  "binaria-pipeline": BinariaPipelineVisual,
} satisfies LessonModule["visuals"];

function FundamentosHeroVisual() {
  return (
    <figure className="overflow-hidden rounded-[2rem] border border-teal-200 bg-white p-4 shadow-xl shadow-teal-900/10">
      <svg className="w-full" viewBox="0 0 760 430" role="img" aria-label="Fluxo de transformação de imagem em matriz numérica">
        <defs>
          <linearGradient id="fundHeroBg" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#f0fdfa" />
            <stop offset="55%" stopColor="#eff6ff" />
            <stop offset="100%" stopColor="#faf5ff" />
          </linearGradient>
        </defs>
        <rect width="760" height="430" rx="30" fill="url(#fundHeroBg)" />
        <text x="380" y="52" textAnchor="middle" fill="#0f172a" fontSize="26" fontWeight="900">De foto a números</text>
        <rect x="60" y="90" width="180" height="180" rx="20" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="3" />
        <text x="150" y="180" textAnchor="middle" fill="#3730a3" fontSize="18" fontWeight="900">Imagem</text>
        <text x="150" y="210" textAnchor="middle" fill="#4f46e5" fontSize="14" fontWeight="700">1920×1080</text>
        <path d="M280 180h60" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
        <path d="M330 170l10 10l-10 10" fill="#475569" />
        <rect x="380" y="90" width="320" height="180" rx="20" fill="#ffffff" stroke="#0f766e" strokeWidth="3" />
        <text x="540" y="130" textAnchor="middle" fill="#0f766e" fontSize="16" fontWeight="900">Matriz Numérica</text>
        {Array.from({ length: 6 }).map((_, row) => (
          <g key={row}>
            {Array.from({ length: 8 }).map((_, col) => {
              const value = Math.floor(Math.random() * 256);
              const gray = Math.floor(value * 0.4 + 100);
              return (
                <rect
                  key={col}
                  x={400 + col * 35}
                  y={145 + row * 20}
                  width="32"
                  height="18"
                  rx="4"
                  fill={`rgb(${gray},${gray},${gray})`}
                  stroke="#cbd5e1"
                  strokeWidth="1"
                />
              );
            })}
          </g>
        ))}
        <text x="540" y="290" textAnchor="middle" fill="#0f766e" fontSize="14" fontWeight="800">Cada célula = 1 pixel (0-255)</text>
        <rect x="100" y="320" width="560" height="80" rx="20" fill="#ffffff" stroke="#0f766e" strokeWidth="2" />
        <text x="380" y="355" textAnchor="middle" fill="#0f766e" fontSize="16" fontWeight="900">Segmentação = decidir quais pixels são objeto</text>
        <text x="380" y="380" textAnchor="middle" fill="#475569" fontSize="13" fontWeight="700">Tudo começa entendendo que imagem é matriz</text>
      </svg>
    </figure>
  );
}

function MotivacaoHeroVisual() {
  return (
    <figure className="rounded-[2rem] border border-blue-200 bg-blue-50 p-4 shadow-xl shadow-blue-900/5">
      <svg className="w-full" viewBox="0 0 760 350" role="img" aria-label="Computador lendo números de uma imagem">
        <rect width="760" height="350" rx="28" fill="#eff6ff" />
        <text x="380" y="48" textAnchor="middle" fill="#1e3a8a" fontSize="22" fontWeight="900">O computador não vê — ele lê números</text>
        <rect x="80" y="90" width="200" height="200" rx="20" fill="#dbeafe" stroke="#3b82f6" strokeWidth="3" />
        <text x="180" y="190" textAnchor="middle" fill="#1e40af" fontSize="18" fontWeight="900">Você vê:</text>
        <text x="180" y="220" textAnchor="middle" fill="#2563eb" fontSize="16" fontWeight="700">formas, cores, objetos</text>
        <rect x="480" y="90" width="200" height="200" rx="20" fill="#ffffff" stroke="#0f766e" strokeWidth="3" />
        <text x="580" y="130" textAnchor="middle" fill="#0f766e" fontSize="16" fontWeight="900">Computador vê:</text>
        {Array.from({ length: 5 }).map((_, row) => (
          <g key={row}>
            {Array.from({ length: 5 }).map((_, col) => {
              const value = Math.floor(Math.random() * 200 + 50);
              return (
                <text
                  key={col}
                  x={500 + col * 35}
                  y={155 + row * 22}
                  textAnchor="middle"
                  fill="#0f766e"
                  fontSize="12"
                  fontWeight="800"
                >
                  {value}
                </text>
              );
            })}
          </g>
        ))}
        <text x="380" y="330" textAnchor="middle" fill="#1e3a8a" fontSize="16" fontWeight="800">
          Visão computacional traduz essa tabela em informação útil
        </text>
      </svg>
    </figure>
  );
}

function ImagemMatrizVisual() {
  return (
    <figure className="rounded-[2rem] border border-teal-200 bg-teal-50 p-4 shadow-xl shadow-teal-900/5">
      <svg className="w-full" viewBox="0 0 760 380" role="img" aria-label="Imagem digital como matriz de pixels">
        <rect width="760" height="380" rx="28" fill="#f0fdfa" />
        <text x="380" y="48" textAnchor="middle" fill="#0f766e" fontSize="22" fontWeight="900">Imagem = Matriz de Números</text>
        <text x="190" y="90" textAnchor="middle" fill="#0f766e" fontSize="16" fontWeight="800">Imagem 8×8</text>
        {Array.from({ length: 8 }).map((_, row) => (
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
        <text x="190" y="380" textAnchor="middle" fill="#0f766e" fontSize="14" fontWeight="700">64 pixels, cada um com valor 0-255</text>
        <rect x="420" y="110" width="280" height="200" rx="20" fill="#ffffff" stroke="#0f766e" strokeWidth="2" />
        <text x="560" y="145" textAnchor="middle" fill="#0f766e" fontSize="16" fontWeight="900">Em NumPy:</text>
        <text x="440" y="180" fill="#475569" fontSize="14" fontWeight="700">img = np.array([</text>
        <text x="460" y="205" fill="#475569" fontSize="13" fontWeight="700">[0, 50, 120, ...],</text>
        <text x="460" y="230" fill="#475569" fontSize="13" fontWeight="700">[30, 80, 160, ...],</text>
        <text x="460" y="255" fill="#475569" fontSize="13" fontWeight="700">[...]</text>
        <text x="440" y="280" fill="#475569" fontSize="14" fontWeight="700">])</text>
        <text x="560" y="350" textAnchor="middle" fill="#0f766e" fontSize="15" fontWeight="800">Cada número = intensidade de 1 pixel</text>
      </svg>
    </figure>
  );
}

function PixelGridVisual() {
  return (
    <figure className="rounded-[2rem] border border-violet-200 bg-violet-50 p-4 shadow-xl shadow-violet-900/5">
      <svg className="w-full" viewBox="0 0 760 360" role="img" aria-label="Pixel como menor unidade de imagem">
        <rect width="760" height="360" rx="28" fill="#faf5ff" />
        <text x="380" y="48" textAnchor="middle" fill="#5b21b6" fontSize="22" fontWeight="900">Pixel: o átomo da imagem</text>
        <text x="190" y="90" textAnchor="middle" fill="#5b21b6" fontSize="16" fontWeight="800">De longe: imagem contínua</text>
        <rect x="60" y="110" width="260" height="180" rx="16" fill="#ddd6fe" stroke="#7c3aed" strokeWidth="2" />
        <text x="190" y="200" textAnchor="middle" fill="#5b21b6" fontSize="18" fontWeight="900">Foto</text>
        <text x="570" y="90" textAnchor="middle" fill="#5b21b6" fontSize="16" fontWeight="800">De perto: pixels visíveis</text>
        {Array.from({ length: 6 }).map((_, row) => (
          <g key={row}>
            {Array.from({ length: 8 }).map((_, col) => {
              const value = Math.floor(Math.random() * 200 + 50);
              const gray = Math.floor(value * 0.5 + 80);
              return (
                <rect
                  key={col}
                  x={440 + col * 32}
                  y={110 + row * 30}
                  width="30"
                  height="28"
                  rx="2"
                  fill={`rgb(${gray},${gray},${gray})`}
                  stroke="#7c3aed"
                  strokeWidth="2"
                />
              );
            })}
          </g>
        ))}
        <text x="380" y="340" textAnchor="middle" fill="#5b21b6" fontSize="16" fontWeight="800">
          Cada quadradinho é um pixel com seu próprio valor
        </text>
      </svg>
    </figure>
  );
}

function CoordenadasMapaVisual() {
  return (
    <figure className="rounded-[2rem] border border-indigo-200 bg-indigo-50 p-4 shadow-xl shadow-indigo-900/5">
      <svg className="w-full" viewBox="0 0 760 380" role="img" aria-label="Sistema de coordenadas de imagem">
        <rect width="760" height="380" rx="28" fill="#eef2ff" />
        <text x="380" y="48" textAnchor="middle" fill="#3730a3" fontSize="22" fontWeight="900">Coordenadas: [linha, coluna]</text>
        <rect x="100" y="90" width="560" height="240" rx="16" fill="#ffffff" stroke="#4f46e5" strokeWidth="3" />
        <text x="115" y="115" fill="#3730a3" fontSize="14" fontWeight="900">[0,0]</text>
        <text x="625" y="115" fill="#3730a3" fontSize="14" fontWeight="900">[0,7]</text>
        <text x="115" y="320" fill="#3730a3" fontSize="14" fontWeight="900">[5,0]</text>
        <text x="625" y="320" fill="#3730a3" fontSize="14" fontWeight="900">[5,7]</text>
        <rect x="300" y="180" width="60" height="40" rx="8" fill="#818cf8" stroke="#4f46e5" strokeWidth="3" />
        <text x="330" y="205" textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="900">[2,3]</text>
        <text x="380" y="360" textAnchor="middle" fill="#3730a3" fontSize="16" fontWeight="800">
          Origem [0,0] no canto superior esquerdo • Y aponta para baixo
        </text>
      </svg>
    </figure>
  );
}

function CanaisRgbVisual() {
  return (
    <figure className="rounded-[2rem] border border-rose-200 bg-rose-50 p-4 shadow-xl shadow-rose-900/5">
      <svg className="w-full" viewBox="0 0 760 360" role="img" aria-label="Canais RGB separados">
        <rect width="760" height="360" rx="28" fill="#fff1f2" />
        <text x="380" y="48" textAnchor="middle" fill="#9f1239" fontSize="22" fontWeight="900">RGB: Três Imagens em Uma</text>
        <rect x="60" y="90" width="180" height="180" rx="16" fill="#fee2e2" stroke="#ef4444" strokeWidth="3" />
        <text x="150" y="180" textAnchor="middle" fill="#991b1b" fontSize="18" fontWeight="900">R</text>
        <text x="150" y="210" textAnchor="middle" fill="#dc2626" fontSize="14" fontWeight="700">Vermelho</text>
        <rect x="290" y="90" width="180" height="180" rx="16" fill="#dcfce7" stroke="#22c55e" strokeWidth="3" />
        <text x="380" y="180" textAnchor="middle" fill="#166534" fontSize="18" fontWeight="900">G</text>
        <text x="380" y="210" textAnchor="middle" fill="#16a34a" fontSize="14" fontWeight="700">Verde</text>
        <rect x="520" y="90" width="180" height="180" rx="16" fill="#dbeafe" stroke="#3b82f6" strokeWidth="3" />
        <text x="610" y="180" textAnchor="middle" fill="#1e40af" fontSize="18" fontWeight="900">B</text>
        <text x="610" y="210" textAnchor="middle" fill="#2563eb" fontSize="14" fontWeight="700">Azul</text>
        <text x="380" y="320" textAnchor="middle" fill="#9f1239" fontSize="16" fontWeight="800">
          Cada canal é uma imagem em escala de cinza independente
        </text>
        <text x="380" y="345" textAnchor="middle" fill="#475569" fontSize="13" fontWeight="700">
          Combinados, produzem a cor final de cada pixel
        </text>
      </svg>
    </figure>
  );
}

function EscalaCinzaFormulaVisual() {
  return (
    <figure className="rounded-[2rem] border border-amber-200 bg-amber-50 p-4 shadow-xl shadow-amber-900/5">
      <svg className="w-full" viewBox="0 0 760 340" role="img" aria-label="Fórmula de conversão RGB para escala de cinza">
        <rect width="760" height="340" rx="28" fill="#fffbeb" />
        <text x="380" y="48" textAnchor="middle" fill="#92400e" fontSize="22" fontWeight="900">De 3 Canais para 1</text>
        <rect x="100" y="90" width="560" height="80" rx="20" fill="#ffffff" stroke="#f59e0b" strokeWidth="3" />
        <text x="380" y="130" textAnchor="middle" fill="#92400e" fontSize="24" fontWeight="900">
          Y = 0.299R + 0.587G + 0.114B
        </text>
        <text x="380" y="155" textAnchor="middle" fill="#b45309" fontSize="14" fontWeight="700">
          Fórmula ponderada que respeita a sensibilidade do olho humano
        </text>
        <rect x="100" y="200" width="260" height="100" rx="16" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
        <text x="230" y="235" textAnchor="middle" fill="#92400e" fontSize="16" fontWeight="900">Verde: 0.587</text>
        <text x="230" y="265" textAnchor="middle" fill="#b45309" fontSize="13" fontWeight="700">Maior peso</text>
        <text x="230" y="285" textAnchor="middle" fill="#b45309" fontSize="12" fontWeight="700">Olho mais sensível</text>
        <rect x="400" y="200" width="260" height="100" rx="16" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" />
        <text x="530" y="235" textAnchor="middle" fill="#991b1b" fontSize="16" fontWeight="900">Azul: 0.114</text>
        <text x="530" y="265" textAnchor="middle" fill="#dc2626" fontSize="13" fontWeight="700">Menor peso</text>
        <text x="530" y="285" textAnchor="middle" fill="#dc2626" fontSize="12" fontWeight="700">Olho menos sensível</text>
        <text x="380" y="330" textAnchor="middle" fill="#92400e" fontSize="15" fontWeight="800">
          Não é média simples — é média perceptual
        </text>
      </svg>
    </figure>
  );
}

function IntensidadeEscalaVisual() {
  return (
    <figure className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-xl shadow-slate-900/5">
      <svg className="w-full" viewBox="0 0 760 320" role="img" aria-label="Escala de intensidade de 0 a 255">
        <rect width="760" height="320" rx="28" fill="#f8fafc" />
        <text x="380" y="48" textAnchor="middle" fill="#0f172a" fontSize="22" fontWeight="900">Intensidade: 0 a 255</text>
        <defs>
          <linearGradient id="intensityGrad" x1="0" x2="1">
            <stop offset="0%" stopColor="#000000" />
            <stop offset="50%" stopColor="#808080" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>
        </defs>
        <rect x="100" y="90" width="560" height="80" rx="16" fill="url(#intensityGrad)" stroke="#475569" strokeWidth="3" />
        <text x="120" y="200" fill="#0f172a" fontSize="18" fontWeight="900">0</text>
        <text x="120" y="225" fill="#475569" fontSize="14" fontWeight="700">Preto</text>
        <text x="380" y="200" textAnchor="middle" fill="#0f172a" fontSize="18" fontWeight="900">128</text>
        <text x="380" y="225" textAnchor="middle" fill="#475569" fontSize="14" fontWeight="700">Cinza médio</text>
        <text x="640" y="200" textAnchor="end" fill="#0f172a" fontSize="18" fontWeight="900">255</text>
        <text x="640" y="225" textAnchor="end" fill="#475569" fontSize="14" fontWeight="700">Branco</text>
        <text x="380" y="280" textAnchor="middle" fill="#0f172a" fontSize="16" fontWeight="800">
          256 níveis (8 bits) são suficientes para o olho humano
        </text>
        <text x="380" y="305" textAnchor="middle" fill="#475569" fontSize="13" fontWeight="700">
          Imagens médicas usam 16 bits (65.536 níveis) para mais precisão
        </text>
      </svg>
    </figure>
  );
}

function ContrasteImpactoVisual() {
  return (
    <figure className="rounded-[2rem] border border-emerald-200 bg-emerald-50 p-4 shadow-xl shadow-emerald-900/5">
      <svg className="w-full" viewBox="0 0 760 360" role="img" aria-label="Impacto do contraste na segmentação">
        <rect width="760" height="360" rx="28" fill="#ecfdf5" />
        <text x="380" y="48" textAnchor="middle" fill="#065f46" fontSize="22" fontWeight="900">Contraste: Objeto vs Fundo</text>
        <text x="190" y="90" textAnchor="middle" fill="#065f46" fontSize="16" fontWeight="800">Alto Contraste</text>
        <rect x="60" y="110" width="260" height="180" rx="16" fill="#ffffff" stroke="#10b981" strokeWidth="3" />
        <circle cx="190" cy="200" r="60" fill="#0f172a" />
        <text x="190" y="320" textAnchor="middle" fill="#065f46" fontSize="14" fontWeight="700">Fácil segmentar</text>
        <text x="570" y="90" textAnchor="middle" fill="#065f46" fontSize="16" fontWeight="800">Baixo Contraste</text>
        <rect x="440" y="110" width="260" height="180" rx="16" fill="#e2e8f0" stroke="#64748b" strokeWidth="3" />
        <circle cx="570" cy="200" r="60" fill="#94a3b8" />
        <text x="570" y="320" textAnchor="middle" fill="#64748b" fontSize="14" fontWeight="700">Difícil segmentar</text>
        <text x="380" y="350" textAnchor="middle" fill="#065f46" fontSize="15" fontWeight="800">
          Sem contraste, nenhum algoritmo funciona bem
        </text>
      </svg>
    </figure>
  );
}

function RuidoResolucaoVisual() {
  return (
    <figure className="rounded-[2rem] border border-rose-200 bg-rose-50 p-4 shadow-xl shadow-rose-900/5">
      <svg className="w-full" viewBox="0 0 760 360" role="img" aria-label="Ruído e resolução em imagens">
        <rect width="760" height="360" rx="28" fill="#fff1f2" />
        <text x="380" y="48" textAnchor="middle" fill="#9f1239" fontSize="22" fontWeight="900">Ruído vs Resolução</text>
        <text x="190" y="90" textAnchor="middle" fill="#9f1239" fontSize="16" fontWeight="800">Ruído Sal-e-Pimenta</text>
        <rect x="60" y="110" width="260" height="180" rx="16" fill="#ffffff" stroke="#f43f5e" strokeWidth="3" />
        {Array.from({ length: 6 }).map((_, row) => (
          <g key={row}>
            {Array.from({ length: 8 }).map((_, col) => {
              const isNoise = Math.random() > 0.85;
              const value = isNoise ? (Math.random() > 0.5 ? 0 : 255) : 128;
              return (
                <rect
                  key={col}
                  x={70 + col * 30}
                  y={120 + row * 28}
                  width="28"
                  height="26"
                  rx="2"
                  fill={`rgb(${value},${value},${value})`}
                />
              );
            })}
          </g>
        ))}
        <text x="190" y="320" textAnchor="middle" fill="#9f1239" fontSize="14" fontWeight="700">Pixels 0 ou 255 aleatórios</text>
        <text x="570" y="90" textAnchor="middle" fill="#9f1239" fontSize="16" fontWeight="800">Baixa Resolução</text>
        <rect x="440" y="110" width="260" height="180" rx="16" fill="#ffffff" stroke="#f43f5e" strokeWidth="3" />
        {Array.from({ length: 4 }).map((_, row) => (
          <g key={row}>
            {Array.from({ length: 5 }).map((_, col) => {
              const gray = Math.floor(Math.random() * 100 + 100);
              return (
                <rect
                  key={col}
                  x={450 + col * 50}
                  y={120 + row * 42}
                  width="48"
                  height="40"
                  rx="4"
                  fill={`rgb(${gray},${gray},${gray})`}
                  stroke="#f43f5e"
                  strokeWidth="2"
                />
              );
            })}
          </g>
        ))}
        <text x="570" y="320" textAnchor="middle" fill="#9f1239" fontSize="14" fontWeight="700">Poucos pixels = pouco detalhe</text>
        <text x="380" y="350" textAnchor="middle" fill="#9f1239" fontSize="15" fontWeight="800">
          Mais megapixels não resolvem ruído de sensor
        </text>
      </svg>
    </figure>
  );
}

function BinariaPipelineVisual() {
  return (
    <figure className="rounded-[2rem] border border-teal-200 bg-teal-50 p-4 shadow-xl shadow-teal-900/5">
      <svg className="w-full" viewBox="0 0 760 340" role="img" aria-label="Pipeline de binarização">
        <rect width="760" height="340" rx="28" fill="#f0fdfa" />
        <text x="380" y="48" textAnchor="middle" fill="#0f766e" fontSize="22" fontWeight="900">Binarização: o Portal para Segmentação</text>
        <rect x="60" y="90" width="180" height="140" rx="16" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="3" />
        <text x="150" y="160" textAnchor="middle" fill="#3730a3" fontSize="16" fontWeight="900">Escala de Cinza</text>
        <text x="150" y="185" textAnchor="middle" fill="#4f46e5" fontSize="13" fontWeight="700">0-255</text>
        <path d="M270 160h40" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
        <path d="M300 150l10 10l-10 10" fill="#475569" />
        <rect x="340" y="90" width="180" height="140" rx="16" fill="#fef3c7" stroke="#f59e0b" strokeWidth="3" />
        <text x="430" y="150" textAnchor="middle" fill="#92400e" fontSize="16" fontWeight="900">Threshold</text>
        <text x="430" y="175" textAnchor="middle" fill="#b45309" fontSize="13" fontWeight="700">valor &gt; 127?</text>
        <text x="430" y="195" textAnchor="middle" fill="#b45309" fontSize="12" fontWeight="700">sim → 255</text>
        <text x="430" y="210" textAnchor="middle" fill="#b45309" fontSize="12" fontWeight="700">não → 0</text>
        <path d="M550 160h40" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
        <path d="M580 150l10 10l-10 10" fill="#475569" />
        <rect x="620" y="90" width="100" height="140" rx="16" fill="#ffffff" stroke="#0f766e" strokeWidth="3" />
        <text x="670" y="160" textAnchor="middle" fill="#0f766e" fontSize="16" fontWeight="900">Binária</text>
        <text x="670" y="185" textAnchor="middle" fill="#0f766e" fontSize="13" fontWeight="700">0 ou 255</text>
        <rect x="100" y="260" width="560" height="60" rx="16" fill="#ffffff" stroke="#0f766e" strokeWidth="2" />
        <text x="380" y="295" textAnchor="middle" fill="#0f766e" fontSize="16" fontWeight="900">
          Portal entre "ver" e "medir" — permite contar, medir, classificar
        </text>
      </svg>
    </figure>
  );
}
