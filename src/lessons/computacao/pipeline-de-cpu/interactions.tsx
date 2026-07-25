import type { LessonModule } from "../../../types/content";
import { buildComputacaoInteractions } from "../shared/lessonFactory";

export const interactions = buildComputacaoInteractions({
  "flow": {
    "id": "pipeline-stages-lab",
    "eyebrow": "Estágios",
    "title": "Acompanhe uma instrução pelo pipeline clássico",
    "description": "Selecione uma etapa e veja o que ela acrescenta à execução.",
    "tone": "indigo",
    "icon": "Cpu",
    "stages": [
      {
        "label": "IF",
        "detail": "A CPU busca a próxima instrução com base no contador de programa e na política de fluxo corrente.",
        "cue": "buscar bytes de instrução"
      },
      {
        "label": "ID",
        "detail": "A instrução é interpretada e os operandos necessários começam a ser preparados.",
        "cue": "entender e localizar dados"
      },
      {
        "label": "EX",
        "detail": "A ALU ou unidade correspondente realiza o cálculo principal.",
        "cue": "computar"
      },
      {
        "label": "MEM",
        "detail": "Se houver acesso a dados, a instrução conversa com a memória nesta fase.",
        "cue": "load/store"
      },
      {
        "label": "WB",
        "detail": "O resultado é publicado onde futuras instruções poderão consumi-lo diretamente.",
        "cue": "tornar o valor visível"
      }
    ]
  },
  "compare": {
    "id": "hazards-lab",
    "eyebrow": "Hazards",
    "title": "Compare os tipos clássicos de conflito",
    "description": "Cada família de hazard exige um raciocínio próprio para manter correção e vazão.",
    "tone": "violet",
    "icon": "Layers",
    "options": [
      {
        "label": "Estrutural",
        "headline": "Dois trabalhos competem pelo mesmo recurso físico",
        "bullets": [
          "A solução pode envolver duplicação de recurso ou replanejamento de uso.",
          "Surge quando a implementação não atende a sobreposição ideal.",
          "É um problema de capacidade interna do hardware."
        ]
      },
      {
        "label": "Dados",
        "headline": "Uma instrução quer um resultado que ainda não ficou pronto",
        "bullets": [
          "Forwarding e stalls são respostas clássicas.",
          "É muito comum em sequências aritméticas dependentes.",
          "A proximidade temporal entre produtor e consumidor importa bastante."
        ]
      },
      {
        "label": "Controle",
        "headline": "Ainda não sabemos com segurança qual é a próxima instrução correta",
        "bullets": [
          "Branches e desvios perturbam a busca antecipada.",
          "Previsão e flush entram no jogo.",
          "Erros de aposta podem desperdiçar trabalho especulativo."
        ]
      }
    ]
  },
  "slider": {
    "id": "throughput-dial-lab",
    "eyebrow": "Recuperação",
    "title": "Ajuste como o pipeline lida com conflitos",
    "description": "Compare abordagens que preferem esperar, encaminhar ou especular.",
    "tone": "emerald",
    "icon": "BarChart3",
    "axisLabel": "Estratégia dominante",
    "states": [
      {
        "label": "Esperar sempre",
        "summary": "A solução mais simples preserva correção, mas o pipeline esvazia com frequência.",
        "leftLabel": "Simplicidade de controle",
        "leftValue": 90,
        "rightLabel": "Throughput sustentado",
        "rightValue": 28,
        "takeaway": "Boa para ensinar e para projetos simples, ruim para desempenho agressivo.",
        "metrics": [
          {
            "label": "Bolhas",
            "value": "Muitas"
          },
          {
            "label": "Complexidade",
            "value": "Baixa"
          },
          {
            "label": "Risco de bug",
            "value": "Menor"
          },
          {
            "label": "Desempenho",
            "value": "Baixo"
          }
        ]
      },
      {
        "label": "Forwarding seletivo",
        "summary": "Encaminhar resultados comuns recupera bastante vazão sem precisar prever o futuro o tempo todo.",
        "leftLabel": "Simplicidade de controle",
        "leftValue": 58,
        "rightLabel": "Throughput sustentado",
        "rightValue": 74,
        "takeaway": "É a grande vitória prática contra muitos hazards de dados.",
        "metrics": [
          {
            "label": "Bolhas",
            "value": "Menos"
          },
          {
            "label": "Complexidade",
            "value": "Média"
          },
          {
            "label": "Risco de bug",
            "value": "Moderado"
          },
          {
            "label": "Desempenho",
            "value": "Bom"
          }
        ]
      },
      {
        "label": "Especulação agressiva",
        "summary": "Prever caminho e trabalhar adiantado preserva vazão, mas impõe lógica de controle muito mais sofisticada.",
        "leftLabel": "Simplicidade de controle",
        "leftValue": 24,
        "rightLabel": "Throughput sustentado",
        "rightValue": 90,
        "takeaway": "Funciona muito bem quando o preditor acerta, mas aumenta penalidade e complexidade quando erra.",
        "metrics": [
          {
            "label": "Bolhas",
            "value": "Poucas no caso bom"
          },
          {
            "label": "Complexidade",
            "value": "Alta"
          },
          {
            "label": "Risco de bug",
            "value": "Maior"
          },
          {
            "label": "Desempenho",
            "value": "Muito alto"
          }
        ]
      }
    ]
  }
}) satisfies LessonModule["interactions"];
