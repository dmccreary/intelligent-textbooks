// MicroSim Uniqueness - Interactive Three-Circle Venn Diagram
// Demonstrates the unique intersection of Simplicity, Accessibility, and AI Generation

// Canvas dimensions
let canvasWidth = 400;
let drawHeight = 370;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let defaultTextSize = 16;

// Global variables for responsive design
let containerWidth;
let containerHeight = canvasHeight;

// Circle properties
let circles = [];
let centerX, centerY;
let radius = 100;
let triangleHeight;

// Hover detection
let hoveredRegion = null;

// Region tooltips based on uniqueness.md content
const tooltips = {
  'center': 'Educational MicroSims: The unique convergence of Simplicity, Accessibility, and AI Generation.  MicroSims are ideal for both educators and students that want to generate visualization of complex ideas in real time.',
  'simplicity': 'Simplicity: Focused simulations with clear parameters and transparent code.  Frameworks like p5.js are ideal for high-quality portable interactive animations.',
  'accessibility': 'Accessibility: Universal embedding via iframes, works on any device or platform and responds to changes in the container size.',
  'ai': 'AI Generation: Created in seconds by language models through standardized patterns.  Extensive libraries of rules and templates guide LLMs to generate highly usable interactive simulations.',
  'simplicity-accessibility': 'Simple & Accessible: Easy to embed and use across all platforms',
  'simplicity-ai': 'Simple & AI-Powered: Standardized patterns enable rapid AI generation',
  'accessibility-ai': 'Accessible & AI-Generated: AI can generate complex javascripts programs that are universally compatible.  However, these  content such aa a raw SVG drawing.',
  'none': 'Click on any region to learn more about what makes MicroSims unique'
};

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));

  // Calculate circle positions in equilateral triangle formation
  initializeCircles();

  describe('Interactive Venn diagram showing the three key characteristics that make MicroSims unique: Simplicity, Accessibility, and AI Generation', LABEL);
}

function initializeCircles() {
  centerX = canvasWidth / 2;
  centerY = drawHeight / 2;

  // Distance from center to each circle center
  let distanceFromCenter = radius * 0.7;

  // Equilateral triangle with point at top
  circles = [
    {
      name: 'Simplicity',
      x: centerX,
      y: centerY - distanceFromCenter,
      color: [100, 150, 255, 100] // Light blue
    },
    {
      name: 'Accessibility',
      x: centerX - distanceFromCenter * Math.cos(Math.PI / 6),
      y: centerY + distanceFromCenter * Math.sin(Math.PI / 6),
      color: [100, 255, 150, 100] // Light green
    },
    {
      name: 'AI Generation',
      x: centerX + distanceFromCenter * Math.cos(Math.PI / 6),
      y: centerY + distanceFromCenter * Math.sin(Math.PI / 6),
      color: [255, 150, 100, 100] // Light orange
    }
  ];
}

function draw() {
  updateCanvasSize();

  // Drawing area background
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Controls area background
  fill('white');
  stroke('silver');
  strokeWeight(1);
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  fill('black');
  noStroke();
  textSize(20);
  textAlign(CENTER, TOP);
  text("What Makes MicroSims Unique", canvasWidth / 2, 15);

  // Recalculate circle positions if canvas resized
  initializeCircles();

  // Detect hovered region
  detectHoveredRegion();

  // drawing context for the three circles and labels
  push();
  // move the entier drawing down 20
  translate(0, 30)
  
  // Draw the three ellipses with blend mode for overlapping regions
  push();
    blendMode(MULTIPLY);
    for (let circle of circles) {
      fill(circle.color);
      strokeWeight(2);
      stroke('blue');
      // make the ellipses slightly wider in the x horiz than y vertical
      ellipse(circle.x, circle.y, radius * 2.5, radius * 2);
    }
    blendMode(BLEND);
  pop();

  // Draw circle outlines and labels
  for (let circle of circles) {
    
    // Label positioning
    fill('black');
    noStroke();
    textSize(14);
    textAlign(CENTER, CENTER);

    // Position labels outside circles
    let labelDist = radius + 25;
    let angle = atan2(circle.y - centerY, circle.x - centerX);
    let labelX = centerX + cos(angle) * labelDist;
    let labelY = centerY + sin(angle) * labelDist;

    text(circle.name, labelX, labelY);
  }

  // Draw "MicroSims" in the center
  fill('black');
  textSize(18);
  textAlign(CENTER, CENTER);
  text("MicroSims", centerX, centerY);
  pop();

  // Display tooltip in control area
  drawTooltip();

  // Instructions
  fill('gray');
  textSize(12);
  textAlign(CENTER, TOP);
  text("Hover over regions to learn more", canvasWidth / 2, drawHeight + 5);
}

function detectHoveredRegion() {
  // Check if mouse is in drawing area
  if (mouseY > drawHeight || mouseY < 0 || mouseX < 0 || mouseX > canvasWidth) {
    hoveredRegion = 'none';
    return;
  }

  // Calculate distances from mouse to each circle center
  let distances = circles.map(c => dist(mouseX, mouseY, c.x, c.y));
  let insideCircles = distances.map(d => d < radius);

  // Determine which region
  let insideCount = insideCircles.filter(x => x).length;

  if (insideCount === 3) {
    hoveredRegion = 'center';
  } else if (insideCount === 2) {
    // Two-circle overlap
    if (insideCircles[0] && insideCircles[1]) {
      hoveredRegion = 'simplicity-accessibility';
    } else if (insideCircles[0] && insideCircles[2]) {
      hoveredRegion = 'simplicity-ai';
    } else if (insideCircles[1] && insideCircles[2]) {
      hoveredRegion = 'accessibility-ai';
    }
  } else if (insideCount === 1) {
    // Single circle
    if (insideCircles[0]) {
      hoveredRegion = 'simplicity';
    } else if (insideCircles[1]) {
      hoveredRegion = 'accessibility';
    } else if (insideCircles[2]) {
      hoveredRegion = 'ai';
    }
  } else {
    hoveredRegion = 'none';
  }
}

function drawTooltip() {
  if (hoveredRegion && tooltips[hoveredRegion]) {
    fill('black');
    noStroke();
    textSize(13);
    textAlign(LEFT, TOP);

    // Word wrap the tooltip text
    let tooltip = tooltips[hoveredRegion];
    let maxWidth = canvasWidth - 20;
    let words = tooltip.split(' ');
    let lines = [];
    let currentLine = '';

    textSize(13);
    for (let word of words) {
      let testLine = currentLine + word + ' ';
      if (textWidth(testLine) > maxWidth) {
        lines.push(currentLine);
        currentLine = word + ' ';
      } else {
        currentLine = testLine;
      }
    }
    lines.push(currentLine);

    // Draw lines
    let yPos = drawHeight + 25;
    for (let line of lines) {
      text(line.trim(), 10, yPos);
      yPos += 16;
    }
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
