import { useMemo, useState } from "react";
import { Cpu, Shield, SlidersHorizontal } from "lucide-react";
import type { LessonModule } from "../../../types/content";
import { InteractiveShell } from "../../../components/lesson/InteractionPrimitives";
import {
  CalloutCard,
  MetricGrid,
  RangeField,
  StepDots,
  TogglePills,
} from "../sharedPrimitives";

export const interactions = {
  "user-kernel-bridge": UserKernelBridgeInteraction,
  "scheduler-lab": SchedulerLabInteraction,
  "resource-pressure-lab": ResourcePressureLabInteraction,
} satisfies LessonModule["interactions"];

const syscallActions = {
  "open-file": {
    label: "Abrir arquivo",
    user: "Sua aplicação pede para abrir /dados/clientes.csv.",
    kernel: "O kernel valida caminho, permissões e resolve o sistema de arquivos.",
    hardware: "Se necessário, o driver acessa o dispositivo de armazenamento.",
    result: "Um descritor de arquivo volta para a aplicação continuar operando.",
  },
  "read-network": {
    label: "Ler rede",
    user: "Seu cliente HTTP chama recv() para receber bytes.",
    kernel: "A pilha de rede verifica buffers e o estado da conexão.",
    hardware: "Se os pacotes ainda não chegaram, a placa de rede e interrupções entram em jogo.",
    result: "A leitura devolve bytes disponíveis ou faz a thread esperar.",
  },
  "spawn-process": {
    label: "Criar processo",
    user: "Um terminal pede para executar um novo programa.",
    kernel: "O kernel cria estruturas de processo, herda contexto necessário e agenda a nova tarefa.",
    hardware: "A CPU não cria o processo sozinha; ela só executa as instruções quando o kernel permitir.",
    result: "O novo processo ganha PID, memória e chance de disputar CPU.",
  },
  "alloc-memory": {
    label: "Alocar memória",
    user: "Uma biblioteca pede mais espaço para armazenar objetos.",
    kernel: "O kernel atualiza mapeamentos e permissões do espaço de endereços.",
    hardware: "MMU e tabelas de páginas participam da tradução quando a memória for usada.",
    result: "A aplicação enxerga um bloco a mais, mas a implementação real é toda mediada.",
  },
};

