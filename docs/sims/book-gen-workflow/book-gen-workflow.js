// Curriculum Development Pipeline Interactive Infographic
// Updated: Adds clickable boxes that open URLs in a new tab and changes
// cursor to a pointer when hovering over a box with an associated URL.
// Responsive design that adapts to different screen sizes.
// Row 1 is primary path to Learning Graph
// Row 2 is book‑level content
// Row 3 is chapter‑level content

// ---------------------------------------------------------------------
// Global layout variables
// ---------------------------------------------------------------------
let containerWidth;                // Calculated from container
let containerHeight = 600;         // Fixed height on page
let canvasWidth = 800;             // Initial width – updated responsively

// Box and diagram styling
let boxes = [];                    // Main workflow boxes
let outputs = [];                  // Output component boxes
let currentHover = -1;             // Index of currently hovered box
let lineStrokeWeight = 2;          // Thickness of connecting lines
let arrowSize = 8;                 // Size of arrowheads

// Box sizes – recalculated in updateLayout()
let boxHeight = 85;
let boxWidth  = 130;
const defaultTextSize = 14;
const row1Y = 140;
const row2Y = 280;
const row3Y = 420;

// Layout helpers
const lm  = 0.04;   // Left margin (as fraction of width)
const pcw = 0.19;   // Column width fraction for outputs

// ---------------------------------------------------------------------
// p5.js setup – called once at page load
// ---------------------------------------------------------------------
function setup() {
    updateCanvasSize();                                   // Get parent <main> dims
    const canvas = createCanvas(containerWidth, containerHeight);
    canvas.parent(document.querySelector('main'));

    updateLayout();                                       // Build initial layout

    describe(
        'Workflow diagram with hover‑over infographic for generating intelligent textbooks using generative AI. The workflow takes a Course Description to a Learning Graph, which then powers various outputs (chapters, glossary, FAQ, word cloud, summaries, figures, diagrams, micro‑sims, graphic novels, assessments). Hover for details, click boxes with links to open documentation.',
        LABEL
    );
}

