# Chapter Content Generator Skill

## Summary

This skill generates comprehensive chapter content for an intelligent textbook based on the learning graph, ensuring each chapter covers specific concepts with appropriate scaffolding, examples, and alignment to Bloom's Taxonomy learning outcomes.

## Order

This skill should be executed after:
1. Learning graph is complete and validated
2. Course description is finalized
3. Chapter structure/navigation is defined in `mkdocs.yml`
4. Glossary has been generated (recommended but not required)

The chapter generator uses the learning graph to determine concept dependencies and ensure proper scaffolding, so the learning graph must be complete before generating chapters.

## Inputs

### Primary Input Files

1. **Learning Graph Dependencies** (`docs/learning-graph/03-concept-dependencies.csv`)
   - Maps concepts to chapters/sections
   - Defines prerequisite relationships
   - Quality check: Valid DAG structure, no orphaned concepts

2. **Concept Taxonomy** (`docs/learning-graph/04-concept-taxonomy.csv`)
   - Categorizes concepts for chapter organization
   - Quality check: Balanced distribution (target: 8-15 categories)

3. **Course Description** (`docs/course-description.md`)
   - Defines target audience and learning objectives
   - Provides context for appropriate examples
   - Quality check: Contains Bloom's Taxonomy outcomes

4. **Chapter Outline** (user prompt or `docs/learning-graph/chapter-outline.md`)
   - Specifies which concepts belong in each chapter
   - Defines chapter order and structure
   - Format: Markdown list mapping concepts to chapters

5. **Glossary** (`docs/glossary.md`) - Optional but recommended
   - Ensures consistent terminology usage
   - Quality check: Covers 80%+ of concepts in target chapter

6. **Navigation Structure** (`mkdocs.yml`)
   - Defines chapter locations and file paths
   - Quality check: All chapter paths exist or can be created

### Input Quality Metrics (Scale 1-100)

**Learning Graph Quality Score:**
- Completeness: All concepts categorized (weight: 30%)
- DAG validity: No cycles, proper dependencies (weight: 30%)
- Connectivity: Concepts properly connected, few orphans (weight: 20%)
- Taxonomy balance: Even distribution across categories (weight: 20%)

**Chapter Specification Quality:**
- 90-100: Clear concept-to-chapter mapping, 8-15 concepts per chapter
- 70-89: Mostly clear mapping, some chapters too large/small
- 50-69: Vague mapping or unbalanced chapter sizes
- Below 50: No clear chapter structure defined

**Quality Checks:**
1. Verify learning graph has no cycles (required)
2. Check concept distribution across chapters (target: 8-15 per chapter)
3. Validate prerequisites: concepts only after dependencies (required)
4. Assess taxonomy alignment with chapter structure
5. Verify all referenced concepts exist in glossary (if present)

**User Dialog Triggers:**
- Score < 60: "Learning graph quality is low. Review dependencies before generating chapters?"
- Unbalanced chapters: "Chapter [X] has [N] concepts. Recommended range is 8-15. Proceed or restructure?"
- Missing prerequisites: "Chapter [X] references concepts not covered in previous chapters. Reorder or add forward references?"
- No chapter outline: "No chapter outline provided. Generate suggested structure from taxonomy?"

## Outputs

### Generated Files

For each chapter specified:

1. **Chapter Markdown File** (`docs/[section]/[chapter-name].md`)
   - YAML frontmatter with metadata
   - Title and introduction
   - Section for each concept with proper scaffolding
   - Examples aligned with course description
   - Practice exercises for key concepts
   - Summary and key takeaways
   - Links to related concepts (forward and backward references)

2. **Chapter Metadata** (`docs/learning-graph/chapters/[chapter-name]-metadata.json`)
   - Concepts covered
   - Bloom's Taxonomy distribution
   - Prerequisites and postrequisites
   - Difficulty level
   - Estimated reading time
   - MicroSim recommendations

### Quality Reports

3. **`docs/learning-graph/chapter-generation-report.md`** - Generation summary
   - Chapters created
   - Concepts covered per chapter
   - Quality scores for each chapter
   - Scaffolding validation
   - Bloom's Taxonomy distribution

