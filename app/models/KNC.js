'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class KNC extends Model {
        static associate(models) {
            // define association here
        }
    };
    KNC.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'KNC',
    });
    return KNC;
};