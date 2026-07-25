import type { LessonContent } from "../../../types/content";

export const ocrDocumentAiContent: LessonContent = {
  id: "ocr-document-ai",
  title: "OCR e Document AI",
  subtitle:
    "De pixels para texto e de texto para estrutura: como sistemas leem documentos, preservam layout e extraem campos úteis para automação.",
  description:
    "Uma aula intermediária sobre OCR clássico e neural, pré-processamento, ordem de leitura, layout, extração de entidades e o salto conceitual de OCR simples para Document AI.",
  primaryCategoryId: "inteligencia-artificial",
  secondaryCategoryId: "computacao",
  level: "Intermediário",
  estimatedTime: "45-60 min",
  tags: [
    "OCR",
    "Document AI",
    "Visão Computacional",
    "Layout",
    "Extração de Informação",
    "Tesseract",
    "Transformers",
  ],
  learningObjectives: [
    "Entender a diferença entre reconhecer caracteres e compreender um documento.",
    "Explicar por que binarização, recorte, contraste e deskew ainda importam no OCR moderno.",
    "Ler um pipeline de OCR como sequência de detecção, segmentação de linhas, reconhecimento e pós-processamento.",
    "Compreender por que ordem de leitura e estrutura visual são centrais em documentos reais.",
    "Distinguir OCR textual de Document AI orientado a entidades, tabelas, campos e formulários.",
    "Reconhecer o papel de modelos com layout, visão e linguagem na extração estruturada.",
    "Avaliar limites práticos como baixa resolução, ruído, manuscrito, múltiplas colunas e variação de template.",
    "Entender quando um pipeline híbrido resolve melhor que um único modelo monolítico.",
  ],
  prerequisites: [
    "Noções básicas de imagens digitais e contraste.",
    "Familiaridade geral com classificação e visão computacional.",
    "Interesse em automação de documentos, formulários ou arquivos digitalizados.",
  ],
  references: [
    {
      title: "Tesseract User Manual",
      source: "Tesseract OCR — documentação oficial",
      url: "https://tesseract-ocr.github.io/tessdoc/",
      note:
        "Documentação oficial do motor OCR Tesseract, útil para entender OCR clássico e configurações práticas.",
    },
    {
      title: "Document AI Documentation",
      source: "Google Cloud — documentação oficial",
      url: "https://cloud.google.com/document-ai/docs",
      note:
        "Referência aplicada sobre parsing de documentos, formulários, tabelas e extração estruturada em produção.",
    },
    {
      title: "LayoutLM: Pre-training of Text and Layout for Document Image Understanding",
      source: "Xu et al., 2019 — arXiv",
      url: "https://arxiv.org/abs/1912.13318",
      note:
        "Paper seminal ao incorporar texto e posição espacial para entendimento de documentos.",
    },
    {
      title: "TrOCR: Transformer-based Optical Character Recognition with Pre-trained Models",
      source: "Li et al., 2021 — arXiv",
      url: "https://arxiv.org/abs/2109.10282",
      note:
        "Mostra uma formulação moderna de OCR ponta a ponta com transformers pré-treinados.",
    },
    {
      title: "Donut: Document Understanding Transformer without OCR",
      source: "Kim et al., 2021 — arXiv",
      url: "https://arxiv.org/abs/2111.15664",
      note:
        "Explora a ideia de entendimento de documentos diretamente da imagem, sem etapa OCR explícita separada.",
    },
    {
      title: "FUNSD: A Dataset for Form Understanding in Noisy Scanned Documents",
      source: "Jaume et al., 2019 — ICDARW",
      url: "https://arxiv.org/abs/1905.13538",
      note:
        "Dataset importante para entendimento de formulários ruidosos e relações entre campos.",
    },
    {
      title: "Microsoft Azure AI Document Intelligence",
      source: "Microsoft — documentação oficial",
      url: "https://learn.microsoft.com/azure/ai-services/document-intelligence/",
      note:
        "Exemplo de plataforma industrial para OCR, layout, tabelas e extração de campos.",
    },
  ],
  heroVisual: "hero",
  openingText:
    "Ler um documento parece trivial para humanos: nossos olhos identificam linhas, agrupam palavras, pulam cabeçalhos, entendem tabelas e adivinham relações entre campos. Para uma máquina, nada disso vem pronto. Primeiro ela precisa converter tinta e ruído em caracteres; depois precisa decidir ordem de leitura; por fim precisa entender o que é título, valor monetário, assinatura, CPF, item de tabela ou campo de formulário. OCR resolve só a primeira metade da história. Document AI começa quando o texto reconhecido precisa virar estrutura útil para automação.",
  quickFacts: [
    {
      title: "OCR não é entendimento completo",
      body:
        "Reconhecer caracteres é diferente de entender que 'R$ 120,00' é um total ligado a um campo específico do documento.",
    },
    {
      title: "Pré-processamento ainda importa",
      body:
        "Inclinação, ruído, baixa resolução e contraste ruim continuam derrubando qualidade, mesmo com modelos modernos.",
    },
    {
      title: "Layout muda o significado",
      body:
        "Mesmas palavras em posições diferentes podem representar cabeçalho, corpo, rodapé, chave ou valor.",
    },
    {
      title: "Document AI adiciona estrutura",
      body:
        "A meta deixa de ser apenas texto bruto e passa a ser entidades, campos, tabelas e relações úteis.",
    },
  ],
  sections: [
    s(
      "motivacao",
      "Ponto de partida",
      "Por que documentos são um problema visual diferente de fotos comuns",
      "Um documento parece simples porque é plano, mas sua complexidade semântica está na organização espacial.",
      "hero",
      undefined,
      [
        "Em uma foto de rua, queremos encontrar objetos. Em um documento, queremos encontrar símbolos e relações. O desafio deixa de ser reconhecer um cachorro ou um carro e passa a ser ler texto pequeno, respeitar colunas, separar blocos, identificar campos e preservar associações entre pedaços espalhados na página.",
        "Documentos também são altamente artificiais: têm margens, tipografia, cabeçalhos, tabelas, carimbos, assinaturas e ruído de digitalização. Pequenos defeitos visuais podem destruir caracteres ou embaralhar a ordem de leitura, gerando erros que parecem absurdos para humanos, mas são naturais para um sistema sem noção visual robusta.",
        "Por isso, OCR e Document AI vivem no encontro entre visão computacional e processamento de linguagem. Não basta ler pixels; é preciso entender onde cada texto está e por que aquela posição importa.",
      ],
      [
        {
          type: "definition",
          title: "Document AI",
          body:
            "Conjunto de técnicas que vai além do OCR e busca extrair estrutura, entidades, tabelas, campos e relações úteis de documentos visuais.",
        },
        {
          type: "insight",
          title: "Documento é layout com significado",
          body:
            "Em muitos casos, o texto bruto é insuficiente. O valor prático está em reconstruir a estrutura visual que organizava esse texto na página.",
        },
      ],
    ),
    s(
      "ocr-basico",
      "Base",
      "OCR: transformar manchas visuais em caracteres legíveis",
      "OCR é a etapa que tenta responder quais símbolos aparecem em cada região do documento.",
      "concept",
      undefined,
      [
        "Optical Character Recognition nasceu em pipelines clássicos que segmentavam linhas, palavras e caracteres antes de classificar cada símbolo. Mesmo quando a implementação muda, a pergunta central é a mesma: qual sequência textual melhor explica esse padrão visual?",
        "Em documentos limpos, impressos e bem escaneados, OCR pode parecer fácil. O problema real começa com baixa resolução, fontes incomuns, compressão agressiva, fotografias inclinadas, sombras de celular, papel amassado ou mistura de máquina e escrita manual.",
        "Hoje há modelos neurais ponta a ponta que reconhecem palavras ou linhas inteiras sem segmentar cada caractere explicitamente. Ainda assim, a intuição básica continua útil: o sistema precisa localizar texto, ler padrões locais e reconstruir uma sequência textual coerente.",
      ],
      [
        {
          type: "definition",
          title: "OCR",
          body:
            "Técnica de conversão de texto presente em imagens ou documentos digitalizados para representação textual legível por máquina.",
        },
        {
          type: "mistake",
          title: "Achar que OCR sempre devolve texto limpo",
          body:
            "O OCR pode acertar a maior parte do conteúdo e ainda trocar símbolos críticos, quebrar acentos, perder espaçamento ou fundir linhas.",
        },
      ],
    ),
    s(
      "pre-processamento",
      "Qualidade de entrada",
      "Antes de ler, muitas vezes é preciso limpar: contraste, binarização, recorte e deskew",
      "Modelos bons sofrem quando a imagem de entrada está torta, escura ou ruidosa demais.",
      "pipeline",
      "ocr-preprocess-lab",
      [
        "Pré-processamento não é relíquia de OCR antigo. Ele continua relevante porque documentos reais chegam tortos, com sombras, ruído, baixa nitidez e fundo não uniforme. Melhorar a legibilidade visual antes do reconhecimento frequentemente custa pouco e rende muito.",
        "Binarização, ajuste de contraste, remoção de ruído, deskew e recorte de margens ajudam a estabilizar linhas de texto. Em documentos fotografados por celular, corrigir perspectiva e orientação pode ser a diferença entre uma linha legível e uma sopa de pixels desalinhados.",
        "O ponto importante é não tratar pré-processamento como cosmética. Ele altera a relação sinal-ruído que alimenta o reconhecedor. Em muitos pipelines reais, a pergunta prática é: vale mais treinar um modelo maior ou reduzir o caos visual de entrada?",
      ],
      [
        {
          type: "insight",
          title: "Melhorar a entrada é melhorar o modelo indiretamente",
          body:
            "Quando a imagem fica mais limpa, o reconhecedor gasta menos capacidade resolvendo ruído e mais capacidade lendo conteúdo real.",
        },
        {
          type: "example",
          title: "Deskew simples, ganho grande",
          body:
            "Uma inclinação pequena pode desalinhar linhas inteiras e quebrar a segmentação. Corrigir alguns graus muda a leitura por completo.",
        },
      ],
    ),
    s(
      "pipeline-ocr",
      "Pipeline",
      "Ler um documento costuma envolver mais de uma etapa, mesmo quando a API esconde isso",
      "Detecção de texto, agrupamento, reconhecimento e pós-processamento formam um encadeamento lógico.",
      undefined,
      "ocr-preprocess-lab",
      [
        "Mesmo soluções modernas frequentemente podem ser interpretadas como um pipeline conceitual: encontrar regiões de texto, agrupar em linhas ou blocos, reconhecer o conteúdo e depois revisar a saída com vocabulário, idioma ou regras de consistência.",
        "Esse encadeamento explica muitos erros práticos. Se a detecção de texto falha, a linha nem chega à etapa de reconhecimento. Se a leitura por linha funciona mas a ordem entre colunas falha, o texto final sai com parágrafos embaralhados. Se o pós-processamento lexical é fraco, erros simples de OCR sobrevivem até a saída final.",
        "Pensar em pipeline ajuda a depurar. Em vez de dizer genericamente 'o OCR errou', você pergunta: ele não viu a região? viu e leu errado? leu certo mas reorganizou mal? Essa decomposição economiza muito tempo em produção.",
      ],
      [
        {
          type: "definition",
          title: "Pós-processamento",
          body:
            "Conjunto de etapas que corrigem, filtram ou reorganizam a saída reconhecida, como dicionários, regras de layout e validações de campo.",
        },
      ],
    ),
    s(
      "ordem-leitura",
      "Layout",
      "Ordem de leitura: o texto correto na sequência errada continua sendo um erro",
      "Documentos com múltiplas colunas, formulários e tabelas exigem que o sistema saiba como percorrer a página.",
      "comparison",
      "reading-order-lab",
      [
        "Se uma página tem duas colunas, ler linha a linha da esquerda para a direita sem respeitar blocos produz um texto impossível. O conteúdo individual pode estar certo, mas a semântica global quebra porque a ordem de leitura ficou errada.",
        "Esse problema mostra por que entendimento de documentos não pode ignorar layout. Posição relativa, alinhamento, caixas delimitadoras e vizinhança espacial ajudam a decidir se um texto é título, subtítulo, célula de tabela, rótulo de campo ou valor associado.",
        "Em formulários, ordem linear às vezes é até a pergunta errada. O que importa é parear chave e valor, como 'CPF' com o número ao lado, mesmo que outros blocos estejam visualmente mais próximos em leitura sequencial.",
      ],
      [
        {
          type: "mistake",
          title: "Texto certo, documento errado",
          body:
            "Se o OCR acerta as palavras mas mistura colunas e linhas, o documento ainda está semanticamente quebrado para busca, resumo ou extração.",
        },
        {
          type: "insight",
          title: "Layout também é contexto",
          body:
            "No entendimento de documentos, contexto não é só a palavra anterior; é também a posição espacial e a estrutura da página.",
        },
      ],
    ),
    s(
      "document-ai",
      "Salto conceitual",
      "De OCR para Document AI: quando texto bruto precisa virar campos e entidades",
      "Empresas raramente querem uma página em texto puro; elas querem dados acionáveis.",
      "comparison",
      "document-ai-scenarios",
      [
        "Em uma nota fiscal, o objetivo quase nunca é apenas ler todos os caracteres. O que interessa são CNPJ, datas, totais, itens, tributos e relações entre esses campos. É aí que OCR simples se mostra insuficiente.",
        "Document AI acrescenta camadas de interpretação: detectar blocos, classificar tipos de região, parear chave-valor, reconstruir tabelas e extrair entidades com significado de negócio. Em vez de um grande parágrafo solto, a saída ideal vira JSON estruturado ou campos validados.",
        "Essa transição muda a métrica de sucesso. Um OCR com poucas trocas de caractere ainda pode ser inútil se não souber qual valor é o total da fatura. Da mesma forma, um sistema pode tolerar pequenos ruídos textuais se extrair corretamente os campos de interesse.",
      ],
      [
        {
          type: "definition",
          title: "Extração de entidades",
          body:
            "Processo de identificar informações com papel semântico específico, como nome, data, total, endereço ou número de documento.",
        },
        {
          type: "example",
          title: "Texto vs estrutura",
          body:
            "Um OCR bruto devolve 'Total 120,00'. Document AI idealmente devolve { campo: 'total', valor: '120,00' }.",
        },
      ],
    ),
    s(
      "modelos-layout",
      "Modelos modernos",
      "Texto sozinho não basta: posição e imagem entram no modelo",
      "Modelos como LayoutLM e variantes recentes aprenderam a combinar palavras, caixas e contexto visual.",
      undefined,
      "document-ai-scenarios",
      [
        "LayoutLM e trabalhos relacionados introduziram uma ideia poderosa: tokens de texto em documentos carregam não só significado linguístico, mas também coordenadas na página. Isso permite ao modelo aprender que um texto no topo pode ser título, que um valor alinhado à direita pode ser total e que duas palavras próximas em caixas vizinhas podem formar um par chave-valor.",
        "Soluções mais recentes combinam ainda mais modalidades, incluindo a própria imagem do documento. Isso ajuda quando o OCR textual é imperfeito ou quando pistas visuais como linhas, bordas, selos e grade de tabela são importantes para a interpretação.",
        "Há também abordagens end-to-end que tentam entender o documento diretamente da imagem, como o Donut. Elas são conceitualmente elegantes, mas não eliminam o fato de que documentos reais continuam variando muito em qualidade e estrutura.",
      ],
      [
        {
          type: "insight",
          title: "Documento é multimodal por natureza",
          body:
            "A palavra, sua posição, seu vizinho visual e a aparência global da página contribuem juntos para o significado final.",
        },
      ],
    ),
    s(
      "tabelas-formularios",
      "Estrutura difícil",
      "Tabelas e formulários são onde pipelines ingênuos costumam quebrar",
      "Extrair uma sequência linear de texto não preserva necessariamente relações bidimensionais.",
      "tradeoff",
      undefined,
      [
        "Em tabelas, o significado depende da célula, da coluna e da linha. Se o sistema perder essas relações, ele pode até reconhecer corretamente os números, mas não saber a que item pertencem. O mesmo vale para formulários com blocos paralelos e campos espalhados.",
        "Reconstruir estrutura tabular exige mais do que OCR. É preciso detectar células, inferir agrupamentos ou usar modelos que aprendam a estrutura diretamente. Em cenários corporativos, esse detalhe decide se uma automação financeira funciona ou se gera dados impossíveis de reconciliar.",
        "Por isso, muitos sistemas combinam etapas: OCR forte por linha, detector de layout, regras de negócio e validações específicas do domínio. Não é elegante no sentido purista, mas costuma ser mais robusto no mundo real.",
      ],
      [
        {
          type: "mistake",
          title: "Serializar tudo cedo demais",
          body:
            "Transformar o documento inteiro em texto linear muito cedo pode destruir a estrutura que você ainda precisará para extrair campos corretamente.",
        },
      ],
    ),
    s(
      "avaliacao",
      "Avaliação",
      "A métrica certa depende do objetivo: caractere, palavra, campo ou documento inteiro",
      "Não existe uma única noção de acerto para OCR e Document AI.",
      "checklist",
      undefined,
      [
        "Se o objetivo é transcrição, métricas por caractere e palavra fazem sentido. Se o objetivo é automação, talvez a pergunta relevante seja taxa de extração correta de campos, consistência de pares chave-valor ou porcentagem de documentos processáveis sem intervenção humana.",
        "Esse deslocamento de métrica é crítico. Um modelo com leve erro ortográfico pode ser suficiente para indexação e busca, mas inaceitável para números de contrato. Em compensação, um OCR excelente por caractere pode ser péssimo como solução de negócio se errar sistematicamente a associação entre rótulo e valor.",
        "Avaliar em produção também pede amostras difíceis: documentos fora do template, fotos ruins, páginas parcialmente cortadas, carimbos sobrepostos e revisões manuais. Benchmarks públicos ajudam, mas não substituem o domínio real.",
      ],
      [
        {
          type: "insight",
          title: "Texto perfeito nem sempre é o melhor objetivo",
          body:
            "Se a meta é fluxo operacional, às vezes vale mais extrair poucos campos críticos com altíssima precisão do que transcrever tudo.",
        },
      ],
    ),
    s(
      "limites",
      "Limitações",
      "Manuscrito, ruído forte, templates novos e ambiguidade continuam difíceis",
      "Mesmo com modelos multimodais, documentos reais mantêm zonas duras para automação total.",
      undefined,
      undefined,
      [
        "Escrita manual, assinaturas, carimbos sobre texto, fotografias com perspectiva severa e documentos muito comprimidos ainda desafiam qualquer pipeline. Em vários desses casos, o problema é falta de informação visual estável, não apenas falta de modelo.",
        "Mudança de template também dói. Um sistema ajustado para um tipo de fatura pode se confundir quando o cabeçalho muda de lugar ou quando dois fornecedores estruturam os campos de forma diferente. Layout aprendido em um domínio não generaliza automaticamente para todos.",
        "Por isso, Document AI raramente é 'instalar e esquecer'. Ele pede monitoramento, amostragem manual, regras de fallback e, às vezes, desenho cuidadoso de experiência humana para revisão dos casos ambíguos.",
      ],
      [
        {
          type: "mistake",
          title: "Prometer automação total sem curva de exceção",
          body:
            "Documentos extremos e casos raros continuam existindo. Bons sistemas preveem revisão humana para os itens de baixa confiança.",
        },
      ],
    ),
    s(
      "aplicacoes",
      "Aplicações",
      "Onde OCR e Document AI geram valor imediato",
      "A combinação entre leitura visual e estrutura transforma papel em dado operacional.",
      undefined,
      undefined,
      [
        "Financeiro usa essas técnicas para contas a pagar, notas fiscais, recibos e conciliação. Jurídico usa para triagem documental, busca, indexação e organização de contratos. Saúde usa para prontuários, laudos e formulários administrativos. Recursos humanos aplica em currículos, comprovantes e admissão.",
        "Em todos esses casos, o padrão é parecido: primeiro o documento vira imagem digital, depois o texto é lido, por fim os campos relevantes são extraídos para um sistema transacional. O valor aparece quando o ciclo manual diminui e a revisão humana passa a focar apenas os casos de baixa confiança.",
        "Isso também explica por que OCR isolado, embora útil, quase nunca é o produto final. O ganho operacional real nasce quando leitura, estrutura e validação se conectam a uma tarefa concreta.",
      ],
      [
        {
          type: "example",
          title: "Pipeline de nota fiscal",
          body:
            "Detectar a página, corrigir orientação, ler o texto, extrair CNPJ, data e total, validar campos e enviar para ERP.",
        },
      ],
    ),
    s(
      "resumo",
      "Síntese",
      "O que precisa ficar na memória sobre OCR e Document AI",
      "Consolide a diferença entre reconhecer texto, preservar layout e extrair estrutura útil.",
      undefined,
      "summary-cards",
      [
        "Revise a cadeia completa antes de testar seu entendimento no quiz.",
      ],
      [],
    ),
    s(
      "quiz",
      "Revisão",
      "Quiz de revisão",
      "Teste OCR, pré-processamento, ordem de leitura, layout e extração estruturada.",
      undefined,
      "quiz",
      [
        "O objetivo do quiz é verificar se você sabe diferenciar transcrição de entendimento documental.",
      ],
      [],
    ),
    s(
      "glossario",
      "Glossário",
      "Termos essenciais",
      "Feche a aula com o vocabulário central para trabalhar com documentos digitais de forma técnica.",
      undefined,
      "glossary",
      [
        "Esses termos aparecem em bibliotecas, benchmarks, plataformas de nuvem e papers de entendimento documental.",
      ],
      [],
    ),
  ],
  summaryCards: [
    {
      title: "OCR lê símbolos",
      body:
        "Ele transforma padrões visuais em texto legível por máquina, mas isso ainda não basta para entender o documento.",
    },
    {
      title: "Pré-processamento continua relevante",
      body:
        "Ruído, inclinação e baixa qualidade visual ainda afetam fortemente a leitura.",
    },
    {
      title: "Ordem de leitura importa",
      body:
        "Texto reconhecido fora da sequência correta continua sendo erro semântico.",
    },
    {
      title: "Layout carrega significado",
      body:
        "Posição espacial ajuda a distinguir título, campo, valor, linha de tabela e rodapé.",
    },
    {
      title: "Document AI busca estrutura",
      body:
        "O objetivo prático é extrair entidades, pares chave-valor e tabelas, não apenas texto bruto.",
    },
    {
      title: "Automação boa prevê exceções",
      body:
        "Casos ambíguos, manuscritos e templates novos exigem fallback e revisão humana.",
    },
  ],
  quiz: [
    q(
      "q1",
      "Qual é a diferença mais importante entre OCR e Document AI?",
      "OCR foca em reconhecer texto; Document AI busca estrutura e significado operacional.",
      "OCR trabalha só com PDFs e Document AI só com fotos.",
      "OCR usa deep learning e Document AI não.",
      "a",
      "OCR é a leitura textual; Document AI acrescenta layout, entidades, tabelas e extração de campos úteis.",
    ),
    q(
      "q2",
      "Por que deskew pode melhorar tanto um pipeline de OCR?",
      "Porque linhas tortas dificultam segmentação e reconhecimento coerente do texto.",
      "Porque deskew aumenta automaticamente a resolução da imagem.",
      "Porque deskew traduz o documento para outro idioma.",
      "a",
      "Uma pequena inclinação já desorganiza linhas e regiões de texto, o que afeta várias etapas do pipeline.",
    ),
    q(
      "q3",
      "O que significa dizer que a ordem de leitura está errada?",
      "As palavras podem estar certas isoladamente, mas a sequência global do documento ficou embaralhada.",
      "O OCR não encontrou nenhuma palavra na página.",
      "O modelo confundiu letras maiúsculas com minúsculas.",
      "a",
      "Em múltiplas colunas ou formulários, reconhecer o texto não basta; é preciso organizá-lo na estrutura correta.",
    ),
    q(
      "q4",
      "Por que layout é importante em documentos?",
      "Porque posição e vizinhança ajudam a inferir papel semântico de cada texto.",
      "Porque layout define a resolução máxima do scanner.",
      "Porque layout elimina a necessidade de OCR.",
      "a",
      "Uma mesma palavra pode significar coisas diferentes dependendo de onde aparece na página.",
    ),
    q(
      "q5",
      "Qual caso costuma ser especialmente difícil para um pipeline ingênuo?",
      "Tabelas e formulários com relações bidimensionais entre campos.",
      "Documentos com uma única linha centralizada.",
      "Imagens sem texto algum.",
      "a",
      "Extrair sequência linear de texto não preserva naturalmente relações de linha, coluna e chave-valor.",
    ),
    q(
      "q6",
      "Quando uma métrica por caractere pode ser insuficiente?",
      "Quando o objetivo real é extrair corretamente campos de negócio, não apenas transcrever.",
      "Quando o documento está em preto e branco.",
      "Quando o OCR usa transformers.",
      "a",
      "Automação documental depende muitas vezes de entidades e relações; texto quase perfeito ainda pode falhar operacionalmente.",
    ),
    q(
      "q7",
      "O que modelos como LayoutLM adicionam à representação textual?",
      "Informação espacial do layout do documento junto com o texto.",
      "Somente um dicionário ortográfico maior.",
      "Uma etapa obrigatória de binarização manual.",
      "a",
      "Esses modelos combinam linguagem e posição para aprender melhor a estrutura visual da página.",
    ),
    q(
      "q8",
      "Qual prática é mais realista em sistemas de Document AI em produção?",
      "Prever revisão humana para casos ambíguos ou de baixa confiança.",
      "Assumir que todo documento novo seguirá exatamente o mesmo template.",
      "Eliminar completamente validações de negócio após o OCR.",
      "a",
      "Casos extremos e mudanças de template pedem fallback; automação robusta raramente ignora exceções.",
    ),
  ],
  glossary: [
    g("OCR", "Reconhecimento óptico de caracteres em imagens ou documentos digitalizados."),
    g("Document AI", "Técnicas para extrair estrutura, entidades e relações úteis de documentos."),
    g("Deskew", "Correção de inclinação do documento para alinhar linhas de texto."),
    g("Binarização", "Conversão da imagem para um regime de alto contraste, muitas vezes preto e branco."),
    g("Ordem de leitura", "Sequência correta em que blocos de texto devem ser percorridos."),
    g("Layout", "Organização espacial de títulos, colunas, campos, tabelas e regiões na página."),
    g("Par chave-valor", "Associação entre um rótulo como 'CPF' e o valor correspondente."),
    g("Entidade", "Informação com papel semântico específico, como data, nome ou total."),
    g("Template", "Estrutura visual recorrente de um tipo de documento."),
    g("OCR neural", "Abordagem que usa redes neurais para reconhecer texto a partir da imagem."),
    g("Tabela", "Estrutura bidimensional em que a relação entre linhas e colunas carrega significado."),
    g("FUNSD", "Dataset de formulários ruidosos usado em entendimento de documentos."),
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
