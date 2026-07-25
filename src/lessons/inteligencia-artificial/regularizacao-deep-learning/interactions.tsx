import { Clock3, Shield, Umbrella } from "lucide-react";
import type { LessonModule } from "../../../types/content";
import {
  createScenarioExplorer,
  createSliderPlayground,
} from "../_shared/interactionFactories";

const dropoutLab = createSliderPlayground({
  eyebrow: "Dropout",
  title: "Veja como a taxa de dropout muda a capacidade ativa",
  description:
    "Ajuste largura, taxa de dropout e ruído do dataset para entender quando o método ajuda e quando começa a sufocar o modelo.",
  tone: "violet",
  icon: <Umbrella size={18} aria-hidden="true" />,
  initialState: {
    width: 512,
    dropout: 0.3,
    noise: 0.4,
  },
  controls: [
    { key: "width", label: "largura da camada", min: 64, max: 1024, step: 64 },
    {
      key: "dropout",
      label: "taxa de dropout",
      min: 0,
      max: 0.8,
      step: 0.05,
      formatValue: (value) => `${Math.round(value * 100)}%`,
    },
    {
      key: "noise",
      label: "ruído/espuriedade do dataset",
      min: 0,
      max: 1,
      step: 0.05,
      formatValue: (value) => value.toFixed(2),
    },
  ],
  compute: ({ width, dropout, noise }) => {
    const active = Math.round(width * (1 - dropout));
    const robustness = Math.max(0, Math.min(1, dropout * 1.4 + noise * 0.3));
    const underfitRisk = Math.max(0, dropout - 0.45) * 1.5;
    const ensemble = Math.max(0, Math.min(1, dropout * 1.2));

    return {
      metrics: [
        { label: "unidades ativas", value: `${active}` },
        { label: "taxa de dropout", value: `${Math.round(dropout * 100)}%` },
        { label: "efeito de ensemble", value: `${(ensemble * 100).toFixed(0)}%` },
        { label: "risco de underfit", value: `${(Math.min(1, underfitRisk) * 100).toFixed(0)}%` },
      ],
      bars: [
        { label: "Robustez a coadaptação", value: robustness, display: `${(robustness * 100).toFixed(0)}%` },
        { label: "Capacidade preservada", value: 1 - Math.min(1, underfitRisk), display: `${((1 - Math.min(1, underfitRisk)) * 100).toFixed(0)}%` },
        { label: "Sub-redes implícitas", value: ensemble, display: `${(ensemble * 100).toFixed(0)}%` },
      ],
      narrative:
        dropout >= 0.55
          ? "Aqui o freio já está pesado. Você reduz dependências frágeis, mas também remove capacidade ativa demais e pode empurrar a rede para underfitting."
          : dropout <= 0.1
            ? "Com dropout quase nulo, a rede mantém toda a capacidade disponível, mas também fica mais livre para coadaptar neurônios e memorizar ruído do treino."
            : "Nesta faixa intermediária, o dropout atua como ruído estruturado: a rede continua capaz, mas é forçada a distribuir melhor sua representação.",
      footer:
        "O melhor valor depende da arquitetura. Redes modernas com BatchNorm e residuals às vezes exigem menos dropout do que MLPs antigas.",
    };
  },
});

const weightDecayLab = createSliderPlayground({
  eyebrow: "Norma dos pesos",
  title: "Ajuste a pressão do weight decay",
  description:
    "Observe como lambda, learning rate e escala atual dos pesos mudam a força de contração aplicada ao modelo.",
  tone: "indigo",
  icon: <Shield size={18} aria-hidden="true" />,
  initialState: {
    lambda: 0.01,
    lr: 0.001,
    weightNorm: 1.2,
  },
  controls: [
    {
      key: "lambda",
      label: "weight decay",
      min: 0,
      max: 0.1,
      step: 0.005,
      formatValue: (value) => value.toFixed(3),
    },
    {
      key: "lr",
      label: "learning rate",
      min: 0.0001,
      max: 0.01,
      step: 0.0005,
      formatValue: (value) => value.toFixed(4),
    },
    {
      key: "weightNorm",
      label: "norma média dos pesos",
      min: 0.2,
      max: 3,
      step: 0.1,
      formatValue: (value) => value.toFixed(1),
    },
  ],
  compute: ({ lambda, lr, weightNorm }) => {
    const shrink = Math.min(1, lambda * 10 + lr * 30);
    const rigidity = Math.min(1, shrink * weightNorm * 0.7);
    const freedom = Math.max(0, 1 - rigidity);

    return {
      metrics: [
        { label: "pressão de contração", value: `${(shrink * 100).toFixed(0)}%` },
        { label: "norma atual", value: weightNorm.toFixed(1) },
        { label: "grau de liberdade", value: `${(freedom * 100).toFixed(0)}%` },
        { label: "regime", value: shrink > 0.75 ? "forte" : shrink < 0.2 ? "leve" : "moderado" },
      ],
      bars: [
        { label: "Controle da norma", value: shrink, display: `${(shrink * 100).toFixed(0)}%` },
        { label: "Risco de rigidez excessiva", value: rigidity, display: `${(rigidity * 100).toFixed(0)}%` },
        { label: "Capacidade flexível", value: freedom, display: `${(freedom * 100).toFixed(0)}%` },
      ],
      narrative:
        shrink > 0.75
          ? "A penalização está forte. Isso pode domar um modelo excessivamente livre, mas também dificultar aprender padrões reais com amplitude suficiente."
          : shrink < 0.2
            ? "O efeito regularizador é leve. Em datasets limpos e grandes isso pode bastar, mas em cenários pequenos ou ruidosos talvez seja insuficiente."
            : "A faixa intermediária costuma ser a mais saudável: há pressão contra soluções extremas sem sufocar completamente a adaptação dos pesos.",
      footer:
        "Em Adam e variantes, a forma como o weight decay é implementado importa. AdamW desacopla essa contração da atualização principal do gradiente.",
    };
  },
});

