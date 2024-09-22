const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/db');
const Resume = require('./Resume')


const WorkingHistory = sequelize.define('WorkingHistory', {
    company_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    company_description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    responsibilities: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    start_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    "end_date": "",
},{
    timestamps: false, // Отключение автоматических полей createdAt и updatedAt
});

WorkingHistory.belongsTo(Resume, { foreignKey: 'resumeId' }); // связка foreign key

Resume.hasMany(WorkingHistory, { foreignKey: 'resumeId', as: "workingHistories" }) // чтобы через Резюме можно было обращатся. Через Резюме можно получить много working histories - это вешь дает нам такую возможность

module.exports = WorkingHistory;
