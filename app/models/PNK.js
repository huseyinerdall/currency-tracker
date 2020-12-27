'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class PNK extends Model {
        static associate(models) {
            // define association here
        }
    };
    PNK.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'PNK',
    });
    return PNK;
};