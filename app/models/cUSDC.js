'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class CUSDC extends Model {
        static associate(models) {
            // define association here
        }
    };
    CUSDC.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'CUSDC',
    });
    return CUSDC;
};