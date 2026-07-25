import type { LessonContent } from "../../../types/content";

export const comoFuncionaUmBancoDeDadosContent: LessonContent = {
  id: "como-funciona-um-banco-de-dados",
  title: "Como Funciona um Banco de Dados",
  subtitle:
    "Um banco de dados não é só uma planilha com mais linhas: ele organiza persistência, consulta, concorrência e recuperação para que aplicações possam confiar nos dados.",
  description:
    "Uma aula visual sobre tabelas, páginas, buffer cache, parser e planner de consultas, transações, MVCC, WAL e o papel de índices em bancos relacionais.",
  primaryCategoryId: "computacao",
  secondaryCategoryId: "engenharia",
  level: "Intermediário",
  estimatedTime: "45-55 min",
  tags: ["Banco de Dados", "SQL", "MVCC", "Transações", "WAL", "Índices"],
  learningObjectives: [
    "Entender por que aplicações usam bancos de dados em vez de arquivos soltos para tudo.",
    "Relacionar tabelas lógicas a armazenamento em páginas e buffers.",
    "Compreender, em alto nível, o caminho de uma consulta até o resultado.",
    "Explicar o papel de índices sem antecipar todo o aprofundamento em B-Trees.",
    "Entender transações, commit e rollback como garantias observáveis pela aplicação.",
    "Reconhecer como MVCC e logs de escrita ajudam em concorrência e recuperação.",
  ],
  prerequisites: [
    "Noção de registros, tabelas ou planilhas.",
    "Entender leitura e escrita em armazenamento.",
    "Curiosidade sobre por que bancos existem além de 'guardar dados'.",
  ],
  references: [
    {
      title: "PostgreSQL Documentation — MVCC Introduction",
      source: "PostgreSQL",
      url: "https://www.postgresql.org/docs/current/mvcc-intro.html",
      note:
        "Introdução oficial ao modelo multiversão de concorrência do PostgreSQL.",
    },
    {
      title: "PostgreSQL Documentation — Indexes Introduction",
      source: "PostgreSQL",
      url: "https://www.postgresql.org/docs/current/indexes-intro.html",
      note:
        "Explica o motivo de existir índice e os trade-offs básicos de manutenção.",
    },
    {
      title: "PostgreSQL Documentation — Database Page Layout",
      source: "PostgreSQL",
      url: "https://www.postgresql.org/docs/current/storage-page-layout.html",
      note:
        "Mostra como o armazenamento físico em páginas sustenta linhas e estruturas internas.",
    },
    {
      title: "PostgreSQL Documentation — Write-Ahead Logging (WAL)",
      source: "PostgreSQL",
      url: "https://www.postgresql.org/docs/current/wal-intro.html",
      note:
        "Base para entender durabilidade e recuperação após falhas.",
    },
    {
      title: "Use The Index, Luke!",
      source: "Markus Winand",
      url: "https://use-the-index-luke.com/",
      note:
        "Material educacional respeitado sobre índices e comportamento de consultas.",
    },
    {
      title: "CMU Database Group",
      source: "Carnegie Mellon University",
      url: "https://15445.courses.cs.cmu.edu/",
      note:
        "Curso e materiais de referência sobre implementação de sistemas de banco de dados.",
    },
  ],
  heroVisual: "db-hero",
  openingText:
    "Uma aplicação séria não quer apenas salvar dados; ela quer encontrá-los rápido, garantir consistência quando muitos usuários escrevem ao mesmo tempo e sobreviver a falhas sem perder o que foi confirmado. Um banco de dados existe para fornecer essa camada de organização e confiança. Por trás de uma consulta SQL aparentemente simples, há parser, planner, estruturas de armazenamento, buffers, logs e políticas de concorrência trabalhando em conjunto.",
  quickFacts: [
    {
      title: "Tabela lógica não é armazenamento bruto",
      body:
        "As linhas vistas pelo SQL ficam apoiadas em páginas, buffers e estruturas internas do mecanismo.",
    },
    {
      title: "Query boa depende de plano",
      body:
        "O banco precisa decidir como buscar dados: varrendo tudo, usando índice, juntando tabelas etc.",
    },
    {
      title: "Commit não é detalhe cosmético",
      body:
        "Ele marca um ponto de confirmação importante para concorrência e recuperação.",
    },
  ],
  sections: [
    s(
      "motivacao",
      "Motivação",
      "Por que não salvar tudo em arquivos e pronto?",
      "Persistir dados é fácil; persistir bem, consultar rápido, concorrer com segurança e recuperar falhas é o que torna bancos especiais.",
      "db-query-flow",
      undefined,
      [
        "Arquivos simples conseguem guardar informação, mas deixam para a aplicação tarefas difíceis: localizar registros com eficiência, coordenar múltiplos acessos, manter consistência e recuperar estado após falha.",
        "Um banco de dados encapsula essas responsabilidades em uma engine especializada. Você faz perguntas em nível lógico; ele escolhe estruturas e políticas para responder.",
        "Essa separação é valiosa porque a complexidade de persistência confiável cresce muito rápido quando múltiplos usuários, consultas e falhas entram em cena.",
      ],
      [
        {
          type: "definition",
          title: "Banco de dados",
          body:
            "Sistema que organiza armazenamento, consulta, concorrência e recuperação para servir aplicações que dependem de dados persistentes.",
        },
        {
          type: "insight",
          title: "Guardar é só o começo",
          body:
            "O valor do banco aparece quando precisamos perguntar, atualizar, coordenar e recuperar com previsibilidade.",
        },
      ],
    ),
    s(
      "modelo-logico",
      "Modelo",
      "Tabela, linha e coluna são a interface mental da aplicação",
      "O modelo relacional apresenta dados como tabelas e relações entre registros, não como offsets em arquivos.",
      "db-query-flow",
      undefined,
      [
        "No SQL, pensamos em tabelas, colunas, linhas, filtros e junções. Essa linguagem é poderosa porque descreve o que queremos, não exatamente como caminhar no disco byte a byte.",
        "Essa camada lógica ajuda produtividade e clareza, mas o banco ainda precisa executar o trabalho físico: encontrar páginas, decodificar registros, manter estruturas e sincronizar mudanças.",
        "O engenheiro produtivo precisa manter as duas visões na cabeça: a visão lógica para modelar bem e a visão física para entender custo e comportamento.",
      ],
      [
        {
          type: "example",
          title: "SELECT não diz como procurar",
          body:
            "A consulta descreve o resultado desejado; o mecanismo decide o plano de acesso mais plausível.",
        },
      ],
    ),
    s(
      "armazenamento",
      "Armazenamento",
      "Por baixo, o banco trabalha em páginas e buffers",
      "A engine não lê 'uma linha isolada' diretamente do universo; ela movimenta blocos de dados entre armazenamento e memória.",
      "db-storage",
      "buffer-cache-demo",
      [
        "Em motores relacionais, os dados costumam ser organizados em páginas de tamanho fixo. Essas páginas são carregadas para buffers em memória quando precisam ser lidas ou alteradas.",
        "Isso cria uma diferença importante entre visão lógica e física: mesmo que sua consulta queira poucas linhas, o banco pode precisar trazer páginas inteiras para a memória.",
        "O buffer cache é valioso porque evita repetir I/O caro em leituras frequentes. Quanto mais dados quentes cabem nele, mais o banco responde a partir da memória em vez de recorrer ao armazenamento persistente.",
      ],
      [
        {
          type: "definition",
          title: "Buffer cache",
          body:
            "Área de memória onde o banco mantém páginas recentemente usadas para reduzir leituras repetidas do armazenamento.",
        },
        {
          type: "mistake",
          title: "Imaginar que cada linha é lida individualmente do disco sob demanda",
          body:
            "Na prática, o mecanismo trabalha com blocos e políticas de cache, não com acessos isolados linha a linha.",
        },
      ],
    ),
    s(
      "consulta",
      "Consulta",
      "Uma query passa por parser, planner e executor",
      "Entre a string SQL e o resultado existe um pipeline que interpreta a consulta e escolhe como executá-la.",
      "db-query-flow",
      "query-planner-demo",
      [
        "Primeiro, o banco entende a sintaxe e a estrutura lógica da consulta. Depois, o planner estima custos e decide um plano de execução.",
        "Esse plano pode envolver varredura sequencial, uso de índice, joins e outras operações internas. O executor então percorre esse plano e produz o resultado.",
        "Por isso, otimização de consulta não é magia. Ela depende do que foi pedido, das estatísticas disponíveis e das estruturas de apoio, como índices e caches.",
      ],
      [
        {
          type: "definition",
          title: "Planner",
          body:
            "Componente que estima alternativas de execução e escolhe um plano para a consulta.",
        },
        {
          type: "insight",
          title: "Query boa não é só SQL bonito",
          body:
            "Ela precisa conversar bem com estatísticas, índices e distribuição real dos dados.",
        },
      ],
    ),
    s(
      "indices",
      "Aceleração",
      "Índices existem para evitar varreduras desnecessárias",
      "Quando poucos registros interessam, procurar com estrutura auxiliar costuma ser melhor do que ler a tabela inteira.",
      "db-query-flow",
      undefined,
      [
        "Um índice é uma estrutura adicional mantida pelo banco para acelerar certos padrões de busca. Ele custa espaço e precisa ser atualizado em escritas, mas pode economizar muito trabalho em leituras seletivas.",
        "A ideia é parecida com o índice remissivo de um livro: em vez de reler tudo, você consulta uma estrutura preparada para localizar tópicos com menos esforço.",
        "Mas índice não é vitória automática. Se a consulta toca grande parte da tabela, a varredura sequencial pode continuar sendo a melhor escolha.",
      ],
      [
        {
          type: "mistake",
          title: "Achar que 'ter índice' resolve qualquer consulta",
          body:
            "O planner ainda compara custo e pode concluir que ler a tabela inteira é mais sensato em certos cenários.",
        },
      ],
    ),
    s(
      "transacoes",
      "Consistência",
      "Transações agrupam mudanças com significado lógico",
      "Aplicações não querem só várias escritas soltas; elas querem conjuntos de mudanças que façam sentido juntos.",
      "db-transaction",
      "transaction-timeline",
      [
        "Uma transação delimita um bloco de operações que deve ser tratado como uma unidade lógica. Enquanto ela está aberta, o banco precisa controlar o que cada sessão vê e o que fica confirmado.",
        "Commit marca que aquele conjunto de mudanças deve ser considerado concluído. Rollback desfaz o que ainda não foi tornado visível como resultado final.",
        "Isso importa porque dados reais têm invariantes: transferências, reservas, saldos e relacionamentos precisam ser atualizados de forma coordenada, não como eventos independentes e vulneráveis a falhas no meio do caminho.",
      ],
      [
        {
          type: "definition",
          title: "Transação",
          body:
            "Unidade lógica de trabalho que agrupa leituras e escritas relacionadas dentro de um início e um término controlados.",
        },
        {
          type: "example",
          title: "Transferência bancária",
          body:
            "Debitar uma conta e creditar outra precisam andar juntos; não faz sentido confirmar só metade.",
        },
      ],
    ),
    s(
      "mvcc",
      "Concorrência",
      "MVCC ajuda leituras e escritas a coexistirem melhor",
      "Em vez de forçar todo mundo a disputar o mesmo estado visível o tempo todo, o banco trabalha com versões e snapshots.",
      "db-transaction",
      undefined,
      [
        "No modelo multiversão, uma consulta pode enxergar um snapshot consistente dos dados enquanto outras transações fazem alterações em paralelo.",
        "Essa estratégia reduz certos tipos de contenção entre leitura e escrita, embora não elimine todos os conflitos possíveis. O banco ainda precisa decidir quando uma transação pode confirmar ou deve esperar.",
        "Para quem usa o banco, o efeito importante é que concorrência não precisa significar caos imediato. Há um protocolo sofisticado sustentando a sensação de consistência.",
      ],
      [
        {
          type: "definition",
          title: "MVCC",
          body:
            "Multiversion Concurrency Control: abordagem que mantém múltiplas versões lógicas dos dados para melhorar convivência entre transações.",
        },
        {
          type: "insight",
          title: "Concorrência no banco não é só lock em tudo",
          body:
            "Sistemas modernos combinam versões, visibilidade e bloqueios pontuais para equilibrar isolamento e desempenho.",
        },
      ],
    ),
    s(
      "wal",
      "Durabilidade",
      "Logs e recuperação: confirmar algo precisa deixar rastros seguros",
      "Se a máquina cair logo após uma escrita, o banco precisa saber o que já estava confirmado e como reconstruir o estado consistente.",
      "db-storage",
      undefined,
      [
        "Write-Ahead Logging registra mudanças de forma que a recuperação consiga refazer ou reconciliar operações confirmadas após uma falha.",
        "A ideia geral é registrar a intenção/mudança antes de depender apenas das páginas finais no armazenamento principal. Isso melhora a capacidade de recuperação e a confiança em commits.",
        "Esse mecanismo é um dos motivos pelos quais bancos conseguem prometer mais durabilidade do que soluções caseiras apoiadas apenas em sobrescrever arquivos no escuro.",
      ],
      [
        {
          type: "definition",
          title: "WAL",
          body:
            "Write-Ahead Log: registro de mudanças usado para recuperação e garantia de durabilidade.",
        },
      ],
    ),
    s(
      "tradeoffs",
      "Trade-offs",
      "Banco de dados troca simplicidade aparente por garantias úteis",
      "A engine faz muito trabalho extra porque o problema real exige muito mais do que salvar bytes.",
      "db-query-flow",
      undefined,
      [
        "Índices aceleram algumas leituras, mas pesam em escritas. Mais cache ajuda consultas, mas consome memória. Isolamento forte reduz anomalias, mas pode aumentar custo de coordenação.",
        "Esses trade-offs explicam por que bancos têm tantas configurações, planos e métricas internas. Não há uma única política ótima para todas as cargas.",
        "O ganho está em saber que o banco já resolve problemas estruturais difíceis; a responsabilidade do engenheiro é entender como usar essa máquina de compromissos a favor da aplicação.",
      ],
      [
        {
          type: "mistake",
          title: "Ver banco como uma caixa preta sem custo de manutenção",
          body:
            "Modelagem, índices, concorrência e workload influenciam fortemente a saúde e o desempenho do sistema.",
        },
      ],
    ),
    s(
      "quiz",
      "Revisão",
      "Quiz de revisão",
      "Teste armazenamento em páginas, planner, transações, MVCC e logs de recuperação.",
      undefined,
      "quiz",
      [
        "Se você consegue contar a história de uma query e de um commit, a base da aula já ficou conectada.",
      ],
      [],
    ),
    s(
      "glossario",
      "Glossário",
      "Glossário e próximos estudos",
      "Feche a aula consolidando o vocabulário central de engines relacionais.",
      undefined,
      "glossary",
      [
        "Com esse vocabulário pronto, a próxima aula pode mergulhar em índices e B-Trees com menos atrito.",
      ],
      [],
    ),
  ],
  summaryCards: [
    {
      title: "Banco organiza persistência com garantias",
      body:
        "Ele resolve consulta, concorrência e recuperação, não apenas armazenamento bruto.",
    },
    {
      title: "Tabela lógica se apoia em páginas",
      body:
        "O motor move blocos entre armazenamento e memória por meio de buffers.",
    },
    {
      title: "Planner escolhe o caminho",
      body:
        "A consulta declarativa precisa virar um plano físico de execução.",
    },
    {
      title: "Índices são aceleradores com custo",
      body:
        "Eles ajudam em certas leituras, mas ocupam espaço e pesam em escritas.",
    },
    {
      title: "Transações protegem significado lógico",
      body:
        "Commit e rollback controlam quando um conjunto de mudanças vale como unidade.",
    },
    {
      title: "MVCC e WAL sustentam convivência e recuperação",
      body:
        "Versionamento e logs tornam concorrência e durabilidade mais confiáveis.",
    },
  ],
  relatedTopics: [
    {
      title: "Índices e B-Trees",
      body:
        "Aprofunda a estrutura de índice mais comum em bancos relacionais.",
    },
    {
      title: "Transações, ACID e Isolamento",
      body:
        "Expande a parte de consistência e concorrência além da visão geral desta aula.",
    },
    {
      title: "Como Funciona um Sistema Operacional",
      body:
        "Ajuda a ligar banco de dados a páginas de memória, I/O e persistência subjacentes.",
    },
  ],
  quiz: [
    q("q1", "Qual problema um banco de dados resolve além de 'guardar dados'?", "Consulta, concorrência, recuperação e organização confiável.", "Apenas compressão de arquivos.", "Somente renderização de tabelas na tela.", "a", "O valor do banco está nas garantias e mecanismos em torno dos dados persistentes."),
    q("q2", "Por que a visão de tabela não é a história completa?", "Porque por baixo a engine trabalha com páginas, buffers e estruturas físicas.", "Porque bancos não usam armazenamento.", "Porque SQL não suporta linhas.", "a", "A interface lógica esconde uma implementação física complexa."),
    q("q3", "Qual é o papel do planner?", "Escolher um plano de execução plausível para a consulta.", "Criptografar o resultado da query.", "Gerar automaticamente backups completos.", "a", "O planner estima custos e seleciona um caminho de execução."),
    q("q4", "Quando um índice tende a ser útil?", "Quando a consulta precisa de uma parte pequena da tabela segundo um critério indexado.", "Quando sempre queremos ler a tabela inteira.", "Quando não há condição de busca alguma.", "a", "Índices evitam varreduras completas em certos padrões de acesso."),
    q("q5", "Para que serve uma transação?", "Agrupar operações relacionadas como uma unidade lógica controlada.", "Converter SQL em JSON.", "Aumentar a memória física do servidor.", "a", "Ela permite raciocinar sobre commit, rollback e consistência conjunta."),
    q("q6", "O que o MVCC busca melhorar?", "A convivência entre leituras e escritas concorrentes por meio de versões e snapshots.", "A cor das linhas em uma tabela.", "A velocidade da placa de rede.", "a", "MVCC organiza visibilidade de dados em cenários concorrentes."),
    q("q7", "Por que o WAL é importante?", "Porque ajuda a recuperar estado consistente e sustentar durabilidade após falhas.", "Porque substitui totalmente o armazenamento principal.", "Porque elimina a necessidade de commit.", "a", "O log registra mudanças de modo útil para recuperação."),
    q("q8", "Qual frase resume melhor o custo dos bancos?", "As garantias úteis existem porque o sistema faz trabalho extra e gerencia trade-offs.", "Banco é só um arquivo grande com interface bonita.", "Toda consulta ótima independe do workload.", "a", "Há custos e compromissos internos para fornecer consistência, velocidade e recuperação."),
  ],
  glossary: [
    g("Tabela", "Estrutura lógica de dados organizada em linhas e colunas."),
    g("Linha", "Registro individual armazenado em uma tabela."),
    g("Página", "Bloco físico de armazenamento usado pela engine para mover dados."),
    g("Buffer cache", "Memória usada para manter páginas quentes e reduzir I/O repetido."),
    g("Parser", "Componente que entende a estrutura sintática da consulta."),
    g("Planner", "Componente que escolhe o plano de execução da consulta."),
    g("Índice", "Estrutura auxiliar para acelerar certos padrões de acesso."),
    g("Transação", "Unidade lógica de trabalho que agrupa leituras e escritas relacionadas."),
    g("Commit", "Confirmação de que uma transação deve ser considerada concluída."),
    g("Rollback", "Desfazimento das mudanças ainda não confirmadas como estado final."),
    g("MVCC", "Controle de concorrência multiversão baseado em snapshots e versões."),
    g("WAL", "Log de escrita antecipada usado para durabilidade e recuperação."),
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
