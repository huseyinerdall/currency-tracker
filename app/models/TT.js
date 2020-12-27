'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class TT extends Model {
        static associate(models) {
            // define association here
        }
    };
    TT.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'TT',
    });
    return TT;
};