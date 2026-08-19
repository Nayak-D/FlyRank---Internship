# Plan to Keep Building

## Next case study

**Time-aware Refresh Impact Study**

This is the next real piece of work because it directly addresses the current case study's largest limitation: the existing `is_declining_label` is a current-window proxy, not a genuine future outcome. The next case will test whether past-window page signals are associated with a measurable next-window change after a content review or refresh decision.

## Exactly where it goes

The case will be added to the existing portfolio's `case-study.html` flow as the next case after **Content Refresh Opportunity Model**. The current case remains the first proof; the new case gets its own section or page once the analysis has a verified result. The public paper and repository will link to the same case note so the portfolio, notebook, and research artifact stay aligned.

## 30-minute add-a-case checklist

Reuse the Week 2 three-beat shape:

1. **Problem:** write one paragraph naming the operational decision, who uses it, and what a wrong call costs. For this case: can a team evaluate refresh impact using a real next-window outcome rather than a current-window proxy?
2. **What I did:** write one paragraph naming the data window, features, baseline, validation design, and one design decision. Include the exact notebook or script path.
3. **What came of it:** write one paragraph with the measured result, one chart or table, the recommended action, and one limitation. Use `observed`, `measured`, `directional`, and `decision-support` language.

Then:

- Add the case summary and link to the existing `case-study.html` page.
- Add the full analysis notebook under `work/notebooks/`.
- Export one readable chart to `work/figures/` or `outputs/charts/`.
- Add the result, limitation, and reproducibility link to `work/capstone_report.md` if it changes the capstone story.
- Update the root README and `work/final_package_index.md`.
- Open the portfolio at desktop and mobile widths, click the new case link, and verify the public URL before sharing it.

## Concrete reminder

I prepared an importable calendar event for **Wednesday, September 2, 2026 (`2026-09-02`) at 9:00 AM local time**, with a 30-minute duration and a one-week reminder. Import [keep_building_reminder.ics](keep_building_reminder.ics) into the calendar I use for internship work, then keep the imported event as the evidence that the reminder is active.

The reminder title is: **Start next case: Time-aware Refresh Impact Study**.

## AI workspace continuity

Keep the existing Claude Project and its current voice, stack, and identity context. At the reminder, start a new conversation in that Project with this prompt:

> Help me build the next case study, Time-aware Refresh Impact Study, using the existing FlyRank portfolio voice and public-safe rules. Start by checking the current repository and asking me for the past and next observation windows. Reuse the three-beat case shape: problem, what I did, what came of it. Do not invent a result; keep proxy, causal, and privacy limitations explicit.

The AI workspace is a thinking and implementation partner, not evidence of the result. The analysis, metrics, public links, and limitations still need to be checked against the repository and a fresh run.
