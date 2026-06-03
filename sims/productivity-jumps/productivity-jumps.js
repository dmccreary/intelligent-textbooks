// Productivity Jumps Stair-Step Infographic
// CANVAS_HEIGHT: 595
// Each step shows how a new AI tool cuts the person-hours needed to build an
// intelligent textbook. Click a step (or use Prev/Next) to reveal its details.

// --- Canvas / layout constants -------------------------------------------------
let canvasWidth = 400;          // initial width (responsive)
let drawHeight = 545;           // staircase + info box region
let controlHeight = 50;         // one row of controls
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let defaultTextSize = 16;

// Plot geometry (recomputed each frame for width responsiveness)
let leftX = 50;                 // left edge of the bars (room for y-axis label)
let baselineY = 300;            // bottom of the staircase (x-axis)
let maxBarHeight = 210;         // pixel height of the tallest step
let plotTopY = baselineY - maxBarHeight;

// Log productivity axis: position is set by hours on a log scale.
// axisBottomHours sits a bit below the manual figure so the baseline bar is visible.
let axisBottomHours = 10000;
let axisTopHours = 8;

// --- Data ----------------------------------------------------------------------
// hours = person-hours to build a complete intelligent textbook
// speedup = 3000 / hours (relative to the manual baseline)
const steps = [
  {
    name: 'Manual',
    hours: 3000,
    speedup: 1,
    color: 'slategray',
    title: 'Baseline: Manual Creation',
    body: 'Writing the entire book by hand — researching, drafting every chapter, ' +
          'and building each diagram and simulation one at a time. About 3,000 person-hours, ' +
          'which works out to be about 1.6 years of full-time work for a single author. ' +
          'This assumes 38 hours per week and 48 weeks per year. ' + 
          'Few people have the time or resources to invest at this scale, ' +
          'which is a major barrier to creating high-quality educational content.'
  },
  {
    name: 'ChatGPT',
    hours: 1000,
    speedup: 3,
    color: 'goldenrod',
    title: 'ChatGPT: Generate Pages & Elements',
    body: 'Prompting ChatGPT to draft individual pages, glossary terms, and quiz questions, ' +
          'then editing each result by hand. About 1,000 person-hours — a 3× speed-up ' +
          'over fully manual work.  This saves 2,000 hours, but still requires a lot of manual effort to stitch everything together ' +
          'and ensure the content is accurate and coherent.'
  },
  {
    name: 'Claude Code',
    hours: 100,
    speedup: 30,
    color: 'steelblue',
    title: 'Claude Code: Agentic Workflows',
    body: 'Claude Code edits the project files directly, generating many pages, MicroSims, and ' +
          'learning-graph data in a single agentic session. About 100 person-hours — ' +
          'roughly 30× faster than by hand.' +
          'This is a huge productivity boost, but it still requires a lot of manual ' +
          'prompting and oversight to guide the agent and fix issues. ' +
          'Consistency is also a challenge, since each session is independent and can produce ' +
          'different results. '
  },
  {
    name: 'Claude Code Skills',
    hours: 10,
    speedup: 300,
    color: 'seagreen',
    title: 'Claude Code Skills: Full-Book Automation',
    body: 'Reusable Skills encode whole workflows — learning graph, chapters, glossary, ' +
          'quizzes, and MicroSims — so a complete textbook takes about 10 person-hours. ' +
          'The consistency and coherence of the output is dramatically improved, ' +
          'since the same Skills are reused for each chapter and element. ' +
          'A 300× jump over manual authoring.'
  }
];

let selectedStep = 0;           // start on the baseline so the concept shows on load
let prevButton, nextButton, resetButton;

