import type { LessonModule } from "../../../types/content";

export const visuals = {
  "vies-hero": ViesHeroVisual,
  "treino-vs-teste": TreinoVsTesteVisual,
  "decomposicao-do-erro": DecomposicaoDoErroVisual,
  "alto-vies": AltoViesVisual,
  "alta-variancia": AltaVarianciaVisual,
  "datasets-sinteticos": DatasetsSinteticosVisual,
  "complexidade-e-erro": ComplexidadeEErroVisual,
  "reamostragem-instabilidade": ReamostragemInstabilidadeVisual,
  "diagnostico-pratico": DiagnosticoPraticoVisual,
} satisfies LessonModule["visuals"];

function ViesHeroVisual() {
  return (
    <figure className="overflow-hidden rounded-[2rem] border border-amber-200 bg-white p-4 shadow-xl shadow-amber-900/10">
      <svg className="w-full" viewBox="0 0 760 420" role="img" aria-label="Viés, variância e erro irredutível">
        <defs>
          <linearGradient id="bvHeroBg" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#fffbeb" />
            <stop offset="50%" stopColor="#eef2ff" />
            <stop offset="100%" stopColor="#fff1f2" />
          </linearGradient>
        </defs>
        <rect width="760" height="420" rx="28" fill="url(#bvHeroBg)" />
        <text x="380" y="44" textAnchor="middle" fill="#0f172a" fontSize="26" fontWeight="900">
          Erro ruim não nasce sempre da mesma causa
        </text>
        {[
          {
            x: 64,
            title: "viés",
            body1: "modelo simples",
            body2: "erro sistemático",
            color: "#10b981",
          },
          {
            x: 286,
            title: "variância",
            body1: "modelo instável",
            body2: "erro entre amostras",
            color: "#7c3aed",
          },
          {
            x: 508,
            title: "ruído",
            body1: "mundo imprevisível",
            body2: "erro irredutível",
            color: "#f97316",
          },
        ].map((card) => (
          <g key={card.title}>
            <rect x={card.x} y="110" width="188" height="184" rx="24" fill="#ffffff" stroke={card.color} strokeWidth="3" />
            <text x={card.x + 94} y="148" textAnchor="middle" fill={card.color} fontSize="22" fontWeight="900">
              {card.title}
            </text>
            <text x={card.x + 94} y="208" textAnchor="middle" fill="#475569" fontSize="15" fontWeight="700">
              {card.body1}
            </text>
            <text x={card.x + 94} y="236" textAnchor="middle" fill="#475569" fontSize="15" fontWeight="700">
              {card.body2}
            </text>
          </g>
        ))}
        <rect x="164" y="326" width="432" height="46" rx="18" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
        <text x="380" y="355" textAnchor="middle" fill="#334155" fontSize="14" fontWeight="800">
          Diagnosticar a origem do erro vem antes de escolher o remédio
        </text>
      </svg>
    </figure>
  );
}

function TreinoVsTesteVisual() {
  return (
    <figure className="rounded-[2rem] border border-indigo-200 bg-indigo-50 p-4 shadow-xl shadow-indigo-900/5">
      <svg className="w-full" viewBox="0 0 760 330" role="img" aria-label="Treino versus teste">
        <rect width="760" height="330" rx="28" fill="#eef2ff" />
        <text x="380" y="42" textAnchor="middle" fill="#3730a3" fontSize="22" fontWeight="900">
          Aprender o treino não basta; é preciso generalizar
        </text>
        <rect x="92" y="104" width="220" height="150" rx="22" fill="#ffffff" stroke="#6366f1" strokeWidth="3" />
        <text x="202" y="138" textAnchor="middle" fill="#3730a3" fontSize="18" fontWeight="900">
          treino
        </text>
        <path d="M 126 214 C 170 150, 210 242, 276 156" fill="none" stroke="#4f46e5" strokeWidth="5" />
        <text x="202" y="286" textAnchor="middle" fill="#475569" fontSize="13" fontWeight="700">
          o modelo viu esses exemplos
        </text>
        <rect x="448" y="104" width="220" height="150" rx="22" fill="#ffffff" stroke="#e11d48" strokeWidth="3" />
        <text x="558" y="138" textAnchor="middle" fill="#9f1239" fontSize="18" fontWeight="900">
          teste / validação
        </text>
        <path d="M 482 214 C 526 150, 566 242, 632 156" fill="none" stroke="#e11d48" strokeWidth="5" strokeDasharray="9 6" />
        <text x="558" y="286" textAnchor="middle" fill="#475569" fontSize="13" fontWeight="700">
          é aqui que a generalização aparece
        </text>
      </svg>
    </figure>
  );
}

