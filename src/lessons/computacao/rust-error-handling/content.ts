import type { LessonContent } from "../../../types/content";

export const rustErrorHandlingContent: LessonContent = {
  id: "rust-error-handling",
  title: "Rust: Erros com Result e ?",
  subtitle:
    "Em Rust, falha recuperável não é um detalhe escondido no fluxo: ela vira parte explícita do tipo, da assinatura e do desenho da fronteira entre camadas.",
  description:
    "Aula interativa sobre panic e Result, propagação com ?, enriquecimento de erros, desenho de tipos de erro, diferenças entre bibliotecas e aplicações, uso criterioso de unwrap e o papel dos erros no design de software robusto.",
  primaryCategoryId: "computacao",
  secondaryCategoryId: "engenharia",
  level: "Intermediário",
  estimatedTime: "45-55 min",
  tags: [
    "Rust",
    "Result",
    "Error Handling",
    "Panic",
    "Question Mark",
    "API Design",
  ],
  learningObjectives: [
    "Distinguir falhas recuperáveis de bugs ou invariantes violados.",
    "Ler Result<T, E> como parte do contrato da função, não como ruído sintático.",
    "Entender o operador ? como ferramenta de propagação e composição de contexto.",
    "Projetar erros que expressem fronteiras úteis entre camadas técnicas e domínio.",
    "Reconhecer quando panic, unwrap e expect fazem sentido e quando são atalhos perigosos.",
    "Desenhar APIs que tratem erros como parte da arquitetura de confiabilidade.",
  ],
  prerequisites: [
    "Rust: Ownership e Borrowing.",
    "APIs e fronteiras entre funções ou serviços.",
    "Noções de falha de I/O, parsing e validação.",
  ],
  references: [
    {
      title: "Error Handling",
      source: "The Rust Programming Language",
      url: "https://doc.rust-lang.org/book/ch09-00-error-handling.html",
      note: "Capítulo-base para a distinção entre panic e erros recuperáveis com Result.",
    },
    {
      title: "Recoverable Errors with Result",
      source: "The Rust Programming Language",
      url: "https://doc.rust-lang.org/book/ch09-02-recoverable-errors-with-result.html",
      note: "Explora Result, match, propagação e o operador ?.",
    },
    {
      title: "std::result",
      source: "Rust Standard Library",
      url: "https://doc.rust-lang.org/std/result/",
      note: "Documentação oficial da enum Result e de métodos associados.",
    },
    {
      title: "std::error::Error",
      source: "Rust Standard Library",
      url: "https://doc.rust-lang.org/std/error/trait.Error.html",
      note: "Base oficial para modelagem e interoperabilidade de tipos de erro.",
    },
    {
      title: "Rust API Guidelines",
      source: "Rust Library Team and Community",
      url: "https://rust-lang.github.io/api-guidelines/",
      note: "Ajuda a pensar em mensagens, tipos e ergonomia de erro em APIs públicas.",
    },
  ],
  heroVisual: "lesson-hero",
  openingText:
    "Em muitas linguagens, exceções fazem erros saltarem o stack quase como efeitos colaterais invisíveis. Rust escolhe outra filosofia: se uma operação pode falhar de maneira recuperável, essa possibilidade vira parte do tipo. Isso parece mais verboso no começo, mas força uma conversa que software robusto precisa ter cedo ou tarde: onde a falha nasce, quem a entende, quem a transforma e em que ponto o sistema decide parar.",
  quickFacts: [
    {
      title: "Result é contrato",
      body: "Ele comunica que a função pode produzir sucesso ou falha de forma esperada.",
    },
    {
      title: "Panic não é retorno alternativo",
      body: "Panic sinaliza quebra de invariante, bug ou situação em que seguir adiante não faz sentido seguro.",
    },
    {
      title: "? propaga contexto estrutural",
      body: "O operador encurta o caminho do erro sem esconder que ele continua sendo tratado pela assinatura.",
    },
    {
      title: "Erro também é design",
      body: "A forma como você modela falhas determina observabilidade, ergonomia e clareza entre camadas.",
    },
  ],
  sections: [
    s(
      "erros-fazem-parte-do-modelo",
      "Fundamento",
      "Falha recuperável deve aparecer no desenho da função",
      "Rust trata muitos erros como parte esperada do fluxo de software real, não como acidente fora da semântica da API.",
      "concept-grid",
      undefined,
      [
        "Abrir um arquivo pode falhar, parsear uma entrada pode falhar, consultar a rede pode falhar. Essas falhas não significam necessariamente que o programa foi escrito de forma errada; significam apenas que o ambiente ou os dados não atenderam a uma expectativa.",
        "Ao usar Result<T, E>, a assinatura assume essa realidade explicitamente. Quem chama a função passa a enxergar que o sucesso não é garantido e que existe uma escolha arquitetural a ser feita: tratar, propagar, transformar ou, em casos específicos, encerrar.",
        "Esse estilo pode parecer mais explícito do que exceções, mas ele tem uma virtude importante em sistemas: torna a superfície de falha mais visível durante revisão, refatoração e manutenção.",
      ],
      [
        {
          type: "definition",
          title: "Erro recuperável",
          body: "Falha esperada do ponto de vista do sistema, que pode ser reportada, transformada ou tratada sem presumir bug interno.",
        },
        {
          type: "insight",
          title: "Assinatura também fala de falha",
          body: "Uma boa API comunica não só o tipo de sucesso, mas a natureza das falhas que o chamador precisa considerar.",
        },
      ],
    ),
    s(
      "panic-vs-result",
      "Fronteira",
      "Panic e Result têm papéis diferentes",
      "Misturar bug interno com falha operacional deixa o sistema mais difícil de entender e de operar.",
      "tradeoff-spectrum",
      "tradeoff-lab",
      [
        "Panic é apropriado quando uma invariante essencial foi quebrada ou quando continuar a execução não faz sentido seguro. Já Result modela situações em que a falha faz parte do mundo real e o chamador pode decidir o próximo passo.",
        "Confundir essas duas categorias gera APIs ruins. Se toda falha vira panic, o chamador perde a oportunidade de decidir. Se toda quebra lógica interna vira Result, o sistema pode mascarar bugs como se fossem apenas inconvenientes operacionais.",
        "A maturidade em Rust passa por saber onde a responsabilidade muda de mãos: algumas condições devem ser impossíveis por contrato; outras devem ser comunicadas como parte do fluxo normal do software.",
      ],
      [
        {
          type: "definition",
          title: "panic!",
          body: "Mecanismo de parada ao encontrar condição considerada bug, invariante violada ou estado sem recuperação local adequada.",
        },
        {
          type: "mistake",
          title: "Usar panic para erro de entrada do usuário",
          body: "Falhas previsíveis de ambiente ou de dados externos normalmente devem ser representadas como Result, não como colapso do processo.",
        },
      ],
    ),
    s(
      "result-como-fluxo",
      "Composição",
      "Result organiza o fluxo de sucesso e falha sem esconder nenhum dos lados",
      "O tipo força o programador a decidir como encadear operações em que qualquer etapa pode interromper o caminho feliz.",
      "pipeline-diagram",
      "pipeline-lab",
      [
        "Uma cadeia comum em software é: ler entrada, interpretar, validar, transformar e persistir. Cada etapa pode falhar por razões diferentes. Result torna esse pipeline explícito e composicional.",
        "Isso melhora a legibilidade conceitual: o sucesso carrega T, a falha carrega E, e o código precisa deixar claro se está resolvendo a falha naquele ponto ou apenas encaminhando-a para uma camada mais capaz de decidir.",
        "Mais do que um padrão de código, Result induz um estilo arquitetural. Ele ajuda a separar causas técnicas locais de decisões maiores, como responder a uma requisição com mensagem útil, logar contexto adicional ou acionar fallback.",
      ],
      [
        {
          type: "definition",
          title: "Result<T, E>",
          body: "Enum que representa sucesso com T ou falha com E como parte explícita do tipo de retorno.",
        },
        {
          type: "example",
          title: "Ler e parsear",
          body: "Se ler falha, o parse nem começa. Se ler funciona e parse falha, a origem da falha muda, mas a estrutura do fluxo permanece clara.",
        },
      ],
    ),
    s(
      "operador-question-mark",
      "Ergonomia",
      "O operador ? encurta propagação sem esconder semântica",
      "Em vez de escrever match manual em cada linha, Rust permite encaminhar o erro mantendo o contrato da função visível na assinatura.",
      "pipeline-diagram",
      undefined,
      [
        "O operador ? não é 'mágica de exceção'. Ele funciona dentro do regime de tipos: se surgir Err, a função retorna cedo com uma falha compatível; se surgir Ok, o valor interno continua o fluxo.",
        "Isso torna pipelines mais legíveis e reduz boilerplate, especialmente quando várias etapas dependem umas das outras. A clareza vem do fato de que a assinatura continua revelando a possibilidade de erro; nada está escapando secretamente da função.",
        "Também por isso o operador favorece composição: funções pequenas podem fazer trabalho local e encaminhar falhas para uma camada superior, que decide se traduz, agrega contexto ou apresenta a mensagem final.",
      ],
      [
        {
          type: "definition",
          title: "Propagação com ?",
          body: "Forma idiomática de retornar cedo em caso de erro e extrair o valor em caso de sucesso, respeitando o tipo de retorno da função.",
        },
      ],
    ),
    s(
      "enriquecendo-contexto",
      "Observabilidade",
      "Erros bons carregam contexto útil, não apenas um rótulo genérico",
      "Uma falha sem contexto técnico ou semântico suficiente vira dor de operação, de suporte e de depuração.",
      "impact-board",
      undefined,
      [
        "Dizer apenas 'falhou' raramente ajuda alguém. Em sistemas reais, é importante preservar ou acrescentar contexto: qual arquivo, qual etapa, qual identificador, qual operação externa, qual hipótese foi quebrada.",
        "Esse contexto não precisa transformar todo erro em romance, mas precisa ser suficiente para a camada seguinte entender o que aconteceu e decidir com precisão. É assim que erros se tornam instrumentos de observabilidade, não apenas mensagens de frustração.",
        "O ponto delicado é não misturar demais domínio e detalhe técnico. Uma camada interna pode saber que houve erro de parse UTF-8; a camada externa talvez precise apenas dizer que o arquivo de configuração está inválido, sem perder a causa original para logs e depuração.",
      ],
      [
        {
          type: "insight",
          title: "Erro é material de diagnóstico",
          body: "Quanto mais clara a fronteira entre causa técnica e mensagem de negócio, melhor a qualidade operacional do sistema.",
        },
      ],
    ),
    s(
      "tipos-de-erro-e-fronteiras",
      "Modelagem",
      "Desenhar tipos de erro é desenhar fronteiras entre camadas",
      "Enums de erro bem pensadas transformam um monte de falhas locais em um contrato inteligível para a borda da aplicação.",
      "concept-grid",
      undefined,
      [
        "Uma camada pode falhar por I/O, parse, rede, autenticação, conflito de estado ou regra de domínio. Se tudo vaza como string genérica, o chamador perde a estrutura da informação. Se tudo vaza como detalhe técnico cru, o chamador recebe mais granularidade do que precisa.",
        "Criar tipos de erro próprios ajuda a agrupar causas compatíveis e a representar o nível certo de abstração para cada fronteira. Nem toda camada precisa expor a mesma riqueza de detalhe; ela pode converter erros internos em formas mais úteis para o próximo consumidor.",
        "Esse desenho melhora testes, logs e ergonomia. O tipo de erro deixa de ser resto de implementação e vira parte da interface arquitetural do módulo.",
      ],
      [
        {
          type: "definition",
          title: "Erro de domínio",
          body: "Falha expressa no vocabulário do problema de negócio, e não apenas no detalhe técnico da operação interna.",
        },
        {
          type: "example",
          title: "Configuração inválida",
          body: "Várias falhas técnicas de leitura e parse podem ser reunidas sob uma fronteira mais útil para quem só quer saber que a inicialização não é segura.",
        },
      ],
    ),
    s(
      "bibliotecas-vs-aplicacoes",
      "Arquitetura",
      "Bibliotecas e aplicações finais tratam erros em lugares diferentes",
      "Uma biblioteca tende a devolver estrutura; a borda da aplicação tende a decidir mensagem, log, retry e encerramento.",
      "impact-board",
      "scenario-lab",
      [
        "Bibliotecas geralmente devem evitar decidir cedo demais pelo chamador. Elas costumam devolver Result com contexto e tipos adequados para que outras camadas escolham entre retry, fallback, resposta HTTP, log, telemetria ou abortar.",
        "Aplicações finais, por outro lado, precisam eventualmente colapsar essa árvore de falhas em ações concretas. É na borda que se define se um erro vira código 400, 500, mensagem amigável, encerramento do processo ou simples ignorado com métrica.",
        "Separar esses papéis reduz acoplamento. A biblioteca não precisa adivinhar a política operacional da aplicação, e a aplicação não precisa reimplementar toda a semântica do erro do zero.",
      ],
      [
        {
          type: "insight",
          title: "Erro sobe, decisão desce",
          body: "Camadas internas carregam estrutura; camadas externas aplicam política operacional e experiência de uso.",
        },
      ],
    ),
    s(
      "unwrap-expect-com-criterio",
      "Disciplina",
      "unwrap e expect não são proibidos, mas pedem contexto certo",
      "Há momentos em que assumir sucesso é razoável; o erro é transformar isso em hábito invisível no código de produção.",
      "tradeoff-spectrum",
      undefined,
      [
        "Em testes, protótipos curtos, exemplos didáticos ou pontos em que uma invariante já foi validada por camadas anteriores, unwrap ou expect podem ser escolhas honestas. Eles deixam explícito que a falha ali significa algo anômalo.",
        "O problema surge quando esse estilo invade fronteiras sujeitas a ambiente real, entrada de usuário, I/O ou redes. Nesses casos, unwrap troca um cenário operacional previsível por abortos pouco controlados.",
        "Expect ao menos permite documentar a hipótese assumida. Ainda assim, a melhor prática continua sendo perguntar: este é realmente um caso impossível aqui, ou estou apenas empurrando uma decisão de erro para o crash mais próximo?",
      ],
      [
        {
          type: "mistake",
          title: "Espalhar unwrap em caminho de produção",
          body: "Isso transforma falhas previsíveis em encerramentos abruptos e dificulta observabilidade e recuperação.",
        },
      ],
    ),
    s(
      "quiz-revisao",
      "Revisão",
      "Quiz de revisão",
      "Veja se panic, Result, ?, contexto e fronteiras de erro já viraram um mesmo raciocínio de design na sua cabeça.",
      undefined,
      "quiz",
      [
        "A meta é ganhar critério sobre onde falhas nascem e onde devem ser decididas.",
      ],
      [],
    ),
    s(
      "glossario",
      "Glossário",
      "Termos essenciais",
      "Feche a aula consolidando o vocabulário central para ler crates, exemplos e APIs idiomáticas de tratamento de erro em Rust.",
      undefined,
      "glossary",
      [
        "Esse léxico aparece o tempo inteiro em código de aplicação, libs e documentação oficial.",
      ],
      [],
    ),
  ],
  summaryCards: [
    {
      title: "Falha recuperável é contrato",
      body: "Result coloca a possibilidade de erro na superfície da API.",
    },
    {
      title: "Panic e Result não concorrem",
      body: "Eles servem a classes diferentes de problema e decisão.",
    },
    {
      title: "? melhora ergonomia sem esconder tipos",
      body: "A propagação continua explícita na assinatura da função.",
    },
    {
      title: "Contexto torna erro acionável",
      body: "Mensagens e tipos bons ajudam operação, logs e depuração.",
    },
    {
      title: "Tipos de erro definem fronteiras",
      body: "Agrupar falhas no nível certo melhora a arquitetura da aplicação.",
    },
    {
      title: "unwrap exige intenção",
      body: "Assumir sucesso só é saudável quando a hipótese é realmente defendável.",
    },
  ],
  quiz: [
    q(
      "q1",
      "Quando Result<T, E> é uma escolha apropriada?",
      "Quando a falha faz parte do comportamento esperado da operação e o chamador pode decidir o que fazer.",
      "Somente quando o programa está em estado inconsistente.",
      "Apenas em código de teste.",
      "a",
      "Result modela falhas recuperáveis e previsíveis do ponto de vista do sistema.",
    ),
    q(
      "q2",
      "Qual situação combina mais com panic?",
      "Uma invariante interna foi quebrada e continuar a execução não faz sentido seguro.",
      "O usuário digitou um caminho de arquivo inexistente.",
      "Um serviço externo respondeu timeout ocasional.",
      "a",
      "Panic costuma sinalizar bug, corrupção de estado ou suposição impossível quebrada.",
    ),
    q(
      "q3",
      "O que o operador ? faz conceitualmente?",
      "Propaga o erro para cima quando necessário e continua o fluxo com o valor em caso de sucesso.",
      "Transforma qualquer erro em panic automaticamente.",
      "Converte Result em Option sem custo.",
      "a",
      "Ele encurta boilerplate de propagação sem esconder a possibilidade de falha.",
    ),
    q(
      "q4",
      "Por que enriquecer contexto de erro é importante?",
      "Porque ajuda a camada seguinte a diagnosticar, logar ou apresentar a falha de forma útil.",
      "Porque torna todo erro recuperável.",
      "Porque substitui a necessidade de tipos de erro.",
      "a",
      "Contexto transforma falha em informação operacional acionável.",
    ),
    q(
      "q5",
      "Qual é um benefício de criar enums próprios para erros de um módulo?",
      "Agrupar causas relevantes em uma fronteira mais inteligível para o chamador.",
      "Eliminar completamente detalhes técnicos de qualquer camada.",
      "Impedir o uso de bibliotecas externas.",
      "a",
      "Tipos de erro bem pensados organizam o contrato arquitetural da falha.",
    ),
    q(
      "q6",
      "Qual papel costuma caber melhor a uma biblioteca?",
      "Devolver estrutura e contexto, deixando política operacional para a borda da aplicação.",
      "Sempre encerrar o processo ao primeiro erro.",
      "Converter qualquer falha em string final para o usuário.",
      "a",
      "Bibliotecas normalmente devem informar bem, não decidir tudo pelo chamador.",
    ),
    q(
      "q7",
      "Quando unwrap pode ser defensável?",
      "Em contextos como testes, protótipos ou pontos em que uma invariante já foi comprovada e a falha significaria bug.",
      "Sempre que escrever Result parecer verboso.",
      "Em qualquer acesso de I/O de produção.",
      "a",
      "O uso criterioso depende de o fracasso ali realmente ser tratado como impossível ou bug interno.",
    ),
    q(
      "q8",
      "Qual é a leitura mais madura do tratamento de erros em Rust?",
      "Erros são parte do design das fronteiras entre camadas, não apenas detalhes locais de implementação.",
      "Erros existem só para satisfazer o compilador.",
      "Todo erro deve subir intacto até a UI sem transformação.",
      "a",
      "Modelar falhas com clareza melhora confiabilidade, observabilidade e manutenção.",
    ),
  ],
  glossary: [
    g("Result", "Enum que representa sucesso com um valor ou falha com um tipo de erro."),
    g("Err", "Variante de Result que carrega a informação de falha."),
    g("Ok", "Variante de Result que carrega o valor de sucesso."),
    g("panic!", "Mecanismo de interrupção para bugs, invariantes quebradas ou estados sem recuperação local adequada."),
    g("Operador ?", "Sintaxe idiomática para propagar erro cedo e extrair o valor de sucesso."),
    g("Erro recuperável", "Falha prevista como parte possível do comportamento normal de uma operação."),
    g("Invariante", "Condição que deve permanecer verdadeira para o componente ser considerado consistente."),
    g("Contexto de erro", "Informação adicional que ajuda a entender onde e por que a falha ocorreu."),
    g("Erro de domínio", "Falha expressa na linguagem do problema de negócio, e não apenas do mecanismo técnico interno."),
    g("Erro técnico", "Falha descrita no nível de I/O, parse, rede, sistema operacional ou outra infraestrutura."),
    g("Propagação", "Ato de devolver a falha para uma camada superior decidir o próximo passo."),
    g("unwrap", "Método que extrai o sucesso e entra em panic em caso de erro."),
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
