'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      },
      full_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      roleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Roles', // Note: Sequelize pluralizes model names by default
          key: 'id',
        },
        onUpdate: 'CASCADE', // если это роль удалится то пользователь тоже удалится - это называется касакдное удаление
        onDelete: 'SET NULL'
      },
      companyId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Companies', // Note: Sequelize pluralizes model names by default
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },

    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};
