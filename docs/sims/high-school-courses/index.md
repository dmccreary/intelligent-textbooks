# High School Courses Dependency Graph

## Overview

An interactive visualization tool that maps the prerequisite relationships between typical high school courses. This MicroSim helps students, parents, and educators understand course sequencing and plan academic pathways through high school.

## MicroSim

<iframe src="main.html" width="100%" height="600px"></iframe>

[Open in Full Screen](./main.html){:target="_blank"}

## Features

- **Interactive Graph Visualization**: Explore course dependencies using vis-network library
- **Two Layout Modes**:
  - **Left to Right**: Hierarchical layout showing progression from foundational to advanced courses
  - **Force Directed**: Physics-based layout that clusters related courses naturally
- **Color-Coded Levels**: Each course is color-coded by level (red for foundational, progressing through orange, yellow, green, to cyan for advanced)
- **Size Indicates Impact**: Node size reflects the number of dependent courses (e.g., Algebra I is large because many courses require it)
- **Draggable Nodes**: In Force Directed mode, drag nodes to reposition - physics will readjust for 5 seconds
- **Navigation Controls**: Pan, zoom, and navigate the graph with mouse or keyboard

## How to Use

1. **View Dependencies**: Arrows point from prerequisite courses to dependent courses
2. **Switch Layouts**: Use the radio buttons to toggle between Left to Right and Force Directed views
3. **Interact with Nodes**:
   - Click to select and highlight a course
   - Hover to see course details
   - Drag nodes in Force Directed mode to reorganize
4. **Navigate**: Use mouse wheel to zoom, drag background to pan

## Educational Value

This visualization helps answer questions like:
- What courses do I need before taking AP Calculus?
- Which courses depend on Algebra I?
- What's the typical sequence for science courses?
- How do different subject areas progress through high school?

## Course Categories

The graph includes courses from:
- **Mathematics**: Algebra I, Geometry, Algebra II, Pre-Calculus, Calculus, Statistics
- **Science**: Biology, Chemistry, Physics, Environmental Science
- **English/Language Arts**: English 9-10, Literature, AP English
- **Social Studies**: World History, U.S. History, Government, Economics, Psychology
- **World Languages**: Spanish I-II
- **Arts**: Art, Graphic Design, Music
- **Technology**: Computer Apps, Programming, Engineering/Robotics
- **Business**: Marketing, Accounting, Personal Finance
- **Other**: Physical Education, Health

## Technical Details

- **Library**: [vis-network](https://visjs.github.io/vis-network/docs/network/) for graph visualization
- **Layout Algorithms**:
  - Hierarchical (directed) for structured left-to-right view
  - ForceAtlas2-based physics for organic clustering
- **Data Format**: JSON with nodes (courses) and edges (prerequisites)
- **Responsive**: Adapts to different screen sizes

## Insights

- **Algebra I is foundational**: 9 courses directly depend on it (Biology, Chemistry, Physics, Economics, Graphic Design, Computer Programming, Engineering, Accounting, Personal Finance)
- **Math sequences**: Two parallel tracks after Algebra I (Geometry and Algebra II)
- **AP courses** generally require 2-3 prerequisite courses
- **Interdisciplinary connections**: Math skills support science, technology, business, and social science courses