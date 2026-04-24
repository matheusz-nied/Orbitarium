import { motion } from "motion/react";
import { BookOpen, Compass, Layers, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { CategoryCard } from "../components/CategoryCard";
import { ContentCard } from "../components/ContentCard";
import { SearchBar } from "../components/SearchBar";
import { categories, contents, getCategoryById } from "../data/content";

function normalizeSearch(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export function HomePage() {
  const [search, setSearch] = useState("");

  const filteredContents = useMemo(() => {
    const query = normalizeSearch(search.trim());

    if (!query) {
      return contents;
    }

    return contents.filter((content) => {
      const primaryCategory = getCategoryById(content.primaryCategoryId)?.name ?? "";
      const secondaryCategory = content.secondaryCategoryId
        ? getCategoryById(content.secondaryCategoryId)?.name
        : "";
      const searchableText = [
        content.title,
        content.description,
        primaryCategory,
        secondaryCategory,
        content.level,
        ...content.tags,
      ].join(" ");

      return normalizeSearch(searchableText).includes(query);
    });
  }, [search]);

  return (
    <>
      <section className="relative isolate overflow-hidden px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,#dbeafe_0,transparent_32%),radial-gradient(circle_at_80%_10%,#ffedd5_0,transparent_30%),linear-gradient(135deg,#fafaf9,#f8fafc)]" />
        <div className="absolute left-1/2 top-14 -z-10 h-64 w-[42rem] -translate-x-1/2 rounded-full bg-white/70 blur-3xl" />

        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-bold text-slate-700 shadow-sm">
              <Sparkles size={16} aria-hidden="true" />
              Plataforma pessoal de estudo profundo
            </span>
            <h1 className="mt-7 max-w-4xl font-display text-5xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-6xl lg:text-7xl">
              Mapa de Estudos Interativos
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
              Conteúdos visuais, progressivos e interativos para estudar temas complexos com
              profundidade.
            </p>
            <div className="mt-9 max-w-2xl">
              <SearchBar value={search} onChange={setSearch} />
            </div>
          </motion.div>

          <motion.div
            className="rounded-[2.25rem] border border-white/70 bg-slate-950 p-5 text-white shadow-2xl shadow-slate-900/20"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.55 }}
          >
            <div className="rounded-[1.7rem] bg-[linear-gradient(145deg,#111827,#172554)] p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.22em] text-blue-200">
                    Aula em destaque
                  </p>
                  <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight">
                    Newton, movimento e o nascimento do cálculo
                  </h2>
                </div>
                <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-white/10">
                  <Compass size={26} aria-hidden="true" />
                </span>
              </div>
              <div className="mt-8 grid gap-3">
                {["velocidade instantânea", "secante e tangente", "acumulação contínua"].map(
                  (item, index) => (
                    <div
                      className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                      key={item}
                    >
                      <span className="text-sm font-semibold text-blue-50">{item}</span>
                      <span className="font-mono text-sm text-blue-200">0{index + 1}</span>
                    </div>
                  ),
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-blue-700">
              Categorias
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Escolha uma trilha de estudo
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-slate-600">
            A estrutura já está preparada para receber novos temas sem mudar o layout principal.
          </p>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard category={category} key={category.id} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-orange-700">
              Conteúdos
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Aulas disponíveis
            </h2>
          </div>
          <p className="text-sm font-semibold text-slate-500">
            {filteredContents.length} conteúdo{filteredContents.length === 1 ? "" : "s"}
          </p>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {filteredContents.map((content) => (
            <ContentCard content={content} key={content.id} />
          ))}
        </div>

        {filteredContents.length === 0 ? (
          <div className="mt-8 rounded-[2rem] border border-dashed border-slate-300 bg-white p-8 text-center">
            <p className="font-semibold text-slate-950">Nenhum conteúdo encontrado.</p>
            <p className="mt-2 text-sm text-slate-600">Tente buscar por Newton, cálculo ou matemática.</p>
          </div>
        ) : null}
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 pb-20 sm:px-6 lg:px-8">
        <div className="rounded-[2.5rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <span className="grid size-14 place-items-center rounded-2xl bg-emerald-100 text-emerald-700">
                <BookOpen size={26} aria-hidden="true" />
              </span>
              <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-slate-950">
                Como estudar por aqui
              </h2>
              <p className="mt-4 leading-7 text-slate-600">
                Cada conteúdo combina explicação progressiva, diagramas e revisão para transformar
                temas densos em uma sequência de estudo clara.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "visão geral do tema",
                "explicação progressiva",
                "diagramas e ilustrações",
                "blocos de definição",
                "exemplos e erros comuns",
                "revisão e perguntas",
              ].map((item) => (
                <div className="rounded-2xl bg-slate-50 p-4" key={item}>
                  <Layers className="text-slate-500" size={18} aria-hidden="true" />
                  <p className="mt-3 text-sm font-bold text-slate-800">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
