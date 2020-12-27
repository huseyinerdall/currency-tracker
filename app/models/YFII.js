'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class YFII extends Model {
        static associate(models) {
            // define association here
        }
    };
    YFII.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'YFII',
    });
    return YFII;
};