'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const countries = await queryInterface.sequelize.query(
      `SELECT id, name FROM "Countries";`
    );
    const countryRows = countries[0];

    return queryInterface.bulkInsert('Cities', [
      // Россия
      { name: 'Москва', countryId: countryRows.find(c => c.name === 'Россия').id },
      { name: 'Санкт-Петербург', countryId: countryRows.find(c => c.name === 'Россия').id },
      { name: 'Новосибирск', countryId: countryRows.find(c => c.name === 'Россия').id },
      { name: 'Екатеринбург', countryId: countryRows.find(c => c.name === 'Россия').id },
      { name: 'Нижний Новгород', countryId: countryRows.find(c => c.name === 'Россия').id },
      { name: 'Казань', countryId: countryRows.find(c => c.name === 'Россия').id },
      { name: 'Челябинск', countryId: countryRows.find(c => c.name === 'Россия').id },
      { name: 'Омск', countryId: countryRows.find(c => c.name === 'Россия').id },
      { name: 'Самара', countryId: countryRows.find(c => c.name === 'Россия').id },
      { name: 'Ростов-на-Дону', countryId: countryRows.find(c => c.name === 'Россия').id },

      // Украина
      { name: 'Киев', countryId: countryRows.find(c => c.name === 'Украина').id },
      { name: 'Харьков', countryId: countryRows.find(c => c.name === 'Украина').id },
      { name: 'Одесса', countryId: countryRows.find(c => c.name === 'Украина').id },
      { name: 'Днепр', countryId: countryRows.find(c => c.name === 'Украина').id },
      { name: 'Донецк', countryId: countryRows.find(c => c.name === 'Украина').id },
      { name: 'Запорожье', countryId: countryRows.find(c => c.name === 'Украина').id },
      { name: 'Львов', countryId: countryRows.find(c => c.name === 'Украина').id },
      { name: 'Кривой Рог', countryId: countryRows.find(c => c.name === 'Украина').id },
      { name: 'Николаев', countryId: countryRows.find(c => c.name === 'Украина').id },
      { name: 'Мариуполь', countryId: countryRows.find(c => c.name === 'Украина').id },

      // Беларусь
      { name: 'Минск', countryId: countryRows.find(c => c.name === 'Беларусь').id },
      { name: 'Гомель', countryId: countryRows.find(c => c.name === 'Беларусь').id },
      { name: 'Могилёв', countryId: countryRows.find(c => c.name === 'Беларусь').id },
      { name: 'Витебск', countryId: countryRows.find(c => c.name === 'Беларусь').id },
      { name: 'Гродно', countryId: countryRows.find(c => c.name === 'Беларусь').id },
      { name: 'Брест', countryId: countryRows.find(c => c.name === 'Беларусь').id },

      // Казахстан
      { name: 'Алматы', countryId: countryRows.find(c => c.name === 'Казахстан').id },
      { name: 'Нур-Султан', countryId: countryRows.find(c => c.name === 'Казахстан').id },
      { name: 'Шымкент', countryId: countryRows.find(c => c.name === 'Казахстан').id },
      { name: 'Караганда', countryId: countryRows.find(c => c.name === 'Казахстан').id },
      { name: 'Актобе', countryId: countryRows.find(c => c.name === 'Казахстан').id },

      // Узбекистан
      { name: 'Ташкент', countryId: countryRows.find(c => c.name === 'Узбекистан').id },
      { name: 'Самарканд', countryId: countryRows.find(c => c.name === 'Узбекистан').id },
      { name: 'Наманган', countryId: countryRows.find(c => c.name === 'Узбекистан').id },
      { name: 'Андижан', countryId: countryRows.find(c => c.name === 'Узбекистан').id },
      { name: 'Бухара', countryId: countryRows.find(c => c.name === 'Узбекистан').id },

      // Таджикистан
      { name: 'Душанбе', countryId: countryRows.find(c => c.name === 'Таджикистан').id },
      { name: 'Худжанд', countryId: countryRows.find(c => c.name === 'Таджикистан').id },
      { name: 'Бохтар', countryId: countryRows.find(c => c.name === 'Таджикистан').id },
      { name: 'Куляб', countryId: countryRows.find(c => c.name === 'Таджикистан').id },
      { name: 'Истаравшан', countryId: countryRows.find(c => c.name === 'Таджикистан').id },

      // Армения
      { name: 'Ереван', countryId: countryRows.find(c => c.name === 'Армения').id },
      { name: 'Гюмри', countryId: countryRows.find(c => c.name === 'Армения').id },
      { name: 'Ванадзор', countryId: countryRows.find(c => c.name === 'Армения').id },
      { name: 'Раздан', countryId: countryRows.find(c => c.name === 'Армения').id },
      { name: 'Гавар', countryId: countryRows.find(c => c.name === 'Армения').id },

      // Азербайджан
      { name: 'Баку', countryId: countryRows.find(c => c.name === 'Азербайджан').id },
      { name: 'Гянджа', countryId: countryRows.find(c => c.name === 'Азербайджан').id },
      { name: 'Сумгаит', countryId: countryRows.find(c => c.name === 'Азербайджан').id },
      { name: 'Мингечевир', countryId: countryRows.find(c => c.name === 'Азербайджан').id },
      { name: 'Шеки', countryId: countryRows.find(c => c.name === 'Азербайджан').id },

      // Киргизия
      { name: 'Бишкек', countryId: countryRows.find(c => c.name === 'Киргизия').id },
      { name: 'Ош', countryId: countryRows.find(c => c.name === 'Киргизия').id },
      { name: 'Джалал-Абад', countryId: countryRows.find(c => c.name === 'Киргизия').id },
      { name: 'Каракол', countryId: countryRows.find(c => c.name === 'Киргизия').id },
      { name: 'Токмак', countryId: countryRows.find(c => c.name === 'Киргизия').id },

      // Молдова
      { name: 'Кишинев', countryId: countryRows.find(c => c.name === 'Молдова').id },
      { name: 'Тирасполь', countryId: countryRows.find(c => c.name === 'Молдова').id },
      { name: 'Бельцы', countryId: countryRows.find(c => c.name === 'Молдова').id },
      { name: 'Бендеры', countryId: countryRows.find(c => c.name === 'Молдова').id },
      { name: 'Рыбница', countryId: countryRows.find(c => c.name === 'Молдова').id },

    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Cities', null, {});
  }
};

