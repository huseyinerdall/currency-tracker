'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ESD extends Model {
        static associate(models) {
            // define association here
        }
    };
    ESD.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'ESD',
    });
    return ESD;
};