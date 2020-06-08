const db = require('../models');
afterAll(() => db.sequelize.close());
