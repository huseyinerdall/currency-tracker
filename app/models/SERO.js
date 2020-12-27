'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class SERO extends Model {
        static associate(models) {
            // define association here
        }
    };
    SERO.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'SERO',
    });
    return SERO;
};