import { Layers3, MoveHorizontal, ScanSearch } from "lucide-react";
import type { LessonModule } from "../../../types/content";
import {
  createScenarioExplorer,
  createSliderPlayground,
} from "../_shared/interactionFactories";

const filterLab = createSliderPlayground({
  eyebrow: "Filtro e geometria",
  title: "Ajuste kernel, stride e padding",
  description:
    "Veja como escolhas geométricas mudam resolução de saída, receptive field local e densidade da varredura.",
  tone: "emerald",
  icon: <ScanSearch size={18} aria-hidden="true" />,
  initialState: {
    input: 32,
    kernel: 3,
    stride: 1,
    padding: 1,
  },
  controls: [
    { key: "input", label: "tamanho espacial da entrada", min: 16, max: 96, step: 8 },
    { key: "kernel", label: "kernel size", min: 1, max: 9, step: 2 },
    { key: "stride", label: "stride", min: 1, max: 4, step: 1 },
    { key: "padding", label: "padding", min: 0, max: 4, step: 1 },
  ],
  compute: ({ input, kernel, stride, padding }) => {
    const output = Math.floor((input - kernel + 2 * padding) / stride) + 1;
    const coverage = Math.min(1, kernel / input);
    const sampling = Math.max(0, 1 - (stride - 1) / 4);
    const borderCare = Math.min(1, (padding + 1) / (kernel + 1));

    return {
      metrics: [
        { label: "saída espacial", value: `${output} × ${output}` },
        { label: "kernel", value: `${kernel} × ${kernel}` },
        { label: "stride", value: `${stride}` },
        { label: "padding", value: `${padding}` },
      ],
      bars: [
        { label: "Cobertura local por passo", value: coverage, display: `${(coverage * 100).toFixed(0)}%` },
        { label: "Densidade de amostragem", value: sampling, display: `${(sampling * 100).toFixed(0)}%` },
        { label: "Cuidado com bordas", value: borderCare, display: `${(borderCare * 100).toFixed(0)}%` },
      ],
      narrative:
        stride >= 3
          ? "Stride alto comprime a imagem rapidamente. Isso economiza custo, mas também pode pular detalhes finos importantes."
          : kernel >= 7
            ? "Kernels grandes enxergam mais contexto por passo, porém custam mais parâmetros e podem ser substituídos por pilhas de kernels menores em muitos projetos modernos."
            : "Kernel pequeno com stride moderado é um bloco clássico: observa vizinhança local e preserva bastante resolução para camadas seguintes.",
      footer:
        "A fórmula de saída ajuda a enxergar que geometria de convolução é tão importante quanto os pesos aprendidos.",
    };
  },
});

const poolingLab = createSliderPlayground({
  eyebrow: "Pooling",
  title: "Explore o efeito de resumir regiões",
  description:
    "Mude janela, stride e intensidade da ativação local para perceber a troca entre compactação e preservação de detalhe.",
  tone: "amber",
  icon: <MoveHorizontal size={18} aria-hidden="true" />,
  initialState: {
    window: 2,
    stride: 2,
    activationDensity: 0.6,
  },
  controls: [
    { key: "window", label: "janela de pooling", min: 2, max: 6, step: 1 },
    { key: "stride", label: "stride do pooling", min: 1, max: 4, step: 1 },
    {
      key: "activationDensity",
      label: "densidade de ativações relevantes",
      min: 0.1,
      max: 1,
      step: 0.1,
      formatValue: (value) => value.toFixed(1),
    },
  ],
  compute: ({ window, stride, activationDensity }) => {
    const compression = Math.min(1, (window * stride) / 12);
    const invariance = Math.min(1, (window - 1) / 5);
    const detailLoss = Math.min(1, compression * (1 - activationDensity / 1.2));

    return {
      metrics: [
        { label: "compressão espacial", value: `${(compression * 100).toFixed(0)}%` },
        { label: "robustez local", value: `${(invariance * 100).toFixed(0)}%` },
        { label: "perda de detalhe", value: `${(detailLoss * 100).toFixed(0)}%` },
        { label: "regime", value: window >= 4 ? "agressivo" : "moderado" },
      ],
      bars: [
        { label: "Compactação", value: compression, display: `${(compression * 100).toFixed(0)}%` },
        { label: "Invariância local", value: invariance, display: `${(invariance * 100).toFixed(0)}%` },
        { label: "Detalhe preservado", value: 1 - detailLoss, display: `${((1 - detailLoss) * 100).toFixed(0)}%` },
      ],
      narrative:
        window >= 4
          ? "Pooling agressivo resume demais a cena. É útil para reduzir custo, mas perigoso quando a tarefa depende de localização fina."
          : stride === 1
            ? "Com stride pequeno, o pooling resume sem reduzir tanto a resolução. O efeito de invariância aparece, mas a compactação é limitada."
            : "Pooling moderado é um compromisso clássico: compacta o mapa e mantém evidência local do padrão mais forte em cada vizinhança.",
      footer:
        "Em tarefas densas modernas, parte do papel do pooling foi substituída por convoluções com stride e por arquiteturas que preservam mais detalhe.",
    };
  },
});

