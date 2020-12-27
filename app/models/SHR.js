'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class SHR extends Model {
        static associate(models) {
            // define association here
        }
    };
    SHR.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'SHR',
    });
    return SHR;
};