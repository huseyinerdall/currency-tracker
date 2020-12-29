'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class BAC extends Model {
        static associate(models) {
            // define association here
        }
    };
    BAC.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'BAC',
    });
    return BAC;
};