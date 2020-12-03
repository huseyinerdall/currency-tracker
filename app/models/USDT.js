'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class USDT extends Model {
        static associate(models) {
            // define association here
        }
    };
    USDT.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'USDT',
    });
    return USDT;
};