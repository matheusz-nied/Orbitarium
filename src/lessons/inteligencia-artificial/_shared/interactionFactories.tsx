import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  InteractiveShell,
  MetricCard,
  type InteractionTone,
} from "../../../components/lesson/InteractionPrimitives";

type Metric = {
  label: string;
  value: string;
};

type Bar = {
  label: string;
  value: number;
  display: string;
};

type SliderControl<TState extends Record<string, number>> = {
  key: keyof TState;
  label: string;
  min: number;
  max: number;
  step: number;
  formatValue?: (value: number) => string;
};

type SliderComputation = {
  metrics: Metric[];
  bars?: Bar[];
  narrative: string;
  footer?: string;
};

type Scenario = {
  id: string;
  label: string;
  title: string;
  description: string;
  bullets: string[];
  metrics?: Metric[];
  bars?: Bar[];
};

export function createSliderPlayground<TState extends Record<string, number>>(config: {
  eyebrow: string;
  title: string;
  description: string;
  tone: InteractionTone;
  icon: ReactNode;
  initialState: TState;
  controls: SliderControl<TState>[];
  compute: (state: TState) => SliderComputation;
}) {
  return function SliderPlayground() {
    const [state, setState] = useState<TState>(config.initialState);
    const computed = useMemo(() => config.compute(state), [state]);

    return (
      <InteractiveShell
        eyebrow={config.eyebrow}
        title={config.title}
        description={config.description}
        tone={config.tone}
        icon={config.icon}
      >
        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="grid gap-4">
            {config.controls.map((control) => {
              const rawValue = state[control.key];
              return (
                <label
                  className="grid gap-2 rounded-3xl bg-white p-4 text-sm font-black text-slate-700"
                  key={String(control.key)}
                >
                  <span className="flex items-center justify-between">
                    {control.label}
                    <span className="font-mono text-slate-950">
                      {control.formatValue ? control.formatValue(rawValue) : rawValue}
                    </span>
                  </span>
                  <input
                    className="w-full accent-slate-950"
                    max={control.max}
                    min={control.min}
                    step={control.step}
                    type="range"
                    value={rawValue}
                    onChange={(event) =>
                      setState((current) => ({
                        ...current,
                        [control.key]: Number(event.target.value),
                      }))
                    }
                  />
                </label>
              );
            })}
            <div className="grid gap-3 sm:grid-cols-2">
              {computed.metrics.map((metric) => (
                <MetricCard key={metric.label} label={metric.label} value={metric.value} />
              ))}
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-4">
              <p className="text-sm leading-6 text-slate-700">{computed.narrative}</p>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-5">
            {computed.bars?.length ? (
              <div className="grid gap-3">
                {computed.bars.map((bar) => (
                  <div key={bar.label}>
                    <div className="flex items-center justify-between text-sm font-black text-slate-700">
                      <span>{bar.label}</span>
                      <span className="font-mono text-slate-500">{bar.display}</span>
                    </div>
                    <div className="mt-1 h-4 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-slate-900 transition-[width]"
                        style={{ width: `${Math.max(0, Math.min(1, bar.value)) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-3xl border border-dashed border-slate-200 p-6 text-sm leading-6 text-slate-600">
                Ajuste os controles para observar como as métricas mudam.
              </div>
            )}
            {computed.footer ? (
              <p className="mt-4 text-sm leading-6 text-slate-600">{computed.footer}</p>
            ) : null}
          </div>
        </div>
      </InteractiveShell>
    );
  };
}

export function createScenarioExplorer(config: {
  eyebrow: string;
  title: string;
  description: string;
  tone: InteractionTone;
  icon: ReactNode;
  scenarios: Scenario[];
}) {
  return function ScenarioExplorer() {
    const [selectedId, setSelectedId] = useState(config.scenarios[0]?.id ?? "");
    const selected =
      config.scenarios.find((scenario) => scenario.id === selectedId) ?? config.scenarios[0];

    return (
      <InteractiveShell
        eyebrow={config.eyebrow}
        title={config.title}
        description={config.description}
        tone={config.tone}
        icon={config.icon}
      >
        <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="grid gap-3">
            {config.scenarios.map((scenario) => (
              <button
                className={`rounded-2xl border px-4 py-3 text-left transition ${
                  scenario.id === selected.id
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"
                }`}
                key={scenario.id}
                type="button"
                onClick={() => setSelectedId(scenario.id)}
              >
                <span className="block text-sm font-black">{scenario.label}</span>
              </button>
            ))}
          </div>

          <div className="rounded-3xl bg-white p-5">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">
              Cenário ativo
            </p>
            <h4 className="mt-2 font-display text-3xl font-semibold tracking-tight text-slate-950">
              {selected.title}
            </h4>
            <p className="mt-3 text-sm leading-6 text-slate-600">{selected.description}</p>
            {selected.metrics?.length ? (
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {selected.metrics.map((metric) => (
                  <MetricCard key={metric.label} label={metric.label} value={metric.value} />
                ))}
              </div>
            ) : null}
            <div className="mt-4 grid gap-2">
              {selected.bullets.map((bullet) => (
                <div
                  className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-700"
                  key={bullet}
                >
                  {bullet}
                </div>
              ))}
            </div>
            {selected.bars?.length ? (
              <div className="mt-4 grid gap-3">
                {selected.bars.map((bar) => (
                  <div key={bar.label}>
                    <div className="flex items-center justify-between text-sm font-black text-slate-700">
                      <span>{bar.label}</span>
                      <span className="font-mono text-slate-500">{bar.display}</span>
                    </div>
                    <div className="mt-1 h-4 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-slate-900 transition-[width]"
                        style={{ width: `${Math.max(0, Math.min(1, bar.value)) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </InteractiveShell>
    );
  };
}
