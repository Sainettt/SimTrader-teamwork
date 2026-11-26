import { test } from 'node:test';
import assert from 'node:assert/strict';
import { isValidEmail, isValidPassword } from '../utils/validation';

test('email: accepts a well-formed address', () => {
  assert.equal(isValidEmail('jan.kowalski@example.com'), true);
});

test('email: rejects malformed addresses', () => {
  for (const email of ['', 'jan', 'jan@', '@example.com', 'jan@example', 'jan kowalski@example.com']) {
    assert.equal(isValidEmail(email), false, email);
  }
});

test('password: requires 6+ characters, an uppercase letter and a special character', () => {
  assert.equal(isValidPassword('Secret!1'), true);
  assert.equal(isValidPassword('secret!1'), false); // no uppercase letter
  assert.equal(isValidPassword('Secret11'), false); // no special character
  assert.equal(isValidPassword('S!a'), false);      // too short
});