const cnnScenarios = createScenarioExplorer({
  eyebrow: "Arquitetura",
  title: "Compare usos diferentes de CNNs",
  description:
    "O mesmo mecanismo convolucional pode ser configurado de formas bem distintas conforme a tarefa.",
  tone: "teal",
  icon: <Layers3 size={18} aria-hidden="true" />,
  scenarios: [
    {
      id: "classificacao",
      label: "Classificação",
      title: "Prioriza semântica global",
      description:
        "Em classificação, perder parte da resolução é aceitável se a rede ainda capturar bem o objeto ou a cena.",
      bullets: [
        "Downsampling costuma acontecer mais cedo.",
        "Objetivo principal é reconhecer o que existe na imagem.",
        "Detalhe exato de cada pixel importa menos no fim do pipeline.",
      ],
      metrics: [
        { label: "resolução mantida", value: "média" },
        { label: "semântica global", value: "alta" },
      ],
      bars: [
        { label: "Ênfase em contexto", value: 0.82, display: "82%" },
        { label: "Ênfase em detalhe fino", value: 0.34, display: "34%" },
      ],
    },
    {
      id: "segmentacao",
      label: "Segmentação",
      title: "Precisa devolver geometria fina",
      description:
        "A rede ainda quer semântica, mas também precisa preservar ou reconstruir detalhe espacial para rotular regiões.",
      bullets: [
        "Redução excessiva de resolução pode custar precisão de contorno.",
        "FPNs, skips e decoders ajudam a recuperar detalhe.",
        "A leitura local continua crucial, mas a saída é densa.",
      ],
      metrics: [
        { label: "resolução mantida", value: "alta" },
        { label: "semântica global", value: "alta" },
      ],
      bars: [
        { label: "Ênfase em contexto", value: 0.74, display: "74%" },
        { label: "Ênfase em detalhe fino", value: 0.8, display: "80%" },
      ],
    },
    {
      id: "mobile",
      label: "Modelo leve",
      title: "Custo e latência entram no projeto",
      description:
        "Em aplicações embarcadas, a mesma ideia convolucional precisa ser comprimida para caber em hardware mais restrito.",
      bullets: [
        "Depthwise separable convolutions reduzem custo.",
        "Menos canais e menos FLOPs viram prioridade prática.",
        "A arquitetura é guiada por restrição de dispositivo, não só por acurácia.",
      ],
      metrics: [
        { label: "custo", value: "baixo" },
        { label: "capacidade", value: "moderada" },
      ],
      bars: [
        { label: "Eficiência", value: 0.9, display: "90%" },
        { label: "Capacidade semântica", value: 0.58, display: "58%" },
      ],
    },
  ],
});

export const interactions = {
  "filter-lab": filterLab,
  "pooling-lab": poolingLab,
  "cnn-scenarios": cnnScenarios,
} satisfies LessonModule["interactions"];
