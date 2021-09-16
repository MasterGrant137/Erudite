'use strict';
const { songSeedsArray } = require('../../../frontend/src/scrapers/song-seeds');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Songs', songSeedsArray, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Songs', null, {
      truncate: true,
      cascade: true,
      restartIdentity: true
    });
  }
};
