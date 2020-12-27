'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class KAI extends Model {
        static associate(models) {
            // define association here
        }
    };
    KAI.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'KAI',
    });
    return KAI;
};