'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class KCS extends Model {
        static associate(models) {
            // define association here
        }
    };
    KCS.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'KCS',
    });
    return KCS;
};