'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ONEINCH extends Model {
        static associate(models) {
            // define association here
        }
    };
    ONEINCH.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'ONEINCH',
    });
    return ONEINCH;
};