'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ICP extends Model {
        static associate(models) {
            // define association here
        }
    };
    ICP.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'ICP',
    });
    return ICP;
};