'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class THETA extends Model {
        static associate(models) {
            // define association here
        }
    };
    THETA.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'THETA',
    });
    return THETA;
};