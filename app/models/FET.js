'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class FET extends Model {
        static associate(models) {
            // define association here
        }
    };
    FET.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'FET',
    });
    return FET;
};