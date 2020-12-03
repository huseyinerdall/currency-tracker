'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class WAVES extends Model {
        static associate(models) {
            // define association here
        }
    };
    WAVES.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'WAVES',
    });
    return WAVES;
};