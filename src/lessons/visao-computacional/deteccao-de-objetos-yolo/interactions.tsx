import { useMemo, useState } from "react";
import { Grid3X3, Layers3, ScanSearch } from "lucide-react";
import type { LessonModule } from "../../../types/content";
import {
  InteractiveShell,
  MetricCard,
} from "../../../components/lesson/InteractionPrimitives";
import {
  createScenarioExplorer,
  createSliderPlayground,
} from "../../inteligencia-artificial/_shared/interactionFactories";

const bboxIouLab = createSliderPlayground({
  eyebrow: "Geometria",
  title: "Ajuste a caixa prevista e observe o IoU",
  description:
    "Desloque e redimensione a previsão para sentir como a sobreposição muda quando a caixa se afasta da anotação.",
  tone: "emerald",
  icon: <ScanSearch size={18} aria-hidden="true" />,
  initialState: {
    deslocamentoX: 0,
    deslocamentoY: 0,
    escala: 1,
  },
  controls: [
    { key: "deslocamentoX", label: "deslocamento horizontal", min: -40, max: 40, step: 2 },
    { key: "deslocamentoY", label: "deslocamento vertical", min: -40, max: 40, step: 2 },
    {
      key: "escala",
      label: "escala da caixa prevista",
      min: 0.6,
      max: 1.4,
      step: 0.05,
      formatValue: (value) => value.toFixed(2),
    },
  ],
  compute: ({ deslocamentoX, deslocamentoY, escala }) => {
    const gt = { cx: 100, cy: 100, w: 80, h: 60 };
    const pred = {
      cx: gt.cx + deslocamentoX,
      cy: gt.cy + deslocamentoY,
      w: gt.w * escala,
      h: gt.h * escala,
    };

    const gtX1 = gt.cx - gt.w / 2;
    const gtY1 = gt.cy - gt.h / 2;
    const gtX2 = gt.cx + gt.w / 2;
    const gtY2 = gt.cy + gt.h / 2;
    const prX1 = pred.cx - pred.w / 2;
    const prY1 = pred.cy - pred.h / 2;
    const prX2 = pred.cx + pred.w / 2;
    const prY2 = pred.cy + pred.h / 2;

    const interW = Math.max(0, Math.min(gtX2, prX2) - Math.max(gtX1, prX1));
    const interH = Math.max(0, Math.min(gtY2, prY2) - Math.max(gtY1, prY1));
    const inter = interW * interH;
    const union = gt.w * gt.h + pred.w * pred.h - inter;
    const iou = union > 0 ? inter / union : 0;

    return {
      metrics: [
        { label: "IoU", value: `${(iou * 100).toFixed(0)}%` },
        { label: "largura prevista", value: `${pred.w.toFixed(0)} px` },
        { label: "altura prevista", value: `${pred.h.toFixed(0)} px` },
        { label: "deslocamento total", value: `${Math.hypot(deslocamentoX, deslocamentoY).toFixed(0)} px` },
      ],
      bars: [
        { label: "Sobreposição", value: iou, display: `${(iou * 100).toFixed(0)}%` },
        {
          label: "Erro de posição",
          value: Math.min(1, Math.hypot(deslocamentoX, deslocamentoY) / 56),
          display: `${Math.min(100, (Math.hypot(deslocamentoX, deslocamentoY) / 56) * 100).toFixed(0)}%`,
        },
        {
          label: "Erro de escala",
          value: Math.min(1, Math.abs(1 - escala) / 0.4),
          display: `${(Math.min(1, Math.abs(1 - escala) / 0.4) * 100).toFixed(0)}%`,
        },
      ],
      narrative:
        iou > 0.7
          ? "A caixa prevista quase coincide com a anotação. Este é o regime em que localização e utilidade prática começam a conversar bem."
          : iou > 0.4
            ? "A hipótese ainda encontra o objeto, mas já perdeu qualidade geométrica. Em alguns benchmarks, isso pode contar como acerto fraco ou erro, dependendo do limiar."
            : "A caixa já está longe demais em posição ou escala. Score alto aqui não salva uma localização ruim.",
      footer:
        "IoU é uma régua geométrica: ele não pergunta se a classe está correta, apenas se a caixa encaixa bem.",
    };
  },
});

