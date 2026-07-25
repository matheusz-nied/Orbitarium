import { useMemo, useState } from "react";
import { Radio, Volume2, Waves } from "lucide-react";
import type { LessonModule } from "../../../types/content";
import {
  InteractiveShell,
  MetricCard,
} from "../../../components/lesson/InteractionPrimitives";
import {
  createScenarioExplorer,
  createSliderPlayground,
} from "../_shared/interactionFactories";

const chunkLatencyLab = createSliderPlayground({
  eyebrow: "Streaming",
  title: "Ajuste chunk, ruído e contexto do ASR",
  description:
    "Veja como chunks maiores tendem a melhorar contexto, mas aumentam a latência percebida na resposta.",
  tone: "amber",
  icon: <Radio size={18} aria-hidden="true" />,
  initialState: {
    chunkMs: 400,
    ruido: 0.25,
    contexto: 0.55,
  },
  controls: [
    { key: "chunkMs", label: "tamanho do chunk (ms)", min: 100, max: 1200, step: 50 },
    { key: "ruido", label: "nível de ruído", min: 0, max: 1, step: 0.05, formatValue: (v) => v.toFixed(2) },
    { key: "contexto", label: "apoio de contexto linguístico", min: 0, max: 1, step: 0.05, formatValue: (v) => v.toFixed(2) },
  ],
  compute: ({ chunkMs, contexto, ruido }) => {
    const latency = Math.min(1, chunkMs / 1200);
    const accuracy = Math.max(0, Math.min(1, 0.35 + contexto * 0.4 + chunkMs / 2400 - ruido * 0.38));
    const responsiveness = Math.max(0, 1 - latency);

    return {
      metrics: [
        { label: "latência relativa", value: `${Math.round(latency * 100)}%` },
        { label: "precisão estimada", value: `${Math.round(accuracy * 100)}%` },
        { label: "responsividade", value: `${Math.round(responsiveness * 100)}%` },
        { label: "regime", value: chunkMs <= 300 ? "rápido" : chunkMs <= 700 ? "equilíbrio" : "contextual" },
      ],
      bars: [
        { label: "Contexto útil", value: accuracy, display: `${Math.round(accuracy * 100)}%` },
        { label: "Resposta imediata", value: responsiveness, display: `${Math.round(responsiveness * 100)}%` },
        { label: "Ruído percebido", value: ruido, display: `${Math.round(ruido * 100)}%` },
      ],
      narrative:
        chunkMs <= 300
          ? "Chunk pequeno deixa o sistema ágil, mas reduz contexto e aumenta o risco de hipóteses parciais erradas."
          : chunkMs >= 800
            ? "Chunk grande melhora contexto, porém o atraso fica perceptível em interfaces de voz ao vivo."
            : "Faixa intermediária costuma equilibrar latência e estabilidade em muitos cenários conversacionais.",
      footer:
        "A escolha ótima depende do produto: legendagem ao vivo, comando por voz e transcrição offline toleram atrasos diferentes.",
    };
  },
});

const ttsScenarios = createScenarioExplorer({
  eyebrow: "Síntese",
  title: "Compare regimes diferentes de TTS",
  description:
    "Naturalidade, latência e controle fino não pesam igual em todas as aplicações de síntese de voz.",
  tone: "teal",
  icon: <Volume2 size={18} aria-hidden="true" />,
  scenarios: [
    {
      id: "assistente",
      label: "Assistente de voz",
      title: "Resposta rápida e inteligível",
      description:
        "Aqui a latência pesa muito; a voz precisa soar natural, mas a responsividade domina a experiência.",
      bullets: [
        "Atrasos quebram a sensação de diálogo.",
        "Prosódia precisa ser boa, mas sem custo excessivo.",
        "Estabilidade em frases curtas é essencial.",
      ],
      metrics: [
        { label: "prioridade", value: "latência" },
        { label: "naturalidade", value: "alta" },
      ],
      bars: [
        { label: "Peso da latência", value: 0.92, display: "92%" },
        { label: "Peso da expressividade", value: 0.48, display: "48%" },
      ],
    },
    {
      id: "audiobook",
      label: "Leitura longa",
      title: "Naturalidade e estabilidade em muitos minutos",
      description:
        "Para leitura extensa, pequenos artefatos repetidos cansam muito mais o ouvinte.",
      bullets: [
        "Entonação e ritmo sustentados importam bastante.",
        "Fadiga auditiva vira métrica prática.",
        "Latência inicial pesa menos do que consistência contínua.",
      ],
      metrics: [
        { label: "prioridade", value: "naturalidade" },
        { label: "latência", value: "média" },
      ],
      bars: [
        { label: "Peso da latência", value: 0.36, display: "36%" },
        { label: "Peso da expressividade", value: 0.9, display: "90%" },
      ],
    },
    {
      id: "clonagem",
      label: "Voz personalizada",
      title: "Identidade vocal e controle de estilo",
      description:
        "Neste regime, timbre, emoção e segurança tornam-se tão importantes quanto inteligibilidade.",
      bullets: [
        "Semântica correta não basta; a voz precisa soar 'da pessoa'.",
        "Controle de emoção e estilo ganha relevância.",
        "Questões éticas e de autenticação entram no centro.",
      ],
      metrics: [
        { label: "prioridade", value: "identidade" },
        { label: "risco ético", value: "alto" },
      ],
      bars: [
        { label: "Peso da latência", value: 0.42, display: "42%" },
        { label: "Peso da expressividade", value: 0.88, display: "88%" },
      ],
    },
  ],
});

