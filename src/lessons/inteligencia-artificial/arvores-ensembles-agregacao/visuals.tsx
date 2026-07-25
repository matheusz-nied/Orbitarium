import type { LessonModule } from "../../../types/content";

export const visuals = {
  "arvores-hero": ArvoresHeroVisual,
  "arvore-intuicao": ArvoreIntuicaoVisual,
  "particoes-do-espaco": ParticoesDoEspacoVisual,
  "impureza-e-ganho": ImpurezaEGanhoVisual,
  "instabilidade-da-arvore": InstabilidadeDaArvoreVisual,
  "bagging-random-forest": BaggingRandomForestVisual,
  "votacao-coletiva": VotacaoColetivaVisual,
  "boosting-sequencial": BoostingSequencialVisual,
  "importancia-de-atributos": ImportanciaDeAtributosVisual,
} satisfies LessonModule["visuals"];

function ArvoresHeroVisual() {
  return (
    <figure className="overflow-hidden rounded-[2rem] border border-emerald-200 bg-white p-4 shadow-xl shadow-emerald-900/10">
      <svg className="w-full" viewBox="0 0 760 420" role="img" aria-label="Evolução de árvore única para ensemble">
        <defs>
          <linearGradient id="treeHeroBg" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#ecfdf5" />
            <stop offset="55%" stopColor="#eef2ff" />
            <stop offset="100%" stopColor="#fffbeb" />
          </linearGradient>
        </defs>
        <rect width="760" height="420" rx="28" fill="url(#treeHeroBg)" />
        <text x="380" y="44" textAnchor="middle" fill="#0f172a" fontSize="26" fontWeight="900">
          Uma árvore explica; um ensemble estabiliza
        </text>
        <g transform="translate(110,98)">
          <circle cx="80" cy="24" r="18" fill="#10b981" />
          <circle cx="34" cy="88" r="16" fill="#34d399" />
          <circle cx="126" cy="88" r="16" fill="#34d399" />
          <circle cx="12" cy="148" r="14" fill="#a7f3d0" />
          <circle cx="58" cy="148" r="14" fill="#a7f3d0" />
          <circle cx="104" cy="148" r="14" fill="#a7f3d0" />
          <circle cx="150" cy="148" r="14" fill="#a7f3d0" />
          <line x1="80" y1="42" x2="34" y2="72" stroke="#047857" strokeWidth="4" />
          <line x1="80" y1="42" x2="126" y2="72" stroke="#047857" strokeWidth="4" />
          <line x1="34" y1="104" x2="12" y2="134" stroke="#047857" strokeWidth="4" />
          <line x1="34" y1="104" x2="58" y2="134" stroke="#047857" strokeWidth="4" />
          <line x1="126" y1="104" x2="104" y2="134" stroke="#047857" strokeWidth="4" />
          <line x1="126" y1="104" x2="150" y2="134" stroke="#047857" strokeWidth="4" />
          <text x="80" y="196" textAnchor="middle" fill="#047857" fontSize="15" fontWeight="900">
            árvore única
          </text>
        </g>
        <path d="M 292 188 H 362" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
        <path d="M 350 178 L 362 188 L 350 198" fill="#475569" />
        <g transform="translate(418,98)">
          {[0, 1, 2].map((col) => (
            <g key={col} transform={`translate(${col * 88},0)`}>
              <circle cx="38" cy="24" r="14" fill="#7c3aed" />
              <circle cx="14" cy="76" r="12" fill="#a78bfa" />
              <circle cx="62" cy="76" r="12" fill="#a78bfa" />
              <line x1="38" y1="38" x2="14" y2="64" stroke="#6d28d9" strokeWidth="3" />
              <line x1="38" y1="38" x2="62" y2="64" stroke="#6d28d9" strokeWidth="3" />
            </g>
          ))}
          <rect x="22" y="130" width="210" height="60" rx="18" fill="#ffffff" stroke="#c4b5fd" strokeWidth="2" />
          <text x="127" y="158" textAnchor="middle" fill="#6d28d9" fontSize="16" fontWeight="900">
            voto / média
          </text>
          <text x="127" y="180" textAnchor="middle" fill="#475569" fontSize="13" fontWeight="700">
            menos variância, decisão mais robusta
          </text>
        </g>
      </svg>
    </figure>
  );
}

