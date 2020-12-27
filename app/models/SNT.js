'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class SNT extends Model {
        static associate(models) {
            // define association here
        }
    };
    SNT.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'SNT',
    });
    return SNT;
};