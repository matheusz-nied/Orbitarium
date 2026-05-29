import type { LessonModule } from "../../../types/content";

export const visuals = {
  "morfologia-hero": MorfologiaHeroVisual,
  "morfologia-motivacao": MorfologiaMotivacaoVisual,
  "elemento-estruturante": ElementoEstruturanteVisual,
  "erosao-dilatacao": ErosaoDilatacaoVisual,
  "opening-visual": OpeningVisual,
  "closing-visual": ClosingVisual,
  "tamanho-kernel": TamanhoKernelVisual,
  "formato-kernel": FormatoKernelVisual,
  "pipeline-morfologia": PipelineMorfologiaVisual,
  "erros-morfologia": ErrosMorfologiaVisual,
} satisfies LessonModule["visuals"];

function MorfologiaHeroVisual() {
  return (
    <figure className="overflow-hidden rounded-[2rem] border border-emerald-200 bg-white p-4 shadow-xl shadow-emerald-900/10">
      <svg className="w-full" viewBox="0 0 760 430" role="img" aria-label="Pipeline de limpeza morfológica">
        <defs>
          <linearGradient id="morphHeroBg" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#ecfdf5" />
            <stop offset="55%" stopColor="#eef2ff" />
            <stop offset="100%" stopColor="#fdf2f8" />
          </linearGradient>
        </defs>
        <rect width="760" height="430" rx="30" fill="url(#morphHeroBg)" />
        <text x="380" y="54" textAnchor="middle" fill="#0f172a" fontSize="26" fontWeight="900">Limpar formas depois do threshold</text>
        <MorphCard x={55} y={105} title="Binária ruidosa" note="ilhas e buracos" variant="noisy" />
        <Arrow x={245} y={200} />
        <MorphCard x={300} y={105} title="Kernel" note="3×3, 5×5, elipse" variant="kernel" />
        <Arrow x={490} y={200} />
        <MorphCard x={545} y={105} title="Binária limpa" note="pronta para medir" variant="clean" />
        <rect x="110" y="340" width="540" height="58" rx="18" fill="#ffffff" stroke="#10b981" strokeWidth="2" />
        <text x="380" y="375" textAnchor="middle" fill="#047857" fontSize="16" fontWeight="900">morfologia = erosão, dilatação, opening e closing</text>
      </svg>
    </figure>
  );
}

function MorfologiaMotivacaoVisual() {
  return <ComparisonFigure title="Depois do thresholding" left="Com artefatos" right="Depois da limpeza" leftVariant="noisy" rightVariant="clean" tone="#2563eb" bg="#eff6ff" />;
}

function ElementoEstruturanteVisual() {
  return (
    <figure className="rounded-[2rem] border border-teal-200 bg-teal-50 p-4 shadow-xl shadow-teal-900/5">
      <svg className="w-full" viewBox="0 0 760 360" role="img" aria-label="Elementos estruturantes">
        <rect width="760" height="360" rx="28" fill="#f0fdfa" />
        <text x="380" y="48" textAnchor="middle" fill="#0f766e" fontSize="22" fontWeight="900">Elemento estruturante: a vizinhança ativa</text>
        <KernelShape x={130} y={125} label="Quadrado" cells={[0,1,2,3,4,5,6,7,8]} color="#0f766e" />
        <KernelShape x={340} y={125} label="Cruz" cells={[1,3,4,5,7]} color="#2563eb" />
        <KernelShape x={550} y={125} label="Elipse" cells={[1,3,4,5,7]} color="#a855f7" rounded />
        <text x="380" y="325" textAnchor="middle" fill="#0f766e" fontSize="15" fontWeight="800">o formato do kernel muda como bordas, diagonais e curvas são tratadas</text>
      </svg>
    </figure>
  );
}

function ErosaoDilatacaoVisual() {
  return <ComparisonFigure title="Erosão encolhe, dilatação expande" left="Erosão" right="Dilatação" leftVariant="erode" rightVariant="dilate" tone="#7c3aed" bg="#faf5ff" />;
}

function OpeningVisual() {
  return <PipelineFigure title="Opening = erosão → dilatação" steps={["Ruído branco", "Erosão remove", "Dilatação restaura"]} color="#f59e0b" bg="#fffbeb" />;
}

function ClosingVisual() {
  return <PipelineFigure title="Closing = dilatação → erosão" steps={["Buracos pretos", "Dilatação fecha", "Erosão restaura"]} color="#0f766e" bg="#ecfdf5" />;
}

