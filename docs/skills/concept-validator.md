# Concept Validator Skill

## Summary

This skill validates that all concepts in the learning graph are properly integrated throughout the textbook, checking for coverage in chapters, glossary definitions, quiz questions, and MicroSims, while identifying gaps and ensuring pedagogical consistency across the entire educational resource.

## Order

This skill should be executed:
1. After learning graph is complete
2. After initial chapter content generation
3. Before glossary finalization
4. Periodically during content development (every 10-15 chapters)
5. As final validation before publication

The validator cross-references all textbook components, so it requires the learning graph and at least some content to be meaningful. It's most valuable as a quality gate at key milestones.

## Inputs

### Primary Input Files

1. **Learning Graph** (`docs/learning-graph/03-concept-dependencies.csv`)
   - Complete list of concepts to validate
   - Prerequisite relationships for scaffolding checks
   - Quality check: Valid DAG structure, no cycles

2. **Concept Taxonomy** (`docs/learning-graph/04-concept-taxonomy.csv`)
   - Concept categorization for organizational checks
   - Quality check: All concepts categorized

3. **All Chapter Content** (`docs/**/*.md`)
   - Source of concept explanations
   - Quality check: Meaningful content exists (not just stubs)

4. **Glossary** (`docs/glossary.md`)
   - Concept definitions
   - Quality check: Alphabetically ordered, valid markdown

5. **Quiz Files** (`docs/**/quiz.md` or `*-quiz.md`)
   - Assessment coverage
   - Quality check: Valid quiz format

6. **MicroSims** (`docs/sims/*/index.md`)
   - Interactive concept demonstrations
   - Quality check: All MicroSims functional

### Optional Input Files

7. **Course Description** (`docs/course-description.md`)
   - Learning objectives for alignment checking
   - Quality check: Contains Bloom's Taxonomy outcomes

8. **FAQ** (`docs/faq.md`)
   - Student support coverage
   - Quality check: Questions mapped to concepts

9. **Previous Validation Reports** (`docs/learning-graph/validation-reports/`)
   - Historical data for trend analysis
   - Quality check: Valid JSON format

### Input Quality Metrics (Scale 1-100)

**Validation Readiness Score:**
- 90-100: All inputs present, substantial content for all concepts
- 70-89: Most inputs present, some concepts have limited coverage
- 50-69: Basic inputs present, many concepts lack comprehensive coverage
- Below 50: Critical inputs missing or insufficient content

**Pre-Validation Checks:**
1. Learning graph validity (required: no cycles)
2. Minimum content threshold (recommended: 50+ markdown files)
3. Glossary exists (recommended)
4. At least 1 quiz (recommended)
5. At least 1 MicroSim (recommended)

**User Dialog Triggers:**
- Score < 50: "Insufficient content for meaningful validation. Minimum requirements not met. Continue with limited validation?"
- No glossary: "No glossary found. Concept definition validation will be skipped. Proceed?"
- No quizzes: "No quizzes detected. Assessment coverage validation will be skipped. Continue?"
- Learning graph invalid: "Learning graph has cycles or errors. Fix before validation?"

## Outputs

### Primary Validation Report

1. **`docs/learning-graph/validation-report.md`** - Comprehensive human-readable report
   - Executive summary with overall health score
   - Concept coverage matrix
   - Gap analysis by category
   - Prioritized remediation recommendations
   - Trend charts (if historical data available)

### Detailed Analysis Files

2. **`docs/learning-graph/validation-reports/validation-[YYYY-MM-DD].json`** - Machine-readable results
   - Timestamp and version
   - Per-concept validation scores
   - Coverage metrics across all components
   - Gap identification
   - Comparison to previous validations

3. **`docs/learning-graph/concept-coverage-matrix.csv`** - Detailed matrix
   - Columns: Concept, Chapter, Glossary, Quiz, MicroSim, FAQ, Overall_Score
   - Rows: One per concept from learning graph
   - Values: ✓ (covered), ✗ (missing), ⚠ (partial), or coverage percentage

4. **`docs/learning-graph/gap-analysis.md`** - Actionable gaps list
   - **Critical gaps**: Concepts with <40% coverage
   - **High priority gaps**: Concepts with 40-60% coverage
   - **Medium priority gaps**: Concepts with 60-80% coverage
   - **Enhancement opportunities**: Concepts with >80% coverage but room for improvement

5. **`docs/learning-graph/scaffolding-validation.md`** - Prerequisite compliance
   - Prerequisites taught before dependent concepts?
   - Concept spacing appropriate (not too dense)?
   - Forward/backward references proper?
   - Circular dependency warnings

6. **`docs/learning-graph/consistency-report.md`** - Terminology consistency
   - Concept labels used consistently across components
   - Synonym usage patterns
   - Terminology conflicts or ambiguities
   - Recommendations for standardization

### Output Quality Metrics (Scale 1-100)

#### Overall Concept Health Score

The validator generates a comprehensive health score based on multiple dimensions:

**1. Coverage Completeness (40 points)**

