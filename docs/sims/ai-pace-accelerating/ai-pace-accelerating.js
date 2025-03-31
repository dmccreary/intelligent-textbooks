// AI Pace Accelerating - Innovation Timeline MicroSim
// https://editor.p5js.org/dmccreary/sketches/bN-pfoUih
// Canvas dimensions
let canvasWidth = 800;
let drawHeight = 400;
let controlHeight = 70;
let canvasHeight = drawHeight + controlHeight;
let margin = 50;
let defaultTextSize = 16;

// Global variables for responsive design
let containerWidth; // calculated by container upon resize
let containerHeight = canvasHeight; // fixed height on page

// Timeline data structure
let events = [
  { year: 1956, name: "Dartmouth Conference", description: "The term 'Artificial Intelligence' was first coined at this conference, marking the formal founding of AI as a field of research." },
  { year: 1966, name: "ELIZA", description: "Joseph Weizenbaum's ELIZA, one of the first natural language processing programs, simulated conversation using simple pattern matching." },
  { year: 1980, name: "Expert Systems", description: "Expert systems became commercially viable, using rule-based approaches to solve complex problems in specific domains such as medical diagnosis." },
  { year: 1990, name: "Machine Learning Focus", description: "The field shifted from rule-based systems toward machine learning approaches as computational power increased." },
  { year: 1997, name: "Deep Blue", description: "IBM's Deep Blue defeated world chess champion Garry Kasparov, demonstrating that AI could outperform humans in specific complex tasks." },
  { year: 2001, name: "Semantic Web", description: "Tim Berners-Lee published 'The Semantic Web' in Scientific American, proposing a machine-readable web of data." },
  { year: 2006, name: "Deep Learning Revival", description: "Geoffrey Hinton published research on deep neural networks, reigniting interest in deep learning approaches." },
  { year: 2011, name: "Watson Wins Jeopardy!", description: "IBM's Watson defeated human champions on Jeopardy!, showcasing advanced natural language processing capabilities." },
  { year: 2012, name: "AlexNet", description: "AlexNet dramatically improved image recognition accuracy in the ImageNet competition, triggering the deep learning revolution." },
  { year: 2014, name: "GANs Introduced", description: "Ian Goodfellow introduced Generative Adversarial Networks (GANs), enabling AI to create realistic synthetic data." },
  { year: 2016, name: "AlphaGo", description: "DeepMind's AlphaGo defeated world champion Lee Sedol at Go, a game with far more complexity than chess." },
  { year: 2017, name: "Transformer Architecture", description: "Google introduced the Transformer architecture in 'Attention Is All You Need', revolutionizing NLP tasks." },
  { year: 2018, name: "BERT", description: "Google released BERT (Bidirectional Encoder Representations from Transformers), significantly advancing NLP capabilities." },
  { year: 2020, name: "GPT-3", description: "OpenAI released GPT-3, demonstrating remarkable language generation abilities with 175 billion parameters." },
  { year: 2021, name: "DALL-E", description: "OpenAI introduced DALL-E, generating images from text descriptions with unprecedented quality." },
  { year: 2022, name: "ChatGPT", description: "OpenAI released ChatGPT, bringing conversational AI to the mainstream and accelerating AI adoption globally." },
  { year: 2023, name: "Llama Open Source", description: "Meta open-sourced the Llama LLM, democratizing access to powerful language models and spurring innovation." },
  { year: 2023, name: "DeepSeek R1", description: "DeepSeek released R1, a research-focused model that advanced AI capabilities in reasoning and scientific understanding." },
  { year: 2024, name: "Claude 3", description: "Anthropic released Claude 3, with breakthrough performance on reasoning, instruction following, and knowledge tasks." },
  { year: 2024, name: "Cursor", description: "Cursor AI coding assistant integrated reasoning capabilities to generate and explain code with unprecedented accuracy." },
  { year: 2024, name: "AI Coding Survey", description: "Y-Combinator survey revealed that 25% of startups use AI to generate over 95% of their code, marking a productivity revolution." },
  { year: 2025, name: "Codium LightSpeed", description: "Codium LightSpeed introduced AI that writes entire applications from verbal descriptions with minimal human intervention." },
  { year: 2025, name: "Vibe Coding", description: "Vibe Coding emerged as a paradigm where developers describe desired functionality using natural language, emotions, and aesthetic preferences." }
];

