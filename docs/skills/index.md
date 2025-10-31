# Claude Skills for Intelligent Textbooks

This page provides an overview of all available Claude Skills for building intelligent textbooks. Each skill automates a specific aspect of textbook development with built-in quality metrics and validation.

## Learning Graph

This skill converts a course description into a concept dependency graph called a learning graph. Learning graphs provide a roadmap of concept learning order for a course and are foundational data structures for recommending content for students. The skill analyzes course descriptions, generates pedagogically-sound concept labels, maps prerequisite dependencies as a Directed Acyclic Graph (DAG), validates quality with cycle detection and connectivity checks, creates a balanced taxonomy, and produces distribution reports and JSON exports ready for visualization.

[Learning Graph Skill Details](learning-graph.md)

## P5 MicroSim

This skill generates a MicroSim application that will run within an intelligent textbook. MicroSims are small-scale, embedded interactive simulations designed to illustrate concepts interactively within educational content. The skill creates a complete directory structure with main.html, p5.js code, index.md documentation, and metadata.json files following established templates and coding standards for immediate integration into textbook chapters.

[P5 MicroSim Skill Details](microsim-p5.md)

## Glossary Generator

This skill automatically generates a comprehensive glossary of terms from a learning graph's concept list, ensuring each definition follows ISO 11179 metadata registry standards (precise, concise, distinct, non-circular, and free of business rules). The skill creates alphabetically ordered definitions with relevant examples, performs quality scoring on each definition, and validates cross-references to ensure all terms are properly integrated with the textbook content.

[Glossary Generator Skill Details](glossary-generator.md)

## FAQ Generator

This skill generates a comprehensive set of Frequently Asked Questions (FAQs) from course content, learning graphs, and glossary terms to help students understand common questions and prepare content for chatbot integration. The skill organizes questions by category and difficulty using Bloom's Taxonomy distribution, provides answers with links to relevant sections, and exports structured JSON data ready for RAG system integration.

[FAQ Generator Skill Details](faq-generator.md)

## Chapter Content Generator

This skill generates comprehensive chapter content for an intelligent textbook based on the learning graph, ensuring each chapter covers specific concepts with appropriate scaffolding, examples, and alignment to Bloom's Taxonomy learning outcomes. The skill validates prerequisite compliance, creates practice exercises, recommends MicroSim opportunities, and maintains progressive complexity across chapters while ensuring consistent terminology usage from the glossary.

[Chapter Content Generator Skill Details](chapter-generator.md)

## Quiz Generator

This skill generates interactive quizzes for each chapter of an intelligent textbook, with questions aligned to specific concepts from the learning graph and distributed across Bloom's Taxonomy cognitive levels to assess student understanding effectively. The skill creates 8-12 multiple choice questions per chapter with quality distractors, explanations for all answers, links to chapter sections, and exports to JSON format for LMS or chatbot integration.

[Quiz Generator Skill Details](quiz-generator.md)

## Quality Metrics Analyzer

This skill performs comprehensive quality analysis of an intelligent textbook, generating detailed metrics reports covering content structure, engagement features, technical implementation, and educational effectiveness to guide continuous improvement. The analyzer evaluates navigation quality, content balance, interactive elements, Bloom's Taxonomy alignment, scaffolding compliance, link validation, and accessibility, producing prioritized recommendations across critical, high, medium, and low priority categories.

[Quality Metrics Analyzer Skill Details](quality-metrics-analyzer.md)

## Social Media Generator

This skill generates optimized social media preview images and Open Graph metadata for each page in the intelligent textbook, ensuring attractive, informative previews when pages are shared on social platforms, and creates a social media promotion campaign to increase textbook visibility. The skill produces custom social cards, platform-specific posts for Twitter/LinkedIn/Facebook/Reddit, launch campaign schedules, MicroSim preview GIFs, and UTM-tracked links for analytics integration.

[Social Media Generator Skill Details](social-media-generator.md)

## Concept Validator

This skill validates that all concepts in the learning graph are properly integrated throughout the textbook, checking for coverage in chapters, glossary definitions, quiz questions, and MicroSims, while identifying gaps and ensuring pedagogical consistency across the entire educational resource. The validator generates comprehensive coverage matrices, gap analysis reports, scaffolding validation, terminology consistency checks, and prioritized remediation plans organized by critical, high, medium, and enhancement categories.

[Concept Validator Skill Details](concept-validator.md)

---

## Recommended Execution Order

For optimal workflow, skills should generally be executed in this order:

1. **Learning Graph** - Foundation for all other skills
2. **Glossary Generator** - After learning graph is finalized
3. **Chapter Content Generator** - After chapter structure is defined
4. **MicroSim P5** - During or after chapter development (ongoing)
5. **Quiz Generator** - After each chapter or in batch mode
6. **FAQ Generator** - After substantial chapter content exists
7. **Concept Validator** - Periodically during development and before release
8. **Quality Metrics Analyzer** - Before deployment and for periodic quality checks
9. **Social Media Generator** - When ready for promotion

See the [Recommended Skills Summary](recommended-skills-summary.md) for detailed workflow phases, priority rankings, and integration strategies.