'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class SKL extends Model {
        static associate(models) {
            // define association here
        }
    };
    SKL.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'SKL',
    });
    return SKL;
};