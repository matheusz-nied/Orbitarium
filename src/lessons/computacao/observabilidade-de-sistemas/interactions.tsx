import type { LessonModule } from "../../../types/content";
import { buildComputacaoInteractions } from "../shared/lessonFactory";

export const interactions = buildComputacaoInteractions({
  "flow": {
    "id": "telemetry-pipeline-lab",
    "eyebrow": "Pipeline",
    "title": "Siga o caminho da telemetria até a análise",
    "description": "Veja onde instrumentação, coleta, agregação e consulta podem mudar o que você enxerga.",
    "tone": "indigo",
    "icon": "Activity",
    "stages": [
      {
        "label": "Aplicação",
        "detail": "O código emite sinais sobre eventos, latência, erros e contexto operacional.",
        "cue": "origem do dado"
      },
      {
        "label": "SDK/agent",
        "detail": "Ferramentas de coleta capturam, enriquecem ou transformam o sinal.",
        "cue": "coleta e formatação"
      },
      {
        "label": "Backend",
        "detail": "O dado é agregado, indexado, armazenado ou amostrado segundo custo e escala.",
        "cue": "retenção e trade-offs"
      },
      {
        "label": "Consulta",
        "detail": "Painéis, buscas e análises exploram o que realmente ficou disponível.",
        "cue": "pergunta operacional"
      },
      {
        "label": "Ação",
        "detail": "Engenheiros, alertas e playbooks transformam observação em resposta prática.",
        "cue": "decisão sob pressão"
      }
    ]
  },
  "compare": {
    "id": "signals-comparison-lab",
    "eyebrow": "Sinais",
    "title": "Compare logs, métricas e traces",
    "description": "Entenda o tipo de pergunta que cada sinal ajuda a responder melhor.",
    "tone": "violet",
    "icon": "ArrowRightLeft",
    "options": [
      {
        "label": "Logs",
        "headline": "Eventos ricos em contexto textual e detalhes específicos",
        "bullets": [
          "Úteis para investigar casos e mensagens concretas.",
          "Podem ficar ruidosos se não houver estrutura ou convenções.",
          "Ganham muito valor quando ligados a traces e atributos consistentes."
        ]
      },
      {
        "label": "Métricas",
        "headline": "Visão agregada para tendência, capacidade e alerta",
        "bullets": [
          "Excelente para observar comportamento ao longo do tempo.",
          "Escala bem quando a modelagem de rótulos é cuidadosa.",
          "Pode esconder detalhes de casos individuais."
        ]
      },
      {
        "label": "Traces",
        "headline": "Jornadas distribuídas que revelam dependências e latência por etapa",
        "bullets": [
          "Ajudam a localizar onde uma operação ficou lenta ou falhou.",
          "Dependem fortemente de contexto propagado e instrumentação consistente.",
          "Ficam mais úteis quando conversam com logs e métricas."
        ]
      }
    ]
  },
  "slider": {
    "id": "observability-dial-lab",
    "eyebrow": "Maturidade",
    "title": "Ajuste a maturidade observacional do sistema",
    "description": "Compare desde uma visão superficial até uma telemetria conectada a SLOs e investigação real.",
    "tone": "emerald",
    "icon": "BarChart3",
    "axisLabel": "Postura observacional",
    "states": [
      {
        "label": "Painéis soltos",
        "summary": "Há dashboards e alguns alerts, mas pouca correlação, pouca padronização e baixa confiança investigativa.",
        "leftLabel": "Rapidez inicial",
        "leftValue": 82,
        "rightLabel": "Capacidade investigativa",
        "rightValue": 30,
        "takeaway": "Serve para sintomas óbvios, mas falha quando o incidente atravessa várias dependências.",
        "metrics": [
          {
            "label": "Correlação",
            "value": "Fraca"
          },
          {
            "label": "Ruído",
            "value": "Alto"
          },
          {
            "label": "SLOs",
            "value": "Ausentes"
          },
          {
            "label": "Tempo de investigação",
            "value": "Longo"
          }
        ]
      },
      {
        "label": "Base estruturada",
        "summary": "Sinais principais existem, convenções são razoáveis e parte dos alertas já se conecta ao comportamento do serviço.",
        "leftLabel": "Rapidez inicial",
        "leftValue": 60,
        "rightLabel": "Capacidade investigativa",
        "rightValue": 74,
        "takeaway": "É um bom estágio intermediário: a equipe enxerga tendências e consegue aprofundar em muitos casos.",
        "metrics": [
          {
            "label": "Correlação",
            "value": "Boa"
          },
          {
            "label": "Ruído",
            "value": "Moderado"
          },
          {
            "label": "SLOs",
            "value": "Parciais"
          },
          {
            "label": "Tempo de investigação",
            "value": "Menor"
          }
        ]
      },
      {
        "label": "Observabilidade orientada a serviço",
        "summary": "A telemetria foi desenhada para investigação distribuída, revisão contínua e alertas guiados por impacto real.",
        "leftLabel": "Rapidez inicial",
        "leftValue": 34,
        "rightLabel": "Capacidade investigativa",
        "rightValue": 92,
        "takeaway": "Mais disciplina de instrumentação gera menos adivinhação e resposta mais rápida em produção.",
        "metrics": [
          {
            "label": "Correlação",
            "value": "Muito boa"
          },
          {
            "label": "Ruído",
            "value": "Baixo"
          },
          {
            "label": "SLOs",
            "value": "Claros"
          },
          {
            "label": "Tempo de investigação",
            "value": "Curto"
          }
        ]
      }
    ]
  }
}) satisfies LessonModule["interactions"];
