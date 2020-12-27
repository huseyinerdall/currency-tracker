'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class CVC extends Model {
        static associate(models) {
            // define association here
        }
    };
    CVC.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'CVC',
    });
    return CVC;
};