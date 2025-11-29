/*
    Intelligent Textbook Ecosystem - Causal Loop Diagram

    This script uses the vis-network.js library to render the CLD.

    URL Parameters:
    - menu=true: Show header and details panel (default: hidden for iframe)
*/

let network = null;
let cldData = null;
let nodes, edges;

async function loadCLDData() {
    try {
        const response = await fetch('data.json');
        if (!response.ok) {
            throw new Error(`Failed to load data.json: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        throw new Error(`Error loading CLD data: ${error.message}`);
    }
}

function initializeNetwork() {
    const container = document.getElementById('network');
    const options = {
        layout: {
            improvedLayout: false
        },
        physics: {
            enabled: false
        },
        interaction: {
            selectConnectedEdges: false,
            hover: true
        },
        nodes: {
            shape: 'box',
            margin: 12,
            font: {
                size: 14,
                face: 'Arial',
                multi: 'html'
            },
            borderWidth: 2,
            shadow: true,
            color: {
                background: 'white',
                border: '#3498db',
                highlight: {
                    background: '#e8f4fc',
                    border: '#2980b9'
                },
                hover: {
                    background: '#e8f4fc',
                    border: '#2980b9'
                }
            }
        },
        edges: {
            arrows: {
                to: { enabled: true, scaleFactor: 1.0 }
            },
            width: 2,
            smooth: {
                type: 'curvedCW',
                roundness: 0.3
            },
            font: {
                size: 32,
                strokeWidth: 2,
                strokeColor: 'white',
                align: 'middle'
            }
        }
    };

    network = new vis.Network(container, {}, options);

    network.on('click', function(params) {
        if (params.nodes.length > 0) {
            showNodeDetails(params.nodes[0]);
        } else if (params.edges.length > 0) {
            showEdgeDetails(params.edges[0]);
        } else {
            showDefaultDetails();
        }
    });
}

function loadCLD(data) {
    try {
        cldData = data;

        const titleEl = document.querySelector('.header h1');
        if (titleEl) {
            titleEl.textContent = data.metadata.title;
        }

        const descEl = document.getElementById('diagram-description');
        if (descEl) {
            descEl.textContent = data.metadata.description;
        }

        const visNodes = data.nodes.map(node => ({
            id: node.id,
            label: wrapText(node.label, 18),
            x: node.position.x,
            y: node.position.y,
            title: node.description || node.label,
            originalData: node
        }));

        const visEdges = data.edges.map(edge => {
            const edgeConfig = {
                id: edge.id,
                from: edge.source,
                to: edge.target,
                label: edge.polarity === 'positive' ? '+' : '−',
                color: {
                    color: edge.polarity === 'positive' ? '#28a745' : '#dc3545',
                    highlight: edge.polarity === 'positive' ? '#1e7e34' : '#c82333',
                    hover: edge.polarity === 'positive' ? '#1e7e34' : '#c82333'
                },
                title: edge.description,
                originalData: edge,
                font: {
                    size: 28,
                    strokeWidth: 2,
                    strokeColor: 'white',
                    color: edge.polarity === 'positive' ? '#28a745' : '#dc3545'
                }
            };

            if (edge.curve) {
                edgeConfig.smooth = {
                    type: edge.curve.type || 'curvedCW',
                    roundness: edge.curve.roundness || 0.3
                };
            }

            if (edge.delay && edge.delay.present) {
                edgeConfig.dashes = [10, 5];
            }

            return edgeConfig;
        });

        // Add loop indicators
        if (data.loops) {
            data.loops.forEach(loop => {
                if (loop.position) {
                    visNodes.push({
                        id: 'loop_' + loop.id,
                        label: loop.type === 'reinforcing' ? 'R' : 'B',
                        x: loop.position.x,
                        y: loop.position.y,
                        shape: 'ellipse',
                        size: 20,
                        color: {
                            background: loop.type === 'reinforcing' ? '#dc3545' : '#28a745',
                            border: '#333'
                        },
                        font: {
                            color: 'white',
                            size: 14,
                            face: 'Arial',
                            bold: true
                        },
                        title: `${loop.type === 'reinforcing' ? 'Reinforcing' : 'Balancing'} Loop: ${loop.label}`,
                        originalData: loop,
                        isLoop: true
                    });
                }
            });
        }

        nodes = new vis.DataSet(visNodes);
        edges = new vis.DataSet(visEdges);

        network.setData({ nodes: nodes, edges: edges });

        network.fit({
            animation: { duration: 500, easingFunction: "easeInOutQuad" }
        });

        showDefaultDetails();

    } catch (error) {
        showError('Error loading CLD data: ' + error.message);
    }
}

function wrapText(text, maxLength) {
    if (text.length <= maxLength) return text;

    const words = text.split(' ');
    const lines = [];
    let currentLine = '';

    for (const word of words) {
        if ((currentLine + ' ' + word).length <= maxLength) {
            currentLine += (currentLine ? ' ' : '') + word;
        } else {
            if (currentLine) lines.push(currentLine);
            currentLine = word;
        }
    }
    if (currentLine) lines.push(currentLine);

    return lines.join('\n');
}

function showNodeDetails(nodeId) {
    const nodeData = nodes.get(nodeId);
    if (!nodeData) return;

    let content = '';

    if (nodeData.isLoop) {
        const loop = nodeData.originalData;
        content = `
            <div class="loop-info ${loop.type}">
                <h4>${loop.label}</h4>
                <p><span class="label">Type:</span> ${loop.type === 'reinforcing' ? 'Reinforcing (R)' : 'Balancing (B)'}</p>
                <p><span class="label">Description:</span> ${loop.description}</p>
                ${loop.behavior_pattern ? `<p><span class="label">Behavior:</span> ${loop.behavior_pattern}</p>` : ''}
            </div>
        `;
    } else {
        const node = nodeData.originalData;
        content = `
            <h4>${node.label}</h4>
            <p><span class="label">Type:</span> ${node.type || 'variable'}</p>
            <p><span class="label">Description:</span> ${node.description}</p>
            ${node.examples ? `<p><span class="label">Examples:</span> ${node.examples.join(', ')}</p>` : ''}
        `;
    }

    document.getElementById('details-content').innerHTML = content;
}

function showEdgeDetails(edgeId) {
    const edgeData = edges.get(edgeId);
    if (!edgeData) return;

    const edge = edgeData.originalData;
    const sourceNode = cldData.nodes.find(n => n.id === edge.source);
    const targetNode = cldData.nodes.find(n => n.id === edge.target);

    const content = `
        <h4>Causal Relationship</h4>
        <p><span class="label">From:</span> ${sourceNode ? sourceNode.label : edge.source}</p>
        <p><span class="label">To:</span> ${targetNode ? targetNode.label : edge.target}</p>
        <p><span class="label">Polarity:</span> ${edge.polarity === 'positive' ? 'Positive (+)' : 'Negative (−)'}</p>
        <p><span class="label">Description:</span> ${edge.description}</p>
        ${edge.strength ? `<p><span class="label">Strength:</span> ${edge.strength}</p>` : ''}
        ${edge.delay && edge.delay.present ? `<p><span class="label">Delay:</span> ${edge.delay.duration || 'Yes'}</p>` : ''}
    `;

    document.getElementById('details-content').innerHTML = content;
}

function showDefaultDetails() {
    let content = '<p>Click on a node, edge, or loop symbol to see details.</p>';

    if (cldData) {
        content += `<h4>Key Insights</h4><ul>`;
        if (cldData.educational_content && cldData.educational_content.key_insights) {
            cldData.educational_content.key_insights.forEach(insight => {
                content += `<li>${insight}</li>`;
            });
        }
        content += `</ul>`;
    }

    document.getElementById('details-content').innerHTML = content;
}

function showError(message) {
    document.getElementById('details-content').innerHTML = `<div class="error">${message}</div>`;
}

function getURLParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

function checkMenuParameter() {
    const menu = getURLParameter('menu');
    if (menu !== 'true') {
        document.body.classList.add('menu-hidden');
    }
}

window.addEventListener('load', async function() {
    initializeNetwork();
    checkMenuParameter();

    try {
        const data = await loadCLDData();
        loadCLD(data);
    } catch (error) {
        showError(error.message);
    }
});
