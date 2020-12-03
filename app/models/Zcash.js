'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ZEC extends Model {
        static associate(models) {
            // define association here
        }
    };
    ZEC.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'ZEC',
    });
    return ZEC;
};