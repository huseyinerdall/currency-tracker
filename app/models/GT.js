'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class GT extends Model {
        static associate(models) {
            // define association here
        }
    };
    GT.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'GT',
    });
    return GT;
};