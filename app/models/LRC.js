'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class LRC extends Model {
        static associate(models) {
            // define association here
        }
    };
    LRC.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'LRC',
    });
    return LRC;
};