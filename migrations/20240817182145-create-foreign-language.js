'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ForeignLanguages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      level: {
        type: Sequelize.STRING,
        allowNull: false
      },
      resumeId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Resumes', // Имя таблицы Resume
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ForeignLanguages');
  }
};