// ---------------------------------------------------------------------
// Recalculate all box positions & sizes based on current width
// ---------------------------------------------------------------------
function updateLayout() {
    // Responsive dimensions
    const margin = max(20, containerWidth * 0.03);
    boxWidth  = containerWidth * 0.14;
    boxHeight = 50;
    let outputBoxWidth  = containerWidth * 0.16;
    let outputBoxHeight = 62;

    if (containerWidth < 400) {                          // Small screens tweaks
        boxWidth        = containerWidth * 0.20;
        outputBoxWidth  = containerWidth * 0.18;
    }

    // -----------------------------------------------------------------
    // Main workflow boxes (row 1 + taxonomy box)
    // -----------------------------------------------------------------
    boxes = [
        {
            x: containerWidth * 0.05,
            y: row1Y,
            w: boxWidth,
            h: boxHeight,
            label: 'Course\nDescription',
            color: 'red',
            tcolor: 'white',
            description: 'We begin the textbook generation process starting with a detailed course description that outlines the target audience, prerequisites, learning objectives, and scope of content. This document forms the foundation for all subsequent development stages.',
            url: 'https://dmccreary.github.io/intelligent-textbooks/workflow/course-description/'
        },
        {
            x: containerWidth * 0.23,
            y: row1Y,
            w: boxWidth,
            h: boxHeight,
            label: '2001 Bloom\nTaxonomy',
            color: 'orange',
            tcolor: 'black',
            description: "Apply the 2001 Bloom's Taxonomy to categorize learning objectives across six cognitive levels: Remember, Understand, Apply, Analyze, Evaluate, and Create. This scaffolds progressive skill development.",
            url: 'https://dmccreary.github.io/intelligent-textbooks/workflow/course-description/'
        },
        {
            x: containerWidth * 0.41,
            y: row1Y,
            w: boxWidth,
            h: boxHeight,
            label: 'Concept\nEnumeration',
            color: 'yellow',
            tcolor: 'black',
            description: "Create a precise inventory of all key concepts students must master. This comprehensive list ensures no important topic is overlooked.",
            url: 'https://dmccreary.github.io/intelligent-textbooks/workflow/concept-enumeration/'
        },
        {
            x: containerWidth * 0.59,
            y: row1Y,
            w: boxWidth,
            h: boxHeight,
            label: 'Concept\nDependencies',
            color: 'green',
            tcolor: 'white',
            description: "Define learning‑order relationships between concepts. These dependencies establish a structured sequence where foundational concepts precede advanced topics.",
            url: 'https://dmccreary.github.io/intelligent-textbooks/workflow/concept-depenencies/'
        },
        {
            x: containerWidth * 0.77,
            y: row1Y,
            w: boxWidth,
            h: boxHeight,
            label: 'Learning\nGraph',
            color: 'purple',
            tcolor: 'white',
            description: 'Combine dependencies and taxonomy into a comprehensive Learning Graph that visualizes interconnections between concepts. This enables AI‑driven adaptive learning paths.',
            url: 'https://dmccreary.github.io/intelligent-textbooks/workflow/learning-graph/'
        },
        {
            x: containerWidth * 0.59,
            y: 60,
            w: boxWidth,
            h: boxHeight,
            label: 'Concept\nTaxonomy',
            color: 'steelblue',
            tcolor: 'white',
            description: 'Generate a taxonomy that classifies concepts into categories, enabling color‑coding in the Learning Graph to reveal structural patterns.',
            url: 'https://dmccreary.github.io/intelligent-textbooks/workflow/concept-taxonomy/'
        }
    ];

    // -----------------------------------------------------------------
    // Output component boxes (rows 2 & 3)
    // -----------------------------------------------------------------
    outputs = [
        // Row 2
        {
            x: containerWidth * lm,
            y: row2Y,
            w: outputBoxWidth,
            h: outputBoxHeight,
            label: 'Chapters &\nSections',
            color: 'lightblue',
            tcolor: 'black',
            description: 'Structure content into logical chapters and sections based on concept dependencies, creating an organized progression with clear milestones.',
            url: 'https://dmccreary.github.io/intelligent-textbooks/workflow/chapters-and-sections/'
        },
        {
            x: containerWidth * (lm + pcw),
            y: row2Y,
            w: outputBoxWidth,
            h: outputBoxHeight,
            label: 'Glossary of\nTerms',
            color: 'lightblue',
            tcolor: 'black',
            description: 'Generate precise ISO‑11179 definitions for each concept to ensure consistent understanding across the curriculum.',
            url: 'https://dmccreary.github.io/intelligent-textbooks/workflow/glossary/'
        },
        {
            x: containerWidth * (lm + 2 * pcw),
            y: row2Y,
            w: outputBoxWidth,
            h: outputBoxHeight,
            label: 'Word Cloud',
            color: 'lightblue',
            tcolor: 'black',
            description: 'Visualize key concepts sized by importance or frequency, providing a quick overview of course themes.',
            url: 'https://dmccreary.github.io/intelligent-textbooks/workflow/word-cloud/'
        },
        {
            x: containerWidth * (lm + 3 * pcw),
            y: row2Y,
            w: outputBoxWidth,
            h: outputBoxHeight,
            label: 'FAQ',
            color: 'lightblue',
            tcolor: 'black',
            description: 'Provide anticipatory answers to common student questions, clarifying misconceptions and offering additional context.',
            url: 'https://dmccreary.github.io/intelligent-textbooks/workflow/faq/'
        },
        {
            x: containerWidth * (lm + 4 * pcw),
            y: row2Y,
            w: outputBoxWidth,
            h: outputBoxHeight,
            label: 'Summaries',
            color: 'lightblue',
            tcolor: 'black',
            description: 'Concise distillations of each major topic highlighting key takeaways to support review and reinforce learning objectives.',
            url: 'https://dmccreary.github.io/intelligent-textbooks/workflow/summaries/'
        },
        // Row 3
        {
            x: containerWidth * lm,
            y: row3Y,
            w: outputBoxWidth,
            h: outputBoxHeight,
            label: 'Figures,\nDiagrams,\nCharts',
            color: 'lightgreen',
            tcolor: 'black',
            description: 'Visual aids that illustrate complex concepts and data relationships, enhancing comprehension through multiple modalities.',
            url: 'https://dmccreary.github.io/intelligent-textbooks/workflow/figures-diagrams-charts/'
        },
        {
            x: containerWidth * (lm + pcw),
            y: row3Y,
            w: outputBoxWidth,
            h: outputBoxHeight,
            label: 'Interactive\nInfographics',
            color: 'lightgreen',
            tcolor: 'black',
            description: 'Dynamic visuals that respond to user interaction, allowing exploration of data and concepts for hands‑on learning.'
        },
        {
            x: containerWidth * (lm + 2 * pcw),
            y: row3Y,
            w: outputBoxWidth,
            h: outputBoxHeight,
            label: 'MicroSims',
            color: 'lightgreen',
            tcolor: 'black',
            description: 'Small‑scale simulations where students experiment with variables and observe outcomes, providing experiential learning.',
            url: 'https://dmccreary.github.io/intelligent-textbooks/workflow/microsims/'
        },
        {
            x: containerWidth * (lm + 3 * pcw),
            y: row3Y,
            w: outputBoxWidth,
            h: outputBoxHeight,
            label: 'Graphic Novel\nStories',
            color: 'lightgreen',
            tcolor: 'black',
            description: 'Narrative‑based visual content that teaches concepts through storytelling, appealing to diverse learning styles.',
            url: 'https://dmccreary.github.io/intelligent-textbooks/workflow/graphic-novel/'
        },
        {
            x: containerWidth * (lm + 4 * pcw),
            y: row3Y,
            w: outputBoxWidth,
            h: outputBoxHeight,
            label: 'Assessments',
            color: 'lightgreen',
            tcolor: 'black',
            description: 'Quizzes, projects, and performance tasks that measure student understanding and progress across Bloom\'s levels.',
            url: 'https://dmccreary.github.io/intelligent-textbooks/workflow/assessments/'
        }
    ];
}

