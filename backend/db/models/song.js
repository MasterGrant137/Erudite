'use strict';
module.exports = (sequelize, DataTypes) => {
  const Song = sequelize.define('Song', {
    artist: {
      type: DataTypes.STRING,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    producer: {
      type: DataTypes.STRING,
      allowNull: false
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    media: {
      type: DataTypes.STRING,
    },
    coverArt: {
      type: DataTypes.STRING,
    },
    backgroundArt: {
      type: DataTypes.STRING,
    }
  }, {});
  Song.associate = function(models) {
    // associations can be defined here
    Song.hasMany(models.Annotation, { foreignKey: 'songID' });
    Song.hasMany(models.Comment, { foreignKey: 'songID' });
  };
  return Song;
};
