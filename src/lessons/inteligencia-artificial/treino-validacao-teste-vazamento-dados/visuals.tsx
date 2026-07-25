import type { LessonModule } from "../../../types/content";

export const visuals = {
  "splits-hero": SplitsHeroVisual,
  "split-pipeline": SplitPipelineVisual,
  "generalization-gap": GeneralizationGapVisual,
  "leakage-flow": LeakageFlowVisual,
  "timeseries-split": TimeSeriesSplitVisual,
  "blind-test-audit": BlindTestAuditVisual,
} satisfies LessonModule["visuals"];

function SplitsHeroVisual() {
  return (
    <figure className="overflow-hidden rounded-[2rem] border border-indigo-200 bg-white p-4 shadow-xl shadow-indigo-900/10">
      <svg className="w-full" viewBox="0 0 760 420" role="img" aria-label="Treino, validação e teste">
        <defs>
          <linearGradient id="splitsHeroBg" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#eef2ff" />
            <stop offset="55%" stopColor="#fff7ed" />
            <stop offset="100%" stopColor="#ecfdf5" />
          </linearGradient>
        </defs>
        <rect width="760" height="420" rx="30" fill="url(#splitsHeroBg)" />
        <text x="380" y="54" textAnchor="middle" fill="#0f172a" fontSize="26" fontWeight="900">
          Um bom resultado começa com uma avaliação honesta
        </text>
        <rect x="90" y="130" width="420" height="56" rx="18" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2.5" />
        <rect x="90" y="130" width="250" height="56" rx="18" fill="#4f46e5" />
        <rect x="340" y="130" width="90" height="56" fill="#f59e0b" />
        <rect x="430" y="130" width="80" height="56" rx="0" fill="#10b981" />
        <text x="215" y="165" textAnchor="middle" fill="#ffffff" fontSize="16" fontWeight="900">treino</text>
        <text x="385" y="165" textAnchor="middle" fill="#ffffff" fontSize="16" fontWeight="900">validação</text>
        <text x="470" y="165" textAnchor="middle" fill="#ffffff" fontSize="16" fontWeight="900">teste</text>
        <rect x="560" y="112" width="120" height="92" rx="20" fill="#ffffff" stroke="#0f172a" strokeWidth="3" />
        <text x="620" y="152" textAnchor="middle" fill="#0f172a" fontSize="16" fontWeight="900">não abrir</text>
        <text x="620" y="176" textAnchor="middle" fill="#0f172a" fontSize="14" fontWeight="700">cedo demais</text>
        <text x="380" y="320" textAnchor="middle" fill="#0f172a" fontSize="16" fontWeight="800">
          Treino ajusta • validação escolhe • teste audita
        </text>
      </svg>
    </figure>
  );
}

function SplitPipelineVisual() {
  return (
    <figure className="rounded-[2rem] border border-indigo-200 bg-indigo-50 p-4 shadow-xl shadow-indigo-900/5">
      <svg className="w-full" viewBox="0 0 760 340" role="img" aria-label="Pipeline de dados separados">
        <rect width="760" height="340" rx="28" fill="#eef2ff" />
        <text x="380" y="48" textAnchor="middle" fill="#4338ca" fontSize="22" fontWeight="900">
          Split primeiro, aprendizado depois
        </text>
        <rect x="70" y="115" width="150" height="120" rx="20" fill="#ffffff" stroke="#4f46e5" strokeWidth="3" />
        <text x="145" y="170" textAnchor="middle" fill="#4338ca" fontSize="18" fontWeight="900">dados brutos</text>
        <path d="M250 175h55" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
        <path d="M295 165l10 10l-10 10" fill="#475569" />
        <rect x="330" y="100" width="140" height="150" rx="20" fill="#ffffff" stroke="#f59e0b" strokeWidth="3" />
        <text x="400" y="145" textAnchor="middle" fill="#b45309" fontSize="16" fontWeight="900">separar</text>
        <text x="400" y="173" textAnchor="middle" fill="#b45309" fontSize="14" fontWeight="700">train / val / test</text>
        <path d="M500 175h55" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
        <path d="M545 165l10 10l-10 10" fill="#475569" />
        <rect x="580" y="115" width="110" height="120" rx="20" fill="#ffffff" stroke="#0f766e" strokeWidth="3" />
        <text x="635" y="162" textAnchor="middle" fill="#0f766e" fontSize="16" fontWeight="900">fit no treino</text>
        <text x="635" y="188" textAnchor="middle" fill="#0f766e" fontSize="14" fontWeight="700">avaliar fora</text>
      </svg>
    </figure>
  );
}

