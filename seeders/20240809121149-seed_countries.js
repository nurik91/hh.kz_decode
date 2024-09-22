'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Countries', [
      { name: 'Россия' },
      { name: 'Украина' },
      { name: 'Беларусь' },
      { name: 'Казахстан' },
      { name: 'Узбекистан' },
      { name: 'Таджикистан' },
      { name: 'Армения' },
      { name: 'Азербайджан' },
      { name: 'Киргизия' },
      { name: 'Молдова' },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Countries', null, {});
  }
};
