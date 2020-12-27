'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class NEAR extends Model {
        static associate(models) {
            // define association here
        }
    };
    NEAR.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'NEAR',
    });
    return NEAR;
};