import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHeader, Section, SectionTitle, Tag } from "@/components/section";
import { articles, categories } from "@/data/knowledge";

export const Route = createFileRoute("/knowledge/")({
  head: () => ({
    meta: [
      { title: "VLSI Knowledge — Physical Design Concepts Explained" },
      {
        name: "description",
        content:
          "Physical Design explained topic by topic: PD flow, floorplanning, power planning, placement, CTS, routing, STA and physical verification, plus digital design, tools, Linux and TCL.",
      },
      { property: "og:title", content: "VLSI Knowledge — Physical Design Concepts Explained" },
      {
        property: "og:description",
        content: "A practical VLSI learning resource covering the full Physical Design flow.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Knowledge,
});

const pdArticles = articles
  .filter((a) => a.category === "physical-design")
  .sort((a, b) => (a.num ?? "").localeCompare(b.num ?? ""));

const otherCategories = categories.filter((c) => c.id !== "physical-design");

function Knowledge() {
  return (
    <>
      <PageHeader
        eyebrow="VLSI Knowledge"
        title="Concepts, explained simply"
        intro="Short, practical write-ups on Physical Design and digital design topics — written while working through the backend flow."
      />

      <Section id="physical-design" className="scroll-mt-24">
        <SectionTitle eyebrow="Category" title="Physical Design" />

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pdArticles.map((a) => (
            <li key={a.slug}>
              <div className="card-surface flex h-full flex-col p-6">
                <span className="font-mono text-xs text-primary">{a.num}</span>
                <h3 className="mt-2 font-display text-lg font-semibold">{a.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {a.short ?? a.intro}
                </p>
                <Link
                  to="/knowledge/$slug"
                  params={{ slug: a.slug }}
                  className="mt-5 inline-flex items-center gap-1.5 self-start rounded-md border border-border px-3 py-1.5 text-sm text-primary transition-colors hover:border-primary/50 hover:bg-primary/10"
                >
                  Learn More <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </li>
          ))}
        </ul>

        <div className="card-surface mt-6 p-6">
          <p className="eyebrow">Physical Design in Practice</p>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            These concepts are also applied during hands-on implementation using Synopsys IC
            Compiler II (ICC2), where physical design stages are executed, analyzed, and iteratively
            optimized.
          </p>
          <Link
            to="/projects/raven-wrapper"
            className="mt-5 inline-flex items-center gap-1.5 rounded-md border border-primary/40 px-3 py-1.5 text-sm text-primary transition-colors hover:bg-primary/10"
          >
            View My RAVEN WRAPPER Project <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </Section>

      <Section>
        <SectionTitle eyebrow="More topics" title="Other categories" />
        <div className="grid gap-4 sm:grid-cols-2">
          {otherCategories.map((c) => {
            const count = articles.filter((a) => a.category === c.id).length;
            return (
              <div key={c.id} id={c.id} className="card-surface scroll-mt-24 p-6">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-lg font-semibold">{c.name}</h3>
                  <span className="font-mono text-xs text-muted-foreground">
                    {count} article{count === 1 ? "" : "s"}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {c.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {c.topics.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      <Section>
        <h2 className="mb-6 font-display text-2xl font-semibold">Articles</h2>
        <ul className="grid gap-4 md:grid-cols-2">
          {articles
            .filter((a) => a.category !== "physical-design")
            .map((a) => (
              <li key={a.slug}>
                <Link
                  to="/knowledge/$slug"
                  params={{ slug: a.slug }}
                  className="card-surface flex h-full flex-col p-6"
                >
                  <span className="eyebrow">{a.topic}</span>
                  <h3 className="mt-2 font-display text-lg font-semibold">{a.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {a.intro}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm text-primary">
                    Read <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              </li>
            ))}
        </ul>
      </Section>
    </>
  );
}
