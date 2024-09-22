const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/db');
const SpecializationType = require('./SpecializationType')


const Specialization = sequelize.define('Specialization', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: false, // Отключение автоматических полей createdAt и updatedAt
});

Specialization.belongsTo(SpecializationType, { foreignKey: 'specializationTypeId' }); // связка foreign key
SpecializationType.hasMany(Specialization,  { 
    foreignKey: 'specializationTypeId',
    as: "specializations"

})

module.exports = Specialization;
