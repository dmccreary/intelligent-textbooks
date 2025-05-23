---
title: The AI Flywheel
description: An infographic MicroSim of the AI Flywheel causal loop.
image: /sims/ai-flywheel/ai-flywheel.png
og:image: /sims/ai-flywheel/ai-flywheel.png
twitter:image: /sims/ai-flywheel/ai-flywheel.png
social:
   cards: false
hide:
  - toc
---
# AI Flywheel

<iframe src="./main.html" height="470px" scrolling="no"
  style="overflow: hidden;"></iframe>

[Run the AI Flywheel MicroSim](./main.html){ .md-button .md-button--primary }
[Edit the AI Flywheel MicroSim](https://editor.p5js.org/dmccreary/sketches/HC-HjkNpm)

!!! prompt
    AI Flywheel Infographic

    Please generate a new MicroSim using vis.js.  The MicroSim is a causal loop diagram that illustrates the AI flywheel architype.  

    The title should be at the top and centered.  The title is "AI Flywheel"

    Here are the four components:

    There are for concepts in the diagram arraged in a circle: "Data", "Model", "Prediction" and "Feedback"

    At the top of the diagram we have concept of "Data"

    Data is connected through an arc called "Used to Create" to "Model"

    At the right of the diagram is ithe concept "Model"

    "Model" is connected through an arc to "Prediction" with the label "Used to Create"

    "Prediction" is at the bottom of the diagram

    "Prediction" is connected with an arc to "Feedback" with the label "Generates"

    "Feedback" is connected with an arc to "Data" with the label "Provides More"

    Freese the positions and do not allow the objects to move.

    When the user hovers over an object, display an infobox at the bottom of the canvas that describes what the object is and its function in the AI Flywheel.

    Make the background of the canvas aliceblue.  Recenter the objects if the container is resized.

## Response

I've created an AI Flywheel MicroSim using vis.js that displays the cyclical relationship between the four key components of an AI system. Here are the key features:
Design Elements

**Circular Layout:** The four concepts (Data, Model, Prediction, Feedback) are arranged in a circle with fixed positions
**Directional Flow:** Curved arrows show the flow between concepts with descriptive labels
**Color Coding:** Each concept has a distinct color (Data=Green, Model=Blue, Prediction=Orange, Feedback=Purple)
**Interactive Hover:** Hovering over any concept displays a detailed description in the control area below

## Components Flow

Data (top) → "Used to Create" → Model (right)
Model (right) → "Used to Create" → Prediction (bottom)
Prediction (bottom) → "Generates" → Feedback (left)
Feedback (left) → "Provides More" → Data (top)

Responsive Features

Automatically adjusts to container width changes
Recalculates node positions when window is resized
Scales text and descriptions appropriately
Maintains circular layout proportions

The diagram effectively illustrates how AI systems create a self-reinforcing cycle where each component feeds into the next, creating continuous improvement over time. The flywheel concept shows how initial momentum builds upon itself to create increasingly better AI systems.