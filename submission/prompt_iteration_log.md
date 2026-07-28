# Prompt Iteration Log

## Task

Real task from the FL-01-style audit in [work/notebooks/w02_ml_task_framing.ipynb](../work/notebooks/w02_ml_task_framing.ipynb): frame the content-refresh opportunity problem as an ML task for the starter dataset.

Working context:
- Goal: help a reviewer prioritize which pages are most worth refreshing.
- Data shape: one row is one content page snapshot.
- Observable proxy used in the notebook: `declining_visible = (trend_direction == 'down') & (impressions_90d >= 100)`.
- The task should be framed as a ranking/scoring problem, not just a yes/no classification.

## 1) Naive version

### Prompt

"Help me frame this ML task."

### Output

"You could treat this as a classification problem where you predict whether a page is declining. That would be a simple way to approach it."

### Note

This was too vague and produced a generic answer. It did not use the actual notebook context, did not mention ranking, and did not anchor the output to the real signals in the dataset.

## 2) Version 2 — Role assignment

### Prompt

You are an ML project strategist helping me write a defensible task framing for a content-refresh ranking problem. Use the starter dataset and keep the answer practical for a notebook.

### Output

"This is best framed as a scoring and ranking task. The model should assign a refresh-priority score to each page so a reviewer can sort pages by opportunity. A binary label is too weak because it collapses many different levels of urgency into one bucket."

### Note

The role changed the output immediately. The answer became more focused on the product problem and the decision-use case. The biggest improvement was that it moved from generic classification advice to a task framing that fit the notebook’s ranking intent.

## 3) Version 3 — Context and motivation

### Prompt

You are an ML project strategist helping me write a defensible task framing for a content-refresh ranking problem. The business goal is to help a reviewer decide which pages are worth refreshing first. The output should support a human decision, not replace it. Use the starter dataset and make the framing concrete.

### Output

"This should be framed as a ranking problem because the real goal is not merely to say 'declining or not declining,' but to produce an ordered queue of pages that deserve attention first. A reviewer needs a prioritized list, so the model should estimate relative refresh opportunity rather than just a binary label."

### Note

Adding context and motivation made the answer more grounded in why the task exists. The output became more useful because it explained the difference between a model that predicts a label and one that supports a real workflow.

## 4) Version 4 — Few-shot examples

### Prompt

You are an ML project strategist helping me write a defensible task framing for a content-refresh ranking problem. Here are two examples of good and weak task framing:

Example A: "This is a ranking task because the output is an ordered list of pages by refresh priority."

Example B: "This is a classification task because we predict whether a page is declining."

Now write a strong framing for my task using the starter dataset and the observable proxy `declining_visible = (trend_direction == 'down') & (impressions_90d >= 100)`.

### Output

"This task is best framed as a scoring and ranking problem. The model should estimate a refresh-priority score for each page using observable signals such as trend direction, impressions, CTR, and position. The proxy label `declining_visible` is useful as a weak supervision signal, but the real product need is an ordered queue of pages that are most worth reviewing."

### Note

The few-shot examples helped the model imitate the right structure and tone. The output was cleaner and more consistent, and it also avoided drifting into a purely academic explanation.

## 5) Version 5 — Output structure

### Prompt

You are an ML project strategist helping me write a defensible task framing for a content-refresh ranking problem. Use this exact structure:

1. Task type
2. Target or proxy
3. Success metric
4. Unit of analysis
5. Why ML beats a fixed rule

Use the starter dataset and keep the answer concise and notebook-ready.

### Output

"1. Task type: scoring and ranking.\n2. Target or proxy: predict a refresh-priority score, using the observable proxy `declining_visible = (trend_direction == 'down') & (impressions_90d >= 100)`.\n3. Success metric: precision@k, such as precision@20, measured against the proxy set.\n4. Unit of analysis: one page snapshot in the dataset.\n5. Why ML beats a fixed rule: the value of a page depends on combinations of signals, not a single threshold."

### Note

This version produced the most notebook-friendly answer. The structure made the response complete and made the weak spots easier to see. The improvement was not just formatting; it forced the model to cover the exact framing elements the assignment expects.

## 6) Version 6 — Step decomposition

### Prompt

You are an ML project strategist helping me write a defensible task framing for a content-refresh ranking problem. Work in this order:

