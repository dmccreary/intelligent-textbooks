# Best Practices for Creating Intelligent Textbooks with MkDocs Material

This guide outlines the best practices for creating engaging, interactive intelligent textbooks using the MkDocs Material system with MicroSims.

## Repository Structure

```
repository/
├── docs/                    # Content directory
│   ├── index.md             # Home page
│   ├── about.md             # About page
│   ├── img/                 # Images directory
│   ├── css/                 # Custom CSS
│   ├── js/                  # Custom JavaScript
│   ├── sims/                # MicroSims directory
│   │   ├── sim1/           
│   │   │   ├── index.md     # MicroSim documentation
│   │   │   ├── sketch.js    # p5.js code
│   │   ├── sim2/
│   │   └── index.md         # MicroSims gallery page
│   ├── tutorial/            # Tutorial section
│   ├── glossary.md          # Glossary of terms
│   └── learning-graph.md    # Learning graph visualization
├── mkdocs.yml               # Configuration file
└── requirements.txt         # Python dependencies

```

## MkDocs Configuration (mkdocs.yml)

```yaml
site_name: Your Intelligent Textbook
site_description: 'Description of your intelligent textbook'
site_author: 'Your Name'
repo_name: 'GitHub Repo'
site_url: 'https://yourusername.github.io/your-repo/'
repo_url: 'https://github.com/yourusername/your-repo'
edit_uri: 'blob/master/docs'

nav:
  - Home: index.md
  - About: about.md
  - Learning Paths:
    - Introduction: learning-paths/index.md
    - Path 1: learning-paths/path1.md
  - Tutorial:
    - Introduction: tutorial/index.md
    - Getting Started: tutorial/getting-started.md
  - MicroSims:
    - Gallery: sims/index.md
    - Simulation 1: sims/sim1/index.md
  - Glossary: glossary.md
  - Learning Graph: learning-graph.md

theme:
  name: material
  logo: img/logo.png
  favicon: img/favicon.ico
  palette:
    primary: 'blue'
    accent: 'orange'
  features:
    - content.code.copy
    - navigation.expand
    - navigation.path
    - navigation.indexes
    - toc.follow
    - navigation.top
    - navigation.footer
    - content.action.edit

plugins:
  - search
  - social

markdown_extensions:
  - admonition
  - md_in_html
  - pymdownx.details
  - pymdownx.superfences
  - attr_list
  - pymdownx.highlight:
      linenums: true

extra_css:
  - css/extra.css
extra_javascript:
  - js/extra.js
  - https://cdn.jsdelivr.net/npm/p5@1.4.1/lib/p5.js
```

## Core Elements of an Intelligent Textbook

### 1. Learning Graph

A learning graph visualizes the relationships between concepts in your textbook, helping students understand prerequisites and learning paths.

```html
<div id="learning-graph" style="width: 100%; height: 600px;"></div>

<script src="https://cdn.jsdelivr.net/npm/vis-network@9.1.2/dist/vis-network.min.js"></script>
<script>
document.addEventListener('DOMContentLoaded', function() {
  // Nodes represent concepts
  const nodes = [
    { id: 1, label: "Concept 1" },
    { id: 2, label: "Concept 2" },
    { id: 3, label: "Concept 3" }
  ];

  // Edges represent relationships/prerequisites
  const edges = [
    { from: 1, to: 2 },
    { from: 1, to: 3 }
  ];

  const container = document.getElementById('learning-graph');
  const data = { nodes: nodes, edges: edges };
  const options = {
    nodes: {
      shape: 'box',
      margin: 10,
      font: { size: 14 }
    },
    edges: {
      arrows: 'to',
      smooth: true
    },
    physics: {
      enabled: true,
      solver: 'forceAtlas2Based'
    }
  };

  new vis.Network(container, data, options);
});
</script>
```

### 2. Interactive Admonitions

Use MkDocs Material's admonitions for callouts, tips, and interactive elements.

```markdown
!!! note "Key Concept"
    This is an important concept to understand.

!!! example "Try it yourself"
    Here's an example to work through on your own.

!!! question "Check Your Understanding"
    What would happen if you changed the value of x?

??? tip "Hint (click to reveal)"
    Look at the relationship between x and y.
```

### 3. MicroSim Integration

MicroSims are small, interactive simulations that demonstrate concepts. Below is the standard structure for embedding a p5.js MicroSim:

```html
<div class="microsim-container">
  <div id="microsim-canvas"></div>
  <div class="microsim-controls">
    <button id="start-btn">Start</button>
    <button id="pause-btn">Pause</button>
    <button id="reset-btn">Reset</button>
    <div class="slider-container">
      <label for="speed-slider">Speed:</label>
      <input type="range" id="speed-slider" min="1" max="10" value="5">
    </div>
  </div>
</div>

<script src="sketch.js"></script>
```

