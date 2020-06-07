const request = require('supertest');
const app = require('../app');

test('always pass', () => {
  expect(true).toBeTruthy();
});

it('should provide the root page', (done)=> {
  request(app).get('/')
    .expect(200, done);
});

it('should provide swagger UI', (done)=> {
  request(app).get('/api-docs')
    .expect(301, done);
});

it('should return 404 for not-existing routes', (done) => {
  request(app).get('/unknown')
    .expect(404, done);
});