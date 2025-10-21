# SAM Process MicroSim - Installation Instructions

## Congratulations!

Your SAM (Successive Approximation Model) Process MicroSim has been generated and is ready for testing and deployment!

## What You Received

Your MicroSim package includes:

- **sam-process.js** - The main p5.js JavaScript code implementing the SAM visualization
- **main.html** - HTML wrapper that loads p5.js and your JavaScript
- **index.md** - Complete documentation with learning objectives, SAM principles, and comparison with ADDIE
- **metadata.json** - Structured metadata following Dublin Core standards for discoverability
- **sam-process.zip** - Compressed archive containing all files

## Quick Test

To test the MicroSim immediately:

1. Open the `main.html` file in any modern web browser
2. The MicroSim should load and be fully interactive
3. Click "Next Iteration" to advance through the SAM phases
4. Watch the quality meter improve with each iteration
5. Try enabling "Auto-play Iterations" to see the full cycle

## What This MicroSim Demonstrates

This visualization helps learners understand the SAM approach through:

**Three SAM Phases:**
- **Preparation (Blue)** - Initial project setup and information gathering
- **Iterative Design (Orange)** - Rapid prototyping with stakeholder feedback
- **Iterative Development (Green)** - Building and testing with real learners

**Key SAM Principles:**
- Rapid prototyping over extensive planning
- Continuous iteration and improvement
- Stakeholder collaboration throughout
- Early and frequent testing
- Quality improvement with diminishing returns

**Interactive Features:**
- Step through iterations manually or use auto-play
- Watch quality meter improve from 40% to 98%
- See spiral visualization showing cyclical progress
- Track iterations with visual progress dots
- View current phase activities in real-time

## Installation for mkdocs Sites

If you're using this MicroSim in an mkdocs-based intelligent textbook:

### Step 1: Extract to Your Sims Directory

```bash
cd /path/to/your/project/docs/sims
unzip sam-process.zip
```

### Step 2: Update Navigation

Edit your `mkdocs.yml` file to add the MicroSim to your navigation:

```yaml
nav:
  # ... your existing navigation ...
  - MicroSims:
    - SAM Process: sims/sam-process/index.md
    # or under Instructional Design section:
  - Concepts:
    - Instructional Design:
      - SAM Model: sims/sam-process/index.md
```

### Step 3: Test Locally

```bash
# From your project root
mkdocs serve
```

Then navigate to: `http://localhost:8000/sims/sam-process/`

### Step 4: Deploy

```bash
# Commit your changes
git add .
git commit -m "Add SAM Process MicroSim"
git push

# Deploy to GitHub Pages
mkdocs gh-deploy
```

## Embedding in Other Platforms

You can embed this MicroSim in any web page using an iframe:

```html
<iframe src="https://your-domain.github.io/sims/sam-process/main.html" 
        width="100%" 
        height="672" 
        frameborder="0"
        scrolling="no">
</iframe>
```

The height should be 672 pixels (550px drawing area + 120px controls + 2px border).

## Embedding in Your Instructional Design Chapter

Add this to your `concepts/instructional-design.md` file in the SAM Model section:

```markdown
### Interactive SAM Process

Explore how SAM's iterative approach works:

<iframe src="../../sims/sam-process/main.html" 
        width="100%" 
        height="672" 
        frameborder="0"
        scrolling="no">
</iframe>

[View full documentation](../../sims/sam-process/)
```

## Customization Options

### Easy Customizations

You can easily modify in `sam-process.js`:

- **Number of iterations**: Change `maxIterations` variable (default: 5)
- **Starting quality**: Adjust `qualityScore` initial value (default: 40)
- **Phase colors**: Modify colors in `phaseColors` object
- **Quality increments**: Adjust the diminishing returns formula in `startNextIteration()`
- **Canvas size**: Change `drawHeight` and `controlHeight` variables

### Advanced Customizations

For more significant changes:

- Add more detailed phase descriptions
- Create branching paths based on quality thresholds
- Implement comparison mode showing ADDIE side-by-side
- Add stakeholder feedback simulation
- Create assessment questions after completion

## Educational Applications

### In Instructional Design Courses

Use this MicroSim to help students:
- Compare SAM and ADDIE approaches
- Understand agile instructional design
- Plan iterative projects
- Recognize when to stop iterating

### In Project Management Training

Help project managers:
- Understand iterative development
- Plan sprints and iterations
- Manage stakeholder expectations
- Balance speed and quality

### In Agile Training

Demonstrate:
- Agile principles applied to instructional design
- Continuous improvement cycles
- Rapid prototyping benefits
- Iterative refinement processes

## Usage Tips

**For Students:**
1. Start with manual mode - click through each iteration
2. Observe how quality improves but gains diminish
3. Think about when to stop iterating in real projects
4. Compare to ADDIE's linear approach

**For Instructors:**
1. Discuss why early iterations have bigger quality jumps
2. Ask when students would stop iterating (time/budget constraints)
3. Compare to students' own project experiences
4. Connect to agile software development concepts

