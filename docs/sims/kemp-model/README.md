# Kemp Design Model MicroSim - Installation Instructions

## Congratulations!

Your Kemp Design Model MicroSim has been generated and is ready for testing and deployment!

## What You Received

Your MicroSim package includes:

- **kemp-model.js** - The main p5.js JavaScript code implementing the Kemp model visualization
- **main.html** - HTML wrapper that loads p5.js and your JavaScript
- **index.md** - Complete documentation with element descriptions, comparisons, and applications
- **metadata.json** - Structured metadata following Dublin Core standards for discoverability
- **kemp-model.zip** - Compressed archive containing all files

## Quick Test

To test the MicroSim immediately:

1. Open the `main.html` file in any modern web browser
2. The MicroSim should load showing nine elements in a circle
3. Click any element to see its details
4. Try the "Show All Connections" checkbox
5. Enable "Animate Connections" to see the relationships flow

## What This MicroSim Demonstrates

This visualization helps learners understand the Kemp Design Model through:

**Nine Interconnected Elements:**
1. **Instructional Problems** (❓) - Identify learning needs
2. **Learner Characteristics** (👥) - Examine your audience
3. **Task Analysis** (📋) - Determine content and skills
4. **Instructional Objectives** (🎯) - State measurable outcomes
5. **Content Sequencing** (📊) - Arrange content logically
6. **Instructional Strategies** (💡) - Design teaching methods
7. **Instructional Delivery** (📱) - Plan delivery format
8. **Evaluation Instruments** (✅) - Develop assessments
9. **Support Services** (🛠️) - Select resources needed

**Key Kemp Principles:**
- Circular, non-sequential design
- Flexible starting point (any element)
- Holistic systems perspective
- All elements interconnected
- Continuous revision capability

**Interactive Features:**
- Click any element to see detailed information
- View connections between selected element and all others
- Toggle to show all connections simultaneously
- Animate connections to visualize relationships
- Color-coded elements with descriptive icons

## Installation for mkdocs Sites

If you're using this MicroSim in an mkdocs-based intelligent textbook:

### Step 1: Extract to Your Sims Directory

```bash
cd /path/to/your/project/docs/sims
unzip kemp-model.zip
```

### Step 2: Update Navigation

Edit your `mkdocs.yml` file to add the MicroSim to your navigation:

```yaml
nav:
  # ... your existing navigation ...
  - MicroSims:
    - Kemp Model: sims/kemp-model/index.md
    # or under Instructional Design section:
  - Concepts:
    - Instructional Design:
      - Kemp Design Model: sims/kemp-model/index.md
```

### Step 3: Test Locally

```bash
# From your project root
mkdocs serve
```

Then navigate to: `http://localhost:8000/sims/kemp-model/`

### Step 4: Deploy

```bash
# Commit your changes
git add .
git commit -m "Add Kemp Design Model MicroSim"
git push

# Deploy to GitHub Pages
mkdocs gh-deploy
```

## Embedding in Other Platforms

You can embed this MicroSim in any web page using an iframe:

```html
<iframe src="https://your-domain.github.io/sims/kemp-model/main.html" 
        width="100%" 
        height="652" 
        frameborder="0"
        scrolling="no">
</iframe>
```

The height should be 652 pixels (550px drawing area + 100px controls + 2px border).

## Embedding in Your Instructional Design Chapter

Add this to your `concepts/instructional-design.md` file in the Kemp Model section:

```markdown
### Interactive Kemp Design Model

Explore Kemp's flexible, holistic approach:

<iframe src="../../sims/kemp-model/main.html" 
        width="100%" 
        height="652" 
        frameborder="0"
        scrolling="no">
</iframe>

[View full documentation](../../sims/kemp-model/)
```

## Customization Options

### Easy Customizations

You can easily modify in `kemp-model.js`:

- **Element colors**: Change colors in `kempColors` array
- **Element descriptions**: Edit the `elements` array in `initializeElements()`
- **Circle radius**: Adjust `circleRadius` variable
- **Element size**: Change `elementRadius` variable
- **Canvas size**: Modify `drawHeight` and `controlHeight` variables

### Advanced Customizations

For more significant changes:

- Add more detailed element information
- Create guided tours through elements
- Implement project planning mode
- Add assessment questions
- Create comparison views with other models

## Educational Applications

### In Instructional Design Courses

Use this MicroSim to help students:
- Understand Kemp's flexibility advantage
- Compare circular vs. linear models
- Plan projects using Kemp framework
- Recognize element interdependencies

### In Project Management Training

Help project managers:
- Understand holistic project planning
- Plan flexible project approaches
- Coordinate multiple work streams
- Manage interdependent factors

### In Systems Thinking Courses

Demonstrate:
- Interconnected system elements
- Non-linear processes
- Holistic design thinking
- Flexible problem-solving

## Usage Tips

**For Students:**
1. Click through all nine elements to understand each one
2. Notice you can click in any order - that's the key!
3. Use "Show All Connections" to see interconnectedness
4. Compare to ADDIE's linear sequence

**For Instructors:**
1. Discuss why flexibility matters in real projects
2. Ask students which element they'd start with for different scenarios
3. Explore how changing one element affects others
4. Compare Kemp to ADDIE and SAM side-by-side

**For Designers:**
1. Use as a checklist for your projects
2. Map your current project to the nine elements
3. Identify which elements need more attention
4. Plan your design process flexibly

