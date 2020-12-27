'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class UOS extends Model {
        static associate(models) {
            // define association here
        }
    };
    UOS.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'UOS',
    });
    return UOS;
};