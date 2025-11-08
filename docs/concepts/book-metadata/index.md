# Book Metadata System

A comprehensive metadata management and workflow orchestration system for intelligent textbook creation with Claude Code skills.

## Overview

The Book Metadata System provides centralized tracking of:
- **Dublin Core Metadata** - Standard bibliographic information
- **Skill Dependencies** - Ensures correct execution order
- **Quality Tracking** - Monitors output quality across all skills
- **Workflow Phases** - Guides you through the creation process
- **Progress Visibility** - Clear view of what's done and what's next

## Quick Start

### 1. Check Status

```bash
python src/book_metadata_helper.py status
```

Shows:
- ✓ Completed skills with quality scores
- ○ Skills ready to run
- Blocked skills and why

### 2. Verify Prerequisites

Before running any skill:

```bash
python src/book_metadata_helper.py check --skill quiz_generator
```

### 3. Run the Demo

See the system in action:

```bash
python src/workflow_demo.py
```

This interactive demo simulates the complete workflow.

## Files

### Core Files

| File | Purpose |
|------|---------|
| `book-metadata.yml` | Central metadata and status tracking |
| `src/book_metadata_helper.py` | Python API and CLI tool |
| `src/workflow_demo.py` | Interactive demonstration |

### Documentation

| File | Content |
|------|---------|
| [book-metadata-quickstart.md](book-metadata-quickstart.md) | 5-minute quick start guide |
| [book-metadata-guide.md](book-metadata-guide.md) | Complete reference documentation |
| [skill-dependency-diagram.md](skill-dependency-diagram.md) | Visual dependency graph |
| [skills/metadata-integration-example.md](skills/metadata-integration-example.md) | Code integration examples |
| [BOOK_METADATA_SUMMARY.md](../BOOK_METADATA_SUMMARY.md) | Executive summary |

## Features

### Dependency Management

Skills declare their prerequisites:

```yaml
skills:
  quiz_generator:
    dependencies:
      - skill: learning_graph_generator
        min_quality_score: 70
      - skill: chapter_generator
        min_completion_percentage: 30
```

The system prevents skills from running until dependencies are met.

### Quality Tracking

Each skill execution records:
- Status (not_started, in_progress, completed, failed)
- Quality score (0-100)
- Timestamp
- Output metrics
- Validation results

### Workflow Phases

Six phases guide creation:

1. **Planning** - Course description
2. **Foundation** - Learning graph, glossary
3. **Content Generation** - Chapters, simulations
4. **Enhancement** - Quizzes, FAQs, references
5. **Quality Assurance** - Validation, metrics
6. **Deployment** - Social assets, publishing

### Progress Visibility

Status report shows exactly where you are:

```
SKILLS STATUS:
  ✓ course_description_analyzer: completed (score: 85)
  ✓ learning_graph_generator: completed (score: 92)
  ○ glossary_generator: not_started
  ○ quiz_generator: not_started
      └─ Blocked: Dependency 'chapter_generator' requires 30% completion
```

## Command-Line Interface

### Show Status

```bash
python src/book_metadata_helper.py status
```

Full report of all skills and their status.

### Check Skill

```bash
python src/book_metadata_helper.py check --skill SKILL_NAME
```

Verify if a skill can run.

### Update Status

```bash
python src/book_metadata_helper.py update \
  --skill SKILL_NAME \
  --status completed \
  --score 85
```

Update skill status (usually done automatically by skills).

## Python API

### Basic Usage

```python
from src.book_metadata_helper import BookMetadata

metadata = BookMetadata()

# Check if skill can run
can_run, reasons = metadata.can_skill_run('quiz_generator')

if not can_run:
    print("Cannot run:", reasons)
    exit(1)

# Mark as in progress
metadata.update_skill_status('quiz_generator', 'in_progress')

# Do work...
result = generate_quizzes()

# Mark as completed
metadata.update_skill_status(
    skill_name='quiz_generator',
    status='completed',
    quality_score=result.score,
    outputs=result.metrics
)
```

### Query Skill Data

```python
# Get skill status
skill = metadata.get_skill_status('learning_graph_generator')
concept_count = skill['outputs']['concept_count']

# Get Dublin Core metadata
dc = metadata.get_dublin_core()
title = dc['title']

# Get validation rules
rules = metadata.get_validation_rules()
min_score = rules['min_quality_scores']['learning_graph']
```

## Integration with Skills

### Minimal Integration (3 steps)

**Step 1:** Check prerequisites
```python
can_run, reasons = metadata.can_skill_run('my_skill')
if not can_run:
    print("Blocked:", reasons)
    exit(1)
```

**Step 2:** Mark as running
```python
metadata.update_skill_status('my_skill', 'in_progress')
```

**Step 3:** Update when done
```python
metadata.update_skill_status(
    'my_skill',
    'completed',
    quality_score=85,
    outputs={'files': [...]}
)
```

See [integration examples](skills/metadata-integration-example.md) for complete implementation.

## Skill Dependencies

### Dependency Graph

```
course_description_analyzer
           │
           ▼
learning_graph_generator ──┬──▶ glossary_generator
           │               │
           │               ├──▶ chapter_generator ─┬──▶ quiz_generator
           │               │                       │
           │               └──▶ microsim_p5        └──▶ faq_generator
```

See [dependency diagram](skill-dependency-diagram.md) for complete graph.

### Quality Requirements

Most skills require quality score ≥ 70 from dependencies:

- course_description_analyzer → learning_graph_generator
- learning_graph_generator → glossary, chapters, quizzes, etc.

### Completion Requirements

