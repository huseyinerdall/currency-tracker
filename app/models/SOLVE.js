'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class SOLVE extends Model {
        static associate(models) {
            // define association here
        }
    };
    SOLVE.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'SOLVE',
    });
    return SOLVE;
};