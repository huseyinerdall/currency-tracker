'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class FARM extends Model {
        static associate(models) {
            // define association here
        }
    };
    FARM.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'FARM',
    });
    return FARM;
};