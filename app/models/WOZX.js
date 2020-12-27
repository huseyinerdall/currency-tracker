'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class WOZX extends Model {
        static associate(models) {
            // define association here
        }
    };
    WOZX.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'WOZX',
    });
    return WOZX;
};