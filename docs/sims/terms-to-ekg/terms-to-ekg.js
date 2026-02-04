// Knowledge Graph Evolution Interactive Infographic
// Shows the progression from simple terms list to Real-Time EKG
// Hover over boxes to see descriptions, click to visit glossary

let containerWidth; // calculated by container
let containerHeight = 620; // fixed height on page
let canvasWidth = 600;

// Variables for the diagram
let stages = [];
let currentHover = -1;
let boxWidth = 220;
let boxHeight = 40;
let verticalSpacing = 15;
let margin = 20;
let arrowSize = 8;
let lineStrokeWeight = 2;
let descBoxWidth = 340; // width of description box on right
let descBoxMargin = 20; // margin between stages and description

function setup() {
    // Create a canvas to match the parent container's size
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, containerHeight);
    var mainElement = document.querySelector('main');
    canvas.parent(mainElement);
    
    // Initialize the layout
    updateLayout();
    
    describe(
        'Interactive infographic showing the evolution from a simple terms list to a Real-Time Enterprise Knowledge Graph. Hover over stages to see descriptions, click to visit the glossary.',
        LABEL
    );
}

function updateLayout() {
    // Calculate responsive dimensions
    let stagesAreaWidth = containerWidth * 0.45; // left side for stages
    boxWidth = min(220, stagesAreaWidth - 2 * margin);
    descBoxWidth = containerWidth - stagesAreaWidth - 3 * margin;
    
    // Calculate starting Y position to center the diagram vertically
    let totalHeight = 10 * boxHeight + 9 * verticalSpacing;
    let startY = margin + 60; // account for title
    
    // Define all stages with their properties
    stages = [
        {
            name: "Terms List",
            url: "terms-list",
            color: "#FFE6E6",
            borderColor: "#CC0000",
            description: "Terms List: A simple inventory of business terms and acronyms without definitions. This is typically the starting point - a raw collection of vocabulary used within an organization, often inconsistently defined or understood by different teams."
        },
        {
            name: "Business Glossary",
            url: "business-glossary",
            color: "#FFE6CC",
            borderColor: "#CC6600",
            description: "Business Glossary: Terms with informal, human-readable definitions. These definitions may vary between departments and lack the precision needed for technical implementation, but they establish a common understanding of business vocabulary."
        },
        {
            name: "Controlled Vocabulary",
            url: "controlled-vocabulary",
            color: "#FFFFCC",
            borderColor: "#999900",
            description: "Controlled Vocabulary: Terms with approved, standardized definitions following ISO-11179 naming conventions. Each term has a single, authoritative definition that everyone in the organization agrees to use, reducing ambiguity and improving communication."
        },
        {
            name: "Taxonomy",
            url: "taxonomy",
            color: "#E6FFCC",
            borderColor: "#669900",
            description: "Taxonomy: A hierarchical classification system where terms have broader/narrower relationships. This creates a tree-like structure showing how concepts relate in terms of generalization and specialization, making it easier to navigate and understand the conceptual landscape."
        },
        {
            name: "Ontology",
            url: "ontology",
            color: "#CCFFE6",
            borderColor: "#009966",
            description: "Ontology: A formal representation of concepts with more detailed relationships including synonyms, related terms, and part-whole relationships. This richer structure captures the complexity of how business concepts interconnect beyond simple hierarchies."
        },
        {
            name: "Semantic Ontology",
            url: "semantic-ontology",
            color: "#CCFFFF",
            borderColor: "#0099CC",
            description: "Semantic Ontology: All relationships between terms have formally approved types with clear semantics. Each connection has a defined meaning (e.g., 'partOf', 'causedBy', 'requires'), enabling precise logical reasoning about concepts and their relationships."
        },
        {
            name: "Knowledge Graph",
            url: "knowledge-graph",
            color: "#CCE6FF",
            borderColor: "#0066CC",
            description: "Knowledge Graph: A formal, typed graph of concepts optimized for graph traversal algorithms. This structure enables powerful queries and analytics, allowing you to discover insights by exploring paths and patterns across interconnected concepts."
        },
        {
            name: "Enterprise Knowledge\nGraph (EKG)",
            url: "enterprise-knowledge-graph",
            color: "#E6CCFF",
            borderColor: "#6600CC",
            description: "Enterprise Knowledge Graph (EKG): Concepts used consistently by both people and AI agents across the entire enterprise, governed by a central data governance process. This ensures organizational alignment and enables enterprise-wide analytics and decision-making."
        },
        {
            name: "AI Enhanced EKG",
            url: "ai-enhanced-ekg",
            color: "#FFCCFF",
            borderColor: "#CC00CC",
            description: "AI Enhanced EKG: An EKG that is continuously created, enhanced, and monitored by AI agents. Machine learning systems automatically discover new relationships, suggest improvements, and maintain quality, dramatically accelerating knowledge graph evolution."
        },
        {
            name: "Real-Time EKG",
            url: "real-time-ekg",
            color: "#FFCCE6",
            borderColor: "#CC0066",
            description: "Real-Time EKG: A dynamic knowledge graph that continuously monitors products, customers, sales, competitors, and market changes. This empowers real-time AI agents to provide instant insights and recommendations, enabling rapid response to market opportunities and threats."
        }
    ];
    
    // Calculate positions for each stage on the left side
    for (let i = 0; i < stages.length; i++) {
        stages[i].x = margin;
        stages[i].y = startY + i * (boxHeight + verticalSpacing);
    }
}

