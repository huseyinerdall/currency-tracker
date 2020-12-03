'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class RSR extends Model {
        static associate(models) {
            // define association here
        }
    };
    RSR.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'RSR',
    });
    return RSR;
};