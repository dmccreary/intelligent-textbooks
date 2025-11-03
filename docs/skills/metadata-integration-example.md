# Skill Metadata Integration Example

This document provides a complete example of how to integrate the book metadata system into your Claude Code skills.

## Example: Quiz Generator Skill

Here's how the quiz generator skill would integrate with `book-metadata.yml`:

### Step 1: Check Prerequisites (Skill Entry Point)

```python
#!/usr/bin/env python3
"""
Quiz Generator Skill
Generates interactive quizzes for textbook chapters
"""

import sys
from pathlib import Path
from src.book_metadata_helper import BookMetadata


def main():
    """Main entry point for quiz generator skill."""

    # Initialize metadata helper
    print("📊 Checking book metadata...")
    metadata = BookMetadata()

    # Check if this skill can run
    can_run, reasons = metadata.can_skill_run('quiz_generator')

    if not can_run:
        print("\n❌ Cannot run quiz generator:")
        for reason in reasons:
            print(f"   • {reason}")
        print("\n💡 Recommendation:")
        print("   Run these skills first:")
        print("   1. course_description_analyzer")
        print("   2. learning_graph_generator")
        print("   3. chapter_generator (at least 30% complete)")
        sys.exit(1)

    print("✅ All prerequisites met!\n")

    # Mark skill as in progress
    metadata.update_skill_status('quiz_generator', 'in_progress')

    # Run the quiz generation
    try:
        result = generate_quizzes(metadata)

        # Update with results
        metadata.update_skill_status(
            skill_name='quiz_generator',
            status='completed',
            quality_score=result['quality_score'],
            outputs=result['outputs']
        )

        print(f"\n✅ Quiz generation completed!")
        print(f"   Quality Score: {result['quality_score']}/100")
        print(f"   Quizzes Generated: {result['outputs']['quizzes_generated']}")
        print(f"   Total Questions: {result['outputs']['total_questions']}")

    except Exception as e:
        # Mark as failed with error details
        metadata.update_skill_status(
            skill_name='quiz_generator',
            status='failed',
            notes=f"Error: {str(e)}"
        )
        raise


def generate_quizzes(metadata: BookMetadata) -> dict:
    """
    Generate quizzes based on learning graph and chapter content.

    Args:
        metadata: BookMetadata instance for accessing book data

    Returns:
        Dictionary with quality_score and outputs
    """
    # Get learning graph data
    learning_graph_status = metadata.get_skill_status('learning_graph_generator')
    concept_count = learning_graph_status['outputs']['concept_count']

    # Get chapter data
    chapter_status = metadata.get_skill_status('chapter_generator')
    chapters = chapter_status['outputs']['chapters_list']

    print(f"📚 Found {len(chapters)} chapters")
    print(f"🎯 Found {concept_count} concepts in learning graph")

    # Generate quiz for each chapter
    quizzes_generated = 0
    total_questions = 0
    blooms_distribution = {
        'remember': 0,
        'understand': 0,
        'apply': 0,
        'analyze': 0,
        'evaluate': 0,
        'create': 0
    }

    quiz_list = []

    for chapter in chapters:
        print(f"\n📝 Generating quiz for: {chapter['title']}")

        # Here you would call Claude to generate quiz content
        # For now, we'll simulate it
        quiz = generate_chapter_quiz(chapter, metadata)

        quizzes_generated += 1
        total_questions += len(quiz['questions'])

        # Track Bloom's taxonomy distribution
        for question in quiz['questions']:
            blooms_level = question.get('blooms_level', 'remember')
            blooms_distribution[blooms_level] += 1

        quiz_list.append(quiz['file_path'])

    # Validate quiz quality
    validation_passed = validate_quizzes(quizzes_generated, total_questions, blooms_distribution)

    # Calculate quality score
    quality_score = calculate_quality_score(
        quizzes_generated,
        total_questions,
        blooms_distribution,
        validation_passed
    )

    return {
        'quality_score': quality_score,
        'outputs': {
            'quizzes_generated': quizzes_generated,
            'quiz_list': quiz_list,
            'total_questions': total_questions,
            'blooms_distribution': blooms_distribution,
            'validation_passed': validation_passed['passed'],
            'issues': validation_passed['issues']
        }
    }


def generate_chapter_quiz(chapter: dict, metadata: BookMetadata) -> dict:
    """Generate quiz for a specific chapter."""
    # Implementation would use Claude to generate questions
    # based on chapter content and learning objectives
    return {
        'file_path': f"docs/quizzes/{chapter['slug']}.md",
        'questions': []  # Would contain actual questions
    }


def validate_quizzes(quiz_count: int, question_count: int, blooms: dict) -> dict:
    """Validate quiz quality."""
    issues = []

    # Check minimum questions per quiz
    avg_questions = question_count / quiz_count if quiz_count > 0 else 0
    if avg_questions < 5:
        issues.append(f"Average questions per quiz ({avg_questions:.1f}) below minimum (5)")

    # Check Bloom's taxonomy distribution
    # Should have questions across multiple levels
    non_empty_levels = sum(1 for count in blooms.values() if count > 0)
    if non_empty_levels < 3:
        issues.append(f"Questions only cover {non_empty_levels} Bloom's levels (should be 3+)")

    # Check for too many lower-order questions
    lower_order = blooms.get('remember', 0) + blooms.get('understand', 0)
    higher_order = sum(blooms.values()) - lower_order

    if question_count > 0 and (lower_order / question_count) > 0.7:
        issues.append("Too many lower-order questions (>70%)")

    return {
        'passed': len(issues) == 0,
        'issues': issues
    }


def calculate_quality_score(
    quiz_count: int,
    question_count: int,
    blooms: dict,
    validation: dict
) -> int:
    """
    Calculate overall quality score for quiz generation.

    Scoring criteria:
    - Quiz count: 20 points (1 point per quiz, max 20)
    - Question count: 20 points (1 point per 10 questions, max 20)
    - Bloom's coverage: 30 points (5 points per level covered)
    - Bloom's balance: 20 points (higher-order questions bonus)
    - Validation: 10 points (all checks passed)
    """
    score = 0

    # Quiz count (max 20 points)
    score += min(quiz_count, 20)

    # Question count (max 20 points)
    score += min(question_count // 10, 20)

    # Bloom's coverage (max 30 points)
    non_empty_levels = sum(1 for count in blooms.values() if count > 0)
    score += non_empty_levels * 5

    # Bloom's balance (max 20 points)
    if question_count > 0:
        lower_order = blooms.get('remember', 0) + blooms.get('understand', 0)
        higher_order = question_count - lower_order
        higher_order_pct = higher_order / question_count
        score += int(higher_order_pct * 20)

    # Validation (max 10 points)
    if validation['passed']:
        score += 10

    return min(score, 100)


if __name__ == '__main__':
    main()
```

