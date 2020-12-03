'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class RENBTC extends Model {
        static associate(models) {
            // define association here
        }
    };
    RENBTC.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'RENBTC',
    });
    return RENBTC;
};