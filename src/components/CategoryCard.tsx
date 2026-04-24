import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { Category } from "../types/content";

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      className="group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-900/10"
      to={`/categoria/${category.id}`}
    >
      <span
        className="mb-8 block size-12 rounded-2xl"
        style={{ backgroundColor: category.softAccent, boxShadow: `inset 0 0 0 1px ${category.accent}22` }}
        aria-hidden="true"
      />
      <h3 className="font-display text-2xl font-semibold tracking-tight text-slate-950">
        {category.name}
      </h3>
      <p className="mt-3 min-h-16 text-sm leading-6 text-slate-600">{category.description}</p>
      <span
        className="mt-6 inline-flex items-center gap-2 text-sm font-bold"
        style={{ color: category.accent }}
      >
        Ver conteúdos
        <ArrowRight
          className="transition group-hover:translate-x-1"
          size={17}
          aria-hidden="true"
        />
      </span>
    </Link>
  );
}
