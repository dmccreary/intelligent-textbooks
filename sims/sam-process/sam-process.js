// SAM (Successive Approximation Model) Process MicroSim
// Educational tool to explore the agile instructional design approach

// Canvas dimensions - REQUIRED structure
let canvasWidth = 800;              // Initial width (responsive)
let drawHeight = 550;               // Drawing/simulation area height
let controlHeight = 120;            // Controls area height
let canvasHeight = drawHeight + controlHeight;
let margin = 20;                    // Margin for visual elements
let sliderLeftMargin = 150;         // Left margin for slider positioning
let defaultTextSize = 16;           // Base text size

// SAM phases and iterations
let currentPhase = 'preparation'; // 'preparation', 'design', 'development'
let iterationCount = 0;
let maxIterations = 5;
let qualityScore = 40; // Starts low, increases with iterations

// Animation
let iterationProgress = 0;
let animating = false;
let animationSpeed = 0.015;
let particles = [];

// Visual elements
let centerX, centerY;
let spiralRadius = 180;
let phaseColors = {
  preparation: '#4A90E2',
  design: '#F5A623',
  development: '#7ED321'
};

// Controls
let nextIterationButton;
let resetButton;
let speedSlider;
let autoPlayToggle;
let autoPlay = false;

// Phase details
let phaseInfo = {
  preparation: {
    name: 'Preparation',
    icon: '📋',
    activities: [
      'Gather information',
      'Identify learning needs',
      'Define project scope',
      'Brainstorm solutions'
    ]
  },
  design: {
    name: 'Iterative Design',
    icon: '✏️',
    activities: [
      'Create prototype',
      'Review with stakeholders',
      'Gather feedback',
      'Refine design'
    ]
  },
  development: {
    name: 'Iterative Development',
    icon: '🔧',
    activities: [
      'Build content',
      'Test with learners',
      'Collect data',
      'Implement changes'
    ]
  }
};

function setup() {
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  
  centerX = canvasWidth / 2;
  centerY = drawHeight / 2;
  
  createControls();
  
  describe('Interactive SAM (Successive Approximation Model) process visualizer showing the three phases: Preparation, Iterative Design, and Iterative Development. Watch quality improve through successive iterations.', LABEL);
}

function createControls() {
  let yPos = drawHeight + 15;
  
  // Auto-play toggle
  autoPlayToggle = createCheckbox(' Auto-play Iterations', false);
  autoPlayToggle.position(20, yPos);
  autoPlayToggle.changed(() => {
    autoPlay = autoPlayToggle.checked();
    if (autoPlay && !animating) {
      startNextIteration();
    }
  });
  
  // Next iteration button
  nextIterationButton = createButton('Next Iteration →');
  nextIterationButton.position(200, yPos);
  nextIterationButton.mousePressed(() => {
    if (!animating) {
      startNextIteration();
    }
  });
  
  // Reset button
  resetButton = createButton('Reset Process');
  resetButton.position(360, yPos);
  resetButton.mousePressed(resetSimulation);
  
  // Speed slider
  yPos += 40;
  fill('black');
  noStroke();
  textSize(14);
  textAlign(LEFT, CENTER);
  text('Iteration Speed:', 20, yPos + 5);
  
  speedSlider = createSlider(0.005, 0.03, 0.015, 0.005);
  speedSlider.position(sliderLeftMargin, yPos);
  speedSlider.size(canvasWidth - sliderLeftMargin - margin);
  
  // Info text
  yPos += 35;
  textSize(12);
  fill('#666');
  text('Watch how quality improves with each iteration through Design and Development phases', 20, yPos + 5);
}

function startNextIteration() {
  if (currentPhase === 'preparation') {
    currentPhase = 'design';
    iterationCount = 1;
  } else if (currentPhase === 'design') {
    currentPhase = 'development';
  } else if (currentPhase === 'development') {
    if (iterationCount < maxIterations) {
      currentPhase = 'design';
      iterationCount++;
    }
  }
  
  animating = true;
  iterationProgress = 0;
  
  // Increase quality with each iteration (with diminishing returns)
  if (currentPhase === 'design' || currentPhase === 'development') {
    let qualityIncrease = 15 - (iterationCount * 2); // Diminishing returns
    qualityScore = min(98, qualityScore + qualityIncrease);
  }
  
  // Add particle effect
  addParticles();
}

function addParticles() {
  for (let i = 0; i < 10; i++) {
    particles.push({
      x: centerX,
      y: centerY,
      vx: random(-2, 2),
      vy: random(-2, 2),
      life: 1.0,
      color: phaseColors[currentPhase]
    });
  }
}

function resetSimulation() {
  currentPhase = 'preparation';
  iterationCount = 0;
  qualityScore = 40;
  animating = false;
  iterationProgress = 0;
  particles = [];
  autoPlay = false;
  autoPlayToggle.checked(false);
}

