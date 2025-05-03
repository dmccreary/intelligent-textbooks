---
hide:
  - toc
---

# Sine Wave

<iframe src="./main.html" height="480px" scrolling="no"
  style="overflow: hidden;"></iframe>

[Run the Sine Wave MicroSim](./sine-wave.html){ .md-button .md-button--primary }
[Edit the Sine Wave MicroSim](https://editor.p5js.org/dmccreary/sketches/0SEATs3jW)

To include this MicroSim on your web site, just copy the following line of HTML code:

```html
<iframe src="https://dmccreary.github.io/intelligent-textbooks/sims/sine-wave/main.html" height="480px" scrolling="no"
  style="overflow: hidden;"></iframe>
```

In this demo, we use three range control sliders to change 
the ways a sine wave is drawn on a canvas.
The three parameters are:

1. amplitude
2. period
3. and phase

### Prompt

```linenums="0"
Generate a static sine wave on a grid of cartesian coordinates. 
Make (0,0) be at the center of an 600x400 canvas and larger y at the top.  
Add sliders for period, amplitude and phase.
Provide the label and values to the left of the sliders.
Make the sliders span the width less the leftSliderMargin of 100.
Draw and label the X and Y Axis.
```

[Edit This MicroSim with the P5.js Editor](https://editor.p5js.org/dmccreary/sketches/f7E377T03)

### Result

```js
// sine wave with 3 sliders
let width = 600;
let height = 400;
let halfWidth = width / 2
let halfHeight = height / 2
let amplitude = 100;
let phase = 0;

let amplitudeSlider, periodSlider, phaseSlider;
let labelValueMargin = 120;

function setup() {
  createCanvas(width, height);
  textSize(16)
  
  // Create sliders
  amplitudeSlider = createSlider(0, 200, 100);
  amplitudeSlider.position(labelValueMargin, height - 20);
  amplitudeSlider.style('width', width - labelValueMargin + 'px')
  
  periodSlider = createSlider(1, 100, 50);
  periodSlider.position(labelValueMargin, height - 40);
  periodSlider.style('width', width - labelValueMargin + 'px')
  
  phaseSlider = createSlider(-PI*100, PI*100, 0, 0.01);
  phaseSlider.position(labelValueMargin, height - 60);
  phaseSlider.style('width', width - labelValueMargin + 'px')
}

function draw() {
  background(240);
  
  amplitude = amplitudeSlider.value();
  period = periodSlider.value();
  phase = phaseSlider.value();
  
  // draw on the standard axis to keep text upright
  drawAxis();
  translate(width / 2, height / 2); // Shift origin to center
  scale(1, -1); // Flip y-axis to make positive y up
  
  drawSineWave(amplitude, 1/period, phase);
}

function setLineDash(list) {
  drawingContext.setLineDash(list);
}

function drawAxis() {
  fill('black')
  strokeWeight(0)
  text('y', halfWidth-20, 15)
  text('x', width-20, halfHeight + 20)
  stroke('gray')
  strokeWeight(1)
  setLineDash([5, 5])
  
  // horizontal line
  line(0, halfHeight, width, halfHeight)
  // vertical line
  line(halfWidth, 0, halfWidth, height)
  
  stroke(0)
  strokeWeight(0);
  fill('black'); // Text color
  text('Amplitude: ' + amplitude/100,    10, height - 5);
  text('Period: '    + period,           10, height - 25);
  text('Phase: '     + phase.toFixed(2), 10, height - 45);
}

function drawSineWave(amplitude, frequency, phase) {
  stroke('blue');
  strokeWeight(3)
  noFill();
  // turn off dash line
  setLineDash([1, 0])
  beginShape();
    for (let x = -width / 2; x < width / 2; x++) {
      let y = amplitude * sin(frequency * (x - phase));
      vertex(x, y);
    }
  endShape();
}
```

!!! Challenge
    Create your own trigonometry demos by drawing
    the cosine and tangent functions.

## Lesson Plan

### Prompt

```linenums="0"
Generate a lesson plan for a 9th grade geometry class 
that accompanies the following p5.js demonstration:

The users see a sine wave on the screen.
There are three range control sliders under the sine wave.
One slider changes the amplitude of the sine wave.
One slider changes the period of the sine wave.
One slider changes the phase of the sine wave.
```

### Grade Level
9th Grade  

### Subject
Geometry  

### Duration
1-2 class periods (40-80 minutes)  

### Tools Needed
Computers with internet access, p5.js web editor, projector for demonstrations.

### Objectives
1. Understand the basic properties of sine waves (amplitude, period, phase).
2. Learn how to manipulate these properties using p5.js.
3. Visualize the effects of changing each property on the shape of the sine wave.

### Introduction (10 minutes)
- Begin with a brief overview of sine waves and their significance in mathematics and the real world (e.g., sound waves, light waves).
- Introduce the p5.js tool and its purpose in visualizing mathematical concepts.

### Demonstration (15 minutes)
- Project the p5.js sine wave demonstration on the screen.
- Explain each control slider and its corresponding property:
  - **Amplitude:** Height of the wave peaks.
  - **Period:** Distance between successive wave peaks.
  - **Phase:** Horizontal shift of the entire wave.

### Interactive Activity (30 minutes)
- Students will use the p5.js web editor to experiment with the sine wave.
- Tasks for students:
  1. Adjust the amplitude and observe changes.
  2. Modify the period and note the effects.
  3. Change the phase and discuss how the wave shifts.
- Encourage students to note their observations and any patterns they discover.

### Group Discussion (10 minutes)
- Regroup and discuss the findings.
- Ask students to explain how each parameter affects the wave.
- Discuss practical applications of sine waves.

### Assessment (5-15 minutes)
- Provide a short quiz or worksheet asking students to match wave diagrams with their corresponding amplitude, period, and phase settings.

### Homework (optional)
- Students create their own p5.js sketch that includes a sine wave with adjustable properties.
- They should write a brief report explaining how changing each property affects the wave and include screenshots of their sketch.

### Extensions (optional)
- Introduce concepts of frequency and angular velocity related to sine waves.
- Explore other trigonometric functions like cosine and tangent using p5.js.

### Resources
- Access to the p5.js web editor and basic tutorials.
- Diagrams and explanations of sine waves and their properties.

## References


