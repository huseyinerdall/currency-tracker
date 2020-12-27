'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class BTS extends Model {
        static associate(models) {
            // define association here
        }
    };
    BTS.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'BTS',
    });
    return BTS;
};