### 4. Embedded Quizzes

Embed interactive quizzes to test comprehension.

```html
<div class="quiz-container">
  <div class="quiz-question">
    <p>What is the primary advantage of using MicroSims in education?</p>
    <form class="quiz-options">
      <div>
        <input type="radio" id="opt1" name="q1" value="a">
        <label for="opt1">They look visually appealing</label>
      </div>
      <div>
        <input type="radio" id="opt2" name="q1" value="b">
        <label for="opt2">They allow experiential learning through interaction</label>
      </div>
      <div>
        <input type="radio" id="opt3" name="q1" value="c">
        <label for="opt3">They're easy to create</label>
      </div>
      <div>
        <input type="radio" id="opt4" name="q1" value="d">
        <label for="opt4">They load faster than videos</label>
      </div>
    </form>
    <button class="quiz-check">Check Answer</button>
    <div class="quiz-feedback"></div>
  </div>
</div>

<script>
document.querySelector('.quiz-check').addEventListener('click', function() {
  const selected = document.querySelector('input[name="q1"]:checked');
  const feedback = document.querySelector('.quiz-feedback');
  
  if (selected) {
    if (selected.value === 'b') {
      feedback.innerHTML = 'Correct! MicroSims enable learning through hands-on interaction.';
      feedback.style.color = 'green';
    } else {
      feedback.innerHTML = 'Not quite. Try thinking about how students learn best.';
      feedback.style.color = 'red';
    }
  } else {
    feedback.innerHTML = 'Please select an answer.';
    feedback.style.color = 'orange';
  }
});
</script>
```

### 5. Glossary Structure

A well-structured glossary helps students quickly reference key terms.

```markdown
# Glossary

#### Concept A
A detailed explanation of Concept A with examples and related concepts.

#### Concept B
A detailed explanation of Concept B with examples and related concepts.
```

## Best Practices for MicroSim Development

1. **Start with Learning Objectives**: Define what you want students to learn before creating the MicroSim.

2. **Keep It Focused**: Each MicroSim should focus on demonstrating a single concept or a closely related set of concepts.

3. **Consistent Interface**: Use consistent controls and UI elements across all MicroSims.

4. **Responsive Design**: Ensure MicroSims work on different screen sizes.

5. **Progressive Enhancement**: Start with basic functionality, then add more complex features.

6. **Clear Instructions**: Provide clear instructions on how to use the MicroSim.

7. **Meaningful Controls**: Each control should have a clear purpose related to the concept being taught.

8. **Visual Feedback**: Provide visual feedback when parameters are changed.

9. **Performance Optimization**: Optimize for performance to ensure smooth operation.

10. **Accessibility**: Make MicroSims accessible to users with disabilities.

## Standard MicroSim Template (sketch.js)

```javascript
let simulation;

function setup() {
  // Create canvas and add it to the microsim-canvas element
  const canvas = createCanvas(600, 400);
  canvas.parent('microsim-canvas');
  
  // Initialize the simulation
  simulation = new Simulation();
  
  // Set up UI controls
  setupControls();
  
  // Start in paused state
  noLoop();
}

function draw() {
  background(240);
  simulation.update();
  simulation.display();
}

// Simulation class to encapsulate logic
class Simulation {
  constructor() {
    this.parameters = {
      speed: 5,
      // Add other parameters here
    };
    
    this.isRunning = false;
    
    // Initialize simulation elements
    this.elements = [];
  }
  
  update() {
    if (this.isRunning) {
      // Update simulation state based on parameters
    }
  }
  
  display() {
    // Display simulation elements
  }
  
  reset() {
    // Reset simulation to initial state
  }
  
  setParameter(name, value) {
    this.parameters[name] = value;
  }
  
  start() {
    this.isRunning = true;
  }
  
  pause() {
    this.isRunning = false;
  }
}

// Set up event listeners for controls
function setupControls() {
  // Start button
  document.getElementById('start-btn').addEventListener('click', function() {
    simulation.start();
    loop();
  });
  
  // Pause button
  document.getElementById('pause-btn').addEventListener('click', function() {
    simulation.pause();
    noLoop();
  });
  
  // Reset button
  document.getElementById('reset-btn').addEventListener('click', function() {
    simulation.reset();
    redraw();
  });
  
  // Speed slider
  document.getElementById('speed-slider').addEventListener('input', function() {
    simulation.setParameter('speed', parseInt(this.value));
  });
}
```

## Metrics for Measuring Textbook Quality

1. **Content Metrics**:
   - Number of markdown files
   - Total word count
   - Number of images
   - Number of MicroSims
   - Glossary term count

2. **Engagement Metrics**:
   - Page views per section
   - Average time spent on each page
   - MicroSim interaction rate
   - Quiz completion rate
   - Quiz success rate

