# Intelligent Textbook Level Questions

We need an objective that would allow a instructor or a student to
assess the "level" of an intelligent textbook.  Here is a set of prompts
that will generate the questions for this assessment and then the HTML form that can be used to score the question results.  The result of the questions is a web form with JavaScript that will return a score of 1-5 for a textbook.

## Prompt

!!! prompt
    I am working on a project to help educators and students evaluate the score of an intelligent textbook.  We have developed the following "Bands" for general scoring, but I would like you to help generate a series of questions to help a specific textbook be assigned to a level.

    So please generate a list of 20 questions that would be used to assign the level of a textbook.  For each question, generate rules that would discriminate the levels.  Use questions that have the ability to discriminate each level.


    Here is a list of the levels:

    **Level 0** - A printed textbook.  Give a higher score to a textbook that has a high quality table of contents, index, glossary and detailed annotated biography for students that want to learn more.

    **Level 1** - An online PDF or PPT of a textbook.  Give a slightly higher score to versions that have high-quality search and many internal and external links.

    **Level 2** - A website with rich media including videos, animations and simulations but no personalization.  Give a higher score to great navigation, deep links, great animations and simulations and a tools like linked word clouds, concept graphs and FAQ.  Level 2 books are not personalized with any student-spcific information.

    **Level 3** - A website that is connected to a learning management systems that has knowledge of each person's current knowledge about concepts and learning goals

    **Level 4** - A website that includes a conversational interface such as a chatbot.  The chabot can answer questions given your personal knowledge.  It can also recommend content for a topic.

    **Level 5** - A fully intelligent textbook that can answer questions, suggest learning paths and provide detailed recommendations for content.  It uses reinforcement learning to continually learn about what learning paths work for students.  It can also generate customized lesson plans and generate new animations and simulations of the real world on demand.


## Response

Below is a set of 20 questions designed to help determine the "intelligence" level of a textbook according to the given bands. Each question focuses on a feature or capability that differentiates one level from another. For each question, there are guidelines on how the presence, quality, or sophistication of that feature might map to one of the six levels (0 to 5).

**Key to Levels:**

