import { ArrowRightLeft } from "lucide-react";
import { useMemo, useState } from "react";

function curveValue(x: number) {
  return 0.16 * (x - 5) ** 2 + 1.1;
}

function curveDerivative(x: number) {
  return 0.32 * (x - 5);
}

function graphPoint(x: number) {
  const y = curveValue(x);
  return {
    x: 80 + x * 60,
    y: 340 - y * 66,
  };
}

function lineThrough(x: number, slope: number, anchorX: number) {
  const anchorY = curveValue(anchorX);
  const y = anchorY + slope * (x - anchorX);
  return {
    x: 80 + x * 60,
    y: 340 - y * 66,
  };
}

function curvePath() {
  return Array.from({ length: 90 }, (_, index) => {
    const x = (index / 89) * 10;
    const point = graphPoint(x);
    return `${index === 0 ? "M" : "L"}${point.x.toFixed(2)} ${point.y.toFixed(2)}`;
  }).join(" ");
}

export function SecantTangentExplorer() {
  const [h, setH] = useState(2.8);
  const baseX = 3.2;
  const p1 = graphPoint(baseX);
  const p2 = graphPoint(baseX + h);
  const secantSlope = (curveValue(baseX + h) - curveValue(baseX)) / h;
  const tangentSlope = curveDerivative(baseX);
  const secantStart = lineThrough(0.6, secantSlope, baseX);
  const secantEnd = lineThrough(9.6, secantSlope, baseX);
  const tangentStart = lineThrough(1.4, tangentSlope, baseX);
  const tangentEnd = lineThrough(6.4, tangentSlope, baseX);

  return (
    <section className="rounded-[2rem] border border-orange-200 bg-orange-50 p-5 shadow-xl shadow-orange-900/5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.2em] text-orange-700">
            Diagrama interativo
          </p>
          <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-slate-950">
            Secante virando tangente
          </h3>
          <p className="mt-2 max-w-2xl leading-7 text-slate-600">
            Aproxime os dois pontos. A reta azul mede uma variação média; ao reduzir o
            intervalo, ela se aproxima da direção local da curva.
          </p>
        </div>
        <label className="min-w-64 text-sm font-bold text-slate-700">
          Intervalo h: {h.toFixed(2)}
          <input
            className="mt-2 w-full accent-orange-600"
            type="range"
            min="0.18"
            max="3"
            step="0.02"
            value={h}
            onChange={(event) => setH(Number(event.target.value))}
          />
        </label>
      </div>

      <svg
        className="mt-5 w-full rounded-[1.5rem] bg-white"
        viewBox="0 0 760 420"
        role="img"
        aria-label="Curva com reta secante controlada por slider se aproximando da tangente"
      >
        <path d="M70 340h620" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
        <path d="M80 350V58" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
        <path d={curvePath()} fill="none" stroke="#ea580c" strokeWidth="8" strokeLinecap="round" />
        <line
          x1={secantStart.x}
          y1={secantStart.y}
          x2={secantEnd.x}
          y2={secantEnd.y}
          stroke="#2563eb"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <line
          x1={tangentStart.x}
          y1={tangentStart.y}
          x2={tangentEnd.x}
          y2={tangentEnd.y}
          stroke="#0f172a"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="8 10"
        />
        <circle cx={p1.x} cy={p1.y} r="12" fill="#0f172a" stroke="#fff" strokeWidth="5" />
        <circle cx={p2.x} cy={p2.y} r="12" fill="#2563eb" stroke="#fff" strokeWidth="5" />
        <text x="112" y="78" fill="#2563eb" fontSize="22" fontWeight="800">
          secante: taxa média
        </text>
        <text x="420" y="320" fill="#0f172a" fontSize="22" fontWeight="800">
          tangente: taxa instantânea
        </text>
      </svg>

      <p className="mt-4 rounded-2xl bg-white px-4 py-3 text-sm font-bold leading-6 text-slate-700">
        Quando o intervalo tende a zero, a taxa média se aproxima da taxa instantânea.
      </p>
    </section>
  );
}

