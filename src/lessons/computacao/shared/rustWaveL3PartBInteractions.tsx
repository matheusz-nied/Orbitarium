import { useMemo, useState } from "react";
import type { JSX } from "react";
import {
  Boxes,
  Route,
  Scale,
  ShieldAlert,
  Waves,
} from "lucide-react";
import type { LessonModule } from "../../../types/content";
import {
  InteractiveShell,
  MetricCard,
} from "../../../components/lesson/InteractionPrimitives";
import type { RustL3PartBTopicId } from "./rustWaveL3PartBContent";

type Tone = "indigo" | "violet" | "teal" | "amber" | "rose" | "emerald";
type MetricPair = [string, string];

interface ModelOption {
  id: string;
  label: string;
  title: string;
  summary: string;
  bullets: string[];
  metrics: MetricPair[];
}

interface TradeoffOption {
  id: string;
  label: string;
  choice: string;
  benefit: string;
  cost: string;
  goodWhen: string[];
  watchOut: string;
}

interface ScenarioOption {
  id: string;
  label: string;
  context: string;
  recommendation: string;
  why: string[];
  watchOut: string;
}

interface ModelConfig {
  eyebrow: string;
  title: string;
  description: string;
  tone: Tone;
  icon: JSX.Element;
  options: ModelOption[];
}

interface TradeoffConfig {
  eyebrow: string;
  title: string;
  description: string;
  tone: Tone;
  icon: JSX.Element;
  options: TradeoffOption[];
}

interface ScenarioConfig {
  eyebrow: string;
  title: string;
  description: string;
  tone: Tone;
  icon: JSX.Element;
  options: ScenarioOption[];
}

