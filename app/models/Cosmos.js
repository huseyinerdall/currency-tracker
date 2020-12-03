'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ATOM extends Model {
        static associate(models) {
            // define association here
        }
    };
    ATOM.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'ATOM',
    });
    return ATOM;
};