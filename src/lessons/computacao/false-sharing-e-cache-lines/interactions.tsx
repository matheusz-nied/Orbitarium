import type { LessonModule } from "../../../types/content";
import { createComputacaoInteractions } from "../_shared/factories";

const interactionConfig = {
  "title": "False Sharing e Cache Lines",
  "pipelineSteps": [
    {
      "name": "Writer quente toca a linha",
      "summary": "Uma thread escreve repetidamente um campo residente numa linha também visível a outros cores.",
      "signal": "alto volume de writes",
      "risk": "posse exclusiva cara",
      "takeaway": "A escrita frequente transforma aquela linha em recurso disputado."
    },
    {
      "name": "Coerência invalida vizinhos",
      "summary": "A linha inteira precisa ser invalidada ou transferida, mesmo para campos lógicos diferentes.",
      "signal": "invalidações",
      "risk": "line bouncing",
      "takeaway": "O hardware protege consistência da linha toda, não do seu campo isolado."
    },
    {
      "name": "Leitores ou writers pagam a volta",
      "summary": "Outros cores recarregam a mesma linha para tocar vizinhos inocentes ou também escreverem.",
      "signal": "cache-to-cache",
      "risk": "throughput ruim",
      "takeaway": "O custo útil vira transporte da linha, não trabalho da aplicação."
    },
    {
      "name": "Layout ou algoritmo mudam",
      "summary": "O software separa a linha física ou reduz a necessidade de escrita global compartilhada.",
      "signal": "menos bouncing",
      "risk": "padding cego",
      "takeaway": "A melhor correção depende de saber se o conflito é físico ou lógico."
    }
  ],
  "leftLabel": "densidade de memória",
  "rightLabel": "isolamento por linha",
  "tradeoffSummary": "Separar dados em linhas diferentes reduz invalidações e line bouncing, mas amplia a estrutura e pode piorar uso total de cache e TLB. A resposta certa raramente é 'pad tudo'; quase sempre é identificar writers quentes e o padrão real de acesso entre threads.",
  "tradeoffRisks": [
    "Estruturas compactas demais podem forçar campos quentes rivais a dividirem a mesma linha.",
    "Um meio-termo razoável funciona bem quando só alguns pontos realmente recebem escrita intensa.",
    "Isolamento agressivo reduz contenção, mas aumenta a pegada total das estruturas.",
    "Separar tudo cegamente pode trocar false sharing por excesso de memória e pior uso do cache."
  ],
  "practiceRule": "separe primeiro os campos com escrita concorrente frequente antes de mexer em atomics, fences ou micro-otimizações de instrução",
  "scenarios": [
    {
      "name": "Contadores por worker",
      "situation": "Cada thread atualiza um contador próprio a cada requisição processada.",
      "choice": "Guardar cada contador em região isolada e somar no momento de leitura agregada.",
      "why": "A escrita é local e extremamente frequente; a leitura global pode ser muito menos comum.",
      "caution": "Se a leitura precisa ser instantânea e exata a todo momento, a estratégia de agregação muda."
    },
    {
      "name": "Refcount e metadados",
      "situation": "Uma struct mistura refcount quente com campos textuais quase estáticos.",
      "choice": "Separar o campo muito escrito ou reorganizar layout para afastar leitores frios.",
      "why": "A linha não precisa fazer leitores de nome pagarem pela escrita do refcount.",
      "caution": "Não aumente a estrutura inteira se apenas um subconjunto está causando bouncing."
    },
    {
      "name": "Fila central",
      "situation": "Head e tail muito disputados concentram escrita de várias threads.",
      "choice": "Verificar se há true sharing algorítmico e se vale shardear filas ou particionar a carga.",
      "why": "Aqui talvez o problema principal seja o ponto global, não só o layout físico.",
      "caution": "Padding sozinho não resolve uma semântica centralizada inevitável."
    }
  ]
};

export const interactions = createComputacaoInteractions(interactionConfig) satisfies LessonModule["interactions"];
