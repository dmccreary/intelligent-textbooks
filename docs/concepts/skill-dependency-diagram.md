# Skill Dependency Diagram

This diagram shows the dependencies between intelligent textbook creation skills.

## Dependency Graph

```
┌─────────────────────────────────────────────────────────────────┐
│                      TEXTBOOK CREATION WORKFLOW                 │
└─────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│ PHASE 1: PLANNING                                                │
└──────────────────────────────────────────────────────────────────┘

    course_description_analyzer
    ────────────────┬────────────────
                    │
                    ├─────────────────────────────────┐
                    │                                 │
                    ▼                                 ▼

┌──────────────────────────────────────────────────────────────────┐
│ PHASE 2: FOUNDATION                                              │
└──────────────────────────────────────────────────────────────────┘

    learning_graph_generator            reference_generator
    ────────────┬────────────            (can run anytime)
                │
        ┌───────┼───────┬───────┬───────┬───────┬───────┐
        │       │       │       │       │       │       │
        ▼       ▼       ▼       ▼       ▼       ▼       ▼

┌──────────────────────────────────────────────────────────────────┐
│ PHASE 3: CONTENT GENERATION                                      │
└──────────────────────────────────────────────────────────────────┘

    glossary     chapter    microsim   concept_
    generator    generator  _p5        validator
        │            │
        │            ├───── (30% complete) ─────┬
        │            │                           │
        │            │                           ▼
        │            │
        │            ├───── (50% complete) ──────┐
        │            │                            │
        ▼            ▼                            │

┌──────────────────────────────────────────────────────────────────┐
│ PHASE 4: ENHANCEMENT                                             │
└──────────────────────────────────────────────────────────────────┘

    quiz_generator      faq_generator          │
    (needs 30%          (needs 30% chapters,   │
     chapters)           glossary)              │
                                                │
                                                ▼

┌──────────────────────────────────────────────────────────────────┐
│ PHASE 5: QUALITY ASSURANCE                                       │
└──────────────────────────────────────────────────────────────────┘

    quality_metrics_analyzer
    (can run anytime)


┌──────────────────────────────────────────────────────────────────┐
│ PHASE 6: DEPLOYMENT                                              │
└──────────────────────────────────────────────────────────────────┘

    social_media_generator
    (needs 50% chapters)
```

## Dependency Details

### No Dependencies (Can Run First)

- **course_description_analyzer** - Start here
- **quality_metrics_analyzer** - Can run anytime to check progress

### Requires Course Description (Quality ≥ 70)

- **learning_graph_generator** - Needs validated course description
- **reference_generator** - Needs course description only
- **faq_generator** - Needs course description (among others)

### Requires Learning Graph (Quality ≥ 70)

- **glossary_generator** - Generates terms from concepts
- **chapter_generator** - Uses concepts to structure content
- **microsim_p5** - Creates simulations for concepts
- **concept_validator** - Validates the concept graph
- **quiz_generator** - Aligns questions to concepts
- **faq_generator** - Uses concepts for questions

### Requires Chapter Progress

- **quiz_generator** - Needs 30% of chapters complete
- **faq_generator** - Needs 30% of chapters complete
- **social_media_generator** - Needs 50% of chapters complete

### Multiple Dependencies

**faq_generator** requires ALL of:
- course_description_analyzer (quality ≥ 70)
- learning_graph_generator (quality ≥ 70)
- glossary_generator (quality ≥ 70)
- chapter_generator (30% complete)

## Parallel Execution Opportunities

These skills can run in parallel once dependencies are met:

### After Learning Graph Completes

Run simultaneously:
1. **glossary_generator** - Generate terminology
2. **chapter_generator** - Start writing chapters
3. **microsim_p5** - Create simulations
4. **concept_validator** - Validate concepts

### After 30% Chapters Complete

Run simultaneously:
1. **quiz_generator** - Create quizzes
2. **faq_generator** - Generate FAQs (if glossary done)

## Critical Path

The fastest path through the workflow:

