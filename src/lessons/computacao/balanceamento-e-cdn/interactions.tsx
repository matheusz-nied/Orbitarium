import type { LessonModule } from "../../../types/content";
import { createComputacaoInteractions } from "../_shared/factories";

const interactionConfig = {
  "title": "Balanceamento de Carga e CDN",
  "pipelineSteps": [
    {
      "name": "Resolução e roteamento",
      "summary": "DNS, Anycast ou políticas de entrada definem por onde o cliente chega.",
      "signal": "latência inicial",
      "risk": "rotear para um edge ruim",
      "takeaway": "A primeira decisão já muda o resto do caminho."
    },
    {
      "name": "Edge e cache",
      "summary": "O edge tenta responder localmente usando cache key, TTL e validação.",
      "signal": "taxa de hit",
      "risk": "conteúdo stale ou privado",
      "takeaway": "Cache bom nasce de política explícita."
    },
    {
      "name": "Origem balanceada",
      "summary": "Se faltar cache, o tráfego vai para uma origem saudável segundo regras do balanceador.",
      "signal": "saúde e saturação",
      "risk": "single origin overload",
      "takeaway": "Balancear é escolher quem atende quando não há reaproveitamento."
    },
    {
      "name": "Invalidação e observabilidade",
      "summary": "Métricas e purge mantêm o sistema coerente quando o conteúdo muda.",
      "signal": "hit ratio e erro",
      "risk": "debug às cegas",
      "takeaway": "Sem observação e purge, cache vira sorte."
    }
  ],
  "leftLabel": "controle rígido na origem",
  "rightLabel": "agressividade de cache e distribuição",
  "tradeoffSummary": "Quanto mais você aproxima conteúdo do usuário e distribui tráfego, menor tende a ser a latência percebida - mas maior fica a necessidade de políticas explícitas de invalidação, afinidade e diferenciação entre conteúdo público e privado.",
  "tradeoffRisks": [
    "Baixa elasticidade e origem sobrecarregada.",
    "Boa previsibilidade, mas ainda com pouco reaproveitamento.",
    "Ótima latência, com risco maior de conteúdo desatualizado e regras mais complexas.",
    "Otimização agressiva demais pode esconder bugs de cache e respostas indevidas."
  ],
  "practiceRule": "classifique rotas por perfil de cache, configure health checks e trate a origem como recurso caro",
  "scenarios": [
    {
      "name": "Landing page global",
      "situation": "Uma campanha internacional serve muito HTML público, CSS, JS e imagens.",
      "choice": "Empurrar estáticos para edge e versionar assets para permitir cache longo.",
      "why": "Conteúdo público e versionado combina com reaproveitamento agressivo.",
      "caution": "Não misture dados de usuário com a mesma chave de cache."
    },
    {
      "name": "Dashboard autenticado",
      "situation": "Cada usuário vê dados personalizados, mutáveis e sensíveis.",
      "choice": "Separar shell estático de chamadas dinâmicas e usar cache com chaves privadas ou revalidação curta.",
      "why": "A parte personalizável precisa de políticas mais cuidadosas.",
      "caution": "CDN não deve vazar resposta de um usuário para outro."
    },
    {
      "name": "Falha regional",
      "situation": "Uma origem em uma região começa a falhar sob pico inesperado.",
      "choice": "Usar health checks e failover para desviar tráfego antes que a degradação atinja todos os usuários.",
      "why": "Balanceamento também é sobre disponibilidade, não só sobre throughput.",
      "caution": "Failover sem capacidade em outra origem apenas move o gargalo."
    }
  ]
};

export const interactions = createComputacaoInteractions(interactionConfig) satisfies LessonModule["interactions"];
