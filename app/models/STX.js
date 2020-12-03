'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class STX extends Model {
        static associate(models) {
            // define association here
        }
    };
    STX.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'STX',
    });
    return STX;
};