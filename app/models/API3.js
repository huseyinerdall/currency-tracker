'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class API3 extends Model {
        static associate(models) {
            // define association here
        }
    };
    API3.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'API3',
    });
    return API3;
};