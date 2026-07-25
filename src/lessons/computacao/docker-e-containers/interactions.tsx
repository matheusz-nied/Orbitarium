import { useMemo, useState } from "react";
import { HardDrive, Layers, Split } from "lucide-react";
import type { LessonModule } from "../../../types/content";
import { InteractiveShell } from "../../../components/lesson/InteractionPrimitives";
import {
  CalloutCard,
  MetricGrid,
  TogglePills,
} from "../sharedPrimitives";

export const interactions = {
  "image-layer-builder": ImageLayerBuilderInteraction,
  "container-vs-vm-comparison": ContainerVsVmComparisonInteraction,
  "volume-network-lab": VolumeNetworkLabInteraction,
} satisfies LessonModule["interactions"];

function ImageLayerBuilderInteraction() {
  const [changePoint, setChangePoint] = useState("app");
  const layers = [
    { key: "base", label: "FROM base image" },
    { key: "deps", label: "RUN instalar dependências" },
    { key: "app", label: "COPY código da aplicação" },
    { key: "cmd", label: "CMD iniciar serviço" },
  ];

  const reused = useMemo(() => {
    const index = layers.findIndex((layer) => layer.key === changePoint);
    return layers.map((layer, layerIndex) => ({ ...layer, reused: layerIndex < index }));
  }, [changePoint]);

  return (
    <InteractiveShell
      eyebrow="Build"
      title="Quebra de cache por camada"
      tone="violet"
      icon={<Layers size={18} aria-hidden="true" />}
      description="Escolha em qual ponto o Dockerfile mudou e veja quantas camadas podem ser reaproveitadas."
    >
      <div className="grid gap-5 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="grid gap-4">
          <TogglePills
            value={changePoint}
            onChange={setChangePoint}
            options={layers.map((layer) => ({ value: layer.key, label: layer.label }))}
          />
          <MetricGrid
            metrics={[
              { label: "Camadas reaproveitadas", value: `${reused.filter((layer) => layer.reused).length}` },
              { label: "Camadas refeitas", value: `${reused.filter((layer) => !layer.reused).length}` },
              { label: "Mudança em", value: changePoint },
              { label: "Ideia", value: "ordem afeta cache" },
            ]}
          />
        </div>
        <div className="grid gap-3">
          {reused.map((layer) => (
            <div
              key={layer.key}
              className={`rounded-2xl border px-4 py-3 text-sm font-bold ${
                layer.reused
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                  : "border-violet-200 bg-violet-50 text-violet-700"
              }`}
            >
              {layer.label} — {layer.reused ? "reaproveitada" : "reconstruída"}
            </div>
          ))}
          <CalloutCard
            title="Leitura"
            body="Mudanças tardias no Dockerfile tendem a invalidar menos cache. Mudanças cedo quebram o reaproveitamento de quase tudo que vem depois."
            tone="violet"
          />
        </div>
      </div>
    </InteractiveShell>
  );
}

function ContainerVsVmComparisonInteraction() {
  const [topic, setTopic] = useState("kernel");

  const content = {
    kernel: {
      container: "Compartilha o kernel do host.",
      vm: "Carrega um sistema convidado próprio sobre um hipervisor.",
    },
    start: {
      container: "Tende a iniciar como processo isolado rapidamente.",
      vm: "Precisa subir uma máquina completa com boot do convidado.",
    },
    isolation: {
      container: "Isolamento no nível do sistema operacional.",
      vm: "Isolamento no nível de máquina virtual completa.",
    },
    packaging: {
      container: "Foco forte em empacotar app + dependências.",
      vm: "Foco maior em virtualizar um ambiente de máquina inteiro.",
    },
  } as const;

  const selected = content[topic as keyof typeof content];

  return (
    <InteractiveShell
      eyebrow="Comparação"
      title="Container e VM pelo critério certo"
      tone="indigo"
      icon={<Split size={18} aria-hidden="true" />}
      description="Escolha um critério de comparação e veja como a diferença aparece por camada, e não por slogans simplistas."
    >
      <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="grid gap-4">
          <TogglePills
            value={topic}
            onChange={setTopic}
            options={[
              { value: "kernel", label: "Kernel" },
              { value: "start", label: "Inicialização" },
              { value: "isolation", label: "Isolamento" },
              { value: "packaging", label: "Empacotamento" },
            ]}
          />
          <CalloutCard
            title="Pergunta certa"
            body="Em vez de perguntar 'qual é melhor?', pergunte em qual camada a virtualização acontece e que tipo de compromisso operacional ela traz."
            tone="indigo"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl border border-indigo-100 bg-white p-5">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-indigo-700">Container</p>
            <p className="mt-3 text-sm leading-6 text-slate-700">{selected.container}</p>
          </div>
          <div className="rounded-3xl border border-indigo-100 bg-white p-5">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-indigo-700">Máquina virtual</p>
            <p className="mt-3 text-sm leading-6 text-slate-700">{selected.vm}</p>
          </div>
        </div>
      </div>
    </InteractiveShell>
  );
}

function VolumeNetworkLabInteraction() {
  const [storage, setStorage] = useState("ephemeral");
  const [port, setPort] = useState("closed");

  const dataSurvives = storage === "volume";
  const externallyReachable = port === "mapped";

  return (
    <InteractiveShell
      eyebrow="Execução"
      title="Volume e porta mudam o comportamento prático"
      tone="amber"
      icon={<HardDrive size={18} aria-hidden="true" />}
      description="Alterne persistência e exposição de porta para ver por que container saudável não significa serviço acessível nem dados preservados."
    >
      <div className="grid gap-5 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="grid gap-4">
          <div className="rounded-3xl border border-amber-100 bg-white p-4">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-amber-700">Armazenamento</p>
            <TogglePills
              value={storage}
              onChange={setStorage}
              options={[
                { value: "ephemeral", label: "Camada efêmera" },
                { value: "volume", label: "Com volume" },
              ]}
            />
          </div>
          <div className="rounded-3xl border border-amber-100 bg-white p-4">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-amber-700">Porta</p>
            <TogglePills
              value={port}
              onChange={setPort}
              options={[
                { value: "closed", label: "Sem mapeamento" },
                { value: "mapped", label: "Porta mapeada" },
              ]}
            />
          </div>
          <MetricGrid
            metrics={[
              { label: "Dados sobrevivem?", value: dataSurvives ? "Sim" : "Não garantido" },
              { label: "Acesso externo?", value: externallyReachable ? "Sim" : "Não" },
              { label: "Armazenamento", value: storage === "volume" ? "persistente" : "efêmero" },
              { label: "Rede", value: port === "mapped" ? "exposta" : "interna" },
            ]}
          />
        </div>
        <div className="grid gap-4">
          <CalloutCard
            title="Persistência"
            body={
              dataSurvives
                ? "Com volume, a aplicação pode ser recriada sem perder automaticamente o estado armazenado fora da camada efêmera."
                : "Sem volume, recomeçar ou recriar o container pode descartar o estado local gravado na camada temporária."
            }
            tone={dataSurvives ? "emerald" : "amber"}
          />
          <CalloutCard
            title="Conectividade"
            body={
              externallyReachable
                ? "Com mapeamento de porta, o serviço interno ganha caminho explícito para ser alcançado a partir do host ou de fora."
                : "Sem mapeamento, o processo pode estar saudável dentro do container e ainda assim permanecer invisível para clientes externos."
            }
            tone={externallyReachable ? "emerald" : "amber"}
          />
        </div>
      </div>
    </InteractiveShell>
  );
}
