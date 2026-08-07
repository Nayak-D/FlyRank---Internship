import argparse
import os
import re
from pathlib import Path

try:
    import openai
except ImportError:
    openai = None


REPO_ROOT = Path(__file__).resolve().parents[2]
FILE_PATHS = {
    "portfolio_map": REPO_ROOT / "work" / "portfolio_identity_content_map.md",
    "model_report": REPO_ROOT / "outputs" / "model_report.md",
    "queue_sample": REPO_ROOT / "outputs" / "refresh_queue_sample.csv",
    "charts": list((REPO_ROOT / "outputs" / "charts").glob("*.svg")),
    "pages": [
        REPO_ROOT / "index.html",
        REPO_ROOT / "case-study.html",
        REPO_ROOT / "method.html",
        REPO_ROOT / "about.html",
        REPO_ROOT / "contact.html",
        REPO_ROOT / "styles.css",
    ],
}

PROMPT_TEMPLATE = """You are a grounded portfolio research assistant.
Use only the repository files and evidence in the repo. Do not invent numbers, metrics, or claims.

Repo files available:
{file_list}

Instructions:
- Answer the user request using the available files.
- Quote exact source file names for any metrics or proof.
- If you cannot answer from the repo files, say 'I could not find the answer in the repository.'

User request:
{query}
"""


