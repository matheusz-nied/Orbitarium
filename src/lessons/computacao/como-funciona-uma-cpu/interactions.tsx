import { useMemo, useState } from "react";
import { Cpu, ArrowRightLeft, Workflow } from "lucide-react";
import type { LessonModule } from "../../../types/content";
import {
  InteractiveShell,
  MetricCard,
} from "../../../components/lesson/InteractionPrimitives";

export const interactions = {
  "instruction-cycle-simulator": InstructionCycleSimulatorInteraction,
  "register-transfer-lab": RegisterTransferLabInteraction,
  "alu-decoder-playground": AluDecoderPlaygroundInteraction,
} satisfies LessonModule["interactions"];

type Step = "fetch" | "decode" | "execute" | "writeback";

function InstructionCycleSimulatorInteraction() {
  const [instruction, setInstruction] = useState("ADD R1, R2, R3");
  const [step, setStep] = useState<Step>("fetch");

  const descriptions: Record<string, Record<Step, string>> = {
    "ADD R1, R2, R3": {
      fetch: "O PC aponta para a instrução e a CPU busca seus bits na memória de instruções.",
      decode: "O decodificador identifica um ADD e descobre que deve ler R2 e R3 para escrever em R1.",
      execute: "A ALU soma os valores de R2 e R3.",
      writeback: "O resultado da ALU volta para R1 e o PC avança para a próxima instrução.",
    },
    "LOAD R1, [R2]": {
      fetch: "A CPU busca a instrução apontada pelo PC.",
      decode: "O decodificador vê um LOAD e entende que R2 contém o endereço-base.",
      execute: "A CPU calcula ou encaminha o endereço efetivo para acessar a memória.",
      writeback: "O valor lido da memória é escrito em R1; esse tipo de instrução tende a esperar mais do que um ADD.",
    },
    "BEQ R1, R2, alvo": {
      fetch: "A instrução de branch é buscada pelo PC.",
      decode: "A CPU identifica que deve comparar R1 com R2.",
      execute: "A ALU compara os registradores e decide se a condição é verdadeira.",
      writeback: "Se forem iguais, o PC recebe o endereço alvo; se não, segue em frente.",
    },
  };

  const currentDescription = descriptions[instruction][step];
  const steps: Step[] = ["fetch", "decode", "execute", "writeback"];

  return (
    <InteractiveShell
      eyebrow="Ciclo"
      title="Acompanhe uma instrução atravessando a CPU"
      tone="indigo"
      icon={<Cpu size={18} aria-hidden="true" />}
      description="Troque o tipo de instrução e avance pelas etapas. Assim fica mais fácil perceber que 'executar' significa coordenar fases diferentes."
    >
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-4">
          <SegmentedControl
            label="Instrução"
            options={["ADD R1, R2, R3", "LOAD R1, [R2]", "BEQ R1, R2, alvo"] as const}
            value={instruction}
            onChange={(next) => { setInstruction(next); setStep("fetch"); }}
          />
          <SegmentedControl label="Etapa" options={steps} value={step} onChange={setStep} />
          <div className="rounded-3xl border border-indigo-200 bg-white p-5">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-indigo-700">O que acontece agora</p>
            <p className="mt-3 text-sm leading-7 text-slate-600">{currentDescription}</p>
          </div>
        </div>
        <div className="rounded-3xl border border-indigo-100 bg-white p-5">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-indigo-700">Mapa do ciclo</p>
          <div className="mt-4 grid gap-3">
            {steps.map((candidate, index) => {
              const active = candidate === step;
              return (
                <div
                  className={`rounded-2xl border px-4 py-3 ${active ? "border-indigo-600 bg-indigo-600 text-white" : "border-slate-200 bg-slate-50 text-slate-700"}`}
                  key={candidate}
                >
                  <p className="text-xs font-black uppercase tracking-[0.16em]">{index + 1}. {candidate}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </InteractiveShell>
  );
}

function RegisterTransferLabInteraction() {
  const [instruction, setInstruction] = useState<"MOV" | "ADD">("MOV");
  const [r1, setR1] = useState(3);
  const [r2, setR2] = useState(5);
  const [r3, setR3] = useState(8);

  const result = instruction === "MOV" ? r2 : r2 + r3;
  const explanation =
    instruction === "MOV"
      ? "MOV não calcula: ele apenas copia o valor de R2 para o destino."
      : "ADD lê dois registradores-fonte, usa a ALU e grava o resultado no registrador de destino.";

  return (
    <InteractiveShell
      eyebrow="Registradores"
      title="Observe o fluxo de dados entre registradores"
      tone="rose"
      icon={<ArrowRightLeft size={18} aria-hidden="true" />}
      description="Ajuste os valores e compare uma cópia simples com uma soma. O objetivo é enxergar registradores como origem e destino de quase todo o trabalho local da CPU."
    >
      <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="grid gap-4">
          <SegmentedControl label="Instrução" options={["MOV", "ADD"] as const} value={instruction} onChange={setInstruction} />
          <RangeField label="R1 (destino observado)" value={r1} min={0} max={31} step={1} onChange={setR1} />
          <RangeField label="R2" value={r2} min={0} max={31} step={1} onChange={setR2} />
          <RangeField label="R3" value={r3} min={0} max={31} step={1} onChange={setR3} />
        </div>
        <div className="grid gap-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <MetricCard label="R1 antes" value={String(r1)} />
            <MetricCard label="R1 depois" value={String(result)} />
            <MetricCard label="Fonte 1" value={String(r2)} />
            <MetricCard label="Fonte 2" value={instruction === "ADD" ? String(r3) : "—"} />
          </div>
          <div className="rounded-3xl border border-rose-200 bg-white p-5">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-rose-700">Leitura operacional</p>
            <p className="mt-3 text-sm leading-7 text-slate-600">{explanation}</p>
            <p className="mt-3 font-mono text-lg font-black text-slate-950">
              {instruction === "MOV" ? `R1 <- R2 = ${r2}` : `R1 <- R2 + R3 = ${r2} + ${r3} = ${result}`}
            </p>
          </div>
        </div>
      </div>
    </InteractiveShell>
  );
}

function AluDecoderPlaygroundInteraction() {
  const [operation, setOperation] = useState<"ADD" | "SUB" | "AND" | "XOR" | "SLT">("ADD");
  const [a, setA] = useState(12);
  const [b, setB] = useState(5);

  const result = useMemo(() => {
    switch (operation) {
      case "ADD":
        return a + b;
      case "SUB":
        return a - b;
      case "AND":
        return a & b;
      case "XOR":
        return a ^ b;
      case "SLT":
        return a < b ? 1 : 0;
    }
  }, [a, b, operation]);

  const aluMode = {
    ADD: "somador",
    SUB: "somador com complemento",
    AND: "lógica bit a bit",
    XOR: "comparação de diferença bit a bit",
    SLT: "comparador ordenado",
  }[operation];

  return (
    <InteractiveShell
      eyebrow="ALU"
      title="Decodifique uma operação e veja a ALU reagir"
      tone="emerald"
      icon={<Workflow size={18} aria-hidden="true" />}
      description="Troque a operação e os operandos. O objetivo é perceber que a mesma ALU reaproveita circuitos e caminhos diferentes dependendo dos sinais de controle."
    >
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-4">
          <SegmentedControl label="Operação" options={["ADD", "SUB", "AND", "XOR", "SLT"] as const} value={operation} onChange={setOperation} />
          <RangeField label="Operando A" value={a} min={0} max={31} step={1} onChange={setA} />
          <RangeField label="Operando B" value={b} min={0} max={31} step={1} onChange={setB} />
        </div>
        <div className="grid gap-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <MetricCard label="A" value={String(a)} />
            <MetricCard label="B" value={String(b)} />
            <MetricCard label="Modo da ALU" value={aluMode} />
            <MetricCard label="Resultado" value={String(result)} />
          </div>
          <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-4 text-sm leading-6 text-emerald-950">
            A instrução não altera fisicamente a ALU inteira a cada caso; ela muda os sinais de controle que selecionam quais subcaminhos e circuitos internos serão usados.
          </div>
        </div>
      </div>
    </InteractiveShell>
  );
}

function SegmentedControl<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <div className="grid gap-2">
      <p className="text-sm font-black text-slate-700">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            className={`rounded-2xl px-4 py-2 text-sm font-black transition ${
              option === value
                ? "bg-slate-950 text-white"
                : "bg-white text-slate-700 ring-1 ring-slate-200 hover:ring-slate-400"
            }`}
            key={option}
            type="button"
            onClick={() => onChange(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

function RangeField({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="grid gap-2 text-sm font-black text-slate-700">
      <span className="flex items-center justify-between gap-3">
        {label}
        <span className="font-mono text-slate-950">{value}</span>
      </span>
      <input
        className="w-full accent-slate-950"
        max={max}
        min={min}
        step={step}
        type="range"
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}
