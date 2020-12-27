'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class TITAN extends Model {
        static associate(models) {
            // define association here
        }
    };
    TITAN.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'TITAN',
    });
    return TITAN;
};