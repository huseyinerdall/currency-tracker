'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class NEXO extends Model {
        static associate(models) {
            // define association here
        }
    };
    NEXO.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'NEXO',
    });
    return NEXO;
};