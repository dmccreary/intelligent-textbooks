# The Five Levels of Intelligent Textbooks

<iframe src="../../sims/book-levels/main.html" width="600px" height="520px" scrolling="no"
  style="overflow: hidden;"></iframe>

## The Case for a Classification System

As artificial intelligence reshapes education, we face a critical question: how do we talk about intelligent textbooks in a meaningful, standardized way? Without a common vocabulary, educators, administrators, publishers, and policymakers struggle to evaluate products, set expectations, and establish appropriate regulations.

### Lessons from Autonomous Vehicles

The automotive industry faced a similar challenge with self-driving cars. In the early 2010s, manufacturers used vague terms like "autopilot," "semi-autonomous," and "driver assist" interchangeably, creating confusion for consumers and regulators alike. The breakthrough came in 2014 when the Society of Automotive Engineers (SAE) published **J3016**, defining six levels of driving automation (0-5):

| SAE Level | Name | Description |
|-----------|------|-------------|
| 0 | No Automation | Human does everything |
| 1 | Driver Assistance | Vehicle controls steering OR acceleration |
| 2 | Partial Automation | Vehicle controls steering AND acceleration; human monitors |
| 3 | Conditional Automation | Vehicle handles most driving; human intervenes when requested |
| 4 | High Automation | Vehicle handles all driving in defined conditions |
| 5 | Full Automation | Vehicle handles all driving in all conditions |

This classification transformed the industry. It enabled:

- **Clear communication** between manufacturers, regulators, and consumers
- **Appropriate regulation** at each level of autonomy
- **Realistic expectations** about what each system can and cannot do
- **Graduated liability frameworks** based on who (human or machine) controls the vehicle

Intelligent textbooks deserve the same clarity.

### Why Education Needs This Now

Three converging trends make classification urgent:

**1. Exponential AI Growth**

The capabilities of AI systems are advancing at an unprecedented pace. Large language models have progressed from generating simple text completions to engaging in sophisticated tutoring conversations in just a few years. What was experimental in 2020 is now widely deployed. What seems aspirational today may be commonplace by 2027. Educational institutions need a framework to evaluate these rapidly evolving capabilities.

**2. Proliferating Products**

The market is flooded with products claiming to be "AI-powered," "adaptive," or "intelligent." Without standardized classification, a textbook with basic keyword search and one with sophisticated personalization algorithms might both be marketed as "intelligent"—leaving educators unable to make informed decisions.

**3. Student Privacy at Stake**

Perhaps most critically, higher levels of textbook intelligence require increasingly detailed data about students. A static PDF collects nothing. An adaptive system tracks every click, every wrong answer, every moment of hesitation. An AI chatbot logs intimate questions students might never ask a human teacher. Without clear classification, we cannot have informed conversations about what data collection is appropriate—and what protections students deserve.

### The Privacy Threshold: Level 3 and Above

The five-level framework reveals a crucial inflection point at Level 3. Below this threshold, textbooks can function with minimal or no student data:

| Level | Data Requirements | Privacy Risk |
|-------|-------------------|--------------|
| **Level 1** (Static) | None | Minimal |
| **Level 2** (Interactive) | Anonymous usage analytics (optional) | Low |
| **Level 3** (Adaptive) | Individual learning histories, performance data | **Significant** |
| **Level 4** (Chatbot) | Conversation logs, question patterns, confusion signals | **High** |
| **Level 5** (Autonomous) | Comprehensive learner profiles, cognitive patterns | **Very High** |

This threshold matters for several reasons:

