# Portfolio Through-Line + Identity Kit

**Working name:** DN Search Intelligence
**Purpose:** A submission-ready content and visual brief for the portfolio build.

## One-line claim

> I turn messy search data into ranked, reviewable actions so teams can refresh the right content first.

This is a decision-support claim: it describes the work without claiming causal impact or access to Google's ranking algorithm.

## One action

**Primary CTA:** Review the ranked refresh queue.

Every page points toward the same action: open the case study, inspect the evidence, and review the ranked queue. Secondary actions support trust but do not compete with it.

## Content map

### 1. Home

1. Claim and short proof statement
2. Featured case: **Content Refresh Opportunity Model**
3. Three proof signals: `30,000` page snapshots scored; `0.240 -> 0.740` Precision@50; human review remains in the loop
4. Short method strip: frame -> score -> validate -> act
5. Selected work / supporting experiments
6. About and contact footer

**CTA:** Review the ranked refresh queue.

**Still need to gather:** final portfolio URL; a clean screenshot of the queue; one sentence about the intended reviewer/user; confirmed personal name and contact link.

### 2. Featured case study: Content Refresh Opportunity Model

1. Decision: which pages deserve refresh attention first?
2. Context and safe data boundary
3. Baseline rule and why it is a fair comparison
4. Model comparison and validation split
5. Ranked queue preview with action labels
6. Interpretation: what the strongest signals mean in plain language
7. Human review workflow and limitations
8. Reproducibility links

**CTA:** Review the ranked refresh queue and inspect the top recommendations.

**Still need to gather:** cropped queue screenshot; chart exports at portfolio resolution; public repository URL; notebook or demo URL; final model version and rerun date; one reviewer/editor quote if available.

**Available proof now:** the existing [model report](../outputs/model_report.md), including the baseline/model comparison, top features, queue counts, and practical-use warning.

### 3. Method / notebook page

1. Research question
2. Task framing as scoring and ranking
3. Data contract and leakage guardrails
4. Signal audit
5. Baseline and model
6. Validation audit
7. Action playbook

**CTA:** Review the ranked refresh queue; supporting link: see how the ranking was validated.

**Still need to gather:** final notebook links; one readable chart per stage; a short explanation of the client-holdout split; a screenshot of the notebook output.

### 4. About

1. One-sentence working approach
2. What I care about: useful evidence, clear constraints, human decisions
3. Skills shown by the case: problem framing, feature discipline, ranking, validation, communication
4. Short working history / education block
5. Contact details

**CTA:** Review the ranked refresh queue; supporting link: start a conversation about a search or content decision.

**Still need to gather:** approved headshot; final bio; contact destination; links to GitHub and LinkedIn; confirmed name in the wordmark.

### 5. Contact

1. One-line invitation
2. Email / LinkedIn / GitHub
3. Optional availability note

**CTA:** Review the ranked refresh queue; supporting link: send an inquiry.

**Still need to gather:** preferred email, public profile links, and the final thank-you/confirmation state.

## Identity kit

### Type

- **Heading:** Space Grotesk, Google Fonts, weights 500 and 600.
- **Body:** Source Sans 3, Google Fonts, weights 400 and 600.

Use Space Grotesk for the wordmark, page titles, and short labels. Use Source Sans 3 for paragraphs, tables, captions, and evidence notes. No additional typefaces.

### Palette

| Role | Hex | Use |
|---|---|---|
| Main / signal teal | `#176B87` | Links, primary buttons, data highlights, selected states |
| Near-black text | `#17212B` | Headings, body text, icons |
| Near-white background | `#F7F8F5` | Page background and quiet surfaces |
| Single accent / amber | `#D99A2B` | Small status markers and one key emphasis at a time |

The palette is intentionally restrained: teal gives the work a technical signal, while amber is reserved for attention rather than decoration.

### Logo / favicon

