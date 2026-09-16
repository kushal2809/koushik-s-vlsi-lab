import { createFileRoute } from "@tanstack/react-router";
import { Download, ExternalLink } from "lucide-react";
import { PageHeader, Section, Tag } from "@/components/section";
import { skillGroups } from "@/data/skills";

const RESUME_URL = "/resume/koushik-resume.pdf";

export const Route = createFileRoute("/resume")({
  head: () => ({
    meta: [
      { title: "Resume — Koushik, VLSI Physical Design" },
      {
        name: "description",
        content:
          "Download or view Koushik's resume: B.Tech ECE 2026, Physical Design training, ICC2 project work and PD tool exposure.",
      },
      { property: "og:title", content: "Resume — Koushik, VLSI Physical Design" },
      {
        property: "og:description",
        content: "Education, training, tools and Physical Design project exposure at a glance.",
      },
    ],
  }),
  component: Resume,
});

function Resume() {
  return (
    <>
      <PageHeader
        eyebrow="Resume"
        title="Resume"
        intro="A short summary is below. The full document is available to view or download."
      />

      <Section>
        <div className="flex flex-wrap gap-3">
          <a
            href={RESUME_URL}
            download
            className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Download className="h-4 w-4" /> Download Resume
          </a>
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-5 py-2.5 text-sm font-medium transition-colors hover:border-primary/50"
          >
            <ExternalLink className="h-4 w-4" /> View Resume
          </a>
        </div>
        <p className="mt-3 font-mono text-xs text-muted-foreground">
          Placeholder file: public/resume/koushik-resume.pdf — replace it with your own PDF.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="card-surface p-5">
            <p className="eyebrow">Education</p>
            <p className="mt-2 text-sm">B.Tech — Electronics and Communication Engineering</p>
            <p className="text-sm text-muted-foreground">Completed 2026</p>
          </div>
          <div className="card-surface p-5">
            <p className="eyebrow">VLSI Training</p>
            <p className="mt-2 text-sm">Physical Design training</p>
            <p className="text-sm text-muted-foreground">Takshila VLSI Institute</p>
          </div>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {skillGroups.map((g) => (
            <div key={g.title} className="card-surface p-5">
              <h2 className="font-display text-base font-semibold">{g.title}</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {g.items.map((i) => (
                  <Tag key={i}>{i}</Tag>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
