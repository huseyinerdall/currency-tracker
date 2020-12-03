'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class NMR extends Model {
        static associate(models) {
            // define association here
        }
    };
    NMR.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'NMR',
    });
    return NMR;
};