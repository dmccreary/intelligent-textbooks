// ADDIE Workflow Interactive MicroSim
// Educational tool to explore the ADDIE instructional design model

// Canvas dimensions - REQUIRED structure
let canvasWidth = 800;              // Initial width (responsive)
let drawHeight = 600;               // Drawing/simulation area height
let controlHeight = 120;            // Controls area height
let canvasHeight = drawHeight + controlHeight;
let margin = 25;                    // Margin for visual elements
let sliderLeftMargin = 150;         // Left margin for slider positioning
let defaultTextSize = 16;           // Base text size



// ADDIE phases data
let phases = [];
let selectedPhase = null;
let showIterations = false;
let showCheckboxes = false;
let centerX, centerY;
let phaseRadius = 220;
let nodeRadius = 65;

// Animation
let animationProgress = 0;
let animationSpeed = 0.02;
let animateFlow = false;

// Buttons and controls
let iterationToggle;
let resetButton;
let animateButton;
let speedSlider;

function setup() {
  updateCanvasSize()
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  
  // Initialize center position
  // move down a bit to center in drawing area after the title space
  centerY = drawHeight / 2 + 50;
  
  // Define ADDIE phases with positions, colors, and details
  initializePhases();
  
  // Create controls
  createControls();
  
  describe('Interactive ADDIE workflow diagram showing the five phases of instructional design: Analysis, Design, Development, Implementation, and Evaluation. Click phases to see details.', LABEL);
}

function initializePhases() {
  phases = [
    {
      name: 'Analysis',
      shortName: 'A',
      color: '#4A90E2', // Blue
      angle: -PI / 2,    // Top
      details: [
        'Identify learning needs',
        'Analyze learner characteristics',
        'Define learning objectives',
        'Assess constraints'
      ],
      completed: false,
      tasks: 4
    },
    {
      name: 'Design',
      shortName: 'D',
      color: '#7ED321', // Green
      angle: -PI / 2 + TWO_PI / 5,
      details: [
        'Create learning objectives',
        'Design assessments',
        'Plan learning graph',
        'Select media & tools'
      ],
      completed: false,
      tasks: 4
    },
    {
      name: 'Development',
      shortName: 'D',
      color: '#F5A623', // Orange
      angle: -PI / 2 + TWO_PI * 2 / 5,
      details: [
        'Create content',
        'Build MicroSims',
        'Develop assessments',
        'Produce materials'
      ],
      completed: false,
      tasks: 4
    },
    {
      name: 'Implementation',
      shortName: 'I',
      color: '#BD10E0', // Purple
      angle: -PI / 2 + TWO_PI * 3 / 5,
      details: [
        'Deploy textbook',
        'Provide access',
        'Offer training',
        'Set up feedback'
      ],
      completed: false,
      tasks: 4
    },
    {
      name: 'Evaluation',
      shortName: 'E',
      color: '#E94B3C', // Red
      angle: -PI / 2 + TWO_PI * 4 / 5,
      details: [
        'Gather analytics',
        'Collect feedback',
        'Measure outcomes',
        'Identify improvements'
      ],
      completed: false,
      tasks: 4
    }
  ];
}

function createControls() {
  let yPos = drawHeight + 15;
  
  // Iteration toggle
  iterationToggle = createCheckbox(' Show Iteration Arrows', false);
  iterationToggle.position(20, yPos);
  iterationToggle.changed(() => {
    showIterations = iterationToggle.checked();
  });
  
  // Checkbox visibility toggle
  let checkboxToggle = createCheckbox(' Show Task Checkboxes', false);
  checkboxToggle.position(250, yPos);
  checkboxToggle.changed(() => {
    showCheckboxes = checkboxToggle.checked();
  });
  
  // Animate button
  yPos += 30;
  animateButton = createButton('Animate Flow');
  animateButton.position(20, yPos);
  animateButton.mousePressed(() => {
    animateFlow = !animateFlow;
    animateButton.html(animateFlow ? 'Stop Animation' : 'Animate Flow');
  });
  
  // Reset button
  resetButton = createButton('Reset All');
  resetButton.position(160, yPos);
  resetButton.mousePressed(resetSimulation);
  
  // Speed slider
  yPos += 35;
  fill('black');
  noStroke();
  textSize(14);
  textAlign(LEFT, CENTER);
  text('Animation Speed:', 20, yPos + 5);
  
  speedSlider = createSlider(0.005, 0.05, 0.02, 0.005);
  speedSlider.position(sliderLeftMargin, yPos);
  speedSlider.size(canvasWidth - sliderLeftMargin - margin);
}

