# Quiz Generator Skill

## Summary

This skill generates interactive quizzes for each chapter of an intelligent textbook, with questions aligned to specific concepts from the learning graph and distributed across Bloom's Taxonomy cognitive levels to assess student understanding effectively.

## Order

This skill should be executed after:

1. Chapter content has been generated or written
2. Learning graph exists with concept dependencies
3. Glossary is available (recommended for terminology questions)

The quiz generator analyzes chapter content to create contextually relevant questions, so chapters must exist first. It can be run incrementally (chapter by chapter) or in batch mode (entire textbook).

## Inputs

### Primary Input Files

1. **Chapter Content** (`docs/**/*.md`)
   - Source material for question generation
   - Identifies key concepts and facts
   - Quality check: Minimum 1000 words per chapter for good quiz coverage

2. **Learning Graph** (`docs/learning-graph/03-concept-dependencies.csv`)
   - Maps concepts to chapters
   - Identifies concept difficulty levels
   - Quality check: All chapter concepts should be in learning graph

3. **Glossary** (`docs/glossary.md`)
   - Source for terminology and definition questions
   - Ensures consistent terminology usage
   - Quality check: 80%+ of chapter concepts defined

4. **Course Description** (`docs/course-description.md`)
   - Defines target audience for appropriate difficulty
   - Bloom's Taxonomy objectives guide question distribution
   - Quality check: Contains clear learning outcomes

5. **Quiz Configuration** (user prompt or `docs/quiz-config.json`)
   - Questions per chapter (default: 8-12)
   - Bloom's Taxonomy distribution preferences
   - Question types to include
   - Difficulty balance

### Input Quality Metrics (Scale 1-100)

**Content Readiness Score:**
- 90-100: Rich content with examples, clear concepts, glossary coverage
- 70-89: Good content but limited examples or some concept gaps
- 50-69: Basic content, minimal examples, glossary gaps
- Below 50: Insufficient content for quality quiz generation

**Quality Checks:**

1. Chapter word count: 1000+ words = good, 2000+ = excellent
2. Example coverage: 60%+ concepts with examples
3. Glossary coverage: 80%+ chapter concepts defined
4. Concept clarity: Clear explanations for each concept
5. Learning graph alignment: All chapter concepts mapped

**User Dialog Triggers:**
- Score < 60: "Chapter [X] has limited content ([N] words). Generate shorter quiz or skip?"
- No glossary: "No glossary found. Definition questions will be limited. Proceed?"
- Concept gaps: "[N] concepts in chapter not in learning graph. Continue with available concepts?"
- No learning outcomes: "No Bloom's Taxonomy outcomes in course description. Use default distribution?"

## Outputs

### Generated Files

For each chapter:

1. **Quiz Markdown** (`docs/[section]/[chapter-name]-quiz.md` or embedded in chapter)
   - Title: "Quiz: [Chapter Name]"
   - 8-12 multiple choice questions
   - Questions use mkdocs-material details/summary for "Show Answer"
   - Ordered list with A. B. C. D. format
   - Explanations for correct answers
   - Links to relevant chapter sections

