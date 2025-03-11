#!/usr/bin/env python3

"""
Intelligent Textbook Dashboard Generator

This script generates an HTML dashboard for a collection of intelligent textbooks
built with MkDocs-Material. It reads site metadata from a JSON file and creates
a responsive dashboard with metrics, status, and links.

Usage:
  python dashboard_generator.py sites.json output_directory
"""

import json
import os
import sys
import argparse
from datetime import datetime
import matplotlib.pyplot as plt
import numpy as np
from jinja2 import Template
import pandas as pd
import seaborn as sns

def parse_arguments():
    """Parse command line arguments."""
    parser = argparse.ArgumentParser(description="Generate an intelligent textbook dashboard.")
    parser.add_argument("sites_json", help="Path to the JSON file containing site metadata")
    parser.add_argument("output_dir", help="Directory to output the dashboard files")
    return parser.parse_args()

def load_sites_data(json_file):
    """Load site data from the JSON file."""
    with open(json_file, 'r') as f:
        data = json.load(f)
    
    # Convert to a flat list of site dictionaries
    sites = []
    for item in data:
        if 'site' in item:
            sites.append(item['site'])
    
    return sites

def generate_metrics_charts(sites, output_dir):
    """Generate charts for various metrics."""
    os.makedirs(os.path.join(output_dir, 'charts'), exist_ok=True)
    
    # Prepare data for charts - filtering sites with necessary metrics
    metrics_sites = []
    for site in sites:
        if all(k in site for k in ['markdown-file-count', 'word-count', 'image-count', 'microsim-count']):
            metrics_sites.append(site)
    
    if not metrics_sites:
        return {}  # No sites with complete metrics
    
    chart_paths = {}
    
    # Create comparison bar chart for markdown files, images, and microsims
    if metrics_sites:
        plt.figure(figsize=(12, 8))
        df = pd.DataFrame(metrics_sites)
        df = df.sort_values(by='word-count', ascending=False)
        sites_to_plot = df.head(10)  # Top 10 by word count
        
        # Plotting
        sns.set_style("whitegrid")
        plt.figure(figsize=(14, 8))
        
        # Normalize data for better visualization
        x = np.arange(len(sites_to_plot))
        width = 0.2
        
        plt.bar(x - width, sites_to_plot['markdown-file-count'], width, label='Markdown Files')
        plt.bar(x, sites_to_plot['image-count'], width, label='Images')
        plt.bar(x + width, sites_to_plot['microsim-count'], width, label='MicroSims')
        
        plt.xlabel('Site')
        plt.ylabel('Count')
        plt.title('Content Metrics by Site')
        plt.xticks(x, sites_to_plot['name'], rotation=45, ha='right')
        plt.legend()
        plt.tight_layout()
        
        content_metrics_path = os.path.join('charts', 'content_metrics.png')
        plt.savefig(os.path.join(output_dir, content_metrics_path))
        plt.close()
        
        chart_paths['content_metrics'] = content_metrics_path
        
        # Word count chart
        plt.figure(figsize=(14, 8))
        sns.barplot(x='name', y='word-count', data=sites_to_plot)
        plt.xlabel('Site')
        plt.ylabel('Word Count')
        plt.title('Total Word Count by Site')
        plt.xticks(rotation=45, ha='right')
        plt.tight_layout()
        
        word_count_path = os.path.join('charts', 'word_count.png')
        plt.savefig(os.path.join(output_dir, word_count_path))
        plt.close()
        
        chart_paths['word_count'] = word_count_path
        
        # Microsim to content ratio
        plt.figure(figsize=(14, 8))
        sites_to_plot['microsim_ratio'] = sites_to_plot['microsim-count'] / sites_to_plot['markdown-file-count']
        sns.barplot(x='name', y='microsim_ratio', data=sites_to_plot)
        plt.xlabel('Site')
        plt.ylabel('MicroSims per Markdown File')
        plt.title('MicroSim to Content Ratio')
        plt.xticks(rotation=45, ha='right')
        plt.tight_layout()
        
        microsim_ratio_path = os.path.join('charts', 'microsim_ratio.png')
        plt.savefig(os.path.join(output_dir, microsim_ratio_path))
        plt.close()
        
        chart_paths['microsim_ratio'] = microsim_ratio_path
    
    return chart_paths

