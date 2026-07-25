import { Database, Gauge, TrendingUp } from "lucide-react";
import type { LessonModule } from "../../../types/content";
import {
  createScenarioExplorer,
  createSliderPlayground,
} from "../_shared/interactionFactories";

const scalingCurvesLab = createSliderPlayground({
  eyebrow: "Curvas de escala",
  title: "Equilibre parâmetros, tokens e compute",
  description:
    "Ajuste o tamanho do modelo, o volume de dados e o budget para visualizar regimes de ganho marginal e subtreino.",
  tone: "indigo",
  icon: <TrendingUp size={18} aria-hidden="true" />,
  initialState: {
    params: 40,
    tokens: 25,
    compute: 50,
  },
  controls: [
    { key: "params", label: "escala relativa de parâmetros", min: 5, max: 100, step: 5 },
    { key: "tokens", label: "escala relativa de tokens", min: 5, max: 100, step: 5 },
    { key: "compute", label: "orçamento relativo de compute", min: 10, max: 100, step: 5 },
  ],
  compute: ({ params, tokens, compute }) => {
    const paramPressure = params / compute;
    const tokenCoverage = tokens / compute;
    const balance = 1 - Math.min(1, Math.abs(paramPressure - tokenCoverage));
    const undertrained = Math.max(0, paramPressure - tokenCoverage);

    return {
      metrics: [
        { label: "balanço relativo", value: `${(balance * 100).toFixed(0)}%` },
        { label: "pressão de parâmetros", value: paramPressure.toFixed(2) },
        { label: "cobertura de tokens", value: tokenCoverage.toFixed(2) },
        { label: "risco de subtreino", value: `${(Math.min(1, undertrained) * 100).toFixed(0)}%` },
      ],
      bars: [
        { label: "Compatibilidade params/tokens", value: balance, display: `${(balance * 100).toFixed(0)}%` },
        { label: "Risco de modelo grande demais para o dado", value: Math.min(1, undertrained), display: `${(Math.min(1, undertrained) * 100).toFixed(0)}%` },
        { label: "Aproveitamento potencial do budget", value: Math.min(1, compute / 100), display: `${compute}%` },
      ],
      narrative:
        undertrained > 0.35
          ? "Você está colocando muito tamanho de modelo para pouco volume de dados relativo ao budget. É o tipo de regime em que a narrativa de subtreino fica plausível."
          : balance > 0.8
            ? "Parâmetros e tokens estão mais equilibrados para este budget hipotético. Esse é o tipo de zona em que a eficiência de escala tende a parecer melhor."
            : "Há algum desequilíbrio entre o tamanho do modelo e o quanto ele realmente vê de dado. Pequenas mudanças em qualquer eixo podem alterar bastante a eficiência do treino.",
      footer:
        "Os valores aqui são relativos e didáticos: o objetivo é enxergar o tipo de trade-off, não reproduzir um paper com exatidão numérica.",
    };
  },
});

const computeAllocationLab = createSliderPlayground({
  eyebrow: "Kaplan vs. Chinchilla",
  title: "Alocar compute é escolher um regime",
  description:
    "Ajuste a fração de compute dedicada a parâmetros, tokens e qualidade de corpus para ver como o equilíbrio muda.",
  tone: "teal",
  icon: <Gauge size={18} aria-hidden="true" />,
  initialState: {
    paramShare: 70,
    tokenShare: 40,
    quality: 0.7,
  },
  controls: [
    { key: "paramShare", label: "ênfase relativa em parâmetros", min: 10, max: 100, step: 5 },
    { key: "tokenShare", label: "ênfase relativa em tokens", min: 10, max: 100, step: 5 },
    {
      key: "quality",
      label: "qualidade/curadoria do corpus",
      min: 0.2,
      max: 1,
      step: 0.05,
      formatValue: (value) => value.toFixed(2),
    },
  ],
  compute: ({ paramShare, tokenShare, quality }) => {
    const balance = 1 - Math.min(1, Math.abs(paramShare - tokenShare) / 100);
    const usefulTokens = Math.min(1, (tokenShare / 100) * quality * 1.2);
    const oversizing = Math.max(0, (paramShare - tokenShare) / 100);

    return {
      metrics: [
        { label: "equilíbrio params/tokens", value: `${(balance * 100).toFixed(0)}%` },
        { label: "tokens realmente úteis", value: `${(usefulTokens * 100).toFixed(0)}%` },
        { label: "sinal de oversizing", value: `${(oversizing * 100).toFixed(0)}%` },
        { label: "qualidade de dados", value: `${(quality * 100).toFixed(0)}%` },
      ],
      bars: [
        { label: "Balanço de alocação", value: balance, display: `${(balance * 100).toFixed(0)}%` },
        { label: "Aproveitamento do corpus", value: usefulTokens, display: `${(usefulTokens * 100).toFixed(0)}%` },
        { label: "Risco de grande demais para pouco dado", value: oversizing, display: `${(oversizing * 100).toFixed(0)}%` },
      ],
      narrative:
        paramShare > tokenShare + 20
          ? "Você está empurrando a balança na direção de mais parâmetros do que dados relativos. É um retrato didático do risco apontado por trabalhos posteriores ao de Kaplan."
          : quality < 0.45
            ? "Mesmo com muitos tokens, a utilidade real cai quando a curadoria do corpus é fraca. Escalar quantidade bruta não corrige dados redundantes ou ruidosos."
            : "Há um equilíbrio mais saudável entre capacidade do modelo, exposição a tokens e qualidade do corpus. É essa combinação, não um eixo isolado, que define eficiência prática.",
      footer:
        "A discussão moderna não é só 'mais dados' ou 'mais parâmetros': é qual proporção faz mais sentido para o budget e para a qualidade do material disponível.",
    };
  },
});

