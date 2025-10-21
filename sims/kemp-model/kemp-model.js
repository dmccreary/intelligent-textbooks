// Kemp Design Model MicroSim
// Educational tool to explore the flexible, circular instructional design model

// Canvas dimensions - REQUIRED structure
let canvasWidth = 800;              // Initial width (responsive)
let drawHeight = 550;               // Drawing/simulation area height
let controlHeight = 100;            // Controls area height
let canvasHeight = drawHeight + controlHeight;
let margin = 20;                    // Margin for visual elements
let sliderLeftMargin = 150;         // Left margin for slider positioning
let defaultTextSize = 16;           // Base text size

// Kemp model elements
let elements = [];
let selectedElement = null;
let hoveredElement = null;
let connections = [];
let showAllConnections = false;

// Animation
let connectionAnimProgress = 0;
let animateConnections = false;

// Visual properties
let centerX, centerY;
let circleRadius = 200;
let elementRadius = 50;

// Controls
let resetButton;
let connectionsToggle;
let animateToggle;

// Colors
let kempColors = [
  '#4A90E2', // Blue
  '#F5A623', // Orange
  '#7ED321', // Green
  '#BD10E0', // Purple
  '#E94B3C', // Red
  '#50E3C2', // Teal
  '#F8E71C', // Yellow
  '#9013FE', // Violet
  '#4A4A4A'  // Gray
];

function setup() {
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  
  centerX = canvasWidth / 2;
  centerY = drawHeight / 2;
  
  // Initialize Kemp elements
  initializeElements();
  
  // Create controls
  createControls();
  
  describe('Interactive Kemp Design Model showing nine interconnected elements arranged in a circle. Click any element to see its details and connections to other elements. The model emphasizes flexibility and non-linear design.', LABEL);
}

function initializeElements() {
  elements = [
    {
      id: 0,
      name: 'Instructional\nProblems',
      shortName: 'Problems',
      icon: '❓',
      angle: 0,
      color: kempColors[0],
      description: 'Identify what learners need to know or be able to do',
      examples: [
        'Performance gaps',
        'Learning needs',
        'Skill deficiencies'
      ]
    },
    {
      id: 1,
      name: 'Learner\nCharacteristics',
      shortName: 'Learners',
      icon: '👥',
      angle: TWO_PI / 9,
      color: kempColors[1],
      description: 'Examine who your learners are and what they bring',
      examples: [
        'Prior knowledge',
        'Learning preferences',
        'Motivation levels'
      ]
    },
    {
      id: 2,
      name: 'Task\nAnalysis',
      shortName: 'Tasks',
      icon: '📋',
      angle: TWO_PI * 2 / 9,
      color: kempColors[2],
      description: 'Determine subject content and skills to be learned',
      examples: [
        'Content topics',
        'Skill requirements',
        'Knowledge domains'
      ]
    },
    {
      id: 3,
      name: 'Instructional\nObjectives',
      shortName: 'Objectives',
      icon: '🎯',
      angle: TWO_PI * 3 / 9,
      color: kempColors[3],
      description: 'State specific, measurable learning outcomes',
      examples: [
        'Performance criteria',
        'Observable behaviors',
        'Success measures'
      ]
    },
    {
      id: 4,
      name: 'Content\nSequencing',
      shortName: 'Sequence',
      icon: '📊',
      angle: TWO_PI * 4 / 9,
      color: kempColors[4],
      description: 'Arrange content in logical, effective order',
      examples: [
        'Simple to complex',
        'Prerequisites first',
        'Logical progression'
      ]
    },
    {
      id: 5,
      name: 'Instructional\nStrategies',
      shortName: 'Strategies',
      icon: '💡',
      angle: TWO_PI * 5 / 9,
      color: kempColors[5],
      description: 'Design teaching methods and learning activities',
      examples: [
        'Teaching methods',
        'Learning activities',
        'Engagement tactics'
      ]
    },
    {
      id: 6,
      name: 'Instructional\nDelivery',
      shortName: 'Delivery',
      icon: '📱',
      angle: TWO_PI * 6 / 9,
      color: kempColors[6],
      description: 'Plan how instruction will be delivered',
      examples: [
        'Delivery format',
        'Technology tools',
        'Distribution method'
      ]
    },
    {
      id: 7,
      name: 'Evaluation\nInstruments',
      shortName: 'Evaluation',
      icon: '✅',
      angle: TWO_PI * 7 / 9,
      color: kempColors[7],
      description: 'Develop assessments to measure learning',
      examples: [
        'Tests and quizzes',
        'Performance tasks',
        'Rubrics and criteria'
      ]
    },
    {
      id: 8,
      name: 'Support\nServices',
      shortName: 'Support',
      icon: '🛠️',
      angle: TWO_PI * 8 / 9,
      color: kempColors[8],
      description: 'Select resources and support needed',
      examples: [
        'Materials needed',
        'Technical support',
        'Budget and time'
      ]
    }
  ];
}

