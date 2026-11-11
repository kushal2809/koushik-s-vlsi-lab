import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { PageHeader, Section } from "@/components/section";
import { computeSta, type StaInput } from "@/lib/sta";

export const Route = createFileRoute("/sta-calculator")({
  head: () => ({
    meta: [
      { title: "STA Engine — Setup & Hold Slack Calculator | Koushik's VLSI Space" },
      { name: "description", content: "Calculate setup and hold slack for a timing path from clock period, clock-to-Q, data path delay, setup/hold time, latency and uncertainty." },
      { property: "og:title", content: "STA Engine — Setup & Hold Slack Calculator" },
      { property: "og:description", content: "Interactive setup and hold slack calculator for a single flop-to-flop timing path." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: StaPage,
});

const FIELDS: { key: keyof StaInput; label: string; hint: string }[] = [
  { key: "period", label: "Clock Period (T)", hint: "e.g. 4 for 250 MHz" },
  { key: "tclkq", label: "Clock-to-Q (Tcq)", hint: "launch flop" },
  { key: "comb", label: "Data Path Delay (Tcomb)", hint: "combinational + wire" },
  { key: "setup", label: "Setup Time (Tsu)", hint: "capture flop" },
  { key: "hold", label: "Hold Time (Th)", hint: "capture flop" },
  { key: "launchLatency", label: "Launch Clock Latency", hint: "source + network" },
  { key: "captureLatency", label: "Capture Clock Latency", hint: "source + network" },
  { key: "uncertainty", label: "Clock Uncertainty (U)", hint: "jitter + margin" },
];

const DEFAULTS: Record<keyof StaInput, string> = {
  period: "4", tclkq: "0.2", comb: "3", setup: "0.1", hold: "0.05",
  launchLatency: "0", captureLatency: "0", uncertainty: "0.1",
};

const fmt = (n: number) => (Number.isFinite(n) ? n.toFixed(3) : "—");

function StaPage() {
  const [vals, setVals] = useState(DEFAULTS);
  const input = Object.fromEntries(
    Object.entries(vals).map(([k, v]) => [k, parseFloat(v) || 0]),
  ) as StaInput;
  const r = computeSta(input);

  const Result = ({ label, slack, req, formula }: { label: string; slack: number; req: number; formula: string }) => {
    const ok = slack >= 0;
    return (
      <div className="card-surface p-5">
        <div className="flex items-center justify-between">
          <p className="eyebrow">{label}</p>
          <span className={`rounded-md border px-2 py-0.5 font-mono text-xs ${ok ? "border-primary/40 text-primary" : "border-destructive/50 text-destructive"}`}>
            {ok ? "MET" : "VIOLATED"}
          </span>
        </div>
        <p className={`mt-3 font-mono text-3xl font-semibold ${ok ? "text-primary" : "text-destructive"}`}>{fmt(slack)}</p>
        <p className="mt-1 font-mono text-xs text-muted-foreground">slack</p>
        <dl className="mt-4 space-y-1 font-mono text-xs text-muted-foreground">
          <div className="flex justify-between"><dt>Data arrival</dt><dd className="text-foreground">{fmt(r.arrival)}</dd></div>
          <div className="flex justify-between"><dt>Data required</dt><dd className="text-foreground">{fmt(req)}</dd></div>
        </dl>
        <p className="mt-4 border-t border-border pt-3 font-mono text-[11px] leading-relaxed text-muted-foreground">{formula}</p>
      </div>
    );
  };

  return (
    <>
      <div className="mx-auto max-w-6xl px-5 pt-8">
        <Link to="/knowledge" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft className="h-4 w-4" /> VLSI Knowledge
        </Link>
      </div>
      <PageHeader
        eyebrow="Tool · Static Timing Analysis"
        title="STA Engine"
        intro="Enter the values of a single flop-to-flop timing path to calculate setup and hold slack. Use any consistent time unit (e.g. ns) for all fields."
      />
      <Section className="pt-0">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="card-surface p-5">
            <div className="mb-4 flex items-center justify-between">
              <p className="eyebrow">Path Inputs</p>
              <button onClick={() => setVals(DEFAULTS)} className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary">
                <RotateCcw className="h-3.5 w-3.5" /> Reset
              </button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {FIELDS.map((f) => (
                <label key={f.key} className="block">
                  <span className="text-sm font-medium">{f.label}</span>
                  <input
                    type="number"
                    step="any"
                    inputMode="decimal"
                    value={vals[f.key]}
                    onChange={(e) => setVals({ ...vals, [f.key]: e.target.value })}
                    className="mt-1.5 w-full rounded-md border border-border bg-background px-3 py-2 font-mono text-sm outline-none focus:border-primary"
                  />
                  <span className="mt-1 block font-mono text-[11px] text-muted-foreground">{f.hint}</span>
                </label>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap gap-4 border-t border-border pt-4 font-mono text-xs text-muted-foreground">
              <span>Clock skew (capture − launch): <span className="text-foreground">{fmt(r.skew)}</span></span>
              {r.maxFreqMHz && <span>Max freq (if ns): <span className="text-foreground">{r.maxFreqMHz.toFixed(1)} MHz</span></span>}
            </div>
          </div>
          <div className="grid gap-4">
            <Result label="Setup Check" slack={r.setupSlack} req={r.setupRequired}
              formula="Setup slack = (T + L_capture − Tsu − U) − (L_launch + Tcq + Tcomb)" />
            <Result label="Hold Check" slack={r.holdSlack} req={r.holdRequired}
              formula="Hold slack = (L_launch + Tcq + Tcomb) − (L_capture + Th + U)" />
          </div>
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          Positive slack → requirement satisfied. Negative slack → violation. This is a simplified single-path model for learning; signoff tools also account for OCV, CRPR, multiple corners and modes.
        </p>
      </Section>
    </>
  );
}
