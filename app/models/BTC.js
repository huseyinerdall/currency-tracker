'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class BTC extends Model {
        static associate(models) {
            // define association here
        }
    };
    BTC.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'BTC',
    });
    return BTC;
};