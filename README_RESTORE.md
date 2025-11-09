# Restore + Protection tools for GPT-Vector-Design

What these files do
- scripts/find-working-commit.sh
  - Searches recent commits, runs your build command, and if it finds a commit that produces the expected built artifact (default dist/index.html) it creates a local branch restore/from-<sha>-<ts>.
  - Creates a backup branch first named backup-before-restore-<ts> so your current work is preserved.

- scripts/repo-scan.py
  - Scans HTML and JS files for missing local references (broken src/href/import).
  - Warns if obvious secret files are present (secrets.JSON).

- .github/workflows/auto-scan-and-protect.yml
  - Runs on pull_request (full scan + build) and on push to main (light scan only), plus a schedule and manual run.
  - Guarded to skip runs triggered by GitHub Actions itself to avoid loops.
  - Does NOT auto-commit generated built artifacts to main (non-destructive).

- .gitignore
  - Prevents committing common generated artifacts and sensitive files listed here.

- .pre-commit-config.yaml
  - Local hook to run repo-scan.py before commits for contributors.

Safety notes
- I will not remove files from history or force-push anything in this PR.
- If secrets.JSON is present in the repository, you must remove it manually (or ask a repo admin to remove it). DO NOT keep secrets in repo files — use GitHub Secrets.
- If an existing workflow is auto-committing index.html (or other built files), disable it temporarily (Actions → select workflow → ⋯ → Disable workflow) or merge a PR that edits that workflow to stop committing, before restoring index.html.

Local usage examples
- Run scanner:
  python3 scripts/repo-scan.py --root .

- Find a working build commit (example):
  chmod +x scripts/find-working-commit.sh
  ./scripts/find-working-commit.sh 50 "npm ci && npm run build" "dist/index.html"

If you prefer to apply these changes locally
1. Create branch:
   git checkout -b restore/add-scan-protect-tools-$(date -u +%Y%m%d-%H%M%S)

2. Create files (copy the files from this PR into the repo), then:
   git add scripts/* .github/workflows/auto-scan-and-protect.yml .gitignore .pre-commit-config.yaml README_RESTORE.md
   git commit -m "Add scanner, find-working-commit helper, CI guard workflow, and README for safe restore"
   git push -u origin HEAD

3. Open a Pull Request from that branch and review logs on the Actions tab.

Rollback
- If you merge and want to revert: revert the merge commit on GitHub (create a revert PR) or checkout main and create a revert branch locally.