function draw() {
  updateCanvasSize();
  // Update center position for responsive design
  centerX = canvasWidth * 0.4;
  
  // Drawing area (light blue background)
  fill('aliceblue');
  stroke('silver');
  rect(0, 0, width, drawHeight);
  
  // Control area (white background)
  fill('white');
  rect(0, drawHeight, width, controlHeight);
  
  // Draw border
  strokeWeight(1);
  noFill();
  rect(0, 0, width, drawHeight);
  
  // Title
  fill('black');
  textSize(32);
  textAlign(CENTER, TOP);
  noStroke();
  text('ADDIE Instructional Design Model', centerX, 15);
  
  // Subtitle
  textSize(14);
  fill('#666');
  text('Click on any phase to see details', centerX, 50);
  
  // Reset text settings
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  
  // Update animation
  if (animateFlow) {
    animationSpeed = speedSlider.value();
    animationProgress += animationSpeed;
    if (animationProgress > 1) {
      animationProgress = 0;
    }
  }
  
  // Draw center circle
  drawCenterCircle();
  
  // Draw connections between phases
  drawConnections();
  
  // Draw iteration arrows if enabled
  if (showIterations) {
    drawIterationArrows();
  }
  
  // Draw phase nodes
  drawPhases();
  
  // Draw details panel if phase selected
  if (selectedPhase !== null) {
    drawDetailsPanel();
  }
  
  // Draw control labels
  drawControlLabels();
}

function drawCenterCircle() {
  // Center circle
  fill('white');
  stroke('#333');
  strokeWeight(2);
  circle(centerX, centerY, 100);
  
  fill('black');
  noStroke();
  textSize(18);
  textAlign(CENTER, CENTER);
  text('ADDIE', centerX, centerY - 8);
  textSize(12);
  fill('#666');
  text('Instructional', centerX, centerY + 8);
  text('Design', centerX, centerY + 22);
}

function drawConnections() {
  stroke('#999');
  strokeWeight(2);
  noFill();
  
  // Draw pentagon connecting phases
  beginShape();
  for (let phase of phases) {
    let x = centerX + cos(phase.angle) * phaseRadius;
    let y = centerY + sin(phase.angle) * phaseRadius;
    vertex(x, y);
  }
  endShape(CLOSE);
  
  // Draw lines from center to each phase
  for (let phase of phases) {
    let x = centerX + cos(phase.angle) * phaseRadius;
    let y = centerY + sin(phase.angle) * phaseRadius;
    
    stroke('#ccc');
    strokeWeight(1);
    line(centerX, centerY, x, y);
  }
  
  // Draw animated flow if active
  if (animateFlow) {
    drawAnimatedFlow();
  }
}

function drawAnimatedFlow() {
  let phaseIndex = floor(animationProgress * phases.length);
  let nextIndex = (phaseIndex + 1) % phases.length;
  let progress = (animationProgress * phases.length) % 1;
  
  let phase1 = phases[phaseIndex];
  let phase2 = phases[nextIndex];
  
  let x1 = centerX + cos(phase1.angle) * phaseRadius;
  let y1 = centerY + sin(phase1.angle) * phaseRadius;
  let x2 = centerX + cos(phase2.angle) * phaseRadius;
  let y2 = centerY + sin(phase2.angle) * phaseRadius;
  
  let x = lerp(x1, x2, progress);
  let y = lerp(y1, y2, progress);
  
  // Draw flow particle
  fill('#FF6B6B');
  noStroke();
  circle(x, y, 12);
  
  // Draw glow
  fill(255, 107, 107, 50);
  circle(x, y, 24);
}

