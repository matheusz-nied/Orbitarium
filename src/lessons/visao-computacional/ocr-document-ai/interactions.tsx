import { useMemo, useState } from "react";
import { FileScan, Rows3, ScanText } from "lucide-react";
import type { LessonModule } from "../../../types/content";
import {
  InteractiveShell,
  MetricCard,
} from "../../../components/lesson/InteractionPrimitives";
import {
  createScenarioExplorer,
  createSliderPlayground,
} from "../../inteligencia-artificial/_shared/interactionFactories";

const ocrPreprocessLab = createSliderPlayground({
  eyebrow: "Qualidade de entrada",
  title: "Ajuste ruído, contraste e inclinação do documento",
  description:
    "Simule uma captura ruim e observe como a legibilidade estimada cai antes mesmo do OCR começar a ler.",
  tone: "amber",
  icon: <ScanText size={18} aria-hidden="true" />,
  initialState: {
    ruido: 0.2,
    contraste: 0.8,
    inclinacao: 2,
  },
  controls: [
    {
      key: "ruido",
      label: "nível de ruído",
      min: 0,
      max: 1,
      step: 0.05,
      formatValue: (value) => value.toFixed(2),
    },
    {
      key: "contraste",
      label: "contraste útil",
      min: 0.2,
      max: 1.2,
      step: 0.05,
      formatValue: (value) => value.toFixed(2),
    },
    { key: "inclinacao", label: "inclinação (graus)", min: 0, max: 15, step: 1 },
  ],
  compute: ({ ruido, contraste, inclinacao }) => {
    const legibilidade = Math.max(0, Math.min(1, contraste - ruido * 0.55 - inclinacao / 24));
    const riscoOrdem = Math.max(0, Math.min(1, ruido * 0.35 + inclinacao / 18));
    const riscoCaracter = Math.max(0, Math.min(1, ruido * 0.65 + (1 - Math.min(1.2, contraste) / 1.2)));

    return {
      metrics: [
        { label: "legibilidade estimada", value: `${(legibilidade * 100).toFixed(0)}%` },
        { label: "risco de erro de caractere", value: `${(riscoCaracter * 100).toFixed(0)}%` },
        { label: "risco de layout", value: `${(riscoOrdem * 100).toFixed(0)}%` },
        { label: "deskew necessário?", value: inclinacao >= 6 ? "sim" : "talvez não" },
      ],
      bars: [
        { label: "Texto legível", value: legibilidade, display: `${(legibilidade * 100).toFixed(0)}%` },
        { label: "Ruído percebido", value: ruido, display: `${(ruido * 100).toFixed(0)}%` },
        { label: "Risco para OCR", value: Math.max(riscoCaracter, riscoOrdem), display: `${(Math.max(riscoCaracter, riscoOrdem) * 100).toFixed(0)}%` },
      ],
      narrative:
        legibilidade > 0.7
          ? "A entrada ainda está amigável. Mesmo assim, pequenos ajustes de recorte e contraste podem economizar erros nas bordas e em fontes finas."
          : legibilidade > 0.4
            ? "O OCR pode recuperar bastante coisa, mas erros de linha, acento e ordem de leitura já começam a aparecer."
            : "Aqui o problema já não é 'qual modelo usar', e sim quanta informação visual confiável restou para ser lida.",
      footer:
        "Pré-processamento não é enfeite: ele altera a relação sinal-ruído que o reconhecedor precisa decodificar.",
    };
  },
});

const documentAiScenarios = createScenarioExplorer({
  eyebrow: "Aplicação",
  title: "Compare três regimes de OCR e Document AI",
  description:
    "O valor da solução muda conforme a tarefa: transcrever texto, interpretar formulários ou reconstruir tabelas.",
  tone: "rose",
  icon: <FileScan size={18} aria-hidden="true" />,
  scenarios: [
    {
      id: "transcricao",
      label: "Transcrição simples",
      title: "Página corrida ou PDF textualizado",
      description:
        "Quando o documento é linear e limpo, OCR forte com pouca lógica adicional já pode ser suficiente.",
      bullets: [
        "Ordem de leitura costuma ser simples.",
        "O foco está em caracteres, palavras e parágrafos.",
        "Extração estruturada é secundária ou inexistente.",
      ],
      metrics: [
        { label: "peso do layout", value: "médio" },
        { label: "necessidade de entidades", value: "baixa" },
      ],
      bars: [
        { label: "Ganho com OCR puro", value: 0.82, display: "82%" },
        { label: "Ganho extra com Document AI", value: 0.34, display: "34%" },
      ],
    },
    {
      id: "formulario",
      label: "Formulário",
      title: "Campos, chaves e valores espalhados",
      description:
        "Aqui o texto bruto não basta: a utilidade depende de saber qual valor pertence a qual rótulo.",
      bullets: [
        "Pareamento chave-valor é central.",
        "Posição espacial pesa tanto quanto o conteúdo verbal.",
        "Validações de negócio se tornam parte do pipeline.",
      ],
      metrics: [
        { label: "peso do layout", value: "alto" },
        { label: "necessidade de entidades", value: "alta" },
      ],
      bars: [
        { label: "Ganho com OCR puro", value: 0.42, display: "42%" },
        { label: "Ganho extra com Document AI", value: 0.88, display: "88%" },
      ],
    },
    {
      id: "tabela",
      label: "Tabela complexa",
      title: "Linhas, colunas e células com dependência bidimensional",
      description:
        "Reconhecer texto sem reconstruir a grade destrói a relação entre item, quantidade, preço e total.",
      bullets: [
        "Linearizar cedo demais costuma quebrar a estrutura.",
        "A reconstrução de célula e relação linha-coluna é a pergunta certa.",
        "Pipelines híbridos costumam ser os mais robustos.",
      ],
      metrics: [
        { label: "peso do layout", value: "muito alto" },
        { label: "necessidade de entidades", value: "alta" },
      ],
      bars: [
        { label: "Ganho com OCR puro", value: 0.24, display: "24%" },
        { label: "Ganho extra com Document AI", value: 0.92, display: "92%" },
      ],
    },
  ],
});

