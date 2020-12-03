'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class VET extends Model {
        static associate(models) {
            // define association here
        }
    };
    VET.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'VET',
    });
    return VET;
};