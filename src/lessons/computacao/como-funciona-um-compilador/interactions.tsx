import type { LessonModule } from "../../../types/content";
import { buildComputacaoInteractions } from "../shared/lessonFactory";

export const interactions = buildComputacaoInteractions({
  "flow": {
    "id": "compiler-pipeline-lab",
    "eyebrow": "Pipeline",
    "title": "Passe pelo compilador etapa por etapa",
    "description": "Veja como o código muda de forma até chegar ao objeto final.",
    "tone": "indigo",
    "icon": "Code2",
    "stages": [
      {
        "label": "Lexer",
        "detail": "Caracteres são agrupados em tokens reconhecíveis pela linguagem.",
        "cue": "símbolos úteis"
      },
      {
        "label": "Parser",
        "detail": "Tokens são organizados segundo a gramática para revelar estrutura.",
        "cue": "precedência e forma"
      },
      {
        "label": "AST",
        "detail": "A estrutura relevante do programa é registrada em uma árvore mais abstrata.",
        "cue": "sem o ruído do texto"
      },
      {
        "label": "IR",
        "detail": "Uma representação intermediária prepara o terreno para análise e otimização.",
        "cue": "moeda comum"
      },
      {
        "label": "Backend",
        "detail": "A representação final passa a obedecer a ISA e ao formato do alvo escolhido, frequentemente produzindo assembly ou código objeto para a toolchain continuar.",
        "cue": "registradores, objeto e linker"
      }
    ]
  },
  "compare": {
    "id": "representation-lab",
    "eyebrow": "Representações",
    "title": "Compare o que cada forma do programa privilegia",
    "description": "Nenhuma representação é melhor para tudo; cada uma foi feita para um tipo de decisão.",
    "tone": "violet",
    "icon": "GitBranch",
    "options": [
      {
        "label": "Fonte",
        "headline": "Ótimo para humanos, ruim para decisões de backend",
        "bullets": [
          "Carrega contexto, nomes e ergonomia de escrita.",
          "Ainda mistura detalhes sintáticos e semânticos.",
          "É a forma em que erros precisam ser comunicados ao programador."
        ]
      },
      {
        "label": "AST",
        "headline": "Estrutura sem ruído textual",
        "bullets": [
          "Expõe árvore sintática e relações centrais.",
          "Ajuda análise semântica e transformações iniciais.",
          "Não precisa preservar todos os detalhes de superfície."
        ]
      },
      {
        "label": "IR",
        "headline": "Forma pensada para análise e reescrita",
        "bullets": [
          "Facilita passes de otimização.",
          "Desacopla frontend e backend.",
          "Costuma explicitar fluxo e dependências melhor que o fonte."
        ]
      },
      {
        "label": "Código de máquina",
        "headline": "Forma final dependente do alvo",
        "bullets": [
          "Obedece a registradores e instruções reais.",
          "É excelente para execução, ruim para manter intenções de alto nível.",
          "Fecha o contrato com a ISA."
        ]
      }
    ]
  },
  "slider": {
    "id": "optimization-dial-lab",
    "eyebrow": "Níveis de otimização",
    "title": "Ajuste o equilíbrio entre rapidez de build e ambição do compilador",
    "description": "Compare como diferentes prioridades mudam o comportamento do pipeline.",
    "tone": "emerald",
    "icon": "BarChart3",
    "axisLabel": "Perfil de compilação",
    "states": [
      {
        "label": "Feedback rápido",
        "summary": "Compilações com pouca otimização devolvem resposta cedo ao desenvolvedor e simplificam depuração.",
        "leftLabel": "Velocidade de compilação",
        "leftValue": 92,
        "rightLabel": "Agressividade de otimização",
        "rightValue": 24,
        "takeaway": "Excelente para iteração local e investigação de bugs.",
        "metrics": [
          {
            "label": "Tempo de build",
            "value": "Baixo"
          },
          {
            "label": "Qualidade do código",
            "value": "Moderada"
          },
          {
            "label": "Depuração",
            "value": "Mais direta"
          },
          {
            "label": "Uso em release",
            "value": "Menor"
          }
        ]
      },
      {
        "label": "Equilíbrio prático",
        "summary": "Boa parte das equipes busca um ponto intermediário: builds aceitáveis com ganhos relevantes de desempenho.",
        "leftLabel": "Velocidade de compilação",
        "leftValue": 62,
        "rightLabel": "Agressividade de otimização",
        "rightValue": 66,
        "takeaway": "É o terreno comum de muitos builds de integração e releases padrão.",
        "metrics": [
          {
            "label": "Tempo de build",
            "value": "Médio"
          },
          {
            "label": "Qualidade do código",
            "value": "Boa"
          },
          {
            "label": "Depuração",
            "value": "Viável"
          },
          {
            "label": "Uso em release",
            "value": "Alto"
          }
        ]
      },
      {
        "label": "Código final agressivo",
        "summary": "Mais passes e mais reescritas tentam extrair o máximo do alvo, aceitando custos maiores na compilação.",
        "leftLabel": "Velocidade de compilação",
        "leftValue": 24,
        "rightLabel": "Agressividade de otimização",
        "rightValue": 92,
        "takeaway": "Vale quando o custo do runtime domina ou o release é muito sensível a desempenho.",
        "metrics": [
          {
            "label": "Tempo de build",
            "value": "Alto"
          },
          {
            "label": "Qualidade do código",
            "value": "Muito alta"
          },
          {
            "label": "Depuração",
            "value": "Mais difícil"
          },
          {
            "label": "Uso em release",
            "value": "Muito alto"
          }
        ]
      }
    ]
  }
}) satisfies LessonModule["interactions"];
