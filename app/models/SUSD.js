'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class SUSD extends Model {
        static associate(models) {
            // define association here
        }
    };
    SUSD.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'SUSD',
    });
    return SUSD;
};