**Regulatory Implications**: In the United States, FERPA (Family Educational Rights and Privacy Act) and COPPA (Children's Online Privacy Protection Act) impose specific requirements on educational data. In Europe, GDPR requires explicit consent and data minimization. Level 3+ systems must be designed with these regulations in mind from the start.

**Institutional Responsibility**: When a textbook tracks individual student performance, the institution becomes a data custodian. This requires investment in security infrastructure, audit capabilities, data retention policies, and breach notification procedures.

**Student Trust**: Students may share vulnerabilities with an AI tutor they would never reveal to a human instructor. Questions like "I don't understand anything in this chapter" or searches for basic concepts can feel exposing. Level 4+ systems must earn and protect this trust.

**Algorithmic Bias**: Adaptive and AI-driven systems can inadvertently perpetuate or amplify biases present in their training data or algorithms. A system that tracks performance might unfairly label students, creating self-fulfilling prophecies. Classification helps us identify where bias auditing is essential.

### A Framework for Action

Just as SAE J3016 enabled the automotive industry to move forward responsibly, a clear intelligent textbook classification enables:

- **Educators** to select appropriate tools for their pedagogical goals
- **Administrators** to develop institutional policies proportional to each level's requirements
- **Publishers** to communicate capabilities honestly
- **Regulators** to craft targeted requirements rather than one-size-fits-all rules
- **Students** to understand what data they're sharing and why

The five levels presented in this chapter are not meant to be exhaustive or permanent. Technology evolves. New capabilities will emerge. But having a shared vocabulary—a common starting point—transforms the conversation from vague promises to concrete capabilities.

*All models are wrong, but some are useful.* — George Box

This framework serves as a guide to understand the progression of textbook intelligence and functionality. Organizations may find themselves implementing features across different levels or even bypassing certain levels as technology and pedagogical approaches evolve.

## Learning Graphs: The Foundation of Intelligent Textbooks

Before exploring the five levels, it's essential to understand the concept of learning graphs, which form the backbone of truly intelligent educational resources.

### What Are Learning Graphs?

Learning graphs are concept dependency graphs that help guide intelligent agents in building customized learning paths for each student. These graphs map out concepts within a subject and their prerequisites, enabling navigation through educational content in a structured, personalized manner.

![Example of a Learning Graph](../img/learning-graph-example.png)

With the advent of advanced AI models, generating comprehensive learning graphs has become increasingly efficient. These structured representations of knowledge domains are crucial because:

*Representation is the hardest part of AI.* — Jeff Hawkins

Learning graphs serve as the foundation upon which higher levels of textbook intelligence are built, particularly for adaptive and autonomous systems.

## The Five-Level Framework

### Level 1 — Static Textbooks

**Definition**: Static textbooks are traditional printed or digital formats with no interactive elements.

**Key Characteristics**:
- Composed purely of text and static images
- Linear progression through material
- No digital interactivity or personalization
- Fixed content that doesn't adapt to the learner

**Current Status**: Over 90% of textbooks used by college students today remain at Level 1.

**Use Cases**: Simple, short content delivery where interaction isn't necessary or where technology access is limited.

### Level 2 — Interactive Content Textbooks

**Definition**: Interactive textbooks incorporate digital elements that engage the reader beyond passive consumption.

**Key Characteristics**:
- Keyword search functionality
- Internal/external hyperlinks (e.g., to Wikipedia)
- Embedded videos and multimedia content
- Simple self-assessment quizzes
- AI-generated MicroSims for concept visualization
- Detailed glossary with in-text linking
- Compatibility with social sharing (rich previews)
- Usage analytics capabilities

**Implementation Tools**:
- Documentation platforms like mkdocs-material
- Development environments such as VS Code
- JavaScript libraries for interactive simulations

**Advantages**:
- Cost-effective enhancement of learning experiences
- Facilitates distributed learning through shareable components
- Improves engagement with multimedia elements
- Supports basic self-assessment

### Level 3 — Adaptive Textbooks

**Definition**: Adaptive textbooks dynamically adjust content based on user input, performance, and behavior.

**Key Characteristics**:
- Personalized learning pathways through deterministic rules
- Concept graph traversal algorithms for content sequencing
- Selection of material based on assessment performance
- Time-based rules for content review and reinforcement
- Continuous recording of concept mastery on personal learning graphs

**Technical Requirements**:
- Robust data management systems
- Graph algorithms and traversal mechanisms
- Vector stores and graph embeddings for content representation

**Considerations**:
- Privacy concerns with tracking individual performance
- Regulatory compliance (GDPR, FERPA)
- Significant investment in security and auditing
- Ethical implications of personalization

### Level 4 — Textbooks with Chatbots

**Definition**: Level 4 textbooks integrate intelligent conversational interfaces to provide real-time assistance and personalization.

**Key Characteristics**:

- Integration of Large Language Models (LLMs) as tutoring assistants
- GraphRAG architecture combining multiple AI technologies
- Real-time feedback on student questions
- Content recommendations based on progress and interactions
- Comprehensive logging of student-AI interactions

**Technical Architecture**:

- NLP pipelines for query understanding
- LLMs for response generation
- Embeddings and vector stores for efficient retrieval
- Learning graphs as "ground truth" for factual accuracy

**Implementation Strategies**:
- Balance between large, powerful LLMs and cost-effective smaller models
- Consideration of locally-run models (e.g., Ollama) for privacy and efficiency
- Careful design of logging mechanisms for performance tracking

### Level 5 — Autonomous AI Textbooks

**Definition**: The aspirational level where AI-driven systems fully understand individual learner needs and autonomously generate personalized learning experiences.

**Key Characteristics**:
- Deep understanding of individual student knowledge and goals
- Real-time generation of customized lessons through natural language
- Complete adaptability to learning styles and preferences
- Autonomous decision-making about learning progression
- Human-like tutoring capabilities with comprehensive support

**Future Requirements**:
- Advanced hardware optimized for graph operations
- More reliable and accurate LLMs
- Sophisticated privacy-preserving technologies
- Standardized frameworks for intelligent textbook interoperability

**Current Status**:
> "Level 5 textbooks are like cars that drive themselves under all conditions: during a heavy snowstorm at night on roads under heavy construction—in other words, not happening in the near term."

## Implementation Strategies and Considerations

### Flexible Implementation

Organizations don't necessarily need to progress sequentially through all five levels. Depending on specific needs and available technologies, it may be advantageous to:

- Skip certain levels entirely
- Implement features from multiple levels simultaneously
- Focus on particular aspects that deliver the most educational value

For example, moving directly from Level 2 (interactive) to leveraging LLMs (as in Level 4) for generating responses to student queries might bypass some regulatory challenges associated with storing personal learning data in Level 3 implementations.

### Key Considerations for Implementation

When developing intelligent textbooks at any level, consider:

1. **Educational Goals**: What are the primary learning objectives?
2. **Technical Resources**: What technologies and expertise are available?
3. **User Context**: What is the technological proficiency of target learners?
4. **Regulatory Environment**: What legal and ethical constraints apply?
5. **Scalability**: How will the solution grow with increasing users?
6. **Maintenance**: What ongoing support will be required?

### Measuring Success

Success metrics for intelligent textbooks should include:

- Learning outcomes and knowledge retention
- Student engagement and satisfaction
- Time efficiency in achieving learning objectives
- Accessibility across diverse learner populations
- Cost-effectiveness compared to traditional methods

## The Future of Intelligent Textbooks

As technologies continue to evolve, we can expect:

- Increasingly sophisticated learning graph generation
- More seamless integration of multiple modalities (text, video, simulations)
- Better standardization for exchanging intelligent textbook content
- Enhanced personalization with improved privacy safeguards
- Greater adoption of MicroSims and interactive elements

The ultimate vision is to provide equal learning opportunities for all students globally through advanced, accessible intelligent textbooks that adapt to individual needs while maintaining high educational standards.

> "Never mistake a clear view for a short distance." — Paul Saffo

## Summary

The five-level framework for intelligent textbooks provides a structured approach to understanding and implementing increasingly sophisticated educational resources:

- **Level 1**: Static textbooks with fixed content
- **Level 2**: Interactive textbooks with basic digital enhancements
- **Level 3**: Adaptive textbooks that personalize learning paths
- **Level 4**: Textbooks with integrated AI chatbots for assistance
- **Level 5**: Fully autonomous AI textbooks that function as comprehensive tutors

Learning graphs serve as the foundation for higher-level implementations, enabling structured representation of knowledge domains and prerequisites. While the full realization of Level 5 remains a future goal, significant advancements in Levels 2-4 are already transforming educational experiences for learners worldwide.

## Review Questions

1. Compare and contrast Level 2 and Level 3 intelligent textbooks. What key features differentiate them?

2. How do learning graphs contribute to the functionality of adaptive textbooks?

3. What privacy and ethical considerations emerge as textbooks become more intelligent?

4. Explain the GraphRAG architecture used in Level 4 textbooks. How does it enhance the learning experience?

5. Why might an organization choose to implement features from multiple levels rather than progressing sequentially through the framework?

## Practical Exercise

Design a learning graph for a topic in your field of expertise. Identify:

- Core concepts that must be understood
- Prerequisites for each concept
- Relationships between different concepts
- Potential assessment points to measure understanding

Use this learning graph to sketch how a Level 3 adaptive textbook might guide different learners through the material based on their prior knowledge and progress.

## Generative AI Project

Use a generative tool such as Anthropic Claude or OpenAI ChatGPT to ask it to 

- list the 100 core concepts in a course description you give it.  - ask it to build a learning dependency graph of these concepts
- create a graph viewer using vis.js
- for a given end goal, ask it to build a learning path that include all the dependent concepts you don't already know