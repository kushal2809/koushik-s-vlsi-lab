import { createFileRoute } from "@tanstack/react-router";
import { Linkedin, Mail, MapPin } from "lucide-react";
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
      {
        property: "og:description",
        content: "Email, LinkedIn profile and location details.",
      },
    ],
  }),
  component: Contact,
});

const channels = [
  {
    icon: Mail,
    label: "Email",
    value: "dkoushik28092@gmail.com",
    href: "mailto:dkoushik28092@gmail.com",
  },
  {
    icon: Linkedin,
    label: "LinkedIn Profile",
    value: "www.linkedin.com/in/d-koushik",
    href: "https://www.linkedin.com/in/d-koushik",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Hyderabad, India",
    href: undefined,
  },
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
          {channels.map((c) => {
            const inner = (
              <>
                <c.icon className="h-5 w-5 text-primary" />
                <p className="mt-3 font-display text-base font-semibold">{c.label}</p>
                <p className="mt-1 font-mono text-xs leading-relaxed text-muted-foreground break-all">
                  {c.value}
                </p>
              </>
            );
            return c.href ? (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={c.href.startsWith("http") ? "noreferrer" : undefined}
                className="card-surface p-5 transition-opacity hover:opacity-85"
              >
                {inner}
              </a>
            ) : (
              <div key={c.label} className="card-surface p-5">
                {inner}
              </div>
            );
          })}
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          Feel free to reach out by email or connect with me on LinkedIn.
        </p>
      </Section>
    </>
  );
}