function DecomposicaoDoErroVisual() {
  return (
    <figure className="rounded-[2rem] border border-teal-200 bg-teal-50 p-4 shadow-xl shadow-teal-900/5">
      <svg className="w-full" viewBox="0 0 760 320" role="img" aria-label="Erro decomposto em viés, variância e ruído">
        <rect width="760" height="320" rx="28" fill="#f0fdfa" />
        <text x="380" y="42" textAnchor="middle" fill="#0f766e" fontSize="22" fontWeight="900">
          Uma leitura clássica: erro total = viés² + variância + ruído
        </text>
        <rect x="120" y="108" width="520" height="76" rx="24" fill="#ffffff" stroke="#99f6e4" strokeWidth="2" />
        <rect x="140" y="126" width="160" height="40" rx="16" fill="#34d399" />
        <rect x="312" y="126" width="152" height="40" rx="16" fill="#c084fc" />
        <rect x="476" y="126" width="144" height="40" rx="16" fill="#fb923c" />
        <text x="220" y="151" textAnchor="middle" fill="#064e3b" fontSize="15" fontWeight="900">
          viés²
        </text>
        <text x="388" y="151" textAnchor="middle" fill="#581c87" fontSize="15" fontWeight="900">
          variância
        </text>
        <text x="548" y="151" textAnchor="middle" fill="#7c2d12" fontSize="15" fontWeight="900">
          ruído
        </text>
        <text x="380" y="240" textAnchor="middle" fill="#0f766e" fontSize="15" fontWeight="800">
          Cada termo aponta para uma origem diferente do fracasso preditivo
        </text>
      </svg>
    </figure>
  );
}

function AltoViesVisual() {
  return (
    <figure className="rounded-[2rem] border border-emerald-200 bg-emerald-50 p-4 shadow-xl shadow-emerald-900/5">
      <svg className="w-full" viewBox="0 0 760 340" role="img" aria-label="Modelo de alto viés subajustando curva">
        <rect width="760" height="340" rx="28" fill="#ecfdf5" />
        <text x="380" y="42" textAnchor="middle" fill="#065f46" fontSize="22" fontWeight="900">
          Alto viés: hipótese média sistematicamente errada
        </text>
        <line x1="98" y1="282" x2="662" y2="282" stroke="#94a3b8" strokeWidth="2" />
        <line x1="98" y1="88" x2="98" y2="282" stroke="#94a3b8" strokeWidth="2" />
        <path d="M 116 230 C 196 120, 296 208, 404 126 S 564 210, 644 152" fill="none" stroke="#0f172a" strokeWidth="5" strokeDasharray="8 5" />
        <line x1="120" y1="218" x2="642" y2="168" stroke="#10b981" strokeWidth="5" />
        <text x="630" y="160" fill="#065f46" fontSize="14" fontWeight="800">
          modelo simples demais
        </text>
      </svg>
    </figure>
  );
}

