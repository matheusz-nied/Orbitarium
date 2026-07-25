import { BookOpenText, Layers3, SearchCheck } from "lucide-react";
import type { LessonModule } from "../../../types/content";
import {
  createScenarioExplorer,
  createSliderPlayground,
} from "../_shared/interactionFactories";

const topKContextLab = createSliderPlayground({
  eyebrow: "Top-k e contexto",
  title: "Equilibre cobertura e ruído",
  description:
    "Ajuste quantos candidatos entram, o tamanho do contexto final e o nível de ruído para visualizar o trade-off central do retrieval.",
  tone: "emerald",
  icon: <Layers3 size={18} aria-hidden="true" />,
  initialState: {
    topK: 6,
    contextBudget: 0.55,
    noise: 0.25,
  },
  controls: [
    { key: "topK", label: "quantidade de candidatos (top-k)", min: 1, max: 12, step: 1 },
    {
      key: "contextBudget",
      label: "orçamento de contexto útil",
      min: 0.1,
      max: 1,
      step: 0.05,
      formatValue: (value) => value.toFixed(2),
    },
    {
      key: "noise",
      label: "ruído entre os documentos recuperados",
      min: 0,
      max: 1,
      step: 0.05,
      formatValue: (value) => value.toFixed(2),
    },
  ],
  compute: ({ topK, contextBudget, noise }) => {
    const coverage = Math.min(1, topK / 10 * 0.65 + contextBudget * 0.35);
    const distraction = Math.min(1, noise * 0.65 + (topK / 12) * 0.25 + (1 - contextBudget) * 0.2);
    const effectiveContext = Math.max(0, coverage * 0.8 - distraction * 0.4);

    return {
      metrics: [
        { label: "cobertura potencial", value: `${(coverage * 100).toFixed(0)}%` },
        { label: "distração", value: `${(distraction * 100).toFixed(0)}%` },
        { label: "contexto realmente útil", value: `${(effectiveContext * 100).toFixed(0)}%` },
        { label: "regime", value: topK <= 3 ? "curto" : noise > 0.6 ? "ruidoso" : "balanceado" },
      ],
      bars: [
        { label: "Cobertura", value: coverage, display: `${(coverage * 100).toFixed(0)}%` },
        { label: "Ruído", value: distraction, display: `${(distraction * 100).toFixed(0)}%` },
        { label: "Aproveitamento final", value: effectiveContext, display: `${(effectiveContext * 100).toFixed(0)}%` },
      ],
      narrative:
        topK <= 2
          ? "Poucos candidatos mantêm foco, mas o sistema corre risco de nem sequer trazer a evidência correta quando a consulta é ambígua ou complexa."
          : noise > 0.55
            ? "Mesmo com vários candidatos, o contexto se polui. O modelo lê mais, mas usa pior a informação realmente decisiva."
            : "A meta não é encher a janela de contexto. É maximizar a chance de o trecho certo entrar em posição útil e com pouca competição irrelevante.",
      footer:
        "Top-k ideal não é constante universal; ele depende da consulta, da base e da política de construção de contexto.",
    };
  },
});

