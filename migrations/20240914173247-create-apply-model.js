'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Applies', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false
      },
      resumeId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Resumes', // название таблицы, на которую ссылаемся
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      vacancyId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Vacancies', // название таблицы, на которую ссылаемся
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Applies');
  }
};
