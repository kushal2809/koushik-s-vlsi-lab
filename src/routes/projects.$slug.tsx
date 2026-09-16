import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { PageHeader, Section, SectionTitle } from "@/components/section";
import { projects } from "@/data/projects";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = projects.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Project not found" }, { name: "robots", content: "noindex" }],
      };
    }
    const { project } = loaderData;
    const title = `${project.name} — Physical Design Project`;
    return {
      meta: [
        { title },
        { name: "description", content: project.description },
        { property: "og:title", content: title },
        { property: "og:description", content: project.description },
      ],
    };
  },
  component: ProjectDetail,
});

function ProjectDetail() {
  const { project } = Route.useLoaderData();

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

      <PageHeader eyebrow={project.status} title={project.name} intro={project.tagline} />

      <Section>
        <SectionTitle title="Design specifications" />
        <dl className="grid gap-3 sm:grid-cols-3">
          {project.specs.map((s) => (
            <div key={s.label} className="card-surface p-4">
              <dt className="eyebrow">{s.label}</dt>
              <dd className="mt-2 font-display text-base">{s.value}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="card-surface p-6">
            <h2 className="font-display text-lg font-semibold">Responsibilities</h2>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {project.responsibilities.map((r) => (
                <li key={r} className="flex gap-2">
                  <span className="text-primary">&rsaquo;</span>
                  {r}
                </li>
              ))}
            </ul>
          </div>
          <div className="card-surface p-6">
            <h2 className="font-display text-lg font-semibold">Notes</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{project.notes}</p>
          </div>
        </div>
      </Section>

      <Section>
        <SectionTitle eyebrow="Coming soon" title="To be documented" />
        <div className="grid gap-3 sm:grid-cols-2">
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
