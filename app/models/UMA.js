'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class UMA extends Model {
        static associate(models) {
            // define association here
        }
    };
    UMA.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'UMA',
    });
    return UMA;
};