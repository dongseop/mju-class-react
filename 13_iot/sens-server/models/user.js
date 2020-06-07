'use strict';
const bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (user) => {
        user.password = bcrypt.hashSync(user.password, 3);
      }
    }
  });

  User.prototype.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  }

  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};