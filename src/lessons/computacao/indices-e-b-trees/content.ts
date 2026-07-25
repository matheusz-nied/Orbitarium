import type { LessonContent } from "../../../types/content";

export const indicesEBTreesContent: LessonContent = {
  id: "indices-e-b-trees",
  title: "Índices e B-Trees",
  subtitle:
    "Índices aceleram buscas ao trocar varreduras por navegação estruturada, e a B-Tree é a grande protagonista desse equilíbrio entre leitura, ordem e manutenção.",
  description:
    "Uma aula visual sobre busca sequencial versus indexada, estrutura de B-Trees, fan-out, nós internos e folhas, range scans, splits e custo de manutenção de índices.",
  primaryCategoryId: "computacao",
  secondaryCategoryId: "matematica",
  level: "Intermediário",
  estimatedTime: "45-55 min",
  tags: ["Índices", "B-Tree", "Banco de Dados", "Range Scan", "Planner", "Estruturas de Dados"],
  learningObjectives: [
    "Entender por que índices aceleram certas consultas.",
    "Comparar varredura sequencial e busca indexada com clareza conceitual.",
    "Compreender a estrutura de nós internos e folhas em uma B-Tree.",
    "Explicar por que alto fan-out reduz profundidade da árvore.",
    "Relacionar ordem nas folhas a range scans eficientes.",
    "Reconhecer o custo de manter índice sob inserções, atualizações e splits.",
  ],
  prerequisites: [
    "Noção geral de tabela e consulta em banco de dados.",
    "Entender comparação por chave e busca ordenada.",
    "Curiosidade sobre como bancos encontram registros rapidamente.",
  ],
  references: [
    {
      title: "PostgreSQL Documentation — Indexes Introduction",
      source: "PostgreSQL",
      url: "https://www.postgresql.org/docs/current/indexes-intro.html",
      note:
        "Base oficial para entender quando índices ajudam e quais custos trazem.",
    },
    {
      title: "PostgreSQL Documentation — B-Tree Indexes",
      source: "PostgreSQL",
      url: "https://www.postgresql.org/docs/current/btree.html",
      note:
        "Detalhes conceituais e práticos da família de índices B-Tree no PostgreSQL.",
    },
    {
      title: "Use The Index, Luke!",
      source: "Markus Winand",
      url: "https://use-the-index-luke.com/",
      note:
        "Material educacional amplamente citado sobre desenho e uso de índices.",
    },
    {
      title: "SQLite Query Planning",
      source: "SQLite Documentation",
      url: "https://www.sqlite.org/queryplanner.html",
      note:
        "Boa referência didática sobre planejamento e custo de acesso via índice.",
    },
    {
      title: "CMU Database Group",
      source: "Carnegie Mellon University",
      url: "https://15445.courses.cs.cmu.edu/",
      note:
        "Curso de referência com material sobre estruturas de índice e armazenamento.",
    },
    {
      title: "PostgreSQL Documentation — Multicolumn Indexes",
      source: "PostgreSQL",
      url: "https://www.postgresql.org/docs/current/indexes-multicolumn.html",
      note:
        "Expande a intuição sobre escolha e composição de chaves de índice.",
    },
  ],
  heroVisual: "btree-hero",
  openingText:
    "Se um banco precisasse ler linha por linha sempre que você filtrasse por uma coluna, tabelas grandes rapidamente se tornariam impraticáveis para consultas seletivas. O índice existe para evitar esse esforço cego. Em vez de procurar diretamente no corpo completo da tabela, ele mantém uma estrutura auxiliar organizada por chaves. Entre essas estruturas, a B-Tree reina porque combina boa profundidade, ordem útil para intervalos e custo de manutenção aceitável em muitos cenários reais.",
  quickFacts: [
    {
      title: "Índice não substitui a tabela",
      body:
        "Ele é uma estrutura auxiliar para localizar ou ordenar acesso aos dados com menos trabalho.",
    },
    {
      title: "B-Tree não é árvore binária simples",
      body:
        "Cada nó pode ter muitas chaves e muitos filhos, o que reduz bastante a profundidade.",
    },
    {
      title: "A ordem das folhas é valiosa",
      body:
        "Ela permite percorrer intervalos em vez de apenas buscar igualdade exata.",
    },
  ],
  sections: [
    s(
      "motivacao",
      "Motivação",
      "Por que a busca sequencial nem sempre basta?",
      "Ler tudo é simples, mas desperdiça trabalho quando a consulta quer só uma fração pequena da tabela.",
      "btree-range",
      "scan-vs-index-demo",
      [
        "Uma varredura sequencial percorre registros um a um até encontrar o que precisa. Esse caminho tem méritos: é simples e, quando grande parte da tabela será usada, pode ser eficiente.",
        "O problema aparece quando o banco quer localizar poucos registros em um universo enorme. Ler quase tudo para retornar quase nada se torna um custo desproporcional.",
        "Índices surgem como atalhos estruturados. Eles não adivinham a resposta, mas organizam o espaço de busca para reduzir o número de comparações e acessos necessários.",
      ],
      [
        {
          type: "definition",
          title: "Varredura sequencial",
          body:
            "Estratégia de ler a tabela progressivamente, linha a linha ou página a página, para avaliar a condição da consulta.",
        },
        {
          type: "insight",
          title: "Seq scan não é vilã universal",
          body:
            "Ela pode ser ótima quando muita coisa precisa ser lida de qualquer forma.",
        },
      ],
    ),
    s(
      "ideia-indice",
      "Estrutura",
      "O índice guarda chaves para evitar buscas cegas",
      "Em vez de olhar todas as linhas, o banco consulta uma estrutura preparada para localizar chaves de forma organizada.",
      "btree-anatomy",
      undefined,
      [
        "O índice armazena chaves derivadas de colunas e, de alguma forma, referências para chegar aos dados correspondentes. Ele funciona como uma estrutura de acesso e não como a tabela principal em si.",
        "Isso permite responder mais rápido a perguntas como 'onde estão os registros com este valor?' ou 'quais registros caem neste intervalo ordenado?'.",
        "Mas o preço existe: além de ocupar espaço, o índice precisa ser mantido quando os dados mudam, o que adiciona trabalho a inserções e atualizações.",
      ],
      [
        {
          type: "mistake",
          title: "Achar que índice é 'de graça'",
          body:
            "Toda escrita relevante pode exigir atualização da estrutura auxiliar, e isso pesa em armazenamento e latência.",
        },
      ],
    ),
    s(
      "btree-estrutura",
      "B-Tree",
      "Nós internos e folhas: a B-Tree organiza a navegação",
      "A árvore divide o espaço de chaves em faixas, permitindo descer por poucas comparações até a região desejada.",
      "btree-anatomy",
      "btree-search-explorer",
      [
        "Em uma B-Tree, nós internos armazenam chaves-guia e ponteiros para subárvores. As folhas guardam entradas ordenadas que permitem localizar ou percorrer o conjunto de resultados.",
        "Ao buscar uma chave, o banco não compara com tudo. Ele compara com separadores, escolhe um ramo plausível e continua até alcançar a folha correta.",
        "O ganho vem do fato de que cada nível descarta grandes porções do espaço de busca. Com poucos níveis, muita informação já foi filtrada.",
      ],
      [
        {
          type: "definition",
          title: "Nó interno",
          body:
            "Nó usado para direcionar a navegação entre faixas de chaves, sem armazenar o resultado final em si.",
        },
        {
          type: "definition",
          title: "Folha",
          body:
            "Nó terminal que guarda entradas ordenadas do índice e permite localizar o intervalo final desejado.",
        },
      ],
    ),
    s(
      "fanout",
      "Profundidade",
      "Por que a árvore fica rasa mesmo com muitos dados?",
      "Cada nó comporta várias chaves e vários filhos, o que faz o fator de ramificação ser muito maior do que em uma árvore binária simples.",
      "btree-anatomy",
      undefined,
      [
        "Uma árvore binária cresce em profundidade mais rapidamente porque cada nó divide o espaço em poucos caminhos. Já a B-Tree expande fortemente a largura de decisão em cada nível.",
        "Esse fan-out alto é crucial para armazenamento em páginas. Em vez de descer muitos níveis, a engine costuma precisar de poucas etapas para alcançar a região certa.",
        "Intuitivamente, é como um índice de livro que aponta diretamente para capítulos bem maiores antes de afunilar para o tópico exato.",
      ],
      [
        {
          type: "definition",
          title: "Fan-out",
          body:
            "Quantidade de filhos ou faixas que um nó consegue apontar, influenciando a profundidade total da árvore.",
        },
        {
          type: "insight",
          title: "Largura economiza altura",
          body:
            "Quanto mais caminhos cabem por nó, menos níveis a árvore precisa para cobrir um conjunto grande de chaves.",
        },
      ],
    ),
    s(
      "range-scan",
      "Ordem",
      "A ordenação das folhas torna intervalos eficientes",
      "A B-Tree não ajuda apenas para igualdade; ela também é ótima quando queremos todos os valores entre dois limites.",
      "btree-range",
      undefined,
      [
        "Depois de encontrar a primeira folha relevante, o banco pode continuar avançando pelas folhas ordenadas para percorrer um intervalo sem recomeçar a busca do zero.",
        "Isso torna B-Trees especialmente úteis para filtros do tipo maior que, menor que, BETWEEN e para suportar certas ordenações.",
        "É uma vantagem importante sobre estruturas ótimas para igualdade pura, mas ruins para manter noção de ordem global.",
      ],
      [
        {
          type: "example",
          title: "Buscar datas entre janeiro e março",
          body:
            "A árvore pode localizar o começo do intervalo e então percorrer as folhas em ordem sem vasculhar a tabela inteira.",
        },
      ],
    ),
    s(
      "split",
      "Manutenção",
      "Inserções podem exigir split de nós",
      "Quando um nó fica cheio, a estrutura precisa redistribuir chaves para preservar equilíbrio e propriedades da árvore.",
      "btree-maintenance",
      "node-split-demo",
      [
        "Ao inserir novas chaves, o índice não apenas 'anexa no final'. Se o nó-alvo estiver sem espaço, pode ser necessário dividi-lo e propagar ajustes para níveis superiores.",
        "Esse custo é uma das razões pelas quais índices aceleram leituras às custas de manutenção adicional em escritas. A estrutura precisa continuar ordenada e balanceada.",
        "Mesmo assim, essa despesa costuma valer a pena em muitos workloads mistos, porque evita um custo muito maior de leitura repetida sem apoio de índice.",
      ],
      [
        {
          type: "definition",
          title: "Split",
          body:
            "Divisão de um nó cheio em dois nós, com redistribuição de chaves e atualização de ponteiros na árvore.",
        },
        {
          type: "mistake",
          title: "Pensar que o índice só cresce linearmente",
          body:
            "Rebalanceamento e splits fazem parte da vida da estrutura quando novas chaves chegam.",
        },
      ],
    ),
    s(
      "planner",
      "Planejamento",
      "Ter um índice não obriga o banco a usá-lo",
      "O planner ainda compara custo e decide se vale a pena seguir o atalho estrutural ou ler a tabela de outra forma.",
      "btree-range",
      undefined,
      [
        "Se a consulta retorna grande parte da tabela, o índice pode causar saltos demais para pouco ganho real. Em cenários assim, o planner pode preferir varredura sequencial.",
        "Além disso, nem todo índice serve para todo predicado. A ordem das colunas, a seletividade e a forma do filtro influenciam o quanto aquela estrutura ajuda.",
        "A boa pergunta não é 'tenho índice?', mas 'tenho um índice que conversa bem com este padrão de consulta?'.",
      ],
      [
        {
          type: "insight",
          title: "Índice ruim pode existir e ainda assim ser ignorado",
          body:
            "A engine tenta comparar caminhos; se o atalho não compensa, ela simplesmente não precisa usá-lo.",
        },
      ],
    ),
    s(
      "tradeoffs",
      "Trade-offs",
      "Índices aceleram leituras certas e encarecem outras coisas",
      "Espaço, manutenção, atualização e desenho inadequado são parte do preço da aceleração.",
      "btree-maintenance",
      undefined,
      [
        "Cada índice extra consome espaço e precisa ser mantido conforme a tabela muda. Isso afeta insert, update, vacuum/reorganização e custos operacionais gerais.",
        "Também existe risco de desenhar índices redundantes ou desalinhados com as consultas reais da aplicação. Nesse caso, paga-se o custo sem colher o benefício.",
        "Por isso, engenharia de índices é menos sobre colecionar estruturas e mais sobre alinhar acesso frequente, seletividade e ordem útil com o que o banco realmente precisa responder.",
      ],
      [
        {
          type: "mistake",
          title: "Indexar tudo por medo",
          body:
            "Índice demais aumenta manutenção e pode confundir mais do que ajudar se não houver demanda real de consulta.",
        },
        {
          type: "insight",
          title: "O melhor índice é específico do workload",
          body:
            "Padrões de consulta, cardinalidade e frequência de escrita definem o equilíbrio certo.",
        },
      ],
    ),
    s(
      "quiz",
      "Revisão",
      "Quiz de revisão",
      "Teste seq scan, busca indexada, estrutura de B-Tree, range scan e splits.",
      undefined,
      "quiz",
      [
        "Se você entende por que a árvore é rasa, ordenada e custosa de manter, a essência da aula está firme.",
      ],
      [],
    ),
    s(
      "glossario",
      "Glossário",
      "Glossário e próximos estudos",
      "Feche a aula consolidando termos de indexação que aparecem em bancos e estruturas de dados.",
      undefined,
      "glossary",
      [
        "Esse vocabulário ajuda a discutir consultas, explain plans e modelagem com muito mais precisão.",
      ],
      [],
    ),
  ],
  summaryCards: [
    {
      title: "Índice evita buscas cegas",
      body:
        "Ele organiza o espaço de chaves para reduzir trabalho quando a consulta é seletiva.",
    },
    {
      title: "B-Tree usa largura para manter pouca altura",
      body:
        "Muitos filhos por nó significam poucas camadas até a região correta.",
    },
    {
      title: "Folhas ordenadas ajudam intervalos",
      body:
        "Depois de achar o começo, range scans percorrem o restante em ordem.",
    },
    {
      title: "Splits fazem parte da manutenção",
      body:
        "Inserções podem redistribuir nós para preservar as propriedades da estrutura.",
    },
    {
      title: "Planner ainda escolhe",
      body:
        "Ter índice não garante uso automático; custo e seletividade continuam importando.",
    },
    {
      title: "Leitura rápida cobra preço em escrita",
      body:
        "Espaço e manutenção são o lado menos glamoroso da aceleração por índice.",
    },
  ],
  relatedTopics: [
    {
      title: "Como Funciona um Banco de Dados",
      body:
        "Oferece a visão geral da engine onde índices aparecem como uma das estruturas auxiliares centrais.",
    },
    {
      title: "Algoritmos e Complexidade",
      body:
        "Ajuda a conectar custo assintótico e custo prático de navegação e manutenção em árvores.",
    },
    {
      title: "Estruturas de Dados Essenciais",
      body:
        "Expande a comparação entre árvores, hashes, arrays e listas em diferentes cenários de busca.",
    },
  ],
  quiz: [
    q("q1", "Quando uma varredura sequencial pode ser perfeitamente razoável?", "Quando grande parte da tabela será lida de qualquer forma.", "Quando toda consulta retorna uma única linha.", "Quando índices nunca existem.", "a", "Seq scan é simples e pode ser eficiente quando a seletividade é baixa."),
    q("q2", "Qual é o papel principal de um índice?", "Organizar chaves para localizar dados com menos trabalho em certos padrões de consulta.", "Substituir completamente a tabela principal.", "Eliminar qualquer custo de escrita.", "a", "Índice é estrutura auxiliar de acesso, não um substituto integral da tabela."),
    q("q3", "Por que uma B-Tree costuma ser rasa?", "Porque cada nó aponta para muitas faixas de chave, aumentando o fan-out.", "Porque só armazena duas chaves por nó.", "Porque não usa folhas.", "a", "A largura por nível reduz a profundidade necessária."),
    q("q4", "O que os nós internos fazem em uma B-Tree?", "Direcionam a busca por faixas de chave até a folha relevante.", "Guardam sempre os dados finais completos.", "Executam o parser SQL.", "a", "Eles são guias de navegação entre regiões do espaço ordenado."),
    q("q5", "Por que B-Trees ajudam em range scans?", "Porque as folhas ficam ordenadas e podem ser percorridas sequencialmente.", "Porque ignoram completamente a noção de ordem.", "Porque só servem para igualdade exata.", "a", "A ordem nas folhas é um dos grandes trunfos da estrutura."),
    q("q6", "O que pode acontecer quando um nó fica cheio durante inserção?", "Um split redistribui chaves e ajusta a árvore.", "O índice para de aceitar novos valores.", "A tabela inteira precisa ser recriada do zero sempre.", "a", "Splits fazem parte da manutenção normal para preservar equilíbrio e capacidade."),
    q("q7", "Ter índice significa que ele será usado em toda consulta?", "Não; o planner ainda compara custo e pode preferir seq scan.", "Sim; o banco é obrigado a usar qualquer índice existente.", "Só em tabelas pequenas.", "a", "Uso do índice depende do plano estimado e do padrão da consulta."),
    q("q8", "Qual é o custo clássico de manter muitos índices?", "Mais espaço e mais trabalho em inserções e atualizações.", "Menos profundidade em qualquer árvore.", "Eliminação total da necessidade de estatísticas.", "a", "Índices aceleram leituras certas, mas pesam na manutenção das escritas."),
  ],
  glossary: [
    g("Índice", "Estrutura auxiliar usada para localizar dados com menos trabalho em certos padrões de busca."),
    g("Seq scan", "Varredura sequencial da tabela para avaliar a condição da consulta."),
    g("B-Tree", "Estrutura de índice balanceada com muitos filhos por nó e folhas ordenadas."),
    g("Nó interno", "Nó que direciona a navegação entre faixas de chaves."),
    g("Folha", "Nó terminal que guarda entradas ordenadas do índice."),
    g("Fan-out", "Número de filhos ou faixas que um nó consegue apontar."),
    g("Range scan", "Percurso ordenado por um intervalo de chaves em vez de uma igualdade exata."),
    g("Split", "Divisão de nó cheio com redistribuição de chaves."),
    g("Seletividade", "Proporção da tabela que uma condição de busca tende a retornar."),
    g("Planner", "Componente que escolhe um plano de execução para a consulta."),
    g("Chave de índice", "Valor ou conjunto de valores usados para organizar a estrutura."),
    g("Manutenção de índice", "Trabalho adicional necessário para manter a estrutura atualizada sob escritas."),
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