## Example: Using in Claude Code Skill Prompts

Here's how to structure your skill prompt to integrate with metadata:

### Quiz Generator Skill Prompt (SKILL.md)

````markdown
# Quiz Generator Skill

This skill generates interactive multiple-choice quizzes for each chapter of an intelligent textbook, with questions aligned to specific concepts from the learning graph and distributed across Bloom's Taxonomy cognitive levels.

## Prerequisites Check

Before running this skill, execute the following Python code to verify prerequisites:

```python
from src.book_metadata_helper import BookMetadata

metadata = BookMetadata()
can_run, reasons = metadata.can_skill_run('quiz_generator')

if not can_run:
    print("❌ Prerequisites not met:")
    for reason in reasons:
        print(f"  • {reason}")
    exit(1)

print("✅ Prerequisites met - proceeding with quiz generation")
metadata.update_skill_status('quiz_generator', 'in_progress')
```

## Required Context

Gather the following information from the metadata:

1. **Learning Graph**: Read concept list and Bloom's taxonomy categorization
2. **Chapter List**: Get all chapters that have been generated
3. **Course Description**: Understand learning objectives and audience level

```python
# Get required data
learning_graph = metadata.get_skill_status('learning_graph_generator')
chapters = metadata.get_skill_status('chapter_generator')
course_desc = metadata.get_dublin_core()

print(f"Generating quizzes for {chapters['outputs']['chapters_generated']} chapters")
print(f"Using {learning_graph['outputs']['concept_count']} concepts")
```

## Generation Process

For each chapter:

1. **Read chapter content** from `docs/chapters/<chapter-name>.md`
2. **Identify key concepts** covered in the chapter (from learning graph)
3. **Generate 5-10 questions** per chapter:
   - Questions aligned to specific concepts
   - Distributed across Bloom's taxonomy levels
   - Mix of difficulty levels
4. **Format as interactive quiz** using mkdocs-material quiz format
5. **Save to** `docs/quizzes/<chapter-name>-quiz.md`

### Question Distribution Guidelines

For college-level textbooks:
- 20% Remember (recall facts)
- 25% Understand (explain concepts)
- 25% Apply (use in new situations)
- 15% Analyze (draw connections)
- 10% Evaluate (justify decisions)
- 5% Create (produce new work)

## Quality Validation

After generating all quizzes, validate:

1. ✅ Each chapter has a corresponding quiz
2. ✅ Minimum 5 questions per quiz
3. ✅ Questions cover at least 3 Bloom's levels
4. ✅ No more than 70% lower-order questions (Remember/Understand)
5. ✅ All questions have correct answers and explanations

