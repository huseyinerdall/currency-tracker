'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class CEL extends Model {
        static associate(models) {
            // define association here
        }
    };
    CEL.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'CEL',
    });
    return CEL;
};