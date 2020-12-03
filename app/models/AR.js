'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class AR extends Model {
        static associate(models) {
            // define association here
        }
    };
    AR.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'AR',
    });
    return AR;
};