function drawIterationArrows() {
  stroke('#E94B3C');
  strokeWeight(2);
  fill('#E94B3C');
  
  // Draw arrows showing iteration back to earlier phases
  for (let i = 0; i < phases.length; i++) {
    let fromPhase = phases[i];
    // Draw arrow to previous phase (showing iteration)
    let toIndex = (i - 1 + phases.length) % phases.length;
    let toPhase = phases[toIndex];
    
    let x1 = centerX + cos(fromPhase.angle) * (phaseRadius - nodeRadius);
    let y1 = centerY + sin(fromPhase.angle) * (phaseRadius - nodeRadius);
    let x2 = centerX + cos(toPhase.angle) * (phaseRadius - nodeRadius);
    let y2 = centerY + sin(toPhase.angle) * (phaseRadius - nodeRadius);
    
    // Draw curved arrow
    drawArrow(x1, y1, x2, y2, true);
  }
}

function drawArrow(x1, y1, x2, y2, curved) {
  push();
  
  if (curved) {
    // Draw bezier curve
    noFill();
    let controlDist = 50;
    let midX = (x1 + x2) / 2;
    let midY = (y1 + y2) / 2;
    let angle = atan2(y2 - y1, x2 - x1);
    let perpAngle = angle - PI / 2;
    let cx1 = midX + cos(perpAngle) * controlDist;
    let cy1 = midY + sin(perpAngle) * controlDist;
    
    bezier(x1, y1, cx1, cy1, cx1, cy1, x2, y2);
    
    // Draw arrowhead at end
    let arrowAngle = atan2(y2 - cy1, x2 - cx1);
    drawArrowhead(x2, y2, arrowAngle);
  } else {
    // Straight line
    line(x1, y1, x2, y2);
    let angle = atan2(y2 - y1, x2 - x1);
    drawArrowhead(x2, y2, angle);
  }
  
  pop();
}

function drawArrowhead(x, y, angle) {
  push();
  translate(x, y);
  rotate(angle);
  let arrowSize = 8;
  fill('#E94B3C');
  noStroke();
  triangle(0, 0, -arrowSize, -arrowSize/2, -arrowSize, arrowSize/2);
  pop();
}

function drawPhases() {
  for (let i = 0; i < phases.length; i++) {
    let phase = phases[i];
    let x = centerX + cos(phase.angle) * phaseRadius;
    let y = centerY + sin(phase.angle) * phaseRadius;
    
    // Check if mouse is over this phase
    let d = dist(mouseX, mouseY, x, y);
    let isHovered = d < nodeRadius;
    
    // Draw phase circle
    if (selectedPhase === i) {
      fill(phase.color);
      stroke('black');
      strokeWeight(4);
    } else if (isHovered) {
      fill(phase.color);
      stroke('black');
      strokeWeight(3);
    } else {
      fill(phase.color);
      stroke('black');
      strokeWeight(2);
    }
    
    circle(x, y, nodeRadius * 2);
    
    // Draw checkmark if completed
    if (phase.completed) {
      drawCheckmark(x, y);
    }
    
    // Draw phase name
    fill('white');
    noStroke();
    textSize(16);
    textAlign(CENTER, CENTER);
    text(phase.name, x, y);
    
    // Draw task count if checkboxes enabled
    if (showCheckboxes) {
      textSize(12);
      let completedTasks = 0;
      // Count would be tracked separately in full implementation
      text(`${completedTasks}/${phase.tasks}`, x, y + 45);
    }
  }
}

function drawCheckmark(x, y) {
  stroke('white');
  strokeWeight(4);
  noFill();
  
  // Draw checkmark
  let size = 20;
  beginShape();
  vertex(x - size/2, y);
  vertex(x - size/4, y + size/3);
  vertex(x + size/2, y - size/3);
  endShape();
}

