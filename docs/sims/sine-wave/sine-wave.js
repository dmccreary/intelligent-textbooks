// MicroSim for a responsive sine wave demonstration
// Canvas dimensions
let canvasWidth = 670;
let drawHeight = 400;
let controlHeight = 75;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let sliderLeftMargin = 130;
let defaultTextSize = 16;

// Global variables for responsive design
let containerWidth; // calculated by container upon resize
let containerHeight = canvasHeight; // fixed height on page

// Sine wave parameters
let amplitude = 100;
let period = 50;
let phase = 0;

// UI Controls
let amplitudeSlider, periodSlider, phaseSlider;

function setup() {
  // Create a canvas to match the parent container's size
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  // This code will also work in the p5.js editor
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  
  textFont('Arial');
  textSize(defaultTextSize);
  
  // Create sliders with responsive sizing
  amplitudeSlider = createSlider(0, 200, 100);
  amplitudeSlider.position(sliderLeftMargin, drawHeight + 10);
  amplitudeSlider.size(containerWidth - sliderLeftMargin - 15);
  
  periodSlider = createSlider(1, 100, 50);
  periodSlider.position(sliderLeftMargin, drawHeight + 30);
  periodSlider.size(containerWidth - sliderLeftMargin - 15);
  
  phaseSlider = createSlider(-PI*100, PI*100, 0, 0.01);
  phaseSlider.position(sliderLeftMargin, drawHeight + 50);
  phaseSlider.size(containerWidth - sliderLeftMargin - 15);
  
  describe('A MicroSim for exploring sine waves with amplitude, period, and phase controls.', LABEL);
}
  
function draw() {
  // Update canvasWidth after resize
  canvasWidth = containerWidth;
  
  // Background for drawing area
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  
  // Background for controls area
  fill('white');
  stroke('silver');
  strokeWeight(1);
  rect(0, drawHeight, canvasWidth, controlHeight);
  
  // Get values from sliders
  amplitude = amplitudeSlider.value();
  period = periodSlider.value();
  phase = phaseSlider.value();
  
  // Draw slider labels
  fill('black');
  noStroke();
  textSize(defaultTextSize);
  textAlign(LEFT, CENTER);
  
  text(`Amplitude: ${(amplitude/100).toFixed(2)}`, 10, drawHeight + 20);
  text(`Period: ${period}`, 10, drawHeight + 40);
  text(`Phase: ${phase.toFixed(2)}`, 10, drawHeight + 60);
  
  // Draw axes without transformation (keeps text upright)
  drawAxis();
  
  // Apply transformations for sine wave
  push();
    translate(canvasWidth / 2, drawHeight / 2); // Shift origin to center
    scale(1, -1); // Flip y-axis to make positive y up
    drawSineWave(amplitude, 1/period, phase);
  pop();
}

function setLineDash(list) {
  drawingContext.setLineDash(list);
}

function drawAxis() {
  fill('black');
  noStroke();
  textSize(defaultTextSize);
  textAlign(LEFT, CENTER);
  
  text('y', canvasWidth/2 - 20, 15);
  text('x', canvasWidth - 20, drawHeight/2 + 20);
  
  stroke('gray');
  strokeWeight(1);
  setLineDash([5, 5]);
  
  // Horizontal line (x-axis)
  line(0, drawHeight/2, canvasWidth, drawHeight/2);
  
  // Vertical line (y-axis)
  line(canvasWidth/2, 0, canvasWidth/2, drawHeight);
}

function drawSineWave(amplitude, frequency, phase) {
  stroke('blue');
  strokeWeight(3);
  noFill();
  // Turn off dash line
  setLineDash([1, 0]);
  
  beginShape();
  for (let x = -canvasWidth/2; x < canvasWidth/2; x++) {
    let y = amplitude * sin(frequency * (x - phase));
    vertex(x, y);
  }
  endShape();
}

function windowResized() {
  // Update canvas size when the container resizes
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  redraw();
  
  // Resize the sliders to match the new canvasWidth
  amplitudeSlider.size(containerWidth - sliderLeftMargin - 15);
  periodSlider.size(containerWidth - sliderLeftMargin - 15);
  phaseSlider.size(containerWidth - sliderLeftMargin - 15);
}

function updateCanvasSize() {
  // Get the exact dimensions of the container
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);  // Avoid fractional pixels
}