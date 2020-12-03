'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ETC extends Model {
        static associate(models) {
            // define association here
        }
    };
    ETC.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'ETC',
    });
    return ETC;
};