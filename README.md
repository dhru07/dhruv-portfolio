# Dhruv Singh Portfolio

Portfolio website built with Next.js App Router, TypeScript, and Tailwind CSS.

## Run locally

1. Install Node.js and npm.
2. From the project folder, run `cp .env.example .env.local`.
3. For the GitHub Pages path locally, keep the values in `.env.example`. To run at the root instead, set `NEXT_PUBLIC_SITE_URL=http://localhost:3000` and `NEXT_PUBLIC_BASE_PATH=` in `.env.local`.
4. Run `npm install`.
5. Run `npm run dev`. With the default GitHub Pages path, open <http://localhost:3000/dhruv-portfolio/>.

Useful checks:

- `npm run lint`
- `npx tsc --noEmit`
- `npm run build`
- The static site is exported to `out/`.

## Deploy

GitHub Pages deployment is automated by `.github/workflows/deploy.yml` when changes are pushed to `main` or when the workflow is run manually. The workflow builds the site for `https://dhru07.github.io/dhruv-portfolio/` and publishes `out/`.

To move to Vercel or a domain hosted at the root, set `NEXT_PUBLIC_BASE_PATH` to an empty string and set `NEXT_PUBLIC_SITE_URL` to the canonical root URL in the Vercel project settings. Rebuild after changing either value. `NEXT_PUBLIC_SITE_URL` is used for canonical metadata, Open Graph URLs, `robots.txt`, and `sitemap.xml`.

Do not commit `.env.local` or secrets. `.env.example` contains only public site configuration.

## Edit portfolio content

- Profile details and external profile URLs: `src/data/profile.ts`
- Project descriptions, technical details, screenshots, and links: `src/data/projects.ts`
- Work history: `src/data/experience.ts`
- Education and certifications: `src/data/education.ts`
- Skills: `src/data/skills.ts`
- Homepage labels, summary stats, and future development topics: `src/data/home.ts` and `src/data/future.ts`
- Resume PDFs: `public/resume/` (the homepage identifies Data Analyst and Data Engineering PDFs by their filenames)
- Project screenshots and diagrams: `public/images/projects/`; update the corresponding project asset entries and descriptive alt text in `src/data/projects.ts`.

Keep project claims, numbers, and links grounded in verified source material. For images, use descriptive alt text that explains the visible diagram or dashboard without claiming results that are not documented.
