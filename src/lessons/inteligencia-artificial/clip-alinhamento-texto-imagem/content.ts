import type { LessonContent } from "../../../types/content";

export const clipAlinhamentoTextoImagemContent: LessonContent = {
  id: "clip-alinhamento-texto-imagem",
  title: "CLIP e Alinhamento Texto-Imagem",
  subtitle:
    "Como um modelo aprende a colocar descrições e imagens no mesmo espaço semântico, habilitando zero-shot classification, retrieval cruzado e o ecossistema moderno de visão-linguagem.",
  description:
    "Uma aula intermediária sobre CLIP, aprendizado contrastivo, dual encoders, embeddings compartilhados, temperatura, zero-shot prompts e limites do alinhamento texto-imagem.",
  primaryCategoryId: "inteligencia-artificial",
  secondaryCategoryId: "computacao",
  level: "Intermediário",
  estimatedTime: "45-60 min",
  tags: [
    "CLIP",
    "Visão-Linguagem",
    "Aprendizado Contrastivo",
    "Zero-shot",
    "Embeddings",
    "Retrieval",
    "OpenAI",
  ],
  learningObjectives: [
    "Entender o problema que CLIP resolve em visão computacional e multimodalidade.",
    "Explicar por que alinhar texto e imagem em um espaço compartilhado é poderoso.",
    "Descrever a arquitetura conceitual de dual encoders para imagem e texto.",
    "Compreender o papel do treinamento contrastivo e da temperatura na separação entre pares corretos e incorretos.",
    "Entender como CLIP habilita classificação zero-shot por prompts textuais.",
    "Reconhecer limites de CLIP em contagem fina, OCR detalhado, raciocínio espacial e vieses de internet.",
  ],
  prerequisites: [
    "Noções básicas de embeddings e similaridade vetorial.",
    "Familiaridade geral com classificação de imagens.",
    "Interesse em modelos visão-linguagem e zero-shot learning.",
  ],
  references: [
    {
      title: "Learning Transferable Visual Models From Natural Language Supervision",
      source: "Radford et al., 2021 — arXiv",
      url: "https://arxiv.org/abs/2103.00020",
      note:
        "Paper seminal do CLIP, base científica central desta aula.",
    },
    {
      title: "CLIP: Connecting text and images",
      source: "OpenAI — página oficial",
      url: "https://openai.com/index/clip/",
      note:
        "Explicação oficial da OpenAI sobre CLIP, seu objetivo e capacidades zero-shot.",
    },
    {
      title: "openai/CLIP",
      source: "OpenAI — repositório oficial",
      url: "https://github.com/openai/CLIP",
      note:
        "Código e pesos oficiais liberados pela OpenAI para experimentação prática com CLIP.",
    },
    {
      title: "Scaling Up Visual and Vision-Language Representation Learning With Noisy Text Supervision",
      source: "Jia et al., 2021 — arXiv (ALIGN)",
      url: "https://arxiv.org/abs/2102.05918",
      note:
        "Trabalho importante e contemporâneo ao CLIP sobre alinhamento visão-linguagem em larga escala.",
    },
    {
      title: "LiT: Zero-Shot Transfer with Locked-image text Tuning",
      source: "Zhai et al., 2021 — arXiv",
      url: "https://arxiv.org/abs/2111.07991",
      note:
        "Explora outra rota para zero-shot transfer texto-imagem, útil para comparação conceitual.",
    },
    {
      title: "Sigmoid Loss for Language Image Pre-Training",
      source: "Zhai et al., 2023 — arXiv (SigLIP)",
      url: "https://arxiv.org/abs/2303.15343",
      note:
        "Mostra uma evolução importante na família de treinamento contraste imagem-texto.",
    },
  ],
  heroVisual: "hero",
  openingText:
    "Por muito tempo, visão computacional treinou modelos para prever um catálogo fixo de classes: cachorro, carro, bicicleta. Se você quisesse reconhecer uma categoria nova, precisava novo dataset rotulado e novo fine-tuning. CLIP propôs uma troca poderosa: em vez de treinar apenas com rótulos fechados, aprender diretamente da associação entre imagens e linguagem natural em larga escala. Ao alinhar imagens e textos no mesmo espaço semântico, o modelo passa a usar palavras como interface para reconhecer conceitos visuais — inclusive sem treino específico para cada tarefa.",
  quickFacts: [
    {
      title: "CLIP é dual encoder",
      body:
        "Uma torre processa imagem, outra processa texto, e ambas aprendem a conversar no mesmo espaço vetorial.",
    },
    {
      title: "Treino é contrastivo",
      body:
        "O objetivo é aproximar pares corretos e afastar pares incorretos em grandes lotes de imagem-texto.",
    },
    {
      title: "Zero-shot nasce do espaço comum",
      body:
        "Para classificar, basta comparar a imagem com prompts textuais que descrevem as classes candidatas.",
    },
    {
      title: "Alinhamento não é percepção completa",
      body:
        "CLIP é forte em associação semântica global, mas não resolve sozinho raciocínio fino, contagem ou OCR detalhado.",
    },
  ],
  sections: [
    s("motivacao", "Ponto de partida", "O problema que CLIP atacou: classes fechadas demais para um mundo aberto", "Treinar um classificador supervisionado para cada nova categoria é poderoso, mas pouco flexível.", "hero", undefined, [
      "Modelos visuais tradicionais costumavam depender de conjuntos de rótulos fechados. Isso funciona bem para benchmarks como ImageNet, mas falha em flexibilidade: uma vez que o catálogo de classes muda, o modelo precisa ser reconfigurado ou retreinado.",
      "A linguagem natural oferece um espaço de rótulos muito mais aberto e barato. Descrições textuais capturam conceitos, atributos e contextos com granularidade muito maior que listas fixas de classes. A pergunta então se torna: podemos usar texto como supervisão para aprender conceitos visuais transferíveis?",
      "CLIP responde 'sim' ao escalar essa ideia. Em vez de classificar diretamente, ele aprende a casar imagens com textos compatíveis.",
    ], [
      { type: "insight", title: "Texto vira interface para visão", body: "Quando o modelo entende alinhamento imagem-texto, palavras passam a funcionar como rótulos dinâmicos e composicionais." },
    ]),
    s("dual-encoder", "Arquitetura", "Duas torres, um espaço compartilhado", "CLIP aprende um encoder de imagem e um encoder de texto que produzem vetores comparáveis.", "concept", undefined, [
      "Uma imagem passa por um encoder visual; um texto passa por um encoder textual. Cada um produz um embedding. O objetivo do treino é fazer com que embeddings de pares correspondentes tenham alta similaridade e pares não correspondentes tenham baixa similaridade.",
      "Esse design é simples e poderoso porque separa especialização de modalidade e integração semântica. Cada torre aprende a respeitar sua estrutura de entrada, enquanto o espaço final atua como ponte entre as duas.",
      "Como a comparação final é vetorial, CLIP se torna muito útil para retrieval cruzado, busca semântica e classificação zero-shot.",
    ], [
      { type: "definition", title: "Dual encoder", body: "Arquitetura em que duas modalidades são processadas por encoders separados e depois comparadas em um espaço comum." },
    ]),
    s("objetivo-contrastivo", "Objetivo de treino", "Aprendizado contrastivo: aproximar pares corretos, afastar o resto", "O coração do CLIP não é prever uma etiqueta fixa, mas vencer uma competição de pareamento.", "pipeline", "similarity-lab", [
      "Em um batch de muitas imagens e muitos textos, cada imagem deve ficar mais próxima de seu texto correto do que de todos os outros textos do lote. O mesmo vale no sentido inverso: cada texto deve reconhecer sua imagem correspondente.",
      "Esse treinamento contrastivo usa a pressão do conjunto todo como supervisão. Não é preciso dizer explicitamente 'isto é um cachorro'; basta que a legenda correta descreva a imagem melhor que as demais.",
      "A consequência é um modelo que aprende semântica relacional em larga escala. Conceitos visuais passam a ser organizados em torno da linguagem, não apenas de rótulos taxonômicos fixos.",
    ], [
      { type: "definition", title: "Treinamento contrastivo", body: "Estratégia que aproxima representações compatíveis e afasta incompatíveis em um espaço vetorial compartilhado." },
    ]),
    s("temperatura", "Ajuste fino do contraste", "Temperatura controla o quanto o modelo separa pares positivos e negativos", "A semelhança não basta; é preciso calibrar quão dura será a competição no softmax.", undefined, "similarity-lab", [
      "No contraste imagem-texto, a temperatura atua como um amplificador ou suavizador das diferenças de similaridade. Temperatura menor torna a distribuição mais afiada, premiando fortemente os pares mais alinhados. Temperatura maior suaviza essa competição.",
      "Esse detalhe tem impacto real na qualidade do aprendizado. Se tudo ficar suave demais, positivos e negativos se misturam. Se ficar agressivo demais cedo demais, o treino pode se tornar instável ou excessivamente confiante.",
      "É um ótimo exemplo de como um mecanismo aparentemente pequeno molda a geometria do espaço de embeddings.",
    ], [
      { type: "definition", title: "Temperatura", body: "Parâmetro que controla a nitidez do softmax usado na comparação contrastiva entre pares." },
    ]),
    s("zero-shot", "Capacidade emergente", "Como CLIP faz classificação zero-shot usando prompts", "A imagem é comparada com frases candidatas que descrevem classes possíveis.", "comparison", "prompt-template-lab", [
      "Em vez de treinar um classificador final para cada conjunto de classes, CLIP permite montar descrições textuais como 'uma foto de um gato' ou 'uma foto de um avião' e comparar qual embedding textual mais se alinha à imagem.",
      "Isso transforma linguagem em catálogo flexível de classes. Novas categorias podem ser adicionadas via prompt, sem necessidade imediata de novo fine-tuning supervisionado.",
      "Mas o desempenho depende da formulação textual. O template do prompt influencia o embedding e, portanto, a fronteira zero-shot. Essa sensibilidade levou a muita pesquisa sobre prompt engineering e prompt ensembling em modelos visão-linguagem.",
    ], [
      { type: "example", title: "Classe como frase", body: "Em zero-shot, a classe deixa de ser um índice numérico fixo e passa a ser uma descrição textual comparável à imagem." },
    ]),
    s("retrieval", "Aplicação", "Busca cruzada: texto encontra imagem, imagem encontra texto", "Quando ambos vivem no mesmo espaço, recuperar um pelo outro vira operação natural.", undefined, "zero-shot-scenarios", [
      "Se imagens e textos compartilham um embedding space, busca cruzada se torna simples: dado um texto, procuramos imagens próximas; dada uma imagem, procuramos descrições próximas. Isso abriu portas para sistemas de busca semântica muito mais ricos.",
      "Essa capacidade é mais geral do que classificação zero-shot. Ela permite recuperar estilos, atributos, cenas e conceitos compostos sem exigir taxonomias explícitas para tudo.",
      "Ao mesmo tempo, retrieval bem-sucedido não prova compreensão completa. O modelo pode capturar semântica global suficiente para busca sem acertar detalhes finos como contagem exata ou relações espaciais específicas.",
    ], [
      { type: "insight", title: "CLIP é um grande indexador semântico", body: "Seu valor não está só em classificar, mas em tornar comparáveis descrições abertas e conteúdo visual." },
    ]),
    s("escala-dados", "Escala", "Por que linguagem natural supervisionou melhor que muitos rótulos fechados", "A supervisão textual da internet é ruidosa, mas abundante e semanticamente rica.", "tradeoff", undefined, [
      "Rótulos fechados são limpos, mas limitados. Texto livre é barulhento, porém carrega contexto, atributos, relações e variedade conceitual muito maior. CLIP mostrou que, em grande escala, essa riqueza compensa boa parte do ruído.",
      "A intuição é importante: linguagem natural fornece uma superfície de supervisão aberta, conectando o visual ao nome, ao estilo, ao contexto e ao uso social de um conceito. Isso amplia muito a transferibilidade do encoder visual.",
      "Em contrapartida, o modelo herda o ruído e os vieses da internet. Legendas ruins, associações espúrias e desequilíbrios culturais entram junto com a escala.",
    ], [
      { type: "mistake", title: "Mais dados textuais não significam verdade", body: "Escala amplia conhecimento útil, mas também amplia ruído e viés se a curadoria for limitada." },
    ]),
    s("limites", "Limitações", "O que CLIP não resolve sozinho", "Alinhamento semântico global é poderoso, mas não equivale a percepção detalhada do mundo.", "checklist", "zero-shot-scenarios", [
      "CLIP tende a ser forte em conceitos globais e fraco em detalhes precisos. Contagem de objetos, OCR fino, relações espaciais complexas e diferenças sutis entre estados parecidos podem exigir mecanismos adicionais.",
      "Ele também pode supervalorizar correlações visuais comuns do treino. Se certas descrições estiverem fortemente associadas a certos contextos na internet, o modelo pode reproduzir esses atalhos mesmo quando a evidência visual é ambígua.",
      "Isso explica por que CLIP é frequentemente usado como peça de sistemas maiores, não como solução universal para toda tarefa visão-linguagem.",
    ], [
      { type: "mistake", title: "Confundir similaridade com raciocínio", body: "Encontrar bons vizinhos semânticos não garante responder corretamente perguntas detalhadas sobre a imagem." },
    ]),
    s("impacto", "Impacto", "Por que CLIP se tornou tão influente", "Ele forneceu um bloco fundacional para zero-shot vision e para o ecossistema multimodal moderno.", undefined, undefined, [
      "CLIP mudou a percepção sobre como supervisionar modelos visuais: em vez de depender exclusivamente de rótulos fechados, visão podia aprender conceitos diretamente da linguagem. Isso abriu caminho para modelos mais gerais e flexíveis.",
      "O impacto foi além da classificação. CLIP passou a ser usado para retrieval, ranking, avaliação perceptual, guiagem semântica e como componente em pipelines generativos, incluindo texto-imagem.",
      "Em termos históricos, CLIP ajudou a fundir duas trilhas que antes eram mais separadas: representação visual e linguagem natural como forma de supervisão ampla.",
    ], [
      { type: "insight", title: "CLIP virou infraestrutura conceitual", body: "Mesmo quando não aparece como produto final, sua ideia de alinhamento visão-linguagem molda grande parte do desenho multimodal atual." },
    ]),
    s("resumo", "Resumo", "O que precisa ficar na memória sobre CLIP", "Consolide dual encoders, contraste, zero-shot e limites do alinhamento.", undefined, "summary-cards", [
      "Revise a cadeia de ideias antes do quiz.",
    ], []),
    s("quiz", "Revisão", "Quiz de revisão", "Teste se os conceitos de contraste, espaço compartilhado e zero-shot ficaram conectados.", undefined, "quiz", [
      "O foco do quiz é verificar se você entende o mecanismo, não apenas o nome do modelo.",
    ], []),
    s("glossario", "Glossário", "Termos essenciais", "Feche a aula consolidando o vocabulário do alinhamento texto-imagem.", undefined, "glossary", [
      "Esses termos aparecem em papers, APIs multimodais e implementações de retrieval e zero-shot.",
    ], []),
  ],
  summaryCards: [
    { title: "CLIP alinha imagem e texto", body: "As duas modalidades são projetadas para o mesmo espaço semântico comparável." },
    { title: "Treino é contrastivo", body: "Pares corretos são aproximados; pares incorretos são afastados em grandes lotes." },
    { title: "Temperatura molda a geometria", body: "Ela controla o quão dura é a competição entre positivos e negativos no softmax." },
    { title: "Zero-shot vem dos prompts", body: "Classes podem ser descritas em linguagem natural e comparadas diretamente com a imagem." },
    { title: "Retrieval cruzado é natural", body: "Texto pode recuperar imagens e imagens podem recuperar descrições usando proximidade vetorial." },
    { title: "Alinhamento não é entendimento total", body: "CLIP continua limitado em contagem, OCR detalhado e raciocínio espacial fino." },
  ],
  quiz: [
    q("q1", "Qual problema central CLIP ajuda a contornar?", "A rigidez de classificadores visuais presos a catálogos fechados de classes.", "A impossibilidade de usar texto em redes neurais.", "A necessidade de encoder visual especializado.", "a", "CLIP mostrou que linguagem natural pode funcionar como supervisão aberta e interface para conceitos visuais."),
    q("q2", "O que caracteriza a arquitetura conceitual do CLIP?", "Dois encoders separados para imagem e texto que aprendem um espaço compartilhado.", "Um único decoder autoregressivo que gera pixels e legendas simultaneamente.", "Uma GAN com discriminador textual.", "a", "CLIP é tipicamente descrito como um dual encoder com comparação final por similaridade."),
    q("q3", "O que faz o treinamento contrastivo em CLIP?", "Aproxima pares imagem-texto corretos e afasta pares incorretos.", "Treina um classificador supervisionado para cada palavra do vocabulário.", "Remove a necessidade de embeddings vetoriais.", "a", "O contraste organiza a geometria do espaço compartilhado pela pressão entre positivos e negativos."),
    q("q4", "Para que serve a temperatura no objetivo contrastivo?", "Controlar a nitidez da distribuição de similaridades no softmax.", "Aumentar a resolução das imagens do batch.", "Criar novos pares sintéticos automaticamente.", "a", "Temperatura mais baixa deixa a competição mais afiada; mais alta suaviza as diferenças."),
    q("q5", "Como CLIP faz classificação zero-shot?", "Comparando o embedding da imagem com embeddings de prompts textuais que descrevem as classes.", "Treinando um novo classificador supervisionado para cada tarefa.", "Usando apenas o discriminador textual em inferência.", "a", "A linguagem funciona como catálogo de classes aberto e comparável ao embedding visual."),
    q("q6", "Por que o template do prompt pode importar?", "Porque a formulação textual altera o embedding e pode mudar a similaridade com a imagem.", "Porque CLIP só aceita classes com exatamente o mesmo número de palavras.", "Porque prompts longos sempre quebram o encoder visual.", "a", "A forma linguística influencia a posição vetorial do conceito textual."),
    q("q7", "Qual é uma limitação importante do CLIP?", "Ele é menos confiável em detalhes finos como contagem precisa e OCR detalhado.", "Ele não consegue comparar texto e imagem no mesmo espaço.", "Ele só funciona com datasets pequenos e rotulados manualmente.", "a", "CLIP é muito forte em semântica global, mas não resolve sozinho percepção detalhada."),
    q("q8", "Por que CLIP foi historicamente influente?", "Porque transformou linguagem natural em supervisão visual ampla e transferível.", "Porque foi o primeiro modelo a usar embeddings vetoriais.", "Porque eliminou completamente os vieses de dados da internet.", "a", "Seu impacto vem da flexibilidade zero-shot e do novo paradigma de alinhamento visão-linguagem em escala."),
  ],
  glossary: [
    g("CLIP", "Modelo de alinhamento texto-imagem treinado contrastivamente em larga escala."),
    g("Dual encoder", "Arquitetura com um encoder por modalidade e comparação em espaço compartilhado."),
    g("Aprendizado contrastivo", "Treino que aproxima pares corretos e afasta pares incorretos."),
    g("Embedding compartilhado", "Espaço vetorial onde texto e imagem podem ser comparados diretamente."),
    g("Temperatura", "Parâmetro que controla a nitidez do softmax na comparação contrastiva."),
    g("Zero-shot", "Capacidade de executar uma tarefa em novas classes sem fine-tuning supervisionado específico."),
    g("Prompt", "Formulação textual usada para descrever classes ou conceitos na inferência."),
    g("Retrieval cruzado", "Busca entre modalidades, como texto recuperando imagens."),
    g("Similaridade coseno", "Métrica comum para comparar embeddings por alinhamento angular."),
    g("ALIGN", "Modelo relacionado ao CLIP focado em escala com supervisão textual ruidosa."),
    g("Grounding semântico", "Conexão entre expressão linguística e evidência visual correspondente."),
    g("Prompt ensembling", "Uso de múltiplos templates textuais para robustecer inferência zero-shot."),
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
