import {
  ArrowRight,
  BookOpenCheck,
  Home,
  ListOrdered,
  Route,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import {
  CatalogFilters,
  type CatalogSort,
  type CatalogTrackOption,
  type LevelFilter,
} from "../components/CatalogFilters";
import { CatalogPagination } from "../components/CatalogPagination";
import { ContentCard } from "../components/ContentCard";
import { getCategoryById, getContentsByCategory } from "../data/content";
import {
  ALL_TRACKS_QUERY_VALUE,
  getDefaultLearningTrackForCategory,
  getLearningTracksByCategory,
  getLessonTrackInfo,
  getTrackLessonCount,
  getTrackOrderComparator,
  type LearningTrack,
  type LessonTrackInfo,
} from "../data/studyPath";
import type { LessonContent } from "../types/content";

const PAGE_SIZE = 12;

export function CategoryPage() {
  const { categoryId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const category = categoryId ? getCategoryById(categoryId) : undefined;
  const categoryContents = useMemo(
    () => (categoryId ? getContentsByCategory(categoryId) : []),
    [categoryId],
  );
  const availableTracks = useMemo(
    () => (categoryId ? getLearningTracksByCategory(categoryId) : []),
    [categoryId],
  );
  const trackIdFromUrl = searchParams.get("trilha") ?? "";
  const isAllTracksView = trackIdFromUrl === ALL_TRACKS_QUERY_VALUE;
  const selectedTrack = isAllTracksView
    ? undefined
    : availableTracks.find((track) => track.id === trackIdFromUrl);
  const defaultTrack = categoryId ? getDefaultLearningTrackForCategory(categoryId) : undefined;
  const activeTrack = isAllTracksView ? undefined : selectedTrack ?? defaultTrack;
  const trackOptions = useMemo<CatalogTrackOption[]>(
    () =>
      availableTracks.length > 1
        ? availableTracks.map((track) => ({
            id: track.id,
            name: track.name,
            lessonCount: getTrackLessonCount(track),
          }))
        : [],
    [availableTracks],
  );

  const [search, setSearch] = useState("");
  const [level, setLevel] = useState<LevelFilter>("Todos");
  const [tag, setTag] = useState("");
  const [phaseId, setPhaseId] = useState("");
  const [sort, setSort] = useState<CatalogSort>("recommended");
  const [page, setPage] = useState(1);

  useEffect(() => {
    setSearch("");
    setLevel("Todos");
    setTag("");
    setPhaseId("");
    setSort("recommended");
  }, [categoryId]);

  useEffect(() => {
    setPhaseId("");
    setPage(1);
  }, [trackIdFromUrl]);

  useEffect(() => {
    setPage(1);
  }, [search, level, tag, phaseId, sort]);

  useEffect(() => {
    if (
      !trackIdFromUrl ||
      trackIdFromUrl === ALL_TRACKS_QUERY_VALUE ||
      availableTracks.some((track) => track.id === trackIdFromUrl)
    ) {
      return;
    }

    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.delete("trilha");
    setSearchParams(nextSearchParams, { replace: true });
  }, [availableTracks, searchParams, setSearchParams, trackIdFromUrl]);

  const availableTags = useMemo(
    () =>
      Array.from(new Set(categoryContents.flatMap((content) => content.tags))).sort((first, second) =>
        first.localeCompare(second, "pt-BR"),
      ),
    [categoryContents],
  );

  const phaseOptions = useMemo(() => {
    if (!activeTrack) {
      return [];
    }

    const contentIds = new Set(categoryContents.map((content) => content.id));

    return activeTrack.phases
      .filter((phase) => phase.lessonIds.some((contentId) => contentIds.has(contentId)))
      .map((phase) => ({ id: phase.id, label: phase.label, title: phase.title }));
  }, [activeTrack, categoryContents]);

  const phaseCards = useMemo(() => {
    if (!activeTrack) {
      return [];
    }

    const contentIds = new Set(categoryContents.map((content) => content.id));

    return activeTrack.phases.flatMap((phase) => {
      const phaseContentIds = phase.lessonIds.filter((contentId) => contentIds.has(contentId));

      if (phaseContentIds.length === 0) {
        return [];
      }

      const firstInfo = getLessonTrackInfo(activeTrack.id, phaseContentIds[0]);
      const lastInfo = getLessonTrackInfo(activeTrack.id, phaseContentIds[phaseContentIds.length - 1]);

      return [
        {
          phase,
          count: phaseContentIds.length,
          firstOrder: firstInfo?.order ?? 0,
          lastOrder: lastInfo?.order ?? 0,
        },
      ];
    });
  }, [activeTrack, categoryContents]);

  const filteredContents = useMemo(() => {
    const query = normalizeSearch(search.trim());
    const trackId = activeTrack?.id;

    return categoryContents
      .filter((content) => {
        const trackInfo = trackId ? getLessonTrackInfo(trackId, content.id) : undefined;

        if (trackId && !trackInfo) {
          return false;
        }

        if (query && !getSearchableText(content, trackInfo).includes(query)) {
          return false;
        }

        if (level !== "Todos" && content.level !== level) {
          return false;
        }

        if (tag && !content.tags.includes(tag)) {
          return false;
        }

        if (phaseId && trackInfo?.phase.id !== phaseId) {
          return false;
        }

        return true;
      })
      .sort((first, second) => compareContents(first, second, sort, trackId));
  }, [activeTrack, categoryContents, level, phaseId, search, sort, tag]);

  const totalPages = Math.max(1, Math.ceil(filteredContents.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const visibleContents = filteredContents.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );
  const firstVisibleIndex = filteredContents.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const lastVisibleIndex = Math.min(currentPage * PAGE_SIZE, filteredContents.length);

  const recommendedContents = useMemo(
    () =>
      [...categoryContents].sort((first, second) =>
        compareContents(first, second, "recommended", activeTrack?.id),
      ),
    [activeTrack, categoryContents],
  );
  const firstPathContent = activeTrack
    ? recommendedContents.find((content) => getLessonTrackInfo(activeTrack.id, content.id))
    : undefined;
  const firstPathInfo =
    activeTrack && firstPathContent
      ? getLessonTrackInfo(activeTrack.id, firstPathContent.id)
      : undefined;
  const recommendedLessonCount = activeTrack
    ? categoryContents.filter((content) => getLessonTrackInfo(activeTrack.id, content.id)).length
    : 0;
  const activeFilterCount = [
    search.trim(),
    level !== "Todos" ? level : "",
    tag,
    phaseId,
    trackIdFromUrl,
    sort !== "recommended" ? sort : "",
  ].filter(Boolean).length;

  const clearTrack = () => {
    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.delete("trilha");
    setSearchParams(nextSearchParams);
  };

  const clearFilters = () => {
    setSearch("");
    setLevel("Todos");
    setTag("");
    setPhaseId("");
    setSort("recommended");
    clearTrack();
    setPage(1);
  };

  const selectTrack = (nextTrackId: string) => {
    const nextSearchParams = new URLSearchParams(searchParams);

    if (nextTrackId) {
      nextSearchParams.set("trilha", nextTrackId);
    } else {
      nextSearchParams.delete("trilha");
    }

    setSearchParams(nextSearchParams);
    setPhaseId("");
    setPage(1);
    scrollToCatalog();
  };

  const selectPhase = (nextPhaseId: string) => {
    setPhaseId((currentPhaseId) => (currentPhaseId === nextPhaseId ? "" : nextPhaseId));
    setPage(1);
    scrollToCatalog();
  };

  const selectPage = (nextPage: number) => {
    const safePage = Math.min(Math.max(nextPage, 1), totalPages);
    setPage(safePage);
    scrollToCatalog();
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
        <div className={activeTrack && firstPathContent ? "grid gap-8 lg:grid-cols-[1fr_0.72fr] lg:items-center" : ""}>
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
              {availableTracks.length > 0 ? (
                <span className="rounded-full border border-white/80 bg-white/75 px-4 py-2">
                  {availableTracks.length} trilha{availableTracks.length === 1 ? "" : "s"}
                </span>
              ) : null}
              <Link className="inline-flex items-center gap-2 rounded-full px-2 py-2 text-slate-700 hover:text-slate-950" to="/">
                Início
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>

          {activeTrack && firstPathContent && firstPathInfo ? (
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
                {activeTrack.name} · {firstPathInfo.phase.title}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-emerald-300">
                Começar pela base
                <ArrowRight className="transition group-hover:translate-x-1" size={17} aria-hidden="true" />
              </span>
            </Link>
          ) : null}
        </div>
      </div>

      {availableTracks.length > 0 ? (
      <TrackOverview
        activeTrack={activeTrack}
        categoryContents={categoryContents}
        tracks={availableTracks}
        onClear={() => selectTrack(ALL_TRACKS_QUERY_VALUE)}
        onSelect={selectTrack}
      />
      ) : null}

      {activeTrack && phaseCards.length > 0 ? (
        <TrackPhaseMap
          activePhaseId={phaseId}
          activeTrack={activeTrack}
          phaseCards={phaseCards}
          recommendedLessonCount={recommendedLessonCount}
          onSelectPhase={selectPhase}
        />
      ) : null}

      <section className="mt-10 scroll-mt-24" id="catalog-results" aria-labelledby="catalog-title">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-orange-700">Catálogo</p>
            <h2 id="catalog-title" className="mt-3 font-display text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              {activeTrack ? `Aulas de ${activeTrack.name}` : "Escolha o próximo passo"}
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
            availableTracks={trackOptions}
            level={level}
            phase={phaseId}
            search={search}
            sort={sort}
            tag={tag}
            track={isAllTracksView ? ALL_TRACKS_QUERY_VALUE : activeTrack?.id ?? ""}
            onClear={clearFilters}
            onLevelChange={setLevel}
            onPhaseChange={setPhaseId}
            onSearchChange={setSearch}
            onSortChange={setSort}
            onTagChange={setTag}
            onTrackChange={selectTrack}
          />
        </div>

        {visibleContents.length > 0 ? (
          <div className="mt-7 grid gap-5 lg:grid-cols-2">
            {visibleContents.map((content) => (
              <ContentCard
                content={content}
                key={content.id}
                trackInfo={activeTrack ? getLessonTrackInfo(activeTrack.id, content.id) : undefined}
              />
            ))}
          </div>
        ) : (
          <div className="mt-7 rounded-[2rem] border border-dashed border-slate-300 bg-white p-8 text-center">
            <p className="font-semibold text-slate-950">Nenhuma aula combina com esses filtros.</p>
            <p className="mt-2 text-sm text-slate-600">Tente remover uma dificuldade, tag, fase ou trilha.</p>
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

interface TrackOverviewProps {
  activeTrack?: LearningTrack;
  categoryContents: LessonContent[];
  tracks: LearningTrack[];
  onSelect: (trackId: string) => void;
  onClear: () => void;
}

function TrackOverview({ activeTrack, categoryContents, tracks, onSelect, onClear }: TrackOverviewProps) {
  return (
    <section className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/5 sm:p-7" aria-labelledby="tracks-title">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.2em] text-blue-700">
            <Route size={16} aria-hidden="true" />
            Trilhas desta categoria
          </div>
          <h2 id="tracks-title" className="mt-3 font-display text-3xl font-semibold tracking-tight text-slate-950">
            Escolha um caminho de estudo
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
            Uma trilha organiza as aulas por objetivo e mostra uma ordem recomendada sem esconder o restante do catálogo.
          </p>
        </div>
        {activeTrack ? (
          <button
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
            type="button"
            onClick={onClear}
          >
            Ver todas as aulas
          </button>
        ) : null}
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {tracks.map((track) => {
          const isSelected = activeTrack?.id === track.id;
          const trackLessonCount = categoryContents.filter((content) => getLessonTrackInfo(track.id, content.id)).length;

          return (
            <button
              className={`rounded-2xl border p-5 text-left transition hover:-translate-y-0.5 hover:shadow-lg ${
                isSelected
                  ? "border-slate-950 bg-slate-950 text-white shadow-lg shadow-slate-900/15"
                  : "border-slate-200 bg-slate-50 text-slate-950 hover:border-slate-300 hover:bg-white"
              }`}
              key={track.id}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onSelect(track.id)}
            >
              <div className="flex items-center justify-between gap-3">
                <span className={`text-xs font-black uppercase tracking-[0.16em] ${isSelected ? "text-emerald-300" : "text-blue-700"}`}>
                  {track.phases.length} módulos
                </span>
                <span className={`font-mono text-xs font-bold ${isSelected ? "text-slate-300" : "text-slate-500"}`}>
                  {trackLessonCount} aulas
                </span>
              </div>
              <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight">{track.name}</h3>
              <p className={`mt-2 text-sm leading-6 ${isSelected ? "text-slate-300" : "text-slate-600"}`}>
                {track.description}
              </p>
              <span className={`mt-5 inline-flex items-center gap-2 text-sm font-bold ${isSelected ? "text-emerald-300" : "text-slate-950"}`}>
                {isSelected ? "Trilha selecionada" : "Explorar trilha"}
                <ArrowRight size={16} aria-hidden="true" />
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

interface TrackPhaseMapProps {
  activePhaseId: string;
  activeTrack: LearningTrack;
  phaseCards: Array<{
    phase: LearningTrack["phases"][number];
    count: number;
    firstOrder: number;
    lastOrder: number;
  }>;
  recommendedLessonCount: number;
  onSelectPhase: (phaseId: string) => void;
}

function TrackPhaseMap({
  activePhaseId,
  activeTrack,
  phaseCards,
  recommendedLessonCount,
  onSelectPhase,
}: TrackPhaseMapProps) {
  return (
    <section className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/5 sm:p-7" aria-labelledby="track-map-title">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.2em] text-blue-700">
            <Route size={16} aria-hidden="true" />
            Mapa da trilha
          </div>
          <h2 id="track-map-title" className="mt-3 font-display text-3xl font-semibold tracking-tight text-slate-950">
            {activeTrack.name}
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
            Clique em um módulo para ver apenas as aulas daquele momento da jornada.
          </p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-bold text-blue-800">
          <BookOpenCheck size={17} aria-hidden="true" />
          {recommendedLessonCount} aulas na sequência
        </span>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {phaseCards.map(({ phase, count, firstOrder, lastOrder }) => {
          const isSelected = activePhaseId === phase.id;

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
              onClick={() => onSelectPhase(phase.id)}
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
  );
}

function scrollToCatalog() {
  window.requestAnimationFrame(() => {
    document.getElementById("catalog-results")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
}

function normalizeSearch(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function getSearchableText(content: LessonContent, trackInfo?: LessonTrackInfo) {
  const primaryCategory = getCategoryById(content.primaryCategoryId)?.name ?? "";
  const secondaryCategory = content.secondaryCategoryId
    ? getCategoryById(content.secondaryCategoryId)?.name ?? ""
    : "";

  return normalizeSearch(
    [
      content.title,
      content.subtitle,
      content.description,
      primaryCategory,
      secondaryCategory,
      content.level,
      trackInfo?.track.name ?? "",
      trackInfo?.phase.title ?? "",
      ...content.tags,
    ].join(" "),
  );
}

function getMaxDurationInMinutes(estimatedTime: string) {
  const values = estimatedTime.match(/\d+/g)?.map(Number) ?? [];
  return values.length > 0 ? Math.max(...values) : Number.MAX_SAFE_INTEGER;
}


function compareContents(
  first: LessonContent,
  second: LessonContent,
  sort: CatalogSort,
  trackId?: string,
) {
  if (sort === "recommended") {
    return trackId
      ? getTrackOrderComparator(trackId)(first, second)
      : first.title.localeCompare(second.title, "pt-BR");
  }

  if (sort === "title-asc") {
    return first.title.localeCompare(second.title, "pt-BR");
  }

  const durationDifference =
    getMaxDurationInMinutes(first.estimatedTime) - getMaxDurationInMinutes(second.estimatedTime);
  return sort === "duration-asc" ? durationDifference : -durationDifference;
}
