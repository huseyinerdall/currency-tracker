'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class EDG extends Model {
        static associate(models) {
            // define association here
        }
    };
    EDG.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'EDG',
    });
    return EDG;
};