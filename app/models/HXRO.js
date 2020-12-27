'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class HXRO extends Model {
        static associate(models) {
            // define association here
        }
    };
    HXRO.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'HXRO',
    });
    return HXRO;
};