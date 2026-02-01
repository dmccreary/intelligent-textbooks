#!/bin/bash
# Convert markdown files to EPUB for Amazon Kindle publishing
# Usage: ./markdown-to-epub.sh

set -e

# Activate conda environment
eval "$(conda shell.bash hook)"
conda activate mkdocs

# Directory paths
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
PRINT_BOOK_DIR="$PROJECT_ROOT/print-book"
CHAPTERS_DIR="$PRINT_BOOK_DIR/chapters"
IMAGES_DIR="$PRINT_BOOK_DIR/images"
OUTPUT_DIR="$PRINT_BOOK_DIR/output"

# Create output directory if it doesn't exist
mkdir -p "$OUTPUT_DIR"

# Metadata file path
METADATA_FILE="$SCRIPT_DIR/metadata.yaml"

# Output file
OUTPUT_FILE="$OUTPUT_DIR/intelligent-textbooks.epub"

echo "Converting markdown to EPUB..."
echo "Source: $CHAPTERS_DIR"
echo "Output: $OUTPUT_FILE"

# Check if pandoc is installed
if ! command -v pandoc &> /dev/null; then
    echo "Error: pandoc is not installed. Install with: conda install -c conda-forge pandoc"
    exit 1
fi

# Check if chapters directory exists
if [ ! -d "$CHAPTERS_DIR" ]; then
    echo "Error: Chapters directory not found: $CHAPTERS_DIR"
    exit 1
fi

# Get all chapter files in order
CHAPTER_FILES=$(ls "$CHAPTERS_DIR"/*.md 2>/dev/null | sort)

if [ -z "$CHAPTER_FILES" ]; then
    echo "Error: No markdown files found in $CHAPTERS_DIR"
    exit 1
fi

echo "Found chapters:"
for f in $CHAPTER_FILES; do
    echo "  - $(basename "$f")"
done
echo ""

# Build the EPUB
# --resource-path tells pandoc where to find images
# --toc generates table of contents
# --toc-depth=2 includes h1 and h2 in TOC
pandoc \
    --metadata-file="$METADATA_FILE" \
    --resource-path="$IMAGES_DIR:$CHAPTERS_DIR" \
    --toc \
    --toc-depth=2 \
    --split-level=1 \
    -o "$OUTPUT_FILE" \
    $CHAPTER_FILES

echo "Done! EPUB created at: $OUTPUT_FILE"
echo ""
echo "File size: $(du -h "$OUTPUT_FILE" | cut -f1)"
echo ""
echo "Next steps:"
echo "  1. Test with: open $OUTPUT_FILE"
echo "  2. Or test with Kindle Previewer"
echo "  3. Upload to Amazon KDP when ready"
