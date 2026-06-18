// Intelligent Textbook Page Views - Chart.js (horizontal bar)
// CANVAS_HEIGHT: 1320
//
// Loads ga4-pageviews-results.csv (same directory) at runtime and renders a
// ranked horizontal bar chart of GA4 page views over the last 90 days.
// Re-generate the CSV with src/site-analytics/ga4-pageviews-report.py --csv and
// copy it here to refresh the chart — no code changes needed.

const CSV_FILE = 'ga4-pageviews-results.csv';
const ROW_PX = 20;   // vertical pixels allotted per bar

// Parse simple CSV (no quoted commas in this data) into array of row objects.
function parseCsv(text) {
    const lines = text.trim().split(/\r?\n/);
    const header = lines[0].split(',');
    const iSlug = header.indexOf('slug');
    const iViews = header.indexOf('page_views');
    const rows = [];
    for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue;
        const cols = lines[i].split(',');
        rows.push({ slug: cols[iSlug], views: parseInt(cols[iViews], 10) || 0 });
    }
    return rows;
}

function renderChart(rows) {
    // Sort descending by views so the most-visited textbook is at the top.
    rows.sort((a, b) => b.views - a.views);

    const labels = rows.map(r => r.slug);
    const values = rows.map(r => r.views);
    const total = values.reduce((a, b) => a + b, 0);
    const maxVal = Math.max(...values, 0);

    const main = document.querySelector('main');
    const chartPx = labels.length * ROW_PX + 70;  // bars + x-axis room
    main.innerHTML = `
        <div style="padding: 8px 14px 6px 14px; font-family: Arial, Helvetica, sans-serif;">
            <div style="font-size: 17px; font-weight: 600; text-align: center;">
                Intelligent Textbook Page Views
            </div>
            <div style="font-size: 12px; color: #555; text-align: center; margin: 2px 0 6px 0;">
                Last 90 days &nbsp;·&nbsp; ${labels.length} textbooks &nbsp;·&nbsp;
                ${total.toLocaleString()} total page views
            </div>
            <div style="position: relative; height: ${chartPx}px;">
                <canvas id="pageViews"></canvas>
            </div>
        </div>
    `;

    // Register the datalabels plugin (loaded via CDN) once, if available.
    if (window.ChartDataLabels && !Chart.registry.plugins.get('datalabels')) {
        Chart.register(window.ChartDataLabels);
    }

    const ctx = document.getElementById('pageViews').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Page Views',
                data: values,
                backgroundColor: 'rgba(54, 162, 235, 0.85)',
                borderColor: 'rgb(33, 102, 172)',
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y',                 // horizontal bars
            responsive: true,
            maintainAspectRatio: false,
            layout: { padding: { right: 52 } },  // room for value labels at bar ends
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: (item) => ` ${item.parsed.x.toLocaleString()} page views`
                    }
                },
                datalabels: {
                    anchor: 'end',
                    align: 'end',
                    color: '#333',
                    font: { size: 10 },
                    formatter: (v) => v.toLocaleString()
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    suggestedMax: maxVal * 1.05,
                    title: { display: true, text: 'Page Views (last 90 days)' },
                    ticks: { callback: (v) => v.toLocaleString() },
                    grid: { color: 'rgba(0,0,0,0.06)' }
                },
                y: {
                    ticks: { autoSkip: false, font: { size: 10 } },
                    grid: { display: false }
                }
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    fetch(CSV_FILE)
        .then(resp => {
            if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
            return resp.text();
        })
        .then(text => renderChart(parseCsv(text)))
        .catch(err => {
            const main = document.querySelector('main');
            main.innerHTML = `
                <div style="padding: 20px; font-family: Arial, Helvetica, sans-serif; color: #b00;">
                    Could not load <code>${CSV_FILE}</code>: ${err.message}.<br>
                    This chart must be served over HTTP (e.g. <code>mkdocs serve</code> or
                    GitHub Pages), not opened directly from the filesystem.
                </div>
            `;
        });
});