const trainingCurvesLab = createScenarioExplorer({
  eyebrow: "Curvas de treino",
  title: "Compare regimes de regularização",
  description:
    "Selecione um cenário para ler o padrão típico de treino e validação.",
  tone: "rose",
  icon: <Clock3 size={18} aria-hidden="true" />,
  scenarios: [
    {
      id: "sem-reg",
      label: "Quase sem regularização",
      title: "Treino excelente, validação frágil",
      description:
        "A rede usa toda sua liberdade e começa a capturar detalhes específicos demais do conjunto de treino.",
      bullets: [
        "Gap crescente entre treino e validação.",
        "Memorização de padrões espúrios fica mais provável.",
        "Melhorar mais o treino já não melhora o mundo real.",
      ],
      metrics: [
        { label: "loss treino", value: "muito baixa" },
        { label: "validação", value: "instável" },
      ],
      bars: [
        { label: "Risco de overfit", value: 0.88, display: "88%" },
        { label: "Capacidade útil", value: 0.74, display: "74%" },
      ],
    },
    {
      id: "equilibrado",
      label: "Equilibrado",
      title: "Treino bom, validação acompanha",
      description:
        "A regularização limita a especialização frágil, mas não impede a rede de aprender o padrão central.",
      bullets: [
        "Gap moderado e estável.",
        "Checkpoint de validação tende a ser claro.",
        "Soluções costumam ser mais robustas fora do treino.",
      ],
      metrics: [
        { label: "loss treino", value: "baixa" },
        { label: "validação", value: "boa" },
      ],
      bars: [
        { label: "Risco de overfit", value: 0.34, display: "34%" },
        { label: "Capacidade útil", value: 0.82, display: "82%" },
      ],
    },
    {
      id: "excesso",
      label: "Excesso de regularização",
      title: "Nem o treino engrena direito",
      description:
        "A rede ficou tão contida que não consegue aproveitar nem o padrão principal disponível nos dados.",
      bullets: [
        "Treino e validação ambos ruins.",
        "Dropout alto, weight decay forte ou parada cedo demais podem causar isso.",
        "Não confunda com falta de dados automaticamente.",
      ],
      metrics: [
        { label: "loss treino", value: "alta" },
        { label: "validação", value: "alta" },
      ],
      bars: [
        { label: "Risco de underfit", value: 0.86, display: "86%" },
        { label: "Capacidade útil", value: 0.28, display: "28%" },
      ],
    },
    {
      id: "early-stop",
      label: "Early stopping bem usado",
      title: "O melhor modelo está no meio do caminho",
      description:
        "O treino poderia continuar melhorando no conjunto visto, mas a validação indica que o ponto mais geral já passou.",
      bullets: [
        "A última época nem sempre é a melhor.",
        "Patience evita parar por ruído pontual.",
        "Checkpoint por validação captura o melhor compromisso temporal.",
      ],
      metrics: [
        { label: "checkpoint ótimo", value: "intermediário" },
        { label: "especialização tardia", value: "contida" },
      ],
      bars: [
        { label: "Aproveitamento do treino", value: 0.76, display: "76%" },
        { label: "Controle de overfit", value: 0.8, display: "80%" },
      ],
    },
  ],
});

export const interactions = {
  "dropout-lab": dropoutLab,
  "weight-decay-lab": weightDecayLab,
  "training-curves-lab": trainingCurvesLab,
} satisfies LessonModule["interactions"];
