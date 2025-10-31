# Quality Metrics Analyzer Skill

## Summary

This skill performs comprehensive quality analysis of an intelligent textbook, generating detailed metrics reports covering content structure, engagement features, technical implementation, and educational effectiveness to guide continuous improvement.

## Order

This skill should be executed:
1. **During development**: After major milestones (learning graph, chapters, MicroSims)
2. **Before deployment**: As final quality gate before publishing
3. **Periodically**: Monthly or quarterly for mature textbooks
4. **On demand**: When investigating specific quality concerns

The analyzer can run at any stage but provides most value when substantial content exists (minimum: course description, learning graph, and 5+ chapters).

## Inputs

### Primary Input Files

1. **Complete Textbook Repository** (entire `docs/` directory)
   - All markdown files
   - All MicroSims
   - Images and assets
   - Quality check: Valid mkdocs project structure

2. **Configuration File** (`mkdocs.yml`)
   - Site structure and navigation
   - Theme settings
   - Plugin configuration
   - Quality check: Valid YAML, all referenced files exist

3. **Learning Graph** (`docs/learning-graph/` directory)
   - Concept dependencies CSV
   - Taxonomy CSV
   - Quality reports from other skills
   - Quality check: Files exist and are valid

4. **Glossary** (`docs/glossary.md`)
   - Quality check: Alphabetically ordered, valid markdown

5. **MicroSims** (`docs/sims/*/`)
   - All simulation directories
   - Quality check: Each has index.md, main.html, and .js file

### Optional Input Files

6. **Analytics Data** (if available)
   - Google Analytics export
   - User engagement metrics
   - Page view statistics

7. **Previous Quality Reports** (`docs/learning-graph/quality-reports/`)
   - Historical metrics for trend analysis
   - Quality check: Valid JSON format

8. **Custom Quality Standards** (`docs/quality-standards.json`)
   - Project-specific thresholds
   - Custom metrics definitions
   - Override default scoring

### Input Quality Metrics (Scale 1-100)

**Repository Completeness Score:**
- 90-100: All expected files present, valid structure
- 70-89: Core files present, some optional components missing
- 50-69: Basic structure but missing key components
- Below 50: Insufficient content for meaningful analysis

**Pre-Analysis Checks:**
1. Valid mkdocs.yml (required)
2. At least 10 markdown files (minimum viable content)
3. Course description exists
4. Learning graph exists (recommended)
5. At least 1 MicroSim (for full analysis)

**User Dialog Triggers:**
- Score < 50: "Limited content detected. Analysis will be incomplete. Continue?"
- No learning graph: "No learning graph found. Many educational metrics will be unavailable. Proceed with basic analysis?"
- No MicroSims: "No MicroSims detected. Interactivity metrics will be zero. Continue?"
- Missing mkdocs.yml: "Invalid mkdocs configuration. Cannot analyze site structure. Fix configuration first?"

## Outputs

### Primary Report

1. **`docs/quality-report.md`** - Comprehensive human-readable report
   - Executive summary with overall score
   - Detailed metrics by category
   - Trend analysis (if historical data available)
   - Prioritized recommendations for improvement
   - Visual charts (using Mermaid diagrams)

### Detailed Metrics Files

2. **`docs/learning-graph/quality-reports/metrics-[YYYY-MM-DD].json`** - Machine-readable data
   - Timestamp and version
   - All metrics with scores
   - Raw counts and calculations
   - Comparison to thresholds

3. **`docs/learning-graph/quality-reports/content-structure-analysis.md`**
   - Navigation depth and breadth
   - Chapter balance analysis
   - Concept coverage matrix
   - Content hierarchy visualization

4. **`docs/learning-graph/quality-reports/engagement-analysis.md`**
   - Interactive element distribution
   - MicroSim complexity ratings
   - Quiz coverage map
   - Engagement opportunity gaps

5. **`docs/learning-graph/quality-reports/technical-quality-analysis.md`**
   - Build configuration completeness
   - Link validation results
   - Markdown formatting issues
   - Accessibility compliance score
   - Performance metrics

6. **`docs/learning-graph/quality-reports/educational-effectiveness-analysis.md`**
   - Bloom's Taxonomy distribution across textbook
   - Scaffolding quality assessment
   - Learning graph connectivity metrics
   - Prerequisite compliance validation

### Output Quality Metrics (Scale 1-100)

#### 1. Content Structure Metrics (25 points total)

**Navigation Quality (8 points):**
- Depth: 2-4 levels ideal (8 pts), 1 or 5+ levels (4 pts), 6+ levels (2 pts)
- Breadth: Balanced sections (5-15 items per level)
- Orphan pages: 0% = 8 pts, 1-5% = 6 pts, 6-10% = 4 pts, >10% = 2 pts

**Content Balance (8 points):**
- Chapter word count variance < 30% = 8 pts, 30-50% = 5 pts, >50% = 2 pts
- Concept distribution: Balanced across chapters = 8 pts
- Section depth consistency: All chapters similar structure = 8 pts

**Coverage Completeness (9 points):**
- Learning graph concepts covered: 100% = 9 pts, 90-99% = 7 pts, 80-89% = 5 pts, <80% = 2 pts
- Glossary coverage: All concepts defined = 9 pts
- Cross-reference density: 3+ links per page = 9 pts

#### 2. Engagement Features Metrics (25 points total)

**Interactive Elements (10 points):**
- MicroSim distribution: 1 per 3-5 chapters = 10 pts
- MicroSim quality: Complex controls, multiple visualizations = 10 pts
- Quiz coverage: 60%+ chapters with quizzes = 10 pts