// --- Setup ---------------------------------------------------------------------
function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  prevButton = createButton('◀ Prev');
  prevButton.parent(document.querySelector('main'));
  prevButton.mousePressed(selectPrev);

  nextButton = createButton('Next ▶');
  nextButton.parent(document.querySelector('main'));
  nextButton.mousePressed(selectNext);

  resetButton = createButton('Reset');
  resetButton.parent(document.querySelector('main'));
  resetButton.mousePressed(() => { selectedStep = 0; });

  positionControls();

  describe('A stair-step infographic of productivity for building an intelligent textbook. ' +
           'Four rising steps show person-hours dropping from 3,000 (Manual) to 1,000 (ChatGPT) ' +
           'to 100 (Claude Code) to 10 (Claude Code Skills). Clicking a step shows a detailed ' +
           'description below the diagram.', LABEL);
}

function positionControls() {
  prevButton.position(10, drawHeight + 10);
  nextButton.position(95, drawHeight + 10);
  resetButton.position(180, drawHeight + 10);
}

// --- Draw ----------------------------------------------------------------------
function draw() {
  updateCanvasSize();

  // Backgrounds (required UI convention)
  stroke('silver');
  fill('aliceblue');
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  noStroke();
  fill('black');
  textAlign(CENTER, TOP);
  textSize(22);
  text('Productivity Jumps in Building an Intelligent Textbook', canvasWidth / 2, 8);

  // Hint line
  textSize(13);
  fill('dimgray');
  text('Click a step to see how each tool boosts productivity', canvasWidth / 2, 36);

  drawAxes();
  drawStaircase();
  drawInfoBox();
  drawControlLabel();

  // Default text settings
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
}

// Vertical "Productivity" axis with an upward arrow on the left.
function drawAxes() {
  // y-axis line + arrow
  stroke('gray');
  strokeWeight(1.5);
  line(leftX - 6, baselineY, leftX - 6, plotTopY - 6);
  // arrowhead
  fill('gray');
  noStroke();
  triangle(leftX - 6, plotTopY - 12, leftX - 10, plotTopY - 4, leftX - 2, plotTopY - 4);

  // x-axis baseline
  stroke('gray');
  strokeWeight(1.5);
  line(leftX, baselineY, canvasWidth - 12, baselineY);
  strokeWeight(1);

  // Rotated y-axis label
  push();
  translate(16, (baselineY + plotTopY) / 2);
  rotate(-HALF_PI);
  noStroke();
  fill('black');
  textAlign(CENTER, CENTER);
  textSize(15);
  text('Productivity', 0, 0);
  textSize(11);
  fill('gray');
  text('(log scale)', 0, 16);
  pop();
}

// Map a person-hours value to a bar height in pixels (log scale).
function hoursToHeight(hours) {
  const top = Math.log10(axisBottomHours);
  const bottom = Math.log10(axisTopHours);
  const frac = (top - Math.log10(hours)) / (top - bottom);
  return maxBarHeight * frac;
}

function getBarGeom(i) {
  const areaW = (canvasWidth - 12) - leftX;
  const w = areaW / steps.length;
  const x = leftX + i * w;
  const h = hoursToHeight(steps[i].hours);
  const y = baselineY - h;
  return { x: x, y: y, w: w, h: h };
}

function drawStaircase() {
  for (let i = 0; i < steps.length; i++) {
    const g = getBarGeom(i);
    const s = steps[i];
    const selected = (i === selectedStep);

    // Filled step
    noStroke();
    fill(s.color);
    rect(g.x, g.y, g.w, g.h);
    // Fade the steps that are not selected
    if (!selected) {
      fill(255, 255, 255, 120);
      rect(g.x, g.y, g.w, g.h);
    }
    // Border (thicker + dark when selected)
    noFill();
    stroke(selected ? 'black' : 'darkgray');
    strokeWeight(selected ? 3 : 1);
    rect(g.x, g.y, g.w, g.h);
    strokeWeight(1);

    const cx = g.x + g.w / 2;

    // Above-bar labels: hours (bold) + speedup multiplier
    noStroke();
    fill('black');
    textAlign(CENTER, BOTTOM);
    textStyle(BOLD);
    textSize(14);
    text(fmt(s.hours) + ' hrs', cx, g.y - 16);
    textStyle(NORMAL);
    textSize(12);
    fill(selected ? 'black' : 'dimgray');
    text(s.speedup === 1 ? 'baseline' : s.speedup + '× faster', cx, g.y - 2);

    // Below-baseline label: tool name (wrapped)
    fill(selected ? 'black' : 'dimgray');
    textStyle(selected ? BOLD : NORMAL);
    textSize(13);
    textAlign(CENTER, TOP);
    const lines = wrapText(s.name, g.w - 4);
    for (let k = 0; k < lines.length; k++) {
      text(lines[k], cx, baselineY + 6 + k * 15);
    }
    textStyle(NORMAL);
  }
}

