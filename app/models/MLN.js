'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class MLN extends Model {
        static associate(models) {
            // define association here
        }
    };
    MLN.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'MLN',
    });
    return MLN;
};