// Curriculum Development Pipeline Interactive Infographic
// Shows detailed descriptions of each step in the curriculum development process upon hover
// Responsive design that adapts to different screen sizes
// Row 1 is primary path to Learning Graph
// Row 2 is book level content
// Row 3 is chapter level content

let containerWidth; // calculated by container
let containerHeight = 600; // fixed height on page
let canvasWidth = 800;

// Variables for the diagram
let boxes = []; // Main workflow boxes
let outputs = []; // Output component boxes  
let currentHover = -1;
let lineStrokeWeight = 2;
let arrowSize = 8;

let boxHeight = 85;
let boxWidth = 130;
let defaultTextSize = 14;
let row1Y = 140;
let row2Y = 280;
let row3Y = 420;

// left margin
let lm = 0.04;
// box X percent canvas width
let pcw = .19

function setup() {
    // Create a canvas to match the parent container's size
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, containerHeight);
    var mainElement = document.querySelector('main');
    canvas.parent(mainElement);
    
    // Initialize the layout (will be updated in updateLayout)
    updateLayout();
    
    describe(
        'Workflow diagraim with hover-over infographic for generating intelligent textbooks using generative AI. The workflows taks a Course Description to Learning Graph and this is used various outputs chapters, glossary, FAQ, Word Cloud, Summaries etc.  Then for each chapter or section we can then generate figures, diagrams, charts, interactive infographics, MicroSims, assessments, graphic novels and assessments.',
        LABEL
    );
}

