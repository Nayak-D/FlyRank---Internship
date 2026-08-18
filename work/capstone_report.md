# Capstone Report — Refresh / Content Opportunity Scoring

- **Author:** Nayak D.
- **Lane:** Refresh / Content Opportunity Scoring
- **Repo:** https://github.com/Nayak-D/FlyRank---Internship
- **Date:** 2026-08-19

## 0. Abstract

This capstone studies how to identify the pages most likely to need a refresh before they lose visibility. It focuses on a concrete editorial decision: which existing content to review first when teams need to improve discoverability without overfitting to private or client-identifying signals. Using the public-safe FlyRank internship dataset, the work builds a transparent ranking model anchored in page freshness, impressions, CTR, engagement, and position patterns. The model is compared against a baseline rule on the same client-holdout split, and the learned system materially improves the top-of-queue review quality. The result is a ranked list of likely refresh opportunities that supports editorial judgment rather than automated publishing decisions.

## 1. Problem framing

The decision supported here is which pages should be reviewed first for potential refresh. The unit of analysis is a content page, and the output is a ranked opportunity list. A wrong call has a cost: a team may review low-value content and miss content that is already visible but declining. A defensible model helps by turning noisy search performance measures into an ordered action queue that is simple to inspect and interpret.

## 2. Data safety

The project uses the anonymized starter dataset in `data/raw/content_refresh_anonymized.csv`. The analysis deliberately excludes client names, domains, titles, keywords, raw URLs, and any client-identifying content. I avoid using leaked target fields or pseudonymous IDs as features. All claims are framed as observed, measured, directional, and decision-support oriented.

## 3. Baseline

The baseline is a rule-based refresh score built from visible decline, low CTR, and editorial opportunity signals. It is transparent and interpretable, and it is evaluated on the same client-holdout split as the learned model. This creates a fair comparison between a simple rule and a model-based ranking system.

## 4. Model / analysis

I choose the Refresh / Content Opportunity Scoring lane because it directly matches the editorial action of ranking content for review. The learned model uses page-level freshness, engagement, position, and traffic shape signals to estimate the likelihood that a page is a worthwhile refresh target. It does not use titles, URLs, keywords, or client names.

The target is a public-safe declining-content review indicator defined from measured visibility and trend behavior. The model is trained on a client-level holdout split to reduce leakage from repeated page patterns within the same client portfolio.

## 5. Evaluation

The evaluation uses the same split and metric for the baseline and model. The key metric is Precision@50, which captures how often the most highly ranked pages are real opportunities for review. The project also reports ROC AUC for discrimination, while keeping the practical use grounded in rank quality and human actionability.

Model results on the same split:

| Model | ROC AUC | Precision@50 |
|---|---:|---:|
| Baseline rules | 0.627 | 0.240 |
| Random forest | 0.750 | 0.740 |

That is a material lift and indicates that the learned ranking is substantially more useful for a first-pass content review workflow than the rule-only baseline.

## 6. Interpretation

The strongest features are page-level freshness and performance risk markers such as impressions, position, CTR, engagement, and age. The model is most confident on pages that are visible, declining, and still carrying enough demand to justify review. This is consistent with the business need: pages with both visibility and decline risk are the most actionable editorial candidates.

## 7. Recommendation

A FlyRank editorial team should review the top-ranked pages first, inspect the reason codes, and decide whether a refresh, content rewrite, or monitoring action is appropriate. The safest use is as a triage queue, not as a fully automated publishing system. The model is best read as a decision-support aid that narrows the first pass to the highest-value review candidates.

## 8. Reproducibility

To reproduce this work:

1. Clone the repo and install dependencies from `requirements.txt`.
2. Run the analysis pipeline or notebook workflow in `work/notebooks/`.
3. Review the output report at `outputs/model_report.md`.
4. Inspect ranked candidates in `outputs/refresh_queue_sample.csv`.
5. Keep the evaluation honest by using the same client holdout split for baseline and model.

## 9. Acknowledgments & data credit

Built on the FlyRank ML Internship dataset: https://flyrank.ai

This work is intended as a public, honest, decision-support model for refresh prioritization in search and discoverability workflows.
