'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class VSYS extends Model {
        static associate(models) {
            // define association here
        }
    };
    VSYS.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'VSYS',
    });
    return VSYS;
};