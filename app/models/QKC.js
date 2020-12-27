'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class QKC extends Model {
        static associate(models) {
            // define association here
        }
    };
    QKC.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'QKC',
    });
    return QKC;
};