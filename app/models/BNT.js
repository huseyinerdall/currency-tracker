'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class BNT extends Model {
        static associate(models) {
            // define association here
        }
    };
    BNT.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'BNT',
    });
    return BNT;
};