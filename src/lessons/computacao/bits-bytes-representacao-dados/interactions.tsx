import { useMemo, useState } from "react";
import { Binary, Calculator, Scaling } from "lucide-react";
import type { LessonModule } from "../../../types/content";
import {
  InteractiveShell,
  MetricCard,
} from "../../../components/lesson/InteractionPrimitives";

export const interactions = {
  "binary-converter": BinaryConverterInteraction,
  "signed-range-playground": SignedRangePlaygroundInteraction,
  "float-bits-lab": FloatBitsLabInteraction,
} satisfies LessonModule["interactions"];

function BinaryConverterInteraction() {
  const [value, setValue] = useState(65);
  const binary = value.toString(2).padStart(8, "0");
  const hex = value.toString(16).toUpperCase().padStart(2, "0");
  const ascii = value >= 32 && value <= 126 ? String.fromCharCode(value) : "—";

  return (
    <InteractiveShell
      eyebrow="Conversor"
      title="Brinque com o mesmo byte em várias notações"
      tone="indigo"
      icon={<Binary size={18} aria-hidden="true" />}
      description="Ajuste o valor decimal e veja como o mesmo byte aparece em binário, hexadecimal e, quando fizer sentido, como caractere ASCII."
    >
      <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="grid gap-4">
          <RangeField label="Valor decimal (0 a 255)" value={value} min={0} max={255} step={1} onChange={setValue} />
          <div className="grid gap-3 sm:grid-cols-2">
            <MetricCard label="Decimal" value={String(value)} />
            <MetricCard label="Hex" value={`0x${hex}`} />
            <MetricCard label="ASCII" value={ascii} />
            <MetricCard label="Bits ativos" value={String(binary.split("").filter((bit) => bit === "1").length)} />
          </div>
          <div className="rounded-3xl border border-indigo-200 bg-white p-4">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-indigo-700">Leitura</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              O valor não muda quando você troca a notação. O que muda é a forma como humanos o enxergam: decimal é confortável para magnitude, binário revela cada bit e hexadecimal compacta grupos de 4 bits.
            </p>
          </div>
        </div>
        <div className="rounded-3xl border border-indigo-100 bg-white p-5">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-indigo-700">Binário</p>
          <div className="mt-4 grid grid-cols-8 gap-2">
            {binary.split("").map((bit, index) => (
              <div
                className={`rounded-2xl px-2 py-4 text-center text-xl font-black ${
                  bit === "1" ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-500"
                }`}
                key={`${bit}-${index}`}
              >
                {bit}
              </div>
            ))}
          </div>
          <div className="mt-4 grid gap-2 sm:grid-cols-4">
            {[128, 64, 32, 16, 8, 4, 2, 1].map((weight) => (
              <div className="rounded-2xl bg-slate-50 px-3 py-2 text-center text-xs font-black text-slate-500" key={weight}>
                {weight}
              </div>
            ))}
          </div>
          <p className="mt-4 font-mono text-lg font-black text-slate-900">{binary}</p>
        </div>
      </div>
    </InteractiveShell>
  );
}

function SignedRangePlaygroundInteraction() {
  const [bits, setBits] = useState(8);
  const [value, setValue] = useState(-1);

  const unsignedMax = 2 ** bits - 1;
  const signedMin = -(2 ** (bits - 1));
  const signedMax = 2 ** (bits - 1) - 1;
  const clampedValue = Math.max(signedMin, Math.min(signedMax, value));
  const encoded = clampedValue >= 0 ? clampedValue : 2 ** bits + clampedValue;
  const binary = encoded.toString(2).padStart(bits, "0");

  return (
    <InteractiveShell
      eyebrow="Inteiros"
      title="Veja como o intervalo muda com e sem sinal"
      tone="rose"
      icon={<Calculator size={18} aria-hidden="true" />}
      description="Escolha quantos bits um inteiro possui e observe como o mesmo espaço é repartido entre valores positivos e negativos."
    >
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-4">
          <RangeField label="Quantidade de bits" value={bits} min={4} max={12} step={1} onChange={(next) => { setBits(next); setValue(Math.max(-(2 ** (next - 1)), Math.min(2 ** (next - 1) - 1, value))); }} />
          <RangeField label="Valor com sinal" value={clampedValue} min={signedMin} max={signedMax} step={1} onChange={setValue} />
          <div className="grid gap-3 sm:grid-cols-2">
            <MetricCard label="Sem sinal" value={`0..${unsignedMax}`} />
            <MetricCard label="Com sinal" value={`${signedMin}..${signedMax}`} />
            <MetricCard label="Valor escolhido" value={String(clampedValue)} />
            <MetricCard label="Mesmo padrão sem sinal" value={String(encoded)} />
          </div>
        </div>
        <div className="grid gap-4">
          <div className="rounded-3xl border border-rose-100 bg-white p-5">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-rose-700">Representação binária</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {binary.split("").map((bit, index) => (
                <span
                  className={`min-w-10 rounded-2xl px-3 py-3 text-center text-lg font-black ${
                    index === 0 ? "bg-rose-600 text-white" : bit === "1" ? "bg-rose-100 text-rose-700" : "bg-slate-100 text-slate-500"
                  }`}
                  key={`${bit}-${index}`}
                >
                  {bit}
                </span>
              ))}
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              O primeiro bit costuma chamar atenção, mas o formato inteiro é lido em complemento de dois. Por isso o mesmo padrão pode significar <strong>{encoded}</strong> sem sinal e <strong>{clampedValue}</strong> com sinal.
            </p>
          </div>
          <div className="rounded-3xl border border-rose-200 bg-rose-50 p-4 text-sm leading-6 text-rose-950">
            Se você tentar sair do intervalo permitido, acontece overflow conceitual: o resultado desejado existe na matemática, mas não cabe no número de bits disponível.
          </div>
        </div>
      </div>
    </InteractiveShell>
  );
}

