'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class BNB extends Model {
        static associate(models) {
            // define association here
        }
    };
    BNB.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'BNB',
    });
    return BNB;
};