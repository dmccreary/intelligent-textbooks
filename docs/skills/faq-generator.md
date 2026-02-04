# FAQ Generator Skill

## Summary

This skill generates a comprehensive set of Frequently Asked Questions (FAQs) from course content, learning graphs, and glossary terms to help students understand common questions and prepare content for chatbot integration.

## Order

This skill should be executed after the following artifacts exist:

1. Course description has been finalized
2. Learning graph has been created
3. Glossary has been generated
4. At least 30% of chapter content has been written

Having these prerequisites ensures the FAQ generator has sufficient context to create meaningful, relevant questions.

## Inputs

### Primary Input Files

1. **Course Description** (`docs/course-description.md`)
   - Provides course scope and objectives
   - Quality check: Must contain clear learning outcomes using Bloom's Taxonomy

2. **Learning Graph** (`docs/learning-graph/03-concept-dependencies.csv`)
   - Identifies key concepts and their relationships
   - Quality check: Should be a valid DAG with no cycles

3. **Glossary** (`docs/glossary.md`)
   - Source of terminology for technical questions
   - Quality check: Minimum 50 terms for comprehensive FAQ

4. **Chapter Content** (all `docs/**/*.md` files)
   - Provides context for specific topic questions
   - Quality check: At least 5,000 total words preferred

5. **Existing FAQ** (`docs/faq.md`) - if present
   - Preserves manually curated questions
   - Merges with AI-generated questions

### Input Quality Metrics (Scale 1-100)

**Content Completeness Score:**
- 90-100: All inputs present with high quality
- 70-89: Core inputs present, some content gaps
- 50-69: Missing optional inputs or low word count
- Below 50: Critical inputs missing

**Quality Checks:**

1. Course description completeness (title, audience, prerequisites, outcomes)
2. Learning graph validity (no cycles, reasonable connectivity)
3. Glossary size (50+ terms = good, 100+ = excellent)
4. Content word count (target: 10,000+ words for comprehensive FAQ)
5. Concept coverage (what % of learning graph concepts have related content?)

**User Dialog Triggers:**
- Score < 60: "Limited content available for FAQ generation. Continue with basic FAQ or wait for more content?"
- No glossary: "No glossary found. Generate FAQ anyway (limited technical questions) or create glossary first?"
- Low word count: "Only [N] words of content found. FAQ quality may be limited. Proceed?"

## Outputs

### Generated Files

1. **`docs/faq.md`** - Complete FAQ in categorized format
   - Header: "# Intelligent Textbooks FAQ"
   - Categories aligned with learning graph taxonomy
   - Questions organized from basic to advanced
   - Answers with links to relevant sections
   - Format: Level-2 headers for questions, body text for answers

2. **`docs/learning-graph/faq-quality-report.md`** - Quality metrics
   - Bloom's Taxonomy distribution of questions
   - Concept coverage analysis (what % of concepts have FAQ entries)
   - Question difficulty distribution
   - Suggested additional questions for gaps

3. **`docs/learning-graph/faq-chatbot-training.json`** - Structured data for chatbot
   - JSON array of question-answer pairs
   - Metadata: difficulty, concepts, keywords
   - Cross-references to source content
   - Ready for RAG system integration

### Output Quality Metrics (Scale 1-100)

**FAQ Quality Score Components:**

- **Coverage** (30 points):
  - What % of learning graph concepts addressed?
  - Target: 80%+ coverage = 30 points
  - 60-79% = 20 points
  - Below 60% = 10 points

- **Bloom's Taxonomy Distribution** (25 points):
  - Balanced across levels (Remember, Understand, Apply, Analyze, Evaluate, Create)
  - Target distribution: 20% Remember, 30% Understand, 25% Apply, 15% Analyze, 7% Evaluate, 3% Create
  - Deviation from target reduces score

- **Answer Quality** (25 points):
  - Answers are complete and accurate
  - Include examples where appropriate (target: 40% with examples)
  - Link to relevant content sections (target: 60%+ linked)
  - Appropriate length (100-300 words average)

- **Organization** (20 points):
  - Logical categorization aligned with course structure
  - Progressive difficulty within categories
  - No duplicate questions
  - Clear, searchable question phrasing

**Question Categories Generated:**

1. Getting Started (10-15 questions)
2. Core Concepts (20-30 questions based on learning graph)
3. Technical Details (15-25 questions from glossary)
4. Common Challenges (10-15 questions)
5. Best Practices (10-15 questions)
6. Advanced Topics (5-10 questions)

**Quality Checks Performed:**

1. No duplicate questions (100% unique)
2. All internal links valid
3. Bloom's Taxonomy distribution
4. Reading level appropriate for target audience
5. Answer completeness (no partial answers)
6. Technical accuracy (verified against glossary/content)

**Success Criteria:**
- Overall quality score > 75
- Minimum 40 questions generated
- At least 60% concept coverage
- Balanced Bloom's Taxonomy distribution
- All answers include source references
- Chatbot JSON validates against schema

### Additional Outputs

4. **Navigation Update** - Ensures FAQ link exists in `mkdocs.yml`
5. **`docs/learning-graph/faq-coverage-gaps.md`** - Lists concepts without FAQ coverage for future content creation
