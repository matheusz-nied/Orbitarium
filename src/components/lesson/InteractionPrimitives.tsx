import type { ReactNode } from "react";

export type InteractionTone = "indigo" | "violet" | "teal" | "amber" | "rose" | "emerald";

const toneStyles: Record<
  InteractionTone,
  { border: string; bg: string; text: string; shadow: string }
> = {
  indigo: {
    border: "border-indigo-200",
    bg: "bg-indigo-50",
    text: "text-indigo-700",
    shadow: "shadow-indigo-900/5",
  },
  violet: {
    border: "border-violet-200",
    bg: "bg-violet-50",
    text: "text-violet-700",
    shadow: "shadow-violet-900/5",
  },
  teal: {
    border: "border-teal-200",
    bg: "bg-teal-50",
    text: "text-teal-700",
    shadow: "shadow-teal-900/5",
  },
  amber: {
    border: "border-amber-200",
    bg: "bg-amber-50",
    text: "text-amber-700",
    shadow: "shadow-amber-900/5",
  },
  rose: {
    border: "border-rose-200",
    bg: "bg-rose-50",
    text: "text-rose-700",
    shadow: "shadow-rose-900/5",
  },
  emerald: {
    border: "border-emerald-200",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    shadow: "shadow-emerald-900/5",
  },
};

export function InteractiveShell({
  eyebrow,
  title,
  description,
  tone,
  icon,
  children,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  tone: InteractionTone;
  icon: ReactNode;
  children: ReactNode;
}) {
  const style = toneStyles[tone];
  return (
    <section
      className={`rounded-[2rem] border ${style.border} ${style.bg} p-5 shadow-xl ${style.shadow}`}
    >
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <span
            className={`grid size-11 shrink-0 place-items-center rounded-2xl bg-white ${style.text}`}
          >
            {icon}
          </span>
          <div>
            <p
              className={`text-xs font-black uppercase tracking-[0.18em] ${style.text}`}
            >
              {eyebrow}
            </p>
            <h3 className="mt-1 font-display text-2xl font-semibold tracking-tight text-slate-950">
              {title}
            </h3>
            {description ? (
              <p className="mt-2 max-w-3xl leading-7 text-slate-600">
                {description}
              </p>
            ) : null}
          </div>
        </div>
      </div>
      {children}
    </section>
  );
}

export function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white px-4 py-3">
      <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">
        {label}
      </p>
      <p className="mt-1 font-display text-xl font-semibold tracking-tight text-slate-950">
        {value}
      </p>
    </div>
  );
}
