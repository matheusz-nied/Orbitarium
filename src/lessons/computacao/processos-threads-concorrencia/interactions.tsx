import { useMemo, useState } from "react";
import { GitBranch, Lock, Split } from "lucide-react";
import type { LessonModule } from "../../../types/content";
import { InteractiveShell } from "../../../components/lesson/InteractionPrimitives";
import {
  CalloutCard,
  MetricGrid,
  RangeField,
  TogglePills,
} from "../sharedPrimitives";

export const interactions = {
  "process-thread-memory": ProcessThreadMemoryInteraction,
  "race-condition-lab": RaceConditionLabInteraction,
  "deadlock-graph": DeadlockGraphInteraction,
} satisfies LessonModule["interactions"];

function ProcessThreadMemoryInteraction() {
  const [mode, setMode] = useState("threads");

  return (
    <InteractiveShell
      eyebrow="Comparação"
      title="Veja o que é compartilhado e o que é isolado"
      tone="indigo"
      icon={<Split size={18} aria-hidden="true" />}
      description="Alterne entre processos separados e threads do mesmo processo para enxergar por que custo e risco mudam."
    >
      <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="grid gap-4">
          <TogglePills
            value={mode}
            onChange={setMode}
            options={[
              { value: "processes", label: "Processos separados" },
              { value: "threads", label: "Threads do mesmo processo" },
            ]}
          />
          <CalloutCard
            title="Leitura"
            body={
              mode === "threads"
                ? "Threads compartilham heap, dados globais e arquivos abertos. A comunicação é barata, mas a chance de interferência é maior."
                : "Processos separados reduzem interferência direta porque cada um carrega espaço de endereços próprio e fronteiras mais fortes."
            }
            tone="indigo"
          />
        </div>
        <div className="rounded-3xl border border-indigo-100 bg-white p-5">
          {mode === "threads" ? (
            <div className="grid gap-4">
              <div className="rounded-3xl bg-indigo-50 p-4 text-center">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-indigo-700">Compartilhado</p>
                <p className="mt-2 text-sm font-bold text-slate-700">código • heap • arquivos • dados globais</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {["Thread A", "Thread B", "Thread C"].map((label) => (
                  <div key={label} className="rounded-3xl border border-indigo-100 p-4 text-center">
                    <p className="font-black text-slate-950">{label}</p>
                    <p className="mt-2 text-xs text-slate-500">pilha própria</p>
                    <p className="text-xs text-slate-500">registradores próprios</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {["Processo A", "Processo B"].map((label) => (
                <div key={label} className="rounded-3xl border border-indigo-100 p-4">
                  <p className="font-black text-slate-950">{label}</p>
                  <div className="mt-3 grid gap-2">
                    {["código", "heap", "pilha", "arquivos do processo"].map((item) => (
                      <div key={item} className="rounded-2xl bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-600">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </InteractiveShell>
  );
}

function RaceConditionLabInteraction() {
  const [operations, setOperations] = useState(12);
  const [withLock, setWithLock] = useState("no");

  const expected = operations * 2;
  const lostUpdates = Math.max(1, Math.round(operations * 0.35));
  const observed = withLock === "yes" ? expected : expected - lostUpdates;

  return (
    <InteractiveShell
      eyebrow="Bug clássico"
      title="Experimente uma condição de corrida"
      tone="rose"
      icon={<GitBranch size={18} aria-hidden="true" />}
      description="Duas threads incrementam o mesmo contador. Ative ou desative o lock para ver a diferença entre valor esperado e valor observado."
    >
      <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="grid gap-4">
          <RangeField
            label="Incrementos por thread"
            value={operations}
            min={4}
            max={30}
            step={1}
            onChange={setOperations}
            hint="Cada thread executa a mesma operação sobre um contador compartilhado."
          />
          <TogglePills
            value={withLock}
            onChange={setWithLock}
            options={[
              { value: "no", label: "Sem lock" },
              { value: "yes", label: "Com lock" },
            ]}
          />
          <MetricGrid
            metrics={[
              { label: "Valor esperado", value: `${expected}` },
              { label: "Valor observado", value: `${observed}` },
              { label: "Perdas", value: `${expected - observed}` },
              { label: "Proteção", value: withLock === "yes" ? "Mutex" : "Nenhuma" },
            ]}
          />
        </div>
        <div className="grid gap-4">
          <div className="rounded-3xl border border-rose-100 bg-white p-5">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-rose-700">Interleaving simplificado</p>
            <div className="mt-4 grid gap-2 text-sm text-slate-700">
              {withLock === "yes" ? (
                <>
                  <p>1. Thread A entra na seção crítica e lê o contador.</p>
                  <p>2. Thread A soma, escreve e libera o lock.</p>
                  <p>3. Thread B entra depois e repete o processo.</p>
                  <p>4. Nenhum incremento se perde.</p>
                </>
              ) : (
                <>
                  <p>1. Thread A lê o valor antigo.</p>
                  <p>2. Thread B também lê o mesmo valor antigo.</p>
                  <p>3. Ambas escrevem versões conflitantes.</p>
                  <p>4. Parte dos incrementos desaparece.</p>
                </>
              )}
            </div>
          </div>
          <CalloutCard
            title="Diagnóstico"
            body={
              withLock === "yes"
                ? "O lock serializa a seção crítica: você perde paralelismo local, mas preserva o invariante do contador."
                : "Sem protocolo de acesso, o resultado depende da ordem oculta dos eventos. O bug pode sumir em uma execução e reaparecer em outra."
            }
            tone={withLock === "yes" ? "emerald" : "rose"}
          />
        </div>
      </div>
    </InteractiveShell>
  );
}

function DeadlockGraphInteraction() {
  const [orderA, setOrderA] = useState("A-then-B");
  const [orderB, setOrderB] = useState("B-then-A");
  const deadlock = orderA !== orderB;

  return (
    <InteractiveShell
      eyebrow="Armadilha"
      title="Monte ou desmonte um deadlock"
      tone="amber"
      icon={<Lock size={18} aria-hidden="true" />}
      description="Escolha a ordem de aquisição de locks por duas threads. Observe como consistência na ordem ajuda a eliminar ciclos de espera."
    >
      <div className="grid gap-5 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="grid gap-4">
          <div className="rounded-3xl border border-amber-100 bg-white p-4">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-amber-700">Thread A</p>
            <TogglePills
              value={orderA}
              onChange={setOrderA}
              options={[
                { value: "A-then-B", label: "Lock A → Lock B" },
                { value: "B-then-A", label: "Lock B → Lock A" },
              ]}
            />
          </div>
          <div className="rounded-3xl border border-amber-100 bg-white p-4">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-amber-700">Thread B</p>
            <TogglePills
              value={orderB}
              onChange={setOrderB}
              options={[
                { value: "A-then-B", label: "Lock A → Lock B" },
                { value: "B-then-A", label: "Lock B → Lock A" },
              ]}
            />
          </div>
          <MetricGrid
            metrics={[
              { label: "Ordem A", value: orderA === "A-then-B" ? "A → B" : "B → A" },
              { label: "Ordem B", value: orderB === "A-then-B" ? "A → B" : "B → A" },
              { label: "Ciclo de espera", value: deadlock ? "Possível" : "Evitado" },
              { label: "Política", value: deadlock ? "Inconsistente" : "Consistente" },
            ]}
          />
        </div>
        <div className="grid gap-4">
          <div className="rounded-3xl border border-amber-100 bg-white p-5">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-amber-700">Leitura do cenário</p>
            <div className="mt-4 grid gap-3 text-sm leading-6 text-slate-700">
              <p>Thread A: {orderA === "A-then-B" ? "segura Lock A e depois pede Lock B." : "segura Lock B e depois pede Lock A."}</p>
              <p>Thread B: {orderB === "A-then-B" ? "segura Lock A e depois pede Lock B." : "segura Lock B e depois pede Lock A."}</p>
              <p>
                {deadlock
                  ? "Como a ordem diverge, existe um caminho em que cada thread segura um lock e espera indefinidamente pelo outro."
                  : "Como a ordem coincide, a espera pode existir, mas não fecha um ciclo circular permanente."}
              </p>
            </div>
          </div>
          <CalloutCard
            title={deadlock ? "Risco de deadlock" : "Deadlock prevenido"}
            body={
              deadlock
                ? "Ordem inconsistente de aquisição cria a pré-condição mais comum para espera circular."
                : "Definir uma ordem global para locks é uma técnica simples e poderosa de prevenção."
            }
            tone={deadlock ? "rose" : "emerald"}
          />
        </div>
      </div>
    </InteractiveShell>
  );
}
