from pathlib import Path
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, KeepTogether
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch

pdf_path = Path("pdf/portfolio_case_studies.pdf")
pdf_path.parent.mkdir(parents=True, exist_ok=True)

doc = SimpleDocTemplate(
    str(pdf_path),
    pagesize=letter,
    leftMargin=0.75 * inch,
    rightMargin=0.75 * inch,
    topMargin=0.75 * inch,
    bottomMargin=0.75 * inch,
)
styles = getSampleStyleSheet()
body = ParagraphStyle(
    "Body",
    parent=styles["Normal"],
    fontSize=11,
    leading=15,
    spaceAfter=8,
)
heading = ParagraphStyle(
    "Heading",
    parent=styles["Heading1"],
    fontSize=18,
    leading=22,
    spaceAfter=10,
)
subheading = ParagraphStyle(
    "Subheading",
    parent=styles["Heading2"],
    fontSize=14,
    leading=18,
    spaceAfter=8,
)
footer = ParagraphStyle(
    "Footer",
    parent=styles["Normal"],
    fontSize=10,
    leading=13,
    spaceAfter=6,
)

story = [
    Paragraph("Voice card", heading),
    Paragraph("direct, warm, plain, specific, no buzzwords", body),
    Paragraph(
        "This voice guides every story in the document. It keeps the writing practical, clear, and focused on what actually changed.",
        body,
    ),
    Spacer(1, 0.15 * inch),

    Paragraph("Case 1 — Research question framing", subheading),
    Paragraph(
        "The problem. The starter notebook had data and charts, but not a single clear decision. A reviewer could look at the work and still ask: what problem is this trying to solve? That makes the work feel like a draft, not evidence.",
        body,
    ),
    Paragraph(
        "What I did. I picked the Refresh / Content Opportunity Scoring lane and made the notebook point at one thing: which existing content pages should be refreshed first. I used the starter file to show that the question matters. The dataset has about 30,000 rows, 54.2% of pages in decline, and 59.8% of visible pages losing traffic. I wrote the notebook around those numbers, not around models or buzzwords.",
        body,
    ),
    Paragraph(
        "What came of it. The notebook now makes a real case. It says: here is the decision, here is the signal, and here is the honest boundary of the work. It is no longer a pile of charts. I also made the notebook runnable in more than one environment, so the evidence can actually be reviewed.",
        body,
    ),
    Paragraph(
        "What I would do differently next time. I would add one concrete example page and show how the ranking would change a reviewer’s list of refresh candidates.",
        footer,
    ),
    Spacer(1, 0.2 * inch),

    Paragraph("Case 2 — Reproducibility and delivery", subheading),
    Paragraph(
        "The problem. The original notebook was fragile. It assumed the data file lived in one place, so a reviewer could open the notebook and fail before ever seeing the argument. That kills trust faster than any missing chart.",
        body,
    ),
    Paragraph(
        "What I did. I wrote a path helper that checks the repo, common mounted notebook roots like Colab, and home directories. It even searches for the file if it is in an unexpected folder. I added debug outputs so a reviewer can see exactly where the notebook found the data.",
        body,
    ),
    Paragraph(
        "What came of it. The deliverable now works in a real review flow. If someone else opens the notebook, it no longer says file not found. That means the evidence can be judged instead of blocked by setup friction.",
        body,
    ),
    Paragraph(
        "What I would do differently next time. I would capture and write a short setup check in the notebook itself, so the first cell proves the data is loaded and the row counts are visible immediately.",
        footer,
    ),
    Spacer(1, 0.2 * inch),

    Paragraph("Case 3 — Evidence with honest limits", subheading),
    Paragraph(
        "The problem. It is easy to make a notebook sound finished when it is really an exploration. If the wording oversteps the data, the work becomes less credible, not more.",
        body,
    ),
    Paragraph(
        "What I did. I added a careful section that lists what I can claim and what I cannot. I made it clear this is a decision-support framing, not a proof of Google’s ranking. I named the signals I am using: impressions, trend direction, CTR, and search position.",
        body,
    ),
    Paragraph(
        "What came of it. The notebook is now honest and stronger. The reader can trust the story because it does not overpromise. That honesty makes the case more useful to someone who needs to know whether to invest in the next step.",
        body,
    ),
    Paragraph(
        "What I would do differently next time. I would add one sentence that says exactly how the ranking supports a reviewer’s workflow: it is a shortlist for human review, not a final action list.",
        footer,
    ),
    Spacer(1, 0.25 * inch),

    Paragraph("Bio and contact", subheading),
    Paragraph(
        "I turn data and messy code into decisions people can trust. I do this for product and content teams that need evidence, not vague recommendations.",
        body,
    ),
    Paragraph(
        "If you want to see the notebook or talk through the next step, email me or message me on the internship platform.",
        footer,
    ),
    Spacer(1, 0.2 * inch),

    Paragraph("Before / after", subheading),
    Paragraph("<b>Generic AI line</b>:", body),
    Paragraph(
        "I developed a model to rank pages for refresh opportunities using feature engineering and supervised learning.",
        body,
    ),
    Paragraph("<b>Edited version</b>:", body),
    Paragraph(
        "I framed which old pages need refresh, showed the dataset numbers behind that choice, and fixed the notebook so a reviewer can open it and understand it instead of hitting a broken file path.",
        body,
    ),
]

doc.build(story)
print(f"Created {pdf_path}")
