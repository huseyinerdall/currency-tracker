'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class RLC extends Model {
        static associate(models) {
            // define association here
        }
    };
    RLC.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'RLC',
    });
    return RLC;
};