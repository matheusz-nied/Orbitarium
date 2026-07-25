import type { LessonContent } from "../../../types/content";

export const chunkingRankingBasesVetoriaisContent: LessonContent = {
  id: "chunking-ranking-bases-vetoriais",
  title: "Chunking, Ranking e Bases Vetoriais",
  subtitle:
    "Como preparar documentos para busca semântica útil, ranquear melhor candidatos e armazenar embeddings sem confundir índice com compreensão.",
  description:
    "Uma aula intermediária sobre segmentação de documentos, sparse vs dense retrieval, híbridos, embeddings, ANN, vector stores e impacto dessas escolhas em sistemas de busca e RAG.",
  primaryCategoryId: "inteligencia-artificial",
  secondaryCategoryId: "computacao",
  level: "Intermediário",
  estimatedTime: "45-55 min",
  tags: [
    "Chunking",
    "Ranking",
    "Vector Store",
    "Embeddings",
    "FAISS",
    "BM25",
  ],
  learningObjectives: [
    "Entender por que documentos inteiros raramente são a melhor unidade de recuperação para LLMs.",
    "Explicar como chunk size, overlap e estrutura do texto afetam recuperabilidade e coerência.",
    "Distinguir ranking lexical, denso e híbrido em termos de força e limitação.",
    "Compreender o papel de embeddings e bases vetoriais na busca semântica.",
    "Reconhecer o trade-off entre latência, memória e recall em índices aproximados.",
    "Conectar essas decisões a qualidade de RAG e grounded answering.",
    "Evitar erros comuns, como imaginar que vetor sem bom chunking resolve tudo sozinho.",
  ],
  prerequisites: [
    "Noção básica de embeddings ou de busca por similaridade ajuda, mas a aula recapitula a intuição principal.",
    "Familiaridade inicial com RAG ou recuperação de documentos é útil.",
    "Curiosidade sobre como texto vira algo pesquisável por máquina.",
  ],
  references: [
    {
      title: "Introduction to Information Retrieval",
      source: "Manning, Raghavan e Schütze — Stanford / Cambridge University Press",
      url: "https://nlp.stanford.edu/IR-book/",
      note:
        "Base clássica para ranking, BM25 e princípios de recuperação de informação.",
    },
    {
      title: "Okapi BM25: a non-binary model",
      source: "Introduction to Information Retrieval — Capítulo 11",
      url: "https://nlp.stanford.edu/IR-book/html/htmledition/okapi-bm25-a-non-binary-model-1.html",
      note:
        "Explica a intuição do BM25 como modelo probabilístico com frequência de termo e normalização por comprimento.",
    },
    {
      title: "Dense Passage Retrieval for Open-Domain Question Answering",
      source: "Karpukhin et al., 2020 — arXiv",
      url: "https://arxiv.org/abs/2004.04906",
      note:
        "Referência fundamental para retrievers densos baseados em embeddings.",
    },
    {
      title: "Sentence-BERT: Sentence Embeddings using Siamese BERT-Networks",
      source: "Reimers e Gurevych, 2019 — arXiv",
      url: "https://arxiv.org/abs/1908.10084",
      note:
        "Mostra por que embeddings especializados ajudam na similaridade semântica entre sentenças e passagens.",
    },
    {
      title: "The Faiss library",
      source: "Douze et al., 2024 — arXiv",
      url: "https://arxiv.org/abs/2401.08281",
      note:
        "Referência moderna sobre trade-offs de índices vetoriais e similaridade em escala.",
    },
    {
      title: "Splitting recursively - Text splitter integration guide",
      source: "LangChain — documentação",
      url: "https://docs.langchain.com/oss/python/integrations/splitters/recursive_text_splitter",
      note:
        "Guia prático sobre chunking com preservação de estrutura textual e overlap.",
    },
    {
      title: "Lost in the Middle: How Language Models Use Long Contexts",
      source: "Liu et al., 2024 — arXiv",
      url: "https://arxiv.org/abs/2307.03172",
      note:
        "Mostra que contexto longo sem boa priorização não garante uso efetivo da informação.",
    },
  ],
  heroVisual: "hero",
  openingText:
    "Quando dizemos que um sistema faz busca semântica, parece que ele 'entende' documentos inteiros e acha exatamente o que importa. Na prática, isso depende de várias decisões ocultas: como o texto foi quebrado, o que vira unidade de índice, como a consulta é comparada com os candidatos, quais documentos sobem no ranking e que tipo de índice vetorial torna essa busca viável em escala. Se essas camadas forem mal desenhadas, nem o melhor LLM do mundo verá a evidência certa na hora certa.",
  quickFacts: [
    {
      title: "Chunk ruim vira recuperação ruim",
      body:
        "Se a unidade indexed mistura assuntos demais ou quebra uma ideia no meio, a busca devolve trechos piores mesmo com bons embeddings.",
    },
    {
      title: "Ranking lexical e denso não são a mesma coisa",
      body:
        "Um favorece correspondência textual explícita; o outro tenta capturar proximidade semântica. Muitos sistemas usam os dois.",
    },
    {
      title: "Base vetorial não é mágica",
      body:
        "Ela armazena e busca vetores com eficiência, mas a qualidade da representação e da segmentação continua decisiva.",
    },
  ],
  sections: [
    {
      id: "por-que-chunking",
      eyebrow: "Motivação",
      title: "Documentos inteiros são grossos demais para busca precisa",
      lead:
        "Na maioria dos casos, a pergunta do usuário precisa de um trecho, não de um PDF inteiro como unidade de recuperação.",
      visual: "hero",
      paragraphs: [
        "Se indexamos documentos inteiros, uma consulta específica pode acabar competindo com centenas de parágrafos irrelevantes dentro do mesmo arquivo. O sistema sabe que o documento trata do tema, mas não sabe isolar a evidência exata com granularidade suficiente.",
        "Chunking surge para resolver isso: quebramos o conteúdo em unidades menores, mais recuperáveis e mais adequadas à janela de contexto dos modelos. O objetivo não é apenas caber no limite de tokens, mas criar blocos semanticamente úteis.",
        "Em outras palavras, chunking é uma decisão de representação do conhecimento. Ele determina o tipo de pedaço de realidade textual que o sistema conseguirá reencontrar depois.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Chunking",
          body:
            "Processo de segmentar documentos em unidades menores e recuperáveis, preservando o máximo possível de coerência semântica útil para a busca.",
        },
      ],
    },
    {
      id: "tamanho-overlap",
      eyebrow: "Design de chunks",
      title: "Chunk size e overlap são um equilíbrio entre foco e continuidade",
      lead:
        "Trecho pequeno demais perde contexto; trecho grande demais perde precisão de busca.",
      visual: "concept",
      interactive: "chunking-lab",
      paragraphs: [
        "Chunk size define quanto texto cabe em cada unidade. Overlap define quanto um chunk reaproveita do anterior. Juntos, eles tentam reduzir a chance de quebrar uma ideia importante exatamente na fronteira entre dois segmentos.",
        "Não existe valor universal ótimo. Texto jurídico, documentação de API, artigo científico e conversa de suporte têm estruturas diferentes. O melhor chunking respeita como a informação realmente se organiza naquele tipo de material.",
        "A interação deixa claro o dilema: chunks menores melhoram precisão localizada; overlap protege contexto; excesso de ambos aumenta redundância e custo do índice.",
      ],
      blocks: [
        {
          type: "mistake",
          title: "Erro comum",
          body:
            "Definir chunk size só pensando na janela do modelo e ignorar a organização semântica natural do documento.",
        },
      ],
    },
    {
      id: "estrutura-documento",
      eyebrow: "Semântica textual",
      title: "Quebrar por parágrafo, seção ou heading costuma ser mais inteligente do que cortar arbitrariamente",
      lead:
        "Documentos já carregam uma estrutura humana que pode ser aproveitada pelo pipeline.",
      visual: "pipeline",
      paragraphs: [
        "Parágrafos, títulos, subtítulos, listas e blocos de código sinalizam unidades de sentido. Quando o chunking respeita essa organização, aumentam as chances de cada trecho permanecer semanticamente coeso.",
        "Por isso, abordagens recursivas ou baseadas em estrutura frequentemente funcionam bem: tentam manter unidades maiores intactas e só quebram mais quando necessário. O sistema passa a recuperar pedaços que fazem sentido por si só.",
        "Essa escolha também ajuda na explicabilidade. Um chunk que corresponde a uma seção clara do documento é mais fácil de citar e validar do que um recorte arbitrário de caracteres.",
      ],
      blocks: [
        {
          type: "insight",
          title: "Estrutura já é informação",
          body:
            "Títulos e quebras naturais não são apenas formatação. Eles informam como o conhecimento foi organizado e podem orientar melhor a recuperação.",
        },
      ],
    },
    {
      id: "ranking",
      eyebrow: "Recuperação",
      title: "Ranking lexical, denso e híbrido enxergam relevância por lentes diferentes",
      lead:
        "A forma como o sistema mede semelhança muda radicalmente o tipo de resultado que sobe no topo.",
      visual: "comparison",
      interactive: "ranking-modes",
      paragraphs: [
        "No ranking lexical, como BM25, termos explícitos importam muito. Isso é excelente quando a formulação da consulta e do documento compartilham vocabulário forte. Já em retrieval denso, embeddings tentam capturar proximidade semântica mesmo quando as palavras exatas diferem.",
        "Cada abordagem tem pontos cegos. O lexical pode perder sinônimos e paráfrases. O denso pode subir trechos semanticamente parecidos, mas não exatamente pertinentes ao detalhe pedido. Por isso, muitas arquiteturas usam busca híbrida ou reranking posterior.",
        "A interação desta seção ajuda a visualizar em quais cenários cada estratégia brilha e onde ela costuma tropeçar.",
      ],
      blocks: [
        {
          type: "definition",
          title: "BM25",
          body:
            "Método clássico de ranking lexical que pondera frequência de termo, raridade e comprimento do documento.",
        },
        {
          type: "definition",
          title: "Retrieval denso",
          body:
            "Busca baseada em embeddings, na qual consulta e documento são comparados em espaço vetorial por proximidade semântica.",
        },
      ],
    },
    {
      id: "vetores",
      eyebrow: "Infraestrutura",
      title: "Bases vetoriais armazenam representações e respondem consultas por similaridade",
      lead:
        "Elas não 'entendem' texto por si só; operam sobre vetores produzidos por um encoder.",
      visual: "tradeoff",
      interactive: "vector-index-lab",
      paragraphs: [
        "Depois que chunks viram embeddings, precisamos armazená-los e procurar vizinhos relevantes com boa latência. Bases vetoriais e bibliotecas como FAISS cuidam dessa parte: indexação, compressão, busca aproximada e escalabilidade.",
        "Aqui aparece um trade-off central. Busca exata tende a ser mais fiel, mas pode ficar cara em escala. Busca aproximada reduz custo e latência, mas aceita algum risco de não recuperar o vizinho ideal. Dependendo da aplicação, esse compromisso é totalmente aceitável ou perigosamente agressivo.",
        "A intuição correta é esta: a base vetorial torna a busca viável; ela não corrige embedding ruim, chunking ruim nem consulta mal formulada.",
      ],
      blocks: [
        {
          type: "example",
          title: "Base vetorial como infraestrutura",
          body:
            "Você pode trocar o tipo de índice ou a estratégia ANN sem mudar o conteúdo dos documentos; já trocar o encoder muda a geometria do espaço inteiro.",
        },
      ],
    },
    {
      id: "falhas-comuns",
      eyebrow: "Diagnóstico",
      title: "Muitos sistemas falham antes mesmo do modelo leitor entrar em cena",
      lead:
        "Se a recuperação erra, a geração posterior só trabalha com material pior.",
      visual: "checklist",
      paragraphs: [
        "Falhas comuns incluem chunks heterogêneos demais, chunks curtos demais, embeddings inadequados ao domínio, ausência de metadados úteis, ranking baseado só em uma lente e índice ajustado apenas para velocidade sem medir recall suficiente.",
        "Outra ilusão frequente é observar alguns casos de sucesso e concluir que o pipeline está sólido. Sem avaliação por tipos de pergunta, sinônimos, entidades raras, consultas compostas e perguntas negativas, os pontos cegos passam despercebidos.",
        "Em recuperação para LLMs, qualidade não é detalhe invisível. Ela decide o que o modelo vai ou não poder usar depois.",
      ],
      blocks: [
        {
          type: "mistake",
          title: "Erro comum",
          body:
            "Culpar apenas o LLM por respostas fracas quando o verdadeiro gargalo está na camada de recuperação.",
        },
      ],
    },
    {
      id: "ligacao-rag",
      eyebrow: "Integração",
      title: "Chunking, ranking e vector store são os bastidores do RAG",
      lead:
        "Quando o trecho certo chega ao prompt, parece magia; quando não chega, parece que o modelo 'não sabe'.",
      paragraphs: [
        "RAG depende da camada de recuperação muito mais do que demos rápidas costumam mostrar. Um pipeline de geração grounded só é tão bom quanto a infraestrutura que decidiu o que entra e o que fica de fora do contexto final.",
        "Por isso, engenharia de busca e engenharia de prompt precisam conversar. Não adianta pedir ao modelo que cite fontes impecavelmente se o ranking trouxe trechos misturados ou irrelevantes. Nem adianta ter índice excelente se a resposta final ignora a evidência.",
        "A visão madura integra tudo isso: segmentação do conhecimento, ranking multietapa, armazenamento eficiente, observabilidade e síntese disciplinada.",
      ],
      blocks: [
        {
          type: "insight",
          title: "Recuperação é epistemologia operacional",
          body:
            "Ela define qual parte do mundo documental o sistema consegue realmente enxergar no momento de responder.",
        },
      ],
    },
    {
      id: "resumo",
      eyebrow: "Síntese",
      title: "Resumo visual de chunking, ranking e vetores",
      lead:
        "O pipeline fica forte quando a unidade de documento é bem escolhida, o ranking usa a lente certa e o índice torna a busca escalável sem sacrificar demais o recall.",
      interactive: "summary-cards",
      paragraphs: [
        "Guarde a cadeia: boa segmentação -> boa recuperação -> melhor contexto -> melhor resposta.",
      ],
    },
    {
      id: "quiz",
      eyebrow: "Revisão",
      title: "Quiz de revisão",
      lead:
        "Teste se você conectou chunking, ranking e busca vetorial como partes de um mesmo sistema.",
      interactive: "quiz",
      paragraphs: [
        "As questões abaixo foram pensadas para ir além do jargão e testar entendimento causal do pipeline.",
      ],
    },
    {
      id: "glossario",
      eyebrow: "Vocabulário",
      title: "Glossário essencial",
      lead:
        "Feche a aula consolidando os principais termos da camada de recuperação.",
      interactive: "glossary",
      paragraphs: [
        "Eles são úteis para discutir ajustes finos, benchmark e debugging de sistemas de busca e RAG.",
      ],
    },
  ],
  summaryCards: [
    {
      title: "Chunking define a unidade de conhecimento recuperável",
      body:
        "Escolher bem o tamanho e a estrutura do chunk afeta diretamente se a evidência certa poderá ser encontrada depois.",
    },
    {
      title: "Overlap é proteção, não remédio universal",
      body:
        "Ele reduz quebra de contexto, mas aumenta redundância e custo do índice quando usado sem critério.",
    },
    {
      title: "Lexical e denso veem relevância de modos diferentes",
      body:
        "BM25 prioriza correspondência textual; embeddings ajudam com sinônimos e semântica. Híbridos frequentemente funcionam melhor.",
    },
    {
      title: "Base vetorial é infraestrutura",
      body:
        "Ela viabiliza busca por similaridade em escala, mas não compensa representação ou segmentação ruins.",
    },
    {
      title: "Recuperação fraca derruba o resto do pipeline",
      body:
        "Quando a evidência certa não chega ao contexto, o LLM só pode responder com material pior ou insuficiente.",
    },
  ],
  quiz: [
    {
      id: "q1",
      prompt: "Por que documentos inteiros costumam ser unidade ruim para recuperação em LLMs?",
      options: [
        { id: "a", label: "Porque a consulta geralmente precisa de trechos específicos, e documentos completos misturam muito contexto irrelevante." },
        { id: "b", label: "Porque embeddings só funcionam em textos de uma frase." },
        { id: "c", label: "Porque bases vetoriais não aceitam arquivos longos." },
      ],
      correctOptionId: "a",
      feedback:
        "Chunking melhora granularidade da recuperação e adequação ao contexto final usado pelo modelo.",
    },
    {
      id: "q2",
      prompt: "Qual é o principal trade-off do chunk size?",
      options: [
        { id: "a", label: "Chunk pequeno ganha precisão localizada; chunk grande preserva mais contexto, mas pode diluir a evidência." },
        { id: "b", label: "Chunk grande sempre vence porque contém mais informação." },
        { id: "c", label: "Chunk pequeno sempre vence porque cabe melhor no índice." },
      ],
      correctOptionId: "a",
      feedback:
        "O melhor tamanho depende do tipo de documento e da forma como a informação relevante está distribuída.",
    },
    {
      id: "q3",
      prompt: "Para que serve o overlap entre chunks?",
      options: [
        { id: "a", label: "Para reduzir perda de contexto nas fronteiras entre segmentos." },
        { id: "b", label: "Para eliminar a necessidade de ranking." },
        { id: "c", label: "Para transformar busca lexical em busca densa." },
      ],
      correctOptionId: "a",
      feedback:
        "Overlap ajuda quando uma ideia atravessa a borda entre dois chunks, embora aumente redundância.",
    },
    {
      id: "q4",
      prompt: "Qual afirmação compara bem BM25 e retrieval denso?",
      options: [
        { id: "a", label: "BM25 privilegia correspondência textual; retrieval denso tenta capturar proximidade semântica por embeddings." },
        { id: "b", label: "BM25 e retrieval denso produzem sempre o mesmo ranking." },
        { id: "c", label: "Retrieval denso dispensa embeddings." },
      ],
      correctOptionId: "a",
      feedback:
        "As duas estratégias usam sinais diferentes e por isso podem se complementar em sistemas híbridos.",
    },
    {
      id: "q5",
      prompt: "O que uma base vetorial faz?",
      options: [
        { id: "a", label: "Armazena e busca vetores por similaridade com eficiência, frequentemente usando índices aproximados." },
        { id: "b", label: "Gera automaticamente chunks perfeitos para qualquer documento." },
        { id: "c", label: "Substitui totalmente a necessidade de encoder." },
      ],
      correctOptionId: "a",
      feedback:
        "A base vetorial trabalha sobre embeddings já produzidos; ela é infraestrutura de indexação e busca.",
    },
    {
      id: "q6",
      prompt: "Qual é um risco de otimizar demais para latência?",
      options: [
        { id: "a", label: "Perder recall e deixar de recuperar vizinhos relevantes em nome de busca muito aproximada." },
        { id: "b", label: "Fazer BM25 virar supervisionado." },
        { id: "c", label: "Aumentar automaticamente a qualidade dos embeddings." },
      ],
      correctOptionId: "a",
      feedback:
        "Em escala, ANN exige trade-offs; baixar custo demais pode degradar a utilidade da recuperação.",
    },
    {
      id: "q7",
      prompt: "Qual erro de interpretação é comum em sistemas de busca semântica?",
      options: [
        { id: "a", label: "Achar que vetor bom corrige automaticamente chunking ruim, ranking ruim e base mal preparada." },
        { id: "b", label: "Perceber que estrutura do documento importa." },
        { id: "c", label: "Usar metadados para filtrar resultados." },
      ],
      correctOptionId: "a",
      feedback:
        "Embeddings ajudam muito, mas não substituem o restante da engenharia de recuperação.",
    },
    {
      id: "q8",
      prompt: "Como essa camada se relaciona com RAG?",
      options: [
        { id: "a", label: "Ela decide quais trechos entram no contexto que o LLM usará para responder grounded." },
        { id: "b", label: "Ela substitui totalmente o modelo gerador." },
        { id: "c", label: "Ela elimina a necessidade de prompt de síntese." },
      ],
      correctOptionId: "a",
      feedback:
        "Chunking, ranking e indexação vetorial são bastidores essenciais da qualidade do contexto final em RAG.",
    },
  ],
  glossary: [
    { term: "Chunking", definition: "Segmentação de documentos em unidades menores e recuperáveis." },
    { term: "Chunk size", definition: "Quantidade de texto que cada chunk contém." },
    { term: "Overlap", definition: "Trecho repetido entre chunks adjacentes para preservar continuidade contextual." },
    { term: "BM25", definition: "Método clássico de ranking lexical baseado em frequência de termos e normalização por tamanho." },
    { term: "Ranking denso", definition: "Ranking baseado em embeddings e semelhança vetorial entre consulta e documento." },
    { term: "Busca híbrida", definition: "Combinação de sinais lexicais e densos para ordenar candidatos." },
    { term: "Embedding", definition: "Representação vetorial contínua de texto para comparação por similaridade." },
    { term: "Vector store", definition: "Infraestrutura para armazenar e consultar embeddings em escala." },
    { term: "ANN", definition: "Approximate Nearest Neighbor, busca aproximada por vizinhos mais próximos em espaço vetorial." },
    { term: "Recall", definition: "Capacidade de recuperar entre os candidatos aquilo que realmente era relevante." },
    { term: "Reranking", definition: "Reordenação de candidatos após a recuperação inicial para melhorar precisão." },
    { term: "Metadado", definition: "Informação adicional sobre um chunk, como origem, seção, data ou tipo de documento." },
  ],
};
