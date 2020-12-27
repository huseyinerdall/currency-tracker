'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class HNT extends Model {
        static associate(models) {
            // define association here
        }
    };
    HNT.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'HNT',
    });
    return HNT;
};