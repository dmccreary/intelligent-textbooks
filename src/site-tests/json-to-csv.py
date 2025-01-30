#!/usr/bin/env python3

import json
import csv
import argparse
from typing import List, Dict

def read_json_file(filename: str) -> List[Dict]:
    """Read and parse the JSON file."""
    with open(filename, 'r', encoding='utf-8') as f:
        data = json.load(f)
    return data

def extract_site_data(sites: List[Dict]) -> List[Dict]:
    """Extract relevant data from each site entry."""
    processed_sites = []
    for entry in sites:
        site = entry['site']
        site_data = {
            'name': site.get('name', ''),
            'github_repo': site.get('github_repo', ''),
            'site_url': site.get('site_url', ''),
            'description': site.get('description', ''),
            'status': site.get('status', ''),
            'markdown_file_count': site.get('markdown-file-count', 0),
            'image_count': site.get('image-count', 0),
            'word_count': site.get('word-count', 0),
            'microsim_count': site.get('microsim-count', 0),
            'glossary_term_count': site.get('glossary-term-count', 0)
        }
        processed_sites.append(site_data)
    return processed_sites

def write_csv_file(sites: List[Dict], output_filename: str):
    """Write the processed data to a CSV file."""
    fieldnames = [
        'name',
        'github_repo',
        'site_url',
        'description',
        'status',
        'markdown_file_count',
        'image_count',
        'word_count',
        'microsim_count',
        'glossary_term_count'
    ]
    
    with open(output_filename, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(sites)

def main():
    parser = argparse.ArgumentParser(description='Convert sites.json to CSV format')
    parser.add_argument('input_file', help='Input JSON file path')
    parser.add_argument('output_file', help='Output CSV file path')
    args = parser.parse_args()

    try:
        # Read and process the JSON data
        sites = read_json_file(args.input_file)
        processed_sites = extract_site_data(sites)
        
        # Write to CSV
        write_csv_file(processed_sites, args.output_file)
        print(f"Successfully converted {args.input_file} to {args.output_file}")
        print(f"Processed {len(processed_sites)} sites")
        
    except FileNotFoundError:
        print(f"Error: Could not find input file {args.input_file}")
    except json.JSONDecodeError:
        print(f"Error: Invalid JSON format in {args.input_file}")
    except Exception as e:
        print(f"Error: An unexpected error occurred: {str(e)}")

if __name__ == "__main__":
    main()