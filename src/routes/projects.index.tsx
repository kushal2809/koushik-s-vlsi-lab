import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Cpu } from "lucide-react";
import { PageHeader, Section, Tag } from "@/components/section";
import { projects, type Project } from "@/data/projects";

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
        content: "RAVEN WRAPPER and ORCA TOP Physical Design project work in ICC2.",
      },
    ],
  }),
  component: Projects,
});

function ProjectCard({ project }: { project: Project }) {
  const body = (
    <>
      <span className="eyebrow">{project.status}</span>
      <h2 className="mt-2 font-display text-xl font-semibold">{project.name}</h2>
      <p className="mt-1 font-mono text-xs tracking-wide text-primary">{project.subtitle}</p>
      <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
        <Cpu className="h-3.5 w-3.5" /> {project.tool}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.highlights.map((h) => (
          <Tag key={h}>{h}</Tag>
        ))}
      </div>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm text-primary">
        View Case Study <ArrowRight className="h-3.5 w-3.5" />
      </span>
    </>
  );

  const cardClass = "card-surface flex flex-col p-6 transition-colors hover:border-primary/40";

  return project.slug === "raven-wrapper" ? (
    <Link to="/projects/raven-wrapper" className={cardClass}>
      {body}
    </Link>
  ) : (
    <Link to="/projects/$slug" params={{ slug: project.slug }} className={cardClass}>
      {body}
    </Link>
  );
}

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
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </Section>
    </>
  );
}
