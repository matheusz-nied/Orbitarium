import type { LessonContent } from "../../../types/content";

export const memoriaStackHeapPonteirosContent: LessonContent = {
  id: "memoria-stack-heap-ponteiros",
  title: "Memória: Stack, Heap e Ponteiros",
  subtitle:
    "Variáveis não vivem num vazio abstrato: elas ocupam endereços, têm tempo de vida e obedecem regras que explicam por que alguns bugs parecem fantasmagóricos.",
  description:
    "Aula interativa sobre espaço de endereçamento, frames de pilha, alocação em heap, ponteiros, indireção, tempo de vida dos dados, dangling pointers, use-after-free e ferramentas modernas para reduzir erros.",
  primaryCategoryId: "computacao",
  secondaryCategoryId: "engenharia",
  level: "Intermediário",
  estimatedTime: "55-65 min",
  tags: ["Memória", "Stack", "Heap", "Ponteiros", "Endereço", "Use-After-Free", "Ownership"],
  learningObjectives: [
    "Entender memória como espaço de endereços onde dados ocupam regiões com papéis diferentes.",
    "Explicar o que é um frame de stack e por que chamadas de função criam contexto local.",
    "Distinguir stack e heap pelo modo de alocação, duração e custo de gerenciamento.",
    "Interpretar ponteiros como valores que carregam endereços, não como dados mágicos.",
    "Reconhecer bugs clássicos como dangling pointer, double free e use-after-free.",
    "Relacionar linguagens e ferramentas modernas a estratégias de segurança de memória.",
  ],
  prerequisites: [
    "Como uma CPU usa registradores e memória.",
    "Bits, bytes e endereços básicos.",
    "Noções simples de funções em programação ajudam.",
  ],
  references: [
    {
      title: "Operating Systems: Three Easy Pieces",
      source: "Arpaci-Dusseau & Arpaci-Dusseau",
      url: "https://pages.cs.wisc.edu/~remzi/OSTEP/",
      note: "Fundamentos de processos, endereçamento e memória virtual com ótima didática.",
    },
    {
      title: "Computer Systems: A Programmer's Perspective",
      source: "Bryant e O'Hallaron — Carnegie Mellon University",
      url: "https://csapp.cs.cmu.edu/",
      note:
        "Cobertura importante de layout de memória, stack, chamadas de função e representação de dados.",
    },
    {
      title: "xv6, a simple Unix-like teaching operating system",
      source: "MIT PDOS",
      url: "https://pdos.csail.mit.edu/6.S081/2024/xv6.html",
      note:
        "Base oficial do curso de sistemas do MIT com forte intuição sobre processos, endereços e memória.",
    },
    {
      title: "AddressSanitizer",
      source: "Clang Documentation",
      url: "https://clang.llvm.org/docs/AddressSanitizer.html",
      note:
        "Documentação oficial de ferramenta prática para detectar vários erros de memória.",
    },
    {
      title: "Understanding Ownership",
      source: "The Rust Programming Language",
      url: "https://doc.rust-lang.org/book/ch04-00-understanding-ownership.html",
      note:
        "Mostra uma abordagem moderna para restringir classes de bugs ligados a tempo de vida e aliasing.",
    },
  ],
  heroVisual: "memory-hero",
  openingText:
    "Muita gente aprende variáveis como 'caixinhas' e passa anos programando com essa metáfora. Ela ajuda no começo, mas falha justamente quando os programas ficam reais. Em sistemas, uma variável vive em algum lugar da memória, pode durar pouco ou muito, pode ser copiada ou apenas apontada, e pode deixar rastros perigosos quando o programa continua usando um endereço cujo dado já não existe mais. Stack, heap e ponteiros são o vocabulário mínimo para enxergar isso.",
  quickFacts: [
    { title: "Ponteiro é dado", body: "Ele é um valor que representa um endereço, não um portal místico." },
    { title: "Stack é contexto local", body: "Frames acompanham chamadas e retornos de função." },
    { title: "Heap é duração flexível", body: "Dados alocados ali podem sobreviver ao fim de uma função." },
    { title: "Bug de memória é bug de tempo e lugar", body: "A pergunta quase sempre é 'esse endereço ainda pertence a esse dado?'" },
  ],
  sections: [
    s(
      "espaco-de-enderecos",
      "Mapa Mental",
      "Memória como espaço de endereços",
      "Antes de falar em stack e heap, precisamos ver o programa como ocupante de um espaço de memória organizado.",
      "address-space-visual",
      undefined,
      [
        "Um processo enxerga a memória como um conjunto de endereços. Esse espaço costuma ser dividido conceitualmente em regiões para código, dados globais, stack e heap, mesmo que detalhes variem por sistema e arquitetura.",
        "O ponto importante é que endereços são o idioma da localização. Quando falamos 'essa variável está na stack' ou 'esse buffer está no heap', estamos falando da região onde aquele dado foi colocado e de que regras controlam sua vida útil.",
        "Sem esse mapa, ponteiros parecem arbitrários. Com ele, eles viram apenas coordenadas.",
      ],
      [
        { type: "definition", title: "Espaço de endereçamento", body: "Conjunto de endereços de memória que um processo enxerga e usa para localizar código e dados." },
      ],
    ),
    s(
      "stack-frames",
      "Funções",
      "Stack: uma pilha de contextos",
      "Cada chamada de função normalmente ganha um frame com parâmetros, variáveis locais e metadados de retorno.",
      "stack-frame-visual",
      "stack-frame-builder",
      [
        "A stack funciona muito bem para chamadas aninhadas porque segue uma disciplina LIFO: a última função que entrou tende a ser a primeira a sair. Isso combina naturalmente com recursão e retorno de funções.",
        "Um frame de stack guarda o contexto necessário para executar aquela função. Variáveis locais costumam viver ali porque sua duração combina com o escopo da chamada.",
        "Quando a função retorna, aquele frame deixa de ser válido. É exatamente aqui que nascem vários erros conceituais com ponteiros para variáveis locais.",
      ],
      [
        { type: "definition", title: "Frame de stack", body: "Bloco de memória associado a uma chamada de função, contendo contexto local e informações de retorno." },
        { type: "mistake", title: "Retornar ponteiro para variável local", body: "Depois do retorno, o frame foi desmontado e o endereço deixa de apontar para um dado válido daquela função." },
      ],
    ),
    s(
      "heap",
      "Duração",
      "Heap: memória com vida mais flexível",
      "Nem todo dado morre quando a função termina; alguns precisam sobreviver e por isso são alocados dinamicamente.",
      "heap-visual",
      "heap-allocation-playground",
      [
        "A heap é usada quando o programa precisa controlar explicitamente a duração ou o tamanho de uma estrutura: listas, árvores, buffers variáveis, objetos compartilhados, caches e muitas outras construções.",
        "Essa flexibilidade vem com custo. Como a alocação e desalocação não seguem a disciplina simples da stack, alguém precisa gerenciar quando o dado nasce e quando deixa de existir.",
        "Em linguagens com gerenciamento manual, isso cai sobre o programador. Em linguagens com garbage collector, o runtime ajuda. Em linguagens com ownership, as regras de uso tentam impedir ambiguidades.",
      ],
      [
        { type: "definition", title: "Alocação dinâmica", body: "Reserva de memória em tempo de execução com duração independente do escopo local imediato." },
        { type: "insight", title: "Heap não significa 'mais importante'", body: "Ela apenas atende casos em que a duração ou o tamanho do dado não cabem na disciplina simples da stack." },
      ],
    ),
    s(
      "ponteiros",
      "Indireção",
      "Ponteiros são endereços com tipo e intenção",
      "Um ponteiro não contém o valor final, mas o caminho para encontrá-lo.",
      "pointer-visual",
      undefined,
      [
        "Se uma variável inteira guarda 42, um ponteiro para inteiro guarda o endereço onde um inteiro vive. Ao desreferenciar o ponteiro, seguimos esse endereço até o dado.",
        "Isso é poderoso porque permite compartilhar estruturas, navegar por arrays e montar grafos, listas e árvores sem copiar tudo o tempo todo. Mas também é perigoso porque o endereço pode continuar existindo mesmo quando a ideia de 'dado válido' já acabou.",
        "Ponteiros são uma ferramenta de indireção. Eles adicionam uma camada entre quem usa e quem possui o dado.",
      ],
      [
        { type: "definition", title: "Desreferenciar", body: "Usar um endereço guardado por um ponteiro para acessar o dado localizado nele." },
        { type: "example", title: "int *p", body: "O ponteiro p não é o inteiro em si; ele guarda onde esse inteiro está." },
      ],
    ),
    s(
      "tempo-de-vida",
      "Semântica",
      "O problema real quase sempre é tempo de vida",
      "A pergunta central não é só onde o dado mora, mas até quando aquele endereço continua representando um objeto válido.",
      "lifetime-visual",
      undefined,
      [
        "Uma variável local da stack costuma morrer no retorno da função. Um bloco do heap pode continuar vivo por muito tempo, desde que ninguém o libere. Um ponteiro pode continuar existindo depois que o alvo morreu — e é aí que mora o perigo.",
        "Muitos bugs de memória são bugs temporais: o endereço ainda aponta para algum lugar, mas o programa age como se aquele lugar ainda pertencesse ao objeto antigo.",
        "Pensar em ownership, empréstimo, aliasing e escopo é uma forma de disciplinar essa pergunta sobre vida útil.",
      ],
      [
        { type: "insight", title: "Endereço válido não implica objeto válido", body: "Um endereço pode continuar acessível e ainda assim não pertencer mais ao mesmo dado lógico." },
      ],
    ),
    s(
      "bugs-classicos",
      "Risco",
      "Dangling pointers, use-after-free e double free",
      "Alguns dos bugs mais perigosos surgem quando o programa perde o controle sobre quem ainda pode usar um bloco de memória.",
      "bug-visual",
      "pointer-bug-lab",
      [
        "Dangling pointer é um ponteiro que continua existindo depois que o alvo deixou de ser válido. Use-after-free acontece quando esse ponteiro é usado para ler ou escrever após a liberação da memória.",
        "Double free ocorre quando o mesmo bloco é liberado duas vezes. Dependendo do ambiente, isso causa crash, corrupção silenciosa ou abre espaço para exploração de segurança.",
        "Esses bugs são traiçoeiros porque podem parecer aleatórios: às vezes funcionam em testes pequenos e falham muito depois, quando outro pedaço do programa reaproveita a mesma região.",
      ],
      [
        { type: "definition", title: "Use-after-free", body: "Acesso a memória após o bloco já ter sido liberado." },
        { type: "mistake", title: "Confiar em 'funcionou uma vez'", body: "Bugs temporais de memória podem parecer estáveis por acaso e quebrar em outro cenário ou outra compilação." },
      ],
    ),
    s(
      "linguagens-e-ferramentas",
      "Mitigação",
      "Como linguagens e ferramentas tentam reduzir o caos",
      "Sistemas modernos atacam o problema com tipos, regras de ownership, garbage collection e detectores de erro em tempo de execução.",
      "tooling-visual",
      undefined,
      [
        "Garbage collectors reduzem a chance de liberar cedo demais, mas não resolvem todos os problemas de aliasing ou uso indevido de estruturas mutáveis compartilhadas. Linguagens com ownership tentam impedir, em tempo de compilação, combinações perigosas de posse e referência.",
        "Ferramentas como AddressSanitizer inserem verificações extras para detectar acessos inválidos, use-after-free e outros erros difíceis de reproduzir.",
        "A lição mais importante é esta: segurança de memória não é um luxo acadêmico. Ela afeta confiabilidade, depuração e segurança de software real.",
      ],
      [
        { type: "example", title: "AddressSanitizer", body: "Instrumenta o programa para detectar várias classes de acesso inválido com mensagens de diagnóstico detalhadas." },
      ],
    ),
    s("quiz-revisao", "Revisão", "Quiz de revisão", "Reforce o modelo mental de espaço de endereços, frames, heap e tempo de vida.", undefined, "quiz", ["Mais importante que decorar nomes é enxergar a pergunta 'esse dado ainda é válido aqui?'."], []),
    s("glossario", "Glossário", "Termos essenciais", "Consolide o vocabulário que sustenta bugs, performance e segurança de memória.", undefined, "glossary", ["Esses conceitos voltam em cache, sistema operacional, compiladores e segurança."], []),
  ],
  summaryCards: [
    { title: "Memória é espaço endereçável", body: "Dados vivem em regiões com papéis e regras diferentes." },
    { title: "Stack segue a chamada", body: "Frames combinam naturalmente com entrada e saída de funções." },
    { title: "Heap dá flexibilidade", body: "Ela permite dados sobreviverem além de um escopo local." },
    { title: "Ponteiro é indireção", body: "Ele carrega um endereço, não o valor final." },
    { title: "Tempo de vida é a chave", body: "A maior parte dos bugs graves nasce quando o dado já não é mais válido." },
    { title: "Ferramentas e linguagens ajudam", body: "Ownership, GC e sanitizers reduzem classes inteiras de falhas." },
  ],
  quiz: [
    q("q1", "O que melhor descreve um ponteiro?", "Um valor que guarda o endereço de outro dado.", "Uma cópia automática do dado alvo.", "Uma região especial da CPU.", "a", "Ponteiro é um valor cujo conteúdo principal é um endereço."),
    q("q2", "Por que variáveis locais costumam combinar com a stack?", "Porque sua duração acompanha o escopo da chamada de função.", "Porque a stack é sempre maior que a heap.", "Porque a ALU só lê stack.", "a", "A disciplina LIFO encaixa muito bem com chamadas e retornos."),
    q("q3", "Quando a heap costuma ser usada?", "Quando a duração ou o tamanho do dado precisa ser decidido em tempo de execução.", "Quando toda variável precisa ser mais rápida.", "Somente para números grandes.", "a", "Heap é útil para dados com vida flexível ou tamanho dinâmico."),
    q("q4", "O que acontece com o frame de stack quando a função retorna?", "Ele deixa de ser válido como contexto daquela chamada.", "Ele vira automaticamente heap.", "Ele é copiado para todos os ponteiros existentes.", "a", "É por isso que ponteiros para variáveis locais podem ficar pendurados."),
    q("q5", "O que é um dangling pointer?", "Um ponteiro que ainda existe, mas cujo alvo já não é válido.", "Um ponteiro que aponta para dois lugares ao mesmo tempo.", "Um ponteiro que sempre vale zero.", "a", "Ele carrega um endereço antigo cujo objeto já morreu."),
    q("q6", "Qual frase resume melhor um use-after-free?", "Usar memória depois que o bloco já foi liberado.", "Alocar memória duas vezes seguidas.", "Guardar um inteiro em um ponteiro.", "a", "É um erro temporal clássico e perigoso."),
    q("q7", "Por que bugs de memória podem parecer aleatórios?", "Porque a região pode ser reutilizada por outros dados em momentos diferentes.", "Porque o compilador apaga a stack aleatoriamente.", "Porque todo endereço muda a cada instrução.", "a", "O reaproveitamento da memória mascara ou revela o erro conforme o contexto."),
    q("q8", "Como ferramentas como AddressSanitizer ajudam?", "Detectando acessos inválidos e outros erros de memória com instrumentação extra.", "Aumentando automaticamente a RAM física.", "Convertendo todo ponteiro em inteiro.", "a", "Elas tornam bugs difíceis mais visíveis durante testes e depuração."),
  ],
  glossary: [
    g("Endereço", "Localização de memória usada para encontrar um dado."),
    g("Espaço de endereçamento", "Conjunto de endereços visíveis a um processo."),
    g("Stack", "Região de memória associada a chamadas e retornos de função."),
    g("Frame de stack", "Contexto local de uma chamada de função."),
    g("Heap", "Região de memória usada para alocação dinâmica."),
    g("Alocação dinâmica", "Reserva de memória em tempo de execução."),
    g("Ponteiro", "Valor que guarda o endereço de outro dado."),
    g("Desreferenciar", "Acessar o dado apontado por um ponteiro."),
    g("Tempo de vida", "Período em que um objeto continua válido para uso."),
    g("Dangling pointer", "Ponteiro para um alvo que já não é válido."),
    g("Use-after-free", "Uso de um bloco de memória depois de ele ter sido liberado."),
    g("Double free", "Tentativa de liberar o mesmo bloco de memória mais de uma vez."),
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

function q(id: string, prompt: string, a: string, b: string, c: string, correctOptionId: string, feedback: string) {
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