function ReadingOrderLab() {
  const [layout, setLayout] = useState<"uma-coluna" | "duas-colunas" | "formulario">("duas-colunas");
  const blocks = useMemo(() => {
    if (layout === "uma-coluna") {
      return [
        { id: "A", x: 40, y: 60, w: 260, h: 44 },
        { id: "B", x: 40, y: 118, w: 260, h: 44 },
        { id: "C", x: 40, y: 176, w: 260, h: 44 },
        { id: "D", x: 40, y: 234, w: 260, h: 44 },
      ];
    }
    if (layout === "duas-colunas") {
      return [
        { id: "A", x: 34, y: 56, w: 120, h: 44 },
        { id: "B", x: 34, y: 116, w: 120, h: 44 },
        { id: "C", x: 34, y: 176, w: 120, h: 44 },
        { id: "D", x: 186, y: 56, w: 120, h: 44 },
        { id: "E", x: 186, y: 116, w: 120, h: 44 },
        { id: "F", x: 186, y: 176, w: 120, h: 44 },
      ];
    }
    return [
      { id: "Nome", x: 32, y: 58, w: 90, h: 36 },
      { id: "Valor 1", x: 170, y: 58, w: 122, h: 36 },
      { id: "CPF", x: 32, y: 116, w: 90, h: 36 },
      { id: "Valor 2", x: 170, y: 116, w: 122, h: 36 },
      { id: "Total", x: 32, y: 198, w: 90, h: 36 },
      { id: "Valor 3", x: 170, y: 198, w: 122, h: 36 },
    ];
  }, [layout]);

  const correctReading =
    layout === "uma-coluna"
      ? "A → B → C → D"
      : layout === "duas-colunas"
        ? "A → B → C → D → E → F"
        : "Nome → Valor 1 | CPF → Valor 2 | Total → Valor 3";

  const wrongReading =
    layout === "uma-coluna"
      ? "quase não muda"
      : layout === "duas-colunas"
        ? "A → D → B → E → C → F"
        : "Nome → CPF → Total → Valor 1 → Valor 2 → Valor 3";

  return (
    <InteractiveShell
      eyebrow="Layout"
      title="Explore como a ordem de leitura muda com o tipo de documento"
      tone="indigo"
      icon={<Rows3 size={18} aria-hidden="true" />}
      description="Alterne entre estruturas de página e veja como uma leitura ingênua da esquerda para a direita pode quebrar o documento."
    >
      <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="grid gap-4">
          <div className="grid gap-3">
            {[
              ["uma-coluna", "Uma coluna"],
              ["duas-colunas", "Duas colunas"],
              ["formulario", "Formulário"],
            ].map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setLayout(id as typeof layout)}
                className={`rounded-2xl border px-4 py-3 text-left transition ${
                  layout === id
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"
                }`}
              >
                <span className="block text-sm font-black">{label}</span>
              </button>
            ))}
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <MetricCard
              label="layout ativo"
              value={layout === "uma-coluna" ? "linear" : layout === "duas-colunas" ? "colunar" : "chave-valor"}
            />
            <MetricCard
              label="risco de erro sequencial"
              value={layout === "uma-coluna" ? "baixo" : "alto"}
            />
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-4">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">
              Leitura correta
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-700">{correctReading}</p>
            <p className="mt-4 text-xs font-black uppercase tracking-[0.16em] text-slate-500">
              Leitura ingênua que pode dar errado
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-700">{wrongReading}</p>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-5">
          <svg className="w-full" viewBox="0 0 340 320" role="img" aria-label="Blocos de documento em layout variado">
            <rect x="0" y="0" width="340" height="320" rx="24" fill="#eef2ff" />
            {blocks.map((block, index) => (
              <g key={block.id}>
                <rect
                  x={block.x}
                  y={block.y}
                  width={block.w}
                  height={block.h}
                  rx="12"
                  fill="#ffffff"
                  stroke="#4f46e5"
                  strokeWidth="2"
                />
                <text x={block.x + 14} y={block.y + 24} fill="#312e81" fontSize="13" fontWeight="800">
                  {index + 1}. {block.id}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </div>
    </InteractiveShell>
  );
}

export const interactions = {
  "ocr-preprocess-lab": ocrPreprocessLab,
  "reading-order-lab": ReadingOrderLab,
  "document-ai-scenarios": documentAiScenarios,
} satisfies LessonModule["interactions"];
