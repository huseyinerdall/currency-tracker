'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class RPL extends Model {
        static associate(models) {
            // define association here
        }
    };
    RPL.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'RPL',
    });
    return RPL;
};