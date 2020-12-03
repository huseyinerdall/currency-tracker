'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class GNT extends Model {
        static associate(models) {
            // define association here
        }
    };
    GNT.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'GNT',
    });
    return GNT;
};