'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class OKB extends Model {
        static associate(models) {
            // define association here
        }
    };
    OKB.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'OKB',
    });
    return OKB;
};