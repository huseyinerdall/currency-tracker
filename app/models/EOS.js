'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class EOS extends Model {
        static associate(models) {
            // define association here
        }
    };
    EOS.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'EOS',
    });
    return EOS;
};