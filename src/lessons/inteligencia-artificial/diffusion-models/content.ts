import type { LessonContent } from "../../../types/content";

export const diffusionModelsContent: LessonContent = {
  id: "diffusion-models",
  title: "Diffusion Models",
  subtitle:
    "Como um modelo aprende a desfazer ruído passo a passo até transformar uma distribuição caótica em imagens coerentes, detalhadas e controláveis.",
  description:
    "Uma aula avançada sobre forward process, reverse process, DDPM, predição de ruído, guidance, samplers e latent diffusion como base dos modelos generativos visuais modernos.",
  primaryCategoryId: "inteligencia-artificial",
  secondaryCategoryId: "computacao",
  level: "Avançado",
  estimatedTime: "55-70 min",
  tags: [
    "Diffusion Models",
    "DDPM",
    "Generative AI",
    "Denoising",
    "Latent Diffusion",
    "Guidance",
    "Deep Learning",
  ],
  learningObjectives: [
    "Entender a intuição do processo de difusão direta como destruição gradual de sinal.",
    "Explicar por que o problema generativo vira aprender a inverter um processo de adição de ruído.",
    "Ler a arquitetura conceitual do DDPM como predição iterativa de ruído em vários timesteps.",
    "Compreender o papel da agenda de ruído e do trade-off entre detalhe, estabilidade e custo computacional.",
    "Explicar por que muitos modelos são treinados para prever epsilon em vez da imagem final diretamente.",
    "Diferenciar amostradores como DDPM e DDIM em termos de custo, fidelidade e número de passos.",
    "Entender guidance como mecanismo para puxar a geração em direção a prompts ou condições desejadas.",
    "Relacionar latent diffusion à viabilidade prática de gerar imagens de alta resolução com custo menor.",
  ],
  prerequisites: [
    "Noções de probabilidade e ruído gaussiano ajudam.",
    "Familiaridade básica com redes neurais e modelos generativos.",
    "Interesse em geração de imagem e modelos texto-imagem.",
  ],
  references: [
    {
      title: "Denoising Diffusion Probabilistic Models",
      source: "Ho, Jain e Abbeel, 2020 — arXiv/NeurIPS",
      url: "https://arxiv.org/abs/2006.11239",
      note:
        "Paper seminal do DDPM, ponto de partida moderno para diffusion models de alta qualidade.",
    },
    {
      title: "Denoising Diffusion Probabilistic Models",
      source: "NeurIPS 2020 Proceedings",
      url: "https://proceedings.neurips.cc/paper/2020/file/4c5bcfec8584af0d967f1ab10179ca4b-Paper.pdf",
      note:
        "Versão publicada do trabalho de DDPM, útil para leitura formal do método e dos experimentos.",
    },
    {
      title: "DDPM Project Page",
      source: "Jonathan Ho — página oficial do projeto",
      url: "https://hojonathanho.github.io/diffusion/",
      note:
        "Página oficial com visualizações e explicações complementares do paper original.",
    },
    {
      title: "Denoising Diffusion Implicit Models",
      source: "Song, Meng e Ermon, 2020 — arXiv",
      url: "https://arxiv.org/abs/2010.02502",
      note:
        "Introduz DDIM, importante para entender amostragem mais rápida e trajetórias não-Markovianas.",
    },
    {
      title: "Score-Based Generative Modeling through Stochastic Differential Equations",
      source: "Song et al., 2021 — arXiv/ICLR",
      url: "https://arxiv.org/abs/2011.13456",
      note:
        "Conecta difusão, score matching e SDEs, oferecendo uma visão matemática mais unificada do campo.",
    },
    {
      title: "High-Resolution Image Synthesis with Latent Diffusion Models",
      source: "Rombach et al., 2021 — arXiv/CVPR 2022",
      url: "https://arxiv.org/abs/2112.10752",
      note:
        "Paper do latent diffusion, central para entender a família de modelos por trás do Stable Diffusion.",
    },
    {
      title: "Diffusers Documentation",
      source: "Hugging Face — documentação oficial",
      url: "https://huggingface.co/docs/diffusers/index",
      note:
        "Referência aplicada sobre schedulers, pipelines, guidance e implementação prática de diffusion models.",
    },
  ],
  heroVisual: "hero",
  openingText:
    "Se você quisesse ensinar uma máquina a gerar imagens do zero, poderia tentar pedir que ela pintasse a cena inteira de uma vez. Foi assim que muitos sistemas antigos pensaram o problema. Diffusion models adotam um raciocínio diferente: em vez de começar pela criação, começam pela destruição. Pegam uma imagem real e a corrompem gradualmente com ruído até que tudo vire quase puro caos. Depois treinam uma rede para aprender o caminho inverso: a cada passo, remover um pouco de ruído e recuperar estrutura. O resultado é uma forma surpreendentemente estável de geração, baseada em refinar hipóteses sucessivas em vez de acertar tudo num único golpe.",
  quickFacts: [
    {
      title: "Geração como inversão",
      body:
        "O modelo aprende a desfazer um processo conhecido de degradação em vez de tentar modelar diretamente pixels finais de uma só vez.",
    },
    {
      title: "Ruído é professor",
      body:
        "Ao adicionar ruído de forma controlada, criamos um alvo de treino claro: estimar como voltar um pequeno passo em direção ao dado.",
    },
    {
      title: "Amostragem custa passos",
      body:
        "A alta qualidade costuma vir com custo iterativo: gerar exige várias etapas de denoising.",
    },
    {
      title: "Latentes reduziram custo",
      body:
        "Mover a difusão para um espaço comprimido tornou viável gerar imagens grandes com hardware mais acessível.",
    },
  ],
  sections: [
    s(
      "motivacao",
      "Ponto de partida",
      "Por que diffusion models mudaram o jogo da geração visual",
      "A grande virada foi tratar geração como refinamento gradual em vez de síntese instantânea.",
      "hero",
      undefined,
      [
        "Modelos generativos de imagem sempre precisaram equilibrar três coisas difíceis: qualidade visual, diversidade e estabilidade de treino. Muitas abordagens conseguiam duas delas, mas sofriam na terceira. Diffusion models ganharam tração porque oferecem um caminho mais estável para aprender distribuições visuais complexas.",
        "A intuição central é quase anti-intuitiva: destruir imagens é fácil e bem definido; reconstruí-las é difícil, mas pode ser aprendido passo a passo. Em vez de pedir à rede que adivinhe uma imagem inteira do zero, pedimos que ela resolva um subproblema repetido muitas vezes: remover um pouco de ruído condicionalmente ao estado atual.",
        "Essa decomposição transforma um desafio enorme e global em muitos desafios locais mais controláveis. O preço é o custo de amostragem iterativa. O benefício é uma dinâmica de treino muito mais amigável do que várias alternativas históricas.",
      ],
      [
        {
          type: "definition",
          title: "Diffusion model",
          body:
            "Modelo generativo que aprende a reverter um processo gradual de adição de ruído para sintetizar amostras que seguem a distribuição dos dados.",
        },
        {
          type: "insight",
          title: "Destruir primeiro foi um atalho conceitual",
          body:
            "Quando o processo de corrupção é conhecido, a geração deixa de ser um mistério absoluto e vira um problema de inversão aprendível.",
        },
      ],
    ),
    s(
      "forward-process",
      "Processo direto",
      "Forward process: como transformar uma imagem em quase puro ruído",
      "A difusão direta é uma cadeia conhecida que vai apagando sinal aos poucos.",
      "pipeline",
      "noise-schedule-lab",
      [
        "No forward process, partimos de uma imagem real e adicionamos pequenas quantidades de ruído gaussiano ao longo de muitos timesteps. Nenhum passo isolado destrói a imagem completamente; a destruição emerge da repetição acumulada.",
        "Essa gradualidade importa. Se adicionássemos ruído demais de uma vez, o problema inverso ficaria bruto e difícil. Ao espalhar a corrupção em muitos passos, criamos estados intermediários onde parte da estrutura ainda está visível, e é justamente nesses estados que o modelo aprende melhor a apontar a direção de retorno.",
        "A agenda de ruído controla quanto sinal é preservado em cada etapa. É uma decisão de projeto importante porque afeta a dificuldade do treinamento, o comportamento da amostragem e o equilíbrio entre detalhe fino e robustez global.",
      ],
      [
        {
          type: "definition",
          title: "Forward process",
          body:
            "Cadeia de corrupção conhecida que adiciona ruído progressivamente aos dados até aproximá-los de uma distribuição simples, geralmente gaussiana.",
        },
        {
          type: "mistake",
          title: "Não é ruído aleatório sem controle",
          body:
            "A difusão direta não é um caos arbitrário. Ela segue uma agenda matemática cuidadosamente definida para que o problema inverso seja treinável.",
        },
      ],
    ),
    s(
      "reverse-process",
      "Processo inverso",
      "Reverse process: aprender a desfazer o ruído um passo de cada vez",
      "Gerar com difusão é iterar uma operação local de limpeza até sair de um ruído inicial e chegar a uma amostra plausível.",
      "concept",
      "reverse-process-lab",
      [
        "Na geração, começamos de uma amostra de ruído e aplicamos uma rede neural repetidamente. A cada timestep, ela estima que parte daquele estado é ruído e qual direção nos move de volta para a manifold dos dados.",
        "O aspecto importante é que a rede não resolve tudo de uma vez. Ela recebe o estado atual e o índice temporal, e produz uma correção local. Isso faz o processo lembrar restauração progressiva: primeiro surgem estruturas grosseiras, depois contornos, depois textura e detalhe.",
        "Esse desenho também torna a amostragem interpretável em nível intuitivo. Cada passo reduz incerteza e recupera coerência. Se o processo desvia, erros se acumulam; se ele acerta consistentemente pequenas correções, a imagem final emerge de forma estável.",
      ],
      [
        {
          type: "definition",
          title: "Reverse process",
          body:
            "Cadeia aprendida que tenta inverter o processo de difusão direta, removendo ruído de maneira iterativa até produzir uma amostra realista.",
        },
        {
          type: "example",
          title: "Coerência cresce por camadas",
          body:
            "Em modelos texto-imagem, formas largas e composição global tendem a aparecer antes; detalhes finos e textura surgem em etapas posteriores.",
        },
      ],
    ),
    s(
      "objetivo-epsilon",
      "Objetivo de treino",
      "Por que tantos modelos aprendem a prever o ruído epsilon",
      "Em muitos DDPMs, a rede não prevê diretamente a imagem final, mas o componente de ruído presente no estado atual.",
      undefined,
      "reverse-process-lab",
      [
        "Uma escolha elegante do DDPM é treinar a rede para prever o ruído que foi adicionado à imagem em determinado timestep. Isso simplifica o objetivo: em vez de 'qual é a imagem correta?', perguntamos 'qual parcela deste estado é ruído?'.",
        "Predizer epsilon funciona bem porque o ruído adicionado é conhecido no treino. Temos um alvo supervisionado claro para cada timestep. Além disso, reconstruir a direção de limpeza a partir desse ruído torna-se matematicamente conveniente e empiricamente estável.",
        "Em termos intuitivos, a rede aprende a dizer 'o que aqui parece pertencer ao caos e precisa sair?'. Ao remover repetidamente essa parte, o sistema volta gradualmente a uma amostra coerente.",
      ],
      [
        {
          type: "insight",
          title: "Ruído conhecido vira supervisão forte",
          body:
            "A difusão cria seu próprio alvo de treino: sabemos exatamente quanto ruído foi injetado em cada exemplo e em cada passo.",
        },
        {
          type: "mistake",
          title: "Prever ruído não é desviar do problema",
          body:
            "É uma reparametrização útil do problema generativo. A imagem final ainda emerge, mas por um caminho supervisionado mais estável.",
        },
      ],
    ),
    s(
      "agenda-ruido",
      "Design",
      "A agenda de ruído decide quão difícil é cada etapa",
      "Nem todo timestep deve destruir informação na mesma intensidade; o cronograma de beta organiza essa degradação.",
      "tradeoff",
      "noise-schedule-lab",
      [
        "A agenda de ruído define quanto sinal é preservado ou corrompido em cada passo. Se o ruído cresce rápido demais, os estados intermediários perdem estrutura cedo e o modelo recebe um problema inverso mais duro. Se cresce devagar demais, a cadeia pode ficar longa e ineficiente.",
        "Essa é uma das intuições-chave para entender por que 'difusão' não é um algoritmo único, mas uma família de decisões sobre parametrização, schedule e sampler. Pequenas escolhas nesses componentes alteram bastante o comportamento final.",
        "No fundo, a agenda de ruído é uma coreografia entre destruição e reconstrução. Ela distribui o trabalho do modelo ao longo do tempo: em que momento preservar composição, quando apagar textura e como tornar cada passo localmente tratável.",
      ],
      [
        {
          type: "definition",
          title: "Noise schedule",
          body:
            "Sequência de parâmetros que controla quanto ruído é adicionado em cada timestep do processo direto.",
        },
      ],
    ),
    s(
      "samplers",
      "Amostragem",
      "DDPM, DDIM e afins: a mesma rede pode gerar por trajetórias diferentes",
      "Depois de treinar, ainda resta decidir como percorrer o caminho de volta do ruído para a imagem.",
      "comparison",
      "sampler-scenarios",
      [
        "O treino fornece uma rede que sabe como corrigir estados ruidosos, mas a rota exata de amostragem pode variar. DDPM segue uma cadeia estocástica mais fiel ao formalismo original. DDIM mostra que é possível usar trajetórias implícitas e reduzir passos sem abandonar qualidade de forma drástica em muitos casos.",
        "Essa distinção é importante porque o custo da geração depende fortemente do número de iterações. Modelos de difusão ganharam fama por alta qualidade, mas também pela latência. Melhorar o sampler é, em parte, melhorar a usabilidade do modelo.",
        "Na prática, escolher sampler é aceitar um trade-off entre fidelidade, velocidade, diversidade e estabilidade. Não existe um único caminho ótimo para todo objetivo, sobretudo quando entramos em aplicações interativas.",
      ],
      [
        {
          type: "insight",
          title: "Treino e inferência não são a mesma história",
          body:
            "Mesmo com a mesma rede treinada, diferentes schedulers e samplers mudam tempo de geração, nitidez e comportamento da amostra.",
        },
      ],
    ),
    s(
      "guidance",
      "Controle",
      "Guidance: como empurrar a geração em direção ao que queremos",
      "Difusão moderna raramente é puramente incondicional; quase sempre queremos condicionar a saída por texto, classe, máscara ou imagem de referência.",
      undefined,
      "sampler-scenarios",
      [
        "Guidance altera o campo de denoising para favorecer amostras mais compatíveis com uma condição. Em modelos texto-imagem, isso normalmente significa puxar o processo para estados mais alinhados ao prompt.",
        "Classifier-free guidance tornou-se especialmente importante porque oferece uma forma prática e poderosa de amplificar aderência ao texto sem depender de um classificador externo separado. O ganho, porém, não é gratuito: guidance excessivo pode sacrificar diversidade, introduzir artefatos ou exagerar padrões.",
        "Essa parte ensina uma lição maior sobre geração condicionada: controlar mais não significa automaticamente gerar melhor. Há sempre um equilíbrio entre fidelidade ao comando e naturalidade estatística da amostra.",
      ],
      [
        {
          type: "definition",
          title: "Guidance",
          body:
            "Mecanismo que ajusta a trajetória de amostragem para tornar a saída mais compatível com uma condição, como texto ou classe.",
        },
        {
          type: "mistake",
          title: "Mais guidance nem sempre é melhor",
          body:
            "Força excessiva pode colapsar diversidade, endurecer demais a imagem e criar artefatos visuais.",
        },
      ],
    ),
    s(
      "latent-diffusion",
      "Escala prática",
      "Latent diffusion: gerar no espaço comprimido tornou tudo mais viável",
      "Difundir diretamente em pixels de alta resolução é caro; comprimir antes e gerar depois reduziu drasticamente esse custo.",
      "comparison",
      undefined,
      [
        "O latent diffusion primeiro aprende um autoencoder que comprime a imagem em uma representação latente mais compacta. A difusão acontece nesse espaço menor, onde o modelo trabalha com menos dimensões e custo reduzido.",
        "A ideia é preservar a semântica e a estrutura global no espaço latente, deixando que o decodificador recupere detalhe de pixel no final. Isso separa dois trabalhos: o modelo de difusão organiza conteúdo visual; o autoencoder traduz entre pixel e representação comprimida.",
        "Essa engenharia foi decisiva para sistemas práticos como o Stable Diffusion. Sem ela, o custo de treinar e amostrar imagens grandes diretamente em pixels seria muito mais alto para a maioria dos usuários e laboratórios.",
      ],
      [
        {
          type: "insight",
          title: "Compressão não é só economia",
          body:
            "Ao mover a difusão para um espaço mais semântico e compacto, o modelo também se concentra menos em ruído microscópico e mais em estrutura útil.",
        },
      ],
    ),
    s(
      "avaliacao-e-limites",
      "Limitações",
      "Alta qualidade não elimina custo, vieses e fragilidades",
      "Diffusion models brilham, mas continuam presos a decisões de dados, latência e controle imperfeito.",
      "checklist",
      undefined,
      [
        "A principal limitação operacional é a latência. Gerar exige passos iterativos, e cada passo consome computação. Em aplicações interativas, esse custo pesa bastante, especialmente com alta resolução ou guidance forte.",
        "Há também limites de dados e vieses. O modelo aprende o que viu: estilos, composições, estereótipos, erros de legenda e desequilíbrios culturais podem aparecer nas amostras geradas. Melhorar o sampler não corrige isso por si só.",
        "Por fim, controle ainda é imperfeito. Mesmo com prompt, guidance, máscara e conditioning extra, a geração continua probabilística. O modelo pode acertar o espírito geral e errar detalhes específicos como contagem, texto embutido ou relações espaciais incomuns.",
      ],
      [
        {
          type: "mistake",
          title: "Confundir qualidade visual com entendimento",
          body:
            "Uma imagem bonita e coerente não prova compreensão profunda de causalidade, contagem precisa ou semântica fina.",
        },
      ],
    ),
    s(
      "aplicacoes",
      "Aplicações",
      "Onde diffusion models se tornaram especialmente fortes",
      "Imagem, edição, inpainting, super-resolução e geração condicionada se beneficiam da lógica iterativa de refinamento.",
      undefined,
      undefined,
      [
        "Amostragem texto-imagem é a aplicação mais conhecida, mas a família de difusão também aparece em inpainting, variações estilísticas, super-resolução, restauração e geração condicionada por mapas, máscaras ou esboços.",
        "O motivo é que a estrutura iterativa acomoda bem tarefas em que parte da solução já está dada. Quando o modelo recebe um contexto visual parcial, ele pode preencher o restante mantendo coerência com o que já existe.",
        "Isso reforça a ideia de que difusão não é apenas 'fazer arte com prompt'. É um paradigma mais geral de modelagem generativa por refinamento, aplicável a múltiplos domínios e modalidades.",
      ],
      [
        {
          type: "example",
          title: "Inpainting",
          body:
            "Dada uma imagem com uma região mascarada, o modelo usa o contexto restante como condição para preencher o espaço faltante de forma plausível.",
        },
      ],
    ),
    s(
      "resumo",
      "Síntese",
      "O que precisa ficar na memória sobre diffusion models",
      "Relembre a lógica de destruição controlada, inversão aprendida e amostragem iterativa.",
      undefined,
      "summary-cards",
      [
        "Faça uma revisão final antes do quiz para conectar processo direto, processo inverso, guidance e latentes.",
      ],
      [],
    ),
    s(
      "quiz",
      "Revisão",
      "Quiz de revisão",
      "Teste se você consegue explicar o DDPM sem cair em slogans vagos sobre 'desenhar com ruído'.",
      undefined,
      "quiz",
      [
        "As perguntas miram a lógica do método, não apenas siglas.",
      ],
      [],
    ),
    s(
      "glossario",
      "Glossário",
      "Termos essenciais",
      "Feche a aula consolidando o vocabulário da geração por difusão.",
      undefined,
      "glossary",
      [
        "Esse vocabulário aparece em papers, schedulers, bibliotecas e interfaces de geração modernas.",
      ],
      [],
    ),
  ],
  summaryCards: [
    {
      title: "Difusão direta destrói sinal gradualmente",
      body:
        "O forward process transforma dados em ruído por uma cadeia conhecida e controlada.",
    },
    {
      title: "Geração é o caminho inverso",
      body:
        "O modelo aprende a remover ruído passo a passo até recuperar uma amostra plausível.",
    },
    {
      title: "Predizer epsilon simplifica o treino",
      body:
        "Em vez de adivinhar a imagem final de uma vez, a rede estima o ruído presente no estado atual.",
    },
    {
      title: "Agenda de ruído importa muito",
      body:
        "O schedule distribui a dificuldade do problema ao longo dos timesteps.",
    },
    {
      title: "Sampler define custo e comportamento",
      body:
        "A mesma rede treinada pode gerar por trajetórias diferentes, como DDPM ou DDIM.",
    },
    {
      title: "Latent diffusion tornou o método viável",
      body:
        "Gerar em espaço comprimido reduziu custo e abriu caminho para sistemas amplamente usados.",
    },
  ],
  quiz: [
    q(
      "q1",
      "Qual é a ideia central de um diffusion model?",
      "Aprender a inverter um processo gradual de adição de ruído.",
      "Treinar um discriminador para separar imagens reais e falsas.",
      "Gerar todos os pixels finais em um único passo determinístico.",
      "a",
      "O coração do método é transformar geração em um problema de reversão de uma cadeia de corrupção conhecida.",
    ),
    q(
      "q2",
      "Por que o forward process é útil?",
      "Porque ele define uma forma controlada de destruir a imagem e criar estados intermediários treináveis.",
      "Porque ele melhora a resolução final automaticamente.",
      "Porque elimina a necessidade de rede neural no processo inverso.",
      "a",
      "A corrupção conhecida cria um alvo e uma trajetória para o modelo aprender a inverter.",
    ),
    q(
      "q3",
      "O que a rede costuma prever em um DDPM clássico?",
      "O ruído adicionado ao estado atual.",
      "Somente a classe semântica dominante da imagem.",
      "A imagem final completa diretamente em um passo.",
      "a",
      "Predizer epsilon cria um objetivo supervisionado claro e empiricamente estável.",
    ),
    q(
      "q4",
      "Qual é o custo operacional mais marcante da difusão?",
      "A geração iterativa em muitos passos.",
      "A impossibilidade de usar texto como condição.",
      "A incapacidade de treinar com GPUs modernas.",
      "a",
      "Diffusion models brilham em qualidade, mas frequentemente pagam isso com latência de amostragem.",
    ),
    q(
      "q5",
      "O que guidance faz?",
      "Empurra a trajetória de geração para maior aderência a uma condição, como um prompt.",
      "Remove completamente o elemento estocástico da geração.",
      "Substitui a necessidade de noise schedule.",
      "a",
      "Guidance condiciona o processo de denoising, mas excesso pode prejudicar diversidade e naturalidade.",
    ),
    q(
      "q6",
      "Por que latent diffusion foi tão importante?",
      "Porque levou a difusão para um espaço comprimido, reduzindo custo computacional.",
      "Porque dispensou qualquer tipo de autoencoder.",
      "Porque permitiu treinar sem dados visuais.",
      "a",
      "Difundir em latentes compactos tornou a geração de alta resolução muito mais prática.",
    ),
    q(
      "q7",
      "Qual comparação entre DDPM e DDIM é mais adequada?",
      "DDIM pode reduzir passos de amostragem ao mudar a trajetória de geração.",
      "DDIM elimina totalmente o processo inverso.",
      "DDPM e DDIM são apenas nomes diferentes para o mesmo sampler sem qualquer diferença prática.",
      "a",
      "DDIM mostra que trajetórias implícitas podem gerar mais rápido com trade-offs próprios.",
    ),
    q(
      "q8",
      "Qual afirmação sobre qualidade visual em difusão é correta?",
      "Imagens boas não garantem compreensão perfeita de texto, contagem ou relações espaciais incomuns.",
      "Boa qualidade visual implica entendimento semântico completo do mundo.",
      "Se a imagem ficou bonita, o viés dos dados desapareceu.",
      "a",
      "Coerência estética não resolve todos os limites de entendimento e dados do modelo.",
    ),
  ],
  glossary: [
    g("Diffusion model", "Modelo generativo que aprende a reverter um processo gradual de adição de ruído."),
    g("DDPM", "Denoising Diffusion Probabilistic Model, formulação seminal moderna de difusão."),
    g("Forward process", "Cadeia direta que corrompe os dados com ruído progressivo."),
    g("Reverse process", "Cadeia aprendida que remove ruído iterativamente."),
    g("Timestep", "Índice temporal que indica em qual estágio de ruído a amostra está."),
    g("Noise schedule", "Cronograma que define quanto ruído é adicionado em cada passo."),
    g("Epsilon", "Notação comum para o ruído que a rede aprende a prever em muitos DDPMs."),
    g("Sampler", "Procedimento usado na inferência para percorrer o caminho do ruído até a amostra."),
    g("DDIM", "Método de amostragem implícita para diffusion models com menos passos em muitos regimes."),
    g("Guidance", "Mecanismo de condicionamento que puxa a geração em direção a texto, classe ou outra pista."),
    g("Classifier-free guidance", "Estratégia prática de guidance que combina predições condicionadas e não condicionadas."),
    g("Latent diffusion", "Abordagem em que a difusão acontece em um espaço comprimido aprendido por autoencoder."),
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
