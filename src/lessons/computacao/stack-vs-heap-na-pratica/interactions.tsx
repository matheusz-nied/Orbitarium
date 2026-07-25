import type { LessonModule } from "../../../types/content";
import { createComputacaoInteractions } from "../_shared/factories";

const interactionConfig = {
  "title": "Stack vs Heap na Prática",
  "pipelineSteps": [
    {
      "name": "Nascer no escopo atual",
      "summary": "O valor aparece num frame local, num container ou numa estrutura dinâmica do fluxo atual.",
      "signal": "tamanho e contexto",
      "risk": "representação automática demais",
      "takeaway": "A origem já sugere algumas restrições naturais de lifetime."
    },
    {
      "name": "Perguntar se ele escapa",
      "summary": "Se o dado precisa viver além da função ou ser observado por outros donos, a história muda.",
      "signal": "retorno, captura ou compartilhamento",
      "risk": "lifetime contraditória",
      "takeaway": "Escape é a transição conceitual mais importante da decisão."
    },
    {
      "name": "Pagar em cópia ou indirection",
      "summary": "Representações diferentes cobram em cópia, ponteiros, crescimento dinâmico ou gestão de memória.",
      "signal": "localidade e mutação",
      "risk": "slogan simplista",
      "takeaway": "Não existe escolha gratuita; existe contrato melhor alinhado ao uso."
    },
    {
      "name": "Medir e ajustar",
      "summary": "Compilador, heap profile e observação do hot path dizem se vale refinar a representação.",
      "signal": "alocações e tempo quente",
      "risk": "heroísmo precoce",
      "takeaway": "Mudança boa melhora lifetime explícito e métrica real ao mesmo tempo."
    }
  ],
  "leftLabel": "duração local previsível",
  "rightLabel": "compartilhamento flexível",
  "tradeoffSummary": "A stack é ótima para contexto local e curta duração. A heap entra quando o dado precisa sobreviver, crescer ou circular entre donos diversos. A qualidade da decisão aparece quando o lifetime real fica mais explícito e o custo total do fluxo cai, em vez de apenas satisfazer um slogan.",
  "tradeoffRisks": [
    "Insistir em manter tudo local pode gerar cópias grandes e APIs artificiais.",
    "Um meio-termo saudável explicita onde a indirection é necessária e onde não é.",
    "Heap e ownership explícitos resolvem lifetime complexa, mas podem aumentar indireção e gerenciamento.",
    "Otimizar só pela região de memória sem olhar para acesso e semântica tende a criar custo escondido."
  ],
  "practiceRule": "comece pelo lifetime e pelo padrão de acesso; a região de memória correta costuma cair dessa análise em vez de ser escolhida por slogan",
  "scenarios": [
    {
      "name": "Buffer curto local",
      "situation": "Uma função monta um pequeno array temporário e o consome por completo antes de retornar.",
      "choice": "Manter local e direto, evitando indirection desnecessária.",
      "why": "O lifetime é curto e o dado não precisa escapar.",
      "caution": "Se o buffer passar a crescer ou ser compartilhado, a decisão pode mudar."
    },
    {
      "name": "Grafo compartilhado",
      "situation": "Uma estrutura precisa sobreviver ao retorno e ser usada por vários componentes.",
      "choice": "Assumir explicitamente heap e ownership coerente com o compartilhamento.",
      "why": "O lifetime real já ultrapassa o escopo local.",
      "caution": "Não esconda essa flexibilidade atrás de cópias acidentais ou referências frágeis."
    },
    {
      "name": "Escape invisível em Go",
      "situation": "Um helper aparentemente simples faz um valor escapar por causa da forma como o resultado é armazenado ou retornado.",
      "choice": "Inspecionar a decisão do compilador e reorganizar apenas se o custo estiver no hot path.",
      "why": "Escape analysis é contextual; pequenas mudanças de API alteram a conclusão.",
      "caution": "Lutar contra toda alocação em heap pode piorar clareza sem mover a métrica relevante."
    }
  ]
};

export const interactions = createComputacaoInteractions(interactionConfig) satisfies LessonModule["interactions"];
