'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ADA extends Model {
        static associate(models) {
            // define association here
        }
    };
    ADA.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'ADA',
    });
    return ADA;
};