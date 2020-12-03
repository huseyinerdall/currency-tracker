'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class OCEAN extends Model {
        static associate(models) {
            // define association here
        }
    };
    OCEAN.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'OCEAN',
    });
    return OCEAN;
};