# Cognitive Load Visualizer MicroSim - Installation Instructions

## Congratulations!

Your Cognitive Load Visualizer MicroSim has been generated and is ready for testing and deployment!

## What You Received

Your MicroSim package includes:

- **cognitive-load.js** - The main p5.js JavaScript code implementing the cognitive load visualizer
- **main.html** - HTML wrapper that loads p5.js and your JavaScript
- **index.md** - Complete documentation with learning objectives, usage instructions, and discussion questions
- **metadata.json** - Structured metadata following Dublin Core standards for discoverability
- **cognitive-load.zip** - Compressed archive containing all files

## Quick Test

To test the MicroSim immediately:

1. Open the `main.html` file in any modern web browser
2. The MicroSim should load and be fully interactive
3. Try adjusting the three sliders to see the working memory visualization change
4. Click the example buttons to see good and bad design configurations

## What This MicroSim Demonstrates

This visualization helps learners understand Cognitive Load Theory through:

**Three Types of Load:**
- **Intrinsic Load (Yellow)** - Inherent content difficulty
- **Extraneous Load (Red)** - Wasted effort from poor design
- **Germane Load (Green)** - Productive learning effort

**Interactive Features:**
- Adjust each type of load independently with sliders
- See a brain/working memory visualization fill up
- Get real-time feedback on total cognitive load
- Compare good vs. bad design examples
- Visual warnings when capacity is exceeded

## Installation for mkdocs Sites

If you're using this MicroSim in an mkdocs-based intelligent textbook:

### Step 1: Extract to Your Sims Directory

```bash
cd /path/to/your/project/docs/sims
unzip cognitive-load.zip
```

### Step 2: Update Navigation

Edit your `mkdocs.yml` file to add the MicroSim to your navigation:

```yaml
nav:
  # ... your existing navigation ...
  - MicroSims:
    - Cognitive Load: sims/cognitive-load/index.md
    # or under Instructional Design section:
  - Concepts:
    - Instructional Design:
      - Cognitive Load Theory: sims/cognitive-load/index.md
```

### Step 3: Test Locally

```bash
# From your project root
mkdocs serve
```

Then navigate to: `http://localhost:8000/sims/cognitive-load/`

### Step 4: Deploy

```bash
# Commit your changes
git add .
git commit -m "Add Cognitive Load Visualizer MicroSim"
git push

# Deploy to GitHub Pages
mkdocs gh-deploy
```

## Embedding in Other Platforms

You can embed this MicroSim in any web page using an iframe:

```html
<iframe src="https://your-domain.github.io/sims/cognitive-load/main.html" 
        width="100%" 
        height="652" 
        frameborder="0"
        scrolling="no">
</iframe>
```

The height should be 652 pixels (500px drawing area + 150px controls + 2px border).

## Customization Options

### Easy Customizations

You can easily modify in `cognitive-load.js`:

- **Default load values**: Change the initial slider positions
- **Colors**: Modify the load type colors (currently yellow, red, green)
- **Capacity limit**: Adjust the 100% maximum capacity value
- **Canvas size**: Change `drawHeight` and `controlHeight` variables
- **Feedback messages**: Edit the text in `drawFeedbackMessage()` function

### Advanced Customizations

For more significant changes:

- Add additional controls (e.g., slider for total capacity)
- Implement different visualization styles
- Add animation effects for load changes
- Create additional example scenarios
- Add assessment questions with automatic grading

## Educational Applications

### In Instructional Design Courses

Use this MicroSim to help students:
- Understand the three types of cognitive load
- Recognize cognitive overload in real materials
- Apply load management principles
- Evaluate design choices

### In Teacher Training

Help educators:
- Design less overwhelming lessons
- Identify sources of confusion (extraneous load)
- Simplify complex topics (manage intrinsic load)
- Support deeper learning (optimize germane load)

### In Psychology Courses

