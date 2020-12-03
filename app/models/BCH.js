'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class BCH extends Model {
        static associate(models) {
            // define association here
        }
    };
    BCH.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'BCH',
    });
    return BCH;
};