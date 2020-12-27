'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class KAVA extends Model {
        static associate(models) {
            // define association here
        }
    };
    KAVA.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'KAVA',
    });
    return KAVA;
};