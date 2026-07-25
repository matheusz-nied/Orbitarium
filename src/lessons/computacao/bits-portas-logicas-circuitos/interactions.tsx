import { useMemo, useState } from "react";
import { CircuitBoard, Equal, Plus } from "lucide-react";
import type { LessonModule } from "../../../types/content";
import {
  InteractiveShell,
  MetricCard,
} from "../../../components/lesson/InteractionPrimitives";

export const interactions = {
  "truth-table-lab": TruthTableLabInteraction,
  "nand-builder": NandBuilderInteraction,
  "adder-simulator": AdderSimulatorInteraction,
} satisfies LessonModule["interactions"];

const gateBehaviors = {
  AND: (a: number, b: number) => a & b,
  OR: (a: number, b: number) => a | b,
  XOR: (a: number, b: number) => a ^ b,
  NAND: (a: number, b: number) => Number(!(a & b)),
} as const;

function TruthTableLabInteraction() {
  const [gate, setGate] = useState<keyof typeof gateBehaviors>("AND");
  const [a, setA] = useState(0);
  const [b, setB] = useState(1);
  const output = gateBehaviors[gate](a, b);
  const rows = [
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1],
  ] as const;

  return (
    <InteractiveShell
      eyebrow="Tabela-verdade"
      title="Teste entradas e veja a regra da porta"
      tone="violet"
      icon={<Equal size={18} aria-hidden="true" />}
      description="Escolha uma porta e altere A e B. A tabela-verdade completa fica ao lado para relacionar o caso atual com o comportamento geral."
    >
      <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="grid gap-4">
          <SegmentedControl
            label="Porta"
            options={["AND", "OR", "XOR", "NAND"] as const}
            value={gate}
            onChange={setGate}
          />
          <div className="grid gap-3 sm:grid-cols-2">
            <ToggleBit label="A" value={a} onChange={setA} />
            <ToggleBit label="B" value={b} onChange={setB} />
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <MetricCard label="A" value={String(a)} />
            <MetricCard label="B" value={String(b)} />
            <MetricCard label={`Saída ${gate}`} value={String(output)} />
          </div>
        </div>
        <div className="rounded-3xl border border-violet-100 bg-white p-5">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-700">Tabela-verdade da porta {gate}</p>
          <div className="mt-4 grid gap-2">
            {rows.map(([rowA, rowB]) => {
              const rowOutput = gateBehaviors[gate](rowA, rowB);
              const active = rowA === a && rowB === b;
              return (
                <div
                  className={`grid grid-cols-3 rounded-2xl px-4 py-3 text-center text-sm font-black ${
                    active ? "bg-violet-600 text-white" : "bg-slate-50 text-slate-700"
                  }`}
                  key={`${rowA}-${rowB}`}
                >
                  <span>{rowA}</span>
                  <span>{rowB}</span>
                  <span>{rowOutput}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </InteractiveShell>
  );
}

function NandBuilderInteraction() {
  const [recipe, setRecipe] = useState<"NOT" | "AND" | "OR">("NOT");

  const content = useMemo(() => {
    if (recipe === "NOT") {
      return {
        expression: "NOT(A) = NAND(A, A)",
        steps: [
          "Ligue A nas duas entradas da NAND.",
          "Se A = 1, a AND interna vale 1 e a negação vira 0.",
          "Se A = 0, a AND interna vale 0 e a negação vira 1.",
        ],
      };
    }
    if (recipe === "AND") {
      return {
        expression: "AND(A, B) = NOT(NAND(A, B))",
        steps: [
          "Primeiro calcule NAND(A, B).",
          "Depois negue o resultado usando outra NAND em modo NOT.",
          "O resultado final reconstrói a AND original.",
        ],
      };
    }
    return {
      expression: "OR(A, B) = NAND(NOT(A), NOT(B))",
      steps: [
        "Construa NOT(A) com NAND(A, A).",
        "Construa NOT(B) com NAND(B, B).",
        "Aplique NAND nas duas saídas; por De Morgan, o efeito é OR.",
      ],
    };
  }, [recipe]);

  return (
    <InteractiveShell
      eyebrow="Universalidade"
      title="Monte outras portas a partir de NAND"
      tone="amber"
      icon={<CircuitBoard size={18} aria-hidden="true" />}
      description="Escolha qual porta você quer reconstruir e acompanhe a 'receita' lógica. O objetivo não é decorar fórmulas, mas enxergar o poder de composição."
    >
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-3">
          <SegmentedControl label="Reconstruir" options={["NOT", "AND", "OR"] as const} value={recipe} onChange={setRecipe} />
          <div className="rounded-3xl border border-amber-200 bg-white p-5">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-700">Expressão</p>
            <p className="mt-3 font-mono text-lg font-black text-slate-950">{content.expression}</p>
          </div>
        </div>
        <div className="rounded-3xl border border-amber-100 bg-white p-5">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-700">Como pensar</p>
          <div className="mt-4 grid gap-3">
            {content.steps.map((step, index) => (
              <div className="rounded-2xl bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-950" key={step}>
                <span className="mr-2 font-black">{index + 1}.</span>
                {step}
              </div>
            ))}
          </div>
        </div>
      </div>
    </InteractiveShell>
  );
}

function AdderSimulatorInteraction() {
  const [a, setA] = useState(1);
  const [b, setB] = useState(1);
  const sum = a ^ b;
  const carry = a & b;
  const binaryResult = carry === 1 ? `${carry}${sum}` : `${sum}`;

  return (
    <InteractiveShell
      eyebrow="Somador"
      title="Veja o meio somador em ação"
      tone="emerald"
      icon={<Plus size={18} aria-hidden="true" />}
      description="Troque os bits de entrada e observe como XOR produz a soma e AND produz o carry. Assim a aritmética nasce diretamente de portas."
    >
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <ToggleBit label="Bit A" value={a} onChange={setA} />
            <ToggleBit label="Bit B" value={b} onChange={setB} />
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <MetricCard label="Soma (XOR)" value={String(sum)} />
            <MetricCard label="Carry (AND)" value={String(carry)} />
            <MetricCard label="Resultado binário" value={binaryResult} />
          </div>
          <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-4 text-sm leading-6 text-emerald-950">
            {carry === 1
              ? "Como 1 + 1 não cabe em um único bit, a coluna atual guarda 0 e o carry 1 segue para a próxima."
              : "Sem carry, o resultado cabe na própria coluna. O XOR captura exatamente esse comportamento do bit de soma."}
          </div>
        </div>
        <div className="rounded-3xl border border-emerald-100 bg-white p-5">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">Circuito lógico</p>
          <svg className="mt-4 w-full" viewBox="0 0 420 220" role="img" aria-label="Meio somador">
            <path d="M40 70h110" stroke="#10b981" strokeWidth="4" strokeLinecap="round" />
            <path d="M40 150h110" stroke="#10b981" strokeWidth="4" strokeLinecap="round" />
            <rect x="150" y="44" width="90" height="48" rx="16" fill="#f5f3ff" stroke="#8b5cf6" strokeWidth="3" />
            <rect x="150" y="128" width="90" height="48" rx="16" fill="#eff6ff" stroke="#2563eb" strokeWidth="3" />
            <text x="195" y="73" textAnchor="middle" fill="#6d28d9" fontSize="18" fontWeight="900">XOR</text>
            <text x="195" y="158" textAnchor="middle" fill="#1d4ed8" fontSize="18" fontWeight="900">AND</text>
            <path d="M240 68h120" stroke="#64748b" strokeWidth="4" strokeLinecap="round" />
            <path d="M240 152h120" stroke="#64748b" strokeWidth="4" strokeLinecap="round" />
            <text x="25" y="76" fill="#047857" fontSize="16" fontWeight="900">A={a}</text>
            <text x="25" y="156" fill="#047857" fontSize="16" fontWeight="900">B={b}</text>
            <text x="365" y="74" fill="#6d28d9" fontSize="16" fontWeight="900">Soma={sum}</text>
            <text x="365" y="158" fill="#1d4ed8" fontSize="16" fontWeight="900">Carry={carry}</text>
          </svg>
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

function ToggleBit({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <button
      className={`rounded-3xl border px-4 py-4 text-left transition ${
        value === 1
          ? "border-emerald-400 bg-emerald-50 text-emerald-950"
          : "border-slate-200 bg-white text-slate-700"
      }`}
      type="button"
      onClick={() => onChange(value === 1 ? 0 : 1)}
    >
      <span className="block text-xs font-black uppercase tracking-[0.16em] text-slate-500">{label}</span>
      <span className="mt-2 block text-3xl font-black">{value}</span>
    </button>
  );
}
