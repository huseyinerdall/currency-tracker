'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class BAND extends Model {
        static associate(models) {
            // define association here
        }
    };
    BAND.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'BAND',
    });
    return BAND;
};