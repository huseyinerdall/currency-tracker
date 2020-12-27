'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class IOST extends Model {
        static associate(models) {
            // define association here
        }
    };
    IOST.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'IOST',
    });
    return IOST;
};