'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ONE extends Model {
        static associate(models) {
            // define association here
        }
    };
    ONE.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'ONE',
    });
    return ONE;
};