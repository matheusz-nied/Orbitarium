import { useMemo, useState } from "react";
import { Compass, MessagesSquare, Search } from "lucide-react";
import type { LessonModule } from "../../../types/content";
import {
  InteractiveShell,
  MetricCard,
} from "../../../components/lesson/InteractionPrimitives";
import {
  createScenarioExplorer,
  createSliderPlayground,
} from "../_shared/interactionFactories";

const similarityLab = createSliderPlayground({
  eyebrow: "Contraste",
  title: "Ajuste similaridade e temperatura",
  description:
    "Veja como pequenas diferenças de alinhamento podem se amplificar ou se suavizar quando a temperatura muda.",
  tone: "indigo",
  icon: <Compass size={18} aria-hidden="true" />,
  initialState: {
    similaridadePositiva: 0.74,
    similaridadeNegativa: 0.32,
    temperatura: 0.08,
  },
  controls: [
    { key: "similaridadePositiva", label: "similaridade do par correto", min: 0.2, max: 1, step: 0.02, formatValue: (v) => v.toFixed(2) },
    { key: "similaridadeNegativa", label: "similaridade do par incorreto", min: 0, max: 0.9, step: 0.02, formatValue: (v) => v.toFixed(2) },
    { key: "temperatura", label: "temperatura", min: 0.02, max: 0.3, step: 0.01, formatValue: (v) => v.toFixed(2) },
  ],
  compute: ({ similaridadeNegativa, similaridadePositiva, temperatura }) => {
    const pos = Math.exp(similaridadePositiva / temperatura);
    const neg = Math.exp(similaridadeNegativa / temperatura);
    const prob = pos / (pos + neg);
    const margin = Math.max(0, similaridadePositiva - similaridadeNegativa);

    return {
      metrics: [
        { label: "prob. do par correto", value: `${(prob * 100).toFixed(0)}%` },
        { label: "margem semântica", value: margin.toFixed(2) },
        { label: "competição", value: temperatura < 0.08 ? "afiada" : temperatura > 0.18 ? "suave" : "moderada" },
        { label: "risco de confusão", value: `${Math.round((1 - prob) * 100)}%` },
      ],
      bars: [
        { label: "Par correto", value: Math.min(1, similaridadePositiva), display: similaridadePositiva.toFixed(2) },
        { label: "Par incorreto", value: Math.min(1, similaridadeNegativa), display: similaridadeNegativa.toFixed(2) },
        { label: "Separação efetiva", value: prob, display: `${(prob * 100).toFixed(0)}%` },
      ],
      narrative:
        margin < 0.12
          ? "Os pares estão próximos demais no espaço. O modelo ainda confunde positivo e negativo com facilidade."
          : temperatura < 0.06
            ? "Temperatura muito baixa torna a competição agressiva. Isso pode separar bem, mas também endurecer demais a geometria do espaço."
            : "Há uma separação saudável entre positivo e negativo. O treinamento contrastivo consegue empurrar o embedding na direção certa.",
      footer:
        "A temperatura não cria semântica do nada; ela calibra quão forte o modelo transforma diferença de similaridade em pressão de aprendizado.",
    };
  },
});

