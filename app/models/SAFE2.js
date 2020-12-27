'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class SAFE2 extends Model {
        static associate(models) {
            // define association here
        }
    };
    SAFE2.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'SAFE2',
    });
    return SAFE2;
};