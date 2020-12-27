'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class XOR extends Model {
        static associate(models) {
            // define association here
        }
    };
    XOR.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'XOR',
    });
    return XOR;
};