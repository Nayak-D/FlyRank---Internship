# DNS Walkthrough for Custom Domain

## What is DNS?
DNS stands for Domain Name System. It is the system that converts a human-readable website name like `yourname.flyrank.ai` into the numeric address that computers use to find the site. When someone types a web address into the browser, their computer asks a DNS resolver for the address, and the resolver follows a chain of records until it finds the answer.

## What is a CNAME record?
A CNAME record is a DNS record type that points one domain name to another domain name. It does not store an IP address directly. Instead, it says "this name is an alias for that name." For a custom domain on Netlify, the CNAME record tells the DNS system that `yourname.flyrank.ai` is an alias for the Netlify site domain, and Netlify will serve the website.

## What value will the CNAME hold?
When the FlyRank subdomain is provisioned, the CNAME record should point to the Netlify site address. For example:

- **Name:** `yourname`
- **Type:** `CNAME`
- **Value:** `nayak-d-search-intelligence.netlify.app`

If the FlyRank team gives the exact target value, use that instead; the key idea is the custom domain points to the Netlify site name.

## What happens when someone visits the address?
1. The user types `yourname.flyrank.ai` into the browser.
2. The browser asks a DNS resolver for the record for `yourname.flyrank.ai`.
3. The resolver checks the FlyRank nameservers and finds the CNAME record.
4. The CNAME record says the name is an alias for the Netlify site domain.
5. The resolver then looks up the Netlify target domain and gets the actual address to connect to.
6. The browser connects to Netlify’s server and requests the page.
7. Netlify responds with the website files over HTTPS.

## Why this is the right setup
- A CNAME is the right record when a subdomain (`yourname.flyrank.ai`) points to a host-managed service (`*.netlify.app`).
- This keeps the site hosted on Netlify while the custom domain points to it.
- When the DNS record is active, HTTPS is automatic because Netlify manages the SSL certificate for the custom domain.

## What to check after the record is added
- The browser can load `yourname.flyrank.ai` without errors.
- The padlock appears, meaning HTTPS is active.
- The site content matches the deployed Netlify site.

## What does not change later?
The site build does not change when a custom domain is added. The same deployed files stay on Netlify. The custom domain is only a pointer to the hosted site, so deployment and updates continue exactly as before.
