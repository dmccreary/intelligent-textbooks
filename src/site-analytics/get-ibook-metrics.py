#!/usr/bin/env python3
# get-ibook-metrics.py
import os
import re
from pathlib import Path
import argparse

def count_markdown_files(docs_dir):
    """Count total number of markdown files in the docs directory."""
    return len(list(Path(docs_dir).glob('**/*.md')))

def count_images(docs_dir):
    """Count total number of image files (png and jpg) in the docs directory."""
    png_count = len(list(Path(docs_dir).glob('**/*.png')))
    jpg_count = len(list(Path(docs_dir).glob('**/*.jpg')))
    return png_count + jpg_count

def count_words_in_markdown(docs_dir):
    """Count total number of words in all markdown files."""
    total_words = 0
    for md_file in Path(docs_dir).glob('**/*.md'):
        with open(md_file, 'r', encoding='utf-8') as f:
            content = f.read()
            # Remove code blocks to avoid counting code as words
            content = re.sub(r'```.*?```', '', content, flags=re.DOTALL)
            # Remove inline code
            content = re.sub(r'`.*?`', '', content)
            # Remove URLs
            content = re.sub(r'http[s]?://\S+', '', content)
            # Split and count remaining words
            words = content.split()
            total_words += len(words)
    return total_words

def count_microsims(docs_dir):
    """Count number of subdirectories in the /docs/sims directory."""
    sims_dir = Path(docs_dir) / 'sims'
    if not sims_dir.exists():
        return 0
    return len([d for d in sims_dir.iterdir() if d.is_dir()])

def count_glossary_terms(docs_dir):
    """Count number of level 4 headers (####) in the glossary.md file."""
    glossary_path = Path(docs_dir) / 'glossary.md'
    if not glossary_path.exists():
        return 0
    
    term_count = 0
    with open(glossary_path, 'r', encoding='utf-8') as f:
        content = f.read()
        # Count level 4 headers (####)
        terms = re.findall(r'^####\s+.*$', content, re.MULTILINE)
        term_count = len(terms)
    return term_count

def main():
    parser = argparse.ArgumentParser(description='Calculate metrics for an intelligent textbook repository.')
    parser.add_argument('repo_root', help='Root directory of the checked out repository')
    args = parser.parse_args()

    docs_dir = os.path.join(args.repo_root, 'docs')
    
    if not os.path.exists(docs_dir):
        print(f"Error: docs directory not found at {docs_dir}")
        return 1

    # Calculate metrics
    metrics = {
        'Markdown Files': count_markdown_files(docs_dir),
        'Images': count_images(docs_dir),
        'Total Words': count_words_in_markdown(docs_dir),
        'MicroSims': count_microsims(docs_dir),
        'Glossary Terms': count_glossary_terms(docs_dir)
    }

    # Print results
    print("\nIntelligent Textbook Metrics:")
    print("-" * 30)
    for metric, value in metrics.items():
        print(f"{metric}: {value:,}")

if __name__ == "__main__":
    main()