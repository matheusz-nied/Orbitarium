import { Bug, LayoutTemplate, Route } from "lucide-react";
import type { LessonModule } from "../../../types/content";
import {
  createScenarioExplorer,
  createSliderPlayground,
} from "../_shared/interactionFactories";

const promptStructureLab = createSliderPlayground({
  eyebrow: "Estrutura",
  title: "Ajuste clareza, contexto e restrições",
  description:
    "Veja como a qualidade do prompt muda quando você mexe na nitidez do objetivo, na relevância do contexto e na força das restrições.",
  tone: "violet",
  icon: <LayoutTemplate size={18} aria-hidden="true" />,
  initialState: {
    clarity: 0.65,
    context: 0.55,
    constraints: 0.45,
  },
  controls: [
    {
      key: "clarity",
      label: "clareza do objetivo",
      min: 0.05,
      max: 1,
      step: 0.05,
      formatValue: (value) => value.toFixed(2),
    },
    {
      key: "context",
      label: "relevância do contexto fornecido",
      min: 0.05,
      max: 1,
      step: 0.05,
      formatValue: (value) => value.toFixed(2),
    },
    {
      key: "constraints",
      label: "força das restrições e formato",
      min: 0,
      max: 1,
      step: 0.05,
      formatValue: (value) => value.toFixed(2),
    },
  ],
  compute: ({ clarity, context, constraints }) => {
    const adherence = Math.min(1, clarity * 0.45 + context * 0.25 + constraints * 0.3);
    const ambiguity = Math.max(0, 1 - (clarity * 0.6 + constraints * 0.25 + context * 0.15));
    const rigidity = Math.max(0, constraints * 0.7 - context * 0.15);

    return {
      metrics: [
        { label: "aderência esperada", value: `${(adherence * 100).toFixed(0)}%` },
        { label: "ambiguidade residual", value: `${(ambiguity * 100).toFixed(0)}%` },
        { label: "rigidez operacional", value: `${(rigidity * 100).toFixed(0)}%` },
        { label: "regime", value: clarity < 0.4 ? "vago" : constraints > 0.75 ? "controlado" : "equilibrado" },
      ],
      bars: [
        { label: "Objetivo compreensível", value: clarity, display: `${(clarity * 100).toFixed(0)}%` },
        { label: "Contexto acionável", value: context, display: `${(context * 100).toFixed(0)}%` },
        { label: "Saída controlada", value: constraints, display: `${(constraints * 100).toFixed(0)}%` },
      ],
      narrative:
        clarity < 0.35
          ? "Com objetivo pouco claro, o modelo precisa adivinhar o que realmente importa. O resultado tende a variar mais do que o sistema gostaria."
          : constraints > 0.8 && context < 0.35
            ? "Há muito controle formal, mas pouca substância informacional. O modelo pode obedecer ao formato e ainda assim falhar semanticamente."
            : "Prompts fortes costumam combinar pedido nítido, contexto relevante e restrições suficientes para orientar a forma da resposta sem sufocar a tarefa.",
      footer:
        "Mais texto não significa melhor prompt. O que importa é a densidade de instrução útil para a tarefa.",
    };
  },
});

