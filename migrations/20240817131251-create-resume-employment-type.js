'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ResumeEmploymentTypes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
      employmentTypeId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'EmploymentTypes', // Имя таблицы EmplymentType
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ResumeEmploymentTypes');
  }
};
