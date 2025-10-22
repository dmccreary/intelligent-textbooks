// Cognitive Load Visualizer MicroSim
// Educational tool to explore cognitive load theory and working memory

// Canvas dimensions - REQUIRED structure
let canvasWidth = 800;              // Initial width (responsive)
let drawHeight = 450;               // Drawing/simulation area height
let controlHeight = 150;            // Controls area height
let canvasHeight = drawHeight + controlHeight;
let margin = 20;                    // Margin for visual elements
let sliderLeftMargin = 150;         // Left margin for slider positioning
let defaultTextSize = 16;           // Base text size

// Cognitive load values (0-100)
let intrinsicLoad = 40;
let extraneousLoad = 30;
let germaneLoad = 20;
let maxCapacity = 100;

// Sliders
let intrinsicSlider;
let extraneousSlider;
let germaneSlider;

// Buttons
let resetButton;
let goodExampleButton;
let badExampleButton;

// Visual elements
let brainX, brainY, brainSize;
let barWidth = 180;
let barHeight = 30;
let barStartX;

// Animation
let fillAnimation = 0;
let animating = false;
let targetFill = 0;

// Example states
let showingExample = null; // 'good' or 'bad' or null

function setup() {
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  
  // Calculate positions
  brainX = canvasWidth * 0.2;
  brainY = drawHeight / 2;
  brainSize = 140;
  barStartX = canvasWidth * 0.5;
  
  // Create controls
  createControls();
  
  describe('Interactive cognitive load visualizer showing three types of load (intrinsic, extraneous, germane) and their impact on working memory capacity. Adjust sliders to see effects on learning.', LABEL);
}

function createControls() {
  let yPos = drawHeight + 15;
  
  
  intrinsicSlider = createSlider(0, 100, 40, 5);
  intrinsicSlider.position(sliderLeftMargin, yPos);
  intrinsicSlider.size(canvasWidth - sliderLeftMargin - margin);
  intrinsicSlider.input(updateLoads);
  
  // Extraneous Load Slider
  yPos += 35;  
  extraneousSlider = createSlider(0, 100, 30, 5);
  extraneousSlider.position(sliderLeftMargin, yPos);
  extraneousSlider.size(canvasWidth - sliderLeftMargin - margin);
  extraneousSlider.input(updateLoads);
  
  // Germane Load Slider
  yPos += 35;  
  germaneSlider = createSlider(0, 100, 20, 5);
  germaneSlider.position(sliderLeftMargin, yPos);
  germaneSlider.size(canvasWidth - sliderLeftMargin - margin);
  germaneSlider.input(updateLoads);
  
  // Buttons
  yPos += 35;
  goodExampleButton = createButton('Good Design Example');
  goodExampleButton.position(20, yPos);
  goodExampleButton.mousePressed(() => loadGoodExample());
  
  badExampleButton = createButton('Bad Design Example 1');
  badExampleButton.position(180, yPos);
  badExampleButton.mousePressed(() => loadBadExample());
  
  badExampleButton = createButton('Bad Design Example 2');
  badExampleButton.position(340, yPos);
  badExampleButton.mousePressed(() => loadBadExample2());
  
  resetButton = createButton('Reset to Default');
  resetButton.position(500, yPos);
  resetButton.mousePressed(resetSimulation);
}

function updateLoads() {
  intrinsicLoad = intrinsicSlider.value();
  extraneousLoad = extraneousSlider.value();
  germaneLoad = germaneSlider.value();
  showingExample = null;
  
  // Trigger animation
  targetFill = intrinsicLoad + extraneousLoad + germaneLoad;
  animating = true;
}

function loadGoodExample() {
  // Good design: low extraneous, appropriate intrinsic, good germane
  intrinsicLoad = 45;
  extraneousLoad = 15;
  germaneLoad = 30;
  
  intrinsicSlider.value(intrinsicLoad);
  extraneousSlider.value(extraneousLoad);
  germaneSlider.value(germaneLoad);
  
  showingExample = 'good';
  targetFill = intrinsicLoad + extraneousLoad + germaneLoad;
  animating = true;
}

function loadBadExample() {
  // Bad design: high extraneous, high intrinsic, low germane
  intrinsicLoad = 50;
  extraneousLoad = 55;
  germaneLoad = 10;
  
  intrinsicSlider.value(intrinsicLoad);
  extraneousSlider.value(extraneousLoad);
  germaneSlider.value(germaneLoad);
  
  showingExample = 'bad';
  targetFill = intrinsicLoad + extraneousLoad + germaneLoad;
  animating = true;
}

function loadBadExample2() {
  // Bad design: high extraneous, high intrinsic, low germane
  intrinsicLoad = 50;
  extraneousLoad = 10;
  germaneLoad = 60;
  
  intrinsicSlider.value(intrinsicLoad);
  extraneousSlider.value(extraneousLoad);
  germaneSlider.value(germaneLoad);
  
  showingExample = 'bad';
  targetFill = intrinsicLoad + extraneousLoad + germaneLoad;
  animating = true;
}

