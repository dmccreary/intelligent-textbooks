# Generating Analytics for Intelligent Textbook Quality Metrics

This prompt helps us generate a Python program that generates
additional quality metrics on an intelligent textbook that
is stored on a website where the source is markdown.  To
run the script you will need to have cloned the textbook on
a local drive.

!!! prompt
    We have already created python programs that do simple reporting on the counts of things like total number of markdown files, total word count, number of MicroSims and the number of terms in the glossary.
    
    What additional metrics can we use to measure the quality of content in a intelligent textbook?
    
    Please look in the project folder for the file `get-metrics-json.py` for an example of the type of metrics we are already gathering and the sample format for the JSON output of these metrics.

## Response

I'll help analyze metrics for intelligent textbooks based on the provided files. Let me break this down systematically.

From the provided files and examples, I can identify several key metrics that can help measure the quality of content in an intelligent textbook:

## 1. Quantitative Metrics (already being tracked in get-metrics-json.py):

- Markdown file count (content breadth)
- Image count (visual content)
- Word count (content depth)
- MicroSim count (interactive elements)
- Glossary term count (terminology coverage)

### 2. Additional Quality Metrics to Consider:

**Content Structure:*

- Learning graph completeness (prerequisites and dependencies mapped)
- Navigation depth and organization (from mkdocs.yml structure)
- Admonition usage (notes, warnings, tips that enhance learning)
- Quiz coverage per chapter
- Code example coverage
- Interactive element distribution

**Engagement Features:**

- MicroSim complexity and interactivity levels
- Feedback mechanisms implementation
- Google Analytics integration for usage tracking
- Student progress tracking capabilities
- Practice problem availability

**Technical Quality:**

- Build system completeness (proper mkdocs.yml configuration)
- Mobile responsiveness
- Accessibility compliance
- Load time performance
- Code quality in MicroSims

Let me create a tool to help evaluate these metrics:

[Advanced Metrics Python Program](https://github.com/dmccreary/mkdocs-for-intelligent-textbooks/blob/main/src/site-metrics/advanced-metrics.py)

Here is a sample report for the [Graph Systems Thinking](https://dmccreary.github.io/graph-systems-thinking) Site:

```
# Intelligent Textbook Quality Report

## Basic Metrics

- Markdown Files: 47
- Images: 25
- Word Count: 18029
- MicroSims: 3
- Glossary Terms: 38

## Content Structure

- Navigation Depth: 1
- Admonitions: 0
- Code Examples: 28

## Engagement Features

- Microsim Complexity:
  - Simple: 2
  - Medium: 1
  - Complex: 0
- Has Analytics: False

## Technical Quality

- Build Config Complete:
  - Site Name: True
  - Theme: True
  - Nav: True
- Responsive Design:
  - Mobile Navigation: False
```

This analyzer tool provides a comprehensive framework for evaluating intelligent textbooks. It measures:

1. Content Completeness:

- Proper navigation structure
- Balanced distribution of content types
- Comprehensive glossary coverage
- Learning graph implementation

2. Interactive Elements:

- MicroSim distribution and complexity
- Quiz coverage
- Practice problems
- Feedback mechanisms

3. Technical Implementation:

- Build system configuration
- Analytics integration
- Accessibility features
- Code quality

Would you like me to focus on any particular aspect of these metrics or help implement specific checks for any of these areas? I can also help create visualization tools to track these metrics across multiple textbooks in your collection.