const retrievalCoverageLab = createSliderPlayground({
  eyebrow: "Grounded answering",
  title: "Veja a resposta depender da cadeia inteira",
  description:
    "Ajuste qualidade do retrieval, coerência dos chunks e disciplina de resposta para observar quando RAG realmente ancora a geração.",
  tone: "teal",
  icon: <SearchCheck size={18} aria-hidden="true" />,
  initialState: {
    retrieval: 0.65,
    chunkQuality: 0.6,
    answerDiscipline: 0.55,
  },
  controls: [
    {
      key: "retrieval",
      label: "qualidade do retrieval",
      min: 0.05,
      max: 1,
      step: 0.05,
      formatValue: (value) => value.toFixed(2),
    },
    {
      key: "chunkQuality",
      label: "coerência dos chunks",
      min: 0.05,
      max: 1,
      step: 0.05,
      formatValue: (value) => value.toFixed(2),
    },
    {
      key: "answerDiscipline",
      label: "disciplina da resposta ao usar evidência",
      min: 0,
      max: 1,
      step: 0.05,
      formatValue: (value) => value.toFixed(2),
    },
  ],
  compute: ({ retrieval, chunkQuality, answerDiscipline }) => {
    const grounding = Math.min(1, retrieval * 0.45 + chunkQuality * 0.25 + answerDiscipline * 0.3);
    const citationReadiness = Math.min(1, retrieval * 0.35 + answerDiscipline * 0.45 + chunkQuality * 0.2);
    const driftRisk = Math.max(0, 1 - grounding + (1 - answerDiscipline) * 0.15);

    return {
      metrics: [
        { label: "grounding", value: `${(grounding * 100).toFixed(0)}%` },
        { label: "prontidão para citar", value: `${(citationReadiness * 100).toFixed(0)}%` },
        { label: "risco de deriva", value: `${(driftRisk * 100).toFixed(0)}%` },
        { label: "elo mais crítico", value: retrieval < 0.4 ? "retrieval" : chunkQuality < 0.4 ? "chunking" : answerDiscipline < 0.4 ? "síntese" : "nenhum isolado" },
      ],
      bars: [
        { label: "Retriever", value: retrieval, display: `${(retrieval * 100).toFixed(0)}%` },
        { label: "Chunking", value: chunkQuality, display: `${(chunkQuality * 100).toFixed(0)}%` },
        { label: "Uso da evidência", value: answerDiscipline, display: `${(answerDiscipline * 100).toFixed(0)}%` },
      ],
      narrative:
        retrieval < 0.35
          ? "Sem trazer o material certo, a arquitetura inteira perde fundamento. O modelo pode ficar eloquente, mas sem o suporte que RAG prometia."
          : answerDiscipline < 0.35
            ? "A base e o retrieval podem estar bons, mas a geração ainda escapa do trilho porque a política de resposta permite extrapolar demais."
            : "RAG forte emerge quando a cadeia fecha: o trecho certo aparece, vem em unidade coerente e a resposta respeita a evidência em vez de tratá-la como pano de fundo decorativo.",
      footer:
        "RAG não reduz alucinação por decreto. Ele reduz quando a recuperação certa realmente governa a síntese final.",
    };
  },
});

const ragDesignScenarios = createScenarioExplorer({
  eyebrow: "Cenários de design",
  title: "Compare três estilos de RAG",
  description:
    "A mesma ideia de retrieval pode virar produtos bastante diferentes dependendo de ranking, políticas e risco aceito.",
  tone: "amber",
  icon: <BookOpenText size={18} aria-hidden="true" />,
  scenarios: [
    {
      id: "naive-rag",
      label: "RAG ingênuo",
      title: "Recupera algo e espera que o modelo faça o resto",
      description:
        "Pipeline básico, sem muito controle de qualidade sobre ranking, chunking ou disciplina de resposta.",
      bullets: [
        "Fácil de prototipar.",
        "Sujeito a ruído, chunks ruins e respostas extrapoladas.",
        "Pode parecer bom em demos e falhar sob consulta difícil.",
      ],
      metrics: [
        { label: "complexidade", value: "baixa" },
        { label: "confiabilidade", value: "média-baixa" },
      ],
      bars: [
        { label: "Velocidade de implementação", value: 0.88, display: "88%" },
        { label: "Controle de grounding", value: 0.38, display: "38%" },
      ],
    },
    {
      id: "ranked-rag",
      label: "RAG com reranking",
      title: "Mais trabalho na seleção, menos ruído no contexto",
      description:
        "O pipeline investe mais em trazer poucos trechos fortes e organizá-los melhor para a síntese.",
      bullets: [
        "Melhora precisão do contexto entregue ao modelo.",
        "Exige avaliação mais refinada dos candidatos.",
        "Costuma ser um bom equilíbrio para bases corporativas.",
      ],
      metrics: [
        { label: "complexidade", value: "média" },
        { label: "confiabilidade", value: "alta" },
      ],
      bars: [
        { label: "Velocidade de implementação", value: 0.58, display: "58%" },
        { label: "Controle de grounding", value: 0.76, display: "76%" },
      ],
    },
    {
      id: "guarded-rag",
      label: "RAG com guardrails",
      title: "Recupera, sintetiza e sabe frear quando a base não basta",
      description:
        "Além de retrieval e ranking, a política de geração enfatiza citação, explicitação de conflito e abstenção quando necessário.",
      bullets: [
        "Forte para ambientes regulados ou de alto custo de erro.",
        "Pode responder menos, mas com mais disciplina epistemológica.",
        "Exige UX e observabilidade melhores.",
      ],
      metrics: [
        { label: "complexidade", value: "alta" },
        { label: "confiabilidade", value: "muito alta" },
      ],
      bars: [
        { label: "Velocidade de implementação", value: 0.42, display: "42%" },
        { label: "Controle de grounding", value: 0.88, display: "88%" },
      ],
    },
  ],
});

export const interactions = {
  "topk-context-lab": topKContextLab,
  "retrieval-coverage-lab": retrievalCoverageLab,
  "rag-design-scenarios": ragDesignScenarios,
} satisfies LessonModule["interactions"];
