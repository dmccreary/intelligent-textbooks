// animation of the five levels of intelligent textbooks
// stairstep diagram with Level 1 (Static) at the bottom
let canvasWidth = 620;
let canvasHeight = 510;
let layers = [];
let descriptions = [];
let currentHover = -1;
let m = 20; // margins around the steps
let mt = 50; // margin from the top
let sw = 60; // next step width
let step_width = 120; // total step width
let sh = 60;

function setup() {
  const canvas = createCanvas(canvasWidth, canvasHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  textSize(16);

  // Define the layers and labels with colors representing increasing intelligence
  layers = [
    {x: m,      y: sh*4+mt, w: step_width*6-2*sw, h: 60, level: "Level 1 - Static Textbooks", color: "red", tcolor: "white" },  
    {x: sw+m,   y: sh*3+mt, w: step_width*5-sw,   h: 60, level: "Level 2 - Interactive Content", color: "#4682B4", tcolor: "white" },
    {x: sw*2+m, y: sh*2+mt, w: step_width*4,      h: 60, level: "Level 3 - Adaptive Textbooks", color: "#20B2AA", tcolor: "white" },
    {x: sw*3+m, y: sh*1+mt, w: step_width*4-sw,   h: 60, level: "L4 - Chatbot Integration", color: "#9370DB", tcolor: "white" },
    {x: sw*4+m, y: mt,      w: step_width*3,      h: 60, level: "L5 - Autonomous AI", color: "gold", tcolor: "black" }
  ];

  descriptions = [
    "Level 1: Static Textbooks are traditional printed or digital formats with no interactive elements. They are composed purely of text and static images, with fixed content that doesn't adapt to the learner. Over 90% of textbooks used by college students today remain at Level 1. They're suitable for simple content delivery where interaction isn't necessary.",
    
    "Level 2: Interactive Content Textbooks incorporate digital elements that engage readers beyond passive consumption. Features include keyword search, hyperlinks, embedded videos, simple quizzes, AI-generated MicroSims, detailed glossary, social sharing compatibility, and usage analytics. These textbooks are cost-effective enhancements that improve engagement with multimedia elements.",
    
    "Level 3: Adaptive Textbooks dynamically adjust content based on user input, performance, and behavior. They use personalized learning pathways through deterministic rules, concept graph traversal algorithms, content selection based on assessment performance, and continuous recording of concept mastery. Implementation requires data management systems, graph algorithms, and raises privacy considerations.",
    
    "Level 4: Textbooks with Chatbots integrate intelligent conversational interfaces providing real-time assistance. They use Large Language Models (LLMs) as tutoring assistants, employ GraphRAG architecture combining multiple AI technologies, and provide real-time feedback on student questions. These systems can balance between powerful LLMs and cost-effective smaller models for privacy and efficiency.",
    
    "Level 5: Autonomous AI Textbooks represent the future of educational content where AI-driven systems fully understand individual learner needs and autonomously generate personalized learning experiences. They feature deep understanding of student knowledge, real-time generation of customized lessons, complete adaptability to learning styles, and human-like tutoring capabilities. This level remains aspirational, requiring advanced hardware and more reliable LLMs."
  ];
}

function draw() {
  background('aliceblue');
  
  // Draw layers and add labels
  textSize(24);
  textAlign(CENTER, CENTER);
  for (let i = 0; i < layers.length; i++) {
    let l = layers[i];
    fill(l.color);
    
    // Highlight the currently hovered step
    if (i === currentHover) {
      stroke('black');
      strokeWeight(4);
    } else {
      stroke(0);
      strokeWeight(0);
    }

    
    rect(l.x, l.y, l.w, l.h);
    fill(l.tcolor);
    strokeWeight(0);
    text(l.level, l.x + l.w / 2, l.y + l.h / 2);
  }

  // Display description text under the step diagram
  if (currentHover != -1) {
    textSize(16);
    fill(0);
    textAlign(LEFT, TOP);
    noStroke();
    let vertcial_offset = 370;
    text(descriptions[currentHover], 20, vertcial_offset, 560, 200);
  } else {
    // Default text when nothing is hovered
    textSize(18);
    fill(0);
    textAlign(CENTER, CENTER);
    text("Hover over a level to see details", width/2, 380);
  }
  
  // Add title
  textSize(22);
  textAlign(CENTER, TOP);
  fill(0);
  strokeWeight(0);
  text("The Five Levels of Intelligent Textbooks", width/2, 10);
}

function mouseMoved() {
  currentHover = -1;
  for (let i = 0; i < layers.length; i++) {
    let l = layers[i];
    if (mouseX >= l.x && mouseX <= l.x + l.w && mouseY >= l.y && mouseY <= l.y + l.h) {
      currentHover = i;
      break;
    }
  }
}