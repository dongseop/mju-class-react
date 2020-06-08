const request = require('supertest');
const app = require('../../app');
const db = require('../../models');
var jwt = require('jsonwebtoken');
const config = require('../../config/config.js');

beforeAll(() => {
  return db.User.destroy({ truncate: true, cascade: true });
});

afterEach(() => {
  return db.User.destroy({ truncate: true, cascade: true });
});

it('should return 200 for successful registration', async (done) => {
  await db.User.destroy({ truncate: true, cascade: true });
  request(app).post('/api/auth/register')
    .send({ email: 'test@test.com', password: 'passpass' })
    .expect(200, done);
});

it('should return token after registeration', async (done) => {
  const resp = await request(app).post('/api/auth/register')
    .send({email: 'test@test.com', password: 'passpass'});
  expect(resp.body.token).toBeTruthy();
  expect(() => {
    jwt.verify(resp.body.token, config.secret);
  }).not.toThrow();
  done();
});

it('should return 400 if there is the same email', async (done) => {
  await db.User.create({
    email: 'test@test.com', password: 'test'  });
  request(app).post('/api/auth/register')
    .send({ email: 'test@test.com', password: 'passpass' })
    .expect(400)
    .then(resp => {
      expect(resp.body.message).toBe('email is taken');
      done();
    });
});

it('should return 400 error if email is missing', (done) => {
  request(app).post('/api/auth/register')
    .send({ password: 'passpass' })
    .expect(400, done);
});

it('should return 400 error if password is missing', (done) => {
  request(app).post('/api/auth/register')
    .send({ email: 'passpass' })
    .expect(400, done);
});

it('should make a new user after registration', async (done) => {
  let user = await db.User.findOne({ where: { email: 'test@test.com'}});
  expect(user).toBeNull();
  const resp = await request(app).post('/api/auth/register')
    .send({ email: 'test@test.com', password: 'passpass' });
  user = await db.User.findOne({ where: { email: 'test@test.com' } });
  expect(user).not.toBeNull();
  done();
});

