import type { LessonModule } from "../../../types/content";

export const visuals = {
  "cmb-hero": CmbHeroVisual,
  "cmb-observer-past": CmbObserverPastVisual,
  "cmb-plasma": CmbPlasmaVisual,
  "cmb-cooling": CmbCoolingVisual,
  "cmb-recombination": CmbRecombinationVisual,
  "cmb-redshift": CmbRedshiftVisual,
  "cmb-evidence": CmbEvidenceVisual,
  "cmb-temperature-map": CmbMapVisual,
  "cmb-structures": CmbStructuresVisual,
  "cmb-timeline": CmbTimelineVisual,
  "cmb-missions": CmbMissionsVisual,
  "cmb-measurements": CmbMeasurementsVisual,
  "cmb-summary": CmbSummaryVisual,
} satisfies LessonModule["visuals"];

function CmbHeroVisual() {
  return (
    <figure className="overflow-hidden rounded-[2rem] border border-sky-400/30 bg-[#050816] p-4 shadow-2xl shadow-sky-950/40">
      <svg viewBox="0 0 760 430" role="img" aria-label="Mapa estilizado da CMB com fótons livres após a recombinação" className="w-full">
        <defs>
          <radialGradient id="cmbMapGlow" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="#facc15" stopOpacity="0.9" />
            <stop offset="45%" stopColor="#f43f5e" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0.65" />
          </radialGradient>
        </defs>
        <rect width="760" height="430" rx="30" fill="#050816" />
        {Array.from({ length: 70 }, (_, index) => (
          <circle key={index} cx={(index * 83) % 740 + 10} cy={(index * 47) % 390 + 20} r={index % 5 === 0 ? 1.8 : 1} fill="#e0f2fe" opacity={index % 4 === 0 ? 0.8 : 0.35} />
        ))}
        <ellipse cx="382" cy="190" rx="230" ry="116" fill="url(#cmbMapGlow)" opacity="0.95" />
        {Array.from({ length: 38 }, (_, index) => (
          <ellipse key={index} cx={190 + ((index * 71) % 390)} cy={102 + ((index * 43) % 172)} rx={18 + (index % 4) * 7} ry={9 + (index % 5) * 4} fill={index % 2 === 0 ? "#38bdf8" : "#f43f5e"} opacity="0.38" transform={`rotate(${(index * 29) % 180} ${190 + ((index * 71) % 390)} ${102 + ((index * 43) % 172)})`} />
        ))}
        <path d="M128 342h500" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" opacity="0.55" />
        <circle cx="270" cy="342" r="12" fill="#facc15" />
        <text x="288" y="348" fill="#f8fafc" fontSize="18" fontWeight="800">380 mil anos após o Big Bang</text>
        <path className="orbit-pulse" d="M190 308c70-44 120-46 188-10 73 39 131 32 194-19" fill="none" stroke="#f8fafc" strokeWidth="3" strokeLinecap="round" strokeDasharray="9 12" opacity="0.75" />
      </svg>
    </figure>
  );
}

function CmbObserverPastVisual() {
  return <CosmicSimpleVisual title="Observar longe é observar o passado" labels={["observador hoje", "luz viajando", "universo jovem"]} />;
}

function CmbPlasmaVisual() {
  return <CosmicParticleVisual mode="plasma" title="Antes da recombinação: luz presa no plasma" />;
}

function CmbCoolingVisual() {
  return <CosmicSimpleVisual title="Expansão reduz temperatura e energia média" labels={["quente", "esfriando", "átomos sobrevivem"]} />;
}

function CmbRecombinationVisual() {
  return <CosmicParticleVisual mode="transparent" title="Depois da recombinação: fótons livres" />;
}

function CmbRedshiftVisual() {
  return (
    <figure className="rounded-[2rem] border border-sky-400/25 bg-[#0b1026] p-4 shadow-xl shadow-sky-950/30">
      <svg viewBox="0 0 760 320" role="img" aria-label="Comprimento de onda sendo esticado pela expansão" className="w-full">
        <rect width="760" height="320" rx="28" fill="#0b1026" />
        <path d="M90 110c30-55 60 55 90 0s60-55 90 0 60 55 90 0 60-55 90 0 60 55 90 0" fill="none" stroke="#facc15" strokeWidth="6" strokeLinecap="round" />
        <path d="M90 225c70-55 140 55 210 0s140-55 210 0 140 55 210 0" fill="none" stroke="#38bdf8" strokeWidth="6" strokeLinecap="round" />
        <text x="90" y="62" fill="#f8fafc" fontSize="22" fontWeight="900">universo jovem: luz mais energética</text>
        <text x="90" y="286" fill="#cbd5e1" fontSize="22" fontWeight="900">hoje: micro-ondas esticadas pela expansão</text>
      </svg>
    </figure>
  );
}

