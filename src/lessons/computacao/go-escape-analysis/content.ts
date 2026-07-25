import type { LessonContent } from "../../../types/content";

export const goEscapeAnalysisContent: LessonContent = {
  id: "go-escape-analysis",
  title: "Go: Escape Analysis e Alocação",
  subtitle:
    "Em Go, a pergunta prática não é apenas 'stack ou heap?', mas 'o compilador consegue provar que este valor morre aqui ou precisa sobreviver além deste frame?'",
  description:
    "Uma aula avançada sobre escape analysis em Go: lifetime, stack vs heap, gatilhos comuns de escape, leitura de `-gcflags=-m`, relação com inlining, PGO e pressão de GC.",
  primaryCategoryId: "computacao",
  secondaryCategoryId: "engenharia",
  level: "Avançado",
  estimatedTime: "55-70 min",
  tags: [
    "Go",
    "Escape analysis",
    "Stack",
    "Heap",
    "GC",
    "Compiler",
    "Performance",
  ],
  learningObjectives: [
    "Entender escape analysis como uma análise de lifetime e publicação de referências.",
    "Relacionar decisão de stack vs heap ao custo do runtime e da coleta de lixo.",
    "Reconhecer gatilhos frequentes de escape em APIs e closures.",
    "Usar saídas do compilador e perfis para investigar alocação de forma responsável.",
    "Distinguir refatoração útil de micro-otimização cega contra o compilador.",
  ],
  prerequisites: [
    "Familiaridade com ponteiros, stack, heap e coleta de lixo.",
    "Conhecimento básico de funções, closures e interfaces em Go.",
    "Interesse por medir custo de alocação e não apenas discutir estilo de código.",
  ],
  references: [
    {
      title: "A Guide to the Go Garbage Collector",
      source: "The Go Programming Language",
      url: "https://go.dev/doc/gc-guide",
      note: "Guia oficial com seção útil sobre como identificar e eliminar alocações na heap usando escape analysis.",
    },
    {
      title: "Profile-guided optimization preview",
      source: "The Go Blog",
      url: "https://go.dev/blog/pgo-preview",
      note: "Explica como inlining e escape analysis fazem parte do conjunto de otimizações do compilador.",
    },
    {
      title: "Getting to Go: The Journey of Go's Garbage Collector",
      source: "The Go Blog",
      url: "https://go.dev/blog/ismmkeynote",
      note: "Conecta melhoria de escape analysis à estratégia geral de reduzir pressão sobre o GC.",
    },
    {
      title: "cmd/compile README",
      source: "The Go Programming Language",
      url: "https://go.dev/src/cmd/compile/README",
      note: "Documentação oficial do compilador com exemplos de `-gcflags=-m` e outras flags de inspeção.",
    },
    {
      title: "Compiler And Runtime Optimizations",
      source: "Go Wiki",
      url: "https://go.dev/wiki/CompilerOptimizations",
      note: "Resume como observar escape analysis e ressalta que as regras exatas mudam entre versões.",
    },
    {
      title: "Diagnostics",
      source: "The Go Programming Language",
      url: "https://go.dev/doc/diagnostics",
      note: "Guia oficial para combinar observação do compilador com heap profiles, tracing e métricas.",
    },
  ],
  heroVisual: "go-escape-hero",
  openingText:
    "O tema 'stack vs heap' costuma ser ensinado cedo demais e explicado de forma rasa demais. Em Go, isso é ainda mais traiçoeiro, porque a decisão não é tomada só pelo programador; ela também depende do que o compilador consegue provar sobre o lifetime de um valor. Um struct local pode continuar na stack e custar muito pouco — ou pode escapar para a heap porque sua referência foi retornada, capturada, armazenada em outro lugar ou tornada difícil de rastrear. A palavra-chave aqui é prova. Escape analysis não pergunta o que você gostaria que fosse barato; ela pergunta se é seguro e convincente manter aquele valor local. Quando a resposta é 'não consigo garantir', a heap vira o lado conservador da decisão. Entender isso muda como você lê APIs, perfis de memória e mensagens do compilador.",
  quickFacts: [
    {
      title: "Escape não é pecado moral",
      body: "Às vezes o valor realmente precisa sobreviver; nesse caso, a heap é o lugar certo.",
    },
    {
      title: "O custo real aparece no runtime",
      body: "Objetos na heap passam por alocação, rastreamento e GC; objetos na stack tendem a ser mais baratos.",
    },
    {
      title: "`-gcflags=-m` é pista, não troféu",
      body: "A saída do compilador ajuda a investigar, mas precisa ser lida junto com perfis e contexto.",
    },
    {
      title: "Inlining e versão do compilador importam",
      body: "O resultado de escape analysis pode mudar conforme o compilador evolui.",
    },
  ],
  sections: [
    s(
      "por-que-importa",
      "Motivação",
      "Escape analysis importa porque alocação é custo composto",
      "Cada valor que vai para a heap não paga apenas a reserva de memória; ele também aumenta a superfície de trabalho do runtime.",
      "go-escape-map",
      undefined,
      [
        "Quando um valor permanece na stack da goroutine, sua vida costuma ser curta e seu descarte acompanha naturalmente o fim do frame. Isso tende a ser barato em latência, bookkeeping e pressão sobre o coletor.",
        "Quando ele vai para a heap, entra em outro regime. A alocação passa por caminhos de runtime, o valor pode participar do conjunto rastreado pelo GC e o efeito acumulado dessa decisão aparece em throughput, memória viva e cauda de latência.",
        "Por isso, aprender escape analysis não é obsessão por micro-otimização. É aprender como o design da API conversa com o custo operacional do programa.",
      ],
      [
        {
          type: "definition",
          title: "Escape analysis",
          body: "Análise do compilador que tenta determinar se um valor pode permanecer local ou precisa ser alocado na heap por sobreviver ao escopo atual.",
        },
        {
          type: "insight",
          title: "Alocação é efeito sistêmico",
          body: "Um escape isolado pode ser irrelevante, mas padrões repetidos em hot paths mudam o comportamento do runtime.",
        },
      ],
    ),
    s(
      "a-pergunta-do-compilador",
      "Lifetime",
      "A pergunta central é: este valor pode morrer junto com este frame?",
      "Se o compilador não consegue garantir isso, ele escolhe a heap por segurança.",
      undefined,
      "go-escape-path-lab",
      [
        "Escape analysis é melhor entendida como análise de lifetime. O compilador observa como um valor é usado e pergunta se alguma referência a ele pode sobreviver além da chamada atual.",
        "Retornar um ponteiro, armazenar referência em estrutura compartilhada, capturar variável em closure ou passá-la para contextos cuja vida futura o compilador não controla são exemplos clássicos de situações que podem empurrar a decisão para a heap.",
        "Essa lógica também explica por que a decisão é sensível ao contexto. O mesmo tipo local pode ficar na stack em uma função simples e escapar em outra que o expõe de forma mais ampla.",
      ],
      [
        {
          type: "definition",
          title: "Lifetime",
          body: "Período durante o qual um valor precisa continuar válido e acessível por alguma parte do programa.",
        },
        {
          type: "mistake",
          title: "Imaginar que tipo define sozinho o destino",
          body: "Em Go, o mesmo tipo pode estar na stack ou na heap dependendo de como é usado naquele contexto específico.",
        },
      ],
    ),
    s(
      "stack-vs-heap",
      "Custo",
      "Stack e heap não são só lugares; são regimes diferentes de gerenciamento",
      "A stack favorece temporalidade local. A heap favorece sobrevivência e compartilhamento, ao preço de trabalho adicional do runtime.",
      undefined,
      undefined,
      [
        "A stack da goroutine cresce conforme a execução precisa e combina muito bem com dados cujo lifetime coincide com chamadas locais. Isso simplifica descarte e evita ampliar a superfície rastreada pelo GC.",
        "A heap, por sua vez, existe justamente para objetos cuja duração não cabe nessa disciplina simples. Se um valor precisa viver depois do retorno ou circular por estruturas de vida mais longa, é natural que termine ali.",
        "O erro está em inverter a leitura: stack não é virtude moral e heap não é fracasso automático. A engenharia correta distingue o que é custo necessário do que é custo acidental.",
      ],
      [
        {
          type: "example",
          title: "Retornar um objeto por valor",
          body: "Em certos casos, isso ajuda a manter a decisão local e ainda oferece ao compilador mais chance de evitar heap desnecessária.",
        },
      ],
    ),
    s(
      "gatilhos-comuns",
      "Padrões",
      "Retorno de ponteiros, closures e indireções são gatilhos recorrentes",
      "Eles não são proibidos, mas merecem leitura cuidadosa porque ampliam a possibilidade de o valor sobreviver além do escopo local.",
      undefined,
      "go-escape-trigger-lab",
      [
        "Retornar ponteiros é o exemplo didático clássico: o chamador pode manter a referência e usá-la depois que o frame da função já acabou. Nesse caso, a heap não é bug; é requisito semântico.",
        "Closures introduzem outro padrão importante. Quando uma variável local é capturada por função retornada, goroutine ou callback, sua vida útil pode se estender e a análise precisa levar isso em conta.",
        "Interfaces e outras formas de indireção também podem dificultar a prova. Não porque interface seja 'ruim', mas porque certos caminhos tornam mais complexo rastrear precisamente quem guarda o quê e por quanto tempo.",
      ],
      [
        {
          type: "definition",
          title: "Closure",
          body: "Função que captura variáveis do ambiente em que foi criada, podendo estender seu lifetime.",
        },
        {
          type: "mistake",
          title: "Caçar todo ponteiro como se fosse bug",
          body: "Muitos escapes representam a semântica correta. O objetivo é achar escapes evitáveis em partes relevantes, não demonizar referências.",
        },
      ],
    ),
    s(
      "ler-o-compilador",
      "Ferramentas",
      "O compilador sabe explicar parte da decisão",
      "Flags como `-gcflags=-m` ajudam a ver quais valores escapam e por quê, mas precisam ser lidas como diagnóstico, não como placar.",
      undefined,
      undefined,
      [
        "A documentação oficial do compilador e o GC guide recomendam usar `go build -gcflags=-m` ou níveis mais detalhados para inspecionar otimizações, incluindo decisões de escape. Essa saída revela mensagens do tipo 'moved to heap' e frequentemente sugere o motivo estrutural.",
        "Ela é especialmente útil quando combinada com heap profiles. Primeiro você encontra onde a memória realmente pesa; depois usa as mensagens do compilador para entender se a forma do código está contribuindo para aquilo.",
        "Sem esse casamento entre evidência de runtime e explicação do compilador, é fácil gastar horas refatorando pontos irrelevantes só para reduzir contagens estéticas de escape.",
      ],
      [
        {
          type: "example",
          title: "`go build -gcflags=-m=2`",
          body: "Aumentar a verbosidade da flag ajuda a enxergar melhor decisões de inlining e escape durante a compilação.",
        },
        {
          type: "insight",
          title: "Compiler output é conversa técnica",
          body: "Ele serve para orientar investigação localizada, não para produzir rankings de pureza de código.",
        },
      ],
    ),
    s(
      "inlining-pgo-e-versoes",
      "Evolução",
      "Escape analysis conversa com outras otimizações e com a versão do compilador",
      "Inlining e PGO podem mudar a visibilidade do contexto e alterar o resultado da análise.",
      undefined,
      undefined,
      [
        "O post sobre PGO lembra que inlining frequentemente destrava outras otimizações, inclusive melhor escape analysis. Quando o compilador enxerga mais do fluxo efetivo, pode tomar decisões mais refinadas sobre onde um valor realmente precisa viver.",
        "O mesmo vale para evolução de releases. A análise fica melhor ao longo do tempo, e por isso uma refatoração heroica para evitar escape em uma versão pode virar ruído em outra. O Go Wiki sobre otimizações reforça essa cautela.",
        "A conclusão madura é simples: não trate o compilador como inimigo estático. Trate-o como colaborador em evolução, e valide mudanças com benchmark e profile na versão que você realmente usa.",
      ],
      [
        {
          type: "definition",
          title: "Inlining",
          body: "Otimização em que o corpo de uma função simples é incorporado ao chamador, abrindo espaço para novas simplificações.",
        },
        {
          type: "insight",
          title: "Otimizações formam ecossistema",
          body: "Uma melhoria em inlining pode mudar escape analysis, que por sua vez muda pressão de heap e custo de GC.",
        },
      ],
    ),
    s(
      "refatorar-com-criterio",
      "Prática",
      "Refatorar para ajudar escape analysis só vale quando mantém ou melhora o desenho",
      "A melhor otimização costuma alinhar clareza de ownership com redução de alocação, em vez de transformar o código em enigma.",
      undefined,
      "go-allocation-pressure-dial",
      [
        "Há ajustes frequentes e saudáveis: retornar por valor quando faz sentido, reduzir captura desnecessária em closures, evitar espalhar ponteiros sem necessidade e simplificar APIs que publicam referências cedo demais.",
        "Mas também existe o lado ruim: sacrificar legibilidade por pequenas vitórias locais, criar contratos artificiais ou introduzir cópias maiores do que o necessário só para 'ganhar da heap'. Em alguns casos, o remédio sai mais caro do que a doença.",
        "O processo mais confiável é iterativo: medir, localizar hotspot, entender o motivo do escape, testar uma refatoração simples, medir de novo. Escape analysis recompensa engenharia criteriosa, não superstição.",
      ],
      [
        {
          type: "example",
          title: "Perfil primeiro, refatoração depois",
          body: "Se a alocação não aparece em hot path nem pressiona GC, talvez ela seja apenas o custo correto do design atual.",
        },
        {
          type: "mistake",
          title: "Reescrever APIs inteiras por um escape frio",
          body: "Otimizar fora do caminho quente pode aumentar complexidade sem impacto perceptível no sistema.",
        },
      ],
    ),
    s(
      "sintese",
      "Síntese",
      "Escape analysis é onde semântica de API encontra custo de runtime",
      "Ela transforma perguntas aparentemente locais sobre ponteiros e valores em decisões globais sobre heap, GC e latência.",
      "go-escape-summary",
      undefined,
      [
        "Quando você começa a ler código Go perguntando 'quem guarda esta referência e até quando?', escape analysis deixa de ser um tópico misterioso do compilador e passa a ser extensão natural do desenho da API.",
        "A boa notícia é que o ecossistema oficial do Go oferece as peças necessárias para estudar isso com seriedade: flags do compilador, GC guide, heap profiles, trace e benchmark. A má notícia é que não existe atalho teórico para escapar da necessidade de medir.",
        "No fim, aprender escape analysis é aprender a distinguir heap inevitável de heap acidental. Essa distinção vale ouro em serviços intensivos e bibliotecas de infraestrutura.",
      ],
      [
        {
          type: "insight",
          title: "Lifetime é a ponte entre estilo e performance",
          body: "Decisões aparentemente estilísticas sobre valor, ponteiro e closure acabam influenciando trabalho real do runtime.",
        },
      ],
    ),
    s(
      "quiz-revisao",
      "Revisão",
      "Quiz de revisão",
      "Verifique se lifetime, stack, heap, gatilhos de escape e leitura do compilador ficaram bem conectados.",
      undefined,
      "quiz",
      [
        "O objetivo não é decorar bandeiras de compilação, e sim entender quando a heap é necessária e quando ela pode ser evitada com desenho melhor.",
      ],
      [],
    ),
    s(
      "glossario",
      "Glossário",
      "Termos essenciais",
      "Feche a aula consolidando o vocabulário de alocação e análise de escape em Go.",
      undefined,
      "glossary",
      [
        "Esses termos reaparecem ao estudar GC, perfis de memória, PGO e otimizações do compilador.",
      ],
      [],
    ),
  ],
  summaryCards: [
    {
      title: "Escape analysis é análise de lifetime",
      body: "Ela pergunta se o valor pode morrer localmente ou precisa sobreviver além do frame atual.",
    },
    {
      title: "Heap traz flexibilidade e custo",
      body: "Alocação, rastreamento e GC entram na conta sempre que o valor precisa escapar.",
    },
    {
      title: "Ponteiros, closures e indireção pedem atenção",
      body: "São padrões comuns em que o compilador pode precisar escolher a heap.",
    },
    {
      title: "Compiler output ajuda, mas não decide sozinho",
      body: "Mensagens de `-gcflags=-m` devem ser lidas junto com perfis e contexto do hot path.",
    },
    {
      title: "Inlining e PGO influenciam o resultado",
      body: "Escape analysis não vive isolada; ela muda com o restante do pipeline de otimização.",
    },
    {
      title: "Boa otimização preserva clareza",
      body: "A melhor refatoração costuma melhorar ownership e reduzir alocação ao mesmo tempo.",
    },
  ],
  quiz: [
    q(
      "q1",
      "Qual pergunta resume melhor escape analysis em Go?",
      "Este valor pode morrer junto com o frame atual ou precisa sobreviver além dele?",
      "Este valor usa muitos campos ou poucos campos?",
      "Este valor foi declarado com `var` ou com `:=`?",
      "a",
      "A análise central é de lifetime e publicação de referências, não de sintaxe superficial.",
    ),
    q(
      "q2",
      "Por que valores na heap costumam custar mais?",
      "Porque entram no regime de alocação do runtime e ampliam o trabalho potencial do GC.",
      "Porque sempre são copiados mais vezes pela CPU.",
      "Porque não podem ser acessados por ponteiros.",
      "a",
      "O custo composto envolve alocação, rastreamento e pressão sobre o coletor.",
    ),
    q(
      "q3",
      "O que significa um escape ser necessário?",
      "Que a semântica do programa realmente exige que o valor sobreviva ao escopo local.",
      "Que o compilador falhou e deve ser ignorado.",
      "Que qualquer uso de ponteiro é bug.",
      "a",
      "Heap nem sempre é problema; muitas vezes ela é a consequência correta do lifetime pedido.",
    ),
    q(
      "q4",
      "Qual padrão frequentemente desencadeia escape?",
      "Retornar ponteiro para valor local ou capturá-lo em closure de vida maior.",
      "Usar comentários acima da variável.",
      "Declarar a variável no começo da função.",
      "a",
      "Retorno de ponteiro e captura em closure são gatilhos clássicos porque prolongam o lifetime.",
    ),
    q(
      "q5",
      "Para que serve `-gcflags=-m`?",
      "Para inspecionar decisões de otimização do compilador, incluindo escape analysis.",
      "Para forçar todos os valores para a stack.",
      "Para substituir heap profiles.",
      "a",
      "É ferramenta de diagnóstico importante, mas precisa ser combinada com observabilidade de runtime.",
    ),
    q(
      "q6",
      "Como inlining pode ajudar escape analysis?",
      "Ao expor mais contexto ao compilador, facilitando provas mais refinadas.",
      "Ao impedir qualquer alocação no heap.",
      "Ao tornar closures impossíveis.",
      "a",
      "Inlining e escape analysis interagem; otimizações raramente vivem isoladas.",
    ),
    q(
      "q7",
      "Qual é uma boa heurística de refatoração?",
      "Medir primeiro, atacar hotspots reais e preferir mudanças que preservem clareza de ownership.",
      "Eliminar todo escape mesmo em caminhos frios.",
      "Trocar todo retorno por ponteiro por retorno por valor sem exceção.",
      "a",
      "A melhor otimização é localizada, justificada por perfil e compatível com o desenho da API.",
    ),
    q(
      "q8",
      "Qual conclusão é mais madura sobre stack vs heap em Go?",
      "São regimes diferentes de lifetime e custo; nenhum deles é automaticamente bom ou ruim.",
      "Stack sempre indica código avançado e heap sempre indica código ruim.",
      "Heap só aparece quando há bug de compilador.",
      "a",
      "A decisão correta depende do lifetime que o programa realmente exige e do que o compilador consegue provar.",
    ),
  ],
  glossary: [
    g("Escape analysis", "Análise do compilador que decide se um valor pode permanecer local ou precisa ir para a heap."),
    g("Lifetime", "Duração durante a qual um valor precisa permanecer válido."),
    g("Stack", "Memória associada a escopos locais e frames de execução, geralmente barata para valores temporários."),
    g("Heap", "Memória usada para valores cuja vida útil ultrapassa a disciplina simples da stack."),
    g("Frame", "Contexto local de uma chamada de função."),
    g("Closure", "Função que captura variáveis do ambiente onde foi criada."),
    g("Aliasing", "Existência de múltiplas referências que podem acessar o mesmo dado."),
    g("Inlining", "Otimização que incorpora o corpo de uma função no chamador."),
    g("PGO", "Profile-Guided Optimization; uso de perfis reais para guiar escolhas do compilador."),
    g("Hot path", "Trecho de código executado com muita frequência ou custo relevante."),
    g("Heap profile", "Perfil que revela onde a aplicação aloca e retém memória."),
    g("`-gcflags=-m`", "Flag do compilador usada para mostrar informações de otimização, incluindo escapes."),
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