const promptStrategyComparison = createScenarioExplorer({
  eyebrow: "Estratégias",
  title: "Compare técnicas de prompting",
  description:
    "Cada técnica resolve um tipo diferente de problema. Escolha pela natureza da tarefa, não por moda.",
  tone: "indigo",
  icon: <Route size={18} aria-hidden="true" />,
  scenarios: [
    {
      id: "zero-shot",
      label: "Zero-shot",
      title: "Bom para tarefas simples e bem especificadas",
      description:
        "Quando a instrução é clara e o formato é objetivo, o modelo muitas vezes não precisa de exemplos adicionais.",
      bullets: [
        "Mais simples de manter.",
        "Menor custo de contexto.",
        "Pode falhar em fronteiras semânticas sutis ou estilos muito específicos.",
      ],
      metrics: [
        { label: "simplicidade", value: "alta" },
        { label: "dependência de exemplos", value: "baixa" },
      ],
      bars: [
        { label: "Custo de prompt", value: 0.22, display: "22%" },
        { label: "Flexibilidade", value: 0.72, display: "72%" },
      ],
    },
    {
      id: "few-shot",
      label: "Few-shot",
      title: "Exemplos pequenos ensinam nuance rapidamente",
      description:
        "Mostra ao modelo não só o que fazer, mas como fazer, especialmente em casos limítrofes ou formatos específicos.",
      bullets: [
        "Bom para classificação ambígua e tom editorial.",
        "Aumenta custo de contexto.",
        "Exemplos ruins podem ensinar o padrão errado.",
      ],
      metrics: [
        { label: "ensino de nuance", value: "alto" },
        { label: "custo de manutenção", value: "médio" },
      ],
      bars: [
        { label: "Custo de prompt", value: 0.54, display: "54%" },
        { label: "Aderência a padrão", value: 0.83, display: "83%" },
      ],
    },
    {
      id: "tool-use",
      label: "Ferramentas / ReAct",
      title: "Quando responder exige agir, buscar ou verificar",
      description:
        "Se a tarefa depende de busca, cálculo ou observação externa, prompting puro cede espaço para tool use e workflows agentivos.",
      bullets: [
        "Melhor para tarefas com informação externa ou ação.",
        "Exige arquitetura mais rica do que simples chat.",
        "Permite raciocínio com feedback do ambiente.",
      ],
      metrics: [
        { label: "alcance operacional", value: "muito alto" },
        { label: "complexidade", value: "alta" },
      ],
      bars: [
        { label: "Custo de integração", value: 0.82, display: "82%" },
        { label: "Capacidade operacional", value: 0.9, display: "90%" },
      ],
    },
  ],
});

const promptDebuggerScenarios = createScenarioExplorer({
  eyebrow: "Debugging",
  title: "Diagnostique a causa dominante da falha",
  description:
    "Em vez de trocar palavras aleatoriamente, identifique qual camada do prompt está quebrando o comportamento.",
  tone: "rose",
  icon: <Bug size={18} aria-hidden="true" />,
  scenarios: [
    {
      id: "missing-goal",
      label: "Objetivo frouxo",
      title: "O modelo não entendeu exatamente a tarefa",
      description:
        "A saída varia porque o pedido deixa espaço demais para interpretações concorrentes.",
      bullets: [
        "Sintoma: respostas corretas em tom, mas erradas em foco.",
        "Correção: explicitar objetivo e critério de sucesso.",
        "Pergunta útil: o que exatamente conta como resposta boa?",
      ],
      metrics: [
        { label: "causa provável", value: "ambiguidade" },
        { label: "melhor ação", value: "clarificar tarefa" },
      ],
      bars: [
        { label: "Desvio semântico", value: 0.78, display: "78%" },
        { label: "Problema de formato", value: 0.24, display: "24%" },
      ],
    },
    {
      id: "bad-examples",
      label: "Exemplos ruins",
      title: "Few-shot ensinando a fronteira errada",
      description:
        "Os exemplos podem codificar viés, ambiguidade ou estilo incorreto e contaminar toda a tarefa.",
      bullets: [
        "Sintoma: o modelo segue o padrão mostrado, mas o padrão está errado.",
        "Correção: revisar representatividade e consistência dos exemplos.",
        "Pergunta útil: os casos demonstrados realmente ensinam a nuance correta?",
      ],
      metrics: [
        { label: "causa provável", value: "few-shot" },
        { label: "melhor ação", value: "curar exemplos" },
      ],
      bars: [
        { label: "Aderência ao exemplo", value: 0.88, display: "88%" },
        { label: "Aderência à intenção real", value: 0.39, display: "39%" },
      ],
    },
    {
      id: "needs-tools",
      label: "Problema arquitetural",
      title: "O prompt está bom, mas a tarefa pede mais do sistema",
      description:
        "A falha não está na redação da instrução e sim na ausência de retrieval, ferramenta ou fonte de verdade externa.",
      bullets: [
        "Sintoma: respostas bem formatadas, porém sem acesso à informação necessária.",
        "Correção: adicionar ferramenta, RAG, validação ou workflow.",
        "Pergunta útil: o modelo tem como obter os dados de que precisa?",
      ],
      metrics: [
        { label: "causa provável", value: "capacidade" },
        { label: "melhor ação", value: "mudar arquitetura" },
      ],
      bars: [
        { label: "Qualidade da instrução", value: 0.78, display: "78%" },
        { label: "Capacidade operacional", value: 0.28, display: "28%" },
      ],
    },
  ],
});

export const interactions = {
  "prompt-structure-lab": promptStructureLab,
  "prompt-strategy-comparison": promptStrategyComparison,
  "prompt-debugger-scenarios": promptDebuggerScenarios,
} satisfies LessonModule["interactions"];
