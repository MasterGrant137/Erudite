'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    songID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false
    },
  }, {});
  Comment.associate = function(models) {
    // associations can be defined here
    Comment.belongsTo(models.User, { foreignKey: 'userID' });
    Comment.belongsTo(models.Song, { foreignKey: 'songID' });
  };
  return Comment;
};
