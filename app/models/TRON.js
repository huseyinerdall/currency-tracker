'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class TRX extends Model {
        static associate(models) {
            // define association here
        }
    };
    TRX.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'TRX',
    });
    return TRX;
};