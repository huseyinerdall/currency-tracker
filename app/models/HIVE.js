'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class HIVE extends Model {
        static associate(models) {
            // define association here
        }
    };
    HIVE.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'HIVE',
    });
    return HIVE;
};