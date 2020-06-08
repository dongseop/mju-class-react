const db = require('../../models');

afterEach(async (done) => {
  await db.User.destroy({ truncate: true, cascade: true })
  done();
});

it('should encode password after creating', async (done) => {
  const user = await db.User.create({
    email: '1@com', password: 'password'
  });
  expect(user.password).not.toBe('password');
  expect(user.validatePassword('password')).toBe(true);
  expect(user.validatePassword('password1')).toBe(false);
  done();
});

it('should not contain password in JSON', async (done) => {
  const user = await db.User.create({
    email: '1@com', password: 'password'
  });
  expect(user.toJSON().password).toBeUndefined();
  done();
})