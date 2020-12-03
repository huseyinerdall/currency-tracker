'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class XTZ extends Model {
        static associate(models) {
            // define association here
        }
    };
    XTZ.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'XTZ',
    });
    return XTZ;
};