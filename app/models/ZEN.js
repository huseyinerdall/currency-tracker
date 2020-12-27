'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ZEN extends Model {
        static associate(models) {
            // define association here
        }
    };
    ZEN.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'ZEN',
    });
    return ZEN;
};