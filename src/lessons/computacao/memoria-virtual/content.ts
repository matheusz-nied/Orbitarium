import type { LessonContent } from "../../../types/content";

export const memoriaVirtualContent: LessonContent = {
  id: "memoria-virtual",
  title: "Memória Virtual",
  subtitle:
    "Cada processo enxerga um espaço de endereços próprio, contínuo e privado — mas isso é uma abstração construída com páginas, tabelas e tradução dinâmica.",
  description:
    "Uma aula visual sobre espaço de endereços, páginas, frames, tradução virtual-física, page tables, TLB, page faults e trade-offs entre isolamento, desempenho e uso de memória.",
  primaryCategoryId: "computacao",
  secondaryCategoryId: "engenharia",
  level: "Intermediário",
  estimatedTime: "45-55 min",
  tags: ["Memória Virtual", "Paginação", "TLB", "Page Fault", "Address Space", "MMU"],
  learningObjectives: [
    "Explicar por que sistemas operacionais usam memória virtual.",
    "Entender a diferença entre endereço virtual e endereço físico.",
    "Relacionar páginas virtuais, frames físicos e tabelas de páginas.",
    "Compreender o papel da TLB na aceleração da tradução de endereços.",
    "Descrever o caminho de um page fault e por que ele custa caro.",
    "Conectar memória virtual a isolamento, proteção e execução de múltiplos processos.",
  ],
  prerequisites: [
    "Noção geral de processo e sistema operacional.",
    "Entender que memória RAM é finita e compartilhada.",
    "Conforto básico com ideia de divisão em blocos ajuda.",
  ],
  references: [
    {
      title: "Operating Systems: Three Easy Pieces",
      source: "Arpaci-Dusseau & Arpaci-Dusseau",
      url: "https://pages.cs.wisc.edu/~remzi/OSTEP/",
      note:
        "Livro-base para address spaces, translation, paging, TLB e swapping.",
    },
    {
      title: "OSTEP — Complete Virtual Memory Systems",
      source: "Arpaci-Dusseau & Arpaci-Dusseau",
      url: "https://pages.cs.wisc.edu/~remzi/OSTEP/vm-complete.pdf",
      note:
        "Capítulo focado em como conceitos de memória virtual se combinam em sistemas reais.",
    },
    {
      title: "Linux man-pages — mmap(2)",
      source: "man7.org",
      url: "https://man7.org/linux/man-pages/man2/mmap.2.html",
      note:
        "Interface clássica de mapeamento de memória em processos Unix-like.",
    },
    {
      title: "Linux man-pages — mprotect(2)",
      source: "man7.org",
      url: "https://man7.org/linux/man-pages/man2/mprotect.2.html",
      note:
        "Proteções de páginas e permissões de memória em nível de processo.",
    },
    {
      title: "MIT 6.S081 / 6.828 Operating System Engineering",
      source: "MIT CSAIL",
      url: "https://pdos.csail.mit.edu/6.S081/2024/schedule.html",
      note:
        "Curso que cobre page tables, traps e abstrações de memória em profundidade.",
    },
    {
      title: "Computer Systems: A Programmer's Perspective",
      source: "CMU",
      url: "https://csapp.cs.cmu.edu/",
      note:
        "Discute layout de memória, memória virtual e comportamento observado por aplicações.",
    },
  ],
  heroVisual: "vm-hero",
  openingText:
    "Quando um processo acessa o endereço 0x7ffe..., ele age como se aquele número apontasse diretamente para um pedaço fixo da RAM. Não aponta. O endereço é virtual: uma visão privada e organizada criada para aquele processo. O sistema operacional e o hardware cooperam para traduzir esse endereço em algo físico, aplicar permissões e, se necessário, lidar com ausências de página. Memória virtual é ao mesmo tempo uma ferramenta de proteção, um mecanismo de conveniência e um campo cheio de custos escondidos.",
  quickFacts: [
    {
      title: "Cada processo vê seu próprio mapa",
      body:
        "Espaços de endereços distintos ajudam a isolar falhas e proteger dados entre processos.",
    },
    {
      title: "Tradução não é gratuita",
      body:
        "Cada acesso à memória precisa passar por mecanismos que a TLB tenta acelerar.",
    },
    {
      title: "Page fault custa caro",
      body:
        "Quando a página não está presente, o kernel precisa intervir e talvez buscar dados fora da RAM.",
    },
  ],
  sections: [
    s(
      "motivacao",
      "Motivação",
      "Por que não usar endereços físicos diretamente?",
      "A memória virtual resolve simultaneamente proteção, flexibilidade e a ilusão de que cada processo tem memória própria.",
      "vm-address-space",
      undefined,
      [
        "Se um processo usasse endereços físicos crus, teria que conhecer a ocupação real da RAM, conviver com outros programas e aceitar que qualquer bug poderia sobrescrever dados alheios.",
        "A memória virtual cria um contrato mais limpo: cada processo recebe um espaço de endereços privado e contínuo, como se fosse o único ocupante da máquina.",
        "Esse contrato simplifica compiladores, runtimes e aplicações, mas depende de uma implementação sofisticada por trás — tabelas, bits de permissão, caches de tradução e colaboração íntima entre kernel e hardware.",
      ],
      [
        {
          type: "definition",
          title: "Espaço de endereços",
          body:
            "Conjunto de endereços que um processo enxerga como sua memória disponível, independentemente da organização física real da RAM.",
        },
        {
          type: "insight",
          title: "A abstração é local ao processo",
          body:
            "Dois processos podem usar o mesmo endereço virtual e ainda assim alcançar regiões físicas totalmente diferentes.",
        },
      ],
    ),
    s(
      "enderecos",
      "Conceito",
      "Endereço virtual não é endereço físico",
      "O número usado pela aplicação é primeiro interpretado no espaço virtual do processo; só depois se descobre onde, se existir, ele cai na RAM real.",
      "vm-address-space",
      undefined,
      [
        "Quando o programa lê ou escreve memória, a CPU emite um endereço virtual. A MMU consulta estruturas de tradução para descobrir o frame físico correspondente e validar permissões.",
        "Isso permite que o sistema reposicione páginas na memória física sem reescrever todos os ponteiros do programa. O processo continua acreditando que seu mapa é contínuo.",
        "Também permite marcações como leitura, escrita e execução por página. Uma tentativa indevida de acesso pode gerar exceção em vez de corrupção silenciosa.",
      ],
      [
        {
          type: "example",
          title: "Mesmo virtual, físico diferente",
          body:
            "O endereço virtual 0x1000 pode apontar para um frame físico em um processo e para outro frame completamente diferente em outro.",
        },
        {
          type: "mistake",
          title: "Achar que o ponteiro guarda a localização física real",
          body:
            "O valor visto pelo programa é apenas um endereço no espaço virtual daquele processo.",
        },
      ],
    ),
    s(
      "paginas-frames",
      "Estrutura",
      "Páginas virtuais e frames físicos",
      "Em vez de traduzir byte a byte, o sistema trabalha em blocos: páginas do lado virtual e frames do lado físico.",
      "vm-page-table",
      "address-translation-lab",
      [
        "Paginação divide o espaço virtual em páginas de tamanho fixo e a RAM em frames do mesmo tamanho. A tradução mapeia uma página virtual para um frame físico quando a página está residente.",
        "O endereço virtual costuma ser separado em duas partes: número da página virtual e deslocamento dentro da página. O deslocamento é preservado; o número da página é traduzido.",
        "Esse desenho torna a realocação de memória muito mais prática. Também facilita compartilhar certas páginas entre processos, como código de bibliotecas, mantendo outras privadas.",
      ],
      [
        {
          type: "definition",
          title: "Página",
          body:
            "Bloco de memória virtual de tamanho fixo usado como unidade de mapeamento e proteção.",
        },
        {
          type: "definition",
          title: "Frame",
          body:
            "Bloco de memória física do mesmo tamanho de uma página, usado como destino do mapeamento.",
        },
      ],
    ),
    s(
      "page-table",
      "Mecanismo",
      "Tabela de páginas: o dicionário da tradução",
      "Cada processo precisa de uma estrutura que diga onde suas páginas estão e quais permissões possuem.",
      "vm-page-table",
      undefined,
      [
        "A tabela de páginas associa páginas virtuais a frames físicos, além de carregar bits como presente, leitura, escrita, execução, suja e referenciada.",
        "Sem essa tabela, a MMU não saberia se um endereço pode ser acessado, se a página está na RAM ou se deve acionar o kernel para lidar com uma falta.",
        "O desafio é que tabelas muito simples ficam gigantes em espaços de endereçamento modernos. Por isso, sistemas reais usam estruturas hierárquicas e outras otimizações.",
      ],
      [
        {
          type: "insight",
          title: "Tradução e proteção andam juntas",
          body:
            "A mesma estrutura que diz 'onde está' também diz 'o que é permitido fazer com isso'.",
        },
        {
          type: "mistake",
          title: "Pensar na tabela só como mapa de localização",
          body:
            "Ela também carrega presença, permissões e metadados importantes para política de memória.",
        },
      ],
    ),
    s(
      "tlb",
      "Desempenho",
      "TLB: cache de traduções para não pagar o custo inteiro a cada acesso",
      "Traduzir todo acesso consultando estruturas maiores na memória seria caro demais; por isso existe uma cache pequena e muito rápida de traduções recentes.",
      "vm-page-table",
      "tlb-cache-demo",
      [
        "A TLB guarda traduções recentes de página virtual para frame físico. Quando há TLB hit, a CPU evita uma navegação mais lenta pela tabela de páginas.",
        "Padrões com localidade espacial e temporal tendem a se beneficiar mais. Acessos caóticos e aleatórios derrubam a taxa de acerto e expõem o custo da tradução.",
        "Essa é uma razão pela qual desempenho depende não apenas de 'quantas operações' um programa faz, mas também de como ele acessa memória.",
      ],
      [
        {
          type: "definition",
          title: "TLB",
          body:
            "Translation Lookaside Buffer: cache pequena e rápida de traduções de endereços.",
        },
        {
          type: "insight",
          title: "Localidade ajuda duas vezes",
          body:
            "Ela tende a favorecer tanto caches de dados quanto a TLB, porque repete páginas e padrões próximos.",
        },
      ],
    ),
    s(
      "page-fault",
      "Evento",
      "Page fault: quando a tradução precisa chamar o kernel",
      "Se a página não está presente ou o acesso viola permissões, a execução sai do fluxo normal e o sistema precisa intervir.",
      "vm-fault",
      "page-fault-path",
      [
        "Um page fault acontece quando a MMU não encontra uma tradução válida ou detecta uma violação de proteção. A CPU então aciona uma exceção, e o kernel investiga o motivo.",
        "Se a página deveria existir mas está fora da RAM, o sistema pode carregá-la, talvez removendo outra página para abrir espaço. Se o acesso é inválido, o processo pode receber um erro ou ser encerrado.",
        "Esse caminho é muito mais caro do que um acesso comum, porque envolve trap para o kernel, atualização de estruturas, possivelmente E/S e reexecução da instrução original.",
      ],
      [
        {
          type: "example",
          title: "Primeiro acesso a uma página recém-mapeada",
          body:
            "O processo toca um endereço virtual válido, mas a página ainda não está materializada; o fault faz o sistema completar esse trabalho.",
        },
        {
          type: "mistake",
          title: "Tratar todo page fault como erro fatal",
          body:
            "Muitos faults são parte normal da execução; o problema é quando eles se tornam frequentes demais ou ilegítimos.",
        },
      ],
    ),
    s(
      "isolamento",
      "Proteção",
      "Memória virtual também é um mecanismo de segurança e isolamento",
      "Sem separação por espaço de endereços e permissões por página, um bug trivial poderia corromper o sistema inteiro.",
      "vm-address-space",
      undefined,
      [
        "Cada processo recebe a sensação de privacidade porque o kernel configura traduções e permissões específicas para ele. Uma tentativa de acesso fora do espaço autorizado pode ser bloqueada.",
        "Isso ajuda a conter falhas e também a implementar políticas como regiões somente leitura, páginas não executáveis e copy-on-write.",
        "Containers, browsers com processos separados e vários mecanismos de sandbox contam com essa base de memória virtual para reforçar fronteiras entre cargas distintas.",
      ],
      [
        {
          type: "insight",
          title: "Proteção de memória é base de confiabilidade moderna",
          body:
            "Sem ela, bugs comuns seriam suficientes para corromper outros processos ou o próprio kernel com facilidade muito maior.",
        },
      ],
    ),
    s(
      "tradeoffs",
      "Trade-offs",
      "A abstração é poderosa, mas cobra preço",
      "Memória virtual simplifica o modelo de programação, porém introduz estruturas extras, faults, pressão em TLB e decisões difíceis de substituição.",
      "vm-fault",
      undefined,
      [
        "Toda camada de tradução adiciona alguma complexidade e algum custo. Tabelas precisam existir, a TLB é limitada e page faults podem ser extremamente caros quando há disco envolvido.",
        "Por outro lado, abandonar a abstração custaria isolamento, flexibilidade de layout, carregamento sob demanda e diversas otimizações práticas usadas por sistemas modernos.",
        "Na prática, engenharia de desempenho em memória frequentemente significa respeitar localidade, reduzir working set ativo e entender quando o sistema está gastando tempo demais resolvendo a própria abstração.",
      ],
      [
        {
          type: "definition",
          title: "Working set",
          body:
            "Conjunto de páginas efetivamente acessadas em certo intervalo e que, idealmente, cabem na memória física disponível.",
        },
        {
          type: "mistake",
          title: "Pensar que mais memória virtual significa RAM infinita",
          body:
            "O espaço virtual pode ser amplo, mas o custo de manter páginas fora da RAM aparece em latência e throughput.",
        },
      ],
    ),
    s(
      "quiz",
      "Revisão",
      "Quiz de revisão",
      "Teste espaço de endereços, páginas, TLB, page tables e faults antes de seguir para outros subsistemas.",
      undefined,
      "quiz",
      [
        "O objetivo é verificar se você já consegue contar a história completa de um acesso à memória do ponto de vista do processo e do sistema.",
      ],
      [],
    ),
    s(
      "glossario",
      "Glossário",
      "Glossário e próximos estudos",
      "Feche a aula consolidando o vocabulário essencial da virtualização de memória.",
      undefined,
      "glossary",
      [
        "Esses termos aparecem em depuração de performance, sistemas operacionais, segurança, bancos e runtimes de linguagens.",
      ],
      [],
    ),
  ],
  summaryCards: [
    {
      title: "Endereço virtual é uma abstração privada",
      body:
        "O processo enxerga um mapa próprio, separado da disposição física real da RAM.",
    },
    {
      title: "Paginação organiza a tradução",
      body:
        "Páginas e frames permitem remapear memória em blocos gerenciáveis.",
    },
    {
      title: "Tabela de páginas traduz e protege",
      body:
        "Ela informa presença, frame e permissões para cada região relevante.",
    },
    {
      title: "TLB existe para salvar desempenho",
      body:
        "Sem cache de traduções, o custo de acesso à memória seria ainda maior.",
    },
    {
      title: "Page fault é uma passagem pelo kernel",
      body:
        "Pode ser normal ou indicativo de pressão excessiva, mas sempre custa mais do que um hit comum.",
    },
    {
      title: "Memória virtual é conveniência com trade-offs",
      body:
        "Ela simplifica programação e isolamento, mas exige estruturas e políticas sofisticadas.",
    },
  ],
  relatedTopics: [
    {
      title: "Como Funciona um Sistema Operacional",
      body:
        "Ajuda a reenquadrar memória virtual como um dos serviços centrais oferecidos pelo kernel.",
    },
    {
      title: "Processos, Threads e Concorrência",
      body:
        "Mostra quem exatamente depende desses espaços de endereços e por que a separação entre processos importa.",
    },
    {
      title: "Docker e Containers",
      body:
        "Expande a ideia de isolamento em nível de processo com namespaces, cgroups e empacotamento.",
    },
  ],
  quiz: [
    q("q1", "Qual é a principal vantagem conceitual da memória virtual?", "Cada processo pode enxergar um espaço de endereços próprio e protegido.", "Ela elimina completamente a necessidade de RAM física.", "Ela impede qualquer custo de tradução.", "a", "Memória virtual oferece isolamento e um modelo de programação mais simples, mas continua dependendo de RAM real."),
    q("q2", "O que distingue endereço virtual de endereço físico?", "O virtual é o que o processo usa; o físico é onde a RAM real é acessada após tradução.", "O físico é sempre maior que o virtual.", "O virtual só existe em GPUs.", "a", "A aplicação opera sobre endereços virtuais; hardware e kernel traduzem isso para localização física."),
    q("q3", "Por que o deslocamento dentro da página é preservado na tradução?", "Porque a tradução troca a página virtual pelo frame físico, mantendo a posição interna no bloco.", "Porque o deslocamento é recalculado por software toda vez.", "Porque offsets não existem em paginação.", "a", "A unidade de mapeamento é a página; o offset dentro dela continua o mesmo após a tradução."),
    q("q4", "Qual é o papel da tabela de páginas?", "Associar páginas virtuais a frames físicos e permissões.", "Executar instruções da aplicação.", "Substituir a cache L1 da CPU.", "a", "A tabela carrega localização e metadados de proteção e presença."),
    q("q5", "Para que serve a TLB?", "Cachear traduções recentes e acelerar acessos à memória.", "Armazenar dados persistentes do processo.", "Detectar deadlocks entre threads.", "a", "A TLB reduz o custo recorrente da tradução de endereços."),
    q("q6", "Quando ocorre um page fault?", "Quando a tradução falha ou o acesso viola permissões e o kernel precisa intervir.", "Quando a CPU termina um quantum.", "Quando duas threads compartilham a mesma pilha.", "a", "O fault desvia a execução para tratamento pelo kernel."),
    q("q7", "Todo page fault é necessariamente um bug?", "Não; muitos fazem parte do funcionamento normal da memória virtual.", "Sim, sempre.", "Só em sistemas com swap desligado.", "a", "Há faults legítimos, como carregamento sob demanda; o problema é excesso ou acesso inválido."),
    q("q8", "Por que localidade ajuda a TLB?", "Porque acessos repetidos ou próximos tendem a reutilizar as mesmas traduções.", "Porque reduz automaticamente o tamanho das páginas.", "Porque apaga a tabela de páginas antiga.", "a", "Localidade temporal e espacial aumenta a chance de TLB hits."),
  ],
  glossary: [
    g("Memória virtual", "Abstração que faz cada processo enxergar um espaço de endereços próprio e organizado."),
    g("Endereço virtual", "Endereço usado pela aplicação dentro do espaço de endereços do processo."),
    g("Endereço físico", "Localização real na RAM acessada após a tradução."),
    g("Página", "Bloco fixo do espaço virtual usado como unidade de mapeamento."),
    g("Frame", "Bloco fixo da memória física correspondente ao tamanho de uma página."),
    g("Tabela de páginas", "Estrutura que mapeia páginas virtuais para frames e permissões."),
    g("MMU", "Unidade de hardware que ajuda na tradução e validação de acessos à memória."),
    g("TLB", "Cache rápida de traduções recentes de endereços."),
    g("Page fault", "Exceção gerada quando a tradução não pode ser completada diretamente."),
    g("Presente", "Bit que indica se a página está disponível na memória física naquele momento."),
    g("Working set", "Conjunto de páginas ativamente usadas em um intervalo."),
    g("Swap", "Uso de armazenamento secundário como extensão mais lenta da memória principal."),
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
