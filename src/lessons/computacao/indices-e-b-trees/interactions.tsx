import { useMemo, useState } from "react";
import { GitBranch, Search, Split } from "lucide-react";
import type { LessonModule } from "../../../types/content";
import { InteractiveShell } from "../../../components/lesson/InteractionPrimitives";
import {
  CalloutCard,
  MetricGrid,
  RangeField,
} from "../sharedPrimitives";

export const interactions = {
  "scan-vs-index-demo": ScanVsIndexDemoInteraction,
  "btree-search-explorer": BtreeSearchExplorerInteraction,
  "node-split-demo": NodeSplitDemoInteraction,
} satisfies LessonModule["interactions"];

function ScanVsIndexDemoInteraction() {
  const [rows, setRows] = useState(5000);
  const [selectivity, setSelectivity] = useState(5);
  const sequentialWork = rows;
  const indexWork = Math.max(20, Math.round(Math.log2(rows) * 10 + (rows * selectivity) / 100));
  const winner = indexWork < sequentialWork ? "Índice" : "Seq scan";

  return (
    <InteractiveShell
      eyebrow="Comparação"
      title="Compare trabalho de busca sequencial e indexada"
      tone="indigo"
      icon={<Search size={18} aria-hidden="true" />}
      description="Ajuste o tamanho da tabela e a seletividade para enxergar quando o atalho estrutural tende a compensar."
    >
      <div className="grid gap-5 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="grid gap-4">
          <RangeField label="Tamanho da tabela" value={rows} min={500} max={10000} step={500} onChange={setRows} />
          <RangeField label="Percentual retornado" value={selectivity} min={1} max={100} step={1} onChange={setSelectivity} />
          <MetricGrid
            metrics={[
              { label: "Trabalho seq scan", value: `${sequentialWork}` },
              { label: "Trabalho com índice", value: `${indexWork}` },
              { label: "Vencedor provável", value: winner },
              { label: "Seletividade", value: `${selectivity}%` },
            ]}
          />
        </div>
        <div className="grid gap-4">
          {[
            { label: "Seq scan", value: sequentialWork / rows, color: "#94a3b8" },
            { label: "Índice", value: Math.min(1, indexWork / rows), color: "#4f46e5" },
          ].map((bar) => (
            <div key={bar.label} className="rounded-3xl border border-slate-100 bg-white p-4">
              <div className="flex items-center justify-between text-sm font-black text-slate-700">
                <span>{bar.label}</span>
                <span>{Math.round(bar.value * 100)}%</span>
              </div>
              <div className="mt-3 h-4 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full rounded-full transition-[width]" style={{ width: `${bar.value * 100}%`, backgroundColor: bar.color }} />
              </div>
            </div>
          ))}
          <CalloutCard
            title="Leitura"
            body={
              winner === "Índice"
                ? "A consulta toca uma parcela pequena da tabela, então navegar pela estrutura indexada tende a evitar muito trabalho cego."
                : "Como a consulta quer grande parte dos dados, o custo de pular pelo índice deixa de compensar tanto quanto parece."
            }
            tone="indigo"
          />
        </div>
      </div>
    </InteractiveShell>
  );
}

function BtreeSearchExplorerInteraction() {
  const [target, setTarget] = useState(27);
  const rootPivot = target < 20 ? "<20" : target < 50 ? "20..49" : ">=50";
  const leaf =
    target < 20 ? [5, 9, 13, 18] : target < 50 ? [22, 27, 31, 42] : [50, 61, 74, 88];
  const found = leaf.includes(target);

  return (
    <InteractiveShell
      eyebrow="Busca"
      title="Desça por uma B-Tree simplificada"
      tone="emerald"
      icon={<GitBranch size={18} aria-hidden="true" />}
      description="Escolha uma chave alvo e acompanhe o caminho por separadores até a folha relevante."
    >
      <div className="grid gap-5 lg:grid-cols-[0.78fr_1.22fr]">
        <div className="grid gap-4">
          <RangeField label="Chave procurada" value={target} min={1} max={90} step={1} onChange={setTarget} />
          <MetricGrid
            metrics={[
              { label: "Faixa escolhida", value: rootPivot },
              { label: "Folha visitada", value: `[${leaf.join(", ")}]` },
              { label: "Encontrada?", value: found ? "Sim" : "Não" },
              { label: "Níveis percorridos", value: "2" },
            ]}
          />
        </div>
        <div className="grid gap-4">
          <div className="rounded-3xl border border-emerald-100 bg-white p-5">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700">Caminho lógico</p>
            <div className="mt-4 grid gap-2 text-sm leading-6 text-slate-700">
              <p>1. Compare {target} com os separadores da raiz.</p>
              <p>2. Escolha a faixa {rootPivot}.</p>
              <p>3. Desça até a folha {leaf.join(", ")}.</p>
              <p>4. {found ? `A chave ${target} aparece na folha.` : `A chave ${target} não está na folha visitada.`}</p>
            </div>
          </div>
          <CalloutCard
            title="Leitura"
            body="O poder da B-Tree está em descartar grandes blocos do espaço de busca a cada nível, mantendo a profundidade pequena."
            tone="emerald"
          />
        </div>
      </div>
    </InteractiveShell>
  );
}

function NodeSplitDemoInteraction() {
  const [inserted, setInserted] = useState(5);
  const original = [10, 20, 30, 40];
  const candidate = original.concat(inserted).sort((a, b) => a - b);
  const middleIndex = Math.floor(candidate.length / 2);
  const promoted = candidate[middleIndex];
  const left = candidate.slice(0, middleIndex);
  const right = candidate.slice(middleIndex + 1);

  return (
    <InteractiveShell
      eyebrow="Manutenção"
      title="Insira uma chave e observe o split"
      tone="rose"
      icon={<Split size={18} aria-hidden="true" />}
      description="Quando um nó está cheio, inserir um novo valor pode exigir dividir a estrutura e promover uma chave para cima."
    >
      <div className="grid gap-5 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="grid gap-4">
          <RangeField label="Nova chave" value={inserted} min={1} max={50} step={1} onChange={setInserted} />
          <MetricGrid
            metrics={[
              { label: "Nó original", value: `[${original.join(", ")}]` },
              { label: "Nó cheio + nova chave", value: `[${candidate.join(", ")}]` },
              { label: "Chave promovida", value: `${promoted}` },
              { label: "Resultado", value: "split em 2 folhas" },
            ]}
          />
        </div>
        <div className="grid gap-4">
          <div className="rounded-3xl border border-rose-100 bg-white p-5">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-rose-700">Após o split</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 px-4 py-4 text-center text-sm font-black text-slate-700">
                esquerda: [{left.join(", ")}]
              </div>
              <div className="rounded-2xl bg-slate-50 px-4 py-4 text-center text-sm font-black text-slate-700">
                direita: [{right.join(", ")}]
              </div>
            </div>
          </div>
          <CalloutCard
            title="Leitura"
            body="O split preserva ordem e equilíbrio. É exatamente esse tipo de manutenção que torna leituras rápidas possíveis, mas adiciona custo às escritas."
            tone="rose"
          />
        </div>
      </div>
    </InteractiveShell>
  );
}