## Understanding the Visualization

### Circular Arrangement

Elements arranged in a circle to show:
- No fixed starting point
- All elements equally important
- Continuous process
- Non-hierarchical structure

### Connections

Lines between elements show:
- How elements influence each other
- Information flow between components
- Systemic interdependencies
- Holistic integration

### Details Panel

Clicking an element shows:
- Element description
- Key questions to address
- Practical examples
- Connection reminder

## Comparing All Four Models

If you have all four instructional design MicroSims:

**ADDIE** - Linear, systematic, five phases
**SAM** - Iterative, agile, three phases with cycles
**Kemp** - Circular, flexible, nine interconnected elements
**All** - Different approaches for different situations!

### When to Use Each

**Use ADDIE when:**
- Requirements are clear
- Compliance is needed
- Linear process preferred

**Use SAM when:**
- Requirements are unclear
- Speed is critical
- Prototyping is valued

**Use Kemp when:**
- Multiple factors must be balanced
- Flexibility is essential
- Holistic view is needed

## Technical Specifications

- **Framework**: p5.js v1.11.2
- **Canvas**: 800x650px (responsive width)
- **Browser Support**: All modern browsers
- **Mobile Friendly**: Yes
- **Accessibility**: Screen reader support included

## Key Learning Outcomes

After using this MicroSim, learners will be able to:

✓ Identify all nine Kemp elements
✓ Explain Kemp's flexibility advantage
✓ Understand element interconnections
✓ Choose appropriate starting points
✓ Apply Kemp to real projects
✓ Compare Kemp with other models

## Testing in the p5.js Editor

You can also test and modify the JavaScript code in the online p5.js editor:

1. Go to https://editor.p5js.org/
2. Copy the contents of `kemp-model.js`
3. Paste into the editor
4. Click the play button to run

Note: Some features may need adjustment for the online editor environment.

## Discussion Prompts

Use these with learners after they explore the MicroSim:

1. "Which element would you start with for a workplace training project? Why?"
2. "How does Kemp's flexibility help manage project uncertainties?"
3. "What happens if you completely skip an element?"
4. "Which elements are most interconnected? How can you tell?"
5. "When might Kemp's flexibility become a disadvantage?"

## Real-World Application Example

**Scenario**: Corporate leadership development program

**Why Kemp Works:**
- Learner characteristics vary widely (new managers to executives)
- Content exists but needs updating (task analysis available)
- Delivery must be flexible (in-person + online options)
- Budget constraints affect support services
- Evaluation requirements from HR (assessment-driven)

**Using Kemp:**
- Started with learner characteristics (most variable)
- Then addressed delivery (key constraint)
- Developed objectives based on both
- Adjusted task analysis for audience levels
- Sequenced content appropriately
- Designed strategies matching delivery
- Created evaluation meeting HR needs
- Identified support services within budget
- Continuously revised all elements

**Result**: Holistic approach accommodated all constraints flexibly

## Troubleshooting

**MicroSim not displaying?**
- Check that main.html is served from a web server (not file://)
- Verify that the p5.js CDN is accessible
- Check browser console for JavaScript errors

**Elements not clickable?**
- Ensure JavaScript is enabled
- Try clicking directly on the colored circles
- Check that you're clicking in the drawing area

**Connections not showing?**
- Click an element first, or
- Enable "Show All Connections" checkbox
- Try the "Animate Connections" option

**Details panel not appearing?**
- Ensure element is selected (click again)
- Check screen size (panel may reposition)
- Look for the colored panel on right side

## Support and Feedback

For questions, issues, or suggestions:

- Review the inline code comments for implementation details
- Check the index.md file for usage guidance
- Consult the metadata.json file for complete specifications
- Reference Kemp's original work for theoretical background

## License

This MicroSim is released under CC BY-SA 4.0, allowing you to:

- Share and adapt the content
- Use for commercial purposes
- Must give appropriate credit
- Must share adaptations under the same license

## Related MicroSims

Consider also exploring:

- **ADDIE Workflow** - Linear systematic approach
- **SAM Process** - Agile iterative approach
- **Cognitive Load Visualizer** - Managing working memory
- **Bloom's Taxonomy** - Levels of learning objectives

## Next Steps

1. **Test** the MicroSim in your browser
2. **Integrate** into your intelligent textbook or website
3. **Customize** element descriptions to match your context
4. **Use** in lessons on instructional design models
5. **Gather feedback** from students and educators
6. **Iterate** based on usage and learning outcomes

## Research Background

The Kemp Design Model was developed by Jerrold Kemp in 1977 and refined through multiple editions. Key insights:

- Instructional design is not inherently linear
- Real projects require flexibility and adaptation
- All design factors are interconnected
- Starting point should match project reality
- Continuous revision improves outcomes

The model gained popularity because:
- Reflects real-world design practice
- Accommodates diverse project types
- Supports holistic thinking
- Provides comprehensive coverage
- Remains relevant across contexts

## The Kemp Philosophy

**"Design is a continuous cycle of planning, developing, evaluating, and revising."**

This MicroSim embodies this philosophy by:
- Showing all elements simultaneously
- Allowing non-sequential exploration
- Emphasizing interconnections
- Supporting flexible navigation
- Promoting holistic thinking

Enjoy using your Kemp Design Model MicroSim to teach flexible, holistic instructional design!
