'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class DAI extends Model {
        static associate(models) {
            // define association here
        }
    };
    DAI.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'DAI',
    });
    return DAI;
};