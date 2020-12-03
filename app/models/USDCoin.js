'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class USDC extends Model {
        static associate(models) {
            // define association here
        }
    };
    USDC.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'USDC',
    });
    return USDC;
};