function updateLayout() {
    // Calculate responsive dimensions based on container width
    let m = max(20, containerWidth * 0.03); // margins
    let boxWidth = containerWidth * 0.15;
    let boxHeight = 50;
    boxWidth = containerWidth * 0.14;
    let outputBoxWidth = containerWidth * 0.16;
    let outputBoxHeight = 62;
    
    // Adjust for very small screens
    if (containerWidth < 400) {
        boxWidth = containerWidth * 0.2;
        outputBoxWidth = containerWidth * 0.18;
    }
    
    // Define the main workflow boxes
    boxes = [
        {
            x: containerWidth * 0.05,
            y: row1Y,
            w: boxWidth,
            h: boxHeight,
            label: "Course\nDescription",
            color: "red",
            tcolor: "white",
            description: "We begin the textbook generation process starting with a detailed course description that outlines target audience, prerequisite, and learning objectives, and the knowledge, and the scope of content to be covered. This document the foundation for all subsequent development stages."
        },
        {
            x: containerWidth * 0.23,
            y: row1Y,
            w: boxWidth,
            h: boxHeight,
            label: "2001 Bloom\nTaxonomy",
            color: "orange",
            tcolor: "black",
            description: "Our second step is the application of the  2001 Bloom's Taxonomy to categorize learning objectives from the course description across six cognitive levels: Remember, Understand, Apply, Analyze, Evaluate, and Create. This provides structure for progressive skill development."
        },
        {
            x: containerWidth * 0.41,
            y: row1Y,
            w: boxWidth,
            h: boxHeight,
            label: "Concept\nEnumeration",
            color: "yellow",
            tcolor: "black",
            description: "Once we have a solid understanding of the course description categoriexed by Bloom's six levels we can then create a precise listing of all key concepts that students need to master. This comprehensive inventory ensures no important topics are overlooked."
        },
        {
            x: containerWidth * 0.59,
            y: row1Y,
            w: boxWidth,
            h: boxHeight,
            label: "Concept\nDependencies",
            color: "green",
            tcolor: "white",
            description: "Next we create the learning order relationships between concepts.  We call these our concept dependency relationships.  They will define learning paths from foundational elements to creational concepts. This creates a structured learning sequence where foundational concepts are taught before advanced topics."
        },
        {
            x: containerWidth * 0.77,
            y: row1Y,
            w: boxWidth,
            h: boxHeight,
            label: "Learning\nGraph",
            color: "purple",
            tcolor: "white",
            description: "FInally, we create a comprehensive Learning Graph that combines dependencies and our taxonomy.  Learning Graphs are used to visualizes the interconnections between concepts, showing pathways through the curriculum. This enables AI to create adaptive learning and personalized education paths customized to the needs of the students."
        },
        {
            x: containerWidth * 0.59,
            y: 60,
            w: boxWidth,
            h: boxHeight,
            label: "Concept\nTaxonomy",
            color: "steelblue",
            tcolor: "white",
            description: "Once we have a list of all the concepts in a course, we can ask generative AI models to suggest a taxonomy that classifies concepts into about a dozen categories. This allows us to colorize each concept and allow the viewer to see patterns in the learning graph."
        },
    ];
  
    // Define the output components
    outputs = [
        {
            x: containerWidth * lm,
            y: row2Y,
            w: outputBoxWidth,
            h: outputBoxHeight,
            label: "Chapters &\nSections",
            color: "lightblue",
            tcolor: "black",
            description: "Structuring content into logical chapters and sections based on concept dependencies. This creates an organized progression through the material with clear milestones and checkpoints."
        },
        {
            x: containerWidth * (lm + pcw),
            y: row2Y,
            w: outputBoxWidth,
            h: outputBoxHeight,
            label: "Glossary of\nTerms",
            color: "lightblue",
            tcolor: "black",
            description: "Compilation of key terminology with clear definitions, ensuring consistent understanding across the curriculum. This reference tool supports comprehension and reduces confusion."
        },
        {
            x: containerWidth * (lm + 2*pcw),
            y: row2Y,
            w: outputBoxWidth,
            h: outputBoxHeight,
            label: "Word Cloud",
            color: "lightblue",
            tcolor: "black",
            description: "Visual representation of key concepts sized by importance or frequency. This provides a quick overview of course themes and helps students identify central ideas."
        },
        {
            x: containerWidth * (lm + 3*pcw),
            y: row2Y,
            w: outputBoxWidth,
            h: outputBoxHeight,
            label: "FAQ",
            color: "lightblue",
            tcolor: "black",
            description: "Anticipatory answers to common student questions organized by topic. This resource helps clarify common misconceptions and provides additional context."
        },
        {
            x: containerWidth * (lm + 4*pcw),
            y: row2Y,
            w: outputBoxWidth,
            h: outputBoxHeight,
            label: "Summaries",
            color: "lightblue",
            tcolor: "black",
            description: "Concise distillations of each major topic, highlighting key takeaways and essential information. These support review and reinforce learning objectives."
        },
        {
            x: containerWidth * lm,
            y: row3Y,
            w: outputBoxWidth,
            h: outputBoxHeight,
            label: "Figures,\nDiagrams,\nCharts",
            color: "lightgreen",
            tcolor: "black",
            description: "Visual learning aids that illustrate complex concepts, show relationships, and provide graphical representations of data. These enhance understanding through multiple learning modalities."
        },
        {
            x: containerWidth * (lm + pcw),
            y: row3Y,
            w: outputBoxWidth,
            h: outputBoxHeight,
            label: "Interactive\nInfographics",
            color: "lightgreen",
            tcolor: "black",
            description: "Dynamic visual presentations that respond to user interaction, allowing exploration of data and concepts. These engage students through hands-on learning experiences."
        },
        {
            x: containerWidth * (lm + 2*pcw),
            y: row3Y,
            w: outputBoxWidth,
            h: outputBoxHeight,
            label: "MicroSims",
            color: "lightgreen",
            tcolor: "black",
            description: "Small-scale simulations that model specific concepts or processes, allowing students to experiment with variables and observe outcomes. These provide experiential learning opportunities."
        },
        {
            x: containerWidth * (lm + 3*pcw),
            y: row3Y,
            w: outputBoxWidth,
            h: outputBoxHeight,
            label: "Graphic Novel\nStories",
            color: "lightgreen",
            tcolor: "black",
            description: "Narrative-based visual content that teaches concepts through storytelling, making complex ideas more memorable and accessible. This approach appeals to diverse learning styles."
        },
        {
            x: containerWidth * (lm + 4*pcw),
            y: row3Y,
            w: outputBoxWidth,
            h: outputBoxHeight,
            label: "Assessments",
            color: "lightgreen",
            tcolor: "black",
            description: "Varied evaluation methods including quizzes, projects, and performance tasks that measure student understanding and progress across Bloom's taxonomy levels."
        }
    ];
}

