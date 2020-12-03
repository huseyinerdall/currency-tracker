'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class NXM extends Model {
        static associate(models) {
            // define association here
        }
    };
    NXM.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'NXM',
    });
    return NXM;
};