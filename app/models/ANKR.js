'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ANKR extends Model {
        static associate(models) {
            // define association here
        }
    };
    ANKR.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'ANKR',
    });
    return ANKR;
};