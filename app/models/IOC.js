'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class IOC extends Model {
        static associate(models) {
            // define association here
        }
    };
    IOC.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'IOC',
    });
    return IOC;
};