function draw() {
    // Background
    fill('aliceblue');
    stroke('silver');
    strokeWeight(1);
    rect(0, 0, containerWidth, containerHeight);
    
    // Title
    fill('black');
    noStroke();
    textSize(24);
    textAlign(CENTER, TOP);
    text("Knowledge Graph Evolution", containerWidth/2, 20);
    
    // Subtitle
    textSize(14);
    fill('#666666');
    text("From Simple Terms to Real-Time Intelligence", containerWidth/2, 50);
    
    // Draw arrows between stages
    drawArrows();
    
    // Draw stage boxes
    drawStages();
    
    // Draw description area
    drawDescription();
}

function drawArrows() {
    stroke('black');
    strokeWeight(lineStrokeWeight);
    
    for (let i = 0; i < stages.length - 1; i++) {
        let fromX = stages[i].x + boxWidth / 2;
        let fromY = stages[i].y + boxHeight;
        let toX = stages[i + 1].x + boxWidth / 2;
        let toY = stages[i + 1].y;
        
        // Draw line
        line(fromX, fromY, toX, toY);
        
        // Draw arrowhead
        fill('black');
        noStroke();
        push();
        translate(toX, toY);
        rotate(PI / 2);
        triangle(-arrowSize * 1.5, -arrowSize * 0.6, 
                 -arrowSize * 1.5, arrowSize * 0.6, 
                 0, 0);
        pop();
    }
}

function drawStages() {
    // Calculate responsive text size
    let textSizeValue = constrain(containerWidth * 0.025, 12, 16);
    
    for (let i = 0; i < stages.length; i++) {
        let stage = stages[i];
        
        // Check if this stage is being hovered
        let isHovered = (mouseX >= stage.x && 
                        mouseX <= stage.x + boxWidth && 
                        mouseY >= stage.y && 
                        mouseY <= stage.y + boxHeight);
        
        if (isHovered) {
            currentHover = i;
            stroke(stage.borderColor);
            strokeWeight(4);
        } else {
            stroke(stage.borderColor);
            strokeWeight(2);
        }
        
        // Draw rounded rectangle
        fill(stage.color);
        rect(stage.x, stage.y, boxWidth, boxHeight, 8);
        
        // Draw stage name
        fill('black');
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(textSizeValue);
        text(stage.name, stage.x + boxWidth / 2, stage.y + boxHeight / 2);
    }
}

function drawDescription() {
    // Calculate description box position on the right side
    let descBoxX = boxWidth + 2 * margin + descBoxMargin;
    
    // Display description for hovered stage
    if (currentHover !== -1) {
        let stage = stages[currentHover];
        let descBoxY = stage.y;
        let descBoxHeight = boxHeight * 3; // Make it tall enough for text
        
        // Adjust Y position if box would go off bottom
        if (descBoxY + descBoxHeight > containerHeight - margin) {
            descBoxY = containerHeight - margin - descBoxHeight;
        }
        
        // Draw description box background
        fill(250);
        stroke(stage.borderColor);
        strokeWeight(2);
        rect(descBoxX, descBoxY, descBoxWidth, descBoxHeight, 8);
        
        // Draw description text
        fill('black');
        noStroke();
        textSize(constrain(containerWidth * 0.020, 11, 13));
        textAlign(LEFT, TOP);
        
        let textPadding = 10;
        text(stage.description, 
             descBoxX + textPadding, 
             descBoxY + textPadding, 
             descBoxWidth - 2 * textPadding, 
             descBoxHeight - 2 * textPadding);
    } else {
        // Display instruction when no stage is hovered
        let descBoxY = 80;
        let descBoxHeight = 100;
        
        fill(250);
        stroke('#CCCCCC');
        strokeWeight(1);
        rect(descBoxX, descBoxY, descBoxWidth, descBoxHeight, 8);
        
        fill('#666666');
        noStroke();
        textSize(constrain(containerWidth * 0.022, 12, 14));
        textAlign(CENTER, CENTER);
        text("Hover over stages to see\ndetailed descriptions\n\nClick to visit glossary entry", 
             descBoxX + descBoxWidth / 2, 
             descBoxY + descBoxHeight / 2);
    }
}

function mouseMoved() {
    currentHover = -1;
    
    // Check if hovering over any stage
    for (let i = 0; i < stages.length; i++) {
        let stage = stages[i];
        if (mouseX >= stage.x && 
            mouseX <= stage.x + boxWidth && 
            mouseY >= stage.y && 
            mouseY <= stage.y + boxHeight) {
            currentHover = i;
            cursor(HAND);
            return;
        }
    }
    cursor(ARROW);
}

function mouseClicked() {
    // Check if clicked on any stage
    if (currentHover !== -1) {
        let url = "https://dmccreary.github.io/intelligent-textbooks/glossary/#" + stages[currentHover].url;
        window.open(url, '_blank');
    }
}

function touchStarted() {
    // For touch devices
    mouseMoved();
    if (currentHover !== -1) {
        mouseClicked();
    }
    return false;
}

function windowResized() {
    // Update canvas size when the container resizes
    updateCanvasSize();
    updateLayout();
    resizeCanvas(containerWidth, containerHeight);
    redraw();
}

function updateCanvasSize() {
    // Get the exact dimensions of the container
    const container = document.querySelector('main').getBoundingClientRect();
    containerWidth = Math.floor(container.width);
    canvasWidth = containerWidth;
}