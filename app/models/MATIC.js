'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class MATIC extends Model {
        static associate(models) {
            // define association here
        }
    };
    MATIC.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'MATIC',
    });
    return MATIC;
};