function FloatBitsLabInteraction() {
  const samples = [
    { label: "0.5", binary: "0.1", exact: true, explanation: "É 1/2, potência de dois no denominador." },
    { label: "0.25", binary: "0.01", exact: true, explanation: "É 1/4, também finito em base 2." },
    { label: "0.75", binary: "0.11", exact: true, explanation: "É 1/2 + 1/4, soma finita em binário." },
    { label: "0.1", binary: "0.000110011...", exact: false, explanation: "A fração decimal 1/10 repete infinitamente em base 2." },
    { label: "0.2", binary: "0.00110011...", exact: false, explanation: "Também precisa de repetição infinita em binário." },
    { label: "0.3", binary: "0.01001100...", exact: false, explanation: "É outro decimal comum que não termina em base 2." },
  ];

  const [selected, setSelected] = useState(samples[3].label);
  const current = useMemo(
    () => samples.find((sample) => sample.label === selected) ?? samples[3],
    [selected],
  );

  return (
    <InteractiveShell
      eyebrow="Float"
      title="Quais decimais cabem exatamente em binário?"
      tone="teal"
      icon={<Scaling size={18} aria-hidden="true" />}
      description="Compare decimais simples e veja quais possuem representação binária finita. Isso ajuda a entender por que alguns números são armazenados exatamente e outros só por aproximação."
    >
      <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="grid gap-3">
          {samples.map((sample) => (
            <button
              className={`rounded-2xl border px-4 py-3 text-left transition ${
                sample.label === selected
                  ? "border-teal-600 bg-teal-600 text-white"
                  : "border-teal-100 bg-white text-slate-700 hover:border-teal-300"
              }`}
              key={sample.label}
              type="button"
              onClick={() => setSelected(sample.label)}
            >
              <span className="block text-sm font-black">{sample.label}</span>
              <span className={`mt-1 block text-xs ${sample.label === selected ? "text-teal-50" : "text-slate-500"}`}>
                {sample.exact ? "finito em binário" : "repetição infinita"}
              </span>
            </button>
          ))}
        </div>
        <div className="grid gap-4">
          <div className="rounded-3xl border border-teal-100 bg-white p-5">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-teal-700">Representação binária aproximada</p>
            <p className="mt-3 font-mono text-2xl font-black text-slate-950">{current.binary}</p>
            <p className="mt-4 text-sm leading-6 text-slate-600">{current.explanation}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <MetricCard label="Decimal" value={current.label} />
            <MetricCard label="Exato em binário?" value={current.exact ? "Sim" : "Não"} />
          </div>
          <div className={`rounded-3xl border p-4 text-sm leading-6 ${current.exact ? "border-emerald-200 bg-emerald-50 text-emerald-950" : "border-amber-200 bg-amber-50 text-amber-950"}`}>
            {current.exact
              ? "Quando o denominador pode ser escrito como potência de 2, a expansão binária termina. Esses valores cabem sem aproximação."
              : "Quando a expansão binária não termina, o formato de ponto flutuante precisa cortar e arredondar. O número guardado fica muito próximo, mas não idêntico ao decimal escrito."}
          </div>
        </div>
      </div>
    </InteractiveShell>
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
