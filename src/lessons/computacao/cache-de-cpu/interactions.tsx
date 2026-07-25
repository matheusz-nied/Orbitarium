import { useMemo, useState } from "react";
import { Map, Rows3, TimerReset } from "lucide-react";
import type { LessonModule } from "../../../types/content";
import {
  InteractiveShell,
  MetricCard,
} from "../../../components/lesson/InteractionPrimitives";

export const interactions = {
  "locality-walkthrough": LocalityWalkthroughInteraction,
  "cache-mapping-lab": CacheMappingLabInteraction,
  "stride-pattern-demo": StridePatternDemoInteraction,
} satisfies LessonModule["interactions"];

function LocalityWalkthroughInteraction() {
  const [pattern, setPattern] = useState<"temporal" | "espacial" | "ruim">("temporal");

  const sequences = {
    temporal: [4, 4, 4, 4, 4, 4],
    espacial: [4, 5, 6, 7, 8, 9],
    ruim: [4, 40, 80, 120, 160, 200],
  } as const;

  const lineSize = 4;
  const seenLines = new Set<number>();
  let hits = 0;
  const annotated = sequences[pattern].map((address) => {
    const line = Math.floor(address / lineSize);
    const hit = seenLines.has(line);
    if (hit) hits += 1;
    seenLines.add(line);
    return { address, line, hit };
  });

  return (
    <InteractiveShell
      eyebrow="Localidade"
      title="Compare padrões de acesso"
      tone="indigo"
      icon={<TimerReset size={18} aria-hidden="true" />}
      description="Troque o padrão de acesso e observe quantos acertos acontecem assumindo linhas simples de 4 endereços."
    >
      <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="grid gap-4">
          <SegmentedControl label="Padrão" options={["temporal", "espacial", "ruim"] as const} value={pattern} onChange={setPattern} />
          <div className="grid gap-3 sm:grid-cols-2">
            <MetricCard label="Acessos" value={String(annotated.length)} />
            <MetricCard label="Hits" value={String(hits)} />
            <MetricCard label="Misses" value={String(annotated.length - hits)} />
            <MetricCard label="Linhas vistas" value={String(seenLines.size)} />
          </div>
          <div className="rounded-3xl border border-indigo-200 bg-white p-4 text-sm leading-6 text-slate-600">
            {pattern === "temporal" && "Aqui você reutiliza exatamente o mesmo dado. A primeira leitura traz a linha; as demais se beneficiam do reuso imediato."}
            {pattern === "espacial" && "Aqui o programa avança pelos vizinhos. Mesmo mudando de endereço, continua reaproveitando a linha recém-trazida."}
            {pattern === "ruim" && "Aqui cada salto cai em uma linha distante. O cache quase não recebe ajuda do padrão de acesso."}
          </div>
        </div>
        <div className="rounded-3xl border border-indigo-100 bg-white p-5">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-indigo-700">Acessos anotados</p>
          <div className="mt-4 grid gap-2">
            {annotated.map((entry, index) => (
              <div
                className={`grid grid-cols-[0.6fr_0.6fr_1fr] rounded-2xl px-4 py-3 text-sm font-black ${
                  entry.hit ? "bg-emerald-50 text-emerald-900" : "bg-amber-50 text-amber-900"
                }`}
                key={`${entry.address}-${index}`}
              >
                <span>end {entry.address}</span>
                <span>linha {entry.line}</span>
                <span>{entry.hit ? "hit" : "miss"}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </InteractiveShell>
  );
}

function CacheMappingLabInteraction() {
  const [address, setAddress] = useState(26);
  const [sets, setSets] = useState(4);
  const [lineSize, setLineSize] = useState(4);

  const blockNumber = Math.floor(address / lineSize);
  const setIndex = blockNumber % sets;
  const tag = Math.floor(blockNumber / sets);
  const offset = address % lineSize;

  return (
    <InteractiveShell
      eyebrow="Mapeamento"
      title="Desmonte um endereço em bloco, conjunto e offset"
      tone="emerald"
      icon={<Map size={18} aria-hidden="true" />}
      description="Use um modelo simplificado de cache por conjuntos. O objetivo é ver como o endereço decide rapidamente onde procurar."
    >
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-4">
          <RangeField label="Endereço" value={address} min={0} max={127} step={1} onChange={setAddress} />
          <RangeField label="Número de conjuntos" value={sets} min={2} max={8} step={1} onChange={setSets} />
          <RangeField label="Tamanho da linha" value={lineSize} min={2} max={8} step={1} onChange={setLineSize} />
        </div>
        <div className="grid gap-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <MetricCard label="Bloco" value={String(blockNumber)} />
            <MetricCard label="Conjunto" value={String(setIndex)} />
            <MetricCard label="Tag" value={String(tag)} />
            <MetricCard label="Offset" value={String(offset)} />
          </div>
          <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-4 text-sm leading-6 text-emerald-950">
            Primeiro o endereço identifica em qual <strong>bloco</strong> ele cai. Depois o bloco aponta para um <strong>conjunto</strong> candidato. A <strong>tag</strong> verifica se o bloco que está ali é mesmo o procurado.
          </div>
        </div>
      </div>
    </InteractiveShell>
  );
}

function StridePatternDemoInteraction() {
  const [stride, setStride] = useState(1);
  const accesses = Array.from({ length: 10 }, (_, index) => index * stride);
  const uniqueLines = new Set(accesses.map((address) => Math.floor(address / 4)));
  const reuseScore = Math.max(0, 10 - uniqueLines.size);

  return (
    <InteractiveShell
      eyebrow="Padrão de acesso"
      title="Aumente o stride e veja a localidade se degradar"
      tone="rose"
      icon={<Rows3 size={18} aria-hidden="true" />}
      description="Assuma uma linha simples com 4 elementos contíguos. Quanto maior o salto entre acessos, menor o reaproveitamento potencial."
    >
      <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="grid gap-4">
          <RangeField label="Stride" value={stride} min={1} max={8} step={1} onChange={setStride} />
          <div className="grid gap-3 sm:grid-cols-2">
            <MetricCard label="Acessos" value={accesses.join(", ")} />
            <MetricCard label="Linhas distintas" value={String(uniqueLines.size)} />
            <MetricCard label="Reuso potencial" value={String(reuseScore)} />
            <MetricCard label="Leitura" value={stride === 1 ? "alta localidade" : stride <= 3 ? "média" : "baixa"} />
          </div>
        </div>
        <div className="rounded-3xl border border-rose-100 bg-white p-5">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-rose-700">Trajetória</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {accesses.map((address) => (
              <span className="rounded-2xl bg-rose-50 px-3 py-2 text-sm font-black text-rose-900" key={address}>
                {address}
              </span>
            ))}
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            Strides pequenos fazem vários acessos caírem na mesma linha de cache. Strides grandes espalham o percurso e desperdiçam vizinhança útil.
          </p>
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