1. First identify the decision the model should support.
2. Then define the target or proxy.
3. Then choose a defensible success metric.
4. Then define the unit of analysis.
5. Finally explain why ML is better than a fixed rule.

Use the starter dataset, the real signals, and keep the answer short enough to use in a report or notebook.

### Output

"The model should support a reviewer deciding which pages deserve refresh attention first. The target can be framed as a refresh-priority score, with the observable proxy `declining_visible = (trend_direction == 'down') & (impressions_90d >= 100)`. A defensible success metric is precision@20, measured against the proxy set. The unit of analysis is one page snapshot from the dataset. A simple rule is too brittle because the value of a page depends on how multiple signals interact rather than on one hard threshold."

### Note

Step decomposition produced the best balance of clarity and depth. The answer was more deliberate and less likely to skip the crucial link between the target, the proxy, and the success metric. That was the main quality gain.

## 7) Final prompt

### Prompt

You are an ML project strategist helping me write a defensible task framing for a content-refresh ranking problem. The goal is to help a reviewer prioritize which pages are worth refreshing first. Use the starter dataset and ground the answer in the real columns available there.

Use this structure:
- Task type
- Target or proxy
- Success metric
- Unit of analysis
- Why ML beats a fixed rule

Important constraints:
- Do not use generic advice.
- Make the answer specific to this dataset and this decision use case.
- Frame the task as a scoring/ranking problem, not only as a binary classification problem.
- Use the observable proxy `declining_visible = (trend_direction == 'down') & (impressions_90d >= 100)`.
- Keep the response concise and notebook-ready.

### Output

"This is best framed as a scoring and ranking task. The model should assign a refresh-priority score to each page so a reviewer can sort pages by which ones deserve attention first. A practical proxy is `declining_visible = (trend_direction == 'down') & (impressions_90d >= 100)`, which captures pages that are both visible and declining. A defensible success metric is precision@20, measured against that proxy set. The unit of analysis is one page snapshot from the starter dataset. A fixed rule is too brittle because the value of a page depends on the interaction of multiple signals such as impressions, trend direction, CTR, and position."

### Note

This was the strongest version because it combined all the techniques at once: role, context, structure, and explicit constraints. The output was specific, decision-oriented, and directly usable for the notebook.

## Cross-model comparison

I compared the final prompt’s behavior across the two model families using the same task and the documented style differences from Anthropic and OpenAI guidance.

### Claude-style output

- Tone: more direct, slightly more product-aware, and more likely to stay tightly within the requested structure.
- Accuracy: strong on the specific framing choices and the distinction between a proxy and a real decision-support objective.
- Structure: very good; it usually produces a clean, compact answer with fewer digressions.
- Failure point: it can sometimes be a little too terse and skip the broader rationale unless the prompt explicitly asks for it.

### ChatGPT-style output

- Tone: often a bit more polished and conversational, with slightly more explanatory prose.
- Accuracy: also strong, but it may drift into broader generalities unless the prompt is very explicit about the dataset columns and output format.
- Structure: good, though it may present the answer with a more narrative style rather than a strictly notebook-ready layout.
- Failure point: it can over-explain or offer extra alternatives when the task needs a single crisp framing.

### Honest take

For this specific task, Claude was more reliable at staying tightly scoped to the notebook framing, while ChatGPT was slightly better at sounding polished and explanatory. The biggest difference was not raw correctness; it was discipline. Claude was more likely to keep the answer anchored to the exact task structure, while ChatGPT needed slightly more forceful instructions to avoid wandering.

## Final reusable template

Use this template for any FL-01-style task framing prompt:

```text
You are a [ROLE] helping me write a defensible task framing for [TASK].

Context:
- Goal: [WHAT DECISION SHOULD THE MODEL SUPPORT]
- Data: [REAL DATASET OR TABLE]
- Use the actual columns available in the data.
- If a proxy is needed, use [PROXY DEFINITION].

Use this structure:
- Task type
- Target or proxy
- Success metric
- Unit of analysis
- Why ML beats a fixed rule

Important constraints:
- Do not use generic advice.
- Make the answer specific to this dataset and this decision use case.
- Keep the answer concise and notebook-ready.
```

## Bottom line

The best prompt was not the longest one. It was the one that combined a clear role, real context, a fixed output structure, and explicit constraints. That combination produced the most useful answer for the real task.
