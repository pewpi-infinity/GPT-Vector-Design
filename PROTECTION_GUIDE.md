# Recovery and Protection Tools Guide

This repository includes comprehensive non-destructive recovery and protection tooling to help safely diagnose, recover, and protect against issues.

## 🛡️ Protection Tools

### 1. Pre-flight Protection (`protect.sh`)

Runs safety checks before any risky operation:

```bash
./scripts/protect.sh operation-name
```

**What it checks:**
- ✓ Valid git repository
- ✓ Uncommitted changes warning
- ✓ Untracked files detection
- ✓ Remote connectivity
- ✓ Automatic safety backup branch creation
- ✓ Disk space verification

**Safety features:**
- Creates automatic backup branches
- Warns about uncommitted work
- Prompts for confirmation on risky operations

### 2. Repository Validation (`validate.sh`)

Validates repository integrity and checks for common issues:

```bash
# Check for issues
./scripts/validate.sh

# Check and auto-fix issues
./scripts/validate.sh --fix
```

**What it validates:**
- ✓ Git repository integrity (fsck)
- ✓ Missing file references in HTML/JS
- ✓ Script permissions
- ✓ Documentation presence
- ✓ CI/CD workflow validity
- ✓ Large file detection
- ✓ Critical tool files existence

### 3. Backup and Restore (`backup-restore.sh`)

Create and manage backups of critical repository files:

```bash
# Create a backup
./scripts/backup-restore.sh backup my-backup-name

# List all backups
./scripts/backup-restore.sh list

# Restore from a backup
./scripts/backup-restore.sh restore my-backup-name
```

**Features:**
- Backs up all critical files (HTML, JS, Python, JSON, configs)
- Preserves directory structure
- Stores metadata (timestamp, branch, commit)
- Safe restore with confirmation prompt
- Backups stored in `.git/repo-backups` (not committed)

## 🔧 Recovery Tools

### 4. Find Working Commit (`find-working-commit.sh`)

Automatically finds the most recent commit where the build succeeds:

```bash
./scripts/find-working-commit.sh [max_commits] [build_cmd] [check_path]

# Examples:
./scripts/find-working-commit.sh 50 "npm ci && npm run build" "dist/index.html"
./scripts/find-working-commit.sh 30 "python3 -m pytest" "test_results.xml"
```

**Features:**
- Runs pre-flight protection checks automatically
- Creates backup branches before starting
- Tests historical commits
- Creates restore branch when found
- Safe rollback on exit

### 5. Repository Scanner (`repo-scan.py`)

Scans for missing file references in HTML and JavaScript files:

```bash
python3 scripts/repo-scan.py --root .
```

**What it detects:**
- Missing `src=` and `href=` references in HTML
- Missing `import` and `require()` in JavaScript
- Broken local file paths
- Reports expected file locations

## 📋 Typical Workflows

### Workflow 1: Before Making Risky Changes

```bash
# 1. Validate current state
./scripts/validate.sh

# 2. Create a backup
./scripts/backup-restore.sh backup before-my-changes

# 3. Make your changes
# ... edit files ...

# 4. Validate after changes
./scripts/validate.sh

# 5. If something went wrong, restore
./scripts/backup-restore.sh restore before-my-changes
```

### Workflow 2: Finding a Working Commit

```bash
# 1. Run protection checks
./scripts/protect.sh recovery-attempt

# 2. Find working commit
./scripts/find-working-commit.sh 50 "npm ci && npm run build" "dist/index.html"

# 3. If found, review the restore branch
git checkout restore/from-<sha>-<timestamp>

# 4. Push to create PR
git push -u origin restore/from-<sha>-<timestamp>
```

### Workflow 3: Regular Health Checks

```bash
# Run validation
./scripts/validate.sh

# Scan for missing references
python3 scripts/repo-scan.py --root .

# Check CI workflow
cat .github/workflows/repair-ci.yml
```

## 🚨 Emergency Recovery

If the repository is in a bad state:

1. **Check current state:**
   ```bash
   git status
   ./scripts/validate.sh
   ```

2. **Create emergency backup:**
   ```bash
   ./scripts/backup-restore.sh backup emergency-$(date +%Y%m%d-%H%M%S)
   ```

3. **Find last working commit:**
   ```bash
   ./scripts/find-working-commit.sh 100 "npm ci && npm run build" "dist/index.html"
   ```

4. **Restore from backup branch:**
   ```bash
   git checkout backup-before-restore-<timestamp>
   ```

## 🔐 Safety Features

All tools include:
- **Non-destructive operations**: Original state preserved
- **Automatic backups**: Safety branches created automatically
- **Confirmation prompts**: User confirmation for destructive actions
- **Detailed logging**: Clear output of what's happening
- **Rollback support**: Easy return to previous state
- **Pre-flight checks**: Validation before risky operations

## 📁 Backup Storage

Backups are stored in `.git/repo-backups/` which:
- Is automatically excluded from git (in `.git/` directory)
- Preserves full directory structure
- Includes metadata about each backup
- Can be easily deleted if space is needed

## 🔄 CI/CD Integration

The repository includes a CI workflow (`.github/workflows/repair-ci.yml`) that:
- Runs on all PRs
- Scans for missing references
- Validates repository structure
- Fails fast on detected issues

## 💡 Tips

1. **Always run validation first**: `./scripts/validate.sh`
2. **Create backups before major changes**: `./scripts/backup-restore.sh backup`
3. **Use protection checks**: Let `protect.sh` run automatically
4. **Keep old backups**: They don't hurt and might save you later
5. **Test in branches**: Never test recovery on main branch

## 🆘 Getting Help

If tools aren't working:

1. Check script permissions:
   ```bash
   ./scripts/validate.sh --fix
   ```

2. Verify Python 3 is available:
   ```bash
   python3 --version
   ```

3. Check git configuration:
   ```bash
   git config --list
   ```

## 📚 Additional Documentation

- Original restore guide: See `README_RESTORE.md`
- Main README: See `README.md`
- CI configuration: See `.github/workflows/repair-ci.yml`
