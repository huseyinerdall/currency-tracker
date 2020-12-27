'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class UBT extends Model {
        static associate(models) {
            // define association here
        }
    };
    UBT.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'UBT',
    });
    return UBT;
};