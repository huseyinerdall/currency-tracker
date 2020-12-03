'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class DOGE extends Model {
        static associate(models) {
            // define association here
        }
    };
    DOGE.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'DOGE',
    });
    return DOGE;
};