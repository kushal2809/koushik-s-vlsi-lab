// ============= Full file contents =============
import { createFileRoute } from "@tanstack/react-router";
import { Download, ExternalLink } from "lucide-react";
import { PageHeader, Section, Tag } from "@/components/section";
import { skillGroups } from "@/data/skills";
import resumeAsset from "@/assets/koushik-resume-v2.pdf.asset.json";

const RESUME_URL = resumeAsset.url;

export const Route = createFileRoute("/resume")({
  head: () => ({
    meta: [
      { title: "My Resume — Koushik, VLSI Physical Design" },
      {
        name: "description",
        content:
          "View or download the resume of Durgam Koushik — Aspiring VLSI Physical Design Engineer.",
      },
      { property: "og:title", content: "My Resume — Koushik, VLSI Physical Design" },
      {
        property: "og:description",
        content: "Resume of Durgam Koushik — Aspiring VLSI Physical Design Engineer.",
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
        title="My Resume"
        intro="Resume of Durgam Koushik — Aspiring VLSI Physical Design Engineer"
      />

      <Section>
        <div className="flex flex-wrap gap-3">
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            <ExternalLink className="h-4 w-4" /> View Resume
          </a>
          <a
            href={RESUME_URL}
            download="Koushik-Resume.pdf"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-5 py-2.5 text-sm font-medium transition-colors hover:border-primary/50"
          >
            <Download className="h-4 w-4" /> Download Resume
          </a>
        </div>


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
