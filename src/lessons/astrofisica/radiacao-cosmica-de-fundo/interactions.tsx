import { Satellite } from "lucide-react";
import { useMemo, useState } from "react";
import type {
  LessonInteractionProps,
  LessonModule,
  SummaryCard,
  TimelineEvent,
} from "../../../types/content";

export const interactions = {
  "cmb-temperature-map": TemperatureMapInteraction,
  "cmb-recombination-before-after": RecombinationInteraction,
  "cmb-cooling-slider": CoolingInteraction,
  "cmb-redshift-slider": RedshiftInteraction,
  "cmb-structure-growth": StructureGrowthInteraction,
  "cmb-timeline": CosmicTimelineInteraction,
  "cmb-mission-cards": MissionCardsInteraction,
  "cmb-measurement-map": MeasurementMapInteraction,
} satisfies LessonModule["interactions"];

const blobs = [
  { x: 22, y: 42, hot: true },
  { x: 36, y: 25, hot: false },
  { x: 48, y: 55, hot: true },
  { x: 60, y: 38, hot: false },
  { x: 72, y: 58, hot: true },
  { x: 30, y: 66, hot: false },
  { x: 82, y: 33, hot: false },
  { x: 51, y: 30, hot: true },
];

function TemperatureMapInteraction() {
  return <CMBTemperatureMapDemo />;
}

function RecombinationInteraction() {
  return <RecombinationBeforeAfter />;
}

function CoolingInteraction() {
  return <UniverseCoolingSlider />;
}

function RedshiftInteraction() {
  return <RedshiftExpansionSlider />;
}

function StructureGrowthInteraction() {
  return <StructureGrowthSlider />;
}

function CosmicTimelineInteraction({ content }: LessonInteractionProps) {
  return content.timeline ? <CosmicTimeline events={content.timeline} /> : null;
}

function MissionCardsInteraction({ content }: LessonInteractionProps) {
  return content.missionCards ? <MissionCards missions={content.missionCards} /> : null;
}

function MeasurementMapInteraction() {
  return <CosmologyMeasurementMap />;
}

function CMBTemperatureMapDemo() {
  const [contrast, setContrast] = useState(55);
  const [hovered, setHovered] = useState<(typeof blobs)[number] | null>(null);

  return (
    <section className="rounded-[2rem] border border-sky-400/25 bg-[#111827] p-5 text-slate-100 shadow-xl shadow-sky-950/30">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.2em] text-sky-300">
            Mapa interativo
          </p>
          <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight">
            Contraste das anisotropias
          </h3>
          <p className="mt-2 max-w-2xl leading-7 text-slate-300">
            Passe o mouse pelas manchas. As cores estão amplificadas para revelar variações
            minúsculas sobre um fundo quase uniforme.
          </p>
        </div>
        <label className="min-w-64 text-sm font-bold text-slate-200">
          Contraste visual: {contrast}%
          <input
            className="mt-2 w-full accent-sky-400"
            type="range"
            min="0"
            max="100"
            value={contrast}
            onChange={(event) => setContrast(Number(event.target.value))}
          />
        </label>
      </div>

      <div className="relative mt-5 overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#050816] p-4">
        <svg viewBox="0 0 760 340" role="img" aria-label="Mapa estilizado da temperatura da CMB" className="w-full">
          <rect width="760" height="340" rx="28" fill="#0b1026" />
          <ellipse cx="380" cy="170" rx="300" ry="130" fill="#1e3a8a" opacity="0.45" />
          {blobs.map((blob, index) => (
            <ellipse
              key={index}
              cx={(blob.x / 100) * 760}
              cy={(blob.y / 100) * 340}
              rx={34 + (index % 3) * 15}
              ry={17 + (index % 4) * 8}
              fill={blob.hot ? "#f43f5e" : "#38bdf8"}
              opacity={0.1 + contrast / 110}
              transform={`rotate(${index * 31} ${(blob.x / 100) * 760} ${(blob.y / 100) * 340})`}
              onMouseEnter={() => setHovered(blob)}
              onMouseLeave={() => setHovered(null)}
            />
          ))}
          <text x="380" y="312" textAnchor="middle" fill="#cbd5e1" fontSize="18" fontWeight="800">
            fundo quase uniforme com pequenas anisotropias realçadas
          </text>
        </svg>
        <div className="mt-3 rounded-2xl bg-white/8 px-4 py-3 text-sm font-bold text-slate-200">
          {hovered
            ? hovered.hot
              ? "Região ligeiramente mais quente. A diferença real é pequena; a cor foi amplificada."
              : "Região ligeiramente mais fria. A diferença real é pequena; a cor foi amplificada."
            : "As cores do mapa são exageradas visualmente para tornar as anisotropias visíveis."}
        </div>
      </div>
    </section>
  );
}

