import { useMemo, useState } from "react";
import type { JSX } from "react";
import {
  Binary,
  Boxes,
  ChartColumn,
  Database,
  GitBranch,
  Globe,
  Network,
  Radio,
  Scale,
  Sigma,
} from "lucide-react";
import type { LessonInteractionProps, LessonModule } from "../../../types/content";
import { InteractiveShell, MetricCard } from "../../../components/lesson/InteractionPrimitives";
import type { Wave3PartATopicId } from "./wave3PartAVisuals";

export const wave3PartAInteractions = {
  "model-lab": ModelLabInteraction,
  "tradeoff-lab": TradeoffLabInteraction,
  "scenario-lab": ScenarioLabInteraction,
} satisfies LessonModule["interactions"];

type TopicTone = "violet" | "teal" | "indigo" | "amber" | "rose" | "emerald";

type MetricPair = [string, string];

interface ModelOption {
  id: string;
  label: string;
  title: string;
  summary: string;
  bullets: string[];
  metrics: MetricPair[];
}

interface ModelConfig {
  eyebrow: string;
  title: string;
  description: string;
  tone: TopicTone;
  icon: JSX.Element;
  options: ModelOption[];
}

interface ScenarioOption {
  id: string;
  label: string;
  context: string;
  decision: string;
  why: string[];
  watchOut: string;
}

interface ScenarioConfig {
  eyebrow: string;
  title: string;
  description: string;
  tone: TopicTone;
  icon: JSX.Element;
  options: ScenarioOption[];
}

