'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ARDR extends Model {
        static associate(models) {
            // define association here
        }
    };
    ARDR.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'ARDR',
    });
    return ARDR;
};