# Week 8 - Wire One Real Thing

## Chosen feature

The portfolio has exactly one dynamic feature: a contact form on `contact.html`.

The form uses Netlify Forms on the free tier. The rest of the portfolio stays static. There is no chat feature, analytics feature, login, database, or second submission flow.

## What a backend means here

A backend is the part of a website that does work a plain HTML page cannot do by itself. In this case, the browser needs somewhere to send and store a submitted message. Netlify provides that service, so I do not need to build my own server or database.

## Data flow in plain words

1. A visitor opens the contact page and enters a name, email address, and message.
2. The browser submits the form with the name `portfolio-contact`.
3. Netlify detects the `data-netlify="true"` form during deployment and receives the POST request.
4. Netlify stores the submission in the site's Forms area and sends the configured notification email.
5. The visitor is redirected back to the contact page with a sent-state query string.

The hidden honeypot field helps reject simple automated submissions, and the name, email, and message fields are required in the browser before a request can be sent.

## Verification status

The form markup is wired and validated in both `contact.html` and `deploy_site/contact.html`. A real end-to-end test still requires a Netlify deployment with form detection enabled, a real submission, and a screenshot or inbox confirmation showing that the submission arrived.

## Submission evidence to collect

- Public Netlify URL for the deployed portfolio
- Screenshot of the completed form before submitting
- Screenshot of the Netlify Forms submission or notification email after submitting
- Optional screenshot of the successful redirect page

## Honest boundary

GitHub Pages serves the static HTML but does not process Netlify Forms. The contact feature is only live after this site is deployed on Netlify and form detection is enabled. Until that real test is complete, this artifact proves the wiring, not successful delivery.
