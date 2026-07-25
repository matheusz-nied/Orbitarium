import type { LessonModule } from "../../../types/content";
import { createStandardLessonVisuals } from "../../inteligencia-artificial/_shared/visualFactories";

export const visuals = {
  ...createStandardLessonVisuals({
    tone: "amber",
    heroTitle: "Do documento bruto ao dado estruturado",
    heroSubtitle: "imagem da página → texto → layout → campos úteis",
    heroSteps: ["Limpar", "Ler", "Estruturar"],
    heroFooter:
      "OCR lê caracteres; Document AI organiza significado operacional.",
    conceptTitle: "Texto reconhecido não basta sozinho",
    conceptLeft: {
      title: "OCR bruto",
      body: "transcreve palavras e linhas, mas pode perder a estrutura visual",
    },
    conceptRight: {
      title: "Document AI",
      body: "relaciona posição, blocos, campos, tabelas e entidades",
    },
    conceptFooter: "entender documento exige texto + layout",
    pipelineTitle: "Pipeline conceitual de leitura documental",
    pipelineSteps: ["Pré-processar", "Detectar", "Reconhecer", "Ordenar", "Extrair"],
    comparisonTitle: "Ordem de leitura e layout mudam tudo",
    comparisonLeft: {
      title: "Sequência correta",
      body: "blocos, colunas e campos são percorridos preservando a lógica do documento",
    },
    comparisonRight: {
      title: "Sequência quebrada",
      body: "palavras certas em ordem errada geram texto inutilizável para automação",
    },
    tradeoffTitle: "Generalidade vs precisão de template",
    tradeoffXAxis: "variação do documento",
    tradeoffYAxis: "estrutura recuperada",
    tradeoffPoints: [
      { label: "template fixo", x: 0.18, y: 0.88 },
      { label: "misto", x: 0.48, y: 0.66 },
      { label: "layout caótico", x: 0.82, y: 0.34 },
      { label: "híbrido", x: 0.62, y: 0.58 },
    ],
    checklistTitle: "Checklist mental de um pipeline documental",
    checklistItems: [
      "A imagem está torta ou escura?",
      "O texto foi detectado por blocos corretos?",
      "A ordem de leitura faz sentido?",
      "Campos chave-valor foram associados?",
      "Tabelas preservaram linhas e colunas?",
      "Há fallback para baixa confiança?",
    ],
  }),
} satisfies LessonModule["visuals"];