**For Designers:**
1. Use to explain SAM to stakeholders
2. Set iteration expectations upfront
3. Plan prototype fidelity for each iteration
4. Define quality targets for each cycle

## Understanding the Visualization

### Spiral Path

Represents the journey through SAM phases:
- Starts at center (Preparation)
- Spirals outward through Design and Development
- Each loop is one complete iteration
- Progress shown by moving position marker

### Quality Meter

Shows product quality improvement:
- **Red (0-50%)**: Initial rough draft
- **Orange (50-75%)**: Improving with feedback
- **Green (75-100%)**: High-quality finished product

Quality increases follow diminishing returns:
- Iteration 1: +15% quality
- Iteration 2: +13% quality
- Iteration 3: +11% quality
- Iteration 4: +9% quality
- Iteration 5: +7% quality

### Phase Indicators

Three boxes showing:
- Current phase (highlighted in color)
- Phase activities
- Iteration number for Design/Development

## Technical Specifications

- **Framework**: p5.js v1.11.2
- **Canvas**: 800x670px (responsive width)
- **Browser Support**: All modern browsers
- **Mobile Friendly**: Yes
- **Accessibility**: Screen reader support included

## Key Learning Outcomes

After using this MicroSim, learners will be able to:

✓ Identify the three phases of SAM
✓ Explain SAM vs. ADDIE differences
✓ Understand iterative improvement
✓ Recognize diminishing returns in iteration
✓ Apply SAM to real projects

## Testing in the p5.js Editor

You can also test and modify the JavaScript code in the online p5.js editor:

1. Go to https://editor.p5js.org/
2. Copy the contents of `sam-process.js`
3. Paste into the editor
4. Click the play button to run

Note: Some features may need adjustment for the online editor environment.

## Discussion Prompts

Use these with learners after they explore the MicroSim:

1. "At what iteration would you stop? Why?"
2. "How does SAM reduce project risk compared to ADDIE?"
3. "When might ADDIE be better than SAM?"
4. "How would you convince stakeholders to try SAM?"
5. "What happens if you skip learner testing in iterations?"

## Comparison with ADDIE MicroSim

If you also have the ADDIE Workflow MicroSim, you can:

1. Display both side-by-side
2. Have students compare the workflows
3. Discuss when each is appropriate
4. Analyze a project scenario using both approaches

## Troubleshooting

**MicroSim not displaying?**
- Check that main.html is served from a web server (not file://)
- Verify that the p5.js CDN is accessible
- Check browser console for JavaScript errors

**Iterations not advancing?**
- Ensure you're clicking the "Next Iteration" button
- Check that JavaScript is enabled
- Try refreshing the page

**Auto-play not working?**
- Verify the checkbox is checked
- Ensure you've started from the beginning
- Check console for errors

**Visual elements misaligned?**
- Clear browser cache
- Try responsive design mode in dev tools
- Verify container width is sufficient

## Real-World SAM Example

The documentation includes a case study showing:

**Traditional ADDIE Approach:**
- 6 months total development time
- Linear progression through phases
- Late stakeholder involvement

**SAM Approach:**
- 7 weeks total development time
- 3 two-week iterations
- Continuous stakeholder collaboration
- 5 months faster with higher quality!

## Support and Feedback

For questions, issues, or suggestions:

- Review the inline code comments for implementation details
- Check the index.md file for usage guidance
- Consult the metadata.json file for complete specifications
- Reference Michael Allen's SAM books for theoretical background

## License

This MicroSim is released under CC BY-SA 4.0, allowing you to:

- Share and adapt the content
- Use for commercial purposes
- Must give appropriate credit
- Must share adaptations under the same license

## Related MicroSims

Consider also exploring:

- **ADDIE Workflow** - Traditional instructional design model
- **Cognitive Load Visualizer** - Managing working memory
- **Agile Sprint Planning** - Software development iterations
- **Rapid Prototyping Tools** - Creating quick mockups

## Next Steps

1. **Test** the MicroSim in your browser
2. **Integrate** into your intelligent textbook or website
3. **Customize** iteration counts and quality parameters
4. **Use** in lessons on instructional design or project management
5. **Gather feedback** from students and educators
6. **Iterate** on the MicroSim itself using SAM principles!

## Research Background

SAM was developed by Michael Allen and colleagues at Allen Interactions based on:

- Frustrations with slow, linear ADDIE processes
- Success of agile software development methodologies
- Research on learning through iteration
- Practical experience with thousands of projects

Key insight: **You learn more by doing than by planning**

The model gained popularity because:
- Faster time to market
- Better stakeholder alignment
- Higher quality final products
- More engaging development process

## The SAM Philosophy

**"Successive approximation is how we learn. It's how we should design."**

This MicroSim embodies this philosophy by:
- Starting simple (low initial quality)
- Improving through feedback (each iteration)
- Recognizing diminishing returns (knowing when to stop)
- Emphasizing action over planning (rapid prototyping)

Enjoy using your SAM Process MicroSim to teach modern, agile instructional design!