function ArvoreIntuicaoVisual() {
  return (
    <figure className="rounded-[2rem] border border-teal-200 bg-teal-50 p-4 shadow-xl shadow-teal-900/5">
      <svg className="w-full" viewBox="0 0 760 320" role="img" aria-label="Árvore como sequência de perguntas">
        <rect width="760" height="320" rx="28" fill="#f0fdfa" />
        <text x="380" y="42" textAnchor="middle" fill="#0f766e" fontSize="22" fontWeight="900">
          Cada nó faz uma pergunta sobre os dados
        </text>
        <g transform="translate(210,86)">
          <rect x="90" y="0" width="150" height="44" rx="18" fill="#ffffff" stroke="#14b8a6" strokeWidth="3" />
          <text x="165" y="28" textAnchor="middle" fill="#0f766e" fontSize="15" fontWeight="900">
            doçura &gt; 6?
          </text>
          <line x1="165" y1="44" x2="92" y2="104" stroke="#0f766e" strokeWidth="4" />
          <line x1="165" y1="44" x2="238" y2="104" stroke="#0f766e" strokeWidth="4" />
          <rect x="12" y="104" width="160" height="44" rx="18" fill="#ffffff" stroke="#5eead4" strokeWidth="3" />
          <rect x="158" y="104" width="160" height="44" rx="18" fill="#ffffff" stroke="#5eead4" strokeWidth="3" />
          <text x="92" y="132" textAnchor="middle" fill="#0f766e" fontSize="14" fontWeight="900">
            crocância &gt; 4?
          </text>
          <text x="238" y="132" textAnchor="middle" fill="#0f766e" fontSize="14" fontWeight="900">
            aroma &gt; 5?
          </text>
          {[
            { x: 0, label: "maçã" },
            { x: 86, label: "pera" },
            { x: 196, label: "banana" },
            { x: 282, label: "manga" },
          ].map((leaf) => (
            <g key={leaf.label}>
              <line x1={leaf.x + 46} y1="148" x2={leaf.x + 46} y2="198" stroke="#14b8a6" strokeWidth="3" />
              <rect x={leaf.x} y="198" width="92" height="38" rx="16" fill="#ccfbf1" stroke="#14b8a6" strokeWidth="2" />
              <text x={leaf.x + 46} y="222" textAnchor="middle" fill="#115e59" fontSize="13" fontWeight="900">
                {leaf.label}
              </text>
            </g>
          ))}
        </g>
      </svg>
    </figure>
  );
}

function ParticoesDoEspacoVisual() {
  return (
    <figure className="rounded-[2rem] border border-emerald-200 bg-emerald-50 p-4 shadow-xl shadow-emerald-900/5">
      <svg className="w-full" viewBox="0 0 760 340" role="img" aria-label="Partições retangulares no espaço de atributos">
        <rect width="760" height="340" rx="28" fill="#ecfdf5" />
        <text x="380" y="42" textAnchor="middle" fill="#047857" fontSize="22" fontWeight="900">
          Árvore = partições recursivas do espaço
        </text>
        <rect x="110" y="84" width="540" height="210" rx="22" fill="#ffffff" stroke="#10b981" strokeWidth="3" />
        <rect x="110" y="84" width="200" height="210" fill="#bbf7d0" opacity="0.65" />
        <rect x="310" y="84" width="160" height="104" fill="#86efac" opacity="0.65" />
        <rect x="470" y="84" width="180" height="210" fill="#d9f99d" opacity="0.65" />
        <rect x="310" y="188" width="160" height="106" fill="#fde68a" opacity="0.7" />
        <line x1="310" y1="84" x2="310" y2="294" stroke="#047857" strokeWidth="4" />
        <line x1="470" y1="84" x2="470" y2="294" stroke="#047857" strokeWidth="4" />
        <line x1="310" y1="188" x2="470" y2="188" stroke="#047857" strokeWidth="4" />
        <text x="380" y="318" textAnchor="middle" fill="#047857" fontSize="14" fontWeight="800">
          Mais splits criam mais regiões locais com decisões específicas
        </text>
      </svg>
    </figure>
  );
}