function AltaVarianciaVisual() {
  return (
    <figure className="rounded-[2rem] border border-rose-200 bg-rose-50 p-4 shadow-xl shadow-rose-900/5">
      <svg className="w-full" viewBox="0 0 760 340" role="img" aria-label="Modelo de alta variância oscilando com ruído">
        <rect width="760" height="340" rx="28" fill="#fff1f2" />
        <text x="380" y="42" textAnchor="middle" fill="#9f1239" fontSize="22" fontWeight="900">
          Alta variância: curva nervosa demais para a amostra
        </text>
        <line x1="98" y1="282" x2="662" y2="282" stroke="#94a3b8" strokeWidth="2" />
        <line x1="98" y1="88" x2="98" y2="282" stroke="#94a3b8" strokeWidth="2" />
        <path d="M 116 230 C 196 120, 296 208, 404 126 S 564 210, 644 152" fill="none" stroke="#0f172a" strokeWidth="5" strokeDasharray="8 5" />
        <path d="M 116 220 C 166 98, 220 272, 284 138 S 360 232, 414 116 S 514 252, 644 144" fill="none" stroke="#e11d48" strokeWidth="5" />
        <text x="558" y="114" fill="#9f1239" fontSize="14" fontWeight="800">
          segue ruído local
        </text>
      </svg>
    </figure>
  );
}

function DatasetsSinteticosVisual() {
  return (
    <figure className="rounded-[2rem] border border-cyan-200 bg-cyan-50 p-4 shadow-xl shadow-cyan-900/5">
      <svg className="w-full" viewBox="0 0 760 320" role="img" aria-label="Datasets sintéticos e diferentes ajustes">
        <rect width="760" height="320" rx="28" fill="#ecfeff" />
        <text x="380" y="42" textAnchor="middle" fill="#0f766e" fontSize="22" fontWeight="900">
          Dados sintéticos deixam o trade-off visível
        </text>
        <rect x="72" y="96" width="188" height="166" rx="22" fill="#ffffff" stroke="#22d3ee" strokeWidth="2" />
        <rect x="286" y="96" width="188" height="166" rx="22" fill="#ffffff" stroke="#22d3ee" strokeWidth="2" />
        <rect x="500" y="96" width="188" height="166" rx="22" fill="#ffffff" stroke="#22d3ee" strokeWidth="2" />
        <text x="166" y="126" textAnchor="middle" fill="#0f766e" fontSize="15" fontWeight="900">
          modelo rígido
        </text>
        <text x="380" y="126" textAnchor="middle" fill="#0f766e" fontSize="15" fontWeight="900">
          modelo adequado
        </text>
        <text x="594" y="126" textAnchor="middle" fill="#0f766e" fontSize="15" fontWeight="900">
          modelo nervoso
        </text>
        <line x1="98" y1="228" x2="230" y2="196" stroke="#10b981" strokeWidth="4" />
        <path d="M 308 230 C 340 174, 386 216, 450 156" fill="none" stroke="#10b981" strokeWidth="4" />
        <path d="M 520 226 C 548 138, 566 240, 598 164 S 646 214, 670 146" fill="none" stroke="#e11d48" strokeWidth="4" />
      </svg>
    </figure>
  );
}

function ComplexidadeEErroVisual() {
  return (
    <figure className="rounded-[2rem] border border-amber-200 bg-amber-50 p-4 shadow-xl shadow-amber-900/5">
      <svg className="w-full" viewBox="0 0 760 340" role="img" aria-label="Curvas de viés, variância e erro total em função da complexidade">
        <rect width="760" height="340" rx="28" fill="#fffbeb" />
        <text x="380" y="42" textAnchor="middle" fill="#92400e" fontSize="22" fontWeight="900">
          Complexidade redistribui tipos de erro
        </text>
        <line x1="96" y1="282" x2="662" y2="282" stroke="#94a3b8" strokeWidth="2" />
        <line x1="96" y1="88" x2="96" y2="282" stroke="#94a3b8" strokeWidth="2" />
        <path d="M 116 110 C 220 122, 296 160, 388 206 S 560 244, 642 252" fill="none" stroke="#10b981" strokeWidth="5" />
        <path d="M 116 260 C 222 248, 308 214, 420 170 S 540 122, 642 102" fill="none" stroke="#db2777" strokeWidth="5" />
        <path d="M 116 178 C 214 150, 302 132, 386 140 S 520 170, 642 224" fill="none" stroke="#7c3aed" strokeWidth="6" />
        <text x="172" y="108" fill="#065f46" fontSize="14" fontWeight="800">
          viés²
        </text>
        <text x="620" y="106" fill="#9d174d" fontSize="14" fontWeight="800">
          variância
        </text>
        <text x="386" y="132" textAnchor="middle" fill="#6d28d9" fontSize="14" fontWeight="800">
          erro total
        </text>
      </svg>
    </figure>
  );
}

