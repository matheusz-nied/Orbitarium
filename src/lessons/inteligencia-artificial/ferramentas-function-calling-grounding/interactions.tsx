import { Cable, Compass, SearchCheck } from "lucide-react";
import type { LessonModule } from "../../../types/content";
import {
  createScenarioExplorer,
  createSliderPlayground,
} from "../_shared/interactionFactories";

const schemaLab = createSliderPlayground({
  eyebrow: "Schema",
  title: "Ajuste a clareza do contrato da ferramenta",
  description:
    "Veja como clareza do schema, ambiguidade dos argumentos e cobertura do catálogo influenciam precisão de chamada e risco de erro.",
  tone: "teal",
  icon: <Cable size={18} aria-hidden="true" />,
  initialState: {
    schemaClarity: 0.75,
    argAmbiguity: 0.35,
    toolCoverage: 0.7,
  },
  controls: [
    {
      key: "schemaClarity",
      label: "clareza do schema",
      min: 0.1,
      max: 1,
      step: 0.05,
      formatValue: (value) => value.toFixed(2),
    },
    {
      key: "argAmbiguity",
      label: "ambiguidade dos argumentos",
      min: 0.1,
      max: 1,
      step: 0.05,
      formatValue: (value) => value.toFixed(2),
    },
    {
      key: "toolCoverage",
      label: "cobertura do catálogo de ferramentas",
      min: 0.1,
      max: 1,
      step: 0.05,
      formatValue: (value) => value.toFixed(2),
    },
  ],
  compute: ({ schemaClarity, argAmbiguity, toolCoverage }) => {
    const callPrecision = Math.min(
      1,
      0.1 + schemaClarity * 0.48 + toolCoverage * 0.22 - argAmbiguity * 0.2,
    );
    const retryRate = Math.min(
      1,
      Math.max(0, 0.14 + argAmbiguity * 0.46 + (1 - schemaClarity) * 0.22),
    );
    const hallucinationRisk = Math.min(
      1,
      Math.max(0, 0.12 + (1 - toolCoverage) * 0.3 + (1 - schemaClarity) * 0.26),
    );

    return {
      metrics: [
        { label: "precisão da chamada", value: `${(callPrecision * 100).toFixed(0)}%` },
        { label: "taxa de retry", value: `${(retryRate * 100).toFixed(0)}%` },
        { label: "risco de improviso", value: `${(hallucinationRisk * 100).toFixed(0)}%` },
        { label: "fator crítico", value: "contrato claro" },
      ],
      bars: [
        { label: "Chance de chamar corretamente", value: callPrecision, display: `${(callPrecision * 100).toFixed(0)}%` },
        { label: "Chance de precisar corrigir", value: retryRate, display: `${(retryRate * 100).toFixed(0)}%` },
        { label: "Chance de o modelo improvisar", value: hallucinationRisk, display: `${(hallucinationRisk * 100).toFixed(0)}%` },
      ],
      narrative:
        schemaClarity < 0.4
          ? "A ferramenta está mal descrita. O modelo não sabe bem quando usá-la nem como preencher seus campos, então erra na escolha e nos argumentos."
          : argAmbiguity > 0.7
            ? "Mesmo com boa descrição, campos ambíguos fazem o modelo chutar valores ou omitir detalhes importantes, elevando retries e falhas de execução."
            : "Com schema claro e argumentos pouco ambíguos, o modelo usa melhor a ferramenta e o sistema ganha previsibilidade sem perder flexibilidade.",
      footer:
        "Ferramenta boa para humanos nem sempre é boa para modelos; a interface precisa ser pensada para ambos.",
    };
  },
});

