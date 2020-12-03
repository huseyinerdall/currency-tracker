'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class BUSD extends Model {
        static associate(models) {
            // define association here
        }
    };
    BUSD.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'BUSD',
    });
    return BUSD;
};