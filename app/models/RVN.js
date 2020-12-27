'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class RVN extends Model {
        static associate(models) {
            // define association here
        }
    };
    RVN.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'RVN',
    });
    return RVN;
};