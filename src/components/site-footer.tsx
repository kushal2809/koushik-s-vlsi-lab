import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-xs tracking-wide">
          KOUSHIK &middot; VLSI PHYSICAL DESIGN &middot; {new Date().getFullYear()}
        </p>
        <div className="flex gap-4">
          <Link to="/knowledge" className="transition-colors hover:text-foreground">
            Knowledge
          </Link>
          <Link to="/projects" className="transition-colors hover:text-foreground">
            Projects
          </Link>
          <Link to="/contact" className="transition-colors hover:text-foreground">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
