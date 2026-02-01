#!/usr/bin/env python3
"""
Update all mkdocs.yml files in ~/Documents/ws/* with the intelligent textbook schema.

This script:
1. Finds all mkdocs.yml files in the workspace
2. For each repository:
   - Git pull to ensure current
   - Adds the schema URI to the extra: section
   - Uses site_name as textbook_name
   - Commits and pushes the change

Usage:
    python update-mkdocs.py           # Process all repos
    python update-mkdocs.py --dry-run # Show what would be done without making changes

Schema URI: https://dmccreary.github.io/intelligent-textbooks/ns/textbook/v1
"""

import argparse
import subprocess
import re
from pathlib import Path

SCHEMA_URL = "https://dmccreary.github.io/intelligent-textbooks/ns/textbook/v1"
WORKSPACE_PATH = Path.home() / "Documents" / "ws"


def run_cmd(cmd, cwd=None):
    """Run a shell command and return (success, output)."""
    try:
        result = subprocess.run(
            cmd, shell=True, cwd=cwd,
            capture_output=True, text=True, timeout=60
        )
        return result.returncode == 0, result.stdout + result.stderr
    except Exception as e:
        return False, str(e)


def get_site_name(content):
    """Extract site_name from mkdocs.yml content."""
    match = re.search(r'^site_name:\s*["\']?([^"\'\n]+)["\']?\s*$', content, re.MULTILINE)
    return match.group(1).strip() if match else None


def has_schema(content):
    """Check if schema is already defined in extra section."""
    return 'dmccreary.github.io/intelligent-textbooks/ns/textbook' in content


def add_schema_to_extra(content, site_name):
    """Add schema fields to the extra section, preserving file formatting."""
    lines = content.split('\n')
    result_lines = []

    # Find top-level extra: sections (not indented)
    extra_indices = []
    for i, line in enumerate(lines):
        if (line.strip() == 'extra:' or line.strip().startswith('extra:')) and not line.startswith(' ') and not line.startswith('\t'):
            extra_indices.append(i)

    if not extra_indices:
        # No extra section exists - add one at the end
        if not content.endswith('\n'):
            content += '\n'
        content += f"""extra:
  schema: {SCHEMA_URL}
  textbook_name: {site_name}
  textbook_version: "1.0"
"""
        return content

    # Use the last top-level extra: section
    extra_idx = extra_indices[-1]

    # Detect indentation used in the extra section
    indent = "  "  # default 2-space indent
    for i in range(extra_idx + 1, min(extra_idx + 5, len(lines))):
        line = lines[i]
        if line.strip() and not line.strip().startswith('#'):
            match = re.match(r'^(\s+)', line)
            if match:
                indent = match.group(1)
            break

    # Create new schema lines
    new_lines = [
        f"{indent}schema: {SCHEMA_URL}",
        f"{indent}textbook_name: {site_name}",
        f'{indent}textbook_version: "1.0"',
    ]

    # Insert after extra: line
    for i, line in enumerate(lines):
        result_lines.append(line)
        if i == extra_idx:
            result_lines.extend(new_lines)

    return '\n'.join(result_lines)


def process_repo(mkdocs_path, dry_run=False):
    """Process a single repository."""
    repo_dir = mkdocs_path.parent
    repo_name = repo_dir.name

    print(f"\n{'='*60}")
    print(f"Processing: {repo_name}")
    print(f"{'='*60}")

    # Step 1: Git pull
    print("Step 1: Git pull...")
    if not dry_run:
        success, output = run_cmd("git pull", cwd=repo_dir)
        pull_msg = output.strip().split('\n')[0] if output.strip() else "OK"
        if not success:
            print(f"  WARNING: {pull_msg[:80]}")
        else:
            print(f"  OK: {pull_msg[:80]}")
    else:
        print("  [DRY RUN] Would git pull")

    # Step 2: Read and update mkdocs.yml
    print("Step 2: Updating mkdocs.yml...")
    try:
        with open(mkdocs_path, 'r') as f:
            content = f.read()

        if has_schema(content):
            print("  SKIP: Schema already exists")
            return True

        site_name = get_site_name(content) or repo_name
        new_content = add_schema_to_extra(content, site_name)

        if not dry_run:
            with open(mkdocs_path, 'w') as f:
                f.write(new_content)
            print(f"  OK: Added schema for '{site_name}'")
        else:
            print(f"  [DRY RUN] Would add schema for '{site_name}'")

    except Exception as e:
        print(f"  ERROR: {e}")
        return False

    # Step 3: Skip strict YAML validation (MkDocs uses custom Python tags)
    print("Step 3: Skipping strict validation (MkDocs uses custom YAML tags)")

    # Step 4: Git add and commit
    print("Step 4: Git add and commit...")
    if not dry_run:
        run_cmd("git add mkdocs.yml", cwd=repo_dir)
        success, output = run_cmd('git commit -m "Added intelligent textbook schema"', cwd=repo_dir)
        if "nothing to commit" in output:
            print("  SKIP: No changes to commit")
            return True
        elif not success:
            print(f"  ERROR: {output[:100]}")
            return False
        print("  OK: Committed")
    else:
        print("  [DRY RUN] Would commit changes")

    # Step 5: Git push
    print("Step 5: Git push...")
    if not dry_run:
        success, output = run_cmd("git push", cwd=repo_dir)
        if not success:
            print(f"  ERROR: {output[:100]}")
            return False
        print("  OK: Pushed")
    else:
        print("  [DRY RUN] Would push to remote")

    return True


def main():
    parser = argparse.ArgumentParser(
        description="Update mkdocs.yml files with intelligent textbook schema"
    )
    parser.add_argument(
        "--dry-run", action="store_true",
        help="Show what would be done without making changes"
    )
    parser.add_argument(
        "--workspace", type=Path, default=WORKSPACE_PATH,
        help=f"Path to workspace directory (default: {WORKSPACE_PATH})"
    )
    args = parser.parse_args()

    if args.dry_run:
        print("=" * 60)
        print("DRY RUN MODE - No changes will be made")
        print("=" * 60)

    # Find all mkdocs.yml files
    mkdocs_files = list(args.workspace.glob("*/mkdocs.yml"))
    print(f"Found {len(mkdocs_files)} repositories with mkdocs.yml")

    successes = 0
    failures = []

    for mkdocs_path in sorted(mkdocs_files):
        try:
            if process_repo(mkdocs_path, dry_run=args.dry_run):
                successes += 1
            else:
                failures.append(mkdocs_path.parent.name)
        except Exception as e:
            print(f"  EXCEPTION: {e}")
            failures.append(mkdocs_path.parent.name)

    print(f"\n{'='*60}")
    print("SUMMARY")
    print(f"{'='*60}")
    print(f"Successful: {successes}")
    print(f"Failed: {len(failures)}")
    if failures:
        print(f"Failed repos: {', '.join(failures)}")


if __name__ == "__main__":
    main()