function draw() {
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
  text('SAM: Successive Approximation Model', centerX, 15);
  
  // Subtitle
  textSize(13);
  fill('#666');
  text('An agile, iterative approach to instructional design', centerX, 48);
  
  // Reset text settings
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  
  // Update animation
  if (animating) {
    animationSpeed = speedSlider.value();
    iterationProgress += animationSpeed;
    
    if (iterationProgress >= 1.0) {
      animating = false;
      iterationProgress = 0;
      
      // Continue if auto-play is on
      if (autoPlay && iterationCount < maxIterations) {
        setTimeout(() => {
          if (autoPlay) {
            startNextIteration();
          }
        }, 500);
      }
    }
  }
  
  // Update and draw particles
  updateParticles();
  
  // Draw main spiral visualization
  drawSpiralProcess();
  
  // Draw phase indicators
  drawPhaseIndicators();
  
  // Draw quality meter
  drawQualityMeter();
  
  // Draw current phase info panel
  drawPhaseInfoPanel();
  
  // Draw iteration counter
  drawIterationCounter();
  
  // Draw control labels
  drawControlLabels();
}

function drawSpiralProcess() {
  push();
  translate(centerX - 120, centerY);
  
  // Draw spiral path
  noFill();
  stroke('#ccc');
  strokeWeight(3);
  
  beginShape();
  for (let angle = 0; angle < TWO_PI * 3; angle += 0.1) {
    let r = map(angle, 0, TWO_PI * 3, 30, spiralRadius);
    let x = cos(angle) * r;
    let y = sin(angle) * r;
    vertex(x, y);
  }
  endShape();
  
  // Draw phase sections on spiral
  drawPhaseOnSpiral(0, PI / 2, 'preparation');
  drawPhaseOnSpiral(PI / 2, TWO_PI * 3, 'design');
  
  // Draw current position indicator
  if (currentPhase !== 'preparation') {
    let currentAngle;
    let currentRadius;
    
    if (currentPhase === 'design') {
      currentAngle = PI / 2 + ((iterationCount - 1) * TWO_PI + iterationProgress * PI);
      currentRadius = map(currentAngle, 0, TWO_PI * 3, 30, spiralRadius);
    } else { // development
      currentAngle = PI / 2 + ((iterationCount - 1) * TWO_PI + PI + iterationProgress * PI);
      currentRadius = map(currentAngle, 0, TWO_PI * 3, 30, spiralRadius);
    }
    
    let x = cos(currentAngle) * currentRadius;
    let y = sin(currentAngle) * currentRadius;
    
    // Draw position marker
    fill(phaseColors[currentPhase]);
    noStroke();
    circle(x, y, 20);
    
    // Glow effect
    fill(phaseColors[currentPhase] + '40');
    circle(x, y, 30);
  } else {
    // Show starting position in preparation
    fill(phaseColors.preparation);
    noStroke();
    circle(0, 0, 25);
  }
  
  pop();
}

function drawPhaseOnSpiral(startAngle, endAngle, phase) {
  // This is simplified - in full version would color code the spiral sections
}

function drawPhaseIndicators() {
  let startX = centerX + 100;
  let startY = 120;
  let spacing = 90;
  
  // Preparation phase
  drawPhaseBox(startX, startY, 'preparation', currentPhase === 'preparation');
  
  // Design phase (with iteration indicators)
  drawPhaseBox(startX, startY + spacing, 'design', currentPhase === 'design');
  
  // Development phase (with iteration indicators)
  drawPhaseBox(startX, startY + spacing * 2, 'development', currentPhase === 'development');
  
  // Draw arrows between phases
  stroke('#999');
  strokeWeight(2);
  drawArrow(startX + 80, startY + 30, startX + 80, startY + spacing - 10);
  drawArrow(startX + 80, startY + spacing + 30, startX + 80, startY + spacing * 2 - 10);
  
  // Draw iteration loop arrow
  if (iterationCount > 0) {
    stroke(phaseColors.development);
    strokeWeight(2);
    noFill();
    arc(startX + 100, startY + spacing + 45, 80, 80, -PI/2, PI/2);
    drawArrowhead(startX + 100, startY + spacing - 5, -PI/2);
  }
}

function drawPhaseBox(x, y, phase, active) {
  let boxWidth = 160;
  let boxHeight = 60;
  
  // Box
  if (active) {
    fill(phaseColors[phase]);
    stroke(phaseColors[phase]);
    strokeWeight(3);
  } else {
    fill('white');
    stroke('#ddd');
    strokeWeight(2);
  }
  rect(x, y, boxWidth, boxHeight, 8);
  
  // Icon and text
  if (active) {
    fill('white');
  } else {
    fill('#666');
  }
  noStroke();
  textSize(20);
  textAlign(LEFT, CENTER);
  text(phaseInfo[phase].icon, x + 10, y + boxHeight/2);
  
  textSize(14);
  text(phaseInfo[phase].name, x + 40, y + boxHeight/2);
  
  // Iteration count for design/development
  if ((phase === 'design' || phase === 'development') && iterationCount > 0) {
    textSize(11);
    fill(active ? 'white' : '#999');
    text(`Iteration ${iterationCount}`, x + 40, y + boxHeight/2 + 15);
  }
}

