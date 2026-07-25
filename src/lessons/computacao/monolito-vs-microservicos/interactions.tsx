import type { LessonModule } from "../../../types/content";
import { createComputacaoInteractions } from "../_shared/factories";

const interactionConfig = {
  "title": "Monolito vs Microserviços",
  "pipelineSteps": [
    {
      "name": "Fronteira de código",
      "summary": "Módulos e domínios separam responsabilidades ainda no mesmo código.",
      "signal": "cohesão",
      "risk": "limites nebulosos",
      "takeaway": "Serviço ruim costuma nascer de módulo já confuso."
    },
    {
      "name": "Fronteira de deploy",
      "summary": "A decisão muda como versões e dependências são publicadas.",
      "signal": "cadência de release",
      "risk": "coordenação excessiva",
      "takeaway": "Deploy independente tem preço e benefício."
    },
    {
      "name": "Coordenação distribuída",
      "summary": "Chamadas entre serviços pedem contrato, retry, observabilidade e tratamento de falha parcial.",
      "signal": "trace e error budget",
      "risk": "cascata de falhas",
      "takeaway": "Rede não é função local."
    },
    {
      "name": "Operação contínua",
      "summary": "Logs, métricas, tracing e ownership de times definem a sobrevivência do desenho.",
      "signal": "incidentes e MTTR",
      "risk": "arquitetura bonita e operação cega",
      "takeaway": "O custo real aparece em produção."
    }
  ],
  "leftLabel": "simplicidade de entrega",
  "rightLabel": "autonomia e isolamento por serviço",
  "tradeoffSummary": "Mais serviços podem dar autonomia e isolamento de falha, mas também adicionam descoberta, tracing, contratos, latência e consistência distribuída.",
  "tradeoffRisks": [
    "Entrega simples, mas com menor isolamento entre partes do sistema.",
    "Boa base para crescer sem pagar imposto distribuído cedo demais.",
    "Mais autonomia, com mais contratos, hops de rede e coordenação operacional.",
    "Fragmentação excessiva pode transformar a arquitetura em uma dívida cara de operar."
  ],
  "practiceRule": "comece por modularidade clara e só mova a fronteira para a rede quando houver motivo operacional ou organizacional forte",
  "scenarios": [
    {
      "name": "Startup pequena",
      "situation": "Um produto com poucos times ainda muda de direção toda semana.",
      "choice": "Preferir monólito modular bem organizado antes de decompor em rede.",
      "why": "A velocidade de mudança e a simplicidade de debug costumam valer mais nesse estágio.",
      "caution": "Monólito não significa código sem fronteiras internas."
    },
    {
      "name": "Plataforma multi-time",
      "situation": "Vários times precisam entregar em ritmos diferentes e isolar falhas específicas.",
      "choice": "Mover apenas domínios maduros e bem definidos para serviços independentes.",
      "why": "A motivação aqui é operacional e organizacional, não estética.",
      "caution": "Separar sem contrato claro só distribui o acoplamento."
    },
    {
      "name": "Hot path sensível",
      "situation": "Uma rota crítica tem orçamento de latência muito apertado.",
      "choice": "Evitar hops de rede desnecessários e questionar se a decomposição realmente compensa.",
      "why": "Cada chamada remota entra no orçamento e multiplica pontos de falha.",
      "caution": "Latência distribuída costuma aparecer só sob carga ou incidente."
    }
  ]
};

export const interactions = createComputacaoInteractions(interactionConfig) satisfies LessonModule["interactions"];
