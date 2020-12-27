'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class KSM extends Model {
        static associate(models) {
            // define association here
        }
    };
    KSM.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'KSM',
    });
    return KSM;
};