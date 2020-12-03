'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class LUNA extends Model {
        static associate(models) {
            // define association here
        }
    };
    LUNA.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'LUNA',
    });
    return LUNA;
};