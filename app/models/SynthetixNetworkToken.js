'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class SNX extends Model {
        static associate(models) {
            // define association here
        }
    };
    SNX.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'SNX',
    });
    return SNX;
};