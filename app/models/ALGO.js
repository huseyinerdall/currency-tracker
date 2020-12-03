'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ALGO extends Model {
        static associate(models) {
            // define association here
        }
    };
    ALGO.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'ALGO',
    });
    return ALGO;
};