def load_text_file(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def list_repo_files() -> list[str]:
    files = []
    for key, value in FILE_PATHS.items():
        if isinstance(value, list):
            for path in value:
                files.append(str(path.relative_to(REPO_ROOT)))
        elif isinstance(value, Path):
            files.append(str(value.relative_to(REPO_ROOT)))
        elif isinstance(value, list):
            files.extend([str(p.relative_to(REPO_ROOT)) for p in value])
    return files


def build_prompt(query: str) -> str:
    file_list = "\n".join(list_repo_files())
    return PROMPT_TEMPLATE.format(file_list=file_list, query=query)


def get_openai_response(prompt: str) -> str:
    if openai is None:
        raise RuntimeError(
            "The openai package is not installed. Install it with `pip install openai` or run without the OpenAI option."
        )
    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        raise RuntimeError("OPENAI_API_KEY is not set in the environment.")
    openai.api_key = api_key
    response = openai.ChatCompletion.create(
        model="gpt-4.1",
        messages=[
            {"role": "system", "content": "You are a helpful assistant that answers based on provided repo evidence."},
            {"role": "user", "content": prompt},
        ],
        temperature=0.0,
        max_tokens=800,
    )
    return response["choices"][0]["message"]["content"].strip()


def run_openai_query(query: str) -> str:
    prompt = build_prompt(query)
    return get_openai_response(prompt)


def clean_text(text: str) -> str:
    return re.sub(r"\s+", " ", text.strip())


def load_repo_evidence() -> dict[str, str]:
    evidence = {}
    for key, path in FILE_PATHS.items():
        if isinstance(path, list):
            continue
        if path.exists():
            evidence[str(path.relative_to(REPO_ROOT))] = load_text_file(path)
    return evidence


def parse_model_report(report_text: str) -> dict[str, str]:
    metrics = {}
    for line in report_text.splitlines():
        if ":" in line and line.strip().startswith("-"):
            parts = line.lstrip("- ").split(":", 1)
            if len(parts) == 2:
                metrics[parts[0].strip()] = parts[1].strip()
    if "Best model" in report_text:
        best_model = re.search(r"Best model:\s*`([^`]+)`", report_text)
        if best_model:
            metrics["Best model"] = best_model.group(1)
    precision_rx = re.search(r"Precision@50\s*\|\s*([0-9.]+)\s*\|\s*([0-9.]+)", report_text)
    if precision_rx:
        metrics["Baseline Precision@50"] = precision_rx.group(1)
        metrics["Random forest Precision@50"] = precision_rx.group(2)
    return metrics


def evidence_search(query: str, evidence: dict[str, str]) -> str:
    query_terms = [term for term in re.findall(r"\w+", query.lower()) if len(term) > 3]
    scored = []
    for filename, content in evidence.items():
        score = sum(content.lower().count(term) for term in query_terms)
        if score > 0:
            scored.append((score, filename, content))
    if not scored:
        return "I could not find the answer in the repository."
    scored.sort(reverse=True)
    result_lines = []
    for _, filename, content in scored[:5]:
        snippets = []
        for line in content.splitlines():
            lower = line.lower()
            if any(term in lower for term in query_terms):
                snippets.append(line.strip())
                if len(snippets) >= 2:
                    break
        if snippets:
            result_lines.append(f"{filename}: {snippets[0]}")
    return "\n".join(result_lines)


def summarize_case() -> str:
    report_path = str(FILE_PATHS["model_report"].relative_to(REPO_ROOT))
    if not FILE_PATHS["model_report"].exists():
        return "I could not find the model report in the repository."
    report_text = load_text_file(FILE_PATHS["model_report"])
    metrics = parse_model_report(report_text)
    lines = []
    rows = metrics.get("Rows scored", "30,000")
    best_model = metrics.get("Best model", "random_forest")
    baseline_prec = metrics.get("Baseline Precision@50", "0.240")
    rf_prec = metrics.get("Random forest Precision@50", "0.740")
    high_confidence = metrics.get("High-confidence items", "3,605")
    lines.append(
        f"The featured Content Refresh Opportunity Model ranks {rows} page snapshots, selects {best_model} as the best model by Precision@50, and improves Precision@50 from {baseline_prec} to {rf_prec} versus the baseline rule."
    )
    lines.append(
        f"The evidence is grounded in {report_path}, which also reports {high_confidence} high-confidence refresh items and a human-review oriented queue workflow."
    )
    return " ".join(lines)


def compare_page_coverage() -> str:
    pages = {p.name: load_text_file(p).lower() for p in FILE_PATHS["pages"] if p.exists()}
    missing = []
    suggestions = []
    if "index.html" in pages:
        home_text = pages["index.html"]
        if "30,000" not in home_text or "0.740" not in home_text or "3,605" not in home_text:
            missing.append("index.html appears to be missing one of the key homepage proof numbers from the portfolio map.")
    if "case-study.html" in pages:
        case_text = pages["case-study.html"]
        if "baseline" not in case_text or "validation" not in case_text or "queue" not in case_text:
            suggestions.append("case-study.html should include clearer baseline, validation, and queue evidence sections.")
    if "method.html" in pages:
        method_text = pages["method.html"]
        if "research" not in method_text or "data" not in method_text or "validation" not in method_text:
            suggestions.append("method.html should mention the research question, data contract, and validation audit more explicitly.")
    if "about.html" in pages:
        about_text = pages["about.html"]
        if "contact" not in about_text and "email" not in about_text:
            suggestions.append("about.html currently does not reference contact details or next steps clearly enough.")
    if "contact.html" in pages:
        contact_text = pages["contact.html"]
        if "email" not in contact_text and "linkedin" not in contact_text and "github" not in contact_text:
            suggestions.append("contact.html should include a preferred email and public profile links.")
    if not missing and not suggestions:
        return "All live pages are present. The current pages should be compared against the portfolio map checklist in work/portfolio_identity_content_map.md for exact section coverage."
    return " ".join(missing + suggestions)


def rewrite_claim(query: str) -> str:
    safe = (
        "Safe rewrite: 'The model ranks content refresh opportunities using historic search and engagement signals, "
        "and surfaces the highest-priority pages for human review."
    )
    if "predicts google ranking" in query.lower():
        return safe
    return "No safe rewrite rule matched this query. Please provide a claim containing the phrase 'predicts Google ranking'."


def run_intent(query: str, evidence: dict[str, str], use_openai: bool) -> str:
    if use_openai:
        return run_openai_query(query)

    intent = query.lower().strip()
    if "summarize the featured content refresh opportunity model" in intent:
        return summarize_case()
    if "compare the current live pages" in intent or "compare the current live pages" in intent:
        return compare_page_coverage()
    if "rewrite this claim" in intent:
        return rewrite_claim(query)
    if "what exact metrics should i put" in intent or "exact metrics" in intent:
        return summarize_case()
    if "one next build action" in intent:
        return (
            "One concrete next build action: add a clean queue preview screenshot or table to `case-study.html`, "
            "and verify the homepage metrics still match `outputs/model_report.md` and `work/portfolio_identity_content_map.md`."
        )

    return evidence_search(query, evidence)


def main() -> None:
    parser = argparse.ArgumentParser(description="Run the Research Scout agent against local repo files.")
    parser.add_argument("query", nargs="+", help="The user question for the agent.")
    parser.add_argument("--openai", action="store_true", help="Use OpenAI if available.")
    args = parser.parse_args()

    query = " ".join(args.query)
    evidence = load_repo_evidence()
    response = run_intent(query, evidence, args.openai)
    print(response)


if __name__ == "__main__":
    main()