function ImpurezaEGanhoVisual() {
  return (
    <figure className="rounded-[2rem] border border-cyan-200 bg-cyan-50 p-4 shadow-xl shadow-cyan-900/5">
      <svg className="w-full" viewBox="0 0 760 320" role="img" aria-label="Redução de impureza em um split">
        <rect width="760" height="320" rx="28" fill="#ecfeff" />
        <text x="380" y="42" textAnchor="middle" fill="#0f766e" fontSize="22" fontWeight="900">
          Um bom split deixa os filhos mais puros que o pai
        </text>
        <circle cx="180" cy="170" r="78" fill="#ffffff" stroke="#06b6d4" strokeWidth="3" />
        {[
          { color: "#f97316", start: 0, end: 170 },
          { color: "#4338ca", start: 170, end: 360 },
        ].map((slice, index) => (
          <path
            key={index}
            d={describeArc(180, 170, 62, slice.start, slice.end)}
            fill="none"
            stroke={slice.color}
            strokeWidth="32"
          />
        ))}
        <text x="180" y="175" textAnchor="middle" fill="#0f172a" fontSize="16" fontWeight="900">
          nó misto
        </text>
        <path d="M 292 170 H 362" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
        <path d="M 350 160 L 362 170 L 350 180" fill="#475569" />
        <circle cx="470" cy="142" r="54" fill="#ffffff" stroke="#06b6d4" strokeWidth="3" />
        <path d={describeArc(470, 142, 40, 0, 40)} fill="none" stroke="#4338ca" strokeWidth="24" />
        <path d={describeArc(470, 142, 40, 40, 360)} fill="none" stroke="#f97316" strokeWidth="24" />
        <circle cx="602" cy="198" r="54" fill="#ffffff" stroke="#06b6d4" strokeWidth="3" />
        <path d={describeArc(602, 198, 40, 0, 300)} fill="none" stroke="#4338ca" strokeWidth="24" />
        <path d={describeArc(602, 198, 40, 300, 360)} fill="none" stroke="#f97316" strokeWidth="24" />
        <text x="536" y="296" textAnchor="middle" fill="#0f766e" fontSize="14" fontWeight="800">
          impureza cai → ganho de decisão
        </text>
      </svg>
    </figure>
  );
}

function InstabilidadeDaArvoreVisual() {
  return (
    <figure className="rounded-[2rem] border border-rose-200 bg-rose-50 p-4 shadow-xl shadow-rose-900/5">
      <svg className="w-full" viewBox="0 0 760 330" role="img" aria-label="Duas árvores diferentes após pequena mudança na amostra">
        <rect width="760" height="330" rx="28" fill="#fff1f2" />
        <text x="380" y="42" textAnchor="middle" fill="#9f1239" fontSize="22" fontWeight="900">
          Pequena mudança no dado, grande mudança na árvore
        </text>
        <g transform="translate(120,84)">
          <TreeMini title="amostra A" leftLabel="idade" rightLabel="renda" leafColor="#fb7185" />
        </g>
        <g transform="translate(420,84)">
          <TreeMini title="amostra B" leftLabel="renda" rightLabel="tempo" leafColor="#f43f5e" />
        </g>
      </svg>
    </figure>
  );
}

