---
title: "Case Studies"
description: Case studies about intelligent textbooks created by myself and others.
image: /case-studies/img/case-studies.jpg
og:image: /case-studies/img/case-studies.jpg
hide:
    - toc
---
# Case Studies in Building Intelligent Textbooks

This document provides 100 samples of some of the intelligent textbooks that have been created with our workflows.  This list is changing every day, so please check back
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

    An evidence-based interactive intelligent textbook examining why quantum computing may never be economically viable, covering physics constraints, hardware realities, investment risk, and cognitive biases.  Designed for upper-division undergraduates, graduate students, technology investors, and policymakers.

    241 Concepts · 17 Chapters · 52 MicroSims · 18 Stories · 271K Words · 241 Glossary Terms · 93 FAQs · 170 Quiz Questions · 170 References
    · <span class="completion completion-5" title="Complete (5/5)"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/dmccreary/quantum-computing)
- **[AI Assisted Geometry](https://dmccreary.github.io/geometry-course)**

    ![AI Assisted Geometry](./img/geometry-course.jpg)

    An online interactive intelligent textbook for high-school geometry using MicroSims. Features a detailed learning graph and over 130 interactive geometry MicroSims.

    200 Concepts · 12 Chapters · 173 MicroSims · 184K Words · 69 Glossary Terms · 81 FAQs · 132 Quiz Questions
    · <span class="completion completion-5" title="Complete (5/5)"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/dmccreary/geometry-course)
- **[AI Based Data Science with Python](https://dmccreary.github.io/data-science-course)**

    ![AI Based Data Science](./img/data-science-course.jpg)

    An AI-based course that helps undergraduate college students learn data science with Python. Includes a detailed learning graph.

    300 Concepts · 14 Chapters · 20 MicroSims · 86K Words · 295 Glossary Terms
    · <span class="completion completion-5" title="Complete (5/5)"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/dmccreary/data-science-course)
- **[AI Circuits Course](https://dmccreary.github.io/circuits/)**

    ![AI Circuits Course](./img/circuits.jpg)

    Learn electronic circuits with AI-powered simulations and knowledge graphs. Created to support the circuits course at the University of Minnesota.

    300 Concepts · 16 Chapters · 75 MicroSims · 193K Words · 55 Glossary Terms · 72 FAQs · 26 Quiz Questions
    · <span class="completion completion-5" title="Complete (5/5)"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/dmccreary/circuits)