Calculate quality score:
- 100 points: All criteria met, excellent distribution
- 80-99: Minor issues with distribution
- 60-79: Some validation failures
- <60: Major issues, needs rework

## Update Metadata

After completion, update the skill status:

```python
metadata.update_skill_status(
    skill_name='quiz_generator',
    status='completed',  # or 'needs_update' if quality < 60
    quality_score=calculated_score,
    outputs={
        'quizzes_generated': quiz_count,
        'quiz_list': list_of_quiz_files,
        'total_questions': total_questions,
        'blooms_distribution': {
            'remember': count,
            'understand': count,
            # ... etc
        },
        'validation_passed': True/False,
        'issues': []  # List any validation failures
    }
)
```

## Output Format

Generate quizzes in this format:

```markdown
# Chapter X Quiz

Test your understanding of [Chapter Name] concepts.

## Question 1
**Concept:** [Concept name from learning graph]
**Bloom's Level:** Remember

What is the primary purpose of...?

A) Option 1
B) Option 2
C) Option 3
D) Option 4

??? success "Answer"
    **C) Option 3**

    Explanation: [Why this is correct and why others are incorrect]
```

## Success Criteria

This skill is successful when:

1. ✅ Quality score ≥ 60
2. ✅ All chapters have quizzes
3. ✅ Validation passes
4. ✅ Metadata is updated with results
5. ✅ Quiz files are created in `docs/quizzes/`

````

## Example: Checking Status Before Running

Here's a complete workflow example showing how a user or automated system would work with the metadata:

```python
#!/usr/bin/env python3
"""
Complete workflow example for running multiple skills in sequence
"""

from src.book_metadata_helper import BookMetadata


def run_intelligent_textbook_workflow():
    """Run the complete textbook generation workflow."""

    metadata = BookMetadata()

    # Define the workflow sequence
    workflow = [
        'course_description_analyzer',
        'learning_graph_generator',
        'glossary_generator',
        'chapter_generator',
        'quiz_generator',
        'faq_generator',
        'reference_generator'
    ]

    print("=" * 80)
    print("INTELLIGENT TEXTBOOK GENERATION WORKFLOW")
    print("=" * 80)
    print()

    for skill_name in workflow:
        print(f"\n{'=' * 80}")
        print(f"SKILL: {skill_name}")
        print(f"{'=' * 80}")

        # Check if skill can run
        can_run, reasons = metadata.can_skill_run(skill_name)

        if not can_run:
            print(f"⏸️  Skipping {skill_name} - prerequisites not met:")
            for reason in reasons:
                print(f"   • {reason}")
            print("\n💡 Complete the following skills first:")
            skill_data = metadata.get_skill_status(skill_name)
            for dep in skill_data.get('dependencies', []):
                if isinstance(dep, dict):
                    print(f"   • {dep['skill']}")
                else:
                    print(f"   • {dep}")
            continue

        # Check if already completed
        skill_status = metadata.get_skill_status(skill_name)
        if skill_status['status'] == 'completed':
            score = skill_status.get('quality_score', 'N/A')
            print(f"✅ Already completed (score: {score})")
            continue

        # Skill can run - would normally invoke the skill here
        print(f"🚀 Ready to run {skill_name}")
        print(f"   Dependencies: ✅ All met")

        # In a real workflow, you would invoke the skill here:
        # run_skill(skill_name)

        # For this example, we'll just simulate it
        print(f"   ⏭️  Would invoke skill here...")

    # Generate final report
    print("\n")
    print(metadata.generate_status_report())


if __name__ == '__main__':
    run_intelligent_textbook_workflow()
```

## Integration with Claude Code

When using Claude Code, the assistant can check metadata before running skills:

### User Request:
> "Please generate quizzes for my textbook"

### Claude Response:
```markdown
I'll generate quizzes for your textbook. Let me first check if prerequisites are met.

<uses Python tool to check metadata>

I see that:
- ✅ Course description is complete (score: 85)
- ✅ Learning graph is complete (score: 92)
- ❌ Chapter generation is not yet complete (only 20% done)

The quiz generator requires at least 30% of chapters to be completed before it can run.

Would you like me to:
1. Continue generating chapters until we reach 30%, then generate quizzes
2. Generate quizzes only for the completed chapters
3. Wait and generate quizzes later when more chapters are done

Please let me know your preference.
```

This integration ensures skills run in the correct order and with sufficient prerequisites, making the textbook creation process more reliable and systematic.

## See Also

- [Book Metadata Guide](../book-metadata-guide.md) - Complete documentation
- [Python Helper API](../../src/book_metadata_helper.py) - Source code
- [Workflow Documentation](../../workflow/index.md) - Process overview
