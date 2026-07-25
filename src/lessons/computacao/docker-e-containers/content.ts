import type { LessonContent } from "../../../types/content";

export const dockerEContainersContent: LessonContent = {
  id: "docker-e-containers",
  title: "Docker e Containers",
  subtitle:
    "Containers empacotam aplicação e dependências usando isolamento do sistema operacional, permitindo portabilidade com muito menos peso do que uma máquina virtual completa.",
  description:
    "Uma aula visual sobre imagens, containers, camadas, namespaces, cgroups, volumes, rede, fluxo de build e execução com Docker.",
  primaryCategoryId: "computacao",
  secondaryCategoryId: "engenharia",
  level: "Intermediário",
  estimatedTime: "45-55 min",
  tags: ["Docker", "Containers", "Namespaces", "Cgroups", "Imagens", "Volumes"],
  learningObjectives: [
    "Entender por que containers surgiram como resposta a problemas de empacotamento e consistência.",
    "Distinguir imagem e container com precisão.",
    "Relacionar isolamento de containers a namespaces e cgroups do kernel.",
    "Entender como camadas de imagem ajudam em build, cache e distribuição.",
    "Compreender o papel de volumes e rede na execução prática de containers.",
    "Comparar containers e máquinas virtuais sem caricaturas ou hype vazio.",
  ],
  prerequisites: [
    "Noção geral de sistema operacional e processos.",
    "Ter visto a ideia de isolamento de recursos ajuda.",
    "Não é necessário já ter usado Docker.",
  ],
  references: [
    {
      title: "What is Docker?",
      source: "Docker Docs",
      url: "https://docs.docker.com/get-started/docker-overview/",
      note:
        "Visão oficial do ecossistema Docker, containers, imagens e arquitetura cliente-servidor.",
    },
    {
      title: "Docker Engine — Running containers",
      source: "Docker Docs",
      url: "https://docs.docker.com/engine/containers/run/",
      note:
        "Material oficial sobre criação e execução de containers com a CLI.",
    },
    {
      title: "Docker Engine — Volumes",
      source: "Docker Docs",
      url: "https://docs.docker.com/engine/storage/volumes/",
      note:
        "Referência oficial para persistência de dados fora do ciclo de vida efêmero do container.",
    },
    {
      title: "Docker Engine — Networking overview",
      source: "Docker Docs",
      url: "https://docs.docker.com/engine/network/",
      note:
        "Explica as bases de conectividade de containers e mapeamento de portas.",
    },
    {
      title: "Linux man-pages — namespaces(7)",
      source: "man7.org",
      url: "https://man7.org/linux/man-pages/man7/namespaces.7.html",
      note:
        "Base conceitual para o isolamento de recursos usado por containers em Linux.",
    },
    {
      title: "Control Group v2",
      source: "Linux kernel documentation",
      url: "https://www.kernel.org/doc/html/latest/admin-guide/cgroup-v2.html",
      note:
        "Fundamental para entender limites e contabilização de recursos em containers.",
    },
  ],
  heroVisual: "docker-hero",
  openingText:
    "A frase 'na minha máquina funciona' é um sintoma clássico de diferenças entre ambientes: versões de bibliotecas, variáveis, caminhos, ferramentas de sistema e processos de inicialização. Containers atacam esse problema empacotando aplicação e dependências em uma unidade distribuível e executável com mais previsibilidade. Mas eles não são mini-máquinas mágicas. Eles reaproveitam o kernel do host, dependem de isolamento de processos e têm limites que todo engenheiro precisa entender para usar a tecnologia com lucidez.",
  quickFacts: [
    {
      title: "Imagem não é container",
      body:
        "Imagem é o template imutável; container é a instância em execução com estado próprio.",
    },
    {
      title: "Container usa o kernel do host",
      body:
        "Ao contrário de VMs tradicionais, não leva um sistema operacional completo separado dentro de si.",
    },
    {
      title: "Persistência exige cuidado explícito",
      body:
        "Sem volume ou estratégia externa, o estado gravado no container tende a ser efêmero.",
    },
  ],
  sections: [
    s(
      "motivacao",
      "Motivação",
      "Que problema containers tentam resolver?",
      "A meta central é tornar ambiente, dependências e execução mais reproduzíveis entre desenvolvimento, teste e produção.",
      "docker-stack",
      undefined,
      [
        "Aplicações não dependem só do código-fonte. Elas dependem de bibliotecas, variáveis, arquivos de configuração, portas, processos auxiliares e versões específicas de ferramentas.",
        "Quando essas peças mudam entre ambientes, aparecem inconsistências difíceis de depurar. Containers oferecem uma forma de empacotar a aplicação com o que ela precisa para rodar.",
        "Isso não elimina todos os problemas operacionais, mas reduz uma categoria importante de divergência entre 'o que foi testado' e 'o que está sendo executado'.",
      ],
      [
        {
          type: "definition",
          title: "Container",
          body:
            "Unidade de execução isolada no nível do sistema operacional que roda uma aplicação com sua configuração e dependências.",
        },
        {
          type: "insight",
          title: "Container é mais sobre consistência operacional do que sobre moda",
          body:
            "Seu valor aparece quando ambientes diferentes deixam de se comportar como mundos incompatíveis.",
        },
      ],
    ),
    s(
      "imagem-vs-container",
      "Modelo",
      "Imagem e container: template versus instância",
      "A imagem descreve como rodar; o container é a execução concreta daquele template com estado momentâneo.",
      "docker-layers",
      "image-layer-builder",
      [
        "Uma imagem é uma receita imutável composta por camadas. Ela descreve filesystem base, dependências, arquivos da aplicação, comando inicial e outros metadados.",
        "Um container é a instância executável criada a partir dessa imagem. Ao iniciar, ele ganha processo principal, namespace, rede e uma camada gravável temporária para mudanças locais.",
        "Essa distinção é central. Build e distribuição acontecem sobre imagens; observação de logs, reinício e ciclo de vida de processos acontecem sobre containers.",
      ],
      [
        {
          type: "definition",
          title: "Imagem",
          body:
            "Template imutável usado para criar containers, geralmente construído em camadas.",
        },
        {
          type: "mistake",
          title: "Confundir 'subir uma imagem' com 'rodar um container'",
          body:
            "A imagem é material de construção; o container é a execução viva derivada dela.",
        },
      ],
    ),
    s(
      "camadas",
      "Build",
      "Camadas permitem reaproveitamento e cache",
      "Em vez de reconstruir tudo do zero sempre, o Docker trabalha com passos que podem ser reaproveitados quando nada mudou.",
      "docker-layers",
      undefined,
      [
        "Cada instrução relevante do Dockerfile contribui para formar camadas reaproveitáveis. Se uma camada anterior não mudou, o build pode reutilizá-la em vez de refazer todo o caminho.",
        "Isso acelera desenvolvimento e distribuição, porque partes comuns entre imagens diferentes podem ser compartilhadas. Também incentiva ordem cuidadosa das instruções no Dockerfile.",
        "Na prática, pensar em camadas é pensar em onde o cache quebra. Mudar um passo muito cedo no arquivo pode invalidar várias etapas posteriores.",
      ],
      [
        {
          type: "insight",
          title: "Ordem do Dockerfile afeta tempo de build",
          body:
            "Passos estáveis costumam ir antes; passos que mudam muito, como copiar código da aplicação, costumam ficar depois.",
        },
      ],
    ),
    s(
      "isolamento",
      "Kernel",
      "Namespaces e cgroups: o isolamento real por trás do container",
      "O container parece ter seu próprio mundo porque o kernel limita a visão e o consumo de recursos dos processos.",
      "docker-isolation",
      "container-vs-vm-comparison",
      [
        "Namespaces fazem um processo enxergar recursos como se estivesse em um contexto próprio: IDs de processo, interfaces de rede, pontos de montagem e outros aspectos podem parecer privados.",
        "Cgroups controlam e contabilizam uso de CPU, memória e outros recursos. Isso ajuda a evitar que um container monopolize a máquina inteira sem controle.",
        "Esses mecanismos não criam um novo kernel. Eles reorganizam a relação entre processos e o kernel existente do host, o que explica tanto a leveza quanto certos limites dos containers.",
      ],
      [
        {
          type: "definition",
          title: "Namespace",
          body:
            "Mecanismo do kernel que isola a visão de certos recursos para um conjunto de processos.",
        },
        {
          type: "definition",
          title: "Cgroup",
          body:
            "Mecanismo do kernel para limitar, medir e organizar o consumo de recursos por grupos de processos.",
        },
      ],
    ),
    s(
      "rede",
      "Conectividade",
      "Container também precisa de rede: portas, interfaces e nomes",
      "Uma aplicação isolada continua precisando conversar com o mundo, e o motor de containers fornece caminhos controlados para isso.",
      "docker-stack",
      "volume-network-lab",
      [
        "Por padrão, containers costumam rodar em redes virtuais fornecidas pelo engine. Eles recebem endereços internos e podem ser conectados entre si sob regras específicas.",
        "Para expor um serviço ao host ou à máquina externa, normalmente mapeamos portas. Isso cria uma ponte entre a porta do host e a porta onde a aplicação escuta dentro do container.",
        "Entender esse detalhe evita confusões clássicas: o serviço pode estar funcionando internamente e ainda assim não estar acessível de fora por falta de mapeamento ou configuração de rede.",
      ],
      [
        {
          type: "example",
          title: "Aplicação em 3000 dentro do container",
          body:
            "Ela pode precisar de um mapeamento do tipo host:3000 → container:3000 para ficar acessível do lado de fora.",
        },
      ],
    ),
    s(
      "volumes",
      "Persistência",
      "O filesystem do container é prático, mas não deve guardar tudo sozinho",
      "Containers são ótimos para execução efêmera; dados importantes costumam pedir volume ou outro mecanismo explícito de persistência.",
      "docker-stack",
      undefined,
      [
        "Quando um container é recriado, a camada gravável associada a ele pode ser descartada. Isso é útil para imutabilidade operacional, mas perigoso para dados que precisam sobreviver.",
        "Volumes permitem separar dados persistentes do ciclo de vida do container. Assim, você pode reiniciar, atualizar ou substituir a instância sem perder automaticamente o estado desejado.",
        "Essa distinção é central para arquiteturas reais: código e dependências podem ser efêmeros; dados críticos geralmente não podem ser.",
      ],
      [
        {
          type: "mistake",
          title: "Salvar banco de dados dentro da camada efêmera e esquecer volumes",
          body:
            "Atualizar ou remover o container pode apagar o estado local se ele não estiver persistido fora dessa camada.",
        },
      ],
    ),
    s(
      "cliente-daemon",
      "Arquitetura",
      "Docker é cliente, daemon, imagens, registries e objetos",
      "O ecossistema não é só um comando: há um conjunto de componentes que colaboram para buildar, armazenar e executar.",
      "docker-stack",
      undefined,
      [
        "O CLI do Docker conversa com um daemon que realmente administra imagens, containers, redes e volumes. O usuário fala com o cliente; o daemon faz o trabalho pesado.",
        "As imagens podem morar localmente ou em registries remotos. Isso permite distribuir uma build pronta para vários ambientes sem recompilar tudo no destino.",
        "Entender esse desenho ajuda a depurar problemas de contexto de build, cache local, permissões, push/pull e execução em hosts distintos.",
      ],
      [
        {
          type: "definition",
          title: "Registry",
          body:
            "Serviço que armazena e distribui imagens de container para outros ambientes.",
        },
      ],
    ),
    s(
      "vm-vs-container",
      "Comparação",
      "Container não é VM, mas também não é 'processo comum e só'",
      "Máquinas virtuais e containers resolvem isolamento em camadas diferentes e podem inclusive coexistir.",
      "docker-isolation",
      undefined,
      [
        "Uma máquina virtual tradicional inclui seu próprio sistema operacional convidado sobre um hipervisor. Isso traz isolamento mais forte em certos sentidos, mas também mais peso e sobrecarga operacional.",
        "Containers usam o kernel do host e isolam processos nesse nível. Por isso, são geralmente mais leves e rápidos de iniciar, mas não entregam exatamente o mesmo tipo de fronteira que uma VM.",
        "Na prática, muitas plataformas combinam os dois: VMs fornecem uma base isolada por host; dentro delas, containers organizam aplicações e serviços.",
      ],
      [
        {
          type: "insight",
          title: "A comparação honesta é por camada de isolamento",
          body:
            "VMs virtualizam máquinas completas; containers virtualizam mais diretamente o ambiente de processos sobre um kernel compartilhado.",
        },
      ],
    ),
    s(
      "tradeoffs",
      "Realismo",
      "Containers ajudam muito, mas não são resposta universal",
      "Eles simplificam empacotamento e entrega, porém não substituem observabilidade, segurança, modelagem correta de estado ou disciplina operacional.",
      "docker-hero",
      undefined,
      [
        "Um container mal configurado continua sendo uma aplicação mal configurada. Dependências podem até estar empacotadas, mas problemas de rede, secrets, latência, logs e persistência continuam existindo.",
        "Além disso, imagens enormes, Dockerfiles mal ordenados, permissões frágeis ou excesso de privilégios podem transformar a promessa de consistência em dívida operacional.",
        "A maturidade está em usar containers como ferramenta de engenharia, não como slogan. Eles melhoram muito o fluxo certo, mas não absolvem decisões ruins no resto do sistema.",
      ],
      [
        {
          type: "mistake",
          title: "Achar que container automaticamente resolve deploy, segurança e escalabilidade",
          body:
            "Ele resolve parte importante do empacotamento e da execução, mas o sistema completo continua pedindo arquitetura e operação cuidadosas.",
        },
      ],
    ),
    s(
      "quiz",
      "Revisão",
      "Quiz de revisão",
      "Teste imagem, container, camadas, namespaces, cgroups, rede e volumes.",
      undefined,
      "quiz",
      [
        "Se você consegue explicar a diferença entre template, instância, isolamento e persistência, a aula cumpriu seu papel.",
      ],
      [],
    ),
    s(
      "glossario",
      "Glossário",
      "Glossário e próximos estudos",
      "Feche a aula consolidando o vocabulário central do ecossistema de containers.",
      undefined,
      "glossary",
      [
        "Esses termos aparecem em Dockerfiles, documentação de runtime, plataformas de deploy e orquestração.",
      ],
      [],
    ),
  ],
  summaryCards: [
    {
      title: "Containers empacotam ambiente e aplicação",
      body:
        "Eles reduzem divergência entre ambientes ao distribuir uma unidade executável previsível.",
    },
    {
      title: "Imagem não é execução",
      body:
        "Imagem é template; container é a instância rodando com processo e estado temporário.",
    },
    {
      title: "Camadas aceleram build e distribuição",
      body:
        "Cache e reuso dependem da ordem e da estabilidade das instruções.",
    },
    {
      title: "Isolamento vem do kernel",
      body:
        "Namespaces e cgroups sustentam o comportamento prático dos containers em Linux.",
    },
    {
      title: "Estado pede volume",
      body:
        "Sem persistência externa, a camada gravável do container é naturalmente efêmera.",
    },
    {
      title: "Container e VM são camadas diferentes",
      body:
        "Eles não são equivalentes, mas podem coexistir de forma complementar.",
    },
  ],
  relatedTopics: [
    {
      title: "Como Funciona um Sistema Operacional",
      body:
        "Explica a base de kernel, isolamento e recursos sobre a qual containers se apoiam.",
    },
    {
      title: "Processos, Threads e Concorrência",
      body:
        "Reforça a ideia de container como conjunto isolado de processos, não como máquina mágica separada.",
    },
    {
      title: "Observabilidade de Sistemas",
      body:
        "Mostra como monitorar de fato serviços empacotados em containers em ambientes reais.",
    },
  ],
  quiz: [
    q("q1", "Qual problema containers atacam de forma mais direta?", "Diferenças de ambiente e empacotamento entre desenvolvimento e produção.", "Conversão de SQL em índices.", "Criação de chips de GPU.", "a", "Containers ajudam a reproduzir ambiente e dependências com mais consistência."),
    q("q2", "Qual frase diferencia melhor imagem e container?", "Imagem é template imutável; container é instância executável.", "Imagem é o processo em execução e container é o backup.", "Os dois termos são exatamente sinônimos.", "a", "A distinção entre template e instância é central no modelo."),
    q("q3", "Por que containers tendem a ser mais leves que VMs completas?", "Porque reaproveitam o kernel do host em vez de carregar um sistema convidado completo.", "Porque não usam memória alguma.", "Porque ignoram isolamento.", "a", "O tipo de virtualização é diferente e opera mais perto do sistema operacional do host."),
    q("q4", "O que namespaces fazem?", "Isolam a visão de certos recursos para processos.", "Persistem automaticamente todos os dados do container.", "Substituem a rede física do host.", "a", "Namespaces mudam o que o processo enxerga do ambiente do kernel."),
    q("q5", "Qual é o papel dos cgroups?", "Limitar e contabilizar recursos como CPU e memória.", "Converter imagens em VMs.", "Escolher automaticamente o banco de dados da aplicação.", "a", "Cgroups tratam consumo e controle de recursos."),
    q("q6", "Por que a ordem do Dockerfile importa?", "Porque afeta reaproveitamento de camadas e cache de build.", "Porque muda o kernel do host.", "Porque define diretamente a topologia física da rede.", "a", "Passos estáveis antes e passos voláteis depois costumam melhorar o cache."),
    q("q7", "Quando volumes entram em cena?", "Quando dados precisam sobreviver ao ciclo de vida efêmero do container.", "Quando queremos mais threads dentro da imagem.", "Quando precisamos de um novo hipervisor.", "a", "Volumes separam persistência do container executável."),
    q("q8", "Qual visão é mais honesta sobre containers?", "São ferramentas valiosas de empacotamento e isolamento, mas não resolvem sozinhas todo problema operacional.", "Eliminam por definição qualquer risco de segurança ou deploy.", "Substituem automaticamente arquitetura e observabilidade.", "a", "Containers ajudam muito, mas continuam inseridos em sistemas maiores que exigem engenharia real."),
  ],
  glossary: [
    g("Container", "Unidade de execução isolada no nível do sistema operacional."),
    g("Imagem", "Template imutável usado para criar containers."),
    g("Camada", "Parte reutilizável da imagem construída em etapas."),
    g("Dockerfile", "Arquivo declarativo que descreve como construir uma imagem."),
    g("Namespace", "Mecanismo do kernel que isola a visão de recursos."),
    g("Cgroup", "Mecanismo do kernel que limita e mede consumo de recursos."),
    g("Volume", "Mecanismo de persistência desacoplado do ciclo de vida do container."),
    g("Registry", "Serviço que armazena e distribui imagens."),
    g("Daemon", "Processo de fundo que administra objetos do Docker no host."),
    g("Port mapping", "Ligação entre porta do host e porta exposta no container."),
    g("Filesystem efêmero", "Camada gravável temporária que pode desaparecer quando o container é recriado."),
    g("Hipervisor", "Camada usada por máquinas virtuais para virtualizar hardware e hospedar sistemas convidados."),
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
