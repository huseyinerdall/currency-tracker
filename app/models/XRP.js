'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class XRP extends Model {
        static associate(models) {
            // define association here
        }
    };
    XRP.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'XRP',
    });
    return XRP;
};