#!/usr/bin/env python3
"""
Completion Status Estimator for Intelligent Textbooks

Scans all project directories in a workspace and estimates each book's
completion level (1-5) based on the presence and depth of standard
intelligent textbook components.

Scoring rubric:
  1 - Early Development:  Has mkdocs.yml but no learning graph
  2 - Initial Content:    Has learning graph and/or chapters started
  3 - In Progress:        Has chapters + some sims (< 10)
  4 - Nearly Complete:    Has chapters + 10+ sims
  5 - Complete:           Has chapters + 10+ sims + glossary + FAQ

Output: A markdown table and the HTML span tags ready to paste into
        the case-studies page.

Usage:
    python src/completion-status-estimator.py [workspace_dir]

    workspace_dir defaults to the parent of this repo
    (i.e. ~/Documents/ws)
"""

import os
import sys
from pathlib import Path


def is_book_project(project_dir: Path) -> bool:
    """Return True if the directory looks like an MkDocs book project."""
    return (project_dir / "mkdocs.yml").exists() and (project_dir / "docs").is_dir()


def count_sims(docs_dir: Path) -> int:
    """Count simulation directories inside docs/sims/."""
    sims_dir = docs_dir / "sims"
    if not sims_dir.is_dir():
        return 0
    # Each sim is a subdirectory (ignore files like index.md)
    return sum(1 for p in sims_dir.iterdir() if p.is_dir())


def has_chapters(docs_dir: Path) -> bool:
    """Check for numbered chapter directories (e.g. 01-intro, 02-basics)."""
    chapters_dir = docs_dir / "chapters"
    if chapters_dir.is_dir():
        numbered = [p for p in chapters_dir.iterdir()
                    if p.is_dir() and p.name[:2].isdigit()]
        if numbered:
            return True
    # Also check for numbered dirs directly in docs/
    numbered = [p for p in docs_dir.iterdir()
                if p.is_dir() and len(p.name) >= 3
                and p.name[:2].isdigit() and p.name[2] == '-']
    return len(numbered) >= 3


def count_chapters(docs_dir: Path) -> int:
    """Count numbered chapter directories."""
    chapters_dir = docs_dir / "chapters"
    if chapters_dir.is_dir():
        numbered = [p for p in chapters_dir.iterdir()
                    if p.is_dir() and p.name[:2].isdigit()]
        if numbered:
            return len(numbered)
    numbered = [p for p in docs_dir.iterdir()
                if p.is_dir() and len(p.name) >= 3
                and p.name[:2].isdigit() and p.name[2] == '-']
    return len(numbered)


def has_learning_graph(docs_dir: Path) -> bool:
    """Check for a learning graph directory with content."""
    lg_dir = docs_dir / "learning-graph"
    if not lg_dir.is_dir():
        return False
    # Must have at least one file beyond index.md
    files = list(lg_dir.iterdir())
    return len(files) >= 1


def has_glossary(docs_dir: Path) -> bool:
    """Check for glossary content."""
    if (docs_dir / "glossary.md").exists():
        return True
    glossary_dir = docs_dir / "glossary"
    return glossary_dir.is_dir() and any(glossary_dir.iterdir())


def has_faq(docs_dir: Path) -> bool:
    """Check for FAQ content."""
    for name in ["faq.md", "faqs.md"]:
        if (docs_dir / name).exists():
            return True
    for name in ["faq", "faqs"]:
        d = docs_dir / name
        if d.is_dir() and any(d.iterdir()):
            return True
    return False


def has_quizzes(docs_dir: Path) -> bool:
    """Check for quiz content."""
    for name in ["quizzes", "quiz"]:
        d = docs_dir / name
        if d.is_dir() and any(d.iterdir()):
            return True
    return False


