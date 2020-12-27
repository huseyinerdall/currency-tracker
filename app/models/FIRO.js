'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class FIRO extends Model {
        static associate(models) {
            // define association here
        }
    };
    FIRO.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'FIRO',
    });
    return FIRO;
};