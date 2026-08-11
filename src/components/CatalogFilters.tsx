import { RotateCcw, SlidersHorizontal } from "lucide-react";
import type { ReactNode } from "react";
import { ALL_TRACKS_QUERY_VALUE } from "../data/studyPath";
import { SearchBar } from "./SearchBar";
import type { Level } from "../types/content";

export type CatalogSort = "recommended" | "title-asc" | "duration-asc" | "duration-desc";
export type DurationFilter = "all" | "short" | "medium" | "long";
export type LevelFilter = "Todos" | Level;

export interface CatalogPhaseOption {
  id: string;
  label: string;
  title: string;
}

export interface CatalogTrackOption {
  id: string;
  name: string;
  lessonCount: number;
}

interface CatalogFiltersProps {
  search: string;
  level: LevelFilter;
  tag: string;
  duration: DurationFilter;
  track: string;
  phase: string;
  sort: CatalogSort;
  availableTags: string[];
  availableTracks: CatalogTrackOption[];
  availablePhases: CatalogPhaseOption[];
  activeFilterCount: number;
  onSearchChange: (value: string) => void;
  onLevelChange: (value: LevelFilter) => void;
  onTagChange: (value: string) => void;
  onDurationChange: (value: DurationFilter) => void;
  onTrackChange: (value: string) => void;
  onPhaseChange: (value: string) => void;
  onSortChange: (value: CatalogSort) => void;
  onClear: () => void;
}

export function CatalogFilters({
  search,
  level,
  tag,
  duration,
  track,
  phase,
  sort,
  availableTags,
  availableTracks,
  availablePhases,
  activeFilterCount,
  onSearchChange,
  onLevelChange,
  onTagChange,
  onDurationChange,
  onTrackChange,
  onPhaseChange,
  onSortChange,
  onClear,
}: CatalogFiltersProps) {
  return (
    <section
      className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/5 sm:p-6"
      aria-labelledby="catalog-filters-title"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-2xl bg-blue-50 text-blue-700">
            <SlidersHorizontal size={18} aria-hidden="true" />
          </span>
          <div>
            <h2 id="catalog-filters-title" className="font-display text-2xl font-semibold tracking-tight text-slate-950">
              Refine seu caminho
            </h2>
            <p className="mt-1 text-sm text-slate-500">Encontre a próxima aula sem perder o contexto da trilha.</p>
          </div>
        </div>
        {activeFilterCount > 0 ? (
          <button
            className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-bold text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
            type="button"
            onClick={onClear}
          >
            <RotateCcw size={15} aria-hidden="true" />
            Limpar filtros ({activeFilterCount})
          </button>
        ) : null}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <SearchBar value={search} onChange={onSearchChange} />
        </div>

        {availableTracks.length > 0 ? (
          <FilterSelect label="Trilha" value={track} onChange={onTrackChange}>
            <option value={ALL_TRACKS_QUERY_VALUE}>Todas as aulas</option>
            {availableTracks.map((availableTrack) => (
              <option key={availableTrack.id} value={availableTrack.id}>
                {availableTrack.name} ({availableTrack.lessonCount})
              </option>
            ))}
          </FilterSelect>
        ) : null}

        <FilterSelect
          label="Dificuldade"
          value={level}
          onChange={(value) => onLevelChange(value as LevelFilter)}
        >
          <option value="Todos">Todas as dificuldades</option>
          <option value="Iniciante">Iniciante</option>
          <option value="Intermediário">Intermediário</option>
          <option value="Avançado">Avançado</option>
        </FilterSelect>

        <FilterSelect label="Tema / tag" value={tag} onChange={onTagChange}>
          <option value="">Todas as tags</option>
          {availableTags.map((availableTag) => (
            <option key={availableTag} value={availableTag}>
              {availableTag}
            </option>
          ))}
        </FilterSelect>

        <FilterSelect label="Duração" value={duration} onChange={(value) => onDurationChange(value as DurationFilter)}>
          <option value="all">Qualquer duração</option>
          <option value="short">Até 40 minutos</option>
          <option value="medium">41 a 55 minutos</option>
          <option value="long">56 minutos ou mais</option>
        </FilterSelect>

        {availablePhases.length > 0 ? (
          <FilterSelect label="Etapa da trilha" value={phase} onChange={onPhaseChange}>
            <option value="">Toda a trilha</option>
            {availablePhases.map((availablePhase) => (
              <option key={availablePhase.id} value={availablePhase.id}>
                {availablePhase.label} · {availablePhase.title}
              </option>
            ))}
          </FilterSelect>
        ) : null}

        <FilterSelect label="Ordenar por" value={sort} onChange={(value) => onSortChange(value as CatalogSort)}>
          <option value="recommended">Ordem recomendada</option>
          <option value="title-asc">Título: A–Z</option>
          <option value="duration-asc">Mais rápidas primeiro</option>
          <option value="duration-desc">Mais longas primeiro</option>
        </FilterSelect>
      </div>
    </section>
  );
}

interface FilterSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: ReactNode;
}

function FilterSelect({ label, value, onChange, children }: FilterSelectProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-black uppercase tracking-[0.16em] text-slate-500">{label}</span>
      <select
        className="min-h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold text-slate-700 outline-none transition hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {children}
      </select>
    </label>
  );
}
