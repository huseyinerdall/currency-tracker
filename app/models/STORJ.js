'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class STORJ extends Model {
        static associate(models) {
            // define association here
        }
    };
    STORJ.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'STORJ',
    });
    return STORJ;
};