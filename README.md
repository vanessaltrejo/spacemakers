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
  app/            # Routes ((site), (auth), (dashboard) root layouts) and global styles (globals.css)
  components/
    layout/       # SiteShell (sidebar), SiteFrame, Footer
    sections/     # Hero, partners ticker and call to action
    about/        # Pieces of the Nosotros page
    news/         # Newsletter front page, note of the day, subscription
    science/      # Research list with category filter
    pillar-page/  # Single template used by every project page
    pillars/      # Accent tone mapping
    ui/           # Reusable primitives (Section, PageHeader, Starfield, Logo, ...)
    providers/    # Client-side providers (MotionConfig)
  lib/            # Fonts, date formatting and category metadata
  services/       # Data access layer: the only place that knows where content comes from
  data/           # Typed dummy content (to be replaced by a CMS / API)
  styles/         # Design tokens shared with the dashboard
  types/          # Domain types shared across layers
public/images/    # Temporary images cropped from the Canva mockup
```