export function IntegralRectanglesExplorer() {
  const [rectangles, setRectangles] = useState(8);
  const start = 1;
  const end = 9;
  const dx = (end - start) / rectangles;
  const area = useMemo(() => {
    return Array.from({ length: rectangles }, (_, index) => {
      const midpoint = start + index * dx + dx / 2;
      return curveValue(midpoint) * dx;
    }).reduce((total, value) => total + value, 0);
  }, [dx, rectangles]);

  return (
    <section className="rounded-[2rem] border border-emerald-200 bg-emerald-50 p-5 shadow-xl shadow-emerald-900/5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-700">
            Visualização interativa
          </p>
          <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-slate-950">
            Integral por retângulos
          </h3>
          <p className="mt-2 max-w-2xl leading-7 text-slate-600">
            Aumente a quantidade de retângulos. A soma fica mais fiel à área real abaixo
            da curva.
          </p>
        </div>
        <label className="min-w-64 text-sm font-bold text-slate-700">
          Retângulos: {rectangles}
          <input
            className="mt-2 w-full accent-emerald-600"
            type="range"
            min="4"
            max="28"
            step="2"
            value={rectangles}
            onChange={(event) => setRectangles(Number(event.target.value))}
          />
        </label>
      </div>

      <svg
        className="mt-5 w-full rounded-[1.5rem] bg-white"
        viewBox="0 0 760 420"
        role="img"
        aria-label="Área sob uma curva aproximada por retângulos"
      >
        <path d="M70 340h620" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
        <path d="M80 350V58" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
        {Array.from({ length: rectangles }, (_, index) => {
          const x = start + index * dx;
          const midpoint = x + dx / 2;
          const left = graphPoint(x).x;
          const top = graphPoint(midpoint).y;
          const width = dx * 60;
          return (
            <rect
              key={index}
              x={left}
              y={top}
              width={width}
              height={340 - top}
              fill="#a7f3d0"
              stroke="#059669"
              strokeWidth="2"
              opacity="0.85"
            />
          );
        })}
        <path d={curvePath()} fill="none" stroke="#047857" strokeWidth="8" strokeLinecap="round" />
      </svg>

      <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
        <p className="rounded-2xl bg-white px-4 py-3 text-sm font-bold leading-6 text-slate-700">
          A integral nasce da soma de partes cada vez menores.
        </p>
        <span className="rounded-2xl bg-emerald-700 px-4 py-3 text-sm font-black text-white">
          área aproximada: {area.toFixed(2)}
        </span>
      </div>
    </section>
  );
}

export function DerivativeIntegralToggle() {
  const [mode, setMode] = useState<"derive" | "integrate">("derive");
  const isDerive = mode === "derive";

  return (
    <section className="rounded-[2rem] border border-violet-200 bg-violet-50 p-5 shadow-xl shadow-violet-900/5">
      <p className="text-sm font-black uppercase tracking-[0.2em] text-violet-700">
        Teorema Fundamental do Cálculo
      </p>
      <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-slate-950">
        Derivar e integrar são movimentos opostos
      </h3>

      <div className="mt-5 grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-center">
        <button
          className={`rounded-[1.5rem] border p-6 text-left transition ${
            isDerive
              ? "border-orange-300 bg-white shadow-xl shadow-orange-900/10"
              : "border-transparent bg-white/60"
          }`}
          type="button"
          onClick={() => setMode("derive")}
        >
          <span className="text-sm font-black uppercase tracking-[0.18em] text-orange-700">
            Derivar
          </span>
          <span className="mt-3 block font-display text-3xl font-semibold text-slate-950">
            descobre como algo muda
          </span>
        </button>

        <span className="mx-auto grid size-14 place-items-center rounded-full bg-violet-700 text-white">
          <ArrowRightLeft className="diagram-swap" size={26} aria-hidden="true" />
        </span>

        <button
          className={`rounded-[1.5rem] border p-6 text-left transition ${
            !isDerive
              ? "border-emerald-300 bg-white shadow-xl shadow-emerald-900/10"
              : "border-transparent bg-white/60"
          }`}
          type="button"
          onClick={() => setMode("integrate")}
        >
          <span className="text-sm font-black uppercase tracking-[0.18em] text-emerald-700">
            Integrar
          </span>
          <span className="mt-3 block font-display text-3xl font-semibold text-slate-950">
            descobre quanto algo acumulou
          </span>
        </button>
      </div>

      <p className="mt-5 rounded-2xl bg-white px-4 py-3 leading-7 text-slate-700">
        {isDerive
          ? "Se você conhece a posição, derivar revela a velocidade. Derivar desmonta uma quantidade acumulada em sua taxa local de mudança."
          : "Se você conhece a velocidade, integrar reconstrói a distância percorrida. Integrar soma mudanças pequenas para recuperar o acumulado."}
      </p>
    </section>
  );
}
