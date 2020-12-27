'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ONT extends Model {
        static associate(models) {
            // define association here
        }
    };
    ONT.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'ONT',
    });
    return ONT;
};