function ReamostragemInstabilidadeVisual() {
  return (
    <figure className="rounded-[2rem] border border-violet-200 bg-violet-50 p-4 shadow-xl shadow-violet-900/5">
      <svg className="w-full" viewBox="0 0 760 330" role="img" aria-label="Várias curvas aprendidas em reamostragens diferentes">
        <rect width="760" height="330" rx="28" fill="#faf5ff" />
        <text x="380" y="42" textAnchor="middle" fill="#6d28d9" fontSize="22" fontWeight="900">
          Variância aparece quando repetimos o treinamento
        </text>
        <line x1="98" y1="278" x2="662" y2="278" stroke="#94a3b8" strokeWidth="2" />
        <line x1="98" y1="88" x2="98" y2="278" stroke="#94a3b8" strokeWidth="2" />
        {[
          "M 116 224 C 186 152, 248 206, 336 146 S 482 214, 644 150",
          "M 116 234 C 184 170, 254 222, 338 162 S 490 226, 644 164",
          "M 116 214 C 198 136, 256 190, 350 140 S 496 208, 644 144",
          "M 116 242 C 194 184, 258 228, 342 176 S 486 232, 644 172",
        ].map((path, index) => (
          <path key={index} d={path} fill="none" stroke={index === 2 ? "#7c3aed" : "#d8b4fe"} strokeWidth={index === 2 ? 5 : 3} />
        ))}
      </svg>
    </figure>
  );
}

function DiagnosticoPraticoVisual() {
  return (
    <figure className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-xl shadow-slate-900/5">
      <svg className="w-full" viewBox="0 0 760 320" role="img" aria-label="Checklist de diagnóstico para viés e variância">
        <rect width="760" height="320" rx="28" fill="#f8fafc" />
        <text x="380" y="42" textAnchor="middle" fill="#0f172a" fontSize="22" fontWeight="900">
          Transforme teoria em checklist de depuração
        </text>
        <rect x="92" y="94" width="248" height="170" rx="22" fill="#ffffff" stroke="#10b981" strokeWidth="3" />
        <rect x="420" y="94" width="248" height="170" rx="22" fill="#ffffff" stroke="#e11d48" strokeWidth="3" />
        <text x="216" y="126" textAnchor="middle" fill="#065f46" fontSize="18" fontWeight="900">
          suspeita de alto viés
        </text>
        <text x="544" y="126" textAnchor="middle" fill="#9f1239" fontSize="18" fontWeight="900">
          suspeita de alta variância
        </text>
        {[
          ["treino ruim", 162],
          ["validação também ruim", 190],
          ["falta capacidade", 218],
        ].map(([line, y]) => (
          <text key={line} x="216" y={Number(y)} textAnchor="middle" fill="#475569" fontSize="14" fontWeight="700">
            {line}
          </text>
        ))}
        {[
          ["treino ótimo", 162],
          ["validação piora", 190],
          ["sensível ao acaso", 218],
        ].map(([line, y]) => (
          <text key={line} x="544" y={Number(y)} textAnchor="middle" fill="#475569" fontSize="14" fontWeight="700">
            {line}
          </text>
        ))}
      </svg>
    </figure>
  );
}
