// History of Intelligent Textbooks & Interactive Learning — vis-timeline
// CANVAS_HEIGHT: 724
document.addEventListener('DOMContentLoaded', function () {

    // ----------------------------------------------------------------------
    // Event data. Each item is tagged with one of three categories used by
    // the filter buttons:  "Theory of Learning", "Learning Graphs", "Generative AI".
    // `content` is the short label drawn on the timeline; the full title,
    // significance, critical-thinking connection, and optional source link
    // appear in the detail panel when an event is clicked.
    // ----------------------------------------------------------------------
    const items = [

        // ---- Theory of Learning (blue) ----
        { id: 1, cat: 'Theory of Learning',
          content: "Piaget's Constructivism",
          start: '1936-01-01',
          title: 'Jean Piaget — Constructivism (1936)',
          by: 'Jean Piaget',
          significance: `In <em>The Origins of Intelligence in Children</em>, Piaget framed learning as an active process in which students build their own mental models through exploration, rather than passively receiving facts.`,
          conn: `Constructivism is the intellectual root of every interactive learning tool — students reason and discover instead of memorize.` },

        { id: 2, cat: 'Theory of Learning',
          content: "Bloom's Taxonomy",
          start: '1956-01-01',
          title: "Bloom's Taxonomy of Educational Objectives (1956)",
          by: 'Benjamin Bloom and colleagues',
          significance: `A classification of learning objectives rising from lower-order recall up through apply, analyze, evaluate, and create. It gave educators a shared vocabulary for designing higher-order thinking.`,
          conn: `Its upper levels — analyze, evaluate, create — are the definition of critical thinking, and still guide how intelligent-textbook questions are written today.` },

        { id: 3, cat: 'Theory of Learning',
          content: "Vygotsky's ZPD",
          start: '1978-01-01',
          title: 'Lev Vygotsky — Zone of Proximal Development (1978)',
          by: 'Lev Vygotsky',
          significance: `<em>Mind in Society</em> brought the Zone of Proximal Development to English readers: the gap between what a learner can do alone and what they can do with guidance. (Vygotsky's work was originally written in the 1930s.)`,
          conn: `ZPD is the theory behind scaffolding — giving just enough support to stretch a learner's thinking — a core principle of adaptive intelligent textbooks.` },

        { id: 4, cat: 'Theory of Learning',
          content: "Papert's Turtle (LOGO)",
          start: '1980-01-01',
          title: 'Seymour Papert — Mindstorms & the LOGO Turtle (1980)',
          by: 'Seymour Papert',
          significance: `<em>Mindstorms: Children, Computers, and Powerful Ideas</em> introduced constructionism and the LOGO turtle. Children programmed a turtle to draw shapes, learning geometry and logic by teaching the computer instead of being taught by it. (LOGO was first created in 1967.)`,
          conn: `Papert insisted the child should program the computer, not the reverse — the founding spirit of MicroSims and interactive critical-thinking tools.` },

        // ---- Learning Graphs (green) ----
        { id: 5, cat: 'Learning Graphs',
          content: 'Knowledge Space Theory',
          start: '1985-01-01',
          title: 'Knowledge Space Theory — Doignon & Falmagne (1985)',
          by: 'Jean-Paul Doignon & Jean-Claude Falmagne',
          significance: `<em>Spaces for the Assessment of Knowledge</em> established a mathematical model of the prerequisite dependencies between the concepts a learner knows — formal "knowledge states" and the paths between them.`,
          conn: `Knowledge Space Theory replaced a single test score with a map of concept dependencies — the direct ancestor of the learning graph.` },

        { id: 6, cat: 'Learning Graphs',
          content: 'ALEKS',
          start: '1996-01-01',
          title: 'ALEKS — Adaptive Learning in Knowledge Spaces (1996)',
          by: 'Jean-Claude Falmagne and team, UC Irvine',
          significance: `ALEKS (Assessment and LEarning in Knowledge Spaces) brought Knowledge Space Theory into classrooms, using a learner's current knowledge state to recommend exactly what to study next.`,
          conn: `The first widely deployed proof that a concept-dependency graph could power personalized, mastery-based instruction at scale.` },

        { id: 17, cat: 'Learning Graphs',
          content: 'Wikipedia Launches',
          start: '2001-01-15',
          title: 'Wikipedia Launches (Jan 15, 2001)',
          by: 'Jimmy Wales & Larry Sanger',
          significance: `Wikipedia launched as a free, collaboratively edited encyclopedia. Its millions of hyperlinked articles form a vast, human-curated graph of interconnected concepts — and the reference layer beneath countless open textbooks.`,
          conn: `Wikipedia's link structure is effectively a knowledge graph; it became both the citation backbone of open intelligent textbooks and core training data for the language models that now generate them.`,
          link: 'https://en.wikipedia.org/wiki/Wikipedia' },

        { id: 7, cat: 'Learning Graphs',
          content: 'Lost in Knowledge Space',
          start: '2019-10-12',
          title: "McCreary — 'Lost in [Knowledge] Space' (Oct 2019)",
          by: 'Dan McCreary (Medium)',
          significance: `An early articulation of using a graph database to represent a student's position within a network of interconnected concepts, powering personalized learning paths and recommendation engines.`,
          conn: `Connected Knowledge Space Theory to modern graph technology — a stepping stone toward today's learning graphs.`,
          link: 'https://dmccreary.medium.com/lost-in-knowledge-space-14be123ea083' },

        // ---- Science Fiction (purple) ----
        { id: 18, cat: 'Science Fiction',
          content: 'The Fun They Had',
          start: '1951-01-01',
          title: "Isaac Asimov's The Fun They Had (1951)",
          by: 'Isaac Asimov',
          significance: `A short story depicting a "mechanical teacher" installed in a child's home — a machine that displays lessons on a screen, accepts homework through a slot, and adjusts the difficulty to each child's age and ability. Perhaps the earliest direct depiction of a mechanical tutor.`,
          conn: `A foundational vision of personalized, one-to-one computer-based instruction — and a cautionary one, weighing efficient algorithmic teaching against the social learning lost when the shared classroom disappears.`,
          link: 'https://en.wikipedia.org/wiki/The_Fun_They_Had' },

        { id: 16, cat: 'Science Fiction',
          content: 'The Diamond Age',
          start: '1995-01-01',
          title: "Neal Stephenson's The Diamond Age (1995)",
          by: 'Neal Stephenson',
          significance: `The novel introduced <em>A Young Lady's Illustrated Primer</em> — an interactive, AI-powered adaptive book that tailors its stories and lessons to a single reader. It became the defining fictional vision of an intelligent textbook.`,
          conn: `It imagined a book that responds to the learner and provokes independent, critical thinking — the aspiration that generative AI is only now beginning to realize.`,
          link: 'https://en.wikipedia.org/wiki/The_Diamond_Age' },

        // ---- Generative AI (amber) ----
        { id: 8, cat: 'Generative AI',
          content: 'GPT-2',
          start: '2019-02-14',
          title: 'OpenAI Releases GPT-2 (Feb 14, 2019)',
          by: 'OpenAI',
          significance: `GPT-2 was the first large language model able to generate fluent, coherent paragraphs of text — including explanations, examples, and practice questions — marking the first practical use of generative AI to produce educational content.`,
          conn: `GPT-2 proved machines could write human-quality prose: the starting gun for AI-generated learning materials.` },

        { id: 9, cat: 'Generative AI',
          content: 'ChatGPT',
          start: '2022-11-30',
          title: 'ChatGPT Launches (Nov 30, 2022)',
          by: 'OpenAI',
          significance: `ChatGPT put conversational generative AI into the hands of millions. Students and educators could instantly ask questions, get explanations, and generate study material on demand.`,
          conn: `Reached 100 million users in two months — the fastest-adopted consumer technology in history and a turning point for AI in education.` },

        { id: 10, cat: 'Generative AI',
          content: 'MicroSims Article',
          start: '2023-11-04',
          title: "McCreary — 'Micro-Simulations for Education' (Nov 2023)",
          by: 'Dan McCreary & Valerie Lockhart (Medium)',
          significance: `An interview describing how generative AI and p5.js can rapidly create customized educational animations — MicroSims — that make abstract concepts interactive and concrete.`,
          conn: `Framed MicroSims as a scalable way to turn AI into hands-on, critical-thinking learning experiences.`,
          link: 'https://dmccreary.medium.com/micro-simulations-for-education-6989eae8d85d' },

        { id: 11, cat: 'Generative AI',
          content: 'Five Levels',
          start: '2024-11-19',
          title: "McCreary — 'Five Levels of Intelligent Textbooks' (Nov 2024)",
          by: 'Dan McCreary (Medium)',
          significance: `A maturity model inspired by the five levels of autonomous driving, defining a path from static print (Level 1) to fully AI-powered adaptive learning systems built on learning graphs (Level 5).`,
          conn: `Gave educators a shared vocabulary for how "intelligent" a textbook is — the framework behind this very project.`,
          link: 'https://dmccreary.medium.com/five-levels-of-intelligent-textbooks-b81a4c1525a0' },

        { id: 12, cat: 'Generative AI',
          content: 'Claude Code',
          start: '2025-02-24',
          title: 'Anthropic Launches Claude Code (Feb 24, 2025)',
          by: 'Anthropic',
          significance: `An agentic command-line tool that lets Claude read, write, and run code directly in a project, making it practical to generate entire intelligent-textbook sites, MicroSims, and learning graphs from natural-language instructions.`,
          conn: `Turned AI from a chat assistant into a hands-on collaborator that can build and deploy educational software.` },

        { id: 13, cat: 'Generative AI',
          content: 'Claude Code Skills',
          start: '2025-10-16',
          title: 'Claude Code Skills / Agent Skills (Oct 16, 2025)',
          by: 'Anthropic',
          significance: `Reusable, shareable instruction packages that teach Claude specialized workflows. Skills such as the MicroSim and textbook generators let educators reliably produce consistent, high-quality learning content.`,
          conn: `Captured expert content-generation workflows as portable files — reproducible with a single command.` },

        { id: 14, cat: 'Generative AI',
          content: 'MicroSims Paper',
          start: '2025-11-25',
          title: 'MicroSims Framework Paper — arXiv:2511.19864 (Nov 2025)',
          by: 'Lockhart, McCreary & Peterson',
          significance: `Formalized how lightweight, embeddable, AI-generated simulations can be customized without programming to deepen conceptual understanding across learning platforms.`,
          conn: `The first formal framework for the MicroSim approach to interactive, AI-generated learning.`,
          link: 'https://arxiv.org/abs/2511.19864' },

        { id: 15, cat: 'Generative AI',
          content: '100th Textbook',
          start: '2026-06-01',
          title: '100th Open Intelligent Textbook (June 1, 2026)',
          by: 'Intelligent Textbooks community',
          significance: `The 100th open intelligent textbook was published — each built with MkDocs, a learning graph, and AI-generated MicroSims — demonstrating that AI-assisted authoring had made high-quality, interactive, free educational content reproducible at scale.`,
          conn: `Marked the transition of AI-generated intelligent textbooks from experiment to repeatable practice.` }
    ];

    // Map each category to the CSS class that colors its timeline box.
    const catClass = {
        'Theory of Learning': 'theory',
        'Learning Graphs': 'graphs',
        'Generative AI': 'genai',
        'Science Fiction': 'scifi'
    };
    items.forEach(it => { it.className = catClass[it.cat]; });

    const allItems = items.slice();
    const dataset = new vis.DataSet(allItems);
    const container = document.getElementById('timeline');

    const options = {
        width: '100%',
        height: '410px',
        margin: { item: { horizontal: 8, vertical: 6 }, axis: 30 },
        orientation: 'top',
        zoomMin: 1000 * 60 * 60 * 24 * 365 * 5,      // 5 years
        zoomMax: 1000 * 60 * 60 * 24 * 365 * 200,    // 200 years
        // Pan limits are kept well outside the padded fit window below so the
        // setWindow() padding is never silently clamped (a vis-timeline footgun).
        min: new Date(1916, 0, 1),
        max: new Date(2046, 0, 1),
        stack: true,
        selectable: true,
        showCurrentTime: false,
        moveable: true,
        zoomable: false,   // use Fit All / drag to pan; avoids scroll hijacking
        align: 'center'
    };

    const timeline = new vis.Timeline(container, dataset, options);

    // Scroll-hijack handling (see the vis-timeline guide). Registered in the
    // CAPTURE phase so it runs before vis-timeline's own wheel listener.
    //   - Vertical wheel  -> let the PAGE scroll normally (block vis only; never
    //                        call preventDefault, so the page still scrolls).
    //   - Horizontal wheel -> zoom the timeline in/out around the window center.
    const YEAR_MS = 365 * 24 * 60 * 60 * 1000;
    const MIN_INTERVAL = 5 * YEAR_MS;     // matches zoomMin (5 years)
    const MAX_INTERVAL = 200 * YEAR_MS;   // matches zoomMax (200 years)
    container.addEventListener('wheel', function (e) {
        const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);
        if (!isHorizontal) {
            // Vertical scroll: stop vis-timeline from trapping it, but do NOT
            // preventDefault — that lets the surrounding page scroll as usual.
            e.stopImmediatePropagation();
            return;
        }
        // Horizontal scroll: we handle it ourselves, so block both the browser's
        // side-scroll/back gesture and vis-timeline's default wheel behavior.
        e.preventDefault();
        e.stopImmediatePropagation();
        const win = timeline.getWindow();
        const center = (win.start.valueOf() + win.end.valueOf()) / 2;
        const interval = win.end.valueOf() - win.start.valueOf();
        // Scroll right (deltaX > 0) zooms in; scroll left zooms out. Step scales
        // with the wheel delta but is capped so a single event can't over-zoom.
        const step = Math.min(Math.abs(e.deltaX) / 200, 0.2);
        const factor = e.deltaX > 0 ? (1 - step) : (1 + step);
        const newInterval = Math.max(MIN_INTERVAL, Math.min(MAX_INTERVAL, interval * factor));
        timeline.setWindow(
            new Date(center - newInterval / 2),
            new Date(center + newInterval / 2),
            { animation: false }
        );
    }, true); // capture phase — runs before vis-timeline's own listener

    // Show all events with generous padding so the first/last labels (which,
    // with align:'center', extend half their width past their date point) sit
    // well inside the panel instead of being clipped at the container edge.
    function fitToData() {
        const visible = dataset.get();
        if (visible.length === 0) return;
        const ts = visible.map(i => new Date(i.start).getTime());
        const minD = Math.min(...ts), maxD = Math.max(...ts);
        const year = 365 * 24 * 60 * 60 * 1000;
        timeline.setWindow(new Date(minD - 16 * year), new Date(maxD + 16 * year), { animation: false });
    }
    fitToData();

    // Detail panel.
    const info = document.getElementById('info');
    const catLabel = {
        'Theory of Learning': 'Theory of Learning',
        'Learning Graphs': 'Learning Graphs',
        'Generative AI': 'Generative AI',
        'Science Fiction': 'Science Fiction'
    };
    timeline.on('select', function (props) {
        if (props.items.length === 0) return;
        const it = allItems.find(x => x.id === props.items[0]);
        if (!it) return;
        let html =
            '<span class="badge ' + it.className + '">' + catLabel[it.cat] + '</span>' +
            '<h3>' + it.title + '</h3>' +
            '<div class="meta">' + it.by + '</div>' +
            '<div>' + it.significance + '</div>' +
            '<div class="conn">&rarr; ' + it.conn + '</div>';
        if (it.link) {
            html += '<div class="src"><a href="' + it.link + '" target="_blank" rel="noopener">Read the source &#8599;</a></div>';
        }
        info.innerHTML = html;
    });

    // Category filter buttons.
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', function () {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const cat = btn.getAttribute('data-cat');
            const filtered = (cat === 'all')
                ? allItems
                : allItems.filter(it => it.cat === cat);
            dataset.clear();
            dataset.add(filtered);
            fitToData();
            info.innerHTML = 'Click any event on the timeline to see details.';
        });
    });

    document.getElementById('fitBtn').addEventListener('click', fitToData);
});
