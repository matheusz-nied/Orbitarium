import type { LessonModule } from "../../../types/content";

export const visuals = {
  "vm-hero": VmHeroVisual,
  "vm-address-space": AddressSpaceVisual,
  "vm-page-table": PageTableVisual,
  "vm-fault": PageFaultVisual,
} satisfies LessonModule["visuals"];

function VmHeroVisual() {
  return (
    <figure className="overflow-hidden rounded-[2rem] border border-indigo-200 bg-white p-4 shadow-xl shadow-indigo-900/10">
      <svg className="w-full" viewBox="0 0 760 410" role="img" aria-label="Tradução de memória virtual para física">
        <defs>
          <linearGradient id="vmHeroBg" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#eef2ff" />
            <stop offset="50%" stopColor="#ecfeff" />
            <stop offset="100%" stopColor="#f5f3ff" />
          </linearGradient>
        </defs>
        <rect width="760" height="410" rx="32" fill="url(#vmHeroBg)" />
        <text x="380" y="52" textAnchor="middle" fill="#0f172a" fontSize="26" fontWeight="900">
          O processo vê memória contínua; o sistema vê tradução
        </text>
        <rect x="80" y="95" width="230" height="240" rx="24" fill="#ffffff" stroke="#6366f1" strokeWidth="3" />
        <text x="195" y="130" textAnchor="middle" fill="#4338ca" fontSize="20" fontWeight="900">
          Espaço virtual
        </text>
        {["Pág. 0", "Pág. 1", "Pág. 2", "Pág. 3"].map((label, index) => (
          <g key={label}>
            <rect x="115" y={150 + index * 40} width="160" height="28" rx="8" fill={["#c7d2fe", "#ddd6fe", "#bfdbfe", "#a7f3d0"][index]} />
            <text x="195" y={169 + index * 40} textAnchor="middle" fill="#312e81" fontSize="13" fontWeight="800">
              {label}
            </text>
          </g>
        ))}
        <rect x="330" y="145" width="110" height="135" rx="22" fill="#ffffff" stroke="#7c3aed" strokeWidth="3" />
        <text x="385" y="176" textAnchor="middle" fill="#6d28d9" fontSize="16" fontWeight="900">
          Page table
        </text>
        <text x="385" y="202" textAnchor="middle" fill="#64748b" fontSize="12" fontWeight="700">
          traduz e protege
        </text>
        <path d="M310 215h18" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
        <path d="M320 205l10 10l-10 10" fill="#475569" />
        <path d="M440 215h18" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
        <path d="M448 205l10 10l-10 10" fill="#475569" />
        <rect x="470" y="95" width="210" height="240" rx="24" fill="#ffffff" stroke="#0ea5e9" strokeWidth="3" />
        <text x="575" y="130" textAnchor="middle" fill="#0369a1" fontSize="20" fontWeight="900">
          RAM física
        </text>
        {["Frame 9", "Frame 2", "Frame 14", "Frame 6"].map((label, index) => (
          <g key={label}>
            <rect x="505" y={150 + index * 40} width="140" height="28" rx="8" fill={["#bae6fd", "#ddd6fe", "#fde68a", "#bbf7d0"][index]} />
            <text x="575" y={169 + index * 40} textAnchor="middle" fill="#0c4a6e" fontSize="13" fontWeight="800">
              {label}
            </text>
          </g>
        ))}
      </svg>
    </figure>
  );
}

function AddressSpaceVisual() {
  return (
    <figure className="rounded-[2rem] border border-sky-200 bg-sky-50 p-4 shadow-xl shadow-sky-900/5">
      <svg className="w-full" viewBox="0 0 760 330" role="img" aria-label="Cada processo enxerga seu próprio espaço de endereços">
        <rect width="760" height="330" rx="28" fill="#f0f9ff" />
        <text x="380" y="46" textAnchor="middle" fill="#075985" fontSize="22" fontWeight="900">
          O mesmo endereço virtual pode significar coisas diferentes
        </text>
        {[{ x: 90, title: "Processo A" }, { x: 420, title: "Processo B" }].map((box) => (
          <g key={box.title}>
            <rect x={box.x} y="90" width="250" height="190" rx="24" fill="#ffffff" stroke="#38bdf8" strokeWidth="3" />
            <text x={box.x + 125} y="124" textAnchor="middle" fill="#0369a1" fontSize="18" fontWeight="900">
              {box.title}
            </text>
            <rect x={box.x + 50} y="150" width="150" height="34" rx="10" fill="#bae6fd" />
            <text x={box.x + 125} y="172" textAnchor="middle" fill="#0c4a6e" fontSize="13" fontWeight="800">
              endereço virtual 0x1000
            </text>
            <rect x={box.x + 50} y="210" width="150" height="34" rx="10" fill={box.title === "Processo A" ? "#ddd6fe" : "#fde68a"} />
            <text x={box.x + 125} y="232" textAnchor="middle" fill="#0f172a" fontSize="13" fontWeight="800">
              {box.title === "Processo A" ? "frame físico 7" : "frame físico 19"}
            </text>
          </g>
        ))}
      </svg>
    </figure>
  );
}

