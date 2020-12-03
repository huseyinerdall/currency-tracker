'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class VITAE extends Model {
        static associate(models) {
            // define association here
        }
    };
    VITAE.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'VITAE',
    });
    return VITAE;
};