Demonstrate:
- Working memory limitations
- Information processing capacity
- Practical applications of cognitive psychology
- Research-based learning principles

## Usage Tips

**For Students:**
1. Start by exploring each slider independently
2. Try the "Bad Example" to see cognitive overload
3. Then try the "Good Example" to see optimal balance
4. Create your own configurations and observe feedback

**For Instructors:**
1. Use as a diagnostic tool - have students evaluate real materials
2. Create discussions around what causes high extraneous load
3. Challenge students to redesign materials to optimize load
4. Connect to Mayer's multimedia principles

**For Designers:**
1. Use as a planning tool before creating content
2. Estimate load for your target audience
3. Identify opportunities to reduce extraneous load
4. Ensure total load stays manageable

## Technical Specifications

- **Framework**: p5.js v1.11.2
- **Canvas**: 800x650px (responsive width)
- **Browser Support**: All modern browsers
- **Mobile Friendly**: Yes
- **Accessibility**: Screen reader support included

## Key Learning Outcomes

After using this MicroSim, learners will be able to:

✓ Identify the three types of cognitive load
✓ Explain how each type affects learning
✓ Recognize when cognitive overload occurs
✓ Apply load principles to instructional design
✓ Evaluate materials for cognitive load issues

## Testing in the p5.js Editor

You can also test and modify the JavaScript code in the online p5.js editor:

1. Go to https://editor.p5js.org/
2. Copy the contents of `cognitive-load.js`
3. Paste into the editor
4. Click the play button to run

Note: Some features may need adjustment for the online editor environment.

## Discussion Prompts

Use these with learners after they explore the MicroSim:

1. "What happens when you maximize all three types of load?"
2. "Why is extraneous load called 'wasted' effort?"
3. "How might intrinsic load differ for a novice vs. expert?"
4. "Can you have too much germane load?"
5. "What design changes reduce extraneous load in textbooks?"

## Troubleshooting

**MicroSim not displaying?**
- Check that main.html is served from a web server (not file://)
- Verify that the p5.js CDN is accessible
- Check browser console for JavaScript errors

**Sliders not working?**
- Ensure JavaScript is enabled in your browser
- Try a different browser to isolate issues
- Check that all files are in the same directory

**Layout issues?**
- Clear browser cache
- Try responsive design mode in browser dev tools
- Verify container width is sufficient

**Values not updating?**
- Check that you're using the sliders, not just clicking
- Verify that the `input` event handlers are firing
- Look for console errors

## Support and Feedback

For questions, issues, or suggestions:

- Review the inline code comments for implementation details
- Check the index.md file for usage guidance
- Consult the metadata.json file for complete specifications
- Reference Cognitive Load Theory literature for theoretical background

## License

This MicroSim is released under CC BY-SA 4.0, allowing you to:

- Share and adapt the content
- Use for commercial purposes
- Must give appropriate credit
- Must share adaptations under the same license

## Related MicroSims

Consider also exploring:

- **ADDIE Workflow** - Instructional design process
- **Bloom's Taxonomy** - Levels of learning objectives
- **Multimedia Principles** - Applying cognitive load to media design
- **Working Memory** - Understanding capacity limitations

## Next Steps

1. **Test** the MicroSim in your browser
2. **Integrate** into your intelligent textbook or website
3. **Customize** colors and default values to match your needs
4. **Use** in lessons on instructional design or educational psychology
5. **Gather feedback** from students and educators
6. **Iterate** based on usage and learning outcomes

## Research Background

Cognitive Load Theory was developed by John Sweller and colleagues in the 1980s. Key findings:

- Working memory can hold 4-7 chunks of information
- Total cognitive load is additive across types
- Learning occurs when information moves to long-term memory
- Poor design wastes limited working memory capacity
- Expert learners experience lower intrinsic load

This MicroSim makes these abstract concepts concrete and explorable!

Enjoy using your Cognitive Load Visualizer to teach evidence-based instructional design!
