'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class MIOTA extends Model {
        static associate(models) {
            // define association here
        }
    };
    MIOTA.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'MIOTA',
    });
    return MIOTA;
};