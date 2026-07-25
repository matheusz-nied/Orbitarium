import { useMemo, useState } from "react";
import { Clock3, Database, Search } from "lucide-react";
import type { LessonModule } from "../../../types/content";
import { InteractiveShell } from "../../../components/lesson/InteractionPrimitives";
import {
  CalloutCard,
  MetricGrid,
  RangeField,
  TogglePills,
} from "../sharedPrimitives";

export const interactions = {
  "query-planner-demo": QueryPlannerDemoInteraction,
  "transaction-timeline": TransactionTimelineInteraction,
  "buffer-cache-demo": BufferCacheDemoInteraction,
} satisfies LessonModule["interactions"];

function QueryPlannerDemoInteraction() {
  const [rows, setRows] = useState(1000);
  const [selectivity, setSelectivity] = useState(10);
  const filteredRows = Math.max(1, Math.round((rows * selectivity) / 100));
  const useIndex = selectivity <= 15;

  return (
    <InteractiveShell
      eyebrow="Planner"
      title="Quando o índice tende a vencer a varredura?"
      tone="indigo"
      icon={<Search size={18} aria-hidden="true" />}
      description="Ajuste o tamanho da tabela e a seletividade do filtro para visualizar por que o planner nem sempre escolhe índice."
    >
      <div className="grid gap-5 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="grid gap-4">
          <RangeField label="Linhas na tabela" value={rows} min={200} max={5000} step={200} onChange={setRows} />
          <RangeField
            label="Percentual de linhas desejadas"
            value={selectivity}
            min={1}
            max={100}
            step={1}
            onChange={setSelectivity}
          />
          <MetricGrid
            metrics={[
              { label: "Linhas estimadas", value: `${filteredRows}` },
              { label: "Seletividade", value: `${selectivity}%` },
              { label: "Plano provável", value: useIndex ? "Índice" : "Seq Scan" },
              { label: "Leitura", value: useIndex ? "poucas linhas" : "muita tabela" },
            ]}
          />
        </div>
        <div className="grid gap-4">
          <CalloutCard
            title="Leitura"
            body={
              useIndex
                ? "Quando o filtro busca uma fração pequena da tabela, uma estrutura auxiliar tende a economizar trabalho e reduzir leitura desnecessária."
                : "Se grande parte da tabela será tocada, a varredura sequencial pode ser mais simples e mais barata do que saltar em muitas entradas de índice."
            }
            tone="indigo"
          />
          <div className="rounded-3xl border border-indigo-100 bg-white p-5">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-indigo-700">Comparação visual</p>
            <div className="mt-4 h-4 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-indigo-600" style={{ width: `${selectivity}%` }} />
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Faixa colorida representa a parte da tabela que a consulta provavelmente precisa tocar. Quanto menor essa faixa, mais atraente tende a ficar um caminho apoiado por índice.
            </p>
          </div>
        </div>
      </div>
    </InteractiveShell>
  );
}