function RecombinationBeforeAfter() {
  const [after, setAfter] = useState(false);

  return (
    <section className="rounded-[2rem] border border-violet-400/25 bg-[#111827] p-5 text-slate-100 shadow-xl shadow-violet-950/30">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.2em] text-violet-300">
            Antes / Depois
          </p>
          <h3 className="mt-2 font-display text-2xl font-semibold">
            {after ? "Depois: universo transparente" : "Antes: universo opaco"}
          </h3>
        </div>
        <button
          className="rounded-full bg-sky-400 px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-sky-300"
          type="button"
          onClick={() => setAfter((value) => !value)}
        >
          Mostrar {after ? "antes" : "depois"}
        </button>
      </div>

      <svg viewBox="0 0 760 330" role="img" aria-label="Antes e depois da recombinação" className="mt-5 w-full rounded-[1.5rem] bg-[#050816]">
        <rect width="760" height="330" rx="28" fill={after ? "#06182f" : "#2a0f1f"} />
        {Array.from({ length: after ? 12 : 28 }, (_, index) => {
          const x = 70 + ((index * 79) % 620);
          const y = 54 + ((index * 53) % 210);
          return (
            <g key={index}>
              <circle cx={x} cy={y} r="10" fill={index % 2 === 0 ? "#38bdf8" : "#f43f5e"} opacity="0.85" />
              {!after ? (
                <path d={`M${x - 24} ${y + 18}l24-22 25 17-21 21`} fill="none" stroke="#facc15" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
              ) : null}
            </g>
          );
        })}
        {after ? (
          <>
            <path d="M94 92h560M114 166h530M82 242h590" stroke="#facc15" strokeWidth="4" strokeLinecap="round" />
            <path d="M654 92l-16-9v18l16-9ZM644 166l-16-9v18l16-9ZM672 242l-16-9v18l16-9Z" fill="#facc15" />
          </>
        ) : null}
      </svg>

      <p className="mt-4 rounded-2xl bg-white/8 px-4 py-3 leading-7 text-slate-300">
        {after
          ? "Átomos neutros reduzem o espalhamento. Fótons passam a viajar quase livremente: nasce a luz observável da CMB."
          : "Elétrons livres espalham fótons repetidamente. A luz existe, mas fica presa no plasma opaco."}
      </p>
    </section>
  );
}

function UniverseCoolingSlider() {
  const [temperature, setTemperature] = useState(82);
  const state = temperature > 65 ? "plasma quente" : temperature > 35 ? "combinações temporárias" : "átomos neutros sobrevivem";

  return (
    <CosmicSliderShell
      title="Temperatura do universo"
      label={`${temperature}% - ${state}`}
      value={temperature}
      onChange={setTemperature}
      caption="Ao esfriar, os fótons ficam menos energéticos e átomos neutros conseguem sobreviver."
    />
  );
}

function RedshiftExpansionSlider() {
  const [expansion, setExpansion] = useState(70);
  return (
    <CosmicSliderShell
      title="Expansão e redshift"
      label={`expansão: ${expansion}%`}
      value={expansion}
      onChange={setExpansion}
      caption="Quanto maior a expansão acumulada, maior o comprimento de onda observado hoje."
    />
  );
}

function StructureGrowthSlider() {
  const [time, setTime] = useState(28);
  return (
    <CosmicSliderShell
      title="Crescimento das estruturas"
      label={`tempo cósmico: ${time}%`}
      value={time}
      onChange={setTime}
      caption="Flutuações pequenas crescem por gravidade até formar galáxias, aglomerados e filamentos."
    />
  );
}

