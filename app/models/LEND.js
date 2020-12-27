'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class LEND extends Model {
        static associate(models) {
            // define association here
        }
    };
    LEND.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'LEND',
    });
    return LEND;
};