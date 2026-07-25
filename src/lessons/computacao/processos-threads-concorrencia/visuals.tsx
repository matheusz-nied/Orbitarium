import type { LessonModule } from "../../../types/content";

export const visuals = {
  "ptc-hero": HeroVisual,
  "ptc-process-thread": ProcessThreadVisual,
  "ptc-lifecycle": LifecycleVisual,
  "ptc-sync": SyncVisual,
} satisfies LessonModule["visuals"];

function HeroVisual() {
  return (
    <figure className="overflow-hidden rounded-[2rem] border border-violet-200 bg-white p-4 shadow-xl shadow-violet-900/10">
      <svg className="w-full" viewBox="0 0 760 400" role="img" aria-label="Múltiplas unidades de execução concorrendo">
        <defs>
          <linearGradient id="ptcHeroBg" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#f5f3ff" />
            <stop offset="50%" stopColor="#eef2ff" />
            <stop offset="100%" stopColor="#ecfeff" />
          </linearGradient>
        </defs>
        <rect width="760" height="400" rx="32" fill="url(#ptcHeroBg)" />
        <text x="380" y="52" textAnchor="middle" fill="#0f172a" fontSize="26" fontWeight="900">
          Várias tarefas, poucos recursos, muita coordenação
        </text>
        <rect x="70" y="95" width="260" height="230" rx="24" fill="#ffffff" stroke="#8b5cf6" strokeWidth="3" />
        <text x="200" y="130" textAnchor="middle" fill="#6d28d9" fontSize="20" fontWeight="900">
          Processo
        </text>
        {["Thread A", "Thread B", "Thread C"].map((label, index) => (
          <g key={label}>
            <rect x="100" y={155 + index * 52} width="200" height="36" rx="12" fill={["#ddd6fe", "#c4b5fd", "#a5f3fc"][index]} />
            <text x="200" y={178 + index * 52} textAnchor="middle" fill="#4c1d95" fontSize="14" fontWeight="800">
              {label}
            </text>
          </g>
        ))}
        <text x="200" y="305" textAnchor="middle" fill="#64748b" fontSize="13" fontWeight="700">
          compartilham heap e arquivos
        </text>
        <rect x="430" y="120" width="250" height="70" rx="22" fill="#ffffff" stroke="#2563eb" strokeWidth="3" />
        <text x="555" y="162" textAnchor="middle" fill="#1d4ed8" fontSize="20" fontWeight="900">
          CPU / núcleos
        </text>
        <path d="M330 210 C390 210, 390 155, 430 155" stroke="#475569" strokeWidth="5" fill="none" />
        <path d="M330 240 C390 240, 390 155, 430 155" stroke="#475569" strokeWidth="5" fill="none" />
        <path d="M330 270 C390 270, 390 155, 430 155" stroke="#475569" strokeWidth="5" fill="none" />
        <rect x="430" y="225" width="250" height="100" rx="24" fill="#eff6ff" stroke="#38bdf8" strokeWidth="3" />
        <text x="555" y="257" textAnchor="middle" fill="#0369a1" fontSize="18" fontWeight="900">
          Desafio
        </text>
        <text x="555" y="283" textAnchor="middle" fill="#0f172a" fontSize="13" fontWeight="700">
          intercalar, paralelizar
        </text>
        <text x="555" y="303" textAnchor="middle" fill="#0f172a" fontSize="13" fontWeight="700">
          sem corromper estado
        </text>
      </svg>
    </figure>
  );
}

function ProcessThreadVisual() {
  return (
    <figure className="rounded-[2rem] border border-blue-200 bg-blue-50 p-4 shadow-xl shadow-blue-900/5">
      <svg className="w-full" viewBox="0 0 760 360" role="img" aria-label="Comparação entre processos e threads">
        <rect width="760" height="360" rx="28" fill="#eff6ff" />
        <text x="380" y="46" textAnchor="middle" fill="#1e3a8a" fontSize="22" fontWeight="900">
          Processo isola mais; thread compartilha mais
        </text>
        <rect x="70" y="90" width="270" height="220" rx="24" fill="#ffffff" stroke="#3b82f6" strokeWidth="3" />
        <text x="205" y="125" textAnchor="middle" fill="#1d4ed8" fontSize="20" fontWeight="900">
          Processo
        </text>
        {["Código", "Heap", "Arquivos", "Pilha principal"].map((label, index) => (
          <g key={label}>
            <rect x="105" y={145 + index * 34} width="200" height="24" rx="8" fill="#dbeafe" />
            <text x="205" y={161 + index * 34} textAnchor="middle" fill="#1e40af" fontSize="12" fontWeight="800">
              {label}
            </text>
          </g>
        ))}
        <rect x="420" y="90" width="270" height="220" rx="24" fill="#ffffff" stroke="#7c3aed" strokeWidth="3" />
        <text x="555" y="125" textAnchor="middle" fill="#6d28d9" fontSize="20" fontWeight="900">
          Mesmo processo, várias threads
        </text>
        <rect x="450" y="145" width="210" height="32" rx="10" fill="#ede9fe" />
        <text x="555" y="166" textAnchor="middle" fill="#5b21b6" fontSize="13" fontWeight="800">
          Código + heap + arquivos compartilhados
        </text>
        {["Thread A", "Thread B", "Thread C"].map((label, index) => (
          <g key={label}>
            <rect x={450 + index * 66} y="205" width="58" height="70" rx="12" fill="#ddd6fe" />
            <text x={479 + index * 66} y="232" textAnchor="middle" fill="#4c1d95" fontSize="12" fontWeight="900">
              {label}
            </text>
            <text x={479 + index * 66} y="254" textAnchor="middle" fill="#6d28d9" fontSize="10" fontWeight="800">
              pilha própria
            </text>
          </g>
        ))}
      </svg>
    </figure>
  );
}

