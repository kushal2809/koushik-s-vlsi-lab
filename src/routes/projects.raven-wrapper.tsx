import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ChevronDown, Download, ImageIcon, X } from "lucide-react";
import { PageHeader, Section, SectionTitle, Tag } from "@/components/section";
import floorplanAsset from "@/assets/raven-floorplan.jpeg.asset.json";
import powerplanAsset from "@/assets/raven-powerplan.jpeg.asset.json";
import placementAsset from "@/assets/raven-placement.jpeg.asset.json";
import ctsAsset from "@/assets/raven-cts.jpeg.asset.json";
import routingAsset from "@/assets/raven-routing.jpeg.asset.json";
import staReportAsset from "@/assets/raven-sta-report.jpeg.asset.json";

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

type Spec = { label: string; value: string };

type Stage = {
  id: string;
  num: string;
  title: string;
  heading: string;
  did: string;
  specs: Spec[];
  observations: string;
  images: { src: string; alt: string; caption: string }[];
};

const STAGES: Stage[] = [
  {
    id: "floorplanning",
    num: "03",
    title: "Floorplanning",
    heading: "Floorplan Definition",
    did: "Defined the die and core dimensions, established the core offset, and placed the IO ports and macro for the initial physical implementation.",
    specs: [
      { label: "Chip Area", value: "3,130,829.270" },
      { label: "Chip Width", value: "1469" },
      { label: "Chip Height", value: "1469" },
      { label: "Core Area", value: "1,367,531.270" },
      { label: "Core Width", value: "1169" },
      { label: "Core Height", value: "1169" },
      { label: "Core Offset", value: "300" },
      { label: "Utilization Ratio", value: "0.0231" },
      { label: "Utilization", value: "2.31%" },
      { label: "Site Rows", value: "835" },
      { label: "Site Row Height", value: "1.40" },
      { label: "Site Width", value: "0.19" },
      { label: "Total Tiles", value: "5,141,095" },
      { label: "IO Pads", value: "52" },
      { label: "Macros", value: "1" },
    ],
    observations:
      "The RAVEN WRAPPER floorplan uses a 1469 × 1469 chip area with a 1169 × 1169 core and a 300-unit core offset. The floorplan contains 835 site rows, 52 IO pads, and 1 macro, with an initial utilization ratio of 0.0231 (2.31%). These parameters were reviewed to establish the available placement area for subsequent physical design stages.",
    images: [
      {
        src: floorplanAsset.url,
        alt: "RAVEN WRAPPER floorplan view showing IO pads, macro and the standard-cell placement region",
        caption:
          "Initial Floorplan — Die/core organization with IO pads, macro placement, and standard-cell placement region.",
      },
    ],
  },
  {
    id: "power-planning",
    num: "04",
    title: "Power Planning",
    heading: "Power Mesh Implementation",
    did: "Created the VDD/VSS power mesh across the core to establish a structured power distribution network for the design.",
    specs: [
      { label: "Technology", value: "45nm" },
      { label: "Metal Layers Available", value: "10" },
      { label: "Power Nets", value: "VDD / VSS" },
      { label: "Power Mesh", value: "Implemented" },
      { label: "PG Strategy", value: "Mesh-based" },
      { label: "Vertical Mesh Layer", value: "Metal2" },
      { label: "Horizontal Mesh Layer", value: "Metal3" },
      { label: "Mesh Width", value: "1" },
      { label: "Mesh Spacing", value: "2" },
      { label: "Mesh Pitch", value: "20" },
      { label: "Mesh Offset", value: "1" },
    ],
    observations:
      "Observed the distribution of VDD and VSS through the power mesh across the core. The mesh structure provides multiple power paths across the design, helping distribute current through the core and providing a structured supply network for the placed cells.",
    images: [
      {
        src: powerplanAsset.url,
        alt: "RAVEN WRAPPER power mesh across the core in ICC2",
        caption: "Power Mesh Implementation — VDD/VSS power distribution across the core.",
      },
    ],
  },
  {
    id: "placement",
    num: "05",
    title: "Placement",
    heading: "Standard Cell Placement",
    did: "Performed standard-cell placement within the defined core area after floorplanning and power planning, while reviewing placement density and routing congestion.",
    specs: [
      { label: "Total Leaf Cells", value: "21,284" },
      { label: "Standard Cells", value: "21,231" },
      { label: "Hard Macro Cells", value: "1" },
      { label: "Buffer / Inverter Cells", value: "2,404" },
      { label: "Placement", value: "Completed" },
      { label: "Congestion Review", value: "Performed" },
    ],
    observations:
      "Observed the distribution of standard cells across the core and reviewed cell-density variations after placement. GCell-based congestion information was used to identify regions with higher routing demand and to understand the relationship between placement density and available routing resources.",
    images: [
      {
        src: placementAsset.url,
        alt: "RAVEN WRAPPER full-chip standard-cell placement with the SRAM macro",
        caption:
          "Full-Chip Placement — Standard-cell placement across the core after floorplanning and power planning.",
      },
    ],
  },
  {
    id: "cts",
    num: "06",
    title: "Clock Tree Synthesis (CTS)",
    heading: "Clock Tree Implementation",
    did: "Performed Clock Tree Synthesis to distribute the design clocks from their sources to the sequential elements while considering clock latency, skew, and clock connectivity.",
    specs: [
      { label: "Technology", value: "45nm" },
      { label: "Number of Clocks", value: "3" },
      { label: "CTS", value: "Performed" },
      { label: "Clock Distribution", value: "Implemented" },
      { label: "Clock Analysis", value: "Reviewed" },
    ],
    observations:
      "Observed the generated clock tree and its distribution from the clock source to the sequential elements. Reviewed the clock paths and buffering structure to understand clock latency, skew, and clock connectivity across the design. The external clock distribution was also reviewed to understand how the clock signal propagates through the generated clock network.",
    images: [
      {
        src: ctsAsset.url,
        alt: "RAVEN WRAPPER clock tree view showing external clock distribution",
        caption:
          "External Clock Distribution — Clock tree view showing the distribution of the external clock through the design.",
      },
    ],
  },
  {
    id: "routing",
    num: "07",
    title: "Routing",
    heading: "Signal Routing",
    did: "Performed signal routing after placement and CTS to establish physical connections between the cells, macros, and IOs while utilizing the available routing resources.",
    specs: [
      { label: "Technology", value: "45nm" },
      { label: "Routing Layers Available", value: "10" },
      { label: "Routing", value: "Performed" },
      { label: "Routing Review", value: "Completed" },
      { label: "DRC Checks", value: "Performed" },
    ],
    observations:
      "Observed the routed signal paths and routing-resource utilization across the design. Detailed routing regions were reviewed to understand routing density, physical connectivity, and areas with higher routing complexity.",
    images: [
      {
        src: routingAsset.url,
        alt: "Detailed routing view of a selected region of the RAVEN WRAPPER block",
        caption:
          "Detailed Routing View — Routed signal connections in a selected region of the RAVEN WRAPPER block.",
      },
    ],
  },
  {
    id: "sta",
    num: "08",
    title: "Static Timing Analysis (STA)",
    heading: "Timing Analysis",
    did: "Performed Static Timing Analysis to evaluate setup and hold timing across the design and identify violating paths for further optimization.",
    specs: [],
    observations:
      "STA was performed after the physical implementation stages to analyze timing behavior across the design. Both setup and hold violations were observed, and the timing reports were reviewed to identify violating paths and understand areas requiring further timing optimization.",
    images: [
      {
        src: staReportAsset.url,
        alt: "RAVEN WRAPPER STA report showing setup and hold timing violations",
        caption:
          "Timing Analysis — Setup & Hold — STA report showing setup and hold timing violations across the design.",
      },
    ],
  },
];