const scalingScenarios = createScenarioExplorer({
  eyebrow: "Cenários",
  title: "Compare regimes de escala",
  description:
    "Esses cenários não são leis exatas, e sim retratos conceituais dos tipos de alocação que aparecem na prática.",
  tone: "amber",
  icon: <Database size={18} aria-hidden="true" />,
  scenarios: [
    {
      id: "oversized",
      label: "Modelo enorme, poucos tokens",
      title: "Capacidade alta, dieta curta",
      description:
        "O modelo é grande, mas não vê dado suficiente para aproveitar bem seu potencial dentro do budget disponível.",
      bullets: [
        "Pode parecer sofisticado no papel, mas desperdiçar parte do budget.",
        "É o tipo de regime que alimenta a ideia de subtreino.",
        "Serve como alerta contra a obsessão por parâmetros isolados.",
      ],
      metrics: [
        { label: "capacidade", value: "muito alta" },
        { label: "exposição a dados", value: "baixa" },
      ],
      bars: [
        { label: "Risco de subtreino", value: 0.88, display: "88%" },
        { label: "Eficiência global", value: 0.36, display: "36%" },
      ],
    },
    {
      id: "balanced",
      label: "Balanceado",
      title: "Parâmetros e tokens conversam melhor",
      description:
        "A capacidade do modelo e o volume de treino estão mais próximos de um regime em que compute é bem aproveitado.",
      bullets: [
        "A perda tende a cair de forma mais eficiente por unidade de compute.",
        "A interpretação moderna de compute-optimal vai nessa direção.",
        "Também ajuda na economia downstream de modelos não superdimensionados.",
      ],
      metrics: [
        { label: "capacidade", value: "alta" },
        { label: "exposição a dados", value: "alta" },
      ],
      bars: [
        { label: "Risco de subtreino", value: 0.24, display: "24%" },
        { label: "Eficiência global", value: 0.82, display: "82%" },
      ],
    },
    {
      id: "dirty-data",
      label: "Muito dado, pouca curadoria",
      title: "Tokens abundantes, aprendizado desperdiçado",
      description:
        "O volume é grande, mas o corpus contém redundância, ruído e mistura ruim de fontes.",
      bullets: [
        "Contagem de tokens engana se boa parte do material é fraca.",
        "Deduplicação e filtragem importam de verdade.",
        "Escalar dados brutos sem curadoria pode ter retorno decrescente precoce.",
      ],
      metrics: [
        { label: "volume bruto", value: "alto" },
        { label: "valor por token", value: "baixo" },
      ],
      bars: [
        { label: "Eficiência do corpus", value: 0.34, display: "34%" },
        { label: "Ilusão de escala", value: 0.78, display: "78%" },
      ],
    },
  ],
});

export const interactions = {
  "scaling-curves-lab": scalingCurvesLab,
  "compute-allocation-lab": computeAllocationLab,
  "scaling-scenarios": scalingScenarios,
} satisfies LessonModule["interactions"];
