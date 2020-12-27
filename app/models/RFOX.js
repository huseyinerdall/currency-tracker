'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class RFOX extends Model {
        static associate(models) {
            // define association here
        }
    };
    RFOX.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'RFOX',
    });
    return RFOX;
};