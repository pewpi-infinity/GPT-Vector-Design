#!/usr/bin/env python3
"""
repo-scan.py
Scans HTML/JS files for referenced local files that do not exist and warns about sensitive files.
Usage: python3 scripts/repo-scan.py --root .
"""
import re
import argparse
from pathlib import Path

HTML_REF_RE = re.compile(r'(?:src|href)=["\']([^"\']+)["\']', re.IGNORECASE)
JS_IMPORT_RE = re.compile(r'import\s+(?:[^"\']+\s+from\s+)?[\'"]([^\'"]+)[\'"]|require\([\'"]([^\'"]+)[\'"]\)', re.IGNORECASE)

def is_local(ref: str):
    return not (ref.startswith('http://') or ref.startswith('https://') or ref.startswith('//') or ref.startswith('data:') or ref.startswith('#'))

def norm(path):
    return path.split('?',1)[0].split('#',1)[0]

def scan_html(path: Path):
    missing = []
    text = path.read_text(encoding='utf-8', errors='ignore')
    for m in HTML_REF_RE.findall(text):
        r = norm(m)
        if is_local(r) and not Path(r).is_absolute():
            candidate = (path.parent / r).resolve()
            if not candidate.exists():
                missing.append((m, str(candidate)))
    return missing

def scan_js(path: Path):
    missing = []
    text = path.read_text(encoding='utf-8', errors='ignore')
    for m in JS_IMPORT_RE.findall(text):
        ref = m[0] or m[1]
        if not ref:
            continue
        if is_local(ref) and not Path(ref).is_absolute() and not ref.startswith('node:'):
            candidate = (path.parent / ref).resolve()
            if not (candidate.exists() or (candidate.with_suffix('.js').exists()) or (candidate / 'index.js').exists()):
                missing.append((ref, str(candidate)))
    return missing

def main():
    p = argparse.ArgumentParser()
    p.add_argument('--root', default='.', help='Repo root to scan')
    args = p.parse_args()
    root = Path(args.root).resolve()

    print(f"Scanning repository at {root}")
    html_missing = {}
    js_missing = {}

    for filepath in root.rglob('*'):
        if filepath.is_file():
            if filepath.suffix.lower() == '.html':
                m = scan_html(filepath)
                if m:
                    html_missing[str(filepath)] = m
            elif filepath.suffix.lower() == '.js':
                m = scan_js(filepath)
                if m:
                    js_missing[str(filepath)] = m

    # Check for obvious secret files
    for secret_name in ("secrets.JSON", "secrets.json", "secrets.yml"):
        if (root / secret_name).exists():
            print(f"ERROR: Found potential secret file in repo root: {secret_name}")
            print("Please remove secrets from the repo and add them to GitHub Secrets.")

    if not html_missing and not js_missing:
        print("No missing local references found in HTML/JS scan.")
        return

    if html_missing:
        print("\nMissing references found in HTML files:")
        for f, items in html_missing.items():
            print(f"- {f}")
            for ref, cand in items:
                print(f"    -> {ref}  (expected file: {cand})")

    if js_missing:
        print("\nMissing imports/requires found in JS files:")
        for f, items in js_missing.items():
            print(f"- {f}")
            for ref, cand in items:
                print(f"    -> {ref}  (expected file: {cand})")

    print("\nTips:")
    print("- If a reference is to './some/path', verify the file was added and committed.")
    print("- If references are to built output (dist/), make sure you rebuild from the correct source commit.")
    print("- Use the find-working-commit.sh script to find the most-recent commit that builds cleanly.")

if __name__ == '__main__':
    main()
