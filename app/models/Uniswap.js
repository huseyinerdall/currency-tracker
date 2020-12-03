'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class UNI extends Model {
        static associate(models) {
            // define association here
        }
    };
    UNI.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'UNI',
    });
    return UNI;
};