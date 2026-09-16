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
          {article.explanation.map((p) => (
            <p key={p.slice(0, 24)} className="text-base leading-relaxed text-muted-foreground">
              {p}
            </p>
          ))}

          <div className="card-surface p-6">
            <p className="eyebrow">Practical example</p>
            <p className="mt-3 font-mono text-sm leading-relaxed text-foreground/90">
              {article.example}
            </p>
          </div>

          <div className="rounded-lg border border-primary/30 bg-primary/10 p-6">
            <p className="eyebrow">Key takeaway</p>
            <p className="mt-3 text-sm leading-relaxed">{article.takeaway}</p>
          </div>
        </article>
      </Section>
    </>
  );
}