const modelConfigs: Record<RustL3PartBTopicId, ModelConfig> = {
  "rust-concurrency-send-sync": {
    eyebrow: "Modelo",
    title: "Compare os contratos centrais da concorrência em Rust",
    description:
      "Escolha um conceito e veja qual pergunta de thread-safety ele responde no desenho do tipo.",
    tone: "indigo",
    icon: <Boxes size={18} aria-hidden="true" />,
    options: [
      {
        id: "send",
        label: "`Send`",
        title: "Mover ownership entre threads",
        summary:
          "`Send` responde se a posse de um valor pode ser transferida para outra thread sem quebrar segurança.",
        bullets: [
          "Importa para `spawn`, channels e handoff de trabalho.",
          "Não implica compartilhamento simultâneo.",
          "É a pergunta do 'novo dono' do valor.",
        ],
        metrics: [
          ["Pergunta", "posso mover?"],
          ["Forma", "ownership"],
          ["Exemplo", "valor enviado para worker"],
        ],
      },
      {
        id: "sync",
        label: "`Sync`",
        title: "Compartilhar referências entre threads",
        summary:
          "`Sync` responde se `&T` pode circular entre threads sem abrir espaço para comportamento indefinido.",
        bullets: [
          "Fala de compartilhamento por referência.",
          "Relaciona-se a aliasing e mutação segura.",
          "Não significa automaticamente 'rápido' ou 'lock-free'.",
        ],
        metrics: [
          ["Pergunta", "posso compartilhar?"],
          ["Forma", "referência"],
          ["Definição", "`&T` é `Send`"],
        ],
      },
      {
        id: "rc-vs-arc",
        label: "`Rc` × `Arc`",
        title: "Mesmo uso aparente, contratos diferentes",
        summary:
          "`Rc` serve para compartilhamento barato em uma thread; `Arc` usa contagem atômica para ownership compartilhado entre threads.",
        bullets: [
          "`Rc` não sincroniza refcount.",
          "`Arc` resolve refcount, não toda mutabilidade.",
          "Trocar um pelo outro muda custo e semântica.",
        ],
        metrics: [
          ["Single-thread", "`Rc`"],
          ["Multi-thread", "`Arc`"],
          ["Cuidado", "mutação continua separada"],
        ],
      },
      {
        id: "mutex-atomic",
        label: "Lock × atomic",
        title: "Sincronização segura não é uma única técnica",
        summary:
          "Quando existe estado compartilhado mutável, a pergunta seguinte vira como coordenar acesso: lock, atomic ou redesenho do ownership.",
        bullets: [
          "Locks simplificam invariantes compostas.",
          "Atomics servem melhor para estados menores e contratos mais estreitos.",
          "Particionar estado às vezes é melhor do que sincronizar tudo.",
        ],
        metrics: [
          ["Estado composto", "lock"],
          ["Estado pequeno", "atomic"],
          ["Melhor caso", "menos compartilhamento"],
        ],
      },
    ],
  },
  "rust-async-intuicao": {
    eyebrow: "Modelo",
    title: "Monte a unidade mínima de raciocínio do async",
    description:
      "Selecione um conceito e veja como ele participa do ciclo `poll` → `Pending` → wakeup → novo `poll`.",
    tone: "violet",
    icon: <Waves size={18} aria-hidden="true" />,
    options: [
      {
        id: "future",
        label: "Future",
        title: "A computação assíncrona em si",
        summary:
          "O future carrega o estado necessário para avançar a computação quando o executor o repolla.",
        bullets: [
          "É inerte até ser polled.",
          "Pode virar `Ready` ou `Pending`.",
          "Costuma ser uma state machine gerada pelo compilador.",
        ],
        metrics: [
          ["Forma", "objeto de estado"],
          ["Progresso", "`poll`"],
          ["Meta", "produzir `Output`"],
        ],
      },
      {
        id: "task",
        label: "Task",
        title: "A unidade que o executor agenda",
        summary:
          "Tasks embrulham futures de topo e permitem que o runtime saiba o que precisa voltar à fila.",
        bullets: [
          "É a unidade operacional do runtime.",
          "Pode coexistir com muitas outras tasks na mesma thread.",
          "Ajuda a ligar wakeup a um future específico.",
        ],
        metrics: [
          ["Agendamento", "executor"],
          ["Escala", "muitas por thread"],
          ["Vínculo", "future de topo"],
        ],
      },
      {
        id: "waker",
        label: "`Waker`",
        title: "O caminho de volta quando algo fica pronto",
        summary:
          "Se o future ainda não pode terminar, ele registra um `Waker` para avisar o executor quando houver progresso possível.",
        bullets: [
          "Evita polling cego de tudo.",
          "Aponta para a task certa.",
          "Precisa refletir o contexto atual correto.",
        ],
        metrics: [
          ["Função", "acordar task"],
          ["Momento", "após readiness"],
          ["Efeito", "novo `poll`"],
        ],
      },
      {
        id: "pin",
        label: "Pin",
        title: "Estabilidade para futures que não podem ser movidos",
        summary:
          "Pinning sustenta a correção de futures cujo layout interno ou referências dependem de estabilidade de endereço.",
        bullets: [
          "Aparece na assinatura real de `poll`.",
          "Conecta async a state machines concretas.",
          "Não é mero detalhe cosmético da API.",
        ],
        metrics: [
          ["Assinatura", "`Pin<&mut Self>`"],
          ["Risco evitado", "movimentação indevida"],
          ["Valor", "manter invariantes"],
        ],
      },
    ],
  },
  "rust-unsafe-boundaries": {
    eyebrow: "Modelo",
    title: "Compare formas diferentes de `unsafe`",
    description:
      "Troque o foco para ver quando `unsafe` declara um contrato e quando ele afirma que o contrato já foi checado.",
    tone: "amber",
    icon: <ShieldAlert size={18} aria-hidden="true" />,
    options: [
      {
        id: "unsafe-block",
        label: "`unsafe {}`",
        title: "Descarrega uma obrigação local",
        summary:
          "O bloco unsafe afirma: as precondições das operações aqui dentro foram verificadas neste ponto.",
        bullets: [
          "Idealmente pequeno e específico.",
          "Deve ter comentário de segurança quando necessário.",
          "Não desliga o resto das regras de Rust.",
        ],
        metrics: [
          ["Papel", "afirmar checagem"],
          ["Escopo", "local"],
          ["Meta", "prova pequena"],
        ],
      },
      {
        id: "unsafe-fn",
        label: "`unsafe fn`",
        title: "Declara obrigação para o chamador",
        summary:
          "Uma função unsafe sinaliza que seus tipos não expressam sozinhos todas as precondições da chamada.",
        bullets: [
          "Move parte do contrato para a borda do chamador.",
          "Precisa documentar precondições com clareza.",
          "Pode ser usada por FFI e APIs de baixo nível.",
        ],
        metrics: [
          ["Papel", "declarar contrato"],
          ["Destino", "callers"],
          ["Risco", "uso sem precondição"],
        ],
      },
      {
        id: "raw-ptr",
        label: "raw pointers",
        title: "Endereço cru exige justificativa de validade",
        summary:
          "Ponteiros crus são úteis para layout e interoperabilidade, mas sua validade, alinhamento e aliasing precisam ser sustentados externamente.",
        bullets: [
          "Não carregam as mesmas garantias de referências.",
          "Ajudam em coleções, FFI e buffers.",
          "Exigem prova manual para desreferenciação segura.",
        ],
        metrics: [
          ["Força", "baixo nível"],
          ["Contrato", "validade do ponteiro"],
          ["Perigo", "UB silencioso"],
        ],
      },
      {
        id: "unsafe-cell",
        label: "`UnsafeCell`",
        title: "Base da interior mutability controlada",
        summary:
          "`UnsafeCell` não é um bug; é a peça formal que permite abstrações de mutabilidade interna quando o contrato é reconstruído ao redor.",
        bullets: [
          "Aparece sob `Cell`, `RefCell`, mutexes e outras abstrações.",
          "Sozinha, não oferece sincronização nem prova de uso correto.",
          "Serve para separar representação interna de API segura.",
        ],
        metrics: [
          ["Papel", "base semântica"],
          ["Precisa de", "abstração ao redor"],
          ["Erro comum", "usar sem fronteira clara"],
        ],
      },
    ],
  },
  "rust-ffi-e-c": {
    eyebrow: "Modelo",
    title: "Troque a lente sobre a fronteira FFI",
    description:
      "Cada conceito abaixo resolve uma fonte diferente de ambiguidade ao cruzar Rust com C.",
    tone: "teal",
    icon: <Route size={18} aria-hidden="true" />,
    options: [
      {
        id: "abi",
        label: "ABI",
        title: "Concordar sobre chamada e representação binária",
        summary:
          "A ABI define como funções são chamadas e como dados atravessam a fronteira binária.",
        bullets: [
          "`extern \"C\"` é parte desse acordo.",
          "Sem ABI alinhada, a chamada já nasce quebrada.",
          "É diferente de soundness lógica do restante da API.",
        ],
        metrics: [
          ["Pergunta", "como chamar?"],
          ["Ferramenta", "`extern \"C\"`"],
          ["Risco", "incompatibilidade binária"],
        ],
      },
      {
        id: "layout",
        label: "layout",
        title: "Representação previsível para tipos expostos",
        summary:
          "Ao compartilhar structs, unions ou enums escolhidos com cuidado, layout previsível passa a ser parte explícita do contrato.",
        bullets: [
          "`repr(C)` ajuda a reduzir ambiguidade de layout, mas não torna qualquer tipo automaticamente apropriado para FFI.",
          "Nem todo tipo Rust é apropriado para atravessar a fronteira cruamente.",
          "Expor menos layout costuma simplificar o desenho.",
        ],
        metrics: [
          ["Pergunta", "como isso ocupa bytes?"],
          ["Ferramenta", "`repr(C)`"],
          ["Estratégia", "opacidade quando possível"],
        ],
      },
      {
        id: "ownership",
        label: "ownership",
        title: "Quem cria e quem destrói o recurso?",
        summary:
          "Grande parte dos bugs de FFI nasce de ownership mal documentado ou desalocação no lado errado.",
        bullets: [
          "Importa para handles, buffers e callbacks.",
          "Também define por quanto tempo o ponteiro é válido.",
          "Wrappers seguros tentam esclarecer cedo essa semântica.",
        ],
        metrics: [
          ["Pergunta", "quem libera?"],
          ["Forma", "empréstimo / posse"],
          ["Risco", "use-after-free"],
        ],
      },
      {
        id: "strings",
        label: "strings",
        title: "C e Rust tratam texto com contratos diferentes",
        summary:
          "`CString` e `CStr` ajudam a tornar explícita a diferença entre strings terminadas em NUL e os tipos idiomáticos de Rust.",
        bullets: [
          "Evita tratar `String` e `char*` como equivalentes mágicos.",
          "Conecta representação a validade e encoding.",
          "Muitos bugs surgem em fronteiras aparentemente triviais.",
        ],
        metrics: [
          ["Ferramentas", "`CString` / `CStr`"],
          ["Contrato", "NUL + validade"],
          ["Cuidado", "buffers e comprimentos"],
        ],
      },
    ],
  },
  "rust-tooling-cargo-perf": {
    eyebrow: "Modelo",
    title: "Escolha a ferramenta pela pergunta que você quer responder",
    description:
      "Troque a lente abaixo para ver como Cargo e perf tooling participam de etapas diferentes do mesmo workflow.",
    tone: "emerald",
    icon: <Scale size={18} aria-hidden="true" />,
    options: [
      {
        id: "check",
        label: "`cargo check`",
        title: "Feedback rápido no loop de edição",
        summary:
          "Excelente para validar estrutura e tipos cedo, sem esperar o mesmo caminho de build final de um artefato completo.",
        bullets: [
          "Favorece velocidade de iteração.",
          "Não substitui teste nem medição de performance.",
          "Ajuda a reduzir custo de experimentar refactors.",
        ],
        metrics: [
          ["Pergunta", "isso está consistente?"],
          ["Força", "rapidez"],
          ["Não responde", "hot path real"],
        ],
      },
      {
        id: "profiles",
        label: "profiles",
        title: "Build também é parte da medição",
        summary:
          "`dev`, `release`, `test` e `bench` mudam otimização, debuginfo, assertions e o tipo de conclusão que faz sentido tirar.",
        bullets: [
          "Não existe 'uma build neutra'.",
          "Medição de custo depende do perfil escolhido.",
          "`cargo bench` existe no stable, mas o `#[bench]` nativo continua nightly-only.",
          "Perfis customizados podem equilibrar iteração e realismo.",
        ],
        metrics: [
          ["Pergunta", "que binário estou vendo?"],
          ["Impacto", "otimização e debug"],
          ["Risco", "comparar mundos diferentes"],
        ],
      },
      {
        id: "tests",
        label: "tests",
        title: "Corretude e regressão comportamental",
        summary:
          "Testes existem para perguntar se o sistema continua correto, não se continua veloz.",
        bullets: [
          "Incluem unit, integration e doc tests.",
          "São base para otimizar sem quebrar semântica.",
          "Não substituem benchmark nem profile.",
        ],
        metrics: [
          ["Pergunta", "continua correto?"],
          ["Escopo", "comportamento"],
          ["Risco", "confundir com custo"],
        ],
      },
      {
        id: "profiling",
        label: "profiling",
        title: "Diagnosticar onde o tempo realmente vai",
        summary:
          "Profiling ajuda a localizar regiões quentes e a conectar regressão a stacks e símbolos legíveis.",
        bullets: [
          "Complementa benchmark em vez de substituí-lo.",
          "Depende de workload representativa.",
          "Fica melhor com debuginfo e stacks úteis.",
        ],
        metrics: [
          ["Pergunta", "onde está o hot path?"],
          ["Ferramentas", "perf / flamegraph"],
          ["Pré-requisito", "binário observável"],
        ],
      },
    ],
  },
};

