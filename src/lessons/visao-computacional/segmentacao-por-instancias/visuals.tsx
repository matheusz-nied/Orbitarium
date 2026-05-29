import type { ReactNode } from "react";
import type { LessonModule } from "../../../types/content";

export const visuals = {
  "instances-hero": Hero,
  "instances-idea": Idea,
  "instance-comparison": Compare,
  "instance-output": Output,
  "maskrcnn-visual": MaskRcnn,
  "proposal-visual": Proposal,
  "nms-visual": Nms,
  "instance-eval": Eval,
  "instance-data": Data,
  "instance-limits": Limits,
} satisfies LessonModule["visuals"];

function Hero() { return <Flow title="Segmentação por instâncias" steps={["propostas", "boxes", "classes", "scores", "masks"]} color="#7c3aed" bg="#faf5ff" />; }
function Idea() { return <Scene title="Cada objeto recebe uma máscara" color="#0f766e" bg="#ecfdf5" instances />; }
function Compare() { return <Cards title="Semântica vs instâncias" items={["semântica: todos = carro", "instâncias: carro 1, 2, 3", "panóptica: cena completa"]} color="#2563eb" bg="#eff6ff" />; }
function Output() { return <Cards title="Saída do modelo" items={["box + label", "score", "mask por instância"]} color="#f59e0b" bg="#fffbeb" />; }
function MaskRcnn() { return <Flow title="Mask R-CNN" steps={["backbone", "RPN", "RoI", "box/class", "mask"]} color="#7c3aed" bg="#faf5ff" />; }
function Proposal() { return <Scene title="Propostas antecedem máscaras" color="#2563eb" bg="#eff6ff" boxes />; }
function Nms() { return <Scene title="NMS remove duplicatas" color="#be123c" bg="#fff1f2" boxes overlap />; }
function Eval() { return <Cards title="Erros comuns" items={["duplicar objeto", "juntar dois", "perder pequeno"]} color="#be123c" bg="#fff1f2" />; }
function Data() { return <Scene title="Anotação por objeto" color="#0f766e" bg="#ecfdf5" instances boxes />; }
function Limits() { return <Cards title="Casos difíceis" items={["oclusão", "objetos grudados", "domínio novo"]} color="#64748b" bg="#f8fafc" />; }

function Flow({ title, steps, color, bg }: { title: string; steps: string[]; color: string; bg: string }) { const gap = 132; return <Card><svg className="w-full" viewBox="0 0 760 330" role="img" aria-label={title}><rect width="760" height="330" rx="28" fill={bg} /><text x="380" y="48" textAnchor="middle" fill={color} fontSize="24" fontWeight="900">{title}</text>{steps.map((step, i) => <g key={step}><rect x={55 + i * gap} y="118" width="104" height="82" rx="18" fill="#fff" stroke={color} strokeWidth="3" /><text x={107 + i * gap} y="165" textAnchor="middle" fill={color} fontSize="12" fontWeight="900">{step}</text>{i < steps.length - 1 ? <path d={`M${164 + i * gap} 159h28`} stroke="#475569" strokeWidth="4" strokeLinecap="round" /> : null}</g>)}<text x="380" y="278" textAnchor="middle" fill={color} fontSize="15" fontWeight="800">lista de objetos, não apenas mapa único</text></svg></Card>; }
function Scene({ title, color, bg, instances = false, boxes = false, overlap = false }: { title: string; color: string; bg: string; instances?: boolean; boxes?: boolean; overlap?: boolean }) { const shapes = [[250, 160, 58, "#38bdf8"], [365, 168, 66, "#22c55e"], [480, 158, 54, "#f59e0b"]] as const; return <Card><svg className="w-full" viewBox="0 0 760 350" role="img" aria-label={title}><rect width="760" height="350" rx="28" fill={bg} /><text x="380" y="48" textAnchor="middle" fill={color} fontSize="24" fontWeight="900">{title}</text>{shapes.map(([cx, cy, r, fill], i) => <g key={i}><circle cx={cx} cy={cy} r={r} fill={instances ? fill : "#0f172a"} opacity="0.82" />{boxes ? <rect x={cx - r - 12} y={cy - r - 10} width={2 * r + 24} height={2 * r + 20} rx="12" fill="none" stroke={i === 1 && overlap ? "#ef4444" : color} strokeWidth="5" strokeDasharray={overlap ? "10 6" : undefined} /> : null}<text x={cx} y="275" textAnchor="middle" fill={color} fontSize="14" fontWeight="900">obj {i + 1}</text></g>)}</svg></Card>; }
function Cards({ title, items, color, bg }: { title: string; items: string[]; color: string; bg: string }) { return <Card><svg className="w-full" viewBox="0 0 760 330" role="img" aria-label={title}><rect width="760" height="330" rx="28" fill={bg} /><text x="380" y="48" textAnchor="middle" fill={color} fontSize="24" fontWeight="900">{title}</text>{items.map((item, i) => <g key={item}><rect x="150" y={92 + i * 62} width="460" height="48" rx="16" fill="#fff" stroke={color} strokeWidth="2" /><text x="380" y={123 + i * 62} textAnchor="middle" fill={i === 1 ? color : "#475569"} fontSize="17" fontWeight="900">{item}</text></g>)}</svg></Card>; }
function Card({ children }: { children: ReactNode }) { return <figure className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-xl shadow-slate-900/5">{children}</figure>; }
