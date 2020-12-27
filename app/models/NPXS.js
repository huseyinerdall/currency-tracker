'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class NPXS extends Model {
        static associate(models) {
            // define association here
        }
    };
    NPXS.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'NPXS',
    });
    return NPXS;
};