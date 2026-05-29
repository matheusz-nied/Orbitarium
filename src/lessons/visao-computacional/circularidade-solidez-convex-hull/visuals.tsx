import type { ReactNode } from "react";
import type { LessonModule } from "../../../types/content";

export const visuals = {
  "shape-descriptors-hero": Hero,
  "shape-motivation": Motivation,
  "circularity-visual": Circularity,
  "convexity-visual": Convexity,
  "hull-visual": Hull,
  "solidity-visual": Solidity,
  "defects-visual": Defects,
  "descriptor-grid": DescriptorGrid,
  "pipeline-shape": Pipeline,
  "pitfalls-visual": Pitfalls,
} satisfies LessonModule["visuals"];

function Hero() { return <Flow title="Descritores de forma" steps={["contorno", "área", "perímetro", "hull", "métricas"]} color="#7c3aed" bg="#faf5ff" />; }
function Motivation() { return <Compare title="Mesma área, formas diferentes" left="círculo" right="estrela" color="#0f766e" bg="#ecfdf5" />; }
function Circularity() { return <Formula title="Circularidade" lines={["4πA / P²", "círculo → perto de 1", "recortes → menor"]} color="#2563eb" bg="#eff6ff" />; }
function Convexity() { return <Compare title="Convexo vs côncavo" left="sem entrada" right="com entrada" color="#f59e0b" bg="#fffbeb" />; }
function Hull() { return <Shape title="Convex hull envolve os extremos" hull color="#7c3aed" bg="#faf5ff" />; }
function Solidity() { return <Formula title="Solidez" lines={["área / área do hull", "convexo → perto de 1", "concavidade → menor"]} color="#0f766e" bg="#ecfdf5" />; }
function Defects() { return <Shape title="Defeitos são vãos até o hull" hull defects color="#e11d48" bg="#fff1f2" />; }
function DescriptorGrid() { return <Grid />; }
function Pipeline() { return <Flow title="Tabela de descritores" steps={["findContours", "area", "arcLength", "convexHull", "DataFrame"]} color="#2563eb" bg="#eff6ff" />; }
function Pitfalls() { return <Formula title="Armadilhas" lines={["ruído aumenta perímetro", "objetos grudados mudam hull", "buracos alteram área"]} color="#be123c" bg="#fff1f2" />; }

function Flow({ title, steps, color, bg }: { title: string; steps: string[]; color: string; bg: string }) { const gap = 132; return <Card><svg className="w-full" viewBox="0 0 760 330" role="img" aria-label={title}><rect width="760" height="330" rx="28" fill={bg} /><text x="380" y="48" textAnchor="middle" fill={color} fontSize="24" fontWeight="900">{title}</text>{steps.map((step, i) => <g key={step}><rect x={55 + i * gap} y="118" width="104" height="82" rx="18" fill="#ffffff" stroke={color} strokeWidth="3" /><text x={107 + i * gap} y="165" textAnchor="middle" fill={color} fontSize="12" fontWeight="900">{step}</text>{i < steps.length - 1 ? <path d={`M${164 + i * gap} 159h28`} stroke="#475569" strokeWidth="4" strokeLinecap="round" /> : null}</g>)}<text x="380" y="278" textAnchor="middle" fill={color} fontSize="15" fontWeight="800">números tornam a forma comparável</text></svg></Card>; }
function Formula({ title, lines, color, bg }: { title: string; lines: string[]; color: string; bg: string }) { return <Card><svg className="w-full" viewBox="0 0 760 330" role="img" aria-label={title}><rect width="760" height="330" rx="28" fill={bg} /><text x="380" y="48" textAnchor="middle" fill={color} fontSize="24" fontWeight="900">{title}</text><rect x="150" y="92" width="460" height="188" rx="24" fill="#ffffff" stroke={color} strokeWidth="3" />{lines.map((line, i) => <text key={line} x="380" y={138 + i * 42} textAnchor="middle" fill={i === 0 ? color : "#475569"} fontSize={i === 0 ? "28" : "18"} fontWeight="900">{line}</text>)}</svg></Card>; }
function Shape({ title, color, bg, hull = false, defects = false }: { title: string; color: string; bg: string; hull?: boolean; defects?: boolean }) { return <Card><svg className="w-full" viewBox="0 0 760 350" role="img" aria-label={title}><rect width="760" height="350" rx="28" fill={bg} /><text x="380" y="48" textAnchor="middle" fill={color} fontSize="24" fontWeight="900">{title}</text>{hull ? <path d="M235 108 L510 112 L565 220 L395 280 L230 226 Z" fill="#ffffff" stroke={color} strokeWidth="5" strokeDasharray="10 8" /> : null}<path d="M255 130 L500 120 L442 178 L538 218 L392 252 L300 222 L338 174 Z" fill="#0f172a" opacity="0.92" />{defects ? <><line x1="500" y1="120" x2="442" y2="178" stroke="#e11d48" strokeWidth="5" strokeLinecap="round" /><line x1="338" y1="174" x2="255" y2="130" stroke="#e11d48" strokeWidth="5" strokeLinecap="round" /><circle cx="442" cy="178" r="9" fill="#fff" stroke="#e11d48" strokeWidth="4" /></> : null}<text x="380" y="315" textAnchor="middle" fill={color} fontSize="15" fontWeight="800">contorno real + referência convexa</text></svg></Card>; }
function Compare({ title, left, right, color, bg }: { title: string; left: string; right: string; color: string; bg: string }) { return <Card><svg className="w-full" viewBox="0 0 760 350" role="img" aria-label={title}><rect width="760" height="350" rx="28" fill={bg} /><text x="380" y="48" textAnchor="middle" fill={color} fontSize="24" fontWeight="900">{title}</text><circle cx="235" cy="165" r="74" fill="#0f172a" /><path d="M510 84 L538 140 L600 148 L555 190 L566 252 L510 222 L454 252 L465 190 L420 148 L482 140 Z" fill="#0f172a" /><text x="235" y="295" textAnchor="middle" fill={color} fontSize="16" fontWeight="900">{left}</text><text x="510" y="295" textAnchor="middle" fill={color} fontSize="16" fontWeight="900">{right}</text></svg></Card>; }
function Grid() { const cells = [["alta circ.", "alta solidez", "disco"], ["baixa circ.", "alta solidez", "retângulo"], ["baixa circ.", "baixa solidez", "estrela"], ["média circ.", "baixa solidez", "ferradura"]]; return <Card><svg className="w-full" viewBox="0 0 760 350" role="img" aria-label="Grade de descritores"><rect width="760" height="350" rx="28" fill="#f8fafc" /><text x="380" y="48" textAnchor="middle" fill="#0f172a" fontSize="24" fontWeight="900">Circularidade + solidez</text>{cells.map(([a, b, c], i) => <g key={c}><rect x={110 + (i % 2) * 280} y={90 + Math.floor(i / 2) * 105} width="240" height="82" rx="20" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" /><text x={230 + (i % 2) * 280} y={120 + Math.floor(i / 2) * 105} textAnchor="middle" fill="#7c3aed" fontSize="14" fontWeight="900">{a}</text><text x={230 + (i % 2) * 280} y={145 + Math.floor(i / 2) * 105} textAnchor="middle" fill="#0f766e" fontSize="14" fontWeight="900">{b}</text><text x={230 + (i % 2) * 280} y={166 + Math.floor(i / 2) * 105} textAnchor="middle" fill="#475569" fontSize="12" fontWeight="800">{c}</text></g>)}</svg></Card>; }
function Card({ children }: { children: ReactNode }) { return <figure className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-xl shadow-slate-900/5">{children}</figure>; }
