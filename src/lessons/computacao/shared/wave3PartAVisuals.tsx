import type { LessonModule } from "../../../types/content";

export type Wave3PartATopicId =
  | "turing-e-a-ideia-de-computacao"
  | "algoritmos-e-complexidade"
  | "estruturas-de-dados-essenciais"
  | "recursao-e-dividir-para-conquistar"
  | "dns-ip-tcp-http"
  | "tcp-vs-udp-latencia-confiabilidade"
  | "sistemas-distribuidos-fundamentos"
  | "cap-consistencia-disponibilidade";

type Tone = "violet" | "teal" | "indigo" | "amber" | "rose" | "emerald";

interface HeroCard {
  label: string;
  value: string;
}

interface MapNode {
  title: string;
  body: string;
}

interface StepItem {
  label: string;
  title: string;
  body: string;
}

interface CompareSide {
  title: string;
  bullets: string[];
}

interface VisualTopicConfig {
  tone: Tone;
  heroTitle: string;
  heroSubtitle: string;
  heroCards: HeroCard[];
  heroFooter: string;
  mapCenter: string;
  mapNodes: MapNode[];
  flowTitle: string;
  flowSteps: StepItem[];
  compareTitle: string;
  compareLeft: CompareSide;
  compareRight: CompareSide;
}

