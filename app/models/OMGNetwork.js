'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class OMG extends Model {
        static associate(models) {
            // define association here
        }
    };
    OMG.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'OMG',
    });
    return OMG;
};