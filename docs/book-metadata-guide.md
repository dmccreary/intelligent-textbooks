# Book Metadata Guide

This guide explains how to use the `book-metadata.yml` file and helper scripts for managing intelligent textbook creation workflows with Claude Code skills.

## Overview

The `book-metadata.yml` file serves as a central hub for:

1. **Dublin Core Metadata** - Standard bibliographic information about the textbook
2. **Skill Execution Tracking** - Status and results of each Claude Code skill
3. **Workflow Management** - Overall progress through textbook creation phases
4. **Dependency Management** - Ensures skills run in the correct order
5. **Quality Validation** - Tracks quality scores and completion metrics

## File Structure

### Dublin Core Metadata

Standard bibliographic metadata following ISO 15836:

```yaml
dublin_core:
  title: "Your Textbook Title"
  creator: "Author Name"
  subject: "Subject Areas"
  description: "Course description"
  language: "en"
  # ... other Dublin Core fields
```

### Book Information

Course-specific characteristics:

```yaml
book_info:
  intelligence_level: 2  # 1-5 scale
  academic_level: "college"  # junior-high, senior-high, college, graduate
  duration_weeks: 10
  estimated_chapters: 12
  estimated_concepts: 200
```

### Skill Execution Status

Each skill has a detailed status entry:

```yaml
skills:
  course_description_analyzer:
    status: "completed"  # not_started, in_progress, completed, failed, needs_update
    quality_score: 85  # 0-100
    date_run: "2025-01-15T10:30:00Z"
    version: "1.0.0"
    dependencies: []  # Skills that must run first
    outputs:
      file_path: "docs/course-description.md"
      validation_passed: true
      issues: []
    notes: "Additional notes about execution"
```

### Workflow Phases

Six main phases track overall progress:

1. **Planning** - Initial setup and course description
2. **Foundation** - Learning graph, glossary
3. **Content Generation** - Chapters, MicroSims
4. **Enhancement** - Quizzes, FAQs, references
5. **Quality Assurance** - Validation and metrics
6. **Deployment** - Social media assets, site deployment

## Using the Python Helper

### Command Line Usage

Check overall status:
```bash
python src/book_metadata_helper.py status
```

Check if a skill can run:
```bash
python src/book_metadata_helper.py check --skill quiz_generator
```

Update skill status:
```bash
python src/book_metadata_helper.py update \
  --skill quiz_generator \
  --status completed \
  --score 85
```

### Python API Usage

In your Claude Code skills or scripts:

```python
from src.book_metadata_helper import BookMetadata

# Initialize
metadata = BookMetadata()

# Check if skill can run
can_run, reasons = metadata.can_skill_run('quiz_generator')
if not can_run:
    print("Cannot run skill:")
    for reason in reasons:
        print(f"  - {reason}")
    exit(1)

# Run your skill...
# ...

# Update status when complete
metadata.update_skill_status(
    skill_name='quiz_generator',
    status='completed',
    quality_score=85,
    outputs={
        'quizzes_generated': 12,
        'total_questions': 120,
        'validation_passed': True
    }
)
```

## Skill Dependencies

Skills define their dependencies to ensure correct execution order:

### Simple Dependencies

Run after another skill completes:

```yaml
dependencies:
  - "course_description_analyzer"
```

### Quality Score Dependencies

Run only if previous skill meets quality threshold:

```yaml
dependencies:
  - skill: "course_description_analyzer"
    min_quality_score: 70
```

### Completion Percentage Dependencies

Run when previous skill reaches completion milestone:

```yaml
dependencies:
  - skill: "chapter_generator"
    min_completion_percentage: 30
```

## Common Workflow Patterns

### Starting a New Textbook

1. Update Dublin Core metadata with your book information
2. Run `course_description_analyzer` skill
3. Check if quality score meets threshold (≥70)
4. Proceed to `learning_graph_generator`

### Checking Readiness

Before running any skill:

```python
metadata = BookMetadata()
can_run, reasons = metadata.can_skill_run('your_skill_name')
if not can_run:
    # Display or log reasons
    # Guide user on what to do next
```

### Updating Progress

After completing a major milestone:

```python
metadata.update_skill_status(
    skill_name='learning_graph_generator',
    status='completed',
    quality_score=92,
    outputs={
        'concept_count': 203,
        'files': ['docs/sims/learning-graph/intelligent-textbooks.csv'],
        'validation_passed': True
    }
)
```

### Generating Reports

Get a full status overview:

```python
report = metadata.generate_status_report()
print(report)
```

Output:
```
================================================================================
INTELLIGENT TEXTBOOK STATUS REPORT
================================================================================

Title: Designing and Building Intelligent Textbooks
Creator: Dan McCreary
Language: en

Current Phase: foundation

SKILLS STATUS:
--------------------------------------------------------------------------------
  ✓ course_description_analyzer: completed (score: 85)
  ✓ learning_graph_generator: completed (score: 92)
  → glossary_generator: in_progress
  ○ chapter_generator: not_started
      └─ Blocked: Dependency 'learning_graph_generator' requires quality score >= 70
...
```