const visualConfigs: Record<Wave3PartATopicId, VisualTopicConfig> = {
  "turing-e-a-ideia-de-computacao": {
    tone: "violet",
    heroTitle: "Uma maquina imaginaria para medir o que e algoritmo",
    heroSubtitle:
      "A ideia central nao e hardware, mas um procedimento mecanico capaz de ler, escrever e decidir o proximo passo.",
    heroCards: [
      { label: "Modelo", value: "fita + estado + regra" },
      { label: "Virada", value: "algoritmo como processo formal" },
      { label: "Pergunta", value: "o que pode ser computado?" },
      { label: "Limite", value: "nem todo problema e decidivel" },
    ],
    heroFooter: "Computabilidade nao e sobre velocidade primeiro; e sobre possibilidade.",
    mapCenter: "Maquina de Turing",
    mapNodes: [
      { title: "Fita", body: "Memoria simbolica potencialmente expansivel." },
      { title: "Cabecote", body: "Le, escreve e se move uma casa por vez." },
      { title: "Estados", body: "Resumo minimo do contexto atual da execucao." },
      { title: "Tabela", body: "Regras locais que determinam a proxima acao." },
    ],
    flowTitle: "Da intuicao humana ao modelo formal",
    flowSteps: [
      { label: "1", title: "Receber entrada", body: "Codificar o problema em simbolos sobre a fita." },
      { label: "2", title: "Aplicar regra", body: "Olhar simbolo e estado atual para decidir o passo." },
      { label: "3", title: "Transformar", body: "Escrever, mover e trocar de estado repetidamente." },
      { label: "4", title: "Parar ou seguir", body: "Se houver regra final, a computacao termina; senao, continua." },
    ],
    compareTitle: "Dificil nao e o mesmo que impossivel",
    compareLeft: {
      title: "Problemas decidiveis",
      bullets: [
        "Existe um procedimento que sempre termina.",
        "Podem ser faceis ou impraticavelmente caros.",
        "Ordenacao e busca pertencem a esse grupo.",
      ],
    },
    compareRight: {
      title: "Problemas indecidiveis",
      bullets: [
        "Nao existe algoritmo geral que resolva todos os casos.",
        "Mais hardware nao elimina a barreira teorica.",
        "O problema da parada e o exemplo classico.",
      ],
    },
  },
  "algoritmos-e-complexidade": {
    tone: "teal",
    heroTitle: "O custo relevante e o que cresce com a entrada",
    heroSubtitle:
      "Big-O nao e um cronometro de laboratorio; e uma lente para entender como o trabalho escala.",
    heroCards: [
      { label: "Entrada", value: "n muda tudo" },
      { label: "Lente", value: "crescimento assintotico" },
      { label: "Nuance", value: "constantes ainda importam" },
      { label: "Objetivo", value: "comparar tendencias" },
    ],
    heroFooter: "Quando n cresce, a forma da curva comeca a dominar os detalhes locais.",
    mapCenter: "Complexidade",
    mapNodes: [
      { title: "Modelo de custo", body: "Que operacao estamos contando e por que ela representa trabalho?" },
      { title: "Casos", body: "Pior, medio e amortizado respondem perguntas diferentes." },
      { title: "Notacoes", body: "O, Theta e Omega descrevem limites, nao tempos exatos." },
      { title: "Contexto", body: "Dados reais, cache e paralelismo podem deslocar o vencedor pratico." },
    ],
    flowTitle: "Como raciocinamos sobre um algoritmo",
    flowSteps: [
      { label: "1", title: "Escolher n", body: "Definir o tamanho relevante da entrada." },
      { label: "2", title: "Contar operacoes", body: "Identificar a parte dominante do trabalho." },
      { label: "3", title: "Simplificar", body: "Ignorar constantes e termos menores para ver a tendencia." },
      { label: "4", title: "Comparar", body: "Usar a curva para discutir troca entre solucoes." },
    ],
    compareTitle: "Assintotica e pratica precisam conversar",
    compareLeft: {
      title: "O que Big-O captura bem",
      bullets: [
        "Como o custo cresce quando n aumenta.",
        "Quando uma abordagem nao escala.",
        "Qual familia de algoritmo deve ser investigada.",
      ],
    },
    compareRight: {
      title: "O que Big-O nao resolve sozinho",
      bullets: [
        "Constantes, vetorizacao e cache local.",
        "Distribuicao real dos dados de entrada.",
        "Custos de implementacao e manutencao.",
      ],
    },
  },
  "estruturas-de-dados-essenciais": {
    tone: "emerald",
    heroTitle: "Estrutura de dados e a forma que voce da ao problema",
    heroSubtitle:
      "Nao existe estrutura universalmente melhor: cada uma privilegia certas operacoes e sacrifica outras.",
    heroCards: [
      { label: "Pergunta", value: "quais operacoes dominam?" },
      { label: "Conflito", value: "acesso, ordem, atualizacao" },
      { label: "Efeito", value: "o desenho muda o algoritmo" },
      { label: "Regra", value: "invariantes trazem custo" },
    ],
    heroFooter: "Escolher a estrutura errada faz o algoritmo certo parecer ruim.",
    mapCenter: "Operacoes",
    mapNodes: [
      { title: "Array", body: "Acesso indexado excelente, insercoes no meio custosas." },
      { title: "Lista", body: "Edicao local facil, busca por posicao ruim." },
      { title: "Hash", body: "Associacao rapida, mas sem ordem natural." },
      { title: "Arvore/Grafo", body: "Organizam relacoes e consultas estruturadas." },
    ],
    flowTitle: "Do requisito a estrutura",
    flowSteps: [
      { label: "1", title: "Listar operacoes", body: "Ler, inserir, remover, percorrer, priorizar." },
      { label: "2", title: "Medir frequencia", body: "Quais operacoes acontecem o tempo todo?" },
      { label: "3", title: "Aceitar trade-offs", body: "Rapidez em um ponto cobra custo em outro." },
      { label: "4", title: "Manter invariantes", body: "Ordenacao, balanceamento e unicidade exigem trabalho." },
    ],
    compareTitle: "Estruturas sao ferramentas, nao medalhas",
    compareLeft: {
      title: "Quando simplificar",
      bullets: [
        "Arrays resolvem muito quando a ordem e estavel.",
        "Hash tables brilham em mapeamentos diretos.",
        "Pilhas e filas modelam fluxo com clareza.",
      ],
    },
    compareRight: {
      title: "Quando sofisticar",
      bullets: [
        "Arvores ajudam em buscas ordenadas e intervalos.",
        "Heaps priorizam o proximo elemento global.",
        "Grafos representam relacoes nao lineares.",
      ],
    },
  },
  "recursao-e-dividir-para-conquistar": {
    tone: "amber",
    heroTitle: "Resolver um problema reduzindo-o a copias menores dele mesmo",
    heroSubtitle:
      "Recursao e uma maneira de pensar; dividir para conquistar e uma estrategia para transformar essa ideia em ganho estrutural.",
    heroCards: [
      { label: "Base", value: "caso de parada" },
      { label: "Passo", value: "reduzir sem perder o sentido" },
      { label: "Forma", value: "arvore de chamadas" },
      { label: "Custo", value: "recorrencias contam a historia" },
    ],
    heroFooter: "Toda recursao boa sabe quando parar e como voltar com informacao util.",
    mapCenter: "Recursao",
    mapNodes: [
      { title: "Caso base", body: "A ancora que impede chamadas infinitas." },
      { title: "Subproblema", body: "Versao menor, mas estruturalmente parecida." },
      { title: "Pilhas", body: "Cada chamada guarda contexto para a volta." },
      { title: "Combinacao", body: "A etapa que reconstroi a resposta final." },
    ],
    flowTitle: "Dividir para conquistar em quatro movimentos",
    flowSteps: [
      { label: "1", title: "Dividir", body: "Quebrar a entrada em partes menores." },
      { label: "2", title: "Resolver", body: "Atacar cada parte recursivamente." },
      { label: "3", title: "Combinar", body: "Mesclar resultados num todo coerente." },
      { label: "4", title: "Analisar", body: "Entender profundidade, largura e trabalho por nivel." },
    ],
    compareTitle: "Recursao elegante pode ser barata ou carissima",
    compareLeft: {
      title: "Bom desenho recursivo",
      bullets: [
        "Reduz a entrada de forma garantida.",
        "Tem caso base claro e pequeno.",
        "Transforma a estrutura do problema em codigo legivel.",
      ],
    },
    compareRight: {
      title: "Maus desenhos recursivos",
      bullets: [
        "Repetem subproblemas inutilmente.",
        "Escondem crescimento exponencial.",
        "Estouram pilha ou memoria sem ganho conceitual.",
      ],
    },
  },
  "dns-ip-tcp-http": {
    tone: "indigo",
    heroTitle: "Um clique atravessa camadas que resolvem problemas diferentes",
    heroSubtitle:
      "DNS encontra nomes, IP roteia pacotes, TCP coordena o transporte e HTTP organiza o dialogo da aplicacao.",
    heroCards: [
      { label: "Nome", value: "DNS" },
      { label: "Endereco", value: "IP" },
      { label: "Fluxo", value: "TCP" },
      { label: "Semantica", value: "HTTP" },
    ],
    heroFooter: "Camadas servem para separar responsabilidades sem isolar consequencias.",
    mapCenter: "Do navegador ao servidor",
    mapNodes: [
      { title: "DNS", body: "Traduz nome humano em um endereco util para a rede." },
      { title: "IP", body: "Encaminha pacotes entre redes ate o destino." },
      { title: "TCP", body: "Entrega um fluxo confiavel e ordenado." },
      { title: "HTTP", body: "Define pedidos, respostas, metodos e significado." },
    ],
    flowTitle: "A jornada resumida de uma requisicao web",
    flowSteps: [
      { label: "1", title: "Resolver nome", body: "Descobrir qual endereco IP atende o dominio." },
      { label: "2", title: "Abrir transporte", body: "Estabelecer o canal confiavel ate o servidor." },
      { label: "3", title: "Enviar pedido", body: "Transmitir metodo, cabecalhos e caminho HTTP." },
      { label: "4", title: "Receber resposta", body: "Interpretar status, corpo e cabecalhos." },
    ],
    compareTitle: "Diagnostico melhora quando a camada certa e identificada",
    compareLeft: {
      title: "Sintomas de camadas baixas",
      bullets: [
        "Nome nao resolve ou IP nao responde.",
        "Roteamento, perda ou bloqueio impedem o alcance.",
        "O pedido HTTP nem chega a existir.",
      ],
    },
    compareRight: {
      title: "Sintomas de camadas altas",
      bullets: [
        "TCP conecta, mas o servidor devolve erro HTTP.",
        "Cabecalhos, cache e autenticacao entram em cena.",
        "O problema nao e conectividade pura, mas semantica.",
      ],
    },
  },
  "tcp-vs-udp-latencia-confiabilidade": {
    tone: "rose",
    heroTitle: "Confiabilidade tem custo, mas baixa latencia tambem tem sacrificios",
    heroSubtitle:
      "TCP e UDP oferecem servicos diferentes; a escolha correta depende daquilo que a aplicacao nao pode perder.",
    heroCards: [
      { label: "TCP", value: "fluxo ordenado e confiavel" },
      { label: "UDP", value: "datagramas sem garantias" },
      { label: "Tensao", value: "tempo x recuperacao" },
      { label: "Atualidade", value: "QUIC mistura as pecas" },
    ],
    heroFooter: "Nao existe protocolo rapido por essencia; existe servico adequado ao problema.",
    mapCenter: "Transporte",
    mapNodes: [
      { title: "Handshake", body: "TCP negocia antes; UDP envia imediatamente." },
      { title: "Ordenacao", body: "TCP entrega em ordem; UDP preserva datagramas, nao sequencia." },
      { title: "Recuperacao", body: "TCP retransmite e controla congestionamento." },
      { title: "Aplicacao", body: "Sobre UDP, a aplicacao pode assumir ou reimplementar garantias." },
    ],
    flowTitle: "Como o requisito da aplicacao puxa o protocolo",
    flowSteps: [
      { label: "1", title: "Definir perda aceitavel", body: "Uma perda invalida o resultado ou so envelhece o frame?" },
      { label: "2", title: "Definir ordem", body: "Mensagens atrasadas ainda valem ou atrapalham?" },
      { label: "3", title: "Definir ritmo", body: "Esperar retransmissao e melhor do que seguir em frente?" },
      { label: "4", title: "Escolher servico", body: "TCP, UDP ou QUIC conforme a combinacao de requisitos." },
    ],
    compareTitle: "Slogan curto demais gera decisao ruim",
    compareLeft: {
      title: "Onde TCP faz sentido",
      bullets: [
        "Downloads, APIs, bancos e conteudo que nao pode corromper.",
        "Fluxo confiavel simplifica a camada de aplicacao.",
        "Congestionamento e recuperacao ja vem embutidos.",
      ],
    },
    compareRight: {
      title: "Onde UDP faz sentido",
      bullets: [
        "Voz, video e interacao em tempo real toleram alguma perda.",
        "Datagramas independentes evitam espera por ordem global.",
        "QUIC mostra que confiabilidade tambem pode morar sobre UDP.",
      ],
    },
  },
  "sistemas-distribuidos-fundamentos": {
    tone: "teal",
    heroTitle: "Distribuir e trocar um computador por um conjunto de incertezas coordenadas",
    heroSubtitle:
      "Varios nos trazem escala e resiliencia, mas tambem falha parcial, relogios imperfeitos e custos de coordenacao.",
    heroCards: [
      { label: "Falha", value: "parcial, nao total" },
      { label: "Tempo", value: "latencia e incerteza" },
      { label: "Estado", value: "replicar exige acordo" },
      { label: "Meta", value: "parecer um sistema coerente" },
    ],
    heroFooter: "O desafio nao e apenas fazer funcionar; e fazer parecer previsivel apesar da rede.",
    mapCenter: "Sistema distribuido",
    mapNodes: [
      { title: "Nos", body: "Cada maquina enxerga so uma parte do todo." },
      { title: "Mensagens", body: "Comunicar custa tempo e pode falhar silenciosamente." },
      { title: "Replicas", body: "Copias aumentam disponibilidade, mas pedem coordenacao." },
      { title: "Consenso", body: "Algoritmos tentam manter uma historia compartilhada." },
    ],
    flowTitle: "O caminho de uma operacao distribuida",
    flowSteps: [
      { label: "1", title: "Receber comando", body: "Um cliente fala com um no ou um coordenador." },
      { label: "2", title: "Propagar", body: "Outros nos precisam aprender ou confirmar a mudanca." },
      { label: "3", title: "Ordenar", body: "A escrita deve entrar numa historia valida." },
      { label: "4", title: "Responder", body: "O sistema escolhe quando ja sabe o suficiente para responder." },
    ],
    compareTitle: "Escala e resiliencia aparecem junto com custos invisiveis",
    compareLeft: {
      title: "O que ganhamos",
      bullets: [
        "Capacidade horizontal e proximidade geografica.",
        "Resistencia a falhas isoladas de maquinas.",
        "Replicacao e servicos especializados por papel.",
      ],
    },
    compareRight: {
      title: "O que passamos a pagar",
      bullets: [
        "Latencia entre nos e filas de mensagens.",
        "Relogios divergentes e visoes incompletas do estado.",
        "Protocolos de coordenacao e recuperacao.",
      ],
    },
  },
  "cap-consistencia-disponibilidade": {
    tone: "amber",
    heroTitle: "CAP nao e um menu de tres itens; e um aviso sobre particoes",
    heroSubtitle:
      "A pergunta correta e o que seu sistema faz quando a rede se parte e as replicas deixam de se ouvir.",
    heroCards: [
      { label: "CAP", value: "C, A e P precisam de definicoes precisas" },
      { label: "Correcao", value: "P nao e opcional em rede real" },
      { label: "Nuance", value: "fora da particao entra PACELC" },
      { label: "Projeto", value: "consistencia depende da operacao" },
    ],
    heroFooter: "A caricatura do 'pick two' ensina rapido, mas ensina mal.",
    mapCenter: "Trade-offs de consistencia",
    mapNodes: [
      { title: "Consistencia", body: "Todos observam uma historia valida segundo o modelo escolhido." },
      { title: "Disponibilidade", body: "Cada no nao falho responde, mesmo sem a ultima escrita." },
      { title: "Particao", body: "Mensagens podem atrasar ou sumir entre partes da rede." },
      { title: "Latencia", body: "Mesmo sem particao, coordenar replicas custa tempo." },
    ],
    flowTitle: "Como pensar CAP de forma moderna",
    flowSteps: [
      { label: "1", title: "Definir o modelo", body: "Linearizavel, eventual, serializavel ou outro alvo." },
      { label: "2", title: "Perguntar sobre particao", body: "O sistema bloqueia, atende degradado ou diverge temporariamente?" },
      { label: "3", title: "Perguntar sobre o normal", body: "Sem falha, coordenar mais significa mais latencia?" },
      { label: "4", title: "Escolher por operacao", body: "Nem toda leitura e escrita precisa do mesmo rigor." },
    ],
    compareTitle: "CAP e PACELC respondem perguntas diferentes",
    compareLeft: {
      title: "Durante particao",
      bullets: [
        "A tensao principal e consistencia versus disponibilidade.",
        "Sistemas CP podem recusar pedidos para evitar divergencia.",
        "Sistemas AP podem responder com dados potencialmente defasados.",
      ],
    },
    compareRight: {
      title: "Sem particao",
      bullets: [
        "PACELC destaca latencia versus consistencia.",
        "Coordenacao entre replicas ainda custa round-trips.",
        "Projetos modernos combinam niveis por caso de uso.",
      ],
    },
  },
};

