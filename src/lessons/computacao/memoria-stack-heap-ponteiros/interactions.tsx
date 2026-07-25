import { useMemo, useState } from "react";
import { Layers3, Pointer, ShieldAlert } from "lucide-react";
import type { LessonModule } from "../../../types/content";
import {
  InteractiveShell,
  MetricCard,
} from "../../../components/lesson/InteractionPrimitives";

export const interactions = {
  "stack-frame-builder": StackFrameBuilderInteraction,
  "heap-allocation-playground": HeapAllocationPlaygroundInteraction,
  "pointer-bug-lab": PointerBugLabInteraction,
} satisfies LessonModule["interactions"];

function StackFrameBuilderInteraction() {
  const [depth, setDepth] = useState(3);
  const functions = ["main()", "carregar()", "processar()", "salvar()", "finalizar()"];
  const activeFrames = functions.slice(0, depth);

  return (
    <InteractiveShell
      eyebrow="Stack"
      title="Empilhe chamadas e observe os frames"
      tone="violet"
      icon={<Layers3 size={18} aria-hidden="true" />}
      description="Aumente ou reduza a profundidade de chamada. Cada nova função cria contexto local e o desempilhamento ocorre na ordem inversa."
    >
      <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="grid gap-4">
          <RangeField label="Profundidade da chamada" value={depth} min={1} max={5} step={1} onChange={setDepth} />
          <div className="grid gap-3 sm:grid-cols-2">
            <MetricCard label="Frames vivos" value={String(activeFrames.length)} />
            <MetricCard label="Topo atual" value={activeFrames[activeFrames.length - 1] ?? "—"} />
          </div>
          <div className="rounded-3xl border border-violet-200 bg-white p-4 text-sm leading-6 text-slate-600">
            O frame do topo é o contexto que está executando agora. Se a função retornar, ele desaparece primeiro — e com ele suas variáveis locais.
          </div>
        </div>
        <div className="rounded-3xl border border-violet-100 bg-white p-5">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-700">Frames ativos</p>
          <div className="mt-4 flex flex-col-reverse gap-3">
            {activeFrames.map((name, index) => (
              <div className="rounded-2xl border border-violet-200 bg-violet-50 px-4 py-3" key={name}>
                <p className="text-sm font-black text-violet-900">{name}</p>
                <p className="mt-1 text-xs text-violet-700">
                  {index === activeFrames.length - 1 ? "topo da stack" : "aguardando retorno da chamada abaixo"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </InteractiveShell>
  );
}

function HeapAllocationPlaygroundInteraction() {
  const [firstAlive, setFirstAlive] = useState(true);
  const [secondAlive, setSecondAlive] = useState(true);
  const [thirdAlive, setThirdAlive] = useState(false);

  const blocks = [
    { label: "buffer A", alive: firstAlive, size: 64 },
    { label: "lista B", alive: secondAlive, size: 24 },
    { label: "cache C", alive: thirdAlive, size: 96 },
  ];
  const allocated = blocks.filter((block) => block.alive);
  const totalBytes = allocated.reduce((sum, block) => sum + block.size, 0);

  return (
    <InteractiveShell
      eyebrow="Heap"
      title="Alocar e liberar não segue uma ordem fixa"
      tone="rose"
      icon={<Pointer size={18} aria-hidden="true" />}
      description="Ative ou desative blocos para simular alocação e liberação. Note como diferentes objetos podem sobreviver por tempos distintos."
    >
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-3">
          <ToggleRow label="buffer A" active={firstAlive} onToggle={() => setFirstAlive((value) => !value)} />
          <ToggleRow label="lista B" active={secondAlive} onToggle={() => setSecondAlive((value) => !value)} />
          <ToggleRow label="cache C" active={thirdAlive} onToggle={() => setThirdAlive((value) => !value)} />
          <div className="grid gap-3 sm:grid-cols-2">
            <MetricCard label="Blocos vivos" value={String(allocated.length)} />
            <MetricCard label="Total reservado" value={`${totalBytes} bytes`} />
          </div>
        </div>
        <div className="rounded-3xl border border-rose-100 bg-white p-5">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-rose-700">Estado atual da heap</p>
          <div className="mt-4 grid gap-3">
            {blocks.map((block) => (
              <div
                className={`rounded-2xl border px-4 py-3 ${
                  block.alive
                    ? "border-rose-200 bg-rose-50 text-rose-950"
                    : "border-slate-200 bg-slate-50 text-slate-500"
                }`}
                key={block.label}
              >
                <p className="text-sm font-black">{block.label}</p>
                <p className="text-xs">{block.size} bytes · {block.alive ? "alocado" : "liberado"}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </InteractiveShell>
  );
}

function PointerBugLabInteraction() {
  const [scenario, setScenario] = useState<"valido" | "retorno-local" | "use-after-free">("valido");

  const data = useMemo(() => {
    switch (scenario) {
      case "valido":
        return {
          pointer: "p -> bloco vivo",
          status: "seguro por enquanto",
          warning:
            "O ponteiro aponta para um objeto cujo tempo de vida ainda não acabou. O endereço e o objeto continuam alinhados.",
        };
      case "retorno-local":
        return {
          pointer: "p -> variável local antiga",
          status: "dangling pointer",
          warning:
            "A função retornou e o frame foi desmontado. O ponteiro ainda existe, mas o dado local não pertence mais a esse contexto.",
        };
      case "use-after-free":
        return {
          pointer: "p -> heap liberada",
          status: "use-after-free",
          warning:
            "O bloco foi liberado e pode até ser reutilizado por outro objeto. Ler ou escrever via p é comportamento inválido.",
        };
    }
  }, [scenario]);

  return (
    <InteractiveShell
      eyebrow="Bug"
      title="Compare um ponteiro válido com dois cenários perigosos"
      tone="amber"
      icon={<ShieldAlert size={18} aria-hidden="true" />}
      description="Troque o cenário e veja como o mesmo gesto de 'usar um ponteiro' muda completamente de significado quando o tempo de vida do objeto se rompe."
    >
      <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="grid gap-3">
          <SegmentedControl
            label="Cenário"
            options={["valido", "retorno-local", "use-after-free"] as const}
            value={scenario}
            onChange={setScenario}
          />
          <div className="grid gap-3 sm:grid-cols-2">
            <MetricCard label="Ponteiro" value={data.pointer} />
            <MetricCard label="Status" value={data.status} />
          </div>
        </div>
        <div className={`rounded-3xl border p-5 ${
          scenario === "valido"
            ? "border-emerald-200 bg-emerald-50 text-emerald-950"
            : "border-amber-200 bg-amber-50 text-amber-950"
        }`}>
          <p className="text-xs font-black uppercase tracking-[0.18em]">Leitura conceitual</p>
          <p className="mt-3 text-sm leading-7">{data.warning}</p>
        </div>
      </div>
    </InteractiveShell>
  );
}

function SegmentedControl<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <div className="grid gap-2">
      <p className="text-sm font-black text-slate-700">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            className={`rounded-2xl px-4 py-2 text-sm font-black transition ${
              option === value
                ? "bg-slate-950 text-white"
                : "bg-white text-slate-700 ring-1 ring-slate-200 hover:ring-slate-400"
            }`}
            key={option}
            type="button"
            onClick={() => onChange(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
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

function ToggleRow({
  label,
  active,
  onToggle,
}: {
  label: string;
  active: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      className={`rounded-3xl border px-4 py-3 text-left transition ${
        active
          ? "border-rose-300 bg-rose-50 text-rose-950"
          : "border-slate-200 bg-white text-slate-600"
      }`}
      type="button"
      onClick={onToggle}
    >
      <span className="block text-sm font-black">{label}</span>
      <span className="text-xs">{active ? "alocado" : "liberado"}</span>
    </button>
  );
}
