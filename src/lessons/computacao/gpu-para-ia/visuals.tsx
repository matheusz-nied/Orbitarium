import type { LessonModule } from "../../../types/content";

export const visuals = {
  "gpu-hero": GpuHeroVisual,
  "gpu-cpu-vs-gpu": CpuVsGpuVisual,
  "gpu-simt": SimtVisual,
  "gpu-memory": MemoryVisual,
} satisfies LessonModule["visuals"];

function GpuHeroVisual() {
  return (
    <figure className="overflow-hidden rounded-[2rem] border border-fuchsia-200 bg-white p-4 shadow-xl shadow-fuchsia-900/10">
      <svg className="w-full" viewBox="0 0 760 410" role="img" aria-label="GPU acelerando operações de IA">
        <defs>
          <linearGradient id="gpuHeroBg" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#fdf4ff" />
            <stop offset="50%" stopColor="#eef2ff" />
            <stop offset="100%" stopColor="#ecfeff" />
          </linearGradient>
        </defs>
        <rect width="760" height="410" rx="32" fill="url(#gpuHeroBg)" />
        <text x="380" y="50" textAnchor="middle" fill="#0f172a" fontSize="26" fontWeight="900">
          IA repete muito cálculo parecido sobre muito dado
        </text>
        <rect x="70" y="105" width="210" height="210" rx="24" fill="#ffffff" stroke="#7c3aed" strokeWidth="3" />
        <text x="175" y="140" textAnchor="middle" fill="#6d28d9" fontSize="20" fontWeight="900">
          Tensor de entrada
        </text>
        {Array.from({ length: 4 }).map((_, row) =>
          Array.from({ length: 4 }).map((__, col) => (
            <rect
              key={`${row}-${col}`}
              x={105 + col * 35}
              y={165 + row * 30}
              width="28"
              height="22"
              rx="4"
              fill={["#ddd6fe", "#f5d0fe", "#bfdbfe", "#bbf7d0"][(row + col) % 4]}
            />
          )),
        )}
        <path d="M300 210h68" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
        <path d="M360 200l10 10l-10 10" fill="#475569" />
        <rect x="390" y="100" width="300" height="220" rx="28" fill="#ffffff" stroke="#ec4899" strokeWidth="3" />
        <text x="540" y="140" textAnchor="middle" fill="#be185d" fontSize="20" fontWeight="900">
          GPU
        </text>
        <text x="540" y="165" textAnchor="middle" fill="#64748b" fontSize="13" fontWeight="700">
          muitas threads fazendo trabalho homogêneo
        </text>
        {Array.from({ length: 5 }).map((_, row) =>
          Array.from({ length: 6 }).map((__, col) => (
            <rect
              key={`${row}-${col}`}
              x={430 + col * 36}
              y={185 + row * 24}
              width="24"
              height="16"
              rx="4"
              fill={["#fbcfe8", "#fecdd3", "#c4b5fd", "#a5f3fc"][(row + col) % 4]}
            />
          )),
        )}
      </svg>
    </figure>
  );
}

function CpuVsGpuVisual() {
  return (
    <figure className="rounded-[2rem] border border-sky-200 bg-sky-50 p-4 shadow-xl shadow-sky-900/5">
      <svg className="w-full" viewBox="0 0 760 340" role="img" aria-label="Comparação entre CPU e GPU">
        <rect width="760" height="340" rx="28" fill="#f0f9ff" />
        <text x="380" y="44" textAnchor="middle" fill="#075985" fontSize="22" fontWeight="900">
          Menos controle complexo por thread, mais trabalho total por janela de tempo
        </text>
        <rect x="80" y="90" width="240" height="200" rx="24" fill="#ffffff" stroke="#0284c7" strokeWidth="3" />
        <text x="200" y="125" textAnchor="middle" fill="#0369a1" fontSize="20" fontWeight="900">
          CPU
        </text>
        {["poucas threads fortes", "latência baixa", "controle flexível", "branching irregular"].map((line, index) => (
          <text key={line} x="200" y={165 + index * 28} textAnchor="middle" fill="#334155" fontSize="13" fontWeight="700">
            {line}
          </text>
        ))}
        <rect x="440" y="90" width="240" height="200" rx="24" fill="#ffffff" stroke="#a855f7" strokeWidth="3" />
        <text x="560" y="125" textAnchor="middle" fill="#7e22ce" fontSize="20" fontWeight="900">
          GPU
        </text>
        {["muitas threads coordenadas", "throughput alto", "dados homogêneos", "ótima para tensores"].map((line, index) => (
          <text key={line} x="560" y={165 + index * 28} textAnchor="middle" fill="#334155" fontSize="13" fontWeight="700">
            {line}
          </text>
        ))}
      </svg>
    </figure>
  );
}

