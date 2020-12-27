'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class POWR extends Model {
        static associate(models) {
            // define association here
        }
    };
    POWR.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'POWR',
    });
    return POWR;
};