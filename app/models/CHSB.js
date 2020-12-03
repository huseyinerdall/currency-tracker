'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class CHSB extends Model {
        static associate(models) {
            // define association here
        }
    };
    CHSB.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'CHSB',
    });
    return CHSB;
};