function LifecycleVisual() {
  return (
    <figure className="rounded-[2rem] border border-amber-200 bg-amber-50 p-4 shadow-xl shadow-amber-900/5">
      <svg className="w-full" viewBox="0 0 760 320" role="img" aria-label="Estados de execução">
        <rect width="760" height="320" rx="28" fill="#fffbeb" />
        <text x="380" y="46" textAnchor="middle" fill="#92400e" fontSize="22" fontWeight="900">
          Uma tarefa passa mais tempo transitando do que rodando
        </text>
        {[
          { x: 80, label: "Pronta", color: "#fde68a" },
          { x: 300, label: "Rodando", color: "#a7f3d0" },
          { x: 520, label: "Bloqueada", color: "#dbeafe" },
        ].map((item) => (
          <g key={item.label}>
            <rect x={item.x} y="120" width="160" height="70" rx="22" fill={item.color} stroke="#f59e0b" strokeWidth="3" />
            <text x={item.x + 80} y="162" textAnchor="middle" fill="#78350f" fontSize="20" fontWeight="900">
              {item.label}
            </text>
          </g>
        ))}
        <path d="M240 155h46" stroke="#92400e" strokeWidth="5" strokeLinecap="round" />
        <path d="M278 145l10 10l-10 10" fill="#92400e" />
        <path d="M460 155h46" stroke="#92400e" strokeWidth="5" strokeLinecap="round" />
        <path d="M498 145l10 10l-10 10" fill="#92400e" />
        <path d="M520 210 C520 255, 220 255, 220 198" stroke="#b45309" strokeWidth="4" fill="none" />
        <text x="380" y="286" textAnchor="middle" fill="#92400e" fontSize="14" fontWeight="800">
          E/S, locks e eventos mudam o estado; o escalonador reage a essas transições
        </text>
      </svg>
    </figure>
  );
}

function SyncVisual() {
  return (
    <figure className="rounded-[2rem] border border-rose-200 bg-rose-50 p-4 shadow-xl shadow-rose-900/5">
      <svg className="w-full" viewBox="0 0 760 340" role="img" aria-label="Sincronização e deadlock">
        <rect width="760" height="340" rx="28" fill="#fff1f2" />
        <text x="380" y="46" textAnchor="middle" fill="#9f1239" fontSize="22" fontWeight="900">
          Compartilhar sem protocolo leva a corrida ou deadlock
        </text>
        <rect x="90" y="100" width="220" height="150" rx="24" fill="#ffffff" stroke="#fb7185" strokeWidth="3" />
        <text x="200" y="132" textAnchor="middle" fill="#be123c" fontSize="18" fontWeight="900">
          Sem lock
        </text>
        <text x="200" y="175" textAnchor="middle" fill="#334155" fontSize="13" fontWeight="700">
          T1 lê 10
        </text>
        <text x="200" y="198" textAnchor="middle" fill="#334155" fontSize="13" fontWeight="700">
          T2 lê 10
        </text>
        <text x="200" y="221" textAnchor="middle" fill="#334155" fontSize="13" fontWeight="700">
          T1 escreve 11
        </text>
        <text x="200" y="244" textAnchor="middle" fill="#334155" fontSize="13" fontWeight="700">
          T2 escreve 11
        </text>
        <rect x="450" y="100" width="220" height="150" rx="24" fill="#ffffff" stroke="#e11d48" strokeWidth="3" />
        <text x="560" y="132" textAnchor="middle" fill="#9f1239" fontSize="18" fontWeight="900">
          Com lock bem usado
        </text>
        <text x="560" y="175" textAnchor="middle" fill="#334155" fontSize="13" fontWeight="700">
          T1 entra
        </text>
        <text x="560" y="198" textAnchor="middle" fill="#334155" fontSize="13" fontWeight="700">
          atualiza e sai
        </text>
        <text x="560" y="221" textAnchor="middle" fill="#334155" fontSize="13" fontWeight="700">
          T2 entra depois
        </text>
        <text x="560" y="244" textAnchor="middle" fill="#334155" fontSize="13" fontWeight="700">
          resultado preservado
        </text>
        <text x="380" y="305" textAnchor="middle" fill="#9f1239" fontSize="14" fontWeight="800">
          Coordenação protege consistência, mas também precisa evitar ciclos de espera
        </text>
      </svg>
    </figure>
  );
}