function TamanhoKernelVisual() {
  return (
    <figure className="rounded-[2rem] border border-amber-200 bg-amber-50 p-4 shadow-xl shadow-amber-900/5">
      <svg className="w-full" viewBox="0 0 760 360" role="img" aria-label="Efeito do tamanho do kernel">
        <rect width="760" height="360" rx="28" fill="#fffbeb" />
        <text x="380" y="48" textAnchor="middle" fill="#92400e" fontSize="22" fontWeight="900">Tamanho do kernel define a escala</text>
        {["3×3", "5×5", "7×7"].map((label, index) => (
          <g key={label}>
            <rect x={90 + index * 220} y="100" width="150" height="150" rx="18" fill="#ffffff" stroke="#f59e0b" strokeWidth="3" />
            <text x={165 + index * 220} y="138" textAnchor="middle" fill="#92400e" fontSize="18" fontWeight="900">{label}</text>
            <circle cx={165 + index * 220} cy="190" r={26 + index * 15} fill="#f59e0b" opacity="0.22" />
            <text x={165 + index * 220} y="285" textAnchor="middle" fill="#92400e" fontSize="13" fontWeight="800">{index === 0 ? "suave" : index === 1 ? "moderado" : "agressivo"}</text>
          </g>
        ))}
        <text x="380" y="335" textAnchor="middle" fill="#92400e" fontSize="15" fontWeight="800">maior kernel remove defeitos maiores, mas também destrói detalhes menores</text>
      </svg>
    </figure>
  );
}

function FormatoKernelVisual() {
  return <ComparisonFigure title="Formato do kernel carrega conhecimento da forma" left="Quadrado" right="Elíptico" leftVariant="squareKernel" rightVariant="ellipseKernel" tone="#0e7490" bg="#ecfeff" />;
}

function PipelineMorfologiaVisual() {
  return (
    <figure className="rounded-[2rem] border border-emerald-200 bg-emerald-50 p-4 shadow-xl shadow-emerald-900/5">
      <svg className="w-full" viewBox="0 0 760 330" role="img" aria-label="Pipeline da morfologia">
        <rect width="760" height="330" rx="28" fill="#ecfdf5" />
        <text x="380" y="48" textAnchor="middle" fill="#065f46" fontSize="22" fontWeight="900">Onde entra no notebook?</text>
        {[
          ["Threshold", "imagem binária"],
          ["Morfologia", "limpa artefatos"],
          ["Blobs", "componentes"],
          ["Features", "medidas"],
        ].map(([title, note], index) => (
          <g key={title}>
            <rect x={55 + index * 180} y="110" width="140" height="90" rx="18" fill="#ffffff" stroke="#10b981" strokeWidth="3" />
            <text x={125 + index * 180} y="148" textAnchor="middle" fill="#065f46" fontSize="16" fontWeight="900">{title}</text>
            <text x={125 + index * 180} y="174" textAnchor="middle" fill="#047857" fontSize="12" fontWeight="700">{note}</text>
            {index < 3 ? <path d={`M${200 + index * 180} 155h34`} stroke="#475569" strokeWidth="4" strokeLinecap="round" /> : null}
          </g>
        ))}
        <text x="380" y="278" textAnchor="middle" fill="#065f46" fontSize="15" fontWeight="800">limpe antes de contar, medir e classificar</text>
      </svg>
    </figure>
  );
}

function ErrosMorfologiaVisual() {
  return (
    <figure className="rounded-[2rem] border border-rose-200 bg-rose-50 p-4 shadow-xl shadow-rose-900/5">
      <svg className="w-full" viewBox="0 0 760 340" role="img" aria-label="Erros comuns em morfologia">
        <rect width="760" height="340" rx="28" fill="#fff1f2" />
        <text x="380" y="48" textAnchor="middle" fill="#9f1239" fontSize="22" fontWeight="900">Erros comuns</text>
        {[
          ["Kernel grande", "apaga detalhes"],
          ["Iterações demais", "deforma objetos"],
          ["Ordem errada", "troca o objetivo"],
        ].map(([title, note], index) => (
          <g key={title}>
            <rect x={70 + index * 230} y="95" width="180" height="150" rx="20" fill="#ffffff" stroke="#f43f5e" strokeWidth="3" />
            <text x={160 + index * 230} y="145" textAnchor="middle" fill="#9f1239" fontSize="16" fontWeight="900">{title}</text>
            <text x={160 + index * 230} y="178" textAnchor="middle" fill="#be123c" fontSize="13" fontWeight="800">{note}</text>
            <text x={160 + index * 230} y="215" textAnchor="middle" fill="#f43f5e" fontSize="30" fontWeight="900">!</text>
          </g>
        ))}
        <text x="380" y="305" textAnchor="middle" fill="#9f1239" fontSize="15" fontWeight="800">sempre compare antes/depois com métricas e inspeção visual</text>
      </svg>
    </figure>
  );
}

