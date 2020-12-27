'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class RIF extends Model {
        static associate(models) {
            // define association here
        }
    };
    RIF.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'RIF',
    });
    return RIF;
};