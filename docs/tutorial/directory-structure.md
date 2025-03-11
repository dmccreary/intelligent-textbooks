# Directory Structure for Intelligent Textbooks

```
project-root/
├── data/                  # data files like the learning graph in csv and json format
├── docs/                  # All content that is converted to HTML goes here
│   ├── img/               # Images for general use
│   ├── css/               # Custom CSS files
│   ├── js/                # Custom JavaScript files
│   ├── sims/              # Interactive simulations
│   │   ├── sim-name-1/    # Each simulation in its own directory
│   │   │   ├── index.md   # Documentation for the simulation
│   │   │   ├── sketch.js  # Main simulation code (if using p5.js)
│   │   │   └── img/       # Simulation-specific images
│   ├── tutorial/          # Tutorial content
│   ├── glossary.md        # Glossary of terms
│   └── index.md           # Home page
├── src/                   # source code including content management tools
├── mkdocs.yml             # Configuration file
├── README.md              # Repository documentation
└── requirements.txt       # Python dependencies including mkdocs-material and extensions
```