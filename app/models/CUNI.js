'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class CUNI extends Model {
        static associate(models) {
            // define association here
        }
    };
    CUNI.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'CUNI',
    });
    return CUNI;
};