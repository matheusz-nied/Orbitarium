import { CheckCircle2, ChevronDown, XCircle } from "lucide-react";
import { useState } from "react";
import type {
  ComparisonRow,
  GlossaryTerm,
  QuizQuestion,
  SummaryCard,
  TimelineEvent,
} from "../types/content";

interface TimelineProps {
  events: TimelineEvent[];
}

export function InteractiveTimeline({ events }: TimelineProps) {
  const [selectedId, setSelectedId] = useState(events[0]?.id);
  const selectedEvent = events.find((event) => event.id === selectedId) ?? events[0];

  return (
    <section className="rounded-[2rem] border border-blue-200 bg-blue-50 p-5 shadow-xl shadow-blue-900/5">
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-2">
          {events.map((event) => (
            <button
              className={`rounded-2xl px-4 py-3 text-left transition ${
                selectedId === event.id
                  ? "bg-slate-950 text-white shadow-lg shadow-slate-900/15"
                  : "bg-white text-slate-700 hover:bg-blue-100"
              }`}
              key={event.id}
              type="button"
              onClick={() => setSelectedId(event.id)}
            >
              <span className="block font-mono text-xs font-black opacity-70">{event.period}</span>
              <span className="mt-1 block font-bold">{event.title}</span>
            </button>
          ))}
        </div>

        <div className="rounded-[1.5rem] bg-white p-6">
          <p className="font-mono text-sm font-black uppercase tracking-[0.18em] text-blue-700">
            {selectedEvent.period}
          </p>
          <h3 className="mt-3 font-display text-3xl font-semibold tracking-tight text-slate-950">
            {selectedEvent.title}
          </h3>
          <p className="mt-4 leading-7 text-slate-600">{selectedEvent.description}</p>
        </div>
      </div>
    </section>
  );
}

interface QuizProps {
  questions: QuizQuestion[];
}

export function ReviewQuiz({ questions }: QuizProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  return (
    <section className="grid gap-4">
      {questions.map((question, index) => {
        const selected = answers[question.id];
        const isCorrect = selected === question.correctOptionId;

        return (
          <article
            className="rounded-[1.75rem] border border-amber-200 bg-amber-50 p-5"
            key={question.id}
          >
            <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-700">
              Pergunta {index + 1}
            </p>
            <h3 className="mt-2 text-lg font-bold leading-7 text-slate-950">{question.prompt}</h3>
            <div className="mt-4 grid gap-2">
              {question.options.map((option) => {
                const isSelected = selected === option.id;
                return (
                  <button
                    className={`rounded-2xl border px-4 py-3 text-left text-sm font-bold transition ${
                      isSelected
                        ? "border-slate-950 bg-white text-slate-950"
                        : "border-amber-200 bg-white/70 text-slate-700 hover:bg-white"
                    }`}
                    key={option.id}
                    type="button"
                    onClick={() =>
                      setAnswers((current) => ({ ...current, [question.id]: option.id }))
                    }
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
            {selected ? (
              <div
                className={`mt-4 flex gap-3 rounded-2xl px-4 py-3 text-sm font-bold leading-6 ${
                  isCorrect ? "bg-emerald-100 text-emerald-900" : "bg-rose-100 text-rose-900"
                }`}
              >
                {isCorrect ? (
                  <CheckCircle2 className="mt-0.5 shrink-0" size={18} aria-hidden="true" />
                ) : (
                  <XCircle className="mt-0.5 shrink-0" size={18} aria-hidden="true" />
                )}
                <span>{question.feedback}</span>
              </div>
            ) : null}
          </article>
        );
      })}
    </section>
  );
}

interface GlossaryProps {
  terms: GlossaryTerm[];
}

export function GlossaryGrid({ terms }: GlossaryProps) {
  const [openTerm, setOpenTerm] = useState(terms[0]?.term);

  return (
    <section className="grid gap-3 sm:grid-cols-2">
      {terms.map((term) => {
        const isOpen = openTerm === term.term;
        return (
          <article
            className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm"
            key={term.term}
          >
            <button
              className="flex w-full items-center justify-between gap-4 text-left"
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpenTerm(isOpen ? "" : term.term)}
            >
              <span className="font-display text-xl font-semibold tracking-tight text-slate-950">
                {term.term}
              </span>
              <ChevronDown
                className={`shrink-0 text-slate-500 transition ${isOpen ? "rotate-180" : ""}`}
                size={18}
                aria-hidden="true"
              />
            </button>
            {isOpen ? <p className="mt-3 leading-7 text-slate-600">{term.definition}</p> : null}
          </article>
        );
      })}
    </section>
  );
}

interface ComparisonProps {
  rows: ComparisonRow[];
}

export function NewtonLeibnizComparison({ rows }: ComparisonProps) {
  return (
    <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl shadow-slate-900/5">
      <div className="grid grid-cols-[0.8fr_1fr_1fr] bg-slate-950 text-sm font-black uppercase tracking-[0.16em] text-white">
        <div className="p-4">Tema</div>
        <div className="p-4">Newton</div>
        <div className="p-4">Leibniz</div>
      </div>
      {rows.map((row) => (
        <div className="grid grid-cols-[0.8fr_1fr_1fr] border-t border-slate-100" key={row.topic}>
          <div className="bg-slate-50 p-4 text-sm font-black text-slate-700">{row.topic}</div>
          <div className="p-4 text-sm leading-6 text-slate-700">{row.newton}</div>
          <div className="p-4 text-sm leading-6 text-slate-700">{row.leibniz}</div>
        </div>
      ))}
    </section>
  );
}

interface SummaryCardsProps {
  cards: SummaryCard[];
}

export function SummaryCards({ cards }: SummaryCardsProps) {
  return (
    <section className="grid gap-4 sm:grid-cols-2">
      {cards.map((card) => (
        <article
          className="rounded-[1.75rem] border border-violet-200 bg-violet-50 p-6"
          key={card.title}
        >
          <h3 className="font-display text-2xl font-semibold tracking-tight text-slate-950">
            {card.title}
          </h3>
          <p className="mt-3 leading-7 text-slate-600">{card.body}</p>
        </article>
      ))}
    </section>
  );
}
