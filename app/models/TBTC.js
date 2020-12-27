'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class TBTC extends Model {
        static associate(models) {
            // define association here
        }
    };
    TBTC.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'TBTC',
    });
    return TBTC;
};