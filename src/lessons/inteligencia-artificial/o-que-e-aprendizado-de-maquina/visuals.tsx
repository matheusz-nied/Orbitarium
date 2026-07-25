import type { LessonModule } from "../../../types/content";

export const visuals = {
  "ml-hero": MlHeroVisual,
  "regras-estatistica-aprendizado": RegrasEstatisticaAprendizadoVisual,
  "dados-features-rotulos": DadosFeaturesRotulosVisual,
  "treino-generalizacao": TreinoGeneralizacaoVisual,
  "feature-space-map": FeatureSpaceMapVisual,
  "checklist-ml": ChecklistMlVisual,
  "ciclo-ml": CicloMlVisual,
} satisfies LessonModule["visuals"];

function MlHeroVisual() {
  return (
    <figure className="overflow-hidden rounded-[2rem] border border-indigo-200 bg-white p-4 shadow-xl shadow-indigo-900/10">
      <svg className="w-full" viewBox="0 0 760 420" role="img" aria-label="Da escrita de regras ao aprendizado de padrões">
        <defs>
          <linearGradient id="mlHeroBg" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#eef2ff" />
            <stop offset="55%" stopColor="#fff7ed" />
            <stop offset="100%" stopColor="#ecfeff" />
          </linearGradient>
        </defs>
        <rect width="760" height="420" rx="30" fill="url(#mlHeroBg)" />
        <text x="380" y="56" textAnchor="middle" fill="#0f172a" fontSize="26" fontWeight="900">
          Quando não sabemos escrever a regra
        </text>
        <rect x="60" y="110" width="180" height="150" rx="22" fill="#ffffff" stroke="#4f46e5" strokeWidth="3" />
        <text x="150" y="150" textAnchor="middle" fill="#4338ca" fontSize="18" fontWeight="900">
          Regras
        </text>
        <text x="150" y="182" textAnchor="middle" fill="#6366f1" fontSize="14" fontWeight="700">
          if link &gt; 1
        </text>
        <text x="150" y="204" textAnchor="middle" fill="#6366f1" fontSize="14" fontWeight="700">
          então suspeito
        </text>
        <path d="M270 185h55" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
        <path d="M315 175l10 10l-10 10" fill="#475569" />
        <rect x="350" y="90" width="220" height="190" rx="24" fill="#ffffff" stroke="#f97316" strokeWidth="3" />
        <text x="460" y="130" textAnchor="middle" fill="#c2410c" fontSize="18" fontWeight="900">
          Dados
        </text>
        {[
          [390, 165, "#4f46e5"],
          [425, 205, "#4f46e5"],
          [470, 185, "#f97316"],
          [505, 145, "#f97316"],
          [520, 225, "#0f766e"],
          [430, 240, "#0f766e"],
        ].map(([x, y, color], index) => (
          <circle key={index} cx={x} cy={y} r="11" fill={String(color)} opacity="0.9" />
        ))}
        <path d="M600 185h55" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
        <path d="M645 175l10 10l-10 10" fill="#475569" />
        <rect x="590" y="110" width="120" height="150" rx="22" fill="#ffffff" stroke="#0f766e" strokeWidth="3" />
        <text x="650" y="155" textAnchor="middle" fill="#0f766e" fontSize="17" fontWeight="900">
          Modelo
        </text>
        <text x="650" y="185" textAnchor="middle" fill="#0f766e" fontSize="13" fontWeight="700">
          aprende a
        </text>
        <text x="650" y="205" textAnchor="middle" fill="#0f766e" fontSize="13" fontWeight="700">
          prever sem
        </text>
        <text x="650" y="225" textAnchor="middle" fill="#0f766e" fontSize="13" fontWeight="700">
          regra manual
        </text>
        <rect x="100" y="310" width="560" height="72" rx="18" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
        <text x="380" y="350" textAnchor="middle" fill="#0f172a" fontSize="16" fontWeight="800">
          Machine learning é a estratégia de aprender uma decisão a partir de exemplos
        </text>
      </svg>
    </figure>
  );
}

