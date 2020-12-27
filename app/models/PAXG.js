'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class PAXG extends Model {
        static associate(models) {
            // define association here
        }
    };
    PAXG.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'PAXG',
    });
    return PAXG;
};