function UserKernelBridgeInteraction() {
  const [action, setAction] = useState<keyof typeof syscallActions>("open-file");
  const selected = syscallActions[action];

  return (
    <InteractiveShell
      eyebrow="Interação"
      title="Acompanhe uma chamada de sistema"
      tone="rose"
      icon={<Shield size={18} aria-hidden="true" />}
      description="Escolha uma ação comum e veja como a solicitação sai do programa, entra no kernel e só então alcança o recurso real."
    >
      <div className="grid gap-5 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="grid gap-4">
          <TogglePills
            value={action}
            onChange={(value) => setAction(value as keyof typeof syscallActions)}
            options={Object.entries(syscallActions).map(([value, item]) => ({
              value,
              label: item.label,
            }))}
          />
          <CalloutCard
            title="Ideia central"
            body="Aplicações pedem; o kernel valida, coordena e decide. Isso evita acesso direto e irrestrito ao hardware."
            tone="rose"
          />
        </div>
        <div className="grid gap-3">
          {[
            { eyebrow: "1. Aplicação", text: selected.user, bg: "bg-white" },
            { eyebrow: "2. Kernel", text: selected.kernel, bg: "bg-rose-50" },
            { eyebrow: "3. Hardware / driver", text: selected.hardware, bg: "bg-white" },
            { eyebrow: "4. Resposta", text: selected.result, bg: "bg-rose-50" },
          ].map((step) => (
            <div key={step.eyebrow} className={`rounded-3xl border border-rose-100 p-4 ${step.bg}`}>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-rose-700">{step.eyebrow}</p>
              <p className="mt-2 text-sm leading-6 text-slate-700">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </InteractiveShell>
  );
}

function SchedulerLabInteraction() {
  const [quantum, setQuantum] = useState(2);
  const [processes, setProcesses] = useState(3);
  const processLabels = ["A", "B", "C", "D"].slice(0, processes);

  const slots = useMemo(() => {
    const result: string[] = [];
    for (let index = 0; index < 12; index += 1) {
      result.push(processLabels[index % processLabels.length]);
    }
    return result;
  }, [processLabels]);

  const fairness = `${Math.round(100 / processes)}% por rodada`;
  const switchCost = processes * Math.max(1, 6 - quantum);
  const responsiveness = quantum <= 2 ? "Alta" : quantum <= 4 ? "Média" : "Baixa";

  return (
    <InteractiveShell
      eyebrow="Laboratório"
      title="Veja o round-robin em ação"
      tone="amber"
      icon={<Cpu size={18} aria-hidden="true" />}
      description="Ajuste o tamanho do quantum e o número de processos para enxergar a troca entre justiça, overhead e responsividade."
    >
      <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="grid gap-4">
          <RangeField
            label="Quantum de CPU"
            value={quantum}
            min={1}
            max={5}
            step={1}
            onChange={setQuantum}
            hint="Quanta curtos deixam a máquina mais responsiva, mas aumentam as trocas de contexto."
          />
          <RangeField
            label="Processos concorrentes"
            value={processes}
            min={2}
            max={4}
            step={1}
            onChange={setProcesses}
            hint="Mais processos competindo significam filas maiores e mais decisões do escalonador."
          />
          <MetricGrid
            metrics={[
              { label: "Justiça por rodada", value: fairness },
              { label: "Responsividade", value: responsiveness },
              { label: "Trocas estimadas", value: `${switchCost}` },
              { label: "Processos ativos", value: `${processes}` },
            ]}
          />
          <CalloutCard
            title="Leitura rápida"
            body={
              quantum <= 2
                ? "Você priorizou interatividade. Cada tarefa espera menos para voltar à CPU, mas o kernel gasta mais energia administrativa trocando contexto."
                : quantum >= 4
                  ? "Você favoreceu throughput bruto. Cada tarefa roda por mais tempo, porém aplicativos interativos podem parecer menos responsivos."
                  : "Você está num meio-termo clássico: alguma fluidez sem explosão de overhead."
            }
            tone="amber"
          />
        </div>
        <div className="rounded-3xl border border-amber-100 bg-white p-5">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-amber-700">Linha do tempo da CPU</p>
          <div className="mt-4 grid gap-3">
            {slots.map((slot, index) => (
              <div key={`${slot}-${index}`} className="grid gap-1">
                <div className="flex items-center justify-between text-xs font-black text-slate-500">
                  <span>Slot {index + 1}</span>
                  <span>{slot}</span>
                </div>
                <div className="h-10 overflow-hidden rounded-2xl bg-slate-100">
                  <div
                    className="flex h-full items-center justify-center rounded-2xl text-sm font-black text-slate-950"
                    style={{
                      width: `${Math.min(100, 24 + quantum * 14)}%`,
                      backgroundColor: ["#fde68a", "#fdba74", "#a7f3d0", "#c4b5fd"][processLabels.indexOf(slot)],
                    }}
                  >
                    {slot}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between">
            <StepDots activeIndex={quantum - 1} total={5} />
            <p className="text-xs font-bold text-slate-500">quantum atual = {quantum}</p>
          </div>
        </div>
      </div>
    </InteractiveShell>
  );
}

function ResourcePressureLabInteraction() {
  const [cpu, setCpu] = useState(62);
  const [memory, setMemory] = useState(55);
  const [io, setIo] = useState(30);

  const dominant = useMemo(() => {
    const pairs = [
      { key: "CPU", value: cpu, explanation: "O escalonador e a fila de execução ficam mais pressionados." },
      { key: "Memória", value: memory, explanation: "O sistema tende a disputar páginas, cache e possivelmente sofrer mais faltas." },
      { key: "E/S", value: io, explanation: "Filas de disco ou rede podem aumentar e mais threads ficam bloqueadas esperando." },
    ];
    return pairs.sort((a, b) => b.value - a.value)[0];
  }, [cpu, memory, io]);

  const overall = Math.round((cpu + memory + io) / 3);
  const status =
    overall < 40 ? "Folga" : overall < 70 ? "Operação estável com atenção" : "Pressão elevada";

  return (
    <InteractiveShell
      eyebrow="Simulação"
      title="Pressione CPU, memória e E/S"
      tone="indigo"
      icon={<SlidersHorizontal size={18} aria-hidden="true" />}
      description="Suba a demanda de cada recurso e veja qual papel o sistema operacional passa a desempenhar com mais intensidade."
    >
      <div className="grid gap-5 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="grid gap-4">
          <RangeField label="Demanda de CPU" value={cpu} min={0} max={100} step={1} onChange={setCpu} />
          <RangeField label="Demanda de memória" value={memory} min={0} max={100} step={1} onChange={setMemory} />
          <RangeField label="Demanda de E/S" value={io} min={0} max={100} step={1} onChange={setIo} />
          <MetricGrid
            metrics={[
              { label: "Pressão média", value: `${overall}%` },
              { label: "Status", value: status },
              { label: "Recurso dominante", value: dominant.key },
              { label: "Resposta principal", value: dominant.explanation.split(".")[0] },
            ]}
          />
        </div>
        <div className="grid gap-4">
          {[
            { label: "CPU", value: cpu, color: "#2563eb" },
            { label: "Memória", value: memory, color: "#7c3aed" },
            { label: "E/S", value: io, color: "#ea580c" },
          ].map((item) => (
            <div key={item.label} className="rounded-3xl border border-slate-100 bg-white p-4">
              <div className="flex items-center justify-between text-sm font-black text-slate-700">
                <span>{item.label}</span>
                <span className="font-mono">{item.value}%</span>
              </div>
              <div className="mt-3 h-4 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full transition-[width]"
                  style={{ width: `${item.value}%`, backgroundColor: item.color }}
                />
              </div>
            </div>
          ))}
          <CalloutCard
            title="Leitura do cenário"
            body={`${dominant.key} é o gargalo atual. ${dominant.explanation} É por isso que o sistema operacional não é apenas 'um launcher de programas': ele reage continuamente ao tipo de pressão que a carga impõe.`}
            tone="indigo"
          />
        </div>
      </div>
    </InteractiveShell>
  );
}
