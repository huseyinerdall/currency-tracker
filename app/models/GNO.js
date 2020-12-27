'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class GNO extends Model {
        static associate(models) {
            // define association here
        }
    };
    GNO.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'GNO',
    });
    return GNO;
};