```
1. course_description_analyzer
   ↓
2. learning_graph_generator
   ↓
3. chapter_generator (start - runs in background)
   ↓
4. glossary_generator (while chapters generating)
   ↓
5. Wait for chapters to reach 30%
   ↓
6. quiz_generator & faq_generator (parallel)
   ↓
7. Wait for chapters to reach 50%
   ↓
8. social_media_generator
   ↓
9. quality_metrics_analyzer (final check)
   ↓
10. Deploy
```

## Quality Score Requirements

Skills require these minimum quality scores from dependencies:

| Skill | Requires | Min Score |
|-------|----------|-----------|
| learning_graph_generator | course_description_analyzer | 70 |
| glossary_generator | learning_graph_generator | 70 |
| chapter_generator | learning_graph_generator | 70 |
| quiz_generator | learning_graph_generator | 70 |
| faq_generator | course_description_analyzer | 70 |
| faq_generator | learning_graph_generator | 70 |
| faq_generator | glossary_generator | 70 |
| reference_generator | course_description_analyzer | 70 |
| microsim_p5 | learning_graph_generator | 70 |
| concept_validator | learning_graph_generator | 70 |

## Completion Requirements

| Skill | Requires | Min Completion |
|-------|----------|----------------|
| quiz_generator | chapter_generator | 30% |
| faq_generator | chapter_generator | 30% |
| social_media_generator | chapter_generator | 50% |

## Recommended Execution Order

For a typical textbook creation workflow:

### Week 1: Planning & Foundation
1. ✓ course_description_analyzer
2. ✓ learning_graph_generator
3. ✓ concept_validator

### Week 2-3: Initial Content
4. ✓ glossary_generator
5. ✓ reference_generator
6. ▶ chapter_generator (start - continues in background)

### Week 4-6: Content Development
7. ▶ chapter_generator (continue)
8. ✓ microsim_p5 (create 2-3 initial simulations)
9. ✓ quality_metrics_analyzer (first check)

### Week 7-8: Enhancement
10. ✓ quiz_generator (once 30% chapters done)
11. ✓ faq_generator (once 30% chapters done)
12. ▶ chapter_generator (continue to completion)

### Week 9: Polish & Deploy
13. ✓ microsim_p5 (complete remaining simulations)
14. ✓ social_media_generator (once 50% chapters done)
15. ✓ quality_metrics_analyzer (final check)

### Week 10: Launch
16. Build and deploy site
17. Share on social media

## Blocking Scenarios

### Common Blockers

**Quiz Generator Won't Run**
```
Blocked: Dependency 'learning_graph_generator' must be completed
Blocked: Dependency 'chapter_generator' must be completed

Solution:
1. Run learning_graph_generator first
2. Run chapter_generator until 30% complete
3. Then quiz_generator can run
```

**FAQ Generator Won't Run**
```
Blocked: Dependency 'course_description_analyzer' must be completed
Blocked: Dependency 'learning_graph_generator' must be completed
Blocked: Dependency 'glossary_generator' must be completed
Blocked: Dependency 'chapter_generator' must be completed

Solution: FAQ generator has the most dependencies
1. Complete course_description_analyzer
2. Complete learning_graph_generator
3. Complete glossary_generator
4. Get chapter_generator to 30%
5. Then faq_generator can run
```

**Quality Score Too Low**
```
Blocked: Dependency 'course_description_analyzer' requires quality score >= 70
         (current: 65)

Solution:
1. Review course_description_analyzer output
2. Improve quality based on feedback
3. Re-run with improvements
4. Verify new score >= 70
```

## Status Checking

Check dependencies before running any skill:

```bash
# Check specific skill
python src/book_metadata_helper.py check --skill quiz_generator

# See full dependency graph status
python src/book_metadata_helper.py status
```

## See Also

- [Book Metadata Quick Start](book-metadata-quickstart.md)
- [Book Metadata Guide](book-metadata-guide.md)
- [Skill Integration Examples](skills/metadata-integration-example.md)
- [Workflow Documentation](../workflow/index.md)
