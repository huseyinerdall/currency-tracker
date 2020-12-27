'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class DIA extends Model {
        static associate(models) {
            // define association here
        }
    };
    DIA.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'DIA',
    });
    return DIA;
};