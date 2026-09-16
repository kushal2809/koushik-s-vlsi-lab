import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, CircuitBoard, FolderGit2 } from "lucide-react";
import { PDFlow } from "@/components/pd-flow";
import { Section, SectionTitle } from "@/components/section";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Koushik's VLSI Space — VLSI Physical Design Engineer" },
      {
        name: "description",
        content:
          "Personal VLSI Physical Design space by Koushik: PD flow explained, ICC2 projects, and a growing VLSI knowledge library for students and engineers.",
      },
      { property: "og:title", content: "Koushik's VLSI Space — VLSI Physical Design Engineer" },
      {
        property: "og:description",
        content:
          "Exploring Physical Design, from RTL to a complete physical implementation. Projects, PD journey and VLSI knowledge.",
      },
    ],
  }),
  component: Home,
});

const features = [
  {
    icon: FolderGit2,
    title: "PROJECTS",
    body: "Practical Physical Design projects and implementation experience.",
    to: "/projects" as const,
  },
  {
    icon: BookOpen,
    title: "VLSI KNOWLEDGE",
    body: "Simple explanations of VLSI and Physical Design concepts.",
    to: "/knowledge" as const,
  },
  {
    icon: CircuitBoard,
    title: "MY JOURNEY",
    body: "What I am learning, experimenting with, and improving.",
    to: "/pd-journey" as const,
  },
];

function Home() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="hero-glow absolute inset-0" aria-hidden="true" />
        <div className="grid-backdrop absolute inset-0" aria-hidden="true" />
        <div className="rise-in relative mx-auto max-w-6xl px-5 pt-20 pb-14 sm:pt-28 sm:pb-20">
          <p className="eyebrow">Personal VLSI Lab</p>
          <h1 className="mt-4 font-display text-5xl font-bold tracking-tight sm:text-7xl">
            KOUSHIK
          </h1>
          <p className="mt-3 font-mono text-sm tracking-[0.2em] text-primary sm:text-base">
            VLSI PHYSICAL DESIGN ENGINEER
          </p>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Exploring Physical Design, from RTL to a complete physical implementation.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/pd-journey"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Explore My VLSI Journey <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary/50"
            >
              View My Projects
            </Link>
          </div>
        </div>
      </section>

      <Section>
        <SectionTitle eyebrow="Implementation Flow" title="RTL to Signoff" />
        <PDFlow />
      </Section>

      <Section>
        <div className="grid gap-4 sm:grid-cols-3">
          {features.map((f) => (
            <Link key={f.title} to={f.to} className="card-surface flex flex-col gap-3 p-6">
              <f.icon className="h-5 w-5 text-primary" />
              <h3 className="font-mono text-sm tracking-widest">{f.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{f.body}</p>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
