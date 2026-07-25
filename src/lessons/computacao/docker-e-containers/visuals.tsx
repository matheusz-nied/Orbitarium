import type { LessonModule } from "../../../types/content";

export const visuals = {
  "docker-hero": DockerHeroVisual,
  "docker-stack": DockerStackVisual,
  "docker-layers": DockerLayersVisual,
  "docker-isolation": DockerIsolationVisual,
} satisfies LessonModule["visuals"];

function DockerHeroVisual() {
  return (
    <figure className="overflow-hidden rounded-[2rem] border border-blue-200 bg-white p-4 shadow-xl shadow-blue-900/10">
      <svg className="w-full" viewBox="0 0 760 400" role="img" aria-label="Docker empacotando app e dependências">
        <defs>
          <linearGradient id="dockerHeroBg" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#eff6ff" />
            <stop offset="55%" stopColor="#ecfeff" />
            <stop offset="100%" stopColor="#eef2ff" />
          </linearGradient>
        </defs>
        <rect width="760" height="400" rx="32" fill="url(#dockerHeroBg)" />
        <text x="380" y="50" textAnchor="middle" fill="#0f172a" fontSize="26" fontWeight="900">
          Empacotar app + dependências com isolamento do SO
        </text>
        <rect x="90" y="135" width="190" height="140" rx="24" fill="#ffffff" stroke="#3b82f6" strokeWidth="3" />
        <text x="185" y="170" textAnchor="middle" fill="#1d4ed8" fontSize="20" fontWeight="900">
          Imagem
        </text>
        {["sistema base", "bibliotecas", "app"].map((label, index) => (
          <rect key={label} x="120" y={190 + index * 24} width="130" height="18" rx="6" fill={["#dbeafe", "#bfdbfe", "#93c5fd"][index]} />
        ))}
        <path d="M280 205h80" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
        <path d="M352 195l10 10l-10 10" fill="#475569" />
        <rect x="390" y="120" width="280" height="170" rx="28" fill="#ffffff" stroke="#0ea5e9" strokeWidth="3" />
        <text x="530" y="158" textAnchor="middle" fill="#0369a1" fontSize="20" fontWeight="900">
          Container em execução
        </text>
        <text x="530" y="188" textAnchor="middle" fill="#475569" fontSize="13" fontWeight="700">
          processo principal
        </text>
        <text x="530" y="210" textAnchor="middle" fill="#475569" fontSize="13" fontWeight="700">
          rede + volume + limites
        </text>
        <text x="530" y="232" textAnchor="middle" fill="#475569" fontSize="13" fontWeight="700">
          kernel compartilhado com host
        </text>
      </svg>
    </figure>
  );
}

function DockerStackVisual() {
  return (
    <figure className="rounded-[2rem] border border-emerald-200 bg-emerald-50 p-4 shadow-xl shadow-emerald-900/5">
      <svg className="w-full" viewBox="0 0 760 340" role="img" aria-label="Stack de aplicação, container engine e kernel">
        <rect width="760" height="340" rx="28" fill="#ecfdf5" />
        <text x="380" y="44" textAnchor="middle" fill="#065f46" fontSize="22" fontWeight="900">
          O container vive sobre o engine e o kernel do host
        </text>
        {[
          { y: 90, label: "Aplicação + dependências", fill: "#bbf7d0" },
          { y: 145, label: "Container runtime / engine", fill: "#d1fae5" },
          { y: 200, label: "Kernel do host", fill: "#a7f3d0" },
          { y: 255, label: "CPU • memória • disco • rede", fill: "#ecfccb" },
        ].map((layer) => (
          <g key={layer.label}>
            <rect x="140" y={layer.y} width="480" height="34" rx="12" fill={layer.fill} />
            <text x="380" y={layer.y + 22} textAnchor="middle" fill="#0f172a" fontSize="14" fontWeight="900">
              {layer.label}
            </text>
          </g>
        ))}
      </svg>
    </figure>
  );
}

function DockerLayersVisual() {
  return (
    <figure className="rounded-[2rem] border border-violet-200 bg-violet-50 p-4 shadow-xl shadow-violet-900/5">
      <svg className="w-full" viewBox="0 0 760 340" role="img" aria-label="Camadas de imagem Docker">
        <rect width="760" height="340" rx="28" fill="#faf5ff" />
        <text x="380" y="44" textAnchor="middle" fill="#5b21b6" fontSize="22" fontWeight="900">
          Imagem em camadas: reaproveitar em vez de reconstruir tudo
        </text>
        {[
          { y: 95, label: "FROM base image", fill: "#ddd6fe" },
          { y: 145, label: "RUN instalar dependências", fill: "#c4b5fd" },
          { y: 195, label: "COPY arquivos da app", fill: "#a5b4fc" },
          { y: 245, label: "CMD iniciar serviço", fill: "#e9d5ff" },
        ].map((layer) => (
          <g key={layer.label}>
            <rect x="180" y={layer.y} width="400" height="34" rx="12" fill={layer.fill} />
            <text x="380" y={layer.y + 22} textAnchor="middle" fill="#312e81" fontSize="14" fontWeight="900">
              {layer.label}
            </text>
          </g>
        ))}
      </svg>
    </figure>
  );
}

function DockerIsolationVisual() {
  return (
    <figure className="rounded-[2rem] border border-amber-200 bg-amber-50 p-4 shadow-xl shadow-amber-900/5">
      <svg className="w-full" viewBox="0 0 760 340" role="img" aria-label="Namespaces e cgroups por trás dos containers">
        <rect width="760" height="340" rx="28" fill="#fffbeb" />
        <text x="380" y="44" textAnchor="middle" fill="#92400e" fontSize="22" fontWeight="900">
          O kernel separa visão e controla consumo de recursos
        </text>
        <rect x="110" y="110" width="220" height="160" rx="24" fill="#ffffff" stroke="#f59e0b" strokeWidth="3" />
        <text x="220" y="145" textAnchor="middle" fill="#92400e" fontSize="18" fontWeight="900">
          Namespaces
        </text>
        <text x="220" y="175" textAnchor="middle" fill="#475569" fontSize="13" fontWeight="700">
          PID • rede • mounts
        </text>
        <text x="220" y="198" textAnchor="middle" fill="#475569" fontSize="13" fontWeight="700">
          visão isolada
        </text>
        <rect x="430" y="110" width="220" height="160" rx="24" fill="#ffffff" stroke="#d97706" strokeWidth="3" />
        <text x="540" y="145" textAnchor="middle" fill="#92400e" fontSize="18" fontWeight="900">
          Cgroups
        </text>
        <text x="540" y="175" textAnchor="middle" fill="#475569" fontSize="13" fontWeight="700">
          CPU • memória • I/O
        </text>
        <text x="540" y="198" textAnchor="middle" fill="#475569" fontSize="13" fontWeight="700">
          limites e contabilidade
        </text>
      </svg>
    </figure>
  );
}
