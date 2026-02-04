// Privacy Threshold by Textbook Level - Chart.js Visualization
// Shows the data collection intensity across five levels of intelligent textbooks

// Data for privacy requirements by level
const levels = [
    'Level 1\nStatic',
    'Level 2\nInteractive',
    'Level 3\nAdaptive',
    'Level 4\nChatbot',
    'Level 5\nAutonomous'
];

const dataRequirements = [0, .5, 7, 8, 10]; // Relative data intensity

// Descriptions shown in tooltips
const descriptions = [
    'No student data collected',
    'Anonymous usage analytics only',
    'Individual learning histories, performance tracking',
    'Conversation logs, question patterns, confusion signals',
    'Comprehensive cognitive profiles, behavioral patterns'
];

// Colors: Green for safe (L1-L2), Yellow/Orange/Red for regulated (L3-L5)
const backgroundColors = [
    'rgba(46, 204, 113, 0.8)',   // Green - safe
    'rgba(46, 204, 113, 0.8)',   // Green - safe
    'rgba(241, 196, 15, 0.8)',   // Yellow - caution
    'rgba(230, 126, 34, 0.8)',   // Orange - high
    'rgba(231, 76, 60, 0.8)'     // Red - very high
];

const borderColors = [
    'rgba(46, 204, 113, 1)',
    'rgba(46, 204, 113, 1)',
    'rgba(241, 196, 15, 1)',
    'rgba(230, 126, 34, 1)',
    'rgba(231, 76, 60, 1)'
];

// Custom plugin to draw the threshold line and zone labels
const thresholdLinePlugin = {
    id: 'thresholdLine',
    afterDraw: function(chart) {
        const ctx = chart.ctx;
        const xAxis = chart.scales.x;
        const yAxis = chart.scales.y;

        // Draw vertical threshold line between Level 2 and Level 3
        const x = xAxis.getPixelForValue(1.5);
        const yTop = yAxis.top;
        const yBottom = yAxis.bottom;

        ctx.save();
        ctx.beginPath();
        ctx.setLineDash([10, 5]);
        ctx.strokeStyle = 'rgba(231, 76, 60, 0.9)';
        ctx.lineWidth = 3;
        ctx.moveTo(x, yTop + 40);
        ctx.lineTo(x, yBottom);
        ctx.stroke();

        // Add "PRIVACY THRESHOLD" label above the line
        ctx.fillStyle = 'rgba(231, 76, 60, 1)';
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('PRIVACY', x, yTop + 15);
        ctx.fillText('THRESHOLD', x, yTop + 28);
        ctx.restore();

        // Add zone labels below the chart
        ctx.save();
        ctx.font = '11px Arial';

        // Safe zone label (under Level 1 and 2)
        ctx.fillStyle = 'rgba(46, 204, 113, 0.8)';
        const safeX = (xAxis.getPixelForValue(0) + xAxis.getPixelForValue(1)) / 2;
        ctx.fillText('Minimal Risk', safeX, yBottom + 35);

        // Regulated zone label (under Level 3, 4, 5)
        ctx.fillStyle = 'rgba(231, 76, 60, 0.8)';
        const regX = (xAxis.getPixelForValue(2) + xAxis.getPixelForValue(4)) / 2;
        ctx.fillText('Requires Regulation', regX, yBottom + 35);

        ctx.restore();
    }
};

// Chart configuration
const chartConfig = {
    type: 'bar',
    data: {
        labels: levels,
        datasets: [{
            label: 'Data Collection Intensity',
            data: dataRequirements,
            backgroundColor: backgroundColors,
            borderColor: borderColors,
            borderWidth: 2
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: 'The Privacy Threshold: Level 3 Inflection Point',
                font: { size: 16, weight: 'bold' },
                padding: { bottom: 5 }
            },
            subtitle: {
                display: true,
                text: 'Data collection requirements escalate dramatically at Level 3+',
                font: { size: 12, style: 'italic' },
                color: '#666',
                padding: { bottom: 10 }
            },
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    afterLabel: function(context) {
                        return descriptions[context.dataIndex];
                    }
                }
            }
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: {
                    font: { size: 11 }
                }
            },
            y: {
                beginAtZero: true,
                max: 12,
                title: {
                    display: true,
                    text: 'Data Collection Intensity',
                    font: { size: 13, weight: 'bold' }
                },
                ticks: {
                    callback: function(value) {
                        const labels = ['None', '', 'Minimal', '', 'Moderate', '', 'Significant', '', 'High', '', 'Very High'];
                        return labels[value] || '';
                    }
                }
            }
        }
    },
    plugins: [thresholdLinePlugin]
};

// Initialize chart when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('privacyChart').getContext('2d');
    new Chart(ctx, chartConfig);
});
