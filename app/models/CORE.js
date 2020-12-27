'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class CORE extends Model {
        static associate(models) {
            // define association here
        }
    };
    CORE.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'CORE',
    });
    return CORE;
};