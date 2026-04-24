import { BookOpen, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { categories } from "../data/content";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-stone-50/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link className="group flex items-center gap-3" to="/">
          <span className="grid size-10 place-items-center rounded-2xl bg-slate-950 text-stone-50 shadow-lg shadow-slate-900/10 transition group-hover:-rotate-3">
            <BookOpen size={20} aria-hidden="true" />
          </span>
          <span>
            <span className="block font-display text-xl font-semibold tracking-tight text-slate-950">
              Orbitarium
            </span>
            <span className="block text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              estudo visual
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-2 lg:flex" aria-label="Categorias principais">
          {categories.slice(0, 5).map((category) => (
            <NavLink
              className={({ isActive }) =>
                [
                  "rounded-full px-4 py-2 text-sm font-semibold transition",
                  isActive
                    ? "bg-slate-950 text-stone-50"
                    : "text-slate-600 hover:bg-white hover:text-slate-950",
                ].join(" ")
              }
              key={category.id}
              to={`/categoria/${category.id}`}
            >
              {category.name}
            </NavLink>
          ))}
        </nav>

        <button
          className="inline-flex size-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm lg:hidden"
          type="button"
          aria-expanded={isOpen}
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
          onClick={() => setIsOpen((value) => !value)}
        >
          {isOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </div>

      {isOpen ? (
        <nav
          className="border-t border-slate-200 bg-stone-50 px-4 py-4 lg:hidden"
          aria-label="Categorias"
        >
          <div className="mx-auto grid max-w-7xl gap-2">
            {categories.map((category) => (
              <NavLink
                className={({ isActive }) =>
                  [
                    "rounded-2xl px-4 py-3 text-sm font-semibold transition",
                    isActive
                      ? "bg-slate-950 text-stone-50"
                      : "bg-white text-slate-700 hover:text-slate-950",
                  ].join(" ")
                }
                key={category.id}
                to={`/categoria/${category.id}`}
                onClick={() => setIsOpen(false)}
              >
                {category.name}
              </NavLink>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