// UI Controls
let timeScaleSlider;
let hoverEvent = null;

function setup() {
  // Create a canvas to match the parent container's size
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);
  
  // Create timeline scale slider
  timeScaleSlider = createSlider(0, 100, 50, 1);
  timeScaleSlider.position(margin + 140, drawHeight + 25);
  timeScaleSlider.size(containerWidth - margin - 180);
  
  describe('An AI innovation timeline visualization showing the accelerating pace of AI breakthroughs.', LABEL);
}

function draw() {
  // Draw area
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
  textSize(28);
  textAlign(CENTER, TOP);
  text("Accelerating Pace of AI Innovation", canvasWidth/2, 15);
  
  // Draw control labels
  fill('black');
  noStroke();
  textSize(defaultTextSize);
  textAlign(LEFT, CENTER);
  text("Visualization Scale:", margin, drawHeight + 35);
  text("Linear", margin + 140, drawHeight + 50);
  textAlign(RIGHT, CENTER);
  text("Logarithmic", containerWidth - 40, drawHeight + 50);
  
  // Draw timeline
  drawTimeline();
  
  // Draw hover information if applicable
  if (hoverEvent !== null) {
    drawEventInfo(hoverEvent);
  }
}

function drawTimeline() {
  // Set up timeline area
  let timelineY = drawHeight - margin - 50;
  let timelineHeight = 150;
  let startX = margin*2;
  let endX = canvasWidth - margin;
  let timelineWidth = endX - startX;
  
  push();
  translate(10, 50);
  // Draw timeline axis
  stroke('black');
  strokeWeight(2);
  line(startX, timelineY, endX, timelineY);
  
  // Get time range
  let minYear = Math.min(...events.map(e => e.year));
  let maxYear = Math.max(...events.map(e => e.year));
  let timeRange = maxYear - minYear;
  
  // Calculate scale factor based on slider
  let scaleFactor = timeScaleSlider.value() / 100;
  
  // Draw year x axis markers
  let yearStep = 5;
  textAlign(CENTER, TOP);
  textSize(12);
  fill('black');
  noStroke();
  
  for (let year = minYear; year <= maxYear; year += yearStep) {
    // Apply scaling to position
    let x;
    if (scaleFactor < 0.5) {
      // More linear
      let linearFactor = 1 - (scaleFactor * 2);
      let logFactor = scaleFactor * 2;
      
      let linearX = map(year, minYear, maxYear, startX, endX);
      let normalizedYear = (year - minYear) / timeRange;
      let expYear = Math.pow(normalizedYear, 3); // Exponential scaling
      let logX = map(expYear, 0, 1, startX, endX);
      
      x = linearX * linearFactor + logX * logFactor;
    } else {
      // More logarithmic/exponential
      let normalizedYear = (year - minYear) / timeRange;
      let power = 1 + (scaleFactor - 0.5) * 5; // Adjust power based on slider
      let expYear = Math.pow(normalizedYear, power);
      x = map(expYear, 0, 1, startX, endX);
    }
    
    // Draw tick
    stroke('black');
    strokeWeight(1);
    line(x, timelineY, x, timelineY + 5);
    
    // Draw year label
    noStroke();
    fill('black');
    text(year, x, timelineY + 10);
  }
  
  // Draw events
  for (let i = 0; i < events.length; i++) {
    let event = events[i];
    
    // Apply scaling to position
    let x;
    if (scaleFactor < 0.5) {
      // More linear
      let linearFactor = 1 - (scaleFactor * 2);
      let logFactor = scaleFactor * 2;
      
      let linearX = map(event.year, minYear, maxYear, startX, endX);
      let normalizedYear = (event.year - minYear) / timeRange;
      let expYear = Math.pow(normalizedYear, 3); // Exponential scaling
      let logX = map(expYear, 0, 1, startX, endX);
      
      x = linearX * linearFactor + logX * logFactor;
    } else {
      // More logarithmic/exponential
      let normalizedYear = (event.year - minYear) / timeRange;
      let power = 1 + (scaleFactor - 0.5) * 5; // Adjust power based on slider
      let expYear = Math.pow(normalizedYear, power);
      x = map(expYear, 0, 1, startX, endX);
    }
    
    // Draw event line - increasingly taller as time progresses
    strokeWeight(2);
    
    // Color lines by era
    if (event.year < 2000) {
      stroke(70, 130, 180); // Steel blue for early era
    } else if (event.year < 2015) {
      stroke(60, 179, 113); // Medium sea green for middle era
    } else if (event.year < 2023) {
      stroke(255, 140, 0);  // Dark orange for recent era
    } else {
      stroke(220, 20, 60);  // Crimson for current/future era
    }
    
    // Make line height grow exponentially with time
    // Earlier events get shorter lines, recent events get much taller lines
    let normalizedYear = (event.year - minYear) / timeRange;
    let heightFactor = Math.pow(normalizedYear, 1.5); // Adjust power to control height growth
    let lineHeight = map(heightFactor, 0, 1, 50, timelineHeight * 1.5);
    
    line(x, timelineY, x, timelineY - lineHeight);
    
    // Draw event circle
    fill(255);
    ellipse(x, timelineY - lineHeight, 10, 10);
    
    // Check for hover
    if (dist(mouseX, mouseY, x, timelineY - lineHeight) < 10 || 
        (mouseX > x - 5 && mouseX < x + 5 && 
         mouseY > timelineY - lineHeight && mouseY < timelineY)) {
      hoverEvent = {
        event: event,
        x: x,
        y: timelineY - lineHeight
      };
    }
    
    // Draw name label (rotated downward to the right)
    push();
    translate(x, timelineY - lineHeight - 10);
    rotate(PI/4); // Changed rotation direction to slant downward
    fill('black');
    noStroke();
    textSize(11);
    textAlign(RIGHT, CENTER); // Changed alignment to RIGHT
    text(event.name, 0, 0);
    pop();
    
    // Draw year label above event circle
    //fill('black');
    //noStroke();
    //textSize(10);
    //textAlign(CENTER, BOTTOM);
    //text(event.year, x, timelineY - lineHeight - 5);
  }
  pop();
}

