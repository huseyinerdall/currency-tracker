'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class KMD extends Model {
        static associate(models) {
            // define association here
        }
    };
    KMD.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'KMD',
    });
    return KMD;
};