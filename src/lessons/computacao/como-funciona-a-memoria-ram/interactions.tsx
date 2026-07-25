import { useMemo, useState } from "react";
import { DatabaseZap, Layers2, Waves } from "lucide-react";
import type { LessonModule } from "../../../types/content";
import {
  InteractiveShell,
  MetricCard,
} from "../../../components/lesson/InteractionPrimitives";

export const interactions = {
  "dram-row-buffer-lab": DramRowBufferLabInteraction,
  "refresh-burst-simulator": RefreshBurstSimulatorInteraction,
  "memory-hierarchy-chooser": MemoryHierarchyChooserInteraction,
} satisfies LessonModule["interactions"];

function DramRowBufferLabInteraction() {
  const [accesses, setAccesses] = useState([2, 2, 2, 5]);
  const rowBufferHits = accesses.slice(1).filter((row, index) => row === accesses[index]).length;

  return (
    <InteractiveShell
      eyebrow="Row buffer"
      title="Simule acessos a linhas da DRAM"
      tone="indigo"
      icon={<Layers2 size={18} aria-hidden="true" />}
      description="Escolha a linha acessada em quatro operações. Repetir a mesma row ajuda a aproveitar o contexto já aberto no banco."
    >
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-4">
          {accesses.map((value, index) => (
            <RangeField
              key={index}
              label={`Acesso ${index + 1}: row`}
              value={value}
              min={0}
              max={7}
              step={1}
              onChange={(next) =>
                setAccesses((previous) => previous.map((item, itemIndex) => (itemIndex === index ? next : item)))
              }
            />
          ))}
          <div className="grid gap-3 sm:grid-cols-2">
            <MetricCard label="Rows distintas" value={String(new Set(accesses).size)} />
            <MetricCard label="Row-buffer hits" value={String(rowBufferHits)} />
          </div>
        </div>
        <div className="rounded-3xl border border-indigo-100 bg-white p-5">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-indigo-700">Leitura do padrão</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {accesses.map((row, index) => (
              <span className="rounded-2xl bg-indigo-50 px-3 py-2 text-sm font-black text-indigo-900" key={`${row}-${index}`}>
                row {row}
              </span>
            ))}
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            Quanto mais acessos consecutivos à mesma row, maior a chance de aproveitar a linha aberta. Mudar de row repetidamente força mais reconfiguração interna.
          </p>
        </div>
      </div>
    </InteractiveShell>
  );
}

function RefreshBurstSimulatorInteraction() {
  const [charge, setCharge] = useState(70);
  const [refreshEvery, setRefreshEvery] = useState(3);

  const timeline = useMemo(() => {
    const values: number[] = [];
    let current = charge;
    for (let tick = 1; tick <= 8; tick++) {
      current = Math.max(0, current - 12);
      if (tick % refreshEvery === 0) {
        current = 100;
      }
      values.push(current);
    }
    return values;
  }, [charge, refreshEvery]);

  return (
    <InteractiveShell
      eyebrow="Refresh"
      title="Veja a carga cair e ser restaurada"
      tone="emerald"
      icon={<Waves size={18} aria-hidden="true" />}
      description="Este modelo é simplificado, mas ilustra a ideia central: a célula perde carga com o tempo e precisa ser reenergizada periodicamente."
    >
      <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="grid gap-4">
          <RangeField label="Carga inicial (%)" value={charge} min={20} max={100} step={10} onChange={setCharge} />
          <RangeField label="Refresh a cada N ticks" value={refreshEvery} min={1} max={4} step={1} onChange={setRefreshEvery} />
          <div className="grid gap-3 sm:grid-cols-2">
            <MetricCard label="Pico de carga" value="100%" />
            <MetricCard label="Último tick" value={`${timeline[timeline.length - 1]}%`} />
          </div>
        </div>
        <div className="rounded-3xl border border-emerald-100 bg-white p-5">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">Evolução simplificada</p>
          <div className="mt-4 grid gap-2">
            {timeline.map((value, index) => (
              <div className="flex items-center gap-3" key={index}>
                <span className="w-16 text-sm font-black text-slate-600">tick {index + 1}</span>
                <div className="h-4 flex-1 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-emerald-500" style={{ width: `${value}%` }} />
                </div>
                <span className="w-14 text-right text-sm font-black text-emerald-700">{value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </InteractiveShell>
  );
}

function MemoryHierarchyChooserInteraction() {
  const scenarios = [
    {
      title: "Somar dois registradores",
      best: "registradores",
      why: "O dado já está no nível mais próximo do datapath.",
    },
    {
      title: "Ler página ativa de um processo",
      best: "ram",
      why: "O estado principal do processo precisa estar na memória principal para ser usado pelo sistema.",
    },
    {
      title: "Abrir arquivo salvo ontem",
      best: "ssd",
      why: "Persistência de longo prazo pertence ao armazenamento, não à RAM.",
    },
    {
      title: "Reusar dado acessado agora há pouco",
      best: "cache",
      why: "É exatamente o caso em que o cache tenta evitar nova ida à RAM.",
    },
  ] as const;

  const [selected, setSelected] = useState<(typeof scenarios)[number]["title"]>(scenarios[0].title);
  const current = scenarios.find((scenario) => scenario.title === selected) ?? scenarios[0];

  return (
    <InteractiveShell
      eyebrow="Hierarquia"
      title="Escolha a camada mais adequada para cada situação"
      tone="amber"
      icon={<DatabaseZap size={18} aria-hidden="true" />}
      description="A ideia aqui não é decorar nomes, mas entender qual camada resolve qual problema: latência extrema, estado ativo ou persistência."
    >
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-3">
          {scenarios.map((scenario) => (
            <button
              className={`rounded-2xl border px-4 py-3 text-left transition ${
                scenario.title === selected
                  ? "border-amber-600 bg-amber-600 text-white"
                  : "border-amber-100 bg-white text-slate-700 hover:border-amber-300"
              }`}
              key={scenario.title}
              type="button"
              onClick={() => setSelected(scenario.title)}
            >
              <span className="block text-sm font-black">{scenario.title}</span>
            </button>
          ))}
        </div>
        <div className="grid gap-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <MetricCard label="Camada ideal" value={current.best} />
            <MetricCard label="Foco" value={current.best === "ssd" ? "persistência" : current.best === "ram" ? "estado ativo" : "latência"} />
          </div>
          <div className="rounded-3xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
            {current.why}
          </div>
        </div>
      </div>
    </InteractiveShell>
  );
}

function RangeField({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="grid gap-2 text-sm font-black text-slate-700">
      <span className="flex items-center justify-between gap-3">
        {label}
        <span className="font-mono text-slate-950">{value}</span>
      </span>
      <input
        className="w-full accent-slate-950"
        max={max}
        min={min}
        step={step}
        type="range"
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}
