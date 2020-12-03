'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class AMPL extends Model {
        static associate(models) {
            // define association here
        }
    };
    AMPL.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'AMPL',
    });
    return AMPL;
};