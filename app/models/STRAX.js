'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class STRAX extends Model {
        static associate(models) {
            // define association here
        }
    };
    STRAX.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'STRAX',
    });
    return STRAX;
};