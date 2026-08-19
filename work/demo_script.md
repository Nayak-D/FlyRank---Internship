# FL-09 Demo Script

**Target length:** 3-5 minutes

**Live demo URL:** https://nayak-d.vercel.app/

**Paper URL:** https://nayak-d.github.io/FlyRank---Internship/

**Video URL:** Add the recorded, shareable video URL here after recording.

## Recording plan

### 0:00-0:40 - Problem and audience

Open the live portfolio and say:

> This project is for content strategists who have more pages to review than they can inspect in one cycle. I built a ranked review queue to help decide which pages deserve attention first. The output supports human review; it does not publish edits or predict Google's algorithm.

### 0:40-1:30 - Show the paper and the decision

Open the public paper. Point to the abstract and problem sections. Explain that the paper connects the FlyRank content problem to a measurable decision: prioritize the first 50 pages for review using observable page signals.

### 1:30-2:30 - Show the method and live evidence

Scroll to the methodology and results. Show the baseline-versus-model table and the Precision@50 chart:

- Baseline Precision@50: 0.240
- Random Forest Precision@50: 0.740
- Observed lift: 3.08x on this dataset and client-grouped holdout

Explain the design decision: a grouped holdout was used so pages from the same client portfolio did not appear in both training and evaluation.

### 2:30-3:25 - Show one real implementation detail

Open the repository and show `work/notebooks/capstone.ipynb`. Point to the runnable checks for the data summary, feature list, validation controls, metrics, limitations, recommendations, and public artifacts. Explain that the notebook is the reproducible narrative behind the paper.

### 3:25-4:10 - Explain one limitation on camera

Say:

> The most important limitation is that the target is a current-window proxy, not a genuine future outcome. The 3.08x result is observed on this dataset and split, so it supports queue prioritization but does not prove that refreshing a page will improve its performance. Thin-signal pages are also uncertain, which is why the recommendation keeps a separate human-review track.

### 4:10-4:40 - Close with the next step

Return to the paper and say:

> The next version should train on past-window features and evaluate a genuine next-window outcome. That would test forecasting instead of only ranking current review opportunities.

Show the repository URL and stop recording.

## Recording checklist

- [ ] 3-5 minutes
- [ ] Live portfolio or paper shown in a browser
- [ ] Baseline and model result shown
- [ ] One design decision explained: client-grouped holdout
- [ ] One limitation explained honestly: current-window proxy label
- [ ] AI contribution disclosed in the README
- [ ] Video uploaded with link access enabled
- [ ] Video URL added above and pasted into the showcase thread
