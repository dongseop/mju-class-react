'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: DataTypes.STRING,
    name: DataTypes.STRING,
    content: DataTypes.TEXT
  }, {});
  Post.associate = function(models) {
    // associations can be defined here
  };
  return Post;
};