function TransactionTimelineInteraction() {
  const [action, setAction] = useState("commit");
  const visibleToB = action === "commit" ? "novo saldo visível" : "valor antigo permanece";

  return (
    <InteractiveShell
      eyebrow="Transações"
      title="Veja commit e rollback mudarem o desfecho"
      tone="rose"
      icon={<Clock3 size={18} aria-hidden="true" />}
      description="A transação A altera dados; a sessão B tenta ler o resultado. Compare o fim com commit e com rollback."
    >
      <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="grid gap-4">
          <TogglePills
            value={action}
            onChange={setAction}
            options={[
              { value: "commit", label: "A confirma" },
              { value: "rollback", label: "A desfaz" },
            ]}
          />
          <MetricGrid
            metrics={[
              { label: "Sessão A", value: action === "commit" ? "confirmada" : "desfeita" },
              { label: "Sessão B", value: visibleToB },
              { label: "Unidade lógica", value: "preservada" },
              { label: "Resultado final", value: action === "commit" ? "mudança persiste" : "mudança some" },
            ]}
          />
        </div>
        <div className="grid gap-4">
          <div className="rounded-3xl border border-rose-100 bg-white p-5">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-rose-700">Linha do tempo simplificada</p>
            <div className="mt-4 grid gap-2 text-sm leading-6 text-slate-700">
              <p>1. Sessão A inicia transação e atualiza um registro.</p>
              <p>2. Sessão B consulta o dado segundo a política de visibilidade.</p>
              <p>3. Sessão A {action === "commit" ? "executa COMMIT." : "executa ROLLBACK."}</p>
              <p>4. Sessão B observa: {visibleToB}.</p>
            </div>
          </div>
          <CalloutCard
            title="Leitura"
            body={
              action === "commit"
                ? "Commit transforma a alteração em estado oficialmente confirmado para consultas futuras segundo as regras de visibilidade."
                : "Rollback impede que a alteração se torne estado final. A aplicação volta a um ponto consistente anterior."
            }
            tone={action === "commit" ? "emerald" : "rose"}
          />
        </div>
      </div>
    </InteractiveShell>
  );
}

function BufferCacheDemoInteraction() {
  const [hotPages, setHotPages] = useState(4);
  const [cachePages, setCachePages] = useState(6);

  const hitRate = Math.min(100, Math.round((Math.min(hotPages, cachePages) / hotPages) * 100));
  const status = cachePages >= hotPages ? "dados quentes cabem" : "pressão de cache";

  const visiblePages = useMemo(
    () =>
      Array.from({ length: 10 }).map((_, index) => ({
        id: index + 1,
        hot: index < hotPages,
        cached: index < cachePages,
      })),
    [hotPages, cachePages],
  );

  return (
    <InteractiveShell
      eyebrow="Cache"
      title="Aqueça ou esfrie o conjunto de páginas"
      tone="amber"
      icon={<Database size={18} aria-hidden="true" />}
      description="Compare quantas páginas a aplicação acessa com quantas cabem no buffer cache para enxergar o impacto em leituras repetidas."
    >
      <div className="grid gap-5 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="grid gap-4">
          <RangeField label="Páginas quentes do workload" value={hotPages} min={2} max={10} step={1} onChange={setHotPages} />
          <RangeField label="Páginas no buffer cache" value={cachePages} min={2} max={10} step={1} onChange={setCachePages} />
          <MetricGrid
            metrics={[
              { label: "Taxa de hit estimada", value: `${hitRate}%` },
              { label: "Status", value: status },
              { label: "Páginas quentes", value: `${hotPages}` },
              { label: "Capacidade de cache", value: `${cachePages}` },
            ]}
          />
        </div>
        <div className="grid gap-4">
          <div className="rounded-3xl border border-amber-100 bg-white p-5">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-amber-700">Mapa simplificado</p>
            <div className="mt-4 grid grid-cols-5 gap-3">
              {visiblePages.map((page) => (
                <div
                  key={page.id}
                  className={`rounded-2xl px-3 py-4 text-center text-sm font-black ${
                    page.hot && page.cached
                      ? "bg-emerald-100 text-emerald-700"
                      : page.hot
                        ? "bg-rose-100 text-rose-700"
                        : page.cached
                          ? "bg-amber-100 text-amber-700"
                          : "bg-slate-100 text-slate-400"
                  }`}
                >
                  P{page.id}
                </div>
              ))}
            </div>
          </div>
          <CalloutCard
            title="Leitura"
            body={
              cachePages >= hotPages
                ? "O conjunto de páginas mais acessadas cabe no cache. O banco tende a reler mais da memória do que do armazenamento."
                : "Parte do conjunto quente fica de fora. Leituras repetidas pressionam I/O e aumentam a chance de páginas úteis serem expulsas."
            }
            tone={cachePages >= hotPages ? "emerald" : "amber"}
          />
        </div>
      </div>
    </InteractiveShell>
  );
}
