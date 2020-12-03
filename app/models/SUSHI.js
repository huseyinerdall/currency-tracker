'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class SUSHI extends Model {
        static associate(models) {
            // define association here
        }
    };
    SUSHI.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'SUSHI',
    });
    return SUSHI;
};