'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class XVG extends Model {
        static associate(models) {
            // define association here
        }
    };
    XVG.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'XVG',
    });
    return XVG;
};