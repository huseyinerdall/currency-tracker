'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class SETH extends Model {
        static associate(models) {
            // define association here
        }
    };
    SETH.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'SETH',
    });
    return SETH;
};