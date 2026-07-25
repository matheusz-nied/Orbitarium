import { MetricCard } from "../../components/lesson/InteractionPrimitives";

export function RangeField({
  label,
  value,
  min,
  max,
  step,
  onChange,
  hint,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  hint?: string;
}) {
  return (
    <label className="grid gap-2 text-sm font-black text-slate-700">
      <span className="flex items-center justify-between gap-3">
        <span>{label}</span>
        <span className="font-mono text-slate-950">{value}</span>
      </span>
      <input
        className="w-full accent-slate-950"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
      {hint ? <span className="text-xs font-medium leading-5 text-slate-500">{hint}</span> : null}
    </label>
  );
}

export function TogglePills({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`rounded-2xl px-4 py-2 text-sm font-black transition ${
              active
                ? "bg-slate-950 text-white shadow-lg shadow-slate-900/15"
                : "bg-white text-slate-700 ring-1 ring-slate-200 hover:ring-slate-400"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export function MetricGrid({
  metrics,
}: {
  metrics: Array<{ label: string; value: string }>;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {metrics.map((metric) => (
        <MetricCard key={metric.label} label={metric.label} value={metric.value} />
      ))}
    </div>
  );
}

export function CalloutCard({
  title,
  body,
  tone = "slate",
}: {
  title: string;
  body: string;
  tone?: "slate" | "emerald" | "amber" | "rose" | "indigo" | "violet";
}) {
  const styles = {
    slate: "border-slate-200 bg-slate-50 text-slate-700",
    emerald: "border-emerald-200 bg-emerald-50 text-emerald-700",
    amber: "border-amber-200 bg-amber-50 text-amber-700",
    rose: "border-rose-200 bg-rose-50 text-rose-700",
    indigo: "border-indigo-200 bg-indigo-50 text-indigo-700",
    violet: "border-violet-200 bg-violet-50 text-violet-700",
  } as const;

  return (
    <div className={`rounded-3xl border p-4 ${styles[tone]}`}>
      <p className="text-xs font-black uppercase tracking-[0.16em]">{title}</p>
      <p className="mt-2 text-sm leading-6 text-slate-700">{body}</p>
    </div>
  );
}

export function StepDots({
  activeIndex,
  total,
}: {
  activeIndex: number;
  total: number;
}) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }).map((_, index) => (
        <span
          key={index}
          className={`h-2.5 rounded-full transition-all ${
            index === activeIndex ? "w-8 bg-slate-950" : "w-2.5 bg-slate-300"
          }`}
        />
      ))}
    </div>
  );
}