const modelConfigs: Record<Wave3PartATopicId, ModelConfig> = {
  "turing-e-a-ideia-de-computacao": {
    eyebrow: "Modelo",
    title: "Monte a ideia de computacao passo a passo",
    description: "Escolha um componente da maquina de Turing e observe o papel conceitual que ele desempenha no ato de computar.",
    tone: "violet",
    icon: <Binary size={18} aria-hidden="true" />,
    options: [
      {
        id: "tape",
        label: "Fita",
        title: "Memoria externa simbolica",
        summary: "A fita representa o espaco onde a maquina consulta e transforma a entrada durante a execucao.",
        bullets: [
          "Nao precisa caber inteira na cabeca do algoritmo.",
          "Permite voltar e revisitar partes da entrada.",
          "Separa a ideia de regra da ideia de armazenamento.",
        ],
        metrics: [["Funcao", "armazenar simbolos"], ["Limite", "nao decide sozinho"], ["Intuicao", "papel + rascunho"]],
      },
      {
        id: "state",
        label: "Estado",
        title: "Contexto comprimido da execucao",
        summary: "O estado diz em que fase logica a maquina esta, sem carregar toda a historia detalhada do processo.",
        bullets: [
          "Resume a estrategia atual.",
          "Define como interpretar o simbolo lido.",
          "Mostra que computar e alternar entre configuracoes locais.",
        ],
        metrics: [["Funcao", "controlar fluxo"], ["Escala", "finito"], ["Intuicao", "modo atual"]],
      },
      {
        id: "rule",
        label: "Regra",
        title: "Programa como tabela de transicao",
        summary: "Uma regra local combina simbolo e estado para determinar escrita, movimento e proximo estado.",
        bullets: [
          "E o nucleo formal da nocao de algoritmo.",
          "Troca intuicao vaga por passos mecanicos.",
          "Pode ser copiada para qualquer entrada do mesmo tipo.",
        ],
        metrics: [["Entrada", "estado + simbolo"], ["Saida", "acao local"], ["Poder", "procedimento geral"]],
      },
      {
        id: "universal",
        label: "Universal",
        title: "Uma maquina que imita outras",
        summary: "A maquina universal mostra que descricao de programa e dados podem morar no mesmo suporte simbolico.",
        bullets: [
          "Antecipou a ideia de software separado do hardware.",
          "Permite interpretar uma maquina a partir de sua codificacao.",
          "Conecta teoria da computacao e computadores programaveis.",
        ],
        metrics: [["Salto", "programa como dado"], ["Legado", "software geral"], ["Mensagem", "uma maquina pode simular muitas"]],
      },
    ],
  },
  "algoritmos-e-complexidade": {
    eyebrow: "Crescimento",
    title: "Troque o cronometro pela curva",
    description: "Selecione qual lente de analise voce quer destacar e veja como a conversa sobre custo muda.",
    tone: "teal",
    icon: <ChartColumn size={18} aria-hidden="true" />,
    options: [
      {
        id: "n",
        label: "n",
        title: "Tamanho da entrada",
        summary: "Complexidade sempre depende do que voce escolhe como medida de entrada: itens, vertices, linhas ou bytes.",
        bullets: [
          "Uma escolha ruim de n distorce a comparacao.",
          "Problemas reais podem ter mais de um parametro relevante.",
          "Escala so faz sentido se a entrada estiver bem definida.",
        ],
        metrics: [["Pergunta", "o que esta crescendo?"], ["Exemplo", "numero de elementos"], ["Risco", "medir a coisa errada"]],
      },
      {
        id: "dominant",
        label: "Dominante",
        title: "O termo que acaba mandando",
        summary: "Quando n cresce muito, o termo dominante engole constantes e parcelas menores no comportamento global.",
        bullets: [
          "n^2 supera 10n quando n fica grande o bastante.",
          "A ideia nao despreza detalhes para sempre; so foca o que escala.",
          "Serve para prever para onde a curva caminha.",
        ],
        metrics: [["Foco", "ordem de crescimento"], ["Ignora", "termos menores"], ["Ajuda", "comparar familias"]],
      },
      {
        id: "cases",
        label: "Casos",
        title: "Pior, medio e amortizado nao sao sinonimos",
        summary: "Cada analise responde a uma pergunta diferente sobre risco, expectativa e sequencias de operacoes.",
        bullets: [
          "Pior caso protege contra surpresas.",
          "Caso medio depende de modelo de entrada.",
          "Amortizado distribui picos ao longo de muitas operacoes.",
        ],
        metrics: [["Pior caso", "garantia"], ["Caso medio", "expectativa"], ["Amortizado", "serie de operacoes"]],
      },
      {
        id: "practice",
        label: "Pratica",
        title: "Implementacao ainda importa",
        summary: "Duas solucoes da mesma classe assintotica podem se comportar de modo muito diferente por causa de memoria, cache e constantes.",
        bullets: [
          "Big-O nao substitui perfilamento.",
          "O que vence em pequena escala pode perder em grande escala.",
          "Escolha boa junta teoria e observacao empirica.",
        ],
        metrics: [["Teoria", "filtra opcoes"], ["Empiria", "fecha a escolha"], ["Erro comum", "ler O como tempo real"]],
      },
    ],
  },
  "estruturas-de-dados-essenciais": {
    eyebrow: "Ferramentas",
    title: "Veja a mesma colecao sob estruturas diferentes",
    description: "Cada opcao organiza dados com promessas distintas sobre acesso, atualizacao, ordem e relacoes.",
    tone: "emerald",
    icon: <Database size={18} aria-hidden="true" />,
    options: [
      {
        id: "array",
        label: "Array",
        title: "Posicoes contiguas e indexacao direta",
        summary: "Arrays brilham quando acessar por indice e mais importante do que editar no meio da estrutura.",
        bullets: [
          "Localidade de memoria costuma ajudar bastante.",
          "Inserir no inicio ou no meio desloca elementos.",
          "Virou base de varias estruturas mais ricas.",
        ],
        metrics: [["Leitura", "excelente por indice"], ["Ordem", "natural"], ["Edicao", "cara no meio"]],
      },
      {
        id: "list",
        label: "Lista",
        title: "Nos conectados por referencias",
        summary: "Listas favorecem alteracoes locais, mas pagam caro quando a pergunta e 'qual e o elemento na posicao k?'.",
        bullets: [
          "Nao depende de contiguidade em memoria.",
          "Cada passo exige seguir ponteiros.",
          "Boa para filas simples e montagens incrementais.",
        ],
        metrics: [["Forca", "insercao local"], ["Fraqueza", "busca posicional"], ["Intuicao", "corrente de nos"]],
      },
      {
        id: "hash",
        label: "Hash",
        title: "Chaves viram enderecos provaveis",
        summary: "Hash tables trocam ordem explicita por acesso rapido medio a partir de uma chave.",
        bullets: [
          "Colisoes sao parte do desenho, nao bug exotico.",
          "Nao servem bem para consultas por intervalo ordenado.",
          "Sao centrais em caches, indices e dicionarios.",
        ],
        metrics: [["Pergunta tipica", "qual o valor desta chave?"], ["Cuidado", "colisoes"], ["Ordem", "nao garantida"]],
      },
      {
        id: "tree-graph",
        label: "Arvore/Grafo",
        title: "Relacoes estruturadas, nao so sequencias",
        summary: "Arvores e grafos entram quando hierarquia, prioridades, caminhos ou conectividade fazem parte do problema.",
        bullets: [
          "Arvores mantem organizacao com invariantes extras.",
          "Grafos representam vizinhancas e redes gerais.",
          "O ganho vem da estrutura semantica que eles expõem.",
        ],
        metrics: [["Uso", "busca ordenada e conectividade"], ["Preco", "mais invariantes"], ["Valor", "modelar relacoes"]],
      },
    ],
  },
  "recursao-e-dividir-para-conquistar": {
    eyebrow: "Arvore de chamadas",
    title: "Inspecione o esqueleto interno da recursao",
    description: "Recursao funciona quando base, reducao e recomposicao se encaixam sem ambiguidade.",
    tone: "amber",
    icon: <GitBranch size={18} aria-hidden="true" />,
    options: [
      {
        id: "base",
        label: "Base",
        title: "O caso pequeno que encerra a cadeia",
        summary: "Sem um caso base claro, a recursao nao reduz problema; ela apenas repete trabalho sem fim.",
        bullets: [
          "Base nao e detalhe de sintaxe, e criterio de corretude.",
          "Deve ser simples o bastante para ser resolvido diretamente.",
          "Tambem define o ponto de partida da volta.",
        ],
        metrics: [["Funcao", "parar"], ["Erro comum", "base tardia ou ausente"], ["Teste", "menor entrada valida"]],
      },
      {
        id: "frame",
        label: "Pilha",
        title: "Cada chamada leva seu proprio contexto",
        summary: "A pilha de execucao guarda parametros e variaveis locais ate que a chamada possa devolver controle a quem a invocou.",
        bullets: [
          "Explica por que profundidade importa.",
          "Ajuda a entender stack overflow.",
          "Mostra que recursao tem custo operacional real.",
        ],
        metrics: [["Guarda", "contexto local"], ["Risco", "profundidade excessiva"], ["Intuicao", "empilhar e desempilhar"]],
      },
      {
        id: "split",
        label: "Dividir",
        title: "Criar subproblemas que conservam a estrutura",
        summary: "Dividir para conquistar so compensa quando as partes menores realmente ajudam a reconstruir a resposta grande.",
        bullets: [
          "Metades simetricas facilitam analise.",
          "Subproblemas ruins podem gerar sobreposicao inutil.",
          "A qualidade da divisao costuma dominar o desempenho.",
        ],
        metrics: [["Pergunta", "como quebrar?"], ["Meta", "reduzir mantendo sentido"], ["Exemplo", "merge sort"]],
      },
      {
        id: "combine",
        label: "Combinar",
        title: "A volta tambem faz trabalho",
        summary: "Em muitos algoritmos, o custo forte nao esta na chamada recursiva isolada, mas na fase que junta os resultados.",
        bullets: [
          "Merge sort e o exemplo mais didatico.",
          "A combinacao pode ser trivial ou dominante.",
          "E aqui que recorrencias ficam esclarecedoras.",
        ],
        metrics: [["Pode custar", "O(1) a O(n) por nivel"], ["Exemplo", "merge"], ["Licao", "a volta importa"]],
      },
    ],
  },
  "dns-ip-tcp-http": {
    eyebrow: "Camadas",
    title: "Associe cada problema a sua camada",
    description: "Selecionar a camada certa evita explicacoes misturadas como 'HTTP caiu' quando o nome nem chegou a resolver.",
    tone: "indigo",
    icon: <Globe size={18} aria-hidden="true" />,
    options: [
      {
        id: "dns",
        label: "DNS",
        title: "Nome para endereco",
        summary: "DNS responde 'quem atende este dominio?' e permite trocar infraestrutura sem mudar o nome que as pessoas usam.",
        bullets: [
          "Resolvers, caches e servidores autoritativos cooperam aqui.",
          "TTL influencia frescor versus eficiencia.",
          "Sem DNS, o navegador nao sabe para onde iniciar a conversa.",
        ],
        metrics: [["Pergunta", "qual IP responde?"], ["Saida", "registro"], ["Sinal de falha", "nome nao resolve"]],
      },
      {
        id: "ip",
        label: "IP",
        title: "Enderecamento e roteamento",
        summary: "IP nao promete entregar perfeitamente; ele tenta encaminhar pacotes ate o destino adequado atraves da rede.",
        bullets: [
          "Trata pacotes como unidades independentes.",
          "Roteadores escolhem caminhos, nao significado da aplicacao.",
          "Entrega fora de ordem e perda podem acontecer.",
        ],
        metrics: [["Pergunta", "para onde vai?"], ["Unidade", "pacote"], ["Promessa", "best effort"]],
      },
      {
        id: "tcp",
        label: "TCP",
        title: "Fluxo ordenado e confiavel",
        summary: "TCP pega uma rede imperfeita e apresenta para a aplicacao a ilusao de um canal consistente de bytes.",
        bullets: [
          "Handshake inicializa contexto compartilhado.",
          "ACKs, retransmissoes e janelas entram em cena.",
          "A aplicacao deixa de lidar com perda elementar.",
        ],
        metrics: [["Pergunta", "como entregar em ordem?"], ["Servico", "byte stream"], ["Preco", "round-trips e controle"]],
      },
      {
        id: "http",
        label: "HTTP",
        title: "Semantica do pedido e da resposta",
        summary: "HTTP organiza a conversa da aplicacao: metodo, recurso, cabecalhos, status e corpo.",
        bullets: [
          "GET, POST e status codes vivem aqui.",
          "Cache, autenticacao e content negotiation tambem.",
          "Um 404 e bem diferente de um timeout TCP.",
        ],
        metrics: [["Pergunta", "o que quero fazer?"], ["Servico", "request/response"], ["Sinal de falha", "status e semantica"]],
      },
    ],
  },
  "tcp-vs-udp-latencia-confiabilidade": {
    eyebrow: "Servico de transporte",
    title: "Compare os contratos, nao os slogans",
    description: "Escolha uma propriedade e veja como o comportamento da aplicacao muda quando ela existe ou nao existe no transporte.",
    tone: "rose",
    icon: <Radio size={18} aria-hidden="true" />,
    options: [
      {
        id: "stream-datagram",
        label: "Forma",
        title: "Fluxo versus datagrama",
        summary: "TCP entrega um fluxo continuo de bytes; UDP preserva mensagens individuais chamadas datagramas.",
        bullets: [
          "Em TCP, fronteiras de mensagem sao trabalho da aplicacao.",
          "Em UDP, cada envio vira uma unidade independente.",
          "Isso muda framing, reassemblagem e buffering.",
        ],
        metrics: [["TCP", "stream"], ["UDP", "datagrama"], ["Impacto", "fronteiras de mensagem"]],
      },
      {
        id: "ordering",
        label: "Ordem",
        title: "Esperar todos ou seguir com o que chegou",
        summary: "TCP entrega em ordem; UDP aceita reordenacao e deixa a estrategia de reaproveitamento para a aplicacao.",
        bullets: [
          "A ordem simplifica protocolos dependentes de sequencia.",
          "Esperar por ordem tambem gera filas e atrasos.",
          "Midias ao vivo muitas vezes preferem descartar atrasados.",
        ],
        metrics: [["TCP", "ordem garantida"], ["UDP", "sem ordem"], ["Trade-off", "regularidade x frescor"]],
      },
      {
        id: "recovery",
        label: "Recuperacao",
        title: "Retransmitir ou deixar passar",
        summary: "TCP tenta recuperar perda; UDP nao tem mecanismo de transporte para isso e pode seguir adiante imediatamente.",
        bullets: [
          "Retransmissao e excelente para arquivos e paginas.",
          "Pode ser pessima para audio que ja envelheceu.",
          "Protocolos sobre UDP podem reintroduzir recuperacao seletiva.",
        ],
        metrics: [["TCP", "ACK + retransmissao"], ["UDP", "sem recuperacao nativa"], ["Pergunta", "dado atrasado ainda vale?"]],
      },
      {
        id: "quic",
        label: "QUIC",
        title: "A prova de que UDP nao significa simplicidade obrigatoria",
        summary: "QUIC usa UDP como base, mas adiciona confiabilidade, criptografia e multiplexacao para servir ao HTTP/3.",
        bullets: [
          "Mostra que 'TCP bom, UDP ruim' e uma leitura pobre.",
          "A camada de transporte pode ser redesenhada.",
          "O contrato final importa mais do que o nome do protocolo base.",
        ],
        metrics: [["Base", "UDP"], ["Servico", "confiavel e multiplexado"], ["Licao", "camadas evoluem"]],
      },
    ],
  },
  "sistemas-distribuidos-fundamentos": {
    eyebrow: "Desafios",
    title: "Veja o que aparece assim que ha varios nos",
    description: "Trocar uma maquina por varias muda o tipo de erro que voce precisa raciocinar e mitigar.",
    tone: "teal",
    icon: <Boxes size={18} aria-hidden="true" />,
    options: [
      {
        id: "partial-failure",
        label: "Falha parcial",
        title: "Alguns nos falham enquanto outros seguem vivos",
        summary: "Em sistemas distribuidos, raramente tudo para ao mesmo tempo; o drama vem de visoes inconsistentes do que esta vivo.",
        bullets: [
          "Um timeout nao prova morte; prova incerteza.",
          "Clientes diferentes podem enxergar estados diferentes do cluster.",
          "Recuperacao precisa lidar com duplicacao e repeticao segura.",
        ],
        metrics: [["Sinal", "timeout"], ["Problema", "ambiguidade"], ["Resposta", "retry + idempotencia"]],
      },
      {
        id: "time",
        label: "Tempo",
        title: "Relogios locais nao contam a mesma historia",
        summary: "Sem um relogio global perfeito, ordenar eventos exige protocolos, marcas logicas ou compromissos com incerteza.",
        bullets: [
          "Causalidade nao cabe em timestamps ingenuos.",
          "Latencia embaralha percepcao de 'antes' e 'depois'.",
          "Sistemas fortes pagam para alinhar ordem observavel.",
        ],
        metrics: [["Risco", "ordem ilusoria"], ["Ferramentas", "clocks logicos e quorum"], ["Exemplo", "commit timestamps"]],
      },
      {
        id: "replication",
        label: "Replicacao",
        title: "Copiar dados aumenta disponibilidade, mas cria coordenacao",
        summary: "Replicas tornam leitura e failover mais robustos, mas exigem decidir como e quando uma escrita virou verdade coletiva.",
        bullets: [
          "Replicar e facil; manter coerencia e a parte dificil.",
          "Lideres, quoruns e logs surgem desse problema.",
          "Mais replicas tambem significam mais mensagens.",
        ],
        metrics: [["Ganho", "resiliencia"], ["Preco", "coordenacao"], ["Pergunta", "quando responder ao cliente?"]],
      },
      {
        id: "consensus",
        label: "Consenso",
        title: "Alinhar uma historia compartilhada",
        summary: "Consenso nao e um luxo teorico: ele aparece quando precisamos que varios nos concordem sobre ordem de comandos ou lideranca.",
        bullets: [
          "Paxos e Raft atacam essa familia de problemas.",
          "Seguranca e progresso entram em tensao quando a rede falha.",
          "Muito do sistema parece normal porque alguem pagou esse custo antes.",
        ],
        metrics: [["Objeto", "ordem e lideranca"], ["Meta", "mesma historia"], ["Dificuldade", "rede assincrona"]],
      },
    ],
  },
  "cap-consistencia-disponibilidade": {
    eyebrow: "Definicoes",
    title: "Desmonte a caricatura do pick-two",
    description: "A teoria fica util quando voce enxerga as definicoes precisas de consistencia, disponibilidade e particao.",
    tone: "amber",
    icon: <Scale size={18} aria-hidden="true" />,
    options: [
      {
        id: "consistency",
        label: "C",
        title: "Consistencia e um modelo, nao uma vibe",
        summary: "Ao falar de C em CAP, a referencia classica e consistencia atomica ou linearizavel, nao apenas 'dados parecidos'.",
        bullets: [
          "Modelos diferentes impõem compromissos diferentes.",
          "Ser 'consistente o bastante' depende da operacao e do negocio.",
          "Sem definir o modelo, a discussao fica escorregadia.",
        ],
        metrics: [["CAP usa", "consistencia atomica"], ["Erro comum", "tratar qualquer coerencia como C"], ["Pergunta", "qual modelo voce quer?"]],
      },
      {
        id: "availability",
        label: "A",
        title: "Disponibilidade no teorema e liveness local",
        summary: "Disponivel aqui significa que cada no nao falho responde; nao significa que a resposta contem a escrita mais recente.",
        bullets: [
          "Responder stale ainda pode contar como disponibilidade.",
          "Recusar pedidos para preservar linearizabilidade reduz A sob particao.",
          "A definicao formal e mais estreita do que a do SRE cotidiano.",
        ],
        metrics: [["Pergunta", "o no responde?"], ["Nao garante", "frescor"], ["Conflito", "bloquear ou servir"]],
      },
      {
        id: "partition",
        label: "P",
        title: "Particao nao e opcional em sistemas de rede reais",
        summary: "Nao escolhemos ter ou nao particoes; escolhemos o que fazer quando mensagens deixam de circular de modo confiavel.",
        bullets: [
          "Ignorar P produz uma ideia enganosa de design.",
          "Durante particao, coordenar replicas fica incerto ou impossivel.",
          "A escolha relevante passa a ser entre C e A nesse momento.",
        ],
        metrics: [["Realidade", "mensagens podem se perder"], ["Efeito", "visoes quebradas"], ["Escolha", "CP ou AP na particao"]],
      },
      {
        id: "pacelc",
        label: "PACELC",
        title: "Mesmo sem particao, consistencia pode custar latencia",
        summary: "PACELC amplia CAP ao lembrar que replicas coordenadas tambem pagam round-trips quando tudo parece normal.",
        bullets: [
          "Nem todo trade-off importante aparece apenas sob falha.",
          "Leituras frescas globais podem demorar mais.",
          "Muitos sistemas modernos misturam escolhas por rota ou operacao.",
        ],
        metrics: [["P?", "A ou C"], ["Else", "L ou C"], ["Uso", "desenho moderno"]],
      },
    ],
  },
};

