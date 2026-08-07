# FL-06: Personal Agent Design

## 1. Job to be done

**Agent name:** Portfolio Research Scout

**Core job:** Help me build, ground, and explain the DN Search Intelligence portfolio by scanning my existing notes, case evidence, charts, and repo files; then surface the strongest evidence, missing proof, safe wording, and next build steps.

This is one job done well: make the portfolio build less scattered by turning the existing work into a list of concrete edits, evidence summaries, and safe claims.

## 2. User and usage frequency

**User:** Me, the portfolio owner and capstone author working in the `FlyRank---Internship` repo.

**Usage pattern:**
- Daily during the build window.
- On every revision pass when I need the latest evidence pulled from repo files.
- Before I publish a page or write a submission note.

**How I will use it:**
- Ask it to summarize the current case evidence in plain language.
- Ask it to compare the portfolio plan to the live pages and tell me what is missing.
- Ask it to check wording so I do not overclaim.
- Ask it to propose the next 1-2 build actions.

## 3. Tools and data needed

### Required data sources

1. `work/portfolio_identity_content_map.md` — portfolio claim, sitemap, evidence checklist.
2. `outputs/model_report.md` — model metrics, comparison, queue counts, validation details.
3. `outputs/refresh_queue_sample.csv` — concrete ranked queue examples.
4. `outputs/charts/*.svg` — charts used for proof.
5. `work/week04_stack_choice.md` — stack rationale and deployment choice.
6. `work/fl04_automation_workflow_v2.md` — workflow logic and evidence process.
7. `work/fl05_agent_mcp_explainer.md` — agent/connector understanding and deployment check hints.
8. `work/assignment_submission_packets.md` — submission formatting and deliverable expectations.
9. `index.html`, `case-study.html`, `method.html`, `about.html`, `contact.html`, `styles.css` — current page content and navigation.

### Tools required

- Local file reader: access markdown, HTML, CSV, and SVG filenames and content.
- Text summarization / question-answering model: for grounding on the existing evidence.
- Simple search/retrieval tool: to find the latest mentions of required terms and metrics in the repo.
- (Optional) Markdown writer: to draft the spec and short portfolio text.

### Access plan

**Primary plan:** use a scripted agent on the local machine with Python and a model API or local LLM.

- The repo is already on disk, so the agent can read the exact files directly.
- If I have an OpenAI key, the script will use GPT-4.1 via API for the reasoning and summarization tasks.
- If I do not have an API key or want a fully free run, the same script can use a local open-source model such as GPT4All or llama-cpp-python for the basic retrieval and summarization.

**Alternative plan:** if I later have Claude Project access, I can move this design into a Claude Project with a GitHub repo connector and a file reader skill.

## 4. Draft instructions for the agent

> You are the DN Search Intelligence Portfolio Research Scout. Your job is to help the author turn the current repo evidence into a deployable portfolio. Always ground your answers in the repo files and avoid inventing numbers, metrics, or claims.

### Instruction rules

- First, find the source files that mention the requested topic.
- When asked for evidence, quote exact metrics from `outputs/model_report.md` or the portfolio notes.
- When asked to check wording, flag any claim that sounds like a causal result, a proprietary algorithm, or a client-specific promise.
- If a file is missing or a page is incomplete, say exactly which page and why.
- Do not edit or deploy files unless the user explicitly asks you to generate a patch.

### What the agent should do for each request

- If the user asks for a summary, produce a concise answer with bullet points.
- If the user asks for missing proof, compare the portfolio plan to the current pages and list gaps.
- If the user asks for a next build step, suggest one concrete thing and the exact file(s) to change.
- If the user asks for safe language, return a revised sentence and the reason it is safer.

## 5. Five evaluation cases

### Eval case 1: Evidence summary
**Prompt:** “Summarize the featured Content Refresh Opportunity Model case in one short paragraph using the evidence in `outputs/model_report.md` and `work/portfolio_identity_content_map.md`.”

**Pass condition:** The answer cites 30,000 scored rows, the selected random forest model, Precision@50 improvement, and the queue’s human-review orientation.

### Eval case 2: Missing-page check
**Prompt:** “Compare the current live pages (`index.html`, `case-study.html`, `method.html`, `about.html`, `contact.html`) to the portfolio sitemap in `work/portfolio_identity_content_map.md`. What is not yet covered?”

