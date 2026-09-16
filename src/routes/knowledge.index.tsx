import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHeader, Section, Tag } from "@/components/section";
import { articles, categories } from "@/data/knowledge";

export const Route = createFileRoute("/knowledge/")({
  head: () => ({
    meta: [
      { title: "VLSI Knowledge — Physical Design Concepts Explained" },
      {
        name: "description",
        content:
          "Simple explanations of VLSI topics: floorplanning, placement, congestion, CTS, STA, digital design basics, EDA tools, Linux and TCL scripting.",
      },
      { property: "og:title", content: "VLSI Knowledge — Physical Design Concepts Explained" },
      {
        property: "og:description",
        content: "A growing library of short, practical VLSI and Physical Design explanations.",
      },
    ],
  }),
  component: Knowledge,
});

function Knowledge() {
  return (
    <>
      <PageHeader
        eyebrow="VLSI Knowledge"
        title="Concepts, explained simply"
        intro="Short, practical write-ups on Physical Design and digital design topics. Each one has an introduction, an explanation, an example and a key takeaway."
      />

      <Section>
        <div className="grid gap-4 sm:grid-cols-2">
          {categories.map((c) => {
            const count = articles.filter((a) => a.category === c.id).length;
            return (
              <div key={c.id} id={c.id} className="card-surface scroll-mt-24 p-6">
                <div className="flex items-baseline justify-between gap-3">
                  <h2 className="font-display text-lg font-semibold">{c.name}</h2>
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
          {articles.map((a) => (
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
