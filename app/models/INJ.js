'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class INJ extends Model {
        static associate(models) {
            // define association here
        }
    };
    INJ.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'INJ',
    });
    return INJ;
};