-   **Level 0:** Printed textbook (High-quality static reference tools)
-   **Level 1:** Online PDF/PPT (Basic digital format, possibly with search and simple links)
-   **Level 2:** Website with rich media (videos, animations, simulations, interactive navigation), but no personalization
-   **Level 3:** Website integrated with an LMS (knows students' progress/concepts)
-   **Level 4:** Website with a conversational interface (chatbot) that uses personal knowledge
-   **Level 5:** Fully intelligent textbook (suggesting paths, reinforcement learning, generating new content/visualizations on demand)

### 1. Table of Contents, Index, Glossary Quality

**Question:** How comprehensive and well-structured are the textbook's table of contents, index, and glossary?

**Discrimination Rules:**

-   **Level 0:** Detailed, well-formatted table of contents, index, and glossary present in a print textbook.
-   **Level 1+:** Basic digital TOC and glossary may be present, but does not surpass the printed quality.
-   If the textbook excels only in static reference quality (no interactivity), it's likely Level 0.


### 2. Availability of Digital Format and Simple Search

**Question:** Is the textbook available in a digital format with a basic keyword search function?

**Discrimination Rules:**

-   **Level 0:** Not available digitally, or only as a scanned static PDF without search.
-   **Level 1:** Available as a digital PDF or PPT with basic keyword search, possibly simple internal links.
-   Higher levels also have digital formats, but if only a basic search is present (no personalization, no rich media), Level 1 is indicated.

* * * *

### 3. Presence and Quality of Hyperlinks (Internal and External)

**Question:** Does the resource contain clickable links that connect to related sections or external references?

**Discrimination Rules:**

-   **Level 0:** No hyperlinks (print only).
-   **Level 1:** Has basic hyperlinks (e.g., from a digital PDF's table of contents to chapters).
-   **Level 2+:** Enhanced hyperlinking including deep internal cross-references and external resource links is common, but if only simple links are present, that suggests Level 1.

### 4. Inclusion of Rich Media (Videos, Animations, Simulations)

**Question:** Does the resource integrate videos, animations, or simulations directly into the learning material?

**Discrimination Rules:**

-   **Level 0-1:** No embedded rich media, or only static images.
-   **Level 2:** Multiple embedded videos, animations, simulations that support the text.
-   **Level 3-5:** Will also have rich media, but for discriminating Level 2, focus on presence of rich media without personalization.

### 5. Interactivity and Navigational Tools

**Question:** How interactive and navigable is the resource? Does it provide advanced navigation tools like concept maps, word clouds, or FAQ sections?

**Discrimination Rules:**

-   **Level 0-1:** Limited to simple linear navigation (page turning, basic scroll).
-   **Level 2:** Offers concept graphs, linked word clouds, advanced FAQ pages, and dynamic navigation menus.
-   **Level 3-5:** Similar navigation exists, but the presence of personalization or intelligence must be examined in other questions.


### 6. Personalization or Adaptation of Content

**Question:** Does the textbook adapt its content based on an individual student's learning profile, prior knowledge, or assessment data?

**Discrimination Rules:**

-   **Level 0-2:** No personalization; same content for all users.
-   **Level 3:** Content or navigation adjusts based on student progress data from an LMS.
-   **Level 4-5:** Personalized recommendations or conversation-based personalization is evident.


### 7. Integration with Learning Management Systems (LMS)

**Question:** Is the textbook integrated with an LMS to track individual learner progress and adjust experiences?

**Discrimination Rules:**

-   **Level 0-2:** No LMS integration.
-   **Level 3:** Integrated with LMS, uses learner data to guide content selection.
-   **Level 4-5:** LMS integration plus more advanced, intelligent personalization or conversational interfaces.


### 8. Ability to Assess Student Knowledge

**Question:** Does the textbook include quizzes, assessments, or tools that adapt based on the student's performance?

**Discrimination Rules:**

-   **Level 0-1:** No adaptive assessment---may only offer static questions at the end of chapters.
-   **Level 2:** Possibly interactive quizzes, but not adaptive based on user profile.
-   **Level 3:** Adaptive assessments informed by LMS data.
-   **Level 4-5:** Assessments dynamically adjust based on a richer student model and can suggest new paths or respond to queries conversationally.


### 9. Conversational Interface or Chatbot Presence

**Question:** Is there a built-in conversational agent that can answer student questions directly?

**Discrimination Rules:**

-   **Level 0-3:** No conversational interface.
-   **Level 4:** A chatbot that can answer questions based on personal user data and recommend relevant topics.
-   **Level 5:** A chatbot with advanced reasoning, capable of generating entirely new content/visualizations on demand.


### 10. Ability to Suggest Next Steps or Learning Paths

**Question:** Can the textbook suggest what a student should study next based on their interactions or mastery?

**Discrimination Rules:**

-   **Level 0-2:** No suggestion of personalized next steps.
-   **Level 3:** Basic suggestions informed by LMS data.
-   **Level 4:** Conversational suggestions tailored to the user's performance.
-   **Level 5:** Intelligent, continuously improving recommendations (reinforcement learning) that adapt learning paths dynamically.


### 11. Dynamic Content Generation

**Question:** Can the resource generate new examples, problems, or explanations on demand rather than just serving static content?

**Discrimination Rules:**

-   **Level 0-3:** Content is predefined and static.
-   **Level 4:** Some dynamic retrieval of suitable content may occur, but primarily curated.
-   **Level 5:** Fully dynamic content generation, including new examples, problems, and custom explanations.


### 12. Ability to Create Custom Visualizations or Simulations on Demand

**Question:** Can the textbook create new animations, simulations, or visual content in response to user queries or learning needs?

**Discrimination Rules:**

-   **Level 0-2:** Only preset images/videos.
-   **Level 3-4:** Might select the best pre-existing simulations based on user need.
-   **Level 5:** Can generate entirely new visualizations or simulations dynamically.


### 13. Reinforcement Learning and Continuous Improvement

**Question:** Does the system use data from student interactions over time to improve its recommendations or content delivery?

**Discrimination Rules:**

-   **Level 0-4:** No true reinforcement learning capabilities. At best, these levels adapt to user profiles statically or rule-based.
-   **Level 5:** Employs reinforcement learning to continually refine learning paths and strategies for individual and aggregated learners.

### 14. External Resource Integration

**Question:** Does the textbook integrate with external resources (like encyclopedias, research databases, or educational tools) in a context-aware manner?

**Discrimination Rules:**

-   **Level 0:** Only static references or a printed bibliography.
-   **Level 1:** Possibly static hyperlinks to external sites.
-   **Level 2:** Rich external link integration within an interactive website.
-   **Level 3-5:** External resources chosen or recommended based on the student's profile (increasing personalization with each higher level).


### 15. Ability to Handle User Inquiries Beyond Pre-Defined FAQ

**Question:** Can the textbook address student questions that aren't explicitly covered in the predefined text (e.g., open-ended queries)?

**Discrimination Rules:**

-   **Level 0-2:** Only predefined content, no handling of open-ended queries.
-   **Level 3:** Might direct students to sections based on knowledge of their gaps but not truly "answer" novel queries.
-   **Level 4:** Conversational agent attempts to answer new questions contextually.
-   **Level 5:** Conversational agent with advanced reasoning and content generation responds fully and contextually, even creating new explanatory materials.


### 16. Support for Multiple Learning Styles

**Question:** Does the textbook adjust or present content to support various learning styles (visual, auditory, kinesthetic) based on the learner?

**Discrimination Rules:**

-   **Level 0-2:** Static presentation with some variety (images, text, videos), but not tailored to an individual's style.
-   **Level 3-4:** Selection of content type may adjust based on user performance or preferences.
-   **Level 5:** Dynamically generates or selects content formats best suited to the individual's learning patterns as observed and improved over time.


### 17. Integration of Learner Profiles (Goals, Interests, Past Performance)

**Question:** Can the textbook use the learner's stated goals, interests, or performance history to prioritize or highlight certain topics?

**Discrimination Rules:**

-   **Level 0-2:** No user-specific profiling.
-   **Level 3:** Basic use of learner profile from LMS (e.g., knowing which modules the student has completed).
-   **Level 4:** Conversationally tailors suggestions and answers based on the learner's profile.
-   **Level 5:** Sophisticated, data-driven personalization and continuous updating of learner profiles to refine suggestions.


### 18. Depth of Internal Cross-Referencing

**Question:** Does the textbook dynamically highlight related concepts and prerequisites based on the user's current focus?

**Discrimination Rules:**

-   **Level 0-1:** Static cross-references.
-   **Level 2:** Rich static cross-referencing with interactive concept maps.
-   **Level 3+:** Cross-references informed by user knowledge state; the textbook might highlight the most relevant concepts for that learner.
-   **Level 4-5:** Uses conversation or intelligence to highlight or generate links specifically tuned to individual needs.


### 19. FAQ and Trouble-Shooting Adaptation

**Question:** Are FAQs or help features adapted to the learner's known difficulties or frequently asked questions from similar users?

**Discrimination Rules:**

-   **Level 0-2:** Static FAQ sections.
-   **Level 3:** FAQ suggestions pulled from common misunderstandings related to user's performance.
-   **Level 4-5:** Adaptive FAQ that can expand or generate new answers in response to user input and historical data.


### 20. Generation of Custom Lesson Plans and Curricula

**Question:** Can the resource create an entirely custom lesson plan or course sequence tailored to an individual's learning trajectory?

**Discrimination Rules:**

-   **Level 0-3:** Content is structured, but no custom lesson plans are generated. At best, Level 3 might reorder suggestions from a fixed set.
-   **Level 4:** Might recommend sequences conversationally, but still largely draws from predefined options.
-   **Level 5:** Fully generates personalized lesson plans and sequences dynamically, informed by continual learning and reinforcement feedback loops.


**Overall Usage:** By examining which level of capability applies to each question (0 through 5), an evaluator can determine the textbook's strongest match. A textbook that consistently answers in the realm of basic static features (0-1) remains at the lower levels. As it exhibits more interactivity (2), personalization and LMS integration (3), conversational capabilities (4), and finally dynamic, intelligent adaptation with generated content and reinforcement learning (5), the classification becomes clear.

## Generate HTML Form

!!! prompt
    Now create an single-page HTML form that implements
    these 20 questions.  Use JavaScript within the HTML
    file to calculate progress on the number of questions
    remaining and give a running total of the level.
    After the last question, add a "Calculate Score"
    that will calculate the "intelligence score" of of
    textbook and give an explanation of how the score
    was calculated.  Make the title of the page be
    "Calculating Intelligence Level of A Textbook".

## Sample HTML Form

[Intelligent Textbook Level Questions](./level-questions-v2.html)

[Level Questions (prior version)](./level-questions-v1.html)
