'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class YFI extends Model {
        static associate(models) {
            // define association here
        }
    };
    YFI.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'YFI',
    });
    return YFI;
};