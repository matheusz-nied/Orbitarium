import { useMemo, useState } from "react";
import { Binary, Sparkles, Waves } from "lucide-react";
import type { LessonModule } from "../../../types/content";
import {
  InteractiveShell,
  MetricCard,
} from "../../../components/lesson/InteractionPrimitives";
import {
  createScenarioExplorer,
  createSliderPlayground,
} from "../_shared/interactionFactories";

const noiseScheduleLab = createSliderPlayground({
  eyebrow: "Forward process",
  title: "Explore o efeito do timestep e da agenda de ruído",
  description:
    "Observe como sinal preservado e ruído dominante mudam quando avançamos pela cadeia de difusão.",
  tone: "violet",
  icon: <Waves size={18} aria-hidden="true" />,
  initialState: {
    timestep: 420,
    beta: 0.012,
  },
  controls: [
    { key: "timestep", label: "timestep", min: 1, max: 1000, step: 1 },
    {
      key: "beta",
      label: "intensidade média do ruído",
      min: 0.002,
      max: 0.03,
      step: 0.001,
      formatValue: (value) => value.toFixed(3),
    },
  ],
  compute: ({ timestep, beta }) => {
    const progress = timestep / 1000;
    const signal = Math.max(0, Math.exp(-(progress * beta * 35)));
    const noise = 1 - signal;
    const reversibility = Math.max(0, Math.min(1, 1 - progress * 0.75));

    return {
      metrics: [
        { label: "sinal estimado", value: `${(signal * 100).toFixed(0)}%` },
        { label: "ruído dominante", value: `${(noise * 100).toFixed(0)}%` },
        { label: "etapa", value: progress < 0.2 ? "quase limpa" : progress < 0.7 ? "intermediária" : "quase ruído" },
        { label: "reversão local", value: `${(reversibility * 100).toFixed(0)}%` },
      ],
      bars: [
        { label: "Sinal remanescente", value: signal, display: `${(signal * 100).toFixed(0)}%` },
        { label: "Ruído acumulado", value: noise, display: `${(noise * 100).toFixed(0)}%` },
        { label: "Facilidade do passo inverso", value: reversibility, display: `${(reversibility * 100).toFixed(0)}%` },
      ],
      narrative:
        progress < 0.2
          ? "No início, quase toda a estrutura original ainda está viva. O passo inverso é relativamente local e informativo."
          : progress < 0.7
            ? "Na região intermediária, sinal e ruído convivem. É aqui que a rede aprende a reconstruir padrões semânticos relevantes sem depender demais do pixel exato."
            : "Perto do fim, o estado está muito próximo do caos. A reconstrução depende fortemente do conhecimento estatístico aprendido pela rede.",
      footer:
        "A agenda de ruído distribui a dificuldade do problema ao longo da cadeia: cedo demais ou tarde demais, o equilíbrio pode piorar.",
    };
  },
});

const samplerScenarios = createScenarioExplorer({
  eyebrow: "Amostragem",
  title: "Compare regimes de geração por difusão",
  description:
    "O mesmo modelo treinado pode se comportar de forma bem diferente conforme o sampler e a estratégia de geração.",
  tone: "indigo",
  icon: <Binary size={18} aria-hidden="true" />,
  scenarios: [
    {
      id: "ddpm",
      label: "DDPM clássico",
      title: "Mais passos, trajetória mais fiel ao formalismo original",
      description:
        "Boa qualidade e robustez, mas com custo iterativo elevado e maior latência.",
      bullets: [
        "Amostragem costuma exigir muitos passos.",
        "Boa referência conceitual para entender o método original.",
        "Menos amigável para uso interativo puro.",
      ],
      metrics: [
        { label: "velocidade", value: "baixa" },
        { label: "fidelidade", value: "alta" },
      ],
      bars: [
        { label: "Custo computacional", value: 0.9, display: "90%" },
        { label: "Qualidade potencial", value: 0.82, display: "82%" },
      ],
    },
    {
      id: "ddim",
      label: "DDIM",
      title: "Menos passos com rota implícita",
      description:
        "Reduz a latência em muitos cenários, preservando bastante qualidade com menos iterações.",
      bullets: [
        "Popular em pipelines que precisam responder mais rápido.",
        "Altera a trajetória sem trocar a rede treinada.",
        "Trade-offs dependem do número de passos e da tarefa.",
      ],
      metrics: [
        { label: "velocidade", value: "média/alta" },
        { label: "fidelidade", value: "alta" },
      ],
      bars: [
        { label: "Custo computacional", value: 0.54, display: "54%" },
        { label: "Qualidade potencial", value: 0.76, display: "76%" },
      ],
    },
    {
      id: "latent",
      label: "Latent diffusion",
      title: "Difusão em espaço comprimido",
      description:
        "A grande vitória prática: combinar boa qualidade com custo muito menor ao operar em latentes.",
      bullets: [
        "O autoencoder cuida da tradução entre pixel e latente.",
        "A difusão organiza semântica em espaço mais barato.",
        "Base importante de sistemas texto-imagem amplamente usados.",
      ],
      metrics: [
        { label: "velocidade", value: "alta" },
        { label: "fidelidade", value: "alta" },
      ],
      bars: [
        { label: "Custo computacional", value: 0.42, display: "42%" },
        { label: "Qualidade potencial", value: 0.84, display: "84%" },
      ],
    },
  ],
});