function createControls() {
  let yPos = drawHeight + 15;
  
  // Show all connections toggle
  connectionsToggle = createCheckbox(' Show All Connections', false);
  connectionsToggle.position(20, yPos);
  connectionsToggle.changed(() => {
    showAllConnections = connectionsToggle.checked();
  });
  
  // Animate connections toggle
  animateToggle = createCheckbox(' Animate Connections', false);
  animateToggle.position(220, yPos);
  animateToggle.changed(() => {
    animateConnections = animateToggle.checked();
  });
  
  // Reset button
  resetButton = createButton('Reset Selection');
  resetButton.position(420, yPos);
  resetButton.mousePressed(resetSimulation);
  
  // Info text
  yPos += 35;
  textSize(12);
  fill('#666');
  noStroke();
  textAlign(LEFT, CENTER);
  text('Click any element to see details and connections. Kemp model is flexible - start anywhere!', 20, yPos + 5);
}

function resetSimulation() {
  selectedElement = null;
  hoveredElement = null;
}

function draw() {
  updateCanvasSize()
  // Drawing area (light blue background)
  fill('aliceblue');
  noStroke();
  rect(0, 0, width, drawHeight);
  
  // Control area (white background)
  fill('white');
  rect(0, drawHeight, width, controlHeight);
  
  // Border
  stroke('silver');
  strokeWeight(1);
  line(0, drawHeight, width, drawHeight);
  
  // Update center for responsive design
  centerX = canvasWidth / 2;
  
  // Title
  fill('black');
  textSize(28);
  textAlign(CENTER, TOP);
  noStroke();
  text('Kemp Design Model', centerX, 15);
  
  // Subtitle
  textSize(13);
  fill('#666');
  text('A flexible, circular approach to instructional design', centerX, 48);
  
  // Reset text settings
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  
  // Update animation
  if (animateConnections) {
    connectionAnimProgress += 0.02;
    if (connectionAnimProgress > 1) {
      connectionAnimProgress = 0;
    }
  }
  
  // Update hovered element
  updateHoveredElement();
  
  // Draw center circle
  drawCenterCircle();
  
  // Draw connections (either all or for selected element)
  if (showAllConnections) {
    drawAllConnections();
  } else if (selectedElement !== null) {
    drawSelectedConnections();
  }
  
  // Draw circular arrangement guide
  drawCircularGuide();
  
  // Draw elements
  drawElements();
  
  // Draw details panel if element selected
  if (selectedElement !== null) {
    drawDetailsPanel();
  }
  
  // Draw flexibility message
  drawFlexibilityMessage();
}

function drawCenterCircle() {
  // Center circle
  fill('white');
  stroke('#333');
  strokeWeight(2);
  circle(centerX, centerY, 120);
  
  fill('black');
  noStroke();
  textSize(16);
  textAlign(CENTER, CENTER);
  text('Kemp', centerX, centerY - 12);
  textSize(12);
  fill('#666');
  text('Flexible', centerX, centerY + 5);
  text('Non-Linear', centerX, centerY + 20);
}

function drawCircularGuide() {
  // Draw circle connecting all elements
  noFill();
  stroke('#ddd');
  strokeWeight(2);
  circle(centerX, centerY, circleRadius * 2);
  
  // Draw dashed circle at element positions
  stroke('#eee');
  strokeWeight(1);
  drawDashedCircle(centerX, centerY, circleRadius * 2, 10);
}

