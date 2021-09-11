'use strict';
module.exports = (sequelize, DataTypes) => {
  const Song = sequelize.define('Song', {
    artist: DataTypes.STRING,
    title: DataTypes.STRING,
    producer: DataTypes.STRING,
    body: DataTypes.TEXT,
    media: DataTypes.STRING,
    coverArt: DataTypes.STRING,
    backgroundArt: DataTypes.STRING
  }, {});
  Song.associate = function(models) {
    // associations can be defined here
  };
  return Song;
};