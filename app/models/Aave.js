'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class AAVE extends Model {
        static associate(models) {
            // define association here
        }
    };
    AAVE.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'AAVE',
    });
    return AAVE;
};