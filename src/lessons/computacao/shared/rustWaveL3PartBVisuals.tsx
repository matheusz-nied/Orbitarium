import type { LessonModule } from "../../../types/content";
import type { RustL3PartBTopicId } from "./rustWaveL3PartBContent";

type Tone = "indigo" | "violet" | "teal" | "amber" | "rose" | "emerald";

interface HeroCard {
  label: string;
  value: string;
}

interface CompareSide {
  title: string;
  bullets: string[];
}

interface TopicVisualConfig {
  tone: Tone;
  heroTitle: string;
  heroSubtitle: string;
  heroCards: HeroCard[];
  heroFooter: string;
  mapCenter: string;
  mapNodes: string[];
  flowTitle: string;
  flowSteps: string[];
  compareTitle: string;
  compareLeft: CompareSide;
  compareRight: CompareSide;
  riskTitle: string;
  riskItems: string[];
  boundaryTitle: string;
  boundaryItems: string[];
  impactTitle: string;
  impactItems: string[];
}

const configs: Record<RustL3PartBTopicId, TopicVisualConfig> = {
  "rust-concurrency-send-sync": {
    tone: "indigo",
    heroTitle: "Thread-safety em Rust é contrato explícito",
    heroSubtitle:
      "Mover ownership, compartilhar leitura e sincronizar mutação são decisões diferentes — e `Send` e `Sync` existem para separar essas perguntas.",
    heroCards: [
      { label: "Mover", value: "`Send`" },
      { label: "Compartilhar", value: "`Sync`" },
      { label: "Ownership", value: "`Arc`" },
      { label: "Mutação", value: "`Mutex` / atomics" },
    ],
    heroFooter: "Tipos contam uma parte importante da história concorrente antes mesmo do runtime.",
    mapCenter: "Thread-safety",
    mapNodes: ["`Send`", "`Sync`", "auto traits", "primitivas de sync"],
    flowTitle: "Da intenção de acesso à estrutura certa",
    flowSteps: [
      "Mover ownership",
      "Compartilhar leitura",
      "Sincronizar mutação",
      "Revisar contenção",
    ],
    compareTitle: "Nem todo compartilhamento tem o mesmo custo",
    compareLeft: {
      title: "Modelos mais simples",
      bullets: [
        "Ownership movida por channels.",
        "Estado particionado por worker.",
        "Menos locks e menos aliasing global.",
      ],
    },
    compareRight: {
      title: "Modelos mais compartilhados",
      bullets: [
        "`Arc` + lock ou atomic.",
        "Mais coordenação entre threads.",
        "Maior risco de contenção e desenho ruim.",
      ],
    },
    riskTitle: "Armadilhas comuns",
    riskItems: [
      "Trocar `Rc` por `Arc` sem rever o modelo.",
      "Confundir memory safety com arquitetura ideal.",
      "Espalhar locks antes de rever ownership.",
    ],
    boundaryTitle: "Onde o contrato fica delicado",
    boundaryItems: [
      "`unsafe impl Send`",
      "`unsafe impl Sync`",
      "ponteiros crus encapsulados",
    ],
    impactTitle: "Onde isso reaparece",
    impactItems: [
      "runtimes assíncronos",
      "pools e filas",
      "caches compartilhados",
      "bibliotecas de sistemas",
    ],
  },
  "rust-async-intuicao": {
    tone: "violet",
    heroTitle: "Async é progresso dirigido por `poll`, não magia ao fundo",
    heroSubtitle:
      "Futures são state machines inertes; tasks, executores e `Waker` organizam quando cada uma volta a progredir.",
    heroCards: [
      { label: "Estado", value: "future" },
      { label: "Agendamento", value: "task" },
      { label: "Retorno", value: "`Waker`" },
      { label: "Bound favorito", value: "I/O-bound" },
    ],
    heroFooter: "Async ajuda muito quando há muita espera concorrente e pouco cálculo contínuo por task.",
    mapCenter: "Async Rust",
    mapNodes: ["future", "task", "executor", "`Waker` + `poll`"],
    flowTitle: "Ciclo básico de uma task assíncrona",
    flowSteps: [
      "poll inicial",
      "`Pending` + registro",
      "evento externo acorda",
      "novo poll",
    ],
    compareTitle: "Espera concorrente não é o mesmo que CPU paralela",
    compareLeft: {
      title: "Quando async ajuda",
      bullets: [
        "Muitos sockets ou timers.",
        "Espera por rede ou disco.",
        "Alta multiplexação por thread.",
      ],
    },
    compareRight: {
      title: "Quando outra ferramenta ajuda mais",
      bullets: [
        "CPU-bound pesado.",
        "Chamadas bloqueantes longas.",
        "Paralelismo explícito por núcleo.",
      ],
    },
    riskTitle: "Armadilhas comuns",
    riskItems: [
      "Bloquear o runtime com trabalho síncrono.",
      "Spawnar sem limite nem backpressure.",
      "Assumir que `.await` já cria paralelismo.",
    ],
    boundaryTitle: "Fronteiras delicadas",
    boundaryItems: [
      "APIs bloqueantes",
      "cancelamento implícito",
      "pinning e state machines",
    ],
    impactTitle: "Onde isso reaparece",
    impactItems: [
      "servidores HTTP",
      "clients RPC",
      "drivers e streams",
      "orquestração de I/O",
    ],
  },
  "rust-unsafe-boundaries": {
    tone: "amber",
    heroTitle: "Unsafe é uma fronteira de responsabilidade",
    heroSubtitle:
      "O compilador deixa de provar parte da segurança; a abstração precisa devolver um contrato sound para o lado de fora.",
    heroCards: [
      { label: "Núcleo", value: "invariantes" },
      { label: "Risco", value: "UB" },
      { label: "Peças", value: "raw ptr / `UnsafeCell`" },
      { label: "Meta", value: "API segura" },
    ],
    heroFooter: "A pergunta importante não é 'há unsafe?', e sim 'qual contrato mantém o restante do código sound?'.",
    mapCenter: "Unsafe Rust",
    mapNodes: ["contratos", "soundness", "invariantes", "encapsulamento"],
    flowTitle: "Como uma abstração unsafe amadurece",
    flowSteps: [
      "identificar necessidade real",
      "documentar precondições",
      "isolar superfície",
      "expor API segura",
    ],
    compareTitle: "Unsafe pequeno é mais auditável",
    compareLeft: {
      title: "Superfície concentrada",
      bullets: [
        "Prova local de invariantes.",
        "Review mais claro.",
        "Menos pontos frágeis no código.",
      ],
    },
    compareRight: {
      title: "Unsafe espalhado",
      bullets: [
        "Responsabilidade difusa.",
        "Contratos implícitos demais.",
        "Maior risco de bug de soundness.",
      ],
    },
    riskTitle: "Armadilhas comuns",
    riskItems: [
      "Confundir compilar com soundness.",
      "Usar ponteiro cru para driblar borrow checker.",
      "Depender de callers 'bonzinhos' sem reforço na API.",
    ],
    boundaryTitle: "Peças típicas",
    boundaryItems: [
      "raw pointers",
      "`UnsafeCell` / `MaybeUninit`",
      "comentários de segurança",
    ],
    impactTitle: "Onde isso reaparece",
    impactItems: [
      "coleções customizadas",
      "FFI",
      "primitivas de sync",
      "alocação e buffers",
    ],
  },
  "rust-ffi-e-c": {
    tone: "teal",
    heroTitle: "FFI é tradução entre contratos binários e semânticos",
    heroSubtitle:
      "ABI, layout, ownership, strings e unwind precisam de um acordo explícito para que Rust e C conversem sem corromper a fronteira.",
    heroCards: [
      { label: "Chamada", value: "`extern \"C\"`" },
      { label: "Layout", value: "`repr(C)`" },
      { label: "Strings", value: "`CString` / `CStr`" },
      { label: "Ownership", value: "quem aloca / quem libera" },
    ],
    heroFooter: "A ponte funciona quando o acordo binário é claro e a superfície crua é mantida pequena.",
    mapCenter: "FFI",
    mapNodes: ["ABI", "layout", "ownership", "toolchain"],
    flowTitle: "Caminho de uma integração FFI",
    flowSteps: [
      "alinhar ABI",
      "definir layout",
      "documentar ownership",
      "embrulhar em API segura",
    ],
    compareTitle: "Expor menos costuma simplificar mais",
    compareLeft: {
      title: "Fronteira enxuta",
      bullets: [
        "Opaque handles.",
        "Wrappers seguros cedo.",
        "Menos layout exposto.",
      ],
    },
    compareRight: {
      title: "Fronteira crua demais",
      bullets: [
        "Ponteiros por toda parte.",
        "Ownership ambíguo.",
        "Maior chance de incompatibilidade binária.",
      ],
    },
    riskTitle: "Armadilhas comuns",
    riskItems: [
      "desalocar do lado errado",
      "assumir layout sem prova",
      "esquecer unwind e callbacks",
    ],
    boundaryTitle: "Ferramentas e bordas",
    boundaryItems: [
      "bindgen / cbindgen",
      "`build.rs` + `cc`",
      "wrappers e handles",
    ],
    impactTitle: "Onde isso reaparece",
    impactItems: [
      "APIs de sistema",
      "bibliotecas legadas",
      "SDKs nativos",
      "migrações graduais",
    ],
  },
  "rust-tooling-cargo-perf": {
    tone: "emerald",
    heroTitle: "Tooling bom transforma palpite em feedback reproduzível",
    heroSubtitle:
      "Cargo, perfis de build, testes, benchmarks e profiling precisam responder perguntas diferentes sobre o mesmo código.",
    heroCards: [
      { label: "Editar", value: "`cargo check`" },
      { label: "Validar", value: "`cargo test`" },
      { label: "Comparar", value: "bench" },
      { label: "Diagnosticar", value: "perf / flamegraph" },
    ],
    heroFooter: "A build certa e a carga certa importam tanto quanto a ferramenta certa.",
    mapCenter: "Feedback loop",
    mapNodes: ["check", "profiles", "tests", "profiling"],
    flowTitle: "Sequência produtiva de engenharia",
    flowSteps: [
      "editar rápido",
      "validar corretude",
      "medir representativamente",
      "diagnosticar hot paths",
    ],
    compareTitle: "Perguntas diferentes pedem ferramentas diferentes",
    compareLeft: {
      title: "Corretude e regressão",
      bullets: [
        "testes unitários",
        "integração e docs",
        "feedback de comportamento",
      ],
    },
    compareRight: {
      title: "Custo e gargalo",
      bullets: [
        "benchmark controlado",
        "profiling com stacks",
        "workload representativa",
      ],
    },
    riskTitle: "Armadilhas comuns",
    riskItems: [
      "medir em build errada",
      "otimizar sem profile",
      "confundir benchmark com teste",
    ],
    boundaryTitle: "Ajustes importantes",
    boundaryItems: [
      "perfil `release` adequado",
      "debuginfo útil",
      "frame pointers quando necessário",
    ],
    impactTitle: "Onde isso reaparece",
    impactItems: [
      "CI e revisão",
      "investigação de regressão",
      "serviços em produção",
      "loop diário de edição",
    ],
  },
};

