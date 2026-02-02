# Book Outline: Building Intelligent Textbooks with AI

This document contains the detailed chapter outline for the print book.

## Preface: The Democratization of Education

## Chapter 1: What is an Intelligent Textbook?
- A five level model of intelligent textbooks
- AI is growing exponentially
- The METR 7-month doubling rate
- Examples of intelligent textbooks
- Features of intelligent textbook
- MicroSims
- Simplicity, Interactivity and AI
- Embedding MicroSims
- The role of a learning graph
- Ground truth
- Avoiding hallucination
- Open source
- Creative Commons
- Licensing books
- Observing copyright and using external images

## Chapter 2: How to Generate an Intelligent Textbook
- The book building process
- Generating HTML from Markdown
- Mkdocs and Material
- The Course Description
- Bloom Taxonomy of Learning Objectives
- The Concept List
- Ordering Concepts
- The Dependency Graph
- Generating the Dependency Graph
- Generating a Concept Taxonomy
- Balancing the taxonomy
- Generating a Book Ontology
- Generating chapter structures
- Balancing the chapter length
- Moving concepts and respecting dependency
- Generating chapter content
- Avoiding the wall of text
- Rules for non-pure test content
- Adding lists, tables, and diagrams
- Adding MicroSims
- Generating MicroSims

## Chapter 3: Adding Bells and Whistles
- Generating a Glossary of Terms
- Generating FAQs
- Generating quizzes
- Self assessment
- Quiz question types
- Multiple choice question generation
- Great distractors
- Formatting equations
- LaTeX
- KaTeX
- MathJax
- Admonitions
- Notes, quotes and callouts
- Generating a cover from the course description
- Generating logos and favicons
- Getting feedback
- Simple sentiment feedback
- Complex feedback forms
- Generating a Features Checklist

## Chapter 4: MicroSims
- Instructional design
- How humans learn
- The importance of interactive controls
- Types of MicroSims
- Infographics and Infoboxes
- Flash Cards and Memorization
- Matching Game MicroSims
- Charts and Graphs
- Making Charts Move
- Timelines
- Interactive Maps
- Geospatial tools and Leaflet
- Revisiting the Bloom Taxonomy
- Discovering learning objectives
- The Bloom verbs
- Matching levels and verbs to a MicroSim

## Chapter 5: Level 2 Book Analytics
- Google Analytics
- Metrics
- View
- Engagement
- Monitoring pageviews
- Monitoring scrolling
- Using Javascript for activity monitoring
- Instrumenting MicroSim activity
- Monitoring in-simulation actions
- Monitoring start simulation
- Monitoring slider activity

## Chapter 6: Going to Level 3
- Personalized learning
- The Personal Learning Graph
- Graph Traversal
- Assessing Knowledge
- Updating the Personal Learning Graph
- Inferring Prior Knowledge
- Recommending a concept
- Recommending
- Designing for Interactivity
- Drinking from the Event Firehose
- Pruning Events
- Analyzing Event Values

## Chapter 7: Learning Standards
- Why relational databases fail
- Modeling knowledge in a graph
- Models of courses
- Models of student knowledge
- Protecting student records
- xAPI
- Learning Record Stores
- Skills
- MicroSim metadata standard
- Example of MicroSim metadata
- The MicroSim metadata schema
- Dublin Core
- Semantic metadata
- Pedagogical Metadata
- Question 1: what is the microsim about
- Question 2: what is the learning objective
- Question 3: how was was the microsim created
- MicroSim faceted search
- Metadata quality reports
- Generating embeddings of metadata
- Intelligent textbook standards

## Chapter 8: Level 4 and 5 Textbooks
- The intelligent book chatbot
- Embeddings for FAQ
- Matching questions to FAQ
- Vector stores for storing question embeddings
- Nearness measures for questions
- Similarity for recommendations
- Similar subject
- Similar learning objectives
- Similar technical implementation
- Injecting similar microsims into the context window
- Cost of LLMs
- Preventing misuse
- Classifying questions
- Starting with FAQs
- Monitoring the chat history
- Logging chat events
- Issues and bug reporting feedback
- Using Github Kanban
- Using AI to write stories
- Using AI to write acceptance tests
- Using feedback for improvement
- Using reinforcement learning

## Chapter 9: Generating Skills
- What are AI Skills
- Skills and Agents
- Tasks, workflows and skill matching
- Managing the context window
- Case study: Claude Code Skills
- Skills as a standard
- Book Generation Skills
- The /generate-learning-graph skill
- The /book-installer skill
- The /quiz-generator skill
- The /faq-generator skill
- The /references-generator skill
- MicroSim Generation Skills
- The /microsim-generator skill
- The /microsim-util skill and standardization
- Limits to Concurrent Skill
- Search and Reuse
- Embeddings and Ad-Hoc MicroSims

## Chapter 10: The Future of Intelligent Textbooks
- Capabilities today
- Key limitations
- The layout challenge
- Limits to 3D MicroSims
- AI growth trends
- Tracking capabilities
- The METR studies
- Capabilities doubling ever seven months
- Keeping costs down
- Building an energy-respectful architecture
- Personalization without LLMs
