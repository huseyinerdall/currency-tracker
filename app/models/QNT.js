'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class QNT extends Model {
        static associate(models) {
            // define association here
        }
    };
    QNT.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'QNT',
    });
    return QNT;
};