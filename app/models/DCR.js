'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class DCR extends Model {
        static associate(models) {
            // define association here
        }
    };
    DCR.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'DCR',
    });
    return DCR;
};