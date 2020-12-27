'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ORN extends Model {
        static associate(models) {
            // define association here
        }
    };
    ORN.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'ORN',
    });
    return ORN;
};