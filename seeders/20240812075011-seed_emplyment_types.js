'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('EmploymentTypes', [
      { name: 'Полная занятость' },
      { name: 'Частичная занятость' },
      { name: 'Проектная работа' },
      { name: 'Волентерство' },
      { name: 'Стажировка' },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('EmploymentTypes', null, {});
  }
};
