'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ADAI extends Model {
        static associate(models) {
            // define association here
        }
    };
    ADAI.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'ADAI',
    });
    return ADAI;
};