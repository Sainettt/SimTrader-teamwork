import { test } from 'node:test';
import assert from 'node:assert/strict';
import jwt from 'jsonwebtoken';
import { authMiddleware, AuthRequest } from '../middleware/authMiddleware';

process.env.JWT_SECRET_KEY = 'test-secret';

const run = (authorization?: string) => {
  const req = { method: 'GET', headers: { authorization } } as unknown as AuthRequest;
  const result = { status: 0, nextCalled: false, req };
  const res: any = {
    status(code: number) { result.status = code; return res; },
    json() { return res; },
  };
  authMiddleware(req, res, () => { result.nextCalled = true; });
  return result;
};

test('request without a token is rejected with 401', () => {
  const result = run();
  assert.equal(result.status, 401);
  assert.equal(result.nextCalled, false);
});

test('request with a token signed by another key is rejected with 401', () => {
  const forged = jwt.sign({ id: 1 }, 'wrong-secret');
  const result = run(`Bearer ${forged}`);
  assert.equal(result.status, 401);
  assert.equal(result.nextCalled, false);
});

test('request with an expired token is rejected with 401', () => {
  const expired = jwt.sign({ id: 1 }, 'test-secret', { expiresIn: -10 });
  const result = run(`Bearer ${expired}`);
  assert.equal(result.status, 401);
  assert.equal(result.nextCalled, false);
});

test('valid token passes and exposes the user id to the handlers', () => {
  const token = jwt.sign({ id: 42, email: 'a@b.pl' }, 'test-secret', { expiresIn: '1h' });
  const result = run(`Bearer ${token}`);
  assert.equal(result.nextCalled, true);
  assert.equal(result.req.user?.id, 42);
});
