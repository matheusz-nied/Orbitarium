import type { LessonModule } from "../../../types/content";

const X_LABELS = ["0.25", "1", "4", "16", "64"];

function mapLogX(value: number) {
  const min = Math.log10(0.25);
  const max = Math.log10(64);
  return 80 + ((Math.log10(value) - min) / (max - min)) * 560;
}

function mapLogY(value: number) {
  const min = Math.log10(1);
  const max = Math.log10(128);
  return 280 - ((Math.log10(value) - min) / (max - min)) * 190;
}

function buildRooflinePath(computePeak: number, bandwidthSlope: number) {
  const points = [0.25, 0.5, 1, 2, 4, 8, 16, 32, 64]
    .map((x) => {
      const y = Math.min(computePeak, x * bandwidthSlope);
      return `${mapLogX(x).toFixed(1)},${mapLogY(y).toFixed(1)}`;
    })
    .join(" ");

  return points;
}

function RooflineHero() {
  const ridgePoint = 100 / 16;

  return (
    <figure className="overflow-hidden rounded-[2rem] border border-violet-200 bg-white p-4 shadow-xl shadow-violet-900/5">
      <svg
        className="w-full"
        viewBox="0 0 760 360"
        role="img"
        aria-label="Diagrama introdutorio do modelo Roofline"
      >
        <defs>
          <linearGradient id="rooflineHeroBg" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#f5f3ff" />
            <stop offset="100%" stopColor="#eef2ff" />
          </linearGradient>
        </defs>
        <rect width="760" height="360" rx="28" fill="url(#rooflineHeroBg)" />
        <text x="380" y="42" textAnchor="middle" fill="#4c1d95" fontSize="23" fontWeight="900">
          Roofline: um mapa de limites
        </text>
        <text x="380" y="68" textAnchor="middle" fill="#6d28d9" fontSize="13" fontWeight="700">
          eixo X: intensidade operacional | eixo Y: throughput sustentado
        </text>

        <line x1="84" y1="290" x2="650" y2="290" stroke="#94a3b8" strokeWidth="2.5" />
        <line x1="84" y1="290" x2="84" y2="88" stroke="#94a3b8" strokeWidth="2.5" />

        <polyline
          points={buildRooflinePath(100, 16)}
          fill="none"
          stroke="#7c3aed"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <circle cx={mapLogX(ridgePoint)} cy={mapLogY(100)} r="8" fill="#ffffff" stroke="#7c3aed" strokeWidth="3" />
        <text
          x={mapLogX(ridgePoint)}
          y={mapLogY(100) - 16}
          textAnchor="middle"
          fill="#5b21b6"
          fontSize="12"
          fontWeight="900"
        >
          ridge point
        </text>

        <circle cx={mapLogX(0.5)} cy={mapLogY(8)} r="10" fill="#f59e0b" />
        <text x={mapLogX(0.5) + 18} y={mapLogY(8) + 4} fill="#92400e" fontSize="12" fontWeight="900">
          streaming
        </text>

        <circle cx={mapLogX(20)} cy={mapLogY(96)} r="10" fill="#10b981" />
        <text x={mapLogX(20) - 8} y={mapLogY(96) - 14} fill="#047857" fontSize="12" fontWeight="900">
          matmul bloqueado
        </text>

        <rect x="506" y="92" width="178" height="62" rx="18" fill="#ffffff" stroke="#c4b5fd" strokeWidth="2.5" />
        <text x="522" y="116" fill="#5b21b6" fontSize="11" fontWeight="900">
          TETO HORIZONTAL
        </text>
        <text x="522" y="138" fill="#0f172a" fontSize="13" fontWeight="800">
          limite de compute
        </text>

        <rect x="120" y="102" width="170" height="62" rx="18" fill="#ffffff" stroke="#ddd6fe" strokeWidth="2.5" />
        <text x="136" y="126" fill="#7c3aed" fontSize="11" fontWeight="900">
          TETO DIAGONAL
        </text>
        <text x="136" y="148" fill="#0f172a" fontSize="13" fontWeight="800">
          limite de banda
        </text>

        <text x="372" y="324" textAnchor="middle" fill="#475569" fontSize="13" fontWeight="700">
          O ponto so melhora de forma material se voce mover o kernel na direcao certa ou erguer o teto relevante.
        </text>
      </svg>
    </figure>
  );
}

