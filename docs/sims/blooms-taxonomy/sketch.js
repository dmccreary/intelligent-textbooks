// global variables for width and height
let containerWidth; // calculated by container
let containerHeight = 600; // fixed height on page

// Variables for the visualization
let currentHover = -1;
let levels = [];

function setup() {
    // Create a canvas to match the parent container's size
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, containerHeight);
    var mainElement = document.querySelector('main');
    canvas.parent(mainElement);
    
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
    
    // Calculate responsive dimensions
    const baseWidth = min(containerWidth * 0.8, 500); // 80% of container width, max 500px
    const triangleHeight = min(containerHeight * 0.65, 450); // 65% of container height, max 450px
    const startX = (containerWidth - baseWidth) / 2;
    // adjust the starting Y position based on the height of the triangle
    const startY = triangleHeight + 70;
    
    // Draw triangle sections
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
        
        // Highlight current hover with stroke
        if (i === currentHover) {
            stroke('black');
            strokeWeight(3);
        } else {
            noStroke();
        }
        
        // Draw the section as a polygon with 4 vertices (a rectangle)
        beginShape();
          vertex(currentX, currentY);
          vertex(currentX + currentWidth, currentY);
          vertex(currentX + currentWidth, currentY - sectHeight);
          vertex(currentX, currentY - sectHeight);
        endShape(CLOSE);
        
        // Add level text - responsive size
        fill(levels[i].tcolor);
        noStroke(); // Turn off stroke before drawing text
        textAlign(CENTER, CENTER);
        
        // Scale text size based on container width
        let levelTextSize = constrain(containerWidth * 0.04, 10, 24);
        textSize(levelTextSize);
        
        // For very small screens, use abbreviations
        let displayText = levels[i].level;
        if (containerWidth < 350 && i > 0) {
            // Abbreviate text for small screens (except for "Remember")
            displayText = levels[i].level.substring(0, 3);
        }
        
        text(displayText, currentX + currentWidth/2, currentY - sectHeight/2);
    }
    
    // Title at the top - responsive size
    fill('black');
    noStroke(); // Turn off stroke before drawing text
    let titleSize = constrain(containerWidth * 0.04, 16, 24);
    textSize(titleSize);
    textStyle(BOLD);
    textAlign(CENTER, TOP);
    text("Bloom's Taxonomy: RUAAEC", containerWidth/2, 30);
    
    // Description area starts at a responsive position
    const descriptionY = min(triangleHeight + 110, containerHeight - 90);
    
    // Draw color key box under the pyramid to the left
    const keyBoxHeight = 40;
    const keyBoxY = descriptionY - keyBoxHeight;
    const keyBoxWidth = 100; // containerWidth * 0.6;
    const keyBoxX = 10; // (containerWidth - keyBoxWidth) / 2;
    
    // Draw the key box background
    noStroke();
    fill('aliceblue');
    rect(keyBoxX, keyBoxY, keyBoxWidth, keyBoxHeight, 5);
    
    // Draw the color key and label  based on hover state
    if (currentHover !== -1) {
        // Show the specific level's color and text
        const keySquareSize = 30;
        const keyPadding = 10;
        
        // Color square
        fill(levels[currentHover].color);
        rect(keyBoxX + keyPadding, keyBoxY + (keyBoxHeight - keySquareSize) / 2, 
             keySquareSize, keySquareSize);
        
        // Key text
        fill('black');
        noStroke();
        textAlign(LEFT, CENTER);
        textStyle(BOLD);
        let keyTextSize = constrain(containerWidth * 0.025, 12, 14);
        textSize(keyTextSize);
        text(levels[currentHover].level, 
             keyBoxX + keyPadding + keySquareSize + 10, 
             keyBoxY + keyBoxHeight / 2);
    }
    
    // Display description for hovered section
    if (currentHover !== -1) {
        fill('black');
        noStroke(); // Turn off stroke before drawing text
        let descSize = constrain(containerWidth * 0.025, 12, 14);
        textSize(descSize);
        textAlign(LEFT, TOP);
        textStyle(NORMAL);
        
        // Responsive width for description
        const descWidth = containerWidth - 40;
        text(levels[currentHover].description, 20, descriptionY, descWidth);
    } else {
        // Display instruction when no section is hovered
        fill('#666666');
        noStroke(); // Turn off stroke before drawing text
        let instructSize = constrain(containerWidth * 0.025, 12, 14);
        textSize(instructSize);
        textAlign(CENTER, TOP);
        textStyle(NORMAL);
        text("Hover over each level to see detailed description", containerWidth/2, descriptionY);
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

function touchStarted() {
    // For touch devices
    mouseMoved(); // Reuse the same logic as mouseMoved
    return false; // Prevent default
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
    containerWidth = Math.floor(container.width); // Avoid fractional pixels
}