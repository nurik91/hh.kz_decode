'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Cities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      countryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Countries', // Название таблицы, на которую ссылается foreign key
          key: 'id',
        },
        onUpdate: 'CASCADE', // Действие при обновлении записи в связанной таблице
        onDelete: 'CASCADE', // Действие при удалении записи в связанной таблице
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Cities');
  }
};
