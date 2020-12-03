'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ANT extends Model {
        static associate(models) {
            // define association here
        }
    };
    ANT.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'ANT',
    });
    return ANT;
};