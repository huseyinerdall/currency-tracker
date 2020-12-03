'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class CRO extends Model {
        static associate(models) {
            // define association here
        }
    };
    CRO.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'CRO',
    });
    return CRO;
};