const tradeoffConfigs: Record<RustL3PartBTopicId, TradeoffConfig> = {
  "rust-concurrency-send-sync": {
    eyebrow: "Trade-off",
    title: "Escolha a forma de coordenação pelo contrato, não pelo hype",
    description:
      "Cada opção abaixo resolve uma dor diferente de concorrência. Troque a estratégia e observe o custo dominante.",
    tone: "indigo",
    icon: <Scale size={18} aria-hidden="true" />,
    options: [
      {
        id: "channel",
        label: "channel + ownership",
        choice: "Mover dados para o próximo dono",
        benefit: "Raciocínio mais simples e menos estado compartilhado.",
        cost: "Cópias, filas e coordenação explícita entre produtores e consumidores.",
        goodWhen: [
          "Cada item de trabalho tem um dono claro.",
          "A mutação global pode ser evitada.",
          "Simplicidade vale mais que acesso compartilhado imediato.",
        ],
        watchOut: "Se todo mundo ainda depende do mesmo estado global, channel sozinho não resolve o desenho.",
      },
      {
        id: "arc-mutex",
        label: "`Arc<Mutex<T>>`",
        choice: "Compartilhar estado mutável com exclusão mútua",
        benefit: "Facilita invariantes compostas e dá uma fronteira clara de mutação.",
        cost: "Contenção, espera e risco de granularidade ruim do lock.",
        goodWhen: [
          "O estado é realmente compartilhado.",
          "As invariantes são mais importantes do que micro-otimizar acesso.",
          "O volume de disputa é aceitável.",
        ],
        watchOut: "Virar reflexo para qualquer estado compartilhado costuma esconder um modelo global demais.",
      },
      {
        id: "arc-rwlock",
        label: "`Arc<RwLock<T>>`",
        choice: "Otimizar para muitos leitores e poucos escritores",
        benefit: "Permite mais paralelismo de leitura quando o padrão realmente é read-heavy.",
        cost: "Semântica mais complexa e potencial de starvation dependendo do cenário.",
        goodWhen: [
          "Leituras dominam largamente.",
          "Escritas são raras e controladas.",
          "Vale a pena diferenciar leitor de escritor.",
        ],
        watchOut: "Se a carga real escreve mais do que se imaginava, a vantagem esperada pode evaporar.",
      },
      {
        id: "atomic",
        label: "atomic state",
        choice: "Representar estado pequeno com sincronização de baixo nível",
        benefit: "Baixa sobrecarga para flags, contadores e estados simples.",
        cost: "Contrato mental mais delicado e pouca ajuda para invariantes compostas.",
        goodWhen: [
          "O estado compartilhado é pequeno e bem definido.",
          "A semântica de leitura/escrita é estreita.",
          "Você realmente precisa desse nível de granularidade.",
        ],
        watchOut: "Atomics não transformam estruturas complexas em problemas simples; às vezes só deslocam dificuldade para o raciocínio.",
      },
    ],
  },
  "rust-async-intuicao": {
    eyebrow: "Trade-off",
    title: "Async ajuda em certos bounds e atrapalha em outros",
    description:
      "Troque o tipo de carga e observe quando a multiplexação de espera vale mais do que paralelismo explícito ou código síncrono direto.",
    tone: "violet",
    icon: <Scale size={18} aria-hidden="true" />,
    options: [
      {
        id: "many-sockets",
        label: "muitos sockets",
        choice: "Usar async para multiplexar muitas esperas",
        benefit: "Excelente densidade de conexões e reaproveitamento de threads.",
        cost: "Mais camadas conceituais: runtime, wakeups, backpressure e fronteiras bloqueantes.",
        goodWhen: [
          "A maior parte do tempo está em I/O.",
          "Há grande número de operações parcialmente ociosas.",
          "Latência de espera domina o custo por task.",
        ],
        watchOut: "Se um trecho bloqueante pesado entra no meio, o modelo inteiro sente o impacto.",
      },
      {
        id: "cpu-bound",
        label: "CPU-bound",
        choice: "Preferir paralelismo explícito ou trabalho bloqueante isolado",
        benefit: "Alinha a ferramenta ao recurso dominante: CPU.",
        cost: "Você perde parte da ergonomia uniforme de `.await` para tudo.",
        goodWhen: [
          "A computação ocupa o tempo todo, sem espera relevante.",
          "Escalar por núcleo importa mais do que multiplexar sockets.",
          "Há loops intensivos, hashing, parsing pesado ou compressão.",
        ],
        watchOut: "Envolver CPU-bound em `async` sem estratégia adicional frequentemente só adiciona complexidade.",
      },
      {
        id: "mixed",
        label: "carga mista",
        choice: "Usar async para orquestrar espera e outra técnica para o trecho pesado",
        benefit: "Combina boa orquestração com respeito ao bound dominante de cada etapa.",
        cost: "Exige fronteiras mais conscientes entre tasks, pools e filas.",
        goodWhen: [
          "Um serviço faz muito I/O, mas tem alguns passos caros de CPU.",
          "Há necessidade de controlar throughput por estágio.",
          "A arquitetura aceita dividir responsabilidades.",
        ],
        watchOut: "Sem limites e backpressure, a mistura pode só esconder gargalos em vez de resolvê-los.",
      },
      {
        id: "small-sync",
        label: "síncrono simples",
        choice: "Manter código direto quando a espera concorrente é pequena",
        benefit: "Menos overhead conceitual e operacional.",
        cost: "Escala pior quando o número de operações esperando cresce muito.",
        goodWhen: [
          "A aplicação tem baixo volume ou baixa concorrência.",
          "A clareza do fluxo importa mais do que densidade de I/O.",
          "O problema não justificou um runtime ainda.",
        ],
        watchOut: "Forçar async cedo demais pode transformar um programa simples em um quebra-cabeça desnecessário.",
      },
    ],
  },
  "rust-unsafe-boundaries": {
    eyebrow: "Trade-off",
    title: "Nem todo ganho justifica abrir uma fronteira unsafe maior",
    description:
      "Troque o cenário para comparar quando a redução de checagens ou o controle de layout compensa a carga extra de auditoria.",
    tone: "amber",
    icon: <Scale size={18} aria-hidden="true" />,
    options: [
      {
        id: "unchecked-index",
        label: "`get_unchecked`",
        choice: "Remover checagem de bounds em hot path controlado",
        benefit: "Pode evitar trabalho repetitivo em trechos extremamente quentes e já validados externamente.",
        cost: "O contrato vira responsabilidade explícita do autor e da abstração ao redor.",
        goodWhen: [
          "Há prova forte de que o índice é válido.",
          "O trecho foi medido e é realmente quente.",
          "A fronteira pode ser isolada e documentada.",
        ],
        watchOut: "Sem evidência de hot path e sem prova clara de validade, o custo de risco supera o ganho provável.",
      },
      {
        id: "manual-buffer",
        label: "buffer manual",
        choice: "Controlar inicialização ou layout com `MaybeUninit`",
        benefit: "Permite construir estruturas em etapas e evitar inicializações mentirosas.",
        cost: "Exige disciplina sobre estados parcialmente válidos e todos os caminhos de saída.",
        goodWhen: [
          "A construção gradual é parte real do design.",
          "A abstração precisa de controle fino de layout.",
          "Há revisão forte sobre estados intermediários.",
        ],
        watchOut: "Inicialização parcial mal rastreada tende a produzir bugs difíceis de reproduzir.",
      },
      {
        id: "unsafe-cell",
        label: "`UnsafeCell`",
        choice: "Fundar interior mutability controlada",
        benefit: "Permite implementar abstrações que referências comuns não modelam diretamente.",
        cost: "Toda a prova de aliasing e sincronização precisa ser reconstruída pela abstração.",
        goodWhen: [
          "Existe uma API de alto nível clara ao redor.",
          "A mutabilidade interna é requisito de projeto, não atalho.",
          "O contrato pode ser explicado em revisão.",
        ],
        watchOut: "Sem fronteira bem desenhada, `UnsafeCell` vira um buraco por onde invariantes escapam.",
      },
      {
        id: "ffi-core",
        label: "núcleo de FFI",
        choice: "Aceitar ponteiros crus para falar com outro runtime",
        benefit: "Viabiliza integração com APIs e bibliotecas externas.",
        cost: "Ownership, layout, nullability e unwinding saem do conforto do compilador.",
        goodWhen: [
          "A interoperabilidade é requisito real.",
          "A borda pode ser mantida pequena.",
          "Os contratos binários são conhecidos e documentados.",
        ],
        watchOut: "Quanto mais o restante do programa tocar a superfície crua, maior o risco de violação de contrato.",
      },
    ],
  },
  "rust-ffi-e-c": {
    eyebrow: "Trade-off",
    title: "A melhor fronteira FFI costuma sacrificar um pouco de 'transparência' para ganhar robustez",
    description:
      "Troque a escolha de design e observe como layout exposto, cópias e tooling mudam o perfil de risco.",
    tone: "teal",
    icon: <Scale size={18} aria-hidden="true" />,
    options: [
      {
        id: "opaque",
        label: "opaque handles",
        choice: "Esconder layout e expor um recurso por handle",
        benefit: "Ownership e destruição ficam mais controlados; menos layout vaza para fora.",
        cost: "A API externa fica menos 'natural' do que structs abertas por valor.",
        goodWhen: [
          "O estado interno é complexo ou mutável.",
          "Quer reduzir compatibilidade binária frágil.",
          "A vida útil do recurso precisa de destroy explícito.",
        ],
        watchOut: "Se o handle já nasce mal documentado, a opacidade só esconde a ambiguidade em vez de resolvê-la.",
      },
      {
        id: "reprc-struct",
        label: "struct exposta",
        choice: "Compartilhar layout diretamente com `repr(C)`",
        benefit: "Integração direta quando o contrato de dados é simples e estável.",
        cost: "Mais compromisso público com layout, alinhamento e evolução binária.",
        goodWhen: [
          "Os dados são simples e de longa estabilidade.",
          "O custo de wrappers extras não compensa.",
          "O layout é de fato parte da API pública.",
        ],
        watchOut: "Mudar um detalhe depois pode quebrar consumidores binários silenciosamente.",
      },
      {
        id: "copy-boundary",
        label: "copiar na fronteira",
        choice: "Converter cedo para tipos próprios de Rust",
        benefit: "Diminui lifetime confusa e reduz exposição do restante do código a ponteiros crus.",
        cost: "Há custo extra de cópia e transformação.",
        goodWhen: [
          "O dado não é gigantesco ou ultraquente.",
          "Clareza e robustez valem mais do que zero-copy na borda.",
          "A FFI é só um estágio do fluxo.",
        ],
        watchOut: "Buscar zero-copy sempre pode custar mais em complexidade do que economiza em prática.",
      },
      {
        id: "generated-bindings",
        label: "bindgen/cbindgen",
        choice: "Automatizar parte da sincronização entre código e headers",
        benefit: "Reduz erro manual e drift entre assinaturas reais e declaradas.",
        cost: "Adiciona tooling e decisões de geração ao workflow.",
        goodWhen: [
          "Headers mudam com frequência.",
          "A superfície é grande.",
          "A integração já depende de build scripts ou geração de código.",
        ],
        watchOut: "Automação ruim não substitui entendimento do contrato; ela só move o ponto de falha.",
      },
    ],
  },
  "rust-tooling-cargo-perf": {
    eyebrow: "Trade-off",
    title: "Velocidade de iteração e fidelidade de medição raramente vêm do mesmo botão",
    description:
      "Troque o foco abaixo para ver por que build, teste, benchmark e profile formam um equilíbrio, não um único modo ideal.",
    tone: "emerald",
    icon: <Scale size={18} aria-hidden="true" />,
    options: [
      {
        id: "fast-edit",
        label: "loop rápido",
        choice: "Priorizar `cargo check` e testes focados enquanto edita",
        benefit: "Reduz tempo entre ideia e evidência estrutural.",
        cost: "Não descreve custo final do binário otimizado.",
        goodWhen: [
          "Você ainda está refatorando ou explorando caminhos.",
          "O maior risco imediato é quebrar estrutura ou tipos.",
          "Medição fina ainda não é a pergunta principal.",
        ],
        watchOut: "Se a discussão já é sobre performance real, esse modo precisa dar lugar a builds mais representativas.",
      },
      {
        id: "release-like",
        label: "binário realista",
        choice: "Medir em perfil mais próximo do artefato otimizado",
        benefit: "Aumenta a validade de conclusões sobre custo observado.",
        cost: "Compilações e iteração podem ficar mais lentas.",
        goodWhen: [
          "A pergunta é de throughput, latência ou tamanho real.",
          "Há suspeita de regressão dependente de otimização.",
          "O resultado vai orientar decisão importante.",
        ],
        watchOut: "Medição realista sem workload realista ainda é evidência incompleta.",
      },
      {
        id: "benchmark",
        label: "benchmark controlado",
        choice: "Comparar alternativas sob carga conhecida",
        benefit: "Boa visão comparativa entre versões ou abordagens.",
        cost: "Pode mentir se a carga for artificial demais ou se o escopo for estreito demais.",
        goodWhen: [
          "Há hipótese comparativa clara.",
          "O workload é reproduzível.",
          "Você quer comparar A vs B com menos ruído.",
        ],
        watchOut: "Benchmark sem profiling explica pouco sobre causa e pode premiar otimização da parte errada.",
      },
      {
        id: "profile",
        label: "profile quente",
        choice: "Descobrir onde o tempo realmente foi gasto",
        benefit: "Direciona a investigação para stacks e funções dominantes.",
        cost: "Exige tooling, símbolos úteis e algum cuidado de coleta.",
        goodWhen: [
          "Já existe suspeita de gargalo real.",
          "É preciso priorizar otimizações.",
          "A equipe quer evidência mais diagnóstica que comparativa.",
        ],
        watchOut: "Sem símbolos decentes ou carga representativa, o profile pode ser difícil de interpretar.",
      },
    ],
  },
};

