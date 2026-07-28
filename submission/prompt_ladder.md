# Prompt Ladder

## Task

This ladder uses a real task from the FL-01-style audit in [work/notebooks/w02_ml_task_framing.ipynb](../work/notebooks/w02_ml_task_framing.ipynb): framing the content-refresh opportunity problem as an ML task for the starter dataset.

The real decision is simple: help a reviewer decide which pages are worth refreshing first.

---

## Baseline run

### Prompt

Help me frame this ML task.

### Output

You could treat this as a classification problem where you predict whether a page is declining. That would be a simple way to approach it.

### Notes

- What changed in the prompt: Nothing; this is the weak starting point.
- What improved in the output: Nothing useful happened. The answer was generic and easy to ignore.
- What still failed: It did not mention the real product goal, the reviewer workflow, or the dataset signals.
- What I would try next: Add a clearer goal so the model stops defaulting to generic classification language.

---

## Version 1 — Add a clearer goal

### Prompt

Help me frame this ML task for a content-refresh ranking problem so a reviewer can decide which pages are worth refreshing first.

### Output

This is best framed as a ranking task because the goal is to order pages by refresh priority rather than simply predict a yes/no label. A reviewer needs a prioritized queue of pages that deserve attention first.

### Notes

- What changed in the prompt: I made the goal more specific and tied it to the real decision.
- What improved in the output: The model stopped treating the task like a generic classification exercise and started talking about ordering and prioritization.
- What still failed: It still did not mention the actual data signals or the proxy label, so the answer remained a bit abstract.
- What I would try next: Define the audience more clearly so the answer fits the notebook and the human reviewer.

---

## Version 2 — Add a defined audience

### Prompt

Help me frame this ML task for a content-refresh ranking problem so a reviewer can decide which pages are worth refreshing first. Write the answer for a notebook and a human reviewer.

### Output

This should be framed as a scoring and ranking problem because a reviewer needs an ordered list of pages by refresh opportunity, not just a binary outcome. The model should estimate relative priority so the reviewer can act efficiently.

### Notes

- What changed in the prompt: I specified the audience as both a notebook reader and a human reviewer.
- What improved in the output: The response became more practical and more tied to decision support rather than theory.
- What still failed: This did not help much by itself. The output was still too general and did not yet sound grounded in the actual dataset.
- What I would try next: Add real context from the dataset and the actual proxy definition.

---

## Version 3 — Add real context

### Prompt

Help me frame this ML task for a content-refresh ranking problem using the starter dataset. Use the observable proxy declining_visible = (trend_direction == 'down') & (impressions_90d >= 100). Make the answer specific to the task.

### Output

This task is best framed as a scoring and ranking problem using the starter dataset. A practical proxy is declining_visible = (trend_direction == 'down') & (impressions_90d >= 100), which identifies pages that are both visible and declining. The model should rank pages by refresh opportunity based on that proxy and related signals.

### Notes

- What changed in the prompt: I added real context from the dataset and the actual proxy definition.
- What improved in the output: The answer became much more concrete and much less generic. It now sounded like it belonged to this project rather than any project.
- What still failed: The output was still a little loose and did not yet have the clean structure a notebook needs.
- What I would try next: Force a specific output format so the answer is easier to reuse and compare.

---

## Version 4 — Add a specified output format

### Prompt

Help me frame this ML task for a content-refresh ranking problem using the starter dataset. Use the observable proxy declining_visible = (trend_direction == 'down') & (impressions_90d >= 100). Write the answer in this format:

1. Task type
2. Target or proxy
3. Success metric
4. Unit of analysis
5. Why ML beats a fixed rule

### Output

1. Task type: scoring and ranking.
2. Target or proxy: predict a refresh-priority score, using the observable proxy declining_visible = (trend_direction == 'down') & (impressions_90d >= 100).
3. Success metric: precision@k, such as precision@20, measured against the proxy set.
4. Unit of analysis: one page snapshot from the starter dataset.
5. Why ML beats a fixed rule: the value of a page depends on combinations of signals rather than one hard threshold.

### Notes

- What changed in the prompt: I gave the model a strict structure to follow.
- What improved in the output: The answer became notebook-ready, easier to read, and much more useful for submission.
- What still failed: The structure helped a lot, but it also made the response slightly rigid and less natural in tone.
- What I would try next: Add constraints so the model avoids generic phrasing and stays sharply grounded in the dataset.

---

## Version 5 — Add constraints and verification requirements

### Prompt

Help me frame this ML task for a content-refresh ranking problem using the starter dataset. Use the observable proxy declining_visible = (trend_direction == 'down') & (impressions_90d >= 100). Write the answer in this format:

1. Task type
2. Target or proxy
3. Success metric
4. Unit of analysis
5. Why ML beats a fixed rule

Constraints:
- Do not use generic advice.
- Make the answer specific to this dataset and this decision use case.
- Keep it concise and notebook-ready.
- Do not present it as a pure yes/no classification problem.

### Output

1. Task type: scoring and ranking.
2. Target or proxy: predict a refresh-priority score, using the observable proxy declining_visible = (trend_direction == 'down') & (impressions_90d >= 100).
3. Success metric: precision@20 measured against the proxy set.
4. Unit of analysis: one page snapshot from the starter dataset.
5. Why ML beats a fixed rule: page value depends on how multiple signals interact, so a simple threshold rule is too brittle.

### Notes

- What changed in the prompt: I added constraints that told the model what not to do and what to prioritize.
- What improved in the output: The answer became sharper, more specific, and more directly useful for the notebook.
- What still failed: It still could have been more explicit about why the task is ranking-oriented rather than merely binary.
- What I would try next: Tighten the wording further so the prompt works for a stranger without my personal context.

---

## Final reusable prompt

### Best prompt

You are an ML project strategist helping me write a defensible task framing for a decision-support problem. The goal is to help a reviewer prioritize which items deserve attention first. Use the real dataset and ground the answer in the actual columns available there.

Use this structure:
1. Task type
2. Target or proxy
3. Success metric
4. Unit of analysis
5. Why ML beats a fixed rule

Constraints:
- Do not use generic advice.
- Make the answer specific to the dataset and the decision use case.
- Keep it concise and notebook-ready.
- Frame the task as a scoring or ranking problem when that is the real need.
- If a proxy is needed, use a concrete observable proxy from the data.

### Why this version worked best

It combined the useful layers without overloading the prompt. The role helped focus the answer, the real context made it grounded, the format made it reusable, and the constraints prevented drift into generic advice.

---

## Reusable template for any future task

You are a [ROLE] helping me write a defensible task framing for [TASK].

Goal:
- Help [AUDIENCE] make a decision about [DECISION].

Use the real data available in [DATASET OR TABLE].

Use this structure:
1. Task type
2. Target or proxy
3. Success metric
4. Unit of analysis
5. Why the method beats a fixed rule

Constraints:
- Do not use generic advice.
- Make the answer specific to the dataset and the decision use case.
- Keep it concise and usable in a notebook, report, or slide.
- If a proxy is needed, use a concrete observable proxy from the data.
