// Levels of Interactivity in Intelligent Textbooks MicroSim
// Dan McCreary
// May 16th, 2025
// Canvas dimensions

let canvasWidth = 500;
let drawHeight = 500;
let canvasHeight = drawHeight;
let margin = 25;
let defaultTextSize = 16;

// Global variables for width and height
let containerWidth = 700; // recalculated by container upon resize
let containerHeight = canvasHeight; // fixed height on page

//
let pyramidWidth = containerWidth - margin * 2;
let infoboxHeight = 120;

let pyramidHeight = drawHeight - margin * 2 - infoboxHeight;

// Interactivity levels data
let levels = [
  {
    name: "Static Content Level",
    color: "red", // Blue
    textColor: "white",
    sublevels: ["Text Block", "Enhanced Text"],
    description: "This is the most basic level of content. It includes plain text paragraphs and text with basic formatting like bold, italic, and headers. Most traditional textbooks operate primarily at this level."
  },
  {
    name: "Structured Content Level",
    color: "orange", // Green
    textColor: "white",
    sublevels: ["List Structure", "Definition Structure", "Tabular Structure"],
    description: "At this level, content is organized into meaningful structures such as bulleted lists, term-description pairs, and tables. These structures help organize information and make relationships clearer for learners."
  },
  {
    name: "Visual Representation Level",
    color: "#f1c40f", // Yellow
    textColor: "black",
    sublevels: ["Static Visualization", "Toggle Visualization", "Process Visualization"],
    description: "This level introduces visual elements to represent data and concepts. It includes static charts and diagrams, visualizations with toggleable views, and process workflows with connecting elements."
  },
  {
    name: "Basic Interaction Level",
    color: "green", // Orange
    textColor: "white",
    sublevels: ["Animated Visualization", "Interactive Infographic", "User-Controlled Animation"],
    description: "This level introduces movement and user control. Elements include visualizations with predetermined animations, clickable areas that reveal information, and animations with simple controls like play/pause."
  },
  {
    name: "Simulation Level",
    color: "blue", // Red
    textColor: "white",
    sublevels: ["Basic MicroSim", "Standard MicroSim", "Data-Enhanced MicroSim"],
    description: "At this level learners can interact with dynamic models that represent real-world concepts. These range from simple simulations with limited controls to more complex models that track user interaction data."
  },
  {
    name: "Advanced Simulation",
    color: "#9b59b6", // Purple
    textColor: "white",
    sublevels: ["Adaptive MicroSim", "Personalized MicroSim", "Immersive Simulation"],
    description: "The most sophisticated level includes simulations that adapt to user behavior, personalized experiences based on knowledge level, and immersive 3D environments with complex interactions."
  }
];

let hoveredLevel = -1; // -1 means no level hovered

function setup() {
  // Create a canvas to match the parent container's size
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);
  
  describe('An interactive infographic showing the six levels of interactivity in intelligent textbooks arranged in a pyramid with the most advanced levels at the top. Hover over each level to see more details.', LABEL);
}

function draw() {
  updateCanvasSize();
  // Draw area
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  
  // Title
  fill('black');
  noStroke();
  textSize(min(24, containerWidth * 0.05));
  textAlign(CENTER, TOP);
  text("Levels of Interactivity in Intelligent Textbooks", canvasWidth/2, margin/2);
  
  // Draw the pyramid of levels
  drawLevelsPyramid();
  
  // Draw the details of the hovered level
  drawLevelDetails();
  
  // Draw instructions
  if (hoveredLevel === -1) {
    fill('#555555');
    textSize(min(16, containerWidth * 0.035));
    textAlign(CENTER, CENTER);
    text("Hover over a level to see details", canvasWidth/2, drawHeight/2 + 140);
  }
}