## Validation Rules

The metadata file includes validation rules:

```yaml
validation:
  min_quality_scores:
    course_description: 70
    learning_graph: 70
    glossary: 70
    chapters: 60
    quizzes: 60

  min_completion:
    chapters_for_quizzes: 30  # 30% of chapters before generating quizzes
    chapters_for_faqs: 30
    chapters_for_social: 50

  required_files:
    - "docs/course-description.md"
    - "docs/glossary.md"
    - "docs/faq.md"
```

## Best Practices

### For Skill Developers

1. **Always check dependencies** before running your skill
2. **Update status immediately** when starting (`in_progress`) and completing
3. **Include quality scores** when your skill can assess output quality
4. **Populate outputs** with useful metrics and file paths
5. **Log issues** in the outputs.issues array for failed validations

### For Textbook Authors

1. **Start with course description** - foundation for everything else
2. **Follow the workflow phases** - don't skip ahead
3. **Check status regularly** - use the status report to track progress
4. **Validate quality scores** - ensure each step meets minimum thresholds
5. **Update Dublin Core** - keep metadata current as project evolves

### For Automated Workflows

```python
def run_skill_with_checks(skill_name, skill_function):
    """Wrapper to run skills with automatic dependency checking."""
    metadata = BookMetadata()

    # Check dependencies
    can_run, reasons = metadata.can_skill_run(skill_name)
    if not can_run:
        raise RuntimeError(f"Cannot run {skill_name}: {reasons}")

    # Mark as in progress
    metadata.update_skill_status(skill_name, 'in_progress')

    try:
        # Run the actual skill
        result = skill_function()

        # Mark as completed
        metadata.update_skill_status(
            skill_name,
            'completed',
            quality_score=result.quality_score,
            outputs=result.outputs
        )

    except Exception as e:
        # Mark as failed
        metadata.update_skill_status(
            skill_name,
            'failed',
            notes=str(e)
        )
        raise

# Usage
run_skill_with_checks('glossary_generator', generate_glossary)
```

## Integration with Claude Code Skills

### In Your Skill Prompt

Include instructions for Claude to check and update metadata:

```markdown
## Before Running This Skill

1. Use the BookMetadata helper to check if dependencies are met
2. If dependencies are not met, inform the user what needs to be done first
3. If ready, update status to 'in_progress'

## After Completing This Skill

1. Calculate a quality score (0-100) based on validation criteria
2. Update the skill status with:
   - status: 'completed'
   - quality_score: <your calculated score>
   - outputs: <dictionary with file paths, counts, validation results>
3. If validation fails, set status to 'needs_update' with issues listed
```

### Example Skill Integration

```markdown
# Glossary Generator Skill

## Execution Steps

1. **Check Prerequisites**
   ```python
   from src.book_metadata_helper import BookMetadata

   metadata = BookMetadata()
   can_run, reasons = metadata.can_skill_run('glossary_generator')

   if not can_run:
       print("Prerequisites not met:")
       for reason in reasons:
           print(f"  - {reason}")
       exit(1)
   ```

2. **Mark as In Progress**
   ```python
   metadata.update_skill_status('glossary_generator', 'in_progress')
   ```

3. **Generate Glossary**
   - Read learning graph concepts
   - Generate ISO 11179 compliant definitions
   - Write to docs/glossary.md

4. **Validate and Score**
   - Check all concepts have definitions
   - Validate ISO 11179 compliance
   - Calculate quality score

5. **Update Metadata**
   ```python
   metadata.update_skill_status(
       skill_name='glossary_generator',
       status='completed',
       quality_score=quality_score,
       outputs={
           'file_path': 'docs/glossary.md',
           'term_count': term_count,
           'iso_11179_compliant': True,
           'validation_passed': True,
           'issues': []
       }
   )
   ```
```

## Troubleshooting

### "Skill not found in metadata"

Add your skill to the `skills:` section in `book-metadata.yml`.

### "Dependency requires quality score >= X"

Re-run the dependency skill or improve its quality score.

### "Cannot find book-metadata.yml"

Ensure the file exists in your repository root. The helper searches upward from `src/` to find it.

### Quality score too low

Review the skill's validation criteria and outputs to identify improvements needed.

## Future Enhancements

Planned features for the metadata system:

- **Version control integration** - Track commits associated with skill runs
- **Multi-book support** - Manage multiple textbooks in one repository
- **Web dashboard** - Visual interface for tracking progress
- **CI/CD integration** - Automated validation in GitHub Actions
- **Skill marketplace** - Share quality scores and best practices

## See Also

- [Intelligent Textbook Workflows](../workflow/index.md)
- [Claude Code Skills Documentation](../skills/index.md)
- [Dublin Core Metadata Guide](https://www.dublincore.org/specifications/dublin-core/dcmi-terms/)
- [ISO 11179 Metadata Standard](https://www.iso.org/standard/50340.html)
