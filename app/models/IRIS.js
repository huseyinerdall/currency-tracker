'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class IRIS extends Model {
        static associate(models) {
            // define association here
        }
    };
    IRIS.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'IRIS',
    });
    return IRIS;
};