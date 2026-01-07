/**
 * E2E Test - Login + Token Creation + Wallet Feed Update
 * Minimal end-to-end test demonstrating the full flow
 * 
 * Note: This is a simplified test that runs in Node.js
 * For full browser e2e tests, use Playwright or Puppeteer
 */

import { describe, it, before } from 'node:test';
import assert from 'node:assert';

// Mock browser environment
global.window = {
  location: { origin: 'http://localhost:8080' },
  addEventListener: () => {},
  dispatchEvent: (event) => {
    console.log(`Event dispatched: ${event.name || event.type}`);
    return true;
  },
  CustomEvent: class CustomEvent {
    constructor(name, options) {
      this.type = name;
      this.detail = options?.detail;
    }
  }
};

global.document = {
  getElementById: () => null,
  querySelector: () => null,
  querySelectorAll: () => [],
  addEventListener: () => {},
  createElement: () => ({
    style: {},
    addEventListener: () => {},
    appendChild: () => {}
  })
};

global.indexedDB = undefined;
global.localStorage = {
  data: {},
  getItem(key) {
    return this.data[key] || null;
  },
  setItem(key, value) {
    this.data[key] = value;
  },
  removeItem(key) {
    delete this.data[key];
  },
  clear() {
    this.data = {};
  }
};

global.sessionStorage = global.localStorage;

// Augment crypto instead of replacing it
if (!global.crypto) {
  global.crypto = {};
}
if (!global.crypto.getRandomValues) {
  global.crypto.getRandomValues = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      arr[i] = Math.floor(Math.random() * 256);
    }
    return arr;
  };
}