Some skills need partial completion:

- quiz_generator: needs 30% of chapters
- faq_generator: needs 30% of chapters
- social_media_generator: needs 50% of chapters

## Common Workflows

### Starting a New Book

1. Update `book-metadata.yml` with your book info
2. Run `course_description_analyzer`
3. Check status: `python src/book_metadata_helper.py status`
4. Continue with next unblocked skill

### Checking What's Next

```bash
python src/book_metadata_helper.py status
```

Look for skills marked ○ with no blockers.

### Parallel Execution

After learning graph completes, run simultaneously:
- glossary_generator
- chapter_generator
- microsim_p5
- concept_validator

### Sequential Execution

Must run in order:
1. course_description_analyzer
2. learning_graph_generator
3. Everything else (check dependencies)

## Validation Rules

Configured in `book-metadata.yml`:

```yaml
validation:
  min_quality_scores:
    course_description: 70
    learning_graph: 70
    chapters: 60
    quizzes: 60

  min_completion:
    chapters_for_quizzes: 30
    chapters_for_faqs: 30
```

Adjust these thresholds based on your quality standards.

## Dublin Core Metadata

Standard bibliographic information:

```yaml
dublin_core:
  title: "Your Book Title"
  creator: "Author Name"
  subject: "Subject Areas"
  description: "Course description"
  publisher: "Publisher Name"
  date: "2025-01-15"
  type: "Interactive Textbook"
  format: "text/html"
  identifier: "ISBN or DOI"
  language: "en"
  rights: "Creative Commons BY-SA 4.0"
```

Based on [Dublin Core Metadata Element Set (ISO 15836)](https://www.dublincore.org/specifications/dublin-core/dcmi-terms/).

## Status Values

| Symbol | Status | Meaning |
|--------|--------|---------|
| ✓ | completed | Finished successfully |
| → | in_progress | Currently running |
| ○ | not_started | Not yet run |
| ✗ | failed | Encountered errors |
| ⚠ | needs_update | Quality below threshold |

## Quality Scores

| Range | Rating | Action |
|-------|--------|--------|
| 90-100 | Excellent | Exceeds requirements |
| 80-89 | Very Good | Meets all requirements |
| 70-79 | Good | Meets requirements |
| 60-69 | Acceptable | Minimum requirements met |
| <60 | Needs Work | Re-run or revise |

## Tracked Skills

### Foundation
- `course_description_analyzer` - Validates course description

### Content Generation
- `learning_graph_generator` - Creates concept graph
- `glossary_generator` - Generates terminology
- `chapter_generator` - Writes chapter content
- `microsim_p5` - Creates p5.js simulations

### Enhancement
- `quiz_generator` - Creates assessments
- `faq_generator` - Generates FAQs
- `reference_generator` - Curates bibliography

### Quality Assurance
- `concept_validator` - Validates concepts
- `quality_metrics_analyzer` - Analyzes quality

### Deployment
- `social_media_generator` - Creates social assets

## Examples

### Check if Ready for Quizzes

```bash
$ python src/book_metadata_helper.py check --skill quiz_generator

✗ Skill 'quiz_generator' cannot run:
  - Dependency 'learning_graph_generator' must be completed
  - Dependency 'chapter_generator' requires 30% completion
```

### View Full Status

```bash
$ python src/book_metadata_helper.py status

================================================================================
INTELLIGENT TEXTBOOK STATUS REPORT
================================================================================

Title: My Textbook Title
Creator: Author Name
Language: en

Current Phase: foundation

SKILLS STATUS:
--------------------------------------------------------------------------------
  ✓ course_description_analyzer: completed (score: 85)
  ○ learning_graph_generator: not_started
...
```

### Update After Running Skill

```bash
$ python src/book_metadata_helper.py update \
  --skill learning_graph_generator \
  --status completed \
  --score 92

✓ Updated 'learning_graph_generator' status to 'completed'
```

## Troubleshooting

### Skill Shows as Blocked

Check dependencies:
```bash
python src/book_metadata_helper.py check --skill SKILL_NAME
```

Complete the listed dependencies first.

### Quality Score Too Low

If dependency completed but score < 70:
1. Review the dependency's output
2. Improve quality
3. Re-run the dependency
4. Verify new score ≥ 70

### Reset a Skill

Edit `book-metadata.yml`:
```yaml
skills:
  my_skill:
    status: not_started
    quality_score: null
```

### Cannot Find book-metadata.yml

File must be in repository root. Check with:
```bash
ls book-metadata.yml
```

## Best Practices

1. **Check before running** - Always verify prerequisites
2. **Let skills update** - Don't manually edit metadata
3. **Track quality** - Monitor scores to ensure quality
4. **Follow phases** - Use workflow phases as guide
5. **Run in parallel** - When possible, run independent skills together

## Resources

- [Quick Start Guide](book-metadata-quickstart.md) - Get started in 5 minutes
- [Complete Guide](book-metadata-guide.md) - Full documentation
- [Dependency Diagram](skill-dependency-diagram.md) - Visual workflow
- [Integration Examples](skills/metadata-integration-example.md) - Code samples
- [Summary](../BOOK_METADATA_SUMMARY.md) - Executive overview

## Support

Questions or issues?
1. Check the [troubleshooting](#troubleshooting) section
2. Review the [complete guide](book-metadata-guide.md)
3. See [integration examples](skills/metadata-integration-example.md)
4. Run the [demo](../src/workflow_demo.py) for interactive help

## License

This metadata system is part of the Intelligent Textbooks project.
See [LICENSE](../license.md) for details.
