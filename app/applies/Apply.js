const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db'); // Импортируйте настройки подключенися к базе данных
const Resume = require('../resume/models/Resume')
const Vacancy = require('../vacancy/models/Vacancy')


const Apply = sequelize.define('Apply', {
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

Apply.belongsTo(Resume, { foreignKey: 'resumeId' , as: 'resume'}); // связка foreign key
Apply.belongsTo(Vacancy, { foreignKey: 'vacancyId', as: 'vacancy'  }) // чтобы через Резюме можно было обращатся. Через Резюме можно получить много working histories - это вешь дает нам такую возможность

module.exports = Apply;