const scenarioConfigs: Record<Wave3PartATopicId, ScenarioConfig> = {
  "turing-e-a-ideia-de-computacao": {
    eyebrow: "Cenarios",
    title: "Classifique o tipo de limite envolvido",
    description: "Nem toda dificuldade e teorica. Algumas tarefas sao decidiveis e apenas caras; outras nem admitem algoritmo geral.",
    tone: "violet",
    icon: <Binary size={18} aria-hidden="true" />,
    options: [
      {
        id: "sort",
        label: "Ordenar",
        context: "Voce quer ordenar uma lista enorme de registros.",
        decision: "Problema decidivel e muito pratico.",
        why: ["Existe algoritmo geral que sempre termina.", "A conversa relevante e sobre complexidade, nao impossibilidade.", "Mais engenharia e melhores estruturas ajudam bastante."],
        watchOut: "Nao confunda custo alto com indecidibilidade.",
      },
      {
        id: "palindrome",
        label: "Palindromo",
        context: "Voce quer saber se uma palavra le igual nos dois sentidos.",
        decision: "Problema simples e decidivel; memoria de trabalho e pequena.",
        why: ["Ha procedimento mecanico claro.", "A entrada tem fim conhecido.", "A maquina pode comparar simbolos progressivamente."],
        watchOut: "Simplicidade do exemplo nao diminui o valor da formalizacao.",
      },
      {
        id: "halting",
        label: "Parada",
        context: "Voce quer um programa que diga para qualquer programa se ele vai parar para qualquer entrada.",
        decision: "Nao existe algoritmo geral que resolva todos os casos.",
        why: ["Esse e o famoso problema da parada.", "A barreira e teorica, nao so de hardware.", "Casos particulares podem ser analisados; o universal nao."],
        watchOut: "Ferramentas de analise estatica funcionam bem em fragmentos, nao como oraculo total.",
      },
      {
        id: "verifier",
        label: "Verificador",
        context: "Voce quer checar propriedades de um software ou protocolo real.",
        decision: "Quase sempre trabalhamos com aproximacoes, restricoes de modelo e garantias parciais.",
        why: ["O mundo real usa recortes trataveis.", "Restringir linguagem ou estado viabiliza verificacao.", "A teoria guia onde o recorte precisa acontecer."],
        watchOut: "Ferramenta util nao significa solucao geral para qualquer programa possivel.",
      },
    ],
  },
  "algoritmos-e-complexidade": {
    eyebrow: "Escolha",
    title: "Qual argumento de custo pesa mais neste caso?",
    description: "Analise o contexto antes de usar Big-O como martelo universal.",
    tone: "teal",
    icon: <ChartColumn size={18} aria-hidden="true" />,
    options: [
      {
        id: "small-input",
        label: "n pequeno",
        context: "A entrada quase nunca passa de algumas dezenas de elementos.",
        decision: "Constantes, legibilidade e simplicidade podem vencer a assintotica mais bonita.",
        why: ["Curvas assintoticas ainda nao dominaram.", "Custos fixos podem superar a diferenca teorica.", "Codigo mais simples reduz bugs e manutencao."],
        watchOut: "Nao extrapole essa escolha automaticamente para n grande.",
      },
      {
        id: "huge-input",
        label: "n enorme",
        context: "A entrada cresce continuamente e ja ocupa memoria e cache de forma agressiva.",
        decision: "Ordem de crescimento vira protagonista.",
        why: ["n^2 implode mais cedo do que parece.", "Assintotica ruim vira gargalo estrutural.", "Investir em algoritmo melhor rende muito."],
        watchOut: "Mesmo assim, meca o sistema; o ambiente real ainda importa.",
      },
      {
        id: "bursty",
        label: "Picos",
        context: "Operacoes baratas se repetem, mas de tempos em tempos acontece uma realocacao cara.",
        decision: "Analise amortizada descreve melhor a experiencia total.",
        why: ["Um pico isolado nao resume a serie inteira.", "Custos raros podem ser diluidos ao longo de muitas operacoes.", "Estruturas dinamicas vivem desse raciocinio."],
        watchOut: "Amortizado nao protege contra piores casos individuais quando eles importam para latencia maxima.",
      },
      {
        id: "adversarial",
        label: "Adversarial",
        context: "Entradas podem ser escolhidas por um atacante ou por um caso extremo de negocio.",
        decision: "Pior caso ganha prioridade na analise.",
        why: ["O caso raro pode ser justamente o que interessa proteger.", "Estruturas sensiveis a entrada exigem mais cuidado.", "Seguranca e previsibilidade mudam o criterio de escolha."],
        watchOut: "Nao trate caso medio como garantia quando o ambiente e adversarial.",
      },
    ],
  },
  "estruturas-de-dados-essenciais": {
    eyebrow: "Aplicacoes",
    title: "Mapeie problema para estrutura predominante",
    description: "Os exemplos abaixo mostram que a escolha depende de quais perguntas o sistema precisa responder bem.",
    tone: "emerald",
    icon: <Database size={18} aria-hidden="true" />,
    options: [
      {
        id: "cache",
        label: "Cache",
        context: "Precisa mapear chaves para valores rapidamente.",
        decision: "Hash table costuma ser a base natural.",
        why: ["A operacao dominante e buscar por chave.", "Ordem total raramente e requisito principal.", "Colisoes sao administradas pelo desenho da tabela."],
        watchOut: "Politica de expiracao ou LRU geralmente exige estrutura auxiliar, nao so o hash.",
      },
      {
        id: "autocomplete",
        label: "Autocomplete",
        context: "Precisa responder prefixos e manter ordem lexicografica.",
        decision: "Arvores ou tries costumam fazer mais sentido do que hash puro.",
        why: ["Prefixo e consulta estrutural, nao igualdade exata.", "Ordenacao importa na experiencia.", "Hash e rapido para igualdade, mas cego para intervalos ordenados."],
        watchOut: "Nem todo problema de texto e resolvido bem por array ou hash sem estrutura adicional.",
      },
      {
        id: "undo",
        label: "Undo",
        context: "Precisa reverter operacoes na ordem inversa em que aconteceram.",
        decision: "Pilha e a modelagem mais direta.",
        why: ["A semantica do dominio ja e LIFO.", "A estrutura explica o comportamento do produto.", "A escolha correta simplifica algoritmo e testes."],
        watchOut: "Forcar uma estrutura mais generica pode esconder a intencao do fluxo.",
      },
      {
        id: "social-graph",
        label: "Rede social",
        context: "Usuarios se conectam em relacoes muitos-para-muitos.",
        decision: "Grafo e a representacao conceitual central.",
        why: ["Vertices e arestas mapeiam o dominio de forma natural.", "Perguntas sobre caminho, alcance e comunidade surgem cedo.", "Arrays e listas so viram suporte, nao a ideia principal."],
        watchOut: "Sem reconhecer a natureza de grafo, o desenho vira uma colcha de tabelas com consultas confusas.",
      },
    ],
  },
  "recursao-e-dividir-para-conquistar": {
    eyebrow: "Diagnostico",
    title: "Qual padrao recursivo combina com este problema?",
    description: "Os cenarios abaixo mostram quando a recursao ajuda a pensar e quando ela mascara desperdicio.",
    tone: "amber",
    icon: <GitBranch size={18} aria-hidden="true" />,
    options: [
      {
        id: "filesystem",
        label: "Pastas",
        context: "Voce precisa percorrer diretorios que contem arquivos e subdiretorios do mesmo tipo.",
        decision: "Recursao modela naturalmente a estrutura hierarquica.",
        why: ["Cada pasta contem instancias menores do mesmo problema.", "Caso base aparece nos arquivos ou diretorios vazios.", "A clareza conceitual e alta."],
        watchOut: "Mesmo quando a recursao e elegante, profundidade extrema ainda pode exigir versao iterativa.",
      },
      {
        id: "fibonacci-naive",
        label: "Fibonacci",
        context: "Voce usa a definicao recursiva mais ingenua para calcular um termo grande.",
        decision: "A forma e correta, mas o custo explode por recomputacao.",
        why: ["Subproblemas se repetem varias vezes.", "A arvore de chamadas cresce rapidamente.", "Memoizacao ou DP mudam o jogo."],
        watchOut: "Beleza da definicao matematica nao garante eficiencia operacional.",
      },
      {
        id: "merge-sort",
        label: "Merge sort",
        context: "Voce pode quebrar um array em duas metades quase iguais e depois mesclar resultados.",
        decision: "Dividir para conquistar e uma aposta muito forte aqui.",
        why: ["A divisao e limpa e regular.", "Combinar tem custo previsivel por nivel.", "A recorrencia fica tratavel e a escalabilidade melhora."],
        watchOut: "Nao esqueca o custo extra de memoria da mesclagem em implementacoes comuns.",
      },
      {
        id: "flat-loop",
        label: "Loop simples",
        context: "Voce apenas soma todos os elementos de um vetor linear uma vez.",
        decision: "Recursao pode funcionar, mas um loop iterativo costuma ser mais direto.",
        why: ["Nao ha ganho estrutural relevante.", "A pilha passa a ser overhead gratuito.", "Legibilidade e custo favorecem a iteracao."],
        watchOut: "Recursao nao e selo de sofisticacao; e ferramenta para a estrutura certa.",
      },
    ],
  },
  "dns-ip-tcp-http": {
    eyebrow: "Sintomas",
    title: "Em que camada o problema provavelmente nasceu?",
    description: "Os sintomas abaixo ajudam a diferenciar falha de nome, rota, transporte ou aplicacao.",
    tone: "indigo",
    icon: <Globe size={18} aria-hidden="true" />,
    options: [
      {
        id: "dns-fail",
        label: "DNS",
        context: "O navegador reclama que nao conseguiu encontrar o servidor do dominio.",
        decision: "A suspeita principal esta em resolucao de nome.",
        why: ["O pedido nem chegou a disputar transporte com o servidor final.", "Pode haver cache expirado, registro errado ou resolver indisponivel.", "Testar por IP direto costuma isolar o problema."],
        watchOut: "Nao culpe HTTP quando o nome nunca virou endereco.",
      },
      {
        id: "ip-route",
        label: "IP",
        context: "O nome resolve, mas pacotes nao alcancam o destino de forma consistente.",
        decision: "Roteamento, firewall ou conectividade de rede entram no foco.",
        why: ["DNS ja cumpriu o papel dele.", "Sem caminho funcional, TCP nem estabiliza a conversa.", "Traceroutes e observabilidade de rede ajudam mais do que logs HTTP."],
        watchOut: "Resolver nome com sucesso nao prova que a rota esta saudavel.",
      },
      {
        id: "tcp-reset",
        label: "TCP",
        context: "Ha conexao intermitente, resets ou timeouts antes de a resposta da aplicacao aparecer.",
        decision: "O problema parece morar no transporte ou logo abaixo dele.",
        why: ["O dialogo HTTP depende de um canal confiavel ativo.", "Perda, resets e handshake incompleto degradam tudo acima.", "A aplicacao pode estar saudavel, mas inacessivel pela camada de transporte."],
        watchOut: "Um timeout de conexao e diferente de um 500 do servidor.",
      },
      {
        id: "http-error",
        label: "HTTP",
        context: "A conexao acontece, mas o servidor devolve 404, 401 ou 500.",
        decision: "Agora a discussao e semantica de aplicacao.",
        why: ["O caminho da requisicao existe e chegou ao servidor.", "Autenticacao, rota ou logica interna podem estar falhando.", "Status codes sao pistas dessa camada."],
        watchOut: "Conectividade boa nao implica resposta correta da aplicacao.",
      },
    ],
  },
  "tcp-vs-udp-latencia-confiabilidade": {
    eyebrow: "Casos de uso",
    title: "Que transporte conversa melhor com este requisito?",
    description: "O critico nao e perguntar qual protocolo e 'melhor', mas qual contrato a aplicacao precisa.",
    tone: "rose",
    icon: <Radio size={18} aria-hidden="true" />,
    options: [
      {
        id: "file",
        label: "Arquivo",
        context: "Upload de relatorio ou download de imagem onde um byte errado invalida o resultado.",
        decision: "TCP e a escolha natural na maioria dos casos.",
        why: ["Integridade e ordem importam muito.", "Retransmissoes valem o custo.", "A aplicacao nao quer reinventar confiabilidade."],
        watchOut: "Baixa latencia inicial raramente pesa mais do que corretude aqui.",
      },
      {
        id: "call",
        label: "Chamada ao vivo",
        context: "Audio ou video em tempo real, onde um pacote atrasado perde valor rapidamente.",
        decision: "UDP ou um protocolo sobre UDP costuma fazer mais sentido.",
        why: ["Frescor importa mais do que recuperar tudo.", "Esperar retransmissao pode piorar a experiencia.", "Jitter buffers e codecs ajudam a absorver perda parcial."],
        watchOut: "Isso nao elimina mecanismos de controle; apenas move parte deles para camadas superiores.",
      },
      {
        id: "game",
        label: "Jogo",
        context: "Posicoes de jogadores mudam varias vezes por segundo.",
        decision: "Estado efemero costuma preferir datagramas frescos a confiabilidade total.",
        why: ["Atualizacoes novas substituem as antigas.", "Perder um pacote pontual pode ser aceitavel.", "A aplicacao pode escolher o que merece confiabilidade separada."],
        watchOut: "Chat, login e compra dentro do jogo podem exigir canais mais confiaveis." ,
      },
      {
        id: "http3",
        label: "HTTP/3",
        context: "Web moderna quer conexao rapida e multiplexacao sem certas dores do TCP.",
        decision: "QUIC sobre UDP mostra um caminho hibrido.",
        why: ["Confiabilidade continua existindo, mas em desenho diferente.", "A conexao e criptografada e multiplexada na propria camada de transporte.", "Reduz alguns custos de estabelecimento e bloqueio."],
        watchOut: "Nao trate UDP como sinonimo de protocolo 'sem garantias' quando QUIC esta no tabuleiro.",
      },
    ],
  },
  "sistemas-distribuidos-fundamentos": {
    eyebrow: "Incidentes",
    title: "Treine a leitura de eventos tipicos de sistemas distribuidos",
    description: "Cada incidente revela por que replicacao e rede exigem raciocinio diferente de programas locais.",
    tone: "teal",
    icon: <Boxes size={18} aria-hidden="true" />,
    options: [
      {
        id: "slow-region",
        label: "Regiao lenta",
        context: "Uma replica remota fica muito lenta, mas nao totalmente fora do ar.",
        decision: "Timeouts, quorum e politica de failover definem se o sistema parece travado ou apenas degradado.",
        why: ["Lentidao e pior do que falha limpa para diagnostico.", "Nos diferentes podem discordar sobre o estado da replica.", "Bloquear tudo por precaucao aumenta consistencia mas derruba disponibilidade."],
        watchOut: "Lento nao e igual a morto; sistemas maduros tratam essas nuances explicitamente.",
      },
      {
        id: "leader-fail",
        label: "Lider caiu",
        context: "O no lider de um grupo de replicas some no meio de varias escritas.",
        decision: "Eleicao e preservacao da ordem passam a ser centrais.",
        why: ["Outra replica pode assumir, mas precisa provar que a historia continua valida.", "Clientes talvez precisem repetir pedidos com cuidado.", "Idempotencia reduz o risco de efeitos duplos."],
        watchOut: "Failover rapido sem protocolo seguro pode trocar disponibilidade por corrupcao de estado.",
      },
      {
        id: "clock-skew",
        label: "Clock skew",
        context: "Dois servidores atribuem timestamps fisicos em ordens surpreendentes para eventos relacionados.",
        decision: "Nao confie em relogio fisico bruto como ordem global absoluta.",
        why: ["Relogios derivam e redes atrasam mensagens.", "Causalidade pede mecanismos adicionais.", "Sistemas fortes usam clocks logicos, waiting ou APIs especiais."],
        watchOut: "'Chegou com timestamp maior' nao significa necessariamente 'aconteceu depois'.", 
      },
      {
        id: "duplicate-request",
        label: "Retry",
        context: "Um cliente nao recebeu resposta e reenviou a mesma requisicao; o servidor original talvez ja a tenha aplicado.",
        decision: "Idempotencia e identificadores de operacao salvam o dia.",
        why: ["Redes distribuidas produzem ambiguidades desse tipo o tempo todo.", "Repetir sem protecao pode cobrar duas vezes ou criar estado duplicado.", "Protocolos robustos modelam o retry como evento esperado."],
        watchOut: "Retries aumentam disponibilidade percebida, mas so se a semantica suportar repeticao segura.",
      },
    ],
  },
  "cap-consistencia-disponibilidade": {
    eyebrow: "Projeto",
    title: "Escolha a postura por operacao e por falha",
    description: "CAP e PACELC ficam concretos quando amarrados a produtos com tolerancias diferentes para stale read, bloqueio e latencia.",
    tone: "amber",
    icon: <Scale size={18} aria-hidden="true" />,
    options: [
      {
        id: "bank",
        label: "Banco",
        context: "Transferencia entre contas nao pode inventar saldo ou mostrar debito e credito em historias incompativeis.",
        decision: "Tendencia forte a sacrificar disponibilidade em cenarios de particao para preservar consistencia forte.",
        why: ["O custo de uma resposta errada e altissimo.", "Bloquear ou adiar e preferivel a confirmar mentira financeira.", "Modelos como serializacao e linearizabilidade entram em cena."],
        watchOut: "Nem todo endpoint bancario precisa do mesmo rigor; saldo, extrato e analytics podem divergir em exigencia.",
      },
      {
        id: "cart",
        label: "Carrinho",
        context: "Carrinho de compras precisa continuar responsivo mesmo com falhas regionais parciais.",
        decision: "Muitas leituras e atualizacoes admitem conciliacao posterior e alta disponibilidade.",
        why: ["Uma pequena divergencia temporaria pode ser recuperavel.", "Perder completamente a capacidade de adicionar item costuma ser pior para o negocio.", "AP ou modelos mais brandos podem fazer sentido em partes do fluxo."],
        watchOut: "Checkout, pagamento e baixa de estoque podem exigir regras bem mais fortes que o carrinho em si.",
      },
      {
        id: "dashboard",
        label: "Dashboard",
        context: "Painel de metricas em tempo real aceita alguns segundos de defasagem.",
        decision: "Disponibilidade e latencia baixa tendem a valer mais do que frescor absoluto.",
        why: ["O objetivo e observabilidade, nao verdade transacional instantanea.", "Servir algo um pouco atrasado ainda tem valor alto.", "Replicas locais e caches podem aliviar bastante."],
        watchOut: "Nao use esse criterio para comandos operacionais irreversiveis acionados a partir do dashboard.",
      },
      {
        id: "global-read",
        label: "Leitura global",
        context: "Usuarios em varios continentes querem leitura fresca de um dado recem-escrito em outra regiao.",
        decision: "A discussao vira PACELC: quanta latencia adicional voce aceita para ganhar frescor?",
        why: ["Mesmo sem particao, coordenar replicas custa round-trips fisicos.", "Leitura local stale e rapida; leitura confirmada global e mais lenta.", "Projetos modernos equilibram isso por endpoint e SLA."],
        watchOut: "'Sem particao' nao significa 'sem trade-off'.",
      },
    ],
  },
};

