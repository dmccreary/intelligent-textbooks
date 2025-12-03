// Question-Based Learning Graph Update Visualization
// Interactive demonstration of how answering questions updates a personal learning graph

// Define node colors based on learning states
const colors = {
    gray: {
        background: '#e0e0e0',
        border: '#757575',
        font: '#333333'
    },
    green: {
        background: '#4caf50',
        border: '#2e7d32',
        font: 'white'
    },
    orange: {
        background: '#ff9800',
        border: '#f57c00',
        font: '#333333'
    },
    red: {
        background: '#f44336',
        border: '#c62828',
        font: '#ffffff'
    },
    purple: {
        background: '#9c27b0',
        border: '#6a1b9a',
        font: '#ffffff'
    }
};

// Graph data - loaded from data.json
let graphData = null;
let nodeData = [];
let edgeData = [];

// State tracking
let nodeStates = {};  // 'gray', 'green', 'orange', 'red'
let nodeCertainty = {};  // 0.0 to 1.0
let selectedNode = null;
let nodes, edges, network;
let dependencies = {};
let dependents = {};

// Check if save mode is enabled via URL parameter
function isSaveEnabled() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('enable-save') === 'true';
}

// Load graph data from data.json
async function loadGraphData() {
    try {
        const response = await fetch('data.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        graphData = await response.json();
        nodeData = graphData.nodes;
        edgeData = graphData.edges;

        // Build dependency graph after loading data
        buildDependencyGraph();

        return true;
    } catch (error) {
        console.error('Error loading graph data:', error);
        // Fallback to empty data
        nodeData = [];
        edgeData = [];
        return false;
    }
}

// Build adjacency list for dependency checking
function buildDependencyGraph() {
    dependencies = {};
    dependents = {};

    nodeData.forEach(n => {
        dependencies[n.id] = [];
        dependents[n.id] = [];
    });

    edgeData.forEach(edge => {
        dependencies[edge.from].push(edge.to);  // "from" depends on "to"
        dependents[edge.to].push(edge.from);    // "to" has "from" as dependent
    });
}

// Check if all prerequisites for a node are mastered (green)
function allPrerequisitesMastered(nodeId) {
    const prereqs = dependencies[nodeId];
    if (!prereqs || prereqs.length === 0) return true;
    return prereqs.every(prereqId => nodeStates[prereqId] === 'green');
}

// Update "ready to learn" (orange) status for all nodes
function updateReadyToLearn() {
    nodeData.forEach(node => {
        if (nodeStates[node.id] === 'gray') {
            if (allPrerequisitesMastered(node.id)) {
                setNodeColor(node.id, 'orange');
            }
        }
    });
}

// Certainty decay factor for inferred prerequisite mastery
const CERTAINTY_DECAY = 0.9;

// Propagate mastery backward to prerequisites with decaying certainty
// If student masters a concept, we infer they've mastered prerequisites
function propagateMasteryToPrerequisites(nodeId, certainty) {
    const prereqs = dependencies[nodeId];
    if (!prereqs || prereqs.length === 0) return;

    prereqs.forEach(prereqId => {
        // Calculate new certainty for this prerequisite
        const newCertainty = certainty * CERTAINTY_DECAY;

        // Only update if:
        // 1. Node is not already green with higher certainty, OR
        // 2. Node is gray/orange (not yet assessed)
        const currentState = nodeStates[prereqId];
        const currentCertainty = nodeCertainty[prereqId];

        if (currentState === 'gray' || currentState === 'orange' ||
            (currentState === 'green' && newCertainty > currentCertainty)) {

            // Mark as mastered (inferred)
            setNodeColor(prereqId, 'green');
            nodeCertainty[prereqId] = newCertainty;

            // Recursively propagate to this node's prerequisites
            propagateMasteryToPrerequisites(prereqId, newCertainty);
        }
    });
}

/* Position the view to show nodes on the left side of canvas
 *    - Lower x value = moves the view RIGHT (shows more of left side of graph)
 *    - Higher y value = moves the view UP (shows more of bottom of graph)
 */
function positionView() {
    if (network) {
        network.moveTo({
            position: { x: -70, y: 20 },
            scale: 0.9,
            animation: false
        });
    }
}

function initializeNetwork() {
    // Reset state
    nodeStates = {};
    nodeCertainty = {};
    selectedNode = null;

    // Define initial goals (purple nodes) - these are learning objectives
    const initialGoals = [40]; // Simplify

    // Initialize all nodes as gray with 0.5 certainty (unless they're goals)
    const initialNodes = nodeData.map(node => {
        const isGoal = initialGoals.includes(node.id);
        nodeStates[node.id] = isGoal ? 'purple' : 'gray';
        nodeCertainty[node.id] = isGoal ? 0.0 : 0.5;
        const colorSet = isGoal ? colors.purple : colors.gray;
        return {
            id: node.id,
            label: node.label,
            x: node.x,
            y: node.y,
            color: {
                background: colorSet.background,
                border: colorSet.border
            },
            font: { color: colorSet.font, size: 14 }
        };
    });

    // Initialize edges
    const initialEdges = edgeData.map((edge, index) => ({
        id: index,
        from: edge.from,
        to: edge.to,
        color: { color: '#666666' },
        width: 2
    }));

    nodes = new vis.DataSet(initialNodes);
    edges = new vis.DataSet(initialEdges);

    // Configure vis-network options
    // Enable dragging only if save mode is enabled
    const saveEnabled = isSaveEnabled();

    const options = {
        layout: {
            improvedLayout: false
        },
        physics: {
            enabled: false
        },
        interaction: {
            selectConnectedEdges: false,
            zoomView: saveEnabled,      // Enable mouse zoom in save mode only
            dragView: saveEnabled,      // Enable mouse pan in save mode only
            dragNodes: true,            // Always allow node dragging
            navigationButtons: saveEnabled, // Show zoom/pan controls in save mode
            keyboard: saveEnabled,      // Enable keyboard navigation in save mode
            hover: true
        },
        nodes: {
            shape: 'ellipse',
            margin: 10,
            font: {
                size: 14,
                face: 'Arial'
            },
            borderWidth: 3,
            shadow: {
                enabled: true,
                color: 'rgba(0,0,0,0.2)',
                size: 5,
                x: 2,
                y: 2
            }
        },
        edges: {
            arrows: {
                to: { enabled: true, scaleFactor: 1 }
            },
            width: 2,
            smooth: {
                type: 'curvedCW',
                roundness: 0.15
            }
        }
    };

    // Create/recreate the network
    const container = document.getElementById('network');
    const data = { nodes: nodes, edges: edges };
    network = new vis.Network(container, data, options);

    // Set up event handlers
    network.on('click', handleNodeClick);
    network.on('hoverNode', handleNodeHover);
    network.on('blurNode', handleNodeBlur);

    // Track node position changes for save functionality
    if (saveEnabled) {
        network.on('dragEnd', handleDragEnd);
    }

    // Position the view
    setTimeout(positionView, 200);

    // Initialize nodes that have no prerequisites as "ready to learn"
    updateReadyToLearn();

    // Update UI
    updateStats();
    resetQuestionPanel();
}

// Handle drag end to update node positions in nodeData
function handleDragEnd(params) {
    if (params.nodes.length > 0) {
        params.nodes.forEach(nodeId => {
            const position = network.getPositions([nodeId])[nodeId];
            const nodeIndex = nodeData.findIndex(n => n.id === nodeId);
            if (nodeIndex !== -1) {
                nodeData[nodeIndex].x = Math.round(position.x);
                nodeData[nodeIndex].y = Math.round(position.y);
            }
        });
    }
}

// Save current node positions to data.json (downloads file)
function saveNodePositions() {
    // Update graphData with current positions
    graphData.nodes = nodeData;

    // Create JSON string with nice formatting
    const jsonString = JSON.stringify(graphData, null, 2);

    // Create blob and download link
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    console.log('Node positions saved. Replace data.json with the downloaded file.');
}

function setNodeColor(nodeId, colorName) {
    nodeStates[nodeId] = colorName;
    const colorSet = colors[colorName];
    nodes.update({
        id: nodeId,
        color: {
            background: colorSet.background,
            border: colorSet.border
        },
        font: { color: colorSet.font, size: 14 }
    });
}

function handleNodeClick(params) {
    if (params.nodes.length > 0) {
        selectedNode = params.nodes[0];
        const node = nodeData.find(n => n.id === selectedNode);
        showQuestionForNode(node);
    }
}

function handleNodeHover(params) {
    const nodeId = params.node;
    const node = nodeData.find(n => n.id === nodeId);
    const state = nodeStates[nodeId];
    const certainty = nodeCertainty[nodeId];
    const prereqs = dependencies[nodeId].map(id => {
        const n = nodeData.find(x => x.id === id);
        return n ? n.label : id;
    });

    const certaintyDisplay = document.getElementById('certainty-display');
    const certaintyContent = document.getElementById('certainty-content');

    let stateText = {
        'gray': 'Unknown',
        'green': 'Mastered',
        'red': 'Incorrect',
        'orange': 'Ready to Learn',
        'purple': 'Learning Goal'
    }[state];

    let html = `<strong>${node.label}</strong><br>`;
    html += `Status: ${stateText}<br>`;
    html += `Certainty: ${Math.round(certainty * 100)}%<br>`;
    if (prereqs.length > 0) {
        html += `Prerequisites: ${prereqs.join(', ')}`;
    } else {
        html += `Prerequisites: None (foundation concept)`;
    }

    certaintyContent.innerHTML = html;
    certaintyDisplay.style.display = 'block';
}

function handleNodeBlur(params) {
    document.getElementById('certainty-display').style.display = 'none';
}

function showQuestionForNode(node) {
    const questionTitle = document.getElementById('question-title');
    const answerSection = document.getElementById('answer-section');

    questionTitle.textContent = `Concept: ${node.label}`;
    answerSection.style.display = 'block';

    // Clear previous selection
    document.getElementById('radio-correct').checked = false;
    document.getElementById('radio-incorrect').checked = false;
}

function resetQuestionPanel() {
    const questionTitle = document.getElementById('question-title');
    const answerSection = document.getElementById('answer-section');

    questionTitle.textContent = 'Click a node to assess';
    answerSection.style.display = 'none';
    selectedNode = null;
}

function submitAnswer() {
    if (!selectedNode) return;

    const correct = document.getElementById('radio-correct').checked;
    const incorrect = document.getElementById('radio-incorrect').checked;

    if (!correct && !incorrect) {
        alert('Please select Correct or Incorrect');
        return;
    }

    if (correct) {
        // Mark as mastered (green) with full certainty
        setNodeColor(selectedNode, 'green');
        nodeCertainty[selectedNode] = 1.0;

        // Backward inference: If student masters this concept,
        // they likely have mastered prerequisites (with decaying certainty)
        propagateMasteryToPrerequisites(selectedNode, 1.0);

        // Forward update: dependent nodes may now be "ready to learn"
        updateReadyToLearn();
    } else {
        // Mark as learning goal (red)
        setNodeColor(selectedNode, 'red');
        nodeCertainty[selectedNode] = 0.0;
    }

    updateStats();

    // Deselect the node so user can see the color change
    network.unselectAll();

    resetQuestionPanel();
}

function updateStats() {
    const mastered = Object.values(nodeStates).filter(s => s === 'green').length;
    const total = nodeData.length;
    document.getElementById('stats').textContent = `Concepts Mastered: ${mastered} / ${total}`;
}

function reset() {
    initializeNetwork();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', async function() {
    // Load graph data first
    await loadGraphData();

    // Initialize the network
    initializeNetwork();

    // Set up button handlers
    document.getElementById('submit-btn').addEventListener('click', submitAnswer);
    document.getElementById('reset-btn').addEventListener('click', reset);

    // Show save button if save mode is enabled
    if (isSaveEnabled()) {
        const saveBtn = document.getElementById('save-btn');
        saveBtn.style.display = 'block';
        saveBtn.addEventListener('click', saveNodePositions);
    }

    // Handle window resize
    window.addEventListener('resize', positionView);
});
