# Five Levels of Intelligent Textbooks - ArXiv Paper

This directory contains the LaTeX source for an ArXiv paper proposing a five-level classification framework for intelligent textbooks.

## Abstract

The paper proposes a standardized classification system for intelligent textbooks, inspired by the SAE J3016 autonomous vehicle standard. Key contributions include:

- Five-level framework from static (L1) to autonomous AI (L5)
- Identification of Level 3 as a privacy inflection point
- Analysis of regulatory implications (FERPA, COPPA, GDPR)
- Integration with educational standards (xAPI, LRS, IEEE)

## Directory Structure

```
five-levels/
├── README.md           # This file
├── abstract.md         # Standalone abstract (markdown)
├── build.sh            # Build script (requires tectonic)
├── main.tex            # Main LaTeX document
├── main.pdf            # Generated PDF (after build)
├── sections/           # Individual section files
│   ├── 01-abstract.tex
│   ├── 02-introduction.tex
│   ├── 03-economics.tex        # METR study, cost projections
│   ├── 04-related-work.tex
│   ├── 05-sae-analogy.tex
│   ├── 06-five-levels.tex
│   ├── 07-privacy-threshold.tex
│   ├── 08-standards.tex
│   ├── 09-implementation.tex
│   ├── 10-discussion.tex
│   ├── 11-conclusion.tex
│   └── references.bib
└── figures/            # Figures directory (add images here)
```

## Building the PDF

### Prerequisites

Install Tectonic (modern LaTeX engine):

```bash
brew install tectonic
```

### Build Commands

```bash
# Build the PDF
./build.sh

# Clean build artifacts
./build.sh clean

# View the generated PDF
open main.pdf
```

## ArXiv Submission

Target categories:
- **cs.AI** - Artificial Intelligence
- **cs.CY** - Computers and Society

## Authors

- Dan McCreary

## Version History

- v0.01 - Initial draft
