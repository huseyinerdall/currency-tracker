'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class SXP extends Model {
        static associate(models) {
            // define association here
        }
    };
    SXP.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'SXP',
    });
    return SXP;
};