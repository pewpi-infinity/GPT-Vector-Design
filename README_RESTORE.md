# Repository Recovery and Protection Tools

This document describes the recovery and protection tooling added to prevent repository damage and auto-commit loops.

## Overview

The repository includes several tools and workflows to help diagnose, recover, and protect against accidental damage:

1. **Repository Scanner** (`scripts/repo-scan.py`) - Detects missing file references and sensitive files
2. **Working Commit Finder** (`scripts/find-working-commit.sh`) - Locates the last successful build
3. **Auto-Scan Workflow** (`.github/workflows/auto-scan-and-protect.yml`) - Automated protection in CI/CD
4. **Pre-commit Hooks** (`.pre-commit-config.yaml`) - Local validation before commits

## Quick Start

### 1. Run Repository Scanner

Check for missing references and sensitive files:

```bash
python3 scripts/repo-scan.py --root .
```

This will:
- Scan HTML/JS files for broken local references
- Detect sensitive files like `secrets.JSON` that shouldn't be committed
- Exit with error code if issues are found (useful for CI)

### 2. Find a Working Commit

If the current build is broken, find the last working commit:

```bash
./scripts/find-working-commit.sh 50 "npm ci && npm run build" "dist/index.html"
```

Parameters:
- `50` - Number of commits to search (default: 50)
- `"npm ci && npm run build"` - Build command to test
- `"dist/index.html"` - File to check for existence after build

**Safety features:**
- Creates a backup branch before starting
- Non-destructive - only creates new branches
- Automatically returns to original branch on exit
- Creates a `restore/from-<sha>-<timestamp>` branch if found

### 3. Set Up Local Pre-commit Hooks

Install pre-commit hooks to catch issues before committing:

```bash
pip install pre-commit
pre-commit install
```

This will automatically run the repository scanner before each commit.

## GitHub Actions Workflow

The `auto-scan-and-protect.yml` workflow provides automated protection:

### On Pull Requests
- Checks out full repository history
- Runs repository scanner
- Sets up Node.js and Python
- Installs dependencies with `npm ci`
- Runs `npm run build` (if package.json exists)
- **Does NOT auto-commit** - only validates changes

### On Push to Main
- Runs **lightweight scan only** (no build)
- Checks for forbidden files (secrets.JSON)
- **Does NOT auto-commit** - prevents build loops
- Fast execution - only scans, doesn't build

### Scheduled (Every 6 Hours)
- Runs repository scanner
- Checks for sensitive files
- Reports issues without making changes

### Manual Dispatch
- Full scan with optional build
- Useful for on-demand checks
- No auto-commits

### Loop Prevention
The workflow includes a guard that exits early if triggered by `github-actions` or `github-actions[bot]` to prevent infinite loops.

## Recovery Process

If you need to restore from a working commit:

### Step 1: Find the Working Commit

```bash
chmod +x scripts/find-working-commit.sh
./scripts/find-working-commit.sh 50 "npm ci && npm run build" "dist/index.html"
```

### Step 2: Review the Restore Branch

If a working commit is found, the script creates a branch like `restore/from-abc123-20231109-143000`:

```bash
git checkout restore/from-abc123-20231109-143000
# Review the changes
git log
git diff main
```

### Step 3: Push and Create PR

```bash
git push -u origin restore/from-abc123-20231109-143000
```

Then create a PR from this branch to `main` on GitHub.

### Step 4: Rollback if Needed

If the restore causes issues, you can return to the backup:

```bash
git checkout backup-before-restore-20231109-143000
```

## Disabling Offending Workflows

If a workflow is auto-committing and causing loops:

1. **Identify the workflow** in `.github/workflows/`
2. **Disable it temporarily** on GitHub:
   - Go to Actions → Select the workflow → Click "..." → Disable workflow
3. **Add guards** to the workflow to prevent auto-commits:
   ```yaml
   - name: Guard against bot loops
     run: |
       if [[ "${{ github.actor }}" == "github-actions"* ]]; then
         echo "Triggered by bot - exiting"
         exit 0
       fi
   ```
4. **Remove auto-commit steps** or move them to separate workflows that only run on PRs

## File Protection

### .gitignore

The repository now includes a `.gitignore` file that prevents committing:
- `secrets.JSON` and other sensitive files
- `node_modules/` dependencies
- `dist/` and `build/` directories
- `.venv/` Python virtual environments
- Log files and temporary files

### Removing Sensitive Files

If `secrets.JSON` was already committed:

```bash
# Remove from git but keep locally
git rm --cached secrets.JSON

# Commit the removal
git commit -m "Remove secrets.JSON from version control"

# Push the change
git push
```

## Recommended Setup

### Node.js
- Version: 18.x LTS (e.g., 18.20)
- Install: https://nodejs.org/

### Python
- Version: 3.10+ (3.11 recommended)
- Install: https://www.python.org/

### Pre-commit
```bash
pip install pre-commit
pre-commit install
```

## Troubleshooting

### Scanner reports missing files
- Check if files exist and are committed
- For built files (`dist/`), run the build: `npm run build`
- Use `find-working-commit.sh` to locate a commit where files exist

### Build fails in CI
- Run locally: `npm ci && npm run build`
- Check Node.js version matches CI (18.x)
- Review recent commits for breaking changes

### Workflow loop detected
- Check if a workflow is auto-committing
- Disable the workflow on GitHub
- Add loop prevention guards
- Remove auto-commit steps

### Pre-commit hooks fail
- Review the error message from the scanner
- Fix reported issues
- Run `pre-commit run --all-files` to test

## Safety Principles

1. **Non-destructive** - Tools create backups and new branches, never force-push
2. **No auto-commits** - Workflows validate but don't modify the repository
3. **Loop prevention** - Guards prevent infinite workflow loops
4. **Manual review** - All changes go through pull requests
5. **Local testing** - Run tools locally before committing

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review workflow logs in GitHub Actions
3. Run tools locally with verbose output
4. Create an issue with details about the problem