// ---------------------------------------------------------------------
// Main draw loop – renders diagram each frame
// ---------------------------------------------------------------------
function draw() {
    // Background with subtle border
    fill('aliceblue');
    stroke('silver');
    rect(0, 0, canvasWidth, containerHeight);

    // Title – responsive size
    let titleSize = constrain(containerWidth * 0.04, 18, 28);
    textSize(titleSize);
    textAlign(CENTER, TOP);
    fill(0);
    noStroke();
    text('Intelligent Textbook Generation Workflow', containerWidth / 2, 20);

    // Render boxes & connecting arrows
    drawBoxes(boxes);
    drawTopWorkflowArrows();
    drawBoxToOutputArrows();
    drawBoxes(outputs);

    // Description area below rows
    renderDescriptionBox();
}

// ---------------------------------------------------------------------
// Render helper functions
// ---------------------------------------------------------------------
function drawBoxes(arr) {
    const txtSize = constrain(containerWidth * 0.02, 12, 16);

    for (let i = 0; i < arr.length; i++) {
        const b = arr[i];
        const isHovered = mouseX >= b.x && mouseX <= b.x + b.w && mouseY >= b.y && mouseY <= b.y + b.h;

        stroke(isHovered ? 'blue' : 'black');
        strokeWeight(isHovered ? 4 : 1);
        fill(b.color);
        rect(b.x, b.y, b.w, b.h);

        fill(b.tcolor);
        noStroke();
        textSize(txtSize);
        textAlign(CENTER, CENTER);
        text(b.label, b.x + b.w / 2, b.y + b.h / 2);
    }
}

// Draw left‑to‑right arrows for the main workflow (row 1 + taxonomy)
function drawTopWorkflowArrows() {
    strokeWeight(lineStrokeWeight);
    stroke(0);

    // Sequential arrows in row 1 (boxes[0] … boxes[4])
    for (let i = 0; i < boxes.length - 2; i++) {
        const from = boxes[i];
        const to   = boxes[i + 1];
        drawArrow(from.x + from.w, from.y + from.h / 2, to.x, to.y + to.h / 2);
    }

    // Arrow Concept Enumeration → Concept Taxonomy
    const ce = boxes[2];
    const ct = boxes[5];
    drawArrow(ce.x + ce.w / 2, ce.y, ct.x, ct.y + boxHeight / 4);

    // Arrow Concept Taxonomy → Learning Graph
    const lg = boxes[4];
    drawArrow(ct.x + ct.w, ct.y + boxHeight / 4, lg.x + boxWidth / 2, lg.y);
}

