'use strict';
module.exports = (sequelize, DataTypes) => {
  var OAuthToken = sequelize.define('OAuthToken', {
    accessToken: DataTypes.STRING,
    expiresAt: DataTypes.DATE,
    scope: DataTypes.STRING,
    clientId: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  OAuthToken.associate = function(models) {
    // associations can be defined here
    OAuthToken.belongsTo(models.User);
    OAuthToken.belongsTo(models.OAuthClient, {as: 'client', foreignKey: 'clientId'});
  };
  return OAuthToken;
};