'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class YVAULTLPYCURVE extends Model {
        static associate(models) {
            // define association here
        }
    };
    YVAULTLPYCURVE.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'YVAULTLPYCURVE',
    });
    return YVAULTLPYCURVE;
};