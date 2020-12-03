'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class DOT extends Model {
        static associate(models) {
            // define association here
        }
    };
    DOT.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'DOT',
    });
    return DOT;
};