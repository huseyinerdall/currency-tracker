'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class USDN extends Model {
        static associate(models) {
            // define association here
        }
    };
    USDN.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'USDN',
    });
    return USDN;
};