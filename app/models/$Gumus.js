'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class GoldGumus extends Model {
        static associate(models) {
            // define association here
        }
    };
    GoldGumus.init({
        Alis: DataTypes.STRING,
        Satis: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'GoldGumus',
    });
    return GoldGumus;
};