function GeneralizationGapVisual() {
  return (
    <figure className="rounded-[2rem] border border-emerald-200 bg-emerald-50 p-4 shadow-xl shadow-emerald-900/5">
      <svg className="w-full" viewBox="0 0 760 340" role="img" aria-label="Gap entre treino e teste">
        <rect width="760" height="340" rx="28" fill="#ecfdf5" />
        <text x="380" y="48" textAnchor="middle" fill="#065f46" fontSize="22" fontWeight="900">
          O gap de generalização conta uma história
        </text>
        <line x1="100" y1="270" x2="650" y2="270" stroke="#475569" strokeWidth="3" />
        <line x1="100" y1="270" x2="100" y2="85" stroke="#475569" strokeWidth="3" />
        <path d="M100 240 C 220 210, 290 170, 360 130 S 530 95, 650 92" fill="none" stroke="#4f46e5" strokeWidth="5" />
        <path d="M100 250 C 220 220, 290 185, 360 150 S 530 155, 650 190" fill="none" stroke="#f59e0b" strokeWidth="5" />
        <text x="610" y="104" fill="#4f46e5" fontSize="14" fontWeight="800">treino</text>
        <text x="610" y="205" fill="#b45309" fontSize="14" fontWeight="800">val/teste</text>
      </svg>
    </figure>
  );
}

function LeakageFlowVisual() {
  return (
    <figure className="rounded-[2rem] border border-rose-200 bg-rose-50 p-4 shadow-xl shadow-rose-900/5">
      <svg className="w-full" viewBox="0 0 760 340" role="img" aria-label="Fluxo de vazamento de dados">
        <rect width="760" height="340" rx="28" fill="#fff1f2" />
        <text x="380" y="48" textAnchor="middle" fill="#be123c" fontSize="22" fontWeight="900">
          Vazamento: o futuro encostando no treino
        </text>
        <rect x="90" y="110" width="200" height="130" rx="20" fill="#ffffff" stroke="#f43f5e" strokeWidth="3" />
        <text x="190" y="160" textAnchor="middle" fill="#be123c" fontSize="18" fontWeight="900">teste</text>
        <text x="190" y="190" textAnchor="middle" fill="#be123c" fontSize="14" fontWeight="700">deveria estar isolado</text>
        <rect x="470" y="110" width="200" height="130" rx="20" fill="#ffffff" stroke="#4f46e5" strokeWidth="3" />
        <text x="570" y="160" textAnchor="middle" fill="#4338ca" fontSize="18" fontWeight="900">treino</text>
        <text x="570" y="190" textAnchor="middle" fill="#4338ca" fontSize="14" fontWeight="700">onde o fit acontece</text>
        <path d="M290 175h150" stroke="#e11d48" strokeWidth="6" strokeDasharray="10 8" strokeLinecap="round" />
        <path d="M430 166l12 9l-12 9" fill="#e11d48" />
        <text x="380" y="150" textAnchor="middle" fill="#e11d48" fontSize="14" fontWeight="900">informação indevida</text>
      </svg>
    </figure>
  );
}

function TimeSeriesSplitVisual() {
  return (
    <figure className="rounded-[2rem] border border-amber-200 bg-amber-50 p-4 shadow-xl shadow-amber-900/5">
      <svg className="w-full" viewBox="0 0 760 340" role="img" aria-label="Split cronológico para séries temporais">
        <rect width="760" height="340" rx="28" fill="#fffbeb" />
        <text x="380" y="48" textAnchor="middle" fill="#92400e" fontSize="22" fontWeight="900">
          Em séries temporais, respeite a seta do tempo
        </text>
        <line x1="90" y1="250" x2="660" y2="250" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
        <path d="M650 241l12 9l-12 9" fill="#475569" />
        <rect x="110" y="185" width="220" height="40" rx="12" fill="#4f46e5" />
        <rect x="340" y="185" width="120" height="40" rx="12" fill="#f59e0b" />
        <rect x="470" y="185" width="120" height="40" rx="12" fill="#10b981" />
        <text x="220" y="210" textAnchor="middle" fill="#ffffff" fontSize="15" fontWeight="900">passado: treino</text>
        <text x="400" y="210" textAnchor="middle" fill="#ffffff" fontSize="15" fontWeight="900">validação</text>
        <text x="530" y="210" textAnchor="middle" fill="#ffffff" fontSize="15" fontWeight="900">teste</text>
      </svg>
    </figure>
  );
}

function BlindTestAuditVisual() {
  return (
    <figure className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-xl shadow-slate-900/5">
      <svg className="w-full" viewBox="0 0 760 340" role="img" aria-label="Teste cego como auditoria final">
        <rect width="760" height="340" rx="28" fill="#f8fafc" />
        <text x="380" y="48" textAnchor="middle" fill="#0f172a" fontSize="22" fontWeight="900">
          O teste final é uma auditoria, não um volante
        </text>
        <rect x="150" y="100" width="180" height="150" rx="22" fill="#eef2ff" stroke="#4f46e5" strokeWidth="3" />
        <text x="240" y="160" textAnchor="middle" fill="#4338ca" fontSize="18" fontWeight="900">desenvolvimento</text>
        <text x="240" y="190" textAnchor="middle" fill="#6366f1" fontSize="14" fontWeight="700">treino + validação</text>
        <rect x="430" y="100" width="180" height="150" rx="22" fill="#ecfdf5" stroke="#0f766e" strokeWidth="3" />
        <text x="520" y="160" textAnchor="middle" fill="#0f766e" fontSize="18" fontWeight="900">auditoria final</text>
        <text x="520" y="190" textAnchor="middle" fill="#0f766e" fontSize="14" fontWeight="700">teste cego</text>
        <path d="M330 175h70" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
        <path d="M390 165l10 10l-10 10" fill="#475569" />
      </svg>
    </figure>
  );
}