export function createRustL3PartBVisuals(topicId: RustL3PartBTopicId): LessonModule["visuals"] {
  return {
    hero: () => <HeroVisual topicId={topicId} />,
    "concept-map": () => <ConceptMapVisual topicId={topicId} />,
    flow: () => <FlowVisual topicId={topicId} />,
    "compare-board": () => <CompareBoardVisual topicId={topicId} />,
    "risk-board": () => <RiskBoardVisual topicId={topicId} />,
    "boundary-board": () => <BoundaryBoardVisual topicId={topicId} />,
    "impact-board": () => <ImpactBoardVisual topicId={topicId} />,
  };
}

function HeroVisual({ topicId }: { topicId: RustL3PartBTopicId }) {
  const config = configs[topicId];
  return (
    <Frame title={config.heroTitle} tone={config.tone}>
      <svg className="w-full" viewBox="0 0 760 360" role="img" aria-label={config.heroTitle}>
        <rect width="760" height="360" rx="28" fill="#ffffff" opacity="0.92" />
        <text x="380" y="48" textAnchor="middle" fill="#0f172a" fontSize="25" fontWeight="900">
          {config.heroTitle}
        </text>
        <text x="380" y="78" textAnchor="middle" fill="#475569" fontSize="14" fontWeight="700">
          {config.heroSubtitle}
        </text>
        {config.heroCards.map((item, index) => (
          <g key={item.label}>
            <rect
              x={84 + (index % 2) * 298}
              y={116 + Math.floor(index / 2) * 92}
              width="280"
              height="74"
              rx="20"
              fill="#ffffff"
              stroke={toneStroke(config.tone)}
              strokeWidth="3"
            />
            <text
              x={224 + (index % 2) * 298}
              y={146 + Math.floor(index / 2) * 92}
              textAnchor="middle"
              fill={toneStroke(config.tone)}
              fontSize="13"
              fontWeight="900"
            >
              {item.label}
            </text>
            <text
              x={224 + (index % 2) * 298}
              y={172 + Math.floor(index / 2) * 92}
              textAnchor="middle"
              fill="#0f172a"
              fontSize="18"
              fontWeight="900"
            >
              {item.value}
            </text>
          </g>
        ))}
        <text x="380" y="328" textAnchor="middle" fill="#475569" fontSize="14" fontWeight="800">
          {config.heroFooter}
        </text>
      </svg>
    </Frame>
  );
}

