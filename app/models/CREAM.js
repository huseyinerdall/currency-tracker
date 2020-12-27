'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class CREAM extends Model {
        static associate(models) {
            // define association here
        }
    };
    CREAM.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'CREAM',
    });
    return CREAM;
};