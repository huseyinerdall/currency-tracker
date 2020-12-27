'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class LPT extends Model {
        static associate(models) {
            // define association here
        }
    };
    LPT.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'LPT',
    });
    return LPT;
};