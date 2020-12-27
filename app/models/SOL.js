'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class SOL extends Model {
        static associate(models) {
            // define association here
        }
    };
    SOL.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'SOL',
    });
    return SOL;
};