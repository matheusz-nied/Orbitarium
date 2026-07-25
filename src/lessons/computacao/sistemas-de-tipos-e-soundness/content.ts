import type { LessonContent } from "../../../types/content";

export const sistemasDeTiposESoundnessContent: LessonContent = {
  id: "sistemas-de-tipos-e-soundness",
  title: "Sistemas de Tipos e Soundness",
  subtitle:
    "Tipos podem funcionar como prova parcial sobre um programa: eles não garantem tudo, mas conseguem transformar certas classes de erro em impossibilidades estáticas quando a linguagem sustenta esse contrato.",
  description:
    "Uma aula avançada sobre tipos como garantias parciais, a intuição de progress e preservation, por que soundness importa em systems programming e como Rust e Go prometem coisas diferentes sobre memória, aliasing e fronteiras unsafe.",
  primaryCategoryId: "computacao",
  secondaryCategoryId: "matematica",
  level: "Avançado",
  estimatedTime: "55-65 min",
  tags: [
    "Type Systems",
    "Soundness",
    "Rust",
    "Go",
    "Progress",
    "Preservation",
    "Unsafe",
  ],
  learningObjectives: [
    "Entender sistemas de tipos como contratos estáticos que provam algumas propriedades, mas não a correção total do programa.",
    "Explicar a intuição de progress e preservation sem depender de uma formalização pesada.",
    "Distinguir uma linguagem sound de uma linguagem apenas tipada estaticamente com fronteiras mais permissivas.",
    "Relacionar ownership e borrowing em Rust à ideia de tipar recursos e não apenas valores.",
    "Comparar o que Rust e Go capturam em compile-time e o que deixam para runtime, disciplina ou tooling.",
    "Reconhecer onde unsafe, FFI e reflection enfraquecem a prova e exigem obrigações extras.",
  ],
  prerequisites: [
    "Rust: ownership e borrowing.",
    "Rust: unsafe e fronteiras seguras.",
    "Segurança de memória, lifetime e undefined behavior.",
    "Go: modelo mental, interfaces e custos operacionais.",
  ],
  references: [
    {
      title: "What is Ownership?",
      source: "The Rust Programming Language",
      url: "https://doc.rust-lang.org/stable/book/ch04-01-what-is-ownership.html",
      note: "Base oficial para entender ownership como parte central das garantias estáticas de Rust.",
    },
    {
      title: "How Safe and Unsafe Interact",
      source: "The Rustonomicon",
      url: "https://doc.rust-lang.org/nomicon/safe-unsafe-meaning.html",
      note: "Explica a fronteira safe/unsafe e a noção de soundness em Rust.",
    },
    {
      title: "Keyword unsafe",
      source: "Rust Standard Library Documentation",
      url: "https://doc.rust-lang.org/stable/std/keyword.unsafe.html",
      note: "Resume o papel de contratos que o type system não consegue verificar automaticamente.",
    },
    {
      title: "The Go Programming Language Specification",
      source: "Go Project",
      url: "https://go.dev/ref/spec",
      note: "Referência oficial para tipos, interfaces, assignability e distinção entre tipo estático e dinâmico.",
    },
    {
      title: "Lecture Notes: Type Soundness",
      source: "Carnegie Mellon University",
      url: "https://www.cs.cmu.edu/~aldrich/courses/17-363-fa21/notes/lecture10-soundness.pdf",
      note: "Notas claras sobre a intuição de well-typed programs, progress e preservation.",
    },
    {
      title: "Practical Foundations for Programming Languages: Type Safety",
      source: "Northeastern University",
      url: "https://www.khoury.northeastern.edu/~cmartens/Courses/7400-f24/pfpl/6-type-safety.pdf",
      note: "Material universitário que formula soundness como ausência de estados stuck para programas bem tipados.",
    },
  ],
  heroVisual: "lesson-hero",
  openingText:
    "Quando alguém diz que uma linguagem 'tem tipos fortes', a frase costuma soar mais poderosa do que realmente é. Um type system não é um detector universal de bugs, nem uma prova completa de que o programa faz a coisa certa. O que ele oferece, quando bem desenhado, é mais específico e muito útil: ele elimina certas formas de incoerência antes da execução e força contratos mais nítidos sobre dados, recursos e fronteiras. Em linguagens de sistemas, isso muda bastante o jogo. Rust tenta empurrar parte da segurança de memória e de aliasing para o compile-time. Go, por outro lado, escolhe uma tipagem mais simples e pragmática, aceitando que várias decisões continuem em runtime ou na disciplina da equipe. Entender soundness é entender exatamente onde essa promessa começa, onde ela para e por que isso importa tanto.",
  quickFacts: [
    {
      title: "Tipo prova parte, não tudo",
      body: "O checker elimina algumas classes de erro, mas não substitui especificação, teste ou raciocínio sobre negócio.",
    },
    {
      title: "Soundness é sobre não 'travar errado'",
      body: "A intuição clássica é que programas bem tipados não deveriam entrar em estados absurdos para o modelo da linguagem.",
    },
    {
      title: "Rust tipa recursos",
      body: "Ownership e borrowing colocam validade, aliasing e mutabilidade dentro do contrato estático.",
    },
    {
      title: "Escape hatch move a obrigação",
      body: "Unsafe, FFI e reflection não apagam a necessidade de prova; eles apenas a deslocam do compilador para você.",
    },
  ],
  sections: [
    s(
      "tipos-como-contratos-estaticos",
      "Fundação",
      "Tipos são contratos estáticos sobre formas e usos possíveis",
      "O type system não descreve o mundo inteiro; ele descreve uma fatia do programa que a linguagem consegue verificar cedo e de modo mecânico.",
      "concept-grid",
      undefined,
      [
        "Em um nível bem concreto, um tipo diz quais valores uma expressão pode produzir e quais operações fazem sentido sobre ela. Isso já evita erros banais, como misturar coisas incompatíveis, chamar operações inexistentes ou assumir um formato de dado que nunca foi garantido.",
        "Mas, em linguagens modernas, a ideia vai além de 'int não é string'. Tipos também podem codificar protocolos de uso, capacidades disponíveis, ownership, mutabilidade, nulidade, efeitos ou estados possíveis de uma API. Quanto mais a linguagem consegue expressar, mais ela desloca parte do raciocínio do runtime para o compile-time.",
        "O ganho real não é parecer sofisticado; é trocar classes de surpresa operacional por mensagens locais e auditáveis. Em vez de descobrir tarde que um contrato foi quebrado, você força o programa a expor cedo o que ele acredita estar provando.",
      ],
      [
        {
          type: "definition",
          title: "Sistema de tipos",
          body: "Conjunto de regras estáticas que classifica expressões e restringe quais combinações de valores e operações são consideradas válidas.",
        },
        {
          type: "insight",
          title: "Tipos são compressão de hipótese",
          body: "Cada anotação, inferência ou restrição de tipo reduz o espaço de estados que o restante do programa precisa considerar.",
        },
      ],
    ),
    s(
      "tipos-como-prova-parcial",
      "Limite",
      "Aceitar no type checker não é provar o programa inteiro",
      "Um programa pode estar perfeitamente bem tipado e ainda assim ter lógica errada, desempenho ruim ou comportamento operacional inadequado.",
      "impact-board",
      undefined,
      [
        "Dizer que tipos são uma prova parcial é uma forma honesta de calibrar expectativas. Eles provam algumas propriedades e ignoram outras. Um type checker pode impedir o uso de um valor incompatível, mas não sabe, por si só, se o algoritmo escolheu a conta certa, se a política de retry faz sentido ou se a regra de negócio está correta.",
        "Mesmo em sistemas sofisticados, vários fatos importantes permanecem fora do escopo estático: terminação, justiça, latência, ausência de deadlock, corretude matemática de uma fórmula, segurança de uma integração externa ou semântica exata de dados vindos de outro processo.",
        "Essa distinção é saudável para systems programming. Quando você sabe o que o compilador está verificando, evita dois extremos ruins: confiar demais na tipagem e desprezar demais a tipagem. O ponto maduro é usar tipos para reduzir o campo de erro, sem fingir que eles substituem o resto da engenharia.",
      ],
      [
        {
          type: "example",
          title: "Programa bem tipado, lógica ruim",
          body: "Uma função pode receber e devolver tipos corretos em todas as bordas e ainda cobrar imposto duas vezes, ordenar no critério errado ou aplicar um retry destrutivo demais.",
        },
        {
          type: "mistake",
          title: "Confundir compilar com estar certo",
          body: "O compilador só consegue provar o que a linguagem modela e o que o type system realmente expressa. O restante continua sendo problema seu.",
        },
      ],
    ),
    s(
      "progress-e-preservation",
      "Intuição formal",
      "Progress e preservation explicam por que 'bem tipado' não deveria travar do nada",
      "A formulação clássica de soundness não precisa começar com símbolos; ela pode começar com duas perguntas simples sobre a execução.",
      "pipeline-diagram",
      "guarantee-checker",
      [
        "A primeira pergunta é: se a expressão está bem tipada e ainda não terminou, existe um próximo passo válido de execução? Essa é a intuição de progress. Um estado bem tipado não deveria ficar preso num impasse absurdo para a semântica da linguagem.",
        "A segunda pergunta é: quando o programa dá um passo, ele continua obedecendo ao mesmo contrato de tipo? Essa é a intuição de preservation. Se um termo tinha um certo tipo antes da redução, o passo de execução não deveria transformá-lo magicamente em algo incompatível.",
        "Juntas, essas duas ideias aproximam a famosa frase 'well-typed programs cannot go wrong'. Não significa que programas bem tipados sempre terminam ou sempre entregam a resposta desejada. Significa que, dentro do modelo da linguagem, eles não deveriam cair em estados stuck que contradizem a própria promessa do type system.",
      ],
      [
        {
          type: "definition",
          title: "Progress",
          body: "Se uma expressão bem tipada ainda não é um valor final, então existe um próximo passo de execução permitido pelo modelo operacional.",
        },
        {
          type: "definition",
          title: "Preservation",
          body: "Se uma expressão bem tipada dá um passo de execução, o resultado desse passo continua bem tipado.",
        },
      ],
    ),
    s(
      "soundness-como-promessa-operacional",
      "Garantia",
      "Soundness é uma promessa operacional, não um selo metafísico",
      "A utilidade da noção de soundness aparece quando você liga tipagem a comportamento real de execução e, em especial, ao que não deveria acontecer.",
      "impact-board",
      undefined,
      [
        "Em materiais introdutórios, às vezes soundness vira uma palavra grandiosa demais. Na prática, ela quer responder algo operacional: o programa aceito pelo sistema de tipos pode entrar em um estado que a própria linguagem considera errado ou indefinido?",
        "No contexto de Rust, por exemplo, a promessa central é formulada de maneira muito concreta: código Safe Rust não deve conseguir causar undefined behavior. Isso é mais forte e mais útil do que dizer apenas que 'a linguagem tem tipos'. O type system e as regras ao redor dele participam diretamente da fronteira de memória e aliasing.",
        "Já em outras linguagens, a tipagem pode ser estática e ainda assim delegar várias verificações essenciais para runtime. Isso não torna a linguagem inútil nem 'fraca'; apenas significa que a promessa operacional é diferente. Sem essa distinção, toda discussão sobre segurança vira slogan.",
      ],
      [
        {
          type: "insight",
          title: "Soundness pergunta sobre execução, não só sobre sintaxe",
          body: "O valor da tipagem aparece quando a classificação estática continua coerente com a semântica que o runtime realmente executa.",
        },
        {
          type: "example",
          title: "Estado stuck",
          body: "Um estado stuck não é simplesmente 'a resposta saiu errada'; é um ponto em que o programa não é valor final, mas também não possui próximo passo válido segundo as regras da linguagem.",
        },
      ],
    ),
    s(
      "expressividade-vs-decidabilidade",
      "Trade-off",
      "Quanto mais você quer expressar, mais difícil fica checar automaticamente",
      "Type systems vivem no meio de tensões reais entre poder expressivo, ergonomia, inferência, custo mental e capacidade de decisão automática.",
      "tradeoff-spectrum",
      undefined,
      [
        "Se a linguagem quer codificar fatos cada vez mais ricos sobre o programa, o checker precisa lidar com provas cada vez mais sofisticadas. Em algum ponto isso encarece a compilação, piora mensagens de erro, exige anotações demais ou até torna a verificação geral indecidível.",
        "Por isso linguagens reais escolhem recortes. Algumas preferem simplicidade e previsibilidade, aceitando garantias menos profundas. Outras assumem mais complexidade para capturar propriedades mais fortes sobre estados, recursos, mutabilidade ou efeitos.",
        "O ponto importante para esta aula é perceber que 'mais tipos' não é automaticamente melhor. O melhor sistema é o que entrega uma fronteira útil entre o que pode ser provado cedo e o que continua mais barato, mais claro ou mais honesto de verificar em outra camada.",
      ],
      [
        {
          type: "definition",
          title: "Decidibilidade",
          body: "Propriedade de um problema de verificação para o qual existe um procedimento mecânico que sempre termina com uma resposta.",
        },
        {
          type: "example",
          title: "Tipos de estado ajudam, mas cobram design",
          body: "Modelar uma conexão como 'aberta', 'fechada' ou 'em handshake' pode evitar APIs inválidas, mas exige que o resto da base aceite essa precisão adicional.",
        },
      ],
    ),
    s(
      "ownership-borrowing-como-tipagem-de-recursos",
      "Rust",
      "Ownership e borrowing tratam recursos como parte do sistema de tipos",
      "A ponte com as aulas anteriores de Rust fica mais clara quando você lê ownership não como regra isolada, mas como teoria operacional de recursos incorporada à tipagem.",
      "pipeline-diagram",
      undefined,
      [
        "Em Rust, a pergunta 'quem é dono?', 'quem só observa?' e 'por quanto tempo isso continua válido?' não fica apenas na cabeça do programador. Boa parte dessa política aparece em tipos, lifetimes, regras de borrowing e restrições sobre mutabilidade exclusiva.",
        "Isso torna ownership um caso concreto de type system fazendo trabalho pesado sobre recursos, não apenas sobre formas de dados. A linguagem tenta impedir que referências pendurem no nada, que aliasing mutável incompatível pareça inocente e que o programa trate um recurso como simultaneamente compartilhado e exclusivo.",
        "Lida desse jeito, Rust serve como exemplo excelente de tipos como prova parcial: ele não prova correção total, mas consegue deslocar para compile-time uma classe muito valiosa de garantias que em outras linguagens costumam depender de GC, disciplina manual, testes ou revisão extremamente cuidadosa.",
      ],
      [
        {
          type: "example",
          title: "Referência válida depende do owner",
          body: "Uma referência segura em Rust não é apenas um endereço tipado; ela carrega a promessa de que o valor referenciado continua vivo durante aquela janela de uso.",
        },
        {
          type: "insight",
          title: "Tipos podem governar recursos, não só valores",
          body: "Ownership, borrowing e mutabilidade exclusiva mostram que um sistema de tipos pode modelar política de acesso e tempo de vida, não só formato de dados.",
        },
      ],
    ),
    s(
      "go-promessas-mais-modestas",
      "Go",
      "Go privilegia contratos mais simples e deixa mais trabalho para runtime e disciplina",
      "Comparar Go com Rust é útil justamente porque as duas linguagens são honestas de maneiras diferentes sobre custo, simplicidade e garantias.",
      "impact-board",
      "rust-vs-go-lens",
      [
        "A especificação de Go descreve tipos, assignability, method sets, interfaces e também a distinção entre tipo estático e tipo dinâmico de valores armazenados em interfaces. Isso já produz muito valor: APIs ficam legíveis, contratos mínimos podem ser expressos e várias incoerências são barradas cedo.",
        "Ao mesmo tempo, Go escolhe não embutir no type system uma teoria tão forte de ownership, aliasing e validade de referências quanto Rust. O runtime, o garbage collector, checagens dinâmicas, pânicos em certos casos e a disciplina do programador continuam participando fortemente da história.",
        "Por isso a pergunta madura não é 'qual tem tipagem melhor?', mas 'qual promessa operacional cada uma faz?'. Rust empurra mais invariantes para o compile-time. Go prefere uma superfície mais simples, aceitando que algumas falhas apareçam em runtime ou dependam de testes, race detector e desenho de API.",
      ],
      [
        {
          type: "definition",
          title: "Tipo estático e tipo dinâmico em interfaces Go",
          body: "Uma variável de interface em Go possui um tipo estático conhecido na declaração e pode armazenar, em runtime, valores de tipos concretos diferentes que implementem aquela interface.",
        },
        {
          type: "mistake",
          title: "Achar que interface implica prova completa",
          body: "Interfaces em Go descrevem capacidades e assignability; elas não eliminam, sozinhas, a necessidade de checagens dinâmicas, panics possíveis ou disciplina de uso.",
        },
      ],
    ),
    s(
      "escape-hatches-e-obrigacoes",
      "Fronteiras",
      "Unsafe, FFI e reflection são escapes controlados - e por isso exigem novas provas",
      "Quando a linguagem encontra algo que o type system não consegue verificar sozinho, ela precisa ou recuar para runtime ou abrir uma fronteira com contratos extras.",
      "tradeoff-spectrum",
      "escape-hatch-lab",
      [
        "No Rustonomicon e na documentação oficial, `unsafe` é apresentado como a fronteira entre o que o compilador consegue garantir e o que passa a depender de contratos explicitamente assumidos pelo programador. A prova não some; ela apenas deixa de ser automática.",
        "Em Go, reflection, type assertions, `unsafe` package e integrações externas também movem parte da certeza para runtime ou para convenções que o compilador não consegue enxergar. O mesmo vale para qualquer FFI: a linguagem A não consegue provar sozinha os contratos de memória, layout, lifetime e calling convention da linguagem B.",
        "Essa é a leitura madura de um escape hatch: não é um 'modo turbo' que torna tipos irrelevantes. É um lugar em que você precisa escrever, revisar e isolar melhor as suposições, porque a máquina de prova estática ficou menor.",
      ],
      [
        {
          type: "definition",
          title: "Escape hatch",
          body: "Mecanismo que permite ultrapassar ou contornar parte das garantias normais do sistema de tipos, exigindo prova manual, checagem dinâmica ou contrato externo.",
        },
        {
          type: "mistake",
          title: "Usar escape hatch como atalho sem fronteira",
          body: "Quando `unsafe`, reflection ou FFI se espalham sem encapsulamento, a área que precisa de raciocínio manual cresce mais rápido do que a equipe consegue auditar.",
        },
      ],
    ),
    s(
      "soundness-memory-safety-e-ub",
      "Conexão",
      "Quando a garantia falha, segurança de memória e UB voltam para a conversa",
      "A ponte com segurança de memória existe porque várias discussões sobre soundness ficam concretas justamente quando pensamos em referências inválidas, layout e aliasing.",
      "impact-board",
      undefined,
      [
        "Em uma linguagem de sistemas, uma violação de soundness raramente é apenas uma curiosidade teórica. Ela pode abrir caminho para undefined behavior, corrupção de memória, leituras inválidas, uso após liberação ou quebra de invariantes que o restante do programa considerava impossíveis.",
        "Isso explica por que Rust fala tanto em manter o mundo safe sound mesmo quando alguma parte interna usa `unsafe`. O objetivo não é demonizar baixo nível, e sim concentrar obrigações perigosas em fronteiras pequenas e auditáveis para que o código seguro continue confiando no contrato exposto.",
        "Essa lente também ajuda a ler outras linguagens. Mesmo quando o type system não pretende capturar tudo, vale perguntar: onde a integridade do programa depende apenas de disciplina humana, e onde existe uma barreira mecânica que realmente reduz o espaço de desastre?",
      ],
      [
        {
          type: "insight",
          title: "Teoria aqui vira bug concreto muito rápido",
          body: "Quando o assunto é sistemas, uma quebra de soundness frequentemente significa abrir brecha para estados que não são apenas 'feios', mas operacionalmente perigosos.",
        },
        {
          type: "example",
          title: "FFI sem contrato de ownership",
          body: "Se dois lados acreditam que ambos devem liberar o mesmo recurso, a violação pode nascer como mal-entendido de interface e terminar como double free ou corrupção silenciosa.",
        },
      ],
    ),
    s(
      "tipos-nao-substituem-outras-praticas",
      "Prática",
      "Tipos não substituem testes, especificações, observabilidade nem benchmark",
      "A aula fica mais útil quando termina com uma visão integrada: tipagem forte melhora o jogo, mas não encerra o trabalho de engenharia.",
      "concept-grid",
      undefined,
      [
        "Especificações continuam sendo a camada que diz o que o programa deve fazer. Testes continuam sendo a camada que busca contradições entre intenção e implementação. Observabilidade continua sendo a camada que mostra o que realmente acontece em produção. Benchmark continua sendo a camada que revela custo real.",
        "Um sistema de tipos pode ajudar em todas essas frentes ao deixar interfaces mais precisas, estados impossíveis menos numerosos e suposições mais explícitas. Ainda assim, ele não mede latência, não valida contratos com serviços externos e não decide se a política operacional adotada é a certa.",
        "Em times maduros, tipos não competem com essas práticas; eles reduzem entropia para que o restante da verificação fique mais focado. É muito melhor testar uma superfície já estreitada por invariantes estáticos do que começar do zero toda vez.",
      ],
      [
        {
          type: "example",
          title: "Bounds e corretude são camadas diferentes",
          body: "Seu tipo pode garantir que um parser nunca trate bytes como ponteiros válidos, e ainda assim o parser pode aceitar um formato inválido ou classificar dados no campo errado.",
        },
        {
          type: "insight",
          title: "Tipos melhoram o alvo dos testes",
          body: "Quanto mais invariantes simples o compilador protege, menos energia de teste você desperdiça em classes de erro já descartadas antes da execução.",
        },
      ],
    ),
    s(
      "heuristicas-para-systems-programmers",
      "Projeto",
      "Heurísticas rápidas para quem desenha APIs, runtimes e fronteiras",
      "A utilidade final do tema está em como ele muda decisões de design no código real.",
      "pipeline-diagram",
      undefined,
      [
        "Primeiro: tente colocar nos tipos tudo o que for local, frequente e barato de verificar. Segundo: seja explícito quando uma fronteira depender de obrigação humana extra. Terceiro: mantenha escapes pequenos para que o restante do sistema possa continuar confiando em interfaces seguras e previsíveis.",
        "Também vale preferir contratos que ajudem o leitor a enxergar posse, validade, nulidade, mutabilidade e estados possíveis cedo. Em muitos casos, a clareza da superfície da API vale tanto quanto a expressividade máxima do checker.",
        "Por fim, compare linguagens pelo tipo de promessa que elas realmente entregam. A pergunta útil não é 'quem venceu?', mas 'quais erros esta linguagem me ajuda a transformar em impossibilidade estática e quais continuam exigindo outras formas de controle?'.",
      ],
      [
        {
          type: "example",
          title: "Regra de bolso",
          body: "Coloque nos tipos o que é recorrente, local e auditável; deixe para runtime o que depende de ambiente, dados externos ou custo excessivo de prova estática.",
          items: [
            "Tipe ownership, estados e capacidades quando isso simplifica o restante da API.",
            "Isole `unsafe`, FFI e reflection em módulos pequenos com contrato documentado.",
            "Não use a palavra 'sound' como marketing; use-a para descrever uma promessa operacional específica.",
          ],
        },
        {
          type: "definition",
          title: "Heurística de fronteira",
          body: "Uma boa fronteira é aquela em que a prova automática cobre a maior área possível e a prova manual fica concentrada, explícita e revisável.",
        },
      ],
    ),
    s(
      "quiz-revisao",
      "Revisão",
      "Quiz de revisão",
      "Teste se você já distingue o que um sistema de tipos prova, o que soundness promete e onde Rust e Go se separam.",
      undefined,
      "quiz",
      [
        "As perguntas abaixo priorizam cenário e interpretação, não memorização de palavras isoladas.",
      ],
      [],
    ),
    s(
      "glossario",
      "Glossário",
      "Termos essenciais",
      "Feche a aula consolidando o vocabulário que aparece em materiais de PL, Rust, Go e segurança de memória.",
      undefined,
      "glossary",
      [
        "Ter esses termos nítidos ajuda a ler documentação oficial sem transformar cada página em um novo idioma.",
      ],
      [],
    ),
  ],
  summaryCards: [
    {
      title: "Tipos são prova parcial",
      body: "Eles estreitam o espaço de estados válidos, mas não provam correção total do sistema.",
    },
    {
      title: "Progress + preservation dão a intuição",
      body: "Programas bem tipados não deveriam ficar stuck em estados absurdos para a semântica da linguagem.",
    },
    {
      title: "Rust leva a promessa mais longe",
      body: "Ownership e borrowing transformam validade e aliasing em parte da verificação estática.",
    },
    {
      title: "Go escolhe simplicidade maior",
      body: "A tipagem continua útil, mas várias garantias ficam distribuídas entre runtime, GC, tooling e disciplina.",
    },
    {
      title: "Escape hatch desloca obrigação",
      body: "Unsafe, FFI e reflection não removem prova; apenas trocam prova automática por contrato manual ou dinâmico.",
    },
    {
      title: "Tipos não encerram a engenharia",
      body: "Especificação, testes, observabilidade e benchmark continuam indispensáveis.",
    },
  ],
  quiz: [
    q(
      "q1",
      "Qual leitura é mais fiel à frase 'tipos são prova parcial'?",
      "O sistema de tipos elimina algumas classes de incoerência, mas não decide sozinho se toda a lógica do programa está correta.",
      "Se o código compila, todos os bugs restantes são apenas de performance.",
      "Tipos só servem para documentação visual, sem impacto real na execução.",
      "a",
      "A força dos tipos está em provar certas propriedades, não em substituir toda a verificação de comportamento.",
    ),
    q(
      "q2",
      "Qual situação descreve melhor a intuição de progress?",
      "Uma expressão bem tipada que ainda não terminou deveria ser capaz de dar um próximo passo válido de execução.",
      "Toda expressão bem tipada deve terminar em tempo polinomial.",
      "Cada passo de execução precisa tornar o programa menor em número de linhas.",
      "a",
      "Progress fala sobre não ficar preso em estado stuck, não sobre rapidez ou terminação garantida.",
    ),
    q(
      "q3",
      "O que preservation tenta garantir?",
      "Que a execução não destrói arbitrariamente o contrato de tipo a cada passo.",
      "Que o programa sempre preserva a mesma performance ao longo do tempo.",
      "Que toda variável preserva o mesmo valor até o fim da execução.",
      "a",
      "Preservation mantém coerência entre tipagem estática e redução operacional.",
    ),
    q(
      "q4",
      "Uma equipe modela ownership e borrowing na API de uma biblioteca Rust. Qual é o ganho principal dessa escolha?",
      "Parte da política de validade, aliasing e mutabilidade passa a ser rejeitada cedo pelo compilador.",
      "O runtime deixa de existir e nenhuma checagem dinâmica será necessária em qualquer camada.",
      "Todos os bugs de negócio ficam impossíveis por definição.",
      "a",
      "Rust não resolve tudo, mas move várias garantias valiosas sobre recursos para compile-time.",
    ),
    q(
      "q5",
      "Em Go, por que a distinção entre tipo estático e tipo dinâmico em interfaces importa?",
      "Porque um valor pode satisfazer a interface estaticamente e ainda exigir checagens dinâmicas em runtime para certas operações concretas.",
      "Porque interfaces em Go só funcionam com herança explícita declarada na struct.",
      "Porque o compilador de Go converte qualquer valor para qualquer interface sem contrato algum.",
      "a",
      "A interface fixa um contrato estático, mas o valor concreto armazenado continua relevante em runtime.",
    ),
    q(
      "q6",
      "Qual frase descreve melhor um escape hatch como `unsafe`, FFI ou reflection?",
      "É uma fronteira em que a prova automática diminui e a obrigação de manter contratos passa mais para runtime ou para o programador.",
      "É uma forma de desligar permanentemente o sistema de tipos de toda a aplicação.",
      "É apenas um atalho de performance que não afeta soundness.",
      "a",
      "O ponto central não é 'mais rápido', e sim 'menos verificável automaticamente'.",
    ),
    q(
      "q7",
      "Qual comparação entre Rust e Go é mais honesta do ponto de vista da aula?",
      "Rust e Go fazem promessas diferentes: Rust empurra mais invariantes para compile-time; Go mantém tipagem útil, mas depende mais de runtime, GC e disciplina em algumas frentes.",
      "Go não possui sistema de tipos de verdade, enquanto Rust resolve qualquer classe de erro.",
      "As duas linguagens oferecem as mesmas garantias; muda apenas a sintaxe.",
      "a",
      "A comparação madura é sobre o que cada linguagem realmente promete e consegue sustentar.",
    ),
    q(
      "q8",
      "Por que tipos não substituem testes e observabilidade?",
      "Porque várias propriedades relevantes dependem de dados, ambiente, integração externa, desempenho real e regras que o type system não modela sozinho.",
      "Porque testes existem apenas para linguagens dinamicamente tipadas.",
      "Porque um sistema sound torna toda medição operacional irrelevante.",
      "a",
      "A engenharia continua multi-camada: tipos reduzem entropia, mas não encerram o trabalho.",
    ),
  ],
  glossary: [
    g("Sistema de tipos", "Conjunto de regras estáticas que classifica expressões e restringe usos considerados válidos."),
    g("Soundness", "Propriedade intuitiva segundo a qual programas aceitos pelo sistema de tipos não deveriam entrar em estados inválidos para a semântica da linguagem."),
    g("Type safety", "Nome frequentemente usado para a noção de que programas bem tipados não 'dão errado' no sentido modelado pela linguagem."),
    g("Progress", "Ideia de que uma expressão bem tipada ou já é valor final ou pode dar mais um passo de execução."),
    g("Preservation", "Ideia de que um passo de execução preserva o contrato de tipo da expressão."),
    g("Estado stuck", "Estado que não é valor final e também não possui próximo passo válido de execução."),
    g("Decidibilidade", "Capacidade de um procedimento mecânico sempre terminar com resposta para um problema de verificação."),
    g("Invariante", "Propriedade que precisa continuar verdadeira para que uma abstração permaneça correta."),
    g("Ownership", "Modelo que explicita quem responde por um recurso e por quanto tempo ele continua válido."),
    g("Borrowing", "Uso temporário de um valor sem transferência de posse plena."),
    g("Aliasing", "Situação em que múltiplos acessos se referem ao mesmo dado subjacente."),
    g("Interface", "Tipo que descreve capacidades exigidas de um valor, em vez de sua representação concreta."),
    g("Tipo dinâmico", "Tipo concreto em runtime de um valor armazenado por trás de uma interface."),
    g("FFI", "Foreign Function Interface, fronteira de interoperabilidade entre linguagens ou runtimes diferentes."),
    g("Reflection", "Mecanismo de inspecionar e manipular tipos e valores em runtime, frequentemente reduzindo garantias estáticas."),
    g("Unsafe", "Fronteira em que o compilador deixa de provar parte da segurança e contratos extras precisam ser mantidos manualmente."),
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
