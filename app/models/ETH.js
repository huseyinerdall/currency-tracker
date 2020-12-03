'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ETH extends Model {
        static associate(models) {
            // define association here
        }
    };
    ETH.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'ETH',
    });
    return ETH;
};