const nmsLab = createScenarioExplorer({
  eyebrow: "Pós-processamento",
  title: "Compare efeitos de NMS em cenários diferentes",
  description:
    "Veja por que o mesmo limiar de NMS pode ser ótimo para duplicatas óbvias e ruim para objetos muito próximos.",
  tone: "violet",
  icon: <Layers3 size={18} aria-hidden="true" />,
  scenarios: [
    {
      id: "duplicata",
      label: "Duplicata clara",
      title: "Duas caixas para o mesmo carro",
      description:
        "As duas hipóteses praticamente cobrem o mesmo objeto. NMS deve manter a mais confiável e apagar a redundante.",
      bullets: [
        "IoU entre caixas é alto.",
        "Scores são parecidos, mas uma hipótese domina.",
        "NMS reduz ruído sem risco real de perder um segundo objeto.",
      ],
      metrics: [
        { label: "IoU entre caixas", value: "alto" },
        { label: "risco de apagar objeto real", value: "baixo" },
      ],
      bars: [
        { label: "Benefício do NMS", value: 0.92, display: "92%" },
        { label: "Risco de erro", value: 0.12, display: "12%" },
      ],
    },
    {
      id: "vizinhos",
      label: "Objetos vizinhos",
      title: "Duas pessoas lado a lado",
      description:
        "As caixas se tocam bastante, mas representam indivíduos diferentes. NMS agressivo demais pode transformar dois objetos em um.",
      bullets: [
        "IoU moderado pode significar proximidade real, não duplicata.",
        "Score mais alto não prova que a outra caixa é lixo.",
        "Cenas densas pedem calibração cuidadosa dos limiares.",
      ],
      metrics: [
        { label: "IoU entre caixas", value: "médio" },
        { label: "risco de apagar objeto real", value: "alto" },
      ],
      bars: [
        { label: "Benefício do NMS", value: 0.58, display: "58%" },
        { label: "Risco de erro", value: 0.74, display: "74%" },
      ],
    },
    {
      id: "multiclasse",
      label: "Cenário multiclasse",
      title: "Mochila sobre uma cadeira",
      description:
        "Duas caixas podem ocupar regiões semelhantes e ainda assim pertencer a classes diferentes. O pós-processamento precisa respeitar essa estrutura.",
      bullets: [
        "Suprimir entre classes de forma ingênua pode apagar informação útil.",
        "Muitas implementações aplicam NMS por classe ou usam variantes mais sofisticadas.",
        "Contexto e hierarquia entre objetos também influenciam a interpretação.",
      ],
      metrics: [
        { label: "sobreposição", value: "alta" },
        { label: "mesma classe?", value: "não" },
      ],
      bars: [
        { label: "Benefício do NMS bruto", value: 0.36, display: "36%" },
        { label: "Necessidade de regra cuidadosa", value: 0.84, display: "84%" },
      ],
    },
  ],
});

