import {
  ArrowUpDown,
  Check,
  Layers,
  RotateCcw,
  Route,
  Search,
  SlidersHorizontal,
  Tag,
  X,
} from "lucide-react";
import { useId } from "react";
import type { ReactNode } from "react";
import { ALL_TRACKS_QUERY_VALUE } from "../data/studyPath";
import type { Level } from "../types/content";

export type CatalogSort = "recommended" | "title-asc" | "duration-asc" | "duration-desc";
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
  onTrackChange: (value: string) => void;
  onPhaseChange: (value: string) => void;
  onSortChange: (value: CatalogSort) => void;
  onClear: () => void;
}

const LEVEL_OPTIONS: Array<{ id: LevelFilter; label: string }> = [
  { id: "Todos", label: "Todos" },
  { id: "Iniciante", label: "Iniciante" },
  { id: "Intermediário", label: "Intermediário" },
  { id: "Avançado", label: "Avançado" },
];

const SORT_LABELS: Record<CatalogSort, string> = {
  recommended: "Recomendado",
  "title-asc": "Título: A–Z",
  "duration-asc": "Mais rápidas",
  "duration-desc": "Mais longas",
};

export function CatalogFilters({
  search,
  level,
  tag,
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
  onTrackChange,
  onPhaseChange,
  onSortChange,
  onClear,
}: CatalogFiltersProps) {
  const searchInputId = useId();

  const selectedTrackObj = availableTracks.find((t) => t.id === track);
  const selectedPhaseObj = availablePhases.find((p) => p.id === phase);

  return (
    <section
      className="rounded-2xl border border-slate-200/90 bg-white/95 p-4 shadow-lg shadow-slate-900/5 backdrop-blur-sm transition-all sm:p-5"
      aria-labelledby="catalog-filters-title"
    >
      {/* Header bar: Compact title + active counter + Clear button */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3.5 mb-3.5">
        <div className="flex items-center gap-2.5">
          <div className="flex size-8 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
            <SlidersHorizontal size={16} aria-hidden="true" />
          </div>
          <h2 id="catalog-filters-title" className="font-display text-base font-bold tracking-tight text-slate-950">
            Refine sua busca
          </h2>
          {activeFilterCount > 0 ? (
            <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-[11px] font-black text-blue-800">
              {activeFilterCount} {activeFilterCount === 1 ? "ativo" : "ativos"}
            </span>
          ) : null}
        </div>

        {activeFilterCount > 0 ? (
          <button
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-600 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700"
            type="button"
            onClick={onClear}
          >
            <RotateCcw size={13} aria-hidden="true" />
            Limpar filtros
          </button>
        ) : null}
      </div>

      {/* Main Controls Block */}
      <div className="space-y-3">
        {/* Row 1: Search Input & Order Select */}
        <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
          {/* Search bar */}
          <div className="relative flex-1">
            <label htmlFor={searchInputId} className="sr-only">
              Pesquisar por título, categoria ou tag
            </label>
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              size={16}
              aria-hidden="true"
            />
            <input
              id={searchInputId}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/80 py-2 pl-9 pr-8 text-xs font-medium text-slate-900 shadow-inner outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              type="text"
              value={search}
              placeholder="Pesquisar por título, palavra-chave..."
              onChange={(e) => onSearchChange(e.target.value)}
            />
            {search ? (
              <button
                type="button"
                onClick={() => onSearchChange("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-slate-400 hover:bg-slate-200 hover:text-slate-700"
                aria-label="Limpar pesquisa"
              >
                <X size={13} />
              </button>
            ) : null}
          </div>

          {/* Dificuldade Segmented Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
            <span className="text-[11px] font-black uppercase tracking-[0.12em] text-slate-400 mr-1 hidden md:inline">
              Nível:
            </span>
            {LEVEL_OPTIONS.map((option) => {
              const isSelected = level === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => onLevelChange(option.id)}
                  className={`inline-flex shrink-0 items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-bold transition-all ${
                    isSelected
                      ? option.id === "Iniciante"
                        ? "bg-emerald-600 text-white shadow-sm shadow-emerald-600/20"
                        : option.id === "Intermediário"
                        ? "bg-blue-600 text-white shadow-sm shadow-blue-600/20"
                        : option.id === "Avançado"
                        ? "bg-purple-600 text-white shadow-sm shadow-purple-600/20"
                        : "bg-slate-900 text-white shadow-sm shadow-slate-900/20"
                      : "border border-slate-200 bg-slate-50/70 text-slate-700 hover:border-slate-300 hover:bg-slate-100"
                  }`}
                >
                  {isSelected ? <Check size={13} aria-hidden="true" /> : null}
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Row 2: Secondary Dropdowns (All Visible Inline) */}
        <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-[auto_1fr_1fr_1fr]">
          {/* Ordenar Por Dropdown */}
          <div className="col-span-2 sm:col-span-1">
            <CompactSelect
              icon={<ArrowUpDown size={14} />}
              value={sort}
              onChange={(v) => onSortChange(v as CatalogSort)}
              ariaLabel="Ordenar por"
            >
              {Object.entries(SORT_LABELS).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </CompactSelect>
          </div>

          {/* Tema / Tag Dropdown */}
          <div>
            <CompactSelect
              icon={<Tag size={14} />}
              value={tag}
              onChange={onTagChange}
              ariaLabel="Filtrar por Tema/Tag"
            >
              <option value="">Todas as tags</option>
              {availableTags.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </CompactSelect>
          </div>

          {/* Trilha Dropdown */}
          {availableTracks.length > 0 ? (
            <div>
              <CompactSelect
                icon={<Route size={14} />}
                value={track}
                onChange={onTrackChange}
                ariaLabel="Filtrar por Trilha"
              >
                <option value={ALL_TRACKS_QUERY_VALUE}>Todas as trilhas</option>
                {availableTracks.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name} ({t.lessonCount})
                  </option>
                ))}
              </CompactSelect>
            </div>
          ) : null}

          {/* Etapa Dropdown */}
          {availablePhases.length > 0 ? (
            <div>
              <CompactSelect
                icon={<Layers size={14} />}
                value={phase}
                onChange={onPhaseChange}
                ariaLabel="Filtrar por Etapa"
              >
                <option value="">Toda a trilha</option>
                {availablePhases.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.label} · {p.title}
                  </option>
                ))}
              </CompactSelect>
            </div>
          ) : null}
        </div>

        {/* Active Filter Chips Bar (Bottom) */}
        {activeFilterCount > 0 ? (
          <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100">
            <span className="text-[11px] font-black uppercase tracking-[0.12em] text-slate-400 mr-1">
              Ativos:
            </span>

            {search ? (
              <FilterChip label={`Busca: "${search}"`} onRemove={() => onSearchChange("")} />
            ) : null}

            {level !== "Todos" ? (
              <FilterChip label={`Nível: ${level}`} onRemove={() => onLevelChange("Todos")} />
            ) : null}

            {tag ? <FilterChip label={`Tag: #${tag}`} onRemove={() => onTagChange("")} /> : null}

            {track && track !== ALL_TRACKS_QUERY_VALUE && selectedTrackObj ? (
              <FilterChip
                label={`Trilha: ${selectedTrackObj.name}`}
                onRemove={() => onTrackChange(ALL_TRACKS_QUERY_VALUE)}
              />
            ) : null}

            {phase && selectedPhaseObj ? (
              <FilterChip
                label={`Etapa: ${selectedPhaseObj.label}`}
                onRemove={() => onPhaseChange("")}
              />
            ) : null}

            {sort !== "recommended" ? (
              <FilterChip
                label={`Ordem: ${SORT_LABELS[sort]}`}
                onRemove={() => onSortChange("recommended")}
              />
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}

interface CompactSelectProps {
  icon: ReactNode;
  value: string;
  onChange: (value: string) => void;
  ariaLabel: string;
  children: ReactNode;
}

function CompactSelect({ icon, value, onChange, ariaLabel, children }: CompactSelectProps) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400">
        {icon}
      </span>
      <select
        className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/80 py-2 pl-8 pr-7 text-xs font-bold text-slate-800 outline-none transition hover:bg-white focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={ariaLabel}
      >
        {children}
      </select>
    </div>
  );
}

interface FilterChipProps {
  label: string;
  onRemove: () => void;
}

function FilterChip({ label, onRemove }: FilterChipProps) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-blue-200 bg-blue-50/90 py-0.5 pl-2.5 pr-1 text-[11px] font-bold text-blue-900 shadow-xs transition hover:bg-blue-100">
      <span>{label}</span>
      <button
        type="button"
        onClick={onRemove}
        className="rounded-full p-0.5 text-blue-600 transition hover:bg-blue-200 hover:text-blue-950"
        aria-label={`Remover filtro ${label}`}
      >
        <X size={11} />
      </button>
    </span>
  );
}

