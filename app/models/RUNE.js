'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class RUNE extends Model {
        static associate(models) {
            // define association here
        }
    };
    RUNE.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'RUNE',
    });
    return RUNE;
};