import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <label className="group relative block">
      <span className="sr-only">Pesquisar conteúdos</span>
      <Search
        className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 transition group-focus-within:text-blue-600"
        size={20}
        aria-hidden="true"
      />
      <input
        className="w-full rounded-[1.75rem] border border-slate-200 bg-white/90 py-4 pl-14 pr-5 text-base font-medium text-slate-900 shadow-xl shadow-slate-900/5 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        type="search"
        value={value}
        placeholder="Pesquisar por título, categoria ou tag..."
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}