function RegrasEstatisticaAprendizadoVisual() {
  return (
    <figure className="rounded-[2rem] border border-amber-200 bg-amber-50 p-4 shadow-xl shadow-amber-900/5">
      <svg className="w-full" viewBox="0 0 760 360" role="img" aria-label="Diferença entre regras, estatística e aprendizado de máquina">
        <rect width="760" height="360" rx="28" fill="#fffbeb" />
        <text x="380" y="46" textAnchor="middle" fill="#92400e" fontSize="22" fontWeight="900">
          Três jeitos de atacar o mesmo problema
        </text>
        {[
          { x: 60, title: "Regras", body1: "Lógica escrita", body2: "por humanos", color: "#4f46e5", bg: "#eef2ff" },
          { x: 285, title: "Estatística", body1: "Resume e mede", body2: "um padrão", color: "#f97316", bg: "#fff7ed" },
          { x: 510, title: "Aprendizado", body1: "Ajusta parâmetros", body2: "com exemplos", color: "#0f766e", bg: "#ecfdf5" },
        ].map((card) => (
          <g key={card.title}>
            <rect x={card.x} y="95" width="190" height="180" rx="22" fill={card.bg} stroke={card.color} strokeWidth="3" />
            <text x={card.x + 95} y="135" textAnchor="middle" fill={card.color} fontSize="18" fontWeight="900">
              {card.title}
            </text>
            <text x={card.x + 95} y="182" textAnchor="middle" fill={card.color} fontSize="14" fontWeight="700">
              {card.body1}
            </text>
            <text x={card.x + 95} y="206" textAnchor="middle" fill={card.color} fontSize="14" fontWeight="700">
              {card.body2}
            </text>
          </g>
        ))}
        <text x="380" y="320" textAnchor="middle" fill="#92400e" fontSize="15" fontWeight="800">
          Estatística descreve; ML usa dados para decidir ou prever em novos casos
        </text>
      </svg>
    </figure>
  );
}

function DadosFeaturesRotulosVisual() {
  return (
    <figure className="rounded-[2rem] border border-teal-200 bg-teal-50 p-4 shadow-xl shadow-teal-900/5">
      <svg className="w-full" viewBox="0 0 760 360" role="img" aria-label="Dados, features e rótulos">
        <rect width="760" height="360" rx="28" fill="#f0fdfa" />
        <text x="380" y="48" textAnchor="middle" fill="#0f766e" fontSize="22" fontWeight="900">
          Da realidade para a tabela
        </text>
        <rect x="70" y="95" width="160" height="170" rx="20" fill="#ffffff" stroke="#0f766e" strokeWidth="3" />
        <text x="150" y="135" textAnchor="middle" fill="#0f766e" fontSize="18" fontWeight="900">
          Mundo real
        </text>
        <text x="150" y="175" textAnchor="middle" fill="#0f766e" fontSize="13" fontWeight="700">
          cliente, imagem,
        </text>
        <text x="150" y="197" textAnchor="middle" fill="#0f766e" fontSize="13" fontWeight="700">
          sensor, texto
        </text>
        <path d="M255 180h65" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
        <path d="M310 170l10 10l-10 10" fill="#475569" />
        <rect x="350" y="80" width="190" height="200" rx="20" fill="#ffffff" stroke="#14b8a6" strokeWidth="3" />
        <text x="445" y="118" textAnchor="middle" fill="#0f766e" fontSize="18" fontWeight="900">
          Features
        </text>
        {["idade", "renda", "cliques", "tempo"].map((feature, index) => (
          <text key={feature} x="390" y={160 + index * 28} fill="#334155" fontSize="14" fontWeight="700">
            {feature}
          </text>
        ))}
        <rect x="565" y="110" width="130" height="140" rx="20" fill="#ffffff" stroke="#f97316" strokeWidth="3" />
        <text x="630" y="150" textAnchor="middle" fill="#c2410c" fontSize="18" fontWeight="900">
          Rótulo
        </text>
        <text x="630" y="185" textAnchor="middle" fill="#c2410c" fontSize="14" fontWeight="700">
          comprou?
        </text>
        <text x="630" y="210" textAnchor="middle" fill="#c2410c" fontSize="14" fontWeight="700">
          sim / não
        </text>
        <text x="380" y="325" textAnchor="middle" fill="#0f766e" fontSize="15" fontWeight="800">
          Aprender depende de representar o problema com medições relevantes
        </text>
      </svg>
    </figure>
  );
}

function TreinoGeneralizacaoVisual() {
  return (
    <figure className="rounded-[2rem] border border-blue-200 bg-blue-50 p-4 shadow-xl shadow-blue-900/5">
      <svg className="w-full" viewBox="0 0 760 360" role="img" aria-label="Treino e generalização">
        <rect width="760" height="360" rx="28" fill="#eff6ff" />
        <text x="380" y="46" textAnchor="middle" fill="#1d4ed8" fontSize="22" fontWeight="900">
          Treinar não basta: o teste é no mundo novo
        </text>
        <rect x="80" y="95" width="220" height="170" rx="22" fill="#ffffff" stroke="#2563eb" strokeWidth="3" />
        <text x="190" y="135" textAnchor="middle" fill="#1d4ed8" fontSize="18" fontWeight="900">
          Treinamento
        </text>
        <text x="190" y="175" textAnchor="middle" fill="#2563eb" fontSize="14" fontWeight="700">
          aprende padrões
        </text>
        <text x="190" y="198" textAnchor="middle" fill="#2563eb" fontSize="14" fontWeight="700">
          a partir dos exemplos
        </text>
        <path d="M330 180h90" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
        <path d="M410 170l10 10l-10 10" fill="#475569" />
        <rect x="450" y="95" width="220" height="170" rx="22" fill="#ffffff" stroke="#0f766e" strokeWidth="3" />
        <text x="560" y="135" textAnchor="middle" fill="#0f766e" fontSize="18" fontWeight="900">
          Generalização
        </text>
        <text x="560" y="175" textAnchor="middle" fill="#0f766e" fontSize="14" fontWeight="700">
          funciona em casos
        </text>
        <text x="560" y="198" textAnchor="middle" fill="#0f766e" fontSize="14" fontWeight="700">
          que o modelo nunca viu
        </text>
        <text x="380" y="315" textAnchor="middle" fill="#1d4ed8" fontSize="15" fontWeight="800">
          O objetivo não é decorar o passado; é acertar o próximo exemplo
        </text>
      </svg>
    </figure>
  );
}

