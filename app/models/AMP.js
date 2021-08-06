'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class AMP extends Model {
        static associate(models) {
            // define association here
        }
    };
    AMP.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'AMP',
    });
    return AMP;
};