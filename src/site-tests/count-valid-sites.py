import json
import requests

def load_sites(file_path):
    with open(file_path, 'r') as file:
        data = json.load(file)
    return data

def check_url(url):
    try:
        response = requests.head(url, allow_redirects=True, timeout=5)
        return response.status_code == 200
    except requests.RequestException:
        return False

def main():
    file_path = 'sites.json'  # Replace with the actual file path if different
    sites_data = load_sites(file_path)

    total_sites = len(sites_data)
    working_sites = 0

    for site_entry in sites_data:
        site_info = site_entry.get("site", {})
        
        github_repo = site_info.get("github_repo", "")
        print('testing', github_repo)
        if github_repo and check_url(github_repo):
            print('OK')
            working_sites += 1
        else:
            print('FAIL')

    print(f"Total number of sites: {total_sites}")
    print(f"Total number of working sites: {working_sites}")

if __name__ == "__main__":
    main()
