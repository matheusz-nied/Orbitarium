import { useMemo, useState } from "react";
import { Eye, Layers3, Radar } from "lucide-react";
import type { LessonModule } from "../../../types/content";
import {
  InteractiveShell,
  MetricCard,
} from "../../../components/lesson/InteractionPrimitives";
import {
  createScenarioExplorer,
  createSliderPlayground,
} from "../_shared/interactionFactories";

const modalityBalanceLab = createSliderPlayground({
  eyebrow: "Alinhamento",
  title: "Distribua o peso entre texto, imagem e áudio",
  description:
    "Quando uma modalidade domina demais, o sistema pode parecer multimodal sem realmente integrar os sinais.",
  tone: "teal",
  icon: <Radar size={18} aria-hidden="true" />,
  initialState: {
    texto: 0.45,
    imagem: 0.4,
    audio: 0.15,
  },
  controls: [
    { key: "texto", label: "peso do texto", min: 0, max: 1, step: 0.05, formatValue: (v) => v.toFixed(2) },
    { key: "imagem", label: "peso da imagem", min: 0, max: 1, step: 0.05, formatValue: (v) => v.toFixed(2) },
    { key: "audio", label: "peso do áudio", min: 0, max: 1, step: 0.05, formatValue: (v) => v.toFixed(2) },
  ],
  compute: ({ texto, imagem, audio }) => {
    const total = Math.max(0.01, texto + imagem + audio);
    const t = texto / total;
    const i = imagem / total;
    const a = audio / total;
    const dominance = Math.max(t, i, a);
    const balance = 1 - (dominance - 1 / 3) / (2 / 3);
    const grounding = Math.min(1, i * 0.55 + a * 0.25 + t * 0.2);

    return {
      metrics: [
        { label: "equilíbrio modal", value: `${Math.max(0, Math.round(balance * 100))}%` },
        { label: "grounding estimado", value: `${Math.round(grounding * 100)}%` },
        { label: "modalidade dominante", value: dominance === t ? "texto" : dominance === i ? "imagem" : "áudio" },
        { label: "normalização total", value: `${(t + i + a).toFixed(2)}` },
      ],
      bars: [
        { label: "Texto", value: t, display: `${Math.round(t * 100)}%` },
        { label: "Imagem", value: i, display: `${Math.round(i * 100)}%` },
        { label: "Áudio", value: a, display: `${Math.round(a * 100)}%` },
      ],
      narrative:
        dominance > 0.68
          ? "Uma modalidade está governando a decisão. Isso pode ser útil em algumas tarefas, mas enfraquece a promessa de integração multimodal genuína."
          : "Os sinais estão mais equilibrados. Isso não garante entendimento profundo, mas torna mais plausível que o sistema esteja combinando evidências de fato.",
      footer:
        "Multimodalidade útil exige ponderação contextual: às vezes uma modalidade deve liderar, mas não ignorar as outras.",
    };
  },
});

const fusionStrategyScenarios = createScenarioExplorer({
  eyebrow: "Arquitetura",
  title: "Compare estratégias de fusão multimodal",
  description:
    "O melhor momento de combinar modalidades depende da tarefa, dos dados e do nível de grounding desejado.",
  tone: "indigo",
  icon: <Layers3 size={18} aria-hidden="true" />,
  scenarios: [
    {
      id: "early",
      label: "Early fusion",
      title: "Misturar cedo para aprender interações profundas",
      description:
        "Pode capturar sinergias fortes, mas também mistura sinais ainda pouco maduros.",
      bullets: [
        "Boa para tarefas com acoplamento fino entre modalidades.",
        "Mais sensível a ruído e desalinhamento de entrada.",
        "Pode exigir muito dado pareado de qualidade.",
      ],
      metrics: [
        { label: "interação precoce", value: "alta" },
        { label: "risco com ruído", value: "alto" },
      ],
      bars: [
        { label: "Integração profunda", value: 0.86, display: "86%" },
        { label: "Robustez a sinal ruim", value: 0.36, display: "36%" },
      ],
    },
    {
      id: "late",
      label: "Late fusion",
      title: "Especialistas separados que convergem mais tarde",
      description:
        "Preserva autonomia de cada encoder, mas pode limitar interações finas entre sinais.",
      bullets: [
        "Mais robusta quando cada modalidade já é forte sozinha.",
        "Boa para agregação de evidência sem acoplamento detalhado.",
        "Menos rica para grounding muito local.",
      ],
      metrics: [
        { label: "interação precoce", value: "baixa" },
        { label: "robustez", value: "alta" },
      ],
      bars: [
        { label: "Integração profunda", value: 0.42, display: "42%" },
        { label: "Robustez a sinal ruim", value: 0.84, display: "84%" },
      ],
    },
    {
      id: "cross",
      label: "Cross-attention",
      title: "Consultar outra modalidade só quando ela é relevante",
      description:
        "Estratégia seletiva e poderosa, muito popular em visão-linguagem moderna.",
      bullets: [
        "Favorece grounding e consulta contextual.",
        "Mantém especialização modal e cria integração controlada.",
        "Exige desenho cuidadoso de como a atenção cruza modalidades.",
      ],
      metrics: [
        { label: "interação precoce", value: "seletiva" },
        { label: "grounding", value: "alto" },
      ],
      bars: [
        { label: "Integração profunda", value: 0.78, display: "78%" },
        { label: "Robustez a sinal ruim", value: 0.72, display: "72%" },
      ],
    },
  ],
});

