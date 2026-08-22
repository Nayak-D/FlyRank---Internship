# FL-09 Demo Script

**Target length:** 3-5 minutes

**Live demo URL:** https://nayak-d.vercel.app/

**Paper URL:** https://nayak-d.github.io/FlyRank---Internship/

**Video URL:** Add the recorded, shareable video URL here after recording.

## Complete word-for-word script

The text in quotation marks is the narration to speak. Text in square brackets is a screen
action or recording cue and is not spoken.

### 0:00-0:40 - Problem and audience

[Open https://nayak-d.vercel.app/ in the browser. Pause on the portfolio home page.]

"Hello. This project is a content review prioritization tool for content strategists and SEO
teams who have more pages to inspect than they can review in one cycle.

The practical question is simple: which existing pages deserve attention first? I built a ranked
review queue using observable page-level signals. It helps a strategist decide what to inspect,
refresh, expand, monitor, or leave alone.

The output is decision support for a human review process. It does not publish edits, and it does
not predict or reverse-engineer Google's ranking algorithm."

### 0:40-1:30 - Paper and decision

[Open https://nayak-d.github.io/FlyRank---Internship/. Scroll to the abstract and problem sections.]

"This is the public paper behind the project. The work uses a small, anonymized, public-safe slice
of FlyRank search data. Client names, domains, titles, keywords, raw URLs, and other identifying
content are excluded from the analysis.

The decision is measurable: rank pages so that a strategist can review the highest-priority pages
first. For the evaluation, I focus on the top 50 ranked pages and use Precision@50. In plain
language, that asks: out of the first 50 pages in the queue, how many are actually marked as
review opportunities in the evaluation data?

The goal is a specific workflow decision: where should the first reviewer's attention go?"

### 1:30-2:30 - Method and results

[Scroll to the methodology and results. Show the baseline-versus-model table and the Precision@50
chart.]

"I compare two ranking approaches on the same evaluation split. The first is a transparent
baseline rule built from decline, traffic, engagement, and editorial opportunity signals. The
second is a class-balanced Random Forest using observable, pre-decision page signals.

Here are the main results. The baseline reached Precision@50 of zero point two four zero. The
Random Forest reached Precision@50 of zero point seven four zero. That is an observed lift of
three point zero eight times on this dataset and this split.

The important design choice is the validation split. I used a client-grouped holdout, so pages
from the same client portfolio did not appear in both training and evaluation. Both approaches
were compared on the same held-out groups, which is more credible than a random row split when
page patterns repeat within a portfolio.

The result supports using the model as a first-pass ranking aid. It does not mean every page in
the top 50 needs the same action. A strategist still inspects the page and chooses the next step."

### 2:30-3:25 - Reproducible implementation

[Open the repository and navigate to work/notebooks/capstone.ipynb. Show the notebook sections for
the data summary, features, validation, metrics, limitations, recommendations, and artifacts.]

"This notebook is the reproducible narrative behind the paper. It records the data summary,
features, validation controls, metrics, limitations, recommendations, and public artifacts.

The feature set uses page-level freshness, engagement, position, traffic, and content-shape
signals. Client identifiers define validation groups only, and target-derived decision flags are
excluded from the feature set.

It also keeps the practical output visible: a ranked queue with reason codes for human inspection.
That is the intended handoff to an editorial workflow."

### 3:25-4:10 - Limitation

[Return to the paper's limitations or results section.]

"The most important limitation is that the target is a current-window proxy, not a genuine future
outcome. The three point zero eight times result is observed on this dataset and split. It supports
prioritizing a review queue, but does not prove that refreshing a page will improve traffic,
ranking, or conversion.

Thin-signal and low-traffic pages are also uncertain. For that reason, the recommendation keeps
a separate human-review track instead of treating the model score as an automatic publishing
decision.

I used AI as a coding and writing partner for notebook structure, documentation drafts,
validation commands, and wording reviews. I checked the repository outputs, runnable cells,
public pages, metrics, and limitations myself, and the final claims are limited to what those
checks support."

### 4:10-4:40 - Close and next step

[Return to the paper home page or the results section.]

"The next version should train on past-window features and evaluate a genuine next-window
outcome. That would test forecasting instead of only ranking current review opportunities.

For this version, the takeaway is practical: use the ranked queue to focus human attention on the
highest-priority pages, inspect the evidence, and decide before changing or publishing anything.

The live portfolio is at nayak-d dot vercel dot app, and the public paper is at nayak-d dot
github dot io slash FlyRank dash dash Internship. Thank you for watching."

[Stop recording.]

## Recording checklist

- [ ] 3-5 minutes
- [ ] Live portfolio or paper shown in a browser
- [ ] Baseline and model result shown
- [ ] Precision@50 values spoken: 0.240 and 0.740
- [ ] Observed 3.08x lift described as dataset- and split-specific
- [ ] Client-grouped holdout explained
- [ ] Current-window proxy limitation explained
- [ ] Human review and non-causal use explained
- [ ] AI contribution disclosed in the README and spoken in the video
- [ ] Video uploaded with link access enabled
- [ ] Video URL added above and pasted into the showcase thread
