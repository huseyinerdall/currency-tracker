'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class CRV extends Model {
        static associate(models) {
            // define association here
        }
    };
    CRV.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'CRV',
    });
    return CRV;
};