const scenarioConfigs: Record<RustL3PartBTopicId, ScenarioConfig> = {
  "rust-concurrency-send-sync": {
    eyebrow: "Cenário",
    title: "Qual modelo de acesso concorrente combina melhor com o caso?",
    description:
      "Selecione um cenário e compare a recomendação inicial com o contrato de ownership e compartilhamento envolvido.",
    tone: "indigo",
    icon: <Route size={18} aria-hidden="true" />,
    options: [
      {
        id: "worker-queue",
        label: "fila de jobs",
        context:
          "Vários workers processam unidades de trabalho independentes e cada item só precisa de um dono por vez.",
        recommendation: "Comece movendo ownership por channel em vez de compartilhar um grande estado mutável global.",
        why: [
          "Cada job já tem ciclo de vida próprio.",
          "Menos aliasing concorrente simplifica raciocínio.",
          "Mutação local por worker tende a ser mais previsível.",
        ],
        watchOut: "Se resultados intermediários ainda convergem para um gargalo compartilhado, o problema pode só ter mudado de lugar.",
      },
      {
        id: "read-mostly-config",
        label: "config quase estática",
        context:
          "Muitas threads precisam consultar um conjunto de configuração raramente alterado.",
        recommendation: "Considere `Arc<T>` para leitura compartilhada e reavalie se mutação frequente realmente existe.",
        why: [
          "Leitura compartilhada é o caso natural de `Sync`.",
          "Talvez não exista motivo para lock em cada acesso.",
          "Atualizações raras podem ser tratadas de forma separada.",
        ],
        watchOut: "Adicionar mutação 'só de vez em quando' sem repensar o contrato frequentemente complica a API toda.",
      },
      {
        id: "shared-counter",
        label: "contador global",
        context:
          "Muitas threads atualizam um estado pequeno e numérico com alta frequência.",
        recommendation: "Avalie atomic para estado realmente pequeno; se a semântica crescer, volte para lock ou partição.",
        why: [
          "Estados estreitos combinam melhor com atomics.",
          "Evita lock em operações simples.",
          "Mantém o contrato pequeno quando a métrica é modesta.",
        ],
        watchOut: "Se o 'contador' virar estrutura composta, continuar com atomic por reflexo só aumenta fragilidade.",
      },
      {
        id: "legacy-handle",
        label: "handle legado",
        context:
          "Um recurso vindo de FFI parece apontar para estado não documentado e talvez não thread-safe.",
        recommendation: "Presuma menos: não afirme `Send`/`Sync` sem prova forte e considere manter o handle preso a uma thread ou wrapper restrito.",
        why: [
          "Thread-safety não pode ser inferida da aparência do ponteiro.",
          "Outras camadas unsafe podem confiar no trait bound.",
          "É mais barato endurecer o wrapper do que depurar UB depois.",
        ],
        watchOut: "Tratar qualquer handle opaco como se fosse thread-safe por padrão é receita para bug raro e caro.",
      },
    ],
  },
  "rust-async-intuicao": {
    eyebrow: "Cenário",
    title: "Escolha o desenho mais coerente com o bound dominante",
    description:
      "Selecione um caso típico de serviço e observe quando async é a ferramenta principal e quando ele precisa de apoio.",
    tone: "violet",
    icon: <Route size={18} aria-hidden="true" />,
    options: [
      {
        id: "http-many-clients",
        label: "muitas conexões HTTP",
        context:
          "Um servidor mantém milhares de conexões abertas, a maioria esperando rede, timers e respostas externas.",
        recommendation: "Async tende a ser uma ótima base para multiplexar espera e manter muitas tasks leves por thread.",
        why: [
          "O workload é fortemente I/O-bound.",
          "Há muita ociosidade entre eventos prontos.",
          "Tasks podem avançar aos poucos conforme o runtime as acorda.",
        ],
        watchOut: "Chamadas bloqueantes ou CPU-bound pesadas dentro do handler ainda podem estrangular o runtime.",
      },
      {
        id: "image-pipeline",
        label: "pipeline de imagem",
        context:
          "O serviço recebe poucas requisições, mas cada uma executa transformação e compressão custosa em CPU.",
        recommendation: "Comece pensando em paralelismo explícito ou offload para trabalho bloqueante, não em `.await` como solução principal.",
        why: [
          "O gargalo dominante é CPU.",
          "A espera externa é pequena perto do cálculo.",
          "Executar isso como task async comum não cria mais núcleos.",
        ],
        watchOut: "Esconder CPU-bound em async sem limite de concorrência costuma piorar previsibilidade e throughput.",
      },
      {
        id: "api-plus-db",
        label: "API + banco",
        context:
          "Cada request consulta banco, chama outro serviço e ainda executa um passo moderado de transformação local.",
        recommendation: "Use async para a orquestração das esperas e trate o trecho CPU com limites ou offload se ele crescer demais.",
        why: [
          "Grande parte do tempo ainda está em I/O.",
          "A transformação local não precisa dominar a arquitetura inteira.",
          "O desenho pode combinar bem as duas naturezas de carga.",
        ],
        watchOut: "Se a parte local crescer sem observabilidade, o serviço pode parecer I/O-bound quando já não é mais.",
      },
      {
        id: "legacy-sync-lib",
        label: "biblioteca síncrona legada",
        context:
          "Você precisa integrar uma biblioteca que bloqueia por muito tempo e não oferece API orientada a readiness.",
        recommendation: "Desenhe explicitamente a fronteira com offload ou pool apropriado em vez de fingir que a biblioteca virou async por estar dentro de `async fn`.",
        why: [
          "A semântica bloqueante continua existindo.",
          "O runtime precisa ser protegido dessa espera longa.",
          "A integração fica mais honesta e previsível.",
        ],
        watchOut: "Simplesmente embrulhar a chamada em `.await` não muda o comportamento bloqueante do lado de dentro.",
      },
    ],
  },
  "rust-unsafe-boundaries": {
    eyebrow: "Cenário",
    title: "Onde vale erguer uma fronteira segura em volta do núcleo unsafe?",
    description:
      "Selecione um caso e observe qual parte deve ficar pequena, documentada e invisível para o restante do programa.",
    tone: "amber",
    icon: <Route size={18} aria-hidden="true" />,
    options: [
      {
        id: "hot-loop",
        label: "hot path indexado",
        context:
          "Um loop muito quente já validou limites antes e gasta tempo repetindo a mesma checagem em cada iteração.",
        recommendation: "Se a medição realmente justificar, concentre o `unsafe` num helper minúsculo com precondição explícita e API segura ao redor.",
        why: [
          "A fronteira pode ficar curta e local.",
          "A prova de validade pode ser documentada com clareza.",
          "O restante do código não precisa tocar no detalhe inseguro.",
        ],
        watchOut: "Sem profile e sem prova local forte, a troca vira risco gratuito por ganho incerto.",
      },
      {
        id: "ffi-wrapper",
        label: "wrapper de biblioteca C",
        context:
          "Uma crate precisa chamar funções externas com ponteiros crus e transformar o resultado em tipos idiomáticos.",
        recommendation: "Coloque a chamada unsafe o mais perto possível da borda e converta cedo para uma API segura com ownership explícito.",
        why: [
          "FFI já introduz incerteza suficiente.",
          "A API interna ganha clareza se a superfície crua some cedo.",
          "Revisão fica concentrada na borda de interoperabilidade.",
        ],
        watchOut: "Deixar ponteiros crus e contratos implícitos vazarem pelo projeto inteiro aumenta muito a área de auditoria.",
      },
      {
        id: "custom-buffer",
        label: "buffer manual",
        context:
          "Você precisa montar um buffer em múltiplas etapas com controle explícito sobre inicialização e escrita.",
        recommendation: "Use tipos como `MaybeUninit` e reflita cuidadosamente sobre estados intermediários e caminhos de erro.",
        why: [
          "O modelo deixa claro que parte da memória ainda não está pronta.",
          "Fica mais honesto do que fingir inicialização completa.",
          "A abstração pode publicar um estado seguro ao final.",
        ],
        watchOut: "Uma saída antecipada sem limpeza ou sem marcação correta do estado pode quebrar soundness rapidamente.",
      },
      {
        id: "sync-primitive",
        label: "primitiva de sync",
        context:
          "Uma abstração concorrente nova precisa controlar mutação interna ou wakeups além do que referências seguras modelam diretamente.",
        recommendation: "Trate a prova de invariantes como parte da API do tipo, não como detalhe escondido na implementação.",
        why: [
          "Outras camadas vão confiar nessa abstração.",
          "Bugs aqui escalam para o restante do ecossistema.",
          "A revisão precisa entender qual contrato está sendo afirmado.",
        ],
        watchOut: "Se o raciocínio não cabe em documentação inteligível, o design provavelmente ainda não está pronto.",
      },
    ],
  },
  "rust-ffi-e-c": {
    eyebrow: "Cenário",
    title: "Qual borda FFI desenhar para este tipo de integração?",
    description:
      "Selecione um caso de interoperabilidade e compare a recomendação inicial com o tipo de contrato binário envolvido.",
    tone: "teal",
    icon: <Route size={18} aria-hidden="true" />,
    options: [
      {
        id: "consume-c-lib",
        label: "consumir lib C",
        context:
          "Um projeto Rust precisa chamar uma biblioteca C estável já usada por outros componentes da empresa.",
        recommendation: "Use bindings claros, converta cedo para tipos Rust e documente ownership de buffers e handles na borda.",
        why: [
          "A biblioteca já existe e o ganho está em reaproveitá-la sem espalhar sua superfície crua.",
          "Wrappers seguros preservam o restante do projeto.",
          "Tooling de bindings reduz drift entre header e código.",
        ],
        watchOut: "Se a documentação de ownership ficar ambígua, o wrapper seguro vira só uma ilusão fina por cima do mesmo risco.",
      },
      {
        id: "export-rust-to-c",
        label: "expor Rust para C",
        context:
          "Uma equipe quer usar um núcleo novo em Rust dentro de um sistema principal ainda escrito em C.",
        recommendation: "Prefira uma API C-friendly pequena, com handles opacos, destrutores explícitos e pouca dependência de tipos complexos.",
        why: [
          "Facilita adoção gradual.",
          "Reduz compromisso público com layout complexo.",
          "Torna o contrato binário mais estável.",
        ],
        watchOut: "Expor muitos detalhes internos cedo demais transforma evolução da biblioteca em compromisso binário permanente.",
      },
      {
        id: "callback-context",
        label: "callback reverso",
        context:
          "A biblioteca externa chama de volta funções suas e pode guardar ponteiros de contexto para uso futuro.",
        recommendation: "Explique claramente lifetimes, ownership do contexto e em que condições o callback pode ser disparado.",
        why: [
          "Callback reverso mistura controle de fluxo e validade temporal.",
          "A superfície de aliasing cresce bastante.",
          "Bugs aparecem tarde quando o contexto fica pendurado.",
        ],
        watchOut: "Sem contrato explícito sobre quando o callback é liberado ou em qual thread roda, a API vira armadilha.",
      },
      {
        id: "vendored-c",
        label: "C embutido na build",
        context:
          "O repositório inclui código C próprio ou de terceiro e quer compilá-lo junto com Cargo.",
        recommendation: "Use `build.rs` e, quando fizer sentido, `cc` para tornar a integração reproduzível e visível no workflow.",
        why: [
          "A build deixa claro como o artefato externo entra no binário final.",
          "Evita etapas manuais frágeis.",
          "Facilita manter headers e objetos alinhados ao projeto real.",
        ],
        watchOut: "Se a integração de build virar caixa-preta, depurar incompatibilidades de plataforma ou flags fica muito mais caro.",
      },
    ],
  },
  "rust-tooling-cargo-perf": {
    eyebrow: "Cenário",
    title: "Que combinação de tooling responde melhor a este problema?",
    description:
      "Selecione um caso comum de desenvolvimento ou investigação e observe a sequência de ferramentas mais coerente.",
    tone: "emerald",
    icon: <Route size={18} aria-hidden="true" />,
    options: [
      {
        id: "daily-edit",
        label: "edição diária",
        context:
          "Você está mudando APIs, refatorando módulos e quer feedback rápido para não acumular erros estruturais.",
        recommendation: "Comece com `cargo check` e testes focados; guarde medições mais pesadas para quando a pergunta mudar de corretude para custo.",
        why: [
          "O gargalo aqui é tempo de iteração.",
          "Compilar tudo otimizado a cada ajuste encarece o aprendizado.",
          "Feedback cedo diminui retrabalho.",
        ],
        watchOut: "Se o objetivo já é discutir regressão de performance, esse workflow sozinho não basta.",
      },
      {
        id: "perf-regression",
        label: "suspeita de regressão",
        context:
          "A equipe percebeu que uma versão nova está mais lenta sob carga real, mas ainda não sabe onde o custo aumentou.",
        recommendation: "Reproduza em build representativa, compare com benchmark útil e use profiling para localizar o hot path dominante.",
        why: [
          "É preciso separar sintoma de causa.",
          "Build e workload afetam a validade da observação.",
          "Profile ajuda a priorizar a investigação.",
        ],
        watchOut: "Ir direto para micro-otimização sem reproduzir a regressão de forma honesta costuma desperdiçar tempo.",
      },
      {
        id: "library-docs",
        label: "biblioteca pública",
        context:
          "Você mantém uma library com exemplos na documentação e precisa garantir que o uso publicado continue correto.",
        recommendation: "Dê valor aos doc tests e testes de integração como parte do contrato antes de falar em benchmarks.",
        why: [
          "A API pública vive também nos exemplos.",
          "Quebrar documentação é quebrar onboarding técnico.",
          "Corretude precede custo aqui.",
        ],
        watchOut: "Benchmark bonito não compensa exemplo público quebrado ou semântica regressiva.",
      },
      {
        id: "profile-release",
        label: "diagnóstico profundo",
        context:
          "Você já sabe que o binário otimizado está quente demais em produção ou em staging e precisa de stacks úteis.",
        recommendation: "Ajuste o perfil para observabilidade suficiente, colete `perf` ou flamegraph com workload representativa e então interprete o hot path.",
        why: [
          "Sem símbolos e build adequada, o profile perde valor.",
          "A mesma coleta pode orientar várias hipóteses.",
          "É a forma mais concreta de sair do palpite para o diagnóstico.",
        ],
        watchOut: "Stacks ruins ou carga artificial fazem o flamegraph parecer informativo sem realmente ser conclusivo.",
      },
    ],
  },
};