export function ModelLabInteraction({ content }: LessonInteractionProps) {
  const topicId = content.id as Wave3PartATopicId;
  const config = modelConfigs[topicId];
  const [selected, setSelected] = useState(config.options[0].id);
  const option = config.options.find((item) => item.id === selected) ?? config.options[0];

  return (
    <InteractiveShell
      eyebrow={config.eyebrow}
      title={config.title}
      description={config.description}
      tone={config.tone}
      icon={config.icon}
    >
      <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="grid gap-3">
          {config.options.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelected(item.id)}
              className={`rounded-2xl border px-4 py-3 text-left transition ${
                selected === item.id
                  ? "border-slate-950 bg-slate-950 text-white"
                  : "border-white/70 bg-white text-slate-700 hover:border-slate-300"
              }`}
            >
              <span className="block text-sm font-black">{item.label}</span>
              <span className={`mt-1 block text-xs ${selected === item.id ? "text-white/80" : "text-slate-500"}`}>
                {item.title}
              </span>
            </button>
          ))}
        </div>

        <div className="grid gap-4 rounded-3xl bg-white p-5">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">Foco atual</p>
            <h4 className="mt-2 font-display text-3xl font-semibold tracking-tight text-slate-950">{option.title}</h4>
            <p className="mt-3 text-sm leading-7 text-slate-600">{option.summary}</p>
          </div>
          <div className="grid gap-2">
            {option.bullets.map((bullet) => (
              <div key={bullet} className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-700">
                {bullet}
              </div>
            ))}
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {option.metrics.map(([label, value]) => (
              <MetricCard key={label} label={label} value={value} />
            ))}
          </div>
        </div>
      </div>
    </InteractiveShell>
  );
}

