import { useMemo, useState } from "react";
import { Gauge, Layers3, Shuffle } from "lucide-react";
import type { LessonModule } from "../../../types/content";
import {
  InteractiveShell,
  MetricCard,
} from "../../../components/lesson/InteractionPrimitives";
import {
  createScenarioExplorer,
  createSliderPlayground,
} from "../_shared/interactionFactories";

const adversarialBalanceLab = createSliderPlayground({
  eyebrow: "Dinâmica adversarial",
  title: "Ajuste o equilíbrio entre gerador e discriminador",
  description:
    "Quando um lado domina demais o jogo, os gradientes perdem qualidade e a diversidade pode sofrer.",
  tone: "rose",
  icon: <Gauge size={18} aria-hidden="true" />,
  initialState: {
    forcaGerador: 0.5,
    forcaDiscriminador: 0.5,
    diversidade: 0.7,
  },
  controls: [
    {
      key: "forcaGerador",
      label: "força relativa do gerador",
      min: 0.1,
      max: 1,
      step: 0.05,
      formatValue: (value) => value.toFixed(2),
    },
    {
      key: "forcaDiscriminador",
      label: "força relativa do discriminador",
      min: 0.1,
      max: 1,
      step: 0.05,
      formatValue: (value) => value.toFixed(2),
    },
    {
      key: "diversidade",
      label: "diversidade inicial do gerador",
      min: 0.1,
      max: 1,
      step: 0.05,
      formatValue: (value) => value.toFixed(2),
    },
  ],
  compute: ({ forcaGerador, forcaDiscriminador, diversidade }) => {
    const imbalance = Math.abs(forcaGerador - forcaDiscriminador);
    const stability = Math.max(0, 1 - imbalance * 1.15);
    const collapseRisk = Math.max(0, Math.min(1, imbalance * 0.8 + (1 - diversidade) * 0.6));
    const sharpness = Math.max(0, Math.min(1, 0.35 + forcaGerador * 0.4 + forcaDiscriminador * 0.15));

    return {
      metrics: [
        { label: "estabilidade estimada", value: `${(stability * 100).toFixed(0)}%` },
        { label: "risco de collapse", value: `${(collapseRisk * 100).toFixed(0)}%` },
        { label: "nitidez plausível", value: `${(sharpness * 100).toFixed(0)}%` },
        { label: "desbalanceamento", value: `${(imbalance * 100).toFixed(0)}%` },
      ],
      bars: [
        { label: "Estabilidade do treino", value: stability, display: `${(stability * 100).toFixed(0)}%` },
        { label: "Risco de mode collapse", value: collapseRisk, display: `${(collapseRisk * 100).toFixed(0)}%` },
        { label: "Força do feedback útil", value: Math.max(0, 1 - imbalance * 0.9), display: `${(Math.max(0, 1 - imbalance * 0.9) * 100).toFixed(0)}%` },
      ],
      narrative:
        imbalance < 0.12
          ? "Quando o jogo está razoavelmente equilibrado, o discriminador ainda ensina algo útil e o gerador consegue responder."
          : forcaDiscriminador > forcaGerador
            ? "Se o discriminador domina demais, o gerador passa a receber sinal pouco útil ou instável para melhorar."
            : "Se o gerador domina cedo demais, o discriminador deixa de pressionar suficientemente a qualidade e a cobertura da distribuição.",
      footer:
        "Essa dinâmica simplificada não substitui o paper, mas ajuda a sentir por que GANs são tão sensíveis a equilíbrio de treino.",
    };
  },
});

const familyComparisonScenarios = createScenarioExplorer({
  eyebrow: "Comparação prática",
  title: "Compare três cenários de escolha entre GAN e diffusion",
  description:
    "A melhor família muda com o tipo de problema, o orçamento de inferência e o grau de controle desejado.",
  tone: "teal",
  icon: <Layers3 size={18} aria-hidden="true" />,
  scenarios: [
    {
      id: "tempo-real",
      label: "Tempo real",
      title: "Latência curtíssima pesa mais que flexibilidade",
      description:
        "Quando cada milissegundo importa e o domínio é fechado, GANs ainda podem ser atraentes.",
      bullets: [
        "Inferência costuma ser muito rápida após o treino.",
        "Domínios restritos reduzem parte do risco de cobertura ruim.",
        "A engenharia se desloca para estabilizar o treino.",
      ],
      metrics: [
        { label: "família favorecida", value: "GAN" },
        { label: "gargalo principal", value: "treino" },
      ],
      bars: [
        { label: "vantagem de latência da GAN", value: 0.9, display: "90%" },
        { label: "vantagem de controle da difusão", value: 0.34, display: "34%" },
      ],
    },
    {
      id: "texto-imagem",
      label: "Texto-imagem",
      title: "Condição rica e domínio aberto",
      description:
        "Prompt, máscara e edição guiada favorecem fortemente diffusion models.",
      bullets: [
        "Guidance encaixa muito bem com condicionamento textual.",
        "A diversidade e a estabilidade pesam mais que latência bruta.",
        "O ecossistema atual empurrou diffusion para o centro desse regime.",
      ],
      metrics: [
        { label: "família favorecida", value: "Diffusion" },
        { label: "gargalo principal", value: "inferência" },
      ],
      bars: [
        { label: "vantagem de latência da GAN", value: 0.22, display: "22%" },
        { label: "vantagem de controle da difusão", value: 0.92, display: "92%" },
      ],
    },
    {
      id: "dominio-fechado",
      label: "Domínio fechado",
      title: "Faces, estilos ou classes muito específicas",
      description:
        "Quando o universo visual é estreito, a comparação fica mais equilibrada e depende do objetivo fino.",
      bullets: [
        "GAN pode renderizar amostras muito sharp e rápidas.",
        "Diffusion pode oferecer estabilidade e edição melhor.",
        "A decisão depende do peso relativo entre nitidez, diversidade e custo.",
      ],
      metrics: [
        { label: "família favorecida", value: "depende" },
        { label: "gargalo principal", value: "trade-off" },
      ],
      bars: [
        { label: "vantagem de latência da GAN", value: 0.74, display: "74%" },
        { label: "vantagem de robustez da difusão", value: 0.7, display: "70%" },
      ],
    },
  ],
});

