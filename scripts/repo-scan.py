#!/usr/bin/env python3
"""
Simple repository scanner for CI/CD pipeline validation.
Checks basic repository structure and reports findings.
"""

import os
import sys
import json
import argparse
from pathlib import Path


def scan_repository(root_path):
    """
    Scan repository structure and return basic statistics.
    
    Args:
        root_path: Root directory of the repository to scan
        
    Returns:
        dict: Scan results with file counts and structure info
    """
    results = {
        "status": "success",
        "root": str(root_path),
        "files": {
            "total": 0,
            "javascript": 0,
            "python": 0,
            "html": 0,
            "css": 0,
            "markdown": 0,
            "json": 0
        },
        "directories": [],
        "warnings": []
    }
    
    # File extension mappings
    ext_map = {
        ".js": "javascript",
        ".py": "python",
        ".html": "html",
        ".css": "css",
        ".md": "markdown",
        ".json": "json"
    }
    
    # Scan directory structure
    try:
        for root, dirs, files in os.walk(root_path):
            # Skip hidden directories and common exclusions
            dirs[:] = [d for d in dirs if not d.startswith('.') and d not in ['node_modules', '__pycache__', 'dist', 'build']]
            
            # Track directories
            rel_dir = os.path.relpath(root, root_path)
            if rel_dir != '.':
                results["directories"].append(rel_dir)
            
            # Count files by type
            for file in files:
                if not file.startswith('.'):
                    results["files"]["total"] += 1
                    ext = os.path.splitext(file)[1].lower()
                    if ext in ext_map:
                        results["files"][ext_map[ext]] += 1
        
        # Check for common required files
        required_checks = {
            "README.md": os.path.exists(os.path.join(root_path, "README.md")),
            ".gitignore": os.path.exists(os.path.join(root_path, ".gitignore"))
        }
        
        for filename, exists in required_checks.items():
            if not exists:
                results["warnings"].append(f"Missing recommended file: {filename}")
        
        # Output results
        print("=" * 60)
        print("Repository Scan Results")
        print("=" * 60)
        print(f"Root: {results['root']}")
        print(f"Total files: {results['files']['total']}")
        print(f"JavaScript files: {results['files']['javascript']}")
        print(f"Python files: {results['files']['python']}")
        print(f"HTML files: {results['files']['html']}")
        print(f"CSS files: {results['files']['css']}")
        print(f"Markdown files: {results['files']['markdown']}")
        print(f"JSON files: {results['files']['json']}")
        print(f"Directories scanned: {len(results['directories'])}")
        
        if results["warnings"]:
            print("\nWarnings:")
            for warning in results["warnings"]:
                print(f"  - {warning}")
        
        print("\n✓ Repository scan completed successfully")
        print("=" * 60)
        
        return results
        
    except Exception as e:
        print(f"Error during repository scan: {e}", file=sys.stderr)
        results["status"] = "error"
        results["error"] = str(e)
        return results


def main():
    """Main entry point for the repository scanner."""
    parser = argparse.ArgumentParser(
        description="Scan repository structure and report findings"
    )
    parser.add_argument(
        "--root",
        type=str,
        default=".",
        help="Root directory to scan (default: current directory)"
    )
    parser.add_argument(
        "--output",
        type=str,
        help="Optional JSON output file path"
    )
    
    args = parser.parse_args()
    
    # Resolve root path
    root_path = Path(args.root).resolve()
    
    if not root_path.exists():
        print(f"Error: Root path does not exist: {root_path}", file=sys.stderr)
        sys.exit(1)
    
    if not root_path.is_dir():
        print(f"Error: Root path is not a directory: {root_path}", file=sys.stderr)
        sys.exit(1)
    
    # Run scan
    results = scan_repository(root_path)
    
    # Save to file if requested
    if args.output:
        try:
            with open(args.output, 'w') as f:
                json.dump(results, f, indent=2)
            print(f"\nResults saved to: {args.output}")
        except Exception as e:
            print(f"Warning: Could not save results to file: {e}", file=sys.stderr)
    
    # Exit with appropriate code
    sys.exit(0 if results["status"] == "success" else 1)


if __name__ == "__main__":
    main()
