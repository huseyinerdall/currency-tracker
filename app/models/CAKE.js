'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class CAKE extends Model {
        static associate(models) {
            // define association here
        }
    };
    CAKE.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'CAKE',
    });
    return CAKE;
};