function BaggingRandomForestVisual() {
  return (
    <figure className="rounded-[2rem] border border-indigo-200 bg-indigo-50 p-4 shadow-xl shadow-indigo-900/5">
      <svg className="w-full" viewBox="0 0 760 340" role="img" aria-label="Fluxo de bagging e random forests">
        <rect width="760" height="340" rx="28" fill="#eef2ff" />
        <text x="380" y="42" textAnchor="middle" fill="#3730a3" fontSize="22" fontWeight="900">
          Bagging replica o treino; random forest também sorteia atributos
        </text>
        <rect x="60" y="110" width="140" height="120" rx="20" fill="#ffffff" stroke="#4f46e5" strokeWidth="3" />
        <text x="130" y="155" textAnchor="middle" fill="#3730a3" fontSize="16" fontWeight="900">
          dataset
        </text>
        <text x="130" y="180" textAnchor="middle" fill="#6366f1" fontSize="13" fontWeight="700">
          original
        </text>
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${270 + i * 124}, 90)`}>
            <rect x="0" y="20" width="92" height="74" rx="18" fill="#ffffff" stroke="#818cf8" strokeWidth="2" />
            <text x="46" y="49" textAnchor="middle" fill="#3730a3" fontSize="13" fontWeight="900">
              bootstrap
            </text>
            <text x="46" y="69" textAnchor="middle" fill="#6366f1" fontSize="12" fontWeight="700">
              + features
            </text>
            <circle cx="46" cy="138" r="16" fill="#818cf8" />
            <circle cx="26" cy="176" r="13" fill="#a5b4fc" />
            <circle cx="66" cy="176" r="13" fill="#a5b4fc" />
            <line x1="46" y1="154" x2="26" y2="164" stroke="#4f46e5" strokeWidth="3" />
            <line x1="46" y1="154" x2="66" y2="164" stroke="#4f46e5" strokeWidth="3" />
          </g>
        ))}
        <path d="M 210 170 H 252" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
        <path d="M 242 160 L 252 170 L 242 180" fill="#475569" />
        <rect x="574" y="252" width="116" height="46" rx="18" fill="#ffffff" stroke="#4f46e5" strokeWidth="2" />
        <text x="632" y="280" textAnchor="middle" fill="#3730a3" fontSize="14" fontWeight="900">
          média / voto
        </text>
      </svg>
    </figure>
  );
}

function VotacaoColetivaVisual() {
  return (
    <figure className="rounded-[2rem] border border-violet-200 bg-violet-50 p-4 shadow-xl shadow-violet-900/5">
      <svg className="w-full" viewBox="0 0 760 320" role="img" aria-label="Vários aprendizes fracos votando">
        <rect width="760" height="320" rx="28" fill="#faf5ff" />
        <text x="380" y="42" textAnchor="middle" fill="#6d28d9" fontSize="22" fontWeight="900">
          Erros parcialmente diferentes permitem voto melhor
        </text>
        {[
          { x: 130, label: "regra 1", vote: "SIM" },
          { x: 290, label: "regra 2", vote: "NÃO" },
          { x: 450, label: "regra 3", vote: "SIM" },
          { x: 610, label: "regra 4", vote: "SIM" },
        ].map((card) => (
          <g key={card.label}>
            <rect x={card.x - 62} y="96" width="124" height="92" rx="20" fill="#ffffff" stroke="#c4b5fd" strokeWidth="2" />
            <text x={card.x} y="126" textAnchor="middle" fill="#6d28d9" fontSize="14" fontWeight="900">
              {card.label}
            </text>
            <text x={card.x} y="162" textAnchor="middle" fill={card.vote === "SIM" ? "#6d28d9" : "#64748b"} fontSize="24" fontWeight="900">
              {card.vote}
            </text>
          </g>
        ))}
        <rect x="250" y="226" width="260" height="54" rx="20" fill="#ffffff" stroke="#8b5cf6" strokeWidth="3" />
        <text x="380" y="260" textAnchor="middle" fill="#6d28d9" fontSize="18" fontWeight="900">
          maioria → decisão final
        </text>
      </svg>
    </figure>
  );
}

function BoostingSequencialVisual() {
  return (
    <figure className="rounded-[2rem] border border-amber-200 bg-amber-50 p-4 shadow-xl shadow-amber-900/5">
      <svg className="w-full" viewBox="0 0 760 330" role="img" aria-label="Boosting corrigindo erros em sequência">
        <rect width="760" height="330" rx="28" fill="#fffbeb" />
        <text x="380" y="42" textAnchor="middle" fill="#92400e" fontSize="22" fontWeight="900">
          Boosting adiciona aprendizes que corrigem resíduos ou erros
        </text>
        {[
          { x: 96, title: "modelo 1", detail: "erro grosso" },
          { x: 288, title: "modelo 2", detail: "corrige parte" },
          { x: 480, title: "modelo 3", detail: "refina mais" },
        ].map((step, index) => (
          <g key={step.title}>
            <rect x={step.x} y="104" width="136" height="92" rx="20" fill="#ffffff" stroke="#f59e0b" strokeWidth="3" />
            <text x={step.x + 68} y="136" textAnchor="middle" fill="#92400e" fontSize="16" fontWeight="900">
              {step.title}
            </text>
            <text x={step.x + 68} y="168" textAnchor="middle" fill="#475569" fontSize="13" fontWeight="700">
              {step.detail}
            </text>
            {index < 2 ? (
              <>
                <path d={`M ${step.x + 146} 150 H ${step.x + 182}`} stroke="#92400e" strokeWidth="5" strokeLinecap="round" />
                <path d={`M ${step.x + 172} 140 L ${step.x + 182} 150 L ${step.x + 172} 160`} fill="#92400e" />
              </>
            ) : null}
          </g>
        ))}
        <rect x="238" y="232" width="284" height="52" rx="18" fill="#ffffff" stroke="#f59e0b" strokeWidth="2" />
        <text x="380" y="264" textAnchor="middle" fill="#92400e" fontSize="16" fontWeight="900">
          soma aditiva de pequenas correções
        </text>
      </svg>
    </figure>
  );
}

function ImportanciaDeAtributosVisual() {
  return (
    <figure className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-xl shadow-slate-900/5">
      <svg className="w-full" viewBox="0 0 760 320" role="img" aria-label="Barras de importância de atributos com aviso de cautela">
        <rect width="760" height="320" rx="28" fill="#f8fafc" />
        <text x="380" y="42" textAnchor="middle" fill="#0f172a" fontSize="22" fontWeight="900">
          Importância de atributos ajuda, mas não prova causalidade
        </text>
        {[
          { y: 104, label: "renda", width: 360, color: "#4f46e5" },
          { y: 146, label: "idade", width: 270, color: "#7c3aed" },
          { y: 188, label: "histórico", width: 200, color: "#10b981" },
          { y: 230, label: "canal", width: 120, color: "#f59e0b" },
        ].map((bar) => (
          <g key={bar.label}>
            <text x="130" y={bar.y + 5} textAnchor="end" fill="#475569" fontSize="14" fontWeight="800">
              {bar.label}
            </text>
            <rect x="150" y={bar.y - 12} width="420" height="24" rx="12" fill="#e2e8f0" />
            <rect x="150" y={bar.y - 12} width={bar.width} height="24" rx="12" fill={bar.color} />
          </g>
        ))}
        <rect x="586" y="104" width="126" height="142" rx="18" fill="#fff7ed" stroke="#fdba74" strokeWidth="2" />
        <text x="649" y="134" textAnchor="middle" fill="#c2410c" fontSize="15" fontWeight="900">
          cuidado
        </text>
        <text x="649" y="164" textAnchor="middle" fill="#7c2d12" fontSize="12" fontWeight="700">
          modelo usa
        </text>
        <text x="649" y="182" textAnchor="middle" fill="#7c2d12" fontSize="12" fontWeight="700">
          não significa
        </text>
        <text x="649" y="200" textAnchor="middle" fill="#7c2d12" fontSize="12" fontWeight="700">
          causa real
        </text>
      </svg>
    </figure>
  );
}

function TreeMini({
  title,
  leftLabel,
  rightLabel,
  leafColor,
}: {
  title: string;
  leftLabel: string;
  rightLabel: string;
  leafColor: string;
}) {
  return (
    <g>
      <text x="94" y="0" textAnchor="middle" fill="#9f1239" fontSize="14" fontWeight="900">
        {title}
      </text>
      <circle cx="94" cy="34" r="16" fill={leafColor} />
      <circle cx="48" cy="92" r="14" fill="#fecdd3" />
      <circle cx="140" cy="92" r="14" fill="#fecdd3" />
      <line x1="94" y1="50" x2="48" y2="78" stroke="#be123c" strokeWidth="3" />
      <line x1="94" y1="50" x2="140" y2="78" stroke="#be123c" strokeWidth="3" />
      <text x="48" y="122" textAnchor="middle" fill="#9f1239" fontSize="12" fontWeight="800">
        {leftLabel}
      </text>
      <text x="140" y="122" textAnchor="middle" fill="#9f1239" fontSize="12" fontWeight="800">
        {rightLabel}
      </text>
    </g>
  );
}

function polarToCartesian(centerX: number, centerY: number, radius: number, angle: number) {
  const radians = ((angle - 90) * Math.PI) / 180;
  return {
    x: centerX + radius * Math.cos(radians),
    y: centerY + radius * Math.sin(radians),
  };
}

function describeArc(
  centerX: number,
  centerY: number,
  radius: number,
  startAngle: number,
  endAngle: number,
) {
  const start = polarToCartesian(centerX, centerY, radius, endAngle);
  const end = polarToCartesian(centerX, centerY, radius, startAngle);
  const arcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${arcFlag} 0 ${end.x} ${end.y}`;
}
