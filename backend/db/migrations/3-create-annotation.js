'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Annotations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Users' }
      },
      songID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Songs' }
      },
      body: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      startPos: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      endPos: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Annotations');
  }
};
