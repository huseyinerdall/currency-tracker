'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class AUSDC extends Model {
        static associate(models) {
            // define association here
        }
    };
    AUSDC.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'AUSDC',
    });
    return AUSDC;
};