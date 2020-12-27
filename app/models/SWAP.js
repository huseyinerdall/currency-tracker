'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class SWAP extends Model {
        static associate(models) {
            // define association here
        }
    };
    SWAP.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'SWAP',
    });
    return SWAP;
};