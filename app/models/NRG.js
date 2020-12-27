'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class NRG extends Model {
        static associate(models) {
            // define association here
        }
    };
    NRG.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'NRG',
    });
    return NRG;
};