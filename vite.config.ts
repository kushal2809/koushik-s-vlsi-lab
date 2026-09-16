// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { projects } from "./src/data/projects";
import { articles } from "./src/data/knowledge";

// GitHub Pages serves this repo from a sub-path; keep "/" everywhere else
// (Lovable preview and published site) so nothing changes there.
const base = process.env["GITHUB_ACTIONS"] ? "/koushik-s-vlsi-lab/" : "/";

const staticPaths = [
  "/",
  "/about",
  "/pd-journey",
  "/projects",
  "/knowledge",
  "/activities",
  "/resume",
  "/contact",
  ...projects.map((project) => `/projects/${project.slug}`),
  ...articles.map((article) => `/knowledge/${article.slug}`),
];

export default defineConfig({
  vite: { base },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    pages: staticPaths.map((path) => ({ path })),
    prerender: { enabled: true, autoStaticPathsDiscovery: false },
  },
});
