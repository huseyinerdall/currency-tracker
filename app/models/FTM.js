'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class FTM extends Model {
        static associate(models) {
            // define association here
        }
    };
    FTM.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'FTM',
    });
    return FTM;
};