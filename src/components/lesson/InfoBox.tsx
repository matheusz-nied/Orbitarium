import { AlertCircle, BookOpen, ChevronDown, Lightbulb, Sparkles } from "lucide-react";
import { useState } from "react";
import type { LessonBlock } from "../../types/content";

interface InfoBoxProps {
  block: LessonBlock;
}

const toneStyles = {
  definition: {
    label: "Definição",
    className: "border-blue-200 bg-blue-50 text-blue-950",
    iconClassName: "bg-blue-600 text-white",
    Icon: BookOpen,
  },
  example: {
    label: "Exemplo",
    className: "border-emerald-200 bg-emerald-50 text-emerald-950",
    iconClassName: "bg-emerald-600 text-white",
    Icon: Sparkles,
  },
  insight: {
    label: "Insight",
    className: "border-violet-200 bg-violet-50 text-violet-950",
    iconClassName: "bg-violet-600 text-white",
    Icon: Lightbulb,
  },
  mistake: {
    label: "Erro comum",
    className: "border-rose-200 bg-rose-50 text-rose-950",
    iconClassName: "bg-rose-600 text-white",
    Icon: AlertCircle,
  },
  formula: {
    label: "Fórmula",
    className: "border-amber-200 bg-amber-50 text-amber-950",
    iconClassName: "bg-amber-500 text-white",
    Icon: BookOpen,
  },
};

export function InfoBox({ block }: InfoBoxProps) {
  const style = toneStyles[block.type];
  const Icon = style.Icon;
  const [isOpen, setIsOpen] = useState(block.type !== "mistake");

  return (
    <aside className={`rounded-[1.75rem] border p-5 sm:p-6 ${style.className}`}>
      <div className="flex gap-4">
        <span
          className={`mt-1 grid size-10 shrink-0 place-items-center rounded-2xl ${style.iconClassName}`}
        >
          <Icon size={18} aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <button
            className="group flex w-full items-start justify-between gap-4 text-left"
            type="button"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((value) => !value)}
          >
            <span>
              <span className="block text-xs font-black uppercase tracking-[0.2em] opacity-70">
                {style.label}
              </span>
              <span className="mt-1 block font-display text-xl font-semibold tracking-tight">
                {block.title}
              </span>
            </span>
            <ChevronDown
              className={`mt-1 shrink-0 transition duration-200 ${isOpen ? "rotate-180" : ""}`}
              size={20}
              aria-hidden="true"
            />
          </button>
          {isOpen ? (
            <div className="mt-3">
              <p className="leading-7 opacity-90">{block.body}</p>
              {block.formula ? (
                <code className="mt-4 block overflow-x-auto rounded-2xl bg-white/70 px-4 py-3 font-mono text-sm text-slate-900 shadow-sm">
                  {block.formula}
                </code>
              ) : null}
              {block.items ? (
                <ul className="mt-4 grid gap-2">
                  {block.items.map((item) => (
                    <li className="flex gap-2 leading-6" key={item}>
                      <span
                        className="mt-2 size-1.5 rounded-full bg-current opacity-70"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </aside>
  );
}
