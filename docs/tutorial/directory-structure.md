# Directory Structure for Intelligent Textbooks

Here is our recommend file structure for an intelligent textbook.
The actual names of the folders and files are mostly convention, and
they can be changed as long as your `mkdocs.yml` file is also updated.

Note that in the listing below, folders are listed before files.

```
project-root/
├── data/                    # Data files like the learning graph in csv and json format
├── data/learning-graph.json # Learning graph for this course in JSON format
├── data/learning-graph.csv  # Learning graph for this course in CSV format
├── docs/                    # All markdown content that is converted to HTML goes here
│   ├── img/                 # Images for general use
│   ├── img/cover.png        # Book cover
│   ├── img/logo.png         # Book logo for upper left corner
│   ├── img/favicon.ico      # Book favicon for logo in browser bookmarks
|   ├── chapters/            # Directory for all textbook chapter content
│   └── index.md             # Home landing page for the textbook
│   │   ├── chapter-1/       # Directory for holding content for chapter 1
│   │   │   ├── index.md     # Main content for chapter 1
│   │   │   ├── fig-1.png    # Chapter 1 figure 1
│   │   │   ├── fig-2.png    # Chapter 1 figure 2
│   │   │   ├── index.md     # Main content for chapter 1
│   │   ├── chapter-2/       # Directory for holding content for chapter 1
│   │   │   ├── fig-1.png    # Chapter 2 figure 1
│   │   │   ├── fig-2.png    # Chapter 2 figure 2
│   │   │   ├── index.md     # Main content for chapter 2
│   ├── css/                 # Directory for any custom CSS files
│   ├── css/extra.css        # File of CSS added to each page
│   ├── js/                  # Custom JavaScript files
│   ├── js/extra.js          # File of extra Javascript for each page
│   ├── sims/                # Interactive simulations
│   │   ├── sim-name-1/      # Each simulation in its own directory
│   │   │   ├── index.md     # Documentation for the simulation
│   │   │   ├── sketch.js    # Main simulation code (if using p5.js)
│   │   │   └── img/         # Simulation-specific images
│   └── contact.md           # Contact name for the book
│   └── feedback.md          # How users can provide feedback on this book
│   └── glossary.md          # Glossary of terms
│   └── index.md             # List of Chapters or Table of Contents
│   └── license.md           # Creative Commons or similar license data
│   └── references.md        # External references such as citations to other papers, books and articles
├── src/                     # source code including content management tools
├── mkdocs.yml               # Configuration file
├── README.md                # Repository documentation
└── requirements.txt         # Python dependencies including mkdocs-material and extensions
```