const groundingSourcesLab = createSliderPlayground({
  eyebrow: "Grounding",
  title: "Regule a qualidade da evidência externa",
  description:
    "Ajuste frescor do retrieval, qualidade da fonte e liberdade de resposta para ver como a factualidade muda.",
  tone: "indigo",
  icon: <SearchCheck size={18} aria-hidden="true" />,
  initialState: {
    retrievalFreshness: 0.7,
    sourceQuality: 0.8,
    answerFreedom: 0.5,
  },
  controls: [
    {
      key: "retrievalFreshness",
      label: "atualidade do contexto recuperado",
      min: 0.1,
      max: 1,
      step: 0.05,
      formatValue: (value) => value.toFixed(2),
    },
    {
      key: "sourceQuality",
      label: "qualidade e autoridade da fonte",
      min: 0.1,
      max: 1,
      step: 0.05,
      formatValue: (value) => value.toFixed(2),
    },
    {
      key: "answerFreedom",
      label: "liberdade do modelo para extrapolar",
      min: 0.1,
      max: 1,
      step: 0.05,
      formatValue: (value) => value.toFixed(2),
    },
  ],
  compute: ({ retrievalFreshness, sourceQuality, answerFreedom }) => {
    const factualConfidence = Math.min(
      1,
      0.1 + retrievalFreshness * 0.32 + sourceQuality * 0.42 - answerFreedom * 0.08,
    );
    const latency = Math.min(1, 0.12 + retrievalFreshness * 0.14 + sourceQuality * 0.12);
    const unsupportedClaims = Math.min(
      1,
      Math.max(0, 0.12 + answerFreedom * 0.42 + (1 - sourceQuality) * 0.24),
    );

    return {
      metrics: [
        { label: "confiança factual", value: `${(factualConfidence * 100).toFixed(0)}%` },
        { label: "latência relativa", value: `${(latency * 100).toFixed(0)}%` },
        { label: "afirmações sem suporte", value: `${(unsupportedClaims * 100).toFixed(0)}%` },
        { label: "princípio central", value: "evidência boa" },
      ],
      bars: [
        { label: "Ancoragem na evidência", value: factualConfidence, display: `${(factualConfidence * 100).toFixed(0)}%` },
        { label: "Custo do grounding", value: latency, display: `${(latency * 100).toFixed(0)}%` },
        { label: "Risco de extrapolar além da fonte", value: unsupportedClaims, display: `${(unsupportedClaims * 100).toFixed(0)}%` },
      ],
      narrative:
        sourceQuality < 0.4
          ? "O modelo está sendo grounded em material fraco. Isso pode parecer rigor, mas ainda produz respostas frágeis porque a própria evidência é ruim."
          : answerFreedom > 0.75
            ? "O contexto recuperado existe, porém o modelo ganhou liberdade demais para extrapolar. Nesse regime, grounding deixa de conter bem o improviso."
            : "Aqui o grounding cumpre seu papel: traz evidência relevante e mantém a resposta mais colada ao que foi observado.",
      footer:
        "Grounding não é só recuperar texto; é recuperar boa evidência e limitar o quanto a resposta pode se afastar dela.",
    };
  },
});

const toolRoutingScenarios = createScenarioExplorer({
  eyebrow: "Roteamento",
  title: "Compare ecossistemas de ferramentas",
  description:
    "Veja como a organização do catálogo afeta escolha, precisão e robustez do sistema.",
  tone: "amber",
  icon: <Compass size={18} aria-hidden="true" />,
  scenarios: [
    {
      id: "no-tools",
      label: "Sem ferramentas",
      title: "Tudo depende da memória paramétrica",
      description:
        "Útil para explicações gerais, mas fraco em tarefas que exigem dados atuais, ações externas ou precisão determinística.",
      bullets: [
        "Baixa complexidade arquitetural.",
        "Maior risco de improviso em fatos atualizados.",
        "Não executa nada além de texto.",
      ],
      metrics: [
        { label: "cobertura funcional", value: "baixa" },
        { label: "latência", value: "baixa" },
      ],
      bars: [
        { label: "Capacidade factual verificável", value: 0.24, display: "24%" },
        { label: "Risco de improviso", value: 0.72, display: "72%" },
      ],
    },
    {
      id: "vague-tools",
      label: "Ferramentas vagas",
      title: "Há ferramentas, mas o catálogo confunde",
      description:
        "O modelo tem onde agir, porém schemas ruins e ferramentas parecidas derrubam a precisão de roteamento.",
      bullets: [
        "Chamadas incorretas e retries aparecem com frequência.",
        "O sistema parece sofisticado, mas desperdiça parte do potencial.",
        "Boa organização do catálogo faz muita diferença aqui.",
      ],
      metrics: [
        { label: "cobertura funcional", value: "média" },
        { label: "latência", value: "média" },
      ],
      bars: [
        { label: "Capacidade factual verificável", value: 0.54, display: "54%" },
        { label: "Risco de improviso", value: 0.48, display: "48%" },
      ],
    },
    {
      id: "grounded-toolchain",
      label: "Ferramentas organizadas + grounding",
      title: "Delegação clara e resposta mais ancorada",
      description:
        "O catálogo visível é contextual, os schemas são bons e as respostas são construídas a partir de observações úteis.",
      bullets: [
        "Melhor equilíbrio entre factualidade e capacidade de agir.",
        "Requer mais engenharia de validação e seleção dinâmica.",
        "Escala melhor do que despejar todo o catálogo no prompt.",
      ],
      metrics: [
        { label: "cobertura funcional", value: "alta" },
        { label: "latência", value: "moderada" },
      ],
      bars: [
        { label: "Capacidade factual verificável", value: 0.86, display: "86%" },
        { label: "Risco de improviso", value: 0.2, display: "20%" },
      ],
    },
  ],
});

export const interactions = {
  "schema-lab": schemaLab,
  "grounding-sources-lab": groundingSourcesLab,
  "tool-routing-scenarios": toolRoutingScenarios,
} satisfies LessonModule["interactions"];