function drawEventInfo(eventData) {
  let event = eventData.event;
  let x = eventData.x;
  let y = eventData.y;
  
  // Calculate box position based on mouse position
  let boxX = x + 20;
  let boxY = y - 20;
  let boxWidth = 300;
  let boxHeight = 100;
  
  // Adjust box position to keep it within canvas
  if (boxX + boxWidth > canvasWidth - 10) {
    boxX = x - boxWidth - 20;
  }
  if (boxY + boxHeight > drawHeight - 10) {
    boxY = y - boxHeight - 20;
  }
  if (boxY < 10) {
    boxY = 10;
  }
  
  // Draw info box
  fill(255, 255, 220);
  stroke(100);
  strokeWeight(1);
  rect(boxX, boxY, boxWidth, boxHeight, 5);
  
  // Draw event info
  fill(0);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(18);
  text(event.name + " (" + event.year + ")", boxX + 10, boxY + 10);
  textSize(14);
  textLeading(18);
  text(event.description, boxX + 10, boxY + 35, boxWidth - 20, boxHeight - 45);
}

function mouseMoved() {
  hoverEvent = null;
}

function windowResized() {
  // Update canvas size when the container resizes
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  redraw();
  
  // Resize slider to match the new canvasWidth
  timeScaleSlider.size(containerWidth - margin - 180);
  timeScaleSlider.position(margin + 140, drawHeight + 25);
}

function updateCanvasSize() {
  // Get the exact dimensions of the container
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);  // Avoid fractional pixels
  canvasWidth = containerWidth;
}