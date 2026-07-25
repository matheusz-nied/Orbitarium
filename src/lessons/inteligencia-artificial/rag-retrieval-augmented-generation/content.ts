import type { LessonContent } from "../../../types/content";

export const ragRetrievalAugmentedGenerationContent: LessonContent = {
  id: "rag-retrieval-augmented-generation",
  title: "RAG: Retrieval-Augmented Generation",
  subtitle:
    "Como combinar recuperação de documentos com geração para responder melhor, citar melhor e depender menos de memória paramétrica pura.",
  description:
    "Uma aula intermediária sobre arquitetura de RAG, indexação, retrieval, top-k, construção de contexto, grounded answering, falhas comuns e limites do método.",
  primaryCategoryId: "inteligencia-artificial",
  secondaryCategoryId: "computacao",
  level: "Intermediário",
  estimatedTime: "40-55 min",
  tags: [
    "RAG",
    "Retrieval",
    "Grounding",
    "LLM",
    "DPR",
    "Contexto",
  ],
  learningObjectives: [
    "Entender por que RAG surgiu como resposta a limites de memória paramétrica pura em tarefas intensivas em conhecimento.",
    "Descrever a arquitetura básica de ingestão, indexação, retrieval, augment e geração.",
    "Distinguir retriever, reranker, top-k e contexto final entregue ao modelo.",
    "Relacionar qualidade de chunks e ranking com qualidade da resposta gerada.",
    "Reconhecer falhas comuns de RAG, como retrieval irrelevante, chunks pobres e excesso de contexto ruidoso.",
    "Entender quando RAG ajuda muito e quando o gargalo está em outra parte do sistema.",
    "Ligar RAG a redução de alucinações e rastreabilidade, sem tratá-lo como solução mágica.",
  ],
  prerequisites: [
    "Noção básica de LLMs e do problema de alucinação ou falta de grounding.",
    "Entender que o modelo pode receber contexto adicional no prompt.",
    "Curiosidade sobre busca semântica e sistemas de conhecimento.",
  ],
  references: [
    {
      title: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks",
      source: "Lewis et al., 2020 — arXiv",
      url: "https://arxiv.org/abs/2005.11401",
      note:
        "Trabalho seminal que formaliza RAG combinando memória paramétrica e memória não paramétrica.",
    },
    {
      title: "Dense Passage Retrieval for Open-Domain Question Answering",
      source: "Karpukhin et al., 2020 — arXiv",
      url: "https://arxiv.org/abs/2004.04906",
      note:
        "Referência-chave sobre retrievers densos para QA aberta.",
    },
    {
      title: "RAG",
      source: "Hugging Face Transformers — documentação oficial",
      url: "https://huggingface.co/docs/transformers/en/model_doc/rag",
      note:
        "Mostra a decomposição prática entre retriever e generator em implementações RAG.",
    },
    {
      title: "Retrieval",
      source: "LangChain — documentação",
      url: "https://docs.langchain.com/oss/python/langchain/retrieval",
      note:
        "Documentação útil para visualizar o pipeline modular de documentos, splitters, embeddings, vector store e retriever.",
    },
    {
      title: "Lost in the Middle: How Language Models Use Long Contexts",
      source: "Liu et al., 2024 — arXiv",
      url: "https://arxiv.org/abs/2307.03172",
      note:
        "Importante para entender por que só aumentar contexto nem sempre resolve uso efetivo da informação recuperada.",
    },
    {
      title: "Retrieval-Augmented Generation for Large Language Models: A Survey",
      source: "Gao et al., 2024 — arXiv",
      url: "https://arxiv.org/abs/2312.10997",
      note:
        "Survey moderno sobre variantes, componentes e desafios do ecossistema RAG.",
    },
  ],
  heroVisual: "hero",
  openingText:
    "RAG nasce de uma observação simples: muitas perguntas exigem acesso a informação que não deveria ficar congelada apenas nos pesos do modelo. Em vez de pedir ao LLM que responda só com memória paramétrica, recuperamos trechos relevantes de uma base externa e os colocamos no contexto da geração. O modelo continua gerando texto, mas agora com apoio documental mais explícito. Isso melhora atualizabilidade, rastreabilidade e, em muitos casos, factualidade — desde que a recuperação e a montagem do contexto sejam boas.",
  quickFacts: [
    {
      title: "RAG une duas memórias",
      body:
        "A paramétrica vive nos pesos do modelo; a não paramétrica vive em documentos e índices que podem ser atualizados sem retreinar o LLM inteiro.",
    },
    {
      title: "Retrieval ruim contamina geração",
      body:
        "Se o documento recuperado é irrelevante ou mal segmentado, a resposta final tende a herdar esse problema.",
    },
    {
      title: "Mais contexto não é automaticamente melhor",
      body:
        "Contexto excessivo ou mal ranqueado pode distrair o modelo e esconder a evidência realmente útil.",
    },
  ],
  sections: [
    {
      id: "motivacao",
      eyebrow: "Problema",
      title: "Por que RAG existe?",
      lead:
        "Porque depender só dos pesos do modelo é ruim quando a tarefa exige atualização, fonte explícita ou conhecimento muito específico.",
      visual: "hero",
      paragraphs: [
        "Um LLM aprende regularidades do mundo durante o treino, mas esse conhecimento fica distribuído nos parâmetros e não é facilmente auditável nem atualizado exemplo por exemplo. Em muitas aplicações, isso é insuficiente: queremos saber de onde veio a resposta, inserir documentos privados ou usar conteúdo que muda com frequência.",
        "RAG responde a isso acoplando recuperação externa à geração. Em vez de esperar que o modelo 'lembre' tudo, buscamos trechos relevantes numa base e os injetamos no contexto. A resposta deixa de depender exclusivamente do que foi memorizado em treino passado.",
        "Esse desenho não transforma o modelo em oráculo, mas muda a natureza da tarefa: ele passa a responder com base em uma combinação entre memória paramétrica e evidência trazida naquele momento.",
      ],
      blocks: [
        {
          type: "definition",
          title: "RAG",
          body:
            "Abordagem em que um sistema recupera documentos relevantes de uma base externa e os usa como contexto para a geração de resposta por um modelo de linguagem.",
        },
      ],
    },
    {
      id: "arquitetura",
      eyebrow: "Arquitetura",
      title: "O pipeline de RAG separa ingestão, recuperação e geração",
      lead:
        "Pensar em camadas ajuda a entender onde o sistema pode falhar e onde ele pode ser melhorado.",
      visual: "pipeline",
      paragraphs: [
        "Primeiro vem a ingestão: coletar documentos, limpar conteúdo, segmentar em chunks e indexar. Depois vem a recuperação: transformar a consulta em representação de busca, encontrar candidatos e, se necessário, reranquear. Por fim vem a geração: montar o contexto final e pedir ao LLM que responda com base nesse material.",
        "Essa decomposição é importante porque RAG não é 'uma coisa só'. Um problema pode estar na limpeza de dados, no chunking, no retriever, no top-k, no reranking ou na política usada para sintetizar a resposta final. Melhorar o sistema exige saber em qual estágio ocorreu a perda de qualidade.",
        "A boa notícia é que essa modularidade permite evolução incremental. Você pode trocar embedding, indexador, estratégia de ranking ou formato de prompt sem reconstruir todo o sistema do zero.",
      ],
      blocks: [
        {
          type: "insight",
          title: "RAG é pipeline, não plugin mágico",
          body:
            "Quando alguém diz que 'RAG não funciona', muitas vezes o problema real está em um componente específico do pipeline, não no conceito inteiro.",
        },
      ],
    },
    {
      id: "indexacao",
      eyebrow: "Base de conhecimento",
      title: "Antes de responder, o sistema precisa transformar documentos em unidades recuperáveis",
      lead:
        "Documento bruto raramente é a melhor unidade de recuperação para um LLM.",
      visual: "concept",
      paragraphs: [
        "Na prática, a base costuma ser segmentada em pedaços menores, chamados chunks. Cada chunk recebe metadados e uma representação para busca, frequentemente embeddings densos. Isso torna possível recuperar partes específicas sem colocar documentos inteiros no contexto.",
        "Essa etapa já decide muito da qualidade futura. Se os chunks forem grandes demais, diluem a informação relevante. Se forem pequenos demais, perdem coerência. Se o documento for mal normalizado, o sistema recupera trechos com ruído ou contexto insuficiente.",
        "RAG bom começa antes da pergunta do usuário. Ele começa na forma como o conhecimento foi preparado para ser encontrado depois.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Chunk",
          body:
            "Trecho segmentado de um documento, projetado para ser recuperado individualmente durante a busca e reutilizado como contexto de geração.",
        },
      ],
    },
    {
      id: "topk",
      eyebrow: "Retrieval",
      title: "Top-k e qualidade do ranking determinam o que chega ao modelo",
      lead:
        "O LLM só pode usar bem o que de fato entrou no contexto final.",
      visual: "comparison",
      interactive: "topk-context-lab",
      paragraphs: [
        "Em retrieval, não basta existir um trecho correto na base. Ele precisa aparecer entre os candidatos recuperados e, idealmente, em posição forte o bastante para ser incluído no contexto final. Esse caminho passa por query encoding, busca no índice, similaridade e, às vezes, reranking.",
        "Escolher top-k é delicado. Muito pequeno e você pode perder cobertura. Muito grande e começa a inserir ruído, competição entre trechos e custo de contexto. O modelo então recebe mais palavras, mas não necessariamente mais evidência útil.",
        "A interação mostra justamente esse balanço entre cobertura e distração. Em RAG, recall sem disciplina de contexto pode não virar resposta melhor.",
      ],
      blocks: [
        {
          type: "mistake",
          title: "Erro comum",
          body:
            "Achar que aumentar top-k sempre melhora. Muitas vezes ele só injeta contexto irrelevante e dificulta o uso da evidência certa.",
        },
      ],
    },
    {
      id: "resposta-grounded",
      eyebrow: "Geração",
      title: "A resposta precisa sintetizar evidência, não apenas colar trechos",
      lead:
        "Depois da recuperação, ainda existe um problema genuíno de leitura, integração e redação.",
      interactive: "retrieval-coverage-lab",
      paragraphs: [
        "Um bom sistema RAG não devolve simplesmente o primeiro chunk recuperado. Ele pede ao modelo que leia os trechos, conecte o que é relevante, explique de forma útil e, quando apropriado, indique o suporte documental usado.",
        "Isso exige política clara de geração: responder apenas com base nas fontes? citar? resumir? declarar conflito entre documentos? admitir insuficiência de evidência? Sem essa camada, retrieval bom pode ser desperdiçado por uma síntese frouxa.",
        "A interação desta seção mostra que cobertura de retrieval, coerência dos chunks e disciplina de resposta trabalham juntas. Se qualquer uma falha, o grounding se enfraquece.",
      ],
      blocks: [
        {
          type: "example",
          title: "Boa instrução de resposta",
          body:
            "'Use apenas os trechos fornecidos. Se houver conflito ou lacuna, explicite isso antes de concluir.'",
        },
      ],
    },
    {
      id: "falhas",
      eyebrow: "Diagnóstico",
      title: "As falhas de RAG costumam ser silenciosas",
      lead:
        "O sistema pode parecer sofisticado e ainda assim errar porque o trecho certo não entrou, entrou ruim ou foi mal usado.",
      visual: "tradeoff",
      interactive: "rag-design-scenarios",
      paragraphs: [
        "Um retriever pode trazer documento semanticamente próximo, mas não o mais útil. Um chunk pode conter o tema, mas não a resposta específica. Um reranker pode falhar em priorizar o trecho decisivo. E mesmo com boa recuperação, o LLM pode ignorar a evidência central quando o contexto é longo demais ou mal ordenado.",
        "Outra falha comum é confiar que o sistema recuperou 'alguma coisa', sem medir se recuperou a coisa certa. RAG exige avaliação do retrieval e da resposta final. Caso contrário, a equipe só observa a camada de geração e não percebe onde o pipeline começou a desviar.",
        "É por isso que sistemas maduros registram consultas, chunks recuperados, ordenação final, prompt montado e resposta gerada. Sem observabilidade, o debugging fica cego.",
      ],
      blocks: [
        {
          type: "insight",
          title: "RAG erra em cadeia",
          body:
            "Pequenas perdas em indexação, ranking e síntese podem se acumular e aparecer só no último estágio como uma resposta fraca ou mal fundamentada.",
        },
      ],
    },
    {
      id: "quando-ajuda",
      eyebrow: "Escopo de uso",
      title: "RAG ajuda mais quando o gargalo é acesso a conhecimento, não raciocínio puro",
      lead:
        "Ele é excelente para trazer evidência; não é solução universal para toda limitação de modelo.",
      visual: "checklist",
      paragraphs: [
        "RAG costuma ajudar muito em QA sobre documentação, políticas internas, bases regulatórias, manuais, catálogos e conteúdo que muda com frequência. Nesses casos, a vantagem vem de colocar no contexto aquilo que o modelo não deveria depender de memória estática para responder.",
        "Por outro lado, se o problema principal é decomposição lógica complexa, execução de cálculo preciso ou decisão operacional com ferramenta, retrieval sozinho pode não resolver. Talvez seja necessário combinar RAG com tool use, verificação ou workflows multi-etapa.",
        "A lição é simples: RAG melhora acesso à evidência. Se o gargalo não é esse, o ganho será parcial ou decepcionante.",
      ],
      blocks: [
        {
          type: "mistake",
          title: "Erro comum",
          body:
            "Usar RAG como resposta automática para qualquer problema com LLM, mesmo quando a tarefa pede outra capacidade além de recuperação documental.",
        },
      ],
    },
    {
      id: "resumo",
      eyebrow: "Síntese",
      title: "Resumo visual de RAG",
      lead:
        "RAG funciona quando a base está bem preparada, o retrieval encontra o trecho certo e a geração respeita a evidência recuperada.",
      interactive: "summary-cards",
      paragraphs: [
        "Guarde a cadeia causal: base boa -> ranking bom -> contexto útil -> resposta grounded.",
      ],
    },
    {
      id: "quiz",
      eyebrow: "Revisão",
      title: "Quiz de revisão",
      lead:
        "Teste se os papéis de indexação, retrieval, top-k e síntese grounded ficaram claros.",
      interactive: "quiz",
      paragraphs: [
        "As perguntas abaixo ajudam a separar o conceito de RAG de simplificações excessivas.",
      ],
    },
    {
      id: "glossario",
      eyebrow: "Vocabulário",
      title: "Glossário essencial",
      lead:
        "Feche a aula consolidando os termos mais frequentes em pipelines de recuperação e geração.",
      interactive: "glossary",
      paragraphs: [
        "Eles aparecem tanto em papers quanto em stacks de produção.",
      ],
    },
  ],
  summaryCards: [
    {
      title: "RAG combina duas memórias",
      body:
        "O modelo continua usando seus pesos, mas passa a receber evidência externa relevante no contexto de resposta.",
    },
    {
      title: "Qualidade da base importa desde a ingestão",
      body:
        "Chunking, limpeza e metadados determinam se a informação certa será recuperável depois.",
    },
    {
      title: "Top-k é trade-off",
      body:
        "Poucos candidatos reduzem cobertura; candidatos demais aumentam ruído e distração no contexto.",
    },
    {
      title: "Retrieval bom ainda precisa de síntese disciplinada",
      body:
        "O LLM deve responder com base na evidência recuperada, e não apenas usá-la como pano de fundo frouxo.",
    },
    {
      title: "RAG não substitui toda a arquitetura",
      body:
        "Quando o gargalo é cálculo, ação externa ou verificação formal, outras camadas continuam necessárias.",
    },
  ],
  quiz: [
    {
      id: "q1",
      prompt: "Qual problema RAG busca atacar de forma mais direta?",
      options: [
        { id: "a", label: "Dependência excessiva de memória paramétrica pura em tarefas que exigem evidência externa." },
        { id: "b", label: "Velocidade de backpropagation durante o treino." },
        { id: "c", label: "Compressão de imagens em redes neurais convolucionais." },
      ],
      correctOptionId: "a",
      feedback:
        "RAG foi concebido para aproximar geração e recuperação de conhecimento externo relevante.",
    },
    {
      id: "q2",
      prompt: "O que acontece na ingestão de um sistema RAG?",
      options: [
        { id: "a", label: "Documentos são preparados, segmentados e indexados para futura recuperação." },
        { id: "b", label: "O modelo é retreinado do zero a cada pergunta do usuário." },
        { id: "c", label: "Os logits do modelo são substituídos por embeddings fixos." },
      ],
      correctOptionId: "a",
      feedback:
        "Ingestão trata da base de conhecimento e de como ela será consultada depois.",
    },
    {
      id: "q3",
      prompt: "Por que o tamanho e a qualidade dos chunks importam?",
      options: [
        { id: "a", label: "Porque eles influenciam se a informação relevante será recuperada com coerência suficiente." },
        { id: "b", label: "Porque chunk menor sempre elimina qualquer erro factual." },
        { id: "c", label: "Porque o LLM só consegue ler exatamente um parágrafo." },
      ],
      correctOptionId: "a",
      feedback:
        "Chunking afeta diretamente recuperabilidade, contexto útil e fidelidade ao documento.",
    },
    {
      id: "q4",
      prompt: "Qual é um risco clássico de aumentar top-k sem critério?",
      options: [
        { id: "a", label: "Inserir contexto demais e esconder a evidência realmente útil em meio a ruído." },
        { id: "b", label: "Fazer o embedding desaparecer do índice." },
        { id: "c", label: "Transformar toda busca em algoritmo supervisionado." },
      ],
      correctOptionId: "a",
      feedback:
        "Mais candidatos podem aumentar recall, mas também distração e custo de contexto.",
    },
    {
      id: "q5",
      prompt: "Qual afirmação sobre retrieval está correta?",
      options: [
        { id: "a", label: "Não basta o trecho correto existir na base; ele precisa entrar no contexto final usado pela geração." },
        { id: "b", label: "Se o documento estiver na base, a resposta correta é garantida automaticamente." },
        { id: "c", label: "Retrieval é irrelevante quando o modelo é grande o bastante." },
      ],
      correctOptionId: "a",
      feedback:
        "A existência do conhecimento na base não garante uso efetivo pelo pipeline.",
    },
    {
      id: "q6",
      prompt: "O que a geração grounded deve fazer?",
      options: [
        { id: "a", label: "Sintetizar a evidência recuperada de forma útil e disciplinada, em vez de improvisar além do suporte disponível." },
        { id: "b", label: "Ignorar os trechos recuperados para soar mais natural." },
        { id: "c", label: "Copiar todos os chunks integralmente para a resposta." },
      ],
      correctOptionId: "a",
      feedback:
        "RAG forte depende de uma política de resposta que use de fato os documentos recuperados.",
    },
    {
      id: "q7",
      prompt: "Quando RAG tende a ajudar bastante?",
      options: [
        { id: "a", label: "Quando a tarefa exige acesso a documentação, políticas ou conteúdo específico e atualizável." },
        { id: "b", label: "Quando o único problema é executar multiplicações exatas sem qualquer dado externo." },
        { id: "c", label: "Quando queremos substituir toda ferramenta operacional por um único prompt." },
      ],
      correctOptionId: "a",
      feedback:
        "RAG brilha quando o gargalo principal é acesso a evidência externa relevante.",
    },
    {
      id: "q8",
      prompt: "Qual visão sobre RAG é mais realista?",
      options: [
        { id: "a", label: "É uma arquitetura poderosa, mas sensível a chunking, ranking, prompt de síntese e observabilidade do pipeline." },
        { id: "b", label: "É solução automática que elimina qualquer alucinação em qualquer domínio." },
        { id: "c", label: "Serve apenas para pesquisa acadêmica, não para produto." },
      ],
      correctOptionId: "a",
      feedback:
        "RAG melhora muito alguns cenários, mas continua exigindo engenharia cuidadosa de sistema.",
    },
  ],
  glossary: [
    { term: "RAG", definition: "Arquitetura que combina recuperação externa de documentos com geração por modelo de linguagem." },
    { term: "Retriever", definition: "Componente que busca candidatos relevantes na base a partir da consulta." },
    { term: "Reranker", definition: "Componente que reordena candidatos recuperados para priorizar os mais úteis." },
    { term: "Chunk", definition: "Trecho segmentado de documento usado como unidade de recuperação." },
    { term: "Top-k", definition: "Quantidade de candidatos recuperados e considerados em uma etapa de busca." },
    { term: "Grounding", definition: "Ancoragem da resposta em evidência externa verificável." },
    { term: "Memória paramétrica", definition: "Conhecimento armazenado nos pesos do modelo durante o treino." },
    { term: "Memória não paramétrica", definition: "Conhecimento armazenado externamente em documentos, índices e bases consultáveis." },
    { term: "Embedding", definition: "Representação vetorial usada para capturar semelhança semântica entre consulta e documento." },
    { term: "Recall de retrieval", definition: "Capacidade do sistema de trazer entre os candidatos o trecho realmente relevante." },
    { term: "Observabilidade", definition: "Capacidade de inspecionar consultas, chunks, ranking e saídas para diagnosticar falhas do pipeline." },
    { term: "Context window", definition: "Quantidade de contexto que o modelo consegue receber e usar durante a geração." },
  ],
};