function ConceptMapVisual({ topicId }: { topicId: RustL3PartBTopicId }) {
  const config = configs[topicId];
  const positions = [
    [120, 96],
    [500, 96],
    [120, 210],
    [500, 210],
  ] as const;

  return (
    <Frame title="Mapa conceitual do tema" tone={config.tone}>
      <svg className="w-full" viewBox="0 0 760 340" role="img" aria-label={config.mapCenter}>
        <rect width="760" height="340" rx="28" fill="#ffffff" opacity="0.92" />
        <rect x="280" y="128" width="200" height="84" rx="22" fill="#ffffff" stroke={toneStroke(config.tone)} strokeWidth="4" />
        <text x="380" y="178" textAnchor="middle" fill={toneStroke(config.tone)} fontSize="22" fontWeight="900">
          {config.mapCenter}
        </text>
        {config.mapNodes.map((node, index) => {
          const [x, y] = positions[index];
          return (
            <g key={node}>
              <rect x={x} y={y} width="140" height="56" rx="16" fill={toneSoft(config.tone)} stroke={toneStroke(config.tone)} strokeWidth="3" />
              <text x={x + 70} y={y + 34} textAnchor="middle" fill="#0f172a" fontSize="16" fontWeight="900">
                {node}
              </text>
              <path
                d={
                  index === 0
                    ? "M260 156H220"
                    : index === 1
                      ? "M500 156H540"
                      : index === 2
                        ? "M260 184H220"
                        : "M500 184H540"
                }
                stroke="#94a3b8"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </g>
          );
        })}
      </svg>
    </Frame>
  );
}

