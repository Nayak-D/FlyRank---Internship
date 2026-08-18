# Dattu Nayak Portfolio

A futuristic personal portfolio website built with React, Vite, Tailwind CSS, and GSAP. The site showcases my profile, services, selected works, and contact section for recruiters, collaborators, and internship opportunities.

## Live URL

- Public deployment URL: to be set after deployment on Netlify or Vercel.
- For Vercel, the default subdomain usually appears as a lowercase, hyphenated URL such as `dattu-nayak.vercel.app`.

## Project Overview

This portfolio includes:

- A cinematic hero section with animated landing experience
- About section with skills and technology stack
- Services section with real professional offerings
- Portfolio showcase for selected projects
- Contact form and social links
- Responsive dark cyberpunk interface

## Deployment Notes

### Build command

```bash
npm install
npm run build
```

### Publish directory

```bash
dist
```

## DNS Walkthrough

DNS stands for Domain Name System. It is the system that turns a human-friendly name like `example.com` or `yourname.flyrank.ai` into an IP address that computers understand. Without DNS, the internet would be much harder to use because people would need to remember long numeric addresses instead of readable names.

When someone types a website address into a browser, the process starts with a DNS resolver. The resolver is the service that looks up the correct answer. It asks the relevant nameserver for the domain record. Nameservers are the servers that store DNS records and return the information needed to map the domain name to a server.

A CNAME record is a type of DNS record that points one domain name to another hostname. For example, if a website is hosted on Netlify or Vercel, a CNAME may tell the custom domain to route traffic to the hosting provider. In simple terms, it says: “This name should go to that target domain.”

In this portfolio project, when the FlyRank subdomain is assigned later, the DNS record will point the custom subdomain to the hosting platform. The browser then connects to that platform, the platform serves the site over HTTPS, and the browser shows the padlock when the certificate is valid.

The full flow is:

1. The user types a domain into the browser.
2. The browser asks a DNS resolver for the domain.
3. The resolver checks the correct nameserver.
4. The nameserver returns the DNS record.
5. The browser connects to the target host.
6. The host responds with the website over HTTPS.

This is why DNS matters: it connects a readable domain name to the actual server that hosts the website. A custom domain does not create a new site; it simply points traffic to the site that already exists.

## Technology Stack

- React
- Vite
- Tailwind CSS
- GSAP
- Framer Motion
- React Icons

## Repository and Deployment

This project is designed for GitHub-based deployment and custom-domain hosting through Netlify or Vercel. The public URL is the deliverable for the internship assignment, and the custom subdomain is added later when the capstone stage begins.
