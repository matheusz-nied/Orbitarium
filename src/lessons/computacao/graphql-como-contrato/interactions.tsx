import type { LessonModule } from "../../../types/content";
import { createComputacaoInteractions } from "../_shared/factories";

const interactionConfig = {
  "title": "GraphQL como Contrato de API",
  "pipelineSteps": [
    {
      "name": "Schema e validação",
      "summary": "A query é checada contra tipos, campos e argumentos permitidos.",
      "signal": "erros de validação",
      "risk": "contrato frouxo",
      "takeaway": "GraphQL começa no schema, não na query."
    },
    {
      "name": "Execução de resolvers",
      "summary": "Cada campo relevante dispara lógica de acesso, composição ou cálculo.",
      "signal": "latência por campo",
      "risk": "N+1",
      "takeaway": "Campo bonito pode esconder trabalho caro."
    },
    {
      "name": "Batching e políticas",
      "summary": "Camadas de cache, batching e autorização controlam custo e visibilidade.",
      "signal": "fan-out interno",
      "risk": "explosão de chamadas",
      "takeaway": "Servidor continua definindo limites."
    },
    {
      "name": "Resposta estruturada",
      "summary": "O cliente recebe exatamente a forma combinada no contrato.",
      "signal": "payload útil",
      "risk": "achar que formato implica baixo custo",
      "takeaway": "Resposta elegante não garante backend barato."
    }
  ],
  "leftLabel": "rigidez do servidor",
  "rightLabel": "flexibilidade do cliente",
  "tradeoffSummary": "Quanto mais flexível o cliente fica para montar respostas, mais disciplina o servidor precisa ter para controlar custo, batching, autorização e limites de profundidade.",
  "tradeoffRisks": [
    "Contrato simples para o servidor, com mais endpoints e menos maleabilidade do cliente.",
    "Boa ergonomia para muitos casos, mantendo disciplina operacional administrável.",
    "Flexibilidade alta, com maior necessidade de observabilidade e defesa contra queries ruins.",
    "Liberdade sem limite transforma a API em uma superfície cara e difícil de proteger."
  ],
  "practiceRule": "trate o schema como produto, instrumente resolvers e explicite limites de custo e autorização",
  "scenarios": [
    {
      "name": "App mobile enxuto",
      "situation": "Um cliente precisa minimizar round trips e pedir apenas campos úteis.",
      "choice": "Usar um schema claro e selecionar somente os campos necessários.",
      "why": "A força do GraphQL aparece quando a forma da resposta realmente importa ao cliente.",
      "caution": "Evite assumir que menos payload sempre significa menos custo no backend."
    },
    {
      "name": "Dashboard agregador",
      "situation": "Uma tela combina dados de vários domínios e serviços internos.",
      "choice": "Investir em resolvers compostos, batching e ownership de schema.",
      "why": "Composição centralizada pode simplificar o cliente sem perder governança.",
      "caution": "Resolver ingênuo pode multiplicar chamadas internas rapidamente."
    },
    {
      "name": "Campos sensíveis",
      "situation": "A API expõe dados administrativos e dados comuns no mesmo grafo.",
      "choice": "Aplicar autorização por campo e por resolver, não só por endpoint.",
      "why": "No GraphQL, o custo e a permissão vivem em níveis mais granulares.",
      "caution": "Autorização mal posicionada vira vazamento sutil."
    }
  ]
};

export const interactions = createComputacaoInteractions(interactionConfig) satisfies LessonModule["interactions"];
