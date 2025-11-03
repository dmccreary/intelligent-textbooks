#!/usr/bin/env python3
"""
Book Metadata Helper
====================

Utility functions for Claude Code skills to interact with book-metadata.yml.
Skills can use this to:
- Check if dependencies are met before running
- Update their execution status and results
- Query the status of other skills
- Validate workflow prerequisites

Usage in skills:
    from src.book_metadata_helper import BookMetadata

    metadata = BookMetadata()

    # Check if skill can run
    if metadata.can_skill_run('quiz_generator'):
        # Run the skill
        pass

    # Update skill status
    metadata.update_skill_status(
        skill_name='quiz_generator',
        status='completed',
        quality_score=85,
        outputs={'quizzes_generated': 12}
    )
"""

import yaml
from pathlib import Path
from datetime import datetime, timezone
from typing import Dict, List, Optional, Any


class BookMetadata:
    """Helper class for managing book metadata and skill execution tracking."""

    def __init__(self, metadata_path: Optional[Path] = None):
        """
        Initialize BookMetadata helper.

        Args:
            metadata_path: Path to book-metadata.yml (defaults to repo root)
        """
        if metadata_path is None:
            # Find repository root (where book-metadata.yml should be)
            current = Path(__file__).resolve().parent
            while current != current.parent:
                metadata_file = current / "book-metadata.yml"
                if metadata_file.exists():
                    self.metadata_path = metadata_file
                    break
                current = current.parent
            else:
                raise FileNotFoundError(
                    "Could not find book-metadata.yml in repository"
                )
        else:
            self.metadata_path = Path(metadata_path)

        self.load()

    def load(self) -> None:
        """Load metadata from YAML file."""
        with open(self.metadata_path, 'r') as f:
            self.data = yaml.safe_load(f)

    def save(self) -> None:
        """Save metadata back to YAML file."""
        # Update last_updated timestamp
        self.data['metadata']['last_updated'] = datetime.now(timezone.utc).isoformat()

        with open(self.metadata_path, 'w') as f:
            yaml.dump(self.data, f, default_flow_style=False, sort_keys=False)

    def get_skill_status(self, skill_name: str) -> Optional[Dict[str, Any]]:
        """
        Get the current status of a skill.

        Args:
            skill_name: Name of the skill (e.g., 'course_description_analyzer')

        Returns:
            Dictionary with skill status information or None if not found
        """
        return self.data.get('skills', {}).get(skill_name)

    def can_skill_run(self, skill_name: str) -> tuple[bool, List[str]]:
        """
        Check if a skill's dependencies are met.

        Args:
            skill_name: Name of the skill to check

        Returns:
            Tuple of (can_run: bool, reasons: List[str])
            reasons contains list of unmet dependencies if can_run is False
        """
        skill = self.get_skill_status(skill_name)
        if not skill:
            return False, [f"Skill '{skill_name}' not found in metadata"]

        dependencies = skill.get('dependencies', [])
        if not dependencies:
            return True, []

        reasons = []

        for dep in dependencies:
            if isinstance(dep, str):
                # Simple dependency (skill name only)
                dep_skill = self.get_skill_status(dep)
                if not dep_skill or dep_skill['status'] != 'completed':
                    reasons.append(f"Dependency '{dep}' must be completed")

            elif isinstance(dep, dict):
                # Complex dependency with requirements
                dep_skill_name = dep.get('skill')
                dep_skill = self.get_skill_status(dep_skill_name)

                if not dep_skill:
                    reasons.append(f"Dependency '{dep_skill_name}' not found")
                    continue

                if dep_skill['status'] != 'completed':
                    reasons.append(f"Dependency '{dep_skill_name}' must be completed")
                    continue

                # Check quality score requirement
                min_score = dep.get('min_quality_score')
                if min_score is not None:
                    actual_score = dep_skill.get('quality_score')
                    if actual_score is None or actual_score < min_score:
                        reasons.append(
                            f"Dependency '{dep_skill_name}' requires quality score "
                            f">= {min_score} (current: {actual_score})"
                        )

                # Check completion percentage requirement
                min_completion = dep.get('min_completion_percentage')
                if min_completion is not None:
                    actual_completion = dep_skill.get('outputs', {}).get('completion_percentage', 0)
                    if actual_completion < min_completion:
                        reasons.append(
                            f"Dependency '{dep_skill_name}' requires completion "
                            f">= {min_completion}% (current: {actual_completion}%)"
                        )

        return len(reasons) == 0, reasons

    def update_skill_status(
        self,
        skill_name: str,
        status: str,
        quality_score: Optional[int] = None,
        version: Optional[str] = None,
        outputs: Optional[Dict[str, Any]] = None,
        notes: Optional[str] = None
    ) -> None:
        """
        Update the status of a skill.

        Args:
            skill_name: Name of the skill
            status: New status (not_started, in_progress, completed, failed, needs_update)
            quality_score: Optional quality score (0-100)
            version: Optional skill version
            outputs: Optional dictionary of output data to merge
            notes: Optional notes to append
        """
        if skill_name not in self.data['skills']:
            raise ValueError(f"Skill '{skill_name}' not found in metadata")

        skill = self.data['skills'][skill_name]

        # Update basic fields
        skill['status'] = status
        skill['date_run'] = datetime.now(timezone.utc).isoformat()

        if quality_score is not None:
            skill['quality_score'] = quality_score

        if version is not None:
            skill['version'] = version

        # Merge outputs
        if outputs is not None:
            if 'outputs' not in skill:
                skill['outputs'] = {}
            skill['outputs'].update(outputs)

        # Append notes
        if notes is not None:
            if skill.get('notes'):
                skill['notes'] = f"{skill['notes']}\n{notes}"
            else:
                skill['notes'] = notes

        # Update metadata
        self.data['metadata']['updated_by'] = f"skill:{skill_name}"

        self.save()

    def get_workflow_phase(self) -> str:
        """Get the current workflow phase."""
        return self.data.get('workflow', {}).get('current_phase', 'unknown')

    def update_workflow_phase(self, phase: str, completion: int = 0) -> None:
        """
        Update the current workflow phase.

        Args:
            phase: Phase name (planning, foundation, content_generation, etc.)
            completion: Completion percentage (0-100)
        """
        if 'workflow' not in self.data:
            self.data['workflow'] = {}

        self.data['workflow']['current_phase'] = phase

        if 'phases' in self.data['workflow'] and phase in self.data['workflow']['phases']:
            self.data['workflow']['phases'][phase]['status'] = 'in_progress'
            self.data['workflow']['phases'][phase]['completion_percentage'] = completion

        self.save()

    def get_dublin_core(self) -> Dict[str, Any]:
        """Get Dublin Core metadata."""
        return self.data.get('dublin_core', {})

    def update_dublin_core(self, **fields) -> None:
        """
        Update Dublin Core metadata fields.

        Args:
            **fields: Dublin Core fields to update
        """
        if 'dublin_core' not in self.data:
            self.data['dublin_core'] = {}

        self.data['dublin_core'].update(fields)
        self.save()

    def get_validation_rules(self) -> Dict[str, Any]:
        """Get validation rules."""
        return self.data.get('validation', {})

    def validate_skill_quality(self, skill_name: str) -> bool:
        """
        Check if a skill meets minimum quality requirements.

        Args:
            skill_name: Name of the skill

        Returns:
            True if skill meets quality requirements
        """
        skill = self.get_skill_status(skill_name)
        if not skill or skill['status'] != 'completed':
            return False

        rules = self.get_validation_rules()
        min_scores = rules.get('min_quality_scores', {})

        # Map skill name to validation key (remove _generator, _analyzer suffixes)
        val_key = skill_name.replace('_generator', '').replace('_analyzer', '')

        min_score = min_scores.get(val_key)
        if min_score is None:
            return True  # No minimum score requirement

        actual_score = skill.get('quality_score')
        return actual_score is not None and actual_score >= min_score

    def generate_status_report(self) -> str:
        """
        Generate a human-readable status report.

        Returns:
            Formatted status report string
        """
        lines = []
        lines.append("=" * 80)
        lines.append("INTELLIGENT TEXTBOOK STATUS REPORT")
        lines.append("=" * 80)
        lines.append("")

        # Book info
        dc = self.get_dublin_core()
        lines.append(f"Title: {dc.get('title', 'Unknown')}")
        lines.append(f"Creator: {dc.get('creator', 'Unknown')}")
        lines.append(f"Language: {dc.get('language', 'Unknown')}")
        lines.append("")

        # Current phase
        phase = self.get_workflow_phase()
        lines.append(f"Current Phase: {phase}")
        lines.append("")

        # Skills status
        lines.append("SKILLS STATUS:")
        lines.append("-" * 80)

        for skill_name, skill_data in self.data.get('skills', {}).items():
            status = skill_data.get('status', 'unknown')
            score = skill_data.get('quality_score')

            status_icon = {
                'completed': '✓',
                'in_progress': '→',
                'failed': '✗',
                'not_started': '○',
                'needs_update': '⚠'
            }.get(status, '?')

            score_str = f" (score: {score})" if score is not None else ""
            lines.append(f"  {status_icon} {skill_name}: {status}{score_str}")

            # Check dependencies
            can_run, reasons = self.can_skill_run(skill_name)
            if not can_run and status == 'not_started':
                for reason in reasons:
                    lines.append(f"      └─ Blocked: {reason}")

        lines.append("")
        lines.append("=" * 80)

        return "\n".join(lines)


