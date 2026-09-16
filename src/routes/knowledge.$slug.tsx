import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { PageHeader, Section } from "@/components/section";
import { articles, categoryById } from "@/data/knowledge";

export const Route = createFileRoute("/knowledge/$slug")({
  loader: ({ params }) => {
    const article = articles.find((a) => a.slug === params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Article not found" }, { name: "robots", content: "noindex" }] };
    }
    const { article } = loaderData;
    const title = `${article.title} — VLSI Knowledge`;
    return {
      meta: [
        { title },
        { name: "description", content: article.intro },
        { property: "og:title", content: title },
        { property: "og:description", content: article.intro },
        { property: "og:type", content: "article" },
      ],
    };
  },
  component: ArticlePage,
});

function ArticlePage() {
  const { article } = Route.useLoaderData();
  const category = categoryById(article.category);

  return (
    <>
      <div className="mx-auto max-w-3xl px-5 pt-10">
        <Link
          to="/knowledge"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> All topics
        </Link>
      </div>

      <PageHeader
        eyebrow={`${category?.name ?? "VLSI"} · ${article.topic}`}
        title={article.title}
        intro={article.intro}
      />

      <Section className="max-w-3xl">
        <article className="space-y-5">
          {article.explanation?.map((p) => (
            <p key={p.slice(0, 24)} className="text-base leading-relaxed text-muted-foreground">
              {p}
            </p>
          ))}

          {article.sections?.map((s) => (
            <section key={s.heading} className="card-surface p-6">
              <h2 className="font-display text-base font-semibold">{s.heading}</h2>

              {s.flow && <FlowChain steps={s.flow} />}

              {s.bullets && (
                <ul className="mt-4 space-y-2">
                  {s.bullets.map((b) => (
                    <li
                      key={b.slice(0, 24)}
                      className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground"
                    >
                      <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}

              {s.body?.map((p) => (
                <p
                  key={p.slice(0, 24)}
                  className="mt-4 text-sm leading-relaxed text-muted-foreground"
                >
                  {p}
                </p>
              ))}
            </section>
          ))}

          {article.example && (
            <div className="card-surface p-6">
              <p className="eyebrow">Practical example</p>
              <p className="mt-3 font-mono text-sm leading-relaxed text-foreground/90">
                {article.example}
              </p>
            </div>
          )}

          {article.takeaway && (
            <div className="rounded-lg border border-primary/30 bg-primary/10 p-6">
              <p className="eyebrow">Key takeaway</p>
              <p className="mt-3 text-sm leading-relaxed">{article.takeaway}</p>
            </div>
          )}
        </article>
      </Section>
    </>
  );
}

function FlowChain({ steps }: { steps: string[] }) {
  return (
    <ol className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-2">
      {steps.map((step, i) => (
        <li key={step} className="flex items-center gap-2">
          <span className="rounded-md border border-border bg-secondary px-2.5 py-1 font-mono text-xs text-secondary-foreground">
            {step}
          </span>
          {i < steps.length - 1 && (
            <span aria-hidden className="font-mono text-xs text-primary">
              →
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}
