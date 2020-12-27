'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ATUSD extends Model {
        static associate(models) {
            // define association here
        }
    };
    ATUSD.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'ATUSD',
    });
    return ATUSD;
};