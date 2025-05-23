// AI Flywheel MicroSim using pure p5.js
// Canvas dimensions
let canvasWidth = 500;
let drawHeight = 400;
let controlHeight = 70;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let defaultTextSize = 24;

// Global variables for responsive design
let containerWidth; // calculated by container upon resize
let containerHeight = canvasHeight; // fixed height on page

// Node and edge data
let nodes = [];
let edges = [];
let currentHover = null;
let nodeRadius = 100;

// Concept descriptions
let descriptions = {
  'Data': 'Data: The foundation of any AI system. This includes training datasets, real-world usage data, user interactions, and feedback. Quality and quantity of data directly impact model performance. As the flywheel spins, more data is continuously collected from user interactions.',
  'Model': 'Model: The AI algorithm or machine learning model trained on the data. This could be a neural network, decision tree, or other ML algorithm. Better data leads to better models, which can make more accurate predictions and decisions.',
  'Prediction': 'Prediction: The output or decision made by the AI model. This could be recommendations, classifications, forecasts, or automated actions. Better models produce more accurate and useful predictions that create value for users.',
  'Feedback': 'Feedback: User responses, behaviors, and outcomes resulting from the predictions. This includes explicit feedback (ratings, clicks) and implicit feedback (usage patterns, behaviors). Feedback validates model performance and provides new training data.'
};

function setup() {
  // Create a canvas to match the parent container's size
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  
  initializeNetwork();
  
  describe('AI Flywheel causal loop diagram showing the cyclical relationship between Data, Model, Prediction, and Feedback in AI systems.', LABEL);
}

function initializeNetwork() {
  // Calculate center position and radius for circular layout
  let centerX = canvasWidth / 2;
  let centerY = (drawHeight - 40) / 2 + + margin*1.5; // Account for title space
  // radius of the large circle
  let radius = drawHeight/2 - 3*margin;
  
  // Define nodes with fixed positions in a circle
  nodes = [
    {
      id: 'Data',
      label: 'Data',
      x: centerX,
      y: centerY - radius,
      color: '#4CAF50',
      borderColor: '#2E7D32',
      textColor: 'white',
      size: nodeRadius
    },
    {
      id: 'Model',
      label: 'Model',
      x: centerX + radius,
      y: centerY,
      color: '#2196F3',
      borderColor: '#1565C0',
      textColor: 'white',
      size: nodeRadius
    },
    {
      id: 'Prediction',
      label: 'Prediction',
      x: centerX,
      y: centerY + radius,
      color: '#FF9800',
      borderColor: '#E65100',
      textColor: 'white',
      size: nodeRadius
    },
    {
      id: 'Feedback',
      label: 'Feedback',
      x: centerX - radius,
      y: centerY,
      color: '#9C27B0',
      borderColor: '#4A148C',
      textColor: 'white',
      size: nodeRadius
    }
  ];

  // Define edges with labels
  edges = [
    {
      from: 'Data',
      to: 'Model',
      label: 'Used to Create'
    },
    {
      from: 'Model',
      to: 'Prediction',
      label: 'Used to Create'
    },
    {
      from: 'Prediction',
      to: 'Feedback',
      label: 'Generates'
    },
    {
      from: 'Feedback',
      to: 'Data',
      label: 'Provides More'
    }
  ];
}

function draw() {
  // Draw background
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  
  // Controls area
  fill('white');
  stroke('silver');
  strokeWeight(1);
  rect(0, drawHeight, canvasWidth, controlHeight);
  
  // Title
  fill('black');
  noStroke();
  textSize(24);
  textAlign(CENTER, TOP);
  text("AI Flywheel", canvasWidth/2, 10);
  
  // Check for hover
  checkHover();
  
  // Draw edges first (so they appear behind nodes)
  drawEdges();
  
  // Draw nodes
  drawNodes();
  
  // Draw description area
  drawDescription();
}

function checkHover() {
  currentHover = null;
  
  // Check if mouse is over any node
  for (let node of nodes) {
    let distance = dist(mouseX, mouseY, node.x, node.y);
    if (distance < node.size / 2) {
      currentHover = node.id;
      break;
    }
  }
}

// draw the causal nodes
function drawNodes() {
  for (let node of nodes) {
    // Highlight if hovered
    if (currentHover === node.id) {
      stroke(node.borderColor);
      strokeWeight(4);
    } else {
      stroke(node.borderColor);
      strokeWeight(2);
    }
    
    // Draw node circle
    fill(node.color);
    circle(node.x, node.y, node.size);
    
    // Draw node label
    fill(node.textColor);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(20);
    text(node.label, node.x, node.y);
  }
}

