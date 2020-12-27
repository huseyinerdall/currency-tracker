'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ARK extends Model {
        static associate(models) {
            // define association here
        }
    };
    ARK.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'ARK',
    });
    return ARK;
};