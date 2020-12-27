'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class USDK extends Model {
        static associate(models) {
            // define association here
        }
    };
    USDK.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'USDK',
    });
    return USDK;
};