**Pass condition:** The agent identifies missing evidence or missing content sections (for example, no headshot, no notebook link, no reviewer reaction note, or no specific proof images). It does not invent missing pages.

### Eval case 3: Safe wording check
**Prompt:** “Rewrite this claim so it is safe for the portfolio: ‘The model predicts Google ranking and automatically refreshes content that will rank higher.’”

**Pass condition:** The rewrite removes causal and overclaim language and replaces it with truthful decision-support wording.

### Eval case 4: Data-grounded quote extraction
**Prompt:** “From the repo evidence, what exact metrics should I put on the homepage to show the model’s strongest result?”

**Pass condition:** The agent returns numbers such as `30,000 page snapshots scored`, `0.240 → 0.740 Precision@50`, and `3,605 high-confidence refresh recommendations` with source file references.

### Eval case 5: Build-action suggestion
**Prompt:** “I need one next build action that takes less than 60 minutes and moves the portfolio closer to a live deploy.”

**Pass condition:** The agent recommends a concrete action such as “add the `link rel=stylesheet` reference to `index.html` and verify navigation works,” or “add the missing queue screenshot to `case-study.html`,” referencing current repo content.

## 6. Risks and guardrails

### Must confirm before acting

- Confirm the exact source file for any metric or claim.
- Confirm whether the user wants a draft, a patch, or direct edits.
- Confirm before suggesting text that sounds like a causal model claim.
- Confirm before using any email or personal contact information.

### Must never do

- Never invent data, metrics, or model results.
- Never claim access to Google ranking algorithms or proprietary search systems.
- Never publish or deploy files without explicit user authorization.
- Never use private repo secrets, API keys, or credentials automatically.
- Never write portfolio copy that sounds like a guaranteed outcome.

### Guardrail examples

- “I only know what is in these repo files: `outputs/model_report.md`, `work/portfolio_identity_content_map.md`, and the HTML pages.”
- “I will not rewrite numbers unless the user gives me a file with the source evidence.”
- “If a proposed sentence contains ‘predicts rankings’ or ‘automatically refreshes’, I will flag it and suggest safer language.”

## 7. Build platform choice and justification

**Chosen platform:** Scripted agent on the scripting path using local file access and a model API or local open-source LLM.

### Why this platform?

- I already have the repo locally, so the agent can read the exact files directly.
- A script is the smallest setup: one Python program that loads the repo, answers questions, and writes drafts.
- It avoids needing a paid Claude Project connector or a custom GPT deployment before I have a working design.
- It is realistic to build in about 10 hours: file reader, simple retrieval, prompt templates, and a small QA loop.

### How I can actually run it

- Use Python in the existing repo environment.
- If I have an OpenAI key, call GPT-4.1 for the reasoning tasks.
- If not, use a local open-source model such as GPT4All or llama-cpp-python for the same retrieval flow.
- The repo gives me the repo files, the model report, and the portfolio plan without needing extra connectors.

### Why not the alternatives?

- **Claude Project with connectors and skills:** strong if I already had a paid Claude account, but it requires setting up repo connectors and may be heavier than the immediate need.
- **Custom GPT on OpenAI:** good for chat, but less convenient for direct repo file grounding than a local scripted agent reading the files itself.
- **n8n agent workflow:** too much orchestration for a single build-stage assistant; it is better for multi-tool automation than for this scoped design.

## 8. Success criteria for the design

The design succeeds if it:
- keeps the agent focused on a single job: research-scoping and portfolio evidence review,
- grounds every answer in real repo files,
- defines at least five realistic evaluation cases,
- names precise guardrails for metrics, claims, and deployment,
- chooses a build platform that matches the current local repo access.

## 9. Next-step implementation plan

1. Create a small Python script `work/agent/research_scout.py`.
2. Add a file reader for markdown, HTML, CSV, and SVG paths.
3. Use a prompt template for source-grounded summarization.
4. Build one user intent: evidence summary, missing proof list, safe wording check.
5. Test the agent on the five eval cases above.

---

*This document is the FL-06 design spec for the DN Search Intelligence portfolio agent. It is intentionally scoped to one practical build: a grounded research scout for the portfolio build, not a full autonomous deploy agent.*