import { useMemo, useState } from "react";
import { ArrowRightLeft, Search, Shield } from "lucide-react";
import type { LessonModule } from "../../../types/content";
import { InteractiveShell } from "../../../components/lesson/InteractionPrimitives";
import {
  CalloutCard,
  MetricGrid,
  StepDots,
  TogglePills,
} from "../sharedPrimitives";

export const interactions = {
  "internet-request-journey": InternetRequestJourneyInteraction,
  "dns-resolution-demo": DnsResolutionDemoInteraction,
  "tcp-reliability-demo": TcpReliabilityDemoInteraction,
} satisfies LessonModule["interactions"];

function InternetRequestJourneyInteraction() {
  const steps = [
    {
      title: "DNS",
      body: "O cliente descobre qual endereço IP corresponde ao nome pedido.",
    },
    {
      title: "TCP",
      body: "Cliente e servidor estabelecem uma conversa confiável para trocar bytes em ordem.",
    },
    {
      title: "TLS",
      body: "Se a aplicação usa HTTPS, a proteção criptográfica é negociada sobre a conexão.",
    },
    {
      title: "HTTP",
      body: "A aplicação finalmente envia a requisição e recebe a resposta.",
    },
  ];
  const [stepIndex, setStepIndex] = useState(0);
  const active = steps[stepIndex];

  return (
    <InteractiveShell
      eyebrow="Jornada"
      title="Percorra o caminho de uma requisição"
      tone="indigo"
      icon={<ArrowRightLeft size={18} aria-hidden="true" />}
      description="Avance etapa por etapa para ver a ordem conceitual mais comum da web moderna."
    >
      <div className="grid gap-5 lg:grid-cols-[0.78fr_1.22fr]">
        <div className="grid gap-4">
          <div className="rounded-3xl border border-indigo-100 bg-white p-4">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-indigo-700">Etapa atual</p>
            <h4 className="mt-2 font-display text-3xl font-semibold tracking-tight text-slate-950">{active.title}</h4>
            <p className="mt-3 text-sm leading-6 text-slate-600">{active.body}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {steps.map((step, index) => (
              <button
                key={step.title}
                type="button"
                onClick={() => setStepIndex(index)}
                className={`rounded-2xl px-4 py-2 text-sm font-black transition ${
                  stepIndex === index
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-slate-700 ring-1 ring-slate-200 hover:ring-indigo-300"
                }`}
              >
                {step.title}
              </button>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-indigo-100 bg-white p-5">
          <StepDots activeIndex={stepIndex} total={steps.length} />
          <div className="mt-5 grid gap-3">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className={`rounded-2xl border px-4 py-3 ${
                  stepIndex === index
                    ? "border-indigo-300 bg-indigo-50"
                    : "border-slate-100 bg-slate-50"
                }`}
              >
                <p className="text-sm font-black text-slate-900">{index + 1}. {step.title}</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </InteractiveShell>
  );
}

function DnsResolutionDemoInteraction() {
  const [mode, setMode] = useState("cached");
  const steps = mode === "cached"
    ? ["Cache do navegador / SO", "IP encontrado rapidamente", "Conexão pode começar"]
    : ["Resolvedor recursivo", "Raiz / TLD", "Autoritativo", "IP devolvido ao cliente"];

  return (
    <InteractiveShell
      eyebrow="DNS"
      title="Compare resolução com e sem cache"
      tone="emerald"
      icon={<Search size={18} aria-hidden="true" />}
      description="A mesma pergunta de DNS pode ser respondida localmente ou exigir uma cadeia maior de consultas."
    >
      <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="grid gap-4">
          <TogglePills
            value={mode}
            onChange={setMode}
            options={[
              { value: "cached", label: "Com cache" },
              { value: "uncached", label: "Sem cache" },
            ]}
          />
          <MetricGrid
            metrics={[
              { label: "Etapas", value: `${steps.length}` },
              { label: "Resolvedor externo", value: mode === "cached" ? "Talvez nem precise" : "Necessário" },
              { label: "Leitura", value: mode === "cached" ? "mais rápido" : "mais trabalho" },
              { label: "Objetivo", value: "obter IP" },
            ]}
          />
        </div>
        <div className="grid gap-4">
          <div className="rounded-3xl border border-emerald-100 bg-white p-5">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700">Caminho</p>
            <div className="mt-4 grid gap-2">
              {steps.map((step, index) => (
                <div key={step} className="rounded-2xl bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700">
                  {index + 1}. {step}
                </div>
              ))}
            </div>
          </div>
          <CalloutCard
            title="Leitura"
            body={
              mode === "cached"
                ? "Cache economiza perguntas repetidas e evita parte do caminho da hierarquia DNS."
                : "Sem cache, o resolvedor pode precisar caminhar até a fonte autoritativa para obter a resposta."
            }
            tone="emerald"
          />
        </div>
      </div>
    </InteractiveShell>
  );
}

function TcpReliabilityDemoInteraction() {
  const [loss, setLoss] = useState("no");
  const packets = useMemo(
    () =>
      [
        { id: 1, status: "received" },
        { id: 2, status: loss === "no" ? "received" : "lost" },
        { id: 3, status: "received" },
      ],
    [loss],
  );

  return (
    <InteractiveShell
      eyebrow="TCP"
      title="Veja o que acontece quando um pacote se perde"
      tone="rose"
      icon={<Shield size={18} aria-hidden="true" />}
      description="O TCP tenta manter uma conversa confiável mesmo quando a rede subjacente não entrega tudo perfeitamente."
    >
      <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="grid gap-4">
          <TogglePills
            value={loss}
            onChange={setLoss}
            options={[
              { value: "no", label: "Sem perda" },
              { value: "yes", label: "Perda no meio" },
            ]}
          />
          <MetricGrid
            metrics={[
              { label: "Pacotes", value: `${packets.length}` },
              { label: "Perda", value: loss === "yes" ? "1 pacote" : "nenhuma" },
              { label: "Retransmissão", value: loss === "yes" ? "necessária" : "dispensável" },
              { label: "Objetivo", value: "ordem + confiabilidade" },
            ]}
          />
        </div>
        <div className="grid gap-4">
          <div className="rounded-3xl border border-rose-100 bg-white p-5">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-rose-700">Rastro simplificado</p>
            <div className="mt-4 grid gap-2">
              {packets.map((packet) => (
                <div key={packet.id} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 text-sm font-bold">
                  <span>Pacote {packet.id}</span>
                  <span className={packet.status === "lost" ? "text-rose-700" : "text-emerald-700"}>
                    {packet.status === "lost" ? "perdido" : "entregue"}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <CalloutCard
            title="Leitura"
            body={
              loss === "yes"
                ? "Como um pacote intermediário sumiu, o TCP precisa detectar a ausência de confirmação e retransmitir para recompor a conversa."
                : "Sem perda, os ACKs confirmam o fluxo e a aplicação recebe a sequência ordenada normalmente."
            }
            tone={loss === "yes" ? "rose" : "emerald"}
          />
        </div>
      </div>
    </InteractiveShell>
  );
}
