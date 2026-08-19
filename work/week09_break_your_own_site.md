# Week 9 - Break Your Own Site

## Scope

I tested the static portfolio and its one dynamic feature, the Netlify Forms contact form. The public repository and paper URL were reachable during the audit:

- Portfolio repository: https://github.com/Nayak-D/FlyRank---Internship
- Public paper: https://nayak-d.github.io/FlyRank---Internship/

The root portfolio still needs its own Netlify or Vercel deployment URL before launch claims can be completed.

## Where it breaks: test log

| Test | Result | Triage |
|---|---|---|
| Submit the form with every field empty | Browser `required` validation stops the request. No empty message is sent. | Fixed / verified in markup |
| Submit an invalid email such as `not-an-email` | Browser `type="email"` validation stops the request. | Fixed / verified in markup |
| Submit with a long message | Textarea grows vertically and does not have a fixed-width overflow problem. | Fixed / verified in CSS |
| Submit twice quickly | The submit button is disabled and changes to `Sending...` after the first submit event. | Fixed in source; requires a real deployed Netlify test |
| Successful submit | Netlify redirects to `contact.html?sent=true`; the page now displays a “Thanks - your message was sent” status. | Fixed in source; requires a real inbox confirmation |
| Honeypot field filled | The hidden `bot-field` is included for Netlify spam filtering. | Fixed / configured |
| Open in a narrow viewport | Navigation links have 44px minimum touch targets; tables scroll horizontally below 720px; sections collapse to one column. | Fixed / verified in CSS |
| Open a page with a wide table or long repository URL | Table overflow is contained and long links can wrap. | Fixed / verified in CSS |
| Click navigation, repository, paper, dataset, chart, and case-study links | Static source paths and public GitHub/GitHub Pages destinations were checked. | Fixed / source-checked |
| Load an unavailable Netlify form endpoint | GitHub Pages cannot process Netlify Forms. The form is only live after Netlify deployment with form detection enabled. | Known limitation |
| Search my name/site | Search visibility cannot be claimed from this local audit; the public GitHub Pages paper is reachable by URL, but indexing is outside the repo's control. | Known limitation |
| Speed check | No formal Lighthouse/PageSpeed score is recorded in the repo yet. | Known limitation |
| Custom domain, analytics, graduate badge | Not configured in this repository. | Known limitation |
| Real phone and unfamiliar browser | Source-level responsive checks are complete, but a physical-phone and second-browser pass still needs screenshots. | Known limitation |

## Fix-now changes made

1. Added page titles, descriptions, canonical URLs, Open Graph titles/descriptions/images, and Twitter card metadata to all root portfolio pages and the deploy copy.
2. Added a visible success status after the Netlify redirect.
3. Disabled the submit button after the first submit event to reduce accidental duplicate submissions.
4. Kept browser-native empty and invalid-email validation as the first error boundary.
5. Preserved the existing mobile fixes: 44px navigation targets, contained tables, wrapping links, responsive sections, and 16px mobile form fields.

## Known limitations kept visible

- The root portfolio is not independently deployed to Netlify or Vercel yet, so Netlify form delivery and inbox receipt are not proven here.
- The current public GitHub Pages URL serves the capstone paper from `docs/`, not the root portfolio.
- No real phone screenshot, PageSpeed score, search-index result, custom domain, analytics screenshot, or hardening-review response is claimed by this log.

## Hardening review record

Reviewer: `[name or relationship]`

Date: `[YYYY-MM-DD]`

Question 1: “In ten seconds, what do I do?”

Response: `[real reviewer response]`

Question 2: “Would you believe I am good at it?”

Response: `[real reviewer response]`

Must-fix feedback: `[record real feedback here]`

Nice-to-have feedback: `[record real feedback here]`

Evidence after fixes: `[attach before/after screenshots and live URL]`
