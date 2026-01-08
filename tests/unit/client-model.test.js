/**
 * Unit tests for ClientModel
 * Run with: node --test tests/unit/client-model.test.js
 */

import { describe, it, before, after } from 'node:test';
import assert from 'node:assert';

// Mock localStorage for Node.js environment
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

// Import ClientModel after mocks
const { default: ClientModel, Schema, createModel } = await import('../../src/shared/models/client-model.js');

describe('ClientModel', () => {
  let userModel;
  const userSchema = {
    name: { type: String, required: true, minLength: 2, maxLength: 50 },
    email: { type: String, required: true },
    age: { type: Number, min: 0, max: 150 },
    role: { type: String, enum: ['user', 'admin', 'moderator'], default: 'user' },
    active: { type: Boolean, default: true }
  };

  before(() => {
    userModel = new ClientModel(userSchema, 'users_test');
    global.localStorage.clear();
  });

  after(() => {
    global.localStorage.clear();
  });

  describe('initialization', () => {
    it('should initialize with schema and collection name', () => {
      assert.ok(userModel);
      assert.strictEqual(userModel.collectionName, 'users_test');
      assert.deepStrictEqual(userModel.schema, userSchema);
    });

    it('should load empty array initially', () => {
      assert.ok(Array.isArray(userModel.data));
      assert.strictEqual(userModel.data.length, 0);
    });
  });

  describe('validation', () => {
    it('should validate required fields', () => {
      const result = userModel.validate({ email: 'test@example.com' });
      assert.strictEqual(result.isValid, false);
      assert.ok(result.errors.some(e => e.includes('name')));
    });

    it('should validate type constraints', () => {
      const result = userModel.validate({
        name: 'John',
        email: 'test@example.com',
        age: 'not a number'
      });
      assert.strictEqual(result.isValid, false);
      assert.ok(result.errors.some(e => e.includes('type')));
    });

    it('should validate min/max for numbers', () => {
      const result = userModel.validate({
        name: 'John',
        email: 'test@example.com',
        age: 200
      });
      assert.strictEqual(result.isValid, false);
      assert.ok(result.errors.some(e => e.includes('age')));
    });

    it('should validate string length', () => {
      const result = userModel.validate({
        name: 'J',
        email: 'test@example.com'
      });
      assert.strictEqual(result.isValid, false);
      assert.ok(result.errors.some(e => e.includes('characters')));
    });

    it('should validate enum values', () => {
      const result = userModel.validate({
        name: 'John',
        email: 'test@example.com',
        role: 'superuser'
      });
      assert.strictEqual(result.isValid, false);
      assert.ok(result.errors.some(e => e.includes('one of')));
    });

    it('should pass validation for valid document', () => {
      const result = userModel.validate({
        name: 'John Doe',
        email: 'john@example.com',
        age: 30,
        role: 'admin'
      });
      assert.strictEqual(result.isValid, true);
      assert.strictEqual(result.errors.length, 0);
    });
  });

  describe('create', () => {
    before(() => {
      userModel.clearAll();
    });

    it('should create a document with valid data', () => {
      const user = userModel.create({
        name: 'Alice',
        email: 'alice@example.com',
        age: 25
      });

      assert.ok(user);
      assert.ok(user._id);
      assert.strictEqual(user.name, 'Alice');
      assert.strictEqual(user.email, 'alice@example.com');
      assert.strictEqual(user.age, 25);
      assert.ok(user.createdAt);
      assert.ok(user.updatedAt);
    });

    it('should apply default values', () => {
      const user = userModel.create({
        name: 'Bob',
        email: 'bob@example.com'
      });

      assert.strictEqual(user.role, 'user');
      assert.strictEqual(user.active, true);
    });

    it('should throw error for invalid data', () => {
      assert.throws(() => {
        userModel.create({
          email: 'invalid@example.com'
          // Missing required name field
        });
      });
    });

    it('should persist to localStorage', () => {
      userModel.create({
        name: 'Charlie',
        email: 'charlie@example.com'
      });

      const stored = global.localStorage.getItem('pewpi_model_users_test');
      assert.ok(stored);
      
      const data = JSON.parse(stored);
      assert.ok(Array.isArray(data));
      assert.ok(data.length > 0);
    });
  });

  describe('find', () => {
    before(() => {
      userModel.clearAll();
      userModel.create({ name: 'Alice', email: 'alice@example.com', role: 'admin' });
      userModel.create({ name: 'Bob', email: 'bob@example.com', role: 'user' });
      userModel.create({ name: 'Charlie', email: 'charlie@example.com', role: 'admin' });
    });

    it('should find all documents', () => {
      const users = userModel.find();
      assert.strictEqual(users.length, 3);
    });

    it('should find documents matching query', () => {
      const admins = userModel.find({ role: 'admin' });
      assert.strictEqual(admins.length, 2);
      assert.ok(admins.every(u => u.role === 'admin'));
    });

    it('should return empty array for no matches', () => {
      const results = userModel.find({ role: 'superuser' });
      assert.strictEqual(results.length, 0);
    });
  });

  describe('findOne', () => {
    it('should find first matching document', () => {
      const user = userModel.findOne({ name: 'Alice' });
      assert.ok(user);
      assert.strictEqual(user.name, 'Alice');
    });

    it('should return null for no match', () => {
      const user = userModel.findOne({ name: 'NonExistent' });
      assert.strictEqual(user, null);
    });
  });

  describe('findById', () => {
    it('should find document by ID', () => {
      const alice = userModel.findOne({ name: 'Alice' });
      const found = userModel.findById(alice._id);
      
      assert.ok(found);
      assert.strictEqual(found._id, alice._id);
      assert.strictEqual(found.name, 'Alice');
    });

    it('should return null for invalid ID', () => {
      const found = userModel.findById('invalid-id');
      assert.strictEqual(found, null);
    });
  });

  describe('updateOne', () => {
    it('should update matching document', () => {
      const updated = userModel.updateOne(
        { name: 'Bob' },
        { age: 31 }
      );

      assert.ok(updated);
      assert.strictEqual(updated.name, 'Bob');
      assert.strictEqual(updated.age, 31);
      assert.ok(updated.updatedAt);
    });

    it('should return null for no match', () => {
      const updated = userModel.updateOne(
        { name: 'NonExistent' },
        { age: 99 }
      );

      assert.strictEqual(updated, null);
    });
  });

  describe('updateMany', () => {
    it('should update all matching documents', () => {
      const count = userModel.updateMany(
        { role: 'admin' },
        { active: false }
      );

      assert.strictEqual(count, 2);
      
      const admins = userModel.find({ role: 'admin' });
      assert.ok(admins.every(u => u.active === false));
    });

    it('should return 0 for no matches', () => {
      const count = userModel.updateMany(
        { role: 'superuser' },
        { active: true }
      );

      assert.strictEqual(count, 0);
    });
  });

  describe('deleteOne', () => {
    it('should delete matching document', () => {
      const initialCount = userModel.find().length;
      const deleted = userModel.deleteOne({ name: 'Alice' });

      assert.ok(deleted);
      assert.strictEqual(deleted.name, 'Alice');
      
      const newCount = userModel.find().length;
      assert.strictEqual(newCount, initialCount - 1);
    });

    it('should return null for no match', () => {
      const deleted = userModel.deleteOne({ name: 'NonExistent' });
      assert.strictEqual(deleted, null);
    });
  });

  describe('deleteMany', () => {
    before(() => {
      userModel.clearAll();
      userModel.create({ name: 'User1', email: 'user1@example.com', role: 'user' });
      userModel.create({ name: 'User2', email: 'user2@example.com', role: 'user' });
      userModel.create({ name: 'Admin1', email: 'admin1@example.com', role: 'admin' });
    });

    it('should delete all matching documents', () => {
      const count = userModel.deleteMany({ role: 'user' });
      assert.strictEqual(count, 2);
      
      const remaining = userModel.find();
      assert.strictEqual(remaining.length, 1);
      assert.strictEqual(remaining[0].role, 'admin');
    });

    it('should return 0 for no matches', () => {
      const count = userModel.deleteMany({ role: 'superuser' });
      assert.strictEqual(count, 0);
    });
  });

  describe('countDocuments', () => {
    before(() => {
      userModel.clearAll();
      userModel.create({ name: 'User1', email: 'user1@example.com', role: 'user' });
      userModel.create({ name: 'User2', email: 'user2@example.com', role: 'user' });
      userModel.create({ name: 'Admin1', email: 'admin1@example.com', role: 'admin' });
    });

    it('should count all documents', () => {
      const count = userModel.countDocuments();
      assert.strictEqual(count, 3);
    });

    it('should count matching documents', () => {
      const count = userModel.countDocuments({ role: 'user' });
      assert.strictEqual(count, 2);
    });
  });

  describe('clearAll', () => {
    it('should clear all documents', () => {
      userModel.clearAll();
      const count = userModel.countDocuments();
      assert.strictEqual(count, 0);
    });
  });

  describe('Schema helper', () => {
    it('should create schema with definition', () => {
      const schema = new Schema({
        name: { type: String, required: true }
      });

      assert.ok(schema);
      assert.ok(schema.definition);
    });

    it('should have Types helper', () => {
      assert.ok(Schema.Types);
      assert.strictEqual(Schema.Types.String, String);
      assert.strictEqual(Schema.Types.Number, Number);
      assert.strictEqual(Schema.Types.Boolean, Boolean);
    });
  });

  describe('createModel helper', () => {
    it('should create model from schema', () => {
      const schema = new Schema({
        title: { type: String, required: true }
      });

      const model = createModel('posts', schema);
      assert.ok(model);
      assert.strictEqual(model.collectionName, 'posts');
    });
  });
});

console.log('✅ ClientModel tests completed');
