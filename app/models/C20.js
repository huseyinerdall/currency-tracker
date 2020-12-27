'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class C20 extends Model {
        static associate(models) {
            // define association here
        }
    };
    C20.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'C20',
    });
    return C20;
};