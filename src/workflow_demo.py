#!/usr/bin/env python3
"""
Workflow Demo
=============

Demonstrates the book metadata workflow system by simulating
skill execution and showing how dependencies work.

This is for demonstration purposes - actual skills would do real work.
"""

import time
from book_metadata_helper import BookMetadata


def simulate_skill_run(
    skill_name: str,
    metadata: BookMetadata,
    simulated_score: int = 85,
    simulated_outputs: dict = None
):
    """
    Simulate running a skill with the metadata system.

    Args:
        skill_name: Name of skill to simulate
        metadata: BookMetadata instance
        simulated_score: Quality score to assign (0-100)
        simulated_outputs: Optional output metrics to record
    """
    print(f"\n{'='*80}")
    print(f"ATTEMPTING TO RUN: {skill_name}")
    print(f"{'='*80}")

    # Check if skill can run
    can_run, reasons = metadata.can_skill_run(skill_name)

    if not can_run:
        print(f"\n❌ Cannot run {skill_name}")
        print("\nBlocked by:")
        for reason in reasons:
            print(f"  • {reason}")
        print("\n💡 Complete the blocking skills first")
        return False

    print(f"✅ All prerequisites met")

    # Mark as in progress
    print(f"\n▶ Starting {skill_name}...")
    metadata.update_skill_status(skill_name, 'in_progress')

    # Simulate work being done
    print("   Working", end="", flush=True)
    for _ in range(3):
        time.sleep(0.3)
        print(".", end="", flush=True)
    print(" done!")

    # Mark as completed with score
    if simulated_outputs is None:
        simulated_outputs = {}

    metadata.update_skill_status(
        skill_name=skill_name,
        status='completed',
        quality_score=simulated_score,
        outputs=simulated_outputs
    )

    print(f"✅ Completed with quality score: {simulated_score}/100")
    return True


def main():
    """Run the workflow demonstration."""

    print("╔" + "="*78 + "╗")
    print("║" + " "*20 + "INTELLIGENT TEXTBOOK WORKFLOW DEMO" + " "*24 + "║")
    print("╚" + "="*78 + "╝")
    print()
    print("This demo simulates running skills in dependency order,")
    print("showing how the metadata system tracks progress.")
    print()

    # Initialize metadata
    metadata = BookMetadata()

    # Show initial status
    print("\n" + "="*80)
    print("INITIAL STATUS")
    print("="*80)
    print("\nRunning: python src/book_metadata_helper.py status\n")
    print(metadata.generate_status_report())

    input("\n⏸  Press Enter to start workflow simulation...")

    # Workflow sequence
    workflow = [
        ('course_description_analyzer', 85, {
            'file_path': 'docs/course-description.md',
            'validation_passed': True,
            'issues': []
        }),
        ('learning_graph_generator', 92, {
            'concept_count': 203,
            'files': [
                'docs/sims/learning-graph/intelligent-textbooks.csv',
                'docs/sims/learning-graph/intelligent-textbooks.json'
            ],
            'validation_passed': True,
            'issues': []
        }),
        ('glossary_generator', 88, {
            'file_path': 'docs/glossary.md',
            'term_count': 203,
            'iso_11179_compliant': True,
            'validation_passed': True,
            'issues': []
        }),
        ('reference_generator', 82, {
            'file_path': 'docs/references.md',
            'reference_count': 30,
            'target_count': 30,
            'validation_passed': True,
            'issues': []
        }),
        ('chapter_generator', 78, {
            'chapters_generated': 5,
            'chapters_list': ['chapter1', 'chapter2', 'chapter3', 'chapter4', 'chapter5'],
            'completion_percentage': 42,  # 5 out of 12 chapters
            'validation_passed': True,
            'issues': []
        }),
        ('quiz_generator', 85, {
            'quizzes_generated': 5,
            'quiz_list': ['quiz1', 'quiz2', 'quiz3', 'quiz4', 'quiz5'],
            'total_questions': 50,
            'blooms_distribution': {
                'remember': 10,
                'understand': 12,
                'apply': 12,
                'analyze': 8,
                'evaluate': 5,
                'create': 3
            },
            'validation_passed': True,
            'issues': []
        }),
        ('faq_generator', 80, {
            'file_path': 'docs/faq.md',
            'faq_count': 25,
            'validation_passed': True,
            'issues': []
        }),
    ]

    # Run each skill in sequence
    for skill_name, score, outputs in workflow:
        success = simulate_skill_run(skill_name, metadata, score, outputs)

        if not success:
            print(f"\n⚠️  Workflow stopped - {skill_name} cannot run yet")
            print("This demonstrates dependency blocking in action!")
            break

        input("\n⏸  Press Enter to continue...")

    # Show final status
    print("\n" + "="*80)
    print("FINAL STATUS")
    print("="*80)
    print()
    print(metadata.generate_status_report())

    # Show what's next
    print("\n" + "="*80)
    print("NEXT STEPS")
    print("="*80)
    print()
    print("Skills ready to run:")
    print("  ✓ microsim_p5 - Create interactive simulations")
    print("  ✓ concept_validator - Validate concept completeness")
    print("  ✓ social_media_generator - Create social media assets (needs 50% chapters)")
    print("  ✓ quality_metrics_analyzer - Run quality analysis")
    print()
    print("Skills still blocked:")
    print("  ○ social_media_generator - Waiting for 50% chapter completion (currently 42%)")
    print()
    print("Complete a few more chapters to unlock social_media_generator!")
    print()


if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n⏹  Demo interrupted by user")
    except Exception as e:
        print(f"\n\n❌ Error: {e}")
        raise
