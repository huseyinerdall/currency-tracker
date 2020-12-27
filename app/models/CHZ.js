'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class CHZ extends Model {
        static associate(models) {
            // define association here
        }
    };
    CHZ.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'CHZ',
    });
    return CHZ;
};