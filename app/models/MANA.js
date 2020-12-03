'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class MANA extends Model {
        static associate(models) {
            // define association here
        }
    };
    MANA.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'MANA',
    });
    return MANA;
};