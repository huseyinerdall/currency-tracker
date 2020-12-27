'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class AXS extends Model {
        static associate(models) {
            // define association here
        }
    };
    AXS.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'AXS',
    });
    return AXS;
};