function drawDetailsPanel() {
  if (selectedPhase === null || selectedPhase >= phases.length) return;
  
  let phase = phases[selectedPhase];
  
  // Panel background
  let panelWidth = 280;
  let panelHeight = 220;
  let panelX = width - panelWidth - 20;
  let panelY = 80;
  
  // Adjust if too narrow
  if (canvasWidth < 600) {
    panelX = 10;
    panelY = drawHeight - panelHeight - 10;
  }
  
  fill('white');
  stroke(phase.color);
  strokeWeight(3);
  rect(panelX, panelY, panelWidth, panelHeight, 10);
  
  // Panel title
  fill(phase.color);
  noStroke();
  textSize(20);
  textAlign(LEFT, TOP);
  text(phase.name + ' Phase', panelX + 15, panelY + 15);
  
  // Close button
  fill('#999');
  noStroke();
  textSize(16);
  textAlign(RIGHT, TOP);
  text('✕', panelX + panelWidth - 15, panelY + 15);
  
  // Details list
  fill('black');
  textSize(14);
  textAlign(LEFT, TOP);
  let yOffset = panelY + 50;
  
  for (let i = 0; i < phase.details.length; i++) {
    let detail = phase.details[i];
    
    if (showCheckboxes) {
      // Draw checkbox
      noFill();
      stroke('#666');
      strokeWeight(1);
      rect(panelX + 15, yOffset + 2, 12, 12);
      
      text(detail, panelX + 35, yOffset);
    } else {
      // Draw bullet
      fill(phase.color);
      noStroke();
      circle(panelX + 20, yOffset + 7, 6);
      
      fill('black');
      text(detail, panelX + 35, yOffset);
    }
    
    yOffset += 35;
  }
}

function drawControlLabels() {
  fill('black');
  noStroke();
  textSize(14);
  textAlign(LEFT, CENTER);
  
  // Speed label value
  let speedValue = speedSlider.value();
  let speedText = `Speed: ${nf(speedValue, 1, 3)}`;
  text(speedText, margin, drawHeight + 90);
}

function mousePressed() {
  // Check if clicking on a phase
  for (let i = 0; i < phases.length; i++) {
    let phase = phases[i];
    let x = centerX + cos(phase.angle) * phaseRadius;
    let y = centerY + sin(phase.angle) * phaseRadius;
    
    let d = dist(mouseX, mouseY, x, y);
    if (d < nodeRadius) {
      if (selectedPhase === i) {
        selectedPhase = null; // Deselect if clicking same phase
      } else {
        selectedPhase = i;
      }
      return;
    }
  }
  
  // Check if clicking close button on details panel
  if (selectedPhase !== null) {
    let panelWidth = 280;
    let panelX = width - panelWidth - 20;
    let panelY = 80;
    
    if (canvasWidth < 600) {
      panelX = 10;
      panelY = drawHeight - 220 - 10;
    }
    
    // Close button area
    if (mouseX > panelX + panelWidth - 30 && 
        mouseX < panelX + panelWidth - 10 &&
        mouseY > panelY + 10 && 
        mouseY < panelY + 30) {
      selectedPhase = null;
      return;
    }
    
    // Check checkbox clicks if enabled
    if (showCheckboxes && mouseY < drawHeight) {
      let yOffset = panelY + 50;
      for (let i = 0; i < phases[selectedPhase].details.length; i++) {
        if (mouseX > panelX + 15 && mouseX < panelX + 27 &&
            mouseY > yOffset + 2 && mouseY < yOffset + 14) {
          // Toggle completion (simplified - would track individual tasks)
          phases[selectedPhase].completed = !phases[selectedPhase].completed;
          return;
        }
        yOffset += 35;
      }
    }
  }
  
  // Otherwise deselect
  if (mouseY < drawHeight) {
    selectedPhase = null;
  }
}

function resetSimulation() {
  selectedPhase = null;
  animateFlow = false;
  animationProgress = 0;
  animateButton.html('Animate Flow');
  
  // Reset all completion status
  for (let phase of phases) {
    phase.completed = false;
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
    // Reposition controls to match new width
    if (typeof speedSlider !== 'undefined') {
      speedSlider.size(canvasWidth - sliderLeftMargin - margin);
    }
  }
}