function drawDashedCircle(x, y, diameter, dashLength) {
  let circumference = PI * diameter;
  let numDashes = circumference / dashLength;
  
  for (let i = 0; i < numDashes; i += 2) {
    let angle1 = map(i, 0, numDashes, 0, TWO_PI);
    let angle2 = map(i + 1, 0, numDashes, 0, TWO_PI);
    let x1 = x + cos(angle1) * diameter / 2;
    let y1 = y + sin(angle1) * diameter / 2;
    let x2 = x + cos(angle2) * diameter / 2;
    let y2 = y + sin(angle2) * diameter / 2;
    line(x1, y1, x2, y2);
  }
}

function drawAllConnections() {
  // Draw lines connecting all elements to show interconnectedness
  for (let i = 0; i < elements.length; i++) {
    let elem1 = elements[i];
    let x1 = centerX + cos(elem1.angle) * circleRadius;
    let y1 = centerY + sin(elem1.angle) * circleRadius;
    
    // Connect to a few other elements (not all to avoid clutter)
    for (let j = i + 1; j < min(i + 4, elements.length); j++) {
      let elem2 = elements[j];
      let x2 = centerX + cos(elem2.angle) * circleRadius;
      let y2 = centerY + sin(elem2.angle) * circleRadius;
      
      stroke(elem1.color + '40');
      strokeWeight(1);
      
      if (animateConnections) {
        // Animated dashed line
        drawAnimatedLine(x1, y1, x2, y2);
      } else {
        line(x1, y1, x2, y2);
      }
    }
  }
}

function drawSelectedConnections() {
  let elem = elements[selectedElement];
  let x1 = centerX + cos(elem.angle) * circleRadius;
  let y1 = centerY + sin(elem.angle) * circleRadius;
  
  // Draw connections to all other elements
  for (let i = 0; i < elements.length; i++) {
    if (i === selectedElement) continue;
    
    let other = elements[i];
    let x2 = centerX + cos(other.angle) * circleRadius;
    let y2 = centerY + sin(other.angle) * circleRadius;
    
    stroke(elem.color);
    strokeWeight(2);
    
    if (animateConnections) {
      drawAnimatedLine(x1, y1, x2, y2);
    } else {
      line(x1, y1, x2, y2);
      // Draw arrow
      drawArrowhead(x2, y2, atan2(y2 - y1, x2 - x1));
    }
  }
}

function drawAnimatedLine(x1, y1, x2, y2) {
  let segments = 20;
  for (let i = 0; i < segments; i++) {
    let t = i / segments;
    let show = (t + connectionAnimProgress) % 1;
    
    if (show < 0.5) {
      let x = lerp(x1, x2, t);
      let y = lerp(y1, y2, t);
      let x2Seg = lerp(x1, x2, t + 1/segments);
      let y2Seg = lerp(y1, y2, t + 1/segments);
      line(x, y, x2Seg, y2Seg);
    }
  }
}

function drawArrowhead(x, y, angle) {
  push();
  translate(x, y);
  rotate(angle);
  let size = 8;
  noStroke();
  fill(elements[selectedElement].color);
  triangle(0, 0, -size, -size/2, -size, size/2);
  pop();
}

function drawElements() {
  for (let i = 0; i < elements.length; i++) {
    let elem = elements[i];
    let x = centerX + cos(elem.angle) * circleRadius;
    let y = centerY + sin(elem.angle) * circleRadius;
    
    // Check if this element is hovered or selected
    let isHovered = hoveredElement === i;
    let isSelected = selectedElement === i;
    
    // Draw element circle
    if (isSelected) {
      fill(elem.color);
      stroke('black');
      strokeWeight(4);
    } else if (isHovered) {
      fill(elem.color);
      stroke('black');
      strokeWeight(3);
    } else {
      fill(elem.color);
      stroke('black');
      strokeWeight(2);
    }
    
    circle(x, y, elementRadius * 2);
    
    // Draw icon
    fill('white');
    noStroke();
    textSize(24);
    textAlign(CENTER, CENTER);
    text(elem.icon, x, y - 8);
    
    // Draw element number
    textSize(10);
    text(i + 1, x, y + 12);
    
    // Draw label outside circle
    fill('black');
    textSize(11);
    textAlign(CENTER, CENTER);
    
    // Position label based on angle
    let labelDist = elementRadius + 35;
    let labelX = x + cos(elem.angle) * labelDist;
    let labelY = y + sin(elem.angle) * labelDist;
    
    // Split name by newline and draw each line
    let lines = elem.name.split('\n');
    for (let j = 0; j < lines.length; j++) {
      text(lines[j], labelX, labelY + (j - lines.length/2 + 0.5) * 12);
    }
  }
}

