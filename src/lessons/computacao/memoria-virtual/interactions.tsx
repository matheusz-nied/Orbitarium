import { useMemo, useState } from "react";
import { Database, Layers, Map } from "lucide-react";
import type { LessonModule } from "../../../types/content";
import { InteractiveShell } from "../../../components/lesson/InteractionPrimitives";
import {
  CalloutCard,
  MetricGrid,
  RangeField,
  TogglePills,
} from "../sharedPrimitives";

export const interactions = {
  "address-translation-lab": AddressTranslationLabInteraction,
  "tlb-cache-demo": TlbCacheDemoInteraction,
  "page-fault-path": PageFaultPathInteraction,
} satisfies LessonModule["interactions"];

function AddressTranslationLabInteraction() {
  const [virtualAddress, setVirtualAddress] = useState(173);
  const pageSize = 32;
  const vpn = Math.floor(virtualAddress / pageSize);
  const offset = virtualAddress % pageSize;
  const pageTable = [5, 12, 3, 8, 1, 14, 7, 10];
  const physicalFrame = pageTable[vpn] ?? 0;
  const physicalAddress = physicalFrame * pageSize + offset;

  return (
    <InteractiveShell
      eyebrow="Tradução"
      title="Desmonte um endereço virtual"
      tone="indigo"
      icon={<Map size={18} aria-hidden="true" />}
      description="Ajuste o endereço virtual e observe a separação entre número da página e deslocamento, além do frame físico resultante."
    >
      <div className="grid gap-5 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="grid gap-4">
          <RangeField
            label="Endereço virtual"
            value={virtualAddress}
            min={0}
            max={255}
            step={1}
            onChange={setVirtualAddress}
            hint="Nesta simulação, páginas têm 32 bytes e o espaço virtual possui 8 páginas."
          />
          <MetricGrid
            metrics={[
              { label: "Página virtual (VPN)", value: `${vpn}` },
              { label: "Offset", value: `${offset}` },
              { label: "Frame físico", value: `${physicalFrame}` },
              { label: "Endereço físico", value: `${physicalAddress}` },
            ]}
          />
          <CalloutCard
            title="Resumo"
            body="O offset é mantido. O que muda é a tradução da página virtual para o frame físico correspondente."
            tone="indigo"
          />
        </div>
        <div className="rounded-3xl border border-indigo-100 bg-white p-5">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-indigo-700">Tabela simplificada</p>
          <div className="mt-4 grid gap-2">
            {pageTable.map((frame, index) => (
              <div
                key={index}
                className={`grid grid-cols-[1fr_1fr] rounded-2xl px-4 py-3 text-sm font-bold ${
                  index === vpn ? "bg-indigo-600 text-white" : "bg-slate-50 text-slate-700"
                }`}
              >
                <span>Pág. virtual {index}</span>
                <span className="text-right">Frame {frame}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </InteractiveShell>
  );
}

function TlbCacheDemoInteraction() {
  const [pattern, setPattern] = useState("local");
  const accesses =
    pattern === "local" ? [0, 1, 1, 2, 2, 1, 3, 3] : [0, 4, 2, 7, 1, 6, 3, 5];
  const tlbCapacity = 3;

  const result = useMemo(() => {
    const tlb: number[] = [];
    let hits = 0;
    const trace = accesses.map((page) => {
      const hit = tlb.includes(page);
      if (hit) {
        hits += 1;
        tlb.splice(tlb.indexOf(page), 1);
        tlb.unshift(page);
      } else {
        tlb.unshift(page);
        if (tlb.length > tlbCapacity) {
          tlb.pop();
        }
      }
      return { page, hit, snapshot: [...tlb] };
    });
    return { hits, misses: accesses.length - hits, trace };
  }, [accesses]);

  return (
    <InteractiveShell
      eyebrow="Cache"
      title="Veja a TLB premiar localidade"
      tone="violet"
      icon={<Layers size={18} aria-hidden="true" />}
      description="Compare um padrão de acesso local com um padrão espalhado para ver o impacto sobre hits e misses na cache de tradução."
    >
      <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="grid gap-4">
          <TogglePills
            value={pattern}
            onChange={setPattern}
            options={[
              { value: "local", label: "Com localidade" },
              { value: "random", label: "Espalhado" },
            ]}
          />
          <MetricGrid
            metrics={[
              { label: "Hits", value: `${result.hits}` },
              { label: "Misses", value: `${result.misses}` },
              { label: "Taxa de acerto", value: `${Math.round((result.hits / accesses.length) * 100)}%` },
              { label: "Capacidade da TLB", value: `${tlbCapacity} páginas` },
            ]}
          />
          <CalloutCard
            title="Leitura"
            body={
              pattern === "local"
                ? "Páginas próximas e repetidas tendem a reutilizar entradas da TLB. O custo da tradução fica amortizado."
                : "Acessos espalhados expulsam entradas antigas com frequência. O processador precisa recorrer mais vezes às estruturas completas."
            }
            tone="violet"
          />
        </div>
        <div className="rounded-3xl border border-violet-100 bg-white p-5">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-violet-700">Rastro de acessos</p>
          <div className="mt-4 grid gap-2">
            {result.trace.map((step, index) => (
              <div key={`${step.page}-${index}`} className="rounded-2xl bg-slate-50 px-4 py-3">
                <div className="flex items-center justify-between text-sm font-black">
                  <span className="text-slate-700">Acesso {index + 1}: página {step.page}</span>
                  <span className={step.hit ? "text-emerald-700" : "text-rose-700"}>
                    {step.hit ? "hit" : "miss"}
                  </span>
                </div>
                <p className="mt-2 text-xs text-slate-500">TLB após acesso: [{step.snapshot.join(", ")}]</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </InteractiveShell>
  );
}

function PageFaultPathInteraction() {
  const [frames, setFrames] = useState(4);
  const [workingSet, setWorkingSet] = useState(6);
  const pressure = workingSet > frames;
  const faultRate = pressure ? Math.min(95, 25 + (workingSet - frames) * 14) : Math.max(3, 18 - frames);

  return (
    <InteractiveShell
      eyebrow="Falta de página"
      title="Aproxime-se do limite da RAM"
      tone="rose"
      icon={<Database size={18} aria-hidden="true" />}
      description="Ajuste quantos frames físicos estão disponíveis e o tamanho do working set para sentir quando faults viram gargalo."
    >
      <div className="grid gap-5 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="grid gap-4">
          <RangeField
            label="Frames físicos disponíveis"
            value={frames}
            min={2}
            max={8}
            step={1}
            onChange={setFrames}
          />
          <RangeField
            label="Páginas no working set"
            value={workingSet}
            min={2}
            max={10}
            step={1}
            onChange={setWorkingSet}
          />
          <MetricGrid
            metrics={[
              { label: "Working set cabe?", value: pressure ? "Não" : "Sim" },
              { label: "Faults estimados", value: `${faultRate}%` },
              { label: "Frames", value: `${frames}` },
              { label: "Páginas ativas", value: `${workingSet}` },
            ]}
          />
        </div>
        <div className="grid gap-4">
          <div className="rounded-3xl border border-rose-100 bg-white p-5">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-rose-700">Fluxo simplificado</p>
            <div className="mt-4 grid gap-3 text-sm leading-6 text-slate-700">
              <p>1. Processo toca uma página virtual.</p>
              <p>2. Se ela não está presente, a MMU gera fault.</p>
              <p>3. O kernel escolhe carregar a página e talvez substituir outra.</p>
              <p>4. A instrução original é tentada novamente.</p>
            </div>
          </div>
          <CalloutCard
            title={pressure ? "Pressão alta" : "Situação saudável"}
            body={
              pressure
                ? "O working set excede os frames disponíveis. O sistema passa mais tempo rearranjando páginas do que executando trabalho útil."
                : "As páginas ativas cabem melhor na memória física. Faults ainda podem existir, mas não dominam o custo."
            }
            tone={pressure ? "rose" : "emerald"}
          />
        </div>
      </div>
    </InteractiveShell>
  );
}
