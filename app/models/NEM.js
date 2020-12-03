'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class XEM extends Model {
        static associate(models) {
            // define association here
        }
    };
    XEM.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'XEM',
    });
    return XEM;
};