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

**CTA:** Open the refresh queue and inspect the top recommendations.

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

**CTA:** See how the ranking was validated.

**Still need to gather:** final notebook links; one readable chart per stage; a short explanation of the client-holdout split; a screenshot of the notebook output.

### 4. About

1. One-sentence working approach
2. What I care about: useful evidence, clear constraints, human decisions
3. Skills shown by the case: problem framing, feature discipline, ranking, validation, communication
4. Short working history / education block
5. Contact details

**CTA:** Start a conversation about a search or content decision.

**Still need to gather:** approved headshot; final bio; contact destination; links to GitHub and LinkedIn; confirmed name in the wordmark.

### 5. Contact

1. One-line invitation
2. Email / LinkedIn / GitHub
3. Optional availability note

**CTA:** Send an inquiry.

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

Use [dn-monogram.png](../assets/dn-monogram.png) as the favicon and compact mark. The `ND` monogram is a temporary handle-based mark; replace the letters with the confirmed initials before publishing.

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

Use real captures for proof and one consistent visual treatment for connective tissue.

| Image | Source / treatment | Purpose | Status |
|---|---|---|---|
| Ranked queue preview | Real crop from `outputs/refresh_queue_sample.csv` or its rendered table | Hero proof for the featured case | Need final capture |
| Action mix chart | Existing `outputs/charts/action_mix.svg` | Show how recommendations distribute across actions | Available |
| Confidence mix chart | Existing `outputs/charts/confidence_mix.svg` | Explain review priority and uncertainty | Available |
| Top feature importance | Existing `outputs/charts/top_feature_importance.svg` | Make the model interpretable | Available |
| Validation comparison | New real capture from the model report/notebook | Establish baseline vs model honestly | Need final crop |
| Process diagram | Simple brand-colored diagram, no generated scene | Connect the method sections | Need to create |
| Portrait | Real photo, neutral crop | Human context on About page | Need to gather |
| Monogram | [nd-monogram.svg](../assets/nd-monogram.svg) | Favicon, navigation, social preview fallback | Ready |

### Rejection note

I rejected a generated abstract "AI analytics dashboard" hero because it would imply a product interface and fabricate proof that does not exist in the case study. The portfolio should lead with the real ranked queue and measured comparison; connective graphics can explain the method, but they should not impersonate evidence.

## Submission checklist

- [x] One-line claim
- [x] Ordered sections for each planned page
- [x] Named CTA on every page, all laddering to one action
- [x] Honest still-need-to-gather list
- [x] One heading font and one body font
- [x] Four-color palette with hex codes
- [x] Simple logo/favicon asset
- [x] Two-line style note for the AI workspace
- [x] Real-capture image plan and rejection note
- [ ] Add final public URLs to the internship portal
- [ ] Attach screenshots and photos under Files
- [ ] Paste the style note into the Claude Project
- [ ] Post this file and the asset to the track thread
