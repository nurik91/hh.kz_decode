const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/db');
const Resume = require('./Resume')


const ForeignLanguage = sequelize.define('ForeignLanguage', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    level: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: false, // Отключение автоматических полей createdAt и updatedAt
});

ForeignLanguage.belongsTo(Resume, { foreignKey: 'resumeId' }); // связка foreign key
Resume.hasMany(ForeignLanguage, { foreignKey: 'resumeId', as: "foreignLanguages"})

module.exports = ForeignLanguage;
