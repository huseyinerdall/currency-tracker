'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class COVER extends Model {
        static associate(models) {
            // define association here
        }
    };
    COVER.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'COVER',
    });
    return COVER;
};