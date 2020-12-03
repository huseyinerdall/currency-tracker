'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class CDAI extends Model {
        static associate(models) {
            // define association here
        }
    };
    CDAI.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'CDAI',
    });
    return CDAI;
};