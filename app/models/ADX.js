'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ADX extends Model {
        static associate(models) {
            // define association here
        }
    };
    ADX.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'ADX',
    });
    return ADX;
};