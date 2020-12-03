'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class BAL extends Model {
        static associate(models) {
            // define association here
        }
    };
    BAL.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'BAL',
    });
    return BAL;
};