// Circle Radius MicroSim
let containerWidth;
let containerHeight = 450;  // 400 for drawing + 50 for controls
let drawHeight = 400;
let controlHeight = 50;
let margin = 25;
let defaultTextSize = 16;
let radiusSlider;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, containerHeight);
    var mainElement = document.querySelector('main');
    canvas.parent(mainElement);
    
    // Initialize the slider in the control region
    radiusSlider = createSlider(10, 150, 50, 1);
    radiusSlider.position(220, drawHeight + 15);
    radiusSlider.size(containerWidth - 250);
    
    textSize(defaultTextSize);
}

function updateCanvasSize() {
    const container = document.querySelector('main').getBoundingClientRect();
    containerWidth = Math.floor(container.width);
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(containerWidth, containerHeight);
    radiusSlider.size(containerWidth - 250);
    redraw();
}

function draw() {
    // Draw background for the drawing region
    fill('aliceblue');
    rect(0, 0, containerWidth, drawHeight);
    
    // Draw background for the control region
    fill('white');
    rect(0, drawHeight, containerWidth, controlHeight);
    
    // Get current radius from slider
    let radius = radiusSlider.value();
    
    // Draw the circle in the center of the drawing region
    fill('blue');
    noStroke();
    circle(containerWidth/2, drawHeight/2, radius * 2);
    
    // Draw the label and value for the slider
    fill('black');
    noStroke();
    textAlign(LEFT, CENTER);
    text("Radius: " + radius + "px", 10, drawHeight + 25);
}