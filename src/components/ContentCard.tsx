import { ArrowRight, Clock, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { getCategoryById } from "../data/content";
import type { LessonContent } from "../types/content";

interface ContentCardProps {
  content: LessonContent;
}

export function ContentCard({ content }: ContentCardProps) {
  const primaryCategory = getCategoryById(content.primaryCategoryId);
  const secondaryCategory = content.secondaryCategoryId
    ? getCategoryById(content.secondaryCategoryId)
    : undefined;

  return (
    <Link
      className="group flex h-full flex-col rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-2xl hover:shadow-slate-900/10"
      to={`/aula/${content.id}`}
    >
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <span
          className="rounded-full px-3 py-1 text-xs font-bold"
          style={{ backgroundColor: primaryCategory?.softAccent, color: primaryCategory?.accent }}
        >
          {primaryCategory?.name}
        </span>
        {secondaryCategory ? (
          <span
            className="rounded-full px-3 py-1 text-xs font-bold"
            style={{ backgroundColor: secondaryCategory.softAccent, color: secondaryCategory.accent }}
          >
            {secondaryCategory.name}
          </span>
        ) : null}
      </div>

      <h3 className="font-display text-2xl font-semibold leading-tight tracking-tight text-slate-950">
        {content.title}
      </h3>
      <p className="mt-4 grow text-sm leading-6 text-slate-600">{content.description}</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {content.tags.slice(0, 5).map((tag) => (
          <span
            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600"
            key={tag}
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-5">
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600">
          <Sparkles size={16} aria-hidden="true" />
          {content.level}
        </span>
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600">
          <Clock size={16} aria-hidden="true" />
          {content.estimatedTime}
        </span>
      </div>

      <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-slate-950">
        Começar aula
        <ArrowRight
          className="transition group-hover:translate-x-1"
          size={17}
          aria-hidden="true"
        />
      </span>
    </Link>
  );
}
