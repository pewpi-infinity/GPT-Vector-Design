"""
rogers_logic.py - minimal logic to support 'fetch github owner repo path [ref]'
It uses requests and will use a GitHub token if provided as an argument or via an Authorization header in the HTTP helper.
Replace or merge with your existing bot code as needed.
"""
import requests
import json, re

GH_RAW = "https://raw.githubusercontent.com/{owner}/{repo}/{ref}/{path}"
GH_API  = "https://api.github.com/repos/{owner}/{repo}/contents/{path}"

def fetch_github_file(owner, repo, path, ref=None, token=None):
    refs = [ref] if ref else ['main', 'master']
    headers = {}
    if token:
        headers['Authorization'] = f'token {token}'
    # try raw first with candidate refs
    for r in refs:
        url = GH_RAW.format(owner=owner, repo=repo, ref=r, path=path)
        resp = requests.get(url, headers=headers, timeout=15)
        if resp.status_code == 200:
            return resp.text, url
    # fallback to contents API (raw accept)
    api_url = GH_API.format(owner=owner, repo=repo, path=path)
    params = {'ref': ref} if ref else {}
    resp = requests.get(api_url, headers={**headers, 'Accept':'application/vnd.github.v3.raw'}, params=params, timeout=15)
    if resp.status_code == 200:
        return resp.text, api_url
    # return error message
    return f"GitHub fetch error {resp.status_code}: {resp.text}", api_url if resp.text else api_url

def handle_query(q, provided_token=None):
    q = (q or '').strip()
    m = re.match(r'^fetch\s+github\s+([^\s\/]+)\s+([^\s\/]+)\s+([^\s].*?)(?:\s+([^\s]+))?$', q, re.I)
    if m:
        owner, repo, path, ref = m.group(1), m.group(2), m.group(3), m.group(4) or None
        content, source = fetch_github_file(owner, repo, path, ref, token=provided_token)
        # If fetch failed, return the error string content includes
        return f"Fetched from: {source}\\n\\n{content}"
    # fallback simple response (replace with your bot code)
    return f"Rogers received: {q}. (This minimal rogers_logic supports 'fetch github ...' only.)"