const zeroShotScenarios = createScenarioExplorer({
  eyebrow: "Uso prático",
  title: "Compare tarefas em que CLIP ajuda mais ou menos",
  description:
    "CLIP é muito forte em semântica global, mas sua vantagem varia conforme o nível de detalhe exigido pela tarefa.",
  tone: "teal",
  icon: <Search size={18} aria-hidden="true" />,
  scenarios: [
    {
      id: "classificacao-global",
      label: "Semântica global",
      title: "Reconhecer cena ou objeto principal",
      description:
        "Aqui CLIP costuma funcionar muito bem, pois a decisão depende do conceito geral capturado pela imagem.",
      bullets: [
        "Prompting zero-shot costuma ser competitivo.",
        "Semântica global domina a decisão.",
        "A flexibilidade de linguagem traz grande valor.",
      ],
      metrics: [
        { label: "força típica", value: "alta" },
        { label: "necessidade de detalhe fino", value: "baixa" },
      ],
      bars: [
        { label: "Vantagem do CLIP", value: 0.9, display: "90%" },
        { label: "Necessidade de modelo adicional", value: 0.28, display: "28%" },
      ],
    },
    {
      id: "retrieval",
      label: "Retrieval",
      title: "Buscar imagens por descrição textual",
      description:
        "Esse é um dos terrenos mais naturais para CLIP, graças ao embedding space compartilhado.",
      bullets: [
        "Texto e imagem são comparáveis diretamente.",
        "Busca semântica se torna simples e poderosa.",
        "Prompt bom melhora recuperação.",
      ],
      metrics: [
        { label: "força típica", value: "muito alta" },
        { label: "necessidade de detalhe fino", value: "média" },
      ],
      bars: [
        { label: "Vantagem do CLIP", value: 0.94, display: "94%" },
        { label: "Necessidade de modelo adicional", value: 0.18, display: "18%" },
      ],
    },
    {
      id: "detalhe-fino",
      label: "Detalhe fino",
      title: "Contagem, OCR e relações espaciais complexas",
      description:
        "Nesses casos, similaridade semântica global muitas vezes não basta.",
      bullets: [
        "A tarefa exige percepção mais granular.",
        "Semântica geral ajuda, mas não resolve tudo.",
        "Modelos especializados ou componentes extras costumam ser necessários.",
      ],
      metrics: [
        { label: "força típica", value: "moderada/baixa" },
        { label: "necessidade de detalhe fino", value: "alta" },
      ],
      bars: [
        { label: "Vantagem do CLIP", value: 0.36, display: "36%" },
        { label: "Necessidade de modelo adicional", value: 0.86, display: "86%" },
      ],
    },
  ],
});

function PromptTemplateLab() {
  const [template, setTemplate] = useState<"foto" | "desenho" | "objeto">("foto");

  const prompts = useMemo(() => {
    if (template === "foto") {
      return [
        { label: "uma foto de um cachorro", score: 0.83 },
        { label: "uma foto de um lobo", score: 0.61 },
        { label: "uma foto de um gato", score: 0.34 },
      ];
    }
    if (template === "desenho") {
      return [
        { label: "um desenho de um cachorro", score: 0.69 },
        { label: "um desenho de um lobo", score: 0.56 },
        { label: "um desenho de um gato", score: 0.31 },
      ];
    }
    return [
      { label: "um objeto do tipo cachorro", score: 0.74 },
      { label: "um objeto do tipo lobo", score: 0.6 },
      { label: "um objeto do tipo gato", score: 0.33 },
    ];
  }, [template]);

  const winner = prompts[0];

  return (
    <InteractiveShell
      eyebrow="Zero-shot"
      title="Veja como o template do prompt muda a decisão"
      tone="violet"
      icon={<MessagesSquare size={18} aria-hidden="true" />}
      description="O mesmo conceito visual pode se alinhar de forma ligeiramente diferente dependendo da formulação textual usada como classe."
    >
      <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="grid gap-4">
          <div className="grid gap-3">
            {[
              ["foto", "Template fotográfico"],
              ["desenho", "Template ilustrado"],
              ["objeto", "Template abstrato"],
            ].map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setTemplate(id as typeof template)}
                className={`rounded-2xl border px-4 py-3 text-left transition ${
                  template === id
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"
                }`}
              >
                <span className="block text-sm font-black">{label}</span>
              </button>
            ))}
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <MetricCard label="classe vencedora" value="cachorro" />
            <MetricCard label="score topo" value={`${Math.round(winner.score * 100)}%`} />
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-4">
            <p className="text-sm leading-6 text-slate-700">
              O ponto não é que um template esteja sempre certo, e sim que a linguagem altera o embedding textual. Em zero-shot, isso muda a fronteira de decisão e pode influenciar bastante o resultado.
            </p>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-5">
          <div className="grid gap-3">
            {prompts.map((prompt) => (
              <div key={prompt.label}>
                <div className="flex items-center justify-between text-sm font-black text-slate-700">
                  <span>{prompt.label}</span>
                  <span className="font-mono text-slate-500">{Math.round(prompt.score * 100)}%</span>
                </div>
                <div className="mt-1 h-4 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-violet-600 transition-[width]" style={{ width: `${prompt.score * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </InteractiveShell>
  );
}

export const interactions = {
  "similarity-lab": similarityLab,
  "prompt-template-lab": PromptTemplateLab,
  "zero-shot-scenarios": zeroShotScenarios,
} satisfies LessonModule["interactions"];
