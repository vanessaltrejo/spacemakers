# SpaceMakers Web

Landing page for SpaceMakers, the student space-innovation group at Tecnológico de Monterrey.

## Stack

Next.js (App Router) · React · TypeScript · Tailwind CSS v4 · Motion

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build
```

## Structure

```
src/
  app/            # Routes, root layout, global styles + design tokens (globals.css)
  components/
    layout/       # Navbar, Footer
    sections/     # One component per landing-page section
    pillars/      # Pillar card, detail dialog, accent tone mapping
    ui/           # Reusable primitives (Reveal, CountUp, Starfield, Logo, ...)
    providers/    # Client-side providers (MotionConfig)
  hooks/          # Reusable client hooks
  services/       # Data access layer — the only place that knows where content comes from
  data/           # Typed dummy content (to be replaced by a CMS / API)
  types/          # Domain types shared across layers
public/images/    # Temporary images cropped from the Canva mockup
```
