'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class DGB extends Model {
        static associate(models) {
            // define association here
        }
    };
    DGB.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'DGB',
    });
    return DGB;
};