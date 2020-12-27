'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class FIL extends Model {
        static associate(models) {
            // define association here
        }
    };
    FIL.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'FIL',
    });
    return FIL;
};