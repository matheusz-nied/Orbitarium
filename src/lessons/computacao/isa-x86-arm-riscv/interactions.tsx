import type { LessonModule } from "../../../types/content";
import { buildComputacaoInteractions } from "../shared/lessonFactory";

export const interactions = buildComputacaoInteractions({
  "flow": {
    "id": "isa-contract-lab",
    "eyebrow": "Contrato",
    "title": "Siga o caminho do código até a ISA alvo",
    "description": "Acompanhe como intenções de alto nível precisam virar instruções válidas para uma interface concreta.",
    "tone": "indigo",
    "icon": "Binary",
    "stages": [
      {
        "label": "Fonte",
        "detail": "O programador expressa uma intenção em alto nível.",
        "cue": "lógica legível"
      },
      {
        "label": "Compilador",
        "detail": "A toolchain interpreta a intenção e procura uma forma válida de realizá-la.",
        "cue": "escolhas do alvo"
      },
      {
        "label": "ISA",
        "detail": "O código passa a obedecer instruções, registradores e convenções do contrato da máquina.",
        "cue": "linguagem da CPU"
      },
      {
        "label": "ABI",
        "detail": "Funções, bibliotecas e sistema operacional precisam falar o mesmo dialeto binário.",
        "cue": "compatibilidade prática"
      },
      {
        "label": "CPU real",
        "detail": "A microarquitetura concreta cumpre o contrato de modo próprio.",
        "cue": "implementação interna"
      }
    ]
  },
  "compare": {
    "id": "isa-family-lab",
    "eyebrow": "Famílias",
    "title": "Compare x86, ARM e RISC-V",
    "description": "Observe diferenças de ecossistema e filosofia sem cair em slogans simplistas.",
    "tone": "violet",
    "icon": "ArrowRightLeft",
    "options": [
      {
        "label": "x86",
        "headline": "Compatibilidade histórica e ecossistema muito consolidado",
        "bullets": [
          "Fortíssimo legado em desktops e servidores.",
          "Documentação e tooling maduros.",
          "Carrega décadas de compatibilidade binária como valor central."
        ]
      },
      {
        "label": "ARM",
        "headline": "Presença ampla em dispositivos e eficiência forte no ecossistema móvel",
        "bullets": [
          "Muito presente em celulares e sistemas embarcados.",
          "Também ganhou espaço em servidores modernos.",
          "Ecossistema de documentação e IP próprio bastante relevante."
        ]
      },
      {
        "label": "RISC-V",
        "headline": "Padrão aberto com modularidade e governança visíveis",
        "bullets": [
          "Especificações públicas e ratificadas.",
          "Atrai interesse por abertura e extensibilidade.",
          "Ecossistema cresce junto com toolchains e implementações."
        ]
      }
    ]
  },
  "slider": {
    "id": "abstraction-dial-lab",
    "eyebrow": "Abstração",
    "title": "Ajuste o quanto você se acopla à arquitetura",
    "description": "Compare conforto de portabilidade com controle fino do alvo.",
    "tone": "emerald",
    "icon": "BarChart3",
    "axisLabel": "Nível de acoplamento ao alvo",
    "states": [
      {
        "label": "Código altamente portátil",
        "summary": "O foco está em preservar mobilidade entre arquiteturas e deixar o compilador tomar a maioria das decisões.",
        "leftLabel": "Portabilidade",
        "leftValue": 94,
        "rightLabel": "Controle fino por ISA",
        "rightValue": 26,
        "takeaway": "Excelente para bases grandes e multiplataforma, com menos tuning específico.",
        "metrics": [
          {
            "label": "Portar",
            "value": "Fácil"
          },
          {
            "label": "Tuning local",
            "value": "Menor"
          },
          {
            "label": "Manutenção",
            "value": "Boa"
          },
          {
            "label": "Dependência do compilador",
            "value": "Alta"
          }
        ]
      },
      {
        "label": "Uso seletivo de intrinsics",
        "summary": "A maior parte permanece portátil, mas pontos críticos se aproximam do hardware.",
        "leftLabel": "Portabilidade",
        "leftValue": 66,
        "rightLabel": "Controle fino por ISA",
        "rightValue": 70,
        "takeaway": "Ótimo para otimizar trechos críticos sem contaminar toda a base.",
        "metrics": [
          {
            "label": "Portar",
            "value": "Viável"
          },
          {
            "label": "Tuning local",
            "value": "Bom"
          },
          {
            "label": "Manutenção",
            "value": "Moderada"
          },
          {
            "label": "Dependência do compilador",
            "value": "Média"
          }
        ]
      },
      {
        "label": "Código específico do alvo",
        "summary": "A equipe assume conscientemente o acoplamento em troca de explorar recursos muito particulares da ISA.",
        "leftLabel": "Portabilidade",
        "leftValue": 24,
        "rightLabel": "Controle fino por ISA",
        "rightValue": 94,
        "takeaway": "Faz sentido em kernels, runtimes e hot paths muito sensíveis a desempenho.",
        "metrics": [
          {
            "label": "Portar",
            "value": "Difícil"
          },
          {
            "label": "Tuning local",
            "value": "Máximo"
          },
          {
            "label": "Manutenção",
            "value": "Mais cara"
          },
          {
            "label": "Dependência do compilador",
            "value": "Menor"
          }
        ]
      }
    ]
  }
}) satisfies LessonModule["interactions"];
