import { Activity, Gauge, Scale } from "lucide-react";
import type { LessonModule } from "../../../types/content";
import {
  createScenarioExplorer,
  createSliderPlayground,
} from "../_shared/interactionFactories";

const varianceLab = createSliderPlayground({
  eyebrow: "Propagação de variância",
  title: "Veja como a escala inicial se acumula em profundidade",
  description:
    "Ajuste fan-in, ganho e profundidade para sentir quando o sinal tende a explodir, apagar ou permanecer utilizável.",
  tone: "indigo",
  icon: <Scale size={18} aria-hidden="true" />,
  initialState: {
    fanIn: 256,
    gain: 1,
    depth: 18,
  },
  controls: [
    {
      key: "fanIn",
      label: "fan-in da camada",
      min: 16,
      max: 1024,
      step: 16,
    },
    {
      key: "gain",
      label: "ganho efetivo da transformação",
      min: 0.4,
      max: 1.8,
      step: 0.05,
      formatValue: (value) => value.toFixed(2),
    },
    {
      key: "depth",
      label: "profundidade aproximada",
      min: 2,
      max: 48,
      step: 2,
    },
  ],
  compute: ({ fanIn, gain, depth }) => {
    const baseStd = Math.sqrt(2 / fanIn);
    const drift = Math.pow(gain, depth / 6);
    const healthy = Math.max(0, 1 - Math.abs(drift - 1));
    const vanish = drift < 1 ? Math.min(1, 1 - drift) : 0;
    const explode = drift > 1 ? Math.min(1, drift - 1) / 2 : 0;

    return {
      metrics: [
        { label: "desvio inicial (He)", value: baseStd.toFixed(3) },
        { label: "deriva acumulada", value: `${drift.toFixed(2)}x` },
        { label: "profundidade", value: `${depth} camadas` },
        { label: "regime", value: drift > 1.2 ? "explosivo" : drift < 0.85 ? "apagado" : "estável" },
      ],
      bars: [
        { label: "Sinal preservado", value: healthy, display: `${(healthy * 100).toFixed(0)}%` },
        { label: "Risco de apagamento", value: vanish, display: `${(vanish * 100).toFixed(0)}%` },
        { label: "Risco de explosão", value: explode, display: `${(explode * 100).toFixed(0)}%` },
      ],
      narrative:
        drift > 1.2
          ? "Com ganho efetivo acima do necessário, cada bloco injeta um pouco mais de energia no sinal. Em profundidade alta, esse excesso se acumula e o treino tende a oscilar ou divergir."
          : drift < 0.85
            ? "Com ganho efetivo baixo, a informação vai sendo comprimida camada após camada. A rede começa o treino tímida demais: ativações e gradientes chegam enfraquecidos ao início."
            : "A escala está perto de um regime saudável: nem contração persistente, nem amplificação persistente. É exatamente esse tipo de ponto de partida que boas inicializações tentam aproximar.",
      footer:
        "Não é um simulador exato de uma arquitetura real; é uma intuição sobre como pequenos erros de escala se acumulam em redes profundas.",
    };
  },
});

const batchNormLab = createSliderPlayground({
  eyebrow: "Estatísticas do batch",
  title: "Observe o efeito de recentrar e reescalar ativações",
  description:
    "Controle média, desvio e gamma para ver como BatchNorm torna a entrada da próxima camada mais previsível.",
  tone: "teal",
  icon: <Activity size={18} aria-hidden="true" />,
  initialState: {
    mean: 1.2,
    std: 2.1,
    gamma: 1,
  },
  controls: [
    {
      key: "mean",
      label: "média bruta do batch",
      min: -3,
      max: 3,
      step: 0.1,
      formatValue: (value) => value.toFixed(1),
    },
    {
      key: "std",
      label: "desvio bruto do batch",
      min: 0.2,
      max: 3.5,
      step: 0.1,
      formatValue: (value) => value.toFixed(1),
    },
    {
      key: "gamma",
      label: "gamma após normalização",
      min: 0.2,
      max: 2.2,
      step: 0.1,
      formatValue: (value) => value.toFixed(1),
    },
  ],
  compute: ({ mean, std, gamma }) => {
    const normalizedStd = gamma;
    const predictability = Math.max(0, 1 - Math.abs(std - 1) / 3);
    const shiftPenalty = Math.min(1, Math.abs(mean) / 3);
    const control = Math.max(0, 1 - Math.abs(gamma - 1) / 1.5);

    return {
      metrics: [
        { label: "média antes", value: mean.toFixed(1) },
        { label: "desvio antes", value: std.toFixed(1) },
        { label: "média após BN", value: "0.0" },
        { label: "desvio após gamma", value: normalizedStd.toFixed(1) },
      ],
      bars: [
        { label: "Previsibilidade da próxima camada", value: predictability, display: `${(predictability * 100).toFixed(0)}%` },
        { label: "Deslocamento corrigido", value: 1 - shiftPenalty, display: `${((1 - shiftPenalty) * 100).toFixed(0)}%` },
        { label: "Escala mantida sob controle", value: control, display: `${(control * 100).toFixed(0)}%` },
      ],
      narrative:
        std > 2.5 || Math.abs(mean) > 2
          ? "As ativações brutas estão bem deslocadas e espalhadas. BatchNorm ajuda a recentrar esse fluxo antes que a próxima camada precise lidar com uma escala errática."
          : gamma > 1.6
            ? "Mesmo após normalizar, gamma pode reexpandir a ativação. Isso é útil quando a rede precisa de amplitude, mas exageros reintroduzem sensibilidade de escala."
            : "O ponto interessante do BatchNorm é exatamente este: padronizar sem impedir a rede de escolher uma nova escala útil. Ele limpa o terreno, não apaga a expressividade.",
      footer:
        "Durante a inferência, BatchNorm não usa o batch atual, e sim estatísticas acumuladas ao longo do treino.",
    };
  },
});

