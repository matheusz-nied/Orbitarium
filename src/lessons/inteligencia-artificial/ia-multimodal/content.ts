import type { LessonContent } from "../../../types/content";

export const iaMultimodalContent: LessonContent = {
  id: "ia-multimodal",
  title: "IA Multimodal",
  subtitle:
    "Como modelos passam a raciocinar com texto, imagem, áudio e outras modalidades, construindo pontes entre sinais diferentes sem tratar tudo como uma única sequência indiferenciada.",
  description:
    "Uma aula intermediária sobre representações multimodais, alinhamento entre modalidades, estratégias de fusão, grounding, instruction tuning multimodal e limites práticos dessa família de modelos.",
  primaryCategoryId: "inteligencia-artificial",
  secondaryCategoryId: "computacao",
  level: "Intermediário",
  estimatedTime: "45-60 min",
  tags: [
    "IA Multimodal",
    "Visão-Linguagem",
    "Áudio",
    "Grounding",
    "CLIP",
    "Flamingo",
    "LLaVA",
  ],
  learningObjectives: [
    "Entender o que torna um sistema genuinamente multimodal.",
    "Diferenciar alinhamento de modalidades de mera concatenação de entradas.",
    "Compreender estratégias de fusão como early fusion, late fusion e cross-attention.",
    "Entender o papel de embeddings compartilhados e espaços de representação alinhados.",
    "Relacionar multimodalidade com grounding, instruções visuais e recuperação cruzada entre modalidades.",
    "Reconhecer limites práticos como espúrios entre modalidades, dados desalinhados e avaliação difícil.",
  ],
  prerequisites: [
    "Familiaridade geral com embeddings e modelos neurais.",
    "Noção básica de texto, imagem e áudio como tipos diferentes de sinal.",
    "Interesse em sistemas que combinam visão, linguagem e outros dados.",
  ],
  references: [
    {
      title: "Learning Transferable Visual Models From Natural Language Supervision",
      source: "Radford et al., 2021 — arXiv",
      url: "https://arxiv.org/abs/2103.00020",
      note:
        "CLIP é referência central para alinhamento texto-imagem e transferência zero-shot.",
    },
    {
      title: "Flamingo: a Visual Language Model for Few-Shot Learning",
      source: "Alayrac et al., 2022 — arXiv",
      url: "https://arxiv.org/abs/2204.14198",
      note:
        "Marco importante em modelos visão-linguagem com few-shot e cross-attention intercalada.",
    },
    {
      title: "Visual Instruction Tuning",
      source: "Liu et al., 2023 — arXiv (LLaVA)",
      url: "https://arxiv.org/abs/2304.08485",
      note:
        "Referência influente para instruction tuning multimodal em modelos de visão-linguagem.",
    },
    {
      title: "ImageBind: One Embedding Space To Bind Them All",
      source: "Girdhar et al., 2023 — arXiv",
      url: "https://arxiv.org/abs/2305.05665",
      note:
        "Mostra alinhamento conjunto entre várias modalidades além de texto e imagem.",
    },
    {
      title: "Gemini: A Family of Highly Capable Multimodal Models",
      source: "Team Gemini, 2023 — arXiv",
      url: "https://arxiv.org/abs/2312.11805",
      note:
        "Exemplo contemporâneo de modelo multimodal grande com integração ampla de modalidades.",
    },
    {
      title: "The Visual Turing Test for Language and Vision",
      source: "Antol et al., 2015 — arXiv (VQA)",
      url: "https://arxiv.org/abs/1505.00468",
      note:
        "Paper clássico de Visual Question Answering, tarefa importante para pensar avaliação multimodal.",
    },
  ],
  heroVisual: "hero",
  openingText:
    "Humanos não aprendem o mundo apenas lendo palavras. Nós ouvimos, vemos, tocamos, associamos gestos a sons e conectamos frases a cenas. IA multimodal nasce da mesma intuição: conhecimento útil raramente mora em uma única modalidade. Uma legenda ajuda a interpretar uma imagem; uma imagem resolve ambiguidades do texto; um áudio traz emoção e temporalidade que o texto sozinho não contém. O desafio é que cada modalidade tem estrutura própria. Ser multimodal não é despejar tudo num mesmo balde; é aprender a traduzir, alinhar e fundir sinais diferentes sem perder o que cada um tem de específico.",
  quickFacts: [
    {
      title: "Modalidade é mais que formato",
      body:
        "Texto, imagem e áudio não diferem apenas em extensão dos dados; diferem em estrutura, ruído e semântica.",
    },
    {
      title: "Alinhar não é colar",
      body:
        "Um bom sistema multimodal aprende relações entre sinais, não apenas concatena vetores de origens diferentes.",
    },
    {
      title: "Grounding é crucial",
      body:
        "Modelos multimodais são valiosos quando conectam linguagem a evidências perceptuais do mundo.",
    },
    {
      title: "Avaliar continua difícil",
      body:
        "Respostas plausíveis podem esconder falta de grounding real ou dependência excessiva de uma única modalidade.",
    },
  ],
  sections: [
    s("motivacao", "Ponto de partida", "O que significa ser multimodal de verdade", "Um sistema multimodal não apenas recebe vários sinais; ele aprende a relacioná-los.", "hero", undefined, [
      "Uma planilha com texto e uma imagem anexada já é 'multi-input', mas não necessariamente multimodal no sentido forte. A multimodalidade relevante aparece quando o sistema consegue transferir informação entre modalidades, por exemplo usando texto para localizar uma região visual, ou imagem para resolver uma ambiguidade linguística.",
      "Isso exige duas coisas em tensão. De um lado, cada modalidade precisa de um encoder que respeite sua estrutura própria. De outro, em algum ponto essas representações precisam conversar num espaço compartilhado ou por um mecanismo de fusão eficaz.",
      "A dificuldade conceitual nasce exatamente aí: preservar especialização local sem sacrificar integração global.",
    ], [
      { type: "definition", title: "IA multimodal", body: "Família de modelos que processa, alinha ou gera informação a partir de múltiplas modalidades, como texto, imagem e áudio." },
      { type: "insight", title: "Vários sinais não bastam", body: "A força real está em aprender relações cruzadas entre modalidades, não apenas em aceitá-las como entrada." },
    ]),
    s("modalidades", "Fundamento", "Cada modalidade carrega um tipo diferente de regularidade", "Texto é discreto e composicional; imagem é espacial; áudio é temporal e contínuo.", "concept", undefined, [
      "Texto organiza significado em tokens e estrutura sintática. Imagens organizam informação em padrões espaciais. Áudio mistura tempo, frequência e dinâmica contínua. Isso faz com que um encoder bom para uma modalidade não sirva automaticamente para outra.",
      "A tentação de tratar tudo como sequência única pode ser útil em alguns designs, mas costuma esconder o fato de que as modalidades têm invariâncias e ruídos distintos. Em visão, deslocamento espacial importa. Em áudio, sincronia temporal importa. Em linguagem, ordem e contexto semântico são cruciais.",
      "Sistemas multimodais fortes normalmente respeitam essa diversidade antes de fundi-la.",
    ], [
      { type: "mistake", title: "Achar que todos os sinais viram o mesmo problema", body: "Embeddings compartilhados ajudam, mas não apagam a necessidade de encoders especializados por modalidade." },
    ]),
    s("alinhamento", "Representação", "Alinhamento entre modalidades: fazer texto e imagem apontarem para o mesmo conceito", "Uma rota poderosa é aprender embeddings onde descrições compatíveis ficam próximas.", "pipeline", "modality-balance-lab", [
      "CLIP popularizou essa ideia ao treinar imagem e texto para ficarem próximos no espaço vetorial quando combinam semanticamente. Isso não produz entendimento completo do mundo, mas cria uma ponte extremamente útil entre modalidades.",
      "Alinhamento é especialmente valioso para busca cruzada, zero-shot classification e grounding inicial. Se 'cachorro correndo na praia' e uma imagem correspondente caem na mesma vizinhança do embedding space, o modelo já dispõe de uma semântica compartilhada funcional.",
      "Mas alinhamento não resolve tudo. Saber que texto e imagem combinam não é o mesmo que responder perguntas detalhadas sobre contagem, causalidade ou relações espaciais finas.",
    ], [
      { type: "definition", title: "Espaço de embeddings compartilhado", body: "Representação vetorial em que amostras de modalidades diferentes podem ser comparadas diretamente por proximidade semântica." },
    ]),
    s("fusao", "Arquitetura", "Early fusion, late fusion e cross-attention são respostas diferentes para a mesma pergunta", "Em que momento e de que forma as modalidades devem conversar?", "comparison", "fusion-strategy-scenarios", [
      "Early fusion tenta combinar sinais mais cedo, permitindo que o modelo aprenda interações profundas desde o início. O risco é misturar representações ainda pouco maduras. Late fusion preserva especialistas separados por mais tempo e combina decisões ou features mais tarde, com menos interferência entre modalidades.",
      "Cross-attention oferece um meio-termo poderoso: uma modalidade consulta a outra seletivamente. Isso é especialmente útil quando texto precisa 'olhar' para regiões visuais relevantes, ou quando áudio precisa contextualizar uma instrução verbal.",
      "Não existe estratégia universalmente melhor. A escolha depende da tarefa, da quantidade de dados alinhados e do custo de engenharia aceitável.",
    ], [
      { type: "insight", title: "Fusão é decisão epistemológica", body: "Ela define quando o modelo deve preservar autonomia modal e quando deve negociar significado conjunto." },
    ]),
    s("grounding", "Grounding", "Linguagem útil precisa apontar para evidência perceptual", "Grounding multimodal é o que permite que palavras se ancorem em imagens, sons e ações observáveis.", undefined, "grounding-lab", [
      "Sem grounding, um modelo pode soar plausível e ainda assim falar 'por cima' da percepção real. Em visão-linguagem, grounding significa ligar pedaços da linguagem a regiões, objetos, eventos ou relações observáveis na imagem.",
      "Isso importa porque muitas falhas multimodais vêm justamente de um acoplamento frouxo. O modelo responde pela prior textual mais provável, não pelo que realmente está visível ou audível. O resultado é uma espécie de alucinação multimodal.",
      "Grounding forte não é apenas um luxo acadêmico. Ele é decisivo em inspeção visual, robótica, assistência, acessibilidade e qualquer cenário em que o sistema precisa justificar respostas com base em evidência sensorial.",
    ], [
      { type: "mistake", title: "Resposta eloquente não prova grounding", body: "Modelos multimodais podem produzir frases convincentes mesmo quando não consultam adequadamente a evidência visual ou sonora." },
    ]),
    s("instrucao", "Modelos recentes", "Instruction tuning multimodal aproximou esses sistemas da experiência conversacional", "Com ajustes por instrução, modelos visão-linguagem passaram a responder perguntas, descrever cenas e seguir comandos de forma mais natural.", undefined, "fusion-strategy-scenarios", [
      "Modelos como LLaVA e Flamingo mostram uma tendência clara: combinar representações visuais com LLMs para transformar percepção em diálogo útil. A ideia não é só classificar imagens, mas permitir interação aberta sobre o conteúdo.",
      "Isso ampliou muito a sensação de utilidade prática. O mesmo modelo pode descrever uma imagem, responder perguntas sobre ela, comparar duas cenas ou seguir um comando visual guiado por linguagem.",
      "Mas a experiência conversacional também mascara limitações. Um modelo pode falar fluentemente sobre uma imagem e ainda errar relações finas, contagem ou causalidade. A conversa suave não substitui grounding rigoroso.",
    ], [
      { type: "insight", title: "Conversar não é o mesmo que perceber", body: "Instruction tuning melhora a interface cognitiva do sistema, mas não resolve automaticamente limitações perceptuais ou de dados." },
    ]),
    s("dados-avaliacao", "Dados e benchmarks", "Treinar e avaliar multimodalidade é mais difícil do que parece", "O grande gargalo muitas vezes está na qualidade do pareamento entre modalidades.", "tradeoff", undefined, [
      "Dados multimodais precisam estar alinhados de forma significativa. Uma legenda genérica demais pode ensinar pouco. Um áudio sem transcrição ou com metadados fracos também limita o aprendizado cruzado. Em muitas tarefas, o custo de anotar relações entre modalidades é alto.",
      "A avaliação sofre do mesmo problema. Benchmarks de VQA, retrieval e captioning ajudam, mas nem sempre distinguem entre entendimento real e atalhos estatísticos. O modelo pode acertar por vieses do dataset, não por integração multimodal genuína.",
      "Por isso, leitura crítica de benchmark é obrigatória. Multimodalidade é especialmente vulnerável a vitórias ilusórias baseadas em correlações espúrias.",
    ], [
      { type: "mistake", title: "Confiar demais em benchmark único", body: "Acertar captioning ou VQA em um conjunto não garante grounding robusto em contexto aberto." },
    ]),
    s("limites", "Limitações", "Modalidades se ajudam, mas também podem se contaminar por vieses e atalhos", "Mais modalidades nem sempre significam mais entendimento.", "checklist", undefined, [
      "Uma modalidade forte pode dominar as outras. Se o texto já sugere demais a resposta, o sistema pode quase ignorar a imagem. Se a imagem é muito estereotipada, o modelo pode prever texto plausível sem raciocinar com cuidado.",
      "Também existem problemas de sincronização, granularidade e ruído. Um vídeo pode ter centenas de frames irrelevantes. Um áudio pode carregar emoção que não aparece na transcrição. Um sensor adicional pode introduzir mais confusão do que clareza.",
      "A engenharia multimodal madura reconhece isso: combinar sinais é poderoso, mas só quando o sistema aprende a pesar e consultar cada modalidade de forma contextual.",
    ], [
      { type: "insight", title: "Fusão ruim amplifica erro", body: "Se uma modalidade chega ruidosa ou enviesada, ela pode contaminar a decisão conjunta em vez de enriquecê-la." },
    ]),
    s("aplicacoes", "Aplicações", "Por que multimodalidade virou eixo estratégico da IA moderna", "Busca cruzada, copilotos visuais, acessibilidade, robótica e análise de mídia dependem dessa integração.", undefined, undefined, [
      "Sistemas multimodais ajudam pessoas a perguntar sobre imagens, procurar cenas a partir de texto, gerar descrições para acessibilidade, interpretar documentos ricos e orquestrar agentes com percepção do ambiente.",
      "Em robótica e assistência, a vantagem é ainda mais clara: linguagem fornece objetivo; visão fornece contexto; áudio pode indicar eventos temporais. Sem integração entre modalidades, a ação inteligente fica truncada.",
      "A multimodalidade também mudou a fronteira do que se espera de um modelo geral. Não basta mais conversar bem; espera-se que ele converse sobre algo que vê, ouve ou consulta no mundo.",
    ], [
      { type: "example", title: "Busca cruzada", body: "Usuário escreve 'pessoa segurando guarda-chuva vermelho' e o sistema recupera imagens ou vídeos semanticamente alinhados." },
    ]),
    s("resumo", "Resumo", "O que precisa ficar na memória sobre IA multimodal", "Consolide representação, fusão, grounding e limites antes do quiz.", undefined, "summary-cards", [
      "Revise como modalidades diferentes se alinham e por que integração boa exige mais do que concatenação.",
    ], []),
    s("quiz", "Revisão", "Quiz de revisão", "Teste alinhamento, fusão, grounding e avaliação multimodal.", undefined, "quiz", [
      "O quiz foi desenhado para diferenciar entendimento conceitual de slogans de mercado sobre multimodalidade.",
    ], []),
    s("glossario", "Glossário", "Termos essenciais", "Feche a aula consolidando o vocabulário da multimodalidade.", undefined, "glossary", [
      "Esses termos aparecem em papers, APIs e produtos multimodais atuais.",
    ], []),
  ],
  summaryCards: [
    { title: "Multimodalidade real exige relação cruzada", body: "Receber múltiplos sinais não basta; é preciso aprender como eles se correspondem e se corrigem." },
    { title: "Cada modalidade tem estrutura própria", body: "Texto, imagem e áudio pedem encoders e vieses arquiteturais diferentes antes da integração." },
    { title: "Alinhamento cria pontes úteis", body: "Embeddings compartilhados permitem retrieval cruzado, zero-shot e grounding inicial entre modalidades." },
    { title: "Fusão é decisão de arquitetura", body: "Early fusion, late fusion e cross-attention definem quando e como as modalidades devem conversar." },
    { title: "Grounding é a prova de fogo", body: "Um sistema multimodal forte ancora a linguagem em evidência perceptual real." },
    { title: "Avaliar continua difícil", body: "Benchmarks podem esconder atalhos estatísticos e uso superficial de uma modalidade dominante." },
  ],
  quiz: [
    q("q1", "O que melhor define um sistema multimodal forte?", "Ele aprende relações úteis entre modalidades diferentes, não apenas aceita várias entradas.", "Ele converte qualquer dado em texto puro antes de processar.", "Ele sempre usa a mesma arquitetura para todo tipo de sinal.", "a", "O núcleo da multimodalidade está no alinhamento e na transferência de informação entre modalidades."),
    q("q2", "Por que não basta concatenar texto, imagem e áudio de qualquer jeito?", "Porque cada modalidade tem estrutura, ruído e regularidades diferentes.", "Porque vetores não podem ser combinados entre si.", "Porque modalidades diferentes exigem GPUs diferentes.", "a", "A fusão eficaz depende de respeitar a natureza distinta de cada sinal antes de integrá-los."),
    q("q3", "O que significa alinhamento entre modalidades?", "Aprender representações em que sinais compatíveis de modalidades diferentes fiquem semanticamente próximos.", "Converter todas as modalidades em pixels.", "Treinar um modelo apenas com dados não pareados.", "a", "Alinhamento cria um espaço de comparação compartilhado entre texto, imagem, áudio e outras modalidades."),
    q("q4", "Qual é a ideia de cross-attention em multimodalidade?", "Uma modalidade consulta seletivamente outra para buscar informação relevante.", "Todas as modalidades são processadas isoladamente até o final.", "O modelo ignora posição e estrutura dos sinais.", "a", "Cross-attention oferece integração seletiva sem forçar fusão total desde o início."),
    q("q5", "O que é grounding?", "Ancorar linguagem ou decisão em evidência perceptual observável.", "Aumentar o número de parâmetros do encoder visual.", "Reduzir a resolução das imagens para acelerar treino.", "a", "Grounding forte liga a resposta do sistema ao que realmente está visível ou audível."),
    q("q6", "Por que avaliação multimodal é difícil?", "Porque o modelo pode acertar por correlações espúrias e não por integração genuína das modalidades.", "Porque não existem benchmarks públicos para multimodalidade.", "Porque toda modalidade usa a mesma métrica de qualidade.", "a", "Benchmarks ajudam, mas não eliminam o risco de atalhos estatísticos."),
    q("q7", "Qual risco existe quando uma modalidade domina as outras?", "O sistema pode parecer multimodal, mas decidir quase tudo com base em um único sinal.", "O modelo fica automaticamente mais interpretável.", "A latência de inferência sempre cai.", "a", "Uma modalidade dominante pode encobrir o uso superficial ou irrelevante das demais."),
    q("q8", "Por que multimodalidade é estrategicamente importante em IA moderna?", "Porque permite conectar linguagem a percepção e ação em tarefas mais próximas do mundo real.", "Porque elimina a necessidade de dados de treinamento grandes.", "Porque torna benchmarks linguísticos obsoletos.", "a", "Aplicações de busca, assistência, robótica e acessibilidade dependem dessa integração entre sinais."),
  ],
  glossary: [
    g("Modalidade", "Tipo de sinal ou canal de informação, como texto, imagem, áudio ou vídeo."),
    g("IA multimodal", "Modelos que processam ou geram informação a partir de múltiplas modalidades."),
    g("Alinhamento", "Aprendizado de correspondência semântica entre modalidades."),
    g("Embedding compartilhado", "Espaço vetorial onde sinais de modalidades diferentes podem ser comparados diretamente."),
    g("Early fusion", "Combinação de modalidades em estágios iniciais do processamento."),
    g("Late fusion", "Combinação de decisões ou representações já maduras em estágios posteriores."),
    g("Cross-attention", "Mecanismo em que uma modalidade consulta outra seletivamente."),
    g("Grounding", "Ancoragem de respostas ou representações em evidência perceptual real."),
    g("Retrieval cruzado", "Busca entre modalidades, como texto recuperando imagens."),
    g("VQA", "Visual Question Answering, tarefa de responder perguntas sobre imagens."),
    g("Instruction tuning multimodal", "Ajuste de modelos para seguir instruções envolvendo múltiplas modalidades."),
    g("Correlação espúria", "Atalho estatístico que parece útil no treino, mas não representa compreensão real."),
  ],
};

function s(
  id: string,
  eyebrow: string,
  title: string,
  lead: string,
  visual: string | undefined,
  interactive: string | undefined,
  paragraphs: string[],
  blocks: LessonContent["sections"][number]["blocks"],
) {
  return { id, eyebrow, title, lead, visual, interactive, paragraphs, blocks };
}

function q(
  id: string,
  prompt: string,
  a: string,
  b: string,
  c: string,
  correctOptionId: string,
  feedback: string,
) {
  return {
    id,
    prompt,
    options: [
      { id: "a", label: a },
      { id: "b", label: b },
      { id: "c", label: c },
    ],
    correctOptionId,
    feedback,
  };
}

function g(term: string, definition: string) {
  return { term, definition };
}
