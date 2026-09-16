import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Section, SectionTitle, Tag } from "@/components/section";
import { skillGroups } from "@/data/skills";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Koushik — VLSI Physical Design" },
      {
        name: "description",
        content:
          "Koushik: B.Tech ECE (2026) with Physical Design training at Takshila VLSI Institute, building practical knowledge of the complete PD flow.",
      },
      { property: "og:title", content: "About Koushik — VLSI Physical Design" },
      {
        property: "og:description",
        content: "Education, VLSI training and technical skills across the Physical Design flow.",
      },
    ],
  }),
  component: About,
});

const facts = [
  { label: "Name", value: "Koushik" },
  { label: "Education", value: "B.Tech — Electronics and Communication Engineering, 2026" },
  { label: "VLSI Training", value: "Physical Design training at Takshila VLSI Institute" },
  { label: "Focus", value: "Backend / Physical Design implementation" },
];

function About() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Early-career VLSI Physical Design engineer"
        intro="I am building practical knowledge of the complete Physical Design flow — floorplanning through routing and timing closure — and this site documents that work as it grows."
      />

      <Section>
        <div className="grid gap-4 sm:grid-cols-2">
          {facts.map((f) => (
            <div key={f.label} className="card-surface p-5">
              <p className="eyebrow">{f.label}</p>
              <p className="mt-2 text-sm leading-relaxed">{f.value}</p>
            </div>
          ))}
        </div>

        <div className="card-surface mt-4 p-6">
          <p className="text-sm leading-relaxed text-muted-foreground">
            My background is in Electronics and Communication Engineering, and my interest settled
            on the backend side of chip design — where a netlist becomes a real, manufacturable
            layout. Through training at Takshila VLSI Institute I have worked on block-level
            implementation in IC Compiler II, covering floorplanning, power planning, placement,
            CTS, routing, DRC checks and timing reviews.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            I am at the start of my career rather than in an industry role, so what I share here is
            training and project work, written honestly. I keep notes as I learn and publish the
            clearer ones in the knowledge section, mainly because explaining a concept simply is the
            fastest way to find out whether I actually understand it.
          </p>
        </div>
      </Section>

      <Section>
        <SectionTitle eyebrow="Technical Skills" title="Tools and areas I work with" />
        <div className="grid gap-4 sm:grid-cols-3">
          {skillGroups.map((g) => (
            <div key={g.title} className="card-surface p-5">
              <h3 className="font-display text-base font-semibold">{g.title}</h3>
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
