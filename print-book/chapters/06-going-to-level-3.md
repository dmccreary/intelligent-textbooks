# Chapter 6: Going to Level 3

Level 3 intelligent textbooks introduce personalization. Rather than presenting identical content to all learners, the textbook adapts based on individual progress and demonstrated understanding. This requires tracking individual learning histories and implementing algorithms that respond to learner state.

## Personalized Learning

Personalization in education means adjusting the learning experience based on individual characteristics:

**Pace**: Learners proceed at speeds matching their ability to absorb material.

**Path**: Different learners may take different routes through the content based on prior knowledge.

**Depth**: Additional detail is available for those who want it; others can proceed with fundamentals.

**Remediation**: When learners struggle, the system identifies gaps and provides targeted review.

True personalization requires knowing where each learner stands, which means tracking individual progress through the learning graph.

## The Personal Learning Graph

Each learner has a personal learning graph—a copy of the course's concept dependency graph annotated with their individual mastery state.

For each concept, track:

**Mastery Level**: Unknown, In Progress, or Mastered

**Evidence**: Quiz scores, time on content, MicroSim interactions

**Timestamp**: When was mastery last assessed?

**Confidence**: How certain is the mastery estimate?

This personal graph enables adaptive recommendations. A learner who has demonstrated mastery of foundational concepts can skip ahead; one who struggles needs additional support.

## Graph Traversal

Navigating the learning graph requires algorithms that respect dependency constraints while optimizing learning efficiency.

### Topological Sort

Topological sorting produces a valid linear ordering of concepts where all dependencies are satisfied. Any concept appears only after all its prerequisites.

Multiple valid orderings exist. The choice among them can consider:

- Learner's prior knowledge (skip already-mastered concepts)
- Learning preferences (depth-first vs. breadth-first)
- Time available (prioritize essential concepts)

### Breadth-First Traversal

BFS explores the graph level by level, ensuring all prerequisites at one level are mastered before advancing:

- Start with foundation concepts (no dependencies)
- Master all concepts at depth 1 before depth 2
- Provides even coverage of the domain

BFS suits learners who want comprehensive understanding.

### Depth-First Traversal

DFS follows one path deeply before backtracking:

- Choose a terminal concept (learning goal)
- Work backward through prerequisites
- Focus attention on a specific outcome

DFS suits learners with specific objectives who don't need comprehensive coverage.

## Assessing Knowledge

Adaptive systems require knowledge assessment. Several approaches work:

**Pre-tests**: Evaluate existing knowledge before instruction begins.

**Embedded Quizzes**: Check understanding after content sections.

**MicroSim Interactions**: Infer understanding from simulation usage patterns.

**Self-Assessment**: Learners indicate their confidence level.

Each approach has trade-offs between accuracy, intrusiveness, and cost.

## Updating the Personal Learning Graph

As evidence accumulates, update the personal learning graph:

```python
def update_mastery(concept_id, evidence):
    current = get_mastery_level(concept_id)
    new_evidence = calculate_evidence_weight(evidence)

    updated = weighted_average(current, new_evidence)
    set_mastery_level(concept_id, updated)

    # Propagate uncertainty to dependent concepts
    for dependent in get_dependents(concept_id):
        mark_needs_review(dependent)
```

When prerequisite mastery changes, dependent concepts may need reassessment.

## Inferring Prior Knowledge

Not all prior knowledge needs explicit assessment. Inference shortcuts the process:

**Success on Advanced Concepts**: If a learner demonstrates mastery of concept B, and B depends on A, infer mastery of A.

**Domain Patterns**: Certain prerequisite clusters typically come together (e.g., basic algebra skills).

**Learner Profiles**: Similar learners often share prior knowledge patterns.

Inference reduces assessment burden but introduces uncertainty. Balance efficiency against accuracy.

## Recommending a Concept

Given the personal learning graph, recommend the next concept to study:

### Ready Concepts

A concept is ready when:
- All prerequisites are mastered
- The concept itself is not yet mastered

The set of ready concepts forms the learning frontier.

### Prioritization

Among ready concepts, prioritize by:

**Centrality**: Concepts with many dependents unlock more content.

**Learning Goals**: Concepts on the path to stated objectives.

**Recency**: Concepts whose prerequisites were recently learned (while fresh).

**Spacing**: Concepts due for review under spaced repetition.

### Recommendation Algorithm

```python
def recommend_next(personal_graph, goals):
    ready = get_ready_concepts(personal_graph)

    if not ready:
        # All concepts mastered or blocked
        return suggest_review(personal_graph)

    scored = []
    for concept in ready:
        score = calculate_priority(concept, goals, personal_graph)
        scored.append((concept, score))

    scored.sort(key=lambda x: x[1], reverse=True)
    return scored[0][0]
```

## Recommending

Beyond single concept recommendations, present learning paths:

**Short-term Path**: The next 3-5 concepts to master.

**Goal-oriented Path**: All concepts needed to reach a specific objective.

**Review Schedule**: Previously mastered concepts due for reinforcement.

Path visualization helps learners understand their trajectory and motivates progress.

## Designing for Interactivity

Level 3 textbooks require more interactive infrastructure:

**State Persistence**: Store personal learning graphs across sessions.

**Real-time Updates**: Adjust recommendations as evidence accumulates.

**User Interface**: Display progress, recommendations, and paths clearly.

**Performance**: Fast response despite complex graph computations.

Consider whether these capabilities justify the added complexity for your context.

## Drinking from the Event Firehose

Interactive textbooks generate high-volume event streams:

- Page views
- Scroll positions
- Click events
- Quiz answers
- MicroSim interactions
- Time stamps for everything

Processing this firehose requires thoughtful architecture.

## Pruning Events

Not all events matter equally. Prune aggressively:

**Sampling**: Record every Nth event for high-frequency interactions.

**Batching**: Aggregate related events before processing.

**Filtering**: Discard events that don't inform learning assessment.

**Summarization**: Store summaries rather than raw events.

Storage costs and processing requirements dictate pruning strategy.

## Analyzing Event Values

Extract learning-relevant signals from event data:

**Time Patterns**: Long pauses may indicate difficulty; rapid advancement suggests prior knowledge.

**Interaction Depth**: Thorough MicroSim exploration suggests engagement; quick abandonment suggests confusion or disinterest.

**Error Patterns**: Repeated mistakes on specific concepts identify gaps.

**Recovery Patterns**: How quickly do learners correct after errors?

Statistical models can predict mastery from event patterns more accurately than simple quiz scores.

---

## Privacy Considerations

Level 3 personalization requires individual tracking, crossing significant privacy thresholds:

**Data Minimization**: Collect only what's necessary for personalization.

**Transparency**: Inform learners what's tracked and why.

**Control**: Allow learners to view, export, and delete their data.

**Security**: Protect learning records from unauthorized access.

**Compliance**: Meet regulatory requirements (FERPA, COPPA, GDPR) for your context.

Privacy isn't just ethical obligation—it's often legal requirement. Educational contexts frequently involve minors or student records subject to specific protections.

---

Level 3 represents a significant step in capability and complexity. Many intelligent textbook projects appropriately remain at Level 2, where interactivity enhances learning without individual tracking. Chapter 7 explores standards that enable interoperability for systems that do implement higher levels.