def generate_html_dashboard(sites, chart_paths, output_dir):
    """Generate the HTML dashboard."""
    # Sort sites by word count if available, otherwise by name
    sorted_sites = sorted(
        sites, 
        key=lambda x: x.get('word-count', 0) if isinstance(x.get('word-count', 0), int) else 0, 
        reverse=True
    )
    
    # Calculate summary statistics
    total_sites = len(sites)
    total_markdown = sum(site.get('markdown-file-count', 0) for site in sites if isinstance(site.get('markdown-file-count', 0), int))
    total_images = sum(site.get('image-count', 0) for site in sites if isinstance(site.get('image-count', 0), int))
    total_words = sum(site.get('word-count', 0) for site in sites if isinstance(site.get('word-count', 0), int))
    total_microsims = sum(site.get('microsim-count', 0) for site in sites if isinstance(site.get('microsim-count', 0), int))
    total_glossary = sum(site.get('glossary-term-count', 0) for site in sites if isinstance(site.get('glossary-term-count', 0), int))
    
    # HTML template
    template_str = """
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Intelligent Textbooks Dashboard</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
        <style>
            .site-card {
                height: 100%;
                transition: transform 0.3s;
            }
            .site-card:hover {
                transform: translateY(-5px);
                box-shadow: 0 10px 20px rgba(0,0,0,0.1);
            }
            .metrics-badge {
                margin-right: 8px;
                margin-bottom: 8px;
            }
            .status-indicator {
                width: 15px;
                height: 15px;
                border-radius: 50%;
                display: inline-block;
                margin-right: 5px;
            }
            .status-early {
                background-color: #dc3545;
            }
            .status-developing {
                background-color: #ffc107;
            }
            .status-mature {
                background-color: #198754;
            }
        </style>
    </head>
    <body>
        <div class="container-fluid py-4">
            <h1 class="mb-4">Intelligent Textbooks Dashboard</h1>
            
            <div class="row mb-4">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Summary Statistics</h5>
                            <div class="row">
                                <div class="col-md-2">
                                    <div class="card bg-primary text-white mb-3">
                                        <div class="card-body">
                                            <h5 class="card-title">{{ total_sites }}</h5>
                                            <p class="card-text">Textbooks</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-2">
                                    <div class="card bg-success text-white mb-3">
                                        <div class="card-body">
                                            <h5 class="card-title">{{ total_markdown }}</h5>
                                            <p class="card-text">Markdown Files</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-2">
                                    <div class="card bg-info text-white mb-3">
                                        <div class="card-body">
                                            <h5 class="card-title">{{ total_images }}</h5>
                                            <p class="card-text">Images</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-2">
                                    <div class="card bg-warning text-dark mb-3">
                                        <div class="card-body">
                                            <h5 class="card-title">{{ total_words }}</h5>
                                            <p class="card-text">Total Words</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-2">
                                    <div class="card bg-danger text-white mb-3">
                                        <div class="card-body">
                                            <h5 class="card-title">{{ total_microsims }}</h5>
                                            <p class="card-text">MicroSims</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-2">
                                    <div class="card bg-secondary text-white mb-3">
                                        <div class="card-body">
                                            <h5 class="card-title">{{ total_glossary }}</h5>
                                            <p class="card-text">Glossary Terms</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {% if chart_paths %}
            <div class="row mb-4">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Content Metrics</h5>
                            <div class="row">
                                {% if chart_paths.content_metrics %}
                                <div class="col-md-4">
                                    <img src="{{ chart_paths.content_metrics }}" class="img-fluid" alt="Content Metrics">
                                </div>
                                {% endif %}
                                {% if chart_paths.word_count %}
                                <div class="col-md-4">
                                    <img src="{{ chart_paths.word_count }}" class="img-fluid" alt="Word Count">
                                </div>
                                {% endif %}
                                {% if chart_paths.microsim_ratio %}
                                <div class="col-md-4">
                                    <img src="{{ chart_paths.microsim_ratio }}" class="img-fluid" alt="MicroSim Ratio">
                                </div>
                                {% endif %}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {% endif %}
            
            <div class="row mb-4">
                <div class="col-md-12">
                    <h3>Textbook Collection</h3>
                    <div class="row">
                        {% for site in sites %}
                        <div class="col-md-4 mb-4">
                            <div class="card site-card">
                                <div class="card-body">
                                    <h5 class="card-title">
                                        {% if "minimal" in site.status|lower %}
                                        <span class="status-indicator status-early" title="Early Stage"></span>
                                        {% elif "looking for feedback" in site.status|lower %}
                                        <span class="status-indicator status-developing" title="Developing"></span>
                                        {% else %}
                                        <span class="status-indicator status-mature" title="Mature"></span>
                                        {% endif %}
                                        {{ site.name }}
                                    </h5>
                                    <p class="card-text">{{ site.description }}</p>
                                    <div class="mb-3">
                                        {% if site.get('markdown-file-count') %}
                                        <span class="badge bg-primary metrics-badge">{{ site.get('markdown-file-count') }} MD files</span>
                                        {% endif %}
                                        {% if site.get('image-count') %}
                                        <span class="badge bg-info metrics-badge">{{ site.get('image-count') }} images</span>
                                        {% endif %}
                                        {% if site.get('word-count') %}
                                        <span class="badge bg-warning text-dark metrics-badge">{{ site.get('word-count') }} words</span>
                                        {% endif %}
                                        {% if site.get('microsim-count') %}
                                        <span class="badge bg-danger metrics-badge">{{ site.get('microsim-count') }} MicroSims</span>
                                        {% endif %}
                                        {% if site.get('glossary-term-count') %}
                                        <span class="badge bg-secondary metrics-badge">{{ site.get('glossary-term-count') }} glossary terms</span>
                                        {% endif %}
                                    </div>
                                    <div class="d-flex flex-column">
                                        {% if site.site_url %}
                                        <a href="{{ site.site_url }}" class="btn btn-primary mb-2" target="_blank">View Site</a>
                                        {% endif %}
                                        {% if site.github_repo %}
                                        <a href="{{ site.github_repo }}" class="btn btn-secondary" target="_blank">GitHub Repo</a>
                                        {% endif %}
                                    </div>
                                </div>
                                <div class="card-footer">
                                    <small class="text-muted">Status: {{ site.status }}</small>
                                </div>
                            </div>
                        </div>
                        {% endfor %}
                    </div>
                </div>
            </div>
            
            <footer class="mt-5 mb-3 text-center text-muted">
                <p>Generated on {{ generation_date }}</p>
                <p>Intelligent Textbooks Initiative</p>
            </footer>
        </div>
        
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
    </body>
    </html>
    """
    
    # Render template
    template = Template(template_str)
    html_content = template.render(
        sites=sorted_sites,
        total_sites=total_sites,
        total_markdown=total_markdown,
        total_images=total_images,
        total_words=total_words,
        total_microsims=total_microsims,
        total_glossary=total_glossary,
        chart_paths=chart_paths,
        generation_date=datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    )
    
    # Write HTML file
    with open(os.path.join(output_dir, 'index.html'), 'w') as f:
        f.write(html_content)

def main():
    """Main function to run the dashboard generator."""
    args = parse_arguments()
    
    # Create output directory if it doesn't exist
    os.makedirs(args.output_dir, exist_ok=True)
    
    # Load sites data
    sites = load_sites_data(args.sites_json)
    
    # Generate charts
    chart_paths = generate_metrics_charts(sites, args.output_dir)
    
    # Generate HTML dashboard
    generate_html_dashboard(sites, chart_paths, args.output_dir)
    
    print(f"Dashboard generated in {args.output_dir}")

if __name__ == "__main__":
    main()