function ReverseProcessLab() {
  const [steps, setSteps] = useState(8);
  const [guidance, setGuidance] = useState(4.5);

  const frames = useMemo(() => {
    return Array.from({ length: 6 }).map((_, index) => {
      const phase = index / 5;
      const roughness = Math.max(0.12, 1 - phase * (steps / 8));
      const coherence = Math.min(1, phase * 0.85 + guidance / 14);
      return { phase, roughness, coherence };
    });
  }, [guidance, steps]);

  const diversity = Math.max(0, Math.min(1, 1 - guidance / 10));

  return (
    <InteractiveShell
      eyebrow="Reverse process"
      title="Veja a amostra ganhar estrutura passo a passo"
      tone="emerald"
      icon={<Sparkles size={18} aria-hidden="true" />}
      description="Ajuste a intensidade de guidance e a quantidade relativa de passos para sentir o equilíbrio entre coerência e diversidade."
    >
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-4">
          <label className="grid gap-2 rounded-3xl bg-white p-4 text-sm font-black text-slate-700">
            <span className="flex items-center justify-between">
              orçamento relativo de passos
              <span className="font-mono text-slate-950">{steps}</span>
            </span>
            <input
              className="w-full accent-slate-950"
              max={12}
              min={3}
              step={1}
              type="range"
              value={steps}
              onChange={(event) => setSteps(Number(event.target.value))}
            />
          </label>
          <label className="grid gap-2 rounded-3xl bg-white p-4 text-sm font-black text-slate-700">
            <span className="flex items-center justify-between">
              guidance
              <span className="font-mono text-slate-950">{guidance.toFixed(1)}</span>
            </span>
            <input
              className="w-full accent-slate-950"
              max={10}
              min={0}
              step={0.5}
              type="range"
              value={guidance}
              onChange={(event) => setGuidance(Number(event.target.value))}
            />
          </label>
          <div className="grid gap-3 sm:grid-cols-2">
            <MetricCard label="coerência ao prompt" value={`${Math.min(99, Math.round((guidance / 10) * 100))}%`} />
            <MetricCard label="diversidade restante" value={`${Math.round(diversity * 100)}%`} />
            <MetricCard label="refinamento visual" value={steps >= 8 ? "alto" : "moderado"} />
            <MetricCard label="risco de artefato" value={guidance >= 8 ? "alto" : "controlado"} />
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-4">
            <p className="text-sm leading-6 text-slate-700">
              {guidance >= 8
                ? "Guidance alto puxa fortemente para o prompt, mas pode endurecer a amostra e sacrificar naturalidade."
                : guidance <= 2
                  ? "Guidance baixo preserva mais diversidade, porém a aderência ao condicionamento pode ficar frouxa."
                  : "Faixas intermediárias costumam equilibrar obediência ao prompt e variedade estatística."}
            </p>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-5">
          <div className="grid grid-cols-3 gap-3">
            {frames.map((frame, index) => {
              const noise = Math.round(235 - frame.coherence * 120 + frame.roughness * 15);
              const detail = Math.round(110 + frame.coherence * 95);
              return (
                <div key={index} className="rounded-2xl border border-slate-100 p-3">
                  <div
                    className="aspect-square rounded-2xl border-2"
                    style={{
                      borderColor: "#a78bfa",
                      background: `radial-gradient(circle at 30% 30%, rgb(${detail}, ${detail - 30}, ${detail + 25}) 0%, rgb(${noise}, ${noise}, ${noise}) 100%)`,
                      filter: `blur(${frame.roughness * 1.2}px) saturate(${0.8 + frame.coherence * 0.4})`,
                    }}
                  />
                  <p className="mt-2 text-center text-xs font-black text-slate-600">
                    passo {index + 1}
                  </p>
                </div>
              );
            })}
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            O mosaico representa a intuição do reverse process: estrutura global surge cedo, detalhe e nitidez se consolidam mais tarde, e guidance controla o quanto a trajetória é puxada por uma condição externa.
          </p>
        </div>
      </div>
    </InteractiveShell>
  );
}

export const interactions = {
  "noise-schedule-lab": noiseScheduleLab,
  "reverse-process-lab": ReverseProcessLab,
  "sampler-scenarios": samplerScenarios,
} satisfies LessonModule["interactions"];
