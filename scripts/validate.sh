#!/usr/bin/env bash
# validate.sh
# Validates repository integrity and checks for common issues
# Usage: ./scripts/validate.sh [--fix]
set -euo pipefail

FIX_MODE=false
if [ "${1:-}" == "--fix" ]; then
    FIX_MODE=true
    echo "Running in FIX mode - will attempt to repair issues"
fi

EXIT_CODE=0

echo "=== Repository Validation ==="
echo ""

# Check 1: Validate Git Repository
echo "1. Checking Git repository integrity..."
if git fsck --no-progress > /tmp/git-fsck.log 2>&1; then
    echo "   ✓ Git repository is healthy"
else
    echo "   ❌ Git repository has issues (see /tmp/git-fsck.log)"
    EXIT_CODE=1
fi

# Check 2: Check for missing references in HTML/JS files
echo ""
echo "2. Scanning for missing file references..."
if python3 scripts/repo-scan.py --root . > /tmp/repo-scan.log 2>&1; then
    if grep -q "No missing local references found" /tmp/repo-scan.log; then
        echo "   ✓ No missing references found"
    else
        echo "   ⚠️  Found missing references:"
        cat /tmp/repo-scan.log
        EXIT_CODE=1
    fi
else
    echo "   ❌ Failed to run repo scanner"
    cat /tmp/repo-scan.log
    EXIT_CODE=1
fi

# Check 3: Check for executable permissions on scripts
echo ""
echo "3. Checking script permissions..."
SCRIPT_ISSUES=0
for script in scripts/*.sh; do
    if [ -f "$script" ]; then
        if [ -x "$script" ]; then
            echo "   ✓ $script is executable"
        else
            echo "   ⚠️  $script is not executable"
            if [ "$FIX_MODE" = true ]; then
                chmod +x "$script"
                echo "      Fixed: Made $script executable"
            fi
            SCRIPT_ISSUES=$((SCRIPT_ISSUES + 1))
        fi
    fi
done

if [ $SCRIPT_ISSUES -eq 0 ]; then
    echo "   ✓ All scripts have correct permissions"
elif [ "$FIX_MODE" = false ]; then
    EXIT_CODE=1
fi

# Check 4: Validate that README_RESTORE.md exists and is readable
echo ""
echo "4. Checking documentation..."
if [ -f "README_RESTORE.md" ]; then
    echo "   ✓ Recovery documentation found: README_RESTORE.md"
elif ls README_RESTORE.md* >/dev/null 2>&1; then
    README_FILE=$(ls README_RESTORE.md* | head -1)
    echo "   ✓ Recovery documentation found: $README_FILE"
else
    echo "   ❌ README_RESTORE.md not found"
    EXIT_CODE=1
fi

# Check 5: Validate workflow files
echo ""
echo "5. Checking CI/CD workflows..."
if [ -f ".github/workflows/repair-ci.yml" ]; then
    echo "   ✓ Repair CI workflow exists"
    # Basic YAML syntax check
    if python3 -c "import yaml; yaml.safe_load(open('.github/workflows/repair-ci.yml'))" 2>/dev/null; then
        echo "   ✓ Workflow YAML is valid"
    else
        echo "   ⚠️  Workflow YAML may have syntax issues"
        EXIT_CODE=1
    fi
else
    echo "   ⚠️  Repair CI workflow not found"
fi

# Check 6: Check for large files that might cause issues
echo ""
echo "6. Checking for large files..."
LARGE_FILES=$(find . -type f -size +10M ! -path "./.git/*" 2>/dev/null || true)
if [ -z "$LARGE_FILES" ]; then
    echo "   ✓ No large files detected"
else
    echo "   ⚠️  Large files found (>10MB):"
    echo "$LARGE_FILES" | while read -r file; do
        SIZE=$(du -h "$file" | cut -f1)
        echo "      $file ($SIZE)"
    done
fi

# Check 7: Verify critical scripts exist
echo ""
echo "7. Verifying recovery tool files..."
REQUIRED_FILES=(
    "scripts/find-working-commit.sh"
    "scripts/repo-scan.py"
    "scripts/protect.sh"
)

for file in "${REQUIRED_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "   ✓ $file exists"
    else
        echo "   ❌ $file is missing"
        EXIT_CODE=1
    fi
done

echo ""
echo "=== Validation Complete ==="
if [ $EXIT_CODE -eq 0 ]; then
    echo "✓ Repository validation passed"
else
    echo "❌ Repository validation found issues"
    if [ "$FIX_MODE" = false ]; then
        echo "   Run with --fix to attempt automatic repairs"
    fi
fi

exit $EXIT_CODE
