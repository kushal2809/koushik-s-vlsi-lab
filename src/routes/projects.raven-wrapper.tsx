import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ChevronDown, Download, ImageIcon } from "lucide-react";
import { PageHeader, Section, SectionTitle, Tag } from "@/components/section";
import floorplanAsset from "@/assets/raven-floorplan.jpeg.asset.json";

export const Route = createFileRoute("/projects/raven-wrapper")({
  head: () => ({
    meta: [
      { title: "RAVEN WRAPPER — 45nm Physical Design Case Study" },
      {
        name: "description",
        content:
          "Physical Design implementation of RAVEN WRAPPER in Synopsys IC Compiler II: 45nm, ~21K instances, 10 metal layers, 250 MHz, 3 clocks.",
      },
      { property: "og:title", content: "RAVEN WRAPPER — 45nm Physical Design Case Study" },
      {
        property: "og:description",
        content:
          "Floorplanning, power planning, placement, CTS, routing and STA work on a 45nm block in ICC2.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RavenWrapper,
});

const BADGES = ["45nm", "ICC2", "~21K Instances", "10 Metal Layers", "250 MHz", "3 Clocks"];

const ROLE = [
  "Floorplanning",
  "IO port placement",
  "Power planning",
  "Placement",
  "CTS reviews",
  "Routing",
  "DRC checks",
  "Timing analysis / reviews",
];

const FLOW = [
  {
    id: "flow-floorplanning",
    label: "Floorplanning",
    what: "Define die and core area, place IO ports and macros, and set utilization targets.",
    observations: "Add project-specific floorplan observations here.",
  },
  {
    id: "flow-power-planning",
    label: "Power Planning",
    what: "Build the VDD/VSS rings, straps and mesh, then connect standard-cell rails.",
    observations: "Add project-specific power-plan observations here.",
  },
  {
    id: "flow-placement",
    label: "Placement",
    what: "Place and legalize standard cells with timing and congestion awareness.",
    observations: "Add project-specific placement observations here.",
  },
  {
    id: "flow-cts",
    label: "CTS",
    what: "Build and balance the clock tree, then re-check timing with propagated clocks.",
    observations: "Add project-specific CTS observations here.",
  },
  {
    id: "flow-routing",
    label: "Routing",
    what: "Global, track and detail route, then repair DRC and antenna violations.",
    observations: "Add project-specific routing observations here.",
  },
  {
    id: "flow-sta",
    label: "STA",
    what: "Check setup and hold across the required modes and corners.",
    observations: "Add project-specific timing observations here.",
  },
] as const;

const GALLERY = [
  "Floorplan",
  "Power Planning",
  "Placement",
  "CTS",
  "Routing",
  "STA",
  "DRC",
];

const LEARNED = [
  "Understanding the complete Physical Design flow",
  "Floorplan and IO placement considerations",
  "Power-grid planning",
  "Placement density and congestion",
  "Clock-tree considerations",
  "Routing and DRC analysis",
  "Timing analysis and optimization",
];

const SUMMARY = [
  { label: "Technology", value: "45nm" },
  { label: "Tool", value: "Synopsys IC Compiler II (ICC2)" },
  { label: "Instances", value: "~21K" },
  { label: "Metal Layers", value: "10" },
  { label: "Target Frequency", value: "250 MHz" },
  { label: "Clocks", value: "3" },
];

function Placeholder({ label }: { label: string }) {
  return (
    <div className="flex min-h-36 flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-surface/40 p-6 text-center transition-colors hover:border-primary/40">
      <ImageIcon className="h-5 w-5 text-muted-foreground" />
      <span className="font-mono text-[0.68rem] uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

function StageSection({
  num,
  title,
  points,
  placeholder,
  children,
}: {
  num: string;
  title: string;
  points: string[];
  placeholder: string;
  children?: React.ReactNode;
}) {
  return (
    <Section id={title.toLowerCase().replace(/[^a-z]+/g, "-")}>
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-xs tracking-widest text-primary">{num}</span>
        <h2 className="font-display text-2xl font-semibold">{title}</h2>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="card-surface p-6">
          <ul className="space-y-2.5 text-sm text-muted-foreground">
            {points.map((p) => (
              <li key={p} className="flex gap-2">
                <span className="text-primary">&rsaquo;</span>
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div>{children ?? <Placeholder label={placeholder} />}</div>
      </div>
    </Section>
  );
}

function RavenWrapper() {
  return (
    <>
      <div className="mx-auto max-w-6xl px-5 pt-10">
        <Link
          to="/projects"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> All projects
        </Link>
      </div>

      <PageHeader
        eyebrow="Physical Design Implementation"
        title="RAVEN WRAPPER"
        intro="RAVEN WRAPPER is a 45nm Physical Design implementation project carried out using Synopsys IC Compiler II (ICC2), covering major stages of the back-end design flow."
      />

      <div className="mx-auto max-w-6xl px-5">
        <div className="flex flex-wrap gap-2">
          {BADGES.map((b) => (
            <Tag key={b}>{b}</Tag>
          ))}
        </div>
      </div>

      <Section id="my-role">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-xs tracking-widest text-primary">01</span>
          <h2 className="font-display text-2xl font-semibold">My Role</h2>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {ROLE.map((r) => (
            <div key={r} className="card-surface p-4 text-sm">
              {r}
            </div>
          ))}
        </div>
        <p className="mt-4 font-mono text-xs text-muted-foreground">
          Training / academic project work — no tapeout or silicon validation.
        </p>
      </Section>

      <Section id="pd-flow">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-xs tracking-widest text-primary">02</span>
          <h2 className="font-display text-2xl font-semibold">Physical Design Flow</h2>
        </div>
        <ol className="mt-6 space-y-3">
          {FLOW.map((s, i) => (
            <li key={s.id} id={s.id}>
              <details className="flow-card">
                <summary className="flex cursor-pointer list-none items-center gap-3 p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden">
                  <span className="font-mono text-[0.65rem] tracking-widest text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-sm font-semibold">{s.label}</span>
                  <ChevronDown className="flow-chevron ml-auto h-3.5 w-3.5 text-muted-foreground transition-transform" />
                </summary>
                <div className="border-t border-border px-4 pt-3 pb-4 text-xs leading-relaxed">
                  <p className="text-muted-foreground">{s.what}</p>
                  <p className="mt-3 font-mono text-[0.62rem] uppercase tracking-widest text-primary">
                    Project observations
                  </p>
                  <p className="mt-1 text-muted-foreground">{s.observations}</p>
                </div>
              </details>
            </li>
          ))}
        </ol>
      </Section>

      <StageSection
        num="03"
        title="Floorplanning"
        points={[
          "Floorplan",
          "Core / die information",
          "IO placement",
          "Macro placement",
          "Utilization",
          "Key observations",
        ]}
        placeholder="Add Floorplan Screenshot"
      >
        <figure className="card-surface overflow-hidden p-2">
          <img
            src={floorplanAsset.url}
            alt="RAVEN WRAPPER floorplan view showing IO pads, core area and an SRAM macro"
            loading="lazy"
            className="w-full rounded-md"
          />
          <figcaption className="px-2 py-2 font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground">
            Floorplan view — IO pads, core area, SRAM macro
          </figcaption>
        </figure>
      </StageSection>

      <StageSection
        num="04"
        title="Power Planning"
        points={[
          "VDD / VSS",
          "Power rings",
          "Power straps / mesh",
          "PG connectivity",
          "IR-drop considerations",
        ]}
        placeholder="Add Power Planning / PG Screenshot"
      />

      <StageSection
        num="05"
        title="Placement"
        points={[
          "Standard-cell placement",
          "Cell density",
          "GCell / congestion analysis",
          "Placement optimization",
          "Placement observations",
        ]}
        placeholder="Add Placement Screenshot"
      />

      <StageSection
        num="06"
        title="CTS"
        points={[
          "Clock tree synthesis",
          "Clock skew",
          "Clock latency",
          "Clock optimization",
          "Timing observations",
        ]}
        placeholder="Add CTS Screenshot"
      />

      <StageSection
        num="07"
        title="Routing"
        points={[
          "Global routing",
          "Detailed routing",
          "Routing congestion",
          "DRC checks",
          "Routing observations",
        ]}
        placeholder="Add Routing / DRC Screenshot"
      />

      <Section id="timing-sta">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-xs tracking-widest text-primary">08</span>
          <h2 className="font-display text-2xl font-semibold">Timing / STA</h2>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <div className="card-surface p-5">
            <p className="eyebrow">Target Frequency</p>
            <p className="mt-2 font-display text-lg">250 MHz</p>
          </div>
          <div className="card-surface p-5">
            <p className="eyebrow">Number of clocks</p>
            <p className="mt-2 font-display text-lg">3</p>
          </div>
        </div>
        <p className="mt-6 eyebrow">Results — editable placeholders</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {["WNS", "TNS", "Setup", "Hold"].map((k) => (
            <div
              key={k}
              className="rounded-lg border border-dashed border-border bg-surface/40 p-5"
            >
              <p className="font-mono text-[0.65rem] uppercase tracking-widest text-primary">{k}</p>
              <p className="mt-2 text-sm text-muted-foreground">Add actual value</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="gallery">
        <SectionTitle eyebrow="09" title="Screenshots & Reports" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {GALLERY.map((g) => (
            <Placeholder key={g} label={`Add ${g}`} />
          ))}
        </div>
      </Section>

      <Section id="what-i-learned">
        <SectionTitle eyebrow="10" title="What I Learned" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {LEARNED.map((l) => (
            <div key={l} className="card-surface p-5 text-sm leading-relaxed">
              {l}
            </div>
          ))}
        </div>
      </Section>

      <Section id="summary">
        <SectionTitle eyebrow="11" title="Project Summary" />
        <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SUMMARY.map((s) => (
            <div key={s.label} className="card-surface p-5">
              <dt className="eyebrow">{s.label}</dt>
              <dd className="mt-2 font-display text-base">{s.value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-5 py-2.5 text-sm font-medium transition-colors hover:border-primary/50"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Projects
          </Link>
          <a
            href="/resume/koushik-resume.pdf"
            download
            className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Download className="h-4 w-4" /> Download Resume
          </a>
        </div>
      </Section>
    </>
  );
}
