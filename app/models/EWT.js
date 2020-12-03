'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class EWT extends Model {
        static associate(models) {
            // define association here
        }
    };
    EWT.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'EWT',
    });
    return EWT;
};