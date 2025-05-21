# Generate a table of contents for MkDocs from the nav section of the mkdocs.yml
# Output is a markdown file with links to each section
import yaml
import os

def process_nav_items(nav_items, base_url, level=0):
    """Recursively process navigation items and generate markdown links."""
    lines = []
    indent = "  " * level
    
    for item in nav_items:
        if isinstance(item, dict):
            for title, content in item.items():
                if isinstance(content, str):
                    # Direct link like "Home: index.md"
                    # Remove .md extension for proper URL formatting
                    link = content.replace('.md', '')
                    url = f"{base_url}{link}/"
                    
                    lines.append(f"{indent}- [{title}]({url})\n")
                elif isinstance(content, list):
                    # Section with subitems
                    lines.append(f"{indent}- **{title}**\n")
                    lines.extend(process_nav_items(content, base_url, level + 1))
    
    return lines

def generate_toc(yaml_file, output_file):
    """Generate a table of contents markdown file from mkdocs.yml."""
    # Read the YAML file
    with open(yaml_file, 'r') as file:
        data = yaml.safe_load(file)
    
    # Extract navigation structure and site URL
    nav = data.get('nav', [])
    site_url = data.get('site_url', '')
    
    # Ensure site_url ends with a slash
    if site_url and not site_url.endswith('/'):
        site_url += '/'
    
    # Generate TOC content
    toc_lines = ["# Table of Contents\n\n"]
    toc_lines.extend(process_nav_items(nav, site_url))
    
    # Ensure the output directory exists
    os.makedirs(os.path.dirname(output_file), exist_ok=True)
    
    # Write the TOC file
    with open(output_file, 'w') as file:
        file.writelines(toc_lines)
    
    print(f"Table of contents generated successfully: {output_file}")

if __name__ == "__main__":
    # Input and output files
    yaml_file = "mkdocs.yml"
    output_file = "docs/table-of-contents.md"
    
    # Generate the table of contents
    generate_toc(yaml_file, output_file)