// Detail panel below the staircase for the selected step.
function drawInfoBox() {
  const boxX = leftX - 6;
  const boxY = baselineY + 44;
  const boxW = (canvasWidth - 12) - boxX;
  const boxH = drawHeight - boxY - 8;

  const s = steps[selectedStep];

  // Panel
  stroke('silver');
  fill(255, 255, 255, 235);
  rect(boxX, boxY, boxW, boxH, 10);
  // Color accent bar on the left
  noStroke();
  fill(s.color);
  rect(boxX, boxY, 8, boxH, 10, 0, 0, 10);

  const padX = 20;
  const textX = boxX + padX;
  const textW = boxW - padX - 16;

  // Title
  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  textSize(16);
  text(s.title, textX, boxY + 12, textW);

  // Body (wrapped)
  textStyle(NORMAL);
  textSize(14);
  fill('dimgray');
  const bodyLines = wrapText(s.body, textW);
  let ty = boxY + 38;
  for (let k = 0; k < bodyLines.length; k++) {
    text(bodyLines[k], textX, ty);
    ty += 18;
  }

  // Footer summary
  fill(s.color === 'goldenrod' ? 'black' : s.color);
  textStyle(BOLD);
  textSize(13);
  const footer = '≈ ' + fmt(s.hours) + ' person-hours' +
                 (s.speedup === 1 ? '' : '  •  ' + s.speedup + '× productivity');
  text(footer, textX, boxY + boxH - 22);
  textStyle(NORMAL);
}

function drawControlLabel() {
  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(14);
  text('Step ' + (selectedStep + 1) + ' of ' + steps.length + ': ' + steps[selectedStep].name,
       260, drawHeight + 25);
}

// --- Interaction ---------------------------------------------------------------
function mousePressed() {
  for (let i = 0; i < steps.length; i++) {
    const g = getBarGeom(i);
    if (mouseX >= g.x && mouseX <= g.x + g.w && mouseY >= g.y && mouseY <= baselineY) {
      selectedStep = i;
      return;
    }
  }
}

function selectPrev() { selectedStep = Math.max(0, selectedStep - 1); }
function selectNext() { selectedStep = Math.min(steps.length - 1, selectedStep + 1); }

// Show a pointer cursor when hovering a clickable step.
function mouseMoved() {
  let over = false;
  for (let i = 0; i < steps.length; i++) {
    const g = getBarGeom(i);
    if (mouseX >= g.x && mouseX <= g.x + g.w && mouseY >= g.y && mouseY <= baselineY) {
      over = true;
      break;
    }
  }
  cursor(over ? HAND : ARROW);
}

// --- Helpers -------------------------------------------------------------------
function fmt(n) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function wrapText(str, maxW) {
  const words = str.split(' ');
  let lines = [];
  let line = '';
  for (const w of words) {
    const test = line ? line + ' ' + w : w;
    if (textWidth(test) > maxW && line) {
      lines.push(line);
      line = w;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
}

// --- Responsive ----------------------------------------------------------------
function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  positionControls();
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
  }
}
