import { motion } from "motion/react";
import { ArrowRight, ChevronLeft, Home, List } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { InfoBox } from "../components/lesson/InfoBox";
import { LessonInteraction } from "../components/lesson/LessonInteraction";
import { LessonVisual } from "../components/lesson/LessonVisual";
import { ReadingProgress } from "../components/ReadingProgress";
import { getCategoryById, getLessonModuleById } from "../data/content";
import type { LessonModule, LessonSection } from "../types/content";

export function LessonPage() {
  const { contentId } = useParams();
  const lessonModule = contentId ? getLessonModuleById(contentId) : undefined;
  const content = lessonModule?.content;
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);

  useEffect(() => {
    setActiveSectionIndex(0);
    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "auto" });
    });
  }, [content?.id]);

  const moveToSection = (sectionIndex: number) => {
    if (!content) {
      return;
    }

    const nextIndex = Math.min(Math.max(sectionIndex, 0), content.sections.length - 1);
    setActiveSectionIndex(nextIndex);
    window.requestAnimationFrame(() => {
      document.getElementById("lesson-stage")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  if (!content) {
    return (
      <section className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-slate-500">
          Aula não encontrada
        </p>
        <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-slate-950">
          Esse conteúdo ainda não está disponível.
        </h1>
        <Link
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-bold text-white"
          to="/"
        >
          <Home size={17} aria-hidden="true" />
          Voltar para início
        </Link>
      </section>
    );
  }

  const primaryCategory = getCategoryById(content.primaryCategoryId);
  const secondaryCategory = content.secondaryCategoryId
    ? getCategoryById(content.secondaryCategoryId)
    : undefined;
  const activeSection = content.sections[activeSectionIndex] ?? content.sections[0];
  const previousSection = content.sections[activeSectionIndex - 1];
  const nextSection = content.sections[activeSectionIndex + 1];
  const progressPercentage = ((activeSectionIndex + 1) / content.sections.length) * 100;
  const isCosmic = content.theme?.variant === "cosmic";

  return (
    <>
      <ReadingProgress />
      <article className={isCosmic ? "bg-[#050816] text-slate-100" : ""} id="top">
        <header className="relative isolate overflow-hidden px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div
            className={
              isCosmic
                ? "absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_20%,rgba(56,189,248,0.2)_0,transparent_32%),radial-gradient(circle_at_82%_18%,rgba(139,92,246,0.22)_0,transparent_30%),linear-gradient(135deg,#050816,#0b1026)]"
                : "absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_20%,#dbeafe_0,transparent_32%),radial-gradient(circle_at_82%_18%,#ffedd5_0,transparent_30%),linear-gradient(135deg,#fafaf9,#f8fafc)]"
            }
          />
          <div className="mx-auto max-w-7xl">
            <Link
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold shadow-sm transition ${
                isCosmic
                  ? "border-sky-400/25 bg-white/10 text-slate-100 hover:bg-white/15"
                  : "border-slate-200 bg-white/80 text-slate-700 hover:text-slate-950"
              }`}
              to="/"
            >
              <ChevronLeft size={16} aria-hidden="true" />
              Voltar para início
            </Link>

            <div className="mt-9 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <div>
                <div className="flex flex-wrap gap-2">
                  {primaryCategory ? (
                    <span
                      className="rounded-full px-3 py-1 text-xs font-bold"
                      style={{
                        backgroundColor: primaryCategory.softAccent,
                        color: primaryCategory.accent,
                      }}
                    >
                      {primaryCategory.name}
                    </span>
                  ) : null}
                  {secondaryCategory ? (
                    <span
                      className="rounded-full px-3 py-1 text-xs font-bold"
                      style={{
                        backgroundColor: secondaryCategory.softAccent,
                        color: secondaryCategory.accent,
                      }}
                    >
                      {secondaryCategory.name}
                    </span>
                  ) : null}
                </div>

                <h1
                  className={`mt-6 font-display text-5xl font-semibold tracking-[-0.045em] sm:text-6xl ${
                    isCosmic ? "text-slate-50" : "text-slate-950"
                  }`}
                >
                  {content.title}
                </h1>
                <p className={`mt-6 max-w-3xl text-lg leading-8 ${isCosmic ? "text-slate-300" : "text-slate-600"}`}>
                  {content.subtitle}
                </p>
                {content.openingText ? (
                  <p className={`mt-5 max-w-3xl leading-8 ${isCosmic ? "text-slate-300" : "text-slate-600"}`}>
                    {content.openingText}
                  </p>
                ) : null}
                <div className={`mt-7 flex flex-wrap gap-3 text-sm font-bold ${isCosmic ? "text-slate-200" : "text-slate-600"}`}>
                  <span className={`rounded-full border px-4 py-2 ${isCosmic ? "border-sky-400/25 bg-white/10" : "border-slate-200 bg-white"}`}>
                    Nível: {content.level}
                  </span>
                  <span className={`rounded-full border px-4 py-2 ${isCosmic ? "border-sky-400/25 bg-white/10" : "border-slate-200 bg-white"}`}>
                    Tempo: {content.estimatedTime}
                  </span>
                  <span className={`rounded-full border px-4 py-2 ${isCosmic ? "border-sky-400/25 bg-white/10" : "border-slate-200 bg-white"}`}>
                    Aula completa: {content.sections.length} seções
                  </span>
                </div>
              </div>

              <div className={`rounded-[2.25rem] border p-5 shadow-2xl ${
                isCosmic
                  ? "border-sky-400/20 bg-white/8 shadow-sky-950/30"
                  : "border-slate-200 bg-white shadow-slate-900/10"
              }`}>
                <LessonVisual visualId={content.heroVisual} visuals={lessonModule.visuals} />
              </div>
            </div>

            {content.quickFacts ? (
              <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {content.quickFacts.map((fact) => (
                  <article
                    className={`rounded-[1.5rem] border p-5 ${
                      isCosmic
                        ? "border-sky-400/20 bg-white/8 text-slate-100"
                        : "border-slate-200 bg-white text-slate-950"
                    }`}
                    key={fact.title}
                  >
                    <h2 className="font-display text-xl font-semibold tracking-tight">{fact.title}</h2>
                    <p className={`mt-3 text-sm leading-6 ${isCosmic ? "text-slate-300" : "text-slate-600"}`}>
                      {fact.body}
                    </p>
                  </article>
                ))}
              </div>
            ) : null}

            <div className="mt-10 grid gap-5 lg:grid-cols-2">
              <StudyList
                isCosmic={isCosmic}
                items={content.learningObjectives}
                title="Objetivos de aprendizagem"
              />
              <StudyList
                isCosmic={isCosmic}
                items={content.prerequisites}
                title="Pré-requisitos"
              />
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8" id="lesson-stage">
          <aside className="mb-8">
            <div className={`rounded-[1.75rem] border p-5 shadow-xl ${
              isCosmic
                ? "border-sky-400/20 bg-[#111827] shadow-sky-950/20"
                : "border-slate-200 bg-white shadow-slate-900/5"
            }`}>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className={`flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] ${isCosmic ? "text-sky-300" : "text-slate-500"}`}>
                    <List size={16} aria-hidden="true" />
                    Seção atual
                  </div>
                  <h2 className={`mt-2 font-display text-2xl font-semibold tracking-tight ${isCosmic ? "text-slate-50" : "text-slate-950"}`}>
                    {activeSection.title}
                  </h2>
                </div>
                <span className={`rounded-full px-4 py-2 font-mono text-sm font-black ${isCosmic ? "bg-sky-400 text-slate-950" : "bg-slate-950 text-white"}`}>
                  {String(activeSectionIndex + 1).padStart(2, "0")} /{" "}
                  {String(content.sections.length).padStart(2, "0")}
                </span>
              </div>
              <div className={`mt-5 h-2 overflow-hidden rounded-full ${isCosmic ? "bg-white/10" : "bg-slate-100"}`} aria-hidden="true">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-600 via-orange-500 to-emerald-500 transition-[width] duration-300"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <p className={`mt-3 text-sm font-semibold ${isCosmic ? "text-slate-400" : "text-slate-500"}`}>
                Use os botões no final da seção para avançar ou voltar. Apenas uma seção fica
                aberta por vez.
              </p>
              <details className="mt-4">
                <summary className={`cursor-pointer rounded-2xl px-4 py-3 text-sm font-black transition ${
                  isCosmic ? "bg-white/8 text-sky-200 hover:bg-white/12" : "bg-slate-50 text-slate-700 hover:bg-slate-100"
                }`}>
                  Abrir mapa da aula
                </summary>
                <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                  {content.sections.map((section, index) => (
                    <button
                      className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold transition ${
                        index === activeSectionIndex
                          ? isCosmic
                            ? "bg-sky-400 text-slate-950"
                            : "bg-slate-950 text-white"
                          : isCosmic
                            ? "bg-white/8 text-slate-300 hover:bg-white/12"
                            : "bg-white text-slate-600 hover:bg-slate-50"
                      }`}
                      key={section.id}
                      type="button"
                      onClick={() => moveToSection(index)}
                    >
                      <span className="mr-2 font-mono opacity-70">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {section.title}
                    </button>
                  ))}
                </div>
              </details>
            </div>
          </aside>

          <div className="grid gap-10">
            <LessonSectionView
              content={content}
              index={activeSectionIndex}
              key={activeSection.id}
              lessonModule={lessonModule}
              section={activeSection}
              totalSections={content.sections.length}
              previousSection={previousSection}
              nextSection={nextSection}
              onNext={() => moveToSection(activeSectionIndex + 1)}
              onPrevious={() => moveToSection(activeSectionIndex - 1)}
              isCosmic={isCosmic}
            />
          </div>
        </div>

        <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
          <div
            className={`rounded-[2rem] border p-6 shadow-xl sm:p-8 ${
              isCosmic
                ? "border-sky-400/20 bg-[#0b1026] shadow-sky-950/20"
                : "border-slate-200 bg-white shadow-slate-900/5"
            }`}
          >
            <p
              className={`text-sm font-black uppercase tracking-[0.22em] ${
                isCosmic ? "text-sky-300" : "text-blue-700"
              }`}
            >
              Fontes
            </p>
            <h2
              className={`mt-3 font-display text-3xl font-semibold tracking-tight ${
                isCosmic ? "text-slate-50" : "text-slate-950"
              }`}
            >
              Referências confiáveis
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {content.references.map((reference) => (
                <a
                  className={`rounded-[1.5rem] border p-5 transition ${
                    isCosmic
                      ? "border-sky-400/20 bg-white/8 text-slate-100 hover:bg-white/12"
                      : "border-slate-200 bg-slate-50 text-slate-950 hover:bg-white"
                  }`}
                  href={reference.url}
                  key={reference.url}
                  rel="noreferrer"
                  target="_blank"
                >
                  <span
                    className={`text-xs font-black uppercase tracking-[0.18em] ${
                      isCosmic ? "text-sky-300" : "text-slate-500"
                    }`}
                  >
                    {reference.source}
                  </span>
                  <span className="mt-2 block font-display text-xl font-semibold tracking-tight">
                    {reference.title}
                  </span>
                  {reference.note ? (
                    <span
                      className={`mt-3 block text-sm leading-6 ${
                        isCosmic ? "text-slate-300" : "text-slate-600"
                      }`}
                    >
                      {reference.note}
                    </span>
                  ) : null}
                </a>
              ))}
            </div>
          </div>
        </section>
      </article>
    </>
  );
}

