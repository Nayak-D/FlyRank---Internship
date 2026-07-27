import nbformat
from pathlib import Path

path = Path('work/notebooks/w01_research_question.ipynb')
nb = nbformat.read(path, as_version=4)

helper_code = (
    'import pandas as pd\n'
    'from pathlib import Path\n\n'
    'def starter_csv_path():\n'
    '    cwd = Path.cwd().resolve()\n'
    '    for folder in [cwd] + list(cwd.parents):\n'
    '        candidate = folder / "data" / "raw" / "content_refresh_anonymized.csv"\n'
    '        if candidate.exists():\n'
    '            return candidate\n'
    '    raise FileNotFoundError(\n'
    '        "Starter CSV not found. Checked: " + \
'
    '        ", ".join(str(folder / "data" / "raw" / "content_refresh_anonymized.csv") for folder in [cwd] + list(cwd.parents))\n'
    '    )\n\n'
)

modified = False

for cell in nb.cells:
    if cell.cell_type != 'code':
        continue
    if 'def starter_csv_path' not in cell.source and 'pd.read_csv' in cell.source:
        # insert helper in the first applicable code cell
        cell.source = helper_code + cell.source
        modified = True
        break

for cell in nb.cells:
    if cell.cell_type != 'code':
        continue
    if "pd.read_csv('data/raw/content_refresh_anonymized.csv')" in cell.source:
        cell.source = cell.source.replace("pd.read_csv('data/raw/content_refresh_anonymized.csv')", 'pd.read_csv(starter_csv_path())')
        modified = True
    if 'pd.read_csv("data/raw/content_refresh_anonymized.csv")' in cell.source:
        cell.source = cell.source.replace('pd.read_csv("data/raw/content_refresh_anonymized.csv")', 'pd.read_csv(starter_csv_path())')
        modified = True

if not modified:
    raise SystemExit('No modifications made')

nbformat.write(nb, path)
print('Notebook patched successfully')
