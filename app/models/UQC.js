'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class UQC extends Model {
        static associate(models) {
            // define association here
        }
    };
    UQC.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'UQC',
    });
    return UQC;
};