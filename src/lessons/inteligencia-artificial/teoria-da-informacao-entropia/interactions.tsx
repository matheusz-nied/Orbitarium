import { useMemo, useState } from "react";
import { Binary, BookText, Sigma } from "lucide-react";
import type { LessonModule } from "../../../types/content";
import {
  InteractiveShell,
  MetricCard,
} from "../../../components/lesson/InteractionPrimitives";

type SampleKey = "repetitivo" | "linguagem" | "variado";

export const interactions = {
  "live-entropy-distribution": LiveEntropyDistributionInteraction,
  "text-entropy-comparator": TextEntropyComparatorInteraction,
  "cross-entropy-bridge": CrossEntropyBridgeInteraction,
} satisfies LessonModule["interactions"];

const textSamples: Record<SampleKey, string> = {
  repetitivo: "AAAAAAABAAAAAAABAAAAAAAB",
  linguagem: "o gato observa o telhado e volta para a janela",
  variado: "QWERTYZXCVBNMPLKJHGFDSAIOU",
};

function LiveEntropyDistributionInteraction() {
  const [a, setA] = useState(40);
  const [b, setB] = useState(30);
  const [c, setC] = useState(20);
  const [d, setD] = useState(10);

  const raw = [a, b, c, d];
  const total = raw.reduce((sum, value) => sum + value, 0);
  const probabilities = raw.map((value) => value / total);
  const entropy = shannonEntropy(probabilities);

  return (
    <InteractiveShell
      eyebrow="Entropia ao vivo"
      title="Redistribua a probabilidade e veja a entropia responder"
      tone="violet"
      icon={<Sigma size={18} aria-hidden="true" />}
      description="Concentre massa em um único resultado ou espalhe entre vários. A entropia sobe quando a distribuição fica mais equilibrada e incerta."
    >
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-4">
          <RangeField label="Classe A" value={a} min={1} max={80} onChange={setA} />
          <RangeField label="Classe B" value={b} min={1} max={80} onChange={setB} />
          <RangeField label="Classe C" value={c} min={1} max={80} onChange={setC} />
          <RangeField label="Classe D" value={d} min={1} max={80} onChange={setD} />
          <div className="grid gap-3 sm:grid-cols-2">
            <MetricCard label="Entropia" value={`${entropy.toFixed(2)} bits`} />
            <MetricCard label="Máximo teórico aqui" value="2.00 bits" />
            <MetricCard label="Maior classe" value={String(["A", "B", "C", "D"][raw.indexOf(Math.max(...raw))])} />
            <MetricCard label="Leitura" value={entropy > 1.8 ? "muito distribuída" : entropy > 1.2 ? "mista" : "concentrada"} />
          </div>
        </div>
        <div className="rounded-3xl bg-white p-5">
          <div className="grid gap-3">
            {probabilities.map((probability, index) => (
              <div key={index}>
                <div className="flex items-center justify-between text-sm font-black text-slate-700">
                  <span>Classe {String.fromCharCode(65 + index)}</span>
                  <span>{(probability * 100).toFixed(1)}%</span>
                </div>
                <div className="mt-1 h-4 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-violet-600" style={{ width: `${probability * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            Quando as barras se equilibram, cresce a incerteza média. Quando uma barra domina, o sistema fica mais previsível e a entropia cai.
          </p>
        </div>
      </div>
    </InteractiveShell>
  );
}

function TextEntropyComparatorInteraction() {
  const [left, setLeft] = useState<SampleKey>("repetitivo");
  const [right, setRight] = useState<SampleKey>("linguagem");

  const leftStats = textStats(textSamples[left]);
  const rightStats = textStats(textSamples[right]);

  return (
    <InteractiveShell
      eyebrow="Entropia de textos"
      title="Compare previsibilidade simbólica entre sequências"
      tone="teal"
      icon={<BookText size={18} aria-hidden="true" />}
      description="Esta comparação usa frequência de caracteres para construir uma primeira intuição. Não captura toda a linguagem, mas mostra como diversidade simbólica afeta a incerteza média."
    >
      <div className="grid gap-5 lg:grid-cols-2">
        <TextSampleCard
          title="Texto A"
          selected={left}
          onSelect={(key) => setLeft(key)}
          samples={textSamples}
          stats={leftStats}
          tone="teal"
        />
        <TextSampleCard
          title="Texto B"
          selected={right}
          onSelect={(key) => setRight(key)}
          samples={textSamples}
          stats={rightStats}
          tone="indigo"
        />
      </div>
    </InteractiveShell>
  );
}

function CrossEntropyBridgeInteraction() {
  const [correctClass, setCorrectClass] = useState(0);
  const [predCorrect, setPredCorrect] = useState(70);
  const predicted = distributePrediction(correctClass, predCorrect / 100);
  const loss = -Math.log(predicted[correctClass]);

  return (
    <InteractiveShell
      eyebrow="Ponte para loss"
      title="Veja a cross-entropy punir probabilidades ruins"
      tone="amber"
      icon={<Binary size={18} aria-hidden="true" />}
      description="Escolha qual classe é a correta e ajuste a probabilidade que o modelo atribui a ela. A penalização cresce rapidamente quando o modelo fica confiante na direção errada."
    >
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-4">
          <div className="grid grid-cols-3 gap-2">
            {["A", "B", "C"].map((label, index) => (
              <button
                key={label}
                type="button"
                onClick={() => setCorrectClass(index)}
                className={`rounded-2xl border px-4 py-3 text-sm font-black transition ${correctClass === index ? "border-amber-600 bg-amber-600 text-white" : "border-amber-100 bg-white text-slate-700 hover:border-amber-300"}`}
              >
                classe correta: {label}
              </button>
            ))}
          </div>
          <RangeField label="Probabilidade atribuída à classe correta" value={predCorrect} min={1} max={99} suffix="%" onChange={setPredCorrect} />
          <div className="grid gap-3 sm:grid-cols-2">
            <MetricCard label="Cross-entropy" value={loss.toFixed(3)} />
            <MetricCard label="Classe correta" value={String.fromCharCode(65 + correctClass)} />
            <MetricCard label="p correta" value={`${predCorrect}%`} />
            <MetricCard label="Leitura" value={predCorrect > 70 ? "boa previsão" : predCorrect > 35 ? "mediana" : "cara"} />
          </div>
        </div>
        <div className="rounded-3xl bg-white p-5">
          <div className="grid gap-3">
            {predicted.map((probability, index) => (
              <div key={index}>
                <div className="flex items-center justify-between text-sm font-black text-slate-700">
                  <span>Classe {String.fromCharCode(65 + index)}</span>
                  <span>{(probability * 100).toFixed(1)}%</span>
                </div>
                <div className="mt-1 h-4 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full ${index === correctClass ? "bg-amber-600" : "bg-amber-300"}`}
                    style={{ width: `${probability * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            A loss olha especialmente para a probabilidade da classe correta. Reduzir muito essa probabilidade faz a penalização subir rápido, mesmo que o rótulo mais provável ainda pareça plausível.
          </p>
        </div>
      </div>
    </InteractiveShell>
  );
}

function TextSampleCard({
  title,
  selected,
  onSelect,
  samples,
  stats,
  tone,
}: {
  title: string;
  selected: SampleKey;
  onSelect: (key: SampleKey) => void;
  samples: Record<SampleKey, string>;
  stats: ReturnType<typeof textStats>;
  tone: "teal" | "indigo";
}) {
  const activeClass = tone === "teal" ? "border-teal-600 bg-teal-600 text-white" : "border-indigo-600 bg-indigo-600 text-white";
  const textTone = tone === "teal" ? "text-teal-700" : "text-indigo-700";

  return (
    <div className="rounded-3xl bg-white p-5">
      <p className={`text-xs font-black uppercase tracking-[0.18em] ${textTone}`}>{title}</p>
      <div className="mt-3 grid gap-2 sm:grid-cols-3">
        {(Object.keys(samples) as SampleKey[]).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => onSelect(key)}
            className={`rounded-2xl border px-3 py-2 text-sm font-black transition ${selected === key ? activeClass : "border-slate-200 bg-slate-50 text-slate-700"}`}
          >
            {key}
          </button>
        ))}
      </div>
      <div className="mt-4 rounded-3xl border border-slate-100 bg-slate-50 p-4 font-mono text-sm text-slate-700">
        {samples[selected]}
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <MetricCard label="Entropia" value={`${stats.entropy.toFixed(2)} bits`} />
        <MetricCard label="Símbolos distintos" value={String(stats.uniqueSymbols)} />
        <MetricCard label="Tamanho" value={String(stats.length)} />
        <MetricCard label="Mais frequente" value={`${stats.topSymbol} (${stats.topShare.toFixed(0)}%)`} />
      </div>
    </div>
  );
}

function RangeField({
  label,
  value,
  min,
  max,
  step = 1,
  suffix = "",
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  suffix?: string;
  onChange: (value: number) => void;
}) {
  return (
    <label className="grid gap-2 text-sm font-black text-slate-700">
      <span className="flex items-center justify-between gap-4">
        {label}
        <span className="font-mono text-slate-950">{value}{suffix}</span>
      </span>
      <input
        className="w-full accent-slate-950"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}

function shannonEntropy(probabilities: number[]) {
  return probabilities.reduce((sum, p) => {
    if (p <= 0) return sum;
    return sum - p * Math.log2(p);
  }, 0);
}

function textStats(text: string) {
  const counts = new Map<string, number>();
  for (const char of text.replace(/\s+/g, "")) {
    counts.set(char, (counts.get(char) ?? 0) + 1);
  }
  const values = Array.from(counts.values());
  const total = values.reduce((sum, value) => sum + value, 0);
  const probabilities = values.map((value) => value / total);
  const topEntry = Array.from(counts.entries()).sort((a, b) => b[1] - a[1])[0] ?? ["-", 0];
  return {
    entropy: shannonEntropy(probabilities),
    uniqueSymbols: counts.size,
    length: total,
    topSymbol: topEntry[0],
    topShare: total === 0 ? 0 : (topEntry[1] / total) * 100,
  };
}

function distributePrediction(correctIndex: number, correctProbability: number) {
  const remaining = 1 - correctProbability;
  return [0, 1, 2].map((index) => (index === correctIndex ? correctProbability : remaining / 2));
}