4. **`docs/learning-graph/content-gaps.md`** - Identifies missing content
   - Concepts not covered in any chapter
   - Chapters missing examples or exercises
   - Suggested MicroSim opportunities
   - Recommended quiz questions

### Output Quality Metrics (Scale 1-100)

**Per-Chapter Quality Score:**

- **Scaffolding Quality** (25 points):
  - Prerequisites introduced before dependent concepts
  - Progressive complexity within chapter
  - Clear transitions between concepts
  - Examples build on each other
  - Target: 100% prerequisite compliance

- **Bloom's Taxonomy Alignment** (20 points):
  - Distribution matches course objectives
  - Progressive levels: Remember → Understand → Apply → Analyze
  - Higher-order thinking in advanced chapters
  - Target distribution per chapter:
    - Early chapters: 40% Remember, 40% Understand, 20% Apply
    - Middle chapters: 20% Remember, 30% Understand, 30% Apply, 20% Analyze
    - Advanced chapters: 10% Remember, 20% Understand, 25% Apply, 25% Analyze, 15% Evaluate, 5% Create

- **Content Completeness** (25 points):
  - All assigned concepts covered (required: 100%)
  - Examples for 80%+ of key concepts
  - Practice exercises for 60%+ of concepts
  - Summary includes all main ideas
  - Glossary terms properly linked

- **Readability & Structure** (15 points):
  - Appropriate reading level for target audience (Flesch-Kincaid)
  - Logical section organization
  - Consistent formatting (headings, lists, code blocks)
  - Proper use of admonitions (notes, tips, warnings)
  - Target: 2000-5000 words per chapter

- **Engagement Features** (15 points):
  - At least one recommendation for MicroSim
  - Interactive elements (quizzes, exercises)
  - Visual aids recommended (diagrams, charts)
  - Cross-references to related content
  - Real-world examples relevant to audience

**Quality Checks Performed:**

1. **Prerequisite Validation**: All concept dependencies satisfied by previous chapters
2. **Terminology Consistency**: Terms used match glossary definitions
3. **Link Validation**: All internal references point to existing content
4. **Markdown Formatting**: Proper syntax, no rendering errors
5. **Word Count Balance**: Chapters within 20% of average length
6. **Example Quality**: Examples are relevant, accurate, and clear
7. **Bloom's Distribution**: Each chapter has appropriate cognitive level mix
8. **Duplicate Detection**: No significant content duplication across chapters

**Success Criteria (Per Chapter):**
- Overall quality score > 75
- 100% prerequisite compliance
- At least 2000 words
- Minimum 3 examples
- At least 2 practice exercises
- All concepts from outline covered
- Bloom's Taxonomy score > 15/20
- No broken internal links

### Additional Outputs

5. **Navigation Updates** - Adds chapter links to `mkdocs.yml` if not present
6. **MicroSim Recommendations** (`docs/learning-graph/microsim-suggestions.md`)
   - Lists concepts that would benefit from interactive simulations
   - Prioritized by educational impact
   - Includes detailed specifications for each suggested MicroSim
7. **Quiz Bank** (`docs/learning-graph/quiz-bank.json`)
   - JSON file with suggested quiz questions for each chapter
   - Mapped to specific concepts and Bloom's levels
   - Ready for integration into chapter content

## Execution Options

**Mode Selection:**
- **Single Chapter**: Generate one chapter at a time with user review
- **Batch Mode**: Generate all chapters sequentially
- **Selective**: User specifies which chapters to generate

**Configuration Parameters:**
- Target word count range (default: 2000-5000)
- Example density (default: 1 example per 2-3 concepts)
- Exercise frequency (default: 1 exercise per 3-4 concepts)
- Bloom's Taxonomy weights (customizable per chapter type)
- Reading level target (default: from course description)

**User Interaction Points:**
1. After chapter outline generation (if auto-generated)
2. After first chapter generation (quality review before batch)
3. When prerequisite violations detected
4. When quality score < 70 for any chapter
