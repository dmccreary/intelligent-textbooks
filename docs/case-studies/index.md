---
title: "Case Studies"
description: Case studies about intelligent textbooks created by myself and others.
image: /case-studies/img/case-studies.jpg
og:image: /case-studies/img/case-studies.jpg
hide:
    - toc
---
# Case Studies in Building Intelligent Textbooks

This document provides 70 samples of some of the intelligent textbooks that have been created with our workflows.  This list is changing every day, so please check back
frequently.

<!-- This is inline CSS for the completion status icons at the end of each case study -->

<style>
.completion {
  display: inline-block;
  width: 80px;
  height: 10px;
  border-radius: 3px;
  background: #e0e0e0;
  cursor: pointer;
  vertical-align: middle;
  position: relative;
  overflow: hidden;
}
.completion::before {
  content: '';
  display: block;
  height: 100%;
  border-radius: 3px;
}
.completion-1::before { width: 20%; background: #d32f2f; }
.completion-2::before { width: 40%; background: #e65100; }
.completion-3::before { width: 60%; background: #f57c00; }
.completion-4::before { width: 80%; background: #9ccc65; }
.completion-5::before { width: 100%; background: #43a047; }

/* Segment lines */
.completion::after {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: repeating-linear-gradient(
    to right,
    transparent 0,
    transparent calc(20% - 1px),
    rgba(255,255,255,0.6) calc(20% - 1px),
    rgba(255,255,255,0.6) 20%
  );
}

/* Modal overlay */
.completion-modal-overlay {
  display: none;
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5);
  z-index: 9999;
  justify-content: center;
  align-items: center;
}
.completion-modal-overlay.active { display: flex; }
.completion-modal {
  background: var(--md-default-bg-color, #fff);
  color: var(--md-default-fg-color, #333);
  border-radius: 8px;
  padding: 24px 28px;
  max-width: 420px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.2);
  font-size: 14px;
  line-height: 1.6;
}
.completion-modal h3 { margin-top: 0; }
.completion-modal .level-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 6px 0;
}
.completion-modal .level-row .completion {
  flex-shrink: 0;
  cursor: default;
}
.completion-modal-close {
  margin-top: 16px;
  padding: 6px 16px;
  border: none;
  border-radius: 4px;
  background: var(--md-primary-fg-color, #4051b5);
  color: #fff;
  cursor: pointer;
}
</style>

<!-- Modal (single instance for the page) -->
<div class="completion-modal-overlay" id="completionModal">
  <div class="completion-modal">
    <h3>Book Completion Status</h3>
    <p>This icon indicates the development stage of each intelligent textbook:</p>
    <div class="level-row"><span class="completion completion-1"></span> Early Development</div>
    <div class="level-row"><span class="completion completion-2"></span> Initial Content</div>
    <div class="level-row"><span class="completion completion-3"></span> In Progress</div>
    <div class="level-row"><span class="completion completion-4"></span> Nearly Complete</div>
    <div class="level-row"><span class="completion completion-5"></span> Complete</div>
    <button class="completion-modal-close" onclick="document.getElementById('completionModal').classList.remove('active')">Close</button>
  </div>
</div>

<script>
document.addEventListener('click', function(e) {
  var el = e.target.closest('.completion:not(.completion-modal .completion)');
  if (el) {
    document.getElementById('completionModal').classList.add('active');
  }
  var overlay = document.getElementById('completionModal');
  if (e.target === overlay) {
    overlay.classList.remove('active');
  }
});
</script>

<div class="grid cards grid-3-col" markdown>

- **[A Skeptic's Guide to Quantum Computing](https://dmccreary.github.io/quantum-computing/)**

    ![A Skeptic's Guide to Quantum Computing](./img/quantum-computing.jpg)

    An evidence-based interactive intelligent textbook examining why quantum computing may never be economically viable, covering physics constraints, hardware realities, investment risk, and cognitive biases. Designed for upper-division undergraduates, graduate students, technology investors, and policymakers.

    [:octicons-mark-github-16: Repository](https://github.com/dmccreary/quantum-computing) · 241 Concepts · 17 Chapters · 200K Words · 241 Glossary Terms · 53 MicroSims

- **[AI Assisted Geometry](https://dmccreary.github.io/geometry-course)**

    ![AI Assisted Geometry](./img/geometry-course.jpg)

    An online interactive intelligent textbook for high-school geometry using MicroSims. Features a detailed learning graph and over 130 interactive geometry MicroSims.

    [:octicons-mark-github-16: Repository](https://github.com/dmccreary/geometry-course) · 12 Chapters · 171K Words · 138 MicroSims · <span class="completion completion-5" title="Complete (5/5)"></span>

- **[AI Based Data Science with Python](https://dmccreary.github.io/data-science-course)**

    ![AI Based Data Science](./img/data-science-course.jpg)

    An AI-based course that helps undergraduate college students learn data science with Python. Includes a detailed learning graph.

    [:octicons-mark-github-16: Repository](https://github.com/dmccreary/data-science-course) · 21 Files · 23K Words · 143 Glossary Terms · <span class="completion completion-5" title="Complete (5/5)"></span>

- **[AI Circuits Course](https://dmccreary.github.io/circuits/)**

    ![AI Circuits Course](./img/circuits.jpg)

    Learn electronic circuits with AI-powered simulations and knowledge graphs. Created to support the circuits course at the University of Minnesota.

    [:octicons-mark-github-16: Repository](https://github.com/dmccreary/circuits) · 113 Files · 154K Words · 23 MicroSims · <span class="completion completion-1" title="Early Development (1/5)"></span>

- **[AI Infographics](https://dmccreary.github.io/infographics/)**

    ![AI Infographics](./img/infographics.jpg)

    An AI-assisted guide that teaches non-programmers how to design high-quality detailed interactive infographic MicroSims with many examples, prompts, templates, and workflow examples for intelligent textbooks.  Many examples from the Biology textbook.

    [:octicons-mark-github-16: Repository](https://github.com/dmccreary/infographics) · 20 Chapters ·  · Learning Mascot · <span class="completion completion-5" title="Complete (5/5)"></span>

- **[AI Racing League](https://coderdojotc.github.io/ai-racing-league)**

    ![AI Racing League](./img/ai-racing-league.png)

    A fun way of teaching AI and machine learning using a $300 RC car with a Raspberry Pi and Camera. Supports DonkeyCar projects.

    [:octicons-mark-github-16: Repository](https://github.com/CoderDojoTC/ai-racing-league) · 107 Files · 39K Words · <span class="completion completion-1" title="Early Development (1/5)"></span>

- **[Algebra I](https://dmccreary.github.io/algebra-1)**

    ![Algebra I](./img/algebra-1.jpg)

    An introductory course to Algebra covering fundamental concepts and skills with many interactive simulations. Designed for high school students.

    [:octicons-mark-github-16: Repository](https://github.com/dmccreary/algebra-1) · Active Development · <span class="completion completion-5" title="Complete (5/5)"></span>

- **[AP Biology: An Interactive Course](https://dmccreary.github.io/biology/)**

    ![AP Biology](./img/biology.jpg)

    Interactive intelligent textbook for AP Biology designed for advanced high school students preparing for the AP exam. Covers all eight College Board units with MicroSims, a 375+ concept learning graph, and AP exam strategies.

    [:octicons-mark-github-16: Repository](https://github.com/dmccreary/biology) · 20 Chapters · 213K Words · 89 MicroSims - many complex biological drawings · <span class="completion completion-5" title="Complete (5/5)"></span>

- **[AP Calculus](https://dmccreary.github.io/calculus)**

    ![AP Calculus](./img/calculus.jpg)

    Interactive AP Calculus textbook for high school students with 23 chapters, 100 MicroSims, and Delta the robot mascot. Covers both AB and BC curricula.

    [:octicons-mark-github-16: Repository](https://github.com/dmccreary/calculus) · 208 Files · 248K Words · 100 MicroSims · 230 Glossary Terms · <span class="completion completion-5" title="Complete (5/5)"></span>

- **[AP Chemistry](https://dmccreary.github.io/chemistry/)**

    ![AP Chemistry](./img/chemistry.jpg)

    Interactive intelligent textbook for AP Chemistry designed for high school students seeking college credit. Features 18 chapters, SMILES molecule rendering, mhchem equation support, and an interactive learning graph.

    [:octicons-mark-github-16: Repository](https://github.com/dmccreary/chemistry) · 45 Files · 23K Words · 5 MicroSims · <span class="completion completion-5" title="Complete (5/5)"></span>

- **[Architectural Tradeoff Analysis Method](https://dmccreary.github.io/atam/)**

    ![ATAM](./img/atam.jpg)

    ATAM is a method for evaluating software architecture, applied to database selection. Companion to 'Making Sense of NoSQL'.

    [:octicons-mark-github-16: Repository](https://github.com/dmccreary/atam) · Early Stage · <span class="completion completion-1" title="Early Development (1/5)"></span>

- **[ASL Book](https://Olufsonc-hub.github.io/asl-book/)**

    An intelligent textbook on American Sign Language designed to help students learn ASL through interactive content.

    [:octicons-mark-github-16: Repository](https://github.com/Olufsonc-hub/asl-book) · <span class="completion completion-1" title="Early Development (1/5)"></span>

- **[Automating Instructional Design](https://dmccreary.github.io/automating-instructional-design/)**

    ![Automating Instructional Design](./img/automating-instructional-design.jpg)

    A hands-on guide to automating instructional design tasks using AI and other tools. Covers workflows for course development.

    [:octicons-mark-github-16: Repository](https://github.com/dmccreary/automating-instructional-design) · <span class="completion completion-5" title="Complete (5/5)"></span>

- **[Beginning Electronics with AI](https://dmccreary.github.io/beginning-electronics)**

    ![Beginning Electronics](./img/beginning-electronics.jpg)

    An online course using MicroSims to help junior high and high school students learn the basics of electronics.

    [:octicons-mark-github-16: Repository](https://github.com/dmccreary/beginning-electronics) · 40 Files · 16K Words · 6 MicroSims · <span class="completion completion-1" title="Early Development (1/5)"></span>

- **[Building AI Agents with Python](https://dmccreary.github.io/agents-course/)**

    ![Building AI Agents](./img/agents-course.jpg)

    Creating intelligent agents with Python and LLMs. Early stage development focused on modern agent architectures.

    [:octicons-mark-github-16: Repository](https://github.com/dmccreary/agents-course) · <span class="completion completion-1" title="Early Development (1/5)"></span>

- **[Clan MacQuarrie](https://dmccreary.github.io/clan-macquarrie/)**

    ![Clan MacQuarrie](./img/clan-macquarrie.jpg)

    Educational resources on the history of the Scottish clan system with a focus on Clan MacQuarrie heritage and traditions.

    [:octicons-mark-github-16: Repository](https://github.com/dmccreary/clan-macquarrie) · <span class="completion completion-1" title="Early Development (1/5)"></span>

- **[Claude Skills for Intelligent Textbooks](https://dmccreary.github.io/claude-skills/)**

    ![Claude Skills](./img/claude-skills.jpg)

    A collection of skills and techniques for building intelligent textbooks using Claude AI. Includes prompts, workflows, and best practices.

    [:octicons-mark-github-16: Repository](https://github.com/dmccreary/claude-skills) · <span class="completion completion-5" title="Complete (5/5)"></span>

- **[Clocks and Watches with AI](https://dmccreary.github.io/clocks-and-watches)**

    ![Clocks and Watches](./img/clocks-and-watches.jpg)

    Learn to design and build digital clocks and watches using breadboards, microcontrollers, RTCs, and displays. Many complete sample clocks and watches ready for classroom testing.

    [:octicons-mark-github-16: Repository](https://github.com/dmccreary/clocks-and-watches) · 124 Files · 37K Words · 11 MicroSims · <span class="completion completion-3" title="Many examples of clocks and watches (3/5)"></span>

- **[Control Systems](https://dmccreary.github.io/control-systems)**

    ![Control Systems](./img/control-systems.jpg)

    Upper-division undergraduate course on classical control theory. Covers feedback, Laplace transforms, Bode plots, root locus, Nyquist stability, and PID design with Gyra the balancing robot.

    [:octicons-mark-github-16: Repository](https://github.com/dmccreary/control-systems) · 70 Files · 152K Words · 6 MicroSims · 297 Glossary Terms · <span class="completion completion-4" title="Full chapter content with only 6 MicroSims (4/5)"></span>

- **[Conversational AI](https://dmccreary.github.io/conversational-ai)**

    ![Conversational AI](./img/conversational-ai.jpg)

    A college-level course on creating chatbots. Covers NLP foundations, semantic search, LLMs, embeddings, and vector databases.

    [:octicons-mark-github-16: Repository](https://github.com/dmccreary/conversational-ai) · Active Development · <span class="completion completion-5" title="In Progress (5/5)"></span>

- **[Computer Science with Python](https://dmccreary.github.io/computer-science)**

    ![Computer Science with Python](./img/computer-science.jpg)

    An interactive, AI-assisted textbook for AP Computer Science using Python. Features 400 mapped concepts, 20 chapters, and MicroSims to make abstract computing ideas concrete for high school and early college learners.

    [:octicons-mark-github-16: Repository](https://github.com/dmccreary/computer-science) · 58 Files · 153K Words · 17 MicroSims · 400 Glossary Terms · <span class="completion completion-5" title="Complete (5/5)"></span>

- **[Deep Learning with AI](https://dmccreary.github.io/deep-learning-course)**

    ![Deep Learning](./img/deep-learning-course.jpg)

    Undergraduate Deep Learning Course with Dr. Sang-Hyun Oh at the University of Minnesota.

    [:octicons-mark-github-16: Repository](https://github.com/dmccreary/deep-learning-course) · <span class="completion completion-2" title="Early Development (2/5)"></span>

- **[Digital Design With Programmable Logic](https://mcbasken.github.io/umn-senior-design/)**

    Digital design course focusing on programmable logic devices and FPGAs.

    [:octicons-mark-github-16: Repository](https://github.com/mcbasken/umn-senior-design) · <span class="completion completion-1" title="Early Development (1/5)"></span>

- **[Digital Electronics with AI](https://dmccreary.github.io/digital-electronics)**

    ![Digital Electronics](./img/digital-electronics.jpg)

    Undergraduate course with MicroSims for learning digital electronics using breadboards, LEDs, buttons, and logic gates (~$50 in parts).

    [:octicons-mark-github-16: Repository](https://github.com/dmccreary/digital-electronics) · 86 Files · 171K Words · 8 MicroSims · <span class="completion completion-3" title="Full chapter content with limited MicroSims (3/5)"></span>

- **[Digital Transformation 2.0 with Generative AI](https://yarmoluk.github.io/Digital-Transformation-with-AI-Spring-2026/)**

    ![Digital Transformation with AI](./img/digital-transformation-ai.png)

    Graduate course (SEIS 666) at University of St. Thomas exploring how generative AI reshapes digital transformation, business models, and workforce dynamics. By Daniel Yarmoluk.

    [:octicons-mark-github-16: Repository](https://github.com/Yarmoluk/Digital-Transformation-with-AI-Spring-2026) · 81 Files · 109K Words · 33 MicroSims · 223 Glossary Terms · <span class="completion completion-4" title="Nearly Complete (4/5)"></span>

- **[Economics Course](https://dmccreary.github.io/economics-course/)**

    ![Economics Course](./img/economics-course.jpg)

    Interactive intelligent textbook on Introduction to Economics for high school students covering microeconomics, macroeconomics, personal finance, and the digital economy.

    [:octicons-mark-github-16: Repository](https://github.com/dmccreary/economics-course) · 29 Files · 82K Words · Early Stage · <span class="completion completion-2" title="Initial Content (2/5)"></span>

- **[Ethics in Modern Society](https://dmccreary.github.io/ethics-course)**

    ![Ethics Course](./img/ethics-course.jpg)

    Ethical issues backed by critical thinking and data science. Covers harm measurement, impact analysis, and systems thinking.

    [:octicons-mark-github-16: Repository](https://github.com/dmccreary/ethics-course) · MicroSims included · <span class="completion completion-5" title="Complete (5/5)"></span>

- **[FFT Benchmarking](https://dmccreary.github.io/fft-benchmarking/)**

    ![FFT Benchmarking](./img/fft-benchmarking.jpg)

    A collection of resources for learning about Fast Fourier Transforms and benchmarking techniques across platforms.

    [:octicons-mark-github-16: Repository](https://github.com/dmccreary/fft-benchmarking) · <span class="completion completion-3" title="In Progress (3/5)"></span>

- **[Fluid Power Systems](https://dmccreary.github.io/fluid-power-systems/)**

    ![Fluid Power Systems](./img/fluid-power-systems.jpg)

    Interactive textbook for technicians working with HVAC, vacuum, compressed air, cooling water, dust collection, hydraulics, pumping, and fan systems. Created with Peter Vinck at Inflow Corporation.

    [:octicons-mark-github-16: Repository](https://github.com/dmccreary/fluid-power-systems) · 36 Files · 20K Words · 3 MicroSims · 103 Glossary Terms · <span class="completion completion-3" title="In Progress (3/5)"></span>

- **[GED Science Prep](https://camgross.github.io/GED-Science-prep/)**

    ![GED Science Prep](./img/ged-science-prep.jpg)

    Intelligent textbook for GED Science test preparation covering Life Science, Physical Science, and Earth & Space Science. Aligned with the official GED Science Assessment Targets and eight Science Practices.

    [:octicons-mark-github-16: Repository](https://github.com/camgross/GED-Science-prep) · 27 Files · 12K Words · 7 MicroSims · <span class="completion completion-2" title="Initial Content (2/5)"></span>

- **[Generative AI Architecture Patterns](https://dmccreary.github.io/genai-arch-patterns)**

    ![GenAI Architecture Patterns](./img/genai-arch-patterns.jpg)

    Helps software architects understand how to use generative AI to create and maintain AI architecture patterns.

    [:octicons-mark-github-16: Repository](https://github.com/dmccreary/genai-arch-patterns) · 34 Files · 7K Words · <span class="completion completion-1" title="Early Development (1/5)"></span>

- **[Generative AI for Teachers](https://coderdojotc.github.io/chatgpt-for-teachers)**

    Helps teachers understand how to use generative AI to create and maintain AI teaching materials. Many sample prompts.

    [:octicons-mark-github-16: Repository](https://github.com/CoderDojoTC/chatgpt-for-teachers) · 98 Files · 19K Words · 100 MicroSims · <span class="completion completion-1" title="Early Development (1/5)"></span>

- **[Generative AI Strategy](https://dmccreary.github.io/cmm-for-genai)**

    Helps business leaders understand how to use generative AI to create and maintain their AI business strategy.

    [:octicons-mark-github-16: Repository](https://github.com/dmccreary/cmm-for-genai) · 22 Files · 7K Words · 3 MicroSims · <span class="completion completion-1" title="Early Development (1/5)"></span>

- **[Graph Algorithms with AI](https://dmccreary.github.io/graph-algorithms)**

    ![Graph Algorithms](./img/graph-algorithms.webp)

    MicroSims to help undergraduate college students learn graph algorithms using various JavaScript libraries.

    [:octicons-mark-github-16: Repository](https://github.com/dmccreary/graph-algorithms) · 71 Files · 30K Words · 15 MicroSims · <span class="completion completion-1" title="Early Development (1/5)"></span>

- **[Graph Data Modeling with AI](https://dmccreary.github.io/graph-data-modeling-course)**

    ![Graph Data Modeling](./img/graph-data-modeling-course.jpg)

    MicroSims for graph data modeling. Example models created for a variety of domains using vis.js.

    [:octicons-mark-github-16: Repository](https://github.com/dmccreary/graph-data-modeling-course) · 49 Files · 13K Words · 156 Glossary Terms · <span class="completion completion-3" title="In Progress (3/5)"></span>

- **[Graph Learning Management Systems](https://dmccreary.github.io/graph-lms)**

    ![Graph LMS](./img/graph-lms.png)

    How graphs are used to build AI learning management systems. Created for startups integrating AI into production LMS.

    [:octicons-mark-github-16: Repository](https://github.com/dmccreary/graph-lms) · 17 Files · 8K Words · 10 MicroSims · <span class="completion completion-1" title="Early Development (1/5)"></span>

- **[GraphRAG](https://dmccreary.github.io/graph-rag)**

    An online course teaching concepts around GraphRAG (Retrieval Augmented Generation with graphs).

    [:octicons-mark-github-16: Repository](https://github.com/dmccreary/graph-rag) · 14 Files · 8K Words · 33 Glossary Terms · <span class="completion completion-1" title="Early Development (1/5)"></span>

- **[Intelligent Textbooks](https://dmccreary.github.io/intelligent-textbooks)**

    ![Intelligent Textbooks](./img/intelligent-textbooks.jpg)

    Tutorial for building intelligent textbooks using mkdocs-material. Contains detailed tutorials and best practices.

    [:octicons-mark-github-16: Repository](https://github.com/dmccreary/intelligent-textbooks) · 12K Words · 4 MicroSims · <span class="completion completion-3" title="In Progress (3/5)"></span>

- **[Introduction to Graph Databases](https://dmccreary.github.io/intro-to-graph)**

    ![Intro to Graph](./img/intro-to-graph.jpg)

    Interactive textbook covering graph databases: graph thinking, data modeling, NoSQL, labeled property graphs, and query languages.

    [:octicons-mark-github-16: Repository](https://github.com/dmccreary/intro-to-graph) · Extensive MicroSims · <span class="completion completion-3" title="In Progress (3/5)"></span>

- **[Introduction to Microcontrollers with PIC24](https://irvinggsea.github.io/i-book-v1/)**

    Introduction to microcontrollers using the PIC24 platform for embedded systems education.

    [:octicons-mark-github-16: Repository](https://github.com/irvinggsea/i-book-v1) · <span class="completion completion-1" title="Early Development (1/5)"></span>

- **[Introduction to Operating Systems](https://btlepak.github.io/Intelligent_Textbook/)**

    Fundamentals of operating systems including process management, memory, and file systems.

    [:octicons-mark-github-16: Repository](https://github.com/btlepak/Intelligent_Textbook) · <span class="completion completion-1" title="Early Development (1/5)"></span>

- **[Introduction to Physics](https://dmccreary.github.io/intro-to-physics-course)**

    ![Intro to Physics](./img/intro-to-physics-course.jpg)

    Year-long intro physics course covering motion, forces, energy, waves, optics, and electricity with MicroSims.

    [:octicons-mark-github-16: Repository](https://github.com/dmccreary/intro-to-physics-course) · Active Development · <span class="completion completion-5" title="Complete (5/5)"></span>

- **[Investor Relations](https://dberglu.github.io/ir-textbook/)**

    Executive-level course on AI-powered IR modernization by David Berglund. 15 chapters with full content.

    [:octicons-mark-github-16: Repository](https://github.com/dberglu/ir-textbook) · Glossary, FAQs, Quizzes, MicroSims · <span class="completion completion-5" title="Complete (5/5)"></span>

- **[IT Management with Graphs](https://dmccreary.github.io/it-management-graph)**

    ![IT Management with Graphs](./img/it-management-graph.jpg)

    IT management using graph databases. Covers ITIL, configuration management, asset management, and IT operations.

    [:octicons-mark-github-16: Repository](https://github.com/dmccreary/it-management-graph) · Active Development · <span class="completion completion-3" title="In Progress (3/5)"></span>

- **[Learning Graphs](https://dmccreary.github.io/learning-graphs)**

    ![Learning Graphs](./img/learning-graphs.jpg)

    Creation and maintenance of learning graphs. Extensive examples using vis.js for visualization.

    [:octicons-mark-github-16: Repository](https://github.com/dmccreary/learning-graphs) · 74 Files · 33K Words · 47 Glossary Terms · <span class="completion completion-3" title="In Progress (3/5)"></span>

- **[Learning Linux](https://dmccreary.github.io/learning-linux/)**

    ![Learning Linux](./img/learning-linux.jpg)

    A comprehensive 15-week course teaching high school students Linux fundamentals including command line, file systems, and scripting.

    [:octicons-mark-github-16: Repository](https://github.com/dmccreary/learning-linux) · <span class="completion completion-5" title="Complete (5/5)"></span>

- **[Learning MicroPython with AI](https://dmccreary.github.io/learning-micropython)**

    ![Learning MicroPython](./img/learning-micropython.png)

    Helps kids learn MicroPython on microcontrollers using fun low-cost projects. Thousands of monthly users worldwide.

    [:octicons-mark-github-16: Repository](https://github.com/dmccreary/learning-micropython) · 204 Files · 63K Words · <span class="completion completion-1" title="Early Development (1/5)"></span>

- **[Linear Algebra for AI and Machine Learning](https://dmccreary.github.io/linear-algebra)**

    ![Linear Algebra for AI and Machine Learning](./img/linear-algebra.jpg)

    A college-level course bridging abstract linear algebra with real-world AI applications. Covers vectors, matrices, eigenvalues, neural networks, computer vision, and autonomous systems.

    [:octicons-mark-github-16: Repository](https://github.com/dmccreary/linear-algebra) · 206 Files · 195K Words · 126 MicroSims · 299 Glossary Terms · <span class="completion completion-5" title="Complete (5/5)"></span>

- **[Machine Learning: Algorithms and Applications](https://anvithpothula.github.io/machine-learning-textbook/)**

    ![Machine Learning Textbook](./img/machine-learning-textbook.png)

    Comprehensive intelligent textbook on machine learning for college undergraduates. Covers supervised learning, unsupervised learning, neural networks, CNNs, and transfer learning with Python code examples.

    [:octicons-mark-github-16: Repository](https://github.com/AnvithPothula/machine-learning-textbook) · 60 Files · 103K Words · 18 MicroSims · 199 Glossary Terms · <span class="completion completion-5" title="Complete (5/5)"></span>

- **[McCreary Family Heritage](https://dmccreary.github.io/mccreary-heritage/)**

    ![McCreary Heritage](./img/mccreary-heritage.jpg)

    Educational resources for teaching Scottish, Irish, and immigration history with a focus on building critical thinking skills.

    [:octicons-mark-github-16: Repository](https://github.com/dmccreary/mccreary-heritage) · <span class="completion completion-1" title="Early Development (1/5)"></span>

- **[MicroSim Search](https://dmccreary.github.io/search-microsims/)**

    ![MicroSim Search](./img/search-microsims.jpg)

    Client-side faceted search system for educational MicroSims. Crawls GitHub repositories to collect metadata and provides browser-based search with filtering by subject, grade level, Bloom's Taxonomy, and framework.

    [:octicons-mark-github-16: Repository](https://github.com/dmccreary/search-microsims) · 125 Files · 138K Words · 58 MicroSims · <span class="completion completion-1" title="Early Development (1/5)"></span>

- **[MicroSims](https://dmccreary.github.io/microsims)**

    ![MicroSims](./img/microsims.jpg)

    Showcase for creating MicroSims using JavaScript and p5.js across diverse subjects.

    [:octicons-mark-github-16: Repository](https://github.com/dmccreary/microsims) · 88 Files · 18K Words · 66 MicroSims · <span class="completion completion-5" title="Complete (5/5)"></span>

- **[MicroSims for Electrical Engineering](https://kenn0727.github.io/ee-microsims)**

    11 MicroSims created by University of Minnesota EE students using p5.js and prompt engineering.

    [:octicons-mark-github-16: Repository](https://github.com/kenn0727/ee-microsims) · 14 Files · 12 MicroSims · <span class="completion completion-1" title="Early Development (1/5)"></span>

- **[Modeling Healthcare Data with Graphs](https://dmccreary.github.io/modeling-healthcare-data)**

    ![Modeling Healthcare Data](./img/modeling-healthcare-data.jpg)

    Undergraduate textbook on graph-based healthcare data modeling: patient-centric models, provider operations, clinical workflows.

    [:octicons-mark-github-16: Repository](https://github.com/dmccreary/modeling-healthcare-data) · Active Development · <span class="completion completion-3" title="In Progress (3/5)"></span>

- **[Moving Rainbow](https://dmccreary.github.io/moving-rainbow)**

    ![Moving Rainbow](./img/moving-rainbow.jpg)

    Using colorful addressable LED strips and noodles for hands-on computational thinking projects with MicroPython.

    [:octicons-mark-github-16: Repository](https://github.com/dmccreary/moving-rainbow) · 49 Files · 17K Words · <span class="completion completion-4" title="Nearly Complete (4/5)"></span>

- **[Neurodiversity Course](https://dmccreary.github.io/neurodiversity-course/)**

    Course on neurodiversity awareness and inclusion strategies.

    [:octicons-mark-github-16: Repository](https://github.com/dmccreary/neurodiversity-course) · <span class="completion completion-1" title="Early Development (1/5)"></span>

- **[Organizational Analytics with AI](https://dmccreary.github.io/organizational-analytics)**

    ![Organizational Analytics with AI](./img/organizational-analytics.jpg)

    Interactive textbook teaching how to use graph databases, AI, and NLP to unlock hidden insights in HR data including influence, collaboration, sentiment, and organizational health.

    [:octicons-mark-github-16: Repository](https://github.com/dmccreary/organizational-analytics) · 151 Files · 203K Words · 73 MicroSims · 201 Glossary Terms · <span class="completion completion-5" title="Complete (5/5)"></span>

- **[Personal Finance](https://dmccreary.github.io/personal-finance/)**

    ![Personal Finance](./img/personal-finance.jpg)

    Helps high school students learn personal finance with MicroSims, infographics, and graphic novel storytelling.

    [:octicons-mark-github-16: Repository](https://github.com/dmccreary/personal-finance) · <span class="completion completion-5" title="Complete (5/5)"></span>

- **[Prompt Engineering Class](https://dmccreary.github.io/prompt-class)**

    ![Prompt Engineering](./img/prompt-class.jpg)

    Hands-on labs covering lists, Mermaid diagrams, markdown tables, p5.js visualizations, and data science applications.

    [:octicons-mark-github-16: Repository](https://github.com/dmccreary/prompt-class) · Active Development · <span class="completion completion-1" title="Early Development (1/5)"></span>

- **[Reading for Kindergarten](https://dmccreary.github.io/reading-for-kindergarten/)**

    ![Reading for Kindergarten](./img/reading-for-kindergarten.jpg)

    An intelligent textbook for teaching reading skills to kindergarten students with age-appropriate interactive content.

    [:octicons-mark-github-16: Repository](https://github.com/dmccreary/reading-for-kindergarten) · <span class="completion completion-5" title="Complete (5/5)"></span>

- **[Robot Day](https://dmccreary.github.io/robot-day)**

    Resources for single-day STEM events with hands-on projects leading to understanding collision-avoidance robots.

    [:octicons-mark-github-16: Repository](https://github.com/dmccreary/robot-day) · 52 Files · 26K Words · <span class="completion completion-1" title="Early Development (1/5)"></span>

- **[Semiconductor Physics Course](https://dmccreary.github.io/semiconductor-physics-course)**

    ![Semiconductor Physics](./img/semiconductor-physics-course.jpg)

    College-level semiconductor physics with interactive simulations including PN Junction visualization.

    [:octicons-mark-github-16: Repository](https://github.com/dmccreary/semiconductor-physics-course) · Early Stage · <span class="completion completion-1" title="Early Development (1/5)"></span>

- **[Signal Processing](https://dmccreary.github.io/signal-processing)**

    ![Signal Processing](./img/signal-processing.jpg)

    Demonstrates using generative AI to create undergraduate signal processing courses.

    [:octicons-mark-github-16: Repository](https://github.com/dmccreary/signal-processing) · 53 Files · 28K Words · 6 MicroSims · <span class="completion completion-5" title="Complete (5/5)"></span>

- **[Spectrum Analyzer](https://dmccreary.github.io/spectrum-analyzer/)**

    ![Spectrum Analyzer](./img/spectrum-analyzer.png)

    Build a spectrum analyzer using Raspberry Pi Pico and a microphone with detailed hardware and software tutorials.

    [:octicons-mark-github-16: Repository](https://github.com/dmccreary/spectrum-analyzer) · <span class="completion completion-1" title="Early Development (1/5)"></span>

- **[STEM Classroom Administration](https://dmccreary.github.io/stem-classroom-admin/)**

    ![STEM Classroom Admin](./img/stem-classroom-admin.jpg)

    Helps teachers use AI to setup and administer a STEM classroom with a focus on computational thinking and microcontrollers.

    [:octicons-mark-github-16: Repository](https://github.com/dmccreary/stem-classroom-admin) · <span class="completion completion-1" title="Early Development (1/5)"></span>

- **[STEM Robots](https://dmccreary.github.io/stem-robots)**

    ![STEM Robots](./img/stem-robots.png)

    STEM and robotics using the Raspberry Pi RP2040 on low-cost robotics kits for computational thinking.

    [:octicons-mark-github-16: Repository](https://github.com/dmccreary/stem-robots) · 74 Files · 18K Words · 5 MicroSims · <span class="completion completion-1" title="Early Development (1/5)"></span>

- **[Systems Thinking in the Age of AI](https://dmccreary.github.io/systems-thinking)**

    ![Systems Thinking](./img/systems-thinking.jpg)

    Interactive resources for teaching systems thinking from high school to executive level. Multiple course descriptions.

    [:octicons-mark-github-16: Repository](https://github.com/dmccreary/systems-thinking) · MicroSims included · <span class="completion completion-1" title="Early Development (1/5)"></span>

- **[Tracking AI](https://dmccreary.github.io/tracking-ai-course)**

    ![Tracking AI](./img/tracking-ai-course.jpg)

    Tracking AI progress for strategy consulting in education and knowledge management organizations.

    [:octicons-mark-github-16: Repository](https://github.com/dmccreary/tracking-ai-course) · 47 Files · 18K Words · 3 MicroSims · <span class="completion completion-3" title="In Progress (3/5)"></span>

- **[Trigonometric Functions](https://stage03.iowerx.com:8443/)**

    Foundational course on relationships between angles and sides in right triangles by Hank Ratzesberger. 200 concepts.

    High School · Bridges algebra and geometry

- **[Understanding Dementia](https://rtanler.github.io/Dementia/)**

    ![Understanding Dementia](./img/dementia.jpg)

    AI-generated intelligent textbook on dementia and cognitive decline for patients, caregivers, families, and healthcare professionals. Features 200 interconnected concepts in a learning graph. By rtanler.

    [:octicons-mark-github-16: Repository](https://github.com/rtanler/Dementia) · 34 Files · 44K Words · 1 MicroSim · 200 Concepts · <span class="completion completion-3" title="In Progress (3/5)"></span>

- **[US Geography](https://dmccreary.github.io/us-geography)**

    ![US Geography](./img/us-geography.jpg)

    Interactive intelligent geography for grade school students (3rd-6th grade). Explore all 50 states with clickable maps, zoomable regions, and discovery challenges.

    [:octicons-mark-github-16: Repository](https://github.com/dmccreary/us-geography) · 85 Files · 81K Words · 34 MicroSims · 200 Glossary Terms · <span class="completion completion-5" title="Complete (5/5)"></span>

</div>
