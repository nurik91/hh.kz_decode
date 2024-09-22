'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('WorkingHistories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      company_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      company_description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      responsibilities: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      start_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      end_date: {
        type: Sequelize.DATE,
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
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('WorkingHistories');
  }
};
