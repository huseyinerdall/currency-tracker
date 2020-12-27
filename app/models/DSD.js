'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class DSD extends Model {
        static associate(models) {
            // define association here
        }
    };
    DSD.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'DSD',
    });
    return DSD;
};