2. **Quiz Metadata** (`docs/learning-graph/quizzes/[chapter-name]-quiz-metadata.json`)
   - Question metadata (concept, Bloom's level, difficulty)
   - Correct answer distribution (avoids patterns like all C)
   - Distractors quality scores
   - Cross-references to source content

### Aggregate Reports

3. **`docs/learning-graph/quiz-bank.json`** - Complete quiz database
   - All questions in structured JSON format
   - Searchable by concept, Bloom's level, difficulty
   - Ready for LMS export or chatbot integration
   - Includes alternative questions for each concept

4. **`docs/learning-graph/quiz-generation-report.md`** - Quality summary
   - Questions generated per chapter
   - Bloom's Taxonomy distribution across textbook
   - Concept coverage (% of concepts with quiz questions)
   - Quality scores per quiz
   - Gaps and recommendations

### Output Quality Metrics (Scale 1-100)

**Per-Quiz Quality Score:**

- **Question Quality** (30 points):
  - Clear, unambiguous question stems
  - No "all of the above" or "none of the above" as crutches
  - Questions test understanding, not just memorization (for Apply+ levels)
  - Realistic scenarios for application questions
  - Quality distractor analysis (plausible but wrong answers)
  - Target: 90%+ well-formed questions

- **Bloom's Taxonomy Distribution** (25 points):
  - Aligned with chapter's learning outcomes
  - Progressive difficulty (early chapters: more Remember/Understand)
  - Target distribution per chapter type:
    - **Introductory chapters**: 40% Remember, 40% Understand, 15% Apply, 5% Analyze
    - **Intermediate chapters**: 25% Remember, 30% Understand, 30% Apply, 15% Analyze
    - **Advanced chapters**: 15% Remember, 20% Understand, 25% Apply, 25% Analyze, 10% Evaluate, 5% Create
  - Deviation from target reduces score

- **Concept Coverage** (20 points):
  - All major concepts tested (target: 80%+)
  - Important concepts have multiple questions
  - Prerequisite concepts verified
  - No over-testing of trivial concepts

- **Answer Balance** (15 points):
  - Correct answers distributed across A, B, C, D (target: 25% each ±5%)
  - No predictable patterns (e.g., C-C-C-C)
  - Random correct answer placement
  - All options of similar length (avoids "longest = correct" tells)

- **Pedagogical Value** (10 points):
  - Explanations teach, not just confirm
  - Questions reinforce key learning outcomes
  - Distractors address common misconceptions
  - Progressive difficulty within quiz
  - Links to relevant content sections

### Bloom's Taxonomy Question Types

**Remember (Knowledge):**
- Definition questions from glossary
- Fact recall
- Terminology identification
- Example: "What is the definition of [concept]?"

**Understand (Comprehension):**
- Explain in own words
- Summarize concepts
- Compare/contrast
- Example: "Which best describes the relationship between [concept A] and [concept B]?"

**Apply (Application):**
- Use concept in new situation
- Solve problems using learned methods
- Implement procedures
- Example: "Given [scenario], which [concept] would you apply?"

**Analyze (Analysis):**
- Break down into parts
- Identify relationships
- Distinguish between elements
- Example: "What is the underlying cause of [phenomenon] in [scenario]?"

**Evaluate (Evaluation):**
- Judge value or quality
- Critique arguments
- Make decisions based on criteria
- Example: "Which approach would be most effective for [goal] and why?"

**Create (Synthesis):**
- Design new solutions
- Combine concepts innovatively
- Propose alternatives
- Example: "How would you design a [system] that addresses [requirements]?"

### Question Format

Each question includes:

```markdown
**Question [N]** [Bloom's Level: Apply]

[Clear question stem that tests specific concept]

<details>
<summary>A. [Option A]</summary>
Incorrect. [Brief explanation why]
</details>

<details>
<summary>B. [Option B]</summary>
Correct! [Explanation of correct answer with reference to chapter section]
</details>

<details>
<summary>C. [Option C]</summary>
Incorrect. [Brief explanation why, addresses common misconception]
</details>

<details>
<summary>D. [Option D]</summary>
Incorrect. [Brief explanation why]
</details>

**Concept Tested:** [Concept from learning graph]
**See:** [Link to relevant chapter section]
```

### Quality Checks Performed

1. **No Ambiguity**: Each question has exactly one defensible correct answer
2. **Distractor Quality**: Wrong answers are plausible but clearly incorrect
3. **Grammar & Clarity**: Professional writing, no errors
4. **Answer Balance**: Correct answers distributed evenly
5. **Bloom's Distribution**: Matches target distribution ±10%
6. **Concept Coverage**: 80%+ major concepts tested
7. **No Duplicate Questions**: Unique questions across all quizzes
8. **Explanation Quality**: All answers have helpful explanations
9. **Link Validation**: All references point to existing content
10. **Bias Check**: Questions avoid cultural, gender, or other biases

### Success Criteria (Per Quiz)

- Overall quality score > 70
- 8-12 questions generated
- Bloom's distribution within ±15% of target
- 75%+ concept coverage for chapter
- Answer balance within 15%-35% per option
- 100% questions have explanations
- No duplicate questions
- All links valid

### Additional Outputs

5. **Alternative Question Bank** (`docs/learning-graph/quizzes/alternative-questions.json`)
   - 2-3 alternative questions per concept
   - For quiz randomization or test variations
   - Same quality standards as primary quiz

6. **Study Guide** (`docs/[section]/[chapter-name]-study-guide.md`) - Optional
   - Key concepts to review
   - Practice questions (non-quiz)
   - Links to chapter sections
   - Glossary term references

7. **Navigation Updates** - Adds quiz links to chapter pages or nav structure

## Configuration Options

**Question Distribution:**

- Multiple choice (default)
- True/False (optional, max 20% of quiz)
- Fill-in-the-blank (for terminology)
- Matching (for relationships)

**Integration Mode:**

- Embedded in chapter (appended to chapter.md)
- Separate quiz pages (chapter-name-quiz.md)
- Quiz section at end of textbook
- JSON export only (for external LMS)

**Difficulty Tuning:**

- Easy mode: More Remember/Understand, fewer distractors
- Standard mode: Balanced distribution
- Challenge mode: More Analyze/Evaluate/Create, difficult distractors

**Randomization:**

- Fixed quiz (same questions every time)
- Random selection (from question bank)
- Adaptive (adjusts difficulty based on performance - future feature)
