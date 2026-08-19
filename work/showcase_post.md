# Build-in-Public Showcase Post

I built a ranked content-review engine for the FlyRank ML internship to help content strategists decide which pages to inspect first when a portfolio is larger than one review cycle.

The real design decision was to compare a transparent baseline with a class-balanced Random Forest on the same client-grouped holdout. That kept pages from the same client portfolio from appearing in both training and evaluation. On 30,000 public-safe content-page rows, the model reached Precision@50 = 0.740 versus 0.240 for the baseline, an observed 3.08x lift on this dataset and split.

The win is useful but narrow: the model produces a better first-pass review queue. It does not prove that refreshing a page will cause better performance, and it does not predict Google's ranking algorithm. The target is a current-window proxy, and thin-signal pages remain uncertain. My recommendation is to use the queue with reason codes and human review, while routing low-traffic pages to a lighter-touch track.

I used AI to help structure notebook cells, draft documentation, and check wording. I verified the runnable checks, repository contents, public page, metrics, and limitations myself.

Paper: https://nayak-d.github.io/FlyRank---Internship/
Repository: https://github.com/Nayak-D/FlyRank---Internship
Portfolio: https://nayak-d.vercel.app/
