'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ARRR extends Model {
        static associate(models) {
            // define association here
        }
    };
    ARRR.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'ARRR',
    });
    return ARRR;
};