3. **Learning Graph Metrics**:
   - Coverage of concepts
   - Connectedness of concepts
   - Learning path completeness

## Automating Metrics Collection

Create a Python script to analyze repository metrics (similar to your get-metrics-json.py):

```python
#!/usr/bin/env python3

import os
import re
from pathlib import Path
import argparse
import json

def count_markdown_files(docs_dir):
    """Count total number of markdown files in the docs directory."""
    return len(list(Path(docs_dir).glob('**/*.md')))

def count_images(docs_dir):
    """Count total number of image files in the docs directory."""
    extensions = ['*.png', '*.jpg', '*.jpeg', '*.gif', '*.svg']
    count = 0
    for ext in extensions:
        count += len(list(Path(docs_dir).glob(f'**/{ext}')))
    return count

def count_words_in_markdown(docs_dir):
    """Count total number of words in all markdown files."""
    total_words = 0
    for md_file in Path(docs_dir).glob('**/*.md'):
        with open(md_file, 'r', encoding='utf-8') as f:
            content = f.read()
            # Remove code blocks, inline code, URLs, HTML
            content = re.sub(r'```.*?```', '', content, flags=re.DOTALL)
            content = re.sub(r'`.*?`', '', content)
            content = re.sub(r'http[s]?://\S+', '', content)
            content = re.sub(r'<.*?>', '', content, flags=re.DOTALL)
            # Split and count remaining words
            words = content.split()
            total_words += len(words)
    return total_words

def count_microsims(docs_dir):
    """Count MicroSims by looking for sketch.js files in the sims directory."""
    sims_dir = Path(docs_dir) / 'sims'
    if not sims_dir.exists():
        return 0
    
    # Count directories in sims that contain sketch.js
    microsim_count = 0
    for sim_dir in [d for d in sims_dir.iterdir() if d.is_dir()]:
        if (sim_dir / 'sketch.js').exists() or (sim_dir / 'index.js').exists():
            microsim_count += 1
    
    return microsim_count

def count_glossary_terms(docs_dir):
    """Count level 4 headers in glossary.md."""
    glossary_path = Path(docs_dir) / 'glossary.md'
    if not glossary_path.exists():
        return 0
    
    with open(glossary_path, 'r', encoding='utf-8') as f:
        content = f.read()
        terms = re.findall(r'^####\s+.*$', content, re.MULTILINE)
        return len(terms)

def analyze_learning_graph(docs_dir):
    """Analyze the learning graph complexity."""
    graph_path = Path(docs_dir) / 'learning-graph.md'
    if not graph_path.exists():
        return {"nodes": 0, "edges": 0}
    
    with open(graph_path, 'r', encoding='utf-8') as f:
        content = f.read()
        # Extract JavaScript node and edge definitions
        node_match = re.search(r'const\s+nodes\s*=\s*\[(.*?)\];', content, re.DOTALL)
        edge_match = re.search(r'const\s+edges\s*=\s*\[(.*?)\];', content, re.DOTALL)
        
        node_count = 0
        edge_count = 0
        
        if node_match:
            node_section = node_match.group(1)
            node_count = len(re.findall(r'\{\s*id:', node_section))
        
        if edge_match:
            edge_section = edge_match.group(1)
            edge_count = len(re.findall(r'\{\s*from:', edge_section))
        
        return {"nodes": node_count, "edges": edge_count}

def main():
    parser = argparse.ArgumentParser(description='Calculate metrics for an intelligent textbook repository.')
    parser.add_argument('repo_root', help='Root directory of the repository')
    parser.add_argument('--output', '-o', help='Output JSON file path')
    args = parser.parse_args()

    docs_dir = os.path.join(args.repo_root, 'docs')
    
    if not os.path.exists(docs_dir):
        print(f"Error: docs directory not found at {docs_dir}")
        return 1

    # Calculate metrics
    metrics = {
        'markdown-file-count': count_markdown_files(docs_dir),
        'image-count': count_images(docs_dir),
        'word-count': count_words_in_markdown(docs_dir),
        'microsim-count': count_microsims(docs_dir),
        'glossary-term-count': count_glossary_terms(docs_dir),
        'learning-graph': analyze_learning_graph(docs_dir)
    }

    # Output results
    if args.output:
        with open(args.output, 'w', encoding='utf-8') as f:
            json.dump(metrics, indent=2, fp=f)
    else:
        print(json.dumps(metrics, indent=2))

if __name__ == "__main__":
    main()
```

## Conclusion

Creating intelligent textbooks with MkDocs Material and MicroSims requires a thoughtful approach to structure, content, and interactivity. By following these best practices, you can create engaging educational resources that adapt to students' needs and provide interactive learning experiences.

The key to success is maintaining a consistent structure, developing focused MicroSims that address specific learning objectives, and continually measuring the effectiveness of your content through metrics collection and analysis.