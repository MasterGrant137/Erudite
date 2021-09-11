'use strict';
module.exports = (sequelize, DataTypes) => {
  const Annotation = sequelize.define('Annotation', {
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    songID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    startPos: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    endPos: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Annotation.associate = function(models) {
    // associations can be defined here
    Annotation.belongsTo(models.User, { foreignKey: 'userID' });
    Annotation.belongsTo(models.Song, { foreignKey: 'songID' });
  };
  return Annotation;
};
