'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class CKB extends Model {
        static associate(models) {
            // define association here
        }
    };
    CKB.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'CKB',
    });
    return CKB;
};