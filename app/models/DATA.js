'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class DATA extends Model {
        static associate(models) {
            // define association here
        }
    };
    DATA.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'DATA',
    });
    return DATA;
};