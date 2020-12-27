'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class UTK extends Model {
        static associate(models) {
            // define association here
        }
    };
    UTK.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'UTK',
    });
    return UTK;
};