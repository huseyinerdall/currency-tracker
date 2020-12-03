'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class XMR extends Model {
        static associate(models) {
            // define association here
        }
    };
    XMR.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'XMR',
    });
    return XMR;
};