def estimate_completion(project_dir: Path) -> dict:
    """Estimate completion level for a single book project.

    Returns a dict with the project name, level (1-5), and component details.
    """
    docs_dir = project_dir / "docs"
    name = project_dir.name

    lg = has_learning_graph(docs_dir)
    ch = has_chapters(docs_dir)
    ch_count = count_chapters(docs_dir)
    sim_count = count_sims(docs_dir)
    gl = has_glossary(docs_dir)
    fq = has_faq(docs_dir)
    qz = has_quizzes(docs_dir)

    # Scoring rubric
    if ch and sim_count >= 10 and gl and fq:
        level = 5  # Complete
    elif ch and sim_count >= 10:
        level = 4  # Nearly Complete
    elif ch or (lg and sim_count > 0):
        level = 3  # In Progress
    elif lg:
        level = 2  # Initial Content
    else:
        level = 1  # Early Development

    level_labels = {
        1: "Early Development",
        2: "Initial Content",
        3: "In Progress",
        4: "Nearly Complete",
        5: "Complete",
    }

    return {
        "name": name,
        "level": level,
        "label": level_labels[level],
        "learning_graph": lg,
        "chapters": ch,
        "chapter_count": ch_count,
        "sim_count": sim_count,
        "glossary": gl,
        "faq": fq,
        "quizzes": qz,
    }


def completion_span(level: int, label: str) -> str:
    """Return the HTML span tag for the given completion level."""
    return f'<span class="completion completion-{level}" title="{label} ({level}/5)"></span>'


def main():
    # Determine workspace directory
    if len(sys.argv) > 1:
        ws_dir = Path(sys.argv[1])
    else:
        # Default: parent of this repo
        ws_dir = Path(__file__).resolve().parent.parent.parent

    if not ws_dir.is_dir():
        print(f"Error: {ws_dir} is not a directory", file=sys.stderr)
        sys.exit(1)

    # Find all book projects
    projects = sorted([
        p for p in ws_dir.iterdir()
        if p.is_dir() and not p.name.startswith('.') and is_book_project(p)
    ], key=lambda p: p.name.lower())

    if not projects:
        print(f"No book projects found in {ws_dir}", file=sys.stderr)
        sys.exit(1)

    results = [estimate_completion(p) for p in projects]

    # Count by level
    level_counts = {i: 0 for i in range(1, 6)}
    for r in results:
        level_counts[r["level"]] += 1

    # Print summary
    print(f"# Completion Status Report")
    print(f"\nScanned {len(results)} book projects in `{ws_dir}`\n")

    print("## Summary by Level\n")
    print("| Level | Label | Count |")
    print("|-------|-------|-------|")
    for lvl in range(1, 6):
        labels = {1: "Early Development", 2: "Initial Content",
                  3: "In Progress", 4: "Nearly Complete", 5: "Complete"}
        print(f"| {lvl} | {labels[lvl]} | {level_counts[lvl]} |")

    print(f"\n## Detailed Results\n")
    print("| Project | Level | LG | Ch | Sims | Gloss | FAQ | HTML |")
    print("|---------|-------|----|----|------|-------|-----|------|")
    for r in results:
        check = lambda v: "Y" if v else "-"
        sim_str = str(r["sim_count"]) if r["sim_count"] > 0 else "-"
        ch_str = str(r["chapter_count"]) if r["chapter_count"] > 0 else "-"
        html = completion_span(r["level"], r["label"])
        print(f"| {r['name']} | {r['level']} {r['label']} "
              f"| {check(r['learning_graph'])} "
              f"| {ch_str} "
              f"| {sim_str} "
              f"| {check(r['glossary'])} "
              f"| {check(r['faq'])} "
              f"| `{html}` |")

    # Also write a simple CSV for downstream use
    csv_path = ws_dir / "intelligent-textbooks" / "src" / "completion-status.csv"
    with open(csv_path, "w") as f:
        f.write("project,level,label,learning_graph,chapters,chapter_count,sim_count,glossary,faq,quizzes\n")
        for r in results:
            f.write(f"{r['name']},{r['level']},{r['label']},"
                    f"{r['learning_graph']},{r['chapters']},{r['chapter_count']},"
                    f"{r['sim_count']},{r['glossary']},{r['faq']},{r['quizzes']}\n")
    print(f"\nCSV written to: {csv_path}")


if __name__ == "__main__":
    main()
