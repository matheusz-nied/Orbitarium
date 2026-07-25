import type { LessonContent } from "../../../types/content";

export const comoFuncionaAInternetContent: LessonContent = {
  id: "como-funciona-a-internet",
  title: "Como Funciona a Internet",
  subtitle:
    "Do clique ao conteúdo na tela existe uma cadeia de traduções, conexões e protocolos: nome vira IP, pacotes são roteados, conexões são negociadas e a aplicação troca mensagens.",
  description:
    "Uma aula introdutória sobre DNS, IP, TCP, HTTP e TLS, explicando em camadas o caminho conceitual entre digitar uma URL e receber uma resposta.",
  primaryCategoryId: "computacao",
  secondaryCategoryId: "engenharia",
  level: "Iniciante",
  estimatedTime: "40-50 min",
  tags: ["Internet", "DNS", "TCP", "HTTP", "TLS", "Rede"],
  learningObjectives: [
    "Entender a internet como cooperação entre camadas com responsabilidades distintas.",
    "Explicar o papel do DNS ao transformar nomes em endereços.",
    "Descrever intuitivamente o que IP faz no roteamento entre máquinas.",
    "Compreender por que TCP existe e o que handshake, ACK e retransmissão resolvem.",
    "Entender o papel do HTTP como protocolo de aplicação para pedir e entregar recursos.",
    "Relacionar TLS à proteção do tráfego sem confundir segurança com roteamento ou aplicação.",
  ],
  prerequisites: [
    "Já ter usado navegador, site ou aplicativo conectado.",
    "Não é necessário saber programar.",
    "Curiosidade sobre o caminho entre URL e página carregada.",
  ],
  references: [
    {
      title: "What is DNS?",
      source: "Cloudflare Learning Center",
      url: "https://www.cloudflare.com/learning/dns/what-is-dns/",
      note:
        "Explicação acessível e tecnicamente sólida sobre resolução de nomes e componentes do DNS.",
    },
    {
      title: "RFC 1035 — Domain Names: Implementation and Specification",
      source: "RFC Editor / IETF",
      url: "https://www.rfc-editor.org/rfc/rfc1035",
      note:
        "Especificação clássica do DNS e dos formatos básicos de mensagens.",
    },
    {
      title: "RFC 9293 — Transmission Control Protocol (TCP)",
      source: "RFC Editor / IETF",
      url: "https://www.rfc-editor.org/rfc/rfc9293",
      note:
        "Especificação atualizada do TCP, base da confiabilidade de muitas conexões.",
    },
    {
      title: "MDN Web Docs — An overview of HTTP",
      source: "MDN",
      url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview",
      note:
        "Visão didática do HTTP e do papel da aplicação na web moderna.",
    },
    {
      title: "RFC 9110 — HTTP Semantics",
      source: "RFC Editor / IETF",
      url: "https://www.rfc-editor.org/rfc/rfc9110",
      note:
        "Define a semântica fundamental de métodos, mensagens e status em HTTP.",
    },
    {
      title: "RFC 8446 — The Transport Layer Security (TLS) Protocol Version 1.3",
      source: "RFC Editor / IETF",
      url: "https://www.rfc-editor.org/rfc/rfc8446",
      note:
        "Base formal para a camada criptográfica usada no HTTPS moderno.",
    },
  ],
  heroVisual: "internet-hero",
  openingText:
    "Quando você digita uma URL, seu navegador não sai imediatamente 'buscando uma página'. Antes disso, ele precisa descobrir para onde ir, estabelecer uma conversa confiável, negociar proteção criptográfica quando necessário e só então trocar mensagens de aplicação. A internet funciona porque diferentes camadas resolvem problemas diferentes: nomes, endereços, entrega, confiabilidade, segurança e semântica do pedido. Entender essa separação evita muita confusão comum sobre o que cada tecnologia realmente faz.",
  quickFacts: [
    {
      title: "DNS traduz nome em endereço",
      body:
        "Ele ajuda a descobrir qual IP corresponde ao domínio desejado.",
    },
    {
      title: "TCP organiza a conversa",
      body:
        "Ele cria uma conexão confiável sobre uma rede que por si só não promete entrega perfeita.",
    },
    {
      title: "HTTP e TLS ficam em camadas superiores",
      body:
        "HTTP define a troca de pedidos e respostas; TLS protege esse tráfego quando usamos HTTPS.",
    },
  ],
  sections: [
    s(
      "motivacao",
      "Motivação",
      "A internet não é um protocolo só",
      "Carregar uma página envolve várias camadas cooperando, cada uma resolvendo um problema diferente.",
      "internet-layers",
      undefined,
      [
        "Quando pensamos na internet como uma caixa única, ficamos tentados a perguntar 'o que a internet faz?' como se houvesse uma resposta simples. Na prática, há uma pilha de responsabilidades.",
        "Precisamos traduzir nomes em endereços, entregar pacotes entre redes, tornar a conversa confiável, proteger o conteúdo e definir a linguagem de pedido e resposta da aplicação.",
        "Essas tarefas são separadas porque cada uma tem requisitos diferentes. Essa modularidade torna a rede escalável, evolutiva e ensinável.",
      ],
      [
        {
          type: "definition",
          title: "Camada",
          body:
            "Nível de responsabilidade que resolve um problema específico e fornece serviço para níveis acima.",
        },
        {
          type: "insight",
          title: "Camadas reduzem acoplamento mental",
          body:
            "Você pode estudar nomes, roteamento, confiabilidade e aplicação separadamente sem perder o quadro geral.",
        },
      ],
    ),
    s(
      "dns",
      "Nomes",
      "DNS: como 'example.com' vira um lugar para onde ir",
      "Humanos preferem nomes; máquinas precisam de endereços para localizar recursos na rede.",
      "internet-dns-chain",
      "dns-resolution-demo",
      [
        "Quando você digita um domínio, o sistema precisa descobrir qual endereço IP corresponde àquele nome. O DNS existe para fazer essa tradução de forma distribuída.",
        "Na prática, o navegador e o sistema operacional consultam caches locais antes de perguntar a um resolvedor recursivo, que pode então caminhar por servidores raiz, TLD e autoritativos.",
        "O resultado não é a página em si. É apenas a informação necessária para localizar o destino certo e permitir que as camadas seguintes entrem em cena.",
      ],
      [
        {
          type: "definition",
          title: "Resolvedor recursivo",
          body:
            "Servidor que recebe a pergunta do cliente e busca a resposta junto à hierarquia do DNS quando ela não está em cache.",
        },
        {
          type: "mistake",
          title: "Achar que DNS já 'baixa o site'",
          body:
            "DNS só resolve nomes. O conteúdo ainda depende de conexão e protocolos de aplicação depois.",
        },
      ],
    ),
    s(
      "ip",
      "Endereços",
      "IP e roteamento: descobrir por onde os pacotes podem seguir",
      "Saber o endereço é diferente de saber o caminho; a rede precisa encaminhar dados entre múltiplas máquinas e redes intermediárias.",
      "internet-request-path",
      undefined,
      [
        "Depois que o cliente conhece um endereço IP de destino, os dados são enviados em pacotes que atravessam uma sequência de redes e roteadores.",
        "Cada salto não conhece a internet inteira como um mapa detalhado de navegador. Ele só precisa saber qual próximo caminho é adequado para encaminhar o pacote mais adiante.",
        "Esse modelo distribuído é poderoso justamente porque não exige um controlador único decidindo tudo. A rede se organiza por encaminhamento e tabelas de rota espalhadas.",
      ],
      [
        {
          type: "definition",
          title: "Roteador",
          body:
            "Equipamento ou software que encaminha pacotes entre redes com base em endereços e rotas conhecidas.",
        },
        {
          type: "example",
          title: "Pacote não vai em linha reta mágica",
          body:
            "Ele passa por vários intermediários até chegar ao servidor, e o caminho pode mudar ao longo do tempo.",
        },
      ],
    ),
    s(
      "tcp",
      "Conexão",
      "TCP: transformar entrega incerta em conversa confiável",
      "A rede IP pode perder, duplicar ou desordenar pacotes; o TCP entra para organizar isso em uma conexão com regras claras.",
      "internet-request-path",
      "tcp-reliability-demo",
      [
        "O TCP oferece uma abstração de fluxo ordenado e confiável entre dois extremos. Para isso, usa números de sequência, confirmações de recebimento e retransmissão quando necessário.",
        "Antes de transferir dados, cliente e servidor negociam a conexão com um handshake. Esse processo ajuda a alinhar estado inicial e verificar se ambos estão prontos para conversar.",
        "O ponto importante é que TCP não substitui IP. Ele se apoia na rede subjacente e adiciona mecanismos para que a aplicação receba uma conversa mais estável.",
      ],
      [
        {
          type: "definition",
          title: "ACK",
          body:
            "Confirmação de recebimento usada pelo TCP para indicar que certos dados chegaram com sucesso.",
        },
        {
          type: "insight",
          title: "Confiabilidade custa estado e tempo",
          body:
            "Para garantir ordem e recuperação de perdas, o TCP precisa manter contexto e reagir ao comportamento da rede.",
        },
      ],
    ),
    s(
      "tls",
      "Proteção",
      "TLS: proteger a conversa sem redefinir a aplicação",
      "Depois de conseguir se conectar, ainda pode ser necessário proteger confidencialidade, integridade e autenticação do servidor.",
      "internet-layers",
      undefined,
      [
        "TLS adiciona uma camada criptográfica sobre a conexão de transporte para proteger os dados trocados. É ele que transforma HTTP em HTTPS.",
        "Seu trabalho não é resolver nomes nem encaminhar pacotes. Seu foco é negociar chaves, autenticar o servidor por certificados e proteger o conteúdo em trânsito.",
        "Isso significa que TLS responde a um problema diferente: mesmo que a rede funcione, você ainda precisa evitar espionagem, adulteração ou falsificação da outra ponta.",
      ],
      [
        {
          type: "definition",
          title: "TLS",
          body:
            "Protocolo criptográfico usado para proteger dados em trânsito entre cliente e servidor.",
        },
        {
          type: "mistake",
          title: "Confundir TLS com HTTP ou com DNS",
          body:
            "TLS protege a comunicação; HTTP define o pedido; DNS descobre o destino. São papéis distintos.",
        },
      ],
    ),
    s(
      "http",
      "Aplicação",
      "HTTP: pedir recursos e receber respostas compreensíveis",
      "Depois de nome, endereço, conexão e segurança, a aplicação finalmente pode dizer o que quer.",
      "internet-request-path",
      undefined,
      [
        "HTTP define a linguagem da web: métodos como GET e POST, cabeçalhos, códigos de status e o corpo das mensagens.",
        "Quando o navegador envia uma requisição, ele está descrevendo o recurso desejado e outros metadados relevantes. O servidor responde com status, cabeçalhos e conteúdo.",
        "Ou seja: HTTP não decide rota, não garante entrega e não cifra por si só. Ele aproveita o trabalho das camadas abaixo para focar na semântica da aplicação.",
      ],
      [
        {
          type: "definition",
          title: "Requisição HTTP",
          body:
            "Mensagem enviada pelo cliente para pedir um recurso ou acionar uma operação em um servidor.",
        },
        {
          type: "example",
          title: "GET /artigo",
          body:
            "O cliente pede a representação de um recurso; a resposta traz status, cabeçalhos e corpo correspondente.",
        },
      ],
    ),
    s(
      "caches",
      "Desempenho",
      "Nem todo clique repete todo o caminho do zero",
      "Caches podem evitar consultas e reduzir latência em vários pontos da jornada.",
      "internet-dns-chain",
      undefined,
      [
        "O DNS pode responder de cache local ou recursivo. O navegador pode reaproveitar conexões. Conteúdo HTTP também pode ser armazenado temporariamente em caches dependendo das regras.",
        "Isso significa que a experiência real do usuário nem sempre expõe todos os passos de forma completa a cada carregamento. O caminho conceitual existe, mas otimizações podem encurtá-lo.",
        "Entender cache é importante porque ele melhora desempenho, mas também complica depuração: às vezes o problema não está no servidor, e sim em uma resposta reaproveitada em algum ponto.",
      ],
      [
        {
          type: "insight",
          title: "Cache é economia de trabalho repetido",
          body:
            "Ele troca atualização imediata por rapidez quando a reutilização da resposta ainda faz sentido.",
        },
      ],
    ),
    s(
      "jornada",
      "Síntese",
      "Juntando tudo: DNS → TCP → TLS → HTTP",
      "A melhor forma de não se perder é contar a história na ordem em que ela se desenrola.",
      "internet-hero",
      "internet-request-journey",
      [
        "Primeiro, o cliente resolve o nome para descobrir o endereço. Depois, estabelece uma conexão de transporte adequada. Se a aplicação exigir proteção, negocia TLS. Só então envia a mensagem HTTP.",
        "A resposta volta pelo caminho inverso como dados protegidos na conexão existente, até que o navegador possa interpretá-la e renderizar a página ou recurso.",
        "Essa sequência não é a única história possível da internet, mas é um ótimo esqueleto mental para o caso mais comum da web moderna.",
      ],
      [
        {
          type: "insight",
          title: "A mesma pilha serve para muito mais que páginas",
          body:
            "APIs, apps móveis e várias integrações modernas seguem raciocínios semelhantes sobre nome, conexão, proteção e aplicação.",
        },
      ],
    ),
    s(
      "quiz",
      "Revisão",
      "Quiz de revisão",
      "Teste o encadeamento entre DNS, IP, TCP, TLS e HTTP.",
      undefined,
      "quiz",
      [
        "Se você conseguir explicar a ordem e o papel de cada camada, a base da aula está sólida.",
      ],
      [],
    ),
    s(
      "glossario",
      "Glossário",
      "Glossário e próximos estudos",
      "Feche a aula consolidando o vocabulário mínimo para estudar rede com menos confusão.",
      undefined,
      "glossary",
      [
        "Esses termos aparecem em qualquer discussão sobre sites, APIs, segurança na web e observabilidade de rede.",
      ],
      [],
    ),
  ],
  summaryCards: [
    {
      title: "Internet é uma pilha de responsabilidades",
      body:
        "Cada camada resolve um problema diferente em vez de uma tecnologia fazer tudo.",
    },
    {
      title: "DNS resolve nomes",
      body:
        "Ele descobre para onde ir, mas não entrega o conteúdo final.",
    },
    {
      title: "IP encaminha pacotes",
      body:
        "A rede descobre caminhos por saltos entre roteadores.",
    },
    {
      title: "TCP organiza a conversa",
      body:
        "Handshake, ACKs e retransmissão ajudam a criar fluxo confiável.",
    },
    {
      title: "TLS protege o tráfego",
      body:
        "Ele adiciona confidencialidade e integridade sem substituir a camada de aplicação.",
    },
    {
      title: "HTTP define o pedido",
      body:
        "É a linguagem da aplicação web sobre as camadas anteriores.",
    },
  ],
  relatedTopics: [
    {
      title: "TLS e HTTPS",
      body:
        "Aprofunda a camada criptográfica que aqui foi apresentada em visão geral.",
    },
    {
      title: "APIs REST",
      body:
        "Expande o papel do HTTP quando o cliente não é um navegador tradicional.",
    },
    {
      title: "Observabilidade de Sistemas",
      body:
        "Mostra como medir e depurar o comportamento real dessa jornada em produção.",
    },
  ],
  quiz: [
    q("q1", "Qual camada ajuda a transformar um nome de domínio em endereço IP?", "DNS.", "HTTP.", "TLS.", "a", "DNS existe justamente para resolução de nomes em endereços utilizáveis pela rede."),
    q("q2", "Qual é o papel principal do IP?", "Encaminhar pacotes entre redes usando endereços.", "Criptografar o conteúdo da conexão.", "Definir métodos como GET e POST.", "a", "IP lida com endereçamento e encaminhamento, não com semântica de aplicação."),
    q("q3", "Por que o TCP existe sobre a rede IP?", "Para oferecer uma conversa mais confiável e ordenada.", "Para substituir totalmente o DNS.", "Para renderizar páginas HTML.", "a", "O TCP adiciona mecanismos como ACK e retransmissão sobre uma rede que não promete perfeição."),
    q("q4", "O que o handshake do TCP ajuda a fazer?", "Alinhar o estado inicial de uma conexão entre cliente e servidor.", "Converter nomes em endereços.", "Emitir certificados digitais.", "a", "O handshake negocia o começo da conversa confiável."),
    q("q5", "Qual frase descreve melhor o TLS?", "Protege a comunicação em trânsito com criptografia e autenticação.", "Descobre a rota dos pacotes.", "Escolhe o método HTTP adequado.", "a", "TLS atua na proteção do canal, não na descoberta do destino ou semântica do pedido."),
    q("q6", "O HTTP responde a qual pergunta?", "Que recurso ou operação a aplicação quer pedir ou responder.", "Qual é o IP do servidor.", "Qual roteador será usado no próximo salto.", "a", "HTTP define a linguagem do pedido e da resposta da aplicação."),
    q("q7", "Qual sequência está mais próxima da jornada comum na web?", "DNS → conexão TCP → TLS (quando HTTPS) → requisição HTTP.", "HTTP → DNS → IP → TLS.", "TLS → DNS → handshake HTTP.", "a", "Nome, conexão, proteção e aplicação aparecem nessa ordem conceitual na maioria dos casos web."),
    q("q8", "Por que caches mudam a experiência real da rede?", "Porque podem evitar trabalho repetido e encurtar parte do caminho.", "Porque removem a necessidade de qualquer protocolo.", "Porque impedem o uso de HTTP.", "a", "Caches economizam consultas e respostas repetidas quando reaproveitamento é válido."),
  ],
  glossary: [
    g("DNS", "Sistema distribuído que traduz nomes de domínio em endereços IP."),
    g("Resolvedor recursivo", "Servidor que busca respostas DNS em nome do cliente quando necessário."),
    g("IP", "Protocolo de endereçamento e encaminhamento de pacotes entre redes."),
    g("Roteador", "Elemento de rede que decide o próximo salto de um pacote."),
    g("TCP", "Protocolo de transporte que oferece fluxo ordenado e confiável."),
    g("Handshake", "Negociação inicial usada para estabelecer uma conexão ou sessão."),
    g("ACK", "Confirmação de recebimento enviada pelo TCP."),
    g("TLS", "Protocolo criptográfico usado para proteger dados em trânsito."),
    g("HTTP", "Protocolo de aplicação usado para pedidos e respostas na web."),
    g("Requisição", "Mensagem enviada pelo cliente para pedir um recurso ou operação."),
    g("Resposta", "Mensagem devolvida pelo servidor com status, metadados e possivelmente conteúdo."),
    g("Cache", "Armazenamento temporário que evita repetir trabalho ou consultas recentes."),
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