function RooflinePlane() {
  const kernels = [
    { label: "SpMV", x: 0.4, y: 6, fill: "#f97316" },
    { label: "AXPY", x: 0.7, y: 11, fill: "#eab308" },
    { label: "Stencil", x: 3, y: 40, fill: "#0ea5e9" },
    { label: "Matmul", x: 24, y: 96, fill: "#22c55e" },
  ];

  return (
    <figure className="rounded-[2rem] border border-indigo-200 bg-indigo-50 p-4 shadow-xl shadow-indigo-900/5">
      <svg
        className="w-full"
        viewBox="0 0 760 340"
        role="img"
        aria-label="Plano do grafico Roofline com exemplos de kernels"
      >
        <rect width="760" height="340" rx="28" fill="#eef2ff" />
        <text x="380" y="42" textAnchor="middle" fill="#3730a3" fontSize="22" fontWeight="900">
          Como pontos ocupam o grafico
        </text>
        <line x1="84" y1="280" x2="652" y2="280" stroke="#64748b" strokeWidth="2.5" />
        <line x1="84" y1="280" x2="84" y2="84" stroke="#64748b" strokeWidth="2.5" />
        <polyline
          points={buildRooflinePath(100, 16)}
          fill="none"
          stroke="#4f46e5"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {X_LABELS.map((label, index) => (
          <g key={label}>
            <line
              x1={80 + index * 140}
              y1="280"
              x2={80 + index * 140}
              y2="286"
              stroke="#475569"
              strokeWidth="2"
            />
            <text
              x={80 + index * 140}
              y="306"
              textAnchor="middle"
              fill="#475569"
              fontSize="11"
              fontWeight="800"
            >
              {label}
            </text>
          </g>
        ))}
        {kernels.map((kernel) => (
          <g key={kernel.label}>
            <circle cx={mapLogX(kernel.x)} cy={mapLogY(kernel.y)} r="10" fill={kernel.fill} />
            <text
              x={mapLogX(kernel.x)}
              y={mapLogY(kernel.y) - 16}
              textAnchor="middle"
              fill="#0f172a"
              fontSize="12"
              fontWeight="900"
            >
              {kernel.label}
            </text>
          </g>
        ))}
        <text x="22" y="90" fill="#4338ca" fontSize="11" fontWeight="900" transform="rotate(-90 22 90)">
          throughput
        </text>
        <text x="368" y="328" textAnchor="middle" fill="#4338ca" fontSize="11" fontWeight="900">
          intensidade operacional (ops/byte)
        </text>
      </svg>
    </figure>
  );
}

function RooflineLevers() {
  const cards = [
    {
      title: "Locality e blocking",
      body: "movem o ponto para a direita porque extraem mais trabalho dos mesmos bytes",
      tone: "#7c3aed",
    },
    {
      title: "Layout e fusao de loops",
      body: "reduzem trafego inutil e melhoram o custo efetivo de alimentar o kernel",
      tone: "#2563eb",
    },
    {
      title: "SIMD e FMA",
      body: "levantam o teto horizontal quando o gargalo real ja e compute",
      tone: "#059669",
    },
    {
      title: "Mais threads",
      body: "podem ajudar ou apenas empurrar mais workers contra a mesma banda saturada",
      tone: "#d97706",
    },
  ];

  return (
    <figure className="rounded-[2rem] border border-amber-200 bg-amber-50 p-4 shadow-xl shadow-amber-900/5">
      <svg
        className="w-full"
        viewBox="0 0 760 360"
        role="img"
        aria-label="Visual das alavancas que movem um ponto no Roofline"
      >
        <rect width="760" height="360" rx="28" fill="#fffbeb" />
        <text x="380" y="42" textAnchor="middle" fill="#92400e" fontSize="22" fontWeight="900">
          Que tipo de mudanca voce esta fazendo?
        </text>
        <rect x="286" y="132" width="188" height="96" rx="24" fill="#ffffff" stroke="#f59e0b" strokeWidth="3" />
        <text x="380" y="168" textAnchor="middle" fill="#92400e" fontSize="18" fontWeight="900">
          ponto atual
        </text>
        <text x="380" y="196" textAnchor="middle" fill="#475569" fontSize="12" fontWeight="700">
          pergunte se a mudanca move o ponto
        </text>
        <text x="380" y="214" textAnchor="middle" fill="#475569" fontSize="12" fontWeight="700">
          ou ergue o teto
        </text>

        {cards.map((card, index) => {
          const positions = [
            { x: 52, y: 96, line: "M232 142 L286 162" },
            { x: 520, y: 96, line: "M520 162 L474 162" },
            { x: 52, y: 248, line: "M232 254 L286 214" },
            { x: 520, y: 248, line: "M520 254 L474 214" },
          ] as const;
          const position = positions[index];

          return (
            <g key={card.title}>
              <rect
                x={position.x}
                y={position.y}
                width="188"
                height="74"
                rx="20"
                fill="#ffffff"
                stroke={card.tone}
                strokeWidth="3"
              />
              <text x={position.x + 16} y={position.y + 24} fill={card.tone} fontSize="11" fontWeight="900">
                {card.title.toUpperCase()}
              </text>
              <text x={position.x + 16} y={position.y + 45} fill="#334155" fontSize="12" fontWeight="700">
                {card.body}
              </text>
              <path d={position.line} stroke={card.tone} strokeWidth="4" strokeLinecap="round" fill="none" />
            </g>
          );
        })}
      </svg>
    </figure>
  );
}

