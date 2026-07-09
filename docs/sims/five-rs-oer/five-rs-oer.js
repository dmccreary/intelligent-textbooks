// 5Rs of OER Workflow — Mermaid MicroSim Interactive Script
// CANVAS_HEIGHT: 800
//
// IMPORTANT: Define nodeInfo object in main.html BEFORE loading this script:
//
// const nodeInfo = {
//     'NodeId': {
//         title: 'Node Title',
//         hover: 'Short one-sentence hover tooltip',
//         detail: 'Longer narrative paragraph shown on click',
//         sixth: false
//     },
//     ...
// };

const tooltip = document.getElementById('tooltip');
const detailBox = document.getElementById('detail');
const defaultDetail = detailBox ? detailBox.innerHTML : '';

let selectedNode = null;

function showTooltip(evt, nodeId) {
    if (typeof nodeInfo === 'undefined' || !nodeInfo[nodeId]) return;
    tooltip.textContent = nodeInfo[nodeId].hover;
    tooltip.classList.add('visible');
    positionTooltip(evt);
}

function positionTooltip(evt) {
    const x = evt.clientX + 15;
    const y = evt.clientY + 15;
    const tooltipRect = tooltip.getBoundingClientRect();
    const maxX = window.innerWidth - tooltipRect.width - 10;
    const maxY = window.innerHeight - tooltipRect.height - 10;
    tooltip.style.left = Math.min(x, maxX) + 'px';
    tooltip.style.top = Math.min(y, maxY) + 'px';
}

function hideTooltip() {
    tooltip.classList.remove('visible');
}

function showDetail(nodeId) {
    if (typeof nodeInfo === 'undefined' || !nodeInfo[nodeId]) return;
    const info = nodeInfo[nodeId];
    const titleClass = info.sixth ? 'detail-title sixth' : 'detail-title';
    detailBox.innerHTML = `
        <div class="${titleClass}">${info.title}</div>
        <div class="detail-desc">${info.detail}</div>
    `;
}

function clearSelection() {
    if (selectedNode) {
        selectedNode.classList.remove('selected');
        selectedNode = null;
    }
}

function selectNode(nodeEl) {
    clearSelection();
    nodeEl.classList.add('selected');
    selectedNode = nodeEl;
}

function setupNodeInteractions() {
    const nodes = document.querySelectorAll('.node');
    nodes.forEach(node => {
        // Mermaid v11 generates IDs like "mermaid-<timestamp>-flowchart-NodeId-123"
        // Match everything between "flowchart-" and the trailing "-<index>".
        const match = node.id.match(/flowchart-(.+)-\d+$/);
        const nodeId = match ? match[1] : null;
        if (!nodeId || typeof nodeInfo === 'undefined' || !nodeInfo[nodeId]) return;

        node.addEventListener('mouseenter', (e) => showTooltip(e, nodeId));
        node.addEventListener('mousemove', (e) => positionTooltip(e));
        node.addEventListener('mouseleave', hideTooltip);
        node.addEventListener('click', () => {
            selectNode(node);
            showDetail(nodeId);
        });
    });
}

// Robust polling: wait for Mermaid to finish rendering before setting up interactions
function waitForMermaid() {
    const mermaidDiv = document.querySelector('.mermaid');
    const svg = mermaidDiv ? mermaidDiv.querySelector('svg') : null;
    const nodes = document.querySelectorAll('.node');

    if (svg && nodes.length > 0) {
        setupNodeInteractions();
    } else {
        setTimeout(waitForMermaid, 100);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(waitForMermaid, 100));
} else {
    setTimeout(waitForMermaid, 100);
}