export function ScenarioLabInteraction({ content }: LessonInteractionProps) {
  const topicId = content.id as Wave3PartATopicId;
  const config = scenarioConfigs[topicId];
  const [selected, setSelected] = useState(config.options[0].id);
  const option = config.options.find((item) => item.id === selected) ?? config.options[0];

  return (
    <InteractiveShell
      eyebrow={config.eyebrow}
      title={config.title}
      description={config.description}
      tone={config.tone}
      icon={config.icon}
    >
      <div className="grid gap-5 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="grid gap-3">
          {config.options.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelected(item.id)}
              className={`rounded-2xl border px-4 py-3 text-left transition ${
                selected === item.id
                  ? "border-slate-950 bg-slate-950 text-white"
                  : "border-white/70 bg-white text-slate-700 hover:border-slate-300"
              }`}
            >
              <span className="block text-sm font-black">{item.label}</span>
              <span className={`mt-1 block text-xs ${selected === item.id ? "text-white/80" : "text-slate-500"}`}>
                {item.context}
              </span>
            </button>
          ))}
        </div>
        <div className="grid gap-4 rounded-3xl bg-white p-5">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">Contexto</p>
            <p className="mt-2 text-sm leading-7 text-slate-700">{option.context}</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">Leitura recomendada</p>
            <p className="mt-2 font-display text-2xl font-semibold tracking-tight text-slate-950">{option.decision}</p>
          </div>
          <div className="grid gap-2">
            {option.why.map((reason) => (
              <div key={reason} className="rounded-2xl border border-slate-100 bg-white px-4 py-3 text-sm leading-6 text-slate-700">
                {reason}
              </div>
            ))}
          </div>
          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900">
            <strong className="font-black">Cuidado:</strong> {option.watchOut}
          </div>
        </div>
      </div>
    </InteractiveShell>
  );
}

