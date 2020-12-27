'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class EURS extends Model {
        static associate(models) {
            // define association here
        }
    };
    EURS.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'EURS',
    });
    return EURS;
};