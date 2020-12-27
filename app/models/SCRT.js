'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class SCRT extends Model {
        static associate(models) {
            // define association here
        }
    };
    SCRT.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'SCRT',
    });
    return SCRT;
};