# Chapter 4: MicroSims

MicroSims—small, focused interactive simulations—represent the most distinctive feature of intelligent textbooks. They transform passive reading into active exploration, allowing students to manipulate variables and observe outcomes in real-time.

## Instructional Design

Effective MicroSims don't just display information; they are carefully designed learning experiences. The instructional design behind a MicroSim determines whether it genuinely aids understanding or merely adds visual distraction.

### Design Principles

**Single Concept Focus**: Each MicroSim should illustrate one specific concept. Attempting to cover multiple concepts in a single simulation creates confusion and dilutes learning.

**Clear Learning Objective**: Before building, articulate exactly what the student should understand after interacting with the MicroSim.

**Appropriate Complexity**: The simulation should be complex enough to be meaningful but simple enough to be understood. When in doubt, simplify.

**Immediate Feedback**: Every input change should produce visible output change without delay. Laggy simulations frustrate learners.

## How Humans Learn

MicroSims leverage fundamental principles of human learning:

**Active Learning**: People learn better by doing than by reading. Manipulating a simulation engages learners more deeply than viewing static diagrams.

**Concrete Before Abstract**: Abstract concepts become accessible when grounded in concrete, manipulable representations. A physics equation comes alive when you can adjust the variables and see the result.

**Multiple Representations**: Connecting symbolic (equations), visual (diagrams), and interactive (simulations) representations strengthens understanding.

**Immediate Feedback**: Rapid feedback allows learners to test hypotheses and correct misconceptions in real-time.

**Self-Paced Exploration**: Students can spend as much time as needed, exploring edge cases and building intuition at their own pace.

## The Importance of Interactive Controls

Controls are the interface between learner and simulation. Well-designed controls:

**Use Appropriate Input Types**:
- Sliders for continuous values within a range
- Buttons for discrete actions or states
- Dropdown menus for categorical choices
- Text input for specific values (sparingly)

**Provide Clear Labels**: Every control should be labeled with its parameter name and current value.

**Set Sensible Defaults**: Initial values should produce meaningful output that demonstrates the concept.

**Constrain Ranges**: Prevent inputs that would break the simulation or produce meaningless results.

**Show Units**: When applicable, display units (meters, seconds, ohms) alongside values.

## Types of MicroSims

Different concepts call for different simulation types. The following categories cover most educational needs.

## Infographics and Infoboxes

Static visualizations become interactive when elements respond to user interaction:

- Hovering reveals additional detail
- Clicking toggles between views
- Scrolling reveals progressive information

These are the simplest MicroSims—enhanced visualizations rather than full simulations.

## Flash Cards and Memorization

Flash card MicroSims support knowledge retention:

- Display term or question
- User attempts to recall answer
- Reveal correct answer for comparison
- Track correct/incorrect for spaced repetition

While simple, flash card MicroSims address a real learning need: transferring information from short-term to long-term memory.

## Matching Game MicroSims

Matching exercises test association knowledge:

- Connect terms to definitions
- Match examples to categories
- Link causes to effects

Interactive matching provides immediate feedback on errors and allows retry without external grading.

## Charts and Graphs

Data visualization MicroSims allow exploration of datasets:

- Adjustable parameters that filter or transform data
- Interactive tooltips showing exact values
- Zoomable and pannable displays
- Comparison overlays

Students learn to read and interpret visualizations through direct manipulation.

## Making Charts Move

Animated charts show how relationships change over time:

- Time-series data plays forward and backward
- Parameter changes update visualization in real-time
- Speed controls allow detailed examination

Animation transforms static relationships into dynamic processes.

## Timelines

Timeline MicroSims present sequential information:

- Scrub through historical events
- Zoom to different time scales
- Filter by category or theme
- Show relationships between concurrent events

Timelines work for historical content, process sequences, and developmental progressions.

## Interactive Maps

Geographic MicroSims display spatial data:

- Zoomable maps with overlaid information
- Clickable regions revealing details
- Data layers that can be toggled
- Time sliders showing geographic change

The Leaflet library provides excellent mapping capabilities for web-based simulations.