- **[Interactive Infographics with AI](https://dmccreary.github.io/infographics/)**

    ![AI Infographics](./img/infographics.jpg)

    An AI-assisted guide that teaches non-programmers how to design high-quality detailed interactive infographic MicroSims with many examples, prompts, templates, and workflow examples for intelligent textbooks.  Many examples come from the [Biology](ttps://github.com/dmccreary/biology) textbook.

    350 Concepts · 14 Chapters · 81 MicroSims · 2 Stories · 180K Words · 350 Glossary Terms · 72 FAQs · 140 Quiz Questions · 10 References
    · <span class="completion completion-5" title="Complete (5/5)"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/dmccreary/infographics)
- **[AI Racing League](https://dmccreary.github.io/ai-racing-league)**

    ![AI Racing League](./img/ai-racing-league.jpg)

    A fun way of teaching AI and machine learning using a $300 RC car with a Raspberry Pi and Camera. Supports DonkeyCar projects.

    35K Words · 19 Glossary Terms
    · <span class="completion completion-2" title="Early Development (2/5)"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/dmccreary/ai-racing-league)
- **[Algebra I](https://dmccreary.github.io/algebra-1)**

    ![Algebra I](./img/algebra-1.jpg)

    An introductory course to Algebra covering fundamental concepts and skills with many interactive simulations. Designed for high school students.

    200 Concepts · 13 Chapters · 13 MicroSims · 93K Words · 197 Glossary Terms · 82 FAQs · 135 Quiz Questions
    · <span class="completion completion-5" title="Complete (5/5)"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/dmccreary/algebra-1)
- **[Architecture Tradeoff Analysis Method (ATAM)](https://dmccreary.github.io/atam/)**

    ![ATAM](./img/atam.jpg)

    ATAM is a method for evaluating software architectures.  This is a 14-week
    course for senior undergraduate or graduate school software engineering students
    that are focused on software and hardware architectures.  This method
    is used in other textbooks such as the Selecting the Right Database textbook.

    350 Concepts · 18 Chapters · 1 MicroSim · 100K Words
    · <span class="completion completion-1" title="Early Development (1/5)"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/dmccreary/atam)
- **[Biology: An Interactive Course](https://dmccreary.github.io/biology/)**

    ![Biology](./img/biology.jpg)

    Interactive intelligent textbook for Biology designed for advanced high school students preparing for a college credit exam. Covers all eight College Board units with MicroSims, a 375+ concept learning graph, and college credit exam strategies.

    380 Concepts · 20 Chapters · 86 MicroSims · 2 Stories · 219K Words · 378 Glossary Terms · 110 FAQs · 30 Quiz Questions
    · <span class="completion completion-5" title="Complete (5/5)"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/dmccreary/biology-textbook)
- **[Calculus](https://dmccreary.github.io/calculus)**

    ![Calculus](./img/calculus.jpg)

    Interactive Calculus textbook for high school students with 23 chapters, 100 MicroSims, and Delta the robot mascot. Covers both AB and BC curricula.  Designed to help you get college credit.

    380 Concepts · 23 Chapters · 123 MicroSims · 243K Words · 230 Glossary Terms · 72 FAQs · 230 Quiz Questions · 230 References
    · <span class="completion completion-5" title="Complete (5/5)"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/dmccreary/calculus)
- **[Chemistry](https://dmccreary.github.io/chemistry/)**

    ![Chemistry](./img/chemistry.jpg)

    Interactive intelligent textbook for Chemistry designed for high school students seeking college credit. Features 18 chapters, SMILES molecule rendering, mhchem equation support, and an interactive learning graph.

    500 Concepts · 18 Chapters · 46 MicroSims · 2 Stories · 210K Words · 472 Glossary Terms · 70 FAQs · 180 Quiz Questions · 60 References
    · <span class="completion completion-5" title="Complete (5/5)"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/dmccreary/chemistry)
- **[ASL Book](https://Olufsonc-hub.github.io/asl-book/)**

    An intelligent textbook on American Sign Language designed to help students learn ASL through interactive content.

    200 Concepts · 2 MicroSims · 1K Words
    · <span class="completion completion-1" title="Early Development (1/5)"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/Olufsonc-hub/asl-book)
- **[Automating Instructional Design](https://dmccreary.github.io/automating-instructional-design/)**

    ![Automating Instructional Design](./img/automating-instructional-design.jpg)

    A hands-on guide to automating instructional design tasks using AI and other tools. Covers workflows for course development.

    200 Concepts · 13 Chapters · 91 MicroSims · 1 Story · 163K Words · 198 Glossary Terms · 60 FAQs · 120 Quiz Questions
    · <span class="completion completion-5" title="Complete (5/5)"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/dmccreary/automating-instructional-design)
- **[Ancient History](https://dmccreary.github.io/ancient-history/)**

    ![Ancient History Cover](./img/ancient-history.jpg)

    An interactive intelligent textbook covering ancient world history from cosmic origins through post-classical civilizations (to ~1200 CE). Organized around the UCLA "World History for Us All" Big Era framework with a learning graph of 297 concepts.

    297 Concepts · 16 Chapters · 1 MicroSim · 101K Words · 250 Glossary Terms
    · <span class="completion completion-4" title="Early Development (4/5)"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/dmccreary/ancient-history)
- **[Beginning Electronics with AI](https://dmccreary.github.io/beginning-electronics)**

    ![Beginning Electronics](./img/beginning-electronics.jpg)

    An online course using MicroSims to help junior high and high school students learn the basics of electronics.

    9 MicroSims · 21K Words
    · <span class="completion completion-1" title="Early Development (1/5)"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/dmccreary/beginning-electronics)
- **[Bioinformatics](https://dmccreary.github.io/bioinformatics/)**

    ![Bioinformatics](./img/bioinformatics.jpg)

    Interactive intelligent textbook for bioinformatics covering sequence analysis, structural biology, network analysis, knowledge graphs, and multi-omics integration with graph-based approaches throughout.

    480 Concepts · 16 Chapters · 55 MicroSims · 204K Words · 480 Glossary Terms · 91 FAQs · 160 Quiz Questions · 160 References
    · <span class="completion completion-5" title="Complete (5/5)"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/dmccreary/bioinformatics)
- **[Blockchain: A Skeptic's Guide to Trust Technologies](https://dmccreary.github.io/blockchain/)**

    ![Blockchain](./img/blockchain.jpg)

    An interactive intelligent textbook examining blockchain, certificate authorities, cost analysis, architecture tradeoffs, and cognitive biases in technology decisions.

    200 Concepts · 20 Chapters · 34 MicroSims · 99K Words · 200 Glossary Terms · 76 FAQs
    · <span class="completion completion-1" title="Complete (1/5)"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/dmccreary/blockchain)
- **[Building AI Agents with Python](https://dmccreary.github.io/agents-course/)**

    ![Building AI Agents](./img/agents-course.jpg)

    Creating intelligent agents with Python and LLMs. Early stage development focused on modern agent architectures.

    5 MicroSims · 27K Words · 45 Glossary Terms
    · <span class="completion completion-1" title="Early Development (1/5)"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/dmccreary/agents-course)
- **[Clan MacQuarrie](https://dmccreary.github.io/clan-macquarrie/)**

    ![Clan MacQuarrie](./img/clan-macquarrie.jpg)

    Educational resources on the history of the Scottish clan system with a focus on Clan MacQuarrie heritage and traditions.

    5 MicroSims · 54K Words · 2 Glossary Terms
    · <span class="completion completion-1" title="Early Development (1/5)"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/dmccreary/clan-macquarrie)
- **[Claude Skills for Intelligent Textbooks](https://dmccreary.github.io/claude-skills/)**

    ![Claude Skills](./img/claude-skills.jpg)

    A collection of skills and techniques for building intelligent textbooks using Claude AI. Includes prompts, workflows, and best practices.

    200 Concepts · 17 Chapters · 93 MicroSims · 178K Words · 208 Glossary Terms · 66 FAQs · 140 Quiz Questions
    · <span class="completion completion-5" title="Complete (5/5)"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/dmccreary/claude-skills)
- **[Clocks and Watches with AI](https://dmccreary.github.io/clocks-and-watches)**

    ![Clocks and Watches](./img/clocks-and-watches.jpg)

    Learn to design and build digital clocks and watches using breadboards, microcontrollers, RTCs, and displays. Many complete sample clocks and watches ready for classroom testing.

    12 MicroSims · 53K Words · 154 Glossary Terms
    · <span class="completion completion-3" title="Many examples of clocks and watches (3/5)"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/dmccreary/clocks-and-watches)
- **[Context Graph: How Organizations Use LLMs Cost Effectively](https://dmccreary.github.io/context-graph/)**

    ![Context Graph](./img/context-graph.jpg)

    An intelligent textbook for enterprise architects, AI/ML practitioners, and technical product managers on building context graphs — enterprise graph structures that get the right organizational knowledge into an LLM's prompt in the fewest tokens. Features 22 chapters, 496 concepts, 47 MicroSims, and Nexus the Spider as the pedagogical mascot.

    496 Concepts · 22 Chapters · 46 MicroSims · 217K Words · 498 Glossary Terms · 85 FAQs · 220 Quiz Questions · 220 References
    · <span class="completion completion-5" title="Complete (5/5)"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/dmccreary/context-graph)
- **[Control Systems](https://dmccreary.github.io/control-systems)**

    ![Control Systems](./img/control-systems.jpg)

    Upper-division undergraduate course on classical control theory. Covers feedback, Laplace transforms, Bode plots, root locus, Nyquist stability, and PID design with Gyra the balancing robot.

    300 Concepts · 16 Chapters · 6 MicroSims · 1 Story · 144K Words · 297 Glossary Terms · 69 FAQs · 160 Quiz Questions
    · <span class="completion completion-4" title="Full chapter content with only 6 MicroSims (4/5)"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/dmccreary/control-systems)
- **[Conversational AI](https://dmccreary.github.io/conversational-ai)**

    ![Conversational AI](./img/conversational-ai.jpg)

    A college-level course on creating chatbots. Covers NLP foundations, semantic search, LLMs, embeddings, and vector databases.

    200 Concepts · 14 Chapters · 8 MicroSims · 122K Words · 200 Glossary Terms · 91 FAQs · 140 Quiz Questions
    · <span class="completion completion-5" title="In Progress (5/5)"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/dmccreary/conversational-ai)
- **[Computer Science with Python](https://dmccreary.github.io/computer-science)**

    ![Computer Science with Python](./img/computer-science.jpg)

    An interactive, AI-assisted textbook for college credit Computer Science using Python. Features 400 mapped concepts, 20 chapters, and MicroSims to make abstract computing ideas concrete for high school and early college learners.

    400 Concepts · 20 Chapters · 121 MicroSims · 138K Words · 400 Glossary Terms · 45 FAQs
    · <span class="completion completion-5" title="Complete (5/5)"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/dmccreary/computer-science)
- **[Cybersecurity: Foundations, Practice, and Professional Responsibility](https://dmccreary.github.io/cybersecurity/)**

    ![Cybersecurity](./img/cybersecurity.jpg)

    An ABET CAC-aligned intelligent textbook covering cryptography, software security, network defense, system hardening, governance, and ethics for undergraduate students of cybersecurity, computer science, and information systems.

    390 Concepts · 16 Chapters · 1 MicroSim · 140K Words · 390 Glossary Terms · 90 FAQs
    · <span class="completion completion-4" title="Complete (4/5)"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/dmccreary/cybersecurity)
- **[Deep Learning with AI](https://dmccreary.github.io/deep-learning-course)**

    ![Deep Learning](./img/deep-learning-course.jpg)

    Undergraduate Deep Learning Course with Dr. Sang-Hyun Oh at the University of Minnesota.

    12 MicroSims · 9 Stories · 45K Words · 202 Glossary Terms
    · <span class="completion completion-2" title="Early Development (2/5)"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/dmccreary/deep-learning-course)
- **[Digital Citizenship: Building Safe, Kind and Balanced Lives Online](https://dmccreary.github.io/digital-citizenship/)**

    ![Digital Citizenship](./img/digital-citizenship.jpg)

    An interactive intelligent textbook for grades 5-9 on building safe, kind, and balanced lives online, aligned to the ISTE Student Standards.

    265 Concepts · 17 Chapters · 8 MicroSims · 15 Stories · 174K Words · 267 Glossary Terms · 91 FAQs · 170 Quiz Questions · 170 References
    · <span class="completion completion-5" title="Complete (5/5) - The Mini Graphic Novels are awesome!"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/dmccreary/digital-citizenship)
- **[Digital Design With Programmable Logic](https://mcbasken.github.io/umn-senior-design/)**

    Digital design course focusing on programmable logic devices and FPGAs.

    [:octicons-mark-github-16: Repository](https://github.com/mcbasken/umn-senior-design) · <span class="completion completion-1" title="Early Development (1/5)"></span>
- **[Digital Electronics with AI](https://dmccreary.github.io/digital-electronics)**

    ![Digital Electronics](./img/digital-electronics.jpg)

    Undergraduate course with MicroSims for learning digital electronics using breadboards, LEDs, buttons, and logic gates (~$50 in parts).

    300 Concepts · 15 Chapters · 8 MicroSims · 143K Words · 297 Glossary Terms · 71 FAQs · 150 Quiz Questions · 75 References
    · <span class="completion completion-3" title="Full chapter content with limited MicroSims (3/5)"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/dmccreary/digital-electronics)
- **[Digital Transformation 2.0 with Generative AI](https://yarmoluk.github.io/Digital-Transformation-with-AI-Spring-2026/)**

    ![Digital Transformation with AI](./img/digital-transformation-ai.png)

    Graduate course (SEIS 666) at University of St. Thomas exploring how generative AI reshapes digital transformation, business models, and workforce dynamics. By Daniel Yarmoluk.

    200 Concepts · 11 Chapters · 34 MicroSims · 92K Words · 47 FAQs
    · <span class="completion completion-4" title="Nearly Complete (4/5)"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/Yarmoluk/Digital-Transformation-with-AI-Spring-2026)
- **[Economics Course](https://dmccreary.github.io/economics-course/)**

    ![Economics Course](./img/economics-course.jpg)

    Interactive intelligent textbook on Introduction to Economics for high school students covering microeconomics, macroeconomics, personal finance, and the digital economy.

    206 Concepts · 14 Chapters · 81 MicroSims · 15 Stories · 240K Words · 206 Glossary Terms · 86 FAQs · 140 Quiz Questions · 140 References
    · <span class="completion completion-4" title="Initial Content (4/5)"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/dmccreary/economics-course)
- **[Ecology: Systems Thinking for a Changing Planet](https://dmccreary.github.io/ecology/)**

    ![Ecology](./img/ecology.jpg)

    An interactive intelligent textbook for high school students (grades 9-12) on ecosystems, biodiversity, populations, climate change, and environmental policy, with a focus on systems thinking and scientific literacy.

    380 Concepts · 17 Chapters · 83 MicroSims · 17 Stories · 339K Words · 381 Glossary Terms · 102 FAQs · 170 Quiz Questions · 170 References
    · <span class="completion completion-5" title="Initial Content (5/5)"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/dmccreary/ecology)
- **[English Language Arts](https://dmccreary.github.io/english-language-arts)**

    ![English Language Arts](./img/english-language-arts.jpg)

    An interactive intelligent textbook for US high school students (grades 9–12) covering the complete Common Core ELA curriculum: reading literature, informational text, writing, speaking, listening, and language conventions.

    295 Concepts · 17 Chapters · 21 MicroSims · 263K Words · 295 Glossary Terms · 83 FAQs · 170 Quiz Questions · 170 References
    · <span class="completion completion-5" title="Initial Content (5/5)"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/dmccreary/english-language-arts)
- **[Ethics in Modern Society](https://dmccreary.github.io/ethics-course)**

    ![Ethics Course](./img/ethics-course.jpg)

    Ethical issues backed by critical thinking and data science. Covers harm measurement, impact analysis, and systems thinking.

    250 Concepts · 9 Chapters · 14 MicroSims · 1 Story · 100K Words · 248 Glossary Terms · 49 FAQs · 97 Quiz Questions
    · <span class="completion completion-5" title="Complete (5/5)"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/dmccreary/ethics-course)
- **[FFT Benchmarking](https://dmccreary.github.io/fft-benchmarking/)**

    ![FFT Benchmarking](./img/fft-benchmarking.jpg)

    A collection of resources for learning about Fast Fourier Transforms and benchmarking techniques across platforms.

    200 Concepts · 3 Chapters · 2 MicroSims · 4K Words · 2 Glossary Terms
    · <span class="completion completion-2" title="In Progress (2/5)"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/dmccreary/fft-benchmarking)
- **[Fluid Power Systems](https://dmccreary.github.io/fluid-power-systems/)**

    ![Fluid Power Systems](./img/fluid-power-systems.jpg)

    Interactive textbook for technicians working with HVAC, vacuum, compressed air, cooling water, dust collection, hydraulics, pumping, and fan systems. Created with Peter Vinck at Inflow Corporation.

    12 Chapters · 3 MicroSims · 12K Words · 103 Glossary Terms
    · <span class="completion completion-3" title="In Progress (3/5)"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/dmccreary/fluid-power-systems)
- **[Food Science for 9th Grade](https://dmccreary.github.io/food-science)**

    ![Food Science for 9th Grade](./img/food-science.jpg)

    Year-long intelligent textbook for 9th graders exploring the chemistry, biology, and physics of food through virtual MicroSim labs and hands-on kitchen experiments. Covers 15 chapters from kitchen chemistry to food engineering.

    241 Concepts · 15 Chapters · 31 MicroSims · 12 Stories · 193K Words · 241 Glossary Terms · 89 FAQs · 150 Quiz Questions · 150 References
    · <span class="completion completion-5" title="Complete (5/5)"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/dmccreary/food-science)
- **[Forensic Science](https://dmccreary.github.io/forensic-science/)**

    ![Forensic Science](./img/forensic-science.jpg)

    Open-source intelligent textbook for high school students (grades 9–12) covering 19 chapters across six forensic modules — from trace evidence and biological analysis to digital forensics and OSINT. Features a learning graph of 278 concepts, guided by the mascot Trace the Raccoon.

    278 Concepts · 19 Chapters · 38 MicroSims · 12 Stories · 248K Words · 258 Glossary Terms · 70 FAQs · 190 Quiz Questions · 190 References
    · <span class="completion completion-5" title="Complete (5/5)"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/dmccreary/forensic-science)
- **[GED Science Prep](https://camgross.github.io/GED-Science-prep/)**

    ![GED Science Prep](./img/ged-science-prep.jpg)

    Intelligent textbook for GED Science test preparation covering Life Science, Physical Science, and Earth & Space Science. Aligned with the official GED Science Assessment Targets and eight Science Practices.

    12K Words · 7 MicroSims
    · <span class="completion completion-2" title="Initial Content (2/5)"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/camgross/GED-Science-prep)
- **[Generative AI Architecture Patterns](https://dmccreary.github.io/genai-arch-patterns)**

    ![GenAI Architecture Patterns](./img/genai-arch-patterns.jpg)

    Helps software architects understand how to use generative AI to create and maintain AI architecture patterns.

    3 MicroSims · 1 Story · 17K Words · 16 Glossary Terms
    · <span class="completion completion-1" title="Early Development (1/5)"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/dmccreary/genai-arch-patterns)
- **[Generative AI for Teachers](https://coderdojotc.github.io/chatgpt-for-teachers)**

    Helps teachers understand how to use generative AI to create and maintain AI teaching materials. Many sample prompts.

    19K Words · 100 MicroSims
    · <span class="completion completion-1" title="Early Development (1/5)"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/CoderDojoTC/chatgpt-for-teachers)
- **[Generative AI Strategy](https://dmccreary.github.io/cmm-for-genai)**

    Helps business leaders understand how to use generative AI to create and maintain their AI business strategy.

    7K Words · 3 MicroSims
    · <span class="completion completion-1" title="Early Development (1/5)"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/dmccreary/cmm-for-genai)
- **[Genetics: Analysis, Genomics, and Modern Inference](https://dmccreary.github.io/genetics/)**

    ![Genetics](./img/genetics.jpg)

    An interactive intelligent textbook for advanced high school and early undergraduate students covering genetic analysis, genomics, and modern inference.

    450 Concepts · 18 Chapters · 58 MicroSims · 114K Words · 450 Glossary Terms
    · <span class="completion completion-5" title="Early Development (5/5)"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/dmccreary/genetics)
- **[Graph Algorithms with AI](https://dmccreary.github.io/graph-algorithms)**

    ![Graph Algorithms](./img/graph-algorithms.webp)

    MicroSims to help undergraduate college students learn graph algorithms using various JavaScript libraries.

    17 MicroSims · 32K Words · 84 Glossary Terms
    · <span class="completion completion-2" title="Early Development (2/5)"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/dmccreary/graph-algorithms)
- **[Graph Data Modeling with AI](https://dmccreary.github.io/graph-data-modeling-course)**

    ![Graph Data Modeling](./img/graph-data-modeling-course.jpg)

    MicroSims for graph data modeling. Example models created for a variety of domains using vis.js.

    259 Concepts · 26 Chapters · 5 MicroSims · 35K Words · 156 Glossary Terms
    · <span class="completion completion-3" title="In Progress (3/5)"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/dmccreary/graph-data-modeling-course)
- **[Graph Learning Management Systems](https://dmccreary.github.io/graph-lms)**

    ![Graph LMS](./img/graph-lms.png)

    How graphs are used to build AI learning management systems. Created for startups integrating AI into production LMS.

    6 MicroSims · 25K Words · 80 Glossary Terms
    · <span class="completion completion-1" title="Early Development (1/5)"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/dmccreary/graph-lms)
- **[GraphRAG](https://dmccreary.github.io/graph-rag)**

    An online course teaching concepts around GraphRAG (Retrieval Augmented Generation with graphs).

    8K Words · 33 Glossary Terms
    · <span class="completion completion-1" title="Early Development (1/5)"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/dmccreary/graph-rag)
- **[Hydroponics: From Mason Jar to Vertical Farm](https://dmccreary.github.io/hydroponics)**

    ![Hydroponics: From Mason Jar to Vertical Farm](./img/hydroponics.jpg)

    An interactive intelligent textbook on hydroponics for advanced high-school and college students, featuring MicroSims that bring plant physiology, nutrient science, and system design to life.

    500 Concepts · 21 Chapters · 30 MicroSims · 192K Words · 500 Glossary Terms · 210 Quiz Questions · 210 References
    · <span class="completion completion-5" title="Complete (5/5)"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/dmccreary/hydroponics)
- **[Information Systems](https://dmccreary.github.io/information-systems/)**

    ![Information Systems](./img/information-systems.jpg)

    An ABET CAC-aligned, AI-forward intelligent textbook on Information Systems for college sophomores and juniors — from "what is data?" to "what is an Enterprise Nervous System?"

    580 Concepts · 25 Chapters · 44 MicroSims · 269K Words · 64 Glossary Terms · 111 FAQs · 250 Quiz Questions · 250 References
    · <span class="completion completion-5" title="In Progress (5/5)"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/dmccreary/information-systems)
- **[Intelligent Textbooks](https://dmccreary.github.io/intelligent-textbooks)**

    ![Intelligent Textbooks](./img/intelligent-textbooks.jpg)

    Tutorial for building intelligent textbooks using mkdocs-material. Contains detailed tutorials and best practices.

    31 MicroSims · 1 Story · 86K Words · 50 Glossary Terms
    · <span class="completion completion-4" title="In Progress (4/5)"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/dmccreary/intelligent-textbooks)
- **[Introduction to 3D Printing](https://dmccreary.github.io/3d-printing-course/)**

    ![Introduction to 3D Printing](./img/3d-printing-course.jpg)

    An interactive intelligent textbook with MicroSims to teach high-school students about 3D printing, designed to maximize the probability of college credit.

    292 Concepts · 16 Chapters · 46 MicroSims · 169K Words · 292 Glossary Terms · 81 FAQs · 160 Quiz Questions · 160 References
    · <span class="completion completion-5" title="In Progress (5/5)"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/dmccreary/3d-printing-course)
- **[Introduction to Graph Databases](https://dmccreary.github.io/intro-to-graph)**

    ![Intro to Graph](./img/intro-to-graph.jpg)

    Interactive textbook covering graph databases: graph thinking, data modeling, NoSQL, labeled property graphs, and query languages.

    200 Concepts · 13 Chapters · 7 MicroSims · 2 Stories · 125K Words · 198 Glossary Terms · 71 FAQs · 120 Quiz Questions
    · <span class="completion completion-3" title="In Progress (3/5)"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/dmccreary/intro-to-graph)
- **[Introduction to Microcontrollers with PIC24](https://irvinggsea.github.io/i-book-v1/)**

    Introduction to microcontrollers using the PIC24 platform for embedded systems education.

    [:octicons-mark-github-16: Repository](https://github.com/irvinggsea/i-book-v1) · <span class="completion completion-1" title="Early Development (1/5)"></span>
- **[Introduction to Operating Systems](https://btlepak.github.io/Intelligent_Textbook/)**

    Fundamentals of operating systems including process management, memory, and file systems.
    Created by University of Minnesota student Benjamin Lepak in 2025 as part of the
    EE/CD Senior Design project.

    30 Concepts · 10 Chapters · 7 MicroSims
    · <span class="completion completion-2" title="Early Development (2/5)"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/btlepak/Intelligent_Textbook)
- **[Introduction to Physics](https://dmccreary.github.io/intro-to-physics-course)**

    ![Intro to Physics](./img/intro-to-physics-course.jpg)

    Year-long intro physics course covering motion, forces, energy, waves, optics, and electricity with MicroSims.

    200 Concepts · 13 Chapters · 104 MicroSims · 11 Stories · 258K Words · 389 Glossary Terms · 158 FAQs · 123 Quiz Questions
    · <span class="completion completion-4" title="Complete (4/5)"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/dmccreary/intro-to-physics-course)
- **[Introduction to Public Health](https://dmccreary.github.io/public-health)**

    ![Introduction to Public Health](./img/public-health.jpg)

    Interactive intelligent textbook covering the five CEPH core public health domains — epidemiology, biostatistics, environmental health, health policy, and social and behavioral sciences — with embedded simulations and a systems-thinking focus. Designed for undergraduate and graduate students.

    500 Concepts · 20 Chapters · 59 MicroSims · 157K Words · 200 Quiz Questions
    · <span class="completion completion-5" title="Complete (5/5)"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/dmccreary/public-health)
- **[Inverting the Impossible](https://dhquimby.github.io/inverting-the-impossible/)**

    Systematic Thinking for Innovation Radiation

    200 Concepts · 12 Chapters · 12 MicroSims
    · <span class="completion completion-1" title="Early (1/5)"></span>
- **[Investor Relations](https://dberglu.github.io/ir-textbook/)**

    Executive-level course on AI-powered IR modernization by David Berglund. 15 chapters with full content.

    298 Concepts · 15 Chapters · 5 MicroSims · 141K Words · 293 Glossary Terms · 87 FAQs · 203 Quiz Questions
    · <span class="completion completion-5" title="Complete (5/5)"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/dberglu/ir-textbook)
- **[IT Management with Graphs](https://dmccreary.github.io/it-management-graph)**

    ![IT Management with Graphs](./img/it-management-graph.jpg)

    IT management using graph databases. Covers ITIL, configuration management, asset management, and IT operations.

    200 Concepts · 12 Chapters · 65 MicroSims · 142K Words · 200 Glossary Terms · 128 Quiz Questions
    · <span class="completion completion-3" title="In Progress (3/5)"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/dmccreary/it-management-graph)
- **[Learning Graphs](https://dmccreary.github.io/learning-graphs)**

    ![Learning Graphs](./img/learning-graphs.jpg)

    Creation and maintenance of learning graphs. Extensive examples using vis.js for visualization.

    8 MicroSims · 33K Words · 47 Glossary Terms
    · <span class="completion completion-3" title="In Progress (3/5)"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/dmccreary/learning-graphs)
- **[Learning Linux](https://dmccreary.github.io/learning-linux/)**

    ![Learning Linux](./img/learning-linux.jpg)

    A comprehensive 15-week course teaching high school students Linux fundamentals including command line, file systems, and scripting.

    550 Concepts · 27 Chapters · 14 MicroSims · 139K Words · 541 Glossary Terms · 66 FAQs · 260 Quiz Questions
    · <span class="completion completion-5" title="Complete (5/5)"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/dmccreary/learning-linux)
- **[Learning MicroPython with AI](https://dmccreary.github.io/learning-micropython)**

    ![Learning MicroPython](./img/learning-micropython.png)

    Helps kids learn MicroPython on microcontrollers using fun low-cost projects. Thousands of monthly users worldwide.

    3 MicroSims · 81K Words
    · <span class="completion completion-3" title="Early Development (3/5)"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/dmccreary/learning-micropython)
- **[Learning Sciences for Intelligent Textbook Design](https://dmccreary.github.io/learning-sciences/)**

    ![Learning Sciences](./img/learning-sciences.jpg)

    An intelligent textbook on the Seven Domains of the Learning Sciences — motivation, understanding, retention, application, expertise, measurement, and learning conditions — applied to authoring AI-augmented textbooks for educators and AI researchers.

    230 Concepts · 15 Chapters · 65 MicroSims · 9 Stories · 235K Words · 222 Glossary Terms · 80 FAQs · 150 Quiz Questions
    · <span class="completion completion-4" title="Early Development (4/5)"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/dmccreary/learning-sciences)
- **[Linear Algebra for AI and Machine Learning](https://dmccreary.github.io/linear-algebra)**

    ![Linear Algebra for AI and Machine Learning](./img/linear-algebra.jpg)

    A college-level course bridging abstract linear algebra with real-world AI applications. Covers vectors, matrices, eigenvalues, neural networks, computer vision, and autonomous systems.

    300 Concepts · 15 Chapters · 126 MicroSims · 182K Words · 299 Glossary Terms · 57 FAQs · 150 Quiz Questions
    · <span class="completion completion-5" title="Complete (5/5)"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/dmccreary/linear-algebra)
- **[Machine Learning: Algorithms and Applications](https://anvithpothula.github.io/machine-learning-textbook/)**

    ![Machine Learning Textbook](./img/machine-learning-textbook.png)

    Comprehensive intelligent textbook on machine learning for college undergraduates. Covers supervised learning, unsupervised learning, neural networks, CNNs, and transfer learning with Python code examples.

    103K Words · 18 MicroSims · 199 Glossary Terms
    · <span class="completion completion-5" title="Complete (5/5)"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/AnvithPothula/machine-learning-textbook)
- **[Mathematics Functions](https://dmccreary.github.io/functions/)**

    ![Mathematics Functions](./img/functions.jpg)

    An interactive intelligent textbook for high school students mastering the unifying theme of functions in mathematics through mathematical models, coordinate geometry, and real-world applications.

    208 Concepts · 13 Chapters · 29 MicroSims · 16 Stories · 143K Words · 208 Glossary Terms · 85 FAQs · 130 Quiz Questions
    · <span class="completion completion-5" title="Complete (5/5)"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/dmccreary/functions)
- **[McCreary Family Heritage](https://dmccreary.github.io/mccreary-heritage/)**

    ![McCreary Heritage](./img/mccreary-heritage.jpg)

    Educational resources for teaching Scottish, Irish, and immigration history with a focus on building critical thinking skills.

    8 MicroSims · 2 Stories · 53K Words
    · <span class="completion completion-2" title="Early Development (2/5)"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/dmccreary/mccreary-heritage)
- **[MicroSim Search](https://dmccreary.github.io/search-microsims/)**

    ![MicroSim Search](./img/search-microsims.jpg)

    Client-side faceted search system for educational MicroSims. Crawls GitHub repositories to collect metadata and provides browser-based search with filtering by subject, grade level, Bloom's Taxonomy, and framework.

    200 Concepts · 15 Chapters · 58 MicroSims · 110K Words · 236 Glossary Terms · 54 FAQs · 150 Quiz Questions
    · <span class="completion completion-3" title="Ongoing Development (3/5)"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/dmccreary/search-microsims)
- **[MicroSims](https://dmccreary.github.io/microsims)**

    ![MicroSims](./img/microsims.jpg)

    Showcase for creating MicroSims using JavaScript and p5.js across diverse subjects.

    242 Concepts · 14 Chapters · 115 MicroSims · 173K Words · 252 Glossary Terms · 71 FAQs · 182 Quiz Questions
    · <span class="completion completion-5" title="Complete (5/5)"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/dmccreary/microsims)
- **[MicroSims for Electrical Engineering](https://kenn0727.github.io/ee-microsims)**

    11 MicroSims created by University of Minnesota EE students using p5.js and prompt engineering.

    12 MicroSims
    · <span class="completion completion-1" title="Early Development (1/5)"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/kenn0727/ee-microsims)
- **[Modeling Healthcare Data with Graphs](https://dmccreary.github.io/modeling-healthcare-data)**

    ![Modeling Healthcare Data](./img/modeling-healthcare-data.jpg)

    Undergraduate textbook on graph-based healthcare data modeling: patient-centric models, provider operations, clinical workflows.

    200 Concepts · 12 Chapters · 9 MicroSims · 146K Words · 198 Glossary Terms · 63 FAQs · 51 Quiz Questions
    · <span class="completion completion-3" title="In Progress (3/5)"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/dmccreary/modeling-healthcare-data)
- **[Moss](https://dmccreary.github.io/moss/)**

    ![Moss](./img/moss.jpg)

    An interactive intelligent textbook exploring the biology, ecology, design, and sustainability of moss, with simulations and a learning graph for curious learners and naturalists.

    400 Concepts · 20 Chapters · 31 MicroSims · 153K Words · 400 Glossary Terms · 79 FAQs · 200 Quiz Questions
    · <span class="completion completion-4" title="In Progress (4/5)"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/dmccreary/moss)
- **[Moving Rainbow](https://dmccreary.github.io/moving-rainbow)**

    ![Moving Rainbow](./img/moving-rainbow.jpg)

    Using colorful addressable LED strips and noodles for hands-on computational thinking projects with MicroPython.

    4 Chapters · 12 MicroSims · 58K Words · 230 Glossary Terms
    · <span class="completion completion-4" title="Nearly Complete (4/5)"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/dmccreary/moving-rainbow)
- **[Networking and Communication](https://dmccreary.github.io/networking/)**

    ![Networking and Communication](./img/networking.jpg)

    An ABET CAC-aligned intelligent textbook covering the foundations of networking and communication — layered architecture, routing, reliable transport, wireless, network security, and modern programmable networks.

    338 Concepts · 16 Chapters · 1 MicroSim · 122K Words · 338 Glossary Terms · 104 FAQs · 50 Quiz Questions
    · <span class="completion completion-4" title="Early Development (4/5)"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/dmccreary/networking)
- **[Neurodiversity Course](https://dmccreary.github.io/neurodiversity-course/)**

    Course on neurodiversity awareness and inclusion strategies.

    [:octicons-mark-github-16: Repository](https://github.com/dmccreary/neurodiversity-course) · <span class="completion completion-1" title="Early Development (1/5)"></span>
- **[Organizational Analytics with AI](https://dmccreary.github.io/organizational-analytics)**

    ![Organizational Analytics with AI](./img/organizational-analytics.jpg)

    Interactive textbook teaching how to use graph databases, AI, and NLP to unlock hidden insights in HR data including influence, collaboration, sentiment, and organizational health.

    200 Concepts · 15 Chapters · 71 MicroSims · 182K Words · 201 Glossary Terms · 93 FAQs · 150 Quiz Questions · 150 References
    · <span class="completion completion-5" title="Complete (5/5)"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/dmccreary/organizational-analytics)
- **[Personal Finance](https://dmccreary.github.io/personal-finance/)**

    ![Personal Finance](./img/personal-finance.jpg)

    Helps high school students learn personal finance with MicroSims, infographics, and graphic novel storytelling.

    200 Concepts · 12 Chapters · 17 MicroSims · 1 Story · 120K Words · 358 Glossary Terms · 56 FAQs · 120 Quiz Questions
    · <span class="completion completion-5" title="Complete (5/5)"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/dmccreary/personal-finance)
- **[Pre-Calculus](https://dmccreary.github.io/pre-calc/)**

    ![Pre-Calculus](./img/pre-calc.jpg)

    An interactive intelligent textbook for pre-calculus designed to prepare high school students for advanced math coursework.

    307 Concepts · 23 Chapters · 1 MicroSim · 89K Words · 307 Glossary Terms
    · <span class="completion completion-1" title="Complete (1/5)"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/dmccreary/pre-calc)
- **[Prompt Engineering Class](https://dmccreary.github.io/prompt-class)**

    ![Prompt Engineering](./img/prompt-class.jpg)

    Hands-on labs covering lists, Mermaid diagrams, markdown tables, p5.js visualizations, and data science applications.

    9K Words · 23 Glossary Terms
    · <span class="completion completion-5" title="Early Development (5/5)"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/dmccreary/prompt-class)
- **[Psychology](https://dmccreary.github.io/psychology/)**

    ![Psychology](./img/psychology.jpg)

    An AP-level intelligent textbook covering biological bases of behavior, sensation and perception, development, social influence, and psychological disorders for high school students preparing for the AP Psychology exam.

    387 Concepts · 16 Chapters · 6 MicroSims · 91K Words
    · <span class="completion completion-3" title="Active Development (3/5)"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/dmccreary/psychology)
- **[Reading for Kindergarten](https://dmccreary.github.io/reading-for-kindergarten/)**

    ![Reading for Kindergarten](./img/reading-for-kindergarten.jpg)

    An intelligent textbook for teaching reading skills to kindergarten students with age-appropriate interactive content.

    195 Concepts · 11 Chapters · 25 MicroSims · 33K Words · 104 Glossary Terms · 66 FAQs
    · <span class="completion completion-5" title="Complete (5/5)"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/dmccreary/reading-for-kindergarten)
- **[Robot Day](https://dmccreary.github.io/robot-day)**

    Resources for single-day STEM events with hands-on projects leading to understanding collision-avoidance robots.

    26K Words
    · <span class="completion completion-1" title="Early Development (1/5)"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/dmccreary/robot-day)
- **[Selecting the Right Database](https://dmccreary.github.io/right-database/)**

    ![Selecting the Right Database](./img/right-database.jpg)

    An intelligent textbook for software architects, senior engineers, and database administrators on making real-world database selection decisions using the CMU SEI Architecture Tradeoff Analysis Method (ATAM). Covers six database paradigms, CAP theorem, consensus, distributed scaling, vector search, and LLM embeddings.

    254 Concepts · 16 Chapters · 5 MicroSims · 1 Story · 150K Words · 251 Glossary Terms
    · <span class="completion completion-5" title="Complete (5/5)"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/dmccreary/right-database)
- **[Semiconductor Physics Course](https://dmccreary.github.io/semiconductor-physics-course)**

    ![Semiconductor Physics](./img/semiconductor-physics-course.jpg)

    College-level semiconductor physics with interactive simulations including PN Junction visualization.

    600 Concepts · 22 Chapters · 2 MicroSims · 12K Words · 2 Glossary Terms
    · <span class="completion completion-3" title="Early Development (3/5)"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/dmccreary/semiconductor-physics-course)
- **[Signal Processing](https://dmccreary.github.io/signal-processing)**

    ![Signal Processing](./img/signal-processing.jpg)

    Demonstrates using generative AI to create undergraduate signal processing courses.

    200 Concepts · 15 Chapters · 34 MicroSims · 6 Stories · 138K Words · 141 Glossary Terms · 87 FAQs · 150 Quiz Questions
    · <span class="completion completion-5" title="Complete (5/5)"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/dmccreary/signal-processing)
- **[Spectrum Analyzer](https://dmccreary.github.io/spectrum-analyzer/)**

    ![Spectrum Analyzer](./img/spectrum-analyzer.png)

    Build a spectrum analyzer using Raspberry Pi Pico and a microphone with detailed hardware and software tutorials.

    5 MicroSims · 17K Words · 8 Glossary Terms
    · <span class="completion completion-1" title="Early Development (1/5)"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/dmccreary/spectrum-analyzer)
- **[Statistics](https://dmccreary.github.io/statistics-course/)**

    ![Statistics](./img/statistics-course.jpg)

    A simulation-filled interactive intelligent statistics textbook designed to help high school students earn college credit, hosted by Sylvia the Squirrel.

    300 Concepts · 19 Chapters · 111 MicroSims · 222K Words · 295 Glossary Terms · 80 FAQs · 190 Quiz Questions · 190 References
    · <span class="completion completion-5" title="Early Development (5/5)"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/dmccreary/statistics-course)
- **[STEM Classroom Administration](https://dmccreary.github.io/stem-classroom-admin/)**

    ![STEM Classroom Admin](./img/stem-classroom-admin.jpg)

    Helps teachers use AI to setup and administer a STEM classroom with a focus on computational thinking and microcontrollers.

    16K Words · 64 Glossary Terms
    · <span class="completion completion-1" title="Early Development (1/5)"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/dmccreary/stem-classroom-admin)
- **[STEM Robots](https://dmccreary.github.io/stem-robots)**

    ![STEM Robots](./img/stem-robots.png)

    STEM and robotics using the Raspberry Pi RP2040 on low-cost robotics kits for computational thinking.

    5 MicroSims · 28K Words · 46 Glossary Terms
    · <span class="completion completion-2" title="Early Development (2/5)"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/dmccreary/stem-robots)
- **[Systems Thinking in the Age of AI](https://dmccreary.github.io/systems-thinking)**

    ![Systems Thinking](./img/systems-thinking.jpg)

    Interactive resources for teaching systems thinking from high school to executive level. Multiple course descriptions.

    13 MicroSims · 7 Stories · 120K Words · 41 Glossary Terms · 25 References
    · <span class="completion completion-2" title="Early Development (2/5)"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/dmccreary/systems-thinking)
- **[Theory of Knowledge](https://dmccreary.github.io/theory-of-knowledge/)**

    ![Theory of Knowledge](./img/theory-of-knowledge.jpg)

    A free, open-source intelligent textbook for the IB Theory of Knowledge (TOK) course, exploring how knowledge is produced, validated, and communicated through interactive MicroSimulations and a learning graph of 275 interconnected concepts.

    275 Concepts · 16 Chapters · 69 MicroSims · 14 Stories · 232K Words · 275 Glossary Terms · 87 FAQs
    · <span class="completion completion-5" title="Mature (5/5)"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/dmccreary/theory-of-knowledge)
- **[Token Efficiency](https://dmccreary.github.io/token-efficiency/)**

    ![Token Efficiency](./img/token-efficiency.jpg)

    A vendor-pluralistic intelligent textbook on measuring, analyzing, and reducing the cost of generative AI across Anthropic Claude, OpenAI, and Google Gemini for software engineers, ML engineers, and engineering managers.

    475 Concepts · 20 Chapters · 44 MicroSims · 14 Stories · 218K Words · 475 Glossary Terms · 91 FAQs · 200 References
    · <span class="completion completion-5" title="Mature (5/5)"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/dmccreary/token-efficiency)
- **[Tracking AI](https://dmccreary.github.io/tracking-ai-course)**

    ![Tracking AI](./img/tracking-ai-course.jpg)

    Tracking AI progress for strategy consulting in education and knowledge management organizations.

    250 Concepts · 29 MicroSims · 6 Stories · 85K Words · 254 Glossary Terms
    · <span class="completion completion-5" title="In Progress (5/5)"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/dmccreary/tracking-ai-course)
- **[Trigonometric Functions](https://stage03.iowerx.com:8443/)**

    Foundational course on relationships between angles and sides in right triangles by Hank Ratzesberger. 200 concepts.

    High School · Bridges algebra and geometry
    · <span class="completion completion-1" title="Mature (1/5)"></span>
- **[Understanding Dementia](https://rtanler.github.io/Dementia/)**

    ![Understanding Dementia](./img/dementia.jpg)

    AI-generated intelligent textbook on dementia and cognitive decline for patients, caregivers, families, and healthcare professionals. Features 200 interconnected concepts in a learning graph. By rtanler.

    200 Concepts · 15 Chapters · 21 MicroSims · 18 Stories · 270K Words · 200 Glossary Terms · 80 FAQs · 151 Quiz Questions · 150 References
    · <span class="completion completion-5" title="In Progress (5/5)"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/rtanler/Dementia)
- **[Unicorns and Other Mythical Beasts](https://dmccreary.github.io/unicorns/)**

    ![Unicorns and Other Mythical Beasts](./img/unicorns.jpg)

    A satirical interactive intelligent textbook about unicorns, mythical beasts, and the AI technologies that will improve them — exploring AI hype, education resistance, and technology fantasies.

    140 Concepts · 19 Chapters · 32 MicroSims · 19 Stories · 259K Words · 145 Glossary Terms · 85 FAQs · 190 Quiz Questions · 190 References
    · <span class="completion completion-5" title="Mature (5/5) - Fun satire!"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/dmccreary/unicorns)
- **[US Geography](https://dmccreary.github.io/us-geography)**

    ![US Geography](./img/us-geography.jpg)

    Interactive intelligent geography for grade school students (3rd-6th grade). Explore all 50 states with clickable maps, zoomable regions, and discovery challenges.

    200 Concepts · 12 Chapters · 33 MicroSims · 70K Words · 200 Glossary Terms · 54 FAQs · 144 Quiz Questions
    · <span class="completion completion-4" title="Complete (4/5)"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/dmccreary/us-geography)
- **[U.S. History](https://dmccreary.github.io/us-history)**

    ![U.S. History](./img/us-history.jpg)

    An interactive intelligent textbook for AP-level U.S. History covering major eras from Colonial America through the present, featuring primary source analysis, historical reasoning skills, and interactive MicroSims for understanding cause and effect across key events.

    450 Concepts · 21 Chapters · 37 MicroSims · 282K Words · 450 Glossary Terms · 83 FAQs · 214 Quiz Questions · 210 References
    · <span class="completion completion-5" title="Mostly Complete (5/5) - a few MicroSims need reviewing"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/dmccreary/us-history)
- **[US Government](https://dmccreary.github.io/us-government/)**

    ![US Government](./img/us-government.jpg)

    An interactive intelligent textbook aligned with the AP US Government and Politics curriculum for high school students (grades 9–12). Covers constitutional foundations, the three branches, federalism, civil rights, and the impact of AI on democracy.

    200 Concepts · 12 Chapters · 23 MicroSims · 1 Story · 121K Words · 200 Glossary Terms · 87 FAQs · 120 Quiz Questions · 120 References
    · <span class="completion completion-5" title="Complete (5/5)"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/dmccreary/us-government)
- **[xAPI for Intelligent Textbooks](https://dmccreary.github.io/xapi-course/)**

    ![xAPI for Intelligent Textbooks](./img/xapi-course.jpg)

    An interactive intelligent textbook on the xAPI (Experience API) standard for software professionals implementing xAPI in Level 3 intelligent textbooks and learning systems. Features 50 MicroSims built with p5.js and vis-network.

    250 Concepts · 14 Chapters · 50 MicroSims · 138K Words · 253 Glossary Terms · 86 FAQs · 140 Quiz Questions · 140 References
    · <span class="completion completion-5" title="Nearly Complete (5/5)"></span>
    · [:octicons-mark-github-16: Repository](https://github.com/dmccreary/xapi-course)
</div>
