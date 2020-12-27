'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class STAKE extends Model {
        static associate(models) {
            // define association here
        }
    };
    STAKE.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'STAKE',
    });
    return STAKE;
};