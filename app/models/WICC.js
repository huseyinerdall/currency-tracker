'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class WICC extends Model {
        static associate(models) {
            // define association here
        }
    };
    WICC.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'WICC',
    });
    return WICC;
};