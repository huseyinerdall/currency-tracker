'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ZIL extends Model {
        static associate(models) {
            // define association here
        }
    };
    ZIL.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'ZIL',
    });
    return ZIL;
};