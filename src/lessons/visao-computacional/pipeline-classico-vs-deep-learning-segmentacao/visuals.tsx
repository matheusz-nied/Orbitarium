import type { ReactNode } from "react";
import type { LessonModule } from "../../../types/content";

export const visuals = {
  "pipeline-hero": Hero,
  "pipeline-map": Map,
  "classic-pipeline": Classic,
  "deep-pipeline": Deep,
  "decision-criteria": Criteria,
  "data-visual": Data,
  "debug-visual": Debug,
  "robustness-visual": Robustness,
  "hybrid-visual": Hybrid,
  "report-visual": Report,
} satisfies LessonModule["visuals"];

function Hero() { return <Split title="Clássico vs Deep Learning" left="regras explícitas" right="padrões aprendidos" color="#7c3aed" bg="#faf5ff" />; }
function Map() { return <Flow title="Duas rotas" steps={["imagem", "máscara", "objetos", "métricas", "decisão"]} color="#0f766e" bg="#ecfdf5" />; }
function Classic() { return <Flow title="Pipeline clássico" steps={["blur", "threshold", "morfologia", "labels", "regras"]} color="#2563eb" bg="#eff6ff" />; }
function Deep() { return <Flow title="Pipeline deep" steps={["dataset", "treino", "modelo", "predição", "validação"]} color="#7c3aed" bg="#faf5ff" />; }
function Criteria() { return <Cards title="Critérios" items={["contraste", "variação", "dados", "custo"]} color="#f59e0b" bg="#fffbeb" />; }
function Data() { return <Cards title="Custo dos dados" items={["clássico: parâmetros", "deep: máscaras", "ambos: validação"]} color="#0f766e" bg="#ecfdf5" />; }
function Debug() { return <Cards title="Depuração" items={["etapas visíveis", "predições salvas", "casos difíceis"]} color="#2563eb" bg="#eff6ff" />; }
function Robustness() { return <Cards title="Teste de estresse" items={["luz", "ruído", "escala", "oclusão"]} color="#be123c" bg="#fff1f2" />; }
function Hybrid() { return <Flow title="Híbrido prático" steps={["normalizar", "modelo", "limpar", "medir", "revisar"]} color="#0f766e" bg="#ecfdf5" />; }
function Report() { return <Cards title="Entrega técnica" items={["métricas", "exemplos", "falhas", "restrições"]} color="#64748b" bg="#f8fafc" />; }

function Flow({ title, steps, color, bg }: { title: string; steps: string[]; color: string; bg: string }) { const gap = 132; return <Card><svg className="w-full" viewBox="0 0 760 330" role="img" aria-label={title}><rect width="760" height="330" rx="28" fill={bg} /><text x="380" y="48" textAnchor="middle" fill={color} fontSize="24" fontWeight="900">{title}</text>{steps.map((step, i) => <g key={step}><rect x={55 + i * gap} y="118" width="104" height="82" rx="18" fill="#fff" stroke={color} strokeWidth="3" /><text x={107 + i * gap} y="165" textAnchor="middle" fill={color} fontSize="12" fontWeight="900">{step}</text>{i < steps.length - 1 ? <path d={`M${164 + i * gap} 159h28`} stroke="#475569" strokeWidth="4" strokeLinecap="round" /> : null}</g>)}<text x="380" y="278" textAnchor="middle" fill={color} fontSize="15" fontWeight="800">escolha guiada por evidência</text></svg></Card>; }
function Split({ title, left, right, color, bg }: { title: string; left: string; right: string; color: string; bg: string }) { return <Card><svg className="w-full" viewBox="0 0 760 350" role="img" aria-label={title}><rect width="760" height="350" rx="28" fill={bg} /><text x="380" y="48" textAnchor="middle" fill={color} fontSize="24" fontWeight="900">{title}</text><rect x="115" y="95" width="235" height="150" rx="28" fill="#fff" stroke="#2563eb" strokeWidth="4" /><rect x="410" y="95" width="235" height="150" rx="28" fill="#fff" stroke="#7c3aed" strokeWidth="4" /><text x="232" y="175" textAnchor="middle" fill="#2563eb" fontSize="18" fontWeight="900">{left}</text><text x="528" y="175" textAnchor="middle" fill="#7c3aed" fontSize="18" fontWeight="900">{right}</text><text x="380" y="300" textAnchor="middle" fill={color} fontSize="15" fontWeight="800">menor complexidade que entrega robustez</text></svg></Card>; }
function Cards({ title, items, color, bg }: { title: string; items: string[]; color: string; bg: string }) { return <Card><svg className="w-full" viewBox="0 0 760 330" role="img" aria-label={title}><rect width="760" height="330" rx="28" fill={bg} /><text x="380" y="48" textAnchor="middle" fill={color} fontSize="24" fontWeight="900">{title}</text>{items.map((item, i) => <g key={item}><rect x={110 + (i % 2) * 280} y={95 + Math.floor(i / 2) * 82} width="240" height="56" rx="18" fill="#fff" stroke={color} strokeWidth="2" /><text x={230 + (i % 2) * 280} y={130 + Math.floor(i / 2) * 82} textAnchor="middle" fill={color} fontSize="16" fontWeight="900">{item}</text></g>)}</svg></Card>; }
function Card({ children }: { children: ReactNode }) { return <figure className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-xl shadow-slate-900/5">{children}</figure>; }
