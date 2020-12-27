'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class CYF extends Model {
        static associate(models) {
            // define association here
        }
    };
    CYF.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'CYF',
    });
    return CYF;
};