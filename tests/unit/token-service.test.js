/**
 * Unit tests for TokenService
 * Run with: node --test tests/unit/token-service.test.js
 */

import { describe, it, before, after } from 'node:test';
import assert from 'node:assert';

// Mock browser APIs for Node.js environment
global.window = {
  addEventListener: () => {},
  dispatchEvent: () => {},
  CustomEvent: class CustomEvent {
    constructor(name, options) {
      this.name = name;
      this.detail = options?.detail;
    }
  }
};

global.indexedDB = undefined; // Force localStorage fallback
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

// Import TokenService after mocks are set up
const { default: TokenService } = await import('../../src/shared/token-service.js');

describe('TokenService', () => {
  let tokenService;

  before(() => {
    tokenService = new TokenService();
    // Clear any existing data
    global.localStorage.clear();
  });

  after(() => {
    global.localStorage.clear();
  });

  describe('initialization', () => {
    it('should initialize with localStorage fallback when IndexedDB unavailable', () => {
      assert.strictEqual(tokenService.useLocalStorageFallback, true);
    });

    it('should check IndexedDB availability', () => {
      const isAvailable = tokenService.isIndexedDBAvailable();
      assert.strictEqual(isAvailable, false);
    });
  });

  describe('token creation', () => {
    it('should create a token with default values', async () => {
      const token = await tokenService.createToken({
        type: 'bronze',
        value: 1
      });

      assert.ok(token);
      assert.ok(token.tokenId);
      assert.strictEqual(token.type, 'bronze');
      assert.strictEqual(token.value, 1);
      assert.strictEqual(token.status, 'active');
      assert.ok(token.createdAt);
    });

    it('should create a token with custom values', async () => {
      const token = await tokenService.createToken({
        type: 'gold',
        value: 10,
        userId: 'test-user-123'
      });

      assert.strictEqual(token.type, 'gold');
      assert.strictEqual(token.value, 10);
      assert.strictEqual(token.userId, 'test-user-123');
    });

    it('should generate unique token IDs', async () => {
      const token1 = await tokenService.createToken({ type: 'bronze' });
      const token2 = await tokenService.createToken({ type: 'bronze' });

      assert.notStrictEqual(token1.tokenId, token2.tokenId);
    });
  });

  describe('token retrieval', () => {
    before(async () => {
      // Clear and create test tokens
      await tokenService.clearAll();
      await tokenService.createToken({ type: 'bronze', value: 1, userId: 'user1' });
      await tokenService.createToken({ type: 'silver', value: 5, userId: 'user1' });
      await tokenService.createToken({ type: 'gold', value: 10, userId: 'user2' });
    });

    it('should get all tokens', async () => {
      const tokens = await tokenService.getAll();
      assert.strictEqual(tokens.length, 3);
    });

    it('should get tokens by user ID', async () => {
      const user1Tokens = await tokenService.getByUserId('user1');
      assert.strictEqual(user1Tokens.length, 2);
      
      const user2Tokens = await tokenService.getByUserId('user2');
      assert.strictEqual(user2Tokens.length, 1);
    });

    it('should calculate balance correctly', async () => {
      const balance1 = await tokenService.getBalance('user1');
      assert.strictEqual(balance1, 6); // 1 + 5
      
      const balance2 = await tokenService.getBalance('user2');
      assert.strictEqual(balance2, 10);
    });
  });

  describe('token management', () => {
    it('should clear all tokens', async () => {
      await tokenService.createToken({ type: 'bronze' });
      let tokens = await tokenService.getAll();
      assert.ok(tokens.length > 0);

      await tokenService.clearAll();
      tokens = await tokenService.getAll();
      assert.strictEqual(tokens.length, 0);
    });
  });

  describe('encryption helpers', () => {
    it('should encrypt and decrypt data', () => {
      const data = 'sensitive token data';
      const key = 'test-encryption-key';

      const encrypted = tokenService.encrypt(data, key);
      assert.ok(encrypted);
      assert.notStrictEqual(encrypted, data);

      const decrypted = tokenService.decrypt(encrypted, key);
      assert.strictEqual(decrypted, data);
    });

    it('should derive key from password', () => {
      const password = 'my-secure-password';
      const key = tokenService.deriveKey(password);
      
      assert.ok(key);
      assert.strictEqual(typeof key, 'string');
      assert.ok(key.length > 0);
    });

    it('should produce consistent keys from same password', () => {
      const password = 'test-password';
      const key1 = tokenService.deriveKey(password);
      const key2 = tokenService.deriveKey(password);
      
      assert.strictEqual(key1, key2);
    });
  });

  describe('event system', () => {
    it('should allow subscribing to events', () => {
      let called = false;
      const unsubscribe = tokenService.subscribe('tokenCreated', () => {
        called = true;
      });

      tokenService.notifyListeners('tokenCreated', {});
      assert.strictEqual(called, true);

      unsubscribe();
    });

    it('should allow unsubscribing from events', () => {
      let callCount = 0;
      const unsubscribe = tokenService.subscribe('tokenCreated', () => {
        callCount++;
      });

      tokenService.notifyListeners('tokenCreated', {});
      assert.strictEqual(callCount, 1);

      unsubscribe();
      tokenService.notifyListeners('tokenCreated', {});
      assert.strictEqual(callCount, 1); // Should not increase
    });

    it('should support wildcard subscriptions', () => {
      let eventType = null;
      tokenService.subscribe('*', () => {
        eventType = 'captured';
      });

      tokenService.notifyListeners('anyEvent', {});
      assert.strictEqual(eventType, 'captured');
    });
  });

  describe('localStorage fallback', () => {
    it('should save tokens to localStorage', async () => {
      await tokenService.clearAll();
      await tokenService.createToken({ type: 'bronze', value: 1 });

      const stored = global.localStorage.getItem('pewpi_tokens');
      assert.ok(stored);
      
      const tokens = JSON.parse(stored);
      assert.ok(Array.isArray(tokens));
      assert.strictEqual(tokens.length, 1);
    });

    it('should retrieve tokens from localStorage', async () => {
      const tokens = tokenService.getAllFromLocalStorage();
      assert.ok(Array.isArray(tokens));
    });
  });

  describe('utility functions', () => {
    it('should generate token ID', () => {
      const id1 = tokenService.generateTokenId();
      const id2 = tokenService.generateTokenId();

      assert.ok(id1.startsWith('token_'));
      assert.ok(id2.startsWith('token_'));
      assert.notStrictEqual(id1, id2);
    });

    it('should get current user ID', () => {
      global.localStorage.setItem('pewpi_user_id', 'test-user');
      const userId = tokenService.getCurrentUserId();
      assert.strictEqual(userId, 'test-user');
    });

    it('should return anonymous if no user ID', () => {
      global.localStorage.removeItem('pewpi_user_id');
      const userId = tokenService.getCurrentUserId();
      assert.strictEqual(userId, 'anonymous');
    });
  });
});

console.log('✅ TokenService tests completed');
