'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class TOMO extends Model {
        static associate(models) {
            // define association here
        }
    };
    TOMO.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'TOMO',
    });
    return TOMO;
};