def main():
    """Command-line interface for book metadata helper."""
    import argparse

    parser = argparse.ArgumentParser(
        description="Book metadata helper for intelligent textbook creation"
    )
    parser.add_argument(
        'command',
        choices=['status', 'check', 'update'],
        help='Command to execute'
    )
    parser.add_argument(
        '--skill',
        help='Skill name for check/update commands'
    )
    parser.add_argument(
        '--status',
        choices=['not_started', 'in_progress', 'completed', 'failed', 'needs_update'],
        help='New status for update command'
    )
    parser.add_argument(
        '--score',
        type=int,
        help='Quality score (0-100) for update command'
    )

    args = parser.parse_args()

    metadata = BookMetadata()

    if args.command == 'status':
        print(metadata.generate_status_report())

    elif args.command == 'check':
        if not args.skill:
            parser.error("--skill required for check command")

        can_run, reasons = metadata.can_skill_run(args.skill)

        if can_run:
            print(f"✓ Skill '{args.skill}' can run")
        else:
            print(f"✗ Skill '{args.skill}' cannot run:")
            for reason in reasons:
                print(f"  - {reason}")

    elif args.command == 'update':
        if not args.skill or not args.status:
            parser.error("--skill and --status required for update command")

        metadata.update_skill_status(
            skill_name=args.skill,
            status=args.status,
            quality_score=args.score
        )
        print(f"✓ Updated '{args.skill}' status to '{args.status}'")


if __name__ == '__main__':
    main()
