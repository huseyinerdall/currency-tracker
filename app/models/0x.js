'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ZRX extends Model {
        static associate(models) {
            // define association here
        }
    };
    ZRX.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'ZRX',
    });
    return ZRX;
};