function RooflinePractice() {
  const levels = [
    { name: "Registradores", x: 88, tone: "#0f766e" },
    { name: "L1 / L2", x: 236, tone: "#0f766e" },
    { name: "LLC", x: 384, tone: "#0f766e" },
    { name: "DRAM", x: 532, tone: "#0f766e" },
  ];

  return (
    <figure className="rounded-[2rem] border border-teal-200 bg-teal-50 p-4 shadow-xl shadow-teal-900/5">
      <svg
        className="w-full"
        viewBox="0 0 760 330"
        role="img"
        aria-label="Relacionando Roofline com a hierarquia de memoria"
      >
        <rect width="760" height="330" rx="28" fill="#f0fdfa" />
        <text x="380" y="44" textAnchor="middle" fill="#0f766e" fontSize="22" fontWeight="900">
          A hierarquia de memoria reaparece no denominador
        </text>
        {levels.map((level, index) => (
          <g key={level.name}>
            <rect
              x={level.x}
              y="124"
              width="140"
              height="74"
              rx="20"
              fill="#ffffff"
              stroke="#14b8a6"
              strokeWidth="3"
            />
            <text
              x={level.x + 70}
              y="152"
              textAnchor="middle"
              fill={level.tone}
              fontSize="13"
              fontWeight="900"
            >
              {level.name}
            </text>
            <text
              x={level.x + 70}
              y="176"
              textAnchor="middle"
              fill="#475569"
              fontSize="11"
              fontWeight="700"
            >
              bytes mais caros a direita
            </text>
            {index < levels.length - 1 ? (
              <>
                <path
                  d={`M${level.x + 140} 161 h18`}
                  stroke="#14b8a6"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
                <path d={`M${level.x + 150} 151 l10 10 l-10 10`} fill="#14b8a6" />
              </>
            ) : null}
          </g>
        ))}
        <text x="380" y="254" textAnchor="middle" fill="#0f766e" fontSize="15" fontWeight="900">
          Melhor locality reduz a necessidade de visitar niveis lentos da hierarquia.
        </text>
      </svg>
    </figure>
  );
}

function RooflineLimits() {
  const limits = [
    ["I/O", "disco, rede e filas nem sempre cabem nesse retrato"],
    ["Sincronizacao", "locks, atomics e esperas podem derrubar throughput fora do modelo"],
    ["Controle", "branching irregular e divergencia podem esconder o teto real"],
    ["Cauda", "p99 e distribuicao temporal pedem outras lentes alem do throughput medio"],
  ];

  return (
    <figure className="rounded-[2rem] border border-rose-200 bg-rose-50 p-4 shadow-xl shadow-rose-900/5">
      <svg
        className="w-full"
        viewBox="0 0 760 340"
        role="img"
        aria-label="Limites do modelo Roofline"
      >
        <rect width="760" height="340" rx="28" fill="#fff1f2" />
        <text x="380" y="42" textAnchor="middle" fill="#be123c" fontSize="22" fontWeight="900">
          O Roofline e poderoso porque simplifica
        </text>
        <text x="380" y="66" textAnchor="middle" fill="#9f1239" fontSize="13" fontWeight="700">
          e justamente por isso precisa de contexto
        </text>
        {limits.map(([title, body], index) => {
          const col = index % 2;
          const row = Math.floor(index / 2);
          const x = 60 + col * 326;
          const y = 102 + row * 102;
          return (
            <g key={title}>
              <rect x={x} y={y} width="286" height="74" rx="20" fill="#ffffff" stroke="#fda4af" strokeWidth="3" />
              <text x={x + 18} y={y + 25} fill="#be123c" fontSize="12" fontWeight="900">
                {title.toUpperCase()}
              </text>
              <text x={x + 18} y={y + 49} fill="#334155" fontSize="12" fontWeight="700">
                {body}
              </text>
            </g>
          );
        })}
      </svg>
    </figure>
  );
}

export const visuals = {
  "roofline-hero": RooflineHero,
  "roofline-plane": RooflinePlane,
  "roofline-levers": RooflineLevers,
  "roofline-practice": RooflinePractice,
  "roofline-limits": RooflineLimits,
} satisfies LessonModule["visuals"];
