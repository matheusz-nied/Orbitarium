import type {
  LessonBlock,
  LessonBlockType,
  LessonContent,
  LessonModule,
  LessonReference,
} from "../../../types/content";
import { createComputacaoInteractions, createComputacaoVisuals } from "../_shared/factories";

function ref(title: string, source: string, url: string, note: string): LessonReference {
  return { title, source, url, note };
}

function block(
  type: LessonBlockType,
  title: string,
  body: string,
  items?: string[],
): LessonBlock {
  return { type, title, body, items };
}

function s(
  id: string,
  eyebrow: string,
  title: string,
  lead: string,
  visual: string | undefined,
  interactive: string | undefined,
  paragraphs: string[],
  blocks?: LessonBlock[],
) {
  return { id, eyebrow, title, lead, visual, interactive, paragraphs, blocks };
}

function q(
  id: string,
  prompt: string,
  a: string,
  b: string,
  c: string,
  correctOptionId: "a" | "b" | "c",
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

export const networkPerformanceBasicsVisuals = createComputacaoVisuals({
  title: "Network Performance Basics",
  subtitle:
    "Performance de rede nasce de buffers, fluxo e contrato entre camadas, nao de slogans sobre uma flag isolada.",
  level: "Intermediário",
  tags: ["TCP", "Buffers", "Nagle", "Keepalive", "Backpressure", "Latencia"],
  conceptNodes: ["aplicacao", "socket", "transporte", "pressao"],
  pipelineSteps: [
    "produzir dados",
    "bufferizar e agrupar",
    "transportar e confirmar",
    "devolver pressao",
  ],
  leftLabel: "latencia imediata",
  rightLabel: "eficiencia e agregacao",
  impactRows: [
    {
      label: "Unidade critica",
      value: "o caminho completo entre write, buffers, ACKs, fila e leitura do par",
    },
    {
      label: "Pergunta certa",
      value: "onde o pacote espera: na app, no kernel, na fila ou no receptor",
    },
    {
      label: "Mito comum",
      value: "achar que TCP_NODELAY sempre melhora tudo sozinho",
    },
    {
      label: "Eixo de projeto",
      value: "entrega imediata versus uso eficiente de syscall, pacote e janela",
    },
  ],
}) satisfies LessonModule["visuals"];

export const networkPerformanceBasicsInteractions = createComputacaoInteractions({
  title: "Network Performance Basics",
  pipelineSteps: [
    {
      name: "Escrever na aplicacao",
      summary:
        "A aplicacao decide o tamanho e o ritmo dos writes; isso ja molda quantas syscalls e quantos fragmentos entram no caminho.",
      signal: "padrao de escrita",
      risk: "tiny writes em excesso",
      takeaway:
        "Antes de culpar a rede, observe se o proprio protocolo gera trabalho pequeno demais.",
    },
    {
      name: "Passar pelos buffers",
      summary:
        "Os dados entram em buffers de envio e recepcao, onde batching e copia podem ajudar ou atrapalhar dependendo do objetivo.",
      signal: "ocupacao de buffer",
      risk: "fila invisivel",
      takeaway:
        "Buffer nao e ganho gratis; ele compra amortizacao ao custo de potencial espera.",
    },
    {
      name: "Transportar pelo TCP",
      summary:
        "ACKs, janela de recepcao, congestionamento e politicas como Nagle influenciam quando pequenos blocos realmente saem da maquina.",
      signal: "latencia entre write e envio",
      risk: "mitologia de flag",
      takeaway:
        "A pilha decide em funcao de contexto; por isso tuning sem protocolo claro tende a decepcionar.",
    },
    {
      name: "Receber e devolver pressao",
      summary:
        "Quando o receptor ou a aplicacao consumidora nao acompanham, a pressao volta em forma de fila, bloqueio ou queda de throughput.",
      signal: "crescimento de fila",
      risk: "producer sem limite",
      takeaway:
        "Backpressure saudavel protege o sistema; ignorado, ele vira saturacao escondida.",
    },
  ],
  leftLabel: "latencia minima",
  rightLabel: "agregacao eficiente",
  tradeoffSummary:
    "Redes reais obrigam voce a equilibrar envio imediato com uso razoavel de pacotes, syscalls e buffers. Em protocolos pequenos e sensiveis a RTT, atrasar alguns bytes pode doer bastante. Em contrapartida, desligar toda forma de agregacao quando a aplicacao faz varios writes minimos pode piorar a eficiencia e deslocar o problema para CPU, fila ou NIC.",
  tradeoffRisks: [
    "Extremizar latencia imediata com muitos writes pequenos pode inflar overhead por pacote e por syscall.",
    "Um ponto equilibrado costuma combinar framing melhor, writev ou mensagens mais coesas antes de mexer em flags.",
    "Mais agregacao ajuda throughput e amortizacao, mas pode esconder espera que o usuario percebe como lentidao.",
    "Tuning agressivo sem medir fila, retransmissao e consumo no receptor cria um sistema rapido no benchmark e instavel em producao.",
  ],
  practiceRule:
    "desabilite Nagle apenas quando o protocolo realmente sofre com pequenos writes dependentes de resposta; antes disso, arrume framing, batching e medicao",
  scenarios: [
    {
      name: "RPC pequeno e interativo",
      situation:
        "Um servico faz requisicoes curtas e respostas curtas, em que cada ida e volta carrega pouquissimos bytes, mas o atraso de cada troca pesa na UX.",
      choice:
        "Investigue primeiro o padrao de writes, depois considere TCP_NODELAY e mensagens mais coesas.",
      why:
        "Quando o protocolo e sensivel a RTT e envia fragmentos minimos, a agregacao automatica pode aparecer no p99.",
      caution:
        "Nao trate a flag como magia: se a app continua quebrando uma mensagem logica em varios writes, o custo volta em outro lugar.",
    },
    {
      name: "Conexao longa e ociosa",
      situation:
        "Voce mantem conexoes abertas por muito tempo entre componentes e precisa detectar pares mortos sem esperar o usuario perceber erro tarde demais.",
      choice:
        "Diferencie keepalive de timeout de aplicacao e configure os dois conscientemente.",
      why:
        "Keepalive ajuda a descobrir pares quebrados; deadlines e timeouts de negocio controlam quanto a operacao pode esperar.",
      caution:
        "Nao use keepalive como substituto para prazo de requisicao, cancelamento ou retry policy.",
    },
    {
      name: "Produtor mais rapido que consumidor",
      situation:
        "Uma ponta gera eventos mais rapido do que a outra consegue serializar, enviar, processar e persistir.",
      choice:
        "Introduza limites de fila, propagacao de pressao e possivel shedding em vez de apenas aumentar buffers.",
      why:
        "Backpressure bem desenhado evita que o sistema troque curto alivio por latencia explosiva e memoria tomada.",
      caution:
        "Buffer maior pode so comprar mais atraso e mais dano quando a demanda continua acima da capacidade.",
    },
  ],
}) satisfies LessonModule["interactions"];

export const networkPerformanceBasicsContent: LessonContent = {
  id: "network-performance-basics",
  title: "Network Performance Basics",
  subtitle:
    "Rede rapida nao e a rede com mais mitos repetidos, e sim a que voce entende em termos de buffers, ida e volta, fila e limites de consumo.",
  description:
    "Aula intermediaria sobre performance de rede com foco em buffers, Nagle, TCP_NODELAY, keepalive, timeouts, backpressure e criterios praticos para medir e projetar servicos de rede sem supersticao.",
  primaryCategoryId: "computacao",
  secondaryCategoryId: "engenharia",
  level: "Intermediário",
  estimatedTime: "50-65 min",
  tags: ["TCP", "Networking", "Buffers", "Backpressure", "Keepalive", "Performance"],
  learningObjectives: [
    "Modelar o caminho entre a aplicacao e a rede como uma sequencia de filas, buffers e politicas de envio.",
    "Entender quando Nagle e TCP_NODELAY entram no problema e por que nao sao botoes universais de performance.",
    "Distinguir keepalive, timeout de aplicacao e deadline de negocio.",
    "Reconhecer backpressure como mecanismo de controle, nao como falha a ser sempre escondida.",
    "Tomar decisoes de tuning baseadas em protocolo, fila e perfil de workload.",
  ],
  prerequisites: [
    "Ajuda ter visto syscalls, CPU-bound versus I/O-bound e a aula de TCP vs UDP.",
    "Familiaridade basica com sockets, requests e responses torna os exemplos mais concretos.",
    "Nao e necessario dominar redes profundas; a aula constroi o modelo de forma progressiva.",
  ],
  references: [
    ref(
      "tcp(7)",
      "Linux man-pages / man7.org",
      "https://man7.org/linux/man-pages/man7/tcp.7.html",
      "Referencia objetiva para opcoes TCP como TCP_NODELAY e para aspectos praticos da pilha no Linux.",
    ),
    ref(
      "IP Sysctl",
      "Linux Kernel Documentation",
      "https://docs.kernel.org/7.1/networking/ip-sysctl.html",
      "Documentacao oficial do kernel sobre parametros de keepalive e outros controles de pilha.",
    ),
    ref(
      "Improving network latency using TCP_NODELAY",
      "Red Hat Documentation",
      "https://docs.redhat.com/en/documentation/red_hat_enterprise_linux_for_real_time/9/html/optimizing_rhel_9_for_real_time_for_low_latency_operation/assembly_improving-network-latency-using-tcp_nodelay_optimizing-rhel9-for-real-time-for-low-latency-operation",
      "Explica quando TCP_NODELAY ajuda e por que pequenos writes continuam importando mesmo com a flag ligada.",
    ),
    ref(
      "Tuning TCP connections for high throughput",
      "Red Hat Documentation",
      "https://docs.redhat.com/documentation/red_hat_enterprise_linux/10/html/network_troubleshooting_and_performance_tuning/tuning-tcp-connections-for-high-throughput",
      "Mostra o papel de socket buffers, window scaling e limites de throughput no Linux.",
    ),
    ref(
      "Congestion Control in IP/TCP Internetworks",
      "IETF RFC 896",
      "https://datatracker.ietf.org/doc/html/rfc896",
      "Texto classico ligado a pequenos pacotes, congestionamento e intuicoes historicas por tras do algoritmo de Nagle.",
    ),
    ref(
      "Systems Performance: Enterprise and the Cloud",
      "Brendan Gregg",
      "https://www.brendangregg.com/systems-performance-2nd-edition-book.html",
      "Referencia ampla para redes, filas, saturacao, buffers e observabilidade sistemica.",
    ),
  ],
  heroVisual: "lesson-hero",
  openingText:
    "Quando alguem diz que um servico esta 'lento por causa da rede', quase sempre esta comprimindo varios mecanismos diferentes numa unica palavra. Entre a sua funcao e o outro processo existem syscalls, buffers, estrategias de agrupamento, ACKs, janelas, filas, limites do receptor e, muitas vezes, uma aplicacao do outro lado que consome devagar. Esta aula serve para desmontar esse caminho em partes observaveis, para que voce decida quando reduzir batching, quando aceitar buffer e quando deixar a pressao voltar em vez de esconda-la.",
  quickFacts: [
    {
      title: "Buffer e fila nao sao neutros",
      body: "Eles podem amortizar custo, mas tambem acumulam espera e mascaram saturacao.",
    },
    {
      title: "TCP_NODELAY nao salva protocolo ruim",
      body: "Se a aplicacao fragmenta demais, a flag so muda onde o custo aparece.",
    },
    {
      title: "Keepalive nao e timeout de negocio",
      body: "Ele detecta pares quebrados; nao decide quanto a sua operacao pode esperar.",
    },
    {
      title: "Backpressure e higiene operacional",
      body: "Sem ela, o sistema troca erro controlado por latencia e memoria explosivas.",
    },
  ],
  sections: [
    s(
      "panorama",
      "Motivacao",
      "Performance de rede e o comportamento do caminho inteiro",
      "A intuicao madura comeca ao perceber que o gargalo pode estar no formato das mensagens, nas filas internas ou no consumo do par, nao apenas no cabo.",
      "lesson-hero",
      undefined,
      [
        "Quando uma requisicao de rede parece lenta, a explicacao simples demais costuma ser culpar a internet. Mas um write pequeno pode esperar no proprio processo, no buffer do socket, na politica de envio do TCP, na fila da NIC ou no consumidor remoto.",
        "Esse encadeamento importa porque tecnicas diferentes atacam pontos diferentes. Aumentar buffer ajuda alguns cenarios e piora outros. Desligar Nagle ajuda alguns protocolos e machuca outros. Apertar timeout pode proteger o usuario ou derrubar throughput util.",
        "O objetivo da aula e trocar slogans por um modelo mental operacional: onde o byte nasceu, onde ele esperou, quem estava atrasado e que politica decidiu essa espera.",
      ],
      [
        block(
          "definition",
          "Performance de rede",
          "Comportamento observado de latencia, throughput, perda e fila ao longo do caminho entre aplicacao emissora e aplicacao receptora.",
        ),
        block(
          "insight",
          "A rede raramente e uma caixa preta total",
          "Mesmo quando voce nao controla o meio externo, ainda controla framing, padrao de escrita, tamanho de filas e politica de tempo na aplicacao.",
        ),
      ],
    ),
    s(
      "buffers-e-fronteiras",
      "Modelo mental",
      "Entre seu codigo e o par existe uma cadeia de buffers e decisoes",
      "Buffers compram desacoplamento temporal, mas nenhum buffer remove o limite de capacidade do sistema todo.",
      "concept-grid",
      undefined,
      [
        "O primeiro buffer relevante costuma ser o proprio da aplicacao: strings, slices, builders ou estruturas que voce monta antes de enviar. Depois entram os buffers do socket e as estruturas da pilha de rede que permitem agrupar, retransmitir e controlar fluxo.",
        "Do outro lado, a mesma historia se repete. O receptor recebe, copia ou referencia dados, os coloca em filas e so entao a logica de negocio consome. Se essa logica for lenta, o problema volta na forma de janela menor, bloqueio de envio ou fila crescente.",
        "Por isso, buffer deve ser pensado como credito temporario. Ele ajuda a suavizar picos e amortizar custo fixo, mas nao substitui capacidade sustentavel nem corrige um consumidor sistematicamente atrasado.",
      ],
      [
        block(
          "definition",
          "Fronteira de buffer",
          "Ponto em que o dado muda de dono temporario e pode esperar antes de continuar a jornada.",
        ),
        block(
          "mistake",
          "Erro comum",
          "Aumentar todos os buffers sem perguntar se a fila esta protegendo throughput ou apenas escondendo saturacao.",
        ),
      ],
    ),
    s(
      "fluxo-de-envio",
      "Fluxo",
      "Percorra o caminho do write ate a leitura remota",
      "O mesmo byte pode atravessar varias etapas de copia, agrupamento, confirmacao e espera antes de virar efeito observavel do outro lado.",
      "pipeline-diagram",
      "pipeline-lab",
      [
        "No nivel da aplicacao, o primeiro custo e decidir quando chamar write e com que granularidade. Varios writes pequenos em sequencia parecem inocentes, mas podem transformar uma mensagem logica em multiplos eventos caros.",
        "No nivel do transporte, o TCP tenta equilibrar entrega confiavel com uso razoavel da rede. ACKs, janela de recepcao e politicas de coalescencia fazem parte da mesma conversa, e nao de ajustes desconexos.",
        "Quando o receptor consome devagar, o sistema inteiro precisa desacelerar. Se a aplicacao emissora ignora esse sinal e continua produzindo, o excesso reaparece como fila, memoria ocupada ou timeout.",
      ],
      [
        block(
          "example",
          "Como usar a interacao",
          "Percorra as etapas e pergunte em cada uma delas: o byte esta trabalhando, esperando ou sendo copiado?",
          [
            "Observe onde entram buffering e ACK.",
            "Perceba que throughput e latencia podem puxar o desenho para lados diferentes.",
            "Note como a pressao do receptor volta para a origem.",
          ],
        ),
      ],
    ),
    s(
      "latencia-vs-eficiencia",
      "Trade-off",
      "Nem todo pacote pequeno deve sair imediatamente",
      "O ponto delicado da rede e decidir quanto vale agrupar antes de enviar e quanto custa esperar para fazer isso.",
      "tradeoff-spectrum",
      "tradeoff-lab",
      [
        "Enviar assim que cada fragmento fica pronto reduz parte da espera local, mas multiplica syscalls, cabecalhos e trabalho por pacote. Em alguns protocolos isso e aceitavel; em outros, e puro desperdicio.",
        "Agrupar varios fragmentos pode melhorar a eficiencia geral, especialmente quando a mensagem logica ja esta quase pronta ou quando o objetivo dominante e throughput. O problema comeca quando a espera introduzida aparece exatamente na parte interativa que o usuario percebe.",
        "A decisao madura nao parte de gosto pessoal. Ela nasce do protocolo, do tamanho medio das mensagens, da sensibilidade a RTT e da capacidade de medir onde o tempo extra surgiu.",
      ],
      [
        block(
          "insight",
          "Otimizar rede e escolher uma politica de espera",
          "Toda agregacao e uma forma de dizer 'espere um pouco para gastar menos depois'. O desafio e saber quando esse depois vale a pena.",
        ),
        block(
          "mistake",
          "Mito do sempre",
          "Sempre desligar Nagle ou sempre manter batching e um sinal de que o protocolo nao foi estudado com o contexto certo.",
        ),
      ],
    ),
    s(
      "nagle-tcp-nodelay",
      "TCP",
      "Nagle e TCP_NODELAY devem ser discutidos com cuidado, nao com religiao",
      "O algoritmo de Nagle tenta reduzir o desperdicio de pequenos segmentos, enquanto TCP_NODELAY pede envio sem esse atraso deliberado.",
      undefined,
      undefined,
      [
        "A forma classica de explicar Nagle e dizer que ele ajuda a evitar um fluxo de pacotes minimos quando ainda ha dados pequenos sem reconhecimento suficiente. Isso e util em varios cenarios, porque overhead por pacote e real.",
        "O problema pratico aparece quando um protocolo interativo depende de pequenos turnos de ida e volta. Nesses casos, atrasar um fragmento curto pode doer no tempo de resposta percebido. E ai que TCP_NODELAY passa a fazer sentido.",
        "Mesmo assim, a documentacao da Red Hat faz um alerta importante: com TCP_NODELAY ligado, voce ainda deve evitar quebrar uma mensagem logica em varios writes pequenos. Se nao, a flag apenas empurra a ineficiencia para a rede e para a CPU.",
      ],
      [
        block(
          "definition",
          "TCP_NODELAY",
          "Opcao de socket que desabilita o atraso associado ao algoritmo de Nagle para aquele fluxo.",
        ),
        block(
          "example",
          "Heuristica boa",
          "Use a flag quando o protocolo e sensivel a interacoes pequenas e voce ja revisou o framing da aplicacao.",
        ),
      ],
    ),
    s(
      "keepalive-e-timeouts",
      "Confiabilidade",
      "Keepalive, timeout e deadline resolvem problemas diferentes",
      "Misturar esses conceitos produz sistemas que parecem robustos no diagrama, mas falham mal no mundo real.",
      undefined,
      undefined,
      [
        "Keepalive serve para descobrir se uma conexao aparentemente aberta na verdade perdeu o par ou ficou invalida por algum evento de rede. Ele nao descreve o SLA da sua operacao e nem substitui prazo de negocio.",
        "Timeout de aplicacao responde a outra pergunta: quanto tempo vale esperar por uma leitura, uma escrita ou uma resposta antes de proteger o restante do sistema? Deadline e a forma mais completa de expressar esse contrato, porque carrega um limite absoluto ao longo da pilha.",
        "Sem essa separacao, dois erros aparecem. O primeiro e achar que keepalive torna um sistema 'mais rapido'. O segundo e deixar requisicoes aguardando indefinidamente porque a conexao ainda parece viva do ponto de vista do TCP.",
      ],
      [
        block(
          "definition",
          "Keepalive",
          "Mecanismo de deteccao de conexao morta ou quebrada apos um periodo de inatividade, quando habilitado.",
        ),
        block(
          "mistake",
          "Erro comum",
          "Usar keepalive como substituto para deadlines de request, cancelamento ou protecao contra dependencia lenta.",
        ),
      ],
    ),
    s(
      "backpressure",
      "Controle de fluxo",
      "Backpressure e a maneira educada de dizer 'pare, eu nao acompanho esse ritmo'",
      "Sem algum mecanismo de pressao de retorno, qualquer pico de demanda vira fila crescente ate que o sistema tombe ou entregue experiencia ruim.",
      undefined,
      undefined,
      [
        "No TCP, parte da ideia de backpressure ja existe via controle de fluxo e janelas. Mas sistemas modernos quase sempre precisam de uma camada adicional na propria aplicacao: filas limitadas, credito, pool de workers, shed de carga ou recusas rapidas.",
        "A intuicao importante e que backpressure nao e anti-performance. Ele e uma defesa contra o caos de permitir que produtores encham todos os buffers enquanto consumidores atrasam, travam ou degradam.",
        "Aumentar filas e buffers pode ser uma estrategia valida para absorver variacao curta. O erro aparece quando isso vira a unica resposta para um desequilibrio estrutural de capacidade.",
      ],
      [
        block(
          "insight",
          "Fila grande tambem e latencia",
          "Mesmo sem erro explicito, um sistema pode ficar inutil quando cada request passa muito tempo esperando sua vez.",
        ),
        block(
          "example",
          "Sinal operacional",
          "Se throughput parece estavel, mas o p99 sobe junto com profundidade de fila e memoria, a pressao provavelmente esta sendo escondida em algum buffer.",
        ),
      ],
    ),
    s(
      "mitos",
      "Armadilhas",
      "Quatro mitos que atrapalham tuning de rede",
      "Grande parte do sofrimento vem menos da pilha TCP e mais de heuristicas simplistas repetidas sem contexto.",
      undefined,
      undefined,
      [
        "Mito um: 'mais buffer sempre melhora'. Na pratica, ele pode apenas ampliar o atraso acumulado antes do erro aparecer. Mito dois: 'desligar Nagle deixa tudo rapido'. Em varios workloads, isso apenas aumenta fragmentacao e custo por pacote.",
        "Mito tres: 'keepalive resolve timeout'. Nao resolve; ele responde a um problema diferente. Mito quatro: 'se a banda esta folgada, a rede nao e o gargalo'. Latencia interativa, filas internas e consumo remoto continuam podendo dominar.",
        "O antidoto para os quatro mitos e sempre o mesmo: observar o padrao de mensagens, a profundidade das filas, o ritmo do consumidor e a distribuicao de latencia por etapa.",
      ],
      [
        block(
          "mistake",
          "Teatro de tuning",
          "Mexer em flags do socket sem antes revisar a forma como a aplicacao produz, agrupa e consome dados.",
        ),
      ],
    ),
    s(
      "decisoes-de-projeto",
      "Pratica",
      "O mesmo socket pede decisoes diferentes em cenarios diferentes",
      "Nao existe configuracao universal; o que existe e um protocolo, uma experiencia alvo e um perfil de carga que devem ser lidos juntos.",
      undefined,
      "scenario-lab",
      [
        "Uma aplicacao interativa com trocas curtissimas sofre de um jeito muito diferente de um pipeline de replicacao ou de transporte de logs. Em um caso, alguns milissegundos extras por turno importam. Em outro, o ganho principal pode vir de lotes maiores e poucas syscalls.",
        "Conexoes de longa duracao tambem mudam a conversa. Nelas, keepalive, timeouts e limites de fila passam a ser parte do contrato operacional, nao apenas detalhe de implementacao.",
        "Por isso a melhor pergunta nao e 'qual flag eu ligo?', e sim 'o que meu protocolo esta comprando ou perdendo com essa politica de envio e espera?'.",
      ],
      [
        block(
          "definition",
          "Regra pratica",
          "mexa primeiro no formato da mensagem e na politica de fila; so depois refine flags e buffers do transporte",
        ),
      ],
    ),
    s(
      "observacao-operacional",
      "Operacao",
      "Em producao, a rede se revela por filas, retries e piores casos",
      "A meta nao e ter um caminho medio bonito, e sim saber o que acontece quando receptor, dependencia ou workload saem do ideal.",
      "impact-board",
      undefined,
      [
        "Em ambientes reais, a rede se mistura com aplicacoes lentas, filas intermitentes, retransmissoes e retries que multiplicam carga. Medir apenas medias esconde quase tudo isso.",
        "Olhe para percentis, profundidade de fila, conexoes abertas, tempo de resposta por dependencia e sinais de retry. Esses dados contam se o sistema esta apenas amortizando um pico ou caminhando para overload.",
        "Uma arquitetura madura de rede aceita que pressao precisa reaparecer em algum lugar. O segredo e decidir onde ela reaparece de forma mais segura: no produtor, no balanceador, na fila limitada ou na recusa rapida.",
      ],
      [
        block(
          "insight",
          "Rede boa protege o sistema",
          "As melhores configuracoes nao sao as que escondem tudo, e sim as que falham de forma previsivel quando a capacidade acaba.",
        ),
      ],
    ),
    s(
      "quiz-revisao",
      "Revisao",
      "Quiz de revisao",
      "Chegue ao final confirmando se voce consegue relacionar buffers, Nagle, keepalive e backpressure sem misturar seus papeis.",
      undefined,
      "quiz",
      [
        "Use as perguntas para testar se o modelo mental ficou mecanico o bastante para orientar decisoes de projeto.",
      ],
      [],
    ),
    s(
      "glossario",
      "Glossario",
      "Termos essenciais",
      "Feche a aula consolidando o vocabulario minimo para conversar sobre tuning e operacao de rede sem supersticao.",
      undefined,
      "glossary",
      ["Se o termo ficou nebuloso durante a leitura, volte a ele antes de partir para a proxima aula."],
      [],
    ),
  ],
  summaryCards: [
    {
      title: "Rede e cadeia de espera",
      body: "Todo pacote atravessa pontos de buffer, politica e consumo antes de virar efeito remoto.",
    },
    {
      title: "Nagle nao e vilao universal",
      body: "Ele tenta reduzir pequenos segmentos; o problema e quando o protocolo sofre com cada atraso de ida e volta.",
    },
    {
      title: "TCP_NODELAY exige framing melhor",
      body: "Sem isso, voce apenas troca espera por mais overhead.",
    },
    {
      title: "Keepalive detecta morte",
      body: "Deadlines e timeouts definem quanto a sua operacao pode esperar.",
    },
    {
      title: "Backpressure protege",
      body: "Pressao de retorno e parte da estrategia de estabilidade.",
    },
    {
      title: "Buffer nao fabrica capacidade",
      body: "Ele compra tempo; se a diferenca de ritmo for estrutural, o problema reaparece.",
    },
  ],
  quiz: [
    q(
      "q1",
      "Qual frase descreve melhor o papel dos buffers em sistemas de rede?",
      "Eles desacoplam ritmos temporariamente, mas nao removem o limite de capacidade do sistema.",
      "Eles sempre reduzem latencia porque guardam mais dados.",
      "Eles existem apenas para kernels antigos.",
      "a",
      "Buffers amortizam custo e absorvem variacao curta, mas tambem podem acumular espera.",
    ),
    q(
      "q2",
      "Quando TCP_NODELAY tende a fazer mais sentido?",
      "Quando o protocolo e sensivel a pequenas trocas interativas e voce ja revisou o padrao de writes.",
      "Sempre que o throughput cair em qualquer servico.",
      "Apenas em UDP encapsulado.",
      "a",
      "A flag ajuda mais quando a latencia de pequenos turnos domina e a aplicacao nao esta desperdicando writes.",
    ),
    q(
      "q3",
      "Qual e um erro de modelagem sobre keepalive?",
      "Trata-lo como substituto para deadline e timeout de negocio.",
      "Usa-lo para detectar conexoes quebradas.",
      "Lembra-lo como mecanismo de inatividade.",
      "a",
      "Keepalive e sobre liveness da conexao, nao sobre o prazo util de cada operacao.",
    ),
    q(
      "q4",
      "O que backpressure bem desenhado faz?",
      "Devolve ao produtor ou a borda um sinal de que a capacidade acabou ou esta perto disso.",
      "Remove a necessidade de filas em qualquer camada.",
      "Garante que a latencia nunca suba.",
      "a",
      "O objetivo e controlar saturacao de forma previsivel, nao eliminar toda forma de espera.",
    ),
    q(
      "q5",
      "Por que desligar Nagle nem sempre melhora o sistema?",
      "Porque varios writes pequenos ainda podem virar mais overhead por pacote e por syscall.",
      "Porque o TCP para de confirmar pacotes.",
      "Porque a conexao deixa de ser confiavel.",
      "a",
      "A flag muda a politica de envio, mas nao corrige fragmentacao ruim na app.",
    ),
    q(
      "q6",
      "Qual pergunta e mais util antes de aumentar buffers?",
      "A fila esta absorvendo um pico curto ou escondendo um desequilibrio estrutural de consumo?",
      "Quantos gigabytes livres existem na maquina?",
      "Qual linguagem foi usada pelo time remoto?",
      "a",
      "Sem essa pergunta, buffer extra pode apenas comprar mais atraso.",
    ),
    q(
      "q7",
      "Em uma conexao longa e ociosa, qual combinacao faz mais sentido conceitualmente?",
      "Keepalive para detectar par morto e timeout/deadline para limitar operacoes.",
      "Apenas keepalive, porque ele ja cobre o caso de negocio.",
      "Apenas aumentar o send buffer.",
      "a",
      "As duas politicas respondem a perguntas diferentes e se complementam.",
    ),
    q(
      "q8",
      "Qual resumo melhor captura a aula?",
      "Performance de rede e o desenho do fluxo entre escrita, buffers, transporte e consumo remoto.",
      "Performance de rede e quase sempre escolher a melhor flag do kernel.",
      "Performance de rede se resume a largura de banda nominal.",
      "a",
      "A aula enfatiza mecanismo e contexto, nao tuning folclorico.",
    ),
  ],
  glossary: [
    g("Buffer", "Area temporaria onde dados esperam, sao agrupados ou desacoplados entre etapas."),
    g("Fila", "Acumulo ordenado de trabalho pendente quando chegada e consumo nao acontecem no mesmo ritmo."),
    g("TCP_NODELAY", "Opcao de socket que pede envio sem o atraso deliberado associado ao algoritmo de Nagle."),
    g("Nagle", "Algoritmo historico do TCP para reduzir o envio de pequenos segmentos demais."),
    g("Keepalive", "Mecanismo de deteccao de conexoes quebradas apos inatividade, quando habilitado."),
    g("Deadline", "Prazo absoluto para uma operacao completar antes de ser cancelada ou falhar."),
    g("Backpressure", "Pressao de retorno que limita o produtor quando o consumidor ou o caminho nao acompanham."),
    g("Window", "Janela de recepcao usada pelo TCP para controlar quanto dado pode seguir em voo."),
    g("Retransmissao", "Reenvio de dados quando o protocolo entende que a entrega confiavel falhou."),
    g("Framing", "Forma como a aplicacao organiza bytes em mensagens logicas."),
    g("Throughput", "Taxa sustentada de trabalho ou dados concluida por unidade de tempo."),
    g("p99", "Percentil que mostra o tempo abaixo do qual 99% das observacoes ficaram."),
  ],
};

export const compiladoresEOtimizacoesVisuals = createComputacaoVisuals({
  title: "Compiladores e Otimizacoes",
  subtitle:
    "Inline, LTO e PGO sao formas de dar mais contexto ao compilador, cada uma cobrando tempo, memoria e disciplina diferente.",
  level: "Intermediário",
  tags: ["Compiler", "Inlining", "LTO", "PGO", "LLVM", "Release"],
  conceptNodes: ["IR", "contexto", "hot path", "trade-off"],
  pipelineSteps: [
    "analisar codigo",
    "transformar localmente",
    "olhar entre modulos",
    "usar perfil real",
  ],
  leftLabel: "depurabilidade e velocidade de build",
  rightLabel: "agressividade de otimizacao",
  impactRows: [
    {
      label: "Pergunta central",
      value: "que contexto extra o compilador precisa para otimizar melhor este programa",
    },
    {
      label: "Primeiro ganho",
      value: "medir release, nao debugar a performance em O0 como se fosse o produto final",
    },
    {
      label: "Armadilha",
      value: "ligar toda otimização avancada sem workload representativo nem observacao de codigo gerado",
    },
    {
      label: "Eixo de projeto",
      value: "ciclos de build e clareza versus especializacao e analise global",
    },
  ],
}) satisfies LessonModule["visuals"];

export const compiladoresEOtimizacoesInteractions = createComputacaoInteractions({
  title: "Compiladores e Otimizacoes",
  pipelineSteps: [
    {
      name: "Ler e simplificar localmente",
      summary:
        "O compilador parte do codigo fonte e aplica analises locais: propagacao, eliminacao de redundancia, simplificacao de controle e heuristicas de inline.",
      signal: "nivel de otimizacao",
      risk: "medir debug build",
      takeaway:
        "Antes de discutir LTO ou PGO, confirme que voce esta observando o programa na configuracao certa.",
    },
    {
      name: "Ganhar visao entre fronteiras",
      summary:
        "Com mais contexto, o compilador ou o linker podem enxergar chamadas entre modulos e remover parte do custo de separacoes artificiais.",
      signal: "fronteiras entre crates ou arquivos",
      risk: "pensar em modulo como muralha absoluta",
      takeaway:
        "LTO e sobre ampliar contexto de otimizacao, nao sobre um 'modo turbo' misterioso.",
    },
    {
      name: "Aprender com o perfil",
      summary:
        "PGO usa dados de execucao representativa para guiar inline, layout e outras decisoes sensiveis a hotness.",
      signal: "workload representativo",
      risk: "perfil enviesado",
      takeaway:
        "Perfil errado gera confianca errada; o dado precisa se parecer com o mundo real.",
    },
    {
      name: "Validar o resultado",
      summary:
        "Otimizacao boa e a que melhora o programa real sem explodir codigo, build time ou observabilidade.",
      signal: "benchmark e tamanho de binario",
      risk: "fascinio por flag",
      takeaway:
        "Sempre confira custo de compilacao, depurabilidade e comportamento de producao.",
    },
  ],
  leftLabel: "build rapido e simples",
  rightLabel: "especializacao agressiva",
  tradeoffSummary:
    "Compiladores otimizam melhor quando recebem contexto sobre chamadas, hot paths e comportamento de execucao. Inline reduz algumas fronteiras, LTO amplia a visao entre modulos e PGO informa o que realmente importa no workload. Em troca, voce paga com mais tempo de compilacao, possivel aumento de codigo, dificuldade de debug e necessidade de perfis fieis.",
  tradeoffRisks: [
    "Ficar no extremo de build rapido pode preservar fronteiras que escondem custo em caminhos quentes.",
    "Um ponto equilibrado costuma combinar release bem configurado com leitura de remarks e benchmarks honestos.",
    "Mais contexto permite otimizar hot paths com mais criterio, especialmente em programas grandes.",
    "Agressividade sem representatividade ou sem validar tamanho do binario pode piorar cache, build e manutencao.",
  ],
  practiceRule:
    "trate inline, LTO e PGO como formas de aumentar contexto para o compilador; habilite-as quando o ganho esperado justificar o custo operacional",
  scenarios: [
    {
      name: "CLI pequeno",
      situation:
        "O binario e simples, compila rapido e nao tem um hot path dominante muito caro, mas o time quer ativar tudo porque 'performance e importante'.",
      choice:
        "Comece com release bem configurado e medicao; so depois avalie se LTO ou PGO trazem ganho real.",
      why:
        "Nem todo programa pequeno paga de volta a complexidade adicional de analise global ou coleta de perfil.",
      caution:
        "Nao transforme uma necessidade abstrata de velocidade em um pipeline de build mais caro sem prova de retorno.",
    },
    {
      name: "Servico grande e quente",
      situation:
        "Voce tem um binario grande com caminhos muito acessados e fronteiras entre componentes que aparecem constantemente no perfil.",
      choice:
        "Avalie LTO e, se o workload for estavel o suficiente, PGO para guiar inline e layout com dados reais.",
      why:
        "Programas grandes costumam ganhar mais quando o compilador enxerga melhor entre modulos e sabe onde esta o codigo quente.",
      caution:
        "Valide tambem build time, tamanho do binario e qualidade do perfil usado na instrumentacao.",
    },
    {
      name: "Benchmark de laboratorio",
      situation:
        "Uma microbenchmark melhorou muito com uma combinacao agressiva de flags, mas o servico real nao mostrou o mesmo comportamento.",
      choice:
        "Confie no workload do produto e use relatorios de otimizacao para entender por que a expectativa nao se confirmou.",
      why:
        "Compilador e benchmark podem aprender o caso de teste, nao necessariamente o trafego de producao.",
      caution:
        "Nao promova ganhos de microbench a regra do sistema inteiro sem confronto com metricas reais.",
    },
  ],
}) satisfies LessonModule["interactions"];

export const compiladoresEOtimizacoesContent: LessonContent = {
  id: "compiladores-e-otimizacoes",
  title: "Compiladores e Otimizacoes",
  subtitle:
    "Inline, LTO e PGO sao maneiras diferentes de dar mais contexto ao compilador para que ele decida melhor onde vale especializar, juntar ou reorganizar codigo.",
  description:
    "Aula intermediaria sobre compiladores e otimizacoes com foco conceitual em inlining, link-time optimization, ThinLTO, profile-guided optimization, relatorios de otimizacao e trade-offs entre velocidade de build, tamanho de codigo, depuracao e performance real.",
  primaryCategoryId: "computacao",
  secondaryCategoryId: "engenharia",
  level: "Intermediário",
  estimatedTime: "50-65 min",
  tags: ["Compiler", "Inlining", "LTO", "PGO", "LLVM", "Rust"],
  learningObjectives: [
    "Entender inline, LTO e PGO como tecnicas de aumento de contexto para o compilador.",
    "Distinguir ganho potencial de runtime dos custos em build time, code size e depurabilidade.",
    "Relacionar perfis representativos a decisoes de layout, hotness e especializacao.",
    "Usar relatorios de otimização como evidencia em vez de adivinhacao.",
    "Evitar confundir flags agressivas com melhoria garantida no sistema real.",
  ],
  prerequisites: [
    "Ajuda ja ter estudado custo de abstracoes e benchmarking honesto.",
    "Familiaridade basica com release versus debug torna as decisoes mais concretas.",
    "Nao e preciso conhecer LLVM internamente; a aula fica no nivel de engenharia pratica.",
  ],
  references: [
    ref(
      "clang - the Clang C, C++, and Objective-C compiler",
      "Clang Documentation",
      "https://clang.llvm.org/docs/CommandGuide/clang.html",
      "Documentacao oficial dos niveis de otimizacao e opcoes gerais de compilacao do Clang.",
    ),
    ref(
      "Clang command line argument reference",
      "Clang Documentation",
      "https://clang.llvm.org/docs/ClangCommandLineReference.html",
      "Referencia oficial para flags ligadas a inline, profile use e outros controles do compilador.",
    ),
    ref(
      "Clang Compiler User's Manual",
      "Clang Documentation",
      "https://clang.llvm.org/docs/UsersManual.html",
      "Explica optimization remarks e formas de inspecionar decisoes do otimizador.",
    ),
    ref(
      "ThinLTO",
      "Clang Documentation",
      "https://clang.llvm.org/docs/ThinLTO.html",
      "Explica a diferenca entre LTO monolitico e ThinLTO, com foco em escalabilidade e analise entre modulos.",
    ),
    ref(
      "Profile-guided Optimization",
      "The rustc Book",
      "https://doc.rust-lang.org/rustc/profile-guided-optimization.html",
      "Referencia oficial sobre o fluxo de PGO em rustc e seu papel em inlining, layout e outras decisoes guiadas por perfil.",
    ),
    ref(
      "Profiles",
      "The Cargo Book",
      "https://doc.rust-lang.org/cargo/reference/profiles.html",
      "Documentacao oficial dos perfis de build, inclusive LTO e o impacto de configuracoes de compilacao em runtime e debug.",
    ),
  ],
  heroVisual: "lesson-hero",
  openingText:
    "O compilador nao e apenas um tradutor de linguagem; ele tambem e um grande editor de fluxo, dados e fronteiras. Inline, LTO e PGO sao jeitos de dizer ao otimizador: 'aqui esta mais contexto para voce decidir melhor'. O problema e que contexto extra nunca vem gratis. Mais visao global, mais instrumentacao e mais especializacao custam build time, memoria, tamanho de binario e as vezes clareza de depuracao. A engenharia madura aprende a negociar esse contrato.",
  quickFacts: [
    {
      title: "Inline nao e garantia",
      body: "Ele depende de heuristicas, custo, tamanho de codigo e contexto do call site.",
    },
    {
      title: "LTO amplia visao",
      body: "A tecnica deixa o compilador olhar entre modulos e fronteiras que antes pareciam caixas fechadas.",
    },
    {
      title: "PGO precisa de workload real",
      body: "Perfil enviesado ensina o compilador a otimizar o caso errado.",
    },
    {
      title: "Flags nao substituem evidencia",
      body: "Use benchmarks, remarks e observacao de binario para validar o que a teoria prometeu.",
    },
  ],
  sections: [
    s(
      "motivacao",
      "Motivacao",
      "Otimizacao de compilador e contexto aplicado ao codigo",
      "Quase toda grande melhoria nasce quando o compilador passa a enxergar melhor custo, fronteira e hotness do programa.",
      "lesson-hero",
      undefined,
      [
        "No codigo fonte, uma chamada de funcao, uma crate ou um modulo parecem fronteiras bastante claras. Para o compilador, essas fronteiras podem ser flexibilizadas quando ha motivo para isso e contexto suficiente para justificar a transformacao.",
        "Inline tira parte do custo de uma chamada e abre espaco para outras simplificacoes locais. LTO permite raciocinar entre modulos na etapa de link. PGO acrescenta dados observados de execucao para orientar quais caminhos merecem mais atencao.",
        "O ponto central da aula e deixar de ver essas tecnicas como 'modos secretos de ficar rapido' e passa-las a enxergar como mecanismos de informacao e especializacao.",
      ],
      [
        block(
          "definition",
          "Otimizacao de compilador",
          "Transformacao semantica preservada que busca melhor runtime, tamanho, consumo ou alguma combinacao desses objetivos.",
        ),
        block(
          "insight",
          "Mais contexto muda decisoes",
          "Compiladores decidem diferente quando conseguem ver mais do programa e quando sabem quais caminhos sao realmente quentes.",
        ),
      ],
    ),
    s(
      "pipeline",
      "Modelo mental",
      "Pense em inline, LTO e PGO como camadas de contexto crescente",
      "Cada tecnica abre uma porta diferente para o compilador entender melhor o programa, mas cobra um preco diferente.",
      "concept-grid",
      undefined,
      [
        "Sem entrar em todos os detalhes internos, ajuda pensar em tres perguntas. O compilador conhece bem este trecho local? Ele consegue ver atraves da fronteira entre modulos? Ele sabe quais caminhos sao de fato quentes no workload real?",
        "Inline responde mais a primeira pergunta, embora tambem possa viabilizar cascatas de otimização. LTO responde fortemente a segunda, porque junta visao entre unidades separadas. PGO responde a terceira, alimentando o otimizador com informacao de uso observada.",
        "Nenhuma dessas camadas invalida as outras. Na pratica, elas podem se complementar, desde que o sistema justifique o custo operacional e a instrumentacao esteja sob controle.",
      ],
      [
        block(
          "example",
          "Leitura rapida",
          "Quando um time diz 'vamos ligar LTO', a pergunta madura e: que fronteiras atuais estao escondendo custo ou impedindo simplificacoes?",
        ),
      ],
    ),
    s(
      "inline",
      "Inlining",
      "Inline nao e apenas remover call overhead",
      "O valor do inline frequentemente esta nas otimizacoes que ele desbloqueia depois, nao so na chamada que desaparece.",
      "pipeline-diagram",
      "pipeline-lab",
      [
        "Remover uma chamada de funcao pode poupar algum overhead, mas o efeito mais interessante costuma vir do que acontece em seguida: propagacao de constantes, eliminacao de branches, simplificacao de loops ou melhor alocacao de registradores.",
        "Por outro lado, inlining excessivo aumenta code size, pode piorar cache de instrucoes e dificulta debug. Por isso compiladores usam heuristicas: tamanho da funcao, hotness, custo estimado e contexto do call site.",
        "A lição importante e que inline e uma aposta local sobre beneficio futuro. Ele vale mais quando abre caminho para especializacao significativa, e vale menos quando apenas expande o binario sem remover custo relevante.",
      ],
      [
        block(
          "definition",
          "Inlining",
          "Substituicao de uma chamada pelo corpo da funcao quando o compilador considera que isso trara vantagem suficiente.",
        ),
        block(
          "mistake",
          "Erro comum",
          "Julgar inline apenas pelo custo da call, ignorando efeitos em tamanho de codigo, cache e depuracao.",
        ),
      ],
    ),
    s(
      "lto",
      "Analise global",
      "LTO amplia o horizonte entre modulos",
      "Ao chegar ao link com mais informacao intermediaria, o toolchain pode raciocinar sobre o programa de forma menos compartimentalizada.",
      "tradeoff-spectrum",
      "tradeoff-lab",
      [
        "Link-Time Optimization existe porque muitas oportunidades ficam escondidas quando cada unidade de compilacao e analisada isoladamente. Com LTO, o compilador ganha uma visao mais ampla para inlining entre modulos, eliminacao de simbolos mortos e outras simplificacoes globais.",
        "A documentacao do Clang destaca que o ThinLTO tenta manter boa parte desse ganho com melhor escalabilidade, usando resumos compactos de modulo e backends paralelos. Isso ajuda a entender que LTO nao e uma coisa unica; existem escolhas de custo dentro dela.",
        "Na pratica, a pergunta nunca e 'LTO e melhor?'. A pergunta e 'o contexto extra entre modulos melhora o meu programa o bastante para pagar build, memoria e pipeline de release mais pesados?'.",
      ],
      [
        block(
          "definition",
          "LTO",
          "Otimizacao realizada na etapa de link com informacao suficiente para enxergar alem das unidades isoladas de compilacao.",
        ),
        block(
          "insight",
          "ThinLTO e um compromisso",
          "A ideia e preservar grande parte do ganho de analise global sem o custo total de uma abordagem monolitica.",
        ),
      ],
    ),
    s(
      "pgo",
      "Perfil",
      "PGO ensina ao compilador onde o programa realmente passa tempo",
      "Em vez de adivinhar hotness apenas com heuristicas estaticas, o compilador recebe sinais de execucao representativa.",
      undefined,
      undefined,
      [
        "PGO funciona em torno de um ciclo: gerar um binario instrumentado ou obter dados de perfil, executar workload representativo, consolidar o perfil e recompilar usando essa informacao. Com isso, o compilador pode refinar inline, layout de codigo, previsao de branches e outras decisoes sensiveis a frequencia real de uso.",
        "O rustc book enfatiza exatamente essa ideia: o dado de execucao informa otimizacoes como inlining, machine-code layout e register allocation. A parte que costuma ser subestimada e a palavra representativo.",
        "Se o perfil reflete apenas um benchmark de laboratorio ou uma rota feliz demais, voce corre o risco de especializar o programa para o caso errado e degradar o comportamento que importa em producao.",
      ],
      [
        block(
          "definition",
          "PGO",
          "Profile-Guided Optimization: uso de dados de execucao para guiar decisoes de otimizacao na recompilacao.",
        ),
        block(
          "mistake",
          "Erro comum",
          "Chamar de PGO um perfil coletado de workload artificial que nao representa a distribuicao de caminhos reais do programa.",
        ),
      ],
    ),
    s(
      "remarks",
      "Observabilidade",
      "Relatorios de otimização ajudam a substituir folclore por evidencia",
      "Ferramentas como optimization remarks mostram por que certas transformacoes ocorreram, falharam ou foram sequer consideradas.",
      undefined,
      undefined,
      [
        "A documentacao do Clang mostra flags como Rpass, Rpass-missed e Rpass-analysis para expor decisoes do inliner e de outras passagens. Isso e valioso porque permite observar o otimizador como um sistema que razoa, em vez de uma caixa preta magica.",
        "Se uma funcao nao foi inlined, por exemplo, o motivo pode ser tamanho, custo previsto, falta de hotness ou fronteira ainda invisivel sem LTO. Sem remarks, o time tende a preencher essa lacuna com suposicoes.",
        "Para engenharia de performance, remarks sao uma forma de observabilidade do compilador. Eles nao substituem benchmark, mas ajudam a explicar por que o binario ficou do jeito que ficou.",
      ],
      [
        block(
          "example",
          "Boa pratica",
          "Quando uma flag nao entregou o ganho esperado, consulte remarks antes de concluir que o compilador 'ignorou' sua intencao.",
        ),
      ],
    ),
    s(
      "debug-vs-release",
      "Ambiente",
      "Debug e release contam historias diferentes sobre o mesmo codigo",
      "Boa parte dos mal-entendidos de performance nasce da tentativa de avaliar custo real em um binario que foi compilado para depurar melhor, nao para executar melhor.",
      undefined,
      undefined,
      [
        "Configuracoes de debug geralmente preservam mais variaveis, inibem parte das otimizações e privilegiam depurabilidade. Isso e desejavel para diagnostico, mas torna perigoso usar o binario como espelho fiel do custo final.",
        "O livro do Cargo tambem destaca essa tensao: niveis de otimizacao maiores podem produzir codigo mais rapido, ao custo de tempos maiores de compilacao e menor facilidade de depurar certas estruturas depois de transformadas.",
        "A lição aqui nao e 'nunca debugue'. E separar as perguntas. Debug build ajuda a entender logica e estado; release build ajuda a medir comportamento de performance.",
      ],
      [
        block(
          "insight",
          "Pergunta certa, build certa",
          "Quando a pergunta e sobre corretude, aceite mais fidelidade semantica no debug. Quando e sobre custo, avalie o artefato de release.",
        ),
      ],
    ),
    s(
      "riscos-e-limites",
      "Limites",
      "Nem toda agressividade melhora o programa inteiro",
      "Otimizar uma parte pode piorar cache, tempo de link, uso de memoria do build e previsibilidade operacional.",
      undefined,
      undefined,
      [
        "Inlining demais pode expandir o binario alem do razoavel. LTO pode alongar bastante o link e consumir mais memoria. PGO pode ensinar um comportamento enviesado se o perfil nao representar o uso real.",
        "Tambem ha um custo humano: pipelines de release ficam mais complexos, builds demoram mais, reproduzir um problema muda de dificuldade e a equipe precisa entender novas fontes de variacao.",
        "Por isso o criterio serio nunca e maximizar o numero de tecnicas ligadas. E maximizar o ganho total do produto, o que inclui capacidade de evoluir, medir e depurar.",
      ],
      [
        block(
          "mistake",
          "Otimização ornamental",
          "Adotar flags sofisticadas porque o nome parece avancado, sem uma hipotese concreta sobre o que elas devem melhorar.",
        ),
      ],
    ),
    s(
      "decisoes-de-projeto",
      "Pratica",
      "A escolha certa depende do tamanho do programa e da estabilidade do workload",
      "Alguns sistemas ganham muito de contexto extra; outros nao pagam nem o custo do pipeline adicional.",
      undefined,
      "scenario-lab",
      [
        "Programas pequenos, simples e sem hot path dominante frequentemente colhem a maior parte do ganho em um release profile bem configurado, sem precisar de um aparato pesado de PGO.",
        "Programas grandes, com muitos modulos e caminhos muito quentes, tendem a se beneficiar mais de visao global e perfil. Nessas situacoes, LTO e PGO deixam de ser luxo academico e passam a ser instrumentos pragmaticos.",
        "A melhor decisao nasce da combinacao entre benchmark honesto, custo de build, estabilidade do workload e leitura do que o compilador de fato fez.",
      ],
      [
        block(
          "definition",
          "Regra pratica",
          "use release, benchmark e observabilidade do compilador como base; suba para LTO e PGO quando o programa tiver escala e hotness que justifiquem isso",
        ),
      ],
    ),
    s(
      "impacto",
      "Conexoes",
      "Aula de compilador tambem e aula de arquitetura",
      "As tecnicas fazem mais sentido quando ligadas ao desenho do software, ao tamanho do binario e ao custo de desenvolvimento.",
      "impact-board",
      undefined,
      [
        "Fronteiras de modulo existem por bons motivos de manutencao, ownership e isolamento. Quando o compilador as atravessa, ele entrega performance mas tambem cria uma forma de acoplamento indireto no artefato final.",
        "Isso nao e um problema por si so. O problema aparece quando o time nao acompanha o custo adicional de link, o tamanho de codigo ou a dificuldade de analisar regressao depois.",
        "Por isso, pensar em otimização de compilador como tema de arquitetura ajuda bastante: ela afeta o binario, o pipeline e a operacao, nao apenas uma microbenchmark local.",
      ],
      [
        block(
          "insight",
          "Contexto extra e recurso de engenharia",
          "Assim como memoria e CPU, contexto de compilacao tambem e um recurso que precisa ser alocado com criterio.",
        ),
      ],
    ),
    s(
      "quiz-revisao",
      "Revisao",
      "Quiz de revisao",
      "Chegue ao final verificando se inline, LTO e PGO ficaram conectados por mecanismo, nao apenas por nome.",
      undefined,
      "quiz",
      ["As questoes abaixo testam o raciocinio de custo e contexto discutido na aula."],
      [],
    ),
    s(
      "glossario",
      "Glossario",
      "Termos essenciais",
      "Revise o vocabulario minimo para discutir otimizacao de compilador com clareza tecnica.",
      undefined,
      "glossary",
      ["Esses termos servem como mapa para futuras aulas de tooling e performance nativa."],
      [],
    ),
  ],
  summaryCards: [
    {
      title: "Inline abre caminho",
      body: "O ganho maior costuma vir das simplificacoes que a expansao da chamada libera depois.",
    },
    {
      title: "LTO amplia visao",
      body: "A tecnica permite analisar e transformar alem das fronteiras locais de compilacao.",
    },
    {
      title: "PGO ensina hotness",
      body: "Perfil representativo informa o que realmente importa no runtime.",
    },
    {
      title: "Release nao e detalhe",
      body: "Medir custo em debug build produz conclusoes enganosas sobre performance final.",
    },
    {
      title: "Remarks sao evidencia",
      body: "Elas ajudam a entender por que o otimizador agiu ou deixou de agir.",
    },
    {
      title: "Mais agressividade custa",
      body: "Build time, tamanho de binario e depurabilidade entram no calculo.",
    },
  ],
  quiz: [
    q(
      "q1",
      "Qual e a melhor intuicao para entender inline?",
      "E uma tecnica que pode remover chamadas e desbloquear outras otimizações no call site.",
      "E apenas uma forma de mudar nomes de funcoes no binario.",
      "E um recurso exclusivo de linguagens sem GC.",
      "a",
      "Inlining vale muito pelo que ele habilita depois da expansao da chamada.",
    ),
    q(
      "q2",
      "O que LTO acrescenta conceitualmente?",
      "Mais visao entre unidades de compilacao ou modulos na etapa de link.",
      "Garantia de que toda funcao sera inlined.",
      "Coleta automatica de perfil em producao.",
      "a",
      "LTO e sobre ampliar contexto de analise global, nao forcar uma unica transformacao.",
    ),
    q(
      "q3",
      "Por que PGO pode ser poderoso?",
      "Porque informa ao compilador quais caminhos sao realmente quentes no workload representativo.",
      "Porque elimina a necessidade de benchmark.",
      "Porque sempre reduz o tamanho do binario.",
      "a",
      "A grande vantagem do PGO e guiar decisoes sensiveis a uso real.",
    ),
    q(
      "q4",
      "Qual e um risco classico do PGO?",
      "Usar um perfil que representa mal o comportamento real do programa.",
      "Nao conseguir mais compilar codigo em release.",
      "Perder a semantica da linguagem automaticamente.",
      "a",
      "Perfil enviesado pode ensinar ao compilador as prioridades erradas.",
    ),
    q(
      "q5",
      "Quando remarks de otimizacao ajudam mais?",
      "Quando voce quer entender por que uma transformacao ocorreu, falhou ou nem foi considerada.",
      "Somente quando o programa nao compila.",
      "Apenas para contar linhas de codigo.",
      "a",
      "Elas fornecem observabilidade sobre a decisao do otimizador.",
    ),
    q(
      "q6",
      "Qual frase sobre debug e release esta mais correta?",
      "Debug ajuda a entender estado; release ajuda a medir custo final.",
      "Debug e sempre melhor para medir performance porque preserva variaveis.",
      "Release torna qualquer benchmark irrelevante.",
      "a",
      "As duas configuracoes respondem perguntas diferentes e complementares.",
    ),
    q(
      "q7",
      "O que pode acontecer com inlining excessivo?",
      "Aumento de tamanho de codigo e piora de comportamento de cache de instrucoes.",
      "Perda total de paralelismo na CPU.",
      "Conversao automatica do programa para interpretado.",
      "a",
      "Mais expansao nao significa mais eficiencia global.",
    ),
    q(
      "q8",
      "Qual resumo representa melhor a aula?",
      "Inline, LTO e PGO sao formas de dar mais contexto ao compilador, cada uma com custo proprio.",
      "Otimizacao de compilador se resume a escolher o maior nivel de O possivel.",
      "Se uma flag e avancada, ela deve ser ligada por padrao.",
      "a",
      "A aula conecta mecanismo, beneficio esperado e custo operacional.",
    ),
  ],
  glossary: [
    g("Inlining", "Expansao do corpo de uma funcao no local da chamada, quando o compilador considera vantajoso."),
    g("Call site", "Ponto do programa onde uma funcao e invocada."),
    g("IR", "Intermediate Representation, forma intermediaria usada pelo compilador para analisar e transformar o programa."),
    g("LTO", "Link-Time Optimization, analise e otimizacao com visao ampliada na etapa de link."),
    g("ThinLTO", "Variante de LTO desenhada para melhor escalabilidade com resumos de modulo e backends paralelos."),
    g("PGO", "Profile-Guided Optimization, uso de perfil de execucao para guiar o otimizador."),
    g("Hot path", "Trecho do programa executado com alta frequencia ou custo dominante."),
    g("Code size", "Tamanho do codigo gerado no binario final."),
    g("Optimization remark", "Relatorio emitido pelo compilador sobre uma decisao de transformacao."),
    g("Release build", "Configuracao de compilacao orientada a runtime eficiente."),
    g("Debug build", "Configuracao orientada a observabilidade e depuracao."),
    g("Heuristica", "Regra pratica usada pelo compilador para tomar decisoes quando nao ha certeza absoluta."),
  ],
};

export const debuggingNativoVisuals = createComputacaoVisuals({
  title: "Debugging Nativo: perf, strace, gdb/dlv",
  subtitle:
    "Ferramenta boa comeca pela pergunta certa: tempo de CPU, syscall, estado, stack ou comportamento de runtime.",
  level: "Avançado",
  tags: ["perf", "strace", "gdb", "dlv", "Linux", "Debug"],
  conceptNodes: ["sintoma", "camada", "evidencia", "estado"],
  pipelineSteps: [
    "observar sintoma",
    "escolher camada",
    "coletar evidencia",
    "inspecionar estado",
  ],
  leftLabel: "chute intuitivo",
  rightLabel: "depuracao guiada por evidencia",
  impactRows: [
    {
      label: "Pergunta inicial",
      value: "o processo esta queimando CPU, esperando kernel, travando estado ou falhando semanticamente",
    },
    {
      label: "Ferramenta rapida",
      value: "perf para hotspots, strace para syscalls, gdb ou dlv para estado e stack",
    },
    {
      label: "Armadilha",
      value: "anexar a ferramenta errada e medir o efeito da propria instrumentacao",
    },
    {
      label: "Eixo de projeto",
      value: "intrusao minima versus inspecao profunda e interativa",
    },
  ],
}) satisfies LessonModule["visuals"];

export const debuggingNativoInteractions = createComputacaoInteractions({
  title: "Debugging Nativo: perf, strace, gdb/dlv",
  pipelineSteps: [
    {
      name: "Classificar o sintoma",
      summary:
        "Antes de abrir qualquer ferramenta, pergunte se o processo esta ocupado em CPU, bloqueado em I/O, preso em lock ou simplesmente errado em logica.",
      signal: "tipo de espera",
      risk: "ferramenta prematura",
      takeaway:
        "Ferramenta boa comeca com uma pergunta de camada, nao com um comando decorado.",
    },
    {
      name: "Coletar com baixa intrusao",
      summary:
        "Sampling e contadores ajudam quando o problema e custo ou hotspot; tracing de syscalls ajuda quando o kernel entra na historia.",
      signal: "overhead da coleta",
      risk: "perturbar o alvo",
      takeaway:
        "A observacao tambem tem custo; escolha o menor instrumento que responda a pergunta atual.",
    },
    {
      name: "Descer ao estado",
      summary:
        "Quando voce precisa saber onde, por quem e em que condicao o bug acontece, gdb ou dlv entram para inspecionar stack, variaveis, threads e goroutines.",
      signal: "stack e variaveis",
      risk: "falta de simbolos ou contexto",
      takeaway:
        "Debugger serve para perguntar 'como cheguei aqui?' e 'quem mudou isso?', nao apenas para pausar o programa.",
    },
    {
      name: "Fechar com hipotese testavel",
      summary:
        "A coleta so virou engenharia quando se transforma em hipotese verificavel e proximo experimento.",
      signal: "acao seguinte clara",
      risk: "tour de ferramenta",
      takeaway:
        "Sem traducao para hipotese, o debug vira sightseeing tecnico.",
    },
  ],
  leftLabel: "explorar no escuro",
  rightLabel: "inspecao por camada",
  tradeoffSummary:
    "Perf e otimo para saber onde o tempo de CPU foi gasto com relativamente pouca intrusao. Strace mostra o dialogo com o kernel, mas pode perturbar bastante o alvo em alguns cenarios. GDB e Delve oferecem inspecao profunda de estado, stack e controle de execucao, ao custo de mais interatividade, simbolos e cuidado operacional. A sequencia madura e abrir a ferramenta mais barata que ainda responde a pergunta atual.",
  tradeoffRisks: [
    "Comecar com debugger pesado sem saber o sintoma costuma desperdiçar tempo e foco.",
    "Uma primeira passada com perf ou uma leitura de logs pode bastar para restringir enormemente o espaco de busca.",
    "Ao descer para gdb ou dlv, voce ganha contexto causal que ferramentas de alto nivel nao entregam.",
    "Strace e outros tracers podem alterar o comportamento do processo; interpretar seu output exige lembrar desse custo.",
  ],
  practiceRule:
    "escolha a ferramenta pela camada do sintoma e comece pela menor intrusao capaz de responder sua primeira pergunta",
  scenarios: [
    {
      name: "Servico queimando CPU",
      situation:
        "O processo consome muita CPU, mas nao esta claro se o tempo vai para serializacao, alocacao, hash ou lock.",
      choice:
        "Comece por perf para localizar hotspots e stacks quentes antes de anexar um debugger.",
      why:
        "Quando a pergunta e 'onde o tempo foi gasto', sampling normalmente entrega um mapa melhor do que stepping manual.",
      caution:
        "Nao conclua causa raiz so pelo topo de uma stack; confirme com contexto, workload e possiveis efeitos de fila.",
    },
    {
      name: "Programa aparentemente parado",
      situation:
        "A aplicacao nao usa CPU, mas continua sem responder e nao esta claro se o problema e syscall, lock ou dependencia.",
      choice:
        "Use strace para ver chamadas bloqueadas e, se preciso, gdb para inspecionar threads e backtraces.",
      why:
        "Primeiro descubra se ela esta esperando o kernel; depois investigue o estado interno que levou a essa espera.",
      caution:
        "Lembre que tracing de syscalls pode influenciar tempos observados; interprete duracoes com humildade.",
    },
    {
      name: "Servico Go com goroutine travada",
      situation:
        "Uma aplicacao Go apresenta travamento ou comportamento estranho em runtime, possivelmente ligado a uma goroutine especifica.",
      choice:
        "Use Delve para inspecionar stack, goroutines e estado do programa no ecossistema Go.",
      why:
        "Delve fala a lingua operacional do runtime Go melhor do que uma depuracao generica crua.",
      caution:
        "Nao se esqueça de confirmar se o problema e logico, de scheduler ou de dependencia externa antes de culpar a linguagem.",
    },
  ],
}) satisfies LessonModule["interactions"];

export const debuggingNativoContent: LessonContent = {
  id: "debugging-nativo",
  title: "Debugging Nativo: perf, strace, gdb/dlv",
  subtitle:
    "Depuracao nativa boa escolhe a ferramenta pela camada do sintoma: perf para hotspots, strace para syscalls, gdb e Delve para estado e causalidade.",
  description:
    "Aula avancada sobre debugging nativo em Linux com foco em triagem de sintomas, uso de perf, strace, GDB e Delve, custos de instrumentacao, stacks, watchpoints, goroutines e escolha de ferramenta por camada do problema.",
  primaryCategoryId: "computacao",
  secondaryCategoryId: "engenharia",
  level: "Avançado",
  estimatedTime: "55-70 min",
  tags: ["perf", "strace", "gdb", "dlv", "Debugging", "Linux"],
  learningObjectives: [
    "Escolher perf, strace, gdb ou dlv com base no sintoma e na camada do problema.",
    "Distinguir profiling por sampling de tracing de syscalls e de inspeccao interativa de estado.",
    "Usar stacks, breakpoints, backtraces e watchpoints como ferramentas de causalidade.",
    "Reconhecer o custo de intrusao das ferramentas e interpretar medições com esse custo em mente.",
    "Montar uma sequencia de investigacao que sai do sintoma e chega a uma hipotese testavel.",
  ],
  prerequisites: [
    "Ajuda ter visto flamegraphs e profiling, syscalls e observabilidade de sistemas.",
    "Noções de processos, threads e, no caso de Go, goroutines ajudam bastante.",
    "Nao e necessario ser especialista em assembly; a aula fica no nivel de escolha e leitura operacional.",
  ],
  references: [
    ref(
      "perf(1)",
      "Linux man-pages / man7.org",
      "https://www.man7.org/linux/man-pages/man1/perf.1.html",
      "Manual consolidado das subcommands do perf para profiling, tracing e contadores.",
    ),
    ref(
      "perf wiki",
      "perf wiki",
      "https://perfwiki.github.io/main/",
      "Ponto de entrada util para o ecossistema perf e seus modos de uso.",
    ),
    ref(
      "strace(1)",
      "Linux man-pages / man7.org",
      "https://www.man7.org/linux/man-pages/man1/strace.1.html",
      "Manual oficial do strace para tracing de syscalls e sinais.",
    ),
    ref(
      "Debugging with GDB",
      "GNU GDB Manual",
      "https://sourceware.org/gdb/current/onlinedocs/gdb",
      "Manual oficial do GDB cobrindo breakpoints, watchpoints, stack e fluxo de depuracao.",
    ),
    ref(
      "Backtraces",
      "GNU GDB Manual",
      "https://sourceware.org/gdb/current/onlinedocs/gdb.html/Backtrace.html",
      "Secao oficial sobre backtraces, inclusive em programas multithreaded.",
    ),
    ref(
      "Using Delve",
      "go-delve/delve",
      "https://github.com/go-delve/delve/blob/master/Documentation/usage/README.md",
      "Documentacao de uso do Delve para debug, attach, test, core e modo headless.",
    ),
  ],
  heroVisual: "lesson-hero",
  openingText:
    "Ferramentas nativas sao poderosas justamente porque ficam perto do processo real. O risco e usa-las como martelos indistintos. Perf responde 'onde o tempo foi gasto?'. Strace pergunta 'o que o processo pediu ao kernel?'. GDB e Delve perguntam 'onde estou, quem me chamou e quem mudou este estado?'. Quando voce acerta essa primeira pergunta, o debug deixa de ser passeio tecnico e vira reducao disciplinada de incerteza.",
  quickFacts: [
    {
      title: "Sampling e diferente de tracing",
      body: "Uma ferramenta pode mostrar hotspots sem contar todos os eventos; outra pode detalhar cada syscall ao custo de mais intrusao.",
    },
    {
      title: "Stack conta historia",
      body: "Backtrace e o resumo causal de como o programa chegou ao ponto atual.",
    },
    {
      title: "Watchpoint e causalidade",
      body: "Quando voce nao sabe quem alterou um valor, observar a mudanca pode ser mais forte do que adivinhar um ponto de parada.",
    },
    {
      title: "A ferramenta tambem perturba",
      body: "Interpretar uma coleta exige lembrar o custo que a propria observacao introduziu.",
    },
  ],
  sections: [
    s(
      "motivacao",
      "Motivacao",
      "Debugging nativo comeca por triagem, nao por comandos decorados",
      "A habilidade central nao e lembrar todas as flags, e saber qual camada da maquina esta respondendo a pergunta errada ou sofrendo a maior dor.",
      "lesson-hero",
      undefined,
      [
        "Um processo pode estar lento porque esta queimando CPU, porque esta bloqueado em syscall, porque ficou preso em lock, porque perdeu progresso logico ou porque outra dependencia atrasou todo o fluxo. Ferramentas diferentes recortam esse espaco de formas diferentes.",
        "Quando o time pula direto para um debugger ou para um tracer detalhado sem classificar o sintoma, ele tende a recolher uma quantidade enorme de detalhes pouco uteis.",
        "O objetivo da aula e montar uma escada simples: classificar o sintoma, escolher a ferramenta com intrusao adequada, descer para o estado apenas quando necessario e encerrar com uma hipotese verificavel.",
      ],
      [
        block(
          "definition",
          "Triagem",
          "Etapa inicial de classificar o tipo de problema antes de escolher a instrumentacao.",
        ),
      ],
    ),
    s(
      "sintoma-para-ferramenta",
      "Mapa",
      "Cada ferramenta enxerga uma camada diferente do problema",
      "A regra de ouro e casar a pergunta com o instrumento mais barato que ainda responde bem a ela.",
      "concept-grid",
      undefined,
      [
        "Se a pergunta e onde a CPU foi gasta, perf costuma ser o primeiro passo natural. Se a pergunta e quais syscalls estao acontecendo, com que erro ou bloqueio, strace entra na frente. Se a pergunta e quem alterou tal variavel ou qual stack trouxe o programa ate aqui, GDB ou Delve dominam.",
        "Isso nao significa que as ferramentas competem entre si. Na verdade, elas frequentemente compoem uma investigacao: perf mostra o hotspot, strace mostra a dependencia do kernel, e o debugger fecha a causalidade interna.",
        "Pensar por camadas impede um erro classico: interpretar ausencia de CPU como ausencia de problema, quando o processo pode estar em espera profunda em outra parte do sistema.",
      ],
      [
        block(
          "insight",
          "Ferramenta boa elimina metade do espaco de busca",
          "O primeiro instrumento ideal nao precisa dar toda a resposta; ele precisa reduzir drasticamente a incerteza.",
        ),
      ],
    ),
    s(
      "perf",
      "Profiling",
      "Use perf quando a pergunta principal e sobre tempo de CPU, hotspots e comportamento de execucao",
      "Sampling revela quais stacks aparecem repetidamente quando o processo esta consumindo trabalho.",
      "pipeline-diagram",
      "pipeline-lab",
      [
        "Perf se encaixa muito bem quando o processo esta ativo e a duvida e para onde o tempo foi. Contadores, stat, record e report permitem uma leitura gradual: primeiro magnitude, depois funcao ou stack dominante, depois detalhes.",
        "A vantagem desse caminho e a baixa necessidade inicial de interatividade. Em vez de pausar e explorar manualmente, voce observa o que se repete no comportamento do programa durante a carga.",
        "Isso nao elimina a necessidade de contexto. Um hotspot no topo da stack pode ser o local do gasto, mas nao necessariamente a origem arquitetural do problema. Perf ajuda a localizar o onde; outras ferramentas e o proprio desenho do sistema ajudam a fechar o por que.",
      ],
      [
        block(
          "definition",
          "Sampling",
          "Tecnica de observacao baseada em amostras periodicas ou orientadas a eventos, sem registrar cada operacao individual.",
        ),
        block(
          "example",
          "Bom uso",
          "Descobrir se o custo dominante esta em serializacao, hashing, alocacao, copia, criptografia ou lock contention.",
        ),
      ],
    ),
    s(
      "strace",
      "Kernel boundary",
      "Use strace quando a fronteira com o kernel e parte central da historia",
      "Syscalls contam o que o processo pediu ao sistema: abrir, ler, escrever, esperar, conectar, dormir, falhar.",
      "tradeoff-spectrum",
      "tradeoff-lab",
      [
        "Strace intercepta e registra syscalls e sinais, o que o torna excelente para entender bloqueios em read, write, futex, connect, accept, epoll e muitos outros pontos da fronteira com o kernel.",
        "Ele e particularmente util quando a aplicacao parece parada, quando erros de arquivo ou rede nao estao claros, ou quando voce suspeita que o processo passa mais tempo esperando do que executando logica util.",
        "Ao mesmo tempo, e importante lembrar que tracing detalhado tem custo. A propria literatura de performance em Linux alerta que esse tipo de instrumentacao pode perturbar o alvo; portanto, duracoes observadas durante o trace precisam ser interpretadas com cuidado.",
      ],
      [
        block(
          "definition",
          "Syscall tracing",
          "Observacao de chamadas ao kernel, seus argumentos, retornos e sinais associados.",
        ),
        block(
          "mistake",
          "Erro comum",
          "Tratar os tempos vistos no trace como verdade absoluta sem considerar a intrusao do proprio mecanismo de observacao.",
        ),
      ],
    ),
    s(
      "gdb",
      "Estado e stack",
      "GDB responde perguntas causais sobre C, C++ e programas nativos em geral",
      "Quando voce precisa parar, examinar stack, frames, variaveis e breakpoints, um debugger de estado passa a ser o instrumento certo.",
      undefined,
      undefined,
      [
        "Backtraces resumem como o programa chegou ao ponto atual. Breakpoints respondem 'pare aqui'. Watchpoints respondem 'pare quando isso mudar'. Em bugs intermitentes, esse trio e incrivelmente poderoso.",
        "O manual do GDB tambem reforca o papel de threads: em programas concorrentes, um backtrace de todas as threads frequentemente revela quem segura o lock, quem espera e quem continua avançando.",
        "A intuicao importante e que debugger serve menos para 'andar linha por linha ate cansar' e mais para montar perguntas cirurgicas: em que frame estou, com quais argumentos, com que variaveis, e o que alterou este valor antes do ponto de falha.",
      ],
      [
        block(
          "definition",
          "Watchpoint",
          "Ponto de parada disparado quando o valor de uma expressao e alterado, permitindo descobrir quem modificou um estado.",
        ),
        block(
          "insight",
          "Stack e compressao de causalidade",
          "Uma boa leitura de frames reduz horas de especulacao sobre fluxo de execucao.",
        ),
      ],
    ),
    s(
      "delve",
      "Go runtime",
      "Delve fala melhor a lingua operacional de programas Go",
      "Em servicos Go, poder inspecionar goroutines, attach, execucao de testes e estados ligados ao runtime encurta bastante a investigacao.",
      undefined,
      undefined,
      [
        "Delve oferece modos como debug, test, exec, attach e core, alem de operacao headless para integracao com clientes externos. Isso ja mostra que ele foi pensado para diferentes estilos de diagnostico dentro do ecossistema Go.",
        "A grande vantagem conceitual do Delve nao e so 'ser um debugger para Go', mas alinhar melhor a conversa de depuracao ao modelo da linguagem e do runtime.",
        "Em outras palavras, quando o problema envolve goroutines, estados de teste, attach a um processo Go ou inspecao integrada a ferramentas do ecossistema, Delve tende a dar mais contexto util com menos friccao do que uma abordagem genericamente nativa.",
      ],
      [
        block(
          "example",
          "Quando usar",
          "Travamento em goroutine, comportamento anomalo em testes ou necessidade de attach a um servico Go em execucao.",
        ),
      ],
    ),
    s(
      "combinando",
      "Metodo",
      "Investigacoes fortes costumam combinar ferramentas em sequencia",
      "Raramente uma unica captura resolve tudo; o ganho vem de afunilar o problema com o instrumento certo a cada etapa.",
      undefined,
      undefined,
      [
        "Uma sequencia bastante saudavel e: logs e metricas para triagem, perf se ha custo de CPU, strace se o kernel parece central, debugger para fechar causalidade de estado. A ordem pode mudar, mas a ideia de afunilar permanece.",
        "Esse metodo evita dois extremos. O primeiro e o culto a uma unica ferramenta. O segundo e o turismo tecnico de abrir varias ferramentas ao mesmo tempo sem uma hipotese de continuidade entre elas.",
        "Quando voce chega ao debugger depois de um recorte mais preciso, cada minuto la dentro passa a render muito mais porque o espaco de busca ja encolheu.",
      ],
      [
        block(
          "insight",
          "A melhor ferramenta do momento nao e a ultima ferramenta da investigacao",
          "Ela e a proxima ferramenta que mais reduz incerteza com o menor custo razoavel.",
        ),
      ],
    ),
    s(
      "producao",
      "Operacao",
      "Em producao, simbolos, permissao e intrusao entram no calculo",
      "Debugging nativo em ambiente real exige disciplina adicional porque o proprio diagnostico pode competir com a estabilidade do servico.",
      "impact-board",
      undefined,
      [
        "Quanto mais proximo da producao, mais voce precisa pensar em simbolos disponiveis, permissoes, overhead, impacto em latencia e risco de travar ou degradar ainda mais o processo investigado.",
        "Isso favorece uma estrategia incremental: primeiro capturas menos intrusivas, depois aprofundamento local ou em replica, e por fim uso de debugger quando a relacao risco-beneficio justificar.",
        "O resultado maduro e um playbook: em vez de improvisar ferramentas no calor da incidente, o time ja sabe qual camada observar primeiro em cada tipo de sintoma.",
      ],
      [
        block(
          "mistake",
          "Erro comum",
          "Anexar uma ferramenta profunda em um servico critico sem antes perguntar se uma observacao mais barata resolveria 80% da duvida.",
        ),
      ],
    ),
    s(
      "armadilhas",
      "Armadilhas",
      "Os piores erros surgem quando a ferramenta vira identidade",
      "Ferramentas sao modelos parciais da realidade; confundir o mapa com o territorio produz conclusoes apressadas.",
      undefined,
      undefined,
      [
        "Um flamegraph nao prova sozinho que voce entendeu o problema. Um trace de syscall nao explica sozinho o desenho errado do protocolo. Um backtrace tambem nao diz, por si, por que aquele estado ficou invalido.",
        "Outra armadilha comum e medir apenas sob a instrumentacao que ja alterou o sistema. Isso vale principalmente para tracers mais pesados ou para stepping interativo.",
        "Por fim, ha o erro de parar na primeira explicacao plausivel. Debugging nativo forte fecha o ciclo com experimento ou alteracao minima que valida a hipotese encontrada.",
      ],
      [
        block(
          "mistake",
          "Primeira historia bonita",
          "Aceitar a primeira narrativa coerente antes de validá-la com outra fonte de evidencia ou com uma mudanca controlada.",
        ),
      ],
    ),
    s(
      "decisoes-de-projeto",
      "Pratica",
      "Escolha o caso e veja a ferramenta inicial mais promissora",
      "A madureza nao esta em decorar todos os comandos, mas em casar sintoma, camada e custo de observacao.",
      undefined,
      "scenario-lab",
      [
        "Os cenarios abaixo foram escolhidos para reforcar uma habilidade: saber qual instrumento abre a porta mais informativa com o menor custo no contexto atual.",
        "Depois da primeira ferramenta, o passo seguinte quase sempre depende do que ela revelar. Esse encadeamento e o que faz a investigacao deixar de ser aleatoria.",
      ],
      [
        block(
          "definition",
          "Regra pratica",
          "comece pelo menor instrumento que responde a primeira pergunta real do caso; aprofunde so quando o recorte atual ficar insuficiente",
        ),
      ],
    ),
    s(
      "quiz-revisao",
      "Revisao",
      "Quiz de revisao",
      "Verifique se voce consegue associar sintomas a ferramentas sem cair no piloto automatico.",
      undefined,
      "quiz",
      ["As perguntas abaixo consolidam metodo, nao apenas nomenclatura."],
      [],
    ),
    s(
      "glossario",
      "Glossario",
      "Termos essenciais",
      "Revise o vocabulario que organiza uma sessao de debugging nativo guiada por evidencia.",
      undefined,
      "glossary",
      ["Esses termos reaparecem em troubleshooting, performance e resposta a incidentes."],
      [],
    ),
  ],
  summaryCards: [
    {
      title: "Sintoma antes de ferramenta",
      body: "A camada do problema define o instrumento mais promissor.",
    },
    {
      title: "Perf para hotspots",
      body: "Quando a duvida e onde a CPU foi gasta, sampling e um primeiro corte forte.",
    },
    {
      title: "Strace para fronteira com kernel",
      body: "Syscalls e sinais revelam bloqueios, erros e esperas invisiveis em nivel mais alto.",
    },
    {
      title: "GDB e Delve para causalidade",
      body: "Stacks, variaveis, breakpoints e watchpoints ajudam a fechar o como chegamos aqui.",
    },
    {
      title: "A observacao tem custo",
      body: "Interprete traces e debugging interativo lembrando a intrusao introduzida.",
    },
    {
      title: "Investigacao e sequencia",
      body: "Ferramentas diferentes se complementam quando cada uma reduz a incerteza certa.",
    },
  ],
  quiz: [
    q(
      "q1",
      "Qual e a melhor primeira pergunta antes de abrir uma ferramenta nativa?",
      "O processo esta queimando CPU, esperando kernel, travando estado ou falhando em logica?",
      "Qual ferramenta eu lembro de usar melhor?",
      "Qual comando fica mais bonito no terminal?",
      "a",
      "Triagem por sintoma evita abrir o instrumento errado cedo demais.",
    ),
    q(
      "q2",
      "Quando perf tende a ser a melhor primeira ferramenta?",
      "Quando a duvida principal e onde o tempo de CPU esta sendo gasto.",
      "Quando voce precisa descobrir quem mudou uma variavel especifica.",
      "Quando quer listar todos os arquivos abertos do processo com causalidade completa.",
      "a",
      "Perf recorta hotspots e stacks quentes com boa relacao entre informacao e intrusao.",
    ),
    q(
      "q3",
      "Qual pergunta strace responde melhor?",
      "Quais syscalls o processo esta fazendo, com que argumentos, retornos ou bloqueios.",
      "Quais funcoes internas sao mais quentes na CPU em toda a stack de usuario.",
      "Qual goroutine esta segurando um lock no runtime Go com contexto de alto nivel.",
      "a",
      "Strace ilumina a fronteira com o kernel e os sinais associados.",
    ),
    q(
      "q4",
      "Para que watchpoints sao especialmente uteis?",
      "Para descobrir quem alterou um valor ou expressao quando voce nao sabe o ponto exato da escrita.",
      "Para medir banda de rede sustentada.",
      "Para substituir qualquer benchmark.",
      "a",
      "Watchpoints ajudam a capturar causalidade de mutacao de estado.",
    ),
    q(
      "q5",
      "Qual e um risco importante ao usar strace?",
      "O proprio tracing pode perturbar o comportamento e os tempos do alvo.",
      "A compilacao do programa passa a falhar automaticamente.",
      "O kernel deixa de registrar syscalls.",
      "a",
      "Traces detalhados tem custo e isso precisa entrar na interpretacao.",
    ),
    q(
      "q6",
      "Quando Delve faz mais sentido?",
      "Quando o programa e Go e a investigacao precisa de contexto de runtime, goroutines ou modos de debug do ecossistema Go.",
      "Quando o alvo e um firmware sem simbolos.",
      "Apenas quando perf nao existe no sistema.",
      "a",
      "Delve conversa melhor com o modelo operacional de programas Go.",
    ),
    q(
      "q7",
      "Qual frase descreve melhor uma investigacao madura?",
      "Ela combina ferramentas em sequencia, cada uma reduzindo a incerteza certa com custo razoavel.",
      "Ela usa sempre a ferramenta mais detalhada desde o primeiro minuto.",
      "Ela evita qualquer interacao com o processo para nao correr riscos.",
      "a",
      "O bom metodo e incremental e orientado por pergunta.",
    ),
    q(
      "q8",
      "Qual resumo representa melhor a aula?",
      "Debugging nativo forte e escolher a ferramenta pela camada do sintoma e fechar a analise com hipotese testavel.",
      "Ferramentas nativas servem apenas para experts em assembly.",
      "Basta aprender um comando de cada ferramenta para depurar qualquer sistema.",
      "a",
      "O foco esta em metodo, intrusao e causalidade.",
    ),
  ],
  glossary: [
    g("Sampling", "Observacao baseada em amostras, usada para inferir hotspots e comportamento frequente."),
    g("Syscall", "Chamada pela qual um processo pede servico ao kernel."),
    g("Backtrace", "Resumo da pilha de chamadas que levou ao ponto atual de execucao."),
    g("Breakpoint", "Ponto de parada configurado para interromper a execucao em um local ou condicao."),
    g("Watchpoint", "Ponto de parada disparado quando uma expressao e alterada."),
    g("Frame", "Contexto de uma funcao ativa na pilha de chamadas."),
    g("Attach", "Acao de conectar um debugger a um processo ja em execucao."),
    g("Core dump", "Captura do estado de memoria e execucao de um processo no momento de falha."),
    g("Hotspot", "Trecho que concentra grande parte do custo ou tempo observado."),
    g("Tracing", "Registro detalhado de eventos individuais ao longo da execucao."),
    g("Intrusao", "Grau em que a ferramenta de observacao altera o comportamento do sistema observado."),
    g("Goroutine", "Unidade leve de concorrencia gerenciada pelo runtime Go."),
  ],
};

export const performanceEmProducaoVisuals = createComputacaoVisuals({
  title: "Performance em Producao",
  subtitle:
    "Em producao, performance e compromisso com o usuario, custo para o negocio e disciplina para detectar regressao antes que ela vire incidente.",
  level: "Avançado",
  tags: ["SLO", "Capacity", "Regression", "Observability", "SRE", "Trade-offs"],
  conceptNodes: ["usuario", "orcamento", "capacidade", "negocio"],
  pipelineSteps: [
    "definir promessa",
    "medir SLI",
    "detectar regressao",
    "proteger capacidade",
  ],
  leftLabel: "metricas internas bonitas",
  rightLabel: "promessa real ao usuario",
  impactRows: [
    {
      label: "Pergunta central",
      value: "qual experiencia do usuario estamos prometendo e quanto custa mantê-la",
    },
    {
      label: "Risco comum",
      value: "melhorar media enquanto piores casos e deploy regressivo escapam sem alarme",
    },
    {
      label: "Primeiro fundamento",
      value: "SLO antes de tuning: sem promessa clara, toda discussao de performance vira gosto pessoal",
    },
    {
      label: "Eixo de projeto",
      value: "latencia, confiabilidade e custo versus pressao de entrega e crescimento",
    },
  ],
}) satisfies LessonModule["visuals"];

export const performanceEmProducaoInteractions = createComputacaoInteractions({
  title: "Performance em Producao",
  pipelineSteps: [
    {
      name: "Definir a promessa",
      summary:
        "Tudo comeca ao explicitar qual experiencia importa: disponibilidade, latencia, throughput util ou alguma combinacao orientada ao usuario.",
      signal: "SLI escolhido",
      risk: "otimizar metrica irrelevante",
      takeaway:
        "Sem promessa explicita, qualquer numero bonito pode parecer sucesso.",
    },
    {
      name: "Instrumentar e comparar",
      summary:
        "Coletar sinais consistentes por release, dependencia, rota e percentil permite enxergar regressao antes que ela vire crise aberta.",
      signal: "baseline confiavel",
      risk: "cegueira por media",
      takeaway:
        "Metrica isolada sem contexto temporal ou comparativo raramente protege producao.",
    },
    {
      name: "Planejar capacidade",
      summary:
        "Crescimento organico, campanhas, falhas de dependencia e autoscaling lento pedem margem e testes de carga reais.",
      signal: "headroom",
      risk: "trabalhar colado no limite",
      takeaway:
        "Capacidade e parte da confiabilidade, nao um detalhe de custo para depois.",
    },
    {
      name: "Decidir trade-offs de negocio",
      summary:
        "Quando o custo de reduzir latencia entra em choque com simplicidade, time-to-market ou gasto operacional, a decisao precisa ser consciente.",
      signal: "custo por melhoria",
      risk: "teatro de performance",
      takeaway:
        "Nem toda melhora tecnica justifica o preco total do sistema e da equipe.",
    },
  ],
  leftLabel: "velocidade de entrega",
  rightLabel: "margem de confiabilidade",
  tradeoffSummary:
    "Performance em producao e menos sobre provar talento em microbenchmarks e mais sobre sustentar uma promessa ao usuario ao longo de releases, picos de carga e falhas parciais. Melhorar latencia, reduzir custo, manter capacidade de crescimento e preservar simplicidade quase sempre competem entre si. O trabalho maduro e tornar esse conflito explicito e observavel.",
  tradeoffRisks: [
    "Correr para entregar sem guardrails suficientes faz regressao e overload aparecerem tarde demais.",
    "Um equilibrio saudavel combina SLO claro, comparacoes por release e margem de capacidade razoavel.",
    "Mais investimento em performance pode liberar produto, receita ou confiabilidade quando ataca um gargalo realmente importante.",
    "Blindar tudo ao maximo pode custar caro, aumentar complexidade e atrasar evolucao sem retorno proporcional.",
  ],
  practiceRule:
    "trate performance de producao como promessa ao usuario mais custo total do sistema; use SLO, baseline e capacidade como guardrails de decisao",
  scenarios: [
    {
      name: "Campanha de marketing",
      situation:
        "O produto espera um aumento abrupto de trafego em poucos dias e o autoscaling nao reage instantaneamente em todas as dependencias.",
      choice:
        "Revise SLO, execute testes de carga, garanta headroom e planeje degradacao graciosa antes do evento.",
      why:
        "Capacidade em producao inclui tanto carga nominal quanto comportamento durante picos e falhas.",
      caution:
        "Nao planeje so o frontend; dependencias internas e bancos tambem precisam absorver o crescimento.",
    },
    {
      name: "Deploy aparentemente inocente",
      situation:
        "Uma mudanca pequena passa em testes funcionais, mas aumenta discretamente latencia e uso de CPU em uma rota critica.",
      choice:
        "Compare por release com baseline e acione rollback ou investigacao antes que o efeito se some em horario de pico.",
      why:
        "Regressoes pequenas escapam facilmente sem comparacao disciplinada por versao e percentil.",
      caution:
        "Nao espere reclamações de usuario para chamar algo de regressao; producao precisa de guardrails preemptivos.",
    },
    {
      name: "Reducao de custo com risco",
      situation:
        "Existe pressao para reduzir infraestrutura, mas a folga atual protege failover, variacao de carga e piores percentis.",
      choice:
        "Transforme a conversa em capacidade, SLO e risco de degradacao, nao em 'servidores a menos'.",
      why:
        "Custo e importante, mas cortar headroom mexe diretamente na margem de confiabilidade e recuperacao.",
      caution:
        "Otimizacao de custo sem modelar picos, retries e falhas parciais pode apenas deslocar o gasto para incidentes.",
    },
  ],
}) satisfies LessonModule["interactions"];

export const performanceEmProducaoContent: LessonContent = {
  id: "performance-em-producao",
  title: "Performance em Producao",
  subtitle:
    "A pergunta central deixa de ser 'quanto meu codigo correu no meu notebook' e vira 'que experiencia sustentamos em producao, a que custo e sob qual margem de seguranca'.",
  description:
    "Aula avancada sobre performance em producao com foco em SLI, SLO, percentis, regressao por release, capacity planning, overload, degradacao graciosa, observabilidade e trade-offs entre custo, confiabilidade e velocidade de entrega.",
  primaryCategoryId: "computacao",
  secondaryCategoryId: "engenharia",
  level: "Avançado",
  estimatedTime: "55-70 min",
  tags: ["SLO", "SRE", "Capacity Planning", "Regression", "Observability", "Latency"],
  learningObjectives: [
    "Definir performance de producao em termos de promessa ao usuario, nao apenas de metrica tecnica isolada.",
    "Relacionar SLI, SLO e percentis a decisoes de tuning e priorizacao.",
    "Detectar regressao por release com baseline comparavel e sinais adequados.",
    "Entender capacidade como parte da confiabilidade e planejar headroom para crescimento e falha.",
    "Tornar explicitos os trade-offs entre custo, simplicidade, confiabilidade e velocidade de entrega.",
  ],
  prerequisites: [
    "Ajuda ter estudado observabilidade, latencia vs throughput e medir antes de otimizar.",
    "Familiaridade basica com deploy, dashboards e metricas de servicos torna os exemplos mais concretos.",
    "A aula se conecta fortemente a engenharia de sistemas e praticas de SRE.",
  ],
  references: [
    ref(
      "Service Level Objectives",
      "Google SRE Book",
      "https://sre.google/sre-book/service-level-objectives/",
      "Capitulo fundamental para entender a relacao entre promessa ao usuario e metas operacionais.",
    ),
    ref(
      "Monitoring Distributed Systems",
      "Google SRE Book",
      "https://sre.google/sre-book/monitoring-distributed-systems/",
      "Base solida para sinais de monitoracao, percentis e deteccao orientada a servico.",
    ),
    ref(
      "Handling Overload",
      "Google SRE Book",
      "https://sre.google/sre-book/handling-overload/",
      "Discute degradacao, shedding, throttling e limites de capacidade sob sobrecarga.",
    ),
    ref(
      "Service Best Practices",
      "Google SRE Book",
      "https://sre.google/sre-book/service-best-practices/",
      "Reune orientacoes sobre SLO, planejamento de capacidade e comportamento sob falhas e crescimento.",
    ),
    ref(
      "Managing Load",
      "Google SRE Workbook",
      "https://sre.google/workbook/managing-load/",
      "Material pratico sobre autoscaling, folga, load balancing e protecao contra gargalos.",
    ),
    ref(
      "Implementing Service Level Objectives",
      "Google SRE Workbook",
      "https://sre.google/workbook/implementing-slos/",
      "Aprofunda a definicao pratica de SLI/SLO e mostra como error budgets entram na priorizacao do trabalho.",
    ),
    ref(
      "Error Budget Policy",
      "Google SRE Workbook",
      "https://sre.google/workbook/error-budget-policy/",
      "Exemplo oficial de como transformar SLO em regra operacional para releases e foco em confiabilidade.",
    ),
    ref(
      "SRE Best Practices for Capacity Management",
      "Google SRE / USENIX ;login:",
      "https://sre.google/static/pdf/login_winter20_10_torres.pdf",
      "Texto focado em capacidade, previsao de demanda e relacao entre recursos e capacidade de servico.",
    ),
  ],
  heroVisual: "lesson-hero",
  openingText:
    "Fora do laboratorio, performance vira uma disciplina de promessas. O usuario nao compra seu p50; ele sente atrasos, timeouts, erros e comportamentos imprevisiveis em piores casos. O negocio tambem nao compra sua microbenchmark; ele sente custo, capacidade limitada em lancamentos, incidentes apos deploy e regressao acumulada release apos release. Esta aula junta esses dois lados: a experiencia do usuario e a economia operacional do sistema.",
  quickFacts: [
    {
      title: "Sem SLO, toda discussao fica solta",
      body: "Voce precisa de uma promessa explicita para saber se uma regressao importa e quanto vale corrigi-la.",
    },
    {
      title: "Media bonita pode esconder dor",
      body: "Percentis e comportamento de cauda sao decisivos em sistemas interativos.",
    },
    {
      title: "Capacidade e confiabilidade",
      body: "Rodar colado no limite diminui a folga para picos, failover e deploys problemáticos.",
    },
    {
      title: "Performance compete com outras metas",
      body: "Tempo de entrega, simplicidade e custo tambem entram na decisao.",
    },
  ],
  sections: [
    s(
      "motivacao",
      "Motivacao",
      "Performance de producao e um contrato com usuario e negocio",
      "A pergunta certa nao e apenas quao rapido o codigo roda em isolamento, e sim se o servico sustenta a experiencia prometida nas condicoes reais de operacao.",
      "lesson-hero",
      undefined,
      [
        "Em producao, cada melhoria ou regressao precisa ser interpretada a luz do que o usuario percebe e do que o negocio precisa sustentar. Um ganho em benchmark pode ser irrelevante se nao mexe no caminho critico. Uma regressao pequena pode ser gravissima se afeta uma rota com alta receita ou um percentil ja apertado.",
        "Isso muda o papel da engenharia de performance. Em vez de caçar numero bonito por si so, o time passa a defender um contrato: disponibilidade, latencia, throughput util e custo aceitavel.",
        "Essa mudanca de perspectiva ajuda a decidir melhor onde investir. Nem todo ponto lento merece o mesmo esforco; o contexto de produto e operacao filtra prioridades.",
      ],
      [
        block(
          "definition",
          "Performance em producao",
          "Capacidade de um servico sustentar a experiencia prometida ao usuario, com custo e margem operacional compatíveis.",
        ),
      ],
    ),
    s(
      "sli-slo",
      "Promessa",
      "SLI e SLO transformam percepcao difusa em compromisso observavel",
      "Quando o sistema promete algo mensuravel, regressao e prioridade deixam de ser opiniao pura.",
      "concept-grid",
      undefined,
      [
        "Um SLI e o sinal observado que representa uma faceta importante da experiencia do servico. Um SLO define a meta ou limite desejado para esse sinal ao longo de uma janela. Juntos, eles conectam telemetria a compromisso.",
        "O passo operacional seguinte e o error budget: a margem explicita de falha aceitavel derivada do SLO e usada para decidir quando o time pode seguir mudando com conforto e quando precisa frear para recuperar confiabilidade.",
        "Na pratica, isso protege o time de tres armadilhas. A primeira e otimizar metricas internas que o usuario nao sente. A segunda e tratar qualquer oscilacao tecnica como crise, mesmo quando ela nao fere a promessa relevante. A terceira e ter um SLO bonito no dashboard sem politica clara de reacao quando a margem se esgota.",
      ],
      [
        block(
          "definition",
          "SLO",
          "Meta operacional que define quao bom o servico precisa ser para honrar a promessa ao usuario.",
        ),
        block(
          "insight",
          "SLO sem error budget vira painel, nao politica",
          "Voce pode observar variacao, mas sem margem explicitada e resposta combinada fica dificil decidir quando priorizar confiabilidade sobre novas mudancas.",
        ),
      ],
    ),
    s(
      "percentis",
      "Medicao",
      "Percentis e orcamento de latencia contam uma historia melhor do que medias sozinhas",
      "O comportamento de cauda e onde muitos sistemas interativos realmente doem.",
      "pipeline-diagram",
      "pipeline-lab",
      [
        "A media pode cair enquanto o p99 sobe. Isso acontece quando a maioria dos requests melhora um pouco, mas uma minoria sofre muito mais. Para o usuario que caiu nessa minoria, a experiencia piorou bastante.",
        "Pensar em orcamento de latencia ajuda a decompor a promessa por etapas: balanceador, aplicacao, banco, cache, dependencia externa. Assim, quando uma rota estoura, o time sabe onde cada parte consumiu o credito disponivel.",
        "Esse modelo tambem favorece negociacao entre equipes. Em vez de discutir 'a API esta lenta', voce passa a discutir quem gastou quanto do orcamento e por que.",
      ],
      [
        block(
          "example",
          "Orcamento de latencia",
          "Se uma jornada critica precisa caber em certo prazo, cada componente deveria conhecer a fatia que pode gastar sem comprometer o total.",
        ),
      ],
    ),
    s(
      "regressao",
      "Mudanca",
      "Regressao em producao precisa ser vista por release, nao so por valor absoluto",
      "Sem comparar versao com versao, degradacoes pequenas se acumulam ate virarem um sistema mais caro e mais lento sem alarme claro.",
      "tradeoff-spectrum",
      "tradeoff-lab",
      [
        "Muitas regressões nao aparecem como um desastre imediato. Elas surgem como aumentos discretos de CPU, memoria, latencia ou fila depois de um deploy aparentemente pequeno.",
        "Por isso, guardrails por release importam tanto: baseline historico, comparacao entre versoes, canary, rollback rapido e dashboards orientados a diferenca, nao apenas ao valor atual.",
        "Esse habito reduz o risco de normalizar uma degradacao. Quando o time so olha o valor absoluto, e facil aceitar um novo patamar pior sem perceber que ele foi introduzido por mudancas recentes.",
      ],
      [
        block(
          "definition",
          "Regressao",
          "Piora observavel de uma metrica ou experiencia relevante apos uma mudanca de software, configuracao ou ambiente.",
        ),
        block(
          "mistake",
          "Erro comum",
          "Esperar ticket de usuario para classificar uma degradacao como regressao importante.",
        ),
      ],
    ),
    s(
      "capacidade",
      "Capacity planning",
      "Capacidade e a parte da confiabilidade que antecipa o futuro",
      "Planejar capacidade e garantir que o servico suporta crescimento, picos e falhas sem violar a promessa principal.",
      undefined,
      undefined,
      [
        "O material de SRE enfatiza que planejamento de capacidade precisa incluir crescimento organico, crescimento por eventos de negocio e margem para redundancia e falhas. Isso ja mostra que capacidade nao e um calculo unico de maquinas por segundo.",
        "Tambem e importante ligar capacidade bruta a capacidade de servico. Nao basta saber quantos pods existem; e preciso saber quantas requisicoes por segundo ou quantas jornadas de usuario cabem com latencia aceitavel.",
        "Sem testes de carga e sem modelos de headroom, o time trabalha perto demais do limite. Nesse estado, qualquer deploy, falha regional ou pico promocional vira risco de ruptura da promessa.",
      ],
      [
        block(
          "insight",
          "Capacidade sem folga e confiabilidade sem amortecedor",
          "Nao existe failover elegante quando todos os componentes ja vivem colados no teto.",
        ),
      ],
    ),
    s(
      "overload",
      "Protecao",
      "Overload pede degradacao graciosa, nao heroismo tardio",
      "Quando a demanda passa a capacidade, o sistema precisa escolher como ficar pior de forma previsivel.",
      undefined,
      undefined,
      [
        "O livro de SRE insiste em um ponto central: servicos saudaveis devem continuar a entregar algo razoavel sob sobrecarga, mesmo que com funcionalidade reduzida ou shedding de parte do trafego.",
        "Isso desloca a conversa de 'como evitar qualquer erro' para 'como falhar melhor quando o limite chega'. Fila com limites, timeouts dinamicos, throttling e resultados degradados entram exatamente ai.",
        "A pior estrategia costuma ser aceitar tudo ate colapsar. Nesse modelo, retries, filas e saturacao se multiplicam ao mesmo tempo e transformam um excesso de carga em falha cascata.",
      ],
      [
        block(
          "definition",
          "Degradacao graciosa",
          "Reducao controlada de qualidade ou funcionalidade para preservar a parte mais importante do servico sob stress.",
        ),
        block(
          "example",
          "Escolha de negocio",
          "Em sobrecarga, talvez seja melhor servir um resultado parcial rapidamente do que deixar todos esperarem por uma resposta completa tarde demais.",
        ),
      ],
    ),
    s(
      "observabilidade-e-ownership",
      "Operacao",
      "Observabilidade boa conecta rota, dependencia, release e equipe dona",
      "Sem ownership claro, a performance vira um problema de todos e de ninguem.",
      undefined,
      undefined,
      [
        "Uma metrica agregada do servico inteiro ajuda pouco quando a dor esta concentrada em uma rota, numa dependencia ou num tipo especifico de cliente. Em producao, granularidade correta importa.",
        "Tambem importa saber quem decide. Quando CPU sobe, fila cresce e p99 piora, qual equipe consegue agir? Sem esse enlace entre telemetria e dono, a detectabilidade nao se converte em resposta.",
        "Performance em producao, portanto, depende tanto de instrumentacao quanto de governanca operacional. Um bom dashboard sem caminho de acao vira apenas decoracao cara.",
      ],
      [
        block(
          "insight",
          "Observabilidade sem decisor e meio sistema",
          "O dado precisa apontar para uma acao possivel e para um time capaz de executa-la.",
        ),
      ],
    ),
    s(
      "tradeoffs-negocio",
      "Decisao",
      "Cada melhoria de performance compete com simplicidade, custo e velocidade de entrega",
      "A excelencia esta em tornar esse conflito explicito, nao em fingir que ele nao existe.",
      undefined,
      undefined,
      [
        "Algumas melhoras valem muito porque desbloqueiam receita, reduzem churn ou evitam incidentes em escala. Outras custam caro, aumentam complexidade e mal aparecem no que o usuario sente.",
        "Esse calculo tambem vale ao contrario: cortar custo demais pode corroer folga operacional e transformar qualquer pico em crise. Reduzir latencia a qualquer preco pode atrasar produto ou multiplicar complexidade sem retorno.",
        "O papel da engenharia madura e quantificar o melhor possivel essas trocas: o que ganhamos, o que pagamos e qual risco operacional aceitamos ao escolher um lado do eixo.",
      ],
      [
        block(
          "mistake",
          "Teatro de performance",
          "Investir em otimização porque ela parece sofisticada, sem ligá-la a SLO, custo ou valor de negocio.",
        ),
      ],
    ),
    s(
      "decisoes-de-projeto",
      "Pratica",
      "Escolha o cenario e observe a primeira prioridade operacional",
      "Os cenarios abaixo forcam a leitura combinada de promessa, capacidade, regressao e custo.",
      undefined,
      "scenario-lab",
      [
        "Cada caso muda a acao inicial porque muda a combinacao entre risco de usuario, margem de capacidade e urgencia de negocio.",
        "A boa resposta raramente e apenas 'otimize o codigo'. Quase sempre envolve observabilidade, protecao operacional e alguma decisao explicita de trade-off.",
      ],
      [
        block(
          "definition",
          "Regra pratica",
          "comece pela promessa ao usuario, compare com a baseline da release e so entao escolha o tuning ou a protecao operacional adequada",
        ),
      ],
    ),
    s(
      "impacto",
      "Checklist",
      "O que um sistema maduro de performance em producao costuma ter",
      "Mais do que ferramentas isoladas, importa a presenca de guardrails coerentes ao redor do servico.",
      "impact-board",
      undefined,
      [
        "SLO claro, politica de error budget, dashboards por percentil e rota, comparacao por release, capacidade planejada, playbook de overload e ownership definido formam um conjunto dificil de substituir por talento individual.",
        "Sem esse conjunto, a equipe pode ate corrigir um gargalo especifico, mas continua cega para o proximo. Com ele, performance deixa de ser campanha pontual e vira capacidade operacional permanente.",
        "Esse e o nivel de maturidade que separa times que apenas reagem a lentidao de times que constroem servicos previsiveis sob mudanca constante.",
      ],
      [
        block(
          "insight",
          "Guardrails valem mais do que heroismo",
          "A consistencia operacional de detectar cedo e reagir bem costuma gerar mais valor do que uma grande otimização isolada.",
        ),
      ],
    ),
    s(
      "quiz-revisao",
      "Revisao",
      "Quiz de revisao",
      "Verifique se o modelo de SLO, regressao, capacidade e trade-off de negocio ficou integrado.",
      undefined,
      "quiz",
      ["As perguntas consolidam o raciocinio de producao, nao apenas definicoes."],
      [],
    ),
    s(
      "glossario",
      "Glossario",
      "Termos essenciais",
      "Feche a aula com o vocabulario minimo para conversar sobre performance de producao com clareza.",
      undefined,
      "glossary",
      ["Esses termos reaparecem em incidentes, planejamento, reviews e definicao de roadmaps."],
      [],
    ),
  ],
  summaryCards: [
    {
      title: "SLO com error budget da foco",
      body: "Sem promessa explicita e sem regra de reacao, toda degradacao parece opiniao e toda otimização parece virtude.",
    },
    {
      title: "Percentil protege UX",
      body: "Medias escondem parte relevante da dor em sistemas interativos.",
    },
    {
      title: "Regressao e historia temporal",
      body: "Comparar release com release detecta pioras antes de elas se normalizarem.",
    },
    {
      title: "Capacidade e confiabilidade",
      body: "Headroom e redundancia existem para absorver crescimento, failover e picos.",
    },
    {
      title: "Overload precisa de estrategia",
      body: "Degradacao graciosa e shedding sao melhores do que colapso tardio e difuso.",
    },
    {
      title: "Negocio entra no tuning",
      body: "Custo, simplicidade e velocidade de entrega tambem fazem parte da engenharia de performance.",
    },
  ],
  quiz: [
    q(
      "q1",
      "Qual frase descreve melhor a ideia de performance em producao?",
      "Sustentar uma promessa relevante ao usuario com custo e margem operacional aceitaveis.",
      "Maximizar o maior numero de benchmarks possivel.",
      "Reduzir CPU sempre que houver chance, independentemente do efeito no produto.",
      "a",
      "A aula liga performance a experiencia do usuario e economia operacional do sistema.",
    ),
    q(
      "q2",
      "Por que SLO sem error budget operacional fica incompleto?",
      "Porque falta um criterio claro para decidir quando continuar acelerando mudancas e quando priorizar confiabilidade.",
      "Porque elimina a necessidade de monitorar o sistema.",
      "Porque garante que nao havera regressao.",
      "a",
      "SLO define a promessa; o error budget ajuda a transformar essa promessa em politica de decisao.",
    ),
    q(
      "q3",
      "Qual e um problema de confiar apenas em media de latencia?",
      "Ela pode esconder piora severa nos piores casos enquanto a media parece aceitavel.",
      "Ela sempre exagera a dor do usuario.",
      "Ela substitui percentis em sistemas distribuidos.",
      "a",
      "Percentis mostram cauda, e a cauda importa bastante para UX.",
    ),
    q(
      "q4",
      "O que caracteriza uma regressao de performance em producao?",
      "Piora relevante apos mudanca de release, configuracao ou ambiente em um indicador importante.",
      "Qualquer mudanca visual no dashboard.",
      "Toda oscilacao natural de poucos segundos.",
      "a",
      "O conceito depende de comparacao com baseline e impacto em metrica significativa.",
    ),
    q(
      "q5",
      "Por que capacity planning entra nesta aula?",
      "Porque capacidade define quanta carga o servico suporta sem violar a promessa ao usuario.",
      "Porque planejamento de capacidade e um tema apenas financeiro.",
      "Porque so importa para bancos de dados.",
      "a",
      "Capacidade e parte da confiabilidade do servico.",
    ),
    q(
      "q6",
      "Qual estrategia e mais madura diante de overload?",
      "Degradar graciosamente, limitar filas e shedar carga quando necessario.",
      "Aceitar toda a carga ate o sistema cair por completo.",
      "Aumentar timeout de tudo indefinidamente.",
      "a",
      "A aula enfatiza falhar melhor em vez de colapsar tarde demais.",
    ),
    q(
      "q7",
      "Qual e um erro de governanca comum em performance?",
      "Ter metrica e dashboard sem ownership ou caminho claro de acao.",
      "Dividir indicadores por rota.",
      "Manter baseline por release.",
      "a",
      "Observabilidade so gera valor quando conecta dado a decisao e responsavel.",
    ),
    q(
      "q8",
      "Qual resumo melhor representa a aula?",
      "Performance em producao e gerir promessa, regressao, capacidade e trade-offs de negocio como um unico problema.",
      "Performance em producao e apenas reduzir tempo de resposta medio.",
      "Performance em producao pode ser tratada so depois que o produto crescer muito.",
      "a",
      "A aula integra monitoracao, capacidade e decisao de negocio num mesmo raciocinio.",
    ),
  ],
  glossary: [
    g("SLI", "Indicador observado que representa uma faceta relevante da experiencia do servico."),
    g("SLO", "Meta ou limite operacional definido para um ou mais SLIs."),
    g("Error budget", "Margem explicita de falha aceitavel derivada do SLO e usada para orientar risco, releases e prioridades de confiabilidade."),
    g("Percentil", "Valor abaixo do qual certa porcentagem das observacoes se encontra."),
    g("Baseline", "Referencia historica usada para comparar comportamento atual ou entre releases."),
    g("Regressao", "Piora relevante apos mudanca de software, configuracao ou ambiente."),
    g("Capacity planning", "Planejamento da capacidade futura necessaria para sustentar demanda e redundancia."),
    g("Headroom", "Folga operacional entre a carga atual e o limite pratico de capacidade."),
    g("Overload", "Estado em que a demanda ultrapassa a capacidade de atender sem degradacao inaceitavel."),
    g("Load shedding", "Recusa controlada de parte do trafego para proteger o restante do sistema."),
    g("Degradacao graciosa", "Reducao controlada de qualidade ou funcionalidade para preservar o essencial sob stress."),
    g("Canary", "Estrategia de liberar mudanca para uma pequena parcela antes de expandi-la ao todo."),
    g("Ownership", "Responsabilidade clara de uma equipe sobre indicadores, resposta e decisao operacional."),
  ],
};
