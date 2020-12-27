'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class POLY extends Model {
        static associate(models) {
            // define association here
        }
    };
    POLY.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'POLY',
    });
    return POLY;
};