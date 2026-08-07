# Week 4 - Stack Choice + Empty but Live

## My constraints

- **Budget:** free tools only.
- **Skill level:** beginner who is learning HTML, CSS, Git, and deployment; I need to be able to explain every part.
- **Portfolio needs:** a home page, one featured content-refresh case study, a method/notebook page, About, and Contact. The site must show readable long-form analysis, real charts and screenshots, and links to notebooks and the code repository.
- **Dynamic needs at launch:** no. A contact link is enough at first; there is no login, database, dashboard, or server-side computation to maintain.
- **Content source:** the identity kit, case studies, model report, and content map already live in this repository.

## Three roads

| Option | How I would build it | Free host | Backend now? | Fit and real trade-off |
|---|---|---|---|---|
| **1. No-code** | Build the pages in Carrd or Framer with visual blocks and upload screenshots/charts. | Carrd or Framer free tier | No | Fastest for a visual one-page site, but less useful for learning how the site works and less flexible for long-form technical case studies and repo-linked evidence. |
| **2. Plain HTML/CSS with AI** | Write small semantic HTML pages and one shared CSS style, use GitHub for versioning, and deploy the root folder by Netlify drag-and-drop. | Netlify | No | Best fit for this portfolio: readable long-form content, real images, charts, notebook links, and a code repo. The trade-off is that I must maintain the markup and styles myself. |
| **3. Framework** | Build a React/Next.js site with reusable components, a router, and a build step. | Vercel or Cloudflare Pages | No at launch; optional later | More powerful for dynamic filtering, CMS data, or interactive demos, but adds dependencies, build errors, and framework maintenance before the portfolio needs them. |

## Pressure test

### If I choose the simplest option

With no-code, I can publish quickly, but I may hit limits when I need a long case study, custom evidence layout, or a clean link between the portfolio and repository. I would also learn less about the actual page structure. The failure mode is not that the site cannot launch; it is that the proof becomes harder to present precisely.

### If I choose the most powerful option

With a framework, I would maintain dependencies, a package manager, a build command, routing, and deployment configuration. That is useful only when the site has real interactive behavior. For an initial portfolio of readable case studies, it is extra surface area and extra ways to stall.

### Does the chosen road show the work?

Yes. Plain HTML/CSS can give the case study the reading width, image treatment, chart embeds, repository links, and notebook links it needs. It keeps the evidence legible instead of hiding it behind a component system.

### Can I finish and maintain it?

Yes. I can edit a page directly, preview it locally, commit the change, and redeploy the same folder. There is no backend, database, build pipeline, or paid service to keep alive. If I later need interactive model demos, I can add one contained embed or move to a framework after the content proves that the extra complexity is justified.

## Decision

I chose **plain HTML/CSS with AI assistance, hosted on Netlify**. It is free, matches the way my work needs to be shown, and gives me a real site I can explain rather than a tool I only know how to click. I did not choose no-code because the case studies need precise long-form evidence and I want to learn the page structure. I did not choose a framework because there is no dynamic requirement at launch and the maintenance cost would be larger than the current problem. The chosen stack is small enough that I can finish it and maintain it.

## Empty-but-live checkpoint

- **Starter page:** [`index.html`](../index.html)
- **Chosen host:** Netlify
- **Backend:** not needed at launch
- **Live URL:** add the Netlify URL here after deployment
- **Second-device check:** open the live URL on a phone and attach the screenshot in the internship portal

## Submission note

The deliverable link should be the live Netlify URL, not only the GitHub repository URL. Attach a screenshot of the live page, preferably from a phone. The GitHub repository and this rationale are supporting evidence.