Per-concept scoring:
- **Chapter coverage** (15 pts): Concept explained in chapter content
  - Substantial explanation (500+ words): 15 pts
  - Moderate explanation (200-499 words): 10 pts
  - Brief mention (<200 words): 5 pts
  - Not mentioned: 0 pts

- **Glossary coverage** (10 pts): Concept defined in glossary
  - ISO 11179 compliant definition: 10 pts
  - Adequate definition: 7 pts
  - Weak definition: 4 pts
  - Missing: 0 pts

- **Assessment coverage** (10 pts): Concept tested in quizzes
  - Multiple quiz questions: 10 pts
  - One quiz question: 7 pts
  - Not tested: 0 pts

- **Interactive coverage** (5 pts): Concept demonstrated in MicroSim
  - Dedicated MicroSim: 5 pts
  - Included in MicroSim: 3 pts
  - Not demonstrated: 0 pts

**2. Pedagogical Quality (30 points)**

- **Scaffolding compliance** (15 pts): Prerequisites taught before concept
  - 100% prerequisites covered earlier: 15 pts
  - 80-99% prerequisites covered: 12 pts
  - 60-79% prerequisites covered: 8 pts
  - <60% prerequisites covered: 0 pts (critical issue)

- **Bloom's Taxonomy alignment** (10 pts): Concept taught at appropriate cognitive level
  - Perfect alignment with course objectives: 10 pts
  - Good alignment: 7 pts
  - Misaligned (too simple or too complex): 3 pts

- **Example quality** (5 pts): Concrete examples provided
  - Multiple diverse examples: 5 pts
  - One good example: 3 pts
  - No examples: 0 pts

**3. Consistency & Integration (20 points)**

- **Terminology consistency** (10 pts): Same labels used across components
  - 100% consistent: 10 pts
  - Minor variations: 7 pts
  - Significant inconsistencies: 3 pts

- **Cross-referencing** (5 pts): Concept linked between components
  - Well-integrated with links: 5 pts
  - Some links: 3 pts
  - Isolated: 0 pts

- **Context appropriateness** (5 pts): Concept appears in right sections
  - Optimal placement: 5 pts
  - Acceptable placement: 3 pts
  - Misplaced: 0 pts

**4. Support & Accessibility (10 points)**

- **FAQ coverage** (5 pts): Common questions addressed
  - FAQ entry exists: 5 pts
  - Partially addressed: 3 pts
  - Not in FAQ: 0 pts

- **Multiple modalities** (5 pts): Concept explained in different ways
  - 3+ modalities (text, visual, interactive, assessment): 5 pts
  - 2 modalities: 3 pts
  - 1 modality: 1 pt

### Concept Coverage Categories

Based on overall score, concepts are categorized:

- **Excellent (85-100)**: Comprehensive coverage, ready for publication
- **Good (70-84)**: Solid coverage, minor enhancements possible
- **Adequate (55-69)**: Basic coverage, improvements recommended
- **Insufficient (40-54)**: Significant gaps, remediation needed
- **Critical Gap (<40)**: Major deficiency, immediate attention required

### Validation Checks Performed

**1. Coverage Validation:**
- ✓ Every concept from learning graph mentioned in at least one chapter
- ✓ Every concept has glossary definition
- ✓ Core concepts (high centrality in graph) tested in quizzes
- ✓ Complex concepts have MicroSim demonstrations
- ✓ Difficult concepts addressed in FAQ

**2. Scaffolding Validation:**
- ✓ Prerequisite concepts always introduced before dependent concepts
- ✓ No circular dependencies in presentation order
- ✓ Concept density appropriate (not too many new concepts per chapter)
- ✓ Forward references include links to upcoming content
- ✓ Review of prerequisites at chapter beginnings

**3. Consistency Validation:**
- ✓ Concept labels match exactly across all components
- ✓ Definitions align between glossary and chapter explanations
- ✓ Examples don't contradict each other
- ✓ Terminology usage consistent
- ✓ No concept presented with conflicting difficulty levels

**4. Quality Validation:**
- ✓ Glossary definitions meet ISO 11179 standards
- ✓ Chapter explanations appropriate depth for concept importance
- ✓ Quiz questions at right Bloom's level for concept
- ✓ MicroSims effectively demonstrate concept
- ✓ Examples clear and relevant

**5. Integration Validation:**
- ✓ Cross-references between components exist
- ✓ Glossary terms linked from chapters
- ✓ Quiz questions reference chapter sections
- ✓ MicroSims embedded in relevant chapters
- ✓ FAQ answers link to detailed explanations

**6. Accessibility Validation:**
- ✓ Multiple learning pathways to each concept
- ✓ Varied presentation styles (visual, textual, interactive)
- ✓ Support materials for difficult concepts
- ✓ Alternative explanations available
- ✓ Practice opportunities for key concepts

### Gap Analysis Categories

