'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class DIVI extends Model {
        static associate(models) {
            // define association here
        }
    };
    DIVI.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'DIVI',
    });
    return DIVI;
};