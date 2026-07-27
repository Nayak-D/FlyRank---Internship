"""Run and validate Jupyter notebooks in the workspace.

Usage:
  python scripts/verify_and_run_notebooks.py work/notebooks/w02_ml_task_framing.ipynb
  python scripts/verify_and_run_notebooks.py --all

The script normalizes notebooks (adds missing cell ids), executes them with nbclient,
writes executed copies to outputs/executed_<name>.ipynb, and exits with non-zero
status if any notebook fails to execute.
"""
import sys
from pathlib import Path
import nbformat
from nbclient import NotebookClient
from nbclient.exceptions import CellExecutionError


def run_notebook(path: Path, timeout=600):
    print(f"Running {path}")
    nb = nbformat.read(path, as_version=4)

    # Normalize to ensure cells have IDs (avoids future hard errors)
    try:
        nb = nbformat.normalize(nb)
    except Exception:
        # nbformat.normalize may not exist on very old versions — ignore if fails
        pass

    client = NotebookClient(nb, timeout=timeout, kernel_name="python3")
    try:
        client.execute()
    except CellExecutionError as e:
        print(f"ERROR executing {path}: {e}")
        return False

    out_dir = Path("outputs")
    out_dir.mkdir(parents=True, exist_ok=True)
    out_path = out_dir / f"executed_{path.name}"
    nbformat.write(nb, out_path)
    print(f"Wrote executed notebook to {out_path}")
    return True


def main(argv):
    if len(argv) < 2:
        print("Usage: verify_and_run_notebooks.py <notebook.ipynb> | --all")
        return 2

    arg = argv[1]
    failures = []
    if arg == "--all":
        notebooks = list(Path("work/notebooks").glob("*.ipynb"))
    else:
        notebooks = [Path(arg)]

    for nb in notebooks:
        if not nb.exists():
            print(f"Not found: {nb}")
            failures.append(str(nb))
            continue
        ok = run_notebook(nb)
        if not ok:
            failures.append(str(nb))

    if failures:
        print("Some notebooks failed:")
        for f in failures:
            print(" -", f)
        return 1

    print("All notebooks executed successfully.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv))
