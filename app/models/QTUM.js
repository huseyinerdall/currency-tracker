'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class QTUM extends Model {
        static associate(models) {
            // define association here
        }
    };
    QTUM.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'QTUM',
    });
    return QTUM;
};