Use [dn-monogram.png](../assets/dn-monogram.png) as the current favicon and compact portfolio mark. It is already used by the published paper and portfolio surfaces; replace it only if the final personal wordmark changes.

### Two-line style note

> Space Grotesk for headings and Source Sans 3 for body copy; use `#176B87` as the main color, `#17212B` for text, `#F7F8F5` for the background, and `#D99A2B` sparingly as the accent.
> The mood is calm, precise, and quietly technical so the evidence and case studies remain the loudest thing on the page.

### Reusable build note

- Headings: Space Grotesk 500/600, compact line-height.
- Body: Source Sans 3 400, comfortable reading measure.
- Small labels: Source Sans 3 600, uppercase only when useful.
- Links and primary actions: `#176B87`; keep visited states readable without adding a fifth color.
- Leave generous whitespace around evidence; keep charts and screenshots legible rather than decorative.

## Final image set

The set is deliberately small. Real work evidence carries the case study; one simple brand-colored diagram carries the connective tissue; no generated image is used as proof.

### Keepers

| Image | Source / treatment | Purpose | Decision |
|---|---|---|---|
| Ranked queue preview | Real crop from `outputs/refresh_queue_sample.csv` or its rendered table | Hero proof for the featured case | Use a clean, legible capture; do not replace with AI art |
| Action mix chart | Existing `outputs/charts/action_mix.svg` | Show how recommendations distribute across actions | Keep as real model output |
| Confidence mix chart | Existing `outputs/charts/confidence_mix.svg` | Explain review priority and uncertainty | Keep as real model output |
| Top feature importance | Existing `outputs/charts/top_feature_importance.svg` | Make the model interpretable | Keep as real model output |
| Trend distribution chart | Existing `outputs/charts/trend_distribution.svg` | Give the case study a compact view of the underlying signal | Keep only if it remains readable at portfolio width |
| Validation comparison | Real crop from `outputs/model_report.md` or the executed notebook | Establish baseline vs model honestly | Capture the measured `0.240 -> 0.740` Precision@50 comparison |
| Process diagram | [portfolio-process.svg](../assets/portfolio-process.svg) | Connect frame -> score -> validate -> act | Use the restrained identity-kit treatment |
| Portrait | Real photo, neutral crop | Human context on About page | Gather and use a real photo; never generate this |
| Monogram | [dn-monogram.png](../assets/dn-monogram.png) | Favicon, navigation, social preview fallback | Keep as the compact mark |

### Real-capture decisions

- The ranked queue, charts, validation comparison, notebook outputs, and any case-study screenshots must be real captures because they are evidence of actual work.
- The portrait must be a real photograph because it represents the person, not an abstract concept.
- The process diagram is the only newly created connective image. It uses the existing teal, near-black, near-white, and amber palette and contains no fabricated metrics or interface.

### Still need to gather

- A final cropped queue screenshot with readable action labels.
- A final validation screenshot at portfolio resolution.
- An approved real portrait.

### Rejection note

I rejected a generated abstract "AI analytics dashboard" hero because it would imply a product interface and fabricate proof that does not exist in the case study. It also competed with the actual queue instead of helping a reviewer understand it. The portfolio should lead with the real ranked queue and measured comparison; the single process diagram explains the method without impersonating evidence.

## Submission checklist

- [x] One-line claim
- [x] Ordered sections for each planned page
- [x] Named CTA on every page, all laddering to one action
- [x] Honest still-need-to-gather list
- [x] One heading font and one body font
- [x] Four-color palette with hex codes
- [x] Simple logo/favicon asset
- [x] Two-line style note for the AI workspace
- [x] Final keeper set mapped to the content map
- [x] Real-capture decisions and rejection note
- [x] One consistent connective graphic
- [ ] Add final public URLs to the internship portal
- [ ] Attach screenshots and photos under Files
- [ ] Paste the style note into the Claude Project
- [ ] Post this file and the asset to the track thread