export function createRustL3PartBInteractions(
  topicId: RustL3PartBTopicId,
): LessonModule["interactions"] {
  const modelComponent = function TopicModelLab() {
    return <ModelLab topicId={topicId} />;
  };

  const tradeoffComponent = function TopicTradeoffLab() {
    return <TradeoffLab topicId={topicId} />;
  };

  const scenarioComponent = function TopicScenarioLab() {
    return <ScenarioLab topicId={topicId} />;
  };

  return {
    "model-lab": modelComponent,
    "tradeoff-lab": tradeoffComponent,
    "scenario-lab": scenarioComponent,
  };
}

function ModelLab({ topicId }: { topicId: RustL3PartBTopicId }) {
  const config = modelConfigs[topicId];
  const [selected, setSelected] = useState(config.options[0]?.id ?? "");

  const option = useMemo(
    () => config.options.find((item) => item.id === selected) ?? config.options[0],
    [config.options, selected],
  );

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
            <ChoiceButton
              key={item.id}
              label={item.label}
              active={item.id === option.id}
              onClick={() => setSelected(item.id)}
            />
          ))}
        </div>
        <div className="grid gap-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-5">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">
              foco atual
            </p>
            <h4 className="mt-2 text-xl font-semibold tracking-tight text-slate-950">
              {option.title}
            </h4>
            <p className="mt-3 text-sm leading-7 text-slate-600">{option.summary}</p>
            <ul className="mt-4 grid gap-2 text-sm leading-6 text-slate-700">
              {option.bullets.map((bullet) => (
                <li key={bullet} className="rounded-2xl bg-slate-50 px-4 py-3">
                  {bullet}
                </li>
              ))}
            </ul>
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

