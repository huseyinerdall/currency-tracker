'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class WAN extends Model {
        static associate(models) {
            // define association here
        }
    };
    WAN.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'WAN',
    });
    return WAN;
};