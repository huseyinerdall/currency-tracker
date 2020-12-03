'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class PAX extends Model {
        static associate(models) {
            // define association here
        }
    };
    PAX.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'PAX',
    });
    return PAX;
};