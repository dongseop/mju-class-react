const request = require('supertest');
const app = require('../../app');
const db = require('../../models');
var jwt = require('jsonwebtoken');
const config = require('../../config/config.js');

beforeAll(() => {
  return db.User.create({ email: 'test@test.com', password: 'password' });
});

afterAll(() => {
  return db.User.destroy({ truncate: true, cascade: true })
});

it('should return token after login', async (done) => {
  const resp = await request(app).post('/api/auth/login')
    .send({ email: 'test@test.com', password: 'password' });
    
  console.log("RESULT", resp.body);
  expect(resp.body.token).toBeTruthy();
  expect(() => {
    jwt.verify(resp.body.token, config.secret);
  }).not.toThrow();
  done();
});

it('should return 401 if password is wrong', async (done) => {
  request(app).post('/api/auth/login')
    .send({ email: 'test@test.com', password: 'wrong_password' })
    .expect(401, done);
});

it('should return 401 if email does not exist', async (done) => {
  request(app).post('/api/auth/login')
    .send({ email: 'unknown@test.com', password: 'password' })
    .expect(401, done);
});
it('should return 400 error if email is missing', (done) => {
  request(app).post('/api/auth/login')
    .send({ password: 'passpass' })
    .expect(400, done);
});

it('should return 400 error if password is missing', (done) => {
  request(app).post('/api/auth/login')
    .send({ email: 'passpass' })
    .expect(400, done);
});