'use strict';
const { songSeedsArr } = require('../../../frontend/src/data-formatting/seeder-functions');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Songs', songSeedsArr, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Songs', null, {});
  }
};
