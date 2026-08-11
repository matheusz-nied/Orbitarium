import {
  ArrowRight,
  BookOpenCheck,
  Home,
  ListOrdered,
  Route,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  CatalogFilters,
  type CatalogSort,
  type DurationFilter,
  type LevelFilter,
} from "../components/CatalogFilters";
import { ContentCard } from "../components/ContentCard";
import { CatalogPagination } from "../components/CatalogPagination";
import { getCategoryById, getContentsByCategory } from "../data/content";
import {
  compareContentsByRecommendedOrder,
  getStudyPathInfo,
  studyPathPhases,
} from "../data/studyPath";
import type { LessonContent } from "../types/content";

const PAGE_SIZE = 12;

export function CategoryPage() {
  const { categoryId } = useParams();
  const category = categoryId ? getCategoryById(categoryId) : undefined;
  const categoryContents = useMemo(
    () => (categoryId ? getContentsByCategory(categoryId) : []),
    [categoryId],
  );
  const isArtificialIntelligence = category?.id === "inteligencia-artificial";

  const [search, setSearch] = useState("");
  const [level, setLevel] = useState<LevelFilter>("Todos");
  const [tag, setTag] = useState("");
  const [duration, setDuration] = useState<DurationFilter>("all");
  const [phaseId, setPhaseId] = useState("");
  const [sort, setSort] = useState<CatalogSort>("recommended");
  const [page, setPage] = useState(1);

  useEffect(() => {
    setSearch("");
    setLevel("Todos");
    setTag("");
    setDuration("all");
    setPhaseId("");
    setSort("recommended");
  }, [categoryId]);

  useEffect(() => {
    setPage(1);
  }, [search, level, tag, duration, phaseId, sort]);

  const availableTags = useMemo(
    () =>
      Array.from(new Set(categoryContents.flatMap((content) => content.tags))).sort((first, second) =>
        first.localeCompare(second, "pt-BR"),
      ),
    [categoryContents],
  );

  const phaseOptions = useMemo(() => {
    const contentIds = new Set(categoryContents.map((content) => content.id));

    return studyPathPhases
      .filter((phase) => phase.lessonIds.some((contentId) => contentIds.has(contentId)))
      .map((phase) => ({ id: phase.id, label: phase.label, title: phase.title }));
  }, [categoryContents]);

  const phaseCards = useMemo(() => {
    const contentIds = new Set(categoryContents.map((content) => content.id));

    return studyPathPhases.flatMap((phase) => {
      const phaseContentIds = phase.lessonIds.filter((contentId) => contentIds.has(contentId));

      if (phaseContentIds.length === 0) {
        return [];
      }

      return [
        {
          phase,
          count: phaseContentIds.length,
          firstOrder: getStudyPathInfo(phaseContentIds[0])?.order,
          lastOrder: getStudyPathInfo(phaseContentIds[phaseContentIds.length - 1])?.order,
        },
      ];
    });
  }, [categoryContents]);

  const filteredContents = useMemo(() => {
    const query = normalizeSearch(search.trim());

    return categoryContents
      .filter((content) => {
        if (query && !getSearchableText(content).includes(query)) {
          return false;
        }

        if (level !== "Todos" && content.level !== level) {
          return false;
        }

        if (tag && !content.tags.includes(tag)) {
          return false;
        }

        if (duration !== "all" && !matchesDuration(content.estimatedTime, duration)) {
          return false;
        }

        if (phaseId && getStudyPathInfo(content.id)?.phase.id !== phaseId) {
          return false;
        }

        return true;
      })
      .sort((first, second) => compareContents(first, second, sort));
  }, [categoryContents, duration, level, phaseId, search, sort, tag]);

  const totalPages = Math.max(1, Math.ceil(filteredContents.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const visibleContents = filteredContents.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );
  const firstVisibleIndex = filteredContents.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const lastVisibleIndex = Math.min(currentPage * PAGE_SIZE, filteredContents.length);

  const recommendedContents = useMemo(
    () => [...categoryContents].sort(compareContentsByRecommendedOrder),
    [categoryContents],
  );
  const firstPathContent = recommendedContents.find((content) => getStudyPathInfo(content.id));
  const firstPathInfo = firstPathContent ? getStudyPathInfo(firstPathContent.id) : undefined;
  const recommendedLessonCount = recommendedContents.filter((content) => getStudyPathInfo(content.id)).length;
  const activeFilterCount = [
    search.trim(),
    level !== "Todos" ? level : "",
    tag,
    duration !== "all" ? duration : "",
    phaseId,
    sort !== "recommended" ? sort : "",
  ].filter(Boolean).length;

  const clearFilters = () => {
    setSearch("");
    setLevel("Todos");
    setTag("");
    setDuration("all");
    setPhaseId("");
    setSort("recommended");
    setPage(1);
  };

  const selectPhase = (nextPhaseId: string) => {
    setPhaseId((currentPhaseId) => (currentPhaseId === nextPhaseId ? "" : nextPhaseId));
    setPage(1);
    window.requestAnimationFrame(() => {
      document.getElementById("catalog-results")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  const selectPage = (nextPage: number) => {
    const safePage = Math.min(Math.max(nextPage, 1), totalPages);
    setPage(safePage);
    window.requestAnimationFrame(() => {
      document.getElementById("catalog-results")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

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
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div
        className="rounded-[2.5rem] border border-slate-200 p-6 sm:p-10"
        style={{ background: `linear-gradient(135deg, ${category.softAccent}, #ffffff)` }}
      >
        <div className={isArtificialIntelligence ? "grid gap-8 lg:grid-cols-[1fr_0.72fr] lg:items-center" : ""}>
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em]" style={{ color: category.accent }}>
              Categoria
            </p>
            <h1 className="mt-4 font-display text-5xl font-semibold tracking-[-0.04em] text-slate-950">
              {category.name}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-700">{category.description}</p>
            <div className="mt-7 flex flex-wrap gap-3 text-sm font-bold text-slate-700">
              <span className="rounded-full border border-white/80 bg-white/75 px-4 py-2">
                {categoryContents.length} aula{categoryContents.length === 1 ? "" : "s"}
              </span>
              {isArtificialIntelligence ? (
                <span className="rounded-full border border-white/80 bg-white/75 px-4 py-2">
                  {phaseCards.length} fases de estudo
                </span>
              ) : null}
              <Link className="inline-flex items-center gap-2 rounded-full px-2 py-2 text-slate-700 hover:text-slate-950" to="/">
                Início
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>

          {isArtificialIntelligence && firstPathContent && firstPathInfo ? (
            <Link
              className="group rounded-[2rem] border border-slate-900/10 bg-slate-950 p-6 text-white shadow-xl shadow-slate-900/15 transition hover:-translate-y-1 hover:shadow-2xl"
              to={`/aula/${firstPathContent.id}`}
            >
              <div className="flex items-center justify-between gap-4">
                <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-emerald-300">
                  <ListOrdered size={16} aria-hidden="true" />
                  Primeiro passo
                </span>
                <span className="rounded-full bg-white/10 px-3 py-1.5 font-mono text-xs font-bold text-slate-300">
                  Aula {String(firstPathInfo.order).padStart(2, "0")}
                </span>
              </div>
              <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight">{firstPathContent.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                {firstPathInfo.phase.label} · {firstPathInfo.phase.title}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-emerald-300">
                Começar pela base
                <ArrowRight className="transition group-hover:translate-x-1" size={17} aria-hidden="true" />
              </span>
            </Link>
          ) : null}
        </div>
      </div>

      {isArtificialIntelligence && phaseCards.length > 0 ? (
        <section className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/5 sm:p-7" aria-labelledby="study-path-title">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <div className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.2em] text-blue-700">
                <Route size={16} aria-hidden="true" />
                Mapa da trilha
              </div>
              <h2 id="study-path-title" className="mt-3 font-display text-3xl font-semibold tracking-tight text-slate-950">
                Uma ordem para você não começar no meio
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
                A sequência recomendada conecta cada etapa à próxima. Clique em uma fase para ver
                apenas as aulas daquele momento da jornada.
              </p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-bold text-blue-800">
              <BookOpenCheck size={17} aria-hidden="true" />
              {recommendedLessonCount} aulas na sequência
            </span>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {phaseCards.map(({ phase, count, firstOrder, lastOrder }) => {
              const isSelected = phaseId === phase.id;

              return (
                <button
                  className={`group rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 hover:shadow-lg ${
                    isSelected
                      ? "border-slate-950 bg-slate-950 text-white shadow-lg shadow-slate-900/15"
                      : "border-slate-200 bg-slate-50 text-slate-950 hover:border-slate-300 hover:bg-white"
                  }`}
                  key={phase.id}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => selectPhase(phase.id)}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className={`text-xs font-black uppercase tracking-[0.16em] ${isSelected ? "text-emerald-300" : "text-blue-700"}`}>
                      {phase.label}
                    </span>
                    <span className={`font-mono text-xs font-bold ${isSelected ? "text-slate-300" : "text-slate-500"}`}>
                      {count} aula{count === 1 ? "" : "s"}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-xl font-semibold tracking-tight">{phase.title}</h3>
                  <p className={`mt-2 text-xs leading-5 ${isSelected ? "text-slate-300" : "text-slate-600"}`}>
                    {phase.description}
                  </p>
                  <p className={`mt-4 font-mono text-[0.68rem] font-bold uppercase tracking-[0.12em] ${isSelected ? "text-slate-400" : "text-slate-500"}`}>
                    Aulas {String(firstOrder).padStart(2, "0")}–{String(lastOrder).padStart(2, "0")}
                  </p>
                </button>
              );
            })}
          </div>
        </section>
      ) : null}

      <section className="mt-10 scroll-mt-24" id="catalog-results" aria-labelledby="catalog-title">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-orange-700">Catálogo</p>
            <h2 id="catalog-title" className="mt-3 font-display text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Escolha o próximo passo
            </h2>
          </div>
          <p className="text-right text-sm font-semibold text-slate-500" aria-live="polite">
            {filteredContents.length === 0
              ? "Nenhuma aula encontrada"
              : `Mostrando ${firstVisibleIndex}–${lastVisibleIndex} de ${filteredContents.length}`}
          </p>
        </div>

        <div className="mt-7">
          <CatalogFilters
            activeFilterCount={activeFilterCount}
            availablePhases={phaseOptions}
            availableTags={availableTags}
            duration={duration}
            level={level}
            phase={phaseId}
            search={search}
            sort={sort}
            tag={tag}
            onClear={clearFilters}
            onDurationChange={setDuration}
            onLevelChange={setLevel}
            onPhaseChange={setPhaseId}
            onSearchChange={setSearch}
            onSortChange={setSort}
            onTagChange={setTag}
          />
        </div>

        {visibleContents.length > 0 ? (
          <div className="mt-7 grid gap-5 lg:grid-cols-2">
            {visibleContents.map((content) => (
              <ContentCard content={content} key={content.id} />
            ))}
          </div>
        ) : (
          <div className="mt-7 rounded-[2rem] border border-dashed border-slate-300 bg-white p-8 text-center">
            <p className="font-semibold text-slate-950">Nenhuma aula combina com esses filtros.</p>
            <p className="mt-2 text-sm text-slate-600">Tente remover uma dificuldade, tag ou fase para ampliar a busca.</p>
            <button
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
              type="button"
              onClick={clearFilters}
            >
              Limpar filtros
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          </div>
        )}

        {filteredContents.length > 0 ? (
          <CatalogPagination currentPage={currentPage} totalPages={totalPages} onPageChange={selectPage} />
        ) : null}
      </section>
    </section>
  );
}

function normalizeSearch(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function getSearchableText(content: LessonContent) {
  const primaryCategory = getCategoryById(content.primaryCategoryId)?.name ?? "";
  const secondaryCategory = content.secondaryCategoryId
    ? getCategoryById(content.secondaryCategoryId)?.name ?? ""
    : "";
  const studyPath = getStudyPathInfo(content.id);

  return normalizeSearch(
    [
      content.title,
      content.subtitle,
      content.description,
      primaryCategory,
      secondaryCategory,
      content.level,
      studyPath?.phase.title ?? "",
      ...content.tags,
    ].join(" "),
  );
}

function getMaxDurationInMinutes(estimatedTime: string) {
  const values = estimatedTime.match(/\d+/g)?.map(Number) ?? [];
  return values.length > 0 ? Math.max(...values) : Number.MAX_SAFE_INTEGER;
}

function matchesDuration(estimatedTime: string, duration: DurationFilter) {
  const maxDuration = getMaxDurationInMinutes(estimatedTime);

  if (duration === "short") {
    return maxDuration <= 40;
  }

  if (duration === "medium") {
    return maxDuration > 40 && maxDuration <= 55;
  }

  if (duration === "long") {
    return maxDuration > 55;
  }

  return true;
}

function compareContents(first: LessonContent, second: LessonContent, sort: CatalogSort) {
  if (sort === "recommended") {
    return compareContentsByRecommendedOrder(first, second);
  }

  if (sort === "title-asc") {
    return first.title.localeCompare(second.title, "pt-BR");
  }

  const durationDifference = getMaxDurationInMinutes(first.estimatedTime) - getMaxDurationInMinutes(second.estimatedTime);
  return sort === "duration-asc" ? durationDifference : -durationDifference;
}
