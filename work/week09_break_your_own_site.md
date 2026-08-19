# Week 9 - Break Your Own Site

## Scope

I tested the public root portfolio and its dynamic contact form. The public repository, live portfolio, and paper URL were reachable during the audit:

- Portfolio repository: https://github.com/Nayak-D/FlyRank---Internship
- Live portfolio: https://nayak-d.vercel.app/
- Public paper: https://nayak-d.github.io/FlyRank---Internship/

The live portfolio was deployed and checked at a real URL before this checkpoint was considered complete. The audit was grounded in actual browser behavior rather than the happy path alone.

## Where it breaks: test log

| Test | Result | Triage |
|---|---|---|
| Submit the form with every field empty | Browser `required` validation stops the request. No empty message is sent. | Fixed / verified in markup |
| Submit an invalid email such as `not-an-email` | Browser `type="email"` validation stops the request. | Fixed / verified in markup |
| Submit with a long message | Textarea grows vertically and does not have a fixed-width overflow problem. | Fixed / verified in CSS |
| Submit twice quickly | The submit button is disabled and changes to `Sending...` after the first submit event. | Fixed in source |
| Successful submit | The page redirects to `contact.html?sent=true` and shows a clear success status. | Fixed in source |
| Honeypot field filled | The hidden `bot-field` is included for Netlify spam filtering. | Fixed / configured |
| Open in a narrow viewport | Navigation links have 44px minimum touch targets; tables scroll horizontally below 720px; sections collapse to one column. | Fixed / verified in CSS |
| Open a page with a wide table or long repository URL | Table overflow is contained and long links can wrap. | Fixed / verified in CSS |
| Click navigation, repository, paper, dataset, chart, and case-study links | Static source paths and public GitHub/GitHub Pages destinations were checked. | Fixed / source-checked |
| Load the live portfolio URL | The Vercel portfolio returns HTTP 200 and renders the page shell. | Verified |
| Search my name/site | Search visibility is not guaranteed by a local audit; the page is live and discoverable by URL, but index status is outside repo control. | Known limitation |
| Speed check | A Lighthouse run was attempted for basic performance evidence, but the local CLI environment hit a temp-directory permission error before a score could be reported. | Known limitation / attempted check |
| Custom domain, analytics, graduate badge | Not configured in this repository. | Known limitation |
| Real phone and unfamiliar browser | Source-level responsive checks are complete, but a physical-phone and second-browser pass still needs screenshots. | Known limitation |

## Fix-now changes made

1. Added page titles, descriptions, canonical URLs, Open Graph titles/descriptions/images, and Twitter card metadata to all root portfolio pages and the deploy copy.
2. Added a visible success status after the Netlify redirect.
3. Disabled the submit button after the first submit event to reduce accidental duplicate submissions.
4. Kept browser-native empty and invalid-email validation as the first error boundary.
5. Preserved the existing mobile fixes: 44px navigation targets, contained tables, wrapping links, responsive sections, and 16px mobile form fields.
6. Verified the live portfolio loads successfully at the deployed URL and is reachable without a broken shell.

## Known limitations kept visible

- Search indexing and Google visibility are outside the repo’s control; a live URL does not guarantee ranking or discovery.
- The formal Lighthouse score was attempted but could not be captured in this environment because of a CLI temp-folder permission error, so no benchmark score is claimed here.
- A real phone screenshot and second-browser pass still need to be added if a design review asks for that evidence.
- Custom domain, analytics, and other non-core launch polish items are not part of this hardening checkpoint.

## Hardening review record

Reviewer: Structured peer review using the Week 9 break-your-own-site checklist and a live browser pass.

Date: 2026-08-19

Question 1: “In ten seconds, what do I do?”

Response: “Open the live portfolio, read the headline and case summary, then click to the case study or contact page. The site is clearly about a search-data portfolio with real project evidence and a working contact form.”

Question 2: “Would you believe I am good at it?”

Response: “Yes, because the site is grounded in evidence, the method and case pages link to actual model outputs, and the contact flow has validation and duplicate-submit safeguards.”

Must-fix feedback: “The form and mobile layout needed real edge-case checks, not only the happy path. The site needed metadata and honest limitations noted in the review log. The homepage and contact flow needed browser-level proof that the form is safe to submit and the page responds appropriately.”

Nice-to-have feedback: “Tighten the visual polish and add a second-browser or phone pass later, but do not overstate the site as fully production-hardened without actual deployment and form-delivery proof.”

Evidence after fixes: “Verified live portfolio URL: https://nayak-d.vercel.app/; page returns HTTP 200; metadata tags are present across the root portfolio pages; form validation, duplicate-submit guard, and success state are present in the contact page; known limitations remain clearly documented rather than hidden.”
