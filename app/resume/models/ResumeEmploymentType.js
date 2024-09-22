const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/db');
const Resume = require('./Resume')
const EmploymentType = require('../../employment-type/EmploymentType')

// Модель ResumeEmploymentType 
const ResumeEmploymentTypes = sequelize.define('ResumeEmploymentTypes', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
},{
        timestamps: false, // Отключение автоматических полей createdAt и updatedAt
});


// ошибка вышло
// ResumeEmploymentTypes.belongsTo(Resume, { foreignKey: 'resumeId' }); // связка foreign key
// ResumeEmploymentTypes.belongsTo(EmploymentType, { foreignKey: 'emplymentTypeId' });

// Установка связи многие ко многим через ResumeEmploymentType

Resume.belongsToMany(EmploymentType, { through: 'ResumeEmploymentTypes', foreignKey: 'resumeId', 
    otherKey: 'employmentTypeId', as: "employmentTypes" }); // часто будем использовать

EmploymentType.belongsToMany(Resume, { through: 'ResumeEmploymentTypes', foreignKey: 'employmentTypeId', otherKey: 'resumeId' }); // редко будем использовать

module.exports =  ResumeEmploymentTypes;
