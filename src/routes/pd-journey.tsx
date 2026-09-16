import { createFileRoute } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { PageHeader, Section, Tag } from "@/components/section";
import { pdStages } from "@/data/pd-journey";

export const Route = createFileRoute("/pd-journey")({
  head: () => ({
    meta: [
      { title: "PD Journey — Physical Design Flow Explained" },
      {
        name: "description",
        content:
          "Floorplanning, power planning, placement, CTS, routing, STA and physical verification explained stage by stage with key concepts and ICC2 commands.",
      },
      { property: "og:title", content: "PD Journey — Physical Design Flow Explained" },
      {
        property: "og:description",
        content: "Stage-by-stage walkthrough of the Physical Design flow with concepts and tools.",
      },
    ],
  }),
  component: PDJourney,
});

function PDJourney() {
  return (
    <>
      <PageHeader
        eyebrow="PD Journey"
        title="The Physical Design flow, stage by stage"
        intro="Each stage below covers what it does, the concepts that matter, and the commands I use. Expand a stage for more detail."
      />

      <Section>
        <ol className="space-y-4">
          {pdStages.map((stage, i) => (
            <li key={stage.id} id={stage.id} className="scroll-mt-24">
              <details className="card-surface group p-6 [&[open]_.chev]:rotate-180">
                <summary className="flex cursor-pointer list-none items-start gap-4">
                  <span className="mt-1 font-mono text-xs text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1">
                    <span className="block font-display text-lg font-semibold">{stage.title}</span>
                    <span className="mt-2 block text-sm leading-relaxed text-muted-foreground">
                      {stage.summary}
                    </span>
                  </span>
                  <ChevronDown className="chev mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform" />
                </summary>

                <div className="mt-6 grid gap-6 border-t border-border pt-6 md:grid-cols-2">
                  <div>
                    <p className="eyebrow">Key concepts</p>
                    <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                      {stage.concepts.map((c) => (
                        <li key={c} className="flex gap-2">
                          <span className="text-primary">&rsaquo;</span>
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="eyebrow">Tools / commands</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {stage.tools.map((t) => (
                        <Tag key={t}>{t}</Tag>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground md:col-span-2">
                    {stage.detail}
                  </p>
                </div>
              </details>
            </li>
          ))}
        </ol>
      </Section>
    </>
  );
}