function drawArrow(x1, y1, x2, y2) {
  line(x1, y1, x2, y2);
  let angle = atan2(y2 - y1, x2 - x1);
  drawArrowhead(x2, y2, angle);
}

function drawArrowhead(x, y, angle) {
  push();
  translate(x, y);
  rotate(angle);
  let size = 8;
  fill('#999');
  noStroke();
  triangle(0, 0, -size, -size/2, -size, size/2);
  pop();
}

function drawQualityMeter() {
  let meterX = margin + 20;
  let meterY = drawHeight - 120;
  let meterWidth = 200;
  let meterHeight = 30;
  
  // Label
  fill('black');
  noStroke();
  textSize(14);
  textAlign(LEFT, TOP);
  text('Product Quality', meterX, meterY - 25);
  
  // Meter background
  fill(240);
  stroke('#ccc');
  strokeWeight(1);
  rect(meterX, meterY, meterWidth, meterHeight, 15);
  
  // Meter fill
  noStroke();
  let fillWidth = map(qualityScore, 0, 100, 0, meterWidth);
  
  if (qualityScore < 50) {
    fill('#E94B3C');
  } else if (qualityScore < 75) {
    fill('#F5A623');
  } else {
    fill('#7ED321');
  }
  
  rect(meterX, meterY, fillWidth, meterHeight, 15);
  
  // Percentage text
  fill('black');
  textAlign(CENTER, CENTER);
  textSize(16);
  text(nf(qualityScore, 0, 0) + '%', meterX + meterWidth/2, meterY + meterHeight/2);
  
  // Quality descriptor
  textSize(12);
  fill('#666');
  textAlign(LEFT, TOP);
  let descriptor;
  if (qualityScore < 50) descriptor = 'Initial draft';
  else if (qualityScore < 70) descriptor = 'Improving';
  else if (qualityScore < 85) descriptor = 'Good quality';
  else descriptor = 'Excellent!';
  text(descriptor, meterX, meterY + meterHeight + 8);
}

function drawPhaseInfoPanel() {
  if (currentPhase === 'preparation' && iterationCount === 0) return;
  
  let panelX = margin + 20;
  let panelY = drawHeight - 230;
  let panelWidth = 220;
  let panelHeight = 95;
  
  // Panel background
  fill(phaseColors[currentPhase] + '20');
  stroke(phaseColors[currentPhase]);
  strokeWeight(2);
  rect(panelX, panelY, panelWidth, panelHeight, 8);
  
  // Title
  fill('black');
  noStroke();
  textSize(14);
  textAlign(LEFT, TOP);
  text('Current Activities:', panelX + 10, panelY + 8);
  
  // Activities
  textSize(11);
  fill('#333');
  let yPos = panelY + 28;
  for (let activity of phaseInfo[currentPhase].activities) {
    text('• ' + activity, panelX + 10, yPos);
    yPos += 16;
  }
}

function drawIterationCounter() {
  let counterX = width - 200;
  let counterY = drawHeight - 80;
  
  fill('black');
  noStroke();
  textSize(18);
  textAlign(RIGHT, CENTER);
  text(`Iteration: ${iterationCount} / ${maxIterations}`, counterX, counterY);
  
  // Visual iteration dots
  let dotStartX = counterX - 180;
  for (let i = 1; i <= maxIterations; i++) {
    if (i <= iterationCount) {
      fill('#7ED321');
    } else {
      fill('#ddd');
    }
    noStroke();
    circle(dotStartX + (i-1) * 25, counterY, 15);
  }
}

function updateParticles() {
  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    
    p.x += p.vx;
    p.y += p.vy;
    p.life -= 0.02;
    
    if (p.life <= 0) {
      particles.splice(i, 1);
    } else {
      push();
      let col = color(p.color);
      col.setAlpha(p.life * 200);
      fill(col);
      noStroke();
      circle(p.x, p.y, 8 * p.life);
      pop();
    }
  }
}

function drawControlLabels() {
  fill('black');
  noStroke();
  textSize(14);
  textAlign(LEFT, CENTER);
  
  let speedValue = speedSlider.value();
  let speedText = `${nf(speedValue, 1, 3)}`;
  text(speedText, sliderLeftMargin + speedSlider.width + 10, drawHeight + 55);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
    
    if (typeof speedSlider !== 'undefined') {
      speedSlider.size(canvasWidth - sliderLeftMargin - margin);
    }
  }
}