function MorphCard({ x, y, title, note, variant }: { x: number; y: number; title: string; note: string; variant: string }) {
  return (
    <g>
      <rect x={x} y={y} width="160" height="190" rx="22" fill="#ffffff" stroke="#10b981" strokeWidth="3" />
      <text x={x + 80} y={y + 35} textAnchor="middle" fill="#065f46" fontSize="15" fontWeight="900">{title}</text>
      <MiniShape x={x + 35} y={y + 58} variant={variant} />
      <text x={x + 80} y={y + 165} textAnchor="middle" fill="#047857" fontSize="12" fontWeight="800">{note}</text>
    </g>
  );
}

function MiniShape({ x, y, variant }: { x: number; y: number; variant: string }) {
  const isNoisy = variant === "noisy";
  const isClean = variant === "clean";
  const radius = variant === "erode" ? 38 : variant === "dilate" ? 56 : 46;
  return (
    <g>
      {variant === "kernel" ? (
        Array.from({ length: 9 }).map((_, i) => (
          <rect key={i} x={x + (i % 3) * 28} y={y + Math.floor(i / 3) * 28} width="24" height="24" rx="4" fill="#10b981" opacity="0.75" />
        ))
      ) : (
        <>
          <circle cx={x + 45} cy={y + 50} r={radius} fill="#0f172a" />
          {isNoisy ? <><circle cx={x + 15} cy={y + 20} r="6" fill="#0f172a" /><circle cx={x + 75} cy={y + 85} r="7" fill="#ffffff" /></> : null}
          {isClean ? <circle cx={x + 45} cy={y + 50} r="18" fill="#ffffff" opacity="0" /> : null}
        </>
      )}
    </g>
  );
}

function Arrow({ x, y }: { x: number; y: number }) {
  return <path d={`M${x} ${y}h36`} stroke="#475569" strokeWidth="5" strokeLinecap="round" />;
}

function ComparisonFigure({ title, left, right, leftVariant, rightVariant, tone, bg }: { title: string; left: string; right: string; leftVariant: string; rightVariant: string; tone: string; bg: string }) {
  return (
    <figure className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-xl shadow-slate-900/5">
      <svg className="w-full" viewBox="0 0 760 360" role="img" aria-label={title}>
        <rect width="760" height="360" rx="28" fill={bg} />
        <text x="380" y="48" textAnchor="middle" fill={tone} fontSize="22" fontWeight="900">{title}</text>
        <MorphCard x={145} y={90} title={left} note="antes/efeito" variant={leftVariant} />
        <Arrow x={355} y={185} />
        <MorphCard x={455} y={90} title={right} note="resultado" variant={rightVariant} />
      </svg>
    </figure>
  );
}

function PipelineFigure({ title, steps, color, bg }: { title: string; steps: string[]; color: string; bg: string }) {
  return (
    <figure className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-xl shadow-slate-900/5">
      <svg className="w-full" viewBox="0 0 760 330" role="img" aria-label={title}>
        <rect width="760" height="330" rx="28" fill={bg} />
        <text x="380" y="48" textAnchor="middle" fill={color} fontSize="22" fontWeight="900">{title}</text>
        {steps.map((step, index) => (
          <g key={step}>
            <rect x={90 + index * 240} y="110" width="160" height="110" rx="20" fill="#ffffff" stroke={color} strokeWidth="3" />
            <text x={170 + index * 240} y="170" textAnchor="middle" fill={color} fontSize="15" fontWeight="900">{step}</text>
            {index < 2 ? <path d={`M${260 + index * 240} 165h50`} stroke="#475569" strokeWidth="4" strokeLinecap="round" /> : null}
          </g>
        ))}
        <text x="380" y="285" textAnchor="middle" fill={color} fontSize="15" fontWeight="800">a ordem das operações muda o resultado</text>
      </svg>
    </figure>
  );
}

function KernelShape({ x, y, label, cells, color, rounded = false }: { x: number; y: number; label: string; cells: number[]; color: string; rounded?: boolean }) {
  return (
    <g>
      <rect x={x - 62} y={y - 20} width="124" height="145" rx="18" fill="#ffffff" stroke={color} strokeWidth="3" />
      {Array.from({ length: 9 }).map((_, i) => (
        <rect key={i} x={x - 39 + (i % 3) * 26} y={y + 5 + Math.floor(i / 3) * 26} width="22" height="22" rx={rounded ? 11 : 4} fill={cells.includes(i) ? color : "#e2e8f0"} opacity={cells.includes(i) ? 0.85 : 1} />
      ))}
      <text x={x} y={y + 115} textAnchor="middle" fill={color} fontSize="14" fontWeight="900">{label}</text>
    </g>
  );
}
