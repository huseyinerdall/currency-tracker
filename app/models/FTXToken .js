'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class FTT extends Model {
        static associate(models) {
            // define association here
        }
    };
    FTT.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'FTT',
    });
    return FTT;
};