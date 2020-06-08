var jwt = require('jsonwebtoken');
const config = require('../../config/config.js');
const authService = require('../../services/authService');

test('getToken should parse Bearer token', () => {
  const req = {
    header: (key) => {
      if (key === "Authorization") return "Bearer token1";
    }
  }
  expect(authService.getToken(req)).toBe('token1');
});

test('getToken should parse single token', () => {
  const req = {
    header: (key) => {
      if (key === "Authorization") return "Bearer token1";
    }
  }
  expect(authService.getToken(req)).toBe('token1');
});

test('getToken should parse single token', () => {
  const req = {
    header: (key) => {
      if (key === "api_key") return "token1";
    }
  }
  expect(authService.getToken(req)).toBe('token1');
});

test('getToken should parse single token', () => {
  const req = {
    header: () => "",
    body: {
      token: 'token1'
    }
  }
  expect(authService.getToken(req)).toBe('token1');
});


test('authenticateToken should call next for valid token', () => {
  const validToken = jwt.sign({email: 'test1'}, config.secret);
  const req = { header: () => `Bearer ${validToken}` };
  const resp = { status: jest.fn() };
  const next = jest.fn();
  authService.authenticateToken(req, resp, next);
  expect(next.mock.calls.length).toBe(1);
  expect(resp.status.mock.calls.length).toBe(0);
});

test('authenticateToken should call resp.status(401) for invalid token', () => {
  const req = { header: () => 'Bearer invalid token' };
  const resp = { status: jest.fn() };
  const json = jest.fn();
  resp.status.mockReturnValueOnce({json});
  const next = jest.fn();

  authService.authenticateToken(req, resp, next);
  expect(next.mock.calls.length).toBe(0);
  expect(resp.status.mock.calls.length).toBe(1);
  expect(resp.status.mock.calls[0][0]).toBe(401);
});


test('authenticateToken should call resp.status(401) for no token', () => {
  const req = { header: () => '' };
  const resp = { status: jest.fn() };
  const json = jest.fn();
  resp.status.mockReturnValueOnce({json});
  const next = jest.fn();

  authService.authenticateToken(req, resp, next);
  expect(next.mock.calls.length).toBe(0);
  expect(resp.status.mock.calls.length).toBe(1);
  expect(resp.status.mock.calls[0][0]).toBe(401);
});