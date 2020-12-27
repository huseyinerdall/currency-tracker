'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class AVA extends Model {
        static associate(models) {
            // define association here
        }
    };
    AVA.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'AVA',
    });
    return AVA;
};