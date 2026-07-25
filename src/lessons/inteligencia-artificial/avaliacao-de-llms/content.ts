import type { LessonContent } from "../../../types/content";

export const avaliacaoDeLlmsContent: LessonContent = {
  id: "avaliacao-de-llms",
  title: "Avaliação de LLMs",
  subtitle:
    "Como medir comportamento de modelos e aplicações com critérios mais sólidos do que impressão subjetiva após algumas demos.",
  description:
    "Uma aula intermediária sobre desenho de evals, qualidade de dataset, métricas, slices, LLM-as-a-judge, comparação de versões e avaliação contínua de sistemas baseados em LLMs.",
  primaryCategoryId: "inteligencia-artificial",
  secondaryCategoryId: "computacao",
  level: "Intermediário",
  estimatedTime: "40-55 min",
  tags: [
    "Evals",
    "LLM-as-a-judge",
    "Benchmark",
    "Métricas",
    "HELM",
    "MT-Bench",
  ],
  learningObjectives: [
    "Entender por que demos isoladas não bastam para avaliar aplicações com LLMs.",
    "Descrever os componentes de um bom eval: objetivo, dataset, critério, métrica e procedimento de comparação.",
    "Reconhecer a importância de slices e casos de borda para detectar regressões escondidas.",
    "Distinguir avaliações automáticas, humanas, pairwise e LLM-as-a-judge.",
    "Entender limites e vieses do uso de modelos como avaliadores.",
    "Aprender a comparar versões de prompt, modelo e pipeline com mais rigor.",
    "Conectar avaliação a operação contínua de produto e não apenas a benchmark estático.",
  ],
  prerequisites: [
    "Noção básica de como LLMs são usados em prompts, chatbots ou pipelines RAG.",
    "Familiaridade inicial com a ideia de teste ou comparação entre versões de sistema.",
    "Curiosidade para tratar qualidade de resposta como algo mensurável, mesmo com variabilidade gerativa.",
  ],
  references: [
    {
      title: "Working with evals",
      source: "OpenAI — documentação",
      url: "https://developers.openai.com/api/docs/guides/evals",
      note:
        "Guia prático sobre estruturar evals com dados, critérios e runs comparáveis.",
    },
    {
      title: "Evaluation best practices",
      source: "OpenAI — documentação",
      url: "https://developers.openai.com/api/docs/guides/evaluation-best-practices",
      note:
        "Boa referência para pensar objetivo, dataset, métricas e avaliação contínua em sistemas generativos.",
    },
    {
      title: "Evals",
      source: "OpenAI API Reference",
      url: "https://developers.openai.com/api/reference/resources/evals/",
      note:
        "Mostra a estrutura formal de evals, testing criteria e runs, útil para a visão operacional do tema.",
    },
    {
      title: "Holistic Evaluation of Language Models",
      source: "Liang et al., 2023 — arXiv / TMLR",
      url: "https://arxiv.org/abs/2211.09110",
      note:
        "Referência importante para avaliação multidimensional e cobertura mais ampla do comportamento de modelos.",
    },
    {
      title: "Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena",
      source: "Zheng et al., 2023 — arXiv",
      url: "https://arxiv.org/abs/2306.05685",
      note:
        "Discute uso de modelos como juízes, acordo com humanos e vieses como posição e verbosidade.",
    },
  ],
  heroVisual: "hero",
  openingText:
    "Sistemas com LLM podem parecer ótimos em uma demo curta e ainda falhar de maneiras sistemáticas em produção. Isso acontece porque geração é variável, aberta e sensível a contexto. Avaliar bem significa transformar impressões em procedimento: definir o que queremos medir, em quais casos, com quais critérios e com qual grau de confiança para comparar versões. Sem isso, a equipe otimiza para entusiasmo momentâneo e não para qualidade reprodutível.",
  quickFacts: [
    {
      title: "Uma boa demo não é um bom eval",
      body:
        "Demos mostram capacidade; evals medem consistência em casos representativos e difíceis.",
    },
    {
      title: "Avaliação começa no objetivo",
      body:
        "Antes da métrica, é preciso decidir que comportamento realmente importa para a aplicação.",
    },
    {
      title: "LLM-as-a-judge ajuda, mas não é neutro",
      body:
        "Modelos avaliadores escalam comparação, porém também carregam vieses e limites próprios.",
    },
  ],
  sections: [
    {
      id: "por-que-avaliar",
      eyebrow: "Motivação",
      title: "Sem avaliação, melhorar um sistema com LLM vira sensação em vez de engenharia",
      lead:
        "Como a saída é variável e aberta, confiar só em impressão subjetiva é receita para regressões invisíveis.",
      visual: "hero",
      paragraphs: [
        "Em software clássico, muitos comportamentos podem ser verificados com testes determinísticos. Em aplicações com LLMs, isso muda: a mesma entrada pode produzir respostas diferentes e ainda assim aceitáveis. Por isso, não basta perguntar se o sistema 'funcionou uma vez'.",
        "Avaliação serve para transformar essa variabilidade em comparação sistemática. Ela define um conjunto de casos, critérios explícitos e métricas que permitem dizer se uma mudança melhorou, piorou ou apenas deslocou o comportamento do sistema.",
        "Quando a equipe não faz isso, decisões passam a depender de exemplos chamativos, vieses de memória e preferências individuais de quem testou por último.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Eval",
          body:
            "Teste estruturado para medir o desempenho de um modelo ou aplicação em um objetivo específico, usando dados e critérios definidos.",
        },
      ],
    },
    {
      id: "ingredientes",
      eyebrow: "Estrutura",
      title: "Objetivo, dataset, critério e métrica são os ingredientes mínimos",
      lead:
        "Muitas avaliações parecem rigorosas, mas na prática misturam objetivos vagos com dados mal escolhidos.",
      visual: "concept",
      paragraphs: [
        "O primeiro passo é definir o objetivo: classificar tickets? resumir com fidelidade? responder usando documentos? argumentar com segurança? Só depois faz sentido escolher dados, rubricas e métricas. Sem objetivo claro, a avaliação se torna um agregado confuso.",
        "O dataset precisa representar o problema real, inclusive casos difíceis, não apenas exemplos fáceis que deixam a demo bonita. O critério precisa dizer o que conta como resposta boa. E a métrica precisa resumir esse critério sem esconder nuances demais.",
        "Esses ingredientes não precisam ser sofisticados para serem úteis. O essencial é que sejam explícitos e repetíveis.",
      ],
      blocks: [
        {
          type: "insight",
          title: "Métrica não vem primeiro",
          body:
            "Escolher a métrica antes de clarificar o objetivo costuma levar a números bonitos que não respondem à pergunta certa.",
        },
      ],
    },
    {
      id: "dataset-slices",
      eyebrow: "Cobertura",
      title: "Dataset bom inclui casos normais, casos de borda e slices relevantes",
      lead:
        "A média geral quase sempre esconde os lugares em que a experiência realmente quebra.",
      visual: "pipeline",
      interactive: "eval-design-lab",
      paragraphs: [
        "Se a aplicação atende usuários multilíngues, diferentes domínios, documentos longos, perguntas ambíguas ou instruções adversariais, o eval precisa refletir essas variações. Caso contrário, a média geral pode melhorar ao mesmo tempo em que um grupo importante piora muito.",
        "Slices são subconjuntos de teste definidos por características relevantes: perguntas longas, consultas com entidades raras, conteúdo regulatório, entradas com conflito de fontes, etc. Eles ajudam a ver onde o sistema é robusto e onde só parece robusto em média.",
        "A interação desta seção mostra como qualidade de dataset e cobertura de slices aumentam o sinal útil da avaliação.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Slice",
          body:
            "Subconjunto do dataset definido por uma propriedade importante para análise, como idioma, tipo de erro, comprimento ou domínio.",
        },
      ],
    },
    {
      id: "metricas-rubricas",
      eyebrow: "Medição",
      title: "Métricas automáticas e rubricas humanas medem coisas diferentes",
      lead:
        "Nem tudo que importa cabe em exact match, mas nem toda avaliação subjetiva escala bem.",
      visual: "comparison",
      paragraphs: [
        "Algumas tarefas admitem métricas mais objetivas: classificação, extração estruturada, presença de campos, aderência a schema, cobertura de citações. Outras exigem rubricas mais ricas: utilidade, clareza, segurança, fidelidade à fonte, completude ou tom apropriado.",
        "O segredo é alinhar forma de medida ao tipo de tarefa. Forçar exact match em uma resposta aberta pode punir variações boas. Usar apenas julgamento subjetivo em larga escala pode introduzir ruído e inconsistência demais.",
        "Em aplicações reais, avaliações fortes costumam combinar camadas: checks automáticos para o que é objetivo e rubricas para o que é qualitativo.",
      ],
      blocks: [
        {
          type: "example",
          title: "Combinação útil",
          body:
            "Num assistente jurídico interno, você pode medir schema e presença de citação automaticamente, e ainda usar rubrica humana para adequação interpretativa.",
        },
      ],
    },
    {
      id: "judge",
      eyebrow: "Escalabilidade",
      title: "LLM-as-a-judge acelera comparação, mas também introduz vieses",
      lead:
        "Usar modelo como avaliador é poderoso, desde que você saiba o que ele está julgando e onde ele pode distorcer o placar.",
      visual: "tradeoff",
      interactive: "judge-modes",
      paragraphs: [
        "Modelos avaliadores são úteis para comparar respostas abertas em escala, principalmente quando julgam preferências pairwise, aderência a instruções ou qualidade segundo rubricas. Isso reduz custo humano e acelera experimentação.",
        "Mas o juiz também é um modelo com seus próprios vieses. Trabalhos como MT-Bench discutem vieses de posição, verbosidade e alinhamento com o estilo do próprio avaliador. Sem cuidado, você otimiza para agradar o juiz e não necessariamente para melhorar a experiência real.",
        "Por isso, LLM-as-a-judge funciona melhor como componente dentro de um ecossistema de avaliação, e não como árbitro absoluto e incontestável.",
      ],
      blocks: [
        {
          type: "mistake",
          title: "Erro comum",
          body:
            "Tratar o score do juiz-modelo como verdade final sem checar acordo com humanos em slices críticos.",
        },
      ],
    },
    {
      id: "comparando-versoes",
      eyebrow: "Operação",
      title: "Avaliar bem é comparar versões de forma controlada",
      lead:
        "Trocar modelo, prompt, retriever ou policy sem medição consistente cria regressões silenciosas.",
      interactive: "evaluation-scenarios",
      paragraphs: [
        "Toda mudança importante — novo modelo, novo prompt, novo top-k, novo filtro, novo schema — deveria ser avaliada contra um baseline conhecido. O objetivo não é buscar um número universal, e sim saber se a mudança melhora o comportamento que importa para a aplicação.",
        "Essa comparação fica melhor quando os casos de teste permanecem estáveis e quando os resultados são analisados por slice. Às vezes a média sobe pouco, mas um segmento estratégico melhora muito. Outras vezes a média sobe e um caso crítico piora dramaticamente.",
        "Avaliação contínua transforma evolução de sistema em processo observável. Sem ela, times acabam debatendo preferências pessoais em vez de evidência comparável.",
      ],
      blocks: [
        {
          type: "insight",
          title: "Baseline é memória do sistema",
          body:
            "Sem baseline, cada versão vira ponto solto. Com baseline, você enxerga direção, regressão e trade-off ao longo do tempo.",
        },
      ],
    },
    {
      id: "limites",
      eyebrow: "Realismo",
      title: "Nenhum eval captura tudo, então o portfólio de avaliação importa mais que um único número",
      lead:
        "Modelos generativos têm múltiplas dimensões de qualidade, e reduzi-las a um score único é sempre perda de informação.",
      visual: "checklist",
      paragraphs: [
        "Um benchmark pode medir conhecimento, mas não segurança contextual. Outro mede preferência conversacional, mas não fidelidade a documentos. Outro mede aderência a formato, mas não utilidade percebida. A cobertura do ecossistema importa.",
        "Essa é uma das grandes lições de propostas como HELM: avaliação madura precisa olhar para vários aspectos do comportamento e explicitar o que está ou não sendo medido. Caso contrário, o time confunde score local com qualidade geral.",
        "Portanto, não busque o eval perfeito. Busque um conjunto de evals honestos sobre o que cobrem e úteis para as decisões que você realmente precisa tomar.",
      ],
      blocks: [
        {
          type: "insight",
          title: "Score único é compressão de realidade",
          body:
            "Útil para decisão rápida, perigoso quando vira substituto de análise por slice, modo de falha e objetivo de produto.",
        },
      ],
    },
    {
      id: "resumo",
      eyebrow: "Síntese",
      title: "Resumo visual da avaliação de LLMs",
      lead:
        "Avaliar bem significa definir o objetivo certo, medir com dados representativos e comparar versões com critério explícito.",
      interactive: "summary-cards",
      paragraphs: [
        "Guarde a ideia central: qualidade em LLM não é impressão; é processo de medição com consciência de limites.",
      ],
    },
    {
      id: "quiz",
      eyebrow: "Revisão",
      title: "Quiz de revisão",
      lead:
        "Teste se você conectou dataset, métricas, juiz e comparação contínua em um mesmo raciocínio.",
      interactive: "quiz",
      paragraphs: [
        "As perguntas abaixo focam especialmente nos erros conceituais mais comuns em avaliação de sistemas generativos.",
      ],
    },
    {
      id: "glossario",
      eyebrow: "Vocabulário",
      title: "Glossário essencial",
      lead:
        "Feche a aula com o vocabulário mais recorrente em plataformas, papers e times que trabalham com evals.",
      interactive: "glossary",
      paragraphs: [
        "Esse léxico ajuda a discutir qualidade com mais precisão e menos impressão vaga.",
      ],
    },
  ],
  summaryCards: [
    {
      title: "Demo e eval cumprem papéis diferentes",
      body:
        "Demos inspiram; evals comparam versões com método, cobertura e repetibilidade.",
    },
    {
      title: "Objetivo guia dataset e métrica",
      body:
        "Sem objetivo explícito, números podem parecer úteis enquanto medem a coisa errada.",
    },
    {
      title: "Slices revelam regressões escondidas",
      body:
        "Analisar só a média global pode mascarar quedas graves em grupos ou cenários importantes.",
    },
    {
      title: "Juiz-modelo é ferramenta, não oráculo",
      body:
        "LLM-as-a-judge escala comparação, mas precisa de calibração e checagem com avaliação humana quando o risco é alto.",
    },
    {
      title: "Avaliação contínua sustenta evolução",
      body:
        "Baseline estável, comparação controlada e observação por slice tornam mudanças de sistema mais seguras.",
    },
  ],
  quiz: [
    {
      id: "q1",
      prompt: "Por que uma demo boa não basta como avaliação?",
      options: [
        { id: "a", label: "Porque demos não medem consistência em casos representativos nem comparam versões de modo controlado." },
        { id: "b", label: "Porque toda demo é automaticamente enviesada e inútil." },
        { id: "c", label: "Porque LLMs não podem ser avaliados de forma alguma." },
      ],
      correctOptionId: "a",
      feedback:
        "Demos são ótimas para mostrar potencial, mas fracas para medir robustez e regressão.",
    },
    {
      id: "q2",
      prompt: "Qual é o primeiro passo de um bom eval?",
      options: [
        { id: "a", label: "Definir claramente o objetivo ou comportamento que se quer medir." },
        { id: "b", label: "Escolher uma métrica famosa e aplicá-la a qualquer tarefa." },
        { id: "c", label: "Trocar o modelo por um maior antes de medir." },
      ],
      correctOptionId: "a",
      feedback:
        "Sem objetivo explícito, dataset e métrica ficam soltos e a comparação perde sentido.",
    },
    {
      id: "q3",
      prompt: "O que é um slice em avaliação?",
      options: [
        { id: "a", label: "Um subconjunto do dataset definido por característica relevante para análise." },
        { id: "b", label: "Uma técnica de compressão de embeddings." },
        { id: "c", label: "Um prompt curto usado só em raciocínio." },
      ],
      correctOptionId: "a",
      feedback:
        "Slices ajudam a revelar padrões escondidos pela média global.",
    },
    {
      id: "q4",
      prompt: "Quando métricas automáticas costumam ser mais úteis?",
      options: [
        { id: "a", label: "Quando há critérios objetivos como schema, campos obrigatórios, classe correta ou presença de citação." },
        { id: "b", label: "Quando a tarefa é completamente aberta e sem qualquer restrição." },
        { id: "c", label: "Somente quando o modelo é pequeno." },
      ],
      correctOptionId: "a",
      feedback:
        "Critérios objetivos escalam bem; dimensões qualitativas podem exigir rubricas ou juízes mais ricos.",
    },
    {
      id: "q5",
      prompt: "Qual é um risco do LLM-as-a-judge?",
      options: [
        { id: "a", label: "O avaliador pode ter vieses próprios, como favorecer verbosidade ou certas posições de resposta." },
        { id: "b", label: "Ele sempre concorda perfeitamente com humanos." },
        { id: "c", label: "Ele só funciona em tarefas de matemática." },
      ],
      correctOptionId: "a",
      feedback:
        "Juiz-modelo é útil, mas carrega suas próprias preferências e limitações.",
    },
    {
      id: "q6",
      prompt: "Por que baseline é importante?",
      options: [
        { id: "a", label: "Porque ele permite comparar mudanças de forma consistente ao longo do tempo." },
        { id: "b", label: "Porque impede qualquer atualização do sistema." },
        { id: "c", label: "Porque substitui a necessidade de dataset." },
      ],
      correctOptionId: "a",
      feedback:
        "Baseline dá memória comparável ao processo de evolução do sistema.",
    },
    {
      id: "q7",
      prompt: "Qual afirmação sobre score único é mais adequada?",
      options: [
        { id: "a", label: "É útil como resumo, mas comprime demais a realidade e pode esconder falhas por slice ou objetivo." },
        { id: "b", label: "Ele sempre descreve a qualidade total do sistema com precisão suficiente." },
        { id: "c", label: "Dispensa análise qualitativa e investigação de modos de falha." },
      ],
      correctOptionId: "a",
      feedback:
        "Score agregado ajuda a decidir rápido, mas não substitui análise mais rica quando o comportamento importa.",
    },
    {
      id: "q8",
      prompt: "O que caracteriza avaliação contínua madura?",
      options: [
        { id: "a", label: "Rodar comparações recorrentes com casos representativos, slices e critérios estáveis ao longo das mudanças." },
        { id: "b", label: "Testar só quando a equipe sente que algo parece estranho." },
        { id: "c", label: "Confiar apenas no benchmark público mais conhecido." },
      ],
      correctOptionId: "a",
      feedback:
        "Avaliação contínua transforma evolução de modelo, prompt e pipeline em processo observável e menos frágil.",
    },
  ],
  glossary: [
    { term: "Eval", definition: "Teste estruturado para medir desempenho de modelo ou sistema em um objetivo específico." },
    { term: "Baseline", definition: "Versão de referência usada para comparar mudanças posteriores." },
    { term: "Dataset de avaliação", definition: "Conjunto de casos usado para medir comportamento do sistema." },
    { term: "Slice", definition: "Subconjunto relevante do dataset analisado separadamente." },
    { term: "Rubrica", definition: "Conjunto explícito de critérios usados para julgar qualidade de uma resposta." },
    { term: "Métrica", definition: "Medida numérica ou categórica usada para resumir desempenho segundo um critério." },
    { term: "Exact match", definition: "Métrica que exige correspondência exata entre resposta prevista e resposta esperada." },
    { term: "Pairwise evaluation", definition: "Comparação entre duas respostas para decidir qual é melhor segundo um critério." },
    { term: "LLM-as-a-judge", definition: "Uso de um modelo de linguagem como avaliador de respostas geradas por outro sistema." },
    { term: "Benchmark", definition: "Conjunto padronizado de tarefas e medidas usado para comparação entre sistemas." },
    { term: "Regressão", definition: "Piora de comportamento causada por uma mudança em modelo, prompt ou pipeline." },
    { term: "Avaliação contínua", definition: "Processo recorrente de medir qualidade do sistema ao longo de mudanças e novas versões." },
  ],
};
