'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class HYN extends Model {
        static associate(models) {
            // define association here
        }
    };
    HYN.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'HYN',
    });
    return HYN;
};