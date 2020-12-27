'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class XAUT extends Model {
        static associate(models) {
            // define association here
        }
    };
    XAUT.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'XAUT',
    });
    return XAUT;
};