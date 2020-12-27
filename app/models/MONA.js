'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class MONA extends Model {
        static associate(models) {
            // define association here
        }
    };
    MONA.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'MONA',
    });
    return MONA;
};