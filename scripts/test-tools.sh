#!/usr/bin/env bash
# test-tools.sh
# Integration tests for recovery and protection tools
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TESTS_PASSED=0
TESTS_FAILED=0

echo "==================================="
echo "Testing Recovery & Protection Tools"
echo "==================================="
echo ""

# Helper function to run a test
run_test() {
    local test_name=$1
    local test_command=$2
    
    echo -n "Testing ${test_name}... "
    
    if eval "$test_command" > /tmp/test-output.log 2>&1; then
        echo "✓ PASSED"
        TESTS_PASSED=$((TESTS_PASSED + 1))
        return 0
    else
        echo "✗ FAILED"
        echo "  Output:"
        cat /tmp/test-output.log | head -20 | sed 's/^/    /'
        TESTS_FAILED=$((TESTS_FAILED + 1))
        return 1
    fi
}

# Test 1: validate.sh runs successfully
run_test "validate.sh execution" \
    "cd '${SCRIPT_DIR}/..' && ./scripts/validate.sh"

# Test 2: validate.sh --fix runs successfully
run_test "validate.sh --fix execution" \
    "cd '${SCRIPT_DIR}/..' && ./scripts/validate.sh --fix"

# Test 3: repo-scan.py runs successfully
run_test "repo-scan.py execution" \
    "cd '${SCRIPT_DIR}/..' && python3 scripts/repo-scan.py --root ."

# Test 4: protect.sh runs successfully (non-interactive)
run_test "protect.sh execution" \
    "cd '${SCRIPT_DIR}/..' && ./scripts/protect.sh test-run"

# Test 5: backup-restore.sh list works
run_test "backup-restore.sh list" \
    "cd '${SCRIPT_DIR}/..' && ./scripts/backup-restore.sh list"

# Test 6: Check all scripts are executable
run_test "script permissions" \
    "cd '${SCRIPT_DIR}/..' && test -x scripts/validate.sh && test -x scripts/protect.sh && test -x scripts/backup-restore.sh && test -x scripts/find-working-commit.sh"

# Test 7: Check documentation exists
run_test "documentation files" \
    "cd '${SCRIPT_DIR}/..' && test -f PROTECTION_GUIDE.md && (test -f README_RESTORE.md || ls README_RESTORE.md* >/dev/null 2>&1) && test -f README.md"

# Test 8: Check CI workflow exists
run_test "CI workflow file" \
    "cd '${SCRIPT_DIR}/..' && test -f .github/workflows/repair-ci.yml"

# Test 9: Python script syntax check
run_test "repo-scan.py syntax" \
    "python3 -m py_compile '${SCRIPT_DIR}/../scripts/repo-scan.py'"

# Test 10: Validate YAML syntax in workflow
run_test "CI workflow YAML syntax" \
    "python3 -c \"import yaml; yaml.safe_load(open('${SCRIPT_DIR}/../.github/workflows/repair-ci.yml'))\""

# Test 11: Create and list a backup with unique name
UNIQUE_BACKUP="test-backup-\$(date +%s)-\$\$"
run_test "backup creation" \
    "cd '${SCRIPT_DIR}/..' && ./scripts/backup-restore.sh backup \${UNIQUE_BACKUP}"

# Test 12: Verify backup was created
run_test "backup verification" \
    "cd '${SCRIPT_DIR}/..' && ls .git/repo-backups/ | grep -q 'test-backup'"

# Test 13: Git repository validation
run_test "git repository health" \
    "cd '${SCRIPT_DIR}/..' && git fsck --no-progress > /dev/null 2>&1"

echo ""
echo "==================================="
echo "Test Results:"
echo "  Passed: ${TESTS_PASSED}"
echo "  Failed: ${TESTS_FAILED}"
echo "==================================="

if [ ${TESTS_FAILED} -eq 0 ]; then
    echo "✓ All tests passed!"
    exit 0
else
    echo "✗ Some tests failed"
    exit 1
fi
