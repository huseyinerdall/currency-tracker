'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class SBTC extends Model {
        static associate(models) {
            // define association here
        }
    };
    SBTC.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'SBTC',
    });
    return SBTC;
};