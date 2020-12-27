'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class LOKI extends Model {
        static associate(models) {
            // define association here
        }
    };
    LOKI.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'LOKI',
    });
    return LOKI;
};