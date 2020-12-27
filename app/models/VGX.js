'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class VGX extends Model {
        static associate(models) {
            // define association here
        }
    };
    VGX.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'VGX',
    });
    return VGX;
};