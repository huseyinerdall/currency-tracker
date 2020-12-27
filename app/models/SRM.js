'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class SRM extends Model {
        static associate(models) {
            // define association here
        }
    };
    SRM.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'SRM',
    });
    return SRM;
};