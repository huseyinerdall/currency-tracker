'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class BSV extends Model {
        static associate(models) {
            // define association here
        }
    };
    BSV.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'BSV',
    });
    return BSV;
};