import { motion } from "motion/react";
import { ArrowRight, ChevronLeft, Home, List } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { InfoBox } from "../components/InfoBox";
import { LessonVisual } from "../components/LessonVisual";
import { ReadingProgress } from "../components/ReadingProgress";
import { getCategoryById, getContentById } from "../data/content";
import type { LessonSection } from "../types/content";

export function LessonPage() {
  const { contentId } = useParams();
  const content = contentId ? getContentById(contentId) : undefined;
  const [activeSection, setActiveSection] = useState<string | undefined>(
    content?.sections[0]?.id,
  );

  const sectionIds = useMemo(() => content?.sections.map((section) => section.id) ?? [], [content]);

  useEffect(() => {
    if (!sectionIds.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveSection(visible.target.id);
        }
      },
      {
        rootMargin: "-18% 0px -62% 0px",
        threshold: [0.1, 0.25, 0.5],
      },
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [sectionIds]);

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

  return (
    <>
      <ReadingProgress />
      <article id="top">
        <header className="relative isolate overflow-hidden px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_20%,#dbeafe_0,transparent_32%),radial-gradient(circle_at_82%_18%,#ffedd5_0,transparent_30%),linear-gradient(135deg,#fafaf9,#f8fafc)]" />
          <div className="mx-auto max-w-7xl">
            <Link
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-bold text-slate-700 shadow-sm transition hover:text-slate-950"
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

                <h1 className="mt-6 font-display text-5xl font-semibold tracking-[-0.045em] text-slate-950 sm:text-6xl">
                  {content.title}
                </h1>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
                  {content.subtitle}
                </p>
                <div className="mt-7 flex flex-wrap gap-3 text-sm font-bold text-slate-600">
                  <span className="rounded-full border border-slate-200 bg-white px-4 py-2">
                    Nível: {content.level}
                  </span>
                  <span className="rounded-full border border-slate-200 bg-white px-4 py-2">
                    Tempo: {content.estimatedTime}
                  </span>
                  <span className="rounded-full border border-slate-200 bg-white px-4 py-2">
                    Aula v1: 3 seções
                  </span>
                </div>
              </div>

              <div className="rounded-[2.25rem] border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-900/10">
                <LessonVisual visual="newton-motion" />
              </div>
            </div>
          </div>
        </header>

        <div className="mx-auto grid max-w-5xl gap-8 px-4 py-8 sm:px-6 lg:px-8 xl:max-w-[94rem] xl:grid-cols-[15rem_minmax(0,62rem)_15rem] xl:items-start xl:gap-8">
          <aside className="xl:sticky xl:top-24 xl:self-start">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-xl shadow-slate-900/5">
              <div className="mb-3 flex items-center gap-2 px-2 text-sm font-black uppercase tracking-[0.18em] text-slate-500">
                <List size={16} aria-hidden="true" />
                Sumário
              </div>
              <nav className="grid gap-1" aria-label="Seções da aula">
                {content.sections.map((section, index) => (
                  <a
                    className={[
                      "rounded-2xl px-4 py-3 text-sm font-bold transition",
                      activeSection === section.id
                        ? "bg-slate-950 text-white"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-950",
                    ].join(" ")}
                    href={`#${section.id}`}
                    key={section.id}
                  >
                    <span className="mr-2 font-mono opacity-60">{String(index + 1).padStart(2, "0")}</span>
                    {section.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          <div className="grid gap-10 xl:col-start-2">
            {content.sections.map((section, index) => (
              <LessonSectionView
                index={index}
                key={section.id}
                section={section}
                totalSections={content.sections.length}
                previousSection={content.sections[index - 1]}
                nextSection={content.sections[index + 1]}
              />
            ))}
          </div>

          <div className="hidden xl:block" aria-hidden="true" />
        </div>
      </article>
    </>
  );
}

interface LessonSectionViewProps {
  section: LessonSection;
  index: number;
  totalSections: number;
  previousSection?: LessonSection;
  nextSection?: LessonSection;
}

function LessonSectionView({
  section,
  index,
  totalSections,
  previousSection,
  nextSection,
}: LessonSectionViewProps) {
  return (
    <motion.section
      className="scroll-mt-28 rounded-[2.25rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-8 lg:p-10"
      id={section.id}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      viewport={{ once: true, amount: 0.18 }}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-blue-700">
          {section.eyebrow}
        </p>
        <span className="rounded-full bg-slate-100 px-3 py-1 font-mono text-xs font-bold text-slate-500">
          {String(index + 1).padStart(2, "0")} / {String(totalSections).padStart(2, "0")}
        </span>
      </div>

      <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.035em] text-slate-950">
        {section.title}
      </h2>
      <p className="mt-5 text-xl leading-8 text-slate-600">{section.lead}</p>

      {section.visual ? (
        <div className="mt-8">
          <LessonVisual visual={section.visual} />
        </div>
      ) : null}

      <div className="mt-8 grid gap-5 text-lg leading-8 text-slate-700">
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

      <div className="mt-10 flex flex-col justify-between gap-3 border-t border-slate-100 pt-6 sm:flex-row">
        {previousSection ? (
          <a
            className="inline-flex items-center justify-center rounded-full border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
            href={`#${previousSection.id}`}
          >
            Seção anterior
          </a>
        ) : (
          <a
            className="inline-flex items-center justify-center rounded-full border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
            href="#top"
          >
            Voltar ao topo
          </a>
        )}

        {nextSection ? (
          <a
            className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
            href={`#${nextSection.id}`}
          >
            Próxima seção
            <ArrowRight size={16} aria-hidden="true" />
          </a>
        ) : (
          <a
            className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
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
