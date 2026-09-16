import { createFileRoute } from "@tanstack/react-router";
import { Github, Linkedin, Mail } from "lucide-react";
import { PageHeader, Section } from "@/components/section";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Koushik's VLSI Space" },
      {
        name: "description",
        content:
          "Get in touch with Koushik about VLSI Physical Design roles, training work or questions on the concepts shared here.",
      },
      { property: "og:title", content: "Contact — Koushik's VLSI Space" },
      { property: "og:description", content: "Email, LinkedIn and GitHub contact details." },
    ],
  }),
  component: Contact,
});

const channels = [
  { icon: Mail, label: "Email", value: "Add your email address here" },
  { icon: Linkedin, label: "LinkedIn", value: "Add your LinkedIn profile link here" },
  { icon: Github, label: "GitHub", value: "Add your GitHub profile link here" },
];

function Contact() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Get in touch"
        intro="Open to Physical Design opportunities and happy to discuss anything covered on this site."
      />

      <Section>
        <div className="grid gap-4 sm:grid-cols-3">
          {channels.map((c) => (
            <div key={c.label} className="card-surface p-5">
              <c.icon className="h-5 w-5 text-primary" />
              <p className="mt-3 font-display text-base font-semibold">{c.label}</p>
              <p className="mt-1 font-mono text-xs leading-relaxed text-muted-foreground">
                {c.value}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          These are placeholders — I have not added real contact details yet.
        </p>
      </Section>
    </>
  );
}
