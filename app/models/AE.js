'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class AE extends Model {
        static associate(models) {
            // define association here
        }
    };
    AE.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'AE',
    });
    return AE;
};