const toneStyles: Record<Tone, { border: string; bg: string; accent: string; soft: string }> = {
  violet: { border: "border-violet-200", bg: "bg-violet-50", accent: "#7c3aed", soft: "#ede9fe" },
  teal: { border: "border-teal-200", bg: "bg-teal-50", accent: "#0f766e", soft: "#ccfbf1" },
  indigo: { border: "border-indigo-200", bg: "bg-indigo-50", accent: "#4f46e5", soft: "#e0e7ff" },
  amber: { border: "border-amber-200", bg: "bg-amber-50", accent: "#b45309", soft: "#fef3c7" },
  rose: { border: "border-rose-200", bg: "bg-rose-50", accent: "#e11d48", soft: "#ffe4e6" },
  emerald: { border: "border-emerald-200", bg: "bg-emerald-50", accent: "#059669", soft: "#d1fae5" },
};

export function createWave3PartAVisuals(topicId: Wave3PartATopicId) {
  const config = visualConfigs[topicId];
  return {
    hero: () => <HeroVisual config={config} />,
    "concept-map": () => <ConceptMapVisual config={config} />,
    flow: () => <FlowVisual config={config} />,
    compare: () => <CompareVisual config={config} />,
  } satisfies LessonModule["visuals"];
}

function HeroVisual({ config }: { config: VisualTopicConfig }) {
  const style = toneStyles[config.tone];
  return (
    <figure className={`overflow-hidden rounded-[2rem] border ${style.border} ${style.bg} p-4 shadow-xl shadow-slate-900/5`}>
      <svg className="w-full" viewBox="0 0 760 360" role="img" aria-label={config.heroTitle}>
        <rect width="760" height="360" rx="28" fill="white" />
        <rect x="18" y="18" width="724" height="324" rx="24" fill={style.soft} opacity="0.65" />
        <text x="380" y="56" textAnchor="middle" fill="#0f172a" fontSize="24" fontWeight="900">
          {config.heroTitle}
        </text>
        <text x="380" y="84" textAnchor="middle" fill="#475569" fontSize="13" fontWeight="700">
          {config.heroSubtitle}
        </text>
        {config.heroCards.map((card, index) => {
          const x = 50 + index * 170;
          return (
            <g key={card.label}>
              <rect x={x} y="120" width="150" height="118" rx="18" fill="white" stroke={style.accent} strokeWidth="2.5" />
              <text x={x + 75} y="155" textAnchor="middle" fill={style.accent} fontSize="12" fontWeight="900">
                {card.label.toUpperCase()}
              </text>
              <text x={x + 75} y="190" textAnchor="middle" fill="#0f172a" fontSize="16" fontWeight="900">
                {card.value}
              </text>
            </g>
          );
        })}
        <rect x="90" y="270" width="580" height="48" rx="18" fill="white" stroke={style.accent} strokeWidth="2" />
        <text x="380" y="300" textAnchor="middle" fill="#0f172a" fontSize="15" fontWeight="800">
          {config.heroFooter}
        </text>
      </svg>
    </figure>
  );
}

