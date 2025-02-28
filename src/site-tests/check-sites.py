import json
import requests
import os
import re

def infer_github_user_repo(url: str):
    """
    Attempt to parse out the user and repo from a GitHub or GitHub Pages URL.
    Returns (user, repo) or (None, None) if it fails.
    """
    # Example: "https://github.com/dmccreary/mkdocs-for-intelligent-textbooks"
    GITHUB_PREFIX = "https://github.com/"
    if url.startswith(GITHUB_PREFIX):
        # Remove the prefix: "dmccreary/mkdocs-for-intelligent-textbooks"
        path = url[len(GITHUB_PREFIX):]
        # Split by '/' to get user, repo
        parts = path.strip("/").split("/")
        if len(parts) >= 2:
            return parts[0], parts[1]
        else:
            return None, None
    
    # If it's a GitHub Pages URL, try a naive conversion:
    # e.g. "https://dmccreary.github.io/microsims/" -> "dmccreary" as user, "microsims" as repo
    GITHUB_IO = ".github.io/"
    if GITHUB_IO in url:
        # e.g. "https://dmccreary.github.io/microsims/"
        # user = "dmccreary", repo = "microsims"
        # remove the leading https://
        remainder = url.replace("https://", "")
        # remainder = "dmccreary.github.io/microsims/"
        parts = remainder.split("/")
        if len(parts) >= 2 and parts[0].endswith(GITHUB_IO):
            user = parts[0].replace(GITHUB_IO, "")  # e.g. "dmccreary"
            repo = parts[1]  # e.g. "microsims"
            repo = repo.strip("/")
            return user, repo
        else:
            return None, None
    
    return None, None

def file_exists_in_github(user: str, repo: str, filepath: str, branch: str = "main"):
    """
    Checks if a file exists in a GitHub repo by using the raw.githubusercontent URL.
    Returns the file content if it exists (status_code == 200), otherwise None.
    """
    raw_url = f"https://raw.githubusercontent.com/{user}/{repo}/{branch}/{filepath}"
    try:
        response = requests.get(raw_url)
        if response.status_code == 200:
            return response.text
        else:
            return None
    except Exception as e:
        return None

def check_license(user: str, repo: str):
    """
    Check if docs/license.md file (case-insensitive) exists in the GitHub repo.
    We try 'license.md' and 'License.md' as a simple approach.
    """
    possible_names = ["license.md", "License.md"]
    for name in possible_names:
        content = file_exists_in_github(user, repo, f"docs/{name}")
        if content is not None:
            return "PASS"
    return "FAIL"

def check_glossary(user: str, repo: str):
    """
    Check if docs/glossary.md file (case-insensitive) exists in the GitHub repo.
    """
    possible_names = ["glossary.md", "Glossary.md"]
    for name in possible_names:
        content = file_exists_in_github(user, repo, f"docs/{name}")
        if content is not None:
            return "PASS"
    return "FAIL"

def check_admonitions(user: str, repo: str):
    """
    Check if mkdocs.yml (in the root) mentions 'admonitions'.
    """
    content = file_exists_in_github(user, repo, "mkdocs.yml")
    if content and "admonitions" in content:
        return "PASS"
    return "FAIL"

def check_resize_logo(user: str, repo: str):
    """
    Check if docs/css/extras.css exists and (optionally) contains code referencing the logo size.
    """
    content = file_exists_in_github(user, repo, "docs/css/extras.css")
    if content is not None:
        # Simple check: look for something like "logo" or "img"
        # Modify to match your exact desired CSS check
        if "logo" in content or "img" in content:
            return "PASS"
    return "FAIL"

def check_admonition_prompt(user: str, repo: str):
    """
    Check if docs/js/extras.js exists and contains 'admonition.prompt'.
    """
    content = file_exists_in_github(user, repo, "docs/js/extras.js")
    if content is not None and "admonition.prompt" in content:
        return "PASS"
    return "FAIL"

def main():
    with open("sites.json", "r") as f:
        sites_data = json.load(f)
    
    # Iterate over each site object in sites.json
    for s in sites_data:
        site_info = s["site"]
        name = site_info["name"]
        repo_url = site_info["github_repo"]
        
        print(f"\n--- Checking site: {name} ---")
        
        # Try to parse out user and repo from the URL
        user, repo = infer_github_user_repo(repo_url)
        
        if user is None or repo is None:
            print("  Unable to determine GitHub user/repo from URL:", repo_url)
            continue
        
        # Perform checks
        license_result = check_license(user, repo)
        glossary_result = check_glossary(user, repo)
        admonitions_result = check_admonitions(user, repo)
        resize_logo_result = check_resize_logo(user, repo)
        prompt_result = check_admonition_prompt(user, repo)
        
        print(f"  License: {license_result}")
        print(f"  Glossary: {glossary_result}")
        print(f"  Admonitions: {admonitions_result}")
        print(f"  Resize Logo: {resize_logo_result}")
        print(f"  Admonition Prompt: {prompt_result}")

if __name__ == "__main__":
    main()
