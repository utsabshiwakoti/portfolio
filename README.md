# Portfolio

My personal site: the projects I've built, a short about section, and a one-page resume.

## What it does

- **Home page** (`index.html`): intro, four project case studies with screenshots, live links and source links, client work, skills, education and contact links.
- **Resume page** (`resume.html`): the same content laid out as a one-page resume. It prints cleanly to a single Letter page, and that print is the downloadable PDF.

## Stack

- React 19 + Vite 8, plain CSS (no UI framework)
- oxlint for linting
- GitHub Pages, deployed by GitHub Actions on every push to `main`

## Run it locally

```bash
npm install
npm run dev        # http://localhost:5173
```

```bash
npm run lint
npm run build      # static site in dist/
npm run preview    # serve the built site
```

## Editing content

Everything the site says lives in [`src/content.js`](src/content.js): projects, skills, education, links. The home page and the resume both read from it, so they never disagree. An empty `email` or `linkedin` value is simply hidden.

After changing resume content, regenerate the PDF: open `/resume.html`, print, "Save as PDF", and save it over `public/Utsab-Shiwakoti-Resume.pdf`.

## Design notes

- **Two static pages, no router.** `index.html` and `resume.html` share one entry point; each page's `<body data-page>` says which component to render. That keeps the site fully static, and `base: './'` in `vite.config.js` makes it work at a domain root or under a sub-path.
- **One source of content.** The resume is not a separate document to keep in sync. It is a second view of `content.js`.
- **Print stylesheet.** `@page` sets Letter size and margins, the print rules shrink type and spacing, and the mobile layout rules are scoped to `screen` so a printed page (narrow in CSS pixels) doesn't pick up the stacked mobile layout.
- **Light and dark** follow the system setting via `prefers-color-scheme`; print always uses the light palette.
- **Accessibility:** skip link, semantic landmarks, visible focus outlines, alt text on screenshots, reduced-motion respected.
- **Screenshots** are 1200px-wide WebP to keep the page light.

## Deploying

The workflow in `.github/workflows/deploy.yml` lints, builds and publishes `dist/` to GitHub Pages. In the repo settings, set **Pages → Source** to **GitHub Actions**. For a custom domain, add the domain to `public/CNAME` and point DNS at GitHub Pages.

## What I'd add next

- A short write-up page per project (problem, approach, trade-offs), linked from each card
- Generate the resume PDF in CI so it can never go stale
- Lighthouse check in CI to keep performance and accessibility scores up
