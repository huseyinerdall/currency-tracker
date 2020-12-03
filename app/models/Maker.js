'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class MKR extends Model {
        static associate(models) {
            // define association here
        }
    };
    MKR.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'MKR',
    });
    return MKR;
};