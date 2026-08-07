# FL-07 Build Log — Portfolio Research Scout

## Goal
Build the FL-07 agent from the FL-06 design: a grounded portfolio research scout that reads repo files and answers evidence, missing-proof, and safe-language questions.

## What I built
- `work/agent/research_scout.py`
  - reads key repo files: `work/portfolio_identity_content_map.md`, `outputs/model_report.md`, `outputs/refresh_queue_sample.csv`, `outputs/charts/*.svg`, and portfolio pages.
  - provides a simple local evidence search fallback for query matching.
  - supports `--openai` mode if `OPENAI_API_KEY` is set and the `openai` package is installed.

## Tool connection
- Live file connection: the script reads repository files from disk.
- Optional model connection: OpenAI GPT-4.1 via `openai` if an API key is provided.

## What worked
- Repo structure and evidence files are present and accessible.
- Python environment already has `openai` available.
- Script scaffolding was created successfully in `work/agent`.

## What broke / needed adjustment
- No local LLM backend is installed (`llama_cpp`, `gpt4all` missing), so the current fallback is file search only unless OpenAI is configured.
- The original FL-06 spec mentioned `GPT4All` or `llama-cpp-python`; I cut that from the initial script to keep the build minimal and working.

## What I cut from the spec and why
- Removed local open-source model support from the first working version because no local model package was installed yet.
- Kept the agent narrow: answer-from-evidence + OpenAI wrapper, rather than a full search index or embedding layer.

## Next steps
1. Run `python work/agent/research_scout.py "<question>"` to test local evidence matching.
2. If available, set `OPENAI_API_KEY` and rerun with `--openai` for an actual model-backed response.
3. Record a raw screen capture of the agent working end-to-end in the terminal.