function CmbEvidenceVisual() {
  return <CosmicSimpleVisual title="Modelo quente e denso -> previsão -> observação da CMB" labels={["Big Bang quente", "radiação remanescente", "CMB observada"]} />;
}

function CmbMapVisual() {
  return <CmbHeroVisual />;
}

function CmbStructuresVisual() {
  return <CosmicSimpleVisual title="Pequenas flutuações crescem por gravidade" labels={["anisotropias", "regiões densas", "galáxias e filamentos"]} />;
}

function CmbTimelineVisual() {
  return <CosmicSimpleVisual title="A CMB surge cedo, mas não no instante zero" labels={["Big Bang", "380 mil anos: CMB", "hoje"]} />;
}

function CmbMissionsVisual() {
  return <CosmicSimpleVisual title="Missões espaciais mapearam a CMB" labels={["COBE", "WMAP", "Planck"]} />;
}

function CmbMeasurementsVisual() {
  return <CosmicSimpleVisual title="O mapa contém informação cosmológica" labels={["idade", "composição", "geometria"]} />;
}

function CmbSummaryVisual() {
  return <CosmicSimpleVisual title="CMB: memória térmica do universo jovem" labels={["opaco", "transparente", "micro-ondas"]} />;
}

function CosmicSimpleVisual({ title, labels }: { title: string; labels: string[] }) {
  return (
    <figure className="rounded-[2rem] border border-sky-400/25 bg-[#0b1026] p-4 shadow-xl shadow-sky-950/30">
      <svg viewBox="0 0 760 320" role="img" aria-label={title} className="w-full">
        <rect width="760" height="320" rx="28" fill="#0b1026" />
        {Array.from({ length: 42 }, (_, index) => (
          <circle key={index} cx={(index * 97) % 720 + 20} cy={(index * 53) % 280 + 20} r="1.3" fill="#e0f2fe" opacity="0.45" />
        ))}
        <path d="M120 166h520" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" strokeDasharray="10 12" />
        {labels.map((label, index) => {
          const x = 120 + index * 260;
          return (
            <g key={label}>
              <circle cx={x} cy="166" r="24" fill={index === 1 ? "#facc15" : "#8b5cf6"} stroke="#f8fafc" strokeWidth="4" />
              <text x={x} y="226" textAnchor="middle" fill="#f8fafc" fontSize="20" fontWeight="900">{label}</text>
            </g>
          );
        })}
        <text x="380" y="70" textAnchor="middle" fill="#f8fafc" fontSize="25" fontWeight="900">{title}</text>
      </svg>
    </figure>
  );
}

function CosmicParticleVisual({ mode, title }: { mode: "plasma" | "transparent"; title: string }) {
  const isPlasma = mode === "plasma";
  return (
    <figure className="rounded-[2rem] border border-sky-400/25 bg-[#0b1026] p-4 shadow-xl shadow-sky-950/30">
      <svg viewBox="0 0 760 360" role="img" aria-label={title} className="w-full">
        <rect width="760" height="360" rx="28" fill={isPlasma ? "#2a0f1f" : "#06182f"} />
        {Array.from({ length: 24 }, (_, index) => {
          const x = 80 + ((index * 73) % 600);
          const y = 72 + ((index * 47) % 210);
          return (
            <g key={index}>
              <circle cx={x} cy={y} r={index % 2 === 0 ? 8 : 11} fill={index % 2 === 0 ? "#38bdf8" : "#f43f5e"} opacity="0.9" />
              {isPlasma ? <path d={`M${x - 30} ${y + 20}l25-28 28 18-18 24 34-8`} fill="none" stroke="#facc15" strokeWidth="3" strokeLinecap="round" opacity="0.65" /> : null}
            </g>
          );
        })}
        {!isPlasma ? (
          <>
            <path d="M100 112h550M88 188h574M116 260h500" stroke="#facc15" strokeWidth="4" strokeLinecap="round" opacity="0.85" />
            <path d="M650 112l-18-10v20l18-10ZM662 188l-18-10v20l18-10ZM616 260l-18-10v20l18-10Z" fill="#facc15" />
          </>
        ) : null}
        <text x="380" y="322" textAnchor="middle" fill="#f8fafc" fontSize="22" fontWeight="900">{title}</text>
      </svg>
    </figure>
  );
}
