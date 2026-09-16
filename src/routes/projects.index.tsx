import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHeader, Section, Tag } from "@/components/section";
import { projects } from "@/data/projects";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "Projects — Physical Design Implementation Work" },
      {
        name: "description",
        content:
          "Physical Design projects by Koushik, including RAVEN WRAPPER: a 45nm, ~21K instance block implemented in IC Compiler II at 250 MHz.",
      },
      { property: "og:title", content: "Projects — Physical Design Implementation Work" },
      {
        property: "og:description",
        content: "RAVEN WRAPPER, NAND and ORCA TOP Physical Design project work.",
      },
    ],
  }),
  component: Projects,
});

function Projects() {
  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title="Physical Design project work"
        intro="Block-level implementation work from my Physical Design training. Each project page will grow as I add screenshots, reports and observations."
      />

      <Section>
        <div className="grid gap-4 md:grid-cols-2">
          {projects.map((p) => (
            <Link
              key={p.slug}
              to="/projects/$slug"
              params={{ slug: p.slug }}
              className="card-surface flex flex-col p-6"
            >
              <span className="eyebrow">{p.status}</span>
              <h2 className="mt-2 font-display text-xl font-semibold">{p.name}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.tagline}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.specs.slice(0, 3).map((s) => (
                  <Tag key={s.label}>
                    {s.label}: {s.value}
                  </Tag>
                ))}
              </div>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm text-primary">
                View details <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