function drawDetailsPanel() {
  if (selectedElement === null) return;
  
  let elem = elements[selectedElement];
  
  // Panel dimensions
  let panelWidth = 300;
  let panelHeight = 200;
  let panelX = canvasWidth - panelWidth - 20;
  let panelY = 80;
  
  // Adjust for narrow screens
  if (canvasWidth < 700) {
    panelWidth = canvasWidth - 40;
    panelX = 20;
    panelY = drawHeight - panelHeight - 20;
  }
  
  // Panel background
  fill('white');
  stroke(elem.color);
  strokeWeight(3);
  rect(panelX, panelY, panelWidth, panelHeight, 10);
  
  // Header
  fill(elem.color);
  noStroke();
  rect(panelX, panelY, panelWidth, 40, 10, 10, 0, 0);
  
  // Icon and title
  fill('white');
  textSize(24);
  textAlign(LEFT, CENTER);
  text(elem.icon, panelX + 15, panelY + 20);
  
  textSize(16);
  let title = elem.shortName;
  text(title, panelX + 50, panelY + 20);
  
  // Close button
  textSize(18);
  textAlign(RIGHT, CENTER);
  text('✕', panelX + panelWidth - 15, panelY + 20);
  
  // Description
  fill('black');
  textSize(13);
  textAlign(LEFT, TOP);
  text(elem.description, panelX + 15, panelY + 50, panelWidth - 30);
  
  // Examples
  fill('#666');
  textSize(12);
  text('Examples:', panelX + 15, panelY + 95);
  
  let yPos = panelY + 115;
  for (let example of elem.examples) {
    fill(elem.color);
    noStroke();
    circle(panelX + 20, yPos, 5);
    
    fill('#333');
    textAlign(LEFT, CENTER);
    text(example, panelX + 30, yPos);
    yPos += 20;
  }
  
  // Connection indicator
  fill('#999');
  textSize(11);
  textAlign(CENTER, BOTTOM);
  text('Connects to all other elements', panelX + panelWidth/2, panelY + panelHeight - 5);
}

function drawFlexibilityMessage() {
  fill('#666');
  noStroke();
  textSize(12);
  textAlign(CENTER, TOP);
  
  if (selectedElement === null && !showAllConnections) {
    text('💡 The Kemp model is circular and flexible - you can start at any point', centerX, 75);
  }
}

function updateHoveredElement() {
  hoveredElement = null;
  
  for (let i = 0; i < elements.length; i++) {
    let elem = elements[i];
    let x = centerX + cos(elem.angle) * circleRadius;
    let y = centerY + sin(elem.angle) * circleRadius;
    
    let d = dist(mouseX, mouseY, x, y);
    if (d < elementRadius) {
      hoveredElement = i;
      break;
    }
  }
}

function mousePressed() {
  // Check if clicking on an element
  for (let i = 0; i < elements.length; i++) {
    let elem = elements[i];
    let x = centerX + cos(elem.angle) * circleRadius;
    let y = centerY + sin(elem.angle) * circleRadius;
    
    let d = dist(mouseX, mouseY, x, y);
    if (d < elementRadius) {
      if (selectedElement === i) {
        selectedElement = null; // Deselect if clicking same element
      } else {
        selectedElement = i;
      }
      return;
    }
  }
  
  // Check if clicking close button on details panel
  if (selectedElement !== null) {
    let panelWidth = 300;
    let panelX = canvasWidth - panelWidth - 20;
    let panelY = 80;
    
    if (canvasWidth < 700) {
      panelWidth = canvasWidth - 40;
      panelX = 20;
      panelY = drawHeight - 200 - 20;
    }
    
    // Close button area (top right of panel header)
    if (mouseX > panelX + panelWidth - 40 && 
        mouseX < panelX + panelWidth &&
        mouseY > panelY && 
        mouseY < panelY + 40) {
      selectedElement = null;
      return;
    }
  }
  
  // Otherwise deselect
  if (mouseY < drawHeight) {
    selectedElement = null;
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
  }
}