function PageTableVisual() {
  return (
    <figure className="rounded-[2rem] border border-violet-200 bg-violet-50 p-4 shadow-xl shadow-violet-900/5">
      <svg className="w-full" viewBox="0 0 760 340" role="img" aria-label="Tabela de páginas e TLB">
        <rect width="760" height="340" rx="28" fill="#faf5ff" />
        <text x="380" y="46" textAnchor="middle" fill="#6d28d9" fontSize="22" fontWeight="900">
          Tradução em camadas: TLB primeiro, page table depois
        </text>
        <rect x="100" y="110" width="160" height="120" rx="22" fill="#ffffff" stroke="#8b5cf6" strokeWidth="3" />
        <text x="180" y="145" textAnchor="middle" fill="#6d28d9" fontSize="18" fontWeight="900">
          Endereço virtual
        </text>
        <text x="180" y="175" textAnchor="middle" fill="#475569" fontSize="13" fontWeight="700">
          VPN + offset
        </text>
        <rect x="300" y="95" width="160" height="70" rx="20" fill="#ffffff" stroke="#a855f7" strokeWidth="3" />
        <text x="380" y="135" textAnchor="middle" fill="#7e22ce" fontSize="18" fontWeight="900">
          TLB
        </text>
        <rect x="300" y="190" width="160" height="95" rx="20" fill="#ffffff" stroke="#7c3aed" strokeWidth="3" />
        <text x="380" y="228" textAnchor="middle" fill="#6d28d9" fontSize="18" fontWeight="900">
          Page table
        </text>
        <text x="380" y="252" textAnchor="middle" fill="#475569" fontSize="12" fontWeight="700">
          frame + permissões
        </text>
        <rect x="500" y="110" width="160" height="120" rx="22" fill="#ffffff" stroke="#0ea5e9" strokeWidth="3" />
        <text x="580" y="145" textAnchor="middle" fill="#0369a1" fontSize="18" fontWeight="900">
          Endereço físico
        </text>
        <text x="580" y="175" textAnchor="middle" fill="#475569" fontSize="13" fontWeight="700">
          PFN + offset
        </text>
        <path d="M260 170h32" stroke="#7c3aed" strokeWidth="5" strokeLinecap="round" />
        <path d="M282 160l10 10l-10 10" fill="#7c3aed" />
        <path d="M460 170h32" stroke="#0ea5e9" strokeWidth="5" strokeLinecap="round" />
        <path d="M482 160l10 10l-10 10" fill="#0ea5e9" />
      </svg>
    </figure>
  );
}

function PageFaultVisual() {
  return (
    <figure className="rounded-[2rem] border border-rose-200 bg-rose-50 p-4 shadow-xl shadow-rose-900/5">
      <svg className="w-full" viewBox="0 0 760 330" role="img" aria-label="Fluxo simplificado de page fault">
        <rect width="760" height="330" rx="28" fill="#fff1f2" />
        <text x="380" y="44" textAnchor="middle" fill="#9f1239" fontSize="22" fontWeight="900">
          Page fault: quando o acesso vira exceção
        </text>
        {[
          { x: 60, label: "CPU acessa página" },
          { x: 220, label: "MMU falha na tradução" },
          { x: 400, label: "Kernel trata o fault" },
          { x: 580, label: "Retoma a execução" },
        ].map((step) => (
          <g key={step.label}>
            <rect x={step.x} y="120" width="120" height="78" rx="18" fill="#ffffff" stroke="#fb7185" strokeWidth="3" />
            <text x={step.x + 60} y="152" textAnchor="middle" fill="#be123c" fontSize="13" fontWeight="900">
              {step.label}
            </text>
          </g>
        ))}
        <path d="M180 159h30" stroke="#e11d48" strokeWidth="5" strokeLinecap="round" />
        <path d="M202 149l10 10l-10 10" fill="#e11d48" />
        <path d="M340 159h40" stroke="#e11d48" strokeWidth="5" strokeLinecap="round" />
        <path d="M372 149l10 10l-10 10" fill="#e11d48" />
        <path d="M520 159h35" stroke="#e11d48" strokeWidth="5" strokeLinecap="round" />
        <path d="M547 149l10 10l-10 10" fill="#e11d48" />
        <text x="380" y="282" textAnchor="middle" fill="#9f1239" fontSize="14" fontWeight="800">
          Faults legítimos podem acontecer; frequentes demais viram gargalo severo
        </text>
      </svg>
    </figure>
  );
}
