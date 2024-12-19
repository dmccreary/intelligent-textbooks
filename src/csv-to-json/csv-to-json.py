import csv
import json

def csv_to_visjs_json(csv_filename, json_filename):
    nodes = []
    edges = []
    categories = {}

    # Read the CSV file
    with open(csv_filename, 'r', newline='', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        
        for row in reader:
            # Extract node information
            try:
                concept_id = int(row['ConceptID'])
            except ValueError:
                print(f"Invalid ID '{row['ID']}' skipped.")
                continue  # Skip rows with invalid ID

            concept_name = row['ConceptLabel'].strip()
            if not concept_name:
                print(f"Empty Concept Name for ID {concept_id} skipped.")
                continue  # Skip nodes without a name

            try:
                category_id = int(row['TaxonomyID'])
            except ValueError:
                print(f"Invalid Category ID '{row['Category ID']}' for ID {concept_id} skipped.")
                continue  # Skip rows with invalid Category ID

            # Create node object
            node = {
                'id': concept_id,
                'label': concept_name,
                'group': category_id
            }
            nodes.append(node)

            # Process Dependencies to create edges
            dependency_list = row['Dependencies']
            if dependency_list:
                dependencies = dependency_list.split('|')
                for dep in dependencies:
                    dep = dep.strip()
                    if dep:
                        try:
                            dep_id = int(dep)
                            edge = {
                                'from': concept_id,
                                'to': dep_id
                            }
                            edges.append(edge)
                        except ValueError:
                            print(f"Invalid DependencyID '{dep}' for ID {concept_id} skipped.")
                            continue  # Skip invalid DependencyIDs

    # If not using separate groups, omit the 'groups' key
    data = {
        'nodes': nodes,
        'edges': edges
    }

    # Write the JSON output
    with open(json_filename, 'w', encoding='utf-8') as jsonfile:
        json.dump(data, jsonfile, indent=4)

    print(f"Successfully converted '{csv_filename}' to '{json_filename}'.")

if __name__ == "__main__":
    # Define input and output file names
    input_csv = 'intelligent-textbooks.csv'
    output_json = 'intelligent-textbooks.json'
    
    # Convert CSV to JSON
    csv_to_visjs_json(input_csv, output_json)