function GroundingLab() {
  const [tarefa, setTarefa] = useState<"caption" | "vqa" | "alarme">("vqa");
  const [imagemConfiavel, setImagemConfiavel] = useState(true);
  const [textoConfiavel, setTextoConfiavel] = useState(true);
  const [audioConfiavel, setAudioConfiavel] = useState(false);

  const diagnosis = useMemo(() => {
    if (tarefa === "caption") {
      return imagemConfiavel
        ? "Para descrever a cena, a imagem precisa liderar, com linguagem servindo como canal de saída."
        : "Sem visão confiável, o captioning tende a virar chute apoiado em priors linguísticos.";
    }
    if (tarefa === "vqa") {
      return imagemConfiavel && textoConfiavel
        ? "VQA exige texto para formular a pergunta e imagem para fundamentar a resposta."
        : "Se texto ou imagem falham, o sistema perde ou a pergunta ou a evidência visual.";
    }
    return audioConfiavel
      ? "Em um alarme multimodal, áudio pode carregar o evento principal enquanto imagem dá contexto."
      : "Sem áudio confiável, o sistema pode perder o principal gatilho temporal do evento.";
  }, [audioConfiavel, imagemConfiavel, tarefa, textoConfiavel]);

  return (
    <InteractiveShell
      eyebrow="Grounding"
      title="Veja qual modalidade precisa liderar em cada tarefa"
      tone="emerald"
      icon={<Eye size={18} aria-hidden="true" />}
      description="Nem toda tarefa usa as modalidades com o mesmo peso. O papel de cada sinal depende do objetivo operacional."
    >
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-4">
          <div className="grid gap-3">
            {[
              ["caption", "Descrever imagem"],
              ["vqa", "Responder pergunta sobre imagem"],
              ["alarme", "Interpretar evento audiovisual"],
            ].map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setTarefa(id as typeof tarefa)}
                className={`rounded-2xl border px-4 py-3 text-left transition ${
                  tarefa === id
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"
                }`}
              >
                <span className="block text-sm font-black">{label}</span>
              </button>
            ))}
          </div>
          {[
            {
              label: "imagem confiável",
              value: imagemConfiavel,
              setter: setImagemConfiavel,
            },
            {
              label: "texto confiável",
              value: textoConfiavel,
              setter: setTextoConfiavel,
            },
            {
              label: "áudio confiável",
              value: audioConfiavel,
              setter: setAudioConfiavel,
            },
          ].map(({ label, value, setter }) => (
            <button
              key={label}
              type="button"
              onClick={() => setter(!value)}
              className={`rounded-2xl border px-4 py-3 text-left text-sm font-black transition ${
                value
                  ? "border-emerald-300 bg-emerald-50 text-emerald-800"
                  : "border-slate-200 bg-white text-slate-600"
              }`}
            >
              {label}
            </button>
          ))}
          <div className="grid gap-3 sm:grid-cols-2">
            <MetricCard label="tarefa" value={tarefa === "caption" ? "captioning" : tarefa === "vqa" ? "VQA" : "evento"} />
            <MetricCard label="grounding provável" value={imagemConfiavel || audioConfiavel ? "presente" : "frágil"} />
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-4">
            <p className="text-sm leading-6 text-slate-700">{diagnosis}</p>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-5">
          <div className="grid gap-3">
            {[
              { label: "texto", active: textoConfiavel, color: "bg-indigo-500" },
              { label: "imagem", active: imagemConfiavel, color: "bg-emerald-500" },
              { label: "áudio", active: audioConfiavel, color: "bg-amber-500" },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between text-sm font-black text-slate-700">
                  <span>{item.label}</span>
                  <span>{item.active ? "ativo" : "frágil"}</span>
                </div>
                <div className="mt-1 h-4 overflow-hidden rounded-full bg-slate-100">
                  <div className={`h-full rounded-full ${item.color}`} style={{ width: item.active ? "88%" : "24%" }} />
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            A lição central é contextual: multimodalidade boa não distribui peso de forma fixa; ela aprende qual canal deve liderar em cada tarefa e em cada exemplo.
          </p>
        </div>
      </div>
    </InteractiveShell>
  );
}

export const interactions = {
  "modality-balance-lab": modalityBalanceLab,
  "fusion-strategy-scenarios": fusionStrategyScenarios,
  "grounding-lab": GroundingLab,
} satisfies LessonModule["interactions"];
