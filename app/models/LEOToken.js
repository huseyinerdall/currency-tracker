'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class LEO extends Model {
        static associate(models) {
            // define association here
        }
    };
    LEO.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'LEO',
    });
    return LEO;
};