import type { LessonModule } from "../../../types/content";
import { buildComputacaoInteractions } from "../shared/lessonFactory";

export const interactions = buildComputacaoInteractions({
  "flow": {
    "id": "loader-pipeline-lab",
    "eyebrow": "Loader",
    "title": "Acompanhe o nascimento do processo",
    "description": "Passe etapa por etapa pelo caminho que vai do executável no disco ao primeiro salto para o programa.",
    "tone": "indigo",
    "icon": "Workflow",
    "stages": [
      {
        "label": "Arquivo executável",
        "detail": "O kernel recebe um caminho e precisa validar se aquele arquivo pode ser tratado como executável do formato esperado.",
        "cue": "bytes, permissões e formato"
      },
      {
        "label": "Nova imagem de memória",
        "detail": "A imagem antiga do processo é descartada e um novo espaço de endereços passa a ser montado com as regiões necessárias.",
        "cue": "mapeamentos e isolamento"
      },
      {
        "label": "Bibliotecas e segmentos",
        "detail": "Código, dados, bibliotecas compartilhadas e páginas auxiliares são mapeados com permissões adequadas.",
        "cue": "RX, RW e compartilhamento"
      },
      {
        "label": "Stack inicial",
        "detail": "Argumentos, ambiente e informações auxiliares são empilhados antes de o programa começar.",
        "cue": "argc, argv e envp"
      },
      {
        "label": "Entry point",
        "detail": "Com registradores e stack preparados, a CPU transfere o controle para o ponto de entrada do novo programa.",
        "cue": "a primeira instrução útil"
      }
    ]
  },
  "compare": {
    "id": "fork-exec-lab",
    "eyebrow": "API de processos",
    "title": "Compare fork, execve e a combinação dos dois",
    "description": "Veja qual problema cada chamada resolve e por que o shell costuma usá-las em sequência.",
    "tone": "violet",
    "icon": "ArrowRightLeft",
    "options": [
      {
        "label": "fork()",
        "headline": "Cria um novo processo parecido com o pai",
        "bullets": [
          "Preserva contexto suficiente para configurar o filho.",
          "É o passo clássico antes de redirecionamentos e pipes.",
          "Não troca automaticamente o programa executado."
        ]
      },
      {
        "label": "execve()",
        "headline": "Troca o programa do processo atual",
        "bullets": [
          "Substitui a imagem de memória do chamador.",
          "Mantém a identidade do processo em vez de criar outro.",
          "Faz sentido quando você já tem o processo certo e quer outro binário nele."
        ]
      },
      {
        "label": "fork() + execve()",
        "headline": "Combina criação com substituição controlada",
        "bullets": [
          "Dá ao shell uma janela para ajustar arquivos, ambiente e sinais.",
          "Permite compor comandos em pipelines.",
          "Explica a ergonomia dos processos no Unix."
        ]
      }
    ]
  },
  "slider": {
    "id": "process-layout-lab",
    "eyebrow": "Startup real",
    "title": "Como o processo cresce em complexidade",
    "description": "Arraste o controle e compare cenários de inicialização mais enxutos ou mais carregados de runtime.",
    "tone": "emerald",
    "icon": "Layers",
    "axisLabel": "Cenário de arranque",
    "states": [
      {
        "label": "Binário enxuto",
        "summary": "Poucos mapeamentos e pouca dependência externa deixam o início mais previsível e mais fácil de depurar.",
        "leftLabel": "Simplicidade de startup",
        "leftValue": 88,
        "rightLabel": "Flexibilidade de runtime",
        "rightValue": 34,
        "takeaway": "Ótimo para utilitários simples e ambientes altamente controlados.",
        "metrics": [
          {
            "label": "Mapas",
            "value": "Poucos"
          },
          {
            "label": "Risco ambiental",
            "value": "Baixo"
          },
          {
            "label": "Depuração",
            "value": "Direta"
          },
          {
            "label": "Flexibilidade",
            "value": "Menor"
          }
        ]
      },
      {
        "label": "Linking dinâmico comum",
        "summary": "A maioria das aplicações reais vive aqui: ganha reutilização e manutenção, mas adiciona dependências de ambiente e resolução dinâmica.",
        "leftLabel": "Simplicidade de startup",
        "leftValue": 58,
        "rightLabel": "Flexibilidade de runtime",
        "rightValue": 72,
        "takeaway": "É o ponto de equilíbrio mais comum em servidores e ferramentas gerais.",
        "metrics": [
          {
            "label": "Mapas",
            "value": "Médios"
          },
          {
            "label": "Risco ambiental",
            "value": "Moderado"
          },
          {
            "label": "Depuração",
            "value": "Cuidadosa"
          },
          {
            "label": "Flexibilidade",
            "value": "Alta"
          }
        ]
      },
      {
        "label": "Runtime carregado",
        "summary": "Mais bibliotecas, inicializadores e ambiente rico aumentam a superfície de falha antes da lógica de negócio.",
        "leftLabel": "Simplicidade de startup",
        "leftValue": 26,
        "rightLabel": "Flexibilidade de runtime",
        "rightValue": 90,
        "takeaway": "Convém observar logs de bootstrap, dependências e o peso do ambiente.",
        "metrics": [
          {
            "label": "Mapas",
            "value": "Muitos"
          },
          {
            "label": "Risco ambiental",
            "value": "Alto"
          },
          {
            "label": "Depuração",
            "value": "Mais ampla"
          },
          {
            "label": "Flexibilidade",
            "value": "Muito alta"
          }
        ]
      }
    ]
  }
}) satisfies LessonModule["interactions"];