## Geospatial Tools and Leaflet

Leaflet is an open-source JavaScript library for interactive maps. Key features:

- Lightweight and mobile-friendly
- Multiple tile sources (OpenStreetMap, satellite, terrain)
- Marker, polygon, and overlay support
- Custom popups and tooltips
- GeoJSON data integration

For MicroSims with geographic components, Leaflet provides production-ready mapping without complexity.

## Revisiting the Bloom Taxonomy

MicroSims can target different cognitive levels:

**Remember/Understand**: Flash cards, matching games, labeled diagrams
**Apply**: Parameter manipulation, calculation practice
**Analyze**: Data exploration, relationship investigation
**Evaluate**: Comparison tools, trade-off analysis
**Create**: Design environments, composition tools

Higher-level MicroSims require more development effort but provide deeper learning experiences.

## Discovering Learning Objectives

For each MicroSim, explicitly state the learning objective:

- What will the student understand after interaction?
- What skills will they develop?
- What misconceptions might be corrected?

Clear objectives guide design decisions and provide criteria for evaluating effectiveness.

## The Bloom Verbs

Align MicroSim activities with Bloom's Taxonomy verbs:

**Remember**: Identify, recall, recognize
**Understand**: Explain, predict, describe
**Apply**: Calculate, solve, demonstrate
**Analyze**: Compare, differentiate, examine
**Evaluate**: Assess, critique, justify
**Create**: Design, construct, propose

The verbs suggest what interactions the MicroSim should support.

## Matching Levels and Verbs to a MicroSim

Consider an Ohm's Law MicroSim:

**Remember Level**: "Identify which variable represents current"
- Simple labeling exercise

**Understand Level**: "Predict what happens to current when resistance increases"
- Slider manipulation with verbal prediction before seeing result

**Apply Level**: "Calculate the current for given voltage and resistance values"
- Input values, compute answer, check against simulation

**Analyze Level**: "Compare series and parallel circuit behavior"
- Side-by-side simulations with shared parameters

**Evaluate Level**: "Assess which circuit design better meets requirements"
- Multiple options with trade-off visualization

Each level requires progressively more sophisticated simulation design.

---

## Implementing MicroSims

With design principles established, implementation follows. The p5.js library provides an excellent foundation for educational simulations.

### p5.js Overview

p5.js is a JavaScript library for creative coding. Key characteristics:

- Simple API focused on graphics and interaction
- `setup()` function runs once at start
- `draw()` function runs continuously (animation loop)
- Built-in mouse and keyboard handling
- Works in any modern browser

### Basic Structure

A minimal p5.js MicroSim:

```javascript
function setup() {
  createCanvas(400, 300);
}

function draw() {
  background(255);
  // Visualization code here
}
```

Add controls and state variables as needed for the specific concept.

### Canvas-Based Controls

For MicroSims embedded in iframes, use canvas-based controls rather than DOM elements:

- Draw buttons and sliders directly on the canvas
- Handle mouse interaction in `mousePressed()` and `mouseDragged()`
- Maintain control state in global variables

This approach ensures consistent behavior across embedding contexts.

### Responsive Sizing

MicroSims should adapt to container width:

```javascript
function setup() {
  let container = select('#canvas-container');
  let w = container.width;
  createCanvas(w, w * 0.75); // 4:3 aspect ratio
}
```

Call `windowResized()` to handle container size changes.

### File Organization

Each MicroSim occupies its own directory:

```
sims/
  ohms-law/
    main.html     # Standalone HTML page
    sketch.js     # p5.js code
    index.md      # Documentation
```

The HTML file loads p5.js and the sketch. The markdown file provides context and embedding code for the textbook.

### Embedding

Embed MicroSims using iframes:

```markdown
<iframe src="./main.html" width="100%" height="400px"></iframe>
```

Iframes provide isolation, preventing style conflicts between the simulation and surrounding content.

---

With MicroSims designed, implemented, and embedded, the intelligent textbook offers genuine interactivity. Chapter 5 explores how to measure whether these interactive elements—and the textbook as a whole—are actually being used effectively.