function ModeCoverageLab() {
  const [focus, setFocus] = useState(0.72);
  const [stability, setStability] = useState(0.68);

  const modes = useMemo(() => {
    const emphasized = Math.min(1, focus + 0.18);
    const weak = Math.max(0.08, (1 - focus) * 0.38 + (1 - stability) * 0.12);
    return [emphasized, emphasized * 0.82, weak, weak * 0.86];
  }, [focus, stability]);

  const coverage = Math.min(1, modes.filter((mode) => mode > 0.22).length / 4 + stability * 0.1);

  return (
    <InteractiveShell
      eyebrow="Cobertura de modos"
      title="Sinta a diferença entre nitidez local e cobertura global"
      tone="amber"
      icon={<Shuffle size={18} aria-hidden="true" />}
      description="Ajuste o foco do gerador em poucos padrões e veja como algumas regiões da distribuição ficam fortes enquanto outras desaparecem."
    >
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-4">
          <label className="grid gap-2 rounded-3xl bg-white p-4 text-sm font-black text-slate-700">
            <span className="flex items-center justify-between">
              foco em poucos padrões
              <span className="font-mono text-slate-950">{focus.toFixed(2)}</span>
            </span>
            <input
              className="w-full accent-slate-950"
              max={1}
              min={0.1}
              step={0.05}
              type="range"
              value={focus}
              onChange={(event) => setFocus(Number(event.target.value))}
            />
          </label>
          <label className="grid gap-2 rounded-3xl bg-white p-4 text-sm font-black text-slate-700">
            <span className="flex items-center justify-between">
              estabilidade do processo
              <span className="font-mono text-slate-950">{stability.toFixed(2)}</span>
            </span>
            <input
              className="w-full accent-slate-950"
              max={1}
              min={0.1}
              step={0.05}
              type="range"
              value={stability}
              onChange={(event) => setStability(Number(event.target.value))}
            />
          </label>
          <div className="grid gap-3 sm:grid-cols-2">
            <MetricCard label="cobertura estimada" value={`${Math.round(coverage * 100)}%`} />
            <MetricCard label="risco de collapse" value={`${Math.round((1 - coverage) * 100)}%`} />
            <MetricCard label="modo dominante" value={focus > 0.7 ? "muito forte" : "moderado"} />
            <MetricCard label="diversidade restante" value={`${Math.round((1 - focus * 0.65) * 100)}%`} />
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-4">
            <p className="text-sm leading-6 text-slate-700">
              {focus > 0.75
                ? "O gerador está se especializando demais em poucos padrões. As amostras podem parecer boas, mas regiões inteiras da distribuição estão ficando desertas."
                : "Há espaço para mais modos sobreviverem. Cobertura melhor costuma vir acompanhada de treinamento mais estável e pressão menos oportunista sobre poucos padrões."}
            </p>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-5">
          <svg className="w-full" viewBox="0 0 340 280" role="img" aria-label="Cobertura simplificada de modos">
            <rect x="0" y="0" width="340" height="280" rx="24" fill="#fffbeb" />
            {[
              { x: 90, y: 90, value: modes[0], label: "modo A" },
              { x: 250, y: 90, value: modes[1], label: "modo B" },
              { x: 90, y: 200, value: modes[2], label: "modo C" },
              { x: 250, y: 200, value: modes[3], label: "modo D" },
            ].map((mode) => (
              <g key={mode.label}>
                <circle
                  cx={mode.x}
                  cy={mode.y}
                  r={26 + mode.value * 30}
                  fill="#f59e0b"
                  opacity={0.18 + mode.value * 0.48}
                />
                <circle cx={mode.x} cy={mode.y} r="10" fill="#d97706" />
                <text x={mode.x} y={mode.y + 54} textAnchor="middle" fill="#92400e" fontSize="12" fontWeight="800">
                  {mode.label}
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
  "adversarial-balance-lab": adversarialBalanceLab,
  "family-comparison-scenarios": familyComparisonScenarios,
  "mode-coverage-lab": ModeCoverageLab,
} satisfies LessonModule["interactions"];
