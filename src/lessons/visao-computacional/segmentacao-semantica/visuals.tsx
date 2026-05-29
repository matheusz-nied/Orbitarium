import type { ReactNode } from "react";
import type { LessonModule } from "../../../types/content";

export const visuals = {
  "semantic-hero": Hero,
  "semantic-idea": Idea,
  "task-comparison": TaskComparison,
  "logits-visual": Logits,
  "encoder-decoder": EncoderDecoder,
  "annotation-visual": Annotation,
  "loss-visual": Loss,
  "iou-visual": Iou,
  "postprocess-visual": Post,
  "semantic-limits": Limits,
} satisfies LessonModule["visuals"];

function Hero() { return <Flow title="Segmentação semântica" steps={["imagem", "features", "logits", "softmax", "máscara"]} color="#7c3aed" bg="#faf5ff" />; }
function Idea() { return <Mask title="Um rótulo por pixel" color="#0f766e" bg="#ecfdf5" />; }
function TaskComparison() { return <Three title="Três perguntas" labels={["classe", "caixa", "pixels"]} color="#2563eb" bg="#eff6ff" />; }
function Logits() { return <Cards title="Logits → softmax → argmax" items={["céu: 0.12", "estrada: 0.76", "pessoa: 0.12"]} color="#f59e0b" bg="#fffbeb" />; }
function EncoderDecoder() { return <Flow title="Encoder-decoder" steps={["detalhe", "contexto", "bottleneck", "skips", "máscara"]} color="#7c3aed" bg="#faf5ff" />; }
function Annotation() { return <Mask title="Imagem + máscara anotada" color="#0f766e" bg="#ecfdf5" />; }
function Loss() { return <Cards title="Loss por pixel" items={["comparar classe prevista", "penalizar erro", "somar no mapa"]} color="#be123c" bg="#fff1f2" />; }
function Iou() { return <Venn />; }
function Post() { return <Flow title="Pós-processamento" steps={["argmax", "filtrar", "preencher", "suavizar", "entregar"]} color="#0f766e" bg="#ecfdf5" />; }
function Limits() { return <Cards title="Limites" items={["não separa instâncias", "bordas podem borrar", "domínio pode mudar"]} color="#64748b" bg="#f8fafc" />; }

function Flow({ title, steps, color, bg }: { title: string; steps: string[]; color: string; bg: string }) { const gap = 132; return <Card><svg className="w-full" viewBox="0 0 760 330" role="img" aria-label={title}><rect width="760" height="330" rx="28" fill={bg} /><text x="380" y="48" textAnchor="middle" fill={color} fontSize="24" fontWeight="900">{title}</text>{steps.map((step, i) => <g key={step}><rect x={55 + i * gap} y="118" width="104" height="82" rx="18" fill="#fff" stroke={color} strokeWidth="3" /><text x={107 + i * gap} y="165" textAnchor="middle" fill={color} fontSize="12" fontWeight="900">{step}</text>{i < steps.length - 1 ? <path d={`M${164 + i * gap} 159h28`} stroke="#475569" strokeWidth="4" strokeLinecap="round" /> : null}</g>)}<text x="380" y="278" textAnchor="middle" fill={color} fontSize="15" fontWeight="800">predição densa preserva estrutura espacial</text></svg></Card>; }
function Mask({ title, color, bg }: { title: string; color: string; bg: string }) { const palette = ["#38bdf8", "#22c55e", "#f59e0b", "#e11d48"]; return <Card><svg className="w-full" viewBox="0 0 760 350" role="img" aria-label={title}><rect width="760" height="350" rx="28" fill={bg} /><text x="380" y="48" textAnchor="middle" fill={color} fontSize="24" fontWeight="900">{title}</text>{Array.from({ length: 48 }, (_, i) => <rect key={i} x={170 + (i % 12) * 35} y={90 + Math.floor(i / 12) * 35} width="31" height="31" rx="7" fill={palette[(i + Math.floor(i / 12)) % palette.length]} opacity="0.9" />)}<text x="380" y="300" textAnchor="middle" fill={color} fontSize="15" fontWeight="800">cada quadrado representa uma decisão local</text></svg></Card>; }
function Three({ title, labels, color, bg }: { title: string; labels: string[]; color: string; bg: string }) { return <Card><svg className="w-full" viewBox="0 0 760 350" role="img" aria-label={title}><rect width="760" height="350" rx="28" fill={bg} /><text x="380" y="48" textAnchor="middle" fill={color} fontSize="24" fontWeight="900">{title}</text>{labels.map((label, i) => <g key={label}><rect x={130 + i * 190} y="105" width="120" height="120" rx="24" fill="#fff" stroke={color} strokeWidth="3" /><circle cx={190 + i * 190} cy="165" r={i === 2 ? 38 : 30} fill="#0f172a" opacity="0.9" />{i === 1 ? <rect x={155 + i * 190} y="130" width="70" height="70" fill="none" stroke="#f59e0b" strokeWidth="5" /> : null}<text x={190 + i * 190} y="270" textAnchor="middle" fill={color} fontSize="16" fontWeight="900">{label}</text></g>)}</svg></Card>; }
function Cards({ title, items, color, bg }: { title: string; items: string[]; color: string; bg: string }) { return <Card><svg className="w-full" viewBox="0 0 760 330" role="img" aria-label={title}><rect width="760" height="330" rx="28" fill={bg} /><text x="380" y="48" textAnchor="middle" fill={color} fontSize="24" fontWeight="900">{title}</text>{items.map((item, i) => <g key={item}><rect x="150" y={92 + i * 62} width="460" height="48" rx="16" fill="#fff" stroke={color} strokeWidth="2" /><text x="380" y={123 + i * 62} textAnchor="middle" fill={i === 1 ? color : "#475569"} fontSize="17" fontWeight="900">{item}</text></g>)}</svg></Card>; }
function Venn() { return <Card><svg className="w-full" viewBox="0 0 760 330" role="img" aria-label="IoU"><rect width="760" height="330" rx="28" fill="#eff6ff" /><text x="380" y="48" textAnchor="middle" fill="#2563eb" fontSize="24" fontWeight="900">IoU = interseção / união</text><circle cx="330" cy="170" r="82" fill="#38bdf8" opacity="0.55" /><circle cx="430" cy="170" r="82" fill="#22c55e" opacity="0.55" /><text x="380" y="176" textAnchor="middle" fill="#0f172a" fontSize="18" fontWeight="900">∩</text><text x="330" y="270" textAnchor="middle" fill="#2563eb" fontSize="14" fontWeight="900">referência</text><text x="430" y="270" textAnchor="middle" fill="#0f766e" fontSize="14" fontWeight="900">previsão</text></svg></Card>; }
function Card({ children }: { children: ReactNode }) { return <figure className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-xl shadow-slate-900/5">{children}</figure>; }
