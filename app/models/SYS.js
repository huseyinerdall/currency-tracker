'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class SYS extends Model {
        static associate(models) {
            // define association here
        }
    };
    SYS.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'SYS',
    });
    return SYS;
};