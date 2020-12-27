'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class HOT extends Model {
        static associate(models) {
            // define association here
        }
    };
    HOT.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'HOT',
    });
    return HOT;
};