import json
import os

def generate_html_report(json_file, output_file):
    """
    Generate an HTML report from the sites.json file
    
    Args:
        json_file (str): Path to the JSON file
        output_file (str): Path to the output HTML file
    """
    # Read the JSON file
    with open(json_file, 'r') as f:
        sites_data = json.load(f)
    
    # Start building the HTML content
    html_content = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Intelligent Textbooks Report</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
            color: #333;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }
        h1 {
            color: #2c3e50;
            border-bottom: 2px solid #3498db;
            padding-bottom: 10px;
        }
        h2 {
            color: #2980b9;
            margin-top: 30px;
        }
        .site-section {
            background-color: #f9f9f9;
            border-radius: 5px;
            padding: 20px;
            margin-bottom: 20px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        .site-links a {
            margin-right: 15px;
            color: #3498db;
            text-decoration: none;
        }
        .site-links a:hover {
            text-decoration: underline;
        }
        .property {
            margin: 10px 0;
        }
        .property span {
            font-weight: bold;
        }
        .stats {
            display: flex;
            flex-wrap: wrap;
            margin-top: 15px;
        }
        .stat-item {
            background-color: #e8f4fc;
            border-radius: 4px;
            padding: 8px 12px;
            margin-right: 10px;
            margin-bottom: 10px;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Intelligent Textbooks Report</h1>
"""
    
    # Sort sites by name
    sites_data.sort(key=lambda x: x['site']['name'])
    
    # Process each site
    for item in sites_data:
        site = item['site']
        
        # Start site section
        html_content += f"""
        <div class="site-section">
            <h2>{site['name']}</h2>
            <div class="site-links">
                <a href="{site['site_url']}" target="_blank">Visit Site</a>
                <a href="{site['github_repo']}" target="_blank">GitHub Repo</a>
            </div>
            <div class="property">
                <span>Description:</span> {site.get('description', 'No description available')}
            </div>
"""
        
        # Add status if available
        if 'status' in site:
            html_content += f"""
            <div class="property">
                <span>Status:</span> {site['status']}
            </div>
"""
        
        # Add statistics if available
        stats = []
        if 'markdown-file-count' in site:
            stats.append(f"<div class='stat-item'>{site['markdown-file-count']} Markdown Files</div>")
        if 'image-count' in site:
            stats.append(f"<div class='stat-item'>{site['image-count']} Images</div>")
        if 'word-count' in site:
            stats.append(f"<div class='stat-item'>{site['word-count']} Words</div>")
        if 'microsim-count' in site:
            stats.append(f"<div class='stat-item'>{site['microsim-count']} MicroSims</div>")
        if 'glossary-term-count' in site:
            stats.append(f"<div class='stat-item'>{site['glossary-term-count']} Glossary Terms</div>")
            
        if stats:
            html_content += """
            <div class="stats">
"""
            for stat in stats:
                html_content += f"                {stat}\n"
            html_content += """
            </div>
"""
        
        # Close site section
        html_content += """
        </div>
"""
    
    # Close HTML
    html_content += """
    </div>
</body>
</html>
"""
    
    # Write the HTML content to the output file
    with open(output_file, 'w') as f:
        f.write(html_content)
    
    print(f"Report generated successfully: {output_file}")

def main():
    # Define file paths
    current_dir = os.path.dirname(os.path.abspath(__file__))
    json_file = os.path.join(current_dir, 'sites.json')
    output_file = os.path.join(current_dir, 'intelligent_textbooks_report.html')
    
    # Generate the report
    generate_html_report(json_file, output_file)

if __name__ == "__main__":
    main()