function FeatureSpaceMapVisual() {
  return (
    <figure className="rounded-[2rem] border border-violet-200 bg-violet-50 p-4 shadow-xl shadow-violet-900/5">
      <svg className="w-full" viewBox="0 0 760 360" role="img" aria-label="Espaço de features com grupos">
        <rect width="760" height="360" rx="28" fill="#faf5ff" />
        <text x="380" y="46" textAnchor="middle" fill="#6d28d9" fontSize="22" fontWeight="900">
          Features transformam objetos em geometria
        </text>
        <line x1="110" y1="290" x2="650" y2="290" stroke="#475569" strokeWidth="3" />
        <line x1="110" y1="290" x2="110" y2="75" stroke="#475569" strokeWidth="3" />
        {[
          [220, 140, "#4f46e5"],
          [250, 170, "#4f46e5"],
          [260, 130, "#4f46e5"],
          [470, 220, "#f97316"],
          [510, 245, "#f97316"],
          [520, 205, "#f97316"],
        ].map(([x, y, color], index) => (
          <circle key={index} cx={Number(x)} cy={Number(y)} r="12" fill={String(color)} opacity="0.9" />
        ))}
        <circle cx="360" cy="188" r="15" fill="none" stroke="#0f172a" strokeDasharray="5 5" strokeWidth="3" />
        <text x="360" y="178" textAnchor="middle" fill="#0f172a" fontSize="12" fontWeight="900">
          ?
        </text>
        <text x="380" y="330" textAnchor="middle" fill="#6d28d9" fontSize="15" fontWeight="800">
          Proximidade no espaço pode virar critério de previsão
        </text>
      </svg>
    </figure>
  );
}

function ChecklistMlVisual() {
  return (
    <figure className="rounded-[2rem] border border-rose-200 bg-rose-50 p-4 shadow-xl shadow-rose-900/5">
      <svg className="w-full" viewBox="0 0 760 350" role="img" aria-label="Checklist para usar machine learning">
        <rect width="760" height="350" rx="28" fill="#fff1f2" />
        <text x="380" y="48" textAnchor="middle" fill="#be123c" fontSize="22" fontWeight="900">
          Antes de usar ML, faça três perguntas
        </text>
        {[
          ["Tenho dados representativos?", 105],
          ["Há um padrão estável para aprender?", 175],
          ["Existe métrica clara de sucesso?", 245],
        ].map(([label, y], index) => (
          <g key={String(label)}>
            <rect x="130" y={Number(y) - 28} width="500" height="48" rx="18" fill="#ffffff" stroke="#f43f5e" strokeWidth="2.5" />
            <circle cx="165" cy={Number(y) - 4} r="12" fill={index === 1 ? "#f97316" : "#10b981"} />
            <text x="200" y={Number(y)} fill="#881337" fontSize="16" fontWeight="800">
              {label}
            </text>
          </g>
        ))}
      </svg>
    </figure>
  );
}

function CicloMlVisual() {
  return (
    <figure className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-xl shadow-slate-900/5">
      <svg className="w-full" viewBox="0 0 760 360" role="img" aria-label="Ciclo de um produto com machine learning">
        <rect width="760" height="360" rx="28" fill="#f8fafc" />
        <text x="380" y="48" textAnchor="middle" fill="#0f172a" fontSize="22" fontWeight="900">
          Um produto com ML vive em ciclo
        </text>
        {[
          { x: 130, y: 170, title: "coletar" },
          { x: 290, y: 115, title: "treinar" },
          { x: 470, y: 115, title: "avaliar" },
          { x: 630, y: 170, title: "servir" },
          { x: 470, y: 255, title: "monitorar" },
          { x: 290, y: 255, title: "revisar" },
        ].map((node) => (
          <g key={node.title}>
            <circle cx={node.x} cy={node.y} r="48" fill="#ffffff" stroke="#0f172a" strokeWidth="3" />
            <text x={node.x} y={node.y + 6} textAnchor="middle" fill="#0f172a" fontSize="15" fontWeight="900">
              {node.title}
            </text>
          </g>
        ))}
        <path d="M178 152l72-28M338 115h84M518 133l72 23M596 205l-78 40M422 255h-84M242 236l-70-40" stroke="#64748b" strokeWidth="4" strokeLinecap="round" />
      </svg>
    </figure>
  );
}
