#!/bin/bash
# Build script for Five Levels of Intelligent Textbooks ArXiv Paper
# Uses Tectonic for modern LaTeX compilation

set -e  # Exit on error

# Change to the paper directory
cd "$(dirname "$0")"

echo "Building Five Levels of Intelligent Textbooks Paper..."
echo "======================================================="
echo ""

# Check if tectonic is installed
if ! command -v tectonic &> /dev/null; then
    echo "Error: Tectonic is not installed."
    echo "Install with: brew install tectonic"
    exit 1
fi

# Clean previous build artifacts (optional)
if [ "$1" == "clean" ]; then
    echo "Cleaning build artifacts..."
    rm -f main.pdf main.aux main.log main.out main.bbl main.blg
    rm -f arxiv-upload.zip
    echo "Clean complete."
    exit 0
fi

# ArXiv packaging option
ARXIV_PACKAGE=false
if [ "$1" == "-a" ]; then
    ARXIV_PACKAGE=true
fi

# Run tectonic
echo "Running tectonic..."
tectonic main.tex

# Check if PDF was generated
if [ -f "main.pdf" ]; then
    echo ""
    echo "Success! PDF generated: main.pdf"
    echo ""
    echo "File size: $(du -h main.pdf | cut -f1)"
    echo "Page count: $(pdfinfo main.pdf 2>/dev/null | grep Pages | awk '{print $2}')"
    echo ""
    echo "To view the PDF:"
    echo "  open main.pdf"

    # Create ArXiv zip package if -a option was used
    if [ "$ARXIV_PACKAGE" == "true" ]; then
        echo ""
        echo "Creating ArXiv upload package..."
        echo "================================="

        # Remove old zip if exists
        rm -f arxiv-upload.zip

        # Create zip with all LaTeX source files and figures
        zip -r arxiv-upload.zip \
            main.tex \
            sections/*.tex \
            sections/references.bib \
            figures/*.png \
            -x "*.DS_Store"

        echo ""
        echo "ArXiv package created: arxiv-upload.zip"
        echo "Package size: $(du -h arxiv-upload.zip | cut -f1)"
        echo ""
        echo "Contents:"
        unzip -l arxiv-upload.zip | grep -E "^\s+[0-9]+" | awk '{print $4}'
    fi
else
    echo ""
    echo "Error: PDF generation failed!"
    exit 1
fi
