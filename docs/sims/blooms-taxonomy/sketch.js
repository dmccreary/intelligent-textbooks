let canvasWidth = 620;
let canvasHeight = 600; // Increased height to accommodate 6 levels
let currentHover = -1;
let levels = [];

function setup() {
  const canvas = createCanvas(canvasWidth, canvasHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  textSize(16);

  // Define the levels and their properties
  // tcolor is the text color for the level and must contrast with the background color
  levels = [
    {
      level: "Remember",
      color: "#4B0082", // Indigo
      tcolor: "white",
      description: "Remember: Retrieving relevant knowledge from long-term memory, including recognizing and recalling basic concepts, facts, and terminology. In an intelligent textbook, this might involve basic definitions and concept explanations."
    },
    {
      level: "Understand",
      color: "#0000FF", // Blue
      tcolor: "white",
      description: "Understand: Constructing meaning from instructional messages, including interpreting, exemplifying, classifying, summarizing, inferring, comparing, and explaining. This is where MicroSims can first become valuable for demonstrating concepts interactively."
    },
    {
      level: "Apply",
      color: "green",
      tcolor: "black",
      description: "Apply: Carrying out or using procedures in given situations, including executing and implementing learned material in new contexts. Your collection of MicroSims appears particularly strong in supporting this level through interactive demonstrations."
    },
    {
      level: "Analyze",
      color: "gold",
      tcolor: "black",
      description: "Analyze: Breaking material into constituent parts and determining how parts relate to one another and to an overall structure or purpose. This includes differentiating, organizing, and attributing knowledge."
    },
    {
      level: "Evaluate",
      color: "orange",
      tcolor: "black",
      description: "Evaluate: Making judgments based on criteria and standards, including checking and critiquing. Your learning graphs can help students understand how concepts interconnect at this level."
    },
    {
      level: "Create",
      color: "red",
      tcolor: "white",
      description: "Create: Putting elements together to form a coherent or functional whole; reorganizing elements into new patterns or structures. This highest level is where students might modify or create their own MicroSims."
    }
  ];
}

function draw() {
  background('aliceblue');
  
  // Draw triangle sections
  const baseWidth = 500;
  const triangleHeight = 450; // Increased height
  const startX = (canvasWidth - baseWidth) / 2;
  const startY = triangleHeight + 50;
  
  for (let i = 0; i < levels.length; i++) {
    const sectHeight = triangleHeight / levels.length;
    const currentY = startY - (i * sectHeight);
    const currentWidth = baseWidth * (1 - (i / levels.length));
    const currentX = startX + (baseWidth - currentWidth) / 2;
    
    // Store coordinates for hover detection
    levels[i].coords = {
      x: currentX,
      y: currentY - sectHeight,
      w: currentWidth,
      h: sectHeight
    };
    
    // Draw the section
    fill(levels[i].color);
    beginShape();
    vertex(currentX, currentY);
    vertex(currentX + currentWidth, currentY);
    vertex(currentX + currentWidth, currentY - sectHeight);
    vertex(currentX, currentY - sectHeight);
    endShape(CLOSE);
    
    // Add level text
    fill(levels[i].tcolor);
    textAlign(CENTER, CENTER);
    textSize(18); // Slightly smaller text to fit
    text(levels[i].level, currentX + currentWidth/2, currentY - sectHeight/2);
  }
  
  // Title at the top
  fill('black');
  textSize(24);
  textStyle(BOLD);
  text("Bloom's Taxonomy: RUAAEC", canvasWidth/2, 30);
  
  // Display description for hovered section
  if (currentHover !== -1) {
    fill('black');
    textSize(14); // Smaller text for longer descriptions
    textAlign(LEFT, TOP);
    text(levels[currentHover].description, 20, 510, canvasWidth - 40);
  } else {
    // Display instruction when no section is hovered
    fill('#666666');
    textSize(14);
    textAlign(CENTER, TOP);
    text("Hover over each level to see detailed description", canvasWidth/2, 510);
  }
}

function mouseMoved() {
  currentHover = -1;
  for (let i = 0; i < levels.length; i++) {
    const coords = levels[i].coords;
    if (coords && 
        mouseX >= coords.x && 
        mouseX <= coords.x + coords.w && 
        mouseY >= coords.y && 
        mouseY <= coords.y + coords.h) {
      currentHover = i;
      break;
    }
  }
}