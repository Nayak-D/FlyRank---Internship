# Week 7 - Mobile Fix Log

## Public reference URL

https://nayak-d.github.io/FlyRank---Internship/

This current GitHub Pages URL serves the capstone paper from `docs/`; it is not yet the deployed root portfolio. The portfolio needs its own Netlify or Vercel URL for the Week 7 live-site checkpoint.

## Audit scope

Checked the published static portfolio structure, shared stylesheet, contact page, chart/paper routes, and repository links. The audit covered the existing mobile breakpoint, navigation behavior, table overflow, form behavior, image sizing, and public-page availability.

## Before / after fixes

| Before | After | Why it matters |
|---|---|---|
| Navigation links relied on text dimensions and had no minimum touch target. | Added a 44px minimum height and mobile padding to every navigation link. | Makes the primary navigation easier to tap on a phone. |
| Tables were `width: 100%` but had no mobile overflow behavior. | Tables now become horizontally scrollable below 720px and long links can wrap. | Prevents wide evidence tables from breaking the page viewport. |
| Mobile contact inputs inherited the browser font size. | Contact inputs and textarea use 16px on mobile. | Prevents iOS Safari from zooming the page when a field receives focus. |
| Mobile header alignment was not explicitly controlled. | Header items align to the start on narrow screens and navigation uses the full available width. | Keeps the brand and navigation from compressing into an awkward row. |

## Existing strengths confirmed

- The shared stylesheet already collapses `.section-grid` to one column below 720px.
- Images use `max-width: 100%` and `display: block`, so they do not exceed their containers.
- The live portfolio returned HTTP 200 during this audit.
- The public paper includes real chart assets with descriptive alt text.
- The repository and case-study links use public GitHub destinations.

## Evidence status

Automated checks passed for the live response, mobile breakpoint, tap-target rule, table overflow, iOS form sizing, and matching root/deploy stylesheets.

A real physical-phone check still needs to be performed by opening the live URL on a phone, tapping every navigation link, and capturing before/after screenshots. A design-review checkpoint also needs a real reviewer response to the two questions: “In ten seconds, what do I do?” and “Would you believe I am good at it?”

## Remaining evidence to gather

- Phone screenshot of the live homepage with the URL visible
- Phone screenshot of the contact page and navigation after the fixes
- Reviewer feedback with must-fix versus nice-to-have sorting
- Confirmation that every public link opens on the phone
