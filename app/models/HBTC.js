'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class HBTC extends Model {
        static associate(models) {
            // define association here
        }
    };
    HBTC.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'HBTC',
    });
    return HBTC;
};