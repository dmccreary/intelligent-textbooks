let network;

fetch('data.json')
  .then((response) => response.json())
  .then((data) => {
    const container = document.getElementById('network');

    // Calculate out-degree (number of outgoing edges) for each node
    const outDegree = {};
    data.nodes.forEach(node => {
      outDegree[node.id] = 0;
    });
    data.edges.forEach(edge => {
      outDegree[edge.from]++;
    });

    // Function to get color based on level
    function getLevelColor(level) {
      const colors = [
        '#ffcccc', // Level 0: light red
        '#ffd9b3', // Level 1: light orange
        '#ffff99', // Level 2: yellow
        '#ccffcc', // Level 3: light green
        '#ccffff', // Level 4: cyan
        '#e6ccff', // Level 5: light purple
        '#ffccf2', // Level 6: light pink
        '#d9d9d9'  // Level 7+: light gray
      ];
      return colors[Math.min(level, colors.length - 1)];
    }

    // Add size and color to nodes based on out-degree and level
    const nodesWithSize = data.nodes.map(node => {
      const degree = outDegree[node.id];

      // Scale font size and margin based on out-degree
      const fontSize = 12 + (degree * 2);
      const margin = 6 + (degree * 4);
      const backgroundColor = getLevelColor(node.level);

      return {
        ...node,
        font: { size: fontSize, face: 'system-ui' },
        margin: margin,
        widthConstraint: { minimum: 80 + (degree * 2) },
        color: {
          background: backgroundColor,
          border: '#4a7dff',
          highlight: { background: '#fff7d6', border: '#ffb100' }
        }
      };
    });

    const nodes = new vis.DataSet(nodesWithSize);
    const edges = new vis.DataSet(data.edges);
    const networkData = { nodes, edges };

    function getOptions(layoutType) {
      const baseOptions = {
        edges: {
          arrows: { to: { enabled: true, scaleFactor: 0.6 } },
          smooth: { type: 'cubicBezier', roundness: 0.4 }
        },
        nodes: {
          shape: 'box',
          borderWidth: 1
        },
        interaction: {
          hover: true,
          tooltipDelay: 120,
          navigationButtons: true,
          keyboard: true
        }
      };

      if (layoutType === 'hierarchical') {
        return {
          ...baseOptions,
          layout: {
            hierarchical: {
              enabled: true,
              direction: 'LR',
              sortMethod: 'directed',
              levelSeparation: 250,
              nodeSpacing: 70
            }
          },
          physics: { enabled: false }
        };
      } else {
        return {
          ...baseOptions,
          layout: {
            hierarchical: { enabled: false }
          },
          physics: {
            enabled: true,
            solver: 'forceAtlas2Based',
            forceAtlas2Based: {
              gravitationalConstant: -50,
              centralGravity: 0.01,
              springLength: 150,
              springConstant: 0.05,
              avoidOverlap: 1
            },
            stabilization: {
              enabled: true,
              iterations: 200,
              updateInterval: 25
            },
            adaptiveTimestep: true
          }
        };
      }
    }

    network = new vis.Network(container, networkData, getOptions('hierarchical'));

    // Add event listeners for layout switching
    const radioButtons = document.querySelectorAll('input[name="layout"]');
    radioButtons.forEach(radio => {
      radio.addEventListener('change', (e) => {
        const layoutType = e.target.value;

        // Destroy and recreate the network to properly reset positions
        if (network) {
          network.destroy();
        }

        network = new vis.Network(container, networkData, getOptions(layoutType));

        // For force-directed, wait for stabilization then fit and stop physics
        if (layoutType === 'forceDirected') {
          network.once('stabilizationIterationsDone', () => {
            network.setOptions({ physics: { enabled: false } });
            network.fit();
          });

          // Re-enable physics temporarily when a node is moved
          let physicsTimeout = null;
          network.on('dragEnd', () => {
            // Clear any existing timeout
            if (physicsTimeout) {
              clearTimeout(physicsTimeout);
            }

            // Enable physics
            network.setOptions({ physics: { enabled: true } });

            // Disable physics after 5 seconds
            physicsTimeout = setTimeout(() => {
              network.setOptions({ physics: { enabled: false } });
            }, 5000);
          });
        } else {
          network.fit();
        }
      });
    });
  })
  .catch((err) => console.error('Error loading data.json:', err));