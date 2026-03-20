# About This Site

![](./img/nell-colored.png){ width="200", align="right" }
This website is part of a series of resources to help teachers from around the world create the foundation for free and open intelligent textbooks.

Our character to the right is **Nell**.  She is using
an intelligent textbook that adapts lessons to her needs.

Our focus today is to help instructors create [Level 2.9](./sims/book-levels/index.md) textbooks that have a [learning graph](./glossary.md#learning-graph) as their core data structure to ground content generation and guide learning agents.  Although Level 2.9 textbooks are interactive, they do not
store any student personal data so the text can adaptive to their needs.

## Our Book Generation Workflow

If you are new to the book generation process, we strongly suggest you use the following infographic MicroSim workflow to get a feeling of how we generate content but always keep humans in the loop to guide content generation process.

<iframe src="../sims/book-gen-workflow/main.html" height="610px" scrolling="no"
  style="overflow: hidden;"></iframe>

## The Mechanics of Book Building

After you get an overview of the steps to generate guided content around a learning graph, the next step is to understand the basic mechanics of getting your LLM content into a website.  Although there are are many ways to store intelligent textbooks on a website, this guide focuses on the best practices of using LLMs to generate Markdown and then convert that Markdown to a beautiful website built with HTML, CSS and JavaScript.

Many of our teachers can't afford expense service for hosting their intelligent textbooks.
Since GitHub Pages is a free service for public
website, we show how to use GitHub Pages and publishing tools that support Markdown, code highlighting and equations on GitHub.

## Why Mkdos Material?

When we gave ChatGPT the following requirements:

1. Content is stored in Markdown format
2. Easy publishing to GitHub Pages
3. Ability to store rich media (Infographics and MicroSims)
4. Ability to format concent such as equations and code with text highlighting

Here is the summary of ChatGPT's recommendation:

!!! Quote ""
    MkDocs with the Material Theme is the most aligned with your requirements due to its simplicity, robust features, and ease of deployment to GitHub Pages. It handles code 
    highlighting and mathematical formulas gracefully and has a straightforward configuration process.

We have also found the [mkdocs-material](https://squidfunk.github.io/mkdocs-material/) [support](https://squidfunk.github.io/mkdocs-material/support/) extremely good, with our questions
often being answered within hours.

Because of the close match of mkdocs-material's features with our intelligent textbook requirements,
we have created about 30 sample websites that test these tools.  We have also found that mkdocs-material can be quickly extended to support the features we need in advanced intelligent textbooks.

Note that these tools generate a [2.9 level](https://dmccreary.medium.com/five-levels-of-intelligent-textbooks-b81a4c1525a0)
intelligent textbook.  THis is up to but does not include personalization to the knowledge of the student.  This gets your textbook ready to move to level 3, where a knowledge graph of what concepts they are aware of are used to generate personalized content.

We hope the [glossary](./glossary.md) and [tutorials](./tutorial/index.md) we provide are useful.

## References

[Sample ChatGPT Dialog](https://chatgpt.com/c/674f69fe-5c68-8001-a63f-81e77f3c4b7c)

## About the Cover

Our cover features Nell, one of the main characters in the book "Diamond Age" by Neal Stephenson.

!!! prompt
    Please generate a detailed summary of the parts of the book "Diamond Age" by Neal Stephenson that deal with "The Primer".  Give examples of how content is created that is customized to the needs of students. (given to Anthropic Claude)

I'll create a detailed summary of "The Primer" from Neal Stephenson's "The Diamond Age" that follows mkdocs standards for formatting.

### The Primer in "The Diamond Age"

#### Overview of the Young Lady's Illustrated Primer

The Young Lady's Illustrated Primer is a revolutionary educational device in Neal Stephenson's novel "The Diamond Age: Or, A Young Lady's Illustrated Primer." Created by engineer John Percival Hackworth for a neo-Victorian leader's granddaughter, the Primer represents the ultimate intelligent textbook—a fully interactive, adaptive learning system embedded in the form of a book.

### Key Characteristics of the Primer

#### Adaptive Content Generation

The Primer exemplifies hyper-personalization, adapting its content to the individual needs of its reader. Unlike traditional textbooks with fixed content, the Primer generates material in real-time, creating a unique learning experience that evolves with the learner's progress and interests.

#### Interactive Learning

The Primer doesn't just present information; it actively engages its reader through:

- Interactive stories that respond to the reader's choices
- Embedded microsimulations (similar to MicroSims) that illustrate concepts through hands-on interaction
- Responsive characters that guide learning through dialogue and mentorship

#### Learning Graph Implementation

The Primer implicitly implements a learning graph—a directed network of concepts organized to reflect the optimal sequence for mastering new skills and knowledge areas. As the reader progresses, the Primer identifies knowledge gaps and dynamically adjusts its teaching strategies.

### The Primer's Impact on Characters

#### Nell's Experience

The main demonstration of the Primer's capabilities comes through Nell, an underprivileged girl who accidentally receives a copy. The Primer transforms her education by:

1. Beginning with basic literacy, teaching her to read through interactive storytelling
2. Gradually introducing more complex concepts as she masters foundational skills
3. Creating a fantasy narrative called "Princess Nell" that parallels her real-life challenges
4. Embedding coding and logical thinking exercises within the context of stories
5. Adapting its difficulty level based on her growing capabilities

For example, when teaching Nell about computer programming, the Primer presents the concept through a magical castle where she must arrange "magical symbols" (code) in the correct order to open doors—making abstract concepts concrete and personally meaningful.

#### Customization Examples

The Primer demonstrates several advanced customization techniques:

1. **Content Relevance**: When teaching Nell about defense, it uses scenarios with threatening characters similar to those in her real life
   
2. **Pace Adaptation**: The Primer identifies when Nell struggles with mathematics and creates multiple engaging scenarios to practice the same concepts until mastery
   
3. **Emotional Intelligence**: Recognizing Nell's emotional state, the Primer adjusts its tone and content—providing encouragement when needed or challenging material when she's confident
   
4. **Cultural Context**: The Primer incorporates elements of Nell's surroundings into its stories, making abstract concepts relatable

### Technical Implementation in the Novel

While necessarily futuristic, the Primer's functionality includes:

- A concept graph that maps relationships between ideas
- Deep linking capabilities that connect related concepts across different stories and lessons
- Embedding technology that analyzes the semantic meaning of content to identify conceptually similar material
- Semantic search capabilities that understand the contextual meaning of queries beyond simple keyword matching

### Modern Parallels

The novel presciently anticipates many features of modern intelligent textbooks, including real-time customization, chatbot integration, and agent-based learning. While contemporary technology has not yet achieved the Primer's level of sophistication, many of its core principles—adaptive learning paths, interactive simulations, and personalized content—are being implemented in current educational technologies.

### Philosophical Implications

The Primer raises important questions about education:

- The balance between standardized knowledge and personalized learning paths
- The role of human teachers versus technological education systems
- How educational content shapes personal development and worldview
- The ethical implications of AI-driven education that knows its students intimately

### Conclusion

The Young Lady's Illustrated Primer represents Neal Stephenson's vision of education's future—a continuously adaptive, deeply personalized learning companion that grows with its reader. Its ability to transform Nell from an illiterate, disadvantaged child into a highly educated leader demonstrates the potential of truly intelligent educational technology to democratize knowledge and overcome socioeconomic barriers to education.