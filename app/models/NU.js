'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class NU extends Model {
        static associate(models) {
            // define association here
        }
    };
    NU.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'NU',
    });
    return NU;
};