function FlowVisual({ topicId }: { topicId: RustL3PartBTopicId }) {
  const config = configs[topicId];
  return (
    <Frame title={config.flowTitle} tone={config.tone}>
      <svg className="w-full" viewBox="0 0 760 300" role="img" aria-label={config.flowTitle}>
        <rect width="760" height="300" rx="28" fill="#ffffff" opacity="0.92" />
        {config.flowSteps.map((step, index) => (
          <g key={step}>
            <rect
              x={44 + index * 176}
              y="112"
              width="150"
              height="82"
              rx="22"
              fill="#ffffff"
              stroke={toneStroke(config.tone)}
              strokeWidth="3"
            />
            <text
              x={119 + index * 176}
              y="142"
              textAnchor="middle"
              fill={toneStroke(config.tone)}
              fontSize="12"
              fontWeight="900"
            >
              {index + 1}
            </text>
            <text
              x={119 + index * 176}
              y="168"
              textAnchor="middle"
              fill="#0f172a"
              fontSize="15"
              fontWeight="900"
            >
              {step}
            </text>
            {index < config.flowSteps.length - 1 ? (
              <>
                <path d={`M194 ${153}H218`} stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" transform={`translate(${index * 176}, 0)`} />
                <path d={`M210 ${145}l10 8l-10 8`} fill="#94a3b8" transform={`translate(${index * 176}, 0)`} />
              </>
            ) : null}
          </g>
        ))}
      </svg>
    </Frame>
  );
}

function CompareBoardVisual({ topicId }: { topicId: RustL3PartBTopicId }) {
  const config = configs[topicId];
  return (
    <Frame title={config.compareTitle} tone={config.tone}>
      <svg className="w-full" viewBox="0 0 760 330" role="img" aria-label={config.compareTitle}>
        <rect width="760" height="330" rx="28" fill="#ffffff" opacity="0.92" />
        <CompareSideCard x={74} y={88} side={config.compareLeft} tone={config.tone} />
        <CompareSideCard x={396} y={88} side={config.compareRight} tone={config.tone} />
      </svg>
    </Frame>
  );
}

function RiskBoardVisual({ topicId }: { topicId: RustL3PartBTopicId }) {
  const config = configs[topicId];
  return (
    <Frame title={config.riskTitle} tone={config.tone}>
      <svg className="w-full" viewBox="0 0 760 310" role="img" aria-label={config.riskTitle}>
        <rect width="760" height="310" rx="28" fill="#ffffff" opacity="0.92" />
        {config.riskItems.map((item, index) => (
          <g key={item}>
            <rect x={92 + index * 194} y="112" width="180" height="108" rx="22" fill="#fff7ed" stroke="#f59e0b" strokeWidth="3" />
            <text x={182 + index * 194} y="148" textAnchor="middle" fill="#b45309" fontSize="13" fontWeight="900">
              risco {index + 1}
            </text>
            <text x={182 + index * 194} y="182" textAnchor="middle" fill="#0f172a" fontSize="14" fontWeight="800">
              {item}
            </text>
          </g>
        ))}
      </svg>
    </Frame>
  );
}

