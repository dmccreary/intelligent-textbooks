---
title: Question-Based Learning Graph Update
description: Interactive vis-network visualization showing how answering assessment questions updates a personal student learning graph with color-coded mastery states
---

# Question-Based Learning Graph Update

<iframe src="main.html?enable-save=true" width="100%" height="680px" scrolling="no"></iframe>

[Run MicroSim (Editor Mode)](main.html?enable-save=true){ .md-button .md-button--primary }
[Run MicroSim (View Only)](main.html){ .md-button }

This MicroSim demonstrates how **adaptive assessment systems** build and update a personal learning graph based on student responses. Understanding this mechanism is essential for designing intelligent tutoring systems and personalized learning paths.

## Concept Overview

In adaptive assessment, each student maintains a personal learning graph where nodes represent concepts and edges represent prerequisite dependencies. As students answer questions, the system updates their mastery status:

### Node Color States

| Color | State | Meaning |
|-------|-------|---------|
| Gray | Unknown | Concept mastery has not been assessed |
| Green | Mastered | Student correctly answered questions about this concept |
| Orange | Ready to Learn | All prerequisites are mastered; student is ready for this topic |
| Red | Learning Goal | Student answered incorrectly; concept needs more study |

## How It Works

1. **Initial State**: All nodes begin as gray (unknown mastery)
2. **Foundation Concepts**: Nodes with no prerequisites automatically become orange (ready to learn)
3. **Answering Questions**: Click any node to simulate answering a question
   - Select "Correct" to mark the concept as mastered (green)
   - Select "Incorrect" to mark it as a learning goal (red)
4. **Backward Inference**: When a concept is mastered, all prerequisites are automatically inferred as mastered with decaying certainty (90% per level)
5. **Forward Propagation**: When prerequisites turn green, dependent concepts may become orange (ready to learn)

### Backward Inference Explained

If a student correctly answers a question about "Two-Step Equations", we can reasonably infer they've mastered the prerequisites:

| Concept | Certainty | Reasoning |
|---------|-----------|-----------|
| Two-Step Equations | 100% | Directly assessed |
| One-Step Equations | 90% | Direct prerequisite |
| Solve Equations | 81% | One level back |
| Equation | 73% | Two levels back |

This models how knowledge actually works - you can't master advanced concepts without understanding the foundations. Hover over nodes to see their certainty scores.

## The Algebra 1 Concept Graph

This visualization uses 17 foundational Algebra 1 concepts:

### Foundation Layer
- **Number** - Base concept for all mathematics
- **Variable** - Symbols representing unknown values
- **Constant** - Fixed numeric values

### Building Blocks
- **Term** - Combines variables, constants, and coefficients
- **Expression** - Collection of terms
- **Equation** - Statement that two expressions are equal

### Operations
- **Order of Operations** - Rules for evaluating expressions (PEMDAS)
- **Distributive Property** - Distributing multiplication over addition
- **Evaluate** - Substitute values and compute results

### Simplification
- **Like Terms** - Terms with identical variable parts
- **Combine** - Adding or subtracting like terms
- **Simplify** - Reducing expressions to simplest form
- **Expand** - Using distribution to remove parentheses

### Equation Solving Progression
- **Solve Equations** - Finding values that make equations true
- **One-Step** - Equations requiring one operation to solve
- **Two-Step** - Equations requiring two operations
- **Multi-Step** - Complex equations with multiple steps

## Educational Applications

This visualization helps educators and system designers understand:

1. **Prerequisite Dependencies**: Why certain concepts must be mastered before others
2. **Learning Readiness**: How the system determines what a student is ready to learn
3. **Adaptive Sequencing**: How intelligent tutoring systems select the next topic
4. **Mastery Tracking**: How student progress is visualized and monitored

## Technical Implementation

### State Management
- Each node maintains a state (`gray`, `green`, `orange`, `red`)
- Certainty scores (0.0 to 1.0) can be extended for probabilistic mastery models
- Hover over nodes to see current state and prerequisites

### Dependency Checking
```javascript
function allPrerequisitesMastered(nodeId) {
    const prereqs = dependencies[nodeId];
    if (prereqs.length === 0) return true;
    return prereqs.every(prereqId => nodeStates[prereqId] === 'green');
}
```

### Propagation Algorithm
When a node turns green, the system checks all gray nodes to see if they should become orange (ready to learn).

## Connection to Adaptive Assessment

This MicroSim illustrates a key component of adaptive assessment systems:

1. **Knowledge State Estimation**: The graph represents the system's belief about what the student knows
2. **Question Selection**: Orange nodes are prime candidates for the next assessment question
3. **Personalized Learning Paths**: The progression through the graph creates an individualized curriculum
4. **Immediate Feedback**: Color changes provide visual feedback on learning progress

## Try It Yourself

1. Click on **Number** and mark it correct (green)
2. Notice how dependent concepts become orange (ready to learn)
3. Continue marking concepts to build a complete mastery profile
4. Try marking a concept incorrect (red) to see it become a learning goal
5. Use Reset to start over and explore different learning paths

## Editor Mode

This MicroSim supports an **editor mode** for repositioning nodes:

### Enabling Editor Mode
Add `?enable-save=true` to the URL:
```
main.html?enable-save=true
```

### Editor Features
- **Drag nodes** to reposition them on the canvas
- **Zoom and pan** the view to see all nodes
- **Save Node Positions** button downloads updated `data.json`
- Replace the original `data.json` with the downloaded file to persist changes

### Data Format
Node positions are stored in `data.json`:
```json
{
  "metadata": { "title": "...", "version": "1.0" },
  "nodes": [
    { "id": 1, "label": "Number", "x": -400, "y": -200 },
    ...
  ],
  "edges": [
    { "from": 2, "to": 1, "comment": "Variable depends on Number" },
    ...
  ]
}
```

## Technical Notes

This MicroSim is built with:

- **vis-network.js** for interactive graph visualization
- **External data file** (`data.json`) for node/edge definitions
- Custom CSS layout with responsive right panel
- Event-driven state management for real-time updates
- Hover tooltips showing node details and prerequisites
- Conditional editor mode via URL parameters
