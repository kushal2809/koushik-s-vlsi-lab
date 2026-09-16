import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Section } from "@/components/section";
import { activities } from "@/data/activities";

export const Route = createFileRoute("/activities")({
  head: () => ({
    meta: [
      { title: "What I'm Working On — VLSI Activities" },
      {
        name: "description",
        content:
          "A running timeline of what Koushik is currently learning and practising in VLSI Physical Design: placement, congestion, CTS, STA, TCL and Linux.",
      },
      { property: "og:title", content: "What I'm Working On — VLSI Activities" },
      {
        property: "og:description",
        content: "Current VLSI learning activities and areas of focus.",
      },
    ],
  }),
  component: Activities,
});

function Activities() {
  return (
    <>
      <PageHeader
        eyebrow="Activities"
        title="What I'm Working On"
        intro="A simple record of what I am currently learning, practising and exploring in VLSI Physical Design."
      />

      <Section>
        <ol className="relative space-y-4 border-l border-border pl-6">
          {activities.map((a) => (
            <li key={a.title} className="relative">
              <span
                className="absolute top-5 -left-[1.9rem] h-2.5 w-2.5 rounded-full border border-primary bg-background"
                aria-hidden="true"
              />
              <div className="card-surface p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h2 className="font-display text-base font-semibold">{a.title}</h2>
                  <span className="rounded-md border border-primary/30 bg-primary/10 px-2 py-0.5 font-mono text-[0.65rem] tracking-widest text-primary uppercase">
                    {a.status}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>
    </>
  );
}
