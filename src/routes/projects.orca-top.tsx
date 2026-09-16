import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { PageHeader, Section, SectionTitle } from "@/components/section";
import { projects } from "@/data/projects";

const project = projects.find((p) => p.slug === "orca-top")!;

export const Route = createFileRoute("/projects/orca-top")({
  head: () => ({
    meta: [
      { title: "ORCA TOP — Physical Design Project" },
      {
        name: "description",
        content:
          "Physical Design implementation project completed as part of VLSI training, with hands-on exposure to the backend implementation flow in Synopsys ICC2.",
      },
      { property: "og:title", content: "ORCA TOP — Physical Design Project" },
      {
        property: "og:description",
        content: "Physical Design implementation project work in Synopsys IC Compiler II.",
      },
    ],
  }),
  component: OrcaTop,
});

function OrcaTop() {
  return (
    <>
      <div className="mx-auto max-w-3xl px-5 pt-10">
        <Link
          to="/projects"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> All projects
        </Link>
      </div>

      <PageHeader
        eyebrow={project.subtitle}
        title={project.name}
        intro={project.description}
      />

      <Section>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="card-surface p-4">
            <p className="eyebrow">Tool</p>
            <p className="mt-2 font-display text-base">{project.tool}</p>
          </div>
          <div className="card-surface p-4">
            <p className="eyebrow">Type</p>
            <p className="mt-2 font-display text-base">Training project</p>
          </div>
        </div>
      </Section>

      <Section>
        <SectionTitle eyebrow="Case study in progress" title="To be documented" />
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          The detailed case study for this project will be added here, covering the flow
          stages, screenshots and observations, once the material is ready.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {project.placeholders.map((p) => (
            <div
              key={p}
              className="rounded-lg border border-dashed border-border bg-surface/40 p-5 text-sm text-muted-foreground"
            >
              {p}
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
