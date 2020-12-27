'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class MATH extends Model {
        static associate(models) {
            // define association here
        }
    };
    MATH.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'MATH',
    });
    return MATH;
};