// draw the edges between each node
function drawEdges() {
  stroke('black');
  strokeWeight(4);
  fill('#333');
  
  // iterate through all the edges
  for (let edge of edges) {
    let fromNode = nodes.find(n => n.id === edge.from);
    let toNode = nodes.find(n => n.id === edge.to);
    
    if (fromNode && toNode) {
      // Calculate edge positions (from edge of circles, not centers)
      // the angle we leave the circle
      let angle = atan2(toNode.y - fromNode.y, toNode.x - fromNode.x) - .6;
      let fromX = fromNode.x + cos(angle) * (fromNode.size / 2);
      let fromY = fromNode.y + sin(angle) * (fromNode.size / 2);
      // the angle we enter the circle
      let angle2 = atan2(toNode.y - fromNode.y, toNode.x - fromNode.x) + .6;
      let toX = toNode.x - cos(angle2) * (toNode.size / 2);
      let toY = toNode.y - sin(angle2) * (toNode.size / 2);
      
      // Draw curved arrow
      drawCurvedArrow(fromX, fromY, toX, toY, edge.label);
    }
  }
}

function drawCurvedArrow(x1, y1, x2, y2, label) {
  // Calculate center of the circle for reference
  let centerX = canvasWidth / 2;
  let centerY = (drawHeight - 40) / 2 + 20;
  
  // Calculate control point for curve - curve AWAY from center
  let midX = (x1 + x2) / 2;
  let midY = (y1 + y2) / 2;
  
  // Vector from center to midpoint
  let centerToMidX = midX - centerX;
  let centerToMidY = midY - centerY;
  
  // Normalize and extend outward from center
  let centerToMidLength = sqrt(centerToMidX * centerToMidX + centerToMidY * centerToMidY);
  
  // this controls midpoint of the arc between the circles
  let curveOffset = 30; // Distance to curve outward
  
  let controlX = midX + (centerToMidX / centerToMidLength) * curveOffset;
  let controlY = midY + (centerToMidY / centerToMidLength) * curveOffset;
  
  // Draw curved line
  noFill();
  stroke('#333');
  strokeWeight(4);
  bezier(x1, y1, controlX, controlY, controlX, controlY, x2, y2);
  
  // Calculate arrow direction at the end point
  // Use the tangent to the curve at the end point
  let t = 0.95; // Point close to the end for tangent calculation
  let tangentX = 3 * (1-t) * (1-t) * (controlX - x1) + 6 * (1-t) * t * (controlX - controlX) + 3 * t * t * (x2 - controlX);
  let tangentY = 3 * (1-t) * (1-t) * (controlY - y1) + 6 * (1-t) * t * (controlY - controlY) + 3 * t * t * (y2 - controlY);
  
  // Simplified: just use direction from control point to end point
  let arrowAngle = atan2(y2 - controlY, x2 - controlX);
  let arrowSize = 12;
  
  // Draw arrowhead
  fill('#333');
  noStroke();
  push();
  translate(x2, y2);
  rotate(arrowAngle);
  triangle(0, 0, -arrowSize * 1.5, -arrowSize * 0.6, -arrowSize * 1.5, arrowSize * 0.6);
  pop();
  
  // Draw label
  fill('#333');
  noStroke();
  // Adjust label position based on the x-coordinate of the node
  // Align right edge of text to control point if on the left of x-center
  // Alight left edge of text to control point if on the right of x-center
  if (x1 < canvasWidth/2)
    textAlign(RIGHT, CENTER);
  else
    textAlign(LEFT, CENTER);
  textSize(20);
  text(label, controlX, controlY);
}

function drawDescription() {
  let descriptionY = drawHeight + 10;
  let descriptionHeight = controlHeight - 20;
  
  // Display description for hovered node
  if (currentHover) {
    fill('black');
    noStroke();
    textSize(constrain(containerWidth * 0.025, 12, 14));
    textAlign(LEFT, TOP);
    
    // Draw description text
    let descWidth = canvasWidth - 40;
    let description = descriptions[currentHover] || 'No description available';
    text(description, 20, descriptionY, descWidth, descriptionHeight);
  } else {
    // Display instruction when no node is hovered
    fill('#666666');
    noStroke();
    textSize(constrain(containerWidth * 0.025, 12, 16));
    textAlign(CENTER, CENTER);
    text("Hover over the concepts to learn about their role in the AI Flywheel", 
         canvasWidth / 2, descriptionY + descriptionHeight / 2);
  }
}

function windowResized() {
  // Update canvas size when the container resizes
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  
  // Recalculate node positions
  initializeNetwork();
  
  redraw();
}

function updateCanvasSize() {
  // Get the exact dimensions of the container
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);  // Avoid fractional pixels
  canvasWidth = containerWidth;
}