function YoloGridLab() {
  const [x, setX] = useState(42);
  const [y, setY] = useState(63);
  const [tamanho, setTamanho] = useState(28);

  const cellCol = Math.min(2, Math.max(0, Math.floor((x / 100) * 3)));
  const cellRow = Math.min(2, Math.max(0, Math.floor((y / 100) * 3)));
  const cellId = `${cellRow + 1},${cellCol + 1}`;
  const narrative = useMemo(() => {
    if (tamanho < 18) {
      return "Objetos pequenos exigem que a representação preserve detalhe suficiente. Em versões antigas, esse regime já podia ser difícil.";
    }
    if (x > 66 || y > 66) {
      return "Quando o centro cai perto das bordas da grade, a responsabilidade ainda pertence à célula que contém esse centro. Essa convenção simplifica o problema, mas também cria ambiguidades.";
    }
    return "No YOLO original, a célula responsável é a que contém o centro do objeto. Isso ajuda a organizar quem deve prever aquela instância.";
  }, [tamanho, x, y]);

  return (
    <InteractiveShell
      eyebrow="Mecânica do YOLO"
      title="Veja qual célula da grade fica responsável pelo objeto"
      tone="teal"
      icon={<Grid3X3 size={18} aria-hidden="true" />}
      description="Mova o centro do objeto pela imagem e observe como a responsabilidade muda quando ele atravessa fronteiras da grade."
    >
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-4">
          <label className="grid gap-2 rounded-3xl bg-white p-4 text-sm font-black text-slate-700">
            <span className="flex items-center justify-between">
              centro horizontal
              <span className="font-mono text-slate-950">{x}</span>
            </span>
            <input
              className="w-full accent-slate-950"
              max={95}
              min={5}
              step={1}
              type="range"
              value={x}
              onChange={(event) => setX(Number(event.target.value))}
            />
          </label>
          <label className="grid gap-2 rounded-3xl bg-white p-4 text-sm font-black text-slate-700">
            <span className="flex items-center justify-between">
              centro vertical
              <span className="font-mono text-slate-950">{y}</span>
            </span>
            <input
              className="w-full accent-slate-950"
              max={95}
              min={5}
              step={1}
              type="range"
              value={y}
              onChange={(event) => setY(Number(event.target.value))}
            />
          </label>
          <label className="grid gap-2 rounded-3xl bg-white p-4 text-sm font-black text-slate-700">
            <span className="flex items-center justify-between">
              tamanho aproximado da caixa
              <span className="font-mono text-slate-950">{tamanho}</span>
            </span>
            <input
              className="w-full accent-slate-950"
              max={40}
              min={10}
              step={1}
              type="range"
              value={tamanho}
              onChange={(event) => setTamanho(Number(event.target.value))}
            />
          </label>
          <div className="grid gap-3 sm:grid-cols-2">
            <MetricCard label="célula responsável" value={cellId} />
            <MetricCard label="objeto pequeno?" value={tamanho < 18 ? "sim" : "não"} />
            <MetricCard label="linha" value={String(cellRow + 1)} />
            <MetricCard label="coluna" value={String(cellCol + 1)} />
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-4">
            <p className="text-sm leading-6 text-slate-700">{narrative}</p>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-5">
          <svg className="w-full" viewBox="0 0 360 360" role="img" aria-label="Grade conceitual do YOLO">
            <rect x="0" y="0" width="360" height="360" rx="24" fill="#f0fdfa" />
            {[1, 2].map((index) => (
              <g key={index}>
                <line
                  x1={index * 120}
                  y1="20"
                  x2={index * 120}
                  y2="340"
                  stroke="#99f6e4"
                  strokeWidth="3"
                />
                <line
                  x1="20"
                  y1={index * 120}
                  x2="340"
                  y2={index * 120}
                  stroke="#99f6e4"
                  strokeWidth="3"
                />
              </g>
            ))}
            {Array.from({ length: 3 }).map((_, row) =>
              Array.from({ length: 3 }).map((__, col) => {
                const selected = row === cellRow && col === cellCol;
                return (
                  <rect
                    key={`${row}-${col}`}
                    x={20 + col * 106.666}
                    y={20 + row * 106.666}
                    width="106.666"
                    height="106.666"
                    fill={selected ? "#99f6e4" : "transparent"}
                    opacity={selected ? 0.55 : 1}
                  />
                );
              }),
            )}
            <rect
              x={x * 3.2 - tamanho * 1.6}
              y={y * 3.2 - tamanho * 1.35}
              width={tamanho * 3.2}
              height={tamanho * 2.7}
              rx="18"
              fill="none"
              stroke="#0f766e"
              strokeWidth="4"
            />
            <circle cx={x * 3.2} cy={y * 3.2} r="8" fill="#0f766e" />
            <text x={x * 3.2 + 14} y={y * 3.2 - 10} fill="#115e59" fontSize="12" fontWeight="800">
              centro
            </text>
            <text x="180" y="28" textAnchor="middle" fill="#115e59" fontSize="14" fontWeight="900">
              A célula destacada contém o centro do objeto
            </text>
          </svg>
        </div>
      </div>
    </InteractiveShell>
  );
}

export const interactions = {
  "bbox-iou-lab": bboxIouLab,
  "yolo-grid-lab": YoloGridLab,
  "nms-lab": nmsLab,
} satisfies LessonModule["interactions"];
