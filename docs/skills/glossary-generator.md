# Glossary Generator Skill

## Summary

This skill automatically generates a comprehensive glossary of terms from a learning graph's concept list, ensuring each definition follows ISO 11179 metadata registry standards (precise, concise, distinct, non-circular, and free of business rules).

## Order

This skill should be executed after the Learning Graph skill has completed and the concept list has been finalized. The glossary relies on having a complete, reviewed list of concepts from the learning graph's concept enumeration phase.

## Inputs

### Primary Input Files

1. **Concept List** (`docs/learning-graph/02-concept-list-v1.md` or similar)
   - Format: Numbered markdown list
   - Expected: 150-250 pedagogically-sound concept labels
   - Quality check: Each concept should be in Title Case and under 32 characters

2. **Course Description** (`docs/course-description.md`)
   - Provides context for appropriate examples
   - Used to ensure terminology aligns with course objectives
   - Quality check: Must contain audience, prerequisites, and learning outcomes

### Input Quality Metrics (Scale 1-100)

**Concept List Quality Score:**
- 90-100: All concepts unique, properly formatted (Title Case), appropriate length (< 32 chars)
- 70-89: Most concepts meet standards, minor formatting issues
- 50-69: Some duplicate concepts or formatting inconsistencies
- Below 50: Significant issues - PROMPT USER for manual review

**Quality Checks:**

1. Verify no duplicate concept labels (100% unique)
2. Check Title Case formatting (target: 95%+)
3. Validate length constraints (target: 98% under 32 chars)
4. Assess concept clarity (no ambiguous terms)

**User Dialog Triggers:**
- Score < 70: "The concept list has quality issues. Would you like to review and clean it before generating the glossary?"
- Duplicates found: "Found [N] duplicate concepts. Should I remove duplicates automatically or would you like to review?"
- Formatting issues: "Found [N] concepts with formatting issues. Auto-fix?"

## Outputs

### Generated Files

1. **`docs/glossary.md`** - Complete glossary in alphabetical order
   - Header: "# Glossary of Terms"
   - Format: Each term as level-4 header (####)
   - Definition body text following ISO 11179 standards
   - Optional examples prefixed with "**Example:**"
   - Cross-references to related terms where appropriate

2. **`docs/learning-graph/glossary-quality-report.md`** - Quality assessment
   - ISO 11179 compliance metrics for each definition
   - Identification of circular definitions
   - Precision scores for each term
   - Suggestions for improvement

### Output Quality Metrics (Scale 1-100)

**Definition Quality Score:**
- **Precision** (25 points): Each definition accurately captures the concept's meaning
- **Conciseness** (25 points): Definitions are brief (target: 20-50 words)
- **Distinctiveness** (25 points): Each definition is unique and distinguishable
- **Non-circularity** (25 points): No definition references undefined terms or creates circular dependencies

**Quality Checks Performed:**

1. ISO 11179 compliance validation (all 4 criteria)
2. Readability score (Flesch-Kincaid grade level appropriate for audience)
3. Example coverage (target: 60-80% of terms include examples)
4. Cross-reference accuracy (all referenced terms exist in glossary)
5. Alphabetical ordering verification
6. Markdown formatting validation

**Success Criteria:**
- Overall quality score > 85
- No circular definitions
- 100% alphabetical ordering
- All terms from concept list included
- Markdown renders correctly in mkdocs

### Additional Outputs

3. **Navigation Update** - Adds glossary link to `mkdocs.yml` if not present
4. **Cross-reference Index** (`docs/learning-graph/glossary-cross-ref.json`) - JSON mapping of term relationships for future semantic search
