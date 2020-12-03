'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class HBAR extends Model {
        static associate(models) {
            // define association here
        }
    };
    HBAR.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'HBAR',
    });
    return HBAR;
};