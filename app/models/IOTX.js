'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class IOTX extends Model {
        static associate(models) {
            // define association here
        }
    };
    IOTX.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'IOTX',
    });
    return IOTX;
};