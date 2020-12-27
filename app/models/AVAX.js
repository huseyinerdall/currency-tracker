'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class AVAX extends Model {
        static associate(models) {
            // define association here
        }
    };
    AVAX.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'AVAX',
    });
    return AVAX;
};