// Arrows from Learning Graph to output boxes & between outputs
function drawBoxToOutputArrows() {
    const lg = boxes[4];
    const startX = lg.x + lg.w / 2;
    const startY = lg.y + lg.h;

    // Down to second row
    for (let i = 0; i < 5; i++) {
        const out = outputs[i];
        drawArrow(startX, startY, out.x + out.w / 2, out.y);
    }

    // Chapters & Sections → row 3 outputs
    const chapters = outputs[0];
    for (let i = 0; i < 5; i++) {
        const out = outputs[5 + i];
        drawArrow(chapters.x + chapters.w / 2, chapters.y + chapters.h, out.x + out.w / 2, out.y);
    }
}

// Draw arrow with arrowhead
function drawArrow(x1, y1, x2, y2) {
    line(x1, y1, x2, y2);
    const angle = atan2(y2 - y1, x2 - x1);
    push();
    translate(x2, y2);
    rotate(angle);
    fill(0);
    noStroke();
    triangle(-arrowSize * 2, -arrowSize, -arrowSize * 2, arrowSize, 0, 0);
    pop();
}

// Render description panel beneath the diagram
function renderDescriptionBox() {
    const descriptionY = row3Y + 80;
    const descriptionHeight = 95;

    // Panel background
    // light gray
    fill(240);
    stroke(200);
    rect(10, descriptionY, containerWidth - 20, descriptionHeight);

    noStroke();
    fill(0);
    textSize(constrain(containerWidth * 0.02, 12, 16));
    textAlign(LEFT, TOP);

    if (currentHover !== -1) {
        const desc = currentHover < boxes.length
            ? boxes[currentHover].description
            : outputs[currentHover - boxes.length].description;
        text(desc, 20, descriptionY + 10, containerWidth - 40, descriptionHeight - 20);
    } else {
        textAlign(CENTER, CENTER);
        textSize(constrain(containerWidth * 0.025, 14, 18));
        text('Hover over components to see detailed descriptions.\nClick on a component to learn more in a new tab.', containerWidth / 2, descriptionY + descriptionHeight / 2);
    }
}

// ---------------------------------------------------------------------
// Interaction handlers
// ---------------------------------------------------------------------
// Change cursor & set currentHover while moving mouse
function mouseMoved() {
    currentHover = -1;
    let hoverOnLink = false;

    // -----------------------------------------------------------------
    // Check boxes
    // -----------------------------------------------------------------
    for (let i = 0; i < boxes.length; i++) {
        const b = boxes[i];
        if (mouseX >= b.x && mouseX <= b.x + b.w && mouseY >= b.y && mouseY <= b.y + b.h) {
            currentHover = i;
            if (b.url) hoverOnLink = true;
            break;
        }
    }

    // -----------------------------------------------------------------
    // Check outputs if nothing matched yet
    // -----------------------------------------------------------------
    if (currentHover === -1) {
        for (let i = 0; i < outputs.length; i++) {
            const b = outputs[i];
            if (mouseX >= b.x && mouseX <= b.x + b.w && mouseY >= b.y && mouseY <= b.y + b.h) {
                currentHover = boxes.length + i;
                if (b.url) hoverOnLink = true;
                break;
            }
        }
    }

    // Cursor feedback
    cursor(hoverOnLink ? 'pointer' : 'default');
}

// On click – open URL in new tab if box has one
function mousePressed() {
    // Boxes
    for (let i = 0; i < boxes.length; i++) {
        const b = boxes[i];
        if (mouseX >= b.x && mouseX <= b.x + b.w && mouseY >= b.y && mouseY <= b.y + b.h) {
            if (b.url) window.open(b.url, '_blank');
            return;
        }
    }
    // Outputs
    for (let i = 0; i < outputs.length; i++) {
        const b = outputs[i];
        if (mouseX >= b.x && mouseX <= b.x + b.w && mouseY >= b.y && mouseY <= b.y + b.h) {
            if (b.url) window.open(b.url, '_blank');
            return;
        }
    }
}

// ---------------------------------------------------------------------
// Responsive handling
// ---------------------------------------------------------------------
function windowResized() {
    updateCanvasSize();
    updateLayout();
    resizeCanvas(containerWidth, containerHeight);
    redraw();
}

function updateCanvasSize() {
    const rect = document.querySelector('main').getBoundingClientRect();
    containerWidth = Math.floor(rect.width);
    canvasWidth    = containerWidth;
}
