import json
import os

def generate_markdown_report(json_file, output_file):
    """
    Generate a Markdown report from the sites.json file
    
    Args:
        json_file (str): Path to the JSON file
        output_file (str): Path to the output Markdown file
    """
    # Read the JSON file
    with open(json_file, 'r') as f:
        sites_data = json.load(f)
    
    # Start building the Markdown content
    markdown_content = """# Intelligent Textbooks Report

This document provides a comprehensive overview of all intelligent textbook projects.

"""
    
    # Sort sites by name
    sites_data.sort(key=lambda x: x['site']['name'])
    
    # Process each site
    for item in sites_data:
        site = item['site']
        
        # Add site header and links
        markdown_content += f"## {site['name']}\n\n"
        markdown_content += f"* **Site URL:** [{site['site_url']}]({site['site_url']})\n"
        markdown_content += f"* **GitHub Repository:** [{site['github_repo']}]({site['github_repo']})\n\n"
        
        # Add description
        if 'description' in site:
            markdown_content += f"**Description:** {site.get('description', 'No description available')}\n\n"
        
        # Add status if available
        if 'status' in site:
            markdown_content += f"**Status:** {site['status']}\n\n"
        
        # Add statistics if available
        stats = []
        if 'markdown-file-count' in site:
            stats.append(f"Markdown Files: {site['markdown-file-count']}")
        if 'image-count' in site:
            stats.append(f"Images: {site['image-count']}")
        if 'word-count' in site:
            stats.append(f"Word Count: {site['word-count']}")
        if 'microsim-count' in site:
            stats.append(f"MicroSims: {site['microsim-count']}")
        if 'glossary-term-count' in site:
            stats.append(f"Glossary Terms: {site['glossary-term-count']}")
            
        if stats:
            markdown_content += "**Statistics:**\n\n"
            for stat in stats:
                markdown_content += f"* {stat}\n"
            markdown_content += "\n"
        
        # Add separator between sites
        markdown_content += "---\n\n"
    
    # Write the Markdown content to the output file
    with open(output_file, 'w') as f:
        f.write(markdown_content)
    
    print(f"Markdown report generated successfully: {output_file}")

def main():
    # Define file paths
    current_dir = os.path.dirname(os.path.abspath(__file__))
    json_file = os.path.join(current_dir, 'sites.json')
    output_file = os.path.join(current_dir, 'intelligent_textbooks_report.md')
    
    # Generate the report
    generate_markdown_report(json_file, output_file)

if __name__ == "__main__":
    main()