const stabilityScenarios = createScenarioExplorer({
  eyebrow: "Cenários",
  title: "Compare combinações típicas de treino profundo",
  description:
    "Veja como escolhas de inicialização, normalização e arquitetura mudam o regime de estabilidade.",
  tone: "violet",
  icon: <Gauge size={18} aria-hidden="true" />,
  scenarios: [
    {
      id: "xavier-relu",
      label: "Xavier + ReLU",
      title: "Funciona, mas pode ficar tímido em profundidade",
      description:
        "Quando usado com ReLU profunda, Xavier pode não compensar totalmente a perda de variância causada pela ativação.",
      bullets: [
        "Bom ponto de partida em redes moderadas.",
        "Pode encolher demais o sinal em pilhas muito profundas.",
        "Tende a pedir tuning mais fino de learning rate.",
      ],
      metrics: [
        { label: "Escala inicial", value: "moderada" },
        { label: "Robustez com ReLU", value: "média" },
      ],
      bars: [
        { label: "Estabilidade", value: 0.58, display: "58%" },
        { label: "Risco de apagamento", value: 0.42, display: "42%" },
      ],
    },
    {
      id: "he-relu",
      label: "He + ReLU",
      title: "Pareamento mais natural para redes com ReLU",
      description:
        "A escala inicial compensa melhor o efeito de meia retificação e tende a preservar o fluxo do sinal por mais camadas.",
      bullets: [
        "Escolha clássica em CNNs e MLPs com ReLU.",
        "Reduz o risco de começar o treino com ativações pequenas demais.",
        "Ainda não resolve sozinho batchs ruins ou learning rate absurdo.",
      ],
      metrics: [
        { label: "Escala inicial", value: "ajustada" },
        { label: "Robustez com ReLU", value: "alta" },
      ],
      bars: [
        { label: "Estabilidade", value: 0.78, display: "78%" },
        { label: "Risco de apagamento", value: 0.18, display: "18%" },
      ],
    },
    {
      id: "sem-bn-lr-alta",
      label: "Sem BN + LR alta",
      title: "Estrada escorregadia para a otimização",
      description:
        "Mesmo com inicialização razoável, passos muito agressivos sem controle de escala interna tornam o treino volátil.",
      bullets: [
        "Camadas passam a ver distribuições mudando violentamente.",
        "Oscilação de loss e NaNs ficam mais prováveis.",
        "Pequenas diferenças entre batches podem crescer demais.",
      ],
      metrics: [
        { label: "Tolerância a LR", value: "baixa" },
        { label: "Ruído interno", value: "alto" },
      ],
      bars: [
        { label: "Estabilidade", value: 0.22, display: "22%" },
        { label: "Risco de divergência", value: 0.76, display: "76%" },
      ],
    },
    {
      id: "bn-residual",
      label: "BN + residual",
      title: "Configuração que ampliou a profundidade praticável",
      description:
        "Normalização estabiliza blocos locais e atalhos residuais criam caminhos curtos para gradientes e sinal.",
      bullets: [
        "Aprendizado costuma tolerar mais profundidade.",
        "A identidade oferece um caminho de referência estável.",
        "Ainda exige tuning, mas o regime útil fica maior.",
      ],
      metrics: [
        { label: "Tolerância a LR", value: "alta" },
        { label: "Profundidade viável", value: "alta" },
      ],
      bars: [
        { label: "Estabilidade", value: 0.9, display: "90%" },
        { label: "Risco de divergência", value: 0.1, display: "10%" },
      ],
    },
  ],
});

export const interactions = {
  "variance-lab": varianceLab,
  "batchnorm-lab": batchNormLab,
  "stability-scenarios": stabilityScenarios,
} satisfies LessonModule["interactions"];
