'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class BAT extends Model {
        static associate(models) {
            // define association here
        }
    };
    BAT.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'BAT',
    });
    return BAT;
};