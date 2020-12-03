'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class WBTC extends Model {
        static associate(models) {
            // define association here
        }
    };
    WBTC.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'WBTC',
    });
    return WBTC;
};