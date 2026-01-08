# Migration Guide

This guide provides instructions for migrating to the pewpi token/wallet system and rollback procedures if needed.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Migration Steps](#migration-steps)
- [Testing Migration](#testing-migration)
- [Rollback Instructions](#rollback-instructions)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before migrating:
1. **Backup existing data**: Export current token/wallet data
2. **Review dependencies**: Ensure you can install dexie and crypto-js
3. **Test environment**: Have a dev/staging environment ready
4. **Browser support**: Verify IndexedDB support in target browsers

## Migration Steps

### Step 1: Backup Existing Data

If you have existing token/wallet data in localStorage:

```javascript
// Backup script
function backupExistingData() {
  const backup = {
    timestamp: new Date().toISOString(),
    tokens: localStorage.getItem('tokens'),
    user: localStorage.getItem('user'),
    wallet: localStorage.getItem('wallet'),
    // Add any other relevant keys
  };
  
  // Save to file or send to server
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `pewpi-backup-${Date.now()}.json`;
  a.click();
  
  console.log('Backup created:', backup);
  return backup;
}

// Run backup
const backup = backupExistingData();
```

### Step 2: Install Dependencies

```bash
npm install dexie crypto-js
```

Or use CDN in HTML:

```html
<script type="importmap">
{
  "imports": {
    "dexie": "https://cdn.jsdelivr.net/npm/dexie@3.2.4/dist/dexie.mjs",
    "crypto-js": "https://cdn.jsdelivr.net/npm/crypto-js@4.2.0/crypto-js.js"
  }
}
</script>
```

### Step 3: Copy Shared Library

```bash
# Option 1: Copy directly
cp -r /path/to/GPT-Vector-Design/src/shared ./src/pewpi-shared

# Option 2: Git submodule
git submodule add https://github.com/pewpi-infinity/GPT-Vector-Design.git pewpi-shared
```

### Step 4: Update Imports

Replace old token management code:

```javascript
// OLD CODE
const tokens = JSON.parse(localStorage.getItem('tokens') || '[]');
tokens.push(newToken);
localStorage.setItem('tokens', JSON.stringify(tokens));

// NEW CODE
import { tokenService } from './pewpi-shared/token-service.js';
await tokenService.createToken({
  type: 'bronze',
  value: 1,
  userId: getCurrentUserId()
});
```

### Step 5: Migrate Existing Tokens

```javascript
import { tokenService } from './pewpi-shared/token-service.js';

async function migrateTokens() {
  console.log('Starting token migration...');
  
  // Get old tokens
  const oldTokensJson = localStorage.getItem('tokens');
  if (!oldTokensJson) {
    console.log('No tokens to migrate');
    return;
  }
  
  const oldTokens = JSON.parse(oldTokensJson);
  console.log(`Migrating ${oldTokens.length} tokens...`);
  
  // Clear old format
  await tokenService.clearAll();
  
  // Migrate each token
  let migrated = 0;
  for (const oldToken of oldTokens) {
    try {
      await tokenService.createToken({
        type: oldToken.type || 'bronze',
        value: oldToken.value || 1,
        userId: oldToken.userId || oldToken.owner || 'migrated_user',
        metadata: {
          migrated: true,
          originalId: oldToken.id,
          ...oldToken
        }
      });
      migrated++;
    } catch (error) {
      console.error('Failed to migrate token:', oldToken, error);
    }
  }
  
  console.log(`Migration complete: ${migrated}/${oldTokens.length} tokens migrated`);
  
  // Archive old data (don't delete yet)
  localStorage.setItem('tokens_backup', oldTokensJson);
  localStorage.removeItem('tokens');
  
  return { total: oldTokens.length, migrated };
}

// Run migration
migrateTokens().then(result => {
  console.log('Migration result:', result);
});
```

### Step 6: Update Authentication

Replace old auth code:

```javascript
// OLD CODE
function login(username, password) {
  // Old login logic
  localStorage.setItem('user', username);
}

// NEW CODE
import { LoginComponent } from './pewpi-shared/auth/login-component.js';

const login = new LoginComponent({
  devMode: true, // or false for production
  onLoginSuccess: (user) => {
    console.log('Logged in:', user);
    initApp(user);
  }
});
login.render('login-container');
```

### Step 7: Add Wallet UI

```javascript
import { WalletComponent } from './pewpi-shared/wallet/wallet-component.js';

function initApp(user) {
  const wallet = new WalletComponent({ userId: user.userId });
  wallet.render('wallet-container');
}
```

### Step 8: Setup Integration Listener

```javascript
import { setupIntegration } from './pewpi-shared/integration-listener.js';

const listener = setupIntegration({
  onTokenCreated: (token) => {
    // Update your app UI
    updateTokenCount();
    showNotification(`New ${token.type} token!`);
  },
  onLoginChanged: (data) => {
    // Handle login state changes
    if (data.loggedIn) {
      loadUserData(data.user);
    } else {
      clearUserData();
    }
  }
});
```

## Testing Migration

### Automated Test

```javascript
async function testMigration() {
  const tests = [];
  
  // Test 1: TokenService is accessible
  tests.push({
    name: 'TokenService import',
    test: () => typeof tokenService !== 'undefined'
  });
  
  // Test 2: Can create token
  tests.push({
    name: 'Create token',
    test: async () => {
      const token = await tokenService.createToken({
        type: 'bronze',
        value: 1
      });
      return token && token.tokenId;
    }
  });
  
  // Test 3: Can retrieve tokens
  tests.push({
    name: 'Get tokens',
    test: async () => {
      const tokens = await tokenService.getAll();
      return Array.isArray(tokens);
    }
  });
  
  // Test 4: Events work
  tests.push({
    name: 'Token events',
    test: () => new Promise((resolve) => {
      const unsubscribe = tokenService.subscribe('tokenCreated', () => {
        unsubscribe();
        resolve(true);
      });
      tokenService.createToken({ type: 'bronze', value: 1 });
    })
  });
  
  // Run tests
  console.log('Running migration tests...');
  for (const { name, test } of tests) {
    try {
      const result = await test();
      console.log(`✅ ${name}:`, result);
    } catch (error) {
      console.error(`❌ ${name}:`, error);
    }
  }
}

testMigration();
```

### Manual Testing Checklist

- [ ] Login with magic-link works
- [ ] Token creation works
- [ ] Token list displays correctly
- [ ] Balance calculates correctly
- [ ] Live feed updates on token creation
- [ ] Integration events fire correctly
- [ ] Data persists after page reload
- [ ] Logout works correctly

## Rollback Instructions

If you need to rollback the migration:

### Quick Rollback

```javascript
// 1. Restore backup data
function restoreBackup(backupData) {
  console.log('Rolling back to backup...');
  
  // Restore old localStorage format
  if (backupData.tokens) {
    localStorage.setItem('tokens', backupData.tokens);
  }
  if (backupData.user) {
    localStorage.setItem('user', backupData.user);
  }
  if (backupData.wallet) {
    localStorage.setItem('wallet', backupData.wallet);
  }
  
  // Clear pewpi data
  localStorage.removeItem('pewpi_user');
  localStorage.removeItem('pewpi_user_id');
  localStorage.removeItem('pewpi_tokens');
  
  // Clear IndexedDB
  if (indexedDB) {
    indexedDB.deleteDatabase('PewpiTokenDB');
  }
  
  console.log('Rollback complete. Reload the page.');
}

// 2. Load backup file
const input = document.createElement('input');
input.type = 'file';
input.accept = 'application/json';
input.onchange = (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = (event) => {
    const backup = JSON.parse(event.target.result);
    restoreBackup(backup);
  };
  reader.readAsText(file);
};
input.click();
```

### Complete Rollback Steps

1. **Remove imports**

```javascript
// Comment out or remove pewpi imports
// import { tokenService } from './pewpi-shared/token-service.js';
// import { LoginComponent } from './pewpi-shared/auth/login-component.js';
// import { WalletComponent } from './pewpi-shared/wallet/wallet-component.js';
```

2. **Restore old code**

Restore your backed-up previous code from version control:

```bash
git checkout HEAD~1 src/your-old-token-code.js
```

3. **Clear pewpi data**

```javascript
// Clear localStorage
localStorage.removeItem('pewpi_user');
localStorage.removeItem('pewpi_user_id');
localStorage.removeItem('pewpi_tokens');

// Clear IndexedDB
indexedDB.deleteDatabase('PewpiTokenDB');

// Restore archived backup
const backup = localStorage.getItem('tokens_backup');
if (backup) {
  localStorage.setItem('tokens', backup);
}
```

4. **Uninstall dependencies** (optional)

```bash
npm uninstall dexie crypto-js
```

5. **Remove files**

```bash
rm -rf src/pewpi-shared
```

6. **Reload application**

```bash
# Clear browser cache and reload
# Or do hard refresh: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)
```

## Troubleshooting

### Issue: IndexedDB not available

**Solution**: The system automatically falls back to localStorage

```javascript
// Check which storage is being used
if (tokenService.useLocalStorageFallback) {
  console.log('Using localStorage fallback');
} else {
  console.log('Using IndexedDB');
}
```

### Issue: Tokens not persisting

**Solution**: Check browser storage settings

```javascript
// Debug storage
console.log('localStorage:', localStorage.getItem('pewpi_tokens'));
console.log('IndexedDB:', await tokenService.db.tokens.toArray());
```

### Issue: Events not firing

**Solution**: Ensure event listeners are set up before creating tokens

```javascript
// Setup listener first
tokenService.subscribe('tokenCreated', (token) => {
  console.log('Token created:', token);
});

// Then create token
await tokenService.createToken({ type: 'bronze', value: 1 });
```

### Issue: Login fails in dev mode

**Solution**: Check devMode flag is set correctly

```javascript
const login = new LoginComponent({
  devMode: true, // Must be true for local testing
  onLoginSuccess: (user) => console.log('Success:', user),
  onLoginError: (error) => console.error('Error:', error)
});
```

### Issue: Migration loses data

**Solution**: Always backup first, and use the restore function

```javascript
// Restore from backup file
restoreBackup(backupData);

// Or restore from localStorage backup
const backup = localStorage.getItem('tokens_backup');
if (backup) {
  localStorage.setItem('tokens', backup);
}
```

## Support

For additional help:
- Review [docs/INTEGRATION.md](./INTEGRATION.md)
- Check test examples in `tests/` directory
- Open an issue on GitHub
- Review README.md for API reference

## Migration Checklist

Complete this checklist during migration:

- [ ] Backup existing data
- [ ] Install dependencies
- [ ] Copy shared library
- [ ] Update imports in code
- [ ] Migrate existing tokens
- [ ] Update authentication
- [ ] Add wallet UI
- [ ] Setup integration listener
- [ ] Run automated tests
- [ ] Manual testing complete
- [ ] Document any custom changes
- [ ] Keep backup for 30 days
- [ ] Monitor for issues in production
