'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class HT extends Model {
        static associate(models) {
            // define association here
        }
    };
    HT.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'HT',
    });
    return HT;
};