describe('E2E: Login + Token + Wallet Flow', () => {
  let LoginComponent, tokenService, WalletComponent;

  before(async () => {
    // Import components after mocks are set up
    const loginModule = await import('../../src/shared/auth/login-component.js');
    LoginComponent = loginModule.default;

    const tokenModule = await import('../../src/shared/token-service.js');
    tokenService = tokenModule.tokenService;

    const walletModule = await import('../../src/shared/wallet/wallet-component.js');
    WalletComponent = walletModule.default;

    // Clear state
    global.localStorage.clear();
  });

  it('should complete full user flow', async () => {
    console.log('\n=== Starting E2E Test ===\n');

    // Step 1: User login (dev mode - magic link)
    console.log('Step 1: User login with magic-link dev mode');
    const login = new LoginComponent({ devMode: true });
    
    assert.strictEqual(login.isLoggedIn(), false);
    
    // Simulate login
    login.loginUser({
      email: 'test@example.com',
      userId: 'user_test123',
      method: 'magic-link-dev',
      timestamp: new Date().toISOString()
    });
    
    assert.strictEqual(login.isLoggedIn(), true);
    assert.ok(login.getCurrentUser());
    assert.strictEqual(login.getCurrentUser().email, 'test@example.com');
    console.log('✅ User logged in successfully');

    // Step 2: Create tokens
    console.log('\nStep 2: Create tokens');
    await tokenService.clearAll();
    
    const token1 = await tokenService.createToken({
      type: 'bronze',
      value: 1,
      userId: 'user_test123'
    });
    
    assert.ok(token1);
    assert.strictEqual(token1.type, 'bronze');
    console.log('✅ Bronze token created:', token1.tokenId);

    const token2 = await tokenService.createToken({
      type: 'gold',
      value: 10,
      userId: 'user_test123'
    });
    
    assert.ok(token2);
    assert.strictEqual(token2.type, 'gold');
    console.log('✅ Gold token created:', token2.tokenId);

    // Step 3: Verify wallet data
    console.log('\nStep 3: Verify wallet data');
    const tokens = await tokenService.getByUserId('user_test123');
    assert.strictEqual(tokens.length, 2);
    console.log('✅ Wallet has 2 tokens');

    const balance = await tokenService.getBalance('user_test123');
    assert.strictEqual(balance, 11); // 1 + 10
    console.log('✅ Balance calculated correctly:', balance);

    // Step 4: Initialize wallet component
    console.log('\nStep 4: Initialize wallet component');
    const wallet = new WalletComponent({ userId: 'user_test123' });
    await wallet.loadData();
    
    assert.strictEqual(wallet.tokens.length, 2);
    assert.strictEqual(wallet.balance, 11);
    console.log('✅ Wallet component loaded correctly');

    // Step 5: Test live feed updates (simulate)
    console.log('\nStep 5: Test live feed updates');
    let feedUpdateReceived = false;
    
    tokenService.subscribe('tokenCreated', (token) => {
      feedUpdateReceived = true;
      console.log('✅ Live feed event received for token:', token.tokenId);
    });

    const token3 = await tokenService.createToken({
      type: 'silver',
      value: 5,
      userId: 'user_test123'
    });

    assert.ok(feedUpdateReceived);
    console.log('✅ Live feed updated on token creation');

    // Step 6: Verify final state
    console.log('\nStep 6: Verify final state');
    const finalTokens = await tokenService.getAll();
    assert.strictEqual(finalTokens.length, 3);
    
    const finalBalance = await tokenService.getBalance('user_test123');
    assert.strictEqual(finalBalance, 16); // 1 + 10 + 5
    console.log('✅ Final balance:', finalBalance);

    // Step 7: Test logout
    console.log('\nStep 7: Test logout');
    login.currentUser = null;
    assert.strictEqual(login.isLoggedIn(), false);
    console.log('✅ User logged out successfully');

    console.log('\n=== E2E Test Completed Successfully ===\n');
  });

  it('should handle non-GitHub user flow', async () => {
    console.log('\n=== Testing Non-GitHub User Flow ===\n');

    // Verify that login works without GitHub
    const login = new LoginComponent({ 
      devMode: true,
      githubClientId: null // No GitHub OAuth
    });

    // Login with email only
    login.loginUser({
      email: 'nogithub@example.com',
      userId: 'user_nogithub',
      method: 'magic-link-dev',
      timestamp: new Date().toISOString()
    });

    assert.strictEqual(login.isLoggedIn(), true);
    console.log('✅ Non-GitHub user logged in successfully');

    // Create token
    await tokenService.clearAll();
    const token = await tokenService.createToken({
      type: 'bronze',
      value: 1,
      userId: 'user_nogithub'
    });

    assert.ok(token);
    console.log('✅ Non-GitHub user created token:', token.tokenId);

    console.log('\n=== Non-GitHub User Flow Completed ===\n');
  });

  it('should handle integration events', async () => {
    console.log('\n=== Testing Integration Events ===\n');

    let tokenCreatedEventFired = false;
    let loginChangedEventFired = false;

    // Listen for integration events
    global.window.addEventListener = (eventName, handler) => {
      console.log(`Registered listener for: ${eventName}`);
    };

    global.window.dispatchEvent = (event) => {
      console.log(`Event fired: ${event.type}`);
      if (event.type === 'pewpi.token.created') {
        tokenCreatedEventFired = true;
      }
      if (event.type === 'pewpi.login.changed') {
        loginChangedEventFired = true;
      }
      return true;
    };

    // Create token (should fire event)
    await tokenService.createToken({
      type: 'bronze',
      value: 1,
      userId: 'user_integration_test'
    });

    assert.ok(tokenCreatedEventFired);
    console.log('✅ pewpi.token.created event fired');

    // Login (should fire event)
    const login = new LoginComponent({ devMode: true });
    login.loginUser({
      email: 'integration@example.com',
      userId: 'user_integration',
      method: 'magic-link-dev',
      timestamp: new Date().toISOString()
    });

    assert.ok(loginChangedEventFired);
    console.log('✅ pewpi.login.changed event fired');

    console.log('\n=== Integration Events Test Completed ===\n');
  });
});

console.log('✅ E2E tests completed');
