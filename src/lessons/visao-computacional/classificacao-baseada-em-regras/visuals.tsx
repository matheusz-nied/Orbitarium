import type { ReactNode } from "react";
import type { LessonModule } from "../../../types/content";

export const visuals = {
  "rules-hero": Hero,
  "rules-motivation": Motivation,
  "rules-table": Table,
  "threshold-rules": Threshold,
  "logic-visual": Logic,
  "calibration-visual": Calibration,
  "validation-visual": Validation,
  "uncertainty-visual": Uncertainty,
  "code-rules": CodeRules,
  "method-limits": Limits,
} satisfies LessonModule["visuals"];

function Hero() { return <Flow title="Classificação por regras" steps={["máscara", "objetos", "descritores", "regras", "classe"]} color="#7c3aed" bg="#faf5ff" />; }
function Motivation() { return <Cards title="Decisão auditável" items={["se área baixa: ruído", "se circular e sólido: disco", "senão: indefinido"]} color="#0f766e" bg="#ecfdf5" />; }
function Table() { return <TableVisual />; }
function Threshold() { return <Cards title="Limites explícitos" items={["area > A_min", "circularity > C_min", "solidity > S_min"]} color="#2563eb" bg="#eff6ff" />; }
function Logic() { return <Flow title="Lógica de decisão" steps={["descartar", "AND", "OR", "prioridade", "fallback"]} color="#f59e0b" bg="#fffbeb" />; }
function Calibration() { return <Axis title="Calibração por exemplos" color="#0f766e" bg="#ecfdf5" />; }
function Validation() { return <Confusion />; }
function Uncertainty() { return <Cards title="Zona cinzenta" items={["baixo risco: aceitar", "perto do corte: revisar", "fora do padrão: indefinido"]} color="#64748b" bg="#f8fafc" />; }
function CodeRules() { return <Cards title="Função classify(row)" items={["1. descartar inválidos", "2. aplicar classes", "3. retornar fallback"]} color="#7c3aed" bg="#faf5ff" />; }
function Limits() { return <Cards title="Sinal de limite do método" items={["muitas exceções", "regras frágeis", "variação visual alta"]} color="#be123c" bg="#fff1f2" />; }

function Flow({ title, steps, color, bg }: { title: string; steps: string[]; color: string; bg: string }) { const gap = 132; return <Card><svg className="w-full" viewBox="0 0 760 330" role="img" aria-label={title}><rect width="760" height="330" rx="28" fill={bg} /><text x="380" y="48" textAnchor="middle" fill={color} fontSize="24" fontWeight="900">{title}</text>{steps.map((step, i) => <g key={step}><rect x={55 + i * gap} y="118" width="104" height="82" rx="18" fill="#fff" stroke={color} strokeWidth="3" /><text x={107 + i * gap} y="165" textAnchor="middle" fill={color} fontSize="12" fontWeight="900">{step}</text>{i < steps.length - 1 ? <path d={`M${164 + i * gap} 159h28`} stroke="#475569" strokeWidth="4" strokeLinecap="round" /> : null}</g>)}<text x="380" y="278" textAnchor="middle" fill={color} fontSize="15" fontWeight="800">cada etapa deixa rastros verificáveis</text></svg></Card>; }
function Cards({ title, items, color, bg }: { title: string; items: string[]; color: string; bg: string }) { return <Card><svg className="w-full" viewBox="0 0 760 330" role="img" aria-label={title}><rect width="760" height="330" rx="28" fill={bg} /><text x="380" y="48" textAnchor="middle" fill={color} fontSize="24" fontWeight="900">{title}</text>{items.map((item, i) => <g key={item}><rect x="150" y={92 + i * 62} width="460" height="48" rx="16" fill="#fff" stroke={color} strokeWidth="2" /><text x="380" y={123 + i * 62} textAnchor="middle" fill={i === items.length - 1 ? "#475569" : color} fontSize="17" fontWeight="900">{item}</text></g>)}</svg></Card>; }
function TableVisual() { const rows = [["1", "420", "0.91", "0.96", "disco"], ["2", "38", "0.42", "0.70", "ruído"], ["3", "310", "0.34", "0.88", "risco"]]; return <Card><svg className="w-full" viewBox="0 0 760 330" role="img" aria-label="Tabela de objetos"><rect width="760" height="330" rx="28" fill="#eff6ff" /><text x="380" y="48" textAnchor="middle" fill="#2563eb" fontSize="24" fontWeight="900">Uma linha por objeto</text>{["label", "area", "circ", "solid", "classe"].map((h, i) => <text key={h} x={150 + i * 115} y="105" textAnchor="middle" fill="#2563eb" fontSize="14" fontWeight="900">{h}</text>)}{rows.map((row, r) => row.map((cell, c) => <g key={`${r}-${c}`}><rect x={102 + c * 115} y={122 + r * 52} width="96" height="38" rx="10" fill="#fff" /><text x={150 + c * 115} y={146 + r * 52} textAnchor="middle" fill="#0f172a" fontSize="13" fontWeight="800">{cell}</text></g>))}</svg></Card>; }
function Axis({ title, color, bg }: { title: string; color: string; bg: string }) { return <Card><svg className="w-full" viewBox="0 0 760 330" role="img" aria-label={title}><rect width="760" height="330" rx="28" fill={bg} /><text x="380" y="48" textAnchor="middle" fill={color} fontSize="24" fontWeight="900">{title}</text><line x1="140" y1="205" x2="620" y2="205" stroke="#334155" strokeWidth="5" strokeLinecap="round" /><line x1="410" y1="170" x2="410" y2="240" stroke={color} strokeWidth="5" /><text x="410" y="262" textAnchor="middle" fill={color} fontSize="14" fontWeight="900">corte</text>{[190, 250, 315, 395, 430, 500, 560].map((x, i) => <circle key={x} cx={x} cy={i < 3 ? 188 : 222} r="10" fill={i < 3 ? "#ef4444" : "#22c55e"} />)}</svg></Card>; }
function Confusion() { const cells = [["TP", "acertos"], ["FP", "aceitou errado"], ["FN", "perdeu alvo"], ["IND", "revisar"]]; return <Card><svg className="w-full" viewBox="0 0 760 330" role="img" aria-label="Validação visual"><rect width="760" height="330" rx="28" fill="#fff1f2" /><text x="380" y="48" textAnchor="middle" fill="#be123c" fontSize="24" fontWeight="900">Galeria de erros</text>{cells.map(([a, b], i) => <g key={a}><rect x={150 + (i % 2) * 240} y={92 + Math.floor(i / 2) * 92} width="200" height="64" rx="18" fill="#fff" stroke="#be123c" strokeWidth="2" /><text x={250 + (i % 2) * 240} y={120 + Math.floor(i / 2) * 92} textAnchor="middle" fill="#be123c" fontSize="20" fontWeight="900">{a}</text><text x={250 + (i % 2) * 240} y={142 + Math.floor(i / 2) * 92} textAnchor="middle" fill="#475569" fontSize="12" fontWeight="800">{b}</text></g>)}</svg></Card>; }
function Card({ children }: { children: ReactNode }) { return <figure className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-xl shadow-slate-900/5">{children}</figure>; }
