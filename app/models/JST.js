'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class JST extends Model {
        static associate(models) {
            // define association here
        }
    };
    JST.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'JST',
    });
    return JST;
};