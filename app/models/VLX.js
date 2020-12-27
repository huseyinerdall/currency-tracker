'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class VLX extends Model {
        static associate(models) {
            // define association here
        }
    };
    VLX.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'VLX',
    });
    return VLX;
};