function BoundaryBoardVisual({ topicId }: { topicId: RustL3PartBTopicId }) {
  const config = configs[topicId];
  return (
    <Frame title={config.boundaryTitle} tone={config.tone}>
      <svg className="w-full" viewBox="0 0 760 310" role="img" aria-label={config.boundaryTitle}>
        <rect width="760" height="310" rx="28" fill="#ffffff" opacity="0.92" />
        <rect x="140" y="124" width="480" height="68" rx="22" fill={toneSoft(config.tone)} stroke={toneStroke(config.tone)} strokeWidth="4" />
        <text x="380" y="165" textAnchor="middle" fill={toneStroke(config.tone)} fontSize="20" fontWeight="900">
          fronteira segura
        </text>
        {config.boundaryItems.map((item, index) => (
          <g key={item}>
            <rect x={118 + index * 176} y="220" width="156" height="44" rx="14" fill="#ffffff" stroke={toneStroke(config.tone)} strokeWidth="2.5" />
            <text x={196 + index * 176} y="247" textAnchor="middle" fill="#0f172a" fontSize="14" fontWeight="800">
              {item}
            </text>
          </g>
        ))}
      </svg>
    </Frame>
  );
}

function ImpactBoardVisual({ topicId }: { topicId: RustL3PartBTopicId }) {
  const config = configs[topicId];
  return (
    <Frame title={config.impactTitle} tone={config.tone}>
      <svg className="w-full" viewBox="0 0 760 330" role="img" aria-label={config.impactTitle}>
        <rect width="760" height="330" rx="28" fill="#ffffff" opacity="0.92" />
        {config.impactItems.map((item, index) => (
          <g key={item}>
            <circle cx={144 + index * 156} cy="164" r="48" fill={toneSoft(config.tone)} stroke={toneStroke(config.tone)} strokeWidth="4" />
            <text x={144 + index * 156} y="170" textAnchor="middle" fill="#0f172a" fontSize="13" fontWeight="900">
              {item}
            </text>
          </g>
        ))}
      </svg>
    </Frame>
  );
}

function Frame({
  title,
  tone,
  children,
}: {
  title: string;
  tone: Tone;
  children: React.ReactNode;
}) {
  const styles: Record<Tone, string> = {
    indigo: "border-indigo-200 bg-indigo-50",
    violet: "border-violet-200 bg-violet-50",
    teal: "border-teal-200 bg-teal-50",
    amber: "border-amber-200 bg-amber-50",
    rose: "border-rose-200 bg-rose-50",
    emerald: "border-emerald-200 bg-emerald-50",
  };

  return (
    <figure className={`rounded-[2rem] border p-4 shadow-xl shadow-slate-900/5 ${styles[tone]}`}>
      <figcaption className="mb-3 text-sm font-black uppercase tracking-[0.16em] text-slate-500">
        {title}
      </figcaption>
      {children}
    </figure>
  );
}

function CompareSideCard({
  x,
  y,
  side,
  tone,
}: {
  x: number;
  y: number;
  side: CompareSide;
  tone: Tone;
}) {
  return (
    <g>
      <rect x={x} y={y} width="290" height="182" rx="24" fill="#ffffff" stroke={toneStroke(tone)} strokeWidth="3" />
      <text x={x + 145} y={y + 34} textAnchor="middle" fill={toneStroke(tone)} fontSize="18" fontWeight="900">
        {side.title}
      </text>
      {side.bullets.map((bullet, index) => (
        <g key={bullet}>
          <circle cx={x + 28} cy={y + 72 + index * 34} r="4" fill={toneStroke(tone)} />
          <text x={x + 44} y={y + 77 + index * 34} fill="#334155" fontSize="13" fontWeight="700">
            {bullet}
          </text>
        </g>
      ))}
    </g>
  );
}

function toneStroke(tone: Tone) {
  const map: Record<Tone, string> = {
    indigo: "#4f46e5",
    violet: "#7c3aed",
    teal: "#0f766e",
    amber: "#d97706",
    rose: "#e11d48",
    emerald: "#059669",
  };
  return map[tone];
}

function toneSoft(tone: Tone) {
  const map: Record<Tone, string> = {
    indigo: "#e0e7ff",
    violet: "#ede9fe",
    teal: "#ccfbf1",
    amber: "#fef3c7",
    rose: "#ffe4e6",
    emerald: "#d1fae5",
  };
  return map[tone];
}
