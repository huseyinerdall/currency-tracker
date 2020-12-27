'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ELF extends Model {
        static associate(models) {
            // define association here
        }
    };
    ELF.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'ELF',
    });
    return ELF;
};