'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class LTC extends Model {
        static associate(models) {
            // define association here
        }
    };
    LTC.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'LTC',
    });
    return LTC;
};