const STA_TABLE = [
  { metric: "WNS", setup: "-2393.12", hold: "-1.89" },
  { metric: "TNS", setup: "-3664.76", hold: "-32.15" },
  { metric: "Violating Paths", setup: "162", hold: "293" },
];

const FLOW = STAGES.map((s) => ({ id: s.id, label: s.title }));

const GALLERY = [
  { label: "Floorplan", asset: floorplanAsset },
  { label: "Power Planning", asset: powerplanAsset },
  { label: "Placement", asset: placementAsset },
  { label: "CTS", asset: ctsAsset },
  { label: "Routing", asset: routingAsset },
  { label: "STA", asset: staReportAsset },
  { label: "DRC", asset: null },
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

const METRICS = ["45nm", "ICC2", "~21K Instances", "1 Macro", "10 Metal Layers", "3 Clocks", "250 MHz"];

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

function StageFigure({
  src,
  alt,
  caption,
  onOpen,
}: {
  src: string;
  alt: string;
  caption: string;
  onOpen: (img: { src: string; alt: string }) => void;
}) {
  return (
    <figure className="card-surface overflow-hidden p-2">
      <button
        type="button"
        onClick={() => onOpen({ src, alt })}
        className="block w-full cursor-zoom-in overflow-hidden rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label={`Enlarge image: ${caption}`}
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="h-auto w-full rounded-md object-contain transition-opacity hover:opacity-90"
        />
      </button>
      <figcaption className="px-2 py-2 text-xs leading-relaxed text-muted-foreground">
        {caption}
      </figcaption>
    </figure>
  );
}

function SpecGrid({ specs }: { specs: Spec[] }) {
  return (
    <dl className="grid grid-cols-2 gap-2 sm:grid-cols-3">
      {specs.map((s) => (
        <div key={s.label} className="rounded-md border border-border bg-surface/50 px-3 py-2">
          <dt className="font-mono text-[0.6rem] uppercase tracking-widest text-muted-foreground">
            {s.label}
          </dt>
          <dd className="mt-1 font-mono text-sm text-foreground">{s.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function StaTable() {
  return (
    <div className="overflow-hidden rounded-md border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-surface/60">
            <th className="px-3 py-2 text-left font-mono text-[0.6rem] uppercase tracking-widest text-muted-foreground">
              Metric
            </th>
            <th className="px-3 py-2 text-left font-mono text-[0.6rem] uppercase tracking-widest text-primary">
              Setup
            </th>
            <th className="px-3 py-2 text-left font-mono text-[0.6rem] uppercase tracking-widest text-primary">
              Hold
            </th>
          </tr>
        </thead>
        <tbody>
          {STA_TABLE.map((r) => (
            <tr key={r.metric} className="border-t border-border">
              <td className="px-3 py-2 text-muted-foreground">{r.metric}</td>
              <td className="px-3 py-2 font-mono">{r.setup}</td>
              <td className="px-3 py-2 font-mono">{r.hold}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RavenWrapper() {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

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
        <ol className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {FLOW.map((s, i) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="flow-card flex items-center gap-3 p-4 transition-colors hover:border-primary/50"
              >
                <span className="font-mono text-[0.65rem] tracking-widest text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-sm font-semibold">{s.label}</span>
                <ChevronDown className="ml-auto h-3.5 w-3.5 -rotate-90 text-muted-foreground" />
              </a>
            </li>
          ))}
        </ol>
      </Section>

      {STAGES.map((stage) => (
        <Section key={stage.id} id={stage.id}>
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-xs tracking-widest text-primary">{stage.num}</span>
            <h2 className="font-display text-2xl font-semibold">{stage.title}</h2>
          </div>
          <p className="mt-2 eyebrow">{stage.heading}</p>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <div className="space-y-4">
              <div className="card-surface p-5">
                <p className="font-mono text-[0.62rem] uppercase tracking-widest text-primary">
                  What I Did
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{stage.did}</p>
              </div>

              <div className="card-surface p-5">
                <p className="font-mono text-[0.62rem] uppercase tracking-widest text-primary">
                  Project Specifications
                </p>
                <div className="mt-3">
                  {stage.specs.length > 0 ? <SpecGrid specs={stage.specs} /> : <StaTable />}
                </div>
              </div>

              <div className="card-surface p-5">
                <p className="font-mono text-[0.62rem] uppercase tracking-widest text-primary">
                  Project Observations
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {stage.observations}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {stage.images.map((img) => (
                <StageFigure key={img.src} {...img} onOpen={setLightbox} />
              ))}
            </div>
          </div>
        </Section>
      ))}

      <Section id="gallery">
        <SectionTitle eyebrow="09" title="Screenshots & Reports" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {GALLERY.map((g) =>
            g.asset ? (
              <figure key={g.label} className="card-surface overflow-hidden p-2">
                <button
                  type="button"
                  onClick={() =>
                    setLightbox({
                      src: g.asset!.url,
                      alt: `RAVEN WRAPPER ${g.label.toLowerCase()} screenshot`,
                    })
                  }
                  className="block w-full cursor-zoom-in overflow-hidden rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  aria-label={`Enlarge ${g.label} screenshot`}
                >
                  <img
                    src={g.asset.url}
                    alt={`RAVEN WRAPPER ${g.label.toLowerCase()} screenshot`}
                    loading="lazy"
                    className="h-auto w-full rounded-md object-contain transition-opacity hover:opacity-90"
                  />
                </button>
                <figcaption className="px-2 py-2 font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground">
                  {g.label}
                </figcaption>
              </figure>
            ) : (
              <Placeholder key={g.label} label={`Add ${g.label}`} />
            ),
          )}
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
        <SectionTitle eyebrow="11" title="Final Project Summary" />
        <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
          RAVEN WRAPPER is a 45nm Physical Design implementation project carried out using Synopsys
          IC Compiler II (ICC2). The design contains approximately 21K instances, 1 macro, 10 metal
          layers, 3 clocks, and has a 250 MHz target frequency. The project provided hands-on
          exposure to the complete physical design flow, including floorplanning, IO and macro
          placement, power planning, standard-cell placement, CTS, routing, DRC checks, and static
          timing analysis.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-2">
          {METRICS.map((m, i) => (
            <span key={m} className="flex items-center gap-2">
              {i > 0 && (
                <span aria-hidden="true" className="font-mono text-xs text-muted-foreground/50">
                  |
                </span>
              )}
              <span className="card-surface px-3 py-1.5 font-mono text-xs tracking-wide">{m}</span>
            </span>
          ))}
        </div>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-5 py-2.5 text-sm font-medium transition-colors hover:border-primary/50"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Projects
          </Link>
          <a
            href={resumeAsset.url}
            download
            className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Download className="h-4 w-4" /> Download Resume
          </a>
        </div>
      </Section>

      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Enlarged screenshot"
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 p-4 backdrop-blur-sm"
        >
          <button
            type="button"
            onClick={() => setLightbox(null)}
            aria-label="Close"
            className="absolute right-4 top-4 rounded-md border border-border bg-surface p-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
          <img
            src={lightbox.src}
            alt={lightbox.alt}
            className="max-h-[90vh] max-w-[95vw] rounded-md object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