export function TradeoffLabInteraction({ content }: LessonInteractionProps) {
  const topicId = content.id as Wave3PartATopicId;
  switch (topicId) {
    case "turing-e-a-ideia-de-computacao":
      return <TuringTradeoffLab />;
    case "algoritmos-e-complexidade":
      return <AlgorithmsTradeoffLab />;
    case "estruturas-de-dados-essenciais":
      return <DataStructuresTradeoffLab />;
    case "recursao-e-dividir-para-conquistar":
      return <RecursionTradeoffLab />;
    case "dns-ip-tcp-http":
      return <NetworkStackTradeoffLab />;
    case "tcp-vs-udp-latencia-confiabilidade":
      return <TransportTradeoffLab />;
    case "sistemas-distribuidos-fundamentos":
      return <DistributedTradeoffLab />;
    case "cap-consistencia-disponibilidade":
      return <CapTradeoffLab />;
    default:
      return null;
  }
}

function TuringTradeoffLab() {
  const [memory, setMemory] = useState(20);
  const [inputLength, setInputLength] = useState(8);
  const model = memory < 30 ? "automato finito" : memory < 65 ? "pilha limitada" : "fita geral";
  const classLabel = memory < 30 ? "padroes locais e repetitivos" : memory < 65 ? "aninhamentos moderados" : "procedimentos gerais sobre a entrada";
  const caution = memory < 30
    ? "Pouca memoria impede a maquina de carregar contexto rico sobre partes distantes da entrada."
    : memory < 65
      ? "Memoria estruturada ajuda, mas ainda nao garante a generalidade de uma maquina de Turing completa."
      : "Com memoria suficientemente geral, a conversa passa do 'pode lembrar?' para 'o problema e decidivel?'.";

  return (
    <InteractiveShell
      eyebrow="Poder expressivo"
      title="Quanto mais memoria estrutural, mais linguagens entram no jogo"
      description="Use os controles para observar que diferentes modelos de maquina reconhecem familias diferentes de problemas."
      tone="violet"
      icon={<Binary size={18} aria-hidden="true" />}
    >
      <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="grid gap-4">
          <RangeField label="Memoria disponivel" value={memory} min={0} max={100} onChange={setMemory} />
          <RangeField label="Tamanho simbolico da entrada" value={inputLength} min={2} max={20} onChange={setInputLength} />
          <div className="grid gap-3 sm:grid-cols-3">
            <MetricCard label="Modelo" value={model} />
            <MetricCard label="Entrada" value={`${inputLength} simbolos`} />
            <MetricCard label="Consegue lidar melhor com" value={classLabel} />
          </div>
          <div className="rounded-3xl border border-violet-200 bg-white p-4 text-sm leading-7 text-slate-700">{caution}</div>
        </div>
        <div className="rounded-3xl bg-white p-5">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-700">Leitura da simulacao</p>
          <div className="mt-4 grid gap-3">
            {[
              ["Automato finito", memory >= 0 && memory < 30],
              ["Memoria empilhada", memory >= 30 && memory < 65],
              ["Maquina universal", memory >= 65],
            ].map(([label, active]) => (
              <div key={String(label)} className={`rounded-2xl border px-4 py-3 ${active ? "border-violet-600 bg-violet-50" : "border-slate-200 bg-slate-50"}`}>
                <p className={`text-sm font-black ${active ? "text-violet-700" : "text-slate-500"}`}>{label}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            A quantidade de memoria nao resolve indecidibilidade por si so. Ela altera quais padroes a maquina consegue acompanhar durante a execucao. A fronteira entre dificil e impossivel aparece quando nem mesmo uma maquina de Turing geral consegue decidir todos os casos.
          </p>
        </div>
      </div>
    </InteractiveShell>
  );
}

function AlgorithmsTradeoffLab() {
  const [n, setN] = useState(400);
  const [constant, setConstant] = useState(12);
  const logN = Math.max(1, Math.log2(n));
  const linearCost = constant * n;
  const nLogNCost = Math.round(n * logN);
  const quadraticCost = n * n;
  const winner = linearCost < nLogNCost ? "O(n) com constante alta" : "O(n log n) com constante baixa";

  return (
    <InteractiveShell
      eyebrow="Escala"
      title="Constantes pequenas vencem por um tempo; curvas melhores vencem depois"
      description="Compare um algoritmo linear com constante alta contra um algoritmo n log n com constante menor."
      tone="teal"
      icon={<Sigma size={18} aria-hidden="true" />}
    >
      <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="grid gap-4">
          <RangeField label="Tamanho da entrada (n)" value={n} min={16} max={5000} onChange={setN} />
          <RangeField label="Constante do algoritmo linear" value={constant} min={1} max={40} onChange={setConstant} />
          <div className="grid gap-3 sm:grid-cols-2">
            <MetricCard label="O(n)" value={linearCost.toLocaleString()} />
            <MetricCard label="O(n log n)" value={nLogNCost.toLocaleString()} />
            <MetricCard label="O(n^2)" value={quadraticCost.toLocaleString()} />
            <MetricCard label="Vencedor aqui" value={winner} />
          </div>
        </div>
        <div className="rounded-3xl bg-white p-5">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-teal-700">Leitura</p>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Para valores pequenos de n, constantes pesam muito. Conforme n cresce, a curva passa a mandar mais do que os detalhes locais. O objetivo da analise assintotica e justamente antecipar esse cruzamento sem depender de uma maquina especifica.
          </p>
          <div className="mt-4 grid gap-3">
            {[ ["O(n)", linearCost], ["O(n log n)", nLogNCost], ["O(n^2)", quadraticCost] ].map(([label, value]) => {
              const max = Math.max(quadraticCost, 1);
              return (
                <div key={String(label)}>
                  <div className="mb-1 flex items-center justify-between text-sm font-black text-slate-700">
                    <span>{label}</span>
                    <span>{Number(value).toLocaleString()}</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                    <div className={`h-full rounded-full ${label === "O(n^2)" ? "bg-rose-400" : label === "O(n log n)" ? "bg-teal-400" : "bg-indigo-400"}`} style={{ width: `${Math.max(2, (Number(value) / max) * 100)}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </InteractiveShell>
  );
}

function DataStructuresTradeoffLab() {
  const [reads, setReads] = useState(80);
  const [writes, setWrites] = useState(40);
  const [ordered, setOrdered] = useState(30);
  const scores = [
    { name: "Array", value: reads * 1.0 + writes * 0.35 + ordered * 0.8 },
    { name: "Lista", value: reads * 0.25 + writes * 0.95 + ordered * 0.45 },
    { name: "Hash", value: reads * 0.95 + writes * 0.8 + ordered * 0.15 },
    { name: "Arvore", value: reads * 0.75 + writes * 0.7 + ordered * 1.0 },
  ].sort((a, b) => b.value - a.value);
  const best = scores[0];

  return (
    <InteractiveShell
      eyebrow="Ajuste de prioridades"
      title="A melhor estrutura depende das operacoes que dominam"
      description="Diga o peso relativo de leitura, escrita e ordem, e observe como a recomendacao muda."
      tone="emerald"
      icon={<Database size={18} aria-hidden="true" />}
    >
      <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="grid gap-4">
          <RangeField label="Leituras por chave/indice" value={reads} min={0} max={100} onChange={setReads} />
          <RangeField label="Insercoes e remocoes" value={writes} min={0} max={100} onChange={setWrites} />
          <RangeField label="Importancia de manter ordem" value={ordered} min={0} max={100} onChange={setOrdered} />
          <div className="grid gap-3 sm:grid-cols-2">
            <MetricCard label="Melhor encaixe" value={best.name} />
            <MetricCard label="Leitura forte" value={reads > 60 ? "sim" : "moderada"} />
            <MetricCard label="Escrita forte" value={writes > 60 ? "sim" : "moderada"} />
            <MetricCard label="Ordem forte" value={ordered > 60 ? "sim" : "moderada"} />
          </div>
        </div>
        <div className="rounded-3xl bg-white p-5">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">Ranking sugerido</p>
          <div className="mt-4 grid gap-3">
            {scores.map((score) => (
              <div key={score.name}>
                <div className="mb-1 flex items-center justify-between text-sm font-black text-slate-700">
                  <span>{score.name}</span>
                  <span>{score.value.toFixed(0)}</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                  <div className={`h-full rounded-full ${score.name === best.name ? "bg-emerald-500" : "bg-slate-300"}`} style={{ width: `${Math.max(5, (score.value / best.value) * 100)}%` }} />
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            O ranking e pedagogico, nao um compilador automatico de arquitetura. A licao principal e que a pergunta certa vem antes da estrutura: quais operacoes, com que frequencia e com que invariantes?
          </p>
        </div>
      </div>
    </InteractiveShell>
  );
}

function RecursionTradeoffLab() {
  const [n, setN] = useState(32);
  const [mode, setMode] = useState<"linear" | "divide" | "branching">("divide");
  const values = useMemo(() => {
    if (mode === "linear") {
      return { label: "O(n)", work: n, depth: n, explanation: "Uma chamada produz uma chamada menor; a profundidade cresce linearmente." };
    }
    if (mode === "divide") {
      return { label: "O(n log n)", work: Math.round(n * Math.log2(n)), depth: Math.round(Math.log2(n)), explanation: "A profundidade cai, mas ha trabalho de combinacao em varios niveis." };
    }
    return { label: "O(2^n)", work: Math.round(2 ** Math.min(20, n / 2)), depth: n, explanation: "Chamadas se ramificam e subproblemas se repetem rapidamente." };
  }, [mode, n]);

  return (
    <InteractiveShell
      eyebrow="Forma da arvore"
      title="A mesma ideia recursiva pode ter custos radicalmente diferentes"
      description="Compare recursao linear, dividir para conquistar e branching recursivo."
      tone="amber"
      icon={<GitBranch size={18} aria-hidden="true" />}
    >
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-4">
          <div className="grid grid-cols-3 gap-2">
            {([
              ["linear", "Linear"],
              ["divide", "Divide"],
              ["branching", "Ramifica"],
            ] as const).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setMode(id)}
                className={`rounded-2xl px-3 py-2 text-sm font-black transition ${mode === id ? "bg-amber-600 text-white" : "bg-white text-slate-700"}`}
              >
                {label}
              </button>
            ))}
          </div>
          <RangeField label="Escala da entrada" value={n} min={4} max={64} onChange={setN} />
          <div className="grid gap-3 sm:grid-cols-3">
            <MetricCard label="Padrao" value={values.label} />
            <MetricCard label="Profundidade" value={String(values.depth)} />
            <MetricCard label="Trabalho aproximado" value={values.work.toLocaleString()} />
          </div>
        </div>
        <div className="rounded-3xl bg-white p-5">
          <p className="text-sm leading-7 text-slate-600">{values.explanation}</p>
          <div className="mt-4 rounded-3xl border border-amber-200 bg-amber-50 p-4 text-sm leading-7 text-amber-900">
            Em recursao, olhar apenas a profundidade nao basta. O numero de filhos por chamada e o custo de combinar resultados mudam completamente a historia.
          </div>
        </div>
      </div>
    </InteractiveShell>
  );
}

function NetworkStackTradeoffLab() {
  const [cacheState, setCacheState] = useState<"quente" | "morno" | "frio">("quente");
  const [loss, setLoss] = useState(0);
  const dnsSteps = cacheState === "quente" ? 1 : cacheState === "morno" ? 2 : 4;
  const tcpPenalty = loss * 2;
  const totalRounds = dnsSteps + 1 + tcpPenalty;

  return (
    <InteractiveShell
      eyebrow="Jornada"
      title="O caminho da requisicao muda com cache e perda"
      description="A mesma URL pode parecer instantanea ou lenta dependendo do que acontece em camadas diferentes."
      tone="indigo"
      icon={<Network size={18} aria-hidden="true" />}
    >
      <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="grid gap-4">
          <div className="grid grid-cols-3 gap-2">
            {([
              ["quente", "DNS local"],
              ["morno", "resolver"],
              ["frio", "cadeia completa"],
            ] as const).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setCacheState(id)}
                className={`rounded-2xl px-3 py-2 text-sm font-black transition ${cacheState === id ? "bg-indigo-600 text-white" : "bg-white text-slate-700"}`}
              >
                {label}
              </button>
            ))}
          </div>
          <RangeField label="Pacotes perdidos / retransmissoes" value={loss} min={0} max={5} onChange={setLoss} />
          <div className="grid gap-3 sm:grid-cols-3">
            <MetricCard label="Passos DNS" value={String(dnsSteps)} />
            <MetricCard label="Penalidade TCP" value={`+${tcpPenalty}`} />
            <MetricCard label="Ida e volta total" value={String(totalRounds)} />
          </div>
        </div>
        <div className="rounded-3xl bg-white p-5">
          <p className="text-sm leading-7 text-slate-600">
            Cache DNS quente reduz a parte de nome. Perda de pacotes pesa depois, na tentativa de entregar um fluxo confiavel. O usuario sente o resultado final como "site lento", mas as causas podem estar em camadas completamente diferentes.
          </p>
        </div>
      </div>
    </InteractiveShell>
  );
}

function TransportTradeoffLab() {
  const [freshness, setFreshness] = useState(80);
  const [lossSensitivity, setLossSensitivity] = useState(35);
  const recommendation =
    lossSensitivity > 70
      ? "TCP"
      : freshness > 70 && lossSensitivity < 50
        ? "UDP"
        : "QUIC / desenho hibrido";
  const explanation = recommendation === "TCP"
    ? "Quando perder ou reordenar dados invalida o resultado, o transporte confiavel tende a compensar o custo extra."
    : recommendation === "UDP"
      ? "Quando frescor domina e pacotes atrasados perdem valor rapidamente, datagramas simples ajudam a nao esperar pelo passado."
      : "Quando voce quer latencia melhor sem abrir mao de confiabilidade moderna, protocolos sobre UDP como QUIC entram como compromisso.";

  return (
    <InteractiveShell
      eyebrow="Escolha do contrato"
      title="O protocolo muda quando a perda e o atraso doem de formas diferentes"
      description="Ajuste a sensibilidade da aplicacao e veja qual servico de transporte parece mais coerente."
      tone="rose"
      icon={<Radio size={18} aria-hidden="true" />}
    >
      <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="grid gap-4">
          <RangeField label="Importancia de frescor imediato" value={freshness} min={0} max={100} onChange={setFreshness} />
          <RangeField label="Sensibilidade a perda / reordenacao" value={lossSensitivity} min={0} max={100} onChange={setLossSensitivity} />
          <div className="grid gap-3 sm:grid-cols-3">
            <MetricCard label="Recomendacao" value={recommendation} />
            <MetricCard label="Frescor" value={freshness > 60 ? "alto" : "moderado"} />
            <MetricCard label="Integridade" value={lossSensitivity > 60 ? "alta" : "moderada"} />
          </div>
        </div>
        <div className="rounded-3xl bg-white p-5 text-sm leading-7 text-slate-600">{explanation}</div>
      </div>
    </InteractiveShell>
  );
}

function DistributedTradeoffLab() {
  const [replicas, setReplicas] = useState(3);
  const [latency, setLatency] = useState(40);
  const quorum = Math.floor(replicas / 2) + 1;
  const coordination = quorum * latency;

  return (
    <InteractiveShell
      eyebrow="Quorum"
      title="Mais replicas aumentam resiliencia e ampliam o custo de coordenacao"
      description="Use um cluster simples para enxergar por que escrever em varias maquinas nunca e gratis."
      tone="teal"
      icon={<Boxes size={18} aria-hidden="true" />}
    >
      <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="grid gap-4">
          <RangeField label="Numero de replicas" value={replicas} min={1} max={7} step={2} onChange={setReplicas} />
          <RangeField label="Latencia media entre nos (ms)" value={latency} min={5} max={200} onChange={setLatency} />
          <div className="grid gap-3 sm:grid-cols-3">
            <MetricCard label="Replicas" value={String(replicas)} />
            <MetricCard label="Quorum" value={String(quorum)} />
            <MetricCard label="Custo simbolico" value={`${coordination} ms`} />
          </div>
        </div>
        <div className="rounded-3xl bg-white p-5 text-sm leading-7 text-slate-600">
          Em desenhos baseados em quorum, responder uma escrita so depois de ouvir replicas suficientes melhora seguranca, mas adiciona espera. A grande licao e que rede e parte do algoritmo: mais distancia e mais replicas mudam o custo sem alterar uma linha do dominio de negocio.
        </div>
      </div>
    </InteractiveShell>
  );
}

function CapTradeoffLab() {
  const [partition, setPartition] = useState(55);
  const [freshness, setFreshness] = useState(80);
  const posture = partition > 60
    ? freshness > 60 ? "CP durante a particao" : "AP durante a particao"
    : freshness > 60 ? "PACELC: aceitar mais latencia" : "AP/latencia baixa com leituras potencialmente stale";

  return (
    <InteractiveShell
      eyebrow="Particao e frescor"
      title="A postura muda quando a rede quebra e quando a operacao exige verdade imediata"
      description="Ajuste o grau de particao esperada e o rigor de frescor para visualizar uma escolha de projeto mais realista."
      tone="amber"
      icon={<Scale size={18} aria-hidden="true" />}
    >
      <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="grid gap-4">
          <RangeField label="Severidade da particao" value={partition} min={0} max={100} onChange={setPartition} />
          <RangeField label="Exigencia de leitura fresca" value={freshness} min={0} max={100} onChange={setFreshness} />
          <div className="grid gap-3 sm:grid-cols-3">
            <MetricCard label="Particao" value={partition > 60 ? "forte" : "fraca"} />
            <MetricCard label="Frescor" value={freshness > 60 ? "alto" : "moderado"} />
            <MetricCard label="Postura" value={posture} />
          </div>
        </div>
        <div className="rounded-3xl bg-white p-5 text-sm leading-7 text-slate-600">
          CAP pergunta o que acontece quando a rede falha. PACELC lembra que, mesmo sem falha, coordenar replicas custa latencia. Por isso a escolha moderna costuma ser por operacao: login, saldo, feed e dashboard nao precisam do mesmo contrato.
        </div>
      </div>
    </InteractiveShell>
  );
}

function RangeField({
  label,
  value,
  min,
  max,
  onChange,
  step = 1,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  step?: number;
}) {
  return (
    <label className="grid gap-2 text-sm font-black text-slate-700">
      <span className="flex items-center justify-between gap-3">
        {label}
        <span className="font-mono text-slate-950">{value}</span>
      </span>
      <input
        className="w-full accent-slate-950"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}