**Critical Gaps (Immediate Action Required):**
1. **Orphaned concepts**: In learning graph but not in any chapter
2. **Undefined concepts**: No glossary definition
3. **Prerequisite violations**: Concept before its prerequisites
4. **Circular dependencies**: Concepts depending on each other

**High Priority Gaps:**
1. **Untested core concepts**: Important concepts without quiz questions
2. **Unexplained concepts**: Mentioned but not explained
3. **Missing examples**: Abstract concepts without concrete examples
4. **Inconsistent terminology**: Same concept with different labels

**Medium Priority Gaps:**
1. **Limited interactivity**: Complex concepts without MicroSims
2. **Single modality**: Concepts only explained one way
3. **Weak definitions**: Glossary entries not meeting ISO standards
4. **Missing cross-references**: Isolated content without links

**Enhancement Opportunities:**
1. **Add alternative explanations**: Multiple approaches to difficult topics
2. **Increase quiz coverage**: More assessment for better learning
3. **Create MicroSims**: Interactive demonstrations for abstract concepts
4. **Expand examples**: More diverse, real-world examples

### Detailed Reports

**Per-Concept Analysis:**

For each concept, the report includes:

```markdown
### Concept: [Concept Name]

**Overall Score**: 78/100 (Good)

**Coverage:**
- Chapter: ✓ Explained in Chapter 5, Section 3 (350 words)
- Glossary: ✓ ISO 11179 compliant definition
- Quiz: ✓ 2 questions (Apply level)
- MicroSim: ⚠ Partially demonstrated in "Learning Graph" sim
- FAQ: ✗ Not addressed

**Scaffolding:**
- Prerequisites: ✓ All 3 prerequisites covered in earlier chapters
- Placement: ✓ Appropriate position in learning sequence
- Spacing: ✓ Not too dense with related concepts

**Consistency:**
- Terminology: ✓ Consistent across all components
- Cross-references: ✓ Well-integrated with links

**Recommendations:**
1. Add dedicated MicroSim for hands-on exploration
2. Create FAQ entry addressing common confusion
3. Add one more quiz question at Analyze level

**Priority**: Medium
```

### Trend Analysis (if historical data available)

Tracks improvement over time:
- Overall health score trajectory
- Gap reduction rate
- Coverage improvements by category
- Component completion progress
- Concept integration velocity

### Success Criteria

**Publication Ready Thresholds:**
- Overall health score > 75
- No critical gaps
- <10% concepts with insufficient coverage (<40)
- 100% prerequisite compliance
- 90%+ glossary coverage
- 70%+ quiz coverage for core concepts
- 30%+ concepts with MicroSims
- Terminology consistency > 95%

**Quality Gates:**
- **Alpha release**: Health score > 60, no critical gaps
- **Beta release**: Health score > 70, <5% insufficient concepts
- **Production release**: Health score > 75, all criteria above

### Remediation Planning

The validator generates prioritized action items:

**Phase 1 - Critical Fixes (Week 1):**
1. Add missing concepts to chapters
2. Create glossary definitions for undefined concepts
3. Fix prerequisite violations
4. Resolve circular dependencies

**Phase 2 - High Priority (Weeks 2-3):**
1. Add quiz questions for untested core concepts
2. Expand brief concept explanations
3. Create examples for abstract concepts
4. Standardize inconsistent terminology

**Phase 3 - Medium Priority (Weeks 4-6):**
1. Develop MicroSims for complex concepts
2. Add FAQ entries for difficult topics
3. Create cross-references between components
4. Enhance weak glossary definitions

**Phase 4 - Enhancements (Ongoing):**
1. Add alternative explanations
2. Increase quiz coverage
3. Create more MicroSims
4. Expand example variety

### Additional Outputs

7. **`docs/learning-graph/concept-importance-analysis.md`**
   - Ranks concepts by centrality in learning graph
   - Identifies foundational vs. advanced concepts
   - Suggests where to focus quality improvements

8. **`docs/learning-graph/terminology-standardization.md`**
   - Lists all term variations found
   - Recommends standard labels
   - Find-and-replace suggestions

9. **`docs/learning-graph/cross-reference-suggestions.json`**
   - Recommended links to add between components
   - Structured for automated link insertion
   - Prioritized by pedagogical value

10. **`docs/learning-graph/coverage-visualization.html`**
   - Interactive visualization of concept coverage
   - Learning graph colored by coverage level
   - Clickable nodes showing detailed coverage info

## Configuration Options

**Validation Depth:**
- Quick scan (coverage check only)
- Standard validation (coverage + scaffolding + consistency)
- Deep validation (all checks + quality assessment)

**Reporting Detail:**
- Summary only (executive overview)
- Standard (summary + gap list)
- Detailed (per-concept analysis)
- Comprehensive (all reports + visualizations)

**Scope:**
- All concepts (complete validation)
- Critical concepts only (fast check)
- Changed concepts (incremental validation)
- Specific category (targeted validation)

**Thresholds:**
- Strict (publication-ready standards)
- Standard (recommended thresholds)
- Lenient (early development)
- Custom (user-defined thresholds)
