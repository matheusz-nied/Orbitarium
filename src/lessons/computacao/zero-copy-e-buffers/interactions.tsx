import type { LessonModule } from "../../../types/content";
import { createComputacaoInteractions } from "../_shared/factories";

const interactionConfig = {
  "title": "Zero-Copy e Buffers",
  "pipelineSteps": [
    {
      "name": "Mapear duplicações",
      "summary": "Descubra em quais etapas o mesmo conteúdo está sendo materializado de novo sem necessidade semântica.",
      "signal": "memcpy e realocação",
      "risk": "otimizar trecho irrelevante",
      "takeaway": "Zero-copy começa identificando movimento redundante real."
    },
    {
      "name": "Substituir por view ou in-kernel",
      "summary": "Use slices, reuso de buffers ou syscalls apropriadas quando o contrato permitir.",
      "signal": "menos bytes copiados",
      "risk": "sharing opaca",
      "takeaway": "O ganho vem de reaproveitar armazenamento existente com disciplina."
    },
    {
      "name": "Garantir validade",
      "summary": "O buffer-base precisa continuar vivo e estável pelo tempo que as views exigirem.",
      "signal": "ownership clara",
      "risk": "mutação tardia ou retenção",
      "takeaway": "Sem contrato de lifetime, o ganho vira fragilidade."
    },
    {
      "name": "Copiar nas fronteiras certas",
      "summary": "Quando isolamento ou concorrência pedirem, copie deliberadamente e siga adiante.",
      "signal": "fronteira semântica",
      "risk": "dogma anticápia",
      "takeaway": "Cópia bem colocada pode simplificar muito mais do que custa."
    }
  ],
  "leftLabel": "cópia defensiva",
  "rightLabel": "views e reuso",
  "tradeoffSummary": "Buffers compartilhados economizam movimento de bytes, mas exigem contratos melhores de validade e mutação. Cópias bem escolhidas custam CPU e memória, porém simplificam ownership e isolamento entre componentes. Zero-copy forte é ótimo quando o sistema consegue sustentar essa disciplina.",
  "tradeoffRisks": [
    "Copiar demais gasta banda de memória, alocações e tempo útil do caminho quente.",
    "Um equilíbrio saudável usa views nos trechos críticos e cópia nos pontos de fronteira semântica.",
    "Zero-copy agressivo reduz tráfego, mas aumenta a dependência de lifetime e imutabilidade compartilhada.",
    "Reter grandes backing buffers por causa de pequenas views ou esquecer reset de pools pode transformar ganho em vazamento lógico."
  ],
  "practiceRule": "copie quando ownership ou isolamento pedirem; fora disso, procure views e reuso que removam movimentação redundante do hot path",
  "scenarios": [
    {
      "name": "Static file serving",
      "situation": "O servidor precisa enviar arquivos do disco para sockets repetidamente.",
      "choice": "Avaliar sendfile ou operação equivalente in-kernel.",
      "why": "O conteúdo já está no sistema; evitar ida e volta por user space reduz trabalho redundante.",
      "caution": "Nem todo fluxo aceita isso; cabeçalho, transformação e restrições da plataforma importam."
    },
    {
      "name": "Parser sobre payload",
      "situation": "Um parser precisa ler campos dentro de um payload e repassá-los rapidamente.",
      "choice": "Usar slices ou views enquanto o payload-base permanecer vivo e estável.",
      "why": "A cópia de cada campo pode ser evitada sem perder legibilidade.",
      "caution": "Cuidado para não reter um buffer enorme por causa de pequenas fatias duradouras."
    },
    {
      "name": "Pipeline assíncrono",
      "situation": "Vários estágios independentes consomem dados em tempos diferentes.",
      "choice": "Copiar em um ponto de fronteira pode simplificar ownership e liberar o produtor cedo.",
      "why": "Nem sempre compartilhar buffer é o contrato mais seguro em ambientes assíncronos.",
      "caution": "Zero-copy mal encaixado aqui pode virar corrida, retenção ou lifetime opaca."
    }
  ]
};

export const interactions = createComputacaoInteractions(interactionConfig) satisfies LessonModule["interactions"];
