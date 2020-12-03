'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class LSK extends Model {
        static associate(models) {
            // define association here
        }
    };
    LSK.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'LSK',
    });
    return LSK;
};