function resetSimulation() {
  intrinsicLoad = 40;
  extraneousLoad = 30;
  germaneLoad = 20;
  
  intrinsicSlider.value(intrinsicLoad);
  extraneousSlider.value(extraneousLoad);
  germaneSlider.value(germaneLoad);
  
  showingExample = null;
  targetFill = intrinsicLoad + extraneousLoad + germaneLoad;
  animating = true;
}

function draw() {
  updateCanvasSize();
  // Drawing area (light blue background)
  fill('aliceblue');
  stroke('silver');
  rect(0, 0, width, drawHeight);
  
  // Control area (white background)
  fill('white');
  rect(0, drawHeight, width, controlHeight);
  
  // Draw border between areas
  stroke('silver');
  strokeWeight(1);
  line(0, drawHeight, width, drawHeight);
  
  // Title
  fill('black');
  textSize(28);
  textAlign(CENTER, TOP);
  noStroke();
  text('Cognitive Load Visualizer', canvasWidth/2, 15);
  
  // Subtitle
  textSize(13);
  fill('#666');
  text('Adjust sliders to see how different types of cognitive load affect working memory', canvasWidth/2, 48);
  
  // Reset text settings
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  
  // Update animation
  if (animating) {
    let diff = targetFill - fillAnimation;
    if (abs(diff) < 1) {
      fillAnimation = targetFill;
      animating = false;
    } else {
      fillAnimation += diff * 0.1;
    }
  }
  
  // Update positions for responsive design
  brainX = canvasWidth * 0.2;
  barStartX = canvasWidth * 0.5;
  
  // Draw brain/working memory visualization
  drawBrainCapacity();
  
  // Draw load bars
  drawLoadBars();
  
  // Draw legend
  drawLegend();
  
  // Draw example explanation if showing
  if (showingExample) {
    drawExampleExplanation();
  }
  
  // Draw feedback message
  drawFeedbackMessage();
  
  // Draw control labels
  drawControlLabels();
}

function drawBrainCapacity() {
  let totalLoad = intrinsicLoad + extraneousLoad + germaneLoad;
  let fillPercent = fillAnimation / maxCapacity;
  
  // Draw brain outline (simplified head shape)
  push();
  translate(brainX, brainY);
  
  // Head circle
  stroke('#333');
  strokeWeight(3);
  noFill();
  circle(0, 0, brainSize);
  
  // Draw capacity fill
  let fillHeight = brainSize * fillPercent;
  noStroke();
  
  // Create gradient effect by drawing multiple rectangles
  let steps = 20;
  for (let i = 0; i < steps; i++) {
    let y = map(i, 0, steps, brainSize/2, brainSize/2 - fillHeight);
    let alpha = map(i, 0, steps, 100, 200);
    
    if (totalLoad > maxCapacity) {
      fill(220, 50, 50, alpha); // Red when overloaded
    } else if (totalLoad > 80) {
      fill(230, 150, 50, alpha); // Orange when nearly full
    } else {
      fill(100, 180, 230, alpha); // Blue when manageable
    }
    
    rect(-brainSize/2, y, brainSize, 2);
  }
  
  // Capacity indicator
  stroke('#333');
  strokeWeight(2);
  line(-brainSize/2 - 10, -brainSize/2, brainSize/2 + 10, -brainSize/2);
  
  pop();
  
  // Label
  fill('black');
  noStroke();
  textSize(16);
  textAlign(CENTER, TOP);
  text('Working Memory', brainX, brainY + brainSize/2 + 15);
  
  // Capacity percentage
  textSize(20);
  textAlign(CENTER, CENTER);
  let percentText = nf(fillAnimation, 0, 0) + '%';
  if (totalLoad > maxCapacity) {
    fill('#D63230');
    percentText = nf(totalLoad, 0, 0) + '% OVERLOAD!';
  }
  text(percentText, brainX, brainY);
  
  // Capacity limit label
  textSize(12);
  fill('#666');
  textAlign(CENTER, BOTTOM);
  text('100% Capacity', brainX, brainY - brainSize/2 - 5);
}

function drawLoadBars() {
  let yStart = 120;
  let ySpacing = barHeight + 25;
  
  // Intrinsic Load (Yellow)
  drawBar(barStartX, yStart, intrinsicLoad, '#F5C842', 'Intrinsic Load');
  
  // Extraneous Load (Red)
  drawBar(barStartX, yStart + ySpacing, extraneousLoad, '#E94B3C', 'Extraneous Load');
  
  // Germane Load (Green)
  drawBar(barStartX, yStart + ySpacing * 2, germaneLoad, '#7ED321', 'Germane Load');
  
  // Total Load
  let totalLoad = intrinsicLoad + extraneousLoad + germaneLoad;
  drawBar(barStartX, yStart + ySpacing * 3, totalLoad, '#888', 'Total Load');
}

