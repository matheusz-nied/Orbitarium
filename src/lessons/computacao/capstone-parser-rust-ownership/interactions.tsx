import type { LessonModule } from "../../../types/content";
import { createComputacaoInteractions } from "../_shared/factories";

const interactionConfig = {
  title: "Capstone: Parser/Buffer em Rust",
  pipelineSteps: [
    {
      name: "Reproduzir o sintoma",
      summary:
        "Comece com um caso real: payloads chegando, parser funcionando e sinais de clonagem, retenção de buffer ou atrito de lifetime aparecendo no fluxo.",
      signal: "alocação, retenção ou API confusa",
      risk: "otimizar por estética",
      takeaway:
        "Sem um sintoma observável, a refatoração de ownership vira debate abstrato.",
    },
    {
      name: "Mapear cópias e donos",
      summary:
        "Identifique quem realmente possui os bytes, onde as cópias acontecem e em que ponto o resultado precisa sobreviver além do buffer original.",
      signal: "pontos de materialização",
      risk: "misturar borrows com fronteiras longas",
      takeaway:
        "A unidade de ownership do buffer decide quase todo o resto do desenho.",
    },
    {
      name: "Escolher a fronteira",
      summary:
        "Decida o que pode continuar borrowed e em que camada vale converter para dado próprio ou para um handle compartilhado.",
      signal: "janela de validade nítida",
      risk: "reter payload inteiro",
      takeaway:
        "Borrowing interno e ownership externo costumam conviver muito bem.",
    },
    {
      name: "Verificar a hipótese",
      summary:
        "Depois da mudança, confirme se o parser ficou melhor no problema certo: menos churn, menos retenção ou fronteira mais segura.",
      signal: "hipótese confirmada ou invalidada",
      risk: "declarar vitória cedo",
      takeaway:
        "Capstone bom termina em verificação, não em dogma de design.",
    },
  ],
  leftLabel: "materializar cedo",
  rightLabel: "zero-copy agressivo",
  tradeoffSummary:
    "Materializar dados logo no parse simplifica autonomia e fronteiras, mas amplia cópias e churn de alocação. Emprestar slices e views preserva memória e latência do caminho quente, porém aumenta o acoplamento entre o resultado e o buffer original. O ponto ótimo depende de quanto tempo o dado precisa viver e de quantas camadas tocará depois.",
  tradeoffRisks: [
    "Cópia precoce resolve lifetime localmente, mas pode desperdiçar CPU e memória em campos efêmeros.",
    "Um meio-termo conservador costuma pedir parse borrowed e materialização seletiva apenas nos campos duradouros.",
    "Zero-copy forte ajuda muito no hot path, mas exige que o time acompanhe validade e retenção com disciplina.",
    "Levar o extremo longe demais pode prender buffers enormes, espalhar lifetimes e endurecer fronteiras assíncronas.",
  ],
  practiceRule:
    "Empreste enquanto o consumo for curto e local; possua ou compartilhe explicitamente quando a saída cruzar tempo, fila, cache ou persistência.",
  scenarios: [
    {
      name: "Parser de cabeçalho e roteamento",
      situation:
        "O serviço só precisa ler poucos campos do payload para validar e decidir rapidamente o próximo handler, descartando a entrada logo depois.",
      choice:
        "Comece com fatias borrowed sobre o buffer de entrada e só materialize campos se alguma etapa posterior realmente exigir autonomia.",
      why:
        "O consumo é curto, a janela de validade é simples e o ganho de evitar cópias tende a aparecer sem contaminar o resto do sistema.",
      caution:
        "Se logs, métricas ou retries precisarem guardar partes do payload depois, a fronteira de ownership deve aparecer logo após a decisão.",
    },
    {
      name: "Fila assíncrona após o parse",
      situation:
        "Depois de extrair os campos, o resultado entra numa fila para ser processado por outra task ou outro worker mais tarde.",
      choice:
        "Materialize ou use um handle compartilhado antes da fila, em vez de empurrar borrows do buffer original para fora da etapa de parse.",
      why:
        "A fila alonga o tempo de vida observável do dado e torna ownership explícita uma escolha mais saudável do que lifetime espalhado.",
      caution:
        "Forçar zero-copy aqui pode reter payloads inteiros por pouco benefício e dificultar debug de quem ainda depende do quê.",
    },
    {
      name: "Streaming com refills de buffer",
      situation:
        "Os bytes chegam em blocos e o parser precisa lidar com mensagens incompletas antes de ter dados suficientes para concluir.",
      choice:
        "Separe com clareza o que pode permanecer emprestado dentro do bloco atual e o que precisa ser materializado antes de refill ou compactação.",
      why:
        "Quando o armazenamento muda de fase, o custo de manter tudo borrowed cresce muito e pode comprometer a robustez do desenho.",
      caution:
        "Não trate uma saída borrowed como durável só porque ela compilou em um caso local de teste.",
    },
  ],
};

export const interactions =
  createComputacaoInteractions(interactionConfig) satisfies LessonModule["interactions"];