function drawLevelsPyramid() {
  // Calculate dimensions based on container width

  const levelHeight = pyramidHeight / levels.length;
  
  // Draw from top to bottom (highest level to lowest)
  for (let i = 0; i < levels.length; i++) {
    // Top level (i=0) is narrowest, bottom level (i=levels.length-1) is widest
    const levelIdx = levels.length - 1 - i; // This makes level 5 (Advanced Simulation) at the top
    const widthPercentage = 0.4 + (i * 0.12); // Increase width as we go down (0.4 to 1.0)
    const levelWidth = canvasWidth * widthPercentage - margin;
    let xOffset = (canvasWidth - levelWidth) / 2;
     
    // Calculate y-position (starting from top)
    let yPosition = margin * 2 + levelHeight * i;
    
    // Store position and dimensions for interaction
    levels[levelIdx].x = xOffset;
    levels[levelIdx].y = yPosition;
    levels[levelIdx].width = levelWidth;
    levels[levelIdx].height = levelHeight - 4; // Small gap between levels
    
    // Draw the current level with a thicker border
    stroke('black');
    fill(levels[levelIdx].color);
    if (levelIdx === hoveredLevel) {     
      strokeWeight(3);
    } else {
      strokeWeight(1);
    }
    rect(xOffset, yPosition, levelWidth, levelHeight - 4, 5);
    noStroke();
    
    // Draw level number
    fill(levels[levelIdx].textColor);
    textSize(16);
    textAlign(LEFT, CENTER);
    
    // short label at top
    if (i>0)
      levelText = 'Level '
    else levelText = 'L'
    text(levelText + `${levelIdx + 1}:`, xOffset + 6, yPosition + levelHeight / 2 - 10);
    
    // Draw level name
    textAlign(CENTER, CENTER);
    textSize(24);
    let levelName = levels[levelIdx].name;
    if (containerWidth < 500) {
      // Abbreviate for smaller screens
      levelName = levelName.replace(" Level", "").trim();
    }
    text(levelName, containerWidth/2+10, yPosition + levelHeight / 2 - 1);

  }
  
  // Add arrow showing increasing value
  fill('#333333');
  noStroke();
  textSize(min(16, containerWidth * 0.032));
  textAlign(RIGHT, CENTER);
  
  text('Increasing\nMedia\nRichness', containerWidth - canvasWidth*.1, 70);
  drawArrow(createVector(containerWidth - canvasWidth*.08, 240), createVector(-canvasWidth*.18, -180), 'black', 8);
}

// drawArrow(createVector(10, 10), createVector(60, 70), 'black', 5);
function drawArrow(from, to, myColor, weight) {
  push();
    stroke(myColor);
    strokeWeight(weight);
    fill(myColor);
    translate(from.x, from.y);
    line(0, 0, to.x, to.y);
    rotate(to.heading());
    let arrowSize = weight*2;
    translate(to.mag() - arrowSize, 0);
    triangle(0, weight, 0, -weight, arrowSize, 0);
  pop();
}

function drawLevelDetails() {
  if (hoveredLevel === -1) return;
  
  let level = levels[hoveredLevel];
  let detailsX = margin/2;
  let detailsY = drawHeight - infoboxHeight;
  let detailsWidth = containerWidth - margin;
  let detailsHeight = infoboxHeight - 5;
  
  // Draw details box
  fill('#f8f9fa');
  stroke('#dddddd');
  strokeWeight(1);
  rect(detailsX, detailsY, detailsWidth, detailsHeight, 5);
  
  // Draw level name with level number
  fill('#333333');
  noStroke();
  textSize(min(18, containerWidth * 0.038));
  textAlign(LEFT, TOP);
  text(`Level ${hoveredLevel + 1}: ${level.name}`, detailsX + 10, detailsY + 10);
  
  // Draw sublevels
  let sublevelsY = detailsY + 35;
  textSize(min(14, containerWidth * 0.028));
  text("Includes:", detailsX + 10, sublevelsY);
  
  // Calculate layout for sublevels based on available space
  const availableWidth = detailsWidth - 20;
  const sublevelWidth = min(200, availableWidth / 2);
  
  for (let i = 0; i < level.sublevels.length; i++) {
    // Draw in 1 row 
    let col = i;
   
    const bulletX = detailsX + 20 + col * sublevelWidth;
    const textX = bulletX + 10;
    const itemY = sublevelsY + 25;
    
    fill(level.color);
    noStroke();
    circle(bulletX, itemY, 6);
    
    fill('black');
    text(level.sublevels[i], textX, itemY-7);
  }
  
  // Draw description
  let descY = sublevelsY + 40;
  textSize(min(14, containerWidth * 0.028));
  text(level.description, detailsX + 10, descY, detailsWidth - 20, detailsHeight - (descY - detailsY) + 40);
}

function mouseMoved() {
  // Reset hover state
  hoveredLevel = -1;
  
  // Check if mouse is over a level
  for (let i = 0; i < levels.length; i++) {
    let level = levels[i];
    
    if (mouseX >= level.x && mouseX <= level.x + level.width &&
        mouseY >= level.y && mouseY <= level.y + level.height) {
      hoveredLevel = i;
      break; // Exit loop once we find the hovered level
    }
  }
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
  canvasWidth = containerWidth;
}