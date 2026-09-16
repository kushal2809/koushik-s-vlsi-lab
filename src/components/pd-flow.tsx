import { Link } from "@tanstack/react-router";

export const PD_FLOW = [
  { id: "rtl", label: "RTL", note: "Design intent in Verilog" },
  { id: "synthesis", label: "Synthesis", note: "RTL mapped to gates" },
  { id: "floorplanning", label: "Floorplanning", note: "Die, core, macros, IOs" },
  { id: "power-planning", label: "Power Planning", note: "Rings, straps, rails" },
  { id: "placement", label: "Placement", note: "Standard cell legalization" },
  { id: "cts", label: "CTS", note: "Clock tree build and balance" },
  { id: "routing", label: "Routing", note: "Global, track, detail route" },
  { id: "sta", label: "STA", note: "Setup and hold closure" },
] as const;

export function PDFlow() {
  return (
    <ol className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {PD_FLOW.map((stage, i) => (
        <li key={stage.id}>
          <Link
            to="/pd-journey"
            hash={stage.id}
            className="card-surface group flex h-full flex-col gap-1 p-4"
          >
            <span className="font-mono text-[0.65rem] tracking-widest text-primary">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="font-display text-sm font-semibold">{stage.label}</span>
            <span className="text-xs leading-relaxed text-muted-foreground">{stage.note}</span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
