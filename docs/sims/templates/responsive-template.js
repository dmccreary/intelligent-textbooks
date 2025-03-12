// global variables for width and height
let containerWidth; // calculated by container
let containerHeight = 200; // fixed height on page

function setup() {
    // Create a canvas to match the parent container's size
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, containerHeight);
    var mainElement = document.querySelector('main');
    canvas.parent(mainElement);
    noLoop(); // Stop the draw loop since we'll redraw only on resize
}

function draw() {
  background('aliceblue');
  fill('black');
  textSize(36);
  textAlign(CENTER, CENTER);

  // Display container dimensions
  text(`Width: ${containerWidth}px\nHeight: ${containerHeight}px`, width / 2, height / 2);
}

function windowResized() {
  // Update canvas size when the container resizes
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  redraw();
}

function updateCanvasSize() {
    // Get the exact dimensions of the container
    const container = document.querySelector('main').getBoundingClientRect();
    containerWidth = Math.floor(container.width);  // Avoid fractional pixels
}