function AsrAlignmentLab() {
  const [velocidade, setVelocidade] = useState(0.6);
  const [pausa, setPausa] = useState(0.3);

  const frames = useMemo(() => {
    const base = [0.1, 0.24, 0.36, 0.52, 0.68, 0.82];
    return base.map((point, index) => ({
      label: ["o", "céu", "está", "muito", "azul", "hoje"][index],
      width: 12 + velocidade * 42 - index * pausa * 3,
    }));
  }, [pausa, velocidade]);

  return (
    <InteractiveShell
      eyebrow="Alinhamento"
      title="Veja fala contínua virar palavras discretas"
      tone="violet"
      icon={<Waves size={18} aria-hidden="true" />}
      description="Ajuste velocidade e pausas para perceber como o sistema precisa inferir fronteiras entre palavras em um fluxo contínuo."
    >
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-4">
          <label className="grid gap-2 rounded-3xl bg-white p-4 text-sm font-black text-slate-700">
            <span className="flex items-center justify-between">
              velocidade de fala
              <span className="font-mono text-slate-950">{velocidade.toFixed(2)}</span>
            </span>
            <input
              className="w-full accent-slate-950"
              max={1}
              min={0.2}
              step={0.05}
              type="range"
              value={velocidade}
              onChange={(event) => setVelocidade(Number(event.target.value))}
            />
          </label>
          <label className="grid gap-2 rounded-3xl bg-white p-4 text-sm font-black text-slate-700">
            <span className="flex items-center justify-between">
              pausas entre palavras
              <span className="font-mono text-slate-950">{pausa.toFixed(2)}</span>
            </span>
            <input
              className="w-full accent-slate-950"
              max={0.8}
              min={0}
              step={0.05}
              type="range"
              value={pausa}
              onChange={(event) => setPausa(Number(event.target.value))}
            />
          </label>
          <div className="grid gap-3 sm:grid-cols-2">
            <MetricCard label="segmentação implícita" value={pausa > 0.4 ? "mais fácil" : "mais difícil"} />
            <MetricCard label="risco de fusão de palavras" value={pausa < 0.15 ? "alto" : "moderado"} />
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-4">
            <p className="text-sm leading-6 text-slate-700">
              {pausa < 0.15
                ? "Com pouca pausa, as fronteiras ficam mais implícitas. O modelo depende mais de regularidades fonéticas e de linguagem."
                : "Pausas maiores ajudam a segmentação, mas fala real nem sempre oferece essas bordas tão limpas."}
            </p>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-5">
          <svg className="w-full" viewBox="0 0 360 220" role="img" aria-label="Fluxo contínuo de fala e segmentação em palavras">
            <rect x="0" y="0" width="360" height="220" rx="24" fill="#faf5ff" />
            <path d="M24 110 Q40 40 56 110 T88 110 T120 110 T152 110 T184 110 T216 110 T248 110 T280 110 T312 110" fill="none" stroke="#7c3aed" strokeWidth="4" />
            {frames.reduce(
              (acc, frame, index) => {
                const start = index === 0 ? 28 : acc[acc.length - 1].end + pausa * 28;
                const end = start + frame.width * 2.2;
                acc.push({ ...frame, start, end });
                return acc;
              },
              [] as Array<{ label: string; width: number; start: number; end: number }>,
            ).map((frame) => (
              <g key={frame.label}>
                <line x1={frame.start} y1="146" x2={frame.start} y2="182" stroke="#a78bfa" strokeWidth="2" />
                <text x={(frame.start + frame.end) / 2} y="200" textAnchor="middle" fill="#5b21b6" fontSize="12" fontWeight="800">
                  {frame.label}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </div>
    </InteractiveShell>
  );
}

export const interactions = {
  "chunk-latency-lab": chunkLatencyLab,
  "asr-alignment-lab": AsrAlignmentLab,
  "tts-scenarios": ttsScenarios,
} satisfies LessonModule["interactions"];