function draw() {
    // light blue background with a light gray border
    fill('aliceblue');
    stroke('silver');
    rect(0,0, canvasWidth, containerHeight);
    
    // Add title - responsive font size
    let titleSize = constrain(containerWidth * 0.04, 18, 28);
    textSize(titleSize);
    textAlign(CENTER, TOP);
    fill(0);
    strokeWeight(0);
    text("Intelligent Textbook Generation Workflow", containerWidth/2, 20);
    
      // Draw main top workflow boxes
    drawBoxes(boxes);
    
    // TODO - create a data structure to hold all the edges
    // and create a function to draw the edges from the correct side
    // Draw left to right workflow arrows in 
    strokeWeight(lineStrokeWeight);
    stroke('black');
    // all but last
    for (let i = 0; i < boxes.length - 2; i++) {
        let fromX = boxes[i].x + boxes[i].w;
        let fromY = boxes[i].y + boxes[i].h/2;
        let toX = boxes[i+1].x;
        let toY = boxes[i+1].y + boxes[i+1].h/2;
        drawArrow(fromX, fromY, toX, toY);
    }
  
    // Draw arrows from taxonomy
    // Concept Enumeration box
    ce = boxes[2];
    // learning graph box
    lg = boxes[4];
    // Concept Taxonomy box
    ct = boxes[5];
    // Concept Enumeration Top Center point
    cetc = ce.x + ce.w/2;

    // arrow from top of concept enumeration to concept taxonomy
    drawArrow(cetc, boxes[3].y, ct.x, ct.y + boxHeight/4);
    // arrow from right middle of concept taxonomy to top middle of learing graph
    
    drawArrow(ct.x + ct.w, ct.y + boxHeight/4, lg.x + boxWidth/2, lg.y);
     
    // Draw arrow from Learning Graph to outputs
    let learningGraphBox = boxes[boxes.length - 2];
    let learningGraphBottomX = learningGraphBox.x + learningGraphBox.w/2;
    let learningGraphBottomY = learningGraphBox.y + learningGraphBox.h;
    
    // Draw curved arrow to left side outputs
    let curveStartX = learningGraphBottomX;
    let curveStartY = learningGraphBottomY;
    curveEndY = outputs[0].y;
    
    // Draw arrow to 2nd row
    for (let i = 0; i < 5; i++) {
       curveEndX = outputs[i].x + boxWidth/2;
       drawArrow(curveStartX, curveStartY, curveEndX, curveEndY);
    }
  
    // Draw output boxes
    drawBoxes(outputs);
    
    // Draw arrows from Chapters to subsequent outputs
    strokeWeight(lineStrokeWeight);
    stroke('black');
    for (let i = 0; i < 5; i++) {
        drawArrow(outputs[0].x + outputs[0].w/2, outputs[0].y + outputs[0].h,
                 outputs[5+i].x + outputs[5+i].w/2, outputs[5+i].y);
    }
    
    // Calculate description area position
    let descriptionY = row3Y + 80;
    let descriptionHeight = 95;
    
    // Display description text
    if (currentHover != -1) {
        let descTextSize = constrain(containerWidth * 0.02, 12, 16);
        textSize(descTextSize);
        fill(0);
        textAlign(LEFT, TOP);
        noStroke();
        
        // Draw description box
        fill(240);
        rect(10, descriptionY, containerWidth - 20, descriptionHeight);
        
        fill(0);
        let descWidth = containerWidth - 40;
        let description;
        
        if (currentHover < boxes.length) {
            description = boxes[currentHover].description;
        } else {
            description = outputs[currentHover - boxes.length].description;
        }
        
        text(description, 20, descriptionY + 10, descWidth, descriptionHeight - 20);
    } else {
        // Default text when nothing is hovered
        let defaultTextSize = constrain(containerWidth * 0.025, 14, 18);
        textSize(defaultTextSize);
        fill(0);
        noStroke();
        textAlign(CENTER, CENTER);
        text("Hover over components to see detailed descriptions", containerWidth/2, descriptionY + descriptionHeight/4);
    }
}

