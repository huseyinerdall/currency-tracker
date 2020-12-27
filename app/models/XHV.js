'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class XHV extends Model {
        static associate(models) {
            // define association here
        }
    };
    XHV.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'XHV',
    });
    return XHV;
};