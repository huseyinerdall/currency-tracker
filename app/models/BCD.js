'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class BCD extends Model {
        static associate(models) {
            // define association here
        }
    };
    BCD.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'BCD',
    });
    return BCD;
};