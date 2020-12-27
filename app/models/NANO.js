'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class NANO extends Model {
        static associate(models) {
            // define association here
        }
    };
    NANO.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'NANO',
    });
    return NANO;
};