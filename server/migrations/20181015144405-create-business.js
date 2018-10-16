'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('businesses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      businessName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tagline: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      businessAddress1: {
        type: Sequelize.STRING,
        allowNull: false
      },
      businessAddress2: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      phoneNumber1: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      phoneNumber2: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      website: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      category: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      businessImageUrl: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      businessDescription: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
          as: 'userId',
        }},
    });
  },
  down: queryInterface => queryInterface.dropTable('businesses')
};
