'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class XLM extends Model {
        static associate(models) {
            // define association here
        }
    };
    XLM.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'XLM',
    });
    return XLM;
};