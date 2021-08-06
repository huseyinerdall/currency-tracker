'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class SHIB extends Model {
        static associate(models) {
            // define association here
        }
    };
    SHIB.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'SHIB',
    });
    return SHIB;
};