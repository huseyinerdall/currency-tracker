'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Gold18AyarAltin extends Model {
        static associate(models) {
            // define association here
        }
    };
    Gold18AyarAltin.init({
        Alis: DataTypes.STRING,
        Satis: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Gold18AyarAltin',
    });
    return Gold18AyarAltin;
};