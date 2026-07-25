import type { LessonModule } from "../../../types/content";
import { buildComputacaoInteractions } from "../shared/lessonFactory";

export const interactions = buildComputacaoInteractions({
  "flow": {
    "id": "syscall-bridge-lab",
    "eyebrow": "Travessia",
    "title": "Siga a chamada até o kernel e de volta",
    "description": "Explore a sequência curta, mas crítica, entre user space, trap, validação e retorno.",
    "tone": "indigo",
    "icon": "Server",
    "stages": [
      {
        "label": "Função da biblioteca",
        "detail": "A API pública organiza argumentos e escolhe a convenção apropriada para falar com o kernel.",
        "cue": "wrapper e ergonomia"
      },
      {
        "label": "Entrada na syscall",
        "detail": "A CPU executa a transição para modo privilegiado usando a interface prevista pela arquitetura.",
        "cue": "trap controlada"
      },
      {
        "label": "Validação",
        "detail": "O kernel verifica descritores, permissões, ponteiros e estado do recurso pedido.",
        "cue": "segurança e consistência"
      },
      {
        "label": "Trabalho real",
        "detail": "Leitura, escrita, mapeamento, espera ou coordenação são executados no subsistema correspondente.",
        "cue": "I/O, memória, rede"
      },
      {
        "label": "Retorno",
        "detail": "O valor volta para user space e pode ser traduzido em convenções como -1 e errno.",
        "cue": "protocolo de erro"
      }
    ]
  },
  "compare": {
    "id": "syscall-family-lab",
    "eyebrow": "Modelos de acesso",
    "title": "Compare famílias de syscalls",
    "description": "Veja como diferentes chamadas expressam modos diferentes de conversar com recursos.",
    "tone": "violet",
    "icon": "ArrowRightLeft",
    "options": [
      {
        "label": "read/write",
        "headline": "Fluxo explícito por chamadas discretas",
        "bullets": [
          "Você pede blocos de dados por operação.",
          "A granularidade fica visível e controlável.",
          "É natural para streams, sockets e arquivos tradicionais."
        ]
      },
      {
        "label": "open/close",
        "headline": "Gestão de handles e ciclo de vida de recursos",
        "bullets": [
          "Cria e encerra a relação do processo com um recurso.",
          "Transforma nomes e objetos do SO em descritores usáveis.",
          "Ajuda a entender herança e vazamento de handles."
        ]
      },
      {
        "label": "mmap",
        "headline": "Acesso indireto via memória mapeada",
        "bullets": [
          "O processo enxerga uma região de memória em vez de pedir blocos explicitamente.",
          "Page faults entram na história do desempenho.",
          "Excelente quando o padrão de acesso combina com paginação e compartilhamento."
        ]
      }
    ]
  },
  "slider": {
    "id": "syscall-granularity-lab",
    "eyebrow": "Granularidade",
    "title": "Ajuste o tamanho lógico de cada ida ao kernel",
    "description": "Compare como o agrupamento do trabalho altera overhead, latência e eficiência.",
    "tone": "emerald",
    "icon": "BarChart3",
    "axisLabel": "Estratégia de agrupamento",
    "states": [
      {
        "label": "Chamadas minúsculas",
        "summary": "Cada unidade útil cruza a fronteira sozinha, tornando o overhead visível e caro.",
        "leftLabel": "Overhead relativo",
        "leftValue": 92,
        "rightLabel": "Eficiência por chamada",
        "rightValue": 24,
        "takeaway": "Útil apenas quando a unidade mínima tem significado forte; em geral é desperdício.",
        "metrics": [
          {
            "label": "Latência agregada",
            "value": "Alta"
          },
          {
            "label": "Throughput",
            "value": "Baixo"
          },
          {
            "label": "Simplicidade local",
            "value": "Alta"
          },
          {
            "label": "Escalabilidade",
            "value": "Ruim"
          }
        ]
      },
      {
        "label": "Buffers razoáveis",
        "summary": "Agrupa trabalho suficiente para diluir o custo da travessia sem perder responsividade.",
        "leftLabel": "Overhead relativo",
        "leftValue": 48,
        "rightLabel": "Eficiência por chamada",
        "rightValue": 74,
        "takeaway": "É o ponto de equilíbrio mais comum em I/O tradicional.",
        "metrics": [
          {
            "label": "Latência agregada",
            "value": "Moderada"
          },
          {
            "label": "Throughput",
            "value": "Bom"
          },
          {
            "label": "Simplicidade local",
            "value": "Boa"
          },
          {
            "label": "Escalabilidade",
            "value": "Boa"
          }
        ]
      },
      {
        "label": "Batching pesado",
        "summary": "Poucas travessias concentram muito trabalho, o que favorece throughput, mas pode piorar memória e tempo de reação.",
        "leftLabel": "Overhead relativo",
        "leftValue": 20,
        "rightLabel": "Eficiência por chamada",
        "rightValue": 90,
        "takeaway": "Vale quando throughput domina, mas exige atenção a latência e uso de buffers.",
        "metrics": [
          {
            "label": "Latência agregada",
            "value": "Variável"
          },
          {
            "label": "Throughput",
            "value": "Alto"
          },
          {
            "label": "Simplicidade local",
            "value": "Menor"
          },
          {
            "label": "Escalabilidade",
            "value": "Alta"
          }
        ]
      }
    ]
  }
}) satisfies LessonModule["interactions"];
