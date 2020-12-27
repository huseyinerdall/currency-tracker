'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class AION extends Model {
        static associate(models) {
            // define association here
        }
    };
    AION.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'AION',
    });
    return AION;
};