function SimtVisual() {
  return (
    <figure className="rounded-[2rem] border border-violet-200 bg-violet-50 p-4 shadow-xl shadow-violet-900/5">
      <svg className="w-full" viewBox="0 0 760 340" role="img" aria-label="Threads em warps e divergência">
        <rect width="760" height="340" rx="28" fill="#faf5ff" />
        <text x="380" y="44" textAnchor="middle" fill="#5b21b6" fontSize="22" fontWeight="900">
          A GPU gosta quando o grupo inteiro segue o mesmo ritmo
        </text>
        <rect x="100" y="105" width="560" height="70" rx="22" fill="#ffffff" stroke="#8b5cf6" strokeWidth="3" />
        {Array.from({ length: 8 }).map((_, index) => (
          <g key={index}>
            <rect x={125 + index * 65} y="123" width="46" height="34" rx="10" fill="#ddd6fe" />
            <text x={148 + index * 65} y="145" textAnchor="middle" fill="#4c1d95" fontSize="12" fontWeight="900">
              T{index}
            </text>
          </g>
        ))}
        <rect x="100" y="210" width="250" height="70" rx="22" fill="#ecfeff" stroke="#0891b2" strokeWidth="3" />
        <text x="225" y="250" textAnchor="middle" fill="#0f172a" fontSize="16" fontWeight="900">
          fluxo uniforme → melhor eficiência
        </text>
        <rect x="410" y="210" width="250" height="70" rx="22" fill="#fff1f2" stroke="#e11d48" strokeWidth="3" />
        <text x="535" y="250" textAnchor="middle" fill="#0f172a" fontSize="16" fontWeight="900">
          caminhos divergentes → desperdício
        </text>
      </svg>
    </figure>
  );
}

function MemoryVisual() {
  return (
    <figure className="rounded-[2rem] border border-amber-200 bg-amber-50 p-4 shadow-xl shadow-amber-900/5">
      <svg className="w-full" viewBox="0 0 760 350" role="img" aria-label="Hierarquia de memória em GPU">
        <rect width="760" height="350" rx="28" fill="#fffbeb" />
        <text x="380" y="44" textAnchor="middle" fill="#92400e" fontSize="22" fontWeight="900">
          Desempenho depende do cálculo e do caminho dos dados
        </text>
        {[
          { y: 95, label: "registradores / on-chip", width: 180, fill: "#fde68a" },
          { y: 150, label: "memória compartilhada / cache", width: 280, fill: "#fdba74" },
          { y: 205, label: "memória global", width: 420, fill: "#fca5a5" },
          { y: 260, label: "armazenamento / host", width: 540, fill: "#bfdbfe" },
        ].map((bar) => (
          <g key={bar.label}>
            <rect x="110" y={bar.y} width={bar.width} height="34" rx="12" fill={bar.fill} />
            <text x="130" y={bar.y + 22} fill="#0f172a" fontSize="13" fontWeight="900">
              {bar.label}
            </text>
          </g>
        ))}
        <text x="380" y="322" textAnchor="middle" fill="#92400e" fontSize="14" fontWeight="800">
          Quanto mais distante o dado, maior o cuidado necessário para não desperdiçar throughput
        </text>
      </svg>
    </figure>
  );
}
