'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ENJ extends Model {
        static associate(models) {
            // define association here
        }
    };
    ENJ.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'ENJ',
    });
    return ENJ;
};