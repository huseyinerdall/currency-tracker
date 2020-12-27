'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ENG extends Model {
        static associate(models) {
            // define association here
        }
    };
    ENG.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'ENG',
    });
    return ENG;
};