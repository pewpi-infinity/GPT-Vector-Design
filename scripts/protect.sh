#!/usr/bin/env bash
# protect.sh
# Pre-flight safety checks and protection before any recovery operation
# Usage: ./scripts/protect.sh [operation_name]
set -euo pipefail

OPERATION=${1:-"unknown"}
TIMESTAMP=$(date -u +"%Y%m%d-%H%M%S")

echo "=== Repository Protection Pre-flight Checks ==="
echo "Operation: ${OPERATION}"
echo "Timestamp: ${TIMESTAMP}"
echo ""

# Check 1: Verify we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo "❌ ERROR: Not in a git repository"
    exit 1
fi
echo "✓ In a valid git repository"

# Check 2: Check for uncommitted changes
if ! git diff-index --quiet HEAD -- 2>/dev/null; then
    echo "⚠️  WARNING: You have uncommitted changes!"
    echo "   Uncommitted files:"
    git status --short
    echo ""
    echo "   Recommendation: Commit or stash your changes before proceeding"
    read -p "   Continue anyway? (yes/no): " -r
    if [[ ! $REPLY =~ ^[Yy][Ee][Ss]$ ]]; then
        echo "   Operation cancelled by user"
        exit 1
    fi
else
    echo "✓ No uncommitted changes"
fi

# Check 3: Check for untracked files that might be important
UNTRACKED=$(git ls-files --others --exclude-standard)
if [ -n "$UNTRACKED" ]; then
    echo "⚠️  WARNING: You have untracked files:"
    echo "$UNTRACKED" | head -5
    if [ $(echo "$UNTRACKED" | wc -l) -gt 5 ]; then
        echo "   ... and $(($(echo "$UNTRACKED" | wc -l) - 5)) more"
    fi
    echo ""
fi

# Check 4: Verify remote connectivity
if git remote get-url origin > /dev/null 2>&1; then
    REMOTE=$(git remote get-url origin)
    echo "✓ Remote repository configured: $REMOTE"
else
    echo "⚠️  WARNING: No remote repository configured"
fi

# Check 5: Create a safety backup branch
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
BACKUP_BRANCH="safety-backup-${OPERATION}-${TIMESTAMP}"
echo ""
echo "Creating safety backup branch: ${BACKUP_BRANCH}"
if git branch "${BACKUP_BRANCH}" 2>/dev/null; then
    echo "✓ Safety backup branch created: ${BACKUP_BRANCH}"
    echo "  To restore from backup: git checkout ${BACKUP_BRANCH}"
else
    echo "⚠️  WARNING: Could not create backup branch"
fi

# Check 6: Verify disk space
AVAILABLE_KB=$(df . | tail -1 | awk '{print $4}')
if [ "$AVAILABLE_KB" -lt 102400 ]; then # Less than 100MB
    echo "⚠️  WARNING: Low disk space: ${AVAILABLE_KB}KB available"
else
    echo "✓ Sufficient disk space available"
fi

echo ""
echo "=== Pre-flight Checks Complete ==="
echo "Safety backup: ${BACKUP_BRANCH}"
echo "Current branch: ${CURRENT_BRANCH}"
echo "Ready to proceed with: ${OPERATION}"
echo ""
