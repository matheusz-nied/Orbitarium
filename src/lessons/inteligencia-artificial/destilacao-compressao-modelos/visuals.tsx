import type { LessonModule } from "../../../types/content";
import { createStandardLessonVisuals } from "../_shared/visualFactories";

export const visuals = createStandardLessonVisuals({
  "tone": "indigo",
  "heroTitle": "Destilar é transferir generalização, não só reduzir parâmetros",
  "heroSubtitle": "O aluno aprende com o comportamento probabilístico do professor e não apenas com rótulos duros",
  "heroSteps": [
    "Ensinar",
    "Condensar",
    "Validar"
  ],
  "heroFooter": "Compressão útil preserva o que o professor sabe fazer bem sob o orçamento do deployment.",
  "conceptTitle": "Teacher e student veem o mesmo exemplo de formas diferentes",
  "conceptLeft": {
    "title": "Teacher",
    "body": "Distribuição rica, com relações entre alternativas."
  },
  "conceptRight": {
    "title": "Student",
    "body": "Aprende a reproduzir essa estrutura dentro de menos capacidade."
  },
  "conceptFooter": "Soft targets tornam as ambiguidades do professor ensináveis.",
  "pipelineTitle": "Fluxo clássico de destilação",
  "pipelineSteps": [
    "Teacher",
    "Temperar",
    "Treinar aluno",
    "Comprimir",
    "Validar"
  ],
  "comparisonTitle": "Mais do que logits finais",
  "comparisonLeft": {
    "title": "Só saída",
    "body": "Mais simples, mas pode perder supervisão estrutural útil."
  },
  "comparisonRight": {
    "title": "Saída + features",
    "body": "Aumenta custo, mas ajuda em alunos mais diferentes do teacher."
  },
  "tradeoffTitle": "Compressão vs. risco de underfitting",
  "tradeoffXAxis": "Agressividade da compressão",
  "tradeoffYAxis": "Risco de perda comportamental",
  "tradeoffPoints": [
    {
      "label": "Teacher",
      "x": 0.08,
      "y": 0.06
    },
    {
      "label": "Aluno destilado",
      "x": 0.48,
      "y": 0.28
    },
    {
      "label": "Aluno + quantização",
      "x": 0.72,
      "y": 0.46
    },
    {
      "label": "Compressão excessiva",
      "x": 0.9,
      "y": 0.84
    }
  ],
  "checklistTitle": "Checklist de compressão madura",
  "checklistItems": [
    "O aluno tem capacidade suficiente para a tarefa?",
    "A temperatura revela estrutura útil sem lavar demais a distribuição?",
    "A loss combina hard labels e sinais do teacher de forma coerente?",
    "Há avaliação por casos raros e subgrupos?",
    "Poda e quantização entram onde fazem sentido no pipeline?",
    "O ganho operacional compensa a complexidade adicional?"
  ]
}) satisfies LessonModule["visuals"];
