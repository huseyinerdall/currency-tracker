'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class RDD extends Model {
        static associate(models) {
            // define association here
        }
    };
    RDD.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'RDD',
    });
    return RDD;
};