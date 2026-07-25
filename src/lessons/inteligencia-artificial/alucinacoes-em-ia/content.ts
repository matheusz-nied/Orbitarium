import type { LessonContent } from "../../../types/content";

export const alucinacoesEmIaContent: LessonContent = {
  id: "alucinacoes-em-ia",
  title: "Alucinações em IA",
  subtitle:
    "Por que um modelo pode soar convincente sem estar apoiado em evidência suficiente, e como reduzir esse risco sem cair em explicações mágicas.",
  description:
    "Uma aula introdutória sobre o que são alucinações em IA, por que elas aparecem em LLMs, diferença entre plausibilidade e verdade, tipos de alucinação, grounding, mitigação prática e limites reais do problema.",
  primaryCategoryId: "inteligencia-artificial",
  secondaryCategoryId: "computacao",
  level: "Iniciante",
  estimatedTime: "35-45 min",
  tags: [
    "LLM",
    "Alucinação",
    "Grounding",
    "Factualidade",
    "RAG",
    "Avaliação",
  ],
  learningObjectives: [
    "Entender por que um LLM pode produzir texto plausível sem estar dizendo algo verdadeiro.",
    "Distinguir alucinação de simples erro, ambiguidade do pedido e resposta mal fundamentada.",
    "Reconhecer tipos comuns de alucinação, como fato inventado, citação fabricada e generalização sem apoio.",
    "Explicar por que prever o próximo token não é o mesmo que verificar fatos no mundo.",
    "Relacionar grounding, contexto e recuperação externa com redução de alucinações.",
    "Aprender estratégias práticas de mitigação: pedir fontes, restringir escopo, permitir abstenção e avaliar saídas.",
    "Entender por que não existe solução absoluta e por que aplicações críticas exigem validação extra.",
  ],
  prerequisites: [
    "Ter noção básica de que LLMs geram texto token por token.",
    "Curiosidade sobre como modelos podem errar mesmo soando confiantes.",
    "Não é necessário conhecimento matemático avançado; a aula trabalha com intuição e exemplos.",
  ],
  references: [
    {
      title: "Survey of Hallucination in Natural Language Generation",
      source: "Ji et al., 2023 — arXiv",
      url: "https://arxiv.org/abs/2202.03629",
      note:
        "Survey amplo sobre definições, métricas, causas e mitigação de alucinações em geração de linguagem.",
    },
    {
      title: "A Survey on Hallucination in Large Language Models: Principles, Taxonomy, Challenges, and Open Questions",
      source: "Huang et al., 2024 — arXiv",
      url: "https://arxiv.org/abs/2311.05232",
      note:
        "Organiza o problema especificamente para LLMs e discute limites de detecção e mitigação.",
    },
    {
      title: "On Faithfulness and Factuality in Abstractive Summarization",
      source: "Maynez et al., 2020 — ACL Anthology",
      url: "https://aclanthology.org/2020.acl-main.173/",
      note:
        "Referência importante para diferenciar factualidade e fidelidade ao texto-fonte, especialmente em geração condicionada.",
    },
    {
      title: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks",
      source: "Lewis et al., 2020 — arXiv",
      url: "https://arxiv.org/abs/2005.11401",
      note:
        "Mostra como recuperação externa pode ajudar geração factual e fornecer lastro documental.",
    },
    {
      title: "Prompt engineering",
      source: "OpenAI — documentação",
      url: "https://developers.openai.com/api/docs/guides/prompt-engineering",
      note:
        "Guia prático sobre fornecer contexto, instruções claras e dados relevantes para reduzir respostas mal fundamentadas.",
    },
    {
      title: "Detecting Hallucinated Content in Conditional Neural Sequence Generation",
      source: "Lee et al., 2021 — ACL Anthology",
      url: "https://aclanthology.org/2021.findings-acl.120/",
      note:
        "Discute detecção automática de conteúdo alucinado em geração condicional.",
    },
  ],
  heroVisual: "hero",
  openingText:
    "Uma resposta pode estar muito bem escrita e ainda assim ser falsa. Esse é um dos fatos mais importantes sobre LLMs. O modelo não consulta automaticamente o mundo, um banco de dados confiável ou um verificador de fatos interno a cada frase. Ele continua padrões linguísticos aprendidos e tenta produzir a próxima sequência que pareça adequada ao contexto. Quando esse processo acontece sem evidência suficiente, surgem as alucinações: respostas convincentes, mas frágeis, inventadas ou mal apoiadas.",
  quickFacts: [
    {
      title: "Plausível não significa verdadeiro",
      body:
        "LLMs são excelentes em produzir texto que parece correto, mesmo quando a base factual está ausente ou confusa.",
    },
    {
      title: "Confiar no tom é perigoso",
      body:
        "O modelo pode soar seguro porque aprendeu estilo de resposta, não porque checou a informação externamente.",
    },
    {
      title: "Mitigação é sistêmica",
      body:
        "Prompt melhor ajuda, mas aplicações confiáveis também usam grounding, recuperação, validação e avaliação contínua.",
    },
  ],
  sections: [
    {
      id: "o-que-e",
      eyebrow: "Definição",
      title: "O que chamamos de alucinação em IA?",
      lead:
        "Em linguagem simples, é quando o modelo produz uma informação que parece adequada, mas não está apoiada no que sabe de forma confiável nem no contexto fornecido.",
      visual: "hero",
      paragraphs: [
        "O termo alucinação ficou popular para descrever respostas inventadas, inexatas ou sem suporte verificável. Em LLMs, isso pode aparecer como um fato inexistente, uma referência bibliográfica inventada, uma explicação causal que nunca ocorreu ou uma resposta dada com excesso de certeza quando o contexto não basta.",
        "Nem todo erro é exatamente a mesma coisa. Às vezes o problema é ambiguidade do pedido, às vezes é falta de contexto, às vezes é uma generalização estatística ruim. Ainda assim, a ideia central é útil: o modelo completou um padrão linguístico convincente sem uma ligação robusta com evidência suficiente.",
        "Por isso, alucinação não é só 'mentira'. O modelo não precisa ter intenção para produzir algo falso. O que existe é um mecanismo de geração textual que otimiza plausibilidade local, e isso pode divergir da verdade.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Alucinação",
          body:
            "Saída gerada que contém conteúdo falso, inventado, não verificável ou não sustentado pelo contexto ou por evidência externa suficiente.",
        },
        {
          type: "mistake",
          title: "Erro comum",
          body:
            "Achar que alucinação acontece apenas quando o modelo 'cria nomes'. Respostas vagas, inferências sem base e citações mal atribuídas também entram no problema.",
        },
      ],
    },
    {
      id: "plausibilidade",
      eyebrow: "Intuição central",
      title: "O modelo otimiza continuidade plausível, não verificação do mundo",
      lead:
        "Essa distinção explica por que respostas fluidas podem falhar justamente quando pedimos precisão factual.",
      visual: "concept",
      paragraphs: [
        "Durante a geração, o LLM seleciona tokens que combinam bem com o contexto linguístico e com padrões vistos no treinamento. Esse processo pode capturar muita regularidade do mundo, mas não equivale a consultar uma base de fatos atualizada e confiável em tempo real.",
        "Quando falta evidência explícita, o modelo ainda precisa produzir alguma continuação. Se o prompt o empurra para responder sempre, sem admitir incerteza, ele tende a preencher lacunas com a continuação que mais parece adequada. É aí que a confiança estilística pode mascarar fragilidade factual.",
        "Em outras palavras, boa escrita e boa epistemologia não são a mesma coisa. Um texto pode ter gramática impecável e argumento aparente, mas continuar sem sustentação concreta.",
      ],
      blocks: [
        {
          type: "insight",
          title: "Forma e verdade são camadas diferentes",
          body:
            "O modelo aprendeu muito sobre forma da linguagem. Isso ajuda na utilidade, mas não garante que o conteúdo esteja fundamentado no momento da resposta.",
        },
      ],
    },
    {
      id: "tipos",
      eyebrow: "Diagnóstico",
      title: "Nem toda alucinação tem a mesma cara",
      lead:
        "Classificar o erro ajuda a decidir a melhor mitigação, em vez de tratar todo problema como se fosse igual.",
      visual: "pipeline",
      interactive: "grounding-modes",
      paragraphs: [
        "Um tipo frequente é a invenção factual direta: datas, nomes, eventos, artigos ou links que nunca existiram. Outro tipo aparece quando o modelo mistura fatos reais com detalhes falsos, criando algo difícil de detectar à primeira vista.",
        "Há também falhas de fidelidade ao material fornecido. Em resumo, o modelo pode receber um texto base e ainda assim responder com conteúdo que contradiz o documento, extrapola sem sinalizar ou atribui ao texto coisas que ele não disse.",
        "Ao explorar a interação desta seção, observe como diferentes políticas de grounding mudam o comportamento: responder só com memória paramétrica, responder com contexto explícito ou preferir abster-se quando a evidência está fraca.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Grounding",
          body:
            "Ato de apoiar a resposta em evidência externa, contexto fornecido, documentos recuperados ou dados verificáveis, em vez de confiar apenas na memória paramétrica do modelo.",
        },
        {
          type: "example",
          title: "Exemplo típico",
          body:
            "Perguntar por um paper inexistente e receber título, autores e resumo completos é um caso clássico de alucinação confiante.",
        },
      ],
    },
    {
      id: "gatilhos",
      eyebrow: "Causas práticas",
      title: "Falta de contexto, pedido amplo e obrigação de responder aumentam o risco",
      lead:
        "Alucinações não nascem só do modelo; elas também são induzidas pela forma como a tarefa é formulada e pelo sistema em torno dele.",
      interactive: "hallucination-risk-lab",
      paragraphs: [
        "Se o prompt é amplo demais, o modelo precisa decidir sozinho que escopo adotar, quais fontes presumir e até que ponto extrapolar. Quanto maior essa liberdade sem evidência, maior o espaço para respostas que parecem corretas, mas não são.",
        "Outro gatilho forte é proibir implicitamente a incerteza. Quando o sistema ou o usuário comunicam que 'precisa haver resposta', o modelo fica pressionado a completar o padrão, mesmo que a melhor atitude fosse dizer 'não sei' ou pedir mais dados.",
        "A interação mostra esse equilíbrio: contexto forte, possibilidade de abstenção e exigência de citação tendem a reduzir o risco. Ambiguidade alta e pressão por completude fazem o contrário.",
      ],
      blocks: [
        {
          type: "insight",
          title: "Abstenção é ferramenta de qualidade",
          body:
            "Em muitos casos, a melhor resposta confiável não é responder mais, e sim sinalizar limite, pedir fonte ou restringir escopo.",
        },
      ],
    },
    {
      id: "mitigacao",
      eyebrow: "Engenharia de aplicação",
      title: "Reduzir alucinação exige desenho de sistema, não só um prompt mais bonito",
      lead:
        "Boas aplicações combinam instrução clara, contexto recuperado, política de resposta e avaliação contínua.",
      visual: "comparison",
      interactive: "response-policy-scenarios",
      paragraphs: [
        "Uma primeira camada de mitigação é o próprio pedido: delimitar escopo, pedir resposta curta, exigir apoio em contexto fornecido e autorizar o modelo a dizer quando não tem base suficiente. Isso já evita muitos desvios bobos.",
        "A segunda camada é estrutural: trazer documentos relevantes, usar recuperação externa, citar trechos, validar entidades importantes e, em tarefas sensíveis, encaminhar a saída para revisão humana ou checagem automatizada adicional.",
        "A terceira camada é avaliação. Se você não mede onde o sistema inventa, confunde ou extrapola, acaba melhorando sensação de fluidez em vez de confiabilidade real. A mitigação só amadurece quando vira parte do ciclo de produto.",
      ],
      blocks: [
        {
          type: "example",
          title: "Boa política de resposta",
          body:
            "'Responda apenas com base nos documentos fornecidos. Se a evidência estiver incompleta, diga o que falta em vez de preencher a lacuna.'",
        },
        {
          type: "mistake",
          title: "Erro comum",
          body:
            "Acreditar que temperatura zero elimina alucinação. Ela pode reduzir variação, mas não transforma falta de evidência em conhecimento correto.",
        },
      ],
    },
    {
      id: "limites",
      eyebrow: "Realismo",
      title: "Não existe solução mágica nem garantia absoluta",
      lead:
        "Mesmo com retrieval, prompt melhor e validação, o problema muda de forma em vez de simplesmente desaparecer.",
      visual: "tradeoff",
      paragraphs: [
        "Recuperação externa pode trazer documento irrelevante. O modelo pode interpretar mal uma fonte correta. O ranking pode perder o melhor trecho. A instrução pode ser boa, mas insuficiente para o caso específico. Em aplicações reais, confiabilidade é uma propriedade do sistema completo.",
        "Também existe um trade-off importante: respostas muito livres tendem a ser mais úteis em tarefas abertas, mas aumentam risco. Respostas muito restritas podem reduzir invenção, porém ficam mais evasivas e às vezes deixam de ajudar quando poderiam. O ponto certo depende do custo do erro.",
        "Esse realismo é saudável. Em vez de prometer 'zero alucinação', equipes maduras constroem barreiras, medem falhas e decidem onde a automação pode operar sozinha e onde precisa de supervisão.",
      ],
      blocks: [
        {
          type: "insight",
          title: "Confiabilidade é um gradiente",
          body:
            "A pergunta mais útil raramente é 'o modelo alucina?'. A melhor pergunta é 'em quais condições, com qual custo e com quais salvaguardas?'.",
        },
      ],
    },
    {
      id: "alto-risco",
      eyebrow: "Aplicações críticas",
      title: "Quanto maior o impacto do erro, maior deve ser a exigência de evidência",
      lead:
        "Direito, saúde, finanças e educação formal não podem tratar resposta bem escrita como prova de correção.",
      visual: "checklist",
      paragraphs: [
        "Em domínios críticos, a saída do LLM precisa ser acompanhada de fontes, limites declarados e mecanismos de revisão. Uma resposta parcialmente errada pode induzir decisão ruim mesmo quando 90% do texto parece bom.",
        "Nesses contextos, é comum desenhar o sistema para preferir cobertura menor com mais verificabilidade, em vez de deixar o modelo improvisar sobre todo tipo de tema. A experiência do usuário pode parecer menos mágica, mas costuma ser mais responsável.",
        "O grande aprendizado é este: alucinação não é apenas um bug de modelo, mas um risco operacional. Tratá-la como risco muda a maneira de projetar produto, UX, logging, observabilidade e políticas de fallback.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Fallback",
          body:
            "Comportamento alternativo do sistema quando a confiança ou a evidência são insuficientes, como pedir clarificação, recusar, encaminhar ou usar outra ferramenta.",
        },
      ],
    },
    {
      id: "resumo",
      eyebrow: "Síntese",
      title: "Resumo visual das alucinações",
      lead:
        "O problema nasce do encontro entre geração plausível, evidência incompleta e políticas de resposta inadequadas para a tarefa.",
      interactive: "summary-cards",
      paragraphs: [
        "Use este resumo para fixar a diferença entre escrever bem, estar fundamentado e ser confiável em contexto real.",
      ],
    },
    {
      id: "quiz-revisao",
      eyebrow: "Revisão",
      title: "Quiz de revisão",
      lead:
        "Verifique se você conectou plausibilidade, grounding, mitigação e limites do problema.",
      interactive: "quiz",
      paragraphs: [
        "A meta do quiz é treinar diagnóstico, não decorar slogans sobre LLMs.",
      ],
    },
    {
      id: "glossario",
      eyebrow: "Vocabulário",
      title: "Glossário essencial",
      lead:
        "Feche a aula consolidando os termos mais usados quando falamos de confiabilidade em geração.",
      interactive: "glossary",
      paragraphs: [
        "Esses conceitos aparecem em papers, documentação técnica e discussões de produto sobre LLMs.",
      ],
    },
  ],
  summaryCards: [
    {
      title: "Plausibilidade e verdade não coincidem automaticamente",
      body:
        "LLMs podem soar corretos porque dominam padrões linguísticos, não porque validaram fatos no mundo em tempo real.",
    },
    {
      title: "Grounding reduz improviso",
      body:
        "Trazer documentos, contexto explícito e fontes verificáveis ajuda o modelo a responder com menos invenção.",
    },
    {
      title: "Permitir abstenção melhora confiabilidade",
      body:
        "Um sistema que pode pedir mais contexto ou admitir limite tende a inventar menos do que um sistema obrigado a responder sempre.",
    },
    {
      title: "Mitigação é arquitetura",
      body:
        "Prompt claro é só uma parte; retrieval, validação, logging e avaliação também são essenciais.",
    },
    {
      title: "Aplicações críticas exigem mais que fluidez",
      body:
        "Em contextos sensíveis, a prioridade deve ser evidência, revisão e políticas de fallback.",
    },
  ],
  quiz: [
    {
      id: "q1",
      prompt: "O que melhor descreve uma alucinação em IA?",
      options: [
        { id: "a", label: "Uma saída plausível, mas falsa ou sem apoio suficiente no contexto/evidência." },
        { id: "b", label: "Qualquer resposta longa demais." },
        { id: "c", label: "Apenas quando o modelo usa palavras incomuns." },
      ],
      correctOptionId: "a",
      feedback:
        "A ideia central é a falta de sustentação confiável, não o tamanho da resposta nem o vocabulário usado.",
    },
    {
      id: "q2",
      prompt: "Por que um LLM pode soar confiante mesmo estando errado?",
      options: [
        { id: "a", label: "Porque aprendeu padrões de linguagem e estilo, e não valida fatos automaticamente a cada resposta." },
        { id: "b", label: "Porque sempre consulta um banco de dados oculto e distorce o resultado." },
        { id: "c", label: "Porque temperatura baixa força erros factuais." },
      ],
      correctOptionId: "a",
      feedback:
        "O tom de confiança pode vir da forma linguística. Isso não garante grounding factual.",
    },
    {
      id: "q3",
      prompt: "O que significa grounding?",
      options: [
        { id: "a", label: "Apoiar a resposta em evidência, contexto ou fonte externa verificável." },
        { id: "b", label: "Aumentar a criatividade do modelo com temperatura alta." },
        { id: "c", label: "Treinar o modelo do zero em um novo idioma." },
      ],
      correctOptionId: "a",
      feedback:
        "Grounding é ancorar a resposta em material verificável, reduzindo o espaço para improviso sem base.",
    },
    {
      id: "q4",
      prompt: "Qual situação tende a aumentar o risco de alucinação?",
      options: [
        { id: "a", label: "Prompt ambíguo, pouco contexto e sistema que desencoraja dizer 'não sei'." },
        { id: "b", label: "Escopo delimitado e exigência de citar a fonte usada." },
        { id: "c", label: "Uso de documentos relevantes junto com possibilidade de pedir clarificação." },
      ],
      correctOptionId: "a",
      feedback:
        "Ambiguidade e pressão por completude são gatilhos clássicos para respostas inventadas.",
    },
    {
      id: "q5",
      prompt: "Qual afirmação sobre temperatura está correta?",
      options: [
        { id: "a", label: "Temperatura menor pode reduzir variação, mas não cria fatos corretos do nada." },
        { id: "b", label: "Temperatura zero elimina completamente alucinações." },
        { id: "c", label: "Temperatura só afeta tradução, não chatbots." },
      ],
      correctOptionId: "a",
      feedback:
        "Sampling influencia estilo probabilístico da resposta, não substitui evidência ausente.",
    },
    {
      id: "q6",
      prompt: "Qual é uma boa mitigação para tarefas factuais?",
      options: [
        { id: "a", label: "Permitir abstenção e exigir resposta baseada em documentos fornecidos." },
        { id: "b", label: "Proibir qualquer menção a fontes para deixar o texto mais natural." },
        { id: "c", label: "Pedir sempre respostas mais longas para aumentar a confiança." },
      ],
      correctOptionId: "a",
      feedback:
        "Quando a tarefa é factual, política de evidência e permissão para reconhecer limites costumam ajudar muito.",
    },
    {
      id: "q7",
      prompt: "Por que aplicações críticas precisam de salvaguardas extras?",
      options: [
        { id: "a", label: "Porque um texto persuasivo parcialmente errado pode induzir decisões ruins." },
        { id: "b", label: "Porque LLMs são incapazes de gerar qualquer texto útil nesses domínios." },
        { id: "c", label: "Porque grounding torna revisão humana desnecessária." },
      ],
      correctOptionId: "a",
      feedback:
        "O problema é o custo do erro: mesmo uma resposta boa em aparência pode ser perigosa se estiver mal fundamentada.",
    },
    {
      id: "q8",
      prompt: "Qual visão é mais realista sobre o problema?",
      options: [
        { id: "a", label: "Alucinação é um risco que deve ser gerenciado por arquitetura, política e avaliação contínua." },
        { id: "b", label: "Existe um único prompt universal que resolve o problema para toda aplicação." },
        { id: "c", label: "Basta usar um modelo maior e o tema desaparece completamente." },
      ],
      correctOptionId: "a",
      feedback:
        "Equipes maduras tratam alucinação como risco operacional, não como detalhe cosmético de prompt.",
    },
  ],
  glossary: [
    { term: "Alucinação", definition: "Saída falsa, inventada ou sem suporte suficiente no contexto ou em evidência externa." },
    { term: "Plausibilidade", definition: "Qualidade de algo soar coerente ou provável, mesmo sem ser verdadeiro." },
    { term: "Factualidade", definition: "Grau em que uma resposta corresponde a fatos corretos sobre o mundo." },
    { term: "Fidelidade", definition: "Grau em que a resposta permanece fiel ao material-fonte fornecido." },
    { term: "Grounding", definition: "Ancoragem da resposta em documentos, dados ou contexto verificável." },
    { term: "Memória paramétrica", definition: "Conhecimento internalizado nos pesos do modelo durante o treinamento." },
    { term: "Abstenção", definition: "Escolha do sistema de sinalizar limite ou pedir mais contexto em vez de inventar." },
    { term: "RAG", definition: "Abordagem que combina geração com recuperação de documentos externos relevantes." },
    { term: "Prompt", definition: "Instrução e contexto fornecidos ao modelo para orientar a resposta." },
    { term: "Verificação", definition: "Processo de checar se uma resposta bate com evidências ou fontes confiáveis." },
    { term: "Fallback", definition: "Comportamento alternativo usado quando o sistema não deveria responder diretamente." },
    { term: "Avaliação", definition: "Conjunto de testes usados para medir qualidade, erro e confiabilidade do sistema." },
  ],
};
