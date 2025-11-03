# Book Metadata Quick Start Guide

Get started with the book metadata system in 5 minutes.

## For Textbook Authors

### Check Your Book Status

```bash
python src/book_metadata_helper.py status
```

This shows you:
- Which skills have been completed ✓
- Which skills are ready to run ○
- Which skills are blocked and why

### Before Running Any Skill

Check if prerequisites are met:

```bash
python src/book_metadata_helper.py check --skill <skill_name>
```

Examples:
```bash
# Can I generate quizzes?
python src/book_metadata_helper.py check --skill quiz_generator

# Can I generate the learning graph?
python src/book_metadata_helper.py check --skill learning_graph_generator
```

### After Running a Skill

Update the metadata (usually done automatically by the skill):

```bash
python src/book_metadata_helper.py update \
  --skill quiz_generator \
  --status completed \
  --score 85
```

## For Skill Developers

### Add 3 Lines to Your Skill

**Step 1: Check if skill can run**

Add this at the start of your skill:

```python
from src.book_metadata_helper import BookMetadata

metadata = BookMetadata()
can_run, reasons = metadata.can_skill_run('your_skill_name')

if not can_run:
    print("❌ Cannot run - prerequisites not met:")
    for reason in reasons:
        print(f"  • {reason}")
    exit(1)
```

**Step 2: Mark as in progress**

```python
metadata.update_skill_status('your_skill_name', 'in_progress')
```

**Step 3: Update when complete**

```python
metadata.update_skill_status(
    skill_name='your_skill_name',
    status='completed',
    quality_score=your_calculated_score,
    outputs={
        'key_metrics': 'values',
        'files_generated': ['list', 'of', 'files']
    }
)
```

### Full Minimal Example

```python
#!/usr/bin/env python3
"""Minimal skill with metadata integration."""

from src.book_metadata_helper import BookMetadata

def main():
    metadata = BookMetadata()

    # Check prerequisites
    can_run, reasons = metadata.can_skill_run('my_skill')
    if not can_run:
        print("❌ Cannot run:")
        for reason in reasons:
            print(f"  • {reason}")
        return

    # Mark as in progress
    metadata.update_skill_status('my_skill', 'in_progress')

    try:
        # Do your skill work here
        result = do_skill_work()

        # Mark as completed
        metadata.update_skill_status(
            skill_name='my_skill',
            status='completed',
            quality_score=result.score,
            outputs=result.metrics
        )

    except Exception as e:
        # Mark as failed
        metadata.update_skill_status('my_skill', 'failed', notes=str(e))
        raise

if __name__ == '__main__':
    main()
```

## Common Workflows

### Starting a New Book

1. Update `book-metadata.yml` with your book information:
   ```yaml
   dublin_core:
     title: "Your Book Title"
     creator: "Your Name"
     description: "Your course description"
   ```

2. Run course description analyzer:
   ```bash
   # Check if ready
   python src/book_metadata_helper.py check --skill course_description_analyzer

   # Run the skill (using Claude Code or your script)
   # Skill will automatically update metadata
   ```

3. Check status:
   ```bash
   python src/book_metadata_helper.py status
   ```

### Sequential Skill Execution

Follow this order for best results:

1. **course_description_analyzer** - Foundation
2. **learning_graph_generator** - Concept mapping
3. **glossary_generator** - Term definitions
4. **reference_generator** - Bibliography
5. **chapter_generator** - Content (can run in parallel with glossary/references)
6. **quiz_generator** - Assessment (after 30% of chapters)
7. **faq_generator** - Questions (after 30% of chapters)
8. **microsim_p5** - Interactive content (anytime after learning graph)
9. **quality_metrics_analyzer** - Validation (anytime)
10. **social_media_generator** - Marketing (after 50% of chapters)

### Checking What's Next

The status report tells you what you can do next:

```bash
python src/book_metadata_helper.py status
```

Look for skills marked with ○ (not started) that have **no blockers** listed.

### Resuming Work on a Book

1. Check current status:
   ```bash
   python src/book_metadata_helper.py status
   ```

2. Find the current phase:
   ```
   Current Phase: content_generation
   ```

3. Look for next unblocked skill and run it

## Integration with Claude Code

When asking Claude Code to help with your textbook:

**Good request:**
> "Check the book metadata and tell me what skill I should run next"

**Claude will:**
1. Run `python src/book_metadata_helper.py status`
2. Analyze what's completed and what's blocked
3. Recommend the next logical skill to run
4. Offer to run it for you

**Good request:**
> "Generate quizzes for my textbook"

**Claude will:**
1. Check if quiz_generator can run
2. If blocked, tell you what needs to be done first
3. If ready, run the skill and update metadata automatically

## Skill Status Values

- **not_started** ○ - Skill hasn't been run yet
- **in_progress** → - Skill is currently running
- **completed** ✓ - Skill finished successfully
- **failed** ✗ - Skill encountered errors
- **needs_update** ⚠ - Skill completed but quality score below threshold

## Quality Score Guidelines

- **90-100**: Excellent - Exceeds all requirements
- **80-89**: Very Good - Meets all requirements with minor issues
- **70-79**: Good - Meets requirements, some improvements needed
- **60-69**: Acceptable - Meets minimum requirements
- **Below 60**: Needs Work - Should be re-run or revised

Most skills require a minimum score of 70 from their dependencies.

## Troubleshooting

### "Cannot find book-metadata.yml"

The file should be in your repository root. If missing:

```bash
# Check if it exists
ls book-metadata.yml

# If not, you may need to create it from template
```

### Skill shows as blocked but dependency is completed

Check the quality score:

```bash
python src/book_metadata_helper.py status | grep dependency_name
```

If score is below 70, you may need to re-run the dependency.

### Need to reset a skill

Edit `book-metadata.yml` and change the skill's status back to `not_started`:

```yaml
skills:
  my_skill:
    status: not_started  # Change from completed/failed
    quality_score: null
```

Or use Python:

```python
from src.book_metadata_helper import BookMetadata
metadata = BookMetadata()
metadata.update_skill_status('my_skill', 'not_started', quality_score=None)
```

## Tips

1. **Always check status before starting** - Saves time and prevents errors
2. **Let skills update metadata** - Don't manually edit unless necessary
3. **Track quality scores** - They determine what can run next
4. **Use the status report** - It's your workflow dashboard
5. **Follow the phases** - They guide you through the process

## Next Steps

- Read the [complete guide](book-metadata-guide.md)
- See [integration examples](skills/metadata-integration-example.md)
- Review [skill documentation](skills/index.md)
- Check [workflow overview](../workflow/index.md)

## Quick Reference

```bash
# Show full status
python src/book_metadata_helper.py status

# Check if skill can run
python src/book_metadata_helper.py check --skill SKILL_NAME

# Update skill status
python src/book_metadata_helper.py update --skill SKILL_NAME --status STATUS --score SCORE
```

**Status values:** `not_started`, `in_progress`, `completed`, `failed`, `needs_update`

**Common skill names:**
- `course_description_analyzer`
- `learning_graph_generator`
- `glossary_generator`
- `chapter_generator`
- `quiz_generator`
- `faq_generator`
- `reference_generator`
- `microsim_p5`
