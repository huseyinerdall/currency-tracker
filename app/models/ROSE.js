'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ROSE extends Model {
        static associate(models) {
            // define association here
        }
    };
    ROSE.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'ROSE',
    });
    return ROSE;
};