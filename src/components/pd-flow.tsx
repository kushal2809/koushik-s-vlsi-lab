import { Link } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";

export const PD_FLOW = [
  {
    id: "rtl",
    label: "RTL",
    note: "Design intent in Verilog",
    concepts: "Clean hierarchy, clocks, resets",
    tools: "Verilog · Lint · CDC",
    practical: "Resolve lint and CDC issues before synthesis.",
  },
  {
    id: "synthesis",
    label: "Synthesis",
    note: "RTL mapped to gates",
    concepts: "Constraints, PPA, netlist quality",
    tools: "Design Compiler · report_qor",
    practical: "Review timing paths and unmapped logic early.",
  },
  {
    id: "floorplanning",
    label: "Floorplanning",
    note: "Die, core, macros, IOs",
    concepts: "Utilization, aspect ratio, halos",
    tools: "initialize_floorplan · set_keepout_margin",
    practical: "Leave routing channels around macro pins.",
  },
  {
    id: "power-planning",
    label: "Power Planning",
    note: "Rings, straps, rails",
    concepts: "IR drop, EM, via stacks",
    tools: "create_pg_mesh_pattern · compile_pg",
    practical: "Balance robust delivery with routing resources.",
  },
  {
    id: "placement",
    label: "Placement",
    note: "Standard cell legalization",
    concepts: "Timing, congestion, pin density",
    tools: "place_opt · report_congestion",
    practical: "Fix hotspots before they become route failures.",
  },
  {
    id: "cts",
    label: "CTS",
    note: "Clock tree build and balance",
    concepts: "Skew, latency, useful skew",
    tools: "clock_opt · report_clock_timing",
    practical: "Check hold timing after clocks become propagated.",
  },
  {
    id: "routing",
    label: "Routing",
    note: "Global, track, detail route",
    concepts: "DRC, crosstalk, antenna",
    tools: "route_auto · route_opt · check_routes",
    practical: "Repair violations without creating timing regressions.",
  },
  {
    id: "sta",
    label: "STA",
    note: "Setup and hold closure",
    concepts: "WNS, TNS, MCMM corners",
    tools: "report_timing · report_qor",
    practical: "Close every required mode and PVT corner.",
  },
] as const;

export function PDFlow() {
  return (
    <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {PD_FLOW.map((stage, i) => (
        <li key={stage.id} className="min-w-0">
          <details className="flow-card group h-full">
            <summary className="flex min-h-28 cursor-pointer list-none flex-col p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden">
              <span className="flex items-start justify-between gap-3">
                <span className="font-mono text-[0.65rem] tracking-widest text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <ChevronDown className="flow-chevron h-3.5 w-3.5 text-muted-foreground transition-transform" />
              </span>
              <span className="mt-2 font-display text-sm font-semibold">{stage.label}</span>
              <span className="mt-1 text-xs leading-relaxed text-muted-foreground">{stage.note}</span>
            </summary>
            <div className="border-t border-border px-4 pt-3 pb-4 text-xs leading-relaxed">
              <dl className="space-y-2.5">
                <div>
                  <dt className="font-mono text-[0.62rem] uppercase tracking-widest text-primary">Concepts</dt>
                  <dd className="mt-1 text-muted-foreground">{stage.concepts}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[0.62rem] uppercase tracking-widest text-primary">Tools</dt>
                  <dd className="mt-1 break-words text-muted-foreground">{stage.tools}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[0.62rem] uppercase tracking-widest text-primary">Practical note</dt>
                  <dd className="mt-1 text-muted-foreground">{stage.practical}</dd>
                </div>
              </dl>
              <Link
                to="/pd-journey"
                hash={stage.id}
                className="mt-3 inline-flex font-mono text-[0.65rem] uppercase tracking-widest text-primary hover:text-foreground"
              >
                Stage notes →
              </Link>
            </div>
          </details>
        </li>
      ))}
    </ol>
  );
}