function TradeoffLab({ topicId }: { topicId: RustL3PartBTopicId }) {
  const config = tradeoffConfigs[topicId];
  const [selected, setSelected] = useState(config.options[0]?.id ?? "");

  const option = useMemo(
    () => config.options.find((item) => item.id === selected) ?? config.options[0],
    [config.options, selected],
  );

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
            <ChoiceButton
              key={item.id}
              label={item.label}
              active={item.id === option.id}
              onClick={() => setSelected(item.id)}
            />
          ))}
        </div>
        <div className="grid gap-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <MetricCard label="Escolha" value={option.choice} />
            <MetricCard label="Cuidado principal" value={option.watchOut} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <DetailCard title="Benefício dominante" body={option.benefit} tone={config.tone} />
            <DetailCard title="Custo dominante" body={option.cost} tone="rose" />
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-5">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">
              quando combina melhor
            </p>
            <ul className="mt-4 grid gap-2 text-sm leading-6 text-slate-700">
              {option.goodWhen.map((item) => (
                <li key={item} className="rounded-2xl bg-slate-50 px-4 py-3">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </InteractiveShell>
  );
}

function ScenarioLab({ topicId }: { topicId: RustL3PartBTopicId }) {
  const config = scenarioConfigs[topicId];
  const [selected, setSelected] = useState(config.options[0]?.id ?? "");

  const option = useMemo(
    () => config.options.find((item) => item.id === selected) ?? config.options[0],
    [config.options, selected],
  );

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
            <ChoiceButton
              key={item.id}
              label={item.label}
              active={item.id === option.id}
              onClick={() => setSelected(item.id)}
            />
          ))}
        </div>
        <div className="grid gap-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-5">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">
              contexto
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-600">{option.context}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <MetricCard label="Recomendação inicial" value={option.recommendation} />
            <MetricCard label="Ponto de atenção" value={option.watchOut} />
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-5">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">
              por que este desenho é um bom ponto de partida
            </p>
            <ul className="mt-4 grid gap-2 text-sm leading-6 text-slate-700">
              {option.why.map((item) => (
                <li key={item} className="rounded-2xl bg-slate-50 px-4 py-3">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </InteractiveShell>
  );
}

function ChoiceButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      className={`rounded-3xl border px-4 py-3 text-left text-sm font-black transition ${
        active
          ? "border-slate-950 bg-slate-950 text-white"
          : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"
      }`}
      type="button"
      onClick={onClick}
    >
      {label}
    </button>
  );
}

function DetailCard({
  title,
  body,
  tone,
}: {
  title: string;
  body: string;
  tone: Tone;
}) {
  const styles: Record<Tone, string> = {
    indigo: "border-indigo-200 bg-indigo-50 text-indigo-950",
    violet: "border-violet-200 bg-violet-50 text-violet-950",
    teal: "border-teal-200 bg-teal-50 text-teal-950",
    amber: "border-amber-200 bg-amber-50 text-amber-950",
    rose: "border-rose-200 bg-rose-50 text-rose-950",
    emerald: "border-emerald-200 bg-emerald-50 text-emerald-950",
  };

  return (
    <div className={`rounded-3xl border p-5 ${styles[tone]}`}>
      <p className="text-xs font-black uppercase tracking-[0.18em]">{title}</p>
      <p className="mt-3 text-sm leading-7">{body}</p>
    </div>
  );
}