function drawBar(x, y, value, color, label) {
  // Bar background
  fill(240);
  stroke('#ccc');
  strokeWeight(1);
  rect(x, y, barWidth, barHeight, 3);
  
  // Bar fill
  noStroke();
  fill(color);
  let fillWidth = map(value, 0, maxCapacity, 0, barWidth);
  rect(x, y, fillWidth, barHeight, 3);
  
  // Label
  fill('black');
  noStroke();
  textSize(14);
  textAlign(RIGHT, CENTER);
  text(label + ':', x - 10, y + barHeight/2);
  
  // Value
  textAlign(LEFT, CENTER);
  text(nf(value, 0, 0) + '%', x + barWidth + 10, y + barHeight/2);
  
  // Overflow indicator
  if (value > 100) {
    fill('#E94B3C');
    textAlign(LEFT, CENTER);
    text('⚠', x + barWidth + 50, y + barHeight/2);
  }
}

function drawLegend() {
  let legendX = margin + 10;
  let legendY = margin + 320;
  let boxSize = 15;
  let lineHeight = 25;
  
  textSize(14);
  textAlign(LEFT, CENTER);
  
  // Intrinsic Load
  fill('#F5C842');
  noStroke();
  rect(legendX, legendY, boxSize, boxSize);
  fill('black');
  text('Intrinsic: Inherent complexity of concept chunk', legendX + boxSize + 8, legendY + boxSize/2);
  
  // Extraneous Load
  legendY += lineHeight;
  fill('#E94B3C');
  noStroke();
  rect(legendX, legendY, boxSize, boxSize);
  fill('black');
  text('Extraneous Load: Number of unnessary UI elements', legendX + boxSize + 8, legendY + boxSize/2);
  
  // Germane Load
  legendY += lineHeight;
  fill('#7ED321');
  noStroke();
  rect(legendX, legendY, boxSize, boxSize);
  fill('black');
  text('Germane: Similar to known concepts', legendX + boxSize + 8, legendY + boxSize/2);
}

function drawExampleExplanation() {
  let panelX = canvasWidth/2;
  let panelY = 335;
  let panelWidth = 300;
  let panelHeight = 100;
  
  // Adjust for narrow screens
  if (canvasWidth < 700) {
    panelX = 10;
    panelY = 80;
  }
  
  // Panel background
  if (showingExample === 'good') {
    fill(126, 211, 33, 30);
    stroke('#7ED321');
  } else {
    fill(233, 75, 60, 30);
    stroke('#E94B3C');
  }
  strokeWeight(2);
  rect(panelX, panelY, panelWidth, panelHeight, 8);
  
  // Title
  fill('black');
  noStroke();
  textSize(16);
  textAlign(LEFT, TOP);
  text(showingExample === 'good' ? 'Good Design' : 'Bad Design', panelX + 10, panelY + 10);
  
  // Description
  textSize(12);
  let desc;
  if (showingExample === 'good') {
    desc = 'Low extraneous load from clean design. ' +
           'Moderate intrinsic load matches content. ' +
           'High germane load supports learning.';
  } else {
    desc = 'High extraneous load from clutter. ' +
           'High intrinsic load overwhelms. ' +
           'Low germane load hinders learning. ' +
           'Total exceeds capacity!';
  }
  
  fill('#333');
  text(desc, panelX + 10, panelY + 35, panelWidth - 20);
}

function drawFeedbackMessage() {
  let totalLoad = intrinsicLoad + extraneousLoad + germaneLoad;
  let messageY = 85;
  
  textSize(14);
  textAlign(CENTER, CENTER);
  
  if (totalLoad > maxCapacity) {
    fill('#E94B3C');
    text('⚠ Cognitive Overload! Learning is impaired.', canvasWidth/2, messageY);
  } else if (totalLoad > 80) {
    fill('#F5A623');
    text('⚡ Near capacity. Reduce extraneous load.', canvasWidth/2, messageY);
  } else if (extraneousLoad > 40) {
    fill('#F5A623');
    text('💡 High extraneous load. Simplify design.', canvasWidth/2, messageY);
  } else if (germaneLoad < 15) {
    fill('#F5A623');
    text('💡 Low germane load. Add learning support.', canvasWidth/2, messageY);
  } else {
    fill('#7ED321');
    text('✓ Good balance! Optimal for learning.', canvasWidth/2, messageY);
  }
}

function drawControlLabels() {
  fill('black');
  noStroke();
  textSize(14);
  textAlign(LEFT, CENTER);
  
  // Display current values after sliders
  let yPos = drawHeight + 15;
  
  text("Intrinsic Load " + nf(intrinsicLoad, 0, 0) + '%', 10, yPos + 5);
  
  yPos += 35;
  text("Extraneous Load " + nf(extraneousLoad, 0, 0) + '%', 10, yPos + 5);
  
  yPos += 35;
  text("Germane Load " + nf(germaneLoad, 0, 0) + '%', 10, yPos + 5);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
    
    // Reposition all controls to match new width
    if (typeof intrinsicSlider !== 'undefined') {
      intrinsicSlider.size(canvasWidth - sliderLeftMargin - margin);
      extraneousSlider.size(canvasWidth - sliderLeftMargin - margin);
      germaneSlider.size(canvasWidth - sliderLeftMargin - margin);
    }
  }
}
