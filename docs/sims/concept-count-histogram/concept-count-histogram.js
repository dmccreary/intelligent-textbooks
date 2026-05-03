// Book Concept Count Histogram - Chart.js
// CANVAS_HEIGHT: 540

// Source: docs/sims/concept-analytics/book-concept-counts.csv
const books = [
    { name: "AI Assisted Geometry", count: 200 },
    { name: "AI Based Data Science with Python", count: 300 },
    { name: "AI Interactive Infographics", count: 350 },
    { name: "Algebra I", count: 200 },
    { name: "Ancient History", count: 297 },
    { name: "AP Statistics", count: 300 },
    { name: "ASL Book", count: 200 },
    { name: "Automating Instructional Design", count: 200 },
    { name: "Bioinformatics", count: 480 },
    { name: "Biology", count: 380 },
    { name: "Blockchain - The Skeptic's Guide", count: 200 },
    { name: "Calculus", count: 380 },
    { name: "Circuits 1", count: 300 },
    { name: "Claude Skills for Intelligent Textbooks", count: 200 },
    { name: "Computer Science", count: 400 },
    { name: "Control Systems", count: 300 },
    { name: "Conversational AI", count: 200 },
    { name: "Cybersecurity", count: 390 },
    { name: "Digital Citizenship", count: 265 },
    { name: "Digital Electronics", count: 300 },
    { name: "Ecology", count: 380 },
    { name: "Ethics in Modern Society", count: 250 },
    { name: "FFT Benchmarking", count: 200 },
    { name: "Genetics", count: 350 },
    { name: "Graph Data Modeling", count: 259 },
    { name: "IB Mathematics Functions", count: 208 },
    { name: "Information Systems", count: 580 },
    { name: "Intelligent Textbook - Digital System Design", count: 410 },
    { name: "Introduction to Economics", count: 206 },
    { name: "Introduction to Graph Databases", count: 200 },
    { name: "Introduction to Physics", count: 200 },
    { name: "Investor Relations Textbook", count: 298 },
    { name: "IT Management with Graphs", count: 200 },
    { name: "Learning Linux", count: 550 },
    { name: "Learning Sciences", count: 221 },
    { name: "Linear Algebra", count: 300 },
    { name: "Micro Simulations for Education", count: 240 },
    { name: "MicroSim Search and Similarity", count: 200 },
    { name: "Modeling Healthcare Data with Graphs", count: 210 },
    { name: "Moss", count: 400 },
    { name: "Networking and Communication", count: 338 },
    { name: "Organizational Analytics", count: 200 },
    { name: "Personal Finance with AI", count: 200 },
    { name: "Pre-Calculus", count: 307 },
    { name: "Quantum Computing", count: 241 },
    { name: "Reading for Kindergarten", count: 195 },
    { name: "SEIS 666", count: 200 },
    { name: "Signal Processing with AI", count: 200 },
    { name: "Theory of Knowledge", count: 275 },
    { name: "Token Efficiency", count: 475 },
    { name: "Tracking AI Course", count: 250 },
    { name: "Understanding Dementia", count: 200 },
    { name: "Unicorns and Other Mythical Beasts", count: 140 },
    { name: "US Geography", count: 200 },
    { name: "xAPI for Intelligent Textbooks", count: 250 }
];

const NUM_BINS = 15;

function buildBins(data, numBins) {
    const counts = data.map(d => d.count);
    const min = Math.min(...counts);
    const max = Math.max(...counts);
    const width = (max - min) / numBins;

    const bins = [];
    for (let i = 0; i < numBins; i++) {
        const lo = min + i * width;
        const hi = (i === numBins - 1) ? max : min + (i + 1) * width;
        bins.push({ lo, hi, books: [] });
    }
    for (const book of data) {
        let idx = Math.floor((book.count - min) / width);
        if (idx >= numBins) idx = numBins - 1;
        bins[idx].books.push(book);
    }
    return { bins, min, max, width };
}

function median(values) {
    const sorted = [...values].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 === 0
        ? (sorted[mid - 1] + sorted[mid]) / 2
        : sorted[mid];
}

document.addEventListener('DOMContentLoaded', function () {
    const main = document.querySelector('main');
    main.innerHTML = `
        <div style="padding: 8px 12px 4px 12px; font-family: Arial, Helvetica, sans-serif;">
            <div style="font-size: 16px; font-weight: 600; text-align: center; margin-bottom: 4px;">
                Distribution of Concept Counts Across 55 Intelligent Textbooks
            </div>
            <div style="position: relative; height: 400px;">
                <canvas id="histogram"></canvas>
            </div>
            <div id="stats" style="font-size: 12px; color: #444; text-align: center; padding-top: 6px;"></div>
        </div>
    `;

    const { bins, min, max } = buildBins(books, NUM_BINS);
    const counts = books.map(b => b.count);
    const total = counts.length;
    const mean = counts.reduce((a, b) => a + b, 0) / total;
    const med = median(counts);

    const labels = bins.map(b => `${Math.round(b.lo)}-${Math.round(b.hi)}`);
    const values = bins.map(b => b.books.length);

    document.getElementById('stats').innerHTML =
        `<strong>Books:</strong> ${total} &nbsp; · &nbsp; ` +
        `<strong>Min:</strong> ${min} &nbsp; · &nbsp; ` +
        `<strong>Max:</strong> ${max} &nbsp; · &nbsp; ` +
        `<strong>Mean:</strong> ${mean.toFixed(0)} &nbsp; · &nbsp; ` +
        `<strong>Median:</strong> ${med}`;

    const ctx = document.getElementById('histogram').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Books in bin',
                data: values,
                backgroundColor: 'rgba(54, 162, 235, 0.75)',
                borderColor: 'rgb(33, 102, 172)',
                borderWidth: 1,
                barPercentage: 1.0,
                categoryPercentage: 1.0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        title: (items) => {
                            const i = items[0].dataIndex;
                            const b = bins[i];
                            return `Concepts ${Math.round(b.lo)}–${Math.round(b.hi)}`;
                        },
                        label: (item) => {
                            const i = item.dataIndex;
                            const n = bins[i].books.length;
                            return `${n} book${n === 1 ? '' : 's'}`;
                        },
                        afterBody: (items) => {
                            const i = items[0].dataIndex;
                            const list = bins[i].books;
                            if (list.length === 0) return '';
                            const shown = list.slice(0, 8).map(b => `• ${b.name} (${b.count})`);
                            if (list.length > 8) shown.push(`…and ${list.length - 8} more`);
                            return shown;
                        }
                    }
                }
            },
            scales: {
                x: {
                    title: { display: true, text: 'Concept Count Range' },
                    ticks: { maxRotation: 45, minRotation: 45, font: { size: 10 } },
                    grid: { display: false }
                },
                y: {
                    beginAtZero: true,
                    title: { display: true, text: 'Number of Books' },
                    ticks: { stepSize: 1, precision: 0 }
                }
            }
        }
    });
});
