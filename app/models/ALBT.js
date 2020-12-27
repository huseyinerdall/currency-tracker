'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ALBT extends Model {
        static associate(models) {
            // define association here
        }
    };
    ALBT.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'ALBT',
    });
    return ALBT;
};