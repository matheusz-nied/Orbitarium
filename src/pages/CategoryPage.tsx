import { ArrowRight, Home } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { ContentCard } from "../components/ContentCard";
import { getCategoryById, getContentsByCategory } from "../data/content";

export function CategoryPage() {
  const { categoryId } = useParams();
  const category = categoryId ? getCategoryById(categoryId) : undefined;
  const categoryContents = categoryId ? getContentsByCategory(categoryId) : [];

  if (!category) {
    return (
      <section className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-slate-500">
          Categoria não encontrada
        </p>
        <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-slate-950">
          Essa trilha ainda não existe.
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

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div
        className="rounded-[2.5rem] border border-slate-200 p-8 sm:p-10"
        style={{ background: `linear-gradient(135deg, ${category.softAccent}, #ffffff)` }}
      >
        <p className="text-sm font-black uppercase tracking-[0.22em]" style={{ color: category.accent }}>
          Categoria
        </p>
        <h1 className="mt-4 font-display text-5xl font-semibold tracking-[-0.04em] text-slate-950">
          {category.name}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-700">{category.description}</p>
      </div>

      <div className="mt-10 flex items-center justify-between gap-4">
        <h2 className="font-display text-3xl font-semibold tracking-tight text-slate-950">
          Conteúdos nesta categoria
        </h2>
        <Link className="hidden items-center gap-2 text-sm font-bold text-slate-700 sm:inline-flex" to="/">
          Início
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        {categoryContents.map((content) => (
          <ContentCard content={content} key={content.id} />
        ))}
      </div>

      {categoryContents.length === 0 ? (
        <div className="mt-8 rounded-[2rem] border border-dashed border-slate-300 bg-white p-8 text-center">
          <p className="font-semibold text-slate-950">Ainda não há conteúdos nesta categoria.</p>
          <p className="mt-2 text-sm text-slate-600">A estrutura está pronta para receber novos temas.</p>
        </div>
      ) : null}
    </section>
  );
}
