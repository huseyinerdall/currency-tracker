'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class TUSD extends Model {
        static associate(models) {
            // define association here
        }
    };
    TUSD.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'TUSD',
    });
    return TUSD;
};