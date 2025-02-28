// p5.js code to generate a sine wave with amplitude and period controls

// sine wave with 3 sliders
let canvasWidth = 670;
let drawHeight = 400;
let canvasHeight = 475;
let halfWidth = canvasWidth / 2;
let halfHeight = drawHeight / 2;
let amplitude = 100;
let phase = 0;

let amplitudeSlider, periodSlider, phaseSlider;
let labelValueMargin = 130;

function setup() {
  const canvas = createCanvas(canvasWidth, canvasHeight);
  // This code will also work in the p5.js editor
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  
  textFont('Arial');
  textSize(16);
  
  // Create sliders
  amplitudeSlider = createSlider(0, 200, 100);
  amplitudeSlider.position(labelValueMargin, drawHeight + 10);
  amplitudeSlider.size(width - labelValueMargin - 15);
  
  periodSlider = createSlider(1, 100, 50);
  periodSlider.position(labelValueMargin, drawHeight + 30);
  periodSlider.size(width - labelValueMargin - 15);
  
  phaseSlider = createSlider(-PI*100, PI*100, 0, 0.01);
  phaseSlider.position(labelValueMargin, drawHeight + 50);
  phaseSlider.size(width - labelValueMargin - 15);
}
  
function draw() {
  stroke(0);
  // make the background drawing region light gray
  fill('aliceblue');
  rect(0, 0, canvasWidth, canvasWidth);
  // make the background of the controls white
  fill('white')
  rect(0, drawHeight, canvasWidth, canvasHeight-drawHeight);
  
  amplitude = amplitudeSlider.value();
  period = periodSlider.value();
  phase = phaseSlider.value();
  
  // draw slider labels
  strokeWeight(0);
  fill('black'); // Text color
  text('Amplitude: ' + amplitude/100,    10, drawHeight + 25);
  text('Period: '    + period,           10, drawHeight + 45);
  text('Phase: '     + phase.toFixed(2), 10, drawHeight + 65);
  
  // draw on the standard axis to keep text upright
  drawAxis();
  translate(canvasWidth / 2, drawHeight / 2); // Shift origin to center
  
  scale(1, -1); // Flip y-axis to make positive y up
  drawSineWave(amplitude, 1/period, phase);
}

function setLineDash(list) {
  drawingContext.setLineDash(list);
}

function drawAxis() {
  fill('black')
  strokeWeight(0)
  text('y', halfWidth-20, 15)
  text('x', width-20, halfHeight + 20)
  stroke('gray')
  strokeWeight(1)
  setLineDash([5, 5])
  
  // horizontal line
  line(0, halfHeight, width, halfHeight)
  // vertical line
  line(halfWidth, 0, halfWidth, drawHeight)
  

}

function drawSineWave(amplitude, frequency, phase) {
  stroke('blue');
  strokeWeight(3)
  noFill();
  // turn off dash line
  setLineDash([1, 0])
  beginShape();
    for (let x = -width / 2; x < width / 2; x++) {
      let y = amplitude * sin(frequency * (x - phase));
      vertex(x, y);
    }
  endShape();
}