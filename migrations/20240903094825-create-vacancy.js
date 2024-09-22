'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Vacancies', {
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
      salary_from: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      salary_to: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      salary_type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      skills: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      about_company: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      cityId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Cities', // Имя таблицы City
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users', // Имя таблицы User
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true
      },
      companyId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Companies', // Имя таблицы Company
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true
      },
      specializationId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Specializations', // Имя таблицы Specialization
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true
      },
      experienceId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Experiences', // Имя таблицы Experience
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true
      },
      employmentTypeId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'EmploymentTypes', // Имя таблицы EmploymentType
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true
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

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Vacancies');
  }
};
