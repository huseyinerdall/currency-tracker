'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class REN extends Model {
        static associate(models) {
            // define association here
        }
    };
    REN.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'REN',
    });
    return REN;
};