function ConceptMapVisual({ config }: { config: VisualTopicConfig }) {
  const style = toneStyles[config.tone];
  const positions = [
    { x: 130, y: 110 },
    { x: 490, y: 110 },
    { x: 130, y: 240 },
    { x: 490, y: 240 },
  ];

  return (
    <figure className={`rounded-[2rem] border ${style.border} ${style.bg} p-4 shadow-xl shadow-slate-900/5`}>
      <svg className="w-full" viewBox="0 0 760 380" role="img" aria-label={`Mapa conceitual de ${config.mapCenter}`}>
        <rect width="760" height="380" rx="28" fill="white" />
        <text x="380" y="48" textAnchor="middle" fill="#0f172a" fontSize="22" fontWeight="900">
          {config.mapCenter}
        </text>
        <circle cx="380" cy="190" r="70" fill={style.soft} stroke={style.accent} strokeWidth="3" />
        <text x="380" y="185" textAnchor="middle" fill={style.accent} fontSize="18" fontWeight="900">
          {config.mapCenter}
        </text>
        <text x="380" y="208" textAnchor="middle" fill="#475569" fontSize="12" fontWeight="700">
          ideia central
        </text>
        {config.mapNodes.map((node, index) => {
          const pos = positions[index];
          const centerX = pos.x + 70;
          const centerY = pos.y + 42;
          return (
            <g key={node.title}>
              <path d={`M380 190 L${centerX} ${centerY}`} stroke={style.accent} strokeWidth="2.5" opacity="0.35" />
              <rect x={pos.x} y={pos.y} width="140" height="84" rx="18" fill={style.soft} stroke={style.accent} strokeWidth="2" />
              <text x={centerX} y={pos.y + 28} textAnchor="middle" fill="#0f172a" fontSize="14" fontWeight="900">
                {node.title}
              </text>
              <text x={centerX} y={pos.y + 48} textAnchor="middle" fill="#475569" fontSize="11" fontWeight="700">
                {node.body}
              </text>
            </g>
          );
        })}
      </svg>
    </figure>
  );
}