interface StudyListProps {
  title: string;
  items: string[];
  isCosmic: boolean;
}

function StudyList({ title, items, isCosmic }: StudyListProps) {
  return (
    <section
      className={`rounded-[1.75rem] border p-6 ${
        isCosmic
          ? "border-sky-400/20 bg-white/8 text-slate-100"
          : "border-slate-200 bg-white text-slate-950"
      }`}
    >
      <h2 className="font-display text-2xl font-semibold tracking-tight">{title}</h2>
      <ul className={`mt-4 grid gap-3 text-sm leading-6 ${isCosmic ? "text-slate-300" : "text-slate-600"}`}>
        {items.map((item) => (
          <li className="flex gap-3" key={item}>
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-current opacity-70" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

interface LessonSectionViewProps {
  content: LessonModule["content"];
  lessonModule: LessonModule;
  section: LessonSection;
  index: number;
  totalSections: number;
  previousSection?: LessonSection;
  nextSection?: LessonSection;
  onPrevious: () => void;
  onNext: () => void;
  isCosmic: boolean;
}

function LessonSectionView({
  content,
  lessonModule,
  section,
  index,
  totalSections,
  previousSection,
  nextSection,
  onPrevious,
  onNext,
  isCosmic,
}: LessonSectionViewProps) {
  return (
    <motion.section
      className={`scroll-mt-28 rounded-[2.25rem] border p-6 shadow-xl sm:p-8 lg:p-10 ${
        isCosmic
          ? "border-sky-400/20 bg-[#0b1026] text-slate-100 shadow-sky-950/30"
          : "border-slate-200 bg-white shadow-slate-900/5"
      }`}
      id={section.id}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      viewport={{ once: true, amount: 0.18 }}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className={`text-sm font-black uppercase tracking-[0.22em] ${isCosmic ? "text-sky-300" : "text-blue-700"}`}>
          {section.eyebrow}
        </p>
        <span className={`rounded-full px-3 py-1 font-mono text-xs font-bold ${isCosmic ? "bg-white/10 text-slate-300" : "bg-slate-100 text-slate-500"}`}>
          {String(index + 1).padStart(2, "0")} / {String(totalSections).padStart(2, "0")}
        </span>
      </div>

      <h2 className={`mt-4 font-display text-4xl font-semibold tracking-[-0.035em] ${isCosmic ? "text-slate-50" : "text-slate-950"}`}>
        {section.title}
      </h2>
      <p className={`mt-5 text-xl leading-8 ${isCosmic ? "text-slate-300" : "text-slate-600"}`}>{section.lead}</p>

      {section.visual ? (
        <div className="mt-8">
          <LessonVisual visualId={section.visual} visuals={lessonModule.visuals} />
        </div>
      ) : null}

      <div className={`mt-8 grid gap-5 text-lg leading-8 ${isCosmic ? "text-slate-300" : "text-slate-700"}`}>
        {section.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      {section.blocks?.length ? (
        <div className="mt-8 grid gap-4">
          {section.blocks.map((block) => (
            <InfoBox block={block} key={`${block.type}-${block.title}`} />
          ))}
        </div>
      ) : null}

      <LessonInteraction
        content={content}
        isCosmic={isCosmic}
        lessonModule={lessonModule}
        section={section}
      />

      <div className={`mt-10 flex flex-col justify-between gap-3 border-t pt-6 sm:flex-row ${isCosmic ? "border-white/10" : "border-slate-100"}`}>
        {previousSection ? (
          <button
            className={`inline-flex items-center justify-center rounded-full border px-5 py-3 text-sm font-bold transition ${
              isCosmic
                ? "border-sky-400/25 text-slate-200 hover:bg-white/10"
                : "border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50"
            }`}
            type="button"
            onClick={onPrevious}
          >
            Seção anterior
          </button>
        ) : (
          <a
            className={`inline-flex items-center justify-center rounded-full border px-5 py-3 text-sm font-bold transition ${
              isCosmic
                ? "border-sky-400/25 text-slate-200 hover:bg-white/10"
                : "border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50"
            }`}
            href="#top"
          >
            Voltar ao topo
          </a>
        )}

        {nextSection ? (
          <button
            className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition ${
              isCosmic ? "bg-sky-400 text-slate-950 hover:bg-sky-300" : "bg-slate-950 text-white hover:bg-slate-800"
            }`}
            type="button"
            onClick={onNext}
          >
            Próxima seção
            <ArrowRight size={16} aria-hidden="true" />
          </button>
        ) : (
          <a
            className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition ${
              isCosmic ? "bg-sky-400 text-slate-950 hover:bg-sky-300" : "bg-slate-950 text-white hover:bg-slate-800"
            }`}
            href="#top"
          >
            Voltar ao topo
            <ArrowRight size={16} aria-hidden="true" />
          </a>
        )}
      </div>
    </motion.section>
  );
}
