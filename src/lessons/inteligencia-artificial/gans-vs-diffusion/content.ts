import type { LessonContent } from "../../../types/content";

export const gansVsDiffusionContent: LessonContent = {
  id: "gans-vs-diffusion",
  title: "GANs vs Diffusion",
  subtitle:
    "Duas filosofias para gerar imagens convincentes: uma baseada em jogo adversarial, outra em refinamento iterativo por remoção de ruído.",
  description:
    "Uma aula comparativa sobre GANs e diffusion models, contrastando objetivo de treino, estabilidade, diversidade, velocidade, controllability e aplicações práticas.",
  primaryCategoryId: "inteligencia-artificial",
  secondaryCategoryId: "computacao",
  level: "Intermediário",
  estimatedTime: "45-55 min",
  tags: [
    "GANs",
    "Diffusion Models",
    "Generative AI",
    "Mode Collapse",
    "DDPM",
    "StyleGAN",
    "WGAN",
  ],
  learningObjectives: [
    "Entender a ideia central de GANs como jogo entre gerador e discriminador.",
    "Explicar por que GANs podem gerar imagens muito nítidas mas sofrer com instabilidade e mode collapse.",
    "Comparar a filosofia de treinamento das GANs com a de diffusion models.",
    "Relacionar qualidade visual, diversidade, velocidade de amostragem e controle condicional nas duas famílias.",
    "Entender por que diffusion ganhou espaço em texto-imagem, mas GANs ainda seguem úteis em alguns regimes.",
    "Avaliar trade-offs de engenharia em vez de tratar uma família como universalmente superior.",
  ],
  prerequisites: [
    "Noções básicas de modelos generativos.",
    "Familiaridade geral com redes neurais.",
    "Interesse em geração de imagem e seus trade-offs práticos.",
  ],
  references: [
    {
      title: "Generative Adversarial Nets",
      source: "Goodfellow et al., 2014 — arXiv/NeurIPS",
      url: "https://arxiv.org/abs/1406.2661",
      note:
        "Paper seminal das GANs, introduzindo o jogo minimax entre gerador e discriminador.",
    },
    {
      title: "Generative Adversarial Nets",
      source: "NeurIPS 2014 Proceedings",
      url: "https://proceedings.neurips.cc/paper_files/paper/2014/file/f033ed80deb0234979a61f95710dbe25-Paper.pdf",
      note:
        "Versão publicada do artigo original de GANs, útil para leitura formal do objetivo adversarial.",
    },
    {
      title: "Improved Training of Wasserstein GANs",
      source: "Gulrajani et al., 2017 — arXiv",
      url: "https://arxiv.org/abs/1704.00028",
      note:
        "Importante para entender tentativas de estabilização do treino de GANs.",
    },
    {
      title: "A Style-Based Generator Architecture for Generative Adversarial Networks",
      source: "Karras et al., 2018 — arXiv/CVPR 2019",
      url: "https://arxiv.org/abs/1812.04948",
      note:
        "Referência clássica do amadurecimento das GANs em qualidade e controle de estilo.",
    },
    {
      title: "Denoising Diffusion Probabilistic Models",
      source: "Ho, Jain e Abbeel, 2020 — arXiv",
      url: "https://arxiv.org/abs/2006.11239",
      note:
        "Paper seminal da onda moderna de diffusion models, essencial para a comparação.",
    },
    {
      title: "High-Resolution Image Synthesis with Latent Diffusion Models",
      source: "Rombach et al., 2021 — arXiv",
      url: "https://arxiv.org/abs/2112.10752",
      note:
        "Mostra o caminho que tornou diffusion particularmente forte em texto-imagem de alta resolução.",
    },
    {
      title: "Diffusers Documentation",
      source: "Hugging Face — documentação oficial",
      url: "https://huggingface.co/docs/diffusers/index",
      note:
        "Referência aplicada para entender práticas correntes com diffusion em produção e pesquisa.",
    },
  ],
  heroVisual: "hero",
  openingText:
    "Durante anos, GANs foram o símbolo mais vistoso da geração visual moderna: imagens nítidas, rostos impressionantes e uma sensação de que o modelo 'aprendeu a sonhar'. Mas elas vinham com um custo famoso: treinos temperamentais, sensibilidade a hiperparâmetros e o temido mode collapse. Diffusion models surgiram com uma filosofia quase oposta. Em vez de um duelo entre duas redes, propõem uma cadeia iterativa de denoising muito mais estável. Comparar GANs e diffusion não é apenas comparar arquitetura; é comparar duas maneiras diferentes de transformar distribuição de dados em imagens plausíveis.",
  quickFacts: [
    {
      title: "GAN é jogo adversarial",
      body:
        "O gerador tenta enganar o discriminador; o discriminador tenta distinguir real de falso.",
    },
    {
      title: "Diffusion é refinamento",
      body:
        "O modelo remove ruído em várias etapas até chegar a uma amostra coerente.",
    },
    {
      title: "GAN costuma gerar rápido",
      body:
        "Após treinada, a amostragem pode ser quase instantânea, em contraste com a natureza iterativa da difusão.",
    },
    {
      title: "Diffusion costuma treinar mais estável",
      body:
        "A ausência do jogo adversarial evita várias das tensões dinâmicas clássicas das GANs.",
    },
  ],
  sections: [
    s(
      "motivacao",
      "Ponto de partida",
      "Duas filosofias generativas para o mesmo sonho: produzir amostras convincentes",
      "GANs e diffusion querem modelar a distribuição dos dados, mas fazem isso por caminhos conceituais muito diferentes.",
      "hero",
      undefined,
      [
        "Ambas as famílias tentam responder a mesma pergunta: como gerar novas amostras que pareçam vir do mesmo mundo dos dados de treino? A diferença está em como o modelo recebe sinal de aprendizagem e em que tipo de subproblema ele resolve durante o treino.",
        "GANs atacam a tarefa com competição. Diffusion models atacam com refinamento iterativo. Uma família aprende por um duelo de distribuição; a outra aprende por um caminho explícito de destruição e reconstrução.",
        "Essa diferença muda praticamente tudo: estabilidade, custo de amostragem, diversidade, sensibilidade a hiperparâmetros, facilidade de condicionamento e experiência de uso em aplicações reais.",
      ],
      [
        {
          type: "insight",
          title: "Mesmo objetivo, geometrias de aprendizado diferentes",
          body:
            "A comparação mais importante não é só visual; é dinâmica. Como o gradiente chega ao gerador? Quão estável é esse caminho? Quanto custa gerar depois?",
        },
      ],
    ),
    s(
      "gans",
      "GANs",
      "A lógica adversarial: um gerador cria, um discriminador julga",
      "GANs modelam geração como um jogo em que o gerador aprende a produzir amostras indistinguíveis das reais.",
      "concept",
      "adversarial-balance-lab",
      [
        "No paper original de Goodfellow et al., o gerador transforma ruído latente em amostras. O discriminador recebe amostras reais e geradas e tenta dizer de onde cada uma veio. O gerador, por sua vez, melhora ao enganar o discriminador cada vez melhor.",
        "A beleza da ideia está em evitar a necessidade de explicitar uma função de probabilidade sobre os pixels. Em vez de dizer diretamente 'esta imagem é boa porque maximiza tal likelihood', a GAN aprende por confronto: amostras melhores são aquelas que passam pelo crivo do juiz adversarial.",
        "Isso produziu imagens visualmente impressionantes e deu origem a linhas importantes como StyleGAN. Mas também tornou o treinamento uma dança delicada entre duas redes que podem desequilibrar-se facilmente.",
      ],
      [
        {
          type: "definition",
          title: "GAN",
          body:
            "Modelo generativo adversarial composto por um gerador e um discriminador treinados em competição.",
        },
        {
          type: "formula",
          title: "Jogo minimax clássico",
          body:
            "O gerador tenta minimizar a capacidade do discriminador de separar amostras reais e sintéticas.",
          formula: "min_G max_D E[log D(x)] + E[log(1 - D(G(z)))]",
        },
      ],
    ),
    s(
      "instabilidade",
      "Limite clássico",
      "Por que GANs podem ser brilhantes e temperamentais ao mesmo tempo",
      "A qualidade visual das GANs veio acompanhada de dificuldades reais de treinamento.",
      "tradeoff",
      "adversarial-balance-lab",
      [
        "Se o discriminador fica forte demais cedo, o gerador recebe gradientes pouco úteis. Se o gerador encontra um atalho para enganar o discriminador repetindo poucos padrões, surge mode collapse: ele aprende a produzir amostras convincentes, mas pouco diversas.",
        "Essa fragilidade gerou uma longa linha de pesquisa em estabilização: Wasserstein GAN, gradient penalty, arquiteturas melhores, normalizações e truques de schedule. O fato de existirem tantas correções já diz algo importante sobre a natureza delicada do jogo adversarial.",
        "Em resumo, GANs podem atingir nitidez impressionante, mas frequentemente exigem mais cuidado de engenharia para chegar lá sem colapsar ou oscilar.",
      ],
      [
        {
          type: "definition",
          title: "Mode collapse",
          body:
            "Fenômeno em que o gerador cobre apenas parte da diversidade real dos dados, repetindo alguns padrões que enganam bem o discriminador.",
        },
        {
          type: "mistake",
          title: "Boa amostra isolada não prova boa distribuição",
          body:
            "Uma GAN pode gerar imagens lindas e ainda assim ignorar modos inteiros da distribuição de treino.",
        },
      ],
    ),
    s(
      "diffusion",
      "Diffusion",
      "A filosofia oposta: aprender a limpar ruído em vez de vencer um adversário",
      "Diffusion models removem o duelo e o substituem por um processo iterativo supervisionado de denoising.",
      "pipeline",
      "family-comparison-scenarios",
      [
        "Em difusão, o modelo não precisa convencer um juiz externo. Ele recebe exemplos corrompidos por um processo conhecido e aprende como voltar um pequeno passo em direção ao dado. Isso fornece um alvo de treino mais estável e menos indireto.",
        "O custo é que gerar deixa de ser um único passe da rede e passa a exigir várias iterações. Ainda assim, a robustez desse esquema o tornou extremamente competitivo, especialmente em geração condicionada por texto.",
        "A comparação importante é esta: GANs tentam aprender a fronteira do que parece real; diffusion tenta aprender a trajetória de volta ao real a partir do ruído. As duas perspectivas produzem comportamentos muito diferentes em prática.",
      ],
      [
        {
          type: "insight",
          title: "Difusão troca instabilidade por iteração",
          body:
            "A família ganhou terreno porque muitos laboratórios preferem pagar com passos extras de amostragem do que com treino adversarial frágil.",
        },
      ],
    ),
    s(
      "qualidade-diversidade",
      "Comparação",
      "Nitidez, cobertura e diversidade não se distribuem da mesma forma nas duas famílias",
      "GANs ficaram famosas pela nitidez; diffusion ganhou fama pela combinação entre qualidade alta e cobertura mais confiável.",
      "comparison",
      "mode-coverage-lab",
      [
        "Historicamente, GANs produziram imagens muito sharp e agradáveis ao olho humano, especialmente em domínios como rostos. Porém, cobertura de distribuição sempre foi um ponto delicado. O gerador podia preferir alguns modos visualmente fortes e ignorar outros.",
        "Diffusion, por sua estrutura, costuma cobrir melhor a variedade dos dados, ainda que o comportamento dependa de treinamento, sampler e guidance. Em muitos cenários texto-imagem, isso ajudou a produzir saídas diversas sem depender de um equilíbrio adversarial instável.",
        "Isso não significa que diffusion venceu em todos os aspectos. A leitura honesta é: GANs brilharam em qualidade perceptual rápida; diffusion se destacou por estabilidade e ampla adoção em geração condicionada complexa.",
      ],
      [
        {
          type: "insight",
          title: "Qualidade visual e cobertura não são sinônimos",
          body:
            "Uma família pode parecer melhor em amostras selecionadas e pior na diversidade global da distribuição.",
        },
      ],
    ),
    s(
      "velocidade",
      "Custo prático",
      "Depois de treinadas, GANs costumam gerar mais rápido; diffusion costuma amostrar mais devagar",
      "A experiência de uso em produto também depende de latência, não só de qualidade final.",
      undefined,
      "family-comparison-scenarios",
      [
        "Uma GAN geralmente produz uma imagem com uma única passagem do gerador. Isso é operacionalmente muito atraente. Já diffusion frequentemente requer dezenas de passos, mesmo com samplers eficientes e latentes comprimidos.",
        "Essa diferença ajuda a explicar por que GANs continuaram relevantes por mais tempo em alguns cenários embarcados ou interativos, enquanto diffusion dominou quando estabilidade, qualidade e condicionamento ficaram mais valiosos do que latência bruta.",
        "No fim, a pergunta prática não é 'qual é superior em abstrato?', e sim 'qual família otimiza melhor o gargalo da minha aplicação?'.",
      ],
      [
        {
          type: "example",
          title: "Interface criativa interativa",
          body:
            "Se o usuário espera respostas visuais imediatas, a latência de amostragem muda completamente a experiência percebida do sistema.",
        },
      ],
    ),
    s(
      "controle",
      "Condicionamento",
      "Prompt, estilo e edição: por que diffusion ganhou tanta força em texto-imagem",
      "Modelos de difusão encaixaram muito bem com guidance e condicionamentos ricos.",
      undefined,
      "family-comparison-scenarios",
      [
        "A natureza iterativa da difusão facilita incorporar condições variadas ao longo do processo: texto, máscara, imagem de referência, mapa de profundidade, bordas e outras pistas. Isso tornou a família extremamente versátil para pipelines de criação e edição.",
        "GANs também têm técnicas condicionais poderosas, mas o casamento entre difusão e guidance mostrou-se particularmente fértil para gerar imagens alinhadas a prompts complexos e para editar partes da amostra mantendo contexto.",
        "Essa diferença ajudou diffusion a ocupar o centro da geração multimodal recente. A questão não é apenas fazer imagens bonitas, mas fazer imagens obedientes a comandos variados.",
      ],
      [
        {
          type: "insight",
          title: "Versatilidade virou diferencial estratégico",
          body:
            "No ecossistema recente, a capacidade de combinar texto, máscara, estilo e estrutura pesou tanto quanto a qualidade visual pura.",
        },
      ],
    ),
    s(
      "engenharia",
      "Engenharia",
      "Escolher entre GAN e diffusion é escolher qual dor você aceita",
      "Uma família costuma cobrar mais no treino; a outra costuma cobrar mais na inferência.",
      "checklist",
      undefined,
      [
        "GANs frequentemente exigem mais delicadeza de otimização e monitoramento de colapso. Diffusion frequentemente exige mais orçamento de inferência e mais atenção a sampler, guidance e aceleração de passos.",
        "Além disso, o ecossistema importa. Hoje há uma enorme infraestrutura aberta e industrial em torno de diffusion, especialmente em texto-imagem e edição. Isso reduz custo de adoção em vários projetos.",
        "Por outro lado, se a tarefa pede geração muito rápida em um domínio restrito e bem controlado, GANs ainda podem ser uma escolha racional. Engenharia boa não segue moda; escolhe o instrumento certo para o objetivo certo.",
      ],
      [
        {
          type: "mistake",
          title: "Escolha por hype, não por gargalo",
          body:
            "Usar diffusion porque é a família dominante do momento pode ser desperdício se a aplicação precisa de latência mínima e domínio restrito.",
        },
      ],
    ),
    s(
      "onde-cada-uma-brilha",
      "Síntese comparativa",
      "Quando cada família tende a fazer mais sentido",
      "As melhores decisões surgem quando trocamos slogans por critérios claros de uso.",
      undefined,
      "mode-coverage-lab",
      [
        "GANs seguem interessantes quando velocidade de amostragem, estilo visual específico e domínio relativamente fechado importam muito. Elas têm uma história forte em geração de rostos, upscaling perceptual e cenários onde amostras isoladas de alta nitidez bastam.",
        "Diffusion brilha quando qualidade ampla, estabilidade de treino, diversidade e condicionamento rico importam mais. É por isso que se tornou base natural para texto-imagem, edição guiada, inpainting e vários fluxos criativos recentes.",
        "A conclusão madura não é que uma matou a outra, mas que diffusion se tornou a escolha dominante em vários regimes centrais da geração moderna, enquanto GANs permanecem como ferramenta valiosa em nichos onde seus pontos fortes ainda pesam bastante.",
      ],
      [
        {
          type: "example",
          title: "Domínio restrito vs criação aberta",
          body:
            "Gerar variações rápidas de um tipo visual específico é diferente de obedecer a prompts abertos e editáveis sobre inúmeras cenas possíveis.",
        },
      ],
    ),
    s(
      "resumo",
      "Resumo",
      "O que precisa ficar na memória sobre GANs e diffusion",
      "Consolide a diferença entre jogo adversarial e refinamento iterativo antes do quiz.",
      undefined,
      "summary-cards",
      [
        "Revise o contraste entre treino, amostragem, diversidade e controle.",
      ],
      [],
    ),
    s(
      "quiz",
      "Revisão",
      "Quiz de revisão",
      "Teste se você sabe comparar as duas famílias sem simplificações enganosas.",
      undefined,
      "quiz",
      [
        "O foco é raciocinar sobre trade-offs, não decorar slogans.",
      ],
      [],
    ),
    s(
      "glossario",
      "Glossário",
      "Termos essenciais",
      "Feche a aula consolidando o vocabulário das duas grandes famílias gerativas.",
      undefined,
      "glossary",
      [
        "Esse glossário ajuda a navegar papers, debates e implementações práticas.",
      ],
      [],
    ),
  ],
  summaryCards: [
    { title: "GANs aprendem por jogo adversarial", body: "Gerador e discriminador evoluem em competição, o que pode produzir amostras nítidas, mas também instabilidade." },
    { title: "Diffusion aprende por denoising", body: "A geração nasce de um processo iterativo de remoção de ruído, tipicamente mais estável no treino." },
    { title: "GAN pode gerar muito rápido", body: "Após treinado, o gerador frequentemente basta para produzir amostras em uma única passagem." },
    { title: "Diffusion costuma cobrir melhor a distribuição", body: "A família ganhou reputação melhor em diversidade e estabilidade, especialmente em regimes condicionados." },
    { title: "Controle virou vantagem central da difusão", body: "Prompt, máscara, imagem-guia e edição se encaixaram muito bem com guidance e samplers." },
    { title: "A escolha depende do gargalo", body: "Treino frágil vs inferência lenta: a decisão prática é sobre qual custo a aplicação aceita." },
  ],
  quiz: [
    q("q1", "Qual é a estrutura básica de uma GAN?", "Gerador e discriminador treinados em competição.", "Um autoencoder e um tokenizer.", "Dois samplers de ruído encadeados.", "a", "A GAN clássica é um jogo entre uma rede que gera e outra que julga real vs falso."),
    q("q2", "O que é mode collapse?", "Quando o gerador cobre poucos modos da distribuição e repete padrões.", "Quando o discriminador esquece a classe do objeto.", "Quando a agenda de ruído fica muito longa.", "a", "Mode collapse é uma fragilidade famosa das GANs: boas amostras isoladas, pouca diversidade global."),
    q("q3", "Qual é a ideia central dos diffusion models?", "Aprender a reverter um processo gradual de adição de ruído.", "Treinar duas redes em jogo minimax.", "Gerar tudo de uma única vez sem passos intermediários.", "a", "Diffusion substitui competição adversarial por refinamento iterativo de denoising."),
    q("q4", "Qual vantagem prática costuma favorecer GANs após o treino?", "Amostragem rápida com uma única passagem do gerador.", "Cobertura garantida de todos os modos da distribuição.", "Treino universalmente estável em qualquer regime.", "a", "Em muitos casos, GANs geram rápido. O desafio costuma estar mais no treino do que na inferência."),
    q("q5", "Por que diffusion ganhou força em texto-imagem?", "Porque combina bem estabilidade de treino com condicionamento rico via guidance.", "Porque não precisa de dados rotulados nem texto de treino.", "Porque gera sempre mais rápido que qualquer GAN.", "a", "A combinação entre difusão, guidance e condicionamento multimodal tornou essa família muito versátil."),
    q("q6", "Qual comparação é mais honesta sobre diversidade?", "GANs podem ser excelentes visualmente, mas diffusion costuma ter reputação melhor em cobertura e estabilidade.", "GANs sempre vencem diffusion em todos os cenários.", "Diffusion nunca sofre trade-offs de diversidade.", "a", "A força visual de GANs não elimina seus riscos de colapso e cobertura parcial da distribuição."),
    q("q7", "Qual é um trade-off central ao escolher diffusion?", "Aceitar mais custo iterativo de inferência em troca de estabilidade e controle.", "Abrir mão total de condicionamento por texto.", "Perder qualquer possibilidade de edição local.", "a", "A difusão costuma cobrar com latência o que economiza em instabilidade adversarial."),
    q("q8", "Em que situação GAN ainda pode ser uma escolha razoável?", "Quando latência muito baixa em um domínio restrito pesa mais que flexibilidade ampla de condicionamento.", "Quando precisamos do maior número possível de passos iterativos.", "Quando o projeto depende de noise schedule complexo.", "a", "A escolha certa depende do objetivo do sistema, não apenas da família mais popular do momento."),
  ],
  glossary: [
    g("GAN", "Modelo generativo adversarial com gerador e discriminador."),
    g("Gerador", "Rede que transforma ruído latente em amostras sintéticas."),
    g("Discriminador", "Rede que tenta distinguir amostras reais de geradas."),
    g("Mode collapse", "Redução da diversidade gerada a poucos modos da distribuição."),
    g("WGAN", "Família de GAN que usa distância Wasserstein para melhorar a estabilidade."),
    g("StyleGAN", "Arquitetura de GAN conhecida por alta qualidade e controle de estilo."),
    g("Diffusion model", "Modelo que aprende a reverter uma cadeia de adição de ruído."),
    g("DDPM", "Formulação moderna seminal de diffusion probabilistic model."),
    g("Guidance", "Mecanismo que empurra a geração condicionada em direção a um objetivo, como um prompt."),
    g("Latent diffusion", "Difusão realizada em um espaço comprimido aprendido por autoencoder."),
    g("Amostragem", "Procedimento de inferência que produz uma nova amostra a partir do modelo."),
    g("Distribuição dos dados", "Conjunto de regularidades estatísticas que define como as amostras reais se organizam."),
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