function FlowVisual({ config }: { config: VisualTopicConfig }) {
  const style = toneStyles[config.tone];
  return (
    <figure className={`rounded-[2rem] border ${style.border} ${style.bg} p-4 shadow-xl shadow-slate-900/5`}>
      <svg className="w-full" viewBox="0 0 760 340" role="img" aria-label={config.flowTitle}>
        <rect width="760" height="340" rx="28" fill="white" />
        <text x="380" y="48" textAnchor="middle" fill="#0f172a" fontSize="22" fontWeight="900">
          {config.flowTitle}
        </text>
        {config.flowSteps.map((step, index) => {
          const x = 45 + index * 175;
          return (
            <g key={step.label}>
              <rect x={x} y="104" width="150" height="150" rx="22" fill={style.soft} stroke={style.accent} strokeWidth="2.5" />
              <circle cx={x + 28} cy="132" r="16" fill={style.accent} />
              <text x={x + 28} y="138" textAnchor="middle" fill="white" fontSize="12" fontWeight="900">
                {step.label}
              </text>
              <text x={x + 75} y="168" textAnchor="middle" fill="#0f172a" fontSize="14" fontWeight="900">
                {step.title}
              </text>
              <text x={x + 75} y="196" textAnchor="middle" fill="#475569" fontSize="11" fontWeight="700">
                {step.body}
              </text>
              {index < config.flowSteps.length - 1 ? (
                <>
                  <path d={`M${x + 150} 179 H${x + 170}`} stroke={style.accent} strokeWidth="4" strokeLinecap="round" />
                  <path d={`M${x + 167} 171 l8 8 l-8 8`} fill="none" stroke={style.accent} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                </>
              ) : null}
            </g>
          );
        })}
      </svg>
    </figure>
  );
}

