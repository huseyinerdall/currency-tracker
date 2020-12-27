'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ETN extends Model {
        static associate(models) {
            // define association here
        }
    };
    ETN.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'ETN',
    });
    return ETN;
};