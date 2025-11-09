#!/usr/bin/env bash
# backup-restore.sh
# Create and manage backups of critical repository files
# Usage: 
#   ./scripts/backup-restore.sh backup [backup_name]
#   ./scripts/backup-restore.sh list
#   ./scripts/backup-restore.sh restore <backup_name>
set -euo pipefail

BACKUP_DIR=".git/repo-backups"
COMMAND=${1:-}
BACKUP_NAME=${2:-}

usage() {
    echo "Usage: $0 {backup|list|restore} [backup_name]"
    echo ""
    echo "Commands:"
    echo "  backup [name]     Create a backup of critical files"
    echo "  list              List all available backups"
    echo "  restore <name>    Restore files from a backup"
    echo ""
    echo "Examples:"
    echo "  $0 backup before-major-change"
    echo "  $0 list"
    echo "  $0 restore before-major-change"
    exit 1
}

ensure_backup_dir() {
    if [ ! -d "$BACKUP_DIR" ]; then
        mkdir -p "$BACKUP_DIR"
        echo "Created backup directory: $BACKUP_DIR"
    fi
}

backup_files() {
    local name=${1:-$(date -u +"%Y%m%d-%H%M%S")}
    local backup_path="$BACKUP_DIR/$name"
    
    if [ -d "$backup_path" ]; then
        echo "❌ Backup '$name' already exists"
        exit 1
    fi
    
    ensure_backup_dir
    mkdir -p "$backup_path"
    
    echo "Creating backup: $name"
    echo "Backup location: $backup_path"
    echo ""
    
    # Critical files to backup
    local files=(
        "*.html"
        "*.js"
        "*.py"
        "*.json"
        "*.JSON"
        "scripts/"
        ".github/"
        "README*.md"
    )
    
    local count=0
    for pattern in "${files[@]}"; do
        for file in $pattern; do
            if [ -e "$file" ]; then
                # Preserve directory structure
                local dir=$(dirname "$file")
                mkdir -p "$backup_path/$dir"
                cp -r "$file" "$backup_path/$file"
                echo "  ✓ Backed up: $file"
                count=$((count + 1))
            fi
        done
    done
    
    # Create metadata
    cat > "$backup_path/BACKUP_INFO.txt" <<EOF
Backup Name: $name
Created: $(date -u +"%Y-%m-%d %H:%M:%S UTC")
Branch: $(git rev-parse --abbrev-ref HEAD)
Commit: $(git rev-parse HEAD)
Files Backed Up: $count
EOF
    
    echo ""
    echo "✓ Backup complete: $count files backed up"
    echo "  To restore: $0 restore $name"
}

list_backups() {
    ensure_backup_dir
    
    echo "Available backups in $BACKUP_DIR:"
    echo ""
    
    if [ -z "$(ls -A "$BACKUP_DIR" 2>/dev/null)" ]; then
        echo "  No backups found"
        return
    fi
    
    for backup in "$BACKUP_DIR"/*; do
        if [ -d "$backup" ]; then
            local name=$(basename "$backup")
            echo "  📦 $name"
            if [ -f "$backup/BACKUP_INFO.txt" ]; then
                grep "Created:" "$backup/BACKUP_INFO.txt" | sed 's/^/     /'
                grep "Files Backed Up:" "$backup/BACKUP_INFO.txt" | sed 's/^/     /'
            fi
            echo ""
        fi
    done
}

restore_backup() {
    local name=$1
    local backup_path="$BACKUP_DIR/$name"
    
    if [ ! -d "$backup_path" ]; then
        echo "❌ Backup '$name' not found"
        echo "   Available backups:"
        list_backups
        exit 1
    fi
    
    echo "⚠️  WARNING: This will overwrite current files with backup from '$name'"
    echo ""
    if [ -f "$backup_path/BACKUP_INFO.txt" ]; then
        cat "$backup_path/BACKUP_INFO.txt"
        echo ""
    fi
    
    read -p "Continue with restore? (yes/no): " -r
    if [[ ! $REPLY =~ ^[Yy][Ee][Ss]$ ]]; then
        echo "Restore cancelled"
        exit 0
    fi
    
    echo ""
    echo "Restoring from backup: $name"
    
    local count=0
    # Restore all files except BACKUP_INFO.txt
    find "$backup_path" -type f ! -name "BACKUP_INFO.txt" | while read -r file; do
        local rel_path=${file#$backup_path/}
        local target_dir=$(dirname "$rel_path")
        
        if [ "$target_dir" != "." ]; then
            mkdir -p "$target_dir"
        fi
        
        cp "$file" "$rel_path"
        echo "  ✓ Restored: $rel_path"
        count=$((count + 1))
    done
    
    echo ""
    echo "✓ Restore complete"
    echo "  Remember to review changes and commit if needed"
}

# Main command dispatch
case "$COMMAND" in
    backup)
        backup_files "$BACKUP_NAME"
        ;;
    list)
        list_backups
        ;;
    restore)
        if [ -z "$BACKUP_NAME" ]; then
            echo "❌ Error: backup name required for restore"
            echo ""
            usage
        fi
        restore_backup "$BACKUP_NAME"
        ;;
    *)
        usage
        ;;
esac