function CompareVisual({ config }: { config: VisualTopicConfig }) {
  const style = toneStyles[config.tone];
  return (
    <figure className={`rounded-[2rem] border ${style.border} ${style.bg} p-4 shadow-xl shadow-slate-900/5`}>
      <svg className="w-full" viewBox="0 0 760 360" role="img" aria-label={config.compareTitle}>
        <rect width="760" height="360" rx="28" fill="white" />
        <text x="380" y="48" textAnchor="middle" fill="#0f172a" fontSize="22" fontWeight="900">
          {config.compareTitle}
        </text>
        <rect x="40" y="86" width="300" height="230" rx="22" fill={style.soft} stroke={style.accent} strokeWidth="2.5" />
        <rect x="420" y="86" width="300" height="230" rx="22" fill="#f8fafc" stroke="#94a3b8" strokeWidth="2.5" />
        <text x="190" y="124" textAnchor="middle" fill={style.accent} fontSize="16" fontWeight="900">
          {config.compareLeft.title}
        </text>
        <text x="570" y="124" textAnchor="middle" fill="#475569" fontSize="16" fontWeight="900">
          {config.compareRight.title}
        </text>
        {config.compareLeft.bullets.map((bullet, index) => (
          <g key={bullet}>
            <circle cx="74" cy={160 + index * 44} r="6" fill={style.accent} />
            <text x="92" y={165 + index * 44} fill="#0f172a" fontSize="12" fontWeight="700">
              {bullet}
            </text>
          </g>
        ))}
        {config.compareRight.bullets.map((bullet, index) => (
          <g key={bullet}>
            <circle cx="454" cy={160 + index * 44} r="6" fill="#64748b" />
            <text x="472" y={165 + index * 44} fill="#0f172a" fontSize="12" fontWeight="700">
              {bullet}
            </text>
          </g>
        ))}
      </svg>
    </figure>
  );
}