**Content Variety (8 points):**
- Admonition usage: 2-5 per chapter = 8 pts
- Code examples: Present in 70%+ technical chapters = 8 pts
- Visual elements: Images/diagrams in 60%+ chapters = 8 pts

**Practice Opportunities (7 points):**
- Exercise density: 1 per 1000 words = 7 pts
- Example quality: Relevant, clear, diverse = 7 pts
- Challenge problems: Progressive difficulty = 7 pts

#### 3. Technical Quality Metrics (25 points total)

**Build Configuration (8 points):**
- Complete mkdocs.yml: All required fields = 8 pts
- Theme properly configured = 8 pts
- Plugins correctly enabled = 8 pts
- Navigation matches file structure 100% = 8 pts

**Code Quality (9 points):**
- All internal links valid = 9 pts
- No markdown syntax errors = 9 pts
- Proper heading hierarchy = 9 pts
- Consistent formatting = 9 pts

**Production Readiness (8 points):**
- Analytics configured = 8 pts
- Social media previews enabled = 8 pts
- Logo and favicon present = 8 pts
- License specified = 8 pts
- Search enabled = 8 pts

#### 4. Educational Effectiveness Metrics (25 points total)

**Bloom's Taxonomy Alignment (10 points):**
- Distribution matches course level (introductory vs advanced)
- Progressive cognitive levels across chapters
- Higher-order thinking in appropriate places
- Target: 20% Remember, 30% Understand, 25% Apply, 15% Analyze, 7% Evaluate, 3% Create

**Scaffolding Quality (10 points):**
- 100% prerequisite compliance = 10 pts
- Clear concept progression = 10 pts
- No circular dependencies = 10 pts (required)
- Appropriate concept spacing (not too dense) = 10 pts

**Learning Support (5 points):**
- Glossary completeness = 5 pts
- FAQ addresses common confusion points = 5 pts
- Examples clarify difficult concepts = 5 pts
- Multiple explanation approaches for key ideas = 5 pts

### Detailed Metrics Collected

**Quantitative Metrics:**
- Total markdown files: [count]
- Total word count: [count]
- Average words per page: [count]
- Total images: [count]
- Total MicroSims: [count]
- Glossary terms: [count]
- Learning graph concepts: [count]
- Code blocks: [count]
- Admonitions: [count] (by type)
- Internal links: [count]
- External links: [count]
- Quiz questions: [count]

**Structural Metrics:**
- Navigation depth: [levels]
- Navigation breadth: [avg items/level]
- Chapter count: [count]
- Average chapter length: [words]
- Word count variance: [%]
- Orphaned pages: [count]

**Educational Metrics:**
- Bloom's Taxonomy distribution: [% by level]
- Concept coverage: [%]
- Prerequisite compliance: [%]
- Scaffolding score: [0-100]
- Learning graph connectivity: [avg edges/node]
- Orphaned concepts: [count]

**Engagement Metrics:**
- MicroSim density: [sims per chapter]
- Interactive element diversity: [types used]
- Quiz coverage: [% chapters with quizzes]
- Exercise density: [exercises per 1000 words]
- Example coverage: [% concepts with examples]
- Admonition density: [per chapter]

**Technical Metrics:**
- Broken internal links: [count]
- Broken external links: [count]
- Markdown syntax errors: [count]
- Heading hierarchy violations: [count]
- Missing alt text: [count images]
- Build configuration score: [0-100]
- Analytics configured: [yes/no]
- Mobile responsive: [yes/no]

### Quality Checks Performed

1. **Link Validation**: All internal and external links tested
2. **Markdown Linting**: Syntax errors, formatting inconsistencies
3. **Learning Graph Analysis**: Cycle detection, connectivity, orphan identification
4. **Prerequisite Validation**: Concepts only after dependencies
5. **Glossary Cross-check**: All terms properly defined
6. **Navigation Validation**: All nav entries point to existing files
7. **MicroSim Validation**: All required files present, proper structure
8. **Bloom's Distribution**: Compared against ideal distribution
9. **Readability Analysis**: Flesch-Kincaid scores by chapter
10. **Accessibility Audit**: Alt text, heading structure, semantic markup

### Recommendations Engine

The skill generates prioritized, actionable recommendations:

**Critical (Fix Immediately):**
- Broken build configuration
- Circular dependencies in learning graph
- Missing prerequisite concepts
- Broken internal links

**High Priority (Fix Soon):**
- Orphaned concepts
- Unbalanced chapter sizes
- Missing glossary terms
- Poor Bloom's distribution

**Medium Priority (Improve Quality):**
- Add more examples
- Increase MicroSim coverage
- Improve scaffolding
- Add more quizzes

**Low Priority (Nice to Have):**
- Add more admonitions
- Enhance social previews
- Add more cross-references
- Improve visual elements

### Success Criteria

**Overall Quality Grades:**
- 90-100: Excellent - Publication ready
- 80-89: Good - Minor improvements recommended
- 70-79: Adequate - Several improvements needed
- 60-69: Fair - Significant work required
- Below 60: Poor - Major revision needed

**Minimum Thresholds for "Publication Ready":**
- No critical issues (broken links, build errors)
- Learning graph valid (no cycles)
- 80%+ concept coverage
- 70%+ Bloom's alignment score
- 75%+ technical quality score
- At least 1 MicroSim per 5 chapters
- Complete glossary
- All navigation items valid

### Trend Analysis (if historical data available)

Compares current metrics to previous reports:
- Quality score trajectory
- Content growth rate
- Improvement areas
- Regression detection
- Velocity metrics (content added per month)

### Export Formats

The quality report can be exported as:
1. Markdown (default)
2. JSON (for programmatic analysis)
3. CSV (for spreadsheet analysis)
4. HTML (standalone report)
5. PDF (for sharing with stakeholders)