function drawBoxes(boxArray) {
    let boxTextSize = constrain(containerWidth * 0.02, 12, 16);
    
    for (let i = 0; i < boxArray.length; i++) {
        let b = boxArray[i];
        
        // Check if this box is being hovered
        let isHovered = (mouseX >= b.x && mouseX <= b.x + b.w && 
                        mouseY >= b.y && mouseY <= b.y + b.h);
        
        if (isHovered) {
            currentHover = boxArray === boxes ? i : boxes.length + i;
            stroke('blue');
            strokeWeight(4);
        } else {
            stroke('black');
            strokeWeight(1);
        }
        
        fill(b.color);
        rect(b.x, b.y, b.w, b.h);
        
        fill(b.tcolor);
        strokeWeight(0);
        textAlign(CENTER, CENTER);
        textSize(boxTextSize);
        text(b.label, b.x + b.w/2, b.y + b.h/2);
    }
}

function drawArrow(x1, y1, x2, y2) {
    // Draw the line
    line(x1, y1, x2, y2);
    
    // Calculate arrow head
    let angle = atan2(y2 - y1, x2 - x1);
    push();
    translate(x2, y2);
    rotate(angle);
    fill('black');
    noStroke();
    triangle(-arrowSize*2, -arrowSize, -arrowSize*2, arrowSize, 0, 0);
    pop();
}

function drawCurvedArrow(x1, y1, x2, y2) {
    // Draw curved path from learning graph to left side
    noFill();
    stroke('black');
    strokeWeight(lineStrokeWeight);
    beginShape();
    vertex(x1, y1);
    let cp1x = x1 - 200;
    let cp1y = y1 + 100;
    let cp2x = x2 + 100;
    let cp2y = y2 - 50;
    bezierVertex(cp1x, cp1y, cp2x, cp2y, x2, y2);
    endShape();
    
    // Add arrow head
    let angle = atan2(cp2y - y2, cp2x - x2);
    push();
    translate(x2, y2);
    rotate(angle + PI);
    fill('black');
    noStroke();
    triangle(-arrowSize*2, -arrowSize, -arrowSize*2, arrowSize, 0, 0);
    pop();
}

function mouseMoved() {
    currentHover = -1;
    
    // Check if hovering over concept taxonomy circle
    let circleX = containerWidth / 2;
    let circleY = 100;
    let circleR = containerWidth * 0.1;
    if (dist(mouseX, mouseY, circleX, circleY) < circleR) {
        currentHover = boxes.length;
        return;
    }
    
    // Check boxes
    for (let i = 0; i < boxes.length; i++) {
        let b = boxes[i];
        if (mouseX >= b.x && mouseX <= b.x + b.w && 
            mouseY >= b.y && mouseY <= b.y + b.h) {
            currentHover = i;
            return;
        }
    }
    
    // Check outputs
    for (let i = 0; i < outputs.length; i++) {
        let b = outputs[i];
        if (mouseX >= b.x && mouseX <= b.x + b.w && 
            mouseY >= b.y && mouseY <= b.y + b.h) {
            currentHover = boxes.length + i;
            return;
        }
    }
}

function windowResized() {
    // Update canvas size when the container resizes
    updateCanvasSize();
    updateLayout(); // Recalculate layout based on new size
    resizeCanvas(containerWidth, containerHeight);
    redraw();
}

function updateCanvasSize() {
    // Get the exact dimensions of the container
    const container = document.querySelector('main').getBoundingClientRect();
    containerWidth = Math.floor(container.width);  // Avoid fractional pixels
    canvasWidth = containerWidth;
}