function CosmicSliderShell({
  title,
  label,
  value,
  caption,
  onChange,
}: {
  title: string;
  label: string;
  value: number;
  caption: string;
  onChange: (value: number) => void;
}) {
  const dots = useMemo(() => Array.from({ length: 18 }, (_, index) => index), []);
  return (
    <section className="rounded-[2rem] border border-sky-400/25 bg-[#111827] p-5 text-slate-100 shadow-xl shadow-sky-950/30">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.2em] text-sky-300">Slider</p>
          <h3 className="mt-2 font-display text-2xl font-semibold">{title}</h3>
          <p className="mt-2 leading-7 text-slate-300">{caption}</p>
        </div>
        <label className="min-w-64 text-sm font-bold text-slate-200">
          {label}
          <input
            className="mt-2 w-full accent-sky-400"
            type="range"
            min="0"
            max="100"
            value={value}
            onChange={(event) => onChange(Number(event.target.value))}
          />
        </label>
      </div>
      <div className="relative mt-5 h-56 overflow-hidden rounded-[1.5rem] bg-[#050816]">
        {dots.map((dot) => (
          <span
            key={dot}
            className="absolute rounded-full bg-sky-300"
            style={{
              left: `${8 + ((dot * 17) % 84)}%`,
              top: `${12 + ((dot * 29) % 72)}%`,
              width: `${8 + value / 12}px`,
              height: `${8 + value / 12}px`,
              opacity: 0.25 + value / 150,
              boxShadow: value > 55 ? "0 0 18px rgba(244,63,94,0.7)" : "0 0 12px rgba(56,189,248,0.45)",
            }}
          />
        ))}
        <div className="absolute inset-x-6 bottom-6 h-2 rounded-full bg-slate-800">
          <div className="h-full rounded-full bg-gradient-to-r from-rose-500 via-yellow-300 to-sky-400" style={{ width: `${value}%` }} />
        </div>
      </div>
    </section>
  );
}

function CosmicTimeline({ events }: { events: TimelineEvent[] }) {
  const [selectedId, setSelectedId] = useState("recombinacao");
  const selectedEvent = events.find((event) => event.id === selectedId) ?? events[0];

  return (
    <section className="rounded-[2rem] border border-sky-400/25 bg-[#111827] p-5 text-slate-100 shadow-xl shadow-sky-950/30">
      <div className="grid gap-5 lg:grid-cols-[1fr_1.1fr]">
        <div className="grid gap-2">
          {events.map((event) => (
            <button
              className={`rounded-2xl px-4 py-3 text-left transition ${
                selectedId === event.id
                  ? "bg-sky-400 text-slate-950"
                  : "bg-white/8 text-slate-200 hover:bg-white/12"
              }`}
              key={event.id}
              type="button"
              onClick={() => setSelectedId(event.id)}
            >
              <span className="block font-mono text-xs font-black opacity-75">{event.period}</span>
              <span className="mt-1 block font-bold">{event.title}</span>
            </button>
          ))}
        </div>
        <div className="rounded-[1.5rem] bg-[#050816] p-6">
          <p className="font-mono text-sm font-black uppercase tracking-[0.18em] text-yellow-300">
            {selectedEvent.period}
          </p>
          <h3 className="mt-3 font-display text-3xl font-semibold tracking-tight">
            {selectedEvent.title}
          </h3>
          <p className="mt-4 leading-7 text-slate-300">{selectedEvent.description}</p>
        </div>
      </div>
    </section>
  );
}

function MissionCards({ missions }: { missions: SummaryCard[] }) {
  return (
    <section className="grid gap-4 md:grid-cols-3">
      {missions.map((mission) => (
        <article className="rounded-[1.75rem] border border-sky-400/25 bg-[#111827] p-6 text-slate-100 shadow-xl shadow-sky-950/20" key={mission.title}>
          <Satellite className="text-sky-300" size={26} aria-hidden="true" />
          <h3 className="mt-4 font-display text-2xl font-semibold">{mission.title}</h3>
          <p className="mt-3 leading-7 text-slate-300">{mission.body}</p>
        </article>
      ))}
    </section>
  );
}

function CosmologyMeasurementMap() {
  const items = ["idade do universo", "composição", "geometria", "matéria escura", "energia escura", "sementes de galáxias"];
  return (
    <section className="rounded-[2rem] border border-violet-400/25 bg-[#111827] p-5 text-slate-100 shadow-xl shadow-violet-950/30">
      <h3 className="font-display text-2xl font-semibold">Informação extraída do padrão da CMB</h3>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div className="rounded-2xl bg-white/8 p-4 text-sm font-bold text-slate-200" key={item}>
            {item}
          </div>
        ))}
      </div>
      <p className="mt-4 leading-7 text-slate-300">
        Esses valores não aparecem escritos diretamente no mapa. Eles são inferidos por modelos físicos e análise estatística das anisotropias.
      </p>
    </section>
  );
}
