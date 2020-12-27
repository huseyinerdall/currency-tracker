'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class TRAC extends Model {
